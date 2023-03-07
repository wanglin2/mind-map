const path = require('path')
const isDev = process.env.NODE_ENV === 'development'

module.exports = {
  publicPath: isDev ? '' : './dist',
  outputDir: '../dist',
  lintOnSave: false,
  productionSourceMap: false,
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src/')
      }
    }
  },
  pluginOptions: {
    electronBuilder: {
      preload: 'src/electron/preload.js',
      builderOptions: {},
      // 渲染线程的配置文件
      chainWebpackRendererProcess: config => {
        config.plugin('define').tap(args => {
          args[0]['IS_ELECTRON'] = true
          return args
        })
      }
    }
  }
}
