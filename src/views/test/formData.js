// ------------------ 表单验证规则----------------------

const checkPhone = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('手机号不能为空'))
  } else {
    const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
    if (reg.test(value)) {
      callback()
    } else {
      return callback(new Error('请输入正确的手机号'))
    }
  }
}

// ------------------ 表单渲染----------------------

const formList = [
  {
    type: 'Input', // 类型
    label: '人员姓名', // 名称
    prop: 'name', // 关键字
    width: '100%', // 宽度
    placeholder: '请输入', // 输入提示
    disabled: true,
    // 表单验证
    rules: [
      {
        required: true,
        message: '请输入活动名称',
        trigger: 'blur'
      }
    ]
  },
  {
    type: 'Number',
    label: '数字',
    prop: 'number',
    width: '100%',
    placeholder: '请输入',
    min: 4,
    max: 200,
    precision: 3,
    step: 0.001,
    rules: [
      {
        required: true,
        message: '请输入活动名称',
        trigger: 'blur'
      }
    ]
  },
  {
    type: 'Input',
    label: '手机号',
    prop: 'phone',
    width: '100%',
    placeholder: '请输入',
    rules: [
      {
        required: true,
        validator: checkPhone,
        trigger: 'blur'
      }
    ]
  },
  {
    type: 'Password',
    label: '密码',
    prop: 'pwd',
    width: '100%',
    placeholder: '请输入',
    rules: [
      {
        required: true,
        message: '请输入',
        trigger: 'blur'
      }
    ]
  },
  {
    type: 'Radio',
    label: '单选框',
    prop: 'radio',
    width: '100%',
    placeholder: '请选择',
    radios: [
      {
        label: '男',
        value: 1
      },
      {
        label: '女',
        value: 2
      }
    ],
    change: () => {},
    rules: [
      {
        required: true,
        message: '请选择',
        trigger: 'blur'
      }
    ]
  },
  {
    type: 'Date',
    label: '日期',
    prop: 'date',
    width: '100%',
    placeholder: '请选择',
    change: () => {},
    rules: [
      {
        required: true,
        message: '请选择日期',
        trigger: 'blur'
      }
    ]
  },
  {
    type: 'Time',
    label: '时间选择',
    prop: 'time',
    width: '100%',
    placeholder: '请选择',
    pickerOptions: {
      selectableRange: '00:00:00 - 23:59:59'
    },
    change: () => {},
    rules: [
      {
        required: true,
        message: '请选择时间',
        trigger: 'blur'
      }
    ]
  },
  {
    type: 'DateTime',
    label: '日期时间',
    prop: 'dateTime',
    width: '100%',
    placeholder: '请选择',
    change: () => {},
    rules: [
      {
        required: true,
        message: '请选择日期时间',
        trigger: 'blur'
      }
    ]
  },
  {
    type: 'Daterange',
    label: '起止日期',
    prop: 'daterange',
    width: '100%',
    placeholder: '请选择',
    change: () => {},
    rules: [
      {
        required: true,
        message: '请选择日期',
        trigger: 'blur'
      }
    ]
  },
  {
    type: 'Timerange',
    label: '起止时间',
    prop: 'timerange',
    width: '100%',
    change: () => {},
    rules: [
      {
        required: true,
        message: '请选择时间时间',
        trigger: 'blur'
      }
    ]
  },
  {
    type: 'Datetimerange',
    label: '起止日期时间',
    prop: 'datetimerange',
    width: '100%',
    change: () => {},
    rules: [
      {
        required: true,
        message: '请选择日期时间',
        trigger: 'blur'
      }
    ]
  },
  {
    type: 'Switch',
    label: '开关',
    prop: 'switch',
    width: '100%',
    placeholder: '请选择',
    change: () => {},
    rules: [
      {
        required: true,
        message: '请选择',
        trigger: 'blur'
      }
    ]
  },
  {
    type: 'Select',
    label: '性别',
    prop: 'sex',
    width: '100%',
    // 渲染选项数组
    options: [
      {
        label: '男',
        value: 1
      },
      {
        label: '女',
        value: 2
      }
    ],
    // 内容变换
    change: () => {},
    placeholder: '请选择性别',
    rules: [
      {
        required: true,
        message: '请选择性别',
        trigger: 'change'
      }
    ]
  },
  {
    type: 'Select',
    label: '下拉单选',
    prop: 'select',
    width: '100%',
    options: [
      {
        label: '单选一',
        value: 1
      },
      {
        label: '单选二',
        value: 2
      }
    ],
    placeholder: '请选择下拉单选',
    change: () => {},
    rules: [
      {
        required: true,
        message: '请选择下拉单选',
        trigger: 'change'
      }
    ]
  },
  {
    type: 'TableSelect',
    label: '表格单选',
    prop: 'tableSelect',
    width: '100%',
    options: [
      {
        typeDesc: '',
        typeID: '',
        typeName: ''
      },
      {
        typeDesc: '11',
        typeID: '11',
        typeName: '11'
      },
      {
        typeDesc: '22',
        typeID: '22',
        typeName: '22'
      },
      {
        typeDesc: '33',
        typeID: '33',
        typeName: '33'
      }
    ],
    titleList: [
      {
        name: '物料编号',
        key: 'typeID'
      },
      {
        name: '物料类型',
        key: 'typeName'
      },
      {
        name: '物料描述',
        key: 'typeDesc'
      }
    ],
    placeholder: '请选择下拉单选',
    change: () => {},
    rules: [
      {
        required: true,
        message: '请选择下拉单选',
        trigger: 'change'
      }
    ]
  },
  {
    type: 'Selects',
    label: '下拉多选',
    prop: 'selects',
    width: '100%',
    options: [
      {
        label: '多选一',
        value: 1
      },
      {
        label: '多选二',
        value: 2
      },
      {
        label: '多选三',
        value: 3
      },
      {
        label: '多选四',
        value: 4
      },
      {
        label: '多选五',
        value: 5
      },
      {
        label: '多选六',
        value: 6
      }
    ],
    placeholder: '请选择下拉多选',
    change: () => {},
    rules: [
      {
        required: true,
        message: '请选择下拉多选',
        trigger: 'change'
      }
    ]
  },
  {
    type: 'Textarea',
    label: '文本框',
    prop: 'textarea',
    width: '100%',
    minRows: 2,
    maxRows: 4,
    placeholder: '请输入',
    rules: [
      {
        required: true,
        message: '请文本框内容',
        trigger: 'blur'
      }
    ]
  }
]

// ------------------ 表单按钮----------------------

const formHandle = [
  {
    type: 'primary',
    label: '确定',
    hide: true,
    handle: () => {}
  },
  {
    type: '',
    label: '取消',
    hide: true,
    handle: () => {}
  }
]
export default {
  formHandle,
  formList
}
