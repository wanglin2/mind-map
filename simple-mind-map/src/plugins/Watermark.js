import { Text, G } from '@svgdotjs/svg.js'
import { degToRad, camelCaseToHyphen } from '../utils'
import merge from 'deepmerge'

// 水印类
class Watermark {
  constructor(opt = {}) {
    this.mindMap = opt.mindMap
    this.lineSpacing = 0 // 水印行间距
    this.textSpacing = 0 // 行内水印间距
    this.angle = 0 // 旋转角度
    this.text = '' // 水印文字
    this.textStyle = {} // 水印文字样式
    this.watermarkDraw = this.mindMap.svg
      .group()
      .css({ 'pointer-events': 'none', 'user-select': 'none' })
    this.maxLong = Math.sqrt(
      Math.pow(this.mindMap.width, 2) + Math.pow(this.mindMap.height, 2)
    )
    this.updateWatermark(this.mindMap.opt.watermarkConfig || {})
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

  // 绘制水印
  // 非精确绘制，会绘制一些超出可视区域的水印
  draw() {
    this.watermarkDraw.clear()
    if (!this.hasWatermark()) {
      return
    }
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
    this.mindMap.opt.watermarkConfig = merge(this.mindMap.opt.watermarkConfig, config)
    this.handleConfig(config)
    this.draw()
  }
}

Watermark.instanceName = 'watermark'

export default Watermark