<template>
  <div class="left-panel">
    <!-- 操作按钮区 -->
    <div class="operation-bar">
      <Button type="primary" @click="handleAdd">新增</Button>
      <Button @click="handleEdit" :disabled="!currentPlanId">编辑</Button>
      <Button type="primary" @click="handleSave" :disabled="!currentPlanId">保存</Button>
      <Button type="error" @click="handleDelete" :disabled="!currentPlanId">删除</Button>
      <Button @click="handleReset" :disabled="!currentPlanId">重置</Button>
    </div>

    <!-- 方案下拉选择 -->
    <div class="plan-selector">
      <Select v-model="selectedPlanId" placeholder="请选择方案" @on-change="handlePlanChange">
        <Option v-for="plan in planList" :key="plan.id" :value="plan.id">
          {{ plan.planName }}
        </Option>
      </Select>
    </div>

    <!-- 搜索框 -->
    <div class="search-bar">
      <Input
        v-model="searchValue"
        placeholder="搜索资产信息卡"
        clearable
        @on-change="handleSearch"
      >
        <Icon type="ios-search" slot="prefix" />
      </Input>
    </div>

    <!-- 资产信息卡树 -->
    <div class="asset-tree">
      <Tree
        :data="filteredTreeData"
        :render="renderTree"
        @on-select-change="handleTreeSelect"
      ></Tree>
    </div>

    <!-- 新增/编辑弹窗 -->
    <PlanFormModal
      ref="planFormModal"
      :visible="planFormVisible"
      :mode="planFormMode"
      :plan-info="planFormData"
      @ok="handlePlanFormOk"
      @cancel="handlePlanFormCancel"
    />

    <!-- 删除确认弹窗 -->
    <DeleteConfirmModal
      ref="deleteConfirmModal"
      :visible="deleteConfirmVisible"
      :plan-name="currentPlanInfo.planName || ''"
      @ok="handleDeleteConfirmOk"
      @cancel="handleDeleteConfirmCancel"
    />
  </div>
</template>

<script>
import PlanFormModal from './PlanFormModal.vue'
import DeleteConfirmModal from './DeleteConfirmModal.vue'

import { addPlan, updatePlan } from './mock'

export default {
  name: 'LeftPanel',
  components: {
    PlanFormModal,
    DeleteConfirmModal
  },
  props: {
    planList: {
      type: Array,
      default: () => []
    },
    currentPlanId: {
      type: String,
      default: ''
    },
    currentPlanInfo: {
      type: Object,
      default: () => {}
    },
    assetTreeData: {
      type: Array,
      default: () => []
    },
    selectedAssetKey: {
      type: String,
      default: ''
    },
    hasChanges: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      selectedPlanId: '',
      searchValue: '',
      filteredTreeData: [],

      // 新增/编辑弹窗
      planFormVisible: false,
      planFormMode: 'add', // 'add' | 'edit'
      planFormData: {},

      // 删除确认弹窗
      deleteConfirmVisible: false
    }
  },
  watch: {
    currentPlanId: {
      handler(val) {
        this.selectedPlanId = val
      },
      immediate: true
    },
    assetTreeData: {
      handler(val) {
        this.filteredTreeData = JSON.parse(JSON.stringify(val))
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    /**
     * 渲染树节点
     */
    renderTree(h, { data }) {
      return h('span', {
        class: 'tree-node',
        style: {
          display: 'inline-block',
          cursor: 'pointer',
          padding: '4px 8px',
          borderRadius: '4px'
        },
        on: {
          click: () => {
            if (!data.children || data.children.length === 0) {
              // 叶子节点可选
              this.handleTreeSelect([data])
            }
          }
        }
      }, [
        h('span', data.title)
      ])
    },

    /**
     * 树节点选择
     */
    handleTreeSelect(selectedNodes) {
      if (selectedNodes.length > 0) {
        const node = selectedNodes[0]
        // 只允许选择叶子节点
        if (!node.children || node.children.length === 0) {
          this.$emit('asset-select', node.key)
        }
      } else {
        this.$emit('asset-select', '')
      }
    },

    /**
     * 搜索过滤
     */
    handleSearch() {
      if (!this.searchValue) {
        this.filteredTreeData = JSON.parse(JSON.stringify(this.assetTreeData))
        return
      }

      const search = this.searchValue.toLowerCase()

      const filterTree = (nodes) => {
        const result = []
        for (const node of nodes) {
          const matchTitle = node.title.toLowerCase().includes(search)
          let matchChildren = false
          let filteredChildren = []

          if (node.children) {
            filteredChildren = filterTree(node.children)
            matchChildren = filteredChildren.length > 0
          }

          if (matchTitle || matchChildren) {
            result.push({
              ...node,
              children: filteredChildren.length > 0 ? filteredChildren : node.children
            })
          }
        }
        return result
      }

      this.filteredTreeData = filterTree(this.assetTreeData)
    },

    /**
     * 方案切换
     */
    handlePlanChange(planId) {
      this.$emit('plan-change', planId)
    },

    /**
     * 新增
     */
    handleAdd() {
      this.planFormMode = 'add'
      this.planFormData = {}
      this.planFormVisible = true
    },

    /**
     * 编辑
     */
    handleEdit() {
      if (!this.currentPlanId) return

      this.planFormMode = 'edit'
      this.planFormData = { ...this.currentPlanInfo }
      this.planFormVisible = true
    },

    /**
     * 保存
     */
    handleSave() {
      this.$emit('save')
    },

    /**
     * 删除
     */
    handleDelete() {
      if (!this.currentPlanId) return
      this.deleteConfirmVisible = true
    },

    /**
     * 重置
     */
    handleReset() {
      if (!this.currentPlanId) return
      this.$emit('reset')
    },

    /**
     * 方案表单确认
     */
    async handlePlanFormOk(formData) {
      if (this.planFormMode === 'add') {
        // 新增
        const res = await addPlan(formData)
        if (res.code === '0') {
          this.$Message.success('新增成功')
          this.planFormVisible = false
          this.$emit('plan-add-success')
        } else {
          this.$Message.error('新增失败')
        }
      } else {
        // 编辑
        const res = await updatePlan({
          id: this.currentPlanId,
          ...formData
        })
        if (res.code === '0') {
          this.$Message.success('编辑成功')
          this.planFormVisible = false
          this.$emit('plan-update-success')
        } else {
          this.$Message.error('编辑失败')
        }
      }
    },

    /**
     * 方案表单取消
     */
    handlePlanFormCancel() {
      this.planFormVisible = false
    },

    /**
     * 删除确认确认
     */
    handleDeleteConfirmOk() {
      this.deleteConfirmVisible = false
      this.$emit('delete', this.currentPlanId)
    },

    /**
     * 删除确认取消
     */
    handleDeleteConfirmCancel() {
      this.deleteConfirmVisible = false
    }
  }
}
</script>

<style scoped>
.left-panel {
  width: 280px;
  display: flex;
  flex-direction: column;
  background: #fff;
  padding: 16px;
  border-right: 1px solid #e8e8e8;
}

.operation-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 12px;
}

.operation-bar .ivu-btn {
  flex: 1 1 calc(50% - 4px);
  min-width: 0;
}

.plan-selector {
  margin-bottom: 12px;
}

.plan-selector .ivu-select {
  width: 100%;
}

.search-bar {
  margin-bottom: 12px;
}

.search-bar .ivu-input-wrapper {
  width: 100%;
}

.asset-tree {
  flex: 1;
  overflow-y: auto;
}

.tree-node:hover {
  background: #f5f5f5;
}
</style>
