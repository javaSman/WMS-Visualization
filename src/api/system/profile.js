import request from '@/utils/requestTwo'

// 获取用户信息
export function getInfo(params) {
  return request({
    url: 'api/identity/my-profile',
    method: 'get',
    params
  })
}

// 修改密码
export function changePass(data) {
  return request({
    url: 'api/identity/my-profile/change-password',
    method: 'post',
    data
  })
}

// 修改个人信息
export function changeInfo(data) {
  return request({
    url: 'api/identity/my-profile',
    method: 'put',
    data
  })
}
export default { getInfo, changePass, changeInfo }
