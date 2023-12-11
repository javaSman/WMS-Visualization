// 作用：点击当前元素触发水波纹效果
import waves from './waves'

const install = function (Vue) {
  Vue.directive('waves', waves)
}

if (window.Vue) {
  window.waves = waves
  Vue.use(install) // eslint-disable-line
}

waves.install = install
export default waves
