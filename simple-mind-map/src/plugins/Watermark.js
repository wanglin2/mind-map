import { Text, G } from '@svgdotjs/svg.js'
import { degToRad, camelCaseToHyphen } from '../utils'
import merge from 'deepmerge'

// 水印插件
class Watermark {
  constructor(opt = {}) {
    this.mindMap = opt.mindMap
    this.lineSpacing = 0 // 水印行间距
    this.textSpacing = 0 // 行内水印间距
    this.angle = 0 // 旋转角度
    this.text = '' // 水印文字
    this.textStyle = {} // 水印文字样式
    this.watermarkDraw = null // 容器
    this.isInExport = false // 是否是在导出过程中
    this.maxLong = this.getMaxLong()
    this.updateWatermark(this.mindMap.opt.watermarkConfig || {})
    this.bindEvent()
  }

  getMaxLong() {
    return Math.sqrt(
      Math.pow(this.mindMap.width, 2) + Math.pow(this.mindMap.height, 2)
    )
  }

  bindEvent() {
    this.onResize = this.onResize.bind(this)
    this.mindMap.on('resize', this.onResize)
  }

  unBindEvent() {
    this.mindMap.off('resize', this.onResize)
  }

  onResize() {
    this.maxLong = this.getMaxLong()
    this.draw()
  }

  // 创建水印容器
  createContainer() {
    if (this.watermarkDraw) return
    this.watermarkDraw = new G()
      .css({ 'pointer-events': 'none', 'user-select': 'none' })
      .addClass('smm-water-mark-container')
    this.updateLayer()
  }

  // 更新水印容器层级
  updateLayer() {
    if (!this.watermarkDraw) return
    const { belowNode } = this.mindMap.opt.watermarkConfig
    if (belowNode) {
      this.watermarkDraw.insertBefore(this.mindMap.draw)
    } else {
      this.mindMap.svg.add(this.watermarkDraw)
    }
  }

  // 删除水印容器
  removeContainer() {
    if (!this.watermarkDraw) {
      return
    }
    this.watermarkDraw.remove()
    this.watermarkDraw = null
  }

  // 获取是否存在水印
  hasWatermark() {
    return !!this.text.trim()
  }

  // 处理水印配置
  handleConfig({ text, lineSpacing, textSpacing, angle, textStyle }) {
    this.text = text === undefined ? '' : String(text).trim()
    this.lineSpacing =
      typeof lineSpacing === 'number' && lineSpacing > 0 ? lineSpacing : 100
    this.textSpacing =
      typeof textSpacing === 'number' && textSpacing > 0 ? textSpacing : 100
    this.angle =
      typeof angle === 'number' && angle >= 0 && angle <= 90 ? angle : 30
    this.textStyle = Object.assign(this.textStyle, textStyle || {})
  }

  // 清除水印
  clear() {
    if (this.watermarkDraw) this.watermarkDraw.clear()
  }

  // 绘制水印
  // 非精确绘制，会绘制一些超出可视区域的水印
  draw() {
    this.clear()
    // 如果是仅导出需要水印，那么非导出中不渲染
    const { onlyExport } = this.mindMap.opt.watermarkConfig
    if (onlyExport && !this.isInExport) return
    // 如果没有水印数据，那么水印容器也删除掉
    if (!this.hasWatermark()) {
      this.removeContainer()
      return
    }
    this.createContainer()
    let x = 0
    while (x < this.mindMap.width) {
      this.drawText(x)
      x += this.lineSpacing / Math.sin(degToRad(this.angle))
    }

    let yOffset =
      this.lineSpacing / Math.cos(degToRad(this.angle)) || this.lineSpacing
    let y = yOffset
    while (y < this.mindMap.height) {
      this.drawText(0, y)
      y += yOffset
    }
  }

  // 绘制文字
  drawText(x, y) {
    let long = Math.min(
      this.maxLong,
      (this.mindMap.width - x) / Math.cos(degToRad(this.angle))
    )
    let g = new G()
    let bbox = null
    let bboxWidth = 0
    let textHeight = -1
    while (bboxWidth < long) {
      let text = new Text().text(this.text)
      g.add(text)
      text.transform({
        translateX: bboxWidth
      })
      this.setTextStyle(text)
      bbox = g.bbox()
      if (textHeight === -1) {
        textHeight = bbox.height
      }
      bboxWidth = bbox.width + this.textSpacing
    }
    let params = {
      rotate: this.angle,
      origin: 'top left',
      translateX: x,
      translateY: textHeight
    }
    if (y !== undefined) {
      params.translateY = y + textHeight
    }
    g.transform(params)
    this.watermarkDraw.add(g)
  }

  // 给文字设置样式
  setTextStyle(text) {
    Object.keys(this.textStyle).forEach(item => {
      let value = this.textStyle[item]
      if (item === 'color') {
        text.fill(value)
      } else {
        text.css(camelCaseToHyphen(item), value)
      }
    })
  }

  // 更新水印
  updateWatermark(config) {
    this.mindMap.opt.watermarkConfig = merge(
      this.mindMap.opt.watermarkConfig,
      config
    )
    this.updateLayer()
    this.handleConfig(config)
    this.draw()
  }

  // 插件被移除前做的事情
  beforePluginRemove() {
    this.unBindEvent()
    this.removeContainer()
  }

  // 插件被卸载前做的事情
  beforePluginDestroy() {
    this.unBindEvent()
    this.removeContainer()
  }
}

Watermark.instanceName = 'watermark'

export default Watermark
