// import router from '../router'
import i18n from '@/lang'
import axios from 'axios'
import { Message, Notification } from 'element-ui'
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: window.globalConfig.base.ip + ':' + window.globalConfig.base.backend_port, // url = base url + request url
  timeout: 10000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    if (getToken()) {
      // 让每个请求携带自定义token 请根据实际情况自行修改
      config.headers['Authorization'] = 'Bearer ' + getToken()
      config.headers['X-Token'] = getToken()
    }
    config.headers['Content-Type'] = 'application/json'
    config.headers['Accept-Language'] = 'zh-Hans'
    config.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8;'
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor 拦截器
service.interceptors.response.use(
  response => {
    const code = response.status
    // 请求接口 2XX以外 状态码
    if (code < 200 || code > 300) {
      Message({
        message: response.message,
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject('error')
    } else {
      // 请求成功
      // 请求接口 2XX 状态码
      return response.data
    }
  },
  error => {
    // 请求出现错误
    console.log('error' + error) // for debug
    // Message({
    //   message: error.message,
    //   type: 'error',
    //   duration: 5 * 1000
    // })
    let code = 0
    try {
      code = error.response.status
    } catch (e) {
      // 无网络提示
      if (error.toString().indexOf('Error: Network Error') !== -1) {
        Message({
          message: error.message + '，网络连接失败，请检查网络设置后重试',
          type: 'error',
          duration: 5 * 1000
        })
        return Promise.reject(error)
      } else if (error.toString().indexOf('Error: timeout') !== -1) {
        // 请求超时提示
        Message({
          message: '网络请求超时，' + error.message,
          type: 'error',
          duration: 5 * 1000
        })
        return Promise.reject(error)
      }
    }
    // 有状态码
    if (code) {
      // if (code === 403) {
      //   router.push({
      //     path: '/403'
      //   })
      // } else
      // 未有场景测试401
      if (code === 401) {
        this.$store.dispatch('user/logout').then(() => {
          // 用户登录界面提示
          location.reload()
        })
        // 异常状态码和描述、额外提示 都使用消息提示
        // } else if (code === 500 || code === 415 || code === 404 || code === 403 || code === 400) {
        //   let errorMsg = error + ',' + error.response.statusText
        //   // 判断是否有额外提示，若有着追加上
        //   if (errorMsg !== undefined && error.response.data.error !== undefined) {
        //     errorMsg = errorMsg + ',</br>' + error.response.data.error.message
        //   }
        //   Message({
        //     message: errorMsg,
        //     dangerouslyUseHTMLString: true,
        //     type: 'error',
        //     duration: 5 * 1000
        //   })
      } else {
        // 异常状态码和描述，使用消息提示
        let errorMsg = error + ',' + error.response.statusText
        Message({
          message: errorMsg,
          dangerouslyUseHTMLString: true,
          type: 'error',
          duration: 5 * 1000
        })
        // 判断是否有额外提示，若有使用悬浮通知提醒
        if (error.response.data.error !== undefined) {
          let reg = new RegExp(',', 'g')
          let errNotify = error.response.data.error.message.replace(reg, ',<br>')
          Notification({
            title: i18n.t('notify.failure'), // '失败',
            dangerouslyUseHTMLString: true,
            // 接口返回数据，待中英配置
            message: errNotify,
            type: 'error',
            duration: 5 * 1000
          })
        }
      }
    } else {
      // 无状态码/状态码为0
      // 其他-提示接口请求失败
      Message({
        message: '接口请求失败',
        type: 'error',
        duration: 5 * 1000
      })
    }
    return Promise.reject(error)
  }
)

export default service
