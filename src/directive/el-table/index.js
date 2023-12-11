// 自适应表格高度
import adaptive from './adaptive'

const install = function (Vue) {
  // 绑定v-adaptive指令
  Vue.directive('adaptive', adaptive)
  // Vue.directive('el-height-adaptive-table', adaptive)
}

if (window.Vue) {
  window['adaptive'] = adaptive
  // window['el-height-adaptive-table'] = adaptive
  Vue.use(install) // eslint-disable-line
}

adaptive.install = install
export default adaptive
