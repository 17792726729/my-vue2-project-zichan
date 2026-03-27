<template>
  <Modal
    v-model="visible"
    title="批量编辑已选资产"
    width="600"
    @on-ok="handleOk"
    @on-cancel="handleCancel"
  >
    <div class="selected-info">
      已选择 <span class="count">{{ selectedCount }}</span> 条资产
    </div>

    <Form :model="formData" :label-width="120">
      <FormItem label="选择编辑字段">
        <Select v-model="formData.field" placeholder="请选择要批量编辑的字段">
          <Option
            v-for="field in editableFields"
            :key="field.field"
            :value="field.field"
          >
            {{ field.title }}
          </Option>
        </Select>
      </FormItem>

      <FormItem v-if="formData.field" label="字段值">
        <component
          :is="editComponent"
          v-model="formData.value"
          v-bind="editProps"
        />
      </FormItem>
    </Form>
  </Modal>
</template>

<script>
export default {
  name: 'BatchSelectModal',

  props: {
    value: {
      type: Boolean,
      default: false
    },
    selectedCount: {
      type: Number,
      default: 0
    },
    editableFields: {
      type: Array,
      default: () => []
    },
    fieldType: {
      type: String,
      default: 'Input'
    }
  },

  data() {
    return {
      visible: false,
      formData: {
        field: '',
        value: ''
      }
    }
  },

  computed: {
    editComponent() {
      const map = {
        Input: 'Input',
        InputNumber: 'InputNumber',
        DatePicker: 'DatePicker',
        TreeList: 'Select',
        InputDepartment: 'Input',
        InputPerson: 'Input'
      }
      return map[this.fieldType] || 'Input'
    },

    editProps() {
      const field = this.editableFields.find(f => f.field === this.formData.field)
      if (this.fieldType === 'TreeList' || this.fieldType === 'Select') {
        return {
          placeholder: `请选择${field?.title || ''}`
        }
      }
      return {
        placeholder: `请输入${field?.title || ''}`
      }
    }
  },

  watch: {
    value(val) {
      this.visible = val
    },
    visible(val) {
      this.$emit('input', val)
    }
  },

  methods: {
    handleOk() {
      if (!this.formData.field) {
        this.$Message.warning('请选择要编辑的字段')
        return
      }
      this.$emit('confirm', {
        field: this.formData.field,
        value: this.formData.value
      })
      this.visible = false
      this.formData = { field: '', value: '' }
    },

    handleCancel() {
      this.visible = false
      this.formData = { field: '', value: '' }
    }
  }
}
</script>

<style lang="less" scoped>
.selected-info {
  margin-bottom: 16px;
  padding: 8px 12px;
  background: #f5f5f5;
  border-radius: 4px;

  .count {
    color: #1890ff;
    font-weight: bold;
  }
}
</style>
