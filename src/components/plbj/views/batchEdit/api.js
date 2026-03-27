/**
 * 批量编辑 Mock API
 */

// 模拟延迟
const delay = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms))

// Mock 数据
const mockTabs = [
  { type: 'LAND', name: '土地', count: 5 },
  { type: 'BUILDING', name: '建筑物', count: 3 },
  { type: 'VEHICLE', name: '车辆', count: 2 },
  { type: 'EQUIPMENT', name: '设备', count: 8 },
  { type: 'OFFICE', name: '办公家具', count: 12 },
  { type: 'ELECTRONIC', name: '电子设备', count: 15 },
  { type: 'TRANSPORT', name: '运输设备', count: 4 },
  { type: 'MACHINERY', name: '机械设备', count: 6 },
  { type: 'ELECTRICAL', name: '电气设备', count: 7 },
  { type: 'INSTRUMENT', name: '仪器仪表', count: 9 },
  { type: 'FURNITURE', name: '家具', count: 10 },
  { type: 'BOOK', name: '图书档案', count: 20 },
  { type: 'ART', name: '文物陈列品', count: 3 },
  { type: 'PLANT', name: '植物', count: 5 },
  { type: 'STRUCTURE', name: '构筑物', count: 4 },
  { type: 'ROAD', name: '道路桥梁', count: 2 },
  { type: 'DRAINAGE', name: '管渠', count: 3 },
  { type: 'LIGHT', name: '灯光设备', count: 6 },
  { type: 'FIRE', name: '消防设备', count: 8 },
  { type: 'OTHER', name: '其他', count: 10 },
  { type: 'LAND_IMPROVE', name: '土地改良', count: 4 },
  { type: 'SOFTWARE', name: '软件', count: 11 },
  { type: 'LEASEHOLD', name: '土地使用权', count: 3 },
  { type: 'PATENT', name: '专利权', count: 2 },
  { type: 'TRADEMARK', name: '商标权', count: 2 },
  { type: 'COPYRIGHT', name: '著作权', count: 5 },
  { type: 'GOODWILL', name: '商誉', count: 1 },
  { type: 'INTERIOR', name: '装修', count: 7 },
  { type: 'NETWORK', name: '网络设施', count: 6 },
  { type: 'SECURITY', name: '安防设备', count: 4 }
]

const mockFieldConfig = {
  LAND: {
    asset_code: { type: 'Input', editable: false, title: '资产编号' },
    asset_name: { type: 'Input', editable: true, title: '资产名称' },
    obtain_method: { type: 'TreeList', editable: true, title: '取得方式' },
    obtain_date: { type: 'DatePicker', editable: true, title: '取得日期' },
    asset_use_code: { type: 'TreeList', editable: true, title: '资产用途' },
    original_value: { type: 'InputNumber', editable: true, title: '资产原值' },
    net_value: { type: 'InputNumber', editable: false, title: '资产净值' },
    accum_depre: { type: 'InputNumber', editable: false, title: '累计折旧' },
    use_department: { type: 'InputDepartment', editable: true, title: '使用部门' },
    custodian: { type: 'InputPerson', editable: true, title: '保管人员' },
    use_status: { type: 'TreeList', editable: true, title: '使用状态' },
    land_location: { type: 'Input', editable: true, title: '土地坐落' },
    land_area: { type: 'InputNumber', editable: true, title: '土地面积' }
  },
  BUILDING: {
    asset_code: { type: 'Input', editable: false, title: '资产编号' },
    asset_name: { type: 'Input', editable: true, title: '资产名称' },
    obtain_method: { type: 'TreeList', editable: true, title: '取得方式' },
    obtain_date: { type: 'DatePicker', editable: true, title: '取得日期' },
    original_value: { type: 'InputNumber', editable: true, title: '资产原值' },
    net_value: { type: 'InputNumber', editable: false, title: '资产净值' },
    use_department: { type: 'InputDepartment', editable: true, title: '使用部门' }
  },
  VEHICLE: {
    asset_code: { type: 'Input', editable: false, title: '资产编号' },
    asset_name: { type: 'Input', editable: true, title: '资产名称' },
    obtain_method: { type: 'TreeList', editable: true, title: '取得方式' },
    license_plate: { type: 'Input', editable: true, title: '车牌号' },
    use_department: { type: 'InputDepartment', editable: true, title: '使用部门' }
  }
}

// 生成 Mock 表格数据
function generateMockData(tabType, count = 10) {
  const data = []
  for (let i = 0; i < count; i++) {
    const baseData = {
      id: `${tabType}_${i + 1}`,
      asset_code: `${tabType}-${String(i + 1).padStart(4, '0')}`,
      asset_name: `${tabType}资产${i + 1}`
    }

    // 根据类型添加特殊字段
    if (tabType === 'LAND') {
      baseData.land_location = `某省某市某县某街道${i + 1}号`
      baseData.land_area = 1000 + i * 100
      baseData.original_value = 500000 + i * 50000
    } else if (tabType === 'BUILDING') {
      baseData.original_value = 2000000 + i * 100000
    } else if (tabType === 'VEHICLE') {
      baseData.license_plate = `粤B${String(i + 1).padStart(5, '0')}`
    }

    data.push(baseData)
  }
  return data
}

/**
 * 获取资产信息及字段配置
 */
export async function getAssetInfo({ assetIds = [], tabType = '' }) {
  // eslint-disable-next-line no-unused-vars
  assetIds // Mock 暂时未使用
  await delay(500)
  await delay(500)

  // 如果指定了 tabType，返回对应类型数据；否则返回所有
  if (tabType) {
    const config = mockFieldConfig[tabType] || mockFieldConfig.LAND
    return {
      tabs: mockTabs,
      data: generateMockData(tabType, 10),
      fieldConfig: config
    }
  }

  // 返回所有数据（按 tab 分组）
  const allData = {}
  mockTabs.forEach(tab => {
    allData[tab.type] = generateMockData(tab.type, tab.count)
  })

  return {
    tabs: mockTabs,
    data: allData,
    fieldConfig: mockFieldConfig
  }
}

/**
 * 保存（暂存）
 */
export async function save({ tabType, data }) {
  // eslint-disable-next-line no-unused-vars
  data // Mock 暂时未使用
  await delay(300)

  // 模拟返回最新的字段配置
  const config = mockFieldConfig[tabType] || mockFieldConfig.LAND

  return {
    success: true,
    fieldConfig: config
  }
}

/**
 * 校验
 */
export async function validate({ tabType }) {
  await delay(800)

  // 模拟一些校验错误
  const validations = []
  const data = generateMockData(tabType, 10)

  data.forEach((item, index) => {
    // 随机生成一些校验错误
    if (index % 3 === 0) {
      validations.push({
        id: item.id,
        field: 'asset_name',
        message: `资产名称不能为空`
      })
    }
    if (index % 5 === 0) {
      validations.push({
        id: item.id,
        field: 'original_value',
        message: `资产原值不能为负数`
      })
    }
  })

  return {
    validations
  }
}

/**
 * 导出
 */
export async function exportData({ tabType }) {
  await delay(500)

  // 模拟导出 Blob
  const content = '模拟Excel内容'
  const blob = new Blob([content], { type: 'application/vnd.ms-excel' })
  const url = URL.createObjectURL(blob)

  const link = document.createElement('a')
  link.href = url
  link.download = `批量编辑_${tabType}_${Date.now()}.xlsx`
  link.click()

  URL.revokeObjectURL(url)
}

/**
 * 导入
 */
export async function importData(file) {
  // eslint-disable-next-line no-unused-vars
  file // Mock 暂时未使用
  await delay(500)

  return {
    success: true,
    data: [],
    errors: []
  }
}
