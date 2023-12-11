export const detailsformList = [
  { type: 'Input',
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
  { type: 'DateTime', label: '库位关闭时间', prop: 'locCloseTime' },
  { type: 'Number', label: '托盘数量', prop: 'boxCount', min: 1 },
  { type: 'Input', label: '在库时间(下限-目标-下限)', prop: 'locaGroupName'},
  { type: 'Textarea', label: '报错信息', prop: 'erroMessage' }
]
// 非标按钮
export const btnItems = [
  {
    // 补入站
    langLabel: 'button.addBoxInSend',
    clickFun: 'toAddBoxInSend',
    permission: 'WarehouseManagement.Locations.Update',
    styleType: 'primary',
    icon: 'el-icon-top'
  },
  {
    // 禁止入库
    langLabel: 'button.stopIn',
    clickFun: 'toStopIn',
    permission: 'WarehouseManagement.Locations.Update',
    styleType: 'danger',
    icon: 'el-icon-top'
  },
  {
    // 允许入库
    langLabel: 'button.allowIn',
    clickFun: 'toAllowIn',
    permission: 'WarehouseManagement.Locations.Update',
    styleType: 'primary',
    icon: 'el-icon-top'
  },
  {
    // 禁止进出
    langLabel: 'button.stopInAndOut',
    clickFun: 'toStopInAndOut',
    permission: 'WarehouseManagement.Locations.Update',
    styleType: 'danger',
    icon: 'el-icon-top'
  },
  {
    // 允许进出
    langLabel: 'button.allowInAndOut',
    clickFun: 'toAllowInAndOut',
    permission: 'WarehouseManagement.Locations.Update',
    styleType: 'primary',
    icon: 'el-icon-top'
  },
  {
    // 强制出库
    langLabel: 'button.ForceOutStock',
    clickFun: 'toForceOutStockt',
    permission: 'WarehouseManagement.Locations.Update',
    styleType: 'primary',
    icon: 'el-icon-shopping-cart-full'
  },
  {
    // 修改
    langLabel: 'button.update',
    clickFun: 'toUpdate',
    permission: 'WarehouseManagement.Locations.Update',
    styleType: 'success',
    icon: 'el-icon-edit'
  }
]
export const locationJson = {
  res: 200,
  data: {
    layout: { areaWidth: 4, areaHeight: 4, totalLength: 20 },
    machineList: [
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '仅可出'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '仅可出'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '空库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '空库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '超时库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '超时库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '超时库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '超时库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '空托在库'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      },
      {
        inTime: '2023-02-01',
        stayTime: '2023-02-01',
        number: '1-1-1',
        palletRemark: '铁托盘01',
        batteryRemark: 'AA-01',
        expectOutTime: '2023-02-15',
        status: '禁用库位'
      }
    ]
  },
  message: '请求成功',
  success: true
}

export const testJson1 = {
  code: 200,
  data: {
    title: '立库检测库入库任务托盘数',
    titleEN: '',
    axisName: ['10:00', '12:00', '14:00', '16:00', '18:00', '20:00'],
    barData: [
      { name: '入库托盘数', data: [1530, 2100, 2300, 1850, 1500, 1700] },
      { name: '出库托盘数', data: [1490, 2000, 2200, 1700, 1470, 1520] }
    ],
    lineData: {}
  },
  success: true,
  message: ''
}

export const testJson2 = {
  code: 200,
  data: {
    title: '立库检测库入库任务电芯数',
    titleEN: '',
    axisName: ['10:00', '12:00', '14:00', '16:00', '18:00', '20:00'],
    barData: [
      { name: '入库电芯数', data: [61000, 82000, 89000, 78000, 60000, 64000] },
      { name: '出库电芯数', data: [59000, 80000, 87000, 69000, 59500, 62000] }
    ],
    lineData: {}
  },
  success: true,
  message: ''
}

export const testJson3 = {
  code: 200,
  data: {
    title: '立库检测库入库任务托盘数',
    titleEN: '',
    axisName: ['10:00', '12:00', '14:00', '16:00', '18:00', '20:00'],
    barData: [
      { name: '入库托盘数', data: [1530, 2100, 2300, 1850, 1500, 1700] },
      { name: '出库托盘数', data: [1490, 2000, 2200, 1700, 1470, 1520] }
    ],
    lineData: {}
  },
  success: true,
  message: ''
}
export const testJson4 = {
  code: 200,
  data: {
    title: '堆垛机稼动率指标',
    titleEN: '',
    axisName: ['CH1', 'CH2', 'CH3', 'CH4', 'CH5', 'CH6', 'CH7', 'CH9', 'CH10', 'CH11'],
    barData: [
      { name: '工作时间', data: [19, 22.1, 22.9, 21, 19.8, 20.6, 20.6, 20.6, 20.6, 20.6] },
      { name: '稼动时间', data: [18, 21.9, 22.6, 20.5, 19.8, 20.3, 20.3, 20.3, 20.3, 20.3] }
    ],
    lineData: { name: '稼动率', data: [0.81, 0.58, 0.69, 0.43, 0.73, 0.61, 0.79, 0.59, 0.62, 0.64] }
  },
  success: true,
  message: ''
}
export const testJson5 = {
  code: 200,
  data: {
    title: '立库检测库入库任务托盘数',
    titleEN: '',
    axisName: ['10:00', '12:00', '14:00', '16:00', '18:00', '20:00'],
    barData: [
      { name: '入库托盘数', data: [59000, 81000, 83000, 64000, 59000, 61500] },
      { name: '出库托盘数', data: [57000, 79000, 82000, 62000, 58500, 60500] }
    ],
    lineData: {}
  },
  success: true,
  message: ''
}

export const annularJson = {
  code: 200,
  data: {
    title: '库位占用率',
    titleEN: 'Warehouse occupancy',
    unoccupied: { name: '未占用库位', value: 350 },
    occupy: { name: '已占用库位', value: 650 }
  },
  success: true,
  message: ''
}

export const statusArr = [
  {
    name: '满库位',
    count: 154,
    color: '#ed9f1b'
  },
  {
    name: '禁用库位',
    count: 154,
    color: '#999999'
  },
  {
    name: '空库位',
    count: 154,
    color: '#3888EF'
  },
  {
    name: '仅可出',
    count: 154,
    color: '#B95EFF'
  },
  {
    name: '禁用库位',
    count: 154,
    color: '#1BED83'
  },
  {
    name: '仅可入',
    count: 154,
    color: '#FF5EC8'
  },
  {
    name: '空托在库',
    count: 154,
    color: '#FFEA5E'
  },
  {
    name: '工装在库',
    count: 154,
    color: '#2DCEF0'
  },
  {
    name: '超时库位',
    count: 154,
    color: '#FF5E5E'
  }
]

export const echartData1 = {
  title1: '',
  title2: '',
  name1: '',
  name2: '',
  yAxisSetting: {
    yAxisMin: 0,
    yAxisMax: 2500,
    yAxisInterval: 500
  },
  xAxisData: [],
  yAxisBarData: [],
  yAxisLineData: []
}

export const echartData2 = {
  title1: '',
  title2: '',
  name1: '',
  name2: '',
  yAxisSetting: {
    yAxisMin: 0,
    yAxisMax: 100000,
    yAxisInterval: 20000
  },
  xAxisData: [],
  yAxisBarData: [],
  yAxisLineData: []
}
export const echartData3 = {
  title1: '',
  title2: '',
  name1: '',
  name2: '',
  name3: '',
  yAxisSetting: {
    yAxisMin: 0,
    yAxisMax: 2500,
    yAxisInterval: 500
  },
  xAxisData: [],
  yAxisBarData1: [],
  yAxisBarData2: [],
  yAxisLineData: []
}
export const echartData4 = {
  title1: '',
  title2: '',
  name1: '',
  name2: '',
  name3: '',
  yAxisSetting: {
    yAxisMin: 14,
    yAxisMax: 24,
    yAxisInterval: 2,
    yAxisLineMin: 0,
    yAxisLineMax: 1,
    yAxisLineInterval: 0.2
  },
  xAxisData: [],
  yAxisBarData1: [],
  yAxisBarData2: [],
  yAxisLineData: []
}
export const echartData5 = {
  title1: '',
  title2: '',
  name1: '',
  name2: '',
  name3: '',
  yAxisSetting: {
    yAxisMin: 0,
    yAxisMax: 100000,
    yAxisInterval: 20000
  },
  xAxisData: [],
  yAxisBarData1: [],
  yAxisBarData2: [],
  yAxisLineData: []
}
