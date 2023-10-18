import {
  checkIsNodeStyleDataKey,
  generateColorByContent
} from '../../../utils/index'

const rootProp = ['paddingX', 'paddingY']
const backgroundStyleProps = [
  'backgroundColor',
  'backgroundImage',
  'backgroundRepeat',
  'backgroundPosition',
  'backgroundSize'
]

//  样式类
class Style {
  //   设置背景样式
  static setBackgroundStyle(el, themeConfig) {
    // 缓存容器元素原本的样式
    if (!Style.cacheStyle) {
      Style.cacheStyle = {}
      let style = window.getComputedStyle(el)
      backgroundStyleProps.forEach(prop => {
        Style.cacheStyle[prop] = style[prop]
      })
    }
    // 设置新样式
    let {
      backgroundColor,
      backgroundImage,
      backgroundRepeat,
      backgroundPosition,
      backgroundSize
    } = themeConfig
    el.style.backgroundColor = backgroundColor
    if (backgroundImage && backgroundImage !== 'none') {
      el.style.backgroundImage = `url(${backgroundImage})`
      el.style.backgroundRepeat = backgroundRepeat
      el.style.backgroundPosition = backgroundPosition
      el.style.backgroundSize = backgroundSize
    } else {
      el.style.backgroundImage = 'none'
    }
  }

  // 移除背景样式
  static removeBackgroundStyle(el) {
    if (!Style.cacheStyle) return
    backgroundStyleProps.forEach(prop => {
      el.style[prop] = Style.cacheStyle[prop]
    })
    Style.cacheStyle = null
  }

  //  构造函数
  constructor(ctx) {
    this.ctx = ctx
  }

  //  合并样式
  merge(prop, root) {
    let themeConfig = this.ctx.mindMap.themeConfig
    // 三级及以下节点
    let defaultConfig = themeConfig.node
    if (root || rootProp.includes(prop)) {
      // 直接使用最外层样式
      defaultConfig = themeConfig
    } else if (this.ctx.isGeneralization) {
      // 概要节点
      defaultConfig = themeConfig.generalization
    } else if (this.ctx.layerIndex === 0) {
      // 根节点
      defaultConfig = themeConfig.root
    } else if (this.ctx.layerIndex === 1) {
      // 二级节点
      defaultConfig = themeConfig.second
    }
    // 优先使用节点本身的样式
    return this.getSelfStyle(prop) !== undefined
      ? this.getSelfStyle(prop)
      : defaultConfig[prop]
  }

  //  获取某个样式值
  getStyle(prop, root) {
    return this.merge(prop, root)
  }

  //  获取自身自定义样式
  getSelfStyle(prop) {
    return this.ctx.getData(prop)
  }

  //  矩形
  rect(node) {
    this.shape(node)
    node.radius(this.merge('borderRadius'))
  }

  //   矩形外的其他形状
  shape(node) {
    node.fill({
      color: this.merge('fillColor')
    })
    // 节点使用横线样式，不需要渲染非激活状态的边框样式
    // if (
    //   !this.ctx.isRoot &&
    //   !this.ctx.isGeneralization &&
    //   this.ctx.mindMap.themeConfig.nodeUseLineStyle &&
    //   !this.ctx.getData('isActive')
    // ) {
    //   return
    // }
    node.stroke({
      color: this.merge('borderColor'),
      width: this.merge('borderWidth'),
      dasharray: this.merge('borderDasharray')
    })
  }

  //  文字
  text(node) {
    node
      .fill({
        color: this.merge('color')
      })
      .css({
        'font-family': this.merge('fontFamily'),
        'font-size': this.merge('fontSize'),
        'font-weight': this.merge('fontWeight'),
        'font-style': this.merge('fontStyle'),
        'text-decoration': this.merge('textDecoration')
      })
  }

  // 生成内联样式
  createStyleText() {
    return `
      color: ${this.merge('color')};
      font-family: ${this.merge('fontFamily')};
      font-size: ${this.merge('fontSize') + 'px'};
      font-weight: ${this.merge('fontWeight')};
      font-style: ${this.merge('fontStyle')};
      text-decoration: ${this.merge('textDecoration')}
    `
  }

  // 获取文本样式
  getTextFontStyle() {
    return {
      italic: this.merge('fontStyle') === 'italic',
      bold: this.merge('fontWeight'),
      fontSize: this.merge('fontSize'),
      fontFamily: this.merge('fontFamily')
    }
  }

  //  html文字节点
  domText(node, fontSizeScale = 1, isMultiLine) {
    node.style.fontFamily = this.merge('fontFamily')
    node.style.fontSize = this.merge('fontSize') * fontSizeScale + 'px'
    node.style.fontWeight = this.merge('fontWeight') || 'normal'
    node.style.lineHeight = !isMultiLine ? 'normal' : this.merge('lineHeight')
    node.style.fontStyle = this.merge('fontStyle')
  }

  //  标签文字
  tagText(node) {
    node
      .fill({
        color: '#fff'
      })
      .css({
        'font-size': '12px'
      })
  }

  //  标签矩形
  tagRect(node, text, color) {
    node.fill({
      color: color || generateColorByContent(text.node.textContent)
    })
  }

  //  内置图标
  iconNode(node) {
    node.attr({
      fill: this.merge('color')
    })
  }

  //  连线
  line(node, { width, color, dasharray } = {}) {
    node.stroke({ width, color, dasharray }).fill({ color: 'none' })
  }

  //  概要连线
  generalizationLine(node) {
    node
      .stroke({
        width: this.merge('generalizationLineWidth', true),
        color: this.merge('generalizationLineColor', true)
      })
      .fill({ color: 'none' })
  }

  //  展开收起按钮
  iconBtn(node, node2, fillNode) {
    let { color, fill, fontSize, fontColor } = this.ctx.mindMap.opt
      .expandBtnStyle || {
      color: '#808080',
      fill: '#fff',
      fontSize: 12,
      strokeColor: '#333333',
      fontColor: '#333333'
    }
    node.fill({ color: color })
    node2.fill({ color: color })
    fillNode.fill({ color: fill })
    if (this.ctx.mindMap.opt.isShowExpandNum) {
      node.attr({ 'font-size': fontSize, 'font-color': fontColor })
    }
  }

  // 是否设置了自定义的样式
  hasCustomStyle() {
    let res = false
    Object.keys(this.ctx.getData()).forEach(item => {
      if (checkIsNodeStyleDataKey(item)) {
        res = true
      }
    })
    return res
  }

  // hover和激活节点
  hoverNode(node) {
    const { hoverRectColor } = this.ctx.mindMap.opt
    node.radius(5).fill('none').stroke({
      color: hoverRectColor
    })
  }
}

Style.cacheStyle = null

export default Style
