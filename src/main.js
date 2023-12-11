import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import Element from 'element-ui'
import './styles/element-variables.scss'

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import i18n from './lang' // internationalization
import './icons' // icon
import './permission' // permission control
import './utils/error-log' // error log
import axios from './axios'
import moment from 'moment'

import '../src/directive/dialogDrag'
import '../src/directive/tableAdaptive'

import * as filters from './filters' // global filters
import Astrict from '../src/utils/astrict.js'

Vue.use(Element, {
  size: Cookies.get('size') || 'medium', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
})

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.filter('formatDate', function (value) {
  if (value) {
    require('moment').suppressDeprecationWarnings = true // 验证设置为true，避免验证
    return moment(String(value)).format('YYYY-MM-DD')
  }
})

Vue.filter('formatDateTime', function (value) {
  if (value) {
    require('moment').suppressDeprecationWarnings = true // 验证设置为true，避免验证
    return moment(String(value)).format('YYYY-MM-DD HH:mm:ss')
  }
})

Vue.filter('formatBoolean', function (value) {
  return value === true ? '是' : value === false ? '否' : value
})

Vue.prototype.$axios = axios
Vue.config.productionTip = false
Vue.use(Astrict)
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
