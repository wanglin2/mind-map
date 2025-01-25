const path = require('path')
const fs = require('fs')

const fileDest = path.join(__dirname, '../src/assets/svg')
const targetDest = path.join(__dirname, '../src/config/image.js')

const run = dir => {
  let dirs = fs.readdirSync(dir)
  dirs.forEach(item => {
    let cur = path.join(dir, item)
    if (fs.statSync(cur).isDirectory()) {
      walkDir(cur, item)
    }
  })
}

const list = []
const importList = []
const walkDir = (dir, item) => {
  let files = fs.readdirSync(dir)
  let name = files.find(file => {
    return !/\./.test(file)
  })
  let fileList = files.filter(file => {
    return /\.svg$/.test(file)
  })
  let itemList = []
  fileList.forEach(file => {
    let fileName =
      item + '_' + file.replace(/\.svg$/, '').replace(new RegExp('-', 'g'), '')
    importList.push(`import ${fileName} from '../assets/svg/${item}/${file}'`)
    itemList.push({
      url: fileName,
      width: 100,
      height: 100
    })
  })
  list.push({
    name,
    list: itemList
  })
  const content = `
// 该文件请运行npm run createNodeImageList命令自动生成
${importList.join('\n')}
export default ${JSON.stringify(list, null, 2).replace(
    /(url":\s*)"([^"]+)"(,)/g,
    '$1$2$3'
  )}
`
  fs.writeFileSync(targetDest, content)
}

run(fileDest)
console.log('运行成功')
