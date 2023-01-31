// 编译文档
const path = require('path')
const fs = require('fs')
const { transformMdToVue } = require('./transformMdToVue')

// 文档语言种类
let langList = ['zh', 'en']

// 开始转换
const transform = (dir, routerList) => {
  let dirs = fs.readdirSync(dir)
  dirs.forEach(item => {
    let cur = path.join(dir, item)
    if (fs.statSync(cur).isDirectory()) {
      compilerDir(cur, item, routerList)
    }
  })
}

// 编译某种语言下的文档
const compilerDir = (dir, dirName, routerList) => {
  let files = fs.readdirSync(dir)
  files.forEach(file => {
    if (file.endsWith('.md')) {
      compilerFile(dir, file, dirName, routerList)
    }
  })
}

// 编译具体的文档
const compilerFile = (dir, file, dirName, routerList) => {
  let filePath = path.join(dir, file)
  let destPath = path.join(dir, './index.vue')
  let content = fs.readFileSync(filePath, 'utf-8')
  let title = /(^|\n\r)\s*#\s+([^\n\r]+)/g.exec(content)
  if (title && title[2]) {
    addRouter(dirName, routerList, title[2])
  }
  let doc = transformMdToVue(content)
  fs.writeFileSync(destPath, doc)
}

// 收集文档路由
const addRouter = (item, routerList, title) => {
  routerList.push({
    path: item,
    title
  })
}

// 创建路由
const createRouter = () => {
  let content = `
        export default ${JSON.stringify(
          routerTypeList.map(item => {
            return {
              lang: item.lang,
              children: item.routerList
            }
          })
        )}
    `
  fs.writeFileSync(
    path.join(__dirname, '../src/pages/Doc/routerList.js'),
    content
  )
}

// 创建目录列表
const createCatalogList = () => {}

// 开始编译
let routerTypeList = []
langList.forEach(lang => {
  let dir = path.join(__dirname, '../src/pages/Doc/', `./${lang}/`)
  let routerList = []
  transform(dir, routerList)
  routerTypeList.push({
    lang,
    routerList
  })
})
// 创建路由
createRouter()
console.log('编译完成')
