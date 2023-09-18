// 遍历所有js文件
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
      transformFile(file)
    }
  })
}

const transformFile = file => {
  console.log(file)
  let content = fs.readFileSync(file, 'utf-8')
  countCodeLines(content)
  // transformComments(file, content)
}

// 统计代码行数
let totalLines = 0
const countCodeLines = content => {
  totalLines += content.split(/\n/).length
}

// 转换注释类型
const transformComments = (file, content) => {
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
transformFile(path.join(__dirname, '../index.js'))
console.log(totalLines)
