<template>
  <div class="validation-panel">
    <div class="panel-header">
      <span class="panel-title">校验结果</span>
      <span class="error-count" v-if="validations.length > 0">
        共 {{ validations.length }} 条错误
      </span>
      <Button size="small" class="hide-btn" @click="$emit('hide')">隐藏</Button>
    </div>

    <div class="panel-content" v-if="validations.length > 0">
      <Table
        :columns="columns"
        :data="validations"
        height="200"
        size="small"
        @on-row-click="handleRowClick"
      />
    </div>

    <div class="panel-empty" v-else>
      <Icon type="md-checkmark-circle" class="success-icon" />
      <span>校验通过，无错误信息</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ValidationPanel',

  props: {
    validations: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      columns: [
        {
          title: '序号',
          type: 'index',
          width: 100
        },
        {
          title: '错误信息',
          key: 'message',
          ellipsis: true
        },
        {
          title: '所在行',
          key: 'id',
          width: 200,
          render: (h, { row }) => {
            return h('span', `资产编号: ${row.id}`)
          }
        }
      ]
    }
  },

  methods: {
    handleRowClick(row) {
      this.$emit('jump', row)
    }
  }
}
</script>

<style lang="less" scoped>
.validation-panel {
  height: 100%;
  display: flex;
  flex-direction: column;
  border-top: 1px solid #e8e8e8;
  background: #fff;

  .panel-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 16px;
    border-bottom: 1px solid #e8e8e8;

    .panel-title {
      font-weight: 500;
      color: #333;
    }

    .error-count {
      color: #f56c6c;
      font-size: 12px;
    }
  }

  .panel-content {
    flex: 1;
    min-height: 0;
    overflow: hidden;
  }

  .panel-empty {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
    color: #52c41a;

    .success-icon {
      font-size: 20px;
      margin-right: 8px;
    }
  }
}
</style>
