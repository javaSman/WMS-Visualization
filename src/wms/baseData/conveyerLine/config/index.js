import { validateKey } from '@/utils/validate.js'

export const queryItems = [
  { type: 'Input', label: '来源码头', prop: 'fromWharfs' },
  { type: 'Input', label: '线体编号', prop: 'lineID' },
  { type: 'Input', label: '主体线体编号', prop: 'masterLineId' },
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
  { type: 'Input', label: '来源码头s', prop: 'fromWharfs'},
  { type: 'Input', label: '主体线体编号', prop: 'masterLineId'},
  { type: 'Input', label: '下一码头', prop: 'nextWharfs'},
  { type: 'Input', label: '设备编号', prop: 'lineDeviceID' },
  // { type: 'Number', label: '当前缓存', prop: 'currentCach', min: 0 },
  // {
  //  type: 'Number',
  //  label: '最大缓存',
  //  prop: 'maxCach',
  //  min: 0,
  //  rules: [
  //    { required: true, message: '请输入最大缓存', trigger: 'blur' },
  //    { pattern: /^[1-9]*[1-9][0-9]*$/, message: '请输入大于0的数', trigger: 'blur' }
  //  ]
  // },
  { type: 'Input', label: '当前站点s', prop: 'stationCodesNow' },
  { type: 'Input', label: '下一站点s', prop: 'stationCodesNext' },
  // { type: 'Input', label: '产品类型s', prop: 'productCodes' },
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
  { type: 'Input', label: '条码队列', prop: 'currentBarCodes' },
  { type: 'Number', label: '优先级', prop: 'priority', min: 0 },
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
  { type: 'Input', label: '关联仓库（入库）', prop: 'linkWarehouseID' },
  { type: 'Textarea', label: '报错信息', prop: 'errorInfos' }
]

export const conveyerLineCrud = {
  add: 'WarehouseManagement.ConveyerLine.Create',
  edit: 'WarehouseManagement.ConveyerLine.Update',
  del: 'WarehouseManagement.ConveyerLine.Delete'
}
