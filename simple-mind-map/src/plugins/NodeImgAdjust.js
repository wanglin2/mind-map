// 节点图片大小调整插件
import { resizeImgSizeByOriginRatio } from '../utils/index'
import btnsSvg from '../svg/btns'

class NodeImgAdjust {
  //  构造函数
  constructor({ mindMap }) {
    this.mindMap = mindMap
    this.resizeBtnSize = 26 // 调整按钮的大小
    this.handleEl = null // 自定义元素，用来渲染临时图片、调整按钮
    this.isShowHandleEl = false // 自定义元素是否在显示中
    this.node = null // 当前节点实例
    this.img = null // 当前节点的图片节点
    this.rect = null // 当前图片节点的尺寸信息
    this.isMousedown = false // 当前是否是按住调整按钮状态
    this.currentImgWidth = 0 // 当前拖拽实时图片的大小
    this.currentImgHeight = 0
    this.isAdjusted = false // 是否是拖拽结束后的渲染期间
    this.bindEvent()
  }

  // 监听事件
  bindEvent() {
    this.onNodeImgMouseleave = this.onNodeImgMouseleave.bind(this)
    this.onNodeImgMousemove = this.onNodeImgMousemove.bind(this)
    this.onMousemove = this.onMousemove.bind(this)
    this.onMouseup = this.onMouseup.bind(this)
    this.onRenderEnd = this.onRenderEnd.bind(this)
    this.mindMap.on('node_img_mouseleave', this.onNodeImgMouseleave)
    this.mindMap.on('node_img_mousemove', this.onNodeImgMousemove)
    this.mindMap.on('mousemove', this.onMousemove)
    this.mindMap.on('mouseup', this.onMouseup)
    this.mindMap.on('node_mouseup', this.onMouseup)
    this.mindMap.on('node_tree_render_end', this.onRenderEnd)
  }

  // 解绑事件
  unBindEvent() {
    this.mindMap.off('node_img_mouseleave', this.onNodeImgMouseleave)
    this.mindMap.off('node_img_mousemove', this.onNodeImgMousemove)
    this.mindMap.off('mousemove', this.onMousemove)
    this.mindMap.off('mouseup', this.onMouseup)
    this.mindMap.off('node_mouseup', this.onMouseup)
    this.mindMap.off('node_tree_render_end', this.onRenderEnd)
  }

  // 节点图片鼠标移动事件
  onNodeImgMousemove(node, img) {
    // 如果当前正在拖动调整中那么直接返回
    if (this.isMousedown || this.isAdjusted || this.mindMap.opt.readonly) return
    // 如果在当前节点内移动，以及自定义元素已经是显示状态，那么直接返回
    if (this.node && this.node.uid === node.uid && this.isShowHandleEl) return
    // 更新当前节点信息
    this.node = node
    this.img = img
    this.rect = this.img.rbox()
    // 显示自定义元素
    this.showHandleEl()
  }

  // 节点图片鼠标移出事件
  onNodeImgMouseleave() {
    if (this.isMousedown) return
    this.hideHandleEl()
  }

  // 隐藏节点实际的图片
  hideNodeImage() {
    if (!this.img) return
    this.img.hide()
  }

  // 显示节点实际的图片
  showNodeImage() {
    if (!this.img) return
    this.img.show()
  }

  // 显示自定义元素
  showHandleEl() {
    if (!this.handleEl) {
      this.createResizeBtnEl()
    }
    this.setHandleElRect()
    this.handleEl.style.display = 'block'
    this.isShowHandleEl = true
  }

  // 隐藏自定义元素
  hideHandleEl() {
    if (!this.isShowHandleEl) return
    this.isShowHandleEl = false
    this.handleEl.style.display = 'none'
    this.handleEl.style.backgroundImage = ``
    this.handleEl.style.width = 0
    this.handleEl.style.height = 0
    this.handleEl.style.left = 0
    this.handleEl.style.top = 0
  }

  // 设置自定义元素尺寸位置信息
  setHandleElRect() {
    let { width, height, x, y } = this.rect
    this.handleEl.style.left = `${x}px`
    this.handleEl.style.top = `${y}px`
    this.currentImgWidth = width
    this.currentImgHeight = height
    this.updateHandleElSize()
  }

  // 更新自定义元素宽高
  updateHandleElSize() {
    this.handleEl.style.width = `${this.currentImgWidth}px`
    this.handleEl.style.height = `${this.currentImgHeight}px`
  }

  // 创建调整按钮元素
  createResizeBtnEl() {
    // 容器元素
    this.handleEl = document.createElement('div')
    this.handleEl.style.cssText = `
      pointer-events: none;
      position: fixed;
	    display:none;
      background-size: cover;
    `
    this.handleEl.className = 'node-img-handle'
    // 调整按钮元素
    const btnEl = document.createElement('div')
    btnEl.innerHTML = btnsSvg.imgAdjust
    btnEl.style.cssText = `
      position: absolute;
      right: 0;
      bottom: 0;
      pointer-events: auto;
      background-color: rgba(0, 0, 0, 0.3);
      width: ${this.resizeBtnSize}px;
      height: ${this.resizeBtnSize}px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: nwse-resize;
    `
    btnEl.className = 'node-image-resize'
    // 给按钮元素绑定事件
    btnEl.addEventListener('mouseenter', () => {
      // 移入按钮，会触发节点图片的移出事件，所以需要再次显示按钮
      this.showHandleEl()
    })
    btnEl.addEventListener('mouseleave', () => {
      // 移除按钮，需要隐藏按钮
      if (this.isMousedown) return
      this.hideHandleEl()
    })
    btnEl.addEventListener('mousedown', e => {
      e.stopPropagation()
      this.onMousedown(e)
    })
    btnEl.addEventListener('mouseup', e => {
      setTimeout(() => {
        //点击后直接松开异常处理; 其他事件响应之后处理
        this.hideHandleEl()
        this.isAdjusted = false
      }, 0)
    })
    btnEl.addEventListener('click', e => {
      e.stopPropagation()
    })
    this.handleEl.appendChild(btnEl)
    // 删除按钮
    const btnRemove = document.createElement('div')
    this.handleEl.prepend(btnRemove)
    btnRemove.className = 'node-image-remove'
    btnRemove.innerHTML = btnsSvg.remove
    btnRemove.style.cssText = `
      position: absolute;
      right: 0;top:0;color:#fff;
      pointer-events: auto;
      background-color: rgba(0, 0, 0, 0.3);
      width: ${this.resizeBtnSize}px;
      height: ${this.resizeBtnSize}px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    `
    btnRemove.addEventListener('mouseenter', e => {
      this.showHandleEl()
    })
    btnRemove.addEventListener('mouseleave', e => {
      if (this.isMousedown) return
      this.hideHandleEl()
    })
    btnRemove.addEventListener('click', e => {
      this.mindMap.execCommand('SET_NODE_IMAGE', this.node, { url: null })
    })
    // 添加元素到页面
    const targetNode = this.mindMap.opt.customInnerElsAppendTo || document.body
    targetNode.appendChild(this.handleEl)
  }

  // 鼠标按钮按下事件
  onMousedown() {
    this.isMousedown = true
    // 隐藏节点实际图片
    this.hideNodeImage()
    // 将节点图片渲染到自定义元素上
    this.handleEl.style.backgroundImage = `url(${this.node.getData('image')})`
  }

  // 鼠标移动
  onMousemove(e) {
    if (!this.isMousedown) return
    e.preventDefault()
    // 计算当前拖拽位置对应的图片的实时大小
    let { width: imageOriginWidth, height: imageOriginHeight } =
      this.node.getData('imageSize')
    let newWidth = e.clientX - this.rect.x
    let newHeight = e.clientY - this.rect.y
    if (newWidth <= 0 || newHeight <= 0) return
    let [actWidth, actHeight] = resizeImgSizeByOriginRatio(
      imageOriginWidth,
      imageOriginHeight,
      newWidth,
      newHeight
    )
    this.currentImgWidth = actWidth
    this.currentImgHeight = actHeight
    this.updateHandleElSize()
  }

  // 鼠标松开
  onMouseup() {
    if (!this.isMousedown) return
    // 显示节点实际图片
    this.showNodeImage()
    // 隐藏自定义元素
    this.hideHandleEl()
    // 更新节点图片为新的大小
    let { image, imageTitle } = this.node.getData()
    let { scaleX, scaleY } = this.mindMap.draw.transform()
    this.mindMap.execCommand('SET_NODE_IMAGE', this.node, {
      url: image,
      title: imageTitle,
      width: this.currentImgWidth / scaleX,
      height: this.currentImgHeight / scaleY,
      custom: true // 代表自定义了图片大小
    })
    this.isAdjusted = true
    this.isMousedown = false
  }

  // 渲染完成事件
  onRenderEnd() {
    if (!this.isAdjusted) {
      this.hideHandleEl()
      return
    }
    this.isAdjusted = false
  }

  // 插件被移除前做的事情
  beforePluginRemove() {
    this.unBindEvent()
  }

  // 插件被卸载前做的事情
  beforePluginDestroy() {
    this.unBindEvent()
  }
}

NodeImgAdjust.instanceName = 'nodeImgAdjust'

export default NodeImgAdjust
