import { validateKey } from '@/utils/validate.js'

export const boxQueryItems = [
  { type: 'BatchInput', label: '托盘编号', prop: 'BoxID' },
  // { type: 'Input', label: '来源单号', prop: 'SourceID' },
  { type: 'Select', label: '托盘类型', prop: 'boxType', options: [] },
  { type: 'Select', label: '托盘装载状态', prop: 'boxState', options: [] }
  // { type: 'Select', label: '箱子位置状态', prop: 'positionStatus', options: [] }
]
export const materialQueryItems = [
  { type: 'Input', label: '物料编号', prop: 'MaterialID' },
  { type: 'Input', label: '物料名称', prop: 'MaterialDesc' },
  { type: 'Select', label: '物料类型', prop: 'MaterialType', options: [] }
]
export const boxFormList = [
  {
    type: 'Input',
    label: '托盘编号',
    prop: 'boxID',
    unique: true,
    rules: [
      { required: true, message: '请输入托盘编号', trigger: 'blur' },
      { addOnly: true, trigger: 'blur', tableName: 'WH_Box', validator: validateKey }
    ]
  },
  {
    type: 'Select',
    label: '托盘类型',
    prop: 'boxType',
    options: [],
    rules: [{ required: true, message: '请选择托盘类型', trigger: 'blur' }]
  },
  {
    type: 'Select',
    label: '托盘装载状态',
    prop: 'boxState',
    options: [],
    rules: [{ required: true, message: '请选择托盘装载状态', trigger: 'blur' }]
  },
  {
    type: 'Select',
    label: '当前站点',
    prop: 'stationCodeNow',
    options: []
  },
  {
    type: 'Select',
    label: '下一站点',
    prop: 'stationCodeNext',
    options: []
  },
  {
    type: 'Select',
    label: '动作状态',
    prop: 'materialState',
    options: []
  },
  {
    type: 'Select',
    label: '混库站点',
    prop: 'jzUseStationCode',
    options: []
  }
]

export const boxTableList = [
  { label: '物料编号', prop: 'materialID' },
  { label: '物料描述', prop: 'materialDesc' },
  {
    label: '数量',
    prop: 'quantity',
    type: 'colType/Number',
    width: '150px',
    required: true,
    rules: [{ required: true, message: '请输入数量' }]
  },
  {
    label: '物料条码',
    prop: 'barcode',
    type: 'colType/Input',
    required: true,
    rules: [{ required: true, message: '请输入物料条码' }]
  },
  { label: '批次', prop: 'batchID', type: 'colType/Input' }
]

export const batchFormList = [
  {
    type: 'Select',
    prop: 'deliverLocation',
    label: '下料位置',
    options: [],
    rules: [{ required: true, message: '请选择下料位置', trigger: 'blur' }]
  }
]

export const AlleyFormList = [
  {
    type: 'Selects',
    prop: 'alleys',
    label: '巷道',
    options: [
      { label: 1, value: 1 },
      { label: 2, value: 2 },
      { label: 3, value: 3 },
      { label: 4, value: 4 }
    ],
    rules: [{ required: true, message: '请选择巷道', trigger: 'blur' }]
  },
  {
    type: 'Select',
    prop: 'deliverLocation',
    label: '下料位置',
    options: [],
    rules: [{ required: true, message: '请选择下料位置', trigger: 'blur' }]
  },
  {
    type: 'Number',
    label: '数量',
    prop: 'count',
    min: 0,
    rules: [{ required: true, message: '请输入数量', trigger: 'blur' }]
  },
  {
    type: 'Select',
    prop: 'statusID',
    label: '箱子状态',
    options: [],
    disabled: true,
    rules: [{ required: true, message: '请选择箱子状态', trigger: 'blur' }]
  }
]

export const boxCrud = {
  add: 'WarehouseManagement.Box.Create',
  edit: 'WarehouseManagement.Box.Update',
  del: 'WarehouseManagement.Box.Delete',
  import: 'WarehouseManagement.Box.Create',
  download: 'WarehouseManagement.Box'
}

// // 箱子，非标按钮
export const boxBtnItems = [
  // {
  //   // 批量下架
  //   langLabel: 'button.batchShelves',
  //   clickFun: 'toBatchOutShelves',
  //   disabled: 'multipe',
  //   permission: 'WarehouseManagement.Box.Update',
  //   styleType: 'danger',
  //   icon: 'el-icon-finished'
  // },
  // {
  //   // 按巷道下架
  //   langLabel: 'button.alleyOutShelves',
  //   clickFun: 'toAlleyOutShelves',
  //   disabled: 'all',
  //   permission: 'WarehouseManagement.Box.Update',
  //   styleType: 'danger',
  //   icon: 'el-icon-finished"'
  // }
]
