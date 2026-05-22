<template>
  <div class="batch-edit-config">
    <LeftPanel
      :plan-list="planList"
      :current-plan-id="currentPlanId"
      :current-plan-info="currentPlanInfo"
      :asset-tree-data="assetTreeData"
      :selected-asset-key="selectedAssetKey"
      :has-changes="hasChanges"
      @plan-change="handlePlanChange"
      @asset-select="handleAssetSelect"
      @add="handleAdd"
      @edit="handleEdit"
      @save="handleSave"
      @delete="handleDelete"
      @reset="handleReset"
    />

    <MiddlePanel
      v-if="selectedAssetKey"
      :field-config-list="fieldConfigList"
      :selected-field-key="selectedFieldKey"
      @field-select="handleFieldSelect"
      @sort-change="handleSortChange"
    />
    <div v-else class="middle-empty">
      <span>请选择资产信息卡</span>
    </div>

    <RightPanel
      v-if="selectedFieldKey"
      :selected-field-config="selectedFieldConfig"
      :field-type="selectedFieldType"
      @config-change="handleConfigChange"
    />
    <div v-else class="right-empty">
      <span>请选择字段</span>
    </div>
  </div>
</template>

<script>
import LeftPanel from './LeftPanel.vue'
import MiddlePanel from './MiddlePanel.vue'
import RightPanel from './RightPanel.vue'

import { getPlanList, getAssetTree, getAssetFields, getPlanDetail, deletePlan, savePlanConfig, resetPlanConfig } from './mock'

export default {
  name: 'BatchEditConfig',
  components: {
    LeftPanel,
    MiddlePanel,
    RightPanel
  },
  data() {
    return {
      // 方案相关
      planList: [],
      currentPlanId: '',
      currentPlanInfo: {},

      // 资产信息卡树
      assetTreeData: [],
      selectedAssetKey: '',

      // 字段配置
      fieldConfigList: {},
      selectedFieldKey: '',
      selectedFieldConfig: {},
      selectedFieldType: '',

      // 是否有未保存的改动
      hasChanges: false,

      // 原始数据备份（用于重置）
      originalFieldConfigList: {}
    }
  },
  created() {
    this.initData()
  },
  methods: {
    /**
     * 初始化数据
     */
    async initData() {
      await this.loadPlanList()
      await this.loadAssetTree()
    },

    /**
     * 加载方案列表
     */
    async loadPlanList() {
      const res = await getPlanList()
      if (res.code === '0') {
        this.planList = res.data || []
      }
    },

    /**
     * 加载资产信息卡树
     */
    async loadAssetTree() {
      const res = await getAssetTree()
      if (res.code === '0') {
        this.assetTreeData = res.data || []
      }
    },

    /**
     * 加载方案详情
     */
    async loadPlanDetail(planId) {
      const res = await getPlanDetail(planId)
      if (res.code === '0' && res.data) {
        this.currentPlanInfo = res.data
      }
    },

    /**
     * 加载资产字段
     */
    async loadAssetFields(cardDefine) {
      const res = await getAssetFields(cardDefine)
      if (res.code === '0') {
        this.fieldConfigList = res.data || {}
        // 备份原始数据
        this.originalFieldConfigList = JSON.parse(JSON.stringify(res.data))
      }
    },

    /**
     * 方案切换
     */
    async handlePlanChange(planId) {
      // 检查是否有未保存的改动
      if (this.hasChange) {
        // TODO: 弹出确认提示
        // const confirmed = await this.showSaveConfirm()
        // if (!confirmed) return
      }

      this.currentPlanId = planId
      this.selectedAssetKey = ''
      this.selectedFieldKey = ''
      this.fieldConfigList = {}
      this.hasChanges = false

      if (planId) {
        await this.loadPlanDetail(planId)
      } else {
        this.currentPlanInfo = {}
      }
    },

    /**
     * 资产信息卡选择
     */
    handleAssetSelect(assetKey) {
      // 检查是否有未保存的改动
      if (this.hasChanges && this.selectedAssetKey !== assetKey) {
        // TODO: 弹出确认提示
      }

      this.selectedAssetKey = assetKey
      this.selectedFieldKey = ''

      if (assetKey) {
        this.loadAssetFields(assetKey)
      } else {
        this.fieldConfigList = {}
      }
    },

    /**
     * 字段选择
     */
    handleFieldSelect(fieldKey, fieldConfig) {
      this.selectedFieldKey = fieldKey
      this.selectedFieldConfig = fieldConfig ? { ...fieldConfig } : {}
      this.selectedFieldType = fieldConfig?.type || ''
    },

    /**
     * 字段配置变更
     */
    handleConfigChange(config) {
      if (this.selectedFieldKey) {
        this.selectedFieldConfig = { ...this.selectedFieldConfig, ...config }
        this.hasChanges = true
      }
    },

    /**
     * 字段排序变更
     */
    handleSortChange() {
      // TODO: 实现字段排序逻辑
      this.hasChanges = true
    },

    /**
     * 新增方案
     */
    handleAdd() {
      // 打开新增弹窗，由LeftPanel处理
    },

    /**
     * 编辑方案
     */
    handleEdit() {
      // 打开编辑弹窗，由LeftPanel处理
    },

    /**
     * 保存方案
     */
    async handleSave() {
      const res = await savePlanConfig({
        planId: this.currentPlanId,
        cardDefine: this.selectedAssetKey,
        fieldConfig: this.fieldConfigList
      })

      if (res.code === '0') {
        this.$Message.success('保存成功')
        this.hasChanges = false
        // 刷新方案列表
        await this.loadPlanList()
      } else {
        this.$Message.error('保存失败')
      }
    },

    /**
     * 删除方案
     */
    async handleDelete(planId) {
      const res = await deletePlan(planId)

      if (res.code === '0') {
        this.$Message.success('删除成功')
        this.currentPlanId = ''
        this.currentPlanInfo = {}
        this.selectedAssetKey = ''
        this.selectedFieldKey = ''
        this.fieldConfigList = {}
        this.hasChanges = false
        // 刷新方案列表
        await this.loadPlanList()
      } else {
        this.$Message.error('删除失败')
      }
    },

    /**
     * 重置方案
     */
    async handleReset() {
      const res = await resetPlanConfig(this.currentPlanId)

      if (res.code === '0') {
        this.$Message.success('重置成功')
        this.hasChanges = false
        // 重新加载字段配置
        if (this.selectedAssetKey) {
          await this.loadAssetFields(this.selectedAssetKey)
        }
      } else {
        this.$Message.error('重置失败')
      }
    },

    /**
     * 新增方案成功回调
     */
    async handleAddPlanSuccess() {
      await this.loadPlanList()
    },

    /**
     * 编辑方案成功回调
     */
    async handleUpdatePlanSuccess() {
      await this.loadPlanList()
      await this.loadPlanDetail(this.currentPlanId)
    }
  }
}
</script>

<style scoped>
.batch-edit-config {
  display: flex;
  width: 100%;
  height: 100%;
  background: #f5f5f5;
}

.middle-empty,
.right-empty {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  margin-left: 10px;
  color: #999;
  font-size: 14px;
}
</style>
