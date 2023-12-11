export const queryItems = [{ type: 'Input', placeholder: '搜索...', prop: 'Filter' }]

export const formList = [
  {
    type: 'Input',
    label: '岗位名称',
    prop: 'name',
    unique: true,
    rules: [{ required: true, message: '请输入名称', trigger: 'blur' }]
  },
  { type: 'Input', label: '描述', prop: 'description' },
  {
    type: 'Number',
    label: '排序',
    prop: 'sort',
    step: 1,
    rules: [{ required: true, message: '请输入排序', trigger: 'blur' }]
  },
  {
    type: 'Radio',
    prop: 'enabled',
    label: '状态',
    radios: [
      { label: '启用', value: true },
      { label: '禁用', value: false }
    ],
    rules: [{ required: true, message: '请选择是否启用', trigger: 'blur' }]
  }
]

export const JobCrud = {
  add: 'Systems.Job.Create',
  edit: 'Systems.Job.Update',
  del: 'Systems.Job.Delete'
}
