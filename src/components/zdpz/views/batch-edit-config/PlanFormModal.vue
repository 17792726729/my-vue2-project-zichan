<template>
  <Modal
    :value="visible"
    :title="mode === 'add' ? '新增方案' : '编辑方案'"
    :closable="true"
    :mask-closable="false"
    width="480"
    @on-cancel="handleCancel"
    @on-ok="handleOk"
  >
    <Form :model="formData" :label-width="100">
      <FormItem label="方案名称" prop="planName">
        <Input v-model="formData.planName" placeholder="请输入方案名称" />
      </FormItem>

      <FormItem label="业务类型" prop="businessType">
        <Select v-model="formData.businessType" placeholder="请选择业务类型">
          <Option
            v-for="(name, value) in businessTypeList"
            :key="value"
            :value="value"
          >
            {{ name }}
          </Option>
        </Select>
      </FormItem>

      <FormItem label="关联角色" prop="roleCode">
        <Select v-model="formData.roleCode" multiple placeholder="请选择关联角色">
          <Option
            v-for="(name, code) in roleCategoryList"
            :key="code"
            :value="code"
          >
            {{ name }}
          </Option>
        </Select>
      </FormItem>

      <FormItem label="角色代码" prop="roleCodeDetail">
        <Select v-model="formData.roleCodeDetail" multiple placeholder="请选择角色代码">
          <Option
            v-for="item in roleCodeList"
            :key="item.code"
            :value="item.code"
          >
            {{ item.name }}
          </Option>
        </Select>
      </FormItem>

      <FormItem label="单位选择" prop="unitCode">
        <Select v-model="formData.unitCode" multiple placeholder="请选择单位">
          <Option value="unit001">单位001</Option>
          <Option value="unit002">单位002</Option>
          <Option value="unit003">单位003</Option>
        </Select>
      </FormItem>
    </Form>
  </Modal>
</template>

<script>
import { BUSINESS_TYPE, ROLE_CATEGORY } from './constants'

export default {
  name: 'PlanFormModal',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    mode: {
      type: String,
      default: 'add' // 'add' | 'edit'
    },
    planInfo: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      formData: {
        planName: '',
        businessType: '',
        roleCode: [],
        roleCodeDetail: [],
        unitCode: []
      },
      businessTypeList: BUSINESS_TYPE,
      roleCategoryList: ROLE_CATEGORY,
      roleCodeList: [
        { code: 'EVERYONE', name: '所有人' },
        { code: 'SYSTEM', name: '系统管理员' },
        { code: 'XTGLY', name: '系统管理员' },
        { code: 'AQGLY', name: '安全管理员' },
        { code: 'AQSJY', name: '安全审计员' },
        { code: 'XZJC', name: '资产管理行政基层' },
        { code: 'SYJC', name: '资产管理事业基层' },
        { code: 'PTZG', name: '资产管理普通主管' },
        { code: 'ZGBM', name: '资产管理主管部门' },
        { code: 'CZJBR', name: '资产管理财政经办岗' },
        { code: 'CZLD', name: '资产管理财政领导' },
        { code: 'SYR', name: '资产管理使用人' },
        { code: 'EJBMGLY', name: '资产管理二级部门经办岗' },
        { code: 'EJBMFZR', name: '资产管理二级部门审核岗' },
        { code: 'YJBMFZR', name: '资产管理部门审核岗' },
        { code: 'DWGLY', name: '资产管理单位经办岗' },
        { code: 'DWFZR', name: '资产管理单位负责人' },
        { code: 'GKBMGLY', name: '资产管理归口部门审核岗' },
        { code: 'GKBMLD', name: '资产管理归口部门领导' },
        { code: 'KGY', name: '资产管理库管员' },
        { code: 'DWZCFZR', name: '资产管理单位审核岗' },
        { code: 'GKBMSYR', name: '资产管理归口部门经办岗' },
        { code: 'GWCJBR', name: '公物仓审批单位经办岗' },
        { code: 'GWCCZ', name: '公物仓审批单位复审岗' },
        { code: 'GWCJZ', name: '公物仓审批单位终审岗' },
        { code: 'GWCDWGLY', name: '公物仓单位管理员' },
        { code: 'YJBMGLY', name: '资产管理部门经办岗' },
        { code: 'ZCJBG001', name: '资产管理经办岗001' },
        { code: 'PANDWGLY', name: '盘点云管理员' }
      ]
    }
  },
  watch: {
    visible(val) {
      if (val) {
        this.initFormData()
      }
    },
    planInfo: {
      handler(val) {
        if (this.visible && val) {
          this.initFormData()
        }
      },
      deep: true
    }
  },
  methods: {
    /**
     * 初始化表单数据
     */
    initFormData() {
      if (this.mode === 'edit' && this.planInfo) {
        this.formData = {
          planName: this.planInfo.planName || '',
          businessType: this.planInfo.businessType || '',
          roleCode: this.planInfo.roleCode ? this.planInfo.roleCode.split(',') : [],
          roleCodeDetail: [],
          unitCode: this.planInfo.unitCode ? this.planInfo.unitCode.split(',') : []
        }
      } else {
        this.formData = {
          planName: '',
          businessType: '',
          roleCode: [],
          roleCodeDetail: [],
          unitCode: []
        }
      }
    },

    /**
     * 确认
     */
    handleOk() {
      // 表单验证
      if (!this.formData.planName) {
        this.$Message.error('请输入方案名称')
        return false
      }
      if (!this.formData.businessType) {
        this.$Message.error('请选择业务类型')
        return false
      }
      if (!this.formData.roleCode || this.formData.roleCode.length === 0) {
        this.$Message.error('请选择关联角色')
        return false
      }

      // 提交数据
      this.$emit('ok', {
        planName: this.formData.planName,
        businessType: this.formData.businessType,
        roleCode: this.formData.roleCode.join(','),
        unitCode: this.formData.unitCode.join(',')
      })
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
