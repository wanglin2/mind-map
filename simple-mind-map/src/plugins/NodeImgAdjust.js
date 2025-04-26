// 节点图片大小调整插件
import { resizeImgSizeByOriginRatio } from '../utils/index'
import btnsSvg from '../svg/btns'

class NodeImgAdjust {
  //  构造函数
  constructor({ mindMap }) {
    this.mindMap = mindMap
    this.handleEl = null // 自定义元素，用来渲染临时图片、调整按钮
    this.isShowHandleEl = false // 自定义元素是否在显示中
    this.node = null // 当前节点实例
    this.img = null // 当前节点的图片节点
    this.rect = null // 当前图片节点的尺寸信息
    this.isMousedown = false // 当前是否是按住调整按钮状态
    this.mousedownDrawTransform = null //鼠标按下时对当前画布的变换
    this.mousedownOffset = {
      // 鼠标按下时位置和图片右下角相差的距离
      x: 0,
      y: 0
    }
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
    this.onScale = this.onScale.bind(this)
    this.mindMap.on('node_img_mouseleave', this.onNodeImgMouseleave)
    this.mindMap.on('node_img_mousemove', this.onNodeImgMousemove)
    this.mindMap.on('mousemove', this.onMousemove)
    this.mindMap.on('mouseup', this.onMouseup)
    this.mindMap.on('node_mouseup', this.onMouseup)
    this.mindMap.on('node_tree_render_end', this.onRenderEnd)
    this.mindMap.on('scale', this.onScale)
  }

  // 解绑事件
  unBindEvent() {
    this.mindMap.off('node_img_mouseleave', this.onNodeImgMouseleave)
    this.mindMap.off('node_img_mousemove', this.onNodeImgMousemove)
    this.mindMap.off('mousemove', this.onMousemove)
    this.mindMap.off('mouseup', this.onMouseup)
    this.mindMap.off('node_mouseup', this.onMouseup)
    this.mindMap.off('node_tree_render_end', this.onRenderEnd)
    this.mindMap.off('scale', this.onScale)
  }

  // 如果当前操作按钮正在显示时缩放了画布，那么需要更新位置
  onScale() {
    if (this.node && this.img && this.isShowHandleEl) {
      this.rect = this.img.rbox()
      this.setHandleElRect()
    }
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
    if (this.isShowHandleEl) return
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
    const {
      imgResizeBtnSize,
      customResizeBtnInnerHTML,
      customDeleteBtnInnerHTML
    } = this.mindMap.opt
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
    btnEl.innerHTML = customResizeBtnInnerHTML || btnsSvg.imgAdjust
    btnEl.style.cssText = `
      position: absolute;
      right: 0;
      bottom: 0;
      pointer-events: auto;
      background-color: rgba(0, 0, 0, 0.3);
      width: ${imgResizeBtnSize}px;
      height: ${imgResizeBtnSize}px;
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
      e.preventDefault()
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
    btnRemove.innerHTML = customDeleteBtnInnerHTML || btnsSvg.remove
    btnRemove.style.cssText = `
      position: absolute;
      right: 0;top:0;color:#fff;
      pointer-events: auto;
      background-color: rgba(0, 0, 0, 0.3);
      width: ${imgResizeBtnSize}px;
      height: ${imgResizeBtnSize}px;
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
    btnRemove.addEventListener('click', async e => {
      let stop = false
      if (typeof this.mindMap.opt.beforeDeleteNodeImg === 'function') {
        stop = await this.mindMap.opt.beforeDeleteNodeImg(this.node)
      }
      if (!stop) {
        this.mindMap.execCommand('SET_NODE_IMAGE', this.node, { url: null })
        this.mindMap.emit('delete_node_img_from_delete_btn', this.node)
      }
    })
    // 添加元素到页面
    const targetNode = this.mindMap.opt.customInnerElsAppendTo || document.body
    targetNode.appendChild(this.handleEl)
  }

  // 鼠标按钮按下事件
  onMousedown(e) {
    this.mindMap.emit('node_img_adjust_btn_mousedown', this.node)
    this.isMousedown = true
    this.mousedownDrawTransform = this.mindMap.draw.transform()
    // 隐藏节点实际图片
    this.hideNodeImage()
    this.mousedownOffset.x = e.clientX - this.rect.x2
    this.mousedownOffset.y = e.clientY - this.rect.y2
    // 将节点图片渲染到自定义元素上
    this.handleEl.style.backgroundImage = `url(${this.node.getData('image')})`
  }

  // 鼠标移动
  onMousemove(e) {
    if (!this.isMousedown) return
    e.preventDefault()
    const { scaleX, scaleY } = this.mousedownDrawTransform
    // 图片原始大小
    const { width: imageOriginWidth, height: imageOriginHeight } =
      this.node.getData('imageSize')
    let {
      minImgResizeWidth,
      minImgResizeHeight,
      maxImgResizeWidthInheritTheme,
      maxImgResizeWidth,
      maxImgResizeHeight
    } = this.mindMap.opt
    // 主题设置的最小图片宽高
    const minRatio = minImgResizeWidth / minImgResizeHeight
    const oRatio = imageOriginWidth / imageOriginHeight
    if (minRatio > oRatio) {
      // 如果最小值比例大于图片原始比例，那么要调整高度最小值
      minImgResizeHeight = minImgResizeWidth / oRatio
    } else {
      // 否则调整宽度最小值
      minImgResizeWidth = minImgResizeHeight * oRatio
    }
    // 主题设置的最大图片宽高
    let imgMaxWidth, imgMaxHeight
    if (maxImgResizeWidthInheritTheme) {
      imgMaxWidth = this.mindMap.getThemeConfig('imgMaxWidth')
      imgMaxHeight = this.mindMap.getThemeConfig('imgMaxHeight')
    } else {
      imgMaxWidth = maxImgResizeWidth
      imgMaxHeight = maxImgResizeHeight
    }
    imgMaxWidth = imgMaxWidth * scaleX
    imgMaxHeight = imgMaxHeight * scaleY
    // 计算当前拖拽位置对应的图片的实时大小
    let newWidth = Math.abs(e.clientX - this.rect.x - this.mousedownOffset.x)
    let newHeight = Math.abs(e.clientY - this.rect.y - this.mousedownOffset.y)
    // 限制最小值
    if (newWidth < minImgResizeWidth) newWidth = minImgResizeWidth
    if (newHeight < minImgResizeHeight) newHeight = minImgResizeHeight
    // 限制最大值
    if (newWidth > imgMaxWidth) newWidth = imgMaxWidth
    if (newHeight > imgMaxHeight) newHeight = imgMaxHeight
    const [actWidth, actHeight] = resizeImgSizeByOriginRatio(
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
    const { image, imageTitle } = this.node.getData()
    const { scaleX, scaleY } = this.mousedownDrawTransform
    const newWidth = this.currentImgWidth / scaleX
    const newHeight = this.currentImgHeight / scaleY
    if (
      Math.abs(newWidth - this.rect.width) > 1 ||
      Math.abs(newHeight - this.rect.height) > 1
    ) {
      this.mindMap.execCommand('SET_NODE_IMAGE', this.node, {
        url: image,
        title: imageTitle,
        width: newWidth,
        height: newHeight,
        custom: true // 代表自定义了图片大小
      })
      this.isAdjusted = true
    }
    this.isMousedown = false
    this.mousedownDrawTransform = null
    this.mousedownOffset.x = 0
    this.mousedownOffset.y = 0
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
