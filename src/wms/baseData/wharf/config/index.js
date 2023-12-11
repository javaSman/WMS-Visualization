export const queryItems = [
  { type: 'Select', label: '仓库编码', prop: 'warehouseID', options: [] },
  { type: 'Input', label: '码头编号', prop: 'wharfID' },
  { type: 'Input', label: '码头名称', prop: 'wharfName' },
  { type: 'Select', label: '码头类型', prop: 'wharfType', options: [] },
  { type: 'Input', label: '托盘编号', prop: 'boxID' },
  { type: 'Select', label: '状态', prop: 'state', options: [] },
  { type: 'Select', label: '关联堆垛机', prop: 'linkStackerCode', options: [] }
]

export const formList = [
  {
    type: 'Input',
    label: '码头编号',
    prop: 'wharfID',
    disabled: false,
    rules: [{ required: true, message: '请输入码头编号', trigger: 'blur' }]
  },
  {
    type: 'Input',
    label: '码头名称',
    prop: 'wharfName',
    rules: [{ required: true, message: '请输入码头名称', trigger: 'blur' }]
  },
  {
    type: 'Combogrid',
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
    type: 'Combogrid',
    prop: 'linkStackerCode',
    label: '关联堆垛机',
    options: [],
    optLabel: 'deviceId',
    optValue: 'deviceId',
    optTotal: '',
    tableWidth: 100,
    col: [
      { label: '设备编号', prop: 'deviceID' },
      { label: '设备名称', prop: 'deviceName' },
      { label: '仓库', prop: 'warehouseID' },
      { label: '巷道', prop: 'alley' }
    ]
  },
  {
    type: 'Select',
    label: '码头类型',
    prop: 'wharfType',
    options: [],
    rules: [{ required: true, message: '请选择码头类型', trigger: 'blur' }]
  },
  {
    type: 'Select',
    label: '状态',
    prop: 'state',
    options: [],
    rules: [{ required: true, message: '请选择状态', trigger: 'blur' }]
  },
  {
    type: 'Input',
    label: '托盘编号',
    prop: 'boxID',
    disabled: false
  },
  { type: 'Input', label: '码头设备号', prop: 'wharfDeviceId' },
  { type: 'Input', label: '码头库位号', prop: 'wharfLocationId' },
  {
    type: 'Select',
    label: '码头线别',
    prop: 'lineCode',
    options: [],
    rules: [{ required: true, message: '请选择【码头线别】', trigger: 'blur' }]
  },
  { type: 'Select', label: '附加功能', prop: 'subJoin_Fun', options: [] },
  { type: 'Input', label: '当前站点', prop: 'operationName' },
  { type: 'Input', label: '出入库关联码头1', prop: 'linkedWharf1' },
  { type: 'Input', label: '出入库关联码头2', prop: 'linkedWharf2' }
]

export const ttInstockRequestForm = [
  {
    type: 'Input',
    label: '托盘',
    prop: 'boxId',
    disabled: false,
    rules: [
      { required: true, message: '请输入【托盘】号', trigger: 'blur' }
    ]
  }
]

export const instockRequestBtnItems = [
  {
    langLabel: 'button.InstockRequest',
    clickFun: 'toInstockRequest',
    disabled: 'single',
    permission: 'WarehouseManagement.Wharf.InstockRequest',
    styleType: 'danger',
    icon: 'el-icon-finished'
  }
]

export const WharfCrud = {
  add: 'WarehouseManagement.Wharf.Create',
  edit: 'WarehouseManagement.Wharf.Update',
  del: 'WarehouseManagement.Wharf.Delete',
  InstockRequest: 'WarehouseManagement.Wharf.InstockRequest',
  download: 'WarehouseManagement.Wharf'
}
