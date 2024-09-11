import katex from 'katex'
import Quill from 'quill'
import { getChromeVersion, htmlEscape } from '../utils/index'
import { getBaseStyleText, getFontStyleText } from './FormulaStyle'

// 数学公式支持插件
// 该插件在富文本模式下可用
class Formula {
  //  构造函数
  constructor(opt) {
    this.opt = opt
    this.mindMap = opt.mindMap
    window.katex = katex
    this.init()
    this.config = this.getKatexConfig()
    this.cssEl = null
    this.addStyle()
    this.extendQuill()
  }

  init() {
    if (this.mindMap.opt.enableEditFormulaInRichTextEdit) {
      this.mindMap.opt.transformRichTextOnEnterEdit =
        this.latexRichToText.bind(this)
      this.mindMap.opt.beforeHideRichTextEdit = this.formatLatex.bind(this)
    }
  }

  // 获取katex配置
  getKatexConfig() {
    const config = {
      throwOnError: false,
      errorColor: '#f00',
      output: 'mathml' // 默认只输出公式
    }
    let { getKatexOutputType } = this.mindMap.opt
    getKatexOutputType =
      getKatexOutputType ||
      function () {
        // Chrome内核100以下，mathml配置公式无法正确渲染
        const chromeVersion = getChromeVersion()
        if (chromeVersion && chromeVersion <= 100) {
          return 'html'
        }
      }
    const output = getKatexOutputType() || 'mathml'
    config.output = ['mathml', 'html'].includes(output) ? output : 'mathml'
    return config
  }

  // 修改formula格式工具
  extendQuill() {
    const QuillFormula = Quill.import('formats/formula')
    const self = this

    class CustomFormulaBlot extends QuillFormula {
      static create(value) {
        let node = super.create(value)
        if (typeof value === 'string') {
          katex.render(value, node, self.config)
          node.setAttribute('data-value', htmlEscape(value))
        }
        return node
      }
    }

    Quill.register('formats/formula', CustomFormulaBlot, true)
  }

  getStyleText() {
    const { katexFontPath } = this.mindMap.opt
    let text = ''
    if (this.config.output === 'html') {
      text = getFontStyleText(katexFontPath)
    }
    text += getBaseStyleText()
    return text
  }

  addStyle() {
    this.cssEl = document.createElement('style')
    this.cssEl.type = 'text/css'
    this.cssEl.innerHTML = this.getStyleText()
    document.head.appendChild(this.cssEl)
  }

  removeStyle() {
    document.head.removeChild(this.cssEl)
  }

  // 给指定的节点插入指定公式
  insertFormulaToNode(node, formula) {
    let richTextPlugin = this.mindMap.richText
    richTextPlugin.showEditText({ node })
    richTextPlugin.quill.insertEmbed(
      richTextPlugin.quill.getLength() - 1,
      'formula',
      formula
    )
    richTextPlugin.setTextStyleIfNotRichText(richTextPlugin.node)
    richTextPlugin.hideEditText([node])
  }

  // 将公式富文本转换为公式源码
  latexRichToText(nodeText) {
    if (nodeText.indexOf('class="ql-formula"') !== -1) {
      const parser = new DOMParser()
      const doc = parser.parseFromString(nodeText, 'text/html')
      const els = doc.getElementsByClassName('ql-formula')
      for (const el of els)
        nodeText = nodeText.replace(
          el.outerHTML,
          `\$${el.getAttribute('data-value')}\$`
        )
    }
    return nodeText
  }

  // 使用格式化的 latex 字符串内容更新 quill 内容：输入 $*****$
  formatLatex(richText) {
    const contents = richText.quill.getContents()
    const ops = contents.ops
    let mod = false
    for (let i = ops.length - 1; i >= 0; i--) {
      const op = ops[i]
      const insert = op.insert
      if (insert && typeof insert !== 'object' && insert !== '\n') {
        if (/\$.+?\$/g.test(insert)) {
          const m = [...insert.matchAll(/\$.+?\$/g)]
          const arr = insert.split(/\$.+?\$/g)
          for (let j = m.length - 1; j >= 0; j--) {
            const exp = m[j] && m[j][0] ? m[j][0].slice(1, -1) || null : null // $...$ 之间的表达式
            if (exp !== null && exp.trim().length > 0) {
              const isLegal = this.checkFormulaIsLegal(exp)
              if (isLegal) {
                arr.splice(j + 1, 0, { insert: { formula: exp } }) // 添加到对应位置之后
                mod = true
              } else {
                arr.splice(j + 1, 0, '')
              }
            } else arr.splice(j + 1, 0, '') // 表达式为空时，占位
          }
          while (arr.length > 0) {
            let v = arr.pop()
            if (typeof v === 'string') {
              if (v.length < 1) continue
              v = { insert: v }
            }
            v['attributes'] = ops[i]['attributes']
            ops.splice(i + 1, 0, v)
          }
          ops.splice(i, 1) // 删除原来的字符串
        }
      }
    }
    if (mod) richText.quill.setContents(contents)
  }

  checkFormulaIsLegal(str) {
    try {
      katex.renderToString(str)
      return true
    } catch (e) {
      return false
    }
  }

  // 插件被移除前做的事情
  beforePluginRemove() {
    this.removeStyle()
  }

  // 插件被卸载前做的事情
  beforePluginDestroy() {
    this.removeStyle()
  }
}

Formula.instanceName = 'formula'

export default Formula
