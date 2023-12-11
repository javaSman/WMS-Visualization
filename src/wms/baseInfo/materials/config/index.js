import { validateKey } from '@/utils/validate.js'

export const queryItems = [
  { type: 'Input', label: '物料编号', prop: 'MaterialID' },
  { type: 'Input', label: '物料名称', prop: 'MaterialDesc' },
  { type: 'Select', label: '物料类型', prop: 'MaterialType', options: [] }
]

export const formList = [
  {
    type: 'Input',
    prop: 'materialID',
    label: '物料编号',
    unique: true,
    rules: [
      { required: true, message: '请输入物料编号', trigger: 'blur' },
      { addOnly: true, trigger: 'blur', tableName: 'WH_Materials', validator: validateKey }
    ]
  },
  {
    type: 'Input',
    prop: 'materialDesc',
    label: '物料名称',
    rules: [{ required: true, message: '请输入物料名称', trigger: 'blur' }]
  },
  {
    type: 'Number',
    prop: 'grossWeight',
    label: '毛重',
    min: 0,
    precision: 2,
    step: 0.01,
    rules: [{ required: true, message: '请输入毛重', trigger: 'blur' }]
  },
  {
    type: 'Select',
    prop: 'materialType',
    label: '物料类型',
    options: [],
    rules: [{ required: true, message: '请选择物料类型', trigger: 'blur' }]
  },
  {
    type: 'Select',
    prop: 'state',
    label: '物料状态',
    options: [],
    rules: [{ required: true, message: '请选择物料状态', trigger: 'blur' }]
  },
  { type: 'Input', prop: 'materialTypeDesc', label: '类型描述', disabled: false },
  // {
  //   type: 'Select',
  //   prop: 'materialGroupID',
  //   label: '物料组别',
  //   options: [],
  //   rules: [{ required: true, message: '请选择物料组别', trigger: 'blur' }]
  // },
  // { type: 'Input', prop: 'materialGroupDesc', label: '组别描述', disabled: true },

  {
    type: 'Number',
    prop: 'netWeight',
    label: '净重',
    min: 0,
    precision: 2,
    step: 0.01,
    rules: [{ required: true, message: '请输入净重', trigger: 'blur' }]
  },
  {
    type: 'Select',
    prop: 'weightUnit',
    label: '重量单位',
    options: [],
    rules: [{ required: true, message: '请选择重量单位', trigger: 'blur' }]
  },
  {
    type: 'Input',
    prop: 'size',
    label: '尺寸',
    rules: [{ required: true, message: '请输入尺寸', trigger: 'blur' }]
  },
  //   {
  //     type: 'Select',
  //     prop: 'baseUnit',
  //     label: '基本单位',
  //     options: [],
  //     rules: [{ required: true, message: '请输入基本单位', trigger: 'blur' }]
  //   },
  //   {
  //     type: 'Number',
  //     prop: 'unitQty',
  //     label: '单位数量',
  //     min: 0,
  //     rules: [{ required: true, message: '请输入单位数量', trigger: 'blur' }]
  //   },
  //   {
  //     type: 'Number',
  //     prop: 'safetyInventory',
  //     label: '预警库存',
  //     min: 0,
  //     precision: 2,
  //     step: 0.01,
  //     rules: [{ required: true, message: '请输入预警库存', trigger: 'blur' }]
  //   },
  { type: 'Number', prop: 'capacity', label: '容量', min: 0, precision: 2, step: 0.01 }
  //   {
  //     type: 'Radio',
  //     prop: 'cube',
  //     label: '是否入立库',
  //     radios: [
  //       { label: '是', value: true },
  //       { label: '否', value: false }
  //     ],
  //     rules: [{ required: true, message: '请选择是否入立库', trigger: 'blur' }]
  //   }
]
export const batchFormList = [
  {
    type: 'Radio',
    prop: 'cube',
    label: '是否入立库',
    radios: [
      { label: '是', value: true },
      { label: '否', value: false }
    ]
  },
  { type: 'Number', prop: 'capacity', label: '容量', min: 0, precision: 2, step: 0.01 },
  { type: 'Number', prop: 'unitQty', label: '单位数量', min: 0, step: 1 },
  { type: 'Number', prop: 'safetyInventory', label: '库存预警数量', min: 0, step: 1 }
]

export const MaterialCrud = {
  add: 'Basics.Materials.Create',
  edit: 'Basics.Materials.Update',
  del: 'Basics.Materials.Delete',
  download: 'Basics.Materials',
  import: 'Basics.Materials.Create'
}
