import { validateKey } from '@/utils/validate.js'

export const queryItems = [
  { type: 'Select', label: '仓库编码', prop: 'warehouseID', options: [] },
  { type: 'Input', label: '码头编号', prop: 'wharfID' },
  { type: 'Input', label: '码头名称', prop: 'wharfName' },
  { type: 'Select', label: '码头类型', prop: 'wharfType', options: [] }
]

export const FormItems = [
  { type: 'Input', label: '来源码头', prop: 'fromWharfs' },
  { type: 'Input', label: '线体编号', prop: 'lineID' },
  { type: 'Input', label: '线体名称', prop: 'lineName' },
  { type: 'Input', label: '产线', prop: 'lineCodes' },
  { type: 'Input', label: '托盘状态', prop: 'boxState' },
  { type: 'Input', label: '工艺状态', prop: 'stationStates' },
  { type: 'Input', label: '当前工艺', prop: 'stationCodesNow' },
  { type: 'Input', label: '下工艺', prop: 'stationCodesNext' },
  { type: 'Input', label: '产品类型', prop: 'productCodes' },
  {
    type: 'Select',
    label: '启用',
    prop: 'line_Enabel',
    options: [
      { value: true, label: '是' },
      { value: false, label: '否' }
    ]
  }
]

export const formList = [
  {
    type: 'Input',
    label: '线体编号',
    prop: 'lineID',
    unique: true,
    rules: [
      { required: true, message: '请输入【线体编号】', trigger: 'blur' },
      { addOnly: true, trigger: 'blur', tableName: 'WH_ConveyerLine', validator: validateKey }
    ]
  },
  {
    type: 'Input',
    label: '线体名称',
    prop: 'lineName',
    rules: [{ required: true, message: '请输入【线体名称】', trigger: 'blur' }]
  },
  {
    type: 'Select',
    label: '处理方式',
    prop: 'dealWay',
    options: [],
    rules: [{ required: true, message: '请选择【处理方式】', trigger: 'blur' }]
  },
  {
    type: 'Combogrid',
    label: '来源码头',
    prop: 'fromWharfs',
    options: [],
    count: 10,
    optTotal: '',
    remote: true,
    optLabel: 'wharfID',
    optValue: 'wharfID',
    col: [
      { label: '码头编号', prop: 'wharfID' },
      { label: '码头名称', prop: 'wharfName' }
    ]
  },
  { type: 'Input', label: '下一码头', prop: 'nextWharfs' },
  { type: 'Input', label: '设备编号', prop: 'lineDeviceID' },
  {
    type: 'Select',
    label: '不计缓存',
    prop: 'notCalCatch',
    options: [
      { value: true, label: '是' },
      { value: false, label: '否' }
    ]
  },
  {
    type: 'Combogrid',
    label: '缓存位',
    prop: 'lineCacheID',
    options: [],
    count: 10,
    optTotal: '',
    remote: true,
    optLabel: 'lineCacheId',
    optValue: 'lineCacheId',
    col: [
      { label: '缓存位编号', prop: 'lineCacheId' },
      { label: '缓存位名称', prop: 'lineCacheName' }
    ]
  },
  // { type: 'Input', label: '托盘尺寸', prop: 'boxSize' },
  { type: 'Input', label: '当前站点s', prop: 'stationCodesNow' },
  { type: 'Input', label: '下一站点s', prop: 'stationCodesNext' },
  // { type: 'Input', label: '产品类型s', prop: 'productCodes' }
  // { type: 'Input', label: '产线s', prop: 'lineCodes' },
  // { type: 'Input', label: '工艺状态s', prop: 'stationStates' },
  { type: 'Select', label: '空盘/实盘', prop: 'boxState', options: [] },
  {
    type: 'Select',
    label: '托盘类型',
    prop: 'boxType',
    options: []
  },
  { type: 'Input', label: '托盘正则', prop: 'boxIdRules' },
  { type: 'Number', label: '优先级', prop: 'priority', min: 0 },
  { type: 'Textarea', label: '关联缓存位公式', prop: 'cal_LinkCaches', width: '100%' },
  {
    type: 'Select',
    label: '是否启用',
    prop: 'line_Enabel',
    options: [
      { value: true, label: '是' },
      { value: false, label: '否' }
    ],
    rules: [{ required: true, message: '请选择【是否启用】', trigger: 'blur' }]
  },
  { type: 'Select', label: '入库货位分配', prop: 'in_AllocationLoca', options: [] },
  {
    type: 'Select',
    label: '必须有出库时间',
    prop: 'mustHasOutTime',
    options: [
      { value: true, label: '是' },
      { value: false, label: '否' }
    ],
    rules: [{ required: true, message: '提示:非检测柜的工艺出库必须选择【是】', trigger: 'blur' }]
  },
  {
    type: 'Select',
    label: '关联堆垛机',
    prop: 'linkStackerCode',
    options: []
  },
  // { type: 'Input', label: '托盘数量', prop: 'boxCount' },
  { type: 'Select', label: '关联仓库s（出入库）', prop: 'linkWarehouseID' },
  { type: 'Select', label: '旋转状态', prop: 'productCodes' },
  { type: 'Select', label: '关联满仓库不出库', prop: 'linkFullWarehouseID' },
  { type: 'Input', label: '混库站点', prop: 'jzUseStationCode' },
  { type: 'Input', label: '入库码头', prop: 'inStockWharf' },
  { type: 'Textarea', label: '报错信息', prop: 'errorInfos' }

]

export const column = [
  { prop: 'wharfID', label: '码头编号', sortAble: true },
  { prop: 'wharfName', label: '码头名称', sortAble: true },
  { prop: 'wharfType', label: '码头类型', sortAble: true },
  { prop: 'wharfLocationId', label: '库位号', sortAble: true }
]
export const detailCol = [
  { prop: 'lineID', label: '线体编号', sortAble: true },
  { prop: 'lineName', label: '线体名称', sortAble: true },
  { prop: 'dealWay', label: '处理方式', sortAble: true },
  { prop: 'fromWharfs', label: '来源码头', sortAble: true }
]

// 权限
// export const DictCrud = {
//   add: 'Systems.DataDictionary.Create',
//   edit: 'Systems.DataDictionary.Update',
//   del: 'Systems.DataDictionary.Delete'
// }
// export const DictDetailCrud = {
//   add: 'Systems.DataDictionary.Create',
//   // save: 'Systems.DataDictionary.Update',
//   del: 'Systems.DataDictionary.Delete',
//   reset: 'Systems.DataDictionary.Create',
//   edit: 'Systems.DataDictionary.Update'
// }
export const DictDetailCrud = {
  add: 'WarehouseManagement.ConveyerLine.Create',
  edit: 'WarehouseManagement.ConveyerLine.Update',
  del: 'WarehouseManagement.ConveyerLine.Delete'
}
