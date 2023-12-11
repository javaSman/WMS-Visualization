import { validateKey } from '@/utils/validate.js'

export const queryItems = [{ type: 'Input', placeholder: '搜索...', prop: 'Filter' }]

export const formList = [
  {
    type: 'Input',
    label: '字典名称',
    prop: 'name',
    rules: [
      { required: true, message: '请输入字典名称', trigger: 'blur' },
      { addOnly: true, trigger: 'blur', tableName: 'base_dict', validator: validateKey }
    ]
  },
  {
    type: 'Input',
    label: '字典描述',
    prop: 'description',
    rules: [{ required: true, message: '请输入字典描述', trigger: 'blur' }]
  }
]

export const column = [
  { prop: 'name', label: '字典名称', sortAble: true },
  { prop: 'description', label: '字典描述', sortAble: true }
]
export const detailCol = [
  {
    prop: 'label',
    label: '字典标签',
    type: 'colType/Input',
    required: true,
    rules: [{ required: true, message: '请输入字典标签', trigger: 'blur' }]
  },
  {
    prop: 'value',
    label: '字典值',
    type: 'colType/Input',
    required: true,
    rules: [{ required: true, message: '请输入字典值', trigger: 'blur' }]
  },
  {
    prop: 'note',
    label: '描述',
    type: 'colType/Input'
  },
  {
    prop: 'sort',
    label: '排序',
    type: 'colType/Number',
    required: true,
    rules: [{ required: true, message: '请输入排序', trigger: 'blur' }]
  }
]

// 权限
export const DictCrud = {
  add: 'Systems.DataDictionary.Create',
  edit: 'Systems.DataDictionary.Update',
  del: 'Systems.DataDictionary.Delete'
}
export const DictDetailCrud = {
  add: 'Systems.DataDictionary.Create',
  save: 'Systems.DataDictionary.Update',
  del: 'Systems.DataDictionary.Delete',
  reset: 'Systems.DataDictionary.Create'
}
