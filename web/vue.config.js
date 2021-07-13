const path = require('path');

module.exports = {
    publicPath: './dist',
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