import { CONSTANTS } from '../../../constants/constant'
import { G, Rect } from '@svgdotjs/svg.js'
import { createForeignObjectNode } from '../../../utils/index'

// 根据图片放置位置返回图片和文本的间距值
function getImgTextMarin(dir, imgWidth, textWidth, imgHeight, textHeight) {
  // 图片和文字节点的间距
  const { imgTextMargin } = this.mindMap.opt
  if (dir === 'v') {
    // 垂直
    return imgHeight > 0 && textHeight > 0 ? imgTextMargin : 0
  } else {
    // 水平
    return imgWidth > 0 && textWidth > 0 ? imgTextMargin : 0
  }
}

// 获取标签内容的大小
function getTagContentSize(space) {
  let maxTagHeight = 0
  let width = this._tagData.reduce((sum, cur) => {
    maxTagHeight = Math.max(maxTagHeight, cur.height)
    return (sum += cur.width)
  }, 0)
  width += (this._tagData.length - 1) * space
  return {
    width,
    height: maxTagHeight
  }
}

//  计算节点尺寸信息
function getNodeRect() {
  // 自定义节点内容
  if (this.isUseCustomNodeContent()) {
    const rect = this.measureCustomNodeContentSize(
      this._customNodeContent.cloneNode(true)
    )
    return {
      width: this.hasCustomWidth() ? this.customTextWidth : rect.width,
      height: rect.height
    }
  }
  const { TAG_PLACEMENT, IMG_PLACEMENT } = CONSTANTS
  const { textContentMargin } = this.mindMap.opt
  const tagPlacement = this.getStyle('tagPlacement') || TAG_PLACEMENT.RIGHT
  const tagIsBottom = tagPlacement === TAG_PLACEMENT.BOTTOM
  const imgPlacement = this.getStyle('imgPlacement') || IMG_PLACEMENT.TOP
  // 宽高
  let imgContentWidth = 0
  let imgContentHeight = 0
  let textContentWidth = 0
  let textContentHeight = 0
  let tagContentWidth = 0
  let tagContentHeight = 0
  let spaceCount = 0
  // 存在图片
  if (this._imgData) {
    imgContentWidth = this._imgData.width
    imgContentHeight = this._imgData.height
  }
  // 库前置内容
  this.mindMap.nodeInnerPrefixList.forEach(item => {
    const itemData = this[`_${item.name}Data`]
    if (itemData) {
      textContentWidth += itemData.width
      textContentHeight = Math.max(textContentHeight, itemData.height)
      spaceCount++
    }
  })
  // 自定义前置内容
  if (this._prefixData) {
    textContentWidth += this._prefixData.width
    textContentHeight = Math.max(textContentHeight, this._prefixData.height)
    spaceCount++
  }
  // 图标
  if (this._iconData.length > 0) {
    textContentWidth +=
      this._iconData.reduce((sum, cur) => {
        textContentHeight = Math.max(textContentHeight, cur.height)
        return (sum += cur.width)
      }, 0) +
      (this._iconData.length - 1) * textContentMargin
    spaceCount++
  }
  // 文字
  if (this._textData) {
    textContentWidth += this._textData.width
    textContentHeight = Math.max(textContentHeight, this._textData.height)
    spaceCount++
  }
  // 超链接
  if (this._hyperlinkData) {
    textContentWidth += this._hyperlinkData.width
    textContentHeight = Math.max(textContentHeight, this._hyperlinkData.height)
    spaceCount++
  }
  // 标签
  if (this._tagData.length > 0) {
    const { width: totalTagWidth, height: maxTagHeight } =
      this.getTagContentSize(textContentMargin)
    if (tagIsBottom) {
      // 文字下方
      tagContentWidth = totalTagWidth
      tagContentHeight = maxTagHeight
    } else {
      // 否则在右侧
      textContentWidth += totalTagWidth
      textContentHeight = Math.max(textContentHeight, maxTagHeight)
      spaceCount++
    }
  }
  // 备注
  if (this._noteData) {
    textContentWidth += this._noteData.width
    textContentHeight = Math.max(textContentHeight, this._noteData.height)
    spaceCount++
  }
  // 附件
  if (this._attachmentData) {
    textContentWidth += this._attachmentData.width
    textContentHeight = Math.max(textContentHeight, this._attachmentData.height)
    spaceCount++
  }
  // 自定义后置内容
  if (this._postfixData) {
    textContentWidth += this._postfixData.width
    textContentHeight = Math.max(textContentHeight, this._postfixData.height)
    spaceCount++
  }
  // 库后置内容
  this.mindMap.nodeInnerPostfixList.forEach(item => {
    const itemData = this[`_${item.name}Data`]
    if (itemData) {
      textContentWidth += itemData.width
      textContentHeight = Math.max(textContentHeight, itemData.height)
      spaceCount++
    }
  })
  textContentWidth += (spaceCount - 1) * textContentMargin
  // 文字内容部分的尺寸
  if (tagIsBottom && textContentWidth > 0 && tagContentHeight > 0) {
    this._rectInfo.textContentWidthWithoutTag = textContentWidth
    textContentWidth = Math.max(textContentWidth, tagContentWidth)
    textContentHeight = textContentHeight + textContentMargin + tagContentHeight
  }
  this._rectInfo.textContentWidth = textContentWidth
  this._rectInfo.textContentHeight = textContentHeight

  // 纯内容宽高
  let _width = 0
  let _height = 0
  if ([IMG_PLACEMENT.TOP, IMG_PLACEMENT.BOTTOM].includes(imgPlacement)) {
    // 图片在上下
    _width = Math.max(imgContentWidth, textContentWidth)
    _height =
      imgContentHeight +
      textContentHeight +
      this.getImgTextMarin('v', 0, 0, imgContentHeight, textContentHeight)
  } else {
    // 图片在左右
    _width =
      imgContentWidth +
      textContentWidth +
      this.getImgTextMarin('h', imgContentWidth, textContentWidth)
    _height = Math.max(imgContentHeight, textContentHeight)
  }
  const { paddingX, paddingY } = this.getPaddingVale()
  // 计算节点形状需要的附加内边距
  const { paddingX: shapePaddingX, paddingY: shapePaddingY } =
    this.shapeInstance.getShapePadding(_width, _height, paddingX, paddingY)
  this.shapePadding.paddingX = shapePaddingX
  this.shapePadding.paddingY = shapePaddingY
  // 边框宽度，因为边框是以中线向两端发散，所以边框会超出节点
  const borderWidth = this.getBorderWidth()
  return {
    width: _width + paddingX * 2 + shapePaddingX * 2 + borderWidth,
    height: _height + paddingY * 2 + shapePaddingY * 2 + borderWidth
  }
}

// 激活hover和激活边框
function addHoverNode(width, height) {
  const { hoverRectPadding } = this.mindMap.opt
  this.hoverNode = new Rect()
    .size(width + hoverRectPadding * 2, height + hoverRectPadding * 2)
    .x(-hoverRectPadding)
    .y(-hoverRectPadding)
  this.hoverNode.addClass('smm-hover-node')
  this.style.hoverNode(this.hoverNode, width, height)
  this.group.add(this.hoverNode)
}

// 当使用了完全自定义节点内容后，可以通过该方法实时更新节点大小
function customNodeContentRealtimeLayout() {
  if (!this.group) return
  if (!this.isUseCustomNodeContent()) return
  // 删除除foreignObject外的其他元素
  if (this.shapeNode) this.shapeNode.remove()
  if (this._unVisibleRectRegionNode) this._unVisibleRectRegionNode.remove()
  if (this.hoverNode) this.hoverNode.remove()
  const { width, height } = this
  const halfBorderWidth = this.getBorderWidth() / 2
  // 节点形状
  this.shapeNode = this.shapeInstance.createShape()
  this.shapeNode.addClass('smm-node-shape')
  this.shapeNode.translate(halfBorderWidth, halfBorderWidth)
  this.style.shape(this.shapeNode)
  this.group.add(this.shapeNode)
  // 渲染一个隐藏的矩形区域，用来触发展开收起按钮的显示
  this.renderExpandBtnPlaceholderRect()
  // 概要节点添加一个带所属节点id的类名
  if (this.isGeneralization && this.generalizationBelongNode) {
    this.group.addClass('generalization_' + this.generalizationBelongNode.uid)
  }
  // 激活hover和激活边框
  this.addHoverNode(width, height)
  // 将形状元素移至底层，避免遮挡foreignObject
  this.shapeNode.back()
  // 更新foreignObject元素大小
  this.group.findOne('foreignObject').size(width, height)
}

//  定位节点内容
function layout() {
  if (!this.group) return
  // 清除之前的内容
  this.group.clear()
  const {
    openRealtimeRenderOnNodeTextEdit,
    textContentMargin,
    addCustomContentToNode
  } = this.mindMap.opt
  // 避免编辑过程中展开收起按钮闪烁的问题
  // 暂时去掉，带来的问题太多
  // if (
  //   openRealtimeRenderOnNodeTextEdit &&
  //   this._expandBtn &&
  //   this.getChildrenLength() > 0
  // ) {
  //   this.group.add(this._expandBtn)
  // }
  const { width, height } = this
  let { paddingX, paddingY } = this.getPaddingVale()
  const halfBorderWidth = this.getBorderWidth() / 2
  paddingX += this.shapePadding.paddingX + halfBorderWidth
  paddingY += this.shapePadding.paddingY + halfBorderWidth
  // 节点形状
  this.shapeNode = this.shapeInstance.createShape()
  this.shapeNode.addClass('smm-node-shape')
  this.shapeNode.translate(halfBorderWidth, halfBorderWidth)
  this.style.shape(this.shapeNode)
  this.group.add(this.shapeNode)
  // 渲染一个隐藏的矩形区域，用来触发展开收起按钮的显示
  this.renderExpandBtnPlaceholderRect()
  // 创建协同头像节点
  if (this.createUserListNode) this.createUserListNode()
  // 概要节点添加一个带所属节点id的类名
  if (this.isGeneralization && this.generalizationBelongNode) {
    this.group.addClass('generalization_' + this.generalizationBelongNode.uid)
  }
  // 如果存在自定义节点内容，那么使用自定义节点内容
  if (this.isUseCustomNodeContent()) {
    const foreignObject = createForeignObjectNode({
      el: this._customNodeContent,
      width,
      height
    })
    this.group.add(foreignObject)
    this.addHoverNode(width, height)
    return
  }
  const { IMG_PLACEMENT, TAG_PLACEMENT } = CONSTANTS
  const imgPlacement = this.getStyle('imgPlacement') || IMG_PLACEMENT.TOP
  const tagPlacement = this.getStyle('tagPlacement') || TAG_PLACEMENT.RIGHT
  const tagIsBottom = tagPlacement === TAG_PLACEMENT.BOTTOM
  let { textContentWidth, textContentHeight, textContentWidthWithoutTag } =
    this._rectInfo
  const textContentHeightWithTag = textContentHeight
  // 如果存在显示在文本下方的标签，那么非标签内容的整体高度需要减去标签高度
  let totalTagWidth = 0
  let maxTagHeight = 0
  const hasTagContent = this._tagData && this._tagData.length > 0
  if (hasTagContent) {
    const res = this.getTagContentSize(textContentMargin)
    totalTagWidth = res.width
    maxTagHeight = res.height
    if (tagIsBottom) {
      textContentHeight -= maxTagHeight + textContentMargin
    }
  }
  // 图片节点
  let imgWidth = 0
  let imgHeight = 0
  if (this._imgData) {
    imgWidth = this._imgData.width
    imgHeight = this._imgData.height
    this.group.add(this._imgData.node)
    switch (imgPlacement) {
      case IMG_PLACEMENT.TOP:
        this._imgData.node.cx(width / 2).y(paddingY)
        break
      case IMG_PLACEMENT.BOTTOM:
        this._imgData.node.cx(width / 2).y(height - paddingY - imgHeight)
        break
      case IMG_PLACEMENT.LEFT:
        this._imgData.node.x(paddingX).cy(height / 2)
        break
      case IMG_PLACEMENT.RIGHT:
        this._imgData.node.x(width - paddingX - imgWidth).cy(height / 2)
        break
      default:
        break
    }
  }
  // 内容节点
  let textContentNested = new G()
  let textContentOffsetX = 0
  if (hasTagContent && tagIsBottom) {
    textContentOffsetX =
      textContentWidthWithoutTag < textContentWidth
        ? (textContentWidth - textContentWidthWithoutTag) / 2
        : 0
  }
  // 库前置内容
  this.mindMap.nodeInnerPrefixList.forEach(item => {
    const itemData = this[`_${item.name}Data`]
    if (itemData) {
      itemData.node
        .x(textContentOffsetX)
        .y((textContentHeight - itemData.height) / 2)
      textContentNested.add(itemData.node)
      textContentOffsetX += itemData.width + textContentMargin
    }
  })
  // 自定义前置内容
  if (this._prefixData) {
    const foreignObject = createForeignObjectNode({
      el: this._prefixData.el,
      width: this._prefixData.width,
      height: this._prefixData.height
    })
    foreignObject
      .x(textContentOffsetX)
      .y((textContentHeight - this._prefixData.height) / 2)
    textContentNested.add(foreignObject)
    textContentOffsetX += this._prefixData.width + textContentMargin
  }
  // icon
  let iconNested = new G()
  if (this._iconData && this._iconData.length > 0) {
    let iconLeft = 0
    this._iconData.forEach(item => {
      item.node
        .x(textContentOffsetX + iconLeft)
        .y((textContentHeight - item.height) / 2)
      iconNested.add(item.node)
      iconLeft += item.width + textContentMargin
    })
    textContentNested.add(iconNested)
    textContentOffsetX += iconLeft
  }
  // 文字
  if (this._textData) {
    const oldX = this._textData.node.attr('data-offsetx') || 0
    this._textData.node.attr('data-offsetx', textContentOffsetX)
    // 修复safari浏览器节点存在图标时文字位置不正确的问题
    ;(this._textData.nodeContent || this._textData.node)
      .x(-oldX) // 修复非富文本模式下同时存在图标和换行的文本时，被收起和展开时图标与文字距离会逐渐拉大的问题
      .x(textContentOffsetX)
      .y((textContentHeight - this._textData.height) / 2)
    // 如果开启了文本编辑实时渲染，需要判断当前渲染的节点是否是正在编辑的节点，是的话将透明度设置为0不显示
    if (openRealtimeRenderOnNodeTextEdit) {
      this._textData.node.opacity(
        this.mindMap.renderer.textEdit.getCurrentEditNode() === this ? 0 : 1
      )
    }
    textContentNested.add(this._textData.node)
    textContentOffsetX += this._textData.width + textContentMargin
  }
  // 超链接
  if (this._hyperlinkData) {
    this._hyperlinkData.node
      .x(textContentOffsetX)
      .y((textContentHeight - this._hyperlinkData.height) / 2)
    textContentNested.add(this._hyperlinkData.node)
    textContentOffsetX += this._hyperlinkData.width + textContentMargin
  }
  // 标签
  let tagNested = new G()
  if (hasTagContent) {
    if (tagIsBottom) {
      // 标签显示在文字下方
      let tagLeft = 0
      this._tagData.forEach(item => {
        item.node.x(tagLeft).y((maxTagHeight - item.height) / 2)
        tagNested.add(item.node)
        tagLeft += item.width + textContentMargin
      })
      tagNested
        .x((textContentWidth - totalTagWidth) / 2)
        .y(textContentHeightWithTag - maxTagHeight)
      textContentNested.add(tagNested)
    } else {
      // 标签显示在文字右侧
      let tagLeft = 0
      this._tagData.forEach(item => {
        item.node
          .x(textContentOffsetX + tagLeft)
          .y((textContentHeight - item.height) / 2)
        tagNested.add(item.node)
        tagLeft += item.width + textContentMargin
      })
      textContentNested.add(tagNested)
      textContentOffsetX += tagLeft
    }
  }
  // 备注
  if (this._noteData) {
    this._noteData.node
      .x(textContentOffsetX)
      .y((textContentHeight - this._noteData.height) / 2)
    textContentNested.add(this._noteData.node)
    textContentOffsetX += this._noteData.width + textContentMargin
  }
  // 附件
  if (this._attachmentData) {
    this._attachmentData.node
      .x(textContentOffsetX)
      .y((textContentHeight - this._attachmentData.height) / 2)
    textContentNested.add(this._attachmentData.node)
    textContentOffsetX += this._attachmentData.width + textContentMargin
  }
  // 自定义后置内容
  if (this._postfixData) {
    const foreignObject = createForeignObjectNode({
      el: this._postfixData.el,
      width: this._postfixData.width,
      height: this._postfixData.height
    })
    foreignObject
      .x(textContentOffsetX)
      .y((textContentHeight - this._postfixData.height) / 2)
    textContentNested.add(foreignObject)
    textContentOffsetX += this._postfixData.width + textContentMargin
  }
  // 库后置内容
  this.mindMap.nodeInnerPostfixList.forEach(item => {
    const itemData = this[`_${item.name}Data`]
    if (itemData) {
      itemData.node
        .x(textContentOffsetX)
        .y((textContentHeight - itemData.height) / 2)
      textContentNested.add(itemData.node)
      textContentOffsetX += itemData.width + textContentMargin
    }
  })
  this.group.add(textContentNested)
  // 文字内容整体
  const { width: bboxWidth, height: bboxHeight } = textContentNested.bbox()
  let translateX = 0
  let translateY = 0
  switch (imgPlacement) {
    case IMG_PLACEMENT.TOP:
      translateX = width / 2 - bboxWidth / 2
      translateY =
        paddingY + // 内边距
        imgHeight + // 图片高度
        this.getImgTextMarin('v', 0, 0, imgHeight, textContentHeightWithTag) // 和图片的间距
      break
    case IMG_PLACEMENT.BOTTOM:
      translateX = width / 2 - bboxWidth / 2
      translateY = paddingY
      break
    case IMG_PLACEMENT.LEFT:
      translateX =
        imgWidth +
        paddingX +
        this.getImgTextMarin('h', imgWidth, textContentWidth)
      translateY = height / 2 - bboxHeight / 2
      break
    case IMG_PLACEMENT.RIGHT:
      translateX = paddingX
      translateY = height / 2 - bboxHeight / 2
      break
  }
  textContentNested.translate(translateX, translateY)
  this.addHoverNode(width, height)
  if (this._customContentAddToNodeAdd && this._customContentAddToNodeAdd.el) {
    const foreignObject = createForeignObjectNode(
      this._customContentAddToNodeAdd
    )
    this.group.add(foreignObject)
    if (
      addCustomContentToNode &&
      typeof addCustomContentToNode.handle === 'function'
    ) {
      addCustomContentToNode.handle({
        content: this._customContentAddToNodeAdd,
        element: foreignObject,
        node: this
      })
    }
  }
  this.mindMap.emit('node_layout_end', this)
}

export default {
  getImgTextMarin,
  getTagContentSize,
  getNodeRect,
  addHoverNode,
  layout,
  customNodeContentRealtimeLayout
}
