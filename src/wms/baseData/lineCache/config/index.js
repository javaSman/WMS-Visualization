import { validateKey } from '@/utils/validate.js'

export const queryItems = [
  { type: 'Input', label: '缓存位编号', prop: 'lineCacheId' },
  { type: 'Input', label: '缓存位名称', prop: 'lineCacheName' },

  { type: 'Input', label: '托盘条码', prop: 'currentBarCodes' },
  { type: 'Select', label: '提交方式', prop: 'lineCache_CalModel', options: [] },
  {
    type: 'Select',
    label: '启用',
    prop: 'Enabel',
    options: [
      { value: true, label: '是' },
      { value: false, label: '否' }
    ]
  }
]

export const formList = [
  {
    type: 'Input',
    label: '缓存位编号',
    prop: 'lineCacheId',
    unique: true,
    rules: [
      { required: true, message: '缓存位编号', trigger: 'blur' },
      { addOnly: true, trigger: 'blur', tableName: 'WH_LineCache', validator: validateKey }
    ]
  },
  {
    type: 'Input',
    label: '缓存位名称',
    prop: 'lineCacheName',
    rules: [{ required: true, message: '缓存位名称', trigger: 'blur' }]
  },
  {
    type: 'Select',
    label: '提交方式',
    prop: 'lineCache_CalModel',
    options: [],
    rules: [{ required: true, message: '提交方式', trigger: 'blur' }]
  },
  {
    type: 'Select',
    label: '是否启用',
    prop: 'enabel',
    options: [
      { value: true, label: '是' },
      { value: false, label: '否' }
    ],
    rules: [{ required: true, message: '请选择【是否启用】', trigger: 'blur' }]
  },
  {
    type: 'Number',
    label: '最大缓存',
    prop: 'maxCach',
    min: 0,
    rules: [
      { required: true, message: '请输入最大缓存', trigger: 'blur' },
      { pattern: /^[1-9]*[1-9][0-9]*$/, message: '请输入大于0的数', trigger: 'blur' }
    ]
  },
  {
    type: 'Number',
    label: '预最大缓存',
    prop: 'ready_MaxCache',
    min: 0,
    rules: [
      { required: true, message: '请输入【预到位最大缓存】', trigger: 'blur' },
      { pattern: /^[0-9]*[0-9][0-9]*$/, message: '请输入大于0的数', trigger: 'blur' }
    ]
  },
  { type: 'Number', label: '当前剩余缓存', prop: 'currentCach', min: 0 },
  { type: 'Number', label: '预剩余缓存位', prop: 'ready_CurrentCache', min: 0 },

  { type: 'Textarea', label: '条码队列', prop: 'currentBarCodes' },
  { type: 'Textarea', label: '预条码队列', prop: 'ready_CurrentBarCodes' },

  { type: 'Textarea', label: '说明', prop: 'remark' }
]

export const lineCacheCrud = {
  add: 'WarehouseManagement.LineCache.Create',
  edit: 'WarehouseManagement.LineCache.Update',
  del: 'WarehouseManagement.LineCache.Delete'
}
