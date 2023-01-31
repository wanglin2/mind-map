const chokidar = require('chokidar')
const path = require('path')
const fs = require('fs')
const { exec } = require('node:child_process')
const { transformMdToVue } = require('./transformMdToVue')

const reBuildAll = () => {
  exec(
    'node ./buildDoc.js',
    {
      cwd: path.resolve(__dirname)
    },
    (error, msg) => {
      console.log(error, msg)
    }
  )
}

const buildOne = file => {
  let content = fs.readFileSync(file, 'utf-8')
  let doc = transformMdToVue(content)
  let destPath = path.join(path.dirname(file), './index.vue')
  fs.writeFileSync(destPath, doc)
}

chokidar
  .watch(path.join(__dirname, '../src/pages/Doc/'), {
    ignoreInitial: true
  })
  .on('all', (event, file) => {
    if (/\.md$/.test(file)) {
      if (event === 'change') {
        buildOne(file)
      } else {
        reBuildAll()
      }
    }
  })
