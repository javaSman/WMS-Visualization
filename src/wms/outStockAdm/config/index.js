// 下架管理
export const outShelvesQueryItems = [
  { type: 'Input', label: '下架编号', prop: 'OutShelvesID' },
  { type: 'Select', label: '仓库编码', prop: 'WarehouseID', options: [] },
  { type: 'Input', label: '设备编号', prop: 'DeviceID' },
  { type: 'Input', label: '托盘', prop: 'BoxID' },
  { type: 'Input', label: '任务号', prop: 'TaskId' },
  { type: 'Input', label: '起始位置', prop: 'BeginPostion' },
  { type: 'Input', label: '结束位置', prop: 'EndPostion' },
  { type: 'Select', label: '状态', prop: 'BoxState', options: [] },
  { type: 'Input', label: '电芯条码集合', prop: 'Barcodes' }
]

// // 退货管理
// export const returnQueryItems = [
//   { type: 'Input', label: '单据编号', prop: 'OrderID' },
//   { type: 'Input', label: '项目号', prop: 'ProjectID' }
// ]

// // 出库管理
// export const outStockQueryItems = [
//   { type: 'Input', label: '编号ID', prop: 'OrderID' },
//   { type: 'Select', label: '订单状态', prop: 'StatusID', options: [] },
//   { type: 'Select', label: '模式', prop: 'Mode', options: [] },
//   { type: 'Input', label: '外部单号', prop: 'ExternalID' },
//   { type: 'Input', label: '来源单号', prop: 'SourceID' }
// ]

// export const outStockFormList = [
//   { type: 'Input', label: '编号ID', prop: 'orderID', disabled: true },
//   { type: 'Input', label: '订单状态', prop: 'statusID', disabled: true },
//   {
//     type: 'Select',
//     label: '备料类型',
//     prop: 'prepareType',
//     options: [],
//     rules: [{ required: true, message: '请选择备料类型', trigger: 'blur' }]
//   },
//   { type: 'Input', label: '项目号', prop: 'projectID' },
//   { type: 'Input', label: '箱号', prop: 'boxID' }
// ]

// export const outStockTableList = [
//   { label: '状态编号', prop: 'statusID', width: 100 },
//   { label: '箱号', prop: 'boxID', width: 120 },
//   { label: '物料编号', prop: 'materialID', width: 150 },
//   { label: '物料描述', prop: 'materialDesc', width: 150 },
//   { label: '物料条码', prop: 'barcode', width: 160 },
//   { label: '数量', prop: 'quantity', type: 'colType/Number', width: 100 },
//   { label: '下架数量', prop: 'outQty', type: 'colType/Number', width: 100 },
//   { label: '货位编号', prop: 'locationID', width: 120 },
//   { label: '工位号', prop: 'stationID', width: 100 },
//   { label: '单位', prop: 'unitID', width: 100 },
//   { label: '单位数量', prop: 'unitQty', type: 'colType/Number', width: 100, disabled: [] },
//   { label: '外部单号', prop: 'externalID', type: 'colType/Input', width: 160, disabled: [] },
//   { label: '手持机登录号', prop: 'employee', type: 'colType/Input', width: 110, disabled: [] },
//   { label: '设备编号', prop: 'deviceNo', type: 'colType/Input', disabled: [] }
// ]

// export const stockQueryItems = [
//   { type: 'Input', label: '箱号', prop: 'BoxID' },
//   { type: 'Input', label: '货位编号', prop: 'LocationID' },
//   { type: 'Input', label: '批次号', prop: 'BatchID' }
// ]

// // 备料单管理
// export const readyMaterialsQueryItems = [
//   { type: 'Input', label: '项目编号', prop: 'ProjectID' },
//   { type: 'Input', label: '工位号', prop: 'StationID' },
//   { type: 'Input', label: '物料编号', prop: 'Material' },
//   { type: 'Select', label: '状态', prop: 'StatusID', options: [] },
//   { type: 'BatchInput', label: '备料单号', prop: 'ReadyMaterialsID', width: '178px' },
//   { type: 'BatchInput', label: '订单号', prop: 'OrderID', width: '178px' }
// ]
// // 下架 -下料位置选中
// export const outShelvesForm = [
//   {
//     type: 'Select',
//     prop: 'deliverLocation',
//     label: '下料位置',
//     options: [],
//     rules: [{ required: true, message: '请选择下料位置', trigger: 'blur' }]
//   }
// ]

// // 打印-表单
// export const printForm = [
//   {
//     type: 'Select',
//     label: '配送区域',
//     prop: 'deliveryArea',
//     options: [],
//     rules: [{ required: true, message: '请选择配送区域', trigger: 'blur' }]
//   },
//   {
//     type: 'Select',
//     label: '发出区域',
//     prop: 'initialArea',
//     options: [],
//     rules: [{ required: true, message: '请选择发出区域', trigger: 'blur' }]
//   },
//   {
//     type: 'Select',
//     label: '物料类别',
//     prop: 'materialType',
//     options: [],
//     rules: [{ required: true, message: '请选择物料类别', trigger: 'blur' }]
//   }
// ]

// // 权限
// // 出库单按钮权限
// export const outStockCrud = {
//   add: 'OutStock.OutStockHeader.Create',
//   edit: 'OutStock.OutStockHeader.Update',
//   del: 'OutStock.OutStockHeader.Delete'
// }

// // 备料单明细表按钮权限
// export const readyMaterialsCrud = {
//   print: 'OutStock.ReadyMaterials.Create'
// }

// // 备料单表头，非标按钮
// export const readyMaterialsHeaderBtnItems = [
//   {
//     // 下架
//     langLabel: 'button.outShelves',
//     clickFun: 'toOutShelves',
//     disabled: 'single',
//     permission: 'OutStock.ReadyMaterials.Create',
//     styleType: 'danger',
//     icon: 'el-icon-finished'
//   }
// ]
// // 备料单明细表，非标按钮
// export const readyMaterialsBtnItems = [
//   {
//     // 批量下架
//     langLabel: 'button.batchShelves',
//     clickFun: 'toBatchOutShelves',
//     disabled: 'multipe',
//     permission: 'OutStock.ReadyMaterials.Create',
//     styleType: 'danger',
//     icon: 'el-icon-finished'
//   }
// ]
