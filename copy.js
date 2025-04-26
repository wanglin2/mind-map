const fs = require('fs')
const path = require('path')

const src = path.resolve(__dirname, './dist/index.html') 
const dest = path.resolve(__dirname, './index.html') 

if (fs.existsSync(dest)) {
    fs.unlinkSync(dest)
}

if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest)
    fs.unlinkSync(src)
}

// console.warn('请检查付费插件是否启用！！！')