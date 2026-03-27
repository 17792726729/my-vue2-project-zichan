<template>
  <Modal
    :value="visible"
    title="删除确认"
    :closable="true"
    :mask-closable="false"
    width="400"
    @on-cancel="handleCancel"
    @on-ok="handleOk"
  >
    <div style="text-align: center; padding: 20px 0;">
      <Icon type="ios-warning" size="48" color="#ed4014" />
      <p style="margin-top: 16px; font-size: 14px;">
        确定要删除方案 "<strong>{{ planName }}</strong>" 吗？
      </p>
      <p style="margin-top: 8px; color: #999; font-size: 12px;">
        删除后不可恢复
      </p>
    </div>
  </Modal>
</template>

<script>
export default {
  name: 'DeleteConfirmModal',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    planName: {
      type: String,
      default: ''
    }
  },
  methods: {
    /**
     * 确认
     */
    handleOk() {
      this.$emit('ok')
    },

    /**
     * 取消
     */
    handleCancel() {
      this.$emit('cancel')
    }
  }
}
</script>

<style scoped>
</style>
