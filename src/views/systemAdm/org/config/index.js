export const queryItems = [{ type: 'Input', placeholder: '搜索...', prop: 'Filter' }]

export const formList = [
  {
    type: 'Select',
    label: '机构类型',
    prop: 'categoryId',
    options: [],
    rules: [{ required: true, message: '请选择机构类型', trigger: 'blur' }]
  },
  {
    type: 'Input',
    label: '机构名称',
    prop: 'name',
    rules: [{ required: true, message: '请输入机构名称', trigger: 'blur' }]
  },
  {
    type: 'Radio',
    label: '状态',
    prop: 'enabled',
    radios: [
      { label: '启用', value: true },
      { label: '禁用', value: false }
    ],
    rules: [{ required: true, message: '请选择状态', trigger: 'blur' }]
  },
  {
    type: 'Radio',
    label: '顶级机构',
    prop: 'isTop',
    radios: [
      { label: '是', value: true },
      { label: '否', value: false }
    ],
    rules: [{ required: true, message: '请选择是否顶级机构', trigger: 'blur' }]
  },
  {
    type: 'Number',
    label: '机构排序',
    prop: 'sort',
    step: 1,
    rules: [{ required: true, message: '请输入机构排序', trigger: 'blur' }]
  },
  { type: 'TreeSelect', label: '上级机构', prop: 'pid', isHide: true, placeholder: '请选择上级机构', options: [] }
  // { type: 'Cascader', label: '上级机构', prop: 'pid', isHide: true, options: [] }
]

export const OrganizationCrud = {
  add: 'Systems.Organization.Create',
  edit: 'Systems.Organization.Update',
  del: 'Systems.Organization.Delete'
}
