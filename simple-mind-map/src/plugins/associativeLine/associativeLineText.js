import { Text } from '@svgdotjs/svg.js'
import {
  getStrWithBrFromHtml,
  focusInput,
  selectAllInput
} from '../../utils/index'

const ASSOCIATIVE_LINE_TEXT_EDIT_WRAP = 'associative-line-text-edit-warp'

// 创建文字节点
function createText(data) {
  let g = this.associativeLineDraw.group()
  const setActive = () => {
    if (
      !this.activeLine ||
      this.activeLine[3] !== data.node ||
      this.activeLine[4] !== data.toNode
    ) {
      this.setActiveLine({
        ...data,
        text: g
      })
    }
  }
  g.click(e => {
    e.stopPropagation()
    setActive()
  })
  g.on('dblclick', e => {
    e.stopPropagation()
    setActive()
    if (!this.activeLine) return
    this.showEditTextBox(g)
  })
  return g
}

//  显示文本编辑框
function showEditTextBox(g) {
  this.mindMap.emit('before_show_text_edit')
  // 注册回车快捷键
  this.mindMap.keyCommand.addShortcut('Enter', () => {
    this.hideEditTextBox()
  })
  // 输入框元素没有创建过，则先创建
  if (!this.textEditNode) {
    this.textEditNode = document.createElement('div')
    this.textEditNode.className = ASSOCIATIVE_LINE_TEXT_EDIT_WRAP
    this.textEditNode.style.cssText = `position:fixed;box-sizing: border-box;background-color:#fff;box-shadow: 0 0 20px rgba(0,0,0,.5);padding: 3px 5px;margin-left: -5px;margin-top: -3px;outline: none; word-break: break-all;`
    this.textEditNode.setAttribute('contenteditable', true)
    this.textEditNode.addEventListener('keyup', e => {
      e.stopPropagation()
    })
    this.textEditNode.addEventListener('click', e => {
      e.stopPropagation()
    })
    const targetNode = this.mindMap.opt.customInnerElsAppendTo || document.body
    targetNode.appendChild(this.textEditNode)
  }
  let [, , , node, toNode] = this.activeLine
  let {
    associativeLineTextFontSize,
    associativeLineTextFontFamily,
    associativeLineTextLineHeight
  } = this.getStyleConfig(node, toNode)
  let { defaultAssociativeLineText, nodeTextEditZIndex } = this.mindMap.opt
  let scale = this.mindMap.view.scale
  let text = this.getText(node, toNode)
  let textLines = (text || defaultAssociativeLineText).split(/\n/gim)
  this.textEditNode.style.fontFamily = associativeLineTextFontFamily
  this.textEditNode.style.fontSize = associativeLineTextFontSize * scale + 'px'
  this.textEditNode.style.lineHeight =
    textLines.length > 1 ? associativeLineTextLineHeight : 'normal'
  this.textEditNode.style.zIndex = nodeTextEditZIndex
  this.textEditNode.innerHTML = textLines.join('<br>')
  this.textEditNode.style.display = 'block'
  this.updateTextEditBoxPos(g)
  this.setIsShowTextEdit(true)
  // 如果是默认文本要全选输入框
  if (text === '' || text === defaultAssociativeLineText) {
    selectAllInput(this.textEditNode)
  } else {
    // 否则聚焦即可
    focusInput(this.textEditNode)
  }
}

// 设置文本编辑框是否处于显示状态
function setIsShowTextEdit(val) {
  this.showTextEdit = val
  if (val) {
    this.mindMap.keyCommand.stopCheckInSvg()
  } else {
    this.mindMap.keyCommand.recoveryCheckInSvg()
  }
}

// 删除文本编辑框元素
function removeTextEditEl() {
  if (!this.textEditNode) return
  const targetNode = this.mindMap.opt.customInnerElsAppendTo || document.body
  targetNode.removeChild(this.textEditNode)
}

// 处理画布缩放
function onScale() {
  this.hideEditTextBox()
}

// 更新文本编辑框位置
function updateTextEditBoxPos(g) {
  let rect = g.node.getBoundingClientRect()
  if (this.textEditNode) {
    this.textEditNode.style.minWidth = `${rect.width + 10}px`
    this.textEditNode.style.minHeight = `${rect.height + 6}px`
    this.textEditNode.style.left = `${rect.left}px`
    this.textEditNode.style.top = `${rect.top}px`
  }
}

//  隐藏文本编辑框
function hideEditTextBox() {
  if (!this.showTextEdit) {
    return
  }
  let [path, , text, node, toNode] = this.activeLine
  let str = getStrWithBrFromHtml(this.textEditNode.innerHTML)
  // 如果是默认文本，那么不保存
  let isDefaultText = str === this.mindMap.opt.defaultAssociativeLineText
  str = isDefaultText ? '' : str
  this.mindMap.execCommand('SET_NODE_DATA', node, {
    associativeLineText: {
      ...(node.getData('associativeLineText') || {}),
      [toNode.getData('uid')]: str
    }
  })
  this.textEditNode.style.display = 'none'
  this.textEditNode.innerHTML = ''
  this.setIsShowTextEdit(false)
  this.renderText(str, path, text, node, toNode)
  this.mindMap.emit('hide_text_edit')
}

// 获取某根关联线的文字
function getText(node, toNode) {
  let obj = node.getData('associativeLineText')
  if (!obj) {
    return ''
  }
  return obj[toNode.getData('uid')] || ''
}

// 渲染关联线文字
function renderText(str, path, text, node, toNode) {
  if (!str) return
  let { associativeLineTextFontSize, associativeLineTextLineHeight } =
    this.getStyleConfig(node, toNode)
  text.clear()
  let textArr = str.replace(/\n$/g, '').split(/\n/gim)
  textArr.forEach((item, index) => {
    // 避免尾部的空行不占宽度，导致文本编辑框定位异常的问题
    if (item === '') {
      item = '﻿'
    }
    let textNode = new Text().text(item)
    textNode.y(
      associativeLineTextFontSize * associativeLineTextLineHeight * index
    )
    this.styleText(textNode, node, toNode)
    text.add(textNode)
  })
  updateTextPos(path, text)
}

// 给文本设置样式
function styleText(textNode, node, toNode) {
  let {
    associativeLineTextColor,
    associativeLineTextFontSize,
    associativeLineTextFontFamily
  } = this.getStyleConfig(node, toNode)
  textNode
    .fill({
      color: associativeLineTextColor
    })
    .css({
      'font-family': associativeLineTextFontFamily,
      'font-size': associativeLineTextFontSize + 'px'
    })
}

// 更新关联线文字位置
function updateTextPos(path, text) {
  let pathLength = path.length()
  let centerPoint = path.pointAt(pathLength / 2)
  let { width: textWidth, height: textHeight } = text.bbox()
  text.x(centerPoint.x - textWidth / 2)
  text.y(centerPoint.y - textHeight / 2)
}

export default {
  getText,
  createText,
  styleText,
  onScale,
  showEditTextBox,
  setIsShowTextEdit,
  removeTextEditEl,
  hideEditTextBox,
  updateTextEditBoxPos,
  renderText,
  updateTextPos
}
