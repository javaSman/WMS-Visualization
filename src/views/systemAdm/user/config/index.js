export const queryItems = [{ type: 'Input', placeholder: '搜索...', prop: 'Filter' }]

export const rePasswordFormList = [
  { type: 'Input', label: '用户名', prop: 'userName', disabled: true },
  {
    type: 'Password',
    label: '密码',
    prop: 'password',
    icon: 'el-icon-info',
    tip: '密码至少为6个字符,<br/>密码至少包含一位非字母数字字符,<br/>密码至少包含一位小写字母("a" - "z"),<br/>密码至少包含一位大写字母("A" - "Z")',
    rules: [{ required: true, message: '请输入密码', trigger: 'blur' }]
  }
]

export const formList = [
  {
    type: 'Input',
    label: '用户名',
    prop: 'userName',
    unique: true,
    rules: [{ required: true, message: '请输入用户名', trigger: 'blur' }]
  },
  { type: 'Input', label: '电话', prop: 'phoneNumber' },
  {
    type: 'Input',
    label: '姓名',
    prop: 'name',
    rules: [{ required: true, message: '请输入姓名', trigger: 'blur' }]
  },
  { type: 'Input', label: '邮箱', prop: 'email' },
  {
    type: 'Selects',
    label: '角色',
    prop: 'roleNames',
    options: [],
    width: '100%',
    rules: [{ required: true, message: '请选择角色', trigger: 'blur' }]
  },
  {
    type: 'Radio',
    prop: 'lockoutEnabled',
    label: '启动锁定',
    radios: [
      { label: '是', value: true },
      { label: '否', value: false }
    ],
    rules: [{ required: true, message: '请选择是否锁定', trigger: 'blur' }]
  },
  {
    type: 'Password',
    label: '密码',
    prop: 'password',
    icon: 'el-icon-info',
    // isHide: true,
    tip: '密码至少为6个字符,<br/>密码至少包含一位非字母数字字符,<br/>密码至少包含一位小写字母("a" - "z"),<br/>密码至少包含一位大写字母("A" - "Z")',
    rules: [{ required: true, message: '请输入密码', trigger: 'blur' }]
  }
]

export const createFormList = [
  {
    type: 'Input',
    label: '用户名',
    prop: 'userName',
    unique: true,
    rules: [{ required: true, message: '请输入用户名', trigger: 'blur' }]
  },
  { type: 'Input', label: '电话', prop: 'phoneNumber' },
  {
    type: 'Input',
    label: '姓名',
    prop: 'name',
    rules: [{ required: true, message: '请输入姓名', trigger: 'blur' }]
  },
  { type: 'Input', label: '邮箱', prop: 'email' },
  {
    type: 'Password',
    label: '密码',
    prop: 'password',
    icon: 'el-icon-info',
    tip: '密码至少为6个字符,\n<br/>密码至少包含一位非字母数字字符,<br/>密码至少包含一位小写字母("a" - "z"),<br/>密码至少包含一位大写字母("A" - "Z")',
    rules: [{ required: true, message: '请输入密码', trigger: 'blur' }]
  },
  {
    type: 'Selects',
    label: '角色',
    prop: 'roleNames',
    options: [],
    width: '100%',
    rules: [{ required: true, message: '请选择角色', trigger: 'blur' }]
  },
  {
    type: 'Radio',
    prop: 'lockoutEnabled',
    label: '启动锁定',
    radios: [
      { label: '是', value: true },
      { label: '否', value: false }
    ],
    rules: [{ required: true, message: '请选择是否锁定', trigger: 'blur' }]
  }
]

export const updateFormList = [
  {
    type: 'Input',
    label: '用户名',
    prop: 'userName',
    disabled: true,
    rules: [{ required: true, message: '请输入用户名', trigger: 'blur' }]
  },
  { type: 'Input', label: '电话', prop: 'phoneNumber' },
  {
    type: 'Input',
    label: '姓名',
    prop: 'name',
    rules: [{ required: true, message: '请输入姓名', trigger: 'blur' }]
  },
  { type: 'Input', label: '邮箱', prop: 'email' },
  {
    type: 'Selects',
    label: '角色',
    prop: 'roleNames',
    options: [],
    width: '100%',
    rules: [{ required: true, message: '请选择角色', trigger: 'blur' }]
  },
  {
    type: 'Radio',
    prop: 'lockoutEnabled',
    label: '启动锁定',
    radios: [
      { label: '是', value: true },
      { label: '否', value: false }
    ],
    rules: [{ required: true, message: '请选择是否锁定', trigger: 'blur' }]
  }
]

export const UserCrud = {
  add: 'AbpIdentity.Users.Create',
  edit: 'AbpIdentity.Users.Update',
  del: 'AbpIdentity.Users.Delete',
  RePassword: 'AbpIdentity.Users.ManagePermissions'
}
