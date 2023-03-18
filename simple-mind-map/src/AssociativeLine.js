import { walk, bfsWalk, throttle } from './utils/'
import { v4 as uuid } from 'uuid'

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
    this.removeAllLines()
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
        let [startPoint, endPoint] = this.computeNodePoints(node, toNode)
        this.drawLine(startPoint, endPoint, node, toNode)
      })
    })
  }

  // 绘制连接线
  drawLine(startPoint, endPoint, node, toNode) {
    let { associativeLineWidth, associativeLineColor, associativeLineActiveWidth, associativeLineActiveColor } = this.mindMap.themeConfig
    // 箭头
    this.markerPath.stroke({ color: associativeLineColor }).fill({ color: associativeLineColor })
    // 路径
    let pathStr = this.cubicBezierPath(
      startPoint.x,
      startPoint.y,
      endPoint.x,
      endPoint.y
    )
    // 虚线
    let path = this.draw.path()
    path
      .stroke({ width: associativeLineWidth, color: associativeLineColor, dasharray: [6, 4] })
      .fill({ color: 'none' })
    path.plot(pathStr)
    path.marker('end', this.marker)
    // 不可见的点击线
    let clickPath = this.draw.path()
    clickPath.stroke({ width: associativeLineActiveWidth, color: 'transparent' }).fill({ color: 'none' })
    clickPath.plot(pathStr)
    clickPath.click(e => {
      e.stopPropagation()
      this.clearActiveNodes()
      this.clearActiveLine()
      this.activeLine = [path, clickPath, node, toNode]
      clickPath.stroke({ color: associativeLineActiveColor })
      this.mindMap.emit('associative_line_click', path, clickPath, node, toNode)
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
    let { associativeLineWidth, associativeLineColor } = this.mindMap.themeConfig
    if (this.isCreatingLine || !fromNode) return
    this.isCreatingLine = true
    this.creatingStartNode = fromNode
    this.creatingLine = this.draw.path()
    this.creatingLine
      .stroke({ width: associativeLineWidth, color: associativeLineColor, dasharray: [6, 4] })
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
    let { x, y } = this.mindMap.toPos(e.clientX, e.clientY)
    let { scaleX, scaleY, translateX, translateY } =
      this.mindMap.draw.transform()
    x = (x - translateX) / scaleX
    y = (y - translateY) / scaleY
    let startPoint = this.getNodePoint(this.creatingStartNode)
    let pathStr = this.cubicBezierPath(startPoint.x, startPoint.y, x, y)
    this.creatingLine.plot(pathStr)
    this.checkOverlapNode(x, y)
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
    let id = toNode.nodeData.data.id
    if (!id) {
      id = uuid()
      this.mindMap.execCommand('SET_NODE_DATA', toNode, {
        id
      })
    }
    let list = fromNode.nodeData.data.associativeLineTargets || []
    list.push(id)
    this.mindMap.execCommand('SET_NODE_DATA', fromNode, {
      associativeLineTargets: list
    })
  }

  // 删除连接线
  removeLine() {
    if (!this.activeLine) return
    let [, , node, toNode] = this.activeLine
    let id = toNode.nodeData.data.id
    this.mindMap.execCommand('SET_NODE_DATA', node, {
      associativeLineTargets: node.nodeData.data.associativeLineTargets.filter(
        item => {
          return item !== id
        }
      )
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
  }

  // 处理节点拖拽完成事件
  onNodeDragend() {
    if (!this.isNodeDragging) return
    this.lineList.forEach(line => {
      line[0].show()
      line[1].show()
    })
    this.isNodeDragging = false
  }

  // 三次贝塞尔曲线
  cubicBezierPath(x1, y1, x2, y2) {
    let cx1 = x1 + (x2 - x1) / 2
    let cy1 = y1
    let cx2 = cx1
    let cy2 = y2
    if (Math.abs(x1 - x2) <= 5) {
      cx1 = x1 + (y2 - y1) / 2
      cx2 = cx1
    }
    return `M ${x1},${y1} C ${cx1},${cy1} ${cx2},${cy2} ${x2},${y2}`
  }

  // 根据两个节点的位置计算节点的连接点
  computeNodePoints(fromNode, toNode) {
    let fromRect = this.getNodeRect(fromNode)
    let fromCx = (fromRect.right + fromRect.left) / 2
    let fromCy = (fromRect.bottom + fromRect.top) / 2
    let toRect = this.getNodeRect(toNode)
    let toCx = (toRect.right + toRect.left) / 2
    let toCy = (toRect.bottom + toRect.top) / 2
    // 中心点坐标的差值
    let offsetX = toCx - fromCx
    let offsetY = toCy - fromCy
    if (offsetX === 0 && offsetY === 0) return
    let fromDir = ''
    let toDir = ''
    if (offsetX <= 0 && offsetX <= offsetY && offsetX <= -offsetY) {
      // left
      fromDir = 'left'
      toDir = 'right'
    } else if (offsetX > 0 && offsetX >= -offsetY && offsetX >= offsetY) {
      // right
      fromDir = 'right'
      toDir = 'left'
    } else if (offsetY <= 0 && offsetY < offsetX && offsetY < -offsetX) {
      // up
      fromDir = 'top'
      toDir = 'bottom'
    } else if (offsetY > 0 && -offsetY < offsetX && offsetY > offsetX) {
      // down
      fromDir = 'bottom'
      toDir = 'top'
    }
    return [
      this.getNodePoint(fromNode, fromDir),
      this.getNodePoint(toNode, toDir)
    ]
  }

  //  获取节点的位置信息
  getNodeRect(node) {
    let { left, top, width, height } = node
    return {
      right: left + width,
      bottom: top + height,
      left,
      top
    }
  }

  // 获取节点的连接点
  getNodePoint(node, dir = 'right') {
    let { left, top, width, height } = node
    switch (dir) {
      case 'left':
        return {
          x: left,
          y: top + height / 2
        }
      case 'right':
        return {
          x: left + width,
          y: top + height / 2
        }
      case 'top':
        return {
          x: left + width / 2,
          y: top
        }
      case 'bottom':
        return {
          x: left + width / 2,
          y: top + height
        }
      default:
        break
    }
  }
}

AssociativeLine.instanceName = 'associativeLine'

export default AssociativeLine
