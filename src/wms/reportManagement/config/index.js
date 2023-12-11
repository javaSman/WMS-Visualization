// 库存报表查询
export const inventoryReportItems = [
  { type: 'Select', label: '仓库编码', prop: 'warehouseID', options: [] },
  { type: 'Input', label: '所属托盘', prop: 'boxID' },
  { type: 'Input', label: '物料条码', prop: 'barcode' },
  { type: 'Input', label: '储位编码', prop: 'locationID' }
]
export const inventoryReportBtnItems = [
  {
    langLabel: 'button.batchShelves',
    clickFun: 'toBatchOutShelves',
    disabled: 'multipe',
    permission: 'Report.InventoryReport.BatchOutShelves',
    styleType: 'danger',
    icon: 'el-icon-finished'
  }
]
// 物料报表权限
export const inventoryReportCrud = {
  download: 'Report.InventoryReport.Export'
}
// 下架 -下料位置选中
export const outShelvesForm = [
  {
    type: 'Select',
    prop: 'wharfID',
    label: '下料位置',
    options: [],
    rules: [{ required: true, message: '请选择下料位置', trigger: 'blur' }]
  }
]

// 超时报表查询
export const overTimeReportItems = [
  { type: 'Select', label: '仓库编码', prop: 'warehouseID', options: [], clearable: false },
  { type: 'Input', label: '所属托盘', prop: 'boxID' },
  { type: 'Input', label: '物料条码', prop: 'barcode' },
  { type: 'Input', label: '储位编码', prop: 'locationID' },
  { type: 'Input', label: '巷道', prop: 'alley' },
  { type: 'Input', label: '超小时起', prop: 'minHours' },
  { type: 'Input', label: '超小时末', prop: 'maxHours' }
]
// export const overTimeReportBtnItems = [
//   {
//     langLabel: 'button.batchShelves',
//     clickFun: 'toBatchOutShelves',
//     disabled: 'multipe',
//     permission: 'Report.InventoryReport.BatchOutShelves',
//     styleType: 'danger',
//     icon: 'el-icon-finished'
//   }
// ]
// 超时报表权限
export const overTimeReportCrud = {
  download: 'Report.InventoryReport.Export'
}

// 在库库表查询
export const boxInStockReportItems = [
  { type: 'Select', label: '仓库编号', prop: 'warehouseID', options: [] },
  { type: 'Input', label: '巷道', prop: 'alley' },
  { type: 'Input', label: '货位编号', prop: 'locationID' },
  { type: 'Input', label: '箱号', prop: 'boxID' },
  { type: 'Select', label: '库位状态', prop: 'state', options: [] },
  { type: 'Select', label: '箱子状态', prop: 'boxState', options: [] },
  { type: 'Select', label: '当前工艺', prop: 'stationCodeNow', options: [] },
  { type: 'Select', label: '下工艺', prop: 'stationCodeNext', options: [] },
  { type: 'Select', label: '工艺信息', prop: 'jzUseStationCode', options: [] },
  { type: 'Input', label: '电芯等级', prop: 'cellLevel' },
  { type: 'Input', label: '电芯状态', prop: 'materialState' },
  { type: 'Input', label: '电芯类型', prop: 'productType' }
]
export const boxInStockReportBtnItems = [
  {
    langLabel: 'button.batchShelves',
    clickFun: 'toBoxInStockReport',
    disabled: 'multipe',
    permission: 'Report.BoxInStockReport.BatchOutShelves',
    styleType: 'danger',
    icon: 'el-icon-finished'
  }
]
export const boxInStockReportCrud = {
  batchOutShelves: 'Report.BoxInStockReport.BatchOutShelves'
}
export const formList = [
  // 下架位置
  { type: 'Select', prop: 'wharfID', label: '下架位置', options: [] }
]

// 设备报表
export const deviceShowInfoItems = [
  { type: 'Select', label: '设备类型', prop: 'DeviceType', options: [] },
  { type: 'Select', label: '上位机', prop: 'WhicOne', options: [] },
  { type: 'Input', label: '设备编码', prop: 'DeviceId' },
  { type: 'Input', label: '设备名称', prop: 'DeviceName' }
]
export const deviceShowInfoCrud = {
  control: 'Report.DeviceShowInfo.Control'
}
export const deviceShowInfoBtnItems = [
  {
    langLabel: 'button.disenable',
    clickFun: 'toDisenable',
    disabled: 'multipe', // multipe
    permission: 'Report.DeviceShowInfo.Control',
    styleType: 'danger',
    icon: 'el-icon-finished'
  },
  {
    langLabel: 'button.enable',
    clickFun: 'toEnable',
    disabled: 'multipe',
    permission: 'Report.DeviceShowInfo.Control',
    styleType: 'primary',
    icon: 'el-icon-finished'
  },
  {
    langLabel: 'button.reset',
    clickFun: 'toReset',
    disabled: 'multipe',
    permission: 'Report.DeviceShowInfo.Control',
    styleType: 'danger',
    icon: 'el-icon-finished'
  },
  {
    langLabel: 'button.reStart',
    clickFun: 'toReStart',
    disabled: 'multipe',
    permission: 'Report.DeviceShowInfo.Control',
    styleType: 'danger',
    icon: 'el-icon-finished'
  },
  {
    langLabel: 'button.getNewTask',
    clickFun: 'toGetNewTask',
    disabled: 'multipe',
    permission: 'Report.DeviceShowInfo.Control',
    styleType: 'danger',
    icon: 'el-icon-finished'
  }
]
