
// 引入路由和storage工具函数
import storage from '@/utils/storage'
import store from '../store'
// import router from "@/router/index.js"
// import SizeSelect from '@/components/SizeSelect'

let lastTime = new Date().getTime()
let currentTime = new Date().getTime()
let timeOut = 3 * 60 * 1000 // 设置超时时间: 3分钟
// let timeOut = 1000 * 60 * 1 // 设置超时时间: 30分钟

window.onload = function () {
  window.document.onmousedown = function () { // 鼠标离开事件
    storage.setItem('lastTime', new Date().getTime())
  }
}

function checkTimeout() {
  currentTime = new Date().getTime()		// 更新当前时间
  lastTime = storage.getItem('lastTime')
  // console.log(this.$route.fullPath)
  if (currentTime - lastTime > timeOut) { // 判断是否超时
    storage.clear() // 清除时间戳
    store.dispatch('user/logout') // 退出登录
    location.reload() // 自动刷新
    // this.$router.push(`/login#/baseInfo/materials`)
  }
}

export default function () {
  /* 定时器 间隔3秒检测是否长时间未操作页面 */
  window.setInterval(checkTimeout, 3000)
}
