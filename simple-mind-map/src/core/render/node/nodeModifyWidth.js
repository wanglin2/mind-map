import { Rect } from '@svgdotjs/svg.js'

// 初始化拖拽
function initDragHandle() {
  if (!this.checkEnableDragModifyNodeWidth()) {
    return
  }
  // 拖拽手柄元素
  this._dragHandleNodes = null
  // 手柄元素的宽度
  this.dragHandleWidth = 4
  // 鼠标按下时的x坐标
  this.dragHandleMousedownX = 0
  // 鼠标是否处于按下状态
  this.isDragHandleMousedown = false
  // 当前拖拽的手柄序号
  this.dragHandleIndex = 0
  // 鼠标按下时记录当前的customTextWidth值
  this.dragHandleMousedownCustomTextWidth = 0
  // 鼠标按下时记录当前的手型样式
  this.dragHandleMousedownBodyCursor = ''
  // 鼠标按下时记录当前节点的left值
  this.dragHandleMousedownLeft = 0

  this.onDragMousemoveHandle = this.onDragMousemoveHandle.bind(this)
  window.addEventListener('mousemove', this.onDragMousemoveHandle)
  this.onDragMouseupHandle = this.onDragMouseupHandle.bind(this)
  window.addEventListener('mouseup', this.onDragMouseupHandle)
  this.mindMap.on('node_mouseup', this.onDragMouseupHandle)
}

// 鼠标移动事件
function onDragMousemoveHandle(e) {
  if (!this.isDragHandleMousedown) return
  e.stopPropagation()
  e.preventDefault()
  let {
    minNodeTextModifyWidth,
    maxNodeTextModifyWidth,
    isUseCustomNodeContent,
    customCreateNodeContent
  } = this.mindMap.opt
  const useCustomContent =
    isUseCustomNodeContent && customCreateNodeContent && this._customNodeContent
  document.body.style.cursor = 'ew-resize'
  this.group.css({
    cursor: 'ew-resize'
  })
  const { scaleX } = this.mindMap.draw.transform()
  const ox = e.clientX - this.dragHandleMousedownX
  let newWidth =
    this.dragHandleMousedownCustomTextWidth +
    (this.dragHandleIndex === 0 ? -ox : ox) / scaleX
  newWidth = Math.max(newWidth, minNodeTextModifyWidth)
  if (maxNodeTextModifyWidth !== -1) {
    newWidth = Math.min(newWidth, maxNodeTextModifyWidth)
  }
  // 如果存在图片，那么最小值需要考虑图片宽度
  if (!useCustomContent && this.getData('image')) {
    const imgSize = this.getImgShowSize()
    if (
      this._rectInfo.textContentWidth - this.customTextWidth + newWidth <=
      imgSize[0]
    ) {
      newWidth =
        imgSize[0] + this.customTextWidth - this._rectInfo.textContentWidth
    }
  }
  this.customTextWidth = newWidth
  if (this.dragHandleIndex === 0) {
    this.left = this.dragHandleMousedownLeft + ox / scaleX
  }
  // 自定义内容不重新渲染，交给开发者
  this.reRender(useCustomContent ? [] : ['text'], {
    ignoreUpdateCustomTextWidth: true
  })
}

// 鼠标松开事件
function onDragMouseupHandle() {
  if (!this.isDragHandleMousedown) return
  document.body.style.cursor = this.dragHandleMousedownBodyCursor
  this.group.css({
    cursor: 'default'
  })
  this.isDragHandleMousedown = false
  this.dragHandleMousedownX = 0
  this.dragHandleIndex = 0
  this.dragHandleMousedownCustomTextWidth = 0
  this.setData({
    customTextWidth: this.customTextWidth
  })
  this.mindMap.render()
  this.mindMap.emit('dragModifyNodeWidthEnd', this)
}

// 插件拖拽手柄元素
function createDragHandleNode() {
  const list = [new Rect(), new Rect()]
  list.forEach((node, index) => {
    node
      .size(this.dragHandleWidth, this.height)
      .fill({
        color: 'transparent'
      })
      .css({
        cursor: 'ew-resize'
      })
    node.on('mousedown', e => {
      e.stopPropagation()
      e.preventDefault()
      this.dragHandleMousedownX = e.clientX
      this.dragHandleIndex = index
      this.dragHandleMousedownCustomTextWidth =
        this.customTextWidth === undefined
          ? this._textData
            ? this._textData.width
            : this.width
          : this.customTextWidth
      this.dragHandleMousedownBodyCursor = document.body.style.cursor
      this.dragHandleMousedownLeft = this.left
      this.isDragHandleMousedown = true
    })
  })
  return list
}

// 更新拖拽按钮的显隐和位置尺寸
function updateDragHandle() {
  if (!this.checkEnableDragModifyNodeWidth()) return
  if (!this._dragHandleNodes) {
    this._dragHandleNodes = this.createDragHandleNode()
  }
  if (this.getData('isActive')) {
    this._dragHandleNodes.forEach(node => {
      node.height(this.height)
      this.group.add(node)
    })
    this._dragHandleNodes[1].x(this.width - this.dragHandleWidth)
  } else {
    this._dragHandleNodes.forEach(node => {
      node.remove()
    })
  }
}

export default {
  initDragHandle,
  onDragMousemoveHandle,
  onDragMouseupHandle,
  createDragHandleNode,
  updateDragHandle
}
