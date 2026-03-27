/**
 * 批量编辑工具函数
 */

/**
 * 根据字段类型获取编辑组件
 * @param {string} type - 字段类型
 * @returns {string} 组件名
 */
export function getEditComponent(type) {
  const componentMap = {
    Input: 'Input',
    InputNumber: 'InputNumber',
    DatePicker: 'DatePicker',
    TreeList: 'Select',
    InputDepartment: 'Input',
    InputPerson: 'Input'
  }
  return componentMap[type] || 'Input'
}

/**
 * 构建错误映射
 * @param {Array} validations - 校验结果
 * @returns {Object} 错误映射 { 'id_field': message }
 */
export function buildErrorMap(validations) {
  const map = {}
  validations.forEach(v => {
    map[`${v.id}_${v.field}`] = v.message
  })
  return map
}
