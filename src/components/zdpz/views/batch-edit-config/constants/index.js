/**
 * 字段配置功能常量定义
 */

/**
 * 业务类型
 */
export const BUSINESS_TYPE = {
  '1': '一般信息变动',
  '2': '重要信息变动',
  '3': '分类信息变动',
  '4': '资产验收',
  '5': '资产信息卡拆分',
  '6': '改扩建',
  '7': '在建工程转固',
  '11': '公物仓一般信息变动',
  '12': '公物仓重要信息变动',
  '13': '公物仓分类信息变动',
  '14': '公物仓资产验收',
  '15': '公物仓资产信息卡拆分',
  '16': '公物仓改扩建',
  '17': '公物仓在建工程转固'
}

/**
 * 字段分组
 */
export const FIELD_GROUP = {
  BASE: '基本信息',      // 基本信息
  FINANCE: '财务信息',    // 财务信息
  USE: '使用信息',        // 使用信息
  SPECIAL: '特殊信息',    // 特殊信息
  DISPOSE: '处置信息'     // 处置信息
}

/**
 * 字段分组对应的key
 */
export const FIELD_GROUP_KEY = {
  BASE: 'baseFields',
  FINANCE: 'financeFields',
  USE: 'useFields',
  SPECIAL: 'specialFields',
  DISPOSE: 'disposeFields'
}

/**
 * 字段类型
 */
export const FIELD_TYPE = {
  INPUT: 'Input',                      // 字符串输入框
  INPUT_NUMBER: 'InputNumber',          // 数值输入框
  DATE_PICKER: 'DatePicker',           // 日期选择
  BASE_DATA_TREE: 'gms-basedata-treelist',  // 基础数据树形
  INPUT_DEPARTMENT: 'InputDepartment', // 部门主数据
  INPUT_DEPOSITARY: 'InputDepositary', // 保管机构主数据
  INPUT_PERSON: 'InputPerson'          // 人员主数据
}

/**
 * 角色大类
 */
export const ROLE_CATEGORY = {
  CZJBR: '资产管理财政经办岗',
  CZLD: '资产管理财政领导',
  EJBMGLY: '资产管理二级部门经办岗',
  EJBMFZR: '资产管理二级部门审核岗',
  YJBMFZR: '资产管理部门审核岗',
  DWGLY: '资产管理单位经办岗',
  DWFZR: '资产管理单位负责人',
  XTGLY: '系统管理员',
  SYR: '资产管理使用人'
}

/**
 * 资产分类
 */
export const ASSET_CATEGORY = {
  TD: '土地',
  FW: '房屋',
  CL: '车辆',
  SBJJJ: '设备及家具',
  QTGDZC: '其他固定资产',
  ZJGC: '在建工程',
  ZLJZJXX: '专利及信息数据',
  JTGG: '交通公共基础设施',
  SLGG: '水利公共基础设施',
  SZGG: '市政公共基础设施',
  QTGG: '其他公共基础设施',
  ZFCB: '政府储备物资',
  WWWH: '文物文化',
  BZXZF: '保障性住房',
  CQTZ: '长期投资',
  PPP: 'PPP项目资产',
  SJZC: '数据资产'
}

/**
 * 卡片定义
 */
export const CARD_DEFINE = {
  TD: 'com.jiuqi.np.gams2.core.bas_asset_td',        // 土地
  QTGGJCSS: 'com.jiuqi.np.gams2.core.bas_asset_qtggjcss', // 其他公共基础设施
  ZLZCHOUSE: 'com.jiuqi.np.gams2.core.bas_asset_zlzchouse', // 租赁房屋
  ZLZCTD: 'com.jiuqi.np.gams2.core.bas_asset_zlzctd', // 租赁土地
  ZFCBWZ: 'com.jiuqi.np.gams2.core.bas_asset_zfcbwz', // 政府储备物资
  WWWWH: 'com.jiuqi.np.gams2.core.bas_asset_wwwh',   // 文物文化
  BZXZF: 'com.jiuqi.np.gams2.core.bas_asset_bzxzf',  // 保障性住房
  ZJGC: 'com.jiuqi.np.gams2.core.bas_asset_zjgc',   // 在建工程
  CQTZ: 'com.jiuqi.np.gams2.core.bas_asset_cqtz',   // 长期投资
  PPP: 'com.jiuqi.np.gams2.core.bas_asset_ppp',      // PPP项目资产
  SJZC: 'com.jiuqi.np.gams2.core.bas_asset_sjzc',    // 数据资产
  FW: 'com.jiuqi.np.gams2.core.bas_asset_fw',        // 房屋
  CL: 'com.jiuqi.np.gams2.core.bas_asset_cl',        // 车辆
  SBJJJ: 'com.jiuqi.np.gams2.core.bas_asset_sbjjj',  // 设备及家具
  QTGDZC: 'com.jiuqi.np.gams2.core.bas_asset_qtgdzc', // 其他固定资产
  ZLJXXSJ: 'com.jiuqi.np.gams2.core.bas_asset_zljxxsj', // 专利及信息数据
  JTGGJCSS: 'com.jiuqi.np.gams2.core.bas_asset_jtggjcss', // 交通公共基础设施
  SLGGJCSS: 'com.jiuqi.np.gams2.core.bas_asset_slggjcss', // 水利公共基础设施
  SZGGJCSS: 'com.jiuqi.np.gams2.core.bas_asset_szggjcss'  // 市政公共基础设施
}

/**
 * 卡片定义名称映射
 */
export const CARD_DEFINE_NAME = {
  'com.jiuqi.np.gams2.core.bas_asset_td': '土地',
  'com.jiuqi.np.gams2.core.bas_asset_qtggjcss': '其他公共基础设施',
  'com.jiuqi.np.gams2.core.bas_asset_zlzchouse': '租赁房屋',
  'com.jiuqi.np.gams2.core.bas_asset_zlzctd': '租赁土地',
  'com.jiuqi.np.gams2.core.bas_asset_zfcbwz': '政府储备物资',
  'com.jiuqi.np.gams2.core.bas_asset_wwwh': '文物文化',
  'com.jiuqi.np.gams2.core.bas_asset_bzxzf': '保障性住房',
  'com.jiuqi.np.gams2.core.bas_asset_zjgc': '在建工程',
  'com.jiuqi.np.gams2.core.bas_asset_cqtz': '长期投资',
  'com.jiuqi.np.gams2.core.bas_asset_ppp': 'PPP项目资产',
  'com.jiuqi.np.gams2.core.bas_asset_sjzc': '数据资产',
  'com.jiuqi.np.gams2.core.bas_asset_fw': '房屋',
  'com.jiuqi.np.gams2.core.bas_asset_cl': '车辆',
  'com.jiuqi.np.gams2.core.bas_asset_sbjjj': '设备及家具',
  'com.jiuqi.np.gams2.core.bas_asset_qtgdzc': '其他固定资产',
  'com.jiuqi.np.gams2.core.bas_asset_zljxxsj': '专利及信息数据',
  'com.jiuqi.np.gams2.core.bas_asset_jtggjcss': '交通公共基础设施',
  'com.jiuqi.np.gams2.core.bas_asset_slggjcss': '水利公共基础设施',
  'com.jiuqi.np.gams2.core.bas_asset_szggjcss': '市政公共基础设施'
}
