const fs = require('fs')
const path = require('path')

const src = path.resolve(__dirname, './dist/index.html') 
const dest = path.resolve(__dirname, './index.html') 

const destStat = fs.statSync(dest)
if (destStat.isFile()) {
    fs.unlinkSync(dest)
}

const srcStat = fs.statSync(src)
if (srcStat.isFile()) {
    fs.copyFileSync(src, dest)
    fs.unlinkSync(src)
}

