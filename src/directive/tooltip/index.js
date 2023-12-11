import Vue from 'vue'
// 修改表格验证提示信息字体大小
Vue.directive('tooltip', {
  bind(el, binding, vnode) {
    const formItem = el.querySelector('.el-form-item .el-form-item__content')
    formItem.onmouseenter = s => {
      let current = el
      let formItemContent = current.children[0]
      if (formItemContent.children && formItemContent.children.length > 1) {
        const errorItem = formItem.querySelector('.el-form-item__error')
        errorItem.style.fontSize = '40px'
      }
    }
  }
})
