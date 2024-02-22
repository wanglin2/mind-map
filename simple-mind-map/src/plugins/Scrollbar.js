import { throttle } from '../utils/index'
import { CONSTANTS } from '../constants/constant'

// 滚动条插件
class Scrollbar {
  //  构造函数
  constructor(opt) {
    this.mindMap = opt.mindMap
    this.scrollbarWrapSize = {
      width: 0, // 水平滚动条的容器宽度
      height: 0 // 垂直滚动条的容器高度
    }
    // 思维导图实际高度
    this.chartHeight = 0
    this.chartWidth = 0
    this.reset()
    this.bindEvent()
  }

  // 复位数据
  reset() {
    // 当前拖拽的滚动条类型
    this.currentScrollType = ''
    this.isMousedown = false
    this.mousedownPos = {
      x: 0,
      y: 0
    }
    // 鼠标按下时，滚动条位置
    this.mousedownScrollbarPos = 0
  }

  // 绑定事件
  bindEvent() {
    this.onMousemove = this.onMousemove.bind(this)
    this.onMouseup = this.onMouseup.bind(this)
    this.updateScrollbar = this.updateScrollbar.bind(this)
    this.updateScrollbar = throttle(this.updateScrollbar, 16, this) // 加个节流
    this.mindMap.on('mousemove', this.onMousemove)
    this.mindMap.on('mouseup', this.onMouseup)
    this.mindMap.on('node_tree_render_end', this.updateScrollbar)
    this.mindMap.on('view_data_change', this.updateScrollbar)
    this.mindMap.on('resize', this.updateScrollbar)
  }

  // 解绑事件
  unBindEvent() {
    this.mindMap.off('mousemove', this.onMousemove)
    this.mindMap.off('mouseup', this.onMouseup)
    this.mindMap.off('node_tree_render_end', this.updateScrollbar)
    this.mindMap.off('view_data_change', this.updateScrollbar)
    this.mindMap.off('resize', this.updateScrollbar)
  }

  // 渲染后、数据改变需要更新滚动条
  updateScrollbar() {
    // 当前正在拖拽滚动条时不需要更新
    if (this.isMousedown) return
    const res = this.calculationScrollbar()
    this.emitEvent(res)
  }

  // 发送滚动条改变事件
  emitEvent(data) {
    this.mindMap.emit('scrollbar_change', data)
  }

  // 设置滚动条容器的大小，指滚动条容器的大小，对于水平滚动条，即宽度，对于垂直滚动条，即高度
  setScrollBarWrapSize(width, height) {
    this.scrollbarWrapSize.width = width
    this.scrollbarWrapSize.height = height
  }

  // 计算滚动条大小和位置
  calculationScrollbar() {
    const rect = this.mindMap.draw.rbox()
    // 减去画布距离浏览器窗口左上角的距离
    const elRect = this.mindMap.elRect
    rect.x -= elRect.left
    rect.y -= elRect.top

    // 垂直滚动条
    const canvasHeight = this.mindMap.height // 画布高度
    const paddingY = canvasHeight / 2 // 首尾允许超出的距离，默认为高度的一半
    const chartHeight = rect.height + paddingY * 2 // 思维导图高度
    this.chartHeight = chartHeight
    const chartTop = rect.y - paddingY // 思维导图顶部距画布顶部的距离
    const height = Math.min((canvasHeight / chartHeight) * 100, 100) // 滚动条高度 = 画布高度 / 思维导图高度
    let top = (-chartTop / chartHeight) * 100 // 滚动条距离 = 思维导图顶部距画布顶部的距离 / 思维导图高度
    // 判断是否到达边界
    if (top < 0) {
      top = 0
    }
    if (top > 100 - height) {
      top = 100 - height
    }

    // 水平滚动条
    const canvasWidth = this.mindMap.width
    const paddingX = canvasWidth / 2
    const chartWidth = rect.width + paddingX * 2
    this.chartWidth = chartWidth
    const chartLeft = rect.x - paddingX
    const width = Math.min((canvasWidth / chartWidth) * 100, 100)
    let left = (-chartLeft / chartWidth) * 100
    if (left < 0) {
      left = 0
    }
    if (left > 100 - width) {
      left = 100 - width
    }

    const res = {
      // 垂直滚动条
      vertical: {
        top,
        height
      },
      // 水平滚动条
      horizontal: {
        left,
        width
      }
    }

    return res
  }

  // 滚动条鼠标按下事件处理函数
  onMousedown(e, type) {
    e.preventDefault()
    e.stopPropagation()
    this.currentScrollType = type
    this.isMousedown = true
    this.mousedownPos = {
      x: e.clientX,
      y: e.clientY
    }
    // 保存滚动条当前的位置
    const styles = window.getComputedStyle(e.target)
    if (type === CONSTANTS.SCROLL_BAR_DIR.VERTICAL) {
      this.mousedownScrollbarPos = Number.parseFloat(styles.top)
    } else {
      this.mousedownScrollbarPos = Number.parseFloat(styles.left)
    }
  }

  // 鼠标移动事件处理函数
  onMousemove(e) {
    if (!this.isMousedown) {
      return
    }
    e.preventDefault()
    e.stopPropagation()
    if (this.currentScrollType === CONSTANTS.SCROLL_BAR_DIR.VERTICAL) {
      const oy = e.clientY - this.mousedownPos.y + this.mousedownScrollbarPos
      this.updateMindMapView(CONSTANTS.SCROLL_BAR_DIR.VERTICAL, oy)
    } else {
      const ox = e.clientX - this.mousedownPos.x + this.mousedownScrollbarPos
      this.updateMindMapView(CONSTANTS.SCROLL_BAR_DIR.HORIZONTAL, ox)
    }
  }

  // 鼠标松开事件处理函数
  onMouseup() {
    this.isMousedown = false
    this.reset()
  }

  // 更新视图
  updateMindMapView(type, offset) {
    const scrollbarData = this.calculationScrollbar()
    const t = this.mindMap.draw.transform()
    const drawRect = this.mindMap.draw.rbox()
    const rootRect = this.mindMap.renderer.root.group.rbox()
    const rootCenterOffset = this.mindMap.renderer.layout.getRootCenterOffset(
      rootRect.width,
      rootRect.height
    )
    if (type === CONSTANTS.SCROLL_BAR_DIR.VERTICAL) {
      // 滚动条新位置
      let oy = offset
      // 判断是否达到首尾
      if (oy <= 0) {
        oy = 0
      }
      const max =
        ((100 - scrollbarData.vertical.height) / 100) *
        this.scrollbarWrapSize.height
      if (oy >= max) {
        oy = max
      }
      // 转换成百分比
      const oyPercentage = (oy / this.scrollbarWrapSize.height) * 100
      // 转换成相对于图形高度的距离
      const oyPx = (-oyPercentage / 100) * this.chartHeight
      // 节点中心点到图形最上方的距离
      const yOffset = rootRect.y - drawRect.y
      // 内边距
      const paddingY = this.mindMap.height / 2
      // 图形新位置
      const chartTop =
        oyPx +
        yOffset -
        paddingY * t.scaleY +
        paddingY -
        rootCenterOffset.y * t.scaleY +
        ((this.mindMap.height - this.mindMap.initHeight) / 2) * t.scaleY // 画布宽高改变了，但是思维导图元素变换的中心点依旧是原有位置，所以需要加上中心点变化量
      this.mindMap.view.translateYTo(chartTop)
      this.emitEvent({
        horizontal: scrollbarData.horizontal,
        vertical: {
          top: oyPercentage,
          height: scrollbarData.vertical.height
        }
      })
    } else {
      // 滚动条新位置
      let ox = offset
      // 判断是否达到首尾
      if (ox <= 0) {
        ox = 0
      }
      const max =
        ((100 - scrollbarData.horizontal.width) / 100) *
        this.scrollbarWrapSize.width
      if (ox >= max) {
        ox = max
      }
      // 转换成百分比
      const oxPercentage = (ox / this.scrollbarWrapSize.width) * 100
      // 转换成相对于图形宽度的距离
      const oxPx = (-oxPercentage / 100) * this.chartWidth
      // 节点中心点到图形最左边的距离
      const xOffset = rootRect.x - drawRect.x
      // 内边距
      const paddingX = this.mindMap.width / 2
      // 图形新位置
      const chartLeft =
        oxPx +
        xOffset -
        paddingX * t.scaleX +
        paddingX -
        rootCenterOffset.x * t.scaleX +
        ((this.mindMap.width - this.mindMap.initWidth) / 2) * t.scaleX // 画布宽高改变了，但是思维导图元素变换的中心点依旧是原有位置，所以需要加上中心点变化量
      this.mindMap.view.translateXTo(chartLeft)
      this.emitEvent({
        vertical: scrollbarData.vertical,
        horizontal: {
          left: oxPercentage,
          width: scrollbarData.horizontal.width
        }
      })
    }
  }

  // 滚动条的点击事件
  onClick(e, type) {
    let offset = 0
    if (type === CONSTANTS.SCROLL_BAR_DIR.VERTICAL) {
      offset = e.clientY - e.currentTarget.getBoundingClientRect().top
    } else {
      offset = e.clientX - e.currentTarget.getBoundingClientRect().left
    }
    this.updateMindMapView(type, offset)
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

Scrollbar.instanceName = 'scrollbar'

export default Scrollbar
