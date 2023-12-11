export const queryItems = [
  { type: 'Input', label: '模板名称', prop: 'TemplateName' },
  { type: 'Input', label: '模板描述', prop: 'TemplateDesc' }
]

export const formList = [
  {
    type: 'Input',
    label: '模板名称',
    prop: 'templateName',
    rules: [{ required: true, message: '请输入模板名称', trigger: 'blur' }]
  },
  {
    type: 'Input',
    label: '模板描述',
    prop: 'templateDesc',
    rules: [{ required: true, message: '请输入模板描述', trigger: 'blur' }]
  }
]

export const column = [
  { prop: 'templateName', label: '模板名称', sortAble: true },
  { prop: 'templateDesc', label: '模板描述', sortAble: true }
]
export const detailCol = [
  {
    prop: 'label',
    label: '标题',
    type: 'colType/Input',
    required: true,
    rules: [{ required: true, message: '请输入标题', trigger: 'blur' }]
  },
  {
    prop: 'prop',
    label: '字段名',
    type: 'colType/Input',
    required: true,
    rules: [{ required: true, message: '请输入字段名', trigger: 'blur' }]
  },
  { prop: 'width', label: '宽度', type: 'colType/Number' },
  { prop: 'type', label: '格式类型', type: 'colType/Cascader', options: [], width: 200 },
  { prop: 'sortAble', label: '是否可排序', type: 'colType/Switch', width: 100 },
  { prop: 'show', label: '显示', type: 'colType/Switch', width: 70 },
  { prop: 'changeType', label: '更新类型', show: false }
]

// 权限
export const TableTemplateCrud = {
  add: 'Systems.TableTemplate.Create',
  edit: 'Systems.TableTemplate.Update',
  del: 'Systems.TableTemplate.Delete'
}
export const TableTemplateDetailCrud = {
  add: 'Systems.TableTemplate.Create',
  save: 'Systems.TableTemplate.Update',
  del: 'Systems.TableTemplate.Delete',
  reset: 'Systems.TableTemplate.Create'
}
