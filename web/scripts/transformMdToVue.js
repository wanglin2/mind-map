const path = require('path')
const fs = require('fs')
const hljs = require('highlight.js')
const md = require('markdown-it')({
  html: true,
  xhtmlOut: true,
  highlight: function(str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return (
          '<pre class="hljs"><code>' +
          hljs.highlight(str, {
            language: lang, 
            ignoreIllegals: true
          }).value +
          '</code></pre>'
        )
      } catch (__) {}
    }

    return (
      '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>'
    )
  }
}).use(require('markdown-it-checkbox'))

const templatePath = path.join(__dirname, '../src/pages/Doc/Template.vue')

exports.transformMdToVue = (content) => {
    let result = md.render(content)
    let template = fs.readFileSync(templatePath, 'utf-8')
    return template.replace('$$$$', result)
}