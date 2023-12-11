import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import Config from '@/settings'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: Config.timeout // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['X-Token'] = getToken()
    }
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
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data

    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 20000) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // to re-login
        MessageBox.confirm(
          'You have been logged out, you can cancel to stay on this page, or log in again',
          'Confirm logout',
          {
            confirmButtonText: 'Re-Login',
            cancelButtonText: 'Cancel',
            type: 'warning'
          }
        ).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })

    // 这里可以增加对其他状态的判断，例如401 验证用户当前的登录状态
    // try {
    //   code = error.response.data.status
    // } catch (e) {
    //   if (error.toString().indexOf('Error: timeout') !== -1) {
    //     Notification.error({
    //       title: '网络请求超时',
    //       duration: 5000
    //     })
    //     return Promise.reject(error)
    //   }
    // }
    // if (code) {
    //   if (code === 401) {
    //     store.dispatch('LogOut').then(() => {
    //       // 用户登录界面提示
    //       Cookies.set('point', 401)
    //       location.reload()
    //     })
    //   } else if (code === 403) {
    //     router.push({ path: '/401' })
    //   } else {
    //     const errorMsg = error.response.data.message
    //     if (errorMsg !== undefined) {
    //       Notification.error({
    //         title: errorMsg,
    //         duration: 5000
    //       })
    //     }
    //   }
    // } else {
    //   Notification.error({
    //     title: '接口请求失败',
    //     duration: 5000
    //   })
    // }
    return Promise.reject(error)
  }
)

export default service
