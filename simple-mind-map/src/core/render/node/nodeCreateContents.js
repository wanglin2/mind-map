import { measureText, resizeImgSize, removeHtmlStyle, addHtmlStyle, checkIsRichText } from '../../../utils'
import { Image, SVG, A, G, Rect, Text, ForeignObject } from '@svgdotjs/svg.js'
import iconsSvg from '../../../svg/icons'
import { CONSTANTS, commonCaches } from '../../../constants/constant'

//  创建图片节点
function createImgNode() {
  let img = this.nodeData.data.image
  if (!img) {
    return
  }
  let imgSize = this.getImgShowSize()
  let node = new Image().load(img).size(...imgSize)
  if (this.nodeData.data.imageTitle) {
    node.attr('title', this.nodeData.data.imageTitle)
  }
  node.on('dblclick', e => {
    this.mindMap.emit('node_img_dblclick', this, e)
  })
  node.on('mouseenter', e => {
    this.mindMap.emit('node_img_mouseenter', this, node, e)
  })
  node.on('mouseleave', e => {
    this.mindMap.emit('node_img_mouseleave', this, node, e)
  })
  node.on('mousemove', e => {
    this.mindMap.emit('node_img_mousemove', this, node, e)
  })
  return {
    node,
    width: imgSize[0],
    height: imgSize[1]
  }
}

//  获取图片显示宽高
function getImgShowSize() {
  const { custom, width, height } = this.nodeData.data.imageSize
  // 如果是自定义了图片的宽高，那么不受最大宽高限制
  if (custom) return [width, height]
  return resizeImgSize(
    width,
    height,
    this.mindMap.themeConfig.imgMaxWidth,
    this.mindMap.themeConfig.imgMaxHeight
  )
}

//  创建icon节点
function createIconNode() {
  let _data = this.nodeData.data
  if (!_data.icon || _data.icon.length <= 0) {
    return []
  }
  let iconSize = this.mindMap.themeConfig.iconSize
  return _data.icon.map(item => {
    let src = iconsSvg.getNodeIconListIcon(item, this.mindMap.opt.iconList || [])
    let node = null
    // svg图标
    if (/^<svg/.test(src)) {
      node = SVG(src)
    } else {
      // 图片图标
      node = new Image().load(src)
    }
    node.size(iconSize, iconSize)
    node.on('click', e => {
      this.mindMap.emit('node_icon_click', this, item, e)
    })
    return {
      node,
      width: iconSize,
      height: iconSize
    }
  })
}

// 创建富文本节点
function createRichTextNode() {
  let g = new G()
  // 重新设置富文本节点内容
  let recoverText = false
  if (this.nodeData.data.resetRichText) {
    delete this.nodeData.data.resetRichText
    recoverText = true
  }
  if ([CONSTANTS.CHANGE_THEME].includes(this.mindMap.renderer.renderSource)) {
    // 如果自定义过样式则不允许覆盖
    if (!this.hasCustomStyle()) {
      recoverText = true
    }
  }
  if (recoverText) {
    let text = this.nodeData.data.text
    // 判断节点内容是否是富文本
    let isRichText = checkIsRichText(text)
    // 样式字符串
    let style = this.style.createStyleText()
    if (isRichText) {
      // 如果是富文本那么线移除内联样式
      text = removeHtmlStyle(text)
      // 再添加新的内联样式
      text = addHtmlStyle(text, 'span', style)
    } else {
      // 非富文本
      text = `<p><span style="${style}">${text}</span></p>`
    }
    this.nodeData.data.text = text
  }
  let html = `<div>${this.nodeData.data.text}</div>`
  let div = document.createElement('div')
  div.innerHTML = html
  div.style.cssText = `position: fixed; left: -999999px;`
  let el = div.children[0]
  el.classList.add('smm-richtext-node-wrap')
  el.setAttribute('xmlns', 'http://www.w3.org/1999/xhtml')
  el.style.maxWidth = this.mindMap.opt.textAutoWrapWidth + 'px'
  this.mindMap.el.appendChild(div)
  let { width, height } = el.getBoundingClientRect()
  width = Math.ceil(width) + 1// 修复getBoundingClientRect方法对实际宽度是小数的元素获取到的值是整数，导致宽度不够文本发生换行的问题
  height = Math.ceil(height)
  g.attr('data-width', width)
  g.attr('data-height', height)
  html = div.innerHTML
  this.mindMap.el.removeChild(div)
  let foreignObject = new ForeignObject()
  foreignObject.width(width)
  foreignObject.height(height)
  foreignObject.add(SVG(html))
  g.add(foreignObject)
  return {
    node: g,
    width,
    height
  }
}

//  创建文本节点
function createTextNode() {
  if (this.nodeData.data.richText) {
    return this.createRichTextNode()
  }
  let g = new G()
  let fontSize = this.getStyle('fontSize', false, this.nodeData.data.isActive)
  let lineHeight = this.getStyle(
    'lineHeight',
    false,
    this.nodeData.data.isActive
  )
  // 文本超长自动换行
  let textStyle = this.style.getTextFontStyle()
  let textArr = this.nodeData.data.text.split(/\n/gim)
  let maxWidth = this.mindMap.opt.textAutoWrapWidth
  let isMultiLine = false
  textArr.forEach((item, index) => {
    let arr = item.split('')
    let lines = []
    let line = []
    while (arr.length) {
      let str = arr.shift()
      let text = [...line, str].join('')
      if (measureText(text, textStyle).width <= maxWidth) {
        line.push(str)
      } else {
        lines.push(line.join(''))
        line = [str]
      }
    }
    if (line.length > 0) {
      lines.push(line.join(''))
    }
    if (lines.length > 1) {
      isMultiLine = true
    }
    textArr[index] = lines.join('\n')
  })
  textArr = textArr.join('\n').split(/\n/gim)
  textArr.forEach((item, index) => {
    let node = new Text().text(item)
    this.style.text(node)
    node.y(fontSize * lineHeight * index)
    g.add(node)
  })
  let { width, height } = g.bbox()
  width = Math.ceil(width)
  height = Math.ceil(height)
  g.attr('data-width', width)
  g.attr('data-height', height)
  g.attr('data-ismultiLine', isMultiLine || textArr.length > 1)
  return {
    node: g,
    width,
    height
  }
}

//  创建超链接节点
function createHyperlinkNode() {
  let { hyperlink, hyperlinkTitle } = this.nodeData.data
  if (!hyperlink) {
    return
  }
  let iconSize = this.mindMap.themeConfig.iconSize
  let node = new SVG()
  // 超链接节点
  let a = new A().to(hyperlink).target('_blank')
  a.node.addEventListener('click', e => {
    e.stopPropagation()
  })
  if (hyperlinkTitle) {
    a.attr('title', hyperlinkTitle)
  }
  // 添加一个透明的层，作为鼠标区域
  a.rect(iconSize, iconSize).fill({ color: 'transparent' })
  // 超链接图标
  let iconNode = SVG(iconsSvg.hyperlink).size(iconSize, iconSize)
  this.style.iconNode(iconNode)
  a.add(iconNode)
  node.add(a)
  return {
    node,
    width: iconSize,
    height: iconSize
  }
}

//  创建标签节点
function createTagNode() {
  let tagData = this.nodeData.data.tag
  if (!tagData || tagData.length <= 0) {
    return []
  }
  let nodes = []
  tagData.slice(0, this.mindMap.opt.maxTag).forEach((item, index) => {
    let tag = new G()
    // 标签文本
    let text = new Text().text(item).x(8).cy(10)
    this.style.tagText(text, index)
    let { width } = text.bbox()
    // 标签矩形
    let rect = new Rect().size(width + 16, 20)
    this.style.tagRect(rect, index)
    tag.add(rect).add(text)
    nodes.push({
      node: tag,
      width: width + 16,
      height: 20
    })
  })
  return nodes
}

//  创建备注节点
function createNoteNode() {
  if (!this.nodeData.data.note) {
    return null
  }
  let iconSize = this.mindMap.themeConfig.iconSize
  let node = new SVG().attr('cursor', 'pointer')
  // 透明的层，用来作为鼠标区域
  node.add(new Rect().size(iconSize, iconSize).fill({ color: 'transparent' }))
  // 备注图标
  let iconNode = SVG(iconsSvg.note).size(iconSize, iconSize)
  this.style.iconNode(iconNode)
  node.add(iconNode)
  // 备注tooltip
  if (!this.mindMap.opt.customNoteContentShow) {
    if (!this.noteEl) {
      this.noteEl = document.createElement('div')
      this.noteEl.style.cssText = `
          position: absolute;
          padding: 10px;
          border-radius: 5px;
          box-shadow: 0 2px 5px rgb(0 0 0 / 10%);
          display: none;
          background-color: #fff;
          z-index: ${ this.mindMap.opt.nodeNoteTooltipZIndex }
      `
      document.body.appendChild(this.noteEl)
    }
    this.noteEl.innerText = this.nodeData.data.note
  }
  node.on('mouseover', () => {
    let { left, top } = node.node.getBoundingClientRect()
    if (!this.mindMap.opt.customNoteContentShow) {
      this.noteEl.style.left = left + 'px'
      this.noteEl.style.top = top + iconSize + 'px'
      this.noteEl.style.display = 'block'
    } else {
      this.mindMap.opt.customNoteContentShow.show(
        this.nodeData.data.note,
        left,
        top + iconSize
      )
    }
  })
  node.on('mouseout', () => {
    if (!this.mindMap.opt.customNoteContentShow) {
      this.noteEl.style.display = 'none'
    } else {
      this.mindMap.opt.customNoteContentShow.hide()
    }
  })
  return {
    node,
    width: iconSize,
    height: iconSize
  }
}

// 测量自定义节点内容元素的宽高
function measureCustomNodeContentSize (content) {
  if (!commonCaches.measureCustomNodeContentSizeEl) {
    commonCaches.measureCustomNodeContentSizeEl = document.createElement('div')
    commonCaches.measureCustomNodeContentSizeEl.style.cssText = `
      position: fixed;
      left: -99999px;
      top: -99999px;
    `
    this.mindMap.el.appendChild(commonCaches.measureCustomNodeContentSizeEl)
  }
  commonCaches.measureCustomNodeContentSizeEl.innerHTML = ''
  commonCaches.measureCustomNodeContentSizeEl.appendChild(content)
  let rect = commonCaches.measureCustomNodeContentSizeEl.getBoundingClientRect()
  return {
    width: rect.width,
    height: rect.height
  }
}

// 是否使用的是自定义节点内容
function isUseCustomNodeContent()  {
  return !!this._customNodeContent
}

export default {
    createImgNode,
    getImgShowSize,
    createIconNode,
    createRichTextNode,
    createTextNode,
    createHyperlinkNode,
    createTagNode,
    createNoteNode,
    measureCustomNodeContentSize,
    isUseCustomNodeContent
}