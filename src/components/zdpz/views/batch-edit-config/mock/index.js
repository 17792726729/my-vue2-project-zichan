/**
 * Mock数据
 * 后端接口开发完成后，将替换为真实的GAMS.Util.invokeServer调用
 */

import { ASSET_CATEGORY } from '../constants'

/**
 * 模拟延迟
 */
const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms))

/**
 * 方案列表Mock数据
 */
const mockPlanList = [
  {
    id: 'plan001',
    planCode: 'PLAN001',
    planName: '财政经办岗-一般信息变动',
    businessType: '1',
    roleCode: 'CZJBR',
    unitCode: 'unit001,unit002'
  },
  {
    id: 'plan002',
    planCode: 'PLAN002',
    planName: '财政领导-重要信息变动',
    businessType: '2',
    roleCode: 'CZLD',
    unitCode: 'unit001'
  },
  {
    id: 'plan003',
    planCode: 'PLAN003',
    planName: '测试方案',
    businessType: '4',
    roleCode: 'CZJBR,CZLD',
    unitCode: 'unit001,unit003'
  }
]

/**
 * 资产信息卡树Mock数据
 */
const mockAssetTree = [
  {
    title: ASSET_CATEGORY.TD,
    key: 'TD',
    children: [
      { title: '土地', key: 'com.jiuqi.np.gams2.core.bas_asset_td' },
      { title: '租赁土地', key: 'com.jiuqi.np.gams2.core.bas_asset_zlzctd' }
    ]
  },
  {
    title: ASSET_CATEGORY.FW,
    key: 'FW',
    children: [
      { title: '房屋', key: 'com.jiuqi.np.gams2.core.bas_asset_fw' },
      { title: '租赁房屋', key: 'com.jiuqi.np.gams2.core.bas_asset_zlzchouse' }
    ]
  },
  {
    title: ASSET_CATEGORY.CL,
    key: 'CL',
    children: [
      { title: '车辆', key: 'com.jiuqi.np.gams2.core.bas_asset_cl' }
    ]
  },
  {
    title: ASSET_CATEGORY.SBJJJ,
    key: 'SBJJJ',
    children: [
      { title: '设备及家具', key: 'com.jiuqi.np.gams2.core.bas_asset_sbjjj' }
    ]
  },
  {
    title: ASSET_CATEGORY.QTGDZC,
    key: 'QTGDZC',
    children: [
      { title: '其他固定资产', key: 'com.jiuqi.np.gams2.core.bas_asset_qtgdzc' }
    ]
  }
]

/**
 * 资产字段Mock数据
 */
const mockAssetFields = {
  'com.jiuqi.np.gams2.core.bas_asset_td': {
    baseFields: [
      { field: 'asset_code', title: '资产编号', type: 'Input', group: 'BASE' },
      { field: 'asset_name', title: '资产名称', type: 'Input', group: 'BASE' },
      { field: 'obtain_method', title: '取得方式', type: 'gms-basedata-treelist', group: 'BASE' },
      { field: 'obtain_date', title: '取得日期', type: 'DatePicker', group: 'BASE' },
      { field: 'asset_use_code', title: '资产用途', type: 'gms-basedata-treelist', group: 'BASE' }
    ],
    financeFields: [
      { field: 'original_value', title: '资产原值', type: 'InputNumber', group: 'FINANCE' },
      { field: 'net_value', title: '资产净值', type: 'InputNumber', group: 'FINANCE' },
      { field: 'accum_depre', title: '累计折旧', type: 'InputNumber', group: 'FINANCE' }
    ],
    useFields: [
      { field: 'use_department', title: '使用部门', type: 'InputDepartment', group: 'USE' },
      { field: 'custodian', title: '保管人员', type: 'InputPerson', group: 'USE' },
      { field: 'use_status', title: '使用状态', type: 'gms-basedata-treelist', group: 'USE' }
    ],
    specialFields: [
      { field: 'land_location', title: '土地坐落', type: 'Input', group: 'SPECIAL' },
      { field: 'land_area', title: '土地面积', type: 'InputNumber', group: 'SPECIAL' }
    ],
    disposeFields: [
      { field: 'dispose_method', title: '处置方式', type: 'gms-basedata-treelist', group: 'DISPOSE' },
      { field: 'dispose_date', title: '处置日期', type: 'DatePicker', group: 'DISPOSE' }
    ]
  },
  'com.jiuqi.np.gams2.core.bas_asset_fw': {
    baseFields: [
      { field: 'asset_code', title: '资产编号', type: 'Input', group: 'BASE' },
      { field: 'asset_name', title: '资产名称', type: 'Input', group: 'BASE' },
      { field: 'obtain_method', title: '取得方式', type: 'gms-basedata-treelist', group: 'BASE' },
      { field: 'obtain_date', title: '取得日期', type: 'DatePicker', group: 'BASE' }
    ],
    financeFields: [
      { field: 'original_value', title: '资产原值', type: 'InputNumber', group: 'FINANCE' },
      { field: 'net_value', title: '资产净值', type: 'InputNumber', group: 'FINANCE' }
    ],
    useFields: [
      { field: 'use_department', title: '使用部门', type: 'InputDepartment', group: 'USE' },
      { field: 'building_area', title: '建筑面积', type: 'InputNumber', group: 'USE' }
    ],
    specialFields: [
      { field: 'building_address', title: '房屋地址', type: 'Input', group: 'SPECIAL' }
    ],
    disposeFields: []
  },
  'com.jiuqi.np.gams2.core.bas_asset_cl': {
    baseFields: [
      { field: 'asset_code', title: '资产编号', type: 'Input', group: 'BASE' },
      { field: 'asset_name', title: '资产名称', type: 'Input', group: 'BASE' },
      { field: 'plate_number', title: '车牌号', type: 'Input', group: 'BASE' }
    ],
    financeFields: [
      { field: 'original_value', title: '资产原值', type: 'InputNumber', group: 'FINANCE' }
    ],
    useFields: [
      { field: 'use_department', title: '使用部门', type: 'InputDepartment', group: 'USE' }
    ],
    specialFields: [
      { field: 'vehicle_model', title: '车辆型号', type: 'Input', group: 'SPECIAL' }
    ],
    disposeFields: []
  }
}

/**
 * 获取方案列表
 */
export function getPlanList() {
  return delay().then(() => ({
    code: '0',
    data: [...mockPlanList],
    message: 'success'
  }))
}

/**
 * 获取方案详情
 */
export function getPlanDetail(planId) {
  return delay().then(() => {
    const plan = mockPlanList.find(p => p.id === planId)
    return {
      code: '0',
      data: plan ? { ...plan } : null,
      message: 'success'
    }
  })
}

/**
 * 新增方案
 */
export function addPlan(params) {
  return delay().then(() => {
    const newPlan = {
      id: 'plan' + Date.now(),
      planCode: params.planCode,
      planName: params.planName,
      businessType: params.businessType,
      roleCode: params.roleCode,
      unitCode: params.unitCode
    }
    mockPlanList.push(newPlan)
    return {
      code: '0',
      data: { id: newPlan.id },
      message: 'success'
    }
  })
}

/**
 * 编辑方案
 */
export function updatePlan(params) {
  return delay().then(() => {
    const index = mockPlanList.findIndex(p => p.id === params.id)
    if (index !== -1) {
      mockPlanList[index] = { ...mockPlanList[index], ...params }
    }
    return {
      code: '0',
      message: 'success'
    }
  })
}

/**
 * 删除方案
 */
export function deletePlan(planId) {
  return delay().then(() => {
    const index = mockPlanList.findIndex(p => p.id === planId)
    if (index !== -1) {
      mockPlanList.splice(index, 1)
    }
    return {
      code: '0',
      message: 'success'
    }
  })
}

/**
 * 获取资产信息卡树
 */
export function getAssetTree() {
  return delay().then(() => ({
    code: '0',
    data: [...mockAssetTree],
    message: 'success'
  }))
}

/**
 * 获取资产字段列表
 */
export function getAssetFields(cardDefine) {
  return delay().then(() => {
    const fields = mockAssetFields[cardDefine] || {
      baseFields: [],
      financeFields: [],
      useFields: [],
      specialFields: [],
      disposeFields: []
    }
    return {
      code: '0',
      data: fields,
      message: 'success'
    }
  })
}

/**
 * 保存方案配置
 */
export function savePlanConfig() {
  return delay().then(() => ({
    code: '0',
    message: 'success'
  }))
}

/**
 * 重置方案配置
 */
export function resetPlanConfig() {
  return delay().then(() => ({
    code: '0',
    message: 'success'
  }))
}

/**
 * 获取默认字段配置（用于重置）
 */
export function getDefaultFieldConfig(cardDefine) {
  return delay().then(() => {
    const fields = mockAssetFields[cardDefine] || {
      baseFields: [],
      financeFields: [],
      useFields: [],
      specialFields: [],
      disposeFields: []
    }
    return {
      code: '0',
      data: fields,
      message: 'success'
    }
  })
}
