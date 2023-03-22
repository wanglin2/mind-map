import { walk, bfsWalk, throttle } from './utils/'
import { v4 as uuid } from 'uuid'
import {
  getAssociativeLineTargetIndex,
  computeCubicBezierPathPoints,
  joinCubicBezierPath,
  cubicBezierPath,
  getNodePoint,
  computeNodePoints,
  getNodeLinePath
} from './utils/associativeLineUtils'

// 关联线类
class AssociativeLine {
  constructor(opt = {}) {
    this.mindMap = opt.mindMap
    this.draw = this.mindMap.draw
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
    // 箭头图标
    this.markerPath = null
    this.marker = this.createMarker()
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
    this.bindEvent()
  }

  // 监听事件
  bindEvent() {
    // 节点树渲染完毕后渲染连接线
    this.renderAllLines = this.renderAllLines.bind(this)
    this.mindMap.on('node_tree_render_end', this.renderAllLines)
    // 状态改变后重新渲染连接线
    this.mindMap.on('data_change', this.renderAllLines)
    // 监听画布和节点点击事件，用于清除当前激活的连接线
    this.mindMap.on('draw_click', () => {
      if (this.isControlPointMousedown) {
        return
      }
      this.clearActiveLine()
    })
    this.mindMap.on('node_click', node => {
      if (this.isCreatingLine) {
        this.completeCreateLine(node)
      } else {
        this.clearActiveLine()
      }
    })
    // 注册删除快捷键
    this.mindMap.keyCommand.addShortcut(
      'Del|Backspace',
      this.removeLine.bind(this)
    )
    // 注册添加连接线的命令
    this.mindMap.command.add('ADD_ASSOCIATIVE_LINE', this.addLine.bind(this))
    // 监听鼠标移动事件
    this.mindMap.on('mousemove', this.onMousemove.bind(this))
    // 节点拖拽事件
    this.mindMap.on('node_dragging', this.onNodeDragging.bind(this))
    this.mindMap.on('node_dragend', this.onNodeDragend.bind(this))
    // 拖拽控制点
    window.addEventListener('mousemove', e => {
      this.onControlPointMousemove(e)
    })
    window.addEventListener('mouseup', e => {
      this.onControlPointMouseup(e)
    })
  }

  // 创建箭头
  createMarker() {
    return this.draw.marker(20, 20, add => {
      add.ref(2, 5)
      add.size(10, 10)
      add.attr('orient', 'auto-start-reverse')
      this.markerPath = add.path('M0,0 L2,5 L0,10 L10,5 Z')
    })
  }

  // 渲染所有连线
  renderAllLines() {
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
        let data = cur.nodeData.data
        if (
          data.associativeLineTargets &&
          data.associativeLineTargets.length > 0
        ) {
          nodeToIds.set(cur, data.associativeLineTargets)
        }
        if (data.id) {
          idToNode.set(data.id, cur)
        }
      },
      () => {},
      true,
      0
    )
    nodeToIds.forEach((ids, node) => {
      ids.forEach(id => {
        let toNode = idToNode.get(id)
        if (!node || !toNode) return
        let [startPoint, endPoint] = computeNodePoints(node, toNode)
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
      associativeLineActiveColor
    } = this.mindMap.themeConfig
    // 箭头
    this.markerPath
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
    let path = this.draw.path()
    path
      .stroke({
        width: associativeLineWidth,
        color: associativeLineColor,
        dasharray: [6, 4]
      })
      .fill({ color: 'none' })
    path.plot(pathStr)
    path.marker('end', this.marker)
    // 不可见的点击线
    let clickPath = this.draw.path()
    clickPath
      .stroke({ width: associativeLineActiveWidth, color: 'transparent' })
      .fill({ color: 'none' })
    clickPath.plot(pathStr)
    // 点击事件
    clickPath.click(e => {
      e.stopPropagation()
      // 如果当前存在激活节点，那么取消激活节点
      if (this.mindMap.renderer.activeNodeList.length > 0) {
        this.clearActiveNodes()
      } else {
        // 否则清除当前的关联线的激活状态，如果有的话
        this.clearActiveLine()
        // 保存当前激活的关联线信息
        this.activeLine = [path, clickPath, node, toNode]
        // 让不可见的点击线显示
        clickPath.stroke({ color: associativeLineActiveColor })
        // 渲染控制点和连线
        this.renderControls(
          startPoint,
          endPoint,
          controlPoints[0],
          controlPoints[1]
        )
        this.mindMap.emit(
          'associative_line_click',
          path,
          clickPath,
          node,
          toNode
        )
      }
    })
    this.lineList.push([path, clickPath, node, toNode])
  }

  // 移除所有连接线
  removeAllLines() {
    this.lineList.forEach(line => {
      line[0].remove()
      line[1].remove()
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
    let { associativeLineWidth, associativeLineColor } =
      this.mindMap.themeConfig
    if (this.isCreatingLine || !fromNode) return
    this.isCreatingLine = true
    this.creatingStartNode = fromNode
    this.creatingLine = this.draw.path()
    this.creatingLine
      .stroke({
        width: associativeLineWidth,
        color: associativeLineColor,
        dasharray: [6, 4]
      })
      .fill({ color: 'none' })
    this.creatingLine.marker('end', this.marker)
  }

  // 鼠标移动事件
  onMousemove(e) {
    if (!this.isCreatingLine) return
    this.updateCreatingLine(e)
  }

  // 更新创建过程中的连接线
  updateCreatingLine(e) {
    let { x, y } = this.getTransformedEventPos(e)
    let startPoint = getNodePoint(this.creatingStartNode)
    let pathStr = cubicBezierPath(startPoint.x, startPoint.y, x, y)
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

  // 检测当前移动到的目标节点
  checkOverlapNode(x, y) {
    this.overlapNode = null
    bfsWalk(this.mindMap.renderer.root, node => {
      if (node.nodeData.data.isActive) {
        this.mindMap.renderer.setNodeActive(node, false)
      }
      if (node === this.creatingStartNode || this.overlapNode) {
        return
      }
      let { left, top, width, height } = node
      let right = left + width
      let bottom = top + height
      if (x >= left && x <= right && y >= top && y <= bottom) {
        this.overlapNode = node
      }
    })
    if (this.overlapNode && !this.overlapNode.nodeData.data.isActive) {
      this.mindMap.renderer.setNodeActive(this.overlapNode, true)
    }
  }

  // 完成创建连接线
  completeCreateLine(node) {
    if (this.creatingStartNode === node) return
    this.addLine(this.creatingStartNode, node)
    if (this.overlapNode && this.overlapNode.nodeData.data.isActive) {
      this.mindMap.renderer.setNodeActive(this.overlapNode, false)
    }
    this.isCreatingLine = false
    this.creatingStartNode = null
    this.creatingLine.remove()
    this.creatingLine = null
    this.overlapNode = null
  }

  // 添加连接线
  addLine(fromNode, toNode) {
    if (!fromNode || !toNode) return
    // 目标节点如果没有id，则生成一个id
    let id = toNode.nodeData.data.id
    if (!id) {
      id = uuid()
      this.mindMap.execCommand('SET_NODE_DATA', toNode, {
        id
      })
    }
    // 将目标节点id保存起来
    let list = fromNode.nodeData.data.associativeLineTargets || []
    list.push(id)
    // 保存控制点
    let [startPoint, endPoint] = computeNodePoints(fromNode, toNode)
    let controlPoints = computeCubicBezierPathPoints(
      startPoint.x,
      startPoint.y,
      endPoint.x,
      endPoint.y
    )
    let offsetList =
      fromNode.nodeData.data.associativeLineTargetControlOffsets || []
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
    this.mindMap.execCommand('SET_NODE_DATA', fromNode, {
      associativeLineTargets: list,
      associativeLineTargetControlOffsets: offsetList
    })
  }

  // 删除连接线
  removeLine() {
    if (!this.activeLine) return
    let [, , node, toNode] = this.activeLine
    this.removeControls()
    let { associativeLineTargets, associativeLineTargetControlOffsets } =
      node.nodeData.data
    let targetIndex = getAssociativeLineTargetIndex(node, toNode)
    this.mindMap.execCommand('SET_NODE_DATA', node, {
      associativeLineTargets: associativeLineTargets.filter((_, index) => {
        return index !== targetIndex
      }),
      associativeLineTargetControlOffsets: associativeLineTargetControlOffsets
        ? associativeLineTargetControlOffsets.filter((_, index) => {
            return index !== targetIndex
          })
        : []
    })
  }

  // 清除当前激活的节点
  clearActiveNodes() {
    if (this.mindMap.renderer.activeNodeList.length > 0) {
      this.mindMap.execCommand('CLEAR_ACTIVE_NODE')
    }
  }

  // 清除激活的线
  clearActiveLine() {
    if (this.activeLine) {
      this.activeLine[1].stroke({
        color: 'transparent'
      })
      this.activeLine = null
      this.removeControls()
    }
  }

  // 处理节点正在拖拽事件
  onNodeDragging() {
    if (this.isNodeDragging) return
    this.isNodeDragging = true
    this.lineList.forEach(line => {
      line[0].hide()
      line[1].hide()
    })
    this.hideControls()
  }

  // 处理节点拖拽完成事件
  onNodeDragend() {
    if (!this.isNodeDragging) return
    this.lineList.forEach(line => {
      line[0].show()
      line[1].show()
    })
    this.showControls()
    this.isNodeDragging = false
  }

  // 创建控制点、连线节点
  createControlNodes() {
    let { associativeLineActiveColor } = this.mindMap.themeConfig
    // 连线
    this.controlLine1 = this.draw
      .line()
      .stroke({ color: associativeLineActiveColor, width: 2 })
    this.controlLine2 = this.draw
      .line()
      .stroke({ color: associativeLineActiveColor, width: 2 })
    // 控制点
    this.controlPoint1 = this.createOneControlNode('controlPoint1')
    this.controlPoint2 = this.createOneControlNode('controlPoint2')
  }

  // 创建控制点
  createOneControlNode(pointKey) {
    let { associativeLineActiveColor } = this.mindMap.themeConfig
    return this.draw
      .circle(this.controlPointDiameter)
      .stroke({ color: associativeLineActiveColor })
      .fill({ color: '#fff' })
      .click(e => {
        e.stopPropagation()
      })
      .mousedown(e => {
        this.onControlPointMousedown(e, pointKey)
      })
  }

  // 控制点的鼠标按下事件
  onControlPointMousedown(e, pointKey) {
    e.stopPropagation()
    this.isControlPointMousedown = true
    this.mousedownControlPointKey = pointKey
  }

  // 控制点的鼠标移动事件
  onControlPointMousemove(e) {
    if (
      !this.isControlPointMousedown ||
      !this.mousedownControlPointKey ||
      !this[this.mousedownControlPointKey]
    )
      return
    e.stopPropagation()
    e.preventDefault()
    let radius = this.controlPointDiameter / 2
    // 转换鼠标当前的位置
    let { x, y } = this.getTransformedEventPos(e)
    this.controlPointMousemoveState.pos = {
      x,
      y
    }
    // 更新当前拖拽的控制点的位置
    this[this.mousedownControlPointKey].x(x - radius).y(y - radius)
    let [path, clickPath, node, toNode] = this.activeLine
    let [startPoint, endPoint] = computeNodePoints(node, toNode)
    this.controlPointMousemoveState.startPoint = startPoint
    this.controlPointMousemoveState.endPoint = endPoint
    let targetIndex = getAssociativeLineTargetIndex(node, toNode)
    this.controlPointMousemoveState.targetIndex = targetIndex
    let offsets =
      node.nodeData.data.associativeLineTargetControlOffsets[targetIndex]
    let point1 = null
    let point2 = null
    // 拖拽的是控制点1
    if (this.mousedownControlPointKey === 'controlPoint1') {
      point1 = {
        x,
        y
      }
      point2 = {
        x: endPoint.x + offsets[1].x,
        y: endPoint.y + offsets[1].y
      }
      // 更新控制点1的连线
      this.controlLine1.plot(startPoint.x, startPoint.y, point1.x, point1.y)
    } else {
      // 拖拽的是控制点2
      point1 = {
        x: startPoint.x + offsets[0].x,
        y: startPoint.y + offsets[0].y
      }
      point2 = {
        x,
        y
      }
      // 更新控制点2的连线
      this.controlLine2.plot(endPoint.x, endPoint.y, point2.x, point2.y)
    }
    // 更新关联线
    let pathStr = joinCubicBezierPath(startPoint, endPoint, point1, point2)
    path.plot(pathStr)
    clickPath.plot(pathStr)
  }

  // 控制点的鼠标移动事件
  onControlPointMouseup(e) {
    if (!this.isControlPointMousedown) return
    e.stopPropagation()
    e.preventDefault()
    let { pos, startPoint, endPoint, targetIndex } =
      this.controlPointMousemoveState
    let [, , node] = this.activeLine
    let offsetList =
      node.nodeData.data.associativeLineTargetControlOffsets || []
    let offset1 = null
    let offset2 = null
    if (this.mousedownControlPointKey === 'controlPoint1') {
      // 更新控制点1数据
      offset1 = {
        x: pos.x - startPoint.x,
        y: pos.y - startPoint.y
      }
      offset2 = offsetList[targetIndex][1]
    } else {
      // 更新控制点2数据
      offset1 = offsetList[targetIndex][0]
      offset2 = {
        x: pos.x - endPoint.x,
        y: pos.y - endPoint.y
      }
    }
    offsetList[targetIndex] = [offset1, offset2]
    this.mindMap.execCommand('SET_NODE_DATA', node, {
      associativeLineTargetControlOffsets: offsetList
    })
    // 这里要加个setTimeout0是因为draw_click事件比mouseup事件触发的晚，所以重置isControlPointMousedown需要等draw_click事件触发完以后
    setTimeout(() => {
      this.resetControlPoint()
    }, 0)
  }

  // 复位控制点移动
  resetControlPoint() {
    this.isControlPointMousedown = false
    this.mousedownControlPointKey = ''
    this.controlPointMousemoveState = {
      pos: null,
      startPoint: null,
      endPoint: null,
      targetIndex: ''
    }
  }

  // 渲染控制点
  renderControls(startPoint, endPoint, point1, point2) {
    if (!this.controlLine1) {
      this.createControlNodes()
    }
    let radius = this.controlPointDiameter / 2
    // 控制点和起终点的连线
    this.controlLine1.plot(startPoint.x, startPoint.y, point1.x, point1.y)
    this.controlLine2.plot(endPoint.x, endPoint.y, point2.x, point2.y)
    // 控制点
    this.controlPoint1.x(point1.x - radius).y(point1.y - radius)
    this.controlPoint2.x(point2.x - radius).y(point2.y - radius)
  }

  // 删除控制点
  removeControls() {
    if (!this.controlLine1) return
    ;[
      this.controlLine1,
      this.controlLine2,
      this.controlPoint1,
      this.controlPoint2
    ].forEach(item => {
      item.remove()
    })
    this.controlLine1 = null
    this.controlLine2 = null
    this.controlPoint1 = null
    this.controlPoint2 = null
  }

  // 隐藏控制点
  hideControls() {
    if (!this.controlLine1) return
    ;[
      this.controlLine1,
      this.controlLine2,
      this.controlPoint1,
      this.controlPoint2
    ].forEach(item => {
      item.hide()
    })
  }

  // 显示控制点
  showControls() {
    if (!this.controlLine1) return
    ;[
      this.controlLine1,
      this.controlLine2,
      this.controlPoint1,
      this.controlPoint2
    ].forEach(item => {
      item.show()
    })
  }
}

AssociativeLine.instanceName = 'associativeLine'

export default AssociativeLine
