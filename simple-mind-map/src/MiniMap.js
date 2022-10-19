// 小地图类
class MiniMap {
  /**
   * javascript comment
   * @Author: 王林25
   * @Date: 2022-10-10 14:00:45
   * @Desc: 构造函数
   */
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

  /**
   * javascript comment
   * @Author: 王林25
   * @Date: 2022-10-10 14:00:43
   * @Desc:  获取小地图相关数据
   */
  getMiniMap() {
    const svg = this.mindMap.svg
    const draw = this.mindMap.draw
    // 保存原始信息
    const origWidth = svg.width()
    const origHeight = svg.height()
    const origTransform = draw.transform()
    const elRect = this.mindMap.el.getBoundingClientRect()
    // 去除放大缩小的变换效果
    draw.scale(1 / origTransform.scaleX, 1 / origTransform.scaleY)
    // 获取变换后的位置尺寸信息，其实是getBoundingClientRect方法的包装方法
    const rect = draw.rbox()
    // 将svg设置为实际内容的宽高
    svg.size(rect.width, rect.height)
    // 把实际内容变换
    draw.translate(-rect.x + elRect.left, -rect.y + elRect.top)
    // 克隆一份数据
    const clone = svg.clone()
    // 恢复原先的大小和变换信息
    svg.size(origWidth, origHeight)
    draw.transform(origTransform)

    return {
      svg: clone, // 思维导图图形的整体svg元素，包括：svg（画布容器）、g（实际的思维导图组）
      svgHTML: clone.svg(), // svg字符串
      rect: {
        ...rect, // 思维导图图形未缩放时的位置尺寸等信息
        ratio: rect.width / rect.height // 思维导图图形的宽高比
      },
      origWidth, // 画布宽度
      origHeight, // 画布高度
      scaleX: origTransform.scaleX, // 思维导图图形的水平缩放值
      scaleY: origTransform.scaleY // 思维导图图形的垂直缩放值
    }
  }

  /**
   * javascript comment
   * @Author: 王林25
   * @Date: 2022-10-10 14:05:51
   * @Desc: 计算小地图的渲染数据
   * boxWidth：小地图容器的宽度
   * boxHeight：小地图容器的高度
   */
  calculationMiniMap(boxWidth, boxHeight) {
    let { svgHTML, rect, origWidth, origHeight, scaleX, scaleY } =
      this.getMiniMap()
    // 计算数据
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
      Math.max(0, (-_rectX / _rectWidth) * actWidth) + miniMapBoxLeft + 'px'
    viewBoxStyle.right =
      Math.max(0, ((_rectX2 - origWidth) / _rectWidth) * actWidth) +
      miniMapBoxLeft +
      'px'

    viewBoxStyle.top =
      Math.max(0, (-_rectY / _rectHeight) * actHeight) + miniMapBoxTop + 'px'
    viewBoxStyle.bottom =
      Math.max(0, ((_rectY2 - origHeight) / _rectHeight) * actHeight) +
      miniMapBoxTop +
      'px'
    return {
      svgHTML, // 小地图html
      viewBoxStyle, // 视图框的位置信息
      miniMapBoxScale, // 视图框的缩放值
      miniMapBoxLeft, // 视图框的left值
      miniMapBoxTop // 视图框的top值
    }
  }

  /**
   * javascript comment
   * @Author: 王林25
   * @Date: 2022-10-10 14:22:40
   * @Desc: 小地图鼠标按下事件
   */
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

  /**
   * javascript comment
   * @Author: 王林25
   * @Date: 2022-10-10 14:22:55
   * @Desc: 小地图鼠标移动事件
   */
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

  /**
   * javascript comment
   * @Author: 王林25
   * @Date: 2022-10-10 14:23:01
   * @Desc: 小地图鼠标松开事件
   */
  onMouseup() {
    this.isMousedown = false
  }
}

export default MiniMap
