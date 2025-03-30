import { walk, bfsWalk, throttle } from '../utils'
import { v4 as uuid } from 'uuid'
import {
  getAssociativeLineTargetIndex,
  computeCubicBezierPathPoints,
  cubicBezierPath,
  getNodePoint,
  computeNodePoints,
  getNodeLinePath
} from './associativeLine/associativeLineUtils'
import associativeLineControlsMethods from './associativeLine/associativeLineControls'
import associativeLineTextMethods from './associativeLine/associativeLineText'

const styleProps = [
  'associativeLineWidth',
  'associativeLineColor',
  'associativeLineActiveWidth',
  'associativeLineActiveColor',
  'associativeLineDasharray',
  'associativeLineTextColor',
  'associativeLineTextFontSize',
  'associativeLineTextLineHeight',
  'associativeLineTextFontFamily'
]

const ASSOCIATIVE_LINE_TEXT_EDIT_WRAP = 'associative-line-text-edit-warp'

// 关联线插件
class AssociativeLine {
  constructor(opt = {}) {
    this.mindMap = opt.mindMap
    this.associativeLineDraw = this.mindMap.associativeLineDraw
    // 本次不要重新渲染连线
    this.isNotRenderAllLines = false
    // 当前所有连接线
    this.lineList = []
    // 当前激活的连接线
    this.activeLine = null
    // 当前正在创建连接线
    this.isCreatingLine = false // 是否正在创建连接线中
    this.creatingStartNode = null // 起始节点
    this.creatingLine = null // 创建过程中的连接线
    this.overlapNode = null // 创建过程中的目标节点
    // 是否有节点正在被拖拽
    this.isNodeDragging = false
    // 控制点
    this.controlLine1 = null
    this.controlLine2 = null
    this.controlPoint1 = null
    this.controlPoint2 = null
    this.controlPointDiameter = 10
    this.isControlPointMousedown = false
    this.mousedownControlPointKey = ''
    this.controlPointMousemoveState = {
      pos: null,
      startPoint: null,
      endPoint: null,
      targetIndex: ''
    }
    // 节流一下，不然很卡
    this.checkOverlapNode = throttle(this.checkOverlapNode, 100, this)
    // 控制点相关方法
    Object.keys(associativeLineControlsMethods).forEach(item => {
      this[item] = associativeLineControlsMethods[item].bind(this)
    })
    // 关联线文字相关方法
    this.showTextEdit = false
    Object.keys(associativeLineTextMethods).forEach(item => {
      this[item] = associativeLineTextMethods[item].bind(this)
    })
    this.mindMap.addEditNodeClass(ASSOCIATIVE_LINE_TEXT_EDIT_WRAP)
    this.bindEvent()
  }

  // 监听事件
  bindEvent() {
    this.renderAllLines = this.renderAllLines.bind(this)
    this.onDrawClick = this.onDrawClick.bind(this)
    this.onNodeClick = this.onNodeClick.bind(this)
    this.removeLine = this.removeLine.bind(this)
    this.addLine = this.addLine.bind(this)
    this.onMousemove = this.onMousemove.bind(this)
    this.onNodeDragging = this.onNodeDragging.bind(this)
    this.onNodeDragend = this.onNodeDragend.bind(this)
    this.onControlPointMouseup = this.onControlPointMouseup.bind(this)
    this.onBeforeDestroy = this.onBeforeDestroy.bind(this)

    // 节点树渲染完毕后渲染连接线
    this.mindMap.on('node_tree_render_end', this.renderAllLines)
    // 状态改变后重新渲染连接线
    this.mindMap.on('data_change', this.renderAllLines)
    // 监听画布和节点点击事件，用于清除当前激活的连接线
    this.mindMap.on('draw_click', this.onDrawClick)
    this.mindMap.on('node_click', this.onNodeClick)
    this.mindMap.on('contextmenu', this.onDrawClick)
    // 注册删除快捷键
    this.mindMap.keyCommand.addShortcut('Del|Backspace', this.removeLine)
    // 注册添加连接线的命令
    this.mindMap.command.add('ADD_ASSOCIATIVE_LINE', this.addLine)
    // 监听鼠标移动事件
    this.mindMap.on('mousemove', this.onMousemove)
    // 节点拖拽事件
    this.mindMap.on('node_dragging', this.onNodeDragging)
    this.mindMap.on('node_dragend', this.onNodeDragend)
    // 拖拽控制点
    this.mindMap.on('mouseup', this.onControlPointMouseup)
    // 缩放事件
    this.mindMap.on('scale', this.onScale)
    // 实例销毁事件
    this.mindMap.on('beforeDestroy', this.onBeforeDestroy)
  }

  // 解绑事件
  unBindEvent() {
    this.mindMap.off('node_tree_render_end', this.renderAllLines)
    this.mindMap.off('data_change', this.renderAllLines)
    this.mindMap.off('draw_click', this.onDrawClick)
    this.mindMap.off('node_click', this.onNodeClick)
    this.mindMap.off('contextmenu', this.onDrawClick)
    this.mindMap.keyCommand.removeShortcut('Del|Backspace', this.removeLine)
    this.mindMap.command.remove('ADD_ASSOCIATIVE_LINE', this.addLine)
    this.mindMap.off('mousemove', this.onMousemove)
    this.mindMap.off('node_dragging', this.onNodeDragging)
    this.mindMap.off('node_dragend', this.onNodeDragend)
    this.mindMap.off('mouseup', this.onControlPointMouseup)
    this.mindMap.off('scale', this.onScale)
    this.mindMap.off('beforeDestroy', this.onBeforeDestroy)
  }

  // 获取关联线的样式配置
  // 优先级：关联线自定义样式、节点自定义样式、主题的节点层级样式、主题的最外层样式
  getStyleConfig(node, toNode) {
    let lineStyle = {}
    if (toNode) {
      const associativeLineStyle = node.getData('associativeLineStyle') || {}
      lineStyle = associativeLineStyle[toNode.getData('uid')] || {}
    }
    const res = {}
    styleProps.forEach(prop => {
      if (typeof lineStyle[prop] !== 'undefined') {
        res[prop] = lineStyle[prop]
      } else {
        res[prop] = node.getStyle(prop)
      }
    })
    return res
  }

  // 实例销毁时清除关联线文字编辑框
  onBeforeDestroy() {
    this.hideEditTextBox()
    this.removeTextEditEl()
  }

  // 画布点击事件
  onDrawClick() {
    // 取消创建关联线
    if (this.isCreatingLine) {
      this.cancelCreateLine()
    }
    // 取消激活关联线
    if (!this.isControlPointMousedown) {
      this.clearActiveLine()
      this.renderAllLines()
    }
  }

  // 节点点击事件
  onNodeClick(node) {
    if (this.isCreatingLine) {
      this.completeCreateLine(node)
    } else {
      this.clearActiveLine()
      this.renderAllLines()
    }
  }

  // 创建箭头
  createMarker(callback = () => {}) {
    return this.associativeLineDraw.marker(20, 20, add => {
      add.ref(12, 5)
      add.size(10, 10)
      add.attr('orient', 'auto-start-reverse')
      callback(add.path('M0,0 L2,5 L0,10 L10,5 Z'))
    })
  }

  // 判断关联线坐标是否变更，有变更则使用变化后的坐标，无则默认坐标
  updateAllLinesPos(node, toNode, associativeLinePoint) {
    associativeLinePoint = associativeLinePoint || {}
    let [startPoint, endPoint] = computeNodePoints(node, toNode)
    let nodeRange = 0
    let nodeDir = ''
    let toNodeRange = 0
    let toNodeDir = ''
    if (associativeLinePoint.startPoint) {
      nodeRange = associativeLinePoint.startPoint.range || 0
      nodeDir = associativeLinePoint.startPoint.dir || 'right'
      startPoint = getNodePoint(node, nodeDir, nodeRange)
    }
    if (associativeLinePoint.endPoint) {
      toNodeRange = associativeLinePoint.endPoint.range || 0
      toNodeDir = associativeLinePoint.endPoint.dir || 'right'
      endPoint = getNodePoint(toNode, toNodeDir, toNodeRange)
    }
    return [startPoint, endPoint]
  }

  // 渲染所有连线
  renderAllLines() {
    if (this.isNotRenderAllLines) {
      this.isNotRenderAllLines = false
      return
    }
    // 先移除
    this.removeAllLines()
    this.removeControls()
    this.clearActiveLine()
    let tree = this.mindMap.renderer.root
    if (!tree) return
    let idToNode = new Map()
    let nodeToIds = new Map()
    walk(
      tree,
      null,
      cur => {
        if (!cur) return
        let data = cur.getData()
        if (
          data.associativeLineTargets &&
          data.associativeLineTargets.length > 0
        ) {
          nodeToIds.set(cur, data.associativeLineTargets)
        }
        if (data.uid) {
          idToNode.set(data.uid, cur)
        }
      },
      () => {},
      true,
      0
    )
    nodeToIds.forEach((ids, node) => {
      ids.forEach((uid, index) => {
        let toNode = idToNode.get(uid)
        if (!node || !toNode) return
        const associativeLinePoint = (node.getData('associativeLinePoint') ||
          [])[index]
        // 切换结构和布局，都会更新坐标
        const [startPoint, endPoint] = this.updateAllLinesPos(
          node,
          toNode,
          associativeLinePoint
        )
        this.drawLine(startPoint, endPoint, node, toNode)
      })
    })
  }

  // 绘制连接线
  drawLine(startPoint, endPoint, node, toNode) {
    let {
      associativeLineWidth,
      associativeLineColor,
      associativeLineActiveWidth,
      associativeLineDasharray
    } = this.getStyleConfig(node, toNode)
    // 箭头
    let markerPath = null
    const marker = this.createMarker(p => {
      markerPath = p
    })
    markerPath
      .stroke({ color: associativeLineColor })
      .fill({ color: associativeLineColor })
    // 路径
    let { path: pathStr, controlPoints } = getNodeLinePath(
      startPoint,
      endPoint,
      node,
      toNode
    )
    // 虚线
    let path = this.associativeLineDraw.path()
    path
      .stroke({
        width: associativeLineWidth,
        color: associativeLineColor,
        dasharray: associativeLineDasharray || '6,4'
      })
      .fill({ color: 'none' })
    path.plot(pathStr)
    path.marker('end', marker)
    // 不可见的点击线
    let clickPath = this.associativeLineDraw.path()
    clickPath
      .stroke({ width: associativeLineActiveWidth, color: 'transparent' })
      .fill({ color: 'none' })
    clickPath.plot(pathStr)
    // 文字
    let text = this.createText({
      path,
      clickPath,
      markerPath,
      node,
      toNode,
      startPoint,
      endPoint,
      controlPoints
    })
    // 点击事件
    clickPath.click(e => {
      e.stopPropagation()
      this.setActiveLine({
        path,
        clickPath,
        markerPath,
        text,
        node,
        toNode,
        startPoint,
        endPoint,
        controlPoints
      })
    })
    // 双击进入关联线文本编辑状态
    clickPath.dblclick(() => {
      if (!this.activeLine) return
      this.showEditTextBox(text)
    })
    // 渲染关联线文字
    this.renderText(this.getText(node, toNode), path, text, node, toNode)
    this.lineList.push([path, clickPath, text, node, toNode])
  }

  // 更新当前激活连线的样式，一般在自定义了节点关联线的样式后调用
  // 直接调用node.setStyle方法更新样式会直接触发关联线更新，但是关联线的激活状态会丢失
  // 所以可以调用node.setData方法更新数据，然后再调用该方法更新样式，这样关联线激活状态不会丢失
  updateActiveLineStyle() {
    if (!this.activeLine) return
    this.isNotRenderAllLines = true
    const [path, clickPath, text, node, toNode, markerPath] = this.activeLine
    const {
      associativeLineWidth,
      associativeLineColor,
      associativeLineDasharray,
      associativeLineActiveWidth,
      associativeLineActiveColor,
      associativeLineTextColor,
      associativeLineTextFontFamily,
      associativeLineTextFontSize
    } = this.getStyleConfig(node, toNode)
    path
      .stroke({
        width: associativeLineWidth,
        color: associativeLineColor,
        dasharray: associativeLineDasharray || '6,4'
      })
      .fill({ color: 'none' })
    clickPath
      .stroke({
        width: associativeLineActiveWidth,
        color: associativeLineActiveColor
      })
      .fill({ color: 'none' })
    markerPath
      .stroke({ color: associativeLineColor })
      .fill({ color: associativeLineColor })
    text.find('text').forEach(textNode => {
      textNode
        .fill({
          color: associativeLineTextColor
        })
        .css({
          'font-family': associativeLineTextFontFamily,
          'font-size': associativeLineTextFontSize + 'px'
        })
    })
    if (this.controlLine1) {
      this.controlLine1.stroke({ color: associativeLineActiveColor })
    }
    if (this.controlLine2) {
      this.controlLine2.stroke({ color: associativeLineActiveColor })
    }
    if (this.controlPoint1) {
      this.controlPoint1.stroke({ color: associativeLineActiveColor })
    }
    if (this.controlPoint2) {
      this.controlPoint2.stroke({ color: associativeLineActiveColor })
    }
    this.updateTextPos(path, text)
  }

  // 激活某根关联线
  setActiveLine({
    path,
    clickPath,
    markerPath,
    text,
    node,
    toNode,
    startPoint,
    endPoint,
    controlPoints
  }) {
    let { associativeLineActiveColor } = this.getStyleConfig(node, toNode)
    // 如果当前存在激活节点，那么取消激活节点
    this.mindMap.execCommand('CLEAR_ACTIVE_NODE')
    // 否则清除当前的关联线的激活状态，如果有的话
    this.clearActiveLine()
    // 保存当前激活的关联线信息
    this.activeLine = [path, clickPath, text, node, toNode, markerPath]
    // 让不可见的点击线显示
    clickPath.stroke({ color: associativeLineActiveColor })
    // 如果没有输入过关联线文字，那么显示默认文字
    if (!this.getText(node, toNode)) {
      this.renderText(
        this.mindMap.opt.defaultAssociativeLineText,
        path,
        text,
        node,
        toNode
      )
    }
    // 渲染控制点和连线
    this.renderControls(
      startPoint,
      endPoint,
      controlPoints[0],
      controlPoints[1],
      node,
      toNode
    )
    this.mindMap.emit('associative_line_click', path, clickPath, node, toNode)
    this.front()
  }

  // 移除所有连接线
  removeAllLines() {
    this.lineList.forEach(line => {
      line[0].remove()
      line[1].remove()
      line[2].remove()
    })
    this.lineList = []
  }

  // 从当前激活节点开始创建连接线
  createLineFromActiveNode() {
    if (this.mindMap.renderer.activeNodeList.length <= 0) return
    let node = this.mindMap.renderer.activeNodeList[0]
    this.createLine(node)
  }

  // 创建连接线
  createLine(fromNode) {
    let {
      associativeLineWidth,
      associativeLineColor,
      associativeLineDasharray
    } = this.getStyleConfig(fromNode)
    if (this.isCreatingLine || !fromNode) return
    this.front()
    this.isCreatingLine = true
    this.creatingStartNode = fromNode
    this.creatingLine = this.associativeLineDraw.path()
    this.creatingLine
      .stroke({
        width: associativeLineWidth,
        color: associativeLineColor,
        dasharray: associativeLineDasharray || '6,4'
      })
      .fill({ color: 'none' })
    // 箭头
    let markerPath = null
    const marker = this.createMarker(p => {
      markerPath = p
    })
    markerPath
      .stroke({ color: associativeLineColor })
      .fill({ color: associativeLineColor })
    this.creatingLine.marker('end', marker)
  }

  // 取消创建关联线
  cancelCreateLine() {
    this.isCreatingLine = false
    this.creatingStartNode = null
    this.creatingLine.remove()
    this.creatingLine = null
    this.overlapNode = null
    this.back()
  }

  // 鼠标移动事件
  onMousemove(e) {
    this.onControlPointMousemove(e)
    this.updateCreatingLine(e)
  }

  // 更新创建过程中的连接线
  updateCreatingLine(e) {
    if (!this.isCreatingLine) return
    let { x, y } = this.getTransformedEventPos(e)
    let startPoint = getNodePoint(this.creatingStartNode)
    let offsetX = x > startPoint.x ? -10 : 10
    let pathStr = cubicBezierPath(startPoint.x, startPoint.y, x + offsetX, y)
    this.creatingLine.plot(pathStr)
    this.checkOverlapNode(x, y)
  }

  // 获取转换后的鼠标事件对象的坐标
  getTransformedEventPos(e) {
    let { x, y } = this.mindMap.toPos(e.clientX, e.clientY)
    let { scaleX, scaleY, translateX, translateY } =
      this.mindMap.draw.transform()
    return {
      x: (x - translateX) / scaleX,
      y: (y - translateY) / scaleY
    }
  }

  // 计算节点偏移位置
  getNodePos(node) {
    const { scaleX, scaleY, translateX, translateY } =
      this.mindMap.draw.transform()
    const { left, top, width, height } = node
    let translateLeft = left * scaleX + translateX
    let translateTop = top * scaleY + translateY
    return {
      left,
      top,
      translateLeft,
      translateTop,
      width,
      height
    }
  }

  // 检测当前移动到的目标节点
  checkOverlapNode(x, y) {
    this.overlapNode = null
    bfsWalk(this.mindMap.renderer.root, node => {
      if (node.getData('isActive')) {
        this.mindMap.execCommand('SET_NODE_ACTIVE', node, false)
      }
      if (node.uid === this.creatingStartNode.uid || this.overlapNode) {
        return
      }
      let { left, top, width, height } = node
      let right = left + width
      let bottom = top + height
      if (x >= left && x <= right && y >= top && y <= bottom) {
        this.overlapNode = node
      }
    })
    if (this.overlapNode && !this.overlapNode.getData('isActive')) {
      this.mindMap.execCommand('SET_NODE_ACTIVE', this.overlapNode, true)
    }
  }

  // 完成创建连接线
  completeCreateLine(node) {
    if (this.creatingStartNode.uid === node.uid) return
    const { beforeAssociativeLineConnection } = this.mindMap.opt
    let stop = false
    if (typeof beforeAssociativeLineConnection === 'function') {
      stop = beforeAssociativeLineConnection(node)
    }
    if (stop) return
    this.addLine(this.creatingStartNode, node)
    if (this.overlapNode && this.overlapNode.getData('isActive')) {
      this.mindMap.execCommand('SET_NODE_ACTIVE', this.overlapNode, false)
    }
    this.cancelCreateLine()
  }

  // 添加连接线
  addLine(fromNode, toNode) {
    if (!fromNode || !toNode) return
    // 目标节点如果没有id，则生成一个id
    let uid = toNode.getData('uid')
    if (!uid) {
      uid = uuid()
      this.mindMap.execCommand('SET_NODE_DATA', toNode, {
        uid
      })
    }
    // 将目标节点id保存起来
    let list = fromNode.getData('associativeLineTargets') || []
    // 连线节点是否存在相同的id,存在则阻止添加关联线
    const sameLine = list.some(item => item === uid)
    if (sameLine) {
      return
    }
    list.push(uid)
    // 保存控制点
    let [startPoint, endPoint] = computeNodePoints(fromNode, toNode)
    let controlPoints = computeCubicBezierPathPoints(
      startPoint.x,
      startPoint.y,
      endPoint.x,
      endPoint.y
    )
    // 检查是否存在固定位置的配置
    const { associativeLineInitPointsPosition } = this.mindMap.opt
    if (associativeLineInitPointsPosition) {
      const { from, to } = associativeLineInitPointsPosition
      if (from) {
        startPoint.dir = from
      }
      if (to) {
        endPoint.dir = to
      }
    }
    let offsetList =
      fromNode.getData('associativeLineTargetControlOffsets') || []
    // 保存的实际是控制点和端点的差值，否则当节点位置改变了，控制点还是原来的位置，连线就不对了
    offsetList[list.length - 1] = [
      {
        x: controlPoints[0].x - startPoint.x,
        y: controlPoints[0].y - startPoint.y
      },
      {
        x: controlPoints[1].x - endPoint.x,
        y: controlPoints[1].y - endPoint.y
      }
    ]
    let associativeLinePoint = fromNode.getData('associativeLinePoint') || []
    // 记录关联的起始|结束坐标
    associativeLinePoint[list.length - 1] = { startPoint, endPoint }
    this.mindMap.execCommand('SET_NODE_DATA', fromNode, {
      associativeLineTargets: list,
      associativeLineTargetControlOffsets: offsetList,
      associativeLinePoint
    })
  }

  // 删除连接线
  removeLine() {
    if (!this.activeLine) return
    let [, , , node, toNode] = this.activeLine
    this.removeControls()
    let {
      associativeLineTargets,
      associativeLinePoint,
      associativeLineTargetControlOffsets,
      associativeLineText,
      associativeLineStyle
    } = node.getData()
    associativeLinePoint = associativeLinePoint || []
    let targetIndex = getAssociativeLineTargetIndex(node, toNode)
    // 更新关联线文本数据
    let newAssociativeLineText = {}
    if (associativeLineText) {
      Object.keys(associativeLineText).forEach(item => {
        if (item !== toNode.getData('uid')) {
          newAssociativeLineText[item] = associativeLineText[item]
        }
      })
    }
    // 更新关联线样式数据
    let newAssociativeLineStyle = {}
    if (associativeLineStyle) {
      Object.keys(associativeLineStyle).forEach(item => {
        if (item !== toNode.getData('uid')) {
          newAssociativeLineStyle[item] = associativeLineStyle[item]
        }
      })
    }
    this.mindMap.execCommand('SET_NODE_DATA', node, {
      // 目标
      associativeLineTargets: associativeLineTargets.filter((_, index) => {
        return index !== targetIndex
      }),
      // 连接线坐标
      associativeLinePoint: associativeLinePoint.filter((_, index) => {
        return index !== targetIndex
      }),
      // 偏移量
      associativeLineTargetControlOffsets: associativeLineTargetControlOffsets
        ? associativeLineTargetControlOffsets.filter((_, index) => {
            return index !== targetIndex
          })
        : [],
      // 文本
      associativeLineText: newAssociativeLineText,
      // 样式
      associativeLineStyle: newAssociativeLineStyle
    })
  }

  // 清除激活的线
  clearActiveLine() {
    if (this.activeLine) {
      let [, clickPath, text, node, toNode] = this.activeLine
      clickPath.stroke({
        color: 'transparent'
      })
      // 隐藏关联线文本编辑框
      this.hideEditTextBox()
      // 如果当前关联线没有文字，则清空文字节点
      if (!this.getText(node, toNode)) {
        text.clear()
      }
      this.activeLine = null
      this.removeControls()
      this.back()
      this.mindMap.emit('associative_line_deactivate')
    }
  }

  // 处理节点正在拖拽事件
  onNodeDragging() {
    if (this.isNodeDragging) return
    this.isNodeDragging = true
    this.lineList.forEach(line => {
      line[0].hide()
      line[1].hide()
      line[2].hide()
    })
    this.hideControls()
  }

  // 处理节点拖拽完成事件
  onNodeDragend() {
    if (!this.isNodeDragging) return
    this.lineList.forEach(line => {
      line[0].show()
      line[1].show()
      line[2].show()
    })
    this.showControls()
    this.isNodeDragging = false
  }

  // 关联线顶层显示
  front() {
    if (this.mindMap.opt.associativeLineIsAlwaysAboveNode) return
    this.associativeLineDraw.front()
  }

  // 关联线回到原有层级
  back() {
    if (this.mindMap.opt.associativeLineIsAlwaysAboveNode) return
    this.associativeLineDraw.back() // 最底层
    this.associativeLineDraw.forward() // 连线层上面
  }

  // 插件被移除前做的事情
  beforePluginRemove() {
    this.mindMap.deleteEditNodeClass(ASSOCIATIVE_LINE_TEXT_EDIT_WRAP)
    this.unBindEvent()
  }

  // 插件被卸载前做的事情
  beforePluginDestroy() {
    this.mindMap.deleteEditNodeClass(ASSOCIATIVE_LINE_TEXT_EDIT_WRAP)
    this.unBindEvent()
  }
}

AssociativeLine.instanceName = 'associativeLine'

export default AssociativeLine
