<template>
  <div class="batch-edit-toolbar">
    <div class="toolbar-left">
      <span class="total-count">信息卡总数 {{ total }} 张</span>
    </div>

    <div class="toolbar-center">
      <Input
        v-model="searchKeyword"
        placeholder="资产编号/资产名称搜索"
        style="width: 200px"
        clearable
        @on-change="handleSearchChange"
      />

      <i-switch
        v-model="showErrorOnly"
        :disabled="loading"
        @on-change="handleToggleError"
      >
        <span slot="open">只显示错误</span>
        <span slot="close">显示全部</span>
      </i-switch>
    </div>

    <div class="toolbar-right">
      <Button @click="handleExport">
        <Icon type="ios-download-outline" />
        导出
      </Button>

      <Upload
        :action="uploadUrl"
        :show-upload-list="false"
        :on-success="handleUploadSuccess"
        :on-error="handleUploadError"
        accept=".xlsx,.xls"
      >
        <Button>
          <Icon type="ios-upload-outline" />
          导入
        </Button>
      </Upload>

      <Button type="primary" @click="handleBatchEdit">
        <Icon type="edit" />
        批量编辑已选资产
      </Button>

      <Button type="primary" :loading="loading" @click="handleValidate">
        <Icon type="md-checkmark-circle-outline" />
        当前页签数据校验
      </Button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BatchEditToolbar',

  props: {
    total: {
      type: Number,
      default: 0
    },
    loading: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      searchKeyword: '',
      showErrorOnly: false,
      uploadUrl: '/api/batchEdit/import'
    }
  },

  methods: {
    handleSearchChange() {
      this.$emit('search', this.searchKeyword)
    },

    handleToggleError(enabled) {
      this.$emit('toggle-error', enabled)
    },

    handleExport() {
      this.$emit('export')
    },

    handleUploadSuccess(res) {
      if (res.success) {
        this.$Message.success('导入成功')
        this.$emit('import-success')
      } else {
        this.$Message.error(res.message || '导入失败')
      }
    },

    handleUploadError() {
      this.$Message.error('导入失败')
    },

    handleBatchEdit() {
      this.$emit('batch-edit')
    },

    handleValidate() {
      this.$emit('validate')
    }
  }
}
</script>

<style lang="less" scoped>
.batch-edit-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: #fff;
  border-bottom: 1px solid #e8e8e8;
  margin-bottom: 10px;

  .toolbar-left {
    .total-count {
      font-size: 14px;
      color: #333;
    }
  }

  .toolbar-center {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .toolbar-right {
    display: flex;
    align-items: center;
    gap: 8px;
  }
}
</style>
