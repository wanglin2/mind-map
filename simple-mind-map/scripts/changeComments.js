// 将/** */类型的注释转换为//类型
const path = require('path')
const fs = require('fs')

const entryPath = path.resolve(__dirname, '../src')

const transform = dir => {
  let dirs = fs.readdirSync(dir)
  dirs.forEach(item => {
    let file = path.join(dir, item)
    if (fs.statSync(file).isDirectory()) {
      transform(file)
    } else if (/\.js$/.test(file)) {
      rewriteComments(file)
    }
  })
}

const rewriteComments = file => {
  let content = fs.readFileSync(file, 'utf-8')
  console.log('当前转换文件：', file)
  content = content.replace(/\/\*\*[^/]+\*\//g, str => {
    let res = /@Desc:([^\n]+)\n/g.exec(str)
    if (res.length > 0) {
      return '// ' + res[1]
    }
  })
  fs.writeFileSync(file, content)
}

transform(entryPath)
rewriteComments(path.join(__dirname, '../index.js'))
