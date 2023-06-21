import { getStrWithBrFromHtml, checkNodeOuter } from '../../utils'

//  节点文字编辑类
export default class TextEdit {
  //  构造函数
  constructor(renderer) {
    this.renderer = renderer
    this.mindMap = renderer.mindMap
    // 当前编辑的节点
    this.currentNode = null
    // 文本编辑框
    this.textEditNode = null
    // 文本编辑框是否显示
    this.showTextEdit = false
    // 如果编辑过程中缩放画布了，那么缓存当前编辑的内容
    this.cacheEditingText = ''
    this.bindEvent()
  }

  //  事件
  bindEvent() {
    this.show = this.show.bind(this)
    this.onScale = this.onScale.bind(this)
    // 节点双击事件
    this.mindMap.on('node_dblclick', this.show)
    // 点击事件
    this.mindMap.on('draw_click', () => {
      // 隐藏文本编辑框
      this.hideEditTextBox()
    })
    this.mindMap.on('body_click', () => {
      // 隐藏文本编辑框
      if (this.mindMap.opt.isEndNodeTextEditOnClickOuter) {
        this.hideEditTextBox()
      }
    })
    this.mindMap.on('svg_mousedown', () => {
      // 隐藏文本编辑框
      this.hideEditTextBox()
    })
    // 展开收缩按钮点击事件
    this.mindMap.on('expand_btn_click', () => {
      this.hideEditTextBox()
    })
    // 节点激活前事件
    this.mindMap.on('before_node_active', () => {
      this.hideEditTextBox()
    })
    // 注册编辑快捷键
    this.mindMap.keyCommand.addShortcut('F2', () => {
      if (this.renderer.activeNodeList.length <= 0) {
        return
      }
      this.show(this.renderer.activeNodeList[0])
    })
    this.mindMap.on('scale', this.onScale)
  }

  //  注册临时快捷键
  registerTmpShortcut() {
    // 注册回车快捷键
    this.mindMap.keyCommand.addShortcut('Enter', () => {
      this.hideEditTextBox()
    })
  }

  //  显示文本编辑框
  async show(node) {
    // 使用了自定义节点内容那么不响应编辑事件
    if (node.isUseCustomNodeContent()) {
      return
    }
    let { beforeTextEdit } = this.mindMap.opt
    if (typeof beforeTextEdit === 'function') {
      let isShow = false
      try {
        isShow = await beforeTextEdit(node)
      } catch (error) {
        isShow = false
      }
      if (!isShow) return
    }
    this.currentNode = node
    let { offsetLeft, offsetTop } = checkNodeOuter(this.mindMap, node)
    this.mindMap.view.translateXY(offsetLeft, offsetTop)
    let rect = node._textData.node.node.getBoundingClientRect()
    if (this.mindMap.richText) {
      this.mindMap.richText.showEditText(node, rect)
      return
    }
    this.showEditTextBox(node, rect)
  }

  // 处理画布缩放
  onScale() {
    if (!this.currentNode) return
    if (this.mindMap.richText) {
      this.mindMap.richText.cacheEditingText = this.mindMap.richText.getEditText()
      this.mindMap.richText.showTextEdit = false
    } else {
      this.cacheEditingText = this.getEditText()
      this.showTextEdit = false
    }
    this.show(this.currentNode)
  }

  //  显示文本编辑框
  showEditTextBox(node, rect) {
    this.mindMap.emit('before_show_text_edit')
    this.registerTmpShortcut()
    if (!this.textEditNode) {
      this.textEditNode = document.createElement('div')
      this.textEditNode.style.cssText = `position:fixed;box-sizing: border-box;background-color:#fff;box-shadow: 0 0 20px rgba(0,0,0,.5);padding: 3px 5px;margin-left: -5px;margin-top: -3px;outline: none; word-break: break-all;`
      this.textEditNode.setAttribute('contenteditable', true)
      this.textEditNode.addEventListener('keyup', e => {
        e.stopPropagation()
      })
      this.textEditNode.addEventListener('click', e => {
        e.stopPropagation()
      })
      document.body.appendChild(this.textEditNode)
    }
    let scale = this.mindMap.view.scale
    let lineHeight = node.style.merge('lineHeight')
    let fontSize = node.style.merge('fontSize')
    let textLines = (this.cacheEditingText || node.nodeData.data.text).split(/\n/gim)
    let isMultiLine = node._textData.node.attr('data-ismultiLine') === 'true'
    node.style.domText(this.textEditNode, scale, isMultiLine)
    this.textEditNode.style.zIndex = this.mindMap.opt.nodeTextEditZIndex
    this.textEditNode.innerHTML = textLines.join('<br>')
    this.textEditNode.style.minWidth = rect.width + 10 + 'px'
    this.textEditNode.style.minHeight = rect.height + 6 + 'px'
    this.textEditNode.style.left = rect.left + 'px'
    this.textEditNode.style.top = rect.top + 'px'
    this.textEditNode.style.display = 'block'
    this.textEditNode.style.maxWidth = this.mindMap.opt.textAutoWrapWidth * scale + 'px'
    if (isMultiLine && lineHeight !== 1) {
      this.textEditNode.style.transform = `translateY(${-((lineHeight * fontSize - fontSize) / 2) * scale}px)`
    }
    this.showTextEdit = true
    // 选中文本
    if (!this.cacheEditingText) {
      this.selectNodeText()
    }
    this.cacheEditingText = ''
  }

  //  选中文本
  selectNodeText() {
    let selection = window.getSelection()
    let range = document.createRange()
    range.selectNodeContents(this.textEditNode)
    selection.removeAllRanges()
    selection.addRange(range)
  }

  // 获取当前正在编辑的内容
  getEditText() {
    return getStrWithBrFromHtml(this.textEditNode.innerHTML)
  }

  //  隐藏文本编辑框
  hideEditTextBox() {
    this.currentNode = null
    if (this.mindMap.richText) {
      return this.mindMap.richText.hideEditText()
    }
    if (!this.showTextEdit) {
      return
    }
    this.renderer.activeNodeList.forEach(node => {
      let str = this.getEditText()
      this.mindMap.execCommand('SET_NODE_TEXT', node, str)
      if (node.isGeneralization) {
        // 概要节点
        node.generalizationBelongNode.updateGeneralization()
      }
      this.mindMap.render()
    })
    this.mindMap.emit(
      'hide_text_edit',
      this.textEditNode,
      this.renderer.activeNodeList
    )
    this.textEditNode.style.display = 'none'
    this.textEditNode.innerHTML = ''
    this.textEditNode.style.fontFamily = 'inherit'
    this.textEditNode.style.fontSize = 'inherit'
    this.textEditNode.style.fontWeight = 'normal'
    this.textEditNode.style.transform = 'translateY(0)'
    this.showTextEdit = false
  }
}
