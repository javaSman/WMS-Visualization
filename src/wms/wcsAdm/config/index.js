export const queryItems = [
  { type: 'Select', label: '仓库编码', prop: 'WarehouseID', options: [] },
  { type: 'Input', label: '任务号', prop: 'TaskId' },
  { type: 'Input', label: '托盘号', prop: 'BoxId' },
  { type: 'Select', label: '任务状态', prop: 'State', options: [] },
  { type: 'Select', label: '任务类型', prop: 'TaskType', options: [] },
  { type: 'Input', label: '起始位置', prop: 'BeginPostion' },
  { type: 'Input', label: '结束位置', prop: 'EndPostion' },
  { type: 'Input', label: '备注', prop: 'Remark' },
  {
    type: 'DateRangePart',
    label: '创建时间',
    // prop: 'registrationEndTime',
    startProp: 'CreateBeginTime',
    endProp: 'CreateEndTime',
    dateType: 'datetime',
    valueFormat: 'yyyy-MM-dd HH:mm:ss',
    labelFormat: 'yyyy-MM-dd HH:mm:ss',
    startDefaultTime: '08:00:00',
    endDefaultTime: '20:00:00',
    formStyle: 'width:180px',
    rules: [{ required: true, message: '请选择创建时间', trigger: 'blur' }],
    layout: { span: undefined, xs: 24, sm: 16, md: 12, lg: 8, xl: 8 }
  },
  {
    type: 'DateRangePart',
    label: '更新时间',
    // prop: 'registrationEndTime',
    startProp: 'UpdateBeginTime',
    endProp: 'UpdateEndTime',
    dateType: 'datetime',
    valueFormat: 'yyyy-MM-dd HH:mm:ss',
    labelFormat: 'yyyy-MM-dd HH:mm:ss',
    startDefaultTime: '08:00:00',
    endDefaultTime: '20:00:00',
    formStyle: 'width:180px',
    rules: [{ required: true, message: '请选择更新时间', trigger: 'blur' }],
    layout: { span: undefined, xs: 24, sm: 16, md: 12, lg: 8, xl: 8 }
  }
]

export const wcsFormList = [
  { type: 'Input', label: '任务号', prop: 'taskId', disabled: true },
  { type: 'Select', label: '任务状态', prop: 'state', options: [] },
  { type: 'Select', label: '任务类型', prop: 'taskType', options: [], disabled: true },
  { type: 'Input', label: '箱子编号', prop: 'boxID', disabled: true },
  { type: 'Input', label: '起始位置', prop: 'beginPostion', disabled: true },
  { type: 'Input', label: '结束位置', prop: 'endPostion', disabled: true },
  { type: 'Select', label: '输送线层', prop: 'floor', options: [], disabled: true },
  { type: 'Input', label: '失败次数', prop: 'failCount', disabled: true },
  {
    type: 'Textarea',
    label: '备注',
    prop: 'remark',
    minRows: 2,
    maxRows: 4,
    span: 24
  }
]
export const reportFormList = [
  {
    type: 'Select',
    label: '任务状态',
    prop: 'state',
    options: [],
    rules: [{ required: true, message: '请选择任务状态', trigger: 'blur' }]
  }
]
export const resendFormList = [
  {
    type: 'Input',
    label: '任务编号',
    prop: 'taskId',
    rules: [{ required: true, message: '请选择任务状态', trigger: 'blur' }]
  }
]

// 权限
export const WcsCrud = {
  // edit: 'TaskInfoManage.TaskInfo',
  download: 'TaskInfoManage.TaskInfo'
}

// wcs，非标按钮
export const wcsBtnItems = [
  {
    // 优先
    langLabel: 'button.priority',
    clickFun: 'toPriority',
    disabled: 'single',
    permission: 'TaskInfoManage.TaskInfo.Update',
    styleType: 'primary',
    icon: 'el-icon-top'
  },
  {
    // 报工
    langLabel: 'button.reportTask',
    clickFun: 'toReportTask',
    disabled: 'single',
    permission: 'TaskInfoManage.TaskInfo.Update',
    styleType: 'primary',
    icon: 'el-icon-edit'
  },
  {
    // 批量取消
    langLabel: 'button.BatchCancel',
    clickFun: 'toBatchCancel',
    disabled: 'multipe',
    permission: 'TaskInfoManage.TaskInfo.Update',
    styleType: 'primary',
    icon: 'el-icon-edit'
  },
  {
    // 强制更新任务状态
    langLabel: 'button.ForceUpdateTaskState',
    clickFun: 'toForceUpdateTaskState',
    disabled: 'multipe',
    permission: 'TaskInfoManage.TaskInfo.ForceUpdateTaskState',
    styleType: 'danger',
    icon: 'el-icon-edit'
  }
  // {
  //   // 执行
  //   langLabel: 'button.execute',
  //   clickFun: 'toExecute',
  //   disabled: 'single',
  //   permission: 'WCSTaskManage.WCSTask.Update',
  //   styleType: 'success',
  //   icon: 'el-icon-edit'
  // },
  // {
  //   // 取消
  //   langLabel: 'button.cancel',
  //   clickFun: 'toCancel',
  //   disabled: 'single',
  //   permission: 'WCSTaskManage.WCSTask.Update',
  //   styleType: 'danger',
  //   icon: 'el-icon-close'
  // },

  // {
  //   // 重发
  //   langLabel: 'button.resend',
  //   clickFun: 'toResend',
  //   disabled: 'single',
  //   loading: false,
  //   permission: 'TaskInfoManage.TaskInfo.Create',
  //   styleType: 'success',
  //   icon: 'el-icon-refresh-left'
  // }
]
