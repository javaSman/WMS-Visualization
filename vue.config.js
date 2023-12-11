'use strict'
const path = require('path')
const defaultSettings = require('./src/settings.js')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const name = defaultSettings.title || 'vue Element Admin' // page title

// If your port is set to 80,
// use administrator privileges to execute the command line.
// For example, Mac: sudo npm run
// You can change the port by the following method:
// port = 3115 npm run dev OR npm run dev --port = 3115
const port = process.env.port || process.env.npm_config_port || 3725 // dev port

// 所有配置项说明请参见： https://cli.vuejs.org/config/
module.exports = {
  /**
   * 如果你计划在子路径下部署你的站点，你需要设置publicPath，
   * 例如GitHub Pages。如果您计划将您的网站部署到https://foo.github.io/bar/，
   * 则publicPath应该设置为"/bar/"。
   * 在大多数情况下请使用'/'!!
   * 细节: https://cli.vuejs.org/config/publicpath
   */
  publicPath: '/' /* 部署生产环境和开发环境下的URL：可对当前环境进行区分 */,
  outputDir: 'dist' /* 输出文件目录：在npm run build时，生成文件的目录名称 */,
  assetsDir: 'static' /* 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录 */,
  lintOnSave: process.env.NODE_ENV === 'development' /* 代码保存时进行eslint检测 */,
  productionSourceMap: false /* 是否在构建生产包时生成 sourceMap 文件，false将提高构建速度 */,
  /* webpack-dev-server 相关配置 */
  devServer: {
    port: port,
    open: false /* 是否自动打开浏览器 */,
    overlay: {
      warnings: false,
      errors: true
    },
    // before: require('./mock/mock-server.js'),
    proxy: {
      '/api': {
        target: process.env.VUE_APP_BASE_API /* 目标代理服务器地址 */,
        changeOrigin: true /* 允许跨域 */,
        pathRewrite: {
          '^/api': 'api'
          // 这里的配置是正则表达式，以/api开头的将会被用用‘/api’替换掉，假如后台文档的接口是 /api/list/xxx
          // 前端api接口写：axios.get('/api/list/xxx') ， 被处理之后实际访问的是：http://news.baidu.com/api/list/xxx
        }
      },
      '/connect': {
        target: process.env.VUE_APP_BASE_API,
        changeOrigin: true,
        pathRewrite: {
          '^/connect': 'connect'
        }
      }
    }
  },
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: name,
    resolve: {
      alias: {
        '@': resolve('src'),
        '@crud': resolve('src/components/Crud')
      }
    }
  },
  chainWebpack(config) {
    config.plugins.delete('preload') // TODO: need test
    config.plugins.delete('prefetch') // TODO: need test

    // set svg-sprite-loader
    config.module.rule('svg').exclude.add(resolve('src/icons')).end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    // set preserveWhitespace
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true
        return options
      })
      .end()

    config
      // https://webpack.js.org/configuration/devtool/#development
      .when(process.env.NODE_ENV === 'development', config => config.devtool('cheap-source-map'))

    config.when(process.env.NODE_ENV !== 'development', config => {
      config
        .plugin('ScriptExtHtmlWebpackPlugin')
        .after('html')
        .use('script-ext-html-webpack-plugin', [
          {
            // `runtime` must same as runtimeChunk name. default is `runtime`
            inline: /runtime\..*\.js$/
          }
        ])
        .end()
      config.optimization.splitChunks({
        chunks: 'all',
        cacheGroups: {
          libs: {
            name: 'chunk-libs',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: 'initial' // only package third parties that are initially dependent
          },
          elementUI: {
            name: 'chunk-elementUI', // split elementUI into a single package
            priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
            test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
          },
          commons: {
            name: 'chunk-commons',
            test: resolve('src/components'), // can customize your rules
            minChunks: 3, //  minimum common number
            priority: 5,
            reuseExistingChunk: true
          }
        }
      })
      config.optimization.runtimeChunk('single')
    })
  }
}
