<template>
  <Modal
    v-model="visible"
    title="批量编辑"
    width="100%"
    fullscreen
    class-name="batch-edit-modal"
    @on-cancel="handleCancel"
  >
    <div class="batch-edit-content">
      <!-- 顶部工具栏 -->
      <BatchEditToolbar
        :total="totalCount"
        :loading="loading"
        @search="handleSearch"
        @export="handleExport"
        @import="handleImport"
        @batch-edit="handleBatchEdit"
        @validate="handleValidate"
        @toggle-error="handleToggleError"
      />

      <!-- 页签 -->
      <Tabs type="card" :active-key="activeTab" @on-click="handleTabChange">
        <TabPane
          v-for="tab in tabs"
          :key="tab.type"
          :label="`${tab.name} (${tab.count})`"
          :name="tab.type"
        />
      </Tabs>

      <!-- 表格 -->
      <BatchEditTable
        ref="tableRef"
        :data="displayData"
        :field-config="fieldConfig"
        :validations="validations"
        :loading="loading"
        :show-error-only="showErrorOnly"
        @edit="handleCellEdit"
        @select="handleSelect"
      />

      <!-- 校验结果面板 -->
      <ValidationPanel
        v-if="showValidationPanel"
        :validations="validations"
        @jump="handleJumpToRow"
      />
    </div>

    <!-- 底部按钮 -->
    <div slot="footer" class="batch-edit-footer">
      <Button @click="handleCancel">取消</Button>
      <Button type="primary" :loading="saving" @click="handleSave">暂存</Button>
      <Button type="primary" :loading="submitting" @click="handleSubmit">确定</Button>
    </div>
  </Modal>
</template>

<script>
import BatchEditToolbar from './components/BatchEditToolbar.vue'
import BatchEditTable from './components/BatchEditTable.vue'
import ValidationPanel from './components/ValidationPanel.vue'
import { getAssetInfo, save, validate, exportData } from './api.js'

export default {
  name: 'BatchEditModal',

  components: {
    BatchEditToolbar,
    BatchEditTable,
    ValidationPanel
  },

  props: {
    value: {
      type: Boolean,
      default: false
    },
    // 外部传入的资产ID列表
    assetIds: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      visible: false,
      loading: false,
      saving: false,
      submitting: false,
      activeTab: 'LAND',
      tabs: [],
      tableData: [],
      fieldConfig: {},
      validations: [],
      showErrorOnly: false,
      selectedRows: [],
      modifiedData: new Map(),
      showValidationPanel: false,
      searchKeyword: ''
    }
  },

  computed: {
    totalCount() {
      return this.tabs.reduce((sum, tab) => sum + tab.count, 0)
    },

    displayData() {
      let data = this.tableData

      // 搜索过滤
      if (this.searchKeyword) {
        const keyword = this.searchKeyword.toLowerCase()
        data = data.filter(item =>
          item.asset_code?.toLowerCase().includes(keyword) ||
          item.asset_name?.toLowerCase().includes(keyword)
        )
      }

      // 错误数据过滤
      if (this.showErrorOnly && this.validations.length > 0) {
        const errorIds = new Set(this.validations.map(v => v.id))
        data = data.filter(item => errorIds.has(item.id))
      }

      return data
    }
  },

  watch: {
    value(val) {
      this.visible = val
      if (val) {
        this.loadData()
      }
    },
    visible(val) {
      this.$emit('input', val)
    }
  },

  methods: {
    // 加载数据
    async loadData() {
      this.loading = true
      try {
        // 先获取 tabs
        const res = await getAssetInfo({ assetIds: this.assetIds })
        this.tabs = res.tabs || []

        // 使用第一个 tab 的 type 获取数据
        if (this.tabs.length > 0) {
          this.activeTab = this.tabs[0].type
          await this.loadTabData(this.activeTab)
        }
      } catch (e) {
        this.$Message.error('加载数据失败')
      } finally {
        this.loading = false
      }
    },

    // 切换页签
    handleTabChange(tabType) {
      if (this.hasModifiedData()) {
        this.$Modal.confirm({
          title: '提示',
          content: '存在未保存数据，切换页签后将丢失，是否继续？',
          onOk: () => {
            this.activeTab = tabType
            this.loadTabData(tabType)
          }
        })
      } else {
        this.activeTab = tabType
        this.loadTabData(tabType)
      }
    },

    // 加载指定页签数据
    async loadTabData(tabType) {
      this.loading = true
      try {
        const res = await getAssetInfo({ assetIds: this.assetIds, tabType })
        this.tableData = res.data || []
        this.fieldConfig = res.fieldConfig || {}
        this.validations = []
        this.showValidationPanel = false
        this.showErrorOnly = false
        this.modifiedData.clear()
      } catch (e) {
        this.$Message.error('加载数据失败')
      } finally {
        this.loading = false
      }
    },

    // 单元格编辑
    async handleCellEdit({ row, field, value }) {
      // 记录修改
      if (!this.modifiedData.has(row.id)) {
        this.modifiedData.set(row.id, {})
      }
      this.modifiedData.get(row.id)[field] = value

      // 调用后端接口获取最新字段配置
      try {
        const res = await save({
          tabType: this.activeTab,
          data: [{ id: row.id, fields: { [field]: value } }]
        })
        if (res.fieldConfig) {
          this.fieldConfig = res.fieldConfig
        }
      } catch (e) {
        // 保存失败不影响编辑
      }
    },

    // 行选择
    handleSelect(selectedRows) {
      this.selectedRows = selectedRows
    },

    // 搜索
    handleSearch(keyword) {
      this.searchKeyword = keyword
    },

    // 导出
    async handleExport() {
      try {
        await exportData({ tabType: this.activeTab })
        this.$Message.success('导出成功')
      } catch (e) {
        this.$Message.error('导出失败')
      }
    },

    // 导入
    handleImport() {
      // 导入逻辑
    },

    // 批量编辑已选资产
    handleBatchEdit() {
      if (this.selectedRows.length === 0) {
        this.$Message.warning('请先选择资产')
        return
      }
      this.$emit('batch-edit', this.selectedRows)
    },

    // 校验
    async handleValidate() {
      this.loading = true
      this.showValidationPanel = true
      try {
        const res = await validate({ tabType: this.activeTab })
        this.validations = res.validations || []
        if (this.validations.length === 0) {
          this.$Message.success('校验通过')
        }
      } catch (e) {
        this.$Message.error('校验失败')
      } finally {
        this.loading = false
      }
    },

    // 切换错误过滤
    handleToggleError(enabled) {
      this.showErrorOnly = enabled
      if (enabled) {
        this.showValidationPanel = true
        if (this.validations.length === 0) {
          // 如果没有校验结果，先执行校验
          this.handleValidate()
        }
      }
    },

    // 跳转到问题行
    handleJumpToRow(validation) {
      const row = this.tableData.find(item => item.id === validation.id)
      if (row) {
        this.$refs.tableRef?.scrollToRow(row)
      }
    },

    // 是否有未保存数据
    hasModifiedData() {
      return this.modifiedData.size > 0
    },

    // 暂存
    async handleSave() {
      if (this.modifiedData.size === 0) {
        this.$Message.info('没有需要保存的数据')
        return
      }

      this.saving = true
      try {
        const data = Array.from(this.modifiedData.entries()).map(([id, fields]) => ({
          id,
          fields
        }))
        await save({ tabType: this.activeTab, data })
        this.$Message.success('保存成功')
        this.modifiedData.clear()
      } catch (e) {
        this.$Message.error('保存失败')
      } finally {
        this.saving = false
      }
    },

    // 确定
    async handleSubmit() {
      // 先暂存
      if (this.hasModifiedData()) {
        await this.handleSave()
      }
      this.$emit('submit', this.tableData)
      this.visible = false
    },

    // 取消
    handleCancel() {
      if (this.hasModifiedData()) {
        this.$Modal.confirm({
          title: '提示',
          content: '退出页面后，未保存数据将丢失，是否确认退出？',
          onOk: () => {
            this.visible = false
          }
        })
      } else {
        this.visible = false
      }
    }
  }
}
</script>

<style lang="less">
.batch-edit-modal {
  .ivu-modal-body {
    height: calc(100vh - 110px);
    padding: 20px;
    display: flex;
    flex-direction: column;
  }

  .batch-edit-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .batch-edit-footer {
    text-align: right;

    .ivu-btn + .ivu-btn {
      margin-left: 8px;
    }
  }
}
</style>
