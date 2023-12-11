import { validateKey } from '@/utils/validate.js'

export const queryItems = [
  { type: 'Select', label: '仓库编码', prop: 'warehouseID', options: [] },
  { type: 'Input', label: '关联仓库', prop: 'linkWarehouseCodes' },
  { type: 'Input', label: '设备编号', prop: 'deviceID' },
  { type: 'Input', label: '设备名称', prop: 'deviceName' },
  // { type: 'Input', label: '工站代码', prop: 'stationCode' },
  { type: 'Input', label: '巷道', prop: 'alley' },
  { type: 'Select', label: '设备类型', prop: 'deviceType', options: [] }
  // { type: 'Input', label: '最大缓存', prop: 'maxCach' },
  // { type: 'Input', label: '当前缓存', prop: 'currentCach' }
  // {
  //   type: 'Select',
  //   label: '是否启用',
  //   prop: 'enable',
  //   options: [
  //     { value: 'true', label: '是' },
  //     { value: 'false', label: '否' }
  //   ]
  // }
]

export const formList = [
  {
    type: 'Input',
    label: '设备编号',
    prop: 'deviceID',
    unique: true,
    rules: [
      { required: true, message: '请输入设备编号', trigger: 'blur' },
      { addOnly: true, trigger: 'blur', tableName: 'WH_device', validator: validateKey }
    ]
  },
  {
    type: 'Selects',
    prop: 'warehouseID',
    label: '仓库编号',
    options: [],
    optLabel: 'warehouseID',
    optValue: 'warehouseID',
    optTotal: '',
    tableWidth: 100,
    col: [
      { label: '仓库编号', prop: 'warehouseID' },
      { label: '名称', prop: 'warehouseName' },
      { label: '描述', prop: 'warehouseDesc' }
    ],
    rules: [{ required: true, message: '请选择仓库编码', trigger: 'blur' }]
  },
  {
    type: 'Input',
    label: '设备名称',
    prop: 'deviceName',
    rules: [{ required: true, message: '请输入设备名称', trigger: 'blur' }]
  },
  {
    type: 'Select',
    label: '设备类型',
    prop: 'deviceType',
    options: [],
    rules: [{ required: true, message: '请选择【设备类型】', trigger: 'blur' }]
  },
  {
    type: 'Select',
    label: '是否启用',
    prop: 'enable',
    options: [
      { value: true, label: '是' },
      { value: false, label: '否' }
    ],
    rules: [{ required: true, message: '请选择是否启用', trigger: 'blur' }]
  },
  {
    type: 'Select',
    label: '设备线别',
    prop: 'lineCode',
    options: []
  },
  { type: 'Number', label: '巷道', prop: 'alley', min: 0 },
  {
    type: 'Input',
    label: '工艺编号',
    prop: 'stationCode',
    rules: [{ required: true, message: '请输入[工艺编号]', trigger: 'blur' }]
  },
  { type: 'Input', label: '堆垛机锁', prop: 'linkWarehouseCodes' },
  { type: 'Select', label: '双叉列排序', prop: 'colSort' }
]

export const deviceCrud = {
  add: 'WarehouseManagement.Device.Create',
  edit: 'WarehouseManagement.Device.Update',
  del: 'WarehouseManagement.Device.Delete'
  // download: 'WarehouseManagement.Wharf'
}
