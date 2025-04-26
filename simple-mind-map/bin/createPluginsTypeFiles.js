const { exec } = require('child_process')
const fs = require('fs')

const base = './src/plugins/'
const list = fs.readdirSync(base)
const files = []
list.forEach(item => {
  const stat = fs.statSync(base + item)
  if (stat.isFile()) {
    files.push(item)
  }
})
const str = files
  .map(item => {
    return base + item
  })
  .join(' ')

exec(
  `tsc ${str} --declaration --allowJs --emitDeclarationOnly --outDir types/src/ --target es2017 --skipLibCheck `
)
