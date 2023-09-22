import katex from 'katex'
import Quill from 'quill'

// 数学公式支持插件
// 该插件在富文本模式下可用
class Formula {
  //  构造函数
  constructor(opt) {
    this.opt = opt
    this.mindMap = opt.mindMap
    window.katex = katex
    this.extendQuill()
  }

  // 修改formula格式工具
  extendQuill() {
    const QuillFormula = Quill.import('formats/formula')

    class CustomFormulaBlot extends QuillFormula {
      static create(value) {
        let node = super.create(value)
        if (typeof value === 'string') {
          katex.render(value, node, {
            throwOnError: false,
            errorColor: '#f00',
            output: 'mathml' // 增加该配置，默认只输出公式
          })
          node.setAttribute('data-value', value)
        }
        return node
      }
    }

    Quill.register('formats/formula', CustomFormulaBlot, true)
  }

  // 给指定的节点插入指定公式
  insertFormulaToNode(node, formula) {
    let richTextPlugin = this.mindMap.richText
    richTextPlugin.showEditText(node)
    richTextPlugin.quill.insertEmbed(
      richTextPlugin.quill.getLength() - 1,
      'formula',
      formula
    )
    richTextPlugin.setTextStyleIfNotRichText(richTextPlugin.node)
    richTextPlugin.hideEditText([node])
  }
}

Formula.instanceName = 'formula'

export default Formula
