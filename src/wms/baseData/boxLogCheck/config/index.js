import { validateKey } from '@/utils/validate.js'

export const queryItems = [
  { type: 'Input', label: '工控机编号', prop: 'whichOne' },
  { type: 'Input', label: '日志内容', prop: 'logmsg' },
  {
    type: 'DateRangePart',
    label: '操作时间',
    // prop: 'registrationEndTime',
    startProp: 'logStartTime',
    endProp: 'logEndTime',
    dateType: 'datetime',
    valueFormat: 'yyyy-MM-dd HH:mm:ss',
    labelFormat: 'yyyy-MM-dd HH:mm:ss',
    startDefaultTime: '08:00:00',
    endDefaultTime: '20:00:00',
    formStyle: 'width:180px',
    rules: [{ required: true, message: '请选择时间', trigger: 'blur' }],
    layout: { span: undefined, xs: 24, sm: 16, md: 12, lg: 8, xl: 8 }
  }
]

export const formList = []

export const boxLogCheckCrud = {}
