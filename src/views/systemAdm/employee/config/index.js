export const queryItems = [{ type: 'Input', placeholder: '搜索...', prop: 'Filter' }]

export const formList = [
  {
    type: 'Input',
    label: '职员名称',
    prop: 'name',
    unique: true,
    rules: [{ required: true, message: '请输入名称', trigger: 'blur' }]
  },
  {
    type: 'Input',
    label: '电话',
    prop: 'phone',
    rules: [{ required: true, message: '请输入电话', trigger: 'blur' }]
  },
  {
    type: 'Input',
    label: '邮箱',
    prop: 'email',
    rules: [{ required: true, message: '请输入邮箱', trigger: 'blur' }]
  },
  { type: 'TreeSelect', label: '所属机构', prop: 'orgId', isHide: false, placeholder: '请选择所属机构', options: [] },
  // { type: 'Cascader', label: '所属机构', prop: 'orgId', isHide: false, options: [] },
  { type: 'Selects', label: '岗位', width: '100%', prop: 'jobs', options: [] },
  {
    type: 'Combogrid',
    label: '关联用户',
    prop: 'userId',
    options: [],
    optValue: 'id',
    optLabel: 'name',
    optTotal: '',
    col: [
      { label: '姓名', prop: 'name' },
      { label: '用户名', prop: 'userName' },
      { label: '邮箱', prop: 'email' },
      { label: '电话', prop: 'phoneNumber' }
    ],
    rules: [{ required: true, message: '请选择关联用户', trigger: 'blur' }]
  },
  {
    type: 'Radio',
    label: '性别',
    prop: 'gender',
    radios: [
      { label: '男', value: 1 },
      { label: '女', value: 0 }
    ],
    rules: [{ required: true, message: '请选择性别', trigger: 'blur' }]
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
  }
]

export const EmployeeCrud = {
  add: 'Systems.Employee.Create',
  edit: 'Systems.Employee.Update',
  del: 'Systems.Employee.Delete'
}
