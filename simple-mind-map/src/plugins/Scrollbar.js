import { throttle } from '../utils/index'

// 滚动条插件
class Scrollbar {
  //  构造函数
  constructor(opt) {
    this.mindMap = opt.mindMap
    this.scrollbarWrapSize = {
      width: 0, // 水平滚动条的容器宽度
      height: 0 // 垂直滚动条的容器高度
    }
    this.reset()
    this.bindEvent()
  }

  // 绑定事件
  bindEvent() {
    this.onMousemove = this.onMousemove.bind(this)
    this.onMouseup = this.onMouseup.bind(this)
    this.onNodeTreeRenderEnd = this.onNodeTreeRenderEnd.bind(this)
    this.onViewDataChange = throttle(this.onViewDataChange, 16, this) // 加个节流
    this.mindMap.on('mousemove', this.onMousemove)
    this.mindMap.on('mouseup', this.onMouseup)
    this.mindMap.on('node_tree_render_end', this.onNodeTreeRenderEnd)
    this.mindMap.on('view_data_change', this.onViewDataChange)
  }

  // 解绑事件
  unBindEvent() {
    this.mindMap.off('mousemove', this.onMousemove)
    this.mindMap.off('mouseup', this.onMouseup)
    this.mindMap.off('node_tree_render_end', this.onNodeTreeRenderEnd)
    this.mindMap.off('view_data_change', this.onViewDataChange)
  }

  // 每次渲染后需要更新滚动条
  onNodeTreeRenderEnd() {
    this.emitEvent()
  }

  // 思维导图视图数据改变需要更新滚动条
  onViewDataChange() {
    this.emitEvent()
  }

  // 发送滚动条改变事件
  emitEvent() {
    this.mindMap.emit('scrollbar_change')
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
    this.startViewPos = {
      x: 0,
      y: 0
    }
    // 思维导图实际高度
    this.chartHeight = 0
    this.chartWidth = 0
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
    rect.x2 -= elRect.left
    rect.y -= elRect.top
    rect.y2 -= elRect.top

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

  onMousedown(e, type) {
    e.preventDefault()
    this.currentScrollType = type
    this.isMousedown = true
    this.mousedownPos = {
      x: e.clientX,
      y: e.clientY
    }
    // 保存视图当前的偏移量
    let transformData = this.mindMap.view.getTransformData()
    this.startViewPos = {
      x: transformData.state.x,
      y: transformData.state.y
    }
  }

  onMousemove(e) {
    if (!this.isMousedown) {
      return
    }
    if (this.currentScrollType === 'vertical') {
      const oy = e.clientY - this.mousedownPos.y
      const oyPercentage = -oy / this.scrollbarWrapSize.height
      const oyPx = oyPercentage * this.chartHeight
      // 在视图最初偏移量上累加更新量
      this.mindMap.view.translateYTo(oyPx + this.startViewPos.y)
    } else {
      const ox = e.clientX - this.mousedownPos.x
      const oxPercentage = -ox / this.scrollbarWrapSize.width
      const oxPx = oxPercentage * this.chartWidth
      // 在视图最初偏移量上累加更新量
      this.mindMap.view.translateXTo(oxPx + this.startViewPos.x)
    }
  }

  onMouseup() {
    this.isMousedown = false
    this.reset()
  }

  // 插件被卸载前做的事情
  beforePluginDestroy() {
    this.unBindEvent()
  }
}

Scrollbar.instanceName = 'scrollbar'

export default Scrollbar
