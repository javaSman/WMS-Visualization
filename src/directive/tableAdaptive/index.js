import { addResizeListener, removeResizeListener } from 'element-ui/src/utils/resize-event'
import Vue from 'vue'
/**
 * 自适应表格高度
 * 使用：
 * <el-table height="100px" v-adaptive="{bottomOffset: 30}">...</el-table>
 * el-table height (必须设置高度属性，不可省略，100无具体意义，仅为初始值)
 * 修改为(1)填-1时时高度自适应(2)填其他数值时使用填写高度(3)不填时为表格高度不填状态
 * bottomOffset 代表距离底部的距离
 * bottomOffset: 30(default)   // 从这一页的底部到表格的高度.
 */
// 设置表格高度
const doResize = (el, binding, vnode) => {
  const { componentInstance: $table } = vnode
  // 获取调用传递过来的数据
  const { value } = binding
  // if (!$table.height) {
  if ($table.height === -1) {
    // 获取距底部距离（用于展示页码等信息）
    const bottomOffset = (value && value.bottomOffset) || 90
    if (!$table) return
    // 计算列表高度并设置
    const height = window.innerHeight - el.getBoundingClientRect().top - bottomOffset
    $table.layout.setHeight(height)
    $table.doLayout()
  }
}

Vue.directive('tableAdaptive', {
  // 初始化设置
  bind(el, binding, vnode) {
    // 设置resize监听方法
    el.resizeListener = () => {
      doResize(el, binding, vnode)
    }
    // window.onresize = () => {
    //   console.log('onresize')
    // }
    // parameter 1 is must be "Element" type
    let domEl = document.getElementsByClassName('head-container')[0]
    if (domEl) {
      addResizeListener(domEl, el.resizeListener)
    }
    addResizeListener(window.document.body, el.resizeListener)
    // 绑定监听方法到addResizeListener
    // window.addEventListener('resize', el.resizeListener)
  },
  // 绑定默认高度
  inserted(el, binding, vnode) {
    doResize(el, binding, vnode)
  },
  // 销毁时设置
  unbind(el) {
    removeResizeListener(window.document.body, el.resizeListener)
    // 移除resize监听
    window.removeEventListener('resize', el.resizeListener)
  }
})
