import request from '@/utils/requestTwo'

export function getTenants(params) {
  return request({
    url: 'api/multi-tenancy/tenants',
    method: 'get',
    params
  })
}

export function add(data) {
  return request({
    url: '/api/multi-tenancy/tenants',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: 'api/multi-tenancy/tenants/' + id,
    method: 'delete'
  })
}

export function edit(id, data) {
  return request({
    url: 'api/multi-tenancy/tenants/' + id,
    method: 'put',
    data
  })
}

export function getTenant(id) {
  return request({
    url: 'api/multi-tenancy/tenants/' + id,
    method: 'get'
  })
}
export default { add, edit, del, getTenants, getTenant }
