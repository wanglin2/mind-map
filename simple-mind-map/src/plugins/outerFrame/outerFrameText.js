import { Text, Rect, G } from '@svgdotjs/svg.js'
import {
  getStrWithBrFromHtml,
  focusInput,
  selectAllInput
} from '../../utils/index'

const OUTER_FRAME_TEXT_EDIT_WRAP = 'outer-frame-text-edit-warp'

// 创建文字节点
function createText(el, cur, range) {
  const g = this.draw.group()
  const setActive = () => {
    if (!this.activeOuterFrame || this.activeOuterFrame.el !== el) {
      this.setActiveOuterFrame(el, cur, range, g)
    }
  }
  g.click(e => {
    e.stopPropagation()
    setActive()
  })
  g.on('dblclick', e => {
    e.stopPropagation()
    setActive()
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
    this.textEditNode.className = OUTER_FRAME_TEXT_EDIT_WRAP
    this.textEditNode.style.cssText = `
      position: fixed;
      box-sizing: border-box;
      background-color: #fff;
      box-shadow: 0 0 20px rgba(0,0,0,.5);
      outline: none; 
      word-break: break-all;
    `
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
  const { node, range } = this.activeOuterFrame
  const style = this.getStyle(this.getNodeRangeFirstNode(node, range))
  const [pl, pt, pr, pb] = style.textFillPadding
  let { defaultOuterFrameText, nodeTextEditZIndex } = this.mindMap.opt
  let scale = this.mindMap.view.scale
  let text = this.getText(this.getNodeRangeFirstNode(node, range))
  let textLines = (text || defaultOuterFrameText).split(/\n/gim)
  this.textEditNode.style.padding = `${pl}px ${pt}px ${pr}px ${pb}px`
  this.textEditNode.style.fontFamily = style.fontFamily
  this.textEditNode.style.fontSize = style.fontSize * scale + 'px'
  this.textEditNode.style.fontWeight = style.fontWeight
  this.textEditNode.style.fontStyle = style.fontStyle
  this.textEditNode.style.lineHeight =
    textLines.length > 1 ? style.lineHeight : 'normal'
  this.textEditNode.style.zIndex = nodeTextEditZIndex
  this.textEditNode.innerHTML = textLines.join('<br>')
  this.textEditNode.style.display = 'block'
  this.updateTextEditBoxPos(g)
  this.setIsShowTextEdit(true)
  // 如果是默认文本要全选输入框
  if (text === '' || text === defaultOuterFrameText) {
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
    this.textEditNode.style.minWidth = `${rect.width}px`
    this.textEditNode.style.minHeight = `${rect.height}px`
    this.textEditNode.style.left = `${rect.left}px`
    this.textEditNode.style.top = `${rect.top}px`
  }
}

//  隐藏文本编辑框
function hideEditTextBox() {
  if (!this.showTextEdit) {
    return
  }
  let { el, textNode, node, range } = this.activeOuterFrame
  let str = getStrWithBrFromHtml(this.textEditNode.innerHTML)
  // 如果是默认文本，那么不保存
  let isDefaultText = str === this.mindMap.opt.defaultOuterFrameText
  str = isDefaultText ? '' : str
  this.updateActiveOuterFrame({
    text: str
  })
  this.textEditNode.style.display = 'none'
  this.textEditNode.innerHTML = ''
  this.setIsShowTextEdit(false)
  this.renderText(str, el, textNode, node, range)
  this.mindMap.emit('hide_text_edit')
}

// 渲染文字
function renderText(str, rect, textNode, node, range) {
  if (!str) return
  // 先清空文字节点原内容
  textNode.clear()
  // 创建背景矩形
  const shape = new Rect()
  textNode.add(shape)
  // 获取样式配置
  const style = this.getStyle(this.getNodeRangeFirstNode(node, range))
  const [pl, pt, pr, pb] = style.textFillPadding
  // 创建文本节点
  let textArr = str.replace(/\n$/g, '').split(/\n/gim)
  const g = new G()
  textArr.forEach((item, index) => {
    // 避免尾部的空行不占宽度，导致文本编辑框定位异常的问题
    if (item === '') {
      item = '﻿'
    }
    let text = new Text().text(item)
    text.y(style.fontSize * style.lineHeight * index)
    this.styleText(text, style)
    g.add(text)
  })
  textNode.add(g)
  // 计算高度
  const { width: textWidth, height: textHeight } = textNode.bbox()
  const totalWidth = textWidth + pl + pr
  const totalHeight = textHeight + pt + pb
  shape.size(totalWidth, totalHeight).x(0).dy(0)
  this.styleTextShape(shape, style)
  // 设置节点位置
  let tx = 0
  switch (style.textAlign) {
    case 'left':
      tx = rect.x()
      break
    case 'center':
      tx = rect.x() + rect.width() / 2 - totalWidth / 2
      break
    case 'right':
      tx = rect.x() + rect.width() - totalWidth
      break
    default:
      break
  }
  const ty = rect.y() - totalHeight
  shape.x(tx)
  shape.y(ty)
  g.x(tx + pl)
  g.y(ty + pt)
}

// 给文本背景设置样式
function styleTextShape(shape, style) {
  shape
    .fill({
      color: style.textFill
    })
    .radius(style.textFillRadius)
}

// 给文本设置样式
function styleText(textNode, style) {
  textNode
    .fill({
      color: style.color
    })
    .css({
      'font-family': style.fontFamily,
      'font-size': style.fontSize + 'px',
      'font-weight': style.fontWeight,
      'font-style': style.fontStyle
    })
}

// 获取外框文字
function getText(node) {
  const data = node.getData('outerFrame')
  return data && data.text ? data.text : ''
}

export default {
  getText,
  createText,
  styleTextShape,
  styleText,
  onScale,
  showEditTextBox,
  setIsShowTextEdit,
  removeTextEditEl,
  hideEditTextBox,
  updateTextEditBoxPos,
  renderText
}
