<template>
  <Modal
    v-model="visible"
    title="列编辑"
    width="500"
    @on-ok="handleOk"
    @on-cancel="handleCancel"
  >
    <Form :model="formData" :label-width="100">
      <FormItem label="编辑字段">
        <Select v-model="formData.field" disabled>
          <Option :value="field">{{ fieldTitle }}</Option>
        </Select>
      </FormItem>
      <FormItem label="字段值">
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
  name: 'ColumnEditModal',

  props: {
    value: {
      type: Boolean,
      default: false
    },
    field: {
      type: String,
      default: ''
    },
    fieldTitle: {
      type: String,
      default: ''
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
      if (this.fieldType === 'TreeList' || this.fieldType === 'Select') {
        return {
          placeholder: `请选择${this.fieldTitle}`
        }
      }
      return {
        placeholder: `请输入${this.fieldTitle}`
      }
    }
  },

  watch: {
    value(val) {
      this.visible = val
    },
    visible(val) {
      this.$emit('input', val)
    },
    field(val) {
      this.formData.field = val
    }
  },

  methods: {
    handleOk() {
      this.$emit('confirm', {
        field: this.formData.field,
        value: this.formData.value
      })
      this.visible = false
    },

    handleCancel() {
      this.visible = false
    }
  }
}
</script>
