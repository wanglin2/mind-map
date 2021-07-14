const path = require('path');
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
    }
}