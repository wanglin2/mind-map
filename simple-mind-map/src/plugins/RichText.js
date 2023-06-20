import Quill from 'quill'
import 'quill/dist/quill.snow.css'
import html2canvas from 'html2canvas'
import { walk, getTextFromHtml } from '../utils'
import { CONSTANTS } from '../constants/constant'

let extended = false

// 扩展quill的字体列表
let fontFamilyList = [
  '宋体, SimSun, Songti SC',
  '微软雅黑, Microsoft YaHei',
  '楷体, 楷体_GB2312, SimKai, STKaiti',
  '黑体, SimHei, Heiti SC',
  '隶书, SimLi',
  'andale mono',
  'arial, helvetica, sans-serif',
  'arial black, avant garde',
  'comic sans ms',
  'impact, chicago',
  'times new roman',
  'sans-serif',
  'serif'
]

// 扩展quill的字号列表
let fontSizeList = new Array(100).fill(0).map((_, index) => {
  return index + 'px'
})

// 节点支持富文本编辑功能
class RichText {
  constructor({ mindMap, pluginOpt }) {
    this.mindMap = mindMap
    this.pluginOpt = pluginOpt
    this.textEditNode = null
    this.showTextEdit = false
    this.quill = null
    this.range = null
    this.lastRange = null
    this.node = null
    this.styleEl = null
    this.cacheEditingText = ''
    this.lostStyle = false
    this.isCompositing = false
    this.initOpt()
    this.extendQuill()
    this.appendCss()
    this.bindEvent()

    // 处理数据，转成富文本格式
    if (this.mindMap.opt.data) {
      this.mindMap.opt.data = this.handleSetData(this.mindMap.opt.data)
    }
  }

  // 绑定事件
  bindEvent() {
    this.onCompositionStart = this.onCompositionStart.bind(this)
    this.onCompositionEnd = this.onCompositionEnd.bind(this)
    window.addEventListener('compositionstart', this.onCompositionStart)
    window.addEventListener('compositionend', this.onCompositionEnd)
  }

  // 解绑事件
  unbindEvent() {
    window.removeEventListener('compositionstart', this.onCompositionStart)
    window.removeEventListener('compositionend', this.onCompositionEnd)
  }

  // 插入样式
  appendCss() {
    let cssText = `
      .ql-editor {
        overflow: hidden;
        padding: 0;
        height: auto;
        line-height: normal;
        -webkit-user-select: text;
      }
      
      .ql-container {
        height: auto;
        font-size: inherit;
      }

      .ql-container.ql-snow {
        border: none;
      }

      .smm-richtext-node-wrap p {
        font-family: auto;
      }

      .smm-richtext-node-edit-wrap p {
        font-family: auto;
      }
    `
    this.styleEl = document.createElement('style')
    this.styleEl.type = 'text/css'
    this.styleEl.innerHTML = cssText
    document.head.appendChild(this.styleEl)
  }

  // 处理选项参数
  initOpt() {
    if (
      this.pluginOpt.fontFamilyList &&
      Array.isArray(this.pluginOpt.fontFamilyList)
    ) {
      fontFamilyList = this.pluginOpt.fontFamilyList
    }
    if (
      this.pluginOpt.fontSizeList &&
      Array.isArray(this.pluginOpt.fontSizeList)
    ) {
      fontSizeList = this.pluginOpt.fontSizeList
    }
  }

  // 扩展quill编辑器
  extendQuill() {
    if (extended) {
      return
    }
    extended = true

    // 扩展quill的字体列表
    const FontAttributor = Quill.import('attributors/class/font')
    FontAttributor.whitelist = fontFamilyList
    Quill.register(FontAttributor, true)

    const FontStyle = Quill.import('attributors/style/font')
    FontStyle.whitelist = fontFamilyList
    Quill.register(FontStyle, true)

    // 扩展quill的字号列表
    const SizeAttributor = Quill.import('attributors/class/size')
    SizeAttributor.whitelist = fontSizeList
    Quill.register(SizeAttributor, true)

    const SizeStyle = Quill.import('attributors/style/size')
    SizeStyle.whitelist = fontSizeList
    Quill.register(SizeStyle, true)
  }

  // 显示文本编辑控件
  showEditText(node, rect) {
    if (this.showTextEdit) {
      return
    }
    this.node = node
    if (!rect) rect = node._textData.node.node.getBoundingClientRect()
    this.mindMap.emit('before_show_text_edit')
    this.mindMap.renderer.textEdit.registerTmpShortcut()
    // 原始宽高
    let g = node._textData.node
    let originWidth = g.attr('data-width')
    let originHeight = g.attr('data-height')
    // 缩放值
    let scaleX = rect.width / originWidth
    let scaleY = rect.height / originHeight
    // 内边距
    const paddingX = 6
    const paddingY = 4
    if (!this.textEditNode) {
      this.textEditNode = document.createElement('div')
      this.textEditNode.classList.add('smm-richtext-node-edit-wrap')
      this.textEditNode.style.cssText = `position:fixed;box-sizing: border-box;box-shadow: 0 0 20px rgba(0,0,0,.5);outline: none; word-break: break-all;padding: ${paddingY}px ${paddingX}px;`
      this.textEditNode.addEventListener('click', e => {
        e.stopPropagation()
      })
      document.body.appendChild(this.textEditNode)
    }
    // 使用节点的填充色，否则如果节点颜色是白色的话编辑时看不见
    let bgColor = node.style.merge('fillColor')
    this.textEditNode.style.marginLeft = `-${paddingX * scaleX}px`
    this.textEditNode.style.marginTop = `-${paddingY * scaleY}px`
    this.textEditNode.style.zIndex = this.mindMap.opt.nodeTextEditZIndex
    this.textEditNode.style.backgroundColor =
      bgColor === 'transparent' ? '#fff' : bgColor
    this.textEditNode.style.minWidth = originWidth + paddingX * 2 + 'px'
    this.textEditNode.style.minHeight = originHeight + 'px'
    this.textEditNode.style.left = rect.left + 'px'
    this.textEditNode.style.top = rect.top + 'px'
    this.textEditNode.style.display = 'block'
    this.textEditNode.style.maxWidth =
      this.mindMap.opt.textAutoWrapWidth + paddingX * 2 + 'px'
    this.textEditNode.style.transform = `scale(${scaleX}, ${scaleY})`
    this.textEditNode.style.transformOrigin = 'left top'
    if (!node.nodeData.data.richText) {
      // 还不是富文本的情况
      let text = node.nodeData.data.text.split(/\n/gim).join('<br>')
      let html = `<p>${text}</p>`
      this.textEditNode.innerHTML = this.cacheEditingText || html
    } else {
      this.textEditNode.innerHTML =
        this.cacheEditingText || node.nodeData.data.text
    }
    this.initQuillEditor()
    document.querySelector('.ql-editor').style.minHeight = originHeight + 'px'
    this.showTextEdit = true
    this.focus()
    if (!node.nodeData.data.richText) {
      // 如果是非富文本的情况，需要手动应用文本样式
      this.setTextStyleIfNotRichText(node)
    }
    this.cacheEditingText = ''
  }

  // 如果是非富文本的情况，需要手动应用文本样式
  setTextStyleIfNotRichText(node) {
    let style = {
      font: node.style.merge('fontFamily'),
      color: node.style.merge('color'),
      italic: node.style.merge('fontStyle') === 'italic',
      bold: node.style.merge('fontWeight') === 'bold',
      size: node.style.merge('fontSize') + 'px',
      underline: node.style.merge('textDecoration') === 'underline',
      strike: node.style.merge('textDecoration') === 'line-through'
    }
    this.pureFormatAllText(style)
  }

  // 获取当前正在编辑的内容
  getEditText() {
    let html = this.quill.container.firstChild.innerHTML
    // 去除最后的空行
    return html.replace(/<p><br><\/p>$/, '')
  }

  // 隐藏文本编辑控件，即完成编辑
  hideEditText(nodes) {
    if (!this.showTextEdit) {
      return
    }
    let html = this.getEditText()
    let list =
      nodes && nodes.length > 0 ? nodes : this.mindMap.renderer.activeNodeList
    list.forEach(node => {
      this.mindMap.execCommand('SET_NODE_TEXT', node, html, true)
      if (node.isGeneralization) {
        // 概要节点
        node.generalizationBelongNode.updateGeneralization()
      }
      this.mindMap.render()
    })
    this.mindMap.emit('hide_text_edit', this.textEditNode, list)
    this.textEditNode.style.display = 'none'
    this.showTextEdit = false
    this.mindMap.emit('rich_text_selection_change', false)
    this.node = null
  }

  // 初始化Quill富文本编辑器
  initQuillEditor() {
    this.quill = new Quill(this.textEditNode, {
      modules: {
        toolbar: false,
        keyboard: {
          bindings: {
            enter: {
              key: 13,
              handler: function () {
                // 覆盖默认的回车键换行
              }
            }
          }
        }
      },
      theme: 'snow'
    })
    this.quill.on('selection-change', range => {
      this.lastRange = this.range
      this.range = null
      if (range) {
        let bounds = this.quill.getBounds(range.index, range.length)
        let rect = this.textEditNode.getBoundingClientRect()
        let rectInfo = {
          left: bounds.left + rect.left,
          top: bounds.top + rect.top,
          right: bounds.right + rect.left,
          bottom: bounds.bottom + rect.top,
          width: bounds.width
        }
        let formatInfo = this.quill.getFormat(range.index, range.length)
        let hasRange = false
        if (range.length == 0) {
          hasRange = false
        } else {
          this.range = range
          hasRange = true
        }
        this.mindMap.emit(
          'rich_text_selection_change',
          hasRange,
          rectInfo,
          formatInfo
        )
      }
    })
    this.quill.on('text-change', () => {
      let contents = this.quill.getContents()
      let len = contents.ops.length
      // 如果编辑过程中删除所有字符，那么会丢失主题的样式
      if (len <= 0 || (len === 1 && contents.ops[0].insert === '\n')) {
        this.lostStyle = true
        // 需要删除节点的样式数据
        this.syncFormatToNodeConfig(null, true)
      } else if (this.lostStyle && !this.isCompositing) {
        // 如果处于样式丢失状态，那么需要进行格式化加回样式
        this.setTextStyleIfNotRichText(this.node)
        this.lostStyle = false
      }
    })
  }

  // 正则输入中文
  onCompositionStart() {
    if (!this.showTextEdit) {
      return
    }
    this.isCompositing = true
  }

  // 中文输入结束
  onCompositionEnd() {
    if (!this.showTextEdit || !this.lostStyle) {
      return
    }
    this.isCompositing = false
    this.setTextStyleIfNotRichText(this.node)
  }

  // 选中全部
  selectAll() {
    this.quill.setSelection(0, this.quill.getLength())
  }

  // 聚焦
  focus() {
    let len = this.quill.getLength()
    this.quill.setSelection(len, len)
  }

  // 格式化当前选中的文本
  formatText(config = {}, clear = false) {
    if (!this.range && !this.lastRange) return
    this.syncFormatToNodeConfig(config, clear)
    let rangeLost = !this.range
    let range = rangeLost ? this.lastRange : this.range
    clear
      ? this.quill.removeFormat(range.index, range.length)
      : this.quill.formatText(range.index, range.length, config)
    if (rangeLost) {
      this.quill.setSelection(this.lastRange.index, this.lastRange.length)
    }
  }

  // 清除当前选中文本的样式
  removeFormat() {
    this.formatText({}, true)
  }

  // 格式化指定范围的文本
  formatRangeText(range, config = {}) {
    if (!range) return
    this.syncFormatToNodeConfig(config)
    this.quill.formatText(range.index, range.length, config)
  }

  // 格式化所有文本
  formatAllText(config = {}) {
    this.syncFormatToNodeConfig(config)
    this.pureFormatAllText(config)
  }

  // 纯粹的格式化所有文本
  pureFormatAllText(config = {}) {
    this.quill.formatText(0, this.quill.getLength(), config)
  }

  // 同步格式化到节点样式配置
  syncFormatToNodeConfig(config, clear) {
    if (!this.node) return
    if (clear) {
      // 清除文本样式
      ;[
        'fontFamily',
        'fontSize',
        'fontWeight',
        'fontStyle',
        'textDecoration',
        'color'
      ].forEach(prop => {
        delete this.node.nodeData.data[prop]
      })
    } else {
      let data = this.richTextStyleToNormalStyle(config)
      this.mindMap.renderer.setNodeData(this.node, data)
    }
  }

  // 将普通节点样式对象转换成富文本样式对象
  normalStyleToRichTextStyle(style) {
    let config = {}
    Object.keys(style).forEach(prop => {
      let value = style[prop]
      switch (prop) {
        case 'fontFamily':
          config.font = value
          break
        case 'fontSize':
          config.size = value + 'px'
          break
        case 'fontWeight':
          config.bold = value === 'bold'
          break
        case 'fontStyle':
          config.italic = value === 'italic'
          break
        case 'textDecoration':
          config.underline = value === 'underline'
          config.strike = value === 'line-through'
          break
        case 'color':
          config.color = value
          break
        default:
          break
      }
    })
    return config
  }

  // 将富文本样式对象转换成普通节点样式对象
  richTextStyleToNormalStyle(config) {
    let data = {}
    Object.keys(config).forEach(prop => {
      let value = config[prop]
      switch (prop) {
        case 'font':
          data.fontFamily = value
          break
        case 'size':
          data.fontSize = parseFloat(value)
          break
        case 'bold':
          data.fontWeight = value ? 'bold' : 'normal'
          break
        case 'italic':
          data.fontStyle = value ? 'italic' : 'normal'
          break
        case 'underline':
          data.textDecoration = value ? 'underline' : 'none'
          break
        case 'strike':
          data.textDecoration = value ? 'line-through' : 'none'
          break
        case 'color':
          data.color = value
          break
        default:
          break
      }
    })
    return data
  }

  // 处理导出为图片
  async handleExportPng(node) {
    let el = document.createElement('div')
    el.style.position = 'absolute'
    el.style.left = '-9999999px'
    el.appendChild(node)
    this.mindMap.el.appendChild(el)
    // 遍历所有节点，将它们的margin和padding设为0
    let walk = root => {
      root.style.margin = 0
      root.style.padding = 0
      if (root.hasChildNodes()) {
        Array.from(root.children).forEach(item => {
          walk(item)
        })
      }
    }
    walk(node)
    let canvas = await html2canvas(el, {
      backgroundColor: null
    })
    this.mindMap.el.removeChild(el)
    return canvas.toDataURL()
  }

  // 将所有节点转换成非富文本节点
  transformAllNodesToNormalNode() {
    walk(
      this.mindMap.renderer.renderTree,
      null,
      node => {
        if (node.data.richText) {
          node.data.richText = false
          node.data.text = getTextFromHtml(node.data.text)
          // delete node.data.uid
        }
      },
      null,
      true,
      0,
      0
    )
    // 清空历史数据，并且触发数据变化
    this.mindMap.command.clearHistory()
    this.mindMap.command.addHistory()
    this.mindMap.render(null, CONSTANTS.TRANSFORM_TO_NORMAL_NODE)
  }

  // 处理导入数据
  handleSetData(data) {
    let walk = root => {
      if (!root.data.richText) {
        root.data.richText = true
        root.data.resetRichText = true
      }
      if (root.children && root.children.length > 0) {
        Array.from(root.children).forEach(item => {
          walk(item)
        })
      }
    }
    walk(data)
    return data
  }

  // 插件被移除前做的事情
  beforePluginRemove() {
    this.transformAllNodesToNormalNode()
    document.head.removeChild(this.styleEl)
  }
}

RichText.instanceName = 'richText'

export default RichText
