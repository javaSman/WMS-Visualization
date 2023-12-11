export const queryItems = [
  { type: 'Input', label: '用户名', prop: 'UserName' },
  { type: 'Select', label: 'http方法', prop: 'HttpMethod', options: [] },
  { type: 'Input', label: '方法', prop: 'httpMethod' },
  { type: 'Input', label: '请求结果编码', prop: 'httpStatusCode' },
  { type: 'Input', label: '执行时长-起', prop: 'minExecutionDuration' },
  { type: 'Input', label: '执行时长-尾', prop: 'maxExecutionDuration' }
]
export const expandList = [
  { label: '服务名称', prop: 'serviceName' },
  { label: '方法名称', prop: 'methodName', width: '120px' },
  { label: '执行耗时', prop: 'executionDuration', width: '90px' },
  { label: '请求参数', prop: 'parameters' }
]
