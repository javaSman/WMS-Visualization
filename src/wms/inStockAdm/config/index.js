// 上架管理
export const inShelvesQueryItems = [
  { type: 'Input', label: '上架编号', prop: 'InShelvesID' },
  { type: 'Select', label: '仓库编码', prop: 'WarehouseID', options: [] },
  { type: 'Input', label: '设备编号', prop: 'DeviceID' },
  { type: 'Input', label: '托盘', prop: 'BoxID' },
  { type: 'Input', label: '任务号', prop: 'TaskId' },
  { type: 'Input', label: '起始位置', prop: 'BeginPostion' },
  { type: 'Input', label: '结束位置', prop: 'EndPostion' },
  { type: 'Select', label: '状态', prop: 'BoxState', options: [] },
  { type: 'Input', label: '电芯条码集合', prop: 'Barcodes' }
]

// 收货管理
export const deliveryQueryItems = [
  { type: 'Input', label: '单据编号', prop: 'OrderID' },
  { type: 'Input', label: '外部单号', prop: 'ExternalID' },
  { type: 'Select', label: '单据类型', prop: 'OrderType', options: [] }
]

// 入库管理
export const inStockQueryItems = [
  { type: 'Input', label: '单据编号', prop: 'OrderID' },
  { type: 'Input', label: '外部单号', prop: 'ExternalID' },
  { type: 'Select', label: '单据类型', prop: 'OrderType', options: [] }
]

export const inStockFormList = [
  { type: 'Input', label: '单据编号', prop: 'orderID', disabled: true },
  { type: 'Input', label: '单据状态', prop: 'statusID', disabled: true },
  {
    type: 'Select',
    label: '单据类型',
    prop: 'orderType',
    options: [],
    rules: [{ required: true, message: '请选择单据类型', trigger: 'blur' }]
  },
  { type: 'Input', label: '来源单号', prop: 'sourceID' },
  { type: 'Input', label: '项目号', prop: 'projectID' },
  { type: 'Input', label: '箱号', prop: 'boxID' },
  { type: 'Input', label: '工位号', prop: 'stationID' }
]

export const inStockTableList = [
  { label: '物料编号', prop: 'materialID', width: 130 },
  { label: '物料描述', prop: 'materialDesc', width: 200 },
  { label: '单位', prop: 'unitID' },
  { label: '单位数量', prop: 'unitQty' },
  { label: '数量', prop: 'quantity', type: 'colType/Number', width: 110 },
  { label: '上架数量', prop: 'upperShelfQty', type: 'colType/Number', width: 110 },
  { label: '已上架数量', prop: 'inShelves', type: 'colType/Number', width: 110 },
  { label: '待上架数量', prop: 'beShelves', type: 'colType/Number', width: 110 },
  { label: '条码', prop: 'barcode', type: 'colType/Input', width: 130 },
  { label: '外部单号', prop: 'externalID', type: 'colType/Input', width: 130, disabled: [] },
  { label: '批次号', prop: 'batchID', type: 'colType/Input', disabled: [] },
  { label: '采购单号', prop: 'poid', type: 'colType/Input', disabled: [] },
  { label: '指定货位', prop: 'locationID', type: 'colType/Input', disabled: [] },
  { label: '仓库编号', prop: 'whid', type: 'colType/Input', disabled: [] },
  { label: '手持机登录号', prop: 'employee', type: 'colType/Input', width: 110, disabled: [] },
  { label: '设备编号', prop: 'deviceNo', type: 'colType/Input', disabled: [] }
]

export const materialQueryItems = [{ type: 'Input', placeholder: '搜索...', prop: 'Filter' }]

// 权限
export const inStockCrud = {
  add: 'InStock.ReceivingHeader.Create',
  edit: 'InStock.ReceivingHeader.Update',
  del: 'InStock.ReceivingHeader.Delete'
}
