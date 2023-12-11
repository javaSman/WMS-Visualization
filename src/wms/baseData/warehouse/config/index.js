import { validateKey } from '@/utils/validate.js'

export const queryItems = [
  { type: 'Input', label: '仓库编号', prop: 'WarehouseID' },
  { type: 'Input', label: '仓库名称', prop: 'WarehouseName' },
  { type: 'Input', label: '工艺名称', prop: 'LinkStationCode' }
]

export const formList = [
  { type: 'Input', label: '仓库排序', prop: 'wareSort' },
  {
    type: 'Input',
    label: '仓库编号',
    prop: 'warehouseID',
    // unique: true,
    rules: [
      { required: true, message: '请输入仓库编号', trigger: 'blur' },
      { addOnly: true, trigger: 'blur', tableName: 'WH_Warehouse', validator: validateKey }
    ]
  },
  { type: 'Input', label: '仓库名称', prop: 'warehouseName' },
  { type: 'Input', label: '仓库别称', prop: 'warehouseChildName' },
  { type: 'Input', label: '客户设备号', prop: 'linkStationCode'},
  { type: 'Input', label: '仓库描述', prop: 'warehouseDesc' },
  { type: 'Input', label: '仓库类型', prop: 'warehouseType' },
  { type: 'Input', label: '入库时间策略', prop: 'inTimeStrategy' },
  { type: 'Input', label: '出库时间策略', prop: 'outTimeStrategy' },
  { type: 'Input', label: '入库时间值（下限-目标-上限）', prop: 'inTimeValue' },
  { type: 'Input', label: '出库时间值（下限-目标-上限）', prop: 'outTimeValue' }
]

export const WarehouseCrud = {
  add: 'WarehouseManagement.Warehouse.Create',
  edit: 'WarehouseManagement.Warehouse.Update',
  del: 'WarehouseManagement.Warehouse.Delete'
}
