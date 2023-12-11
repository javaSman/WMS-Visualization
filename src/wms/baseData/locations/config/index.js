export const queryItems = [
  { type: 'Select', label: '仓库', prop: 'warehouseID', options: [] },
  { type: 'Input', label: '库位编码', prop: 'locationID' },
  { type: 'Select', label: '库位状态', prop: 'state', options: [] },
  { type: 'Input', label: '托盘编号', prop: 'boxID', clearable: false },
  { type: 'Input', label: '巷道', prop: 'alley' },
  { type: 'Input', label: '排', prop: 'row' },
  { type: 'Input', label: '列', prop: 'col' },
  { type: 'Input', label: '层', prop: 'floor' },
  { type: 'Select', label: '产品类型', prop: 'productType', options: [] },
  { type: 'Select', label: '可用状态', prop: 'useSign', options: [] },
  {
    type: 'DateRangePart',
    label: '允许出库时间',
    // prop: 'registrationEndTime',
    startProp: 'AllowOutBeginTime',
    endProp: 'AllowOutEndTime',
    dateType: 'datetime',
    valueFormat: 'yyyy-MM-dd HH:mm:ss',
    labelFormat: 'yyyy-MM-dd HH:mm:ss',
    startDefaultTime: '08:00:00',
    endDefaultTime: '20:00:00',
    formStyle: 'width:180px',
    rules: [{ required: true, message: '请选择允许出库时间', trigger: 'blur' }],
    layout: { span: undefined, xs: 24, sm: 16, md: 12, lg: 8, xl: 8 }
  }
]

export const formList = [
  {
    type: 'Input',
    label: '库位编码',
    prop: 'locationID',
    unique: true,
    rules: [
      { required: true, message: '请输入储位编码', trigger: 'blur' },

      {
        pattern: /^([1-9]\d|[1-9])(\-([1-9]\d|\d)){3}$/,
        message: '请正确输入储位编码(巷-排-列-层)，例:1-1-1-1',
        trigger: 'blur'
      }
    ]
  },
  {
    type: 'Select',
    label: '状态编号',
    prop: 'state',
    options: [],
    rules: [{ required: true, message: '请选择状态编号', trigger: 'blur' }]
  },
  {
    type: 'Combogrid',
    prop: 'warehouseID',
    label: '仓库编号',
    options: [],
    optLabel: 'warehouseID',
    optValue: 'warehouseID',
    optTotal: '',
    unique: true,
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
    label: '托盘编号',
    prop: 'boxID',
    options: [],
    count: 10,
    optTotal: '',
    remote: true,
    optLabel: 'boxID',
    optValue: 'boxID',
    col: [
      { label: '托盘编号', prop: 'boxID', width: '150px' },
      { label: '类型', prop: 'boxType', width: '150px' },
      { label: '状态', prop: 'boxState' }
    ]
  },
  {
    type: 'Input',
    label: '巷',
    prop: 'alley',
    unique: true,
    disabled: true,
    rules: [{ required: true, message: '请输入', trigger: 'blur' }]
  },
  {
    type: 'Input',
    label: '排',
    prop: 'row',
    unique: true,
    disabled: true,
    rules: [{ required: true, message: '请输入', trigger: 'blur' }]
  },

  {
    type: 'Input',
    label: '列',
    prop: 'col',
    unique: true,
    disabled: true,
    rules: [{ required: true, message: '请输入', trigger: 'blur' }]
  },
  {
    type: 'Input',
    label: '层',
    prop: 'floor',
    unique: true,
    disabled: true,
    rules: [{ required: true, message: '请输入', trigger: 'blur' }]
  },
  { type: 'DateTime', label: '入库时间', prop: 'instockTime' },
  { type: 'DateTime', label: '计划出库时间', prop: 'allowOutDateTime' },
  { type: 'Select', label: '产品类型', prop: 'productType', options: [] },
  {
    type: 'Select',
    label: '启用状态',
    prop: 'useSign',
    options: [],
    rules: [{ required: true, message: '请选择状态[启用状态]', trigger: 'blur' }]
  },
  { type: 'DateTime', label: '在库下限时间', prop: 'locCloseTime' },
  { type: 'Number', label: '托盘数量', prop: 'boxCount', min: 1 },
  { type: 'Input', label: '在库时间(下限-目标-下限)', prop: 'locaGroupName'},
  { type: 'Textarea', label: '报错信息', prop: 'erroMessage' }
]

export const batchFormList = [{ type: 'Select', prop: 'statusID', label: '状态编号', options: [] }]

// 非标按钮
export const btnItems = [
  {
    // 补入站
    langLabel: 'button.addBoxInSend',
    clickFun: 'toAddBoxInSend',
    disabled: 'single',
    permission: 'WarehouseManagement.Locations.Update',
    styleType: 'primary',
    icon: 'el-icon-top'
  },
  {
    // 禁止入库
    langLabel: 'button.stopIn',
    clickFun: 'toStopIn',
    disabled: 'multipe',
    permission: 'WarehouseManagement.Locations.Update',
    styleType: 'danger',
    icon: 'el-icon-top'
  },
  {
    // 允许入库
    langLabel: 'button.allowIn',
    clickFun: 'toAllowIn',
    disabled: 'multipe',
    permission: 'WarehouseManagement.Locations.Update',
    styleType: 'primary',
    icon: 'el-icon-top'
  },
  {
    // 禁止进出
    langLabel: 'button.stopInAndOut',
    clickFun: 'toStopInAndOut',
    disabled: 'multipe',
    permission: 'WarehouseManagement.Locations.Update',
    styleType: 'danger',
    icon: 'el-icon-top'
  },
  {
    // 允许进出
    langLabel: 'button.allowInAndOut',
    clickFun: 'toAllowInAndOut',
    disabled: 'multipe',
    permission: 'WarehouseManagement.Locations.Update',
    styleType: 'primary',
    icon: 'el-icon-top'
  },
  {
    // 强制出库
    langLabel: 'button.ForceOutStock',
    clickFun: 'toForceOutStockt',
    disabled: 'single',
    permission: 'WarehouseManagement.Locations.Update',
    styleType: 'primary',
    icon: 'el-icon-shopping-cart-full'
  }
]
export const LocationsCrud = {
  add: 'WarehouseManagement.Locations.Create',
  edit: 'WarehouseManagement.Locations.Update',
  del: 'WarehouseManagement.Locations.Delete',
  import: 'WarehouseManagement.Locations.Create',
  download: 'WarehouseManagement.Locations'
}
