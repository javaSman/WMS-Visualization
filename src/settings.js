// import i18n from './lang'
// internationalization

module.exports = {
  title: '仓库管理系统',
  // title: i18n.tc('navbar.title'),

  /**
   * @type {boolean} true | false
   * @description 是否显示设置右侧面板
   */
  showSettings: true,

  /**
   * @type {boolean} true | false
   * @description 是否需要顶部标签栏
   */
  tagsView: true,

  /**
   * @type {boolean} true | false
   * @description 是否固定头部
   */
  fixedHeader: false,

  /**
   * @type {boolean} true | false
   * @description 是否在侧边栏中显示logo
   */
  sidebarLogo: false,

  /**
   * @type {boolean} true | false
   * @description 菜单中是否支持拼音搜索
   * Bundle size minified 47.3kb,minified + gzipped 63kb
   */
  supportPinyinSearch: true,

  /**
   * @type {string | array} 'production' | ['production', 'development']
   * @description Need show err logs component.
   * The default is only used in the production env
   * If you want to also use it in dev, you can pass ['production', 'development']
   */
  errorLog: 'production',

  /**
   * @description 请求超时时间，毫秒（默认2分钟）
   */
  timeout: 1200000
}
