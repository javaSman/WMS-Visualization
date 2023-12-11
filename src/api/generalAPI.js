// 通用API文件
import request from '@/utils/requestTwo'
function commonAPI(router) {
  const url = '/api/' + router + '/'
  const API = {
    /** 通用接口------起 */
    /** get 方法- params */
    get(name, params, other) {
      let end = ''
      if (other) {
        end = '/' + other
      }
      return request({
        url: url + name + end,
        method: 'get',
        params
      })
    },

    /** get 方法- data */
    dataGet(name, params, other) {
      let end = ''
      if (other) {
        end = '/' + other
      }
      return request({
        url: url + name + end,
        method: 'get',
        data: params
      })
    },

    /** get 方法-  params,data */
    bothGet(name, params, data, other) {
      let end = ''
      if (other) {
        end = '/' + other
      }
      return request({
        url: url + name + end,
        method: 'get',
        params,
        data: data
      })
    },

    /** get 方法- 导出-响应的数据类型 */
    getExport(name, params, other, otherResType) {
      let end = ''
      if (other) {
        end = '/' + other
      }
      let resType = otherResType || 'blob'
      return request({
        url: url + name + end,
        method: 'get',
        params,
        responseType: resType
      })
    },

    /**
     * post 方法- params
     * 数据批量提交
     */
    post(name, params, other) {
      let end = ''
      if (other) {
        end = '/' + other
      }
      return request({
        url: url + name + end,
        method: 'post',
        params
      })
    },

    /**
     * post 方法- data
     * 默认新增，other可配置
     */
    dataPost(name, params, other) {
      let end = ''
      if (other) {
        end = '/' + other
      }
      return request({
        url: url + name + end,
        method: 'post',
        data: params
      })
    },

    /** post 方法- params,data */
    bothPost(name, params, data, other) {
      let end = ''
      if (other) {
        end = '/' + other
      }
      return request({
        url: url + name + end,
        method: 'post',
        params,
        data: data
      })
    },

    /** post 方法- params,data,上传处理进度的事件配置 */
    bothPostUpload(name, params, data, other, onUploadPro) {
      let end = ''
      if (other) {
        end = '/' + other
      }
      return request({
        url: url + name + end,
        method: 'post',
        params,
        data: data,
        onUploadProgress: progressEvent => {
          // 原生获取上传进度的事件
          if (progressEvent.lengthComputable) {
            onUploadPro && onUploadPro(progressEvent)
          }
        }
      })
    },

    /** post 方法- params,data,下载处理进度的事件配置 */
    bothPostDownload(name, params, data, other, onDownloadPro) {
      let end = ''
      if (other) {
        end = '/' + other
      }
      return request({
        url: url + name + end,
        method: 'post',
        params,
        data: data,
        onDownloadProgress: progressEvent => {
          // 原生获取下载进度的事件
          if (progressEvent.lengthComputable) {
            onDownloadPro && onDownloadPro(progressEvent)
          }
        }
      })
    },

    /** post 方法- params */
    put(name, params, other) {
      let end = ''
      if (other) {
        end = '/' + other
      }
      return request({
        url: url + name + end,
        method: 'put',
        params
      })
    },

    /** put 方法- data */
    dataPut(name, params, other) {
      let end = ''
      if (other) {
        end = '/' + other
      }
      return request({
        url: url + name + end,
        method: 'put',
        data: params
      })
    },

    /** put 方法-  params,data */
    bothPut(name, params, data, other) {
      let end = ''
      if (other) {
        end = '/' + other
      }
      return request({
        url: url + name + end,
        method: 'put',
        params,
        data: data
      })
    },

    /** delete 方法- params */
    delete(name, params, other) {
      let end = ''
      if (other) {
        end = '/' + other
      }
      return request({
        url: url + name + end,
        method: 'delete',
        params
      })
    },

    /** delete 方法- data */
    dataDelete(name, params, other) {
      let end = ''
      if (other) {
        end = '/' + other
      }
      return request({
        url: url + name + end,
        method: 'delete',
        data: params
      })
    },

    /** delete 方法- params,data */
    bothDelete(name, params, data, other) {
      let end = ''
      if (other) {
        end = '/' + other
      }
      return request({
        url: url + name + end,
        method: 'delete',
        params,
        data: data
      })
    },
    /** 通用接口------终 */

    /** 特殊接口------起 */
    /**
     * 获取所有数据,other可配置,
     * 默认方法为'all',base/identity路由时other为null，方法为''
     *  */
    getData(name, params, other) {
      let end = '/all'
      if (other) {
        end = '/' + other
      } else if (other === null) {
        end = ''
      }
      return request({
        url: url + name + end,
        method: 'get',
        params
      })
    },

    /** 获取表单数据来编辑,多级表还包括明细数据 */
    getForm(name, id, other) {
      let end = ''
      if (other) {
        end = '/' + other
      }
      return request({
        url: url + name + '/' + id + end,
        method: 'get'
      })
    },

    /** 修改表单数据 */
    update(name, params, other) {
      return request({
        url: url + name + '/' + (other || 'update'),
        method: 'put',
        data: params
      })
    },

    /** 删除数据 */
    del(name, id) {
      return request({
        url: url + name + '/' + id,
        method: 'delete'
      })
    },

    /** 获取字典键值对 */
    getDict(name, params) {
      return request({
        url: url + name + '/' + 'name',
        method: 'get',
        params
      })
    },

    /** 删除组织机构 */
    delOrg(name, id) {
      return request({
        url: url + name + '/Delete?id=' + id,
        method: 'post'
      })
    }
    /** 特殊接口------终 */
  }
  return API
}

export const API = commonAPI('business') // 业务路由
export const baseAPI = commonAPI('base') // 系统管理 根据需求重写接口的-base路由
export const identityAPI = commonAPI('identity') // 系统管理 原框架原始接口的-identity路由
export const kbAPI = commonAPI('kb') // 系统管理 原框架原始接口的-identity路由
export const wcsAPI = commonAPI('wcs') // 系统管理 原框架原始接口的-identity路由
