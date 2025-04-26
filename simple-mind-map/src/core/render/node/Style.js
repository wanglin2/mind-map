import { checkIsNodeStyleDataKey } from '../../../utils/index'

const backgroundStyleProps = [
  'backgroundColor',
  'backgroundImage',
  'backgroundRepeat',
  'backgroundPosition',
  'backgroundSize'
]

export const shapeStyleProps = [
  'gradientStyle',
  'startColor',
  'endColor',
  'startDir',
  'endDir',
  'fillColor',
  'borderColor',
  'borderWidth',
  'borderDasharray'
]

//  样式类
class Style {
  //   设置背景样式
  static setBackgroundStyle(el, themeConfig) {
    if (!el) return
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
    // 箭头图标
    this._markerPath = null
    this._marker = null
    // 渐变背景
    this._gradient = null
  }

  //  合并样式
  merge(prop, root) {
    let themeConfig = this.ctx.mindMap.themeConfig
    let defaultConfig = null
    let useRoot = false
    if (root) {
      // 使用最外层样式
      useRoot = true
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
    } else {
      // 三级及以下节点
      defaultConfig = themeConfig.node
    }
    let value = ''
    // 优先使用节点本身的样式
    if (this.getSelfStyle(prop) !== undefined) {
      value = this.getSelfStyle(prop)
    } else if (defaultConfig[prop] !== undefined) {
      // 否则使用对应层级的样式
      value = defaultConfig[prop]
    } else {
      // 否则使用最外层样式
      value = themeConfig[prop]
    }
    if (!useRoot) {
      this.addToEffectiveStyles({
        [prop]: value
      })
    }
    return value
  }

  //  获取某个样式值
  getStyle(prop, root) {
    return this.merge(prop, root)
  }

  //  获取自身自定义样式
  getSelfStyle(prop) {
    return this.ctx.getData(prop)
  }

  // 更新当前节点生效的样式数据
  addToEffectiveStyles(styles) {
    // effectiveStyles目前只提供给格式刷插件使用，所以如果没有注册该插件，那么不需要保存该数据
    if (!this.ctx.mindMap.painter) return
    this.ctx.effectiveStyles = {
      ...this.ctx.effectiveStyles,
      ...styles
    }
  }

  //  矩形
  rect(node) {
    this.shape(node)
    node.radius(this.merge('borderRadius'))
  }

  // 形状
  shape(node) {
    const styles = {}
    shapeStyleProps.forEach(key => {
      styles[key] = this.merge(key)
    })
    if (styles.gradientStyle) {
      if (!this._gradient) {
        this._gradient = this.ctx.nodeDraw.gradient('linear')
      }
      this._gradient.update(add => {
        add.stop(0, styles.startColor)
        add.stop(1, styles.endColor)
      })
      this._gradient.from(...styles.startDir).to(...styles.endDir)
      node.fill(this._gradient)
    } else {
      node.fill({
        color: styles.fillColor
      })
    }
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
      color: styles.borderColor,
      width: styles.borderWidth,
      dasharray: styles.borderDasharray
    })
  }

  //  文字
  text(node) {
    const styles = {
      color: this.merge('color'),
      fontFamily: this.merge('fontFamily'),
      fontSize: this.merge('fontSize'),
      fontWeight: this.merge('fontWeight'),
      fontStyle: this.merge('fontStyle'),
      textDecoration: this.merge('textDecoration')
    }
    node
      .fill({
        color: styles.color
      })
      .css({
        'font-family': styles.fontFamily,
        'font-size': styles.fontSize + 'px',
        'font-weight': styles.fontWeight,
        'font-style': styles.fontStyle,
        'text-decoration': styles.textDecoration
      })
  }

  //  html文字节点
  domText(node, fontSizeScale = 1) {
    const styles = {
      color: this.merge('color'),
      fontFamily: this.merge('fontFamily'),
      fontSize: this.merge('fontSize'),
      fontWeight: this.merge('fontWeight'),
      fontStyle: this.merge('fontStyle'),
      textDecoration: this.merge('textDecoration'),
      textAlign: this.merge('textAlign')
    }
    node.style.color = styles.color
    node.style.textDecoration = styles.textDecoration
    node.style.fontFamily = styles.fontFamily
    node.style.fontSize = styles.fontSize * fontSizeScale + 'px'
    node.style.fontWeight = styles.fontWeight || 'normal'
    node.style.fontStyle = styles.fontStyle
    node.style.textAlign = styles.textAlign
  }

  //  标签文字
  tagText(node, style) {
    node
      .fill({
        color: '#fff'
      })
      .css({
        'font-size': style.fontSize + 'px'
      })
  }

  //  标签矩形
  tagRect(node, style) {
    node.fill({
      color: style.fill
    })
    if (style.radius) {
      node.radius(style.radius)
    }
  }

  //  内置图标
  iconNode(node, color) {
    node.attr({
      fill: color || this.merge('color')
    })
  }

  //  连线
  line(line, { width, color, dasharray } = {}, enableMarker, childNode) {
    const { customHandleLine } = this.ctx.mindMap.opt
    if (typeof customHandleLine === 'function') {
      customHandleLine(this.ctx, line, { width, color, dasharray })
    }
    line.stroke({ color, dasharray, width }).fill({ color: 'none' })
    // 可以显示箭头
    if (enableMarker) {
      const showMarker = this.merge('showLineMarker', true)
      const childNodeStyle = childNode.style
      // 显示箭头
      if (showMarker) {
        // 创建子节点箭头标记
        childNodeStyle._marker =
          childNodeStyle._marker || childNodeStyle.createMarker()
        // 设置样式
        childNodeStyle._markerPath.stroke({ color }).fill({ color })
        // 箭头位置可能会发生改变，所以需要先删除
        line.attr('marker-start', '')
        line.attr('marker-end', '')
        const dir = childNodeStyle.merge('lineMarkerDir')
        line.marker(dir, childNodeStyle._marker)
      } else if (childNodeStyle._marker) {
        // 不显示箭头，则删除该子节点的箭头标记
        line.attr('marker-start', '')
        line.attr('marker-end', '')
        childNodeStyle._marker.remove()
        childNodeStyle._marker = null
      }
    }
  }

  // 创建箭头
  createMarker() {
    return this.ctx.lineDraw.marker(20, 20, add => {
      add.ref(8, 5)
      add.size(20, 20)
      add.attr('markerUnits', 'userSpaceOnUse')
      add.attr('orient', 'auto-start-reverse')
      this._markerPath = add.path('M0,0 L2,5 L0,10 L10,5 Z')
    })
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
      node.attr({ 'font-size': fontSize + 'px', 'font-color': fontColor })
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

  // 获取自定义的样式
  getCustomStyle() {
    const customStyle = {}
    Object.keys(this.ctx.getData()).forEach(item => {
      if (checkIsNodeStyleDataKey(item)) {
        customStyle[item] = this.ctx.getData(item)
      }
    })
    return customStyle
  }

  // hover和激活节点
  hoverNode(node) {
    const hoverRectColor =
      this.merge('hoverRectColor') || this.ctx.mindMap.opt.hoverRectColor
    const hoverRectRadius = this.merge('hoverRectRadius')
    node.radius(hoverRectRadius).fill('none').stroke({
      color: hoverRectColor
    })
  }

  // 所属节点被删除时的操作
  onRemove() {
    if (this._marker) {
      this._marker.remove()
      this._marker = null
    }
    if (this._markerPath) {
      this._markerPath.remove()
      this._markerPath = null
    }
    if (this._gradient) {
      this._gradient.remove()
      this._gradient = null
    }
  }
}

Style.cacheStyle = null

export default Style
