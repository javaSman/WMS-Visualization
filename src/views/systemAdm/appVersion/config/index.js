export const versionQueryItems = [
  { type: 'Input', label: '文件名称', prop: 'FileName' },
  { type: 'Input', label: '路径', prop: 'DownloadPath' },
  { type: 'Input', label: '版本号', prop: 'Version' },
  { type: 'Input', label: '版本描述', prop: 'VersionDesc' }
]

/** 公告列表-表格操作按钮 */
export const tableBtn = {
  width: '200',
  permission: 'Systems.AppVersion.Export',
  btnItem: [
    {
      btnLabel: '下载',
      btnType: 'primary',
      clickFun: 'toDownload',
      isHide: [],
      permission: 'Systems.AppVersion.Export'
    },
    {
      btnLabel: '查看二维码',
      btnType: 'primary',
      clickFun: 'toViewCode',
      isHide: [],
      permission: 'Systems.AppVersion.Export'
    }
  ]
}

export const formList = [
  {
    type: 'Input',
    label: '版本号',
    prop: 'Version',
    rules: [
      { required: true, message: '请输入版本号', trigger: 'blur' },
      {
        pattern: /^([1-9]\d|[1-9])(\.([1-9]\d|\d)){2}$/,
        message: '请正确输入版本号，格式为xx.xx.xx',
        trigger: 'blur'
      }
    ]
  },
  {
    type: 'Textarea',
    label: '版本描述',
    prop: 'VersionDesc',
    rules: [{ required: true, message: '请输入版本描述', trigger: 'blur' }]
  }
]

// 权限
export const versionCrud = {
  import: 'Systems.AppVersion.Import',
  export: 'Systems.AppVersion.Export'
}
