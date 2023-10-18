import {
  isWhite,
  isTransparent,
  getVisibleColorFromTheme,
  readBlob
} from '../utils/index'

// 小地图插件
class MiniMap {
  //  构造函数
  constructor(opt) {
    this.mindMap = opt.mindMap
    this.isMousedown = false
    this.mousedownPos = {
      x: 0,
      y: 0
    }
    this.startViewPos = {
      x: 0,
      y: 0
    }
  }

  //  计算小地图的渲染数据
  /**
   * boxWidth：小地图容器的宽度
   * boxHeight：小地图容器的高度
   */
  calculationMiniMap(boxWidth, boxHeight) {
    let { svg, rect, origWidth, origHeight, scaleX, scaleY } =
      this.mindMap.getSvgData({
        ignoreWatermark: true
      })
    // 计算数据
    const elRect = this.mindMap.elRect
    rect.x -= elRect.left
    rect.x2 -= elRect.left
    rect.y -= elRect.top
    rect.y2 -= elRect.top
    let boxRatio = boxWidth / boxHeight
    let actWidth = 0
    let actHeight = 0
    if (boxRatio > rect.ratio) {
      // 高度以box为准，缩放宽度
      actHeight = boxHeight
      actWidth = rect.ratio * actHeight
    } else {
      // 宽度以box为准，缩放高度
      actWidth = boxWidth
      actHeight = actWidth / rect.ratio
    }
    // svg图形的缩放及位置
    let miniMapBoxScale = actWidth / rect.width
    let miniMapBoxLeft = (boxWidth - actWidth) / 2
    let miniMapBoxTop = (boxHeight - actHeight) / 2
    // 视口框大小及位置
    let _rectX = rect.x - (rect.width * scaleX - rect.width) / 2
    let _rectX2 = rect.x2 + (rect.width * scaleX - rect.width) / 2
    let _rectY = rect.y - (rect.height * scaleY - rect.height) / 2
    let _rectY2 = rect.y2 + (rect.height * scaleY - rect.height) / 2
    let _rectWidth = rect.width * scaleX
    let _rectHeight = rect.height * scaleY
    let viewBoxStyle = {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0
    }
    viewBoxStyle.left =
      Math.max(0, (-_rectX / _rectWidth) * actWidth) + miniMapBoxLeft
    viewBoxStyle.right =
      Math.max(0, ((_rectX2 - origWidth) / _rectWidth) * actWidth) +
      miniMapBoxLeft

    viewBoxStyle.top =
      Math.max(0, (-_rectY / _rectHeight) * actHeight) + miniMapBoxTop
    viewBoxStyle.bottom =
      Math.max(0, ((_rectY2 - origHeight) / _rectHeight) * actHeight) +
      miniMapBoxTop

    if (viewBoxStyle.top > miniMapBoxTop + actHeight) {
      viewBoxStyle.top = miniMapBoxTop + actHeight
    }
    if (viewBoxStyle.left > miniMapBoxLeft + actWidth) {
      viewBoxStyle.left = miniMapBoxLeft + actWidth
    }

    Object.keys(viewBoxStyle).forEach(key => {
      viewBoxStyle[key] = viewBoxStyle[key] + 'px'
    })
    this.removeNodeContent(svg)
    const svgStr = svg.svg()

    return {
      getImgUrl: async callback => {
        const blob = new Blob([svgStr], {
          type: 'image/svg+xml'
        })
        const res = await readBlob(blob)
        callback(res)
      },
      svgHTML: svgStr, // 小地图html
      viewBoxStyle, // 视图框的位置信息
      miniMapBoxScale, // 视图框的缩放值
      miniMapBoxLeft, // 视图框的left值
      miniMapBoxTop // 视图框的top值
    }
  }

  // 移除节点的内容
  removeNodeContent(svg) {
    if (svg.hasClass('smm-node')) {
      let shape = svg.findOne('.smm-node-shape')
      let fill = shape.attr('fill')
      if (isWhite(fill) || isTransparent(fill)) {
        shape.attr('fill', getVisibleColorFromTheme(this.mindMap.themeConfig))
      }
      svg.clear()
      svg.add(shape)
      return
    }
    let children = svg.children()
    if (children && children.length > 0) {
      children.forEach(node => {
        this.removeNodeContent(node)
      })
    }
  }

  //  小地图鼠标按下事件
  onMousedown(e) {
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

  //  小地图鼠标移动事件
  onMousemove(e, sensitivityNum = 5) {
    if (!this.isMousedown) {
      return
    }
    let ox = e.clientX - this.mousedownPos.x
    let oy = e.clientY - this.mousedownPos.y
    // 在视图最初偏移量上累加更新量
    this.mindMap.view.translateXTo(ox * sensitivityNum + this.startViewPos.x)
    this.mindMap.view.translateYTo(oy * sensitivityNum + this.startViewPos.y)
  }

  //  小地图鼠标松开事件
  onMouseup() {
    this.isMousedown = false
  }
}

MiniMap.instanceName = 'miniMap'

export default MiniMap
