const path = require('path');
const isDev = process.env.NODE_ENV === 'development'

module.exports = {
    publicPath: isDev ? '' : './dist',
    outputDir: '../dist',
    lintOnSave: false,
    productionSourceMap: false,
    chainWebpack: config => {
        // 移除 prefetch 插件
        config.plugins.delete('prefetch')
    },
    configureWebpack: {
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src/')
            }
        }
    }
}