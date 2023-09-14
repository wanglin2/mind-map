import { bfsWalk, throttle } from '../utils'
import Base from '../layouts/Base'

// 节点拖动插件
class Drag extends Base {
  //  构造函数
  constructor({ mindMap }) {
    super(mindMap.renderer)
    this.mindMap = mindMap
    this.reset()
    this.bindEvent()
  }

  //  复位
  reset() {
    // 当前画布节点列表
    this.nodeList = []
    // 当前拖拽节点
    this.node = null
    // 当前重叠节点
    this.overlapNode = null
    // 当前上一个同级节点
    this.prevNode = null
    // 当前下一个同级节点
    this.nextNode = null
    // 画布的变换数据
    this.drawTransform = null
    // 克隆节点
    this.clone = null
    // 连接线
    this.line = null
    // 同级位置占位符
    this.placeholder = null
    // 鼠标按下位置和节点左上角的偏移量
    this.offsetX = 0
    this.offsetY = 0
    // 克隆节点左上角的坐标
    this.cloneNodeLeft = 0
    this.cloneNodeTop = 0
    // 当前鼠标是否按下
    this.isMousedown = false
    // 拖拽的鼠标位置变量
    this.mouseDownX = 0
    this.mouseDownY = 0
    this.mouseMoveX = 0
    this.mouseMoveY = 0
    // 鼠标移动的距离距鼠标按下的位置距离多少以上才认为是拖动事件
    this.checkDragOffset = 10
    this.minOffset = 10
  }

  //  绑定事件
  bindEvent() {
    this.checkOverlapNode = throttle(this.checkOverlapNode, 300, this)
    this.mindMap.on('node_mousedown', (node, e) => {
      if (this.mindMap.opt.readonly || node.isGeneralization) {
        return
      }
      if (e.which !== 1 || node.isRoot) {
        return
      }
      e.preventDefault()
      // 计算鼠标按下的位置距离节点左上角的距离
      this.drawTransform = this.mindMap.draw.transform()
      let { scaleX, scaleY, translateX, translateY } = this.drawTransform
      let { x, y } = this.mindMap.toPos(e.clientX, e.clientY)
      this.offsetX = x - (node.left * scaleX + translateX)
      this.offsetY = y - (node.top * scaleY + translateY)
      this.node = node
      this.isMousedown = true
      this.mouseDownX = x
      this.mouseDownY = y
      this.nodeTreeToList()
    })
    this.mindMap.on('mousemove', e => {
      if (this.mindMap.opt.readonly) {
        return
      }
      if (!this.isMousedown) {
        return
      }
      this.mindMap.emit('node_dragging', this.node)
      e.preventDefault()
      let { x, y } = this.mindMap.toPos(e.clientX, e.clientY)
      this.mouseMoveX = x
      this.mouseMoveY = y
      if (
        Math.abs(x - this.mouseDownX) <= this.checkDragOffset &&
        Math.abs(y - this.mouseDownY) <= this.checkDragOffset &&
        !this.node.isDrag
      ) {
        return
      }
      this.mindMap.renderer.clearAllActive()
      this.onMove(x, y)
    })
    this.onMouseup = this.onMouseup.bind(this)
    this.mindMap.on('node_mouseup', this.onMouseup)
    this.mindMap.on('mouseup', this.onMouseup)
  }

  //  鼠标松开事件
  onMouseup(e) {
    if (!this.isMousedown) {
      return
    }
    this.isMousedown = false
    let _nodeIsDrag = this.node.isDrag
    this.node.isDrag = false
    this.node.show()
    this.removeCloneNode()
    let overlapNodeUid = this.overlapNode
      ? this.overlapNode.nodeData.data.uid
      : ''
    let prevNodeUid = this.prevNode ? this.prevNode.nodeData.data.uid : ''
    let nextNodeUid = this.nextNode ? this.nextNode.nodeData.data.uid : ''
    // 存在重叠子节点，则移动作为其子节点
    if (this.overlapNode) {
      this.mindMap.renderer.setNodeActive(this.overlapNode, false)
      this.mindMap.execCommand('MOVE_NODE_TO', this.node, this.overlapNode)
    } else if (this.prevNode) {
      // 存在前一个相邻节点，作为其下一个兄弟节点
      this.mindMap.renderer.setNodeActive(this.prevNode, false)
      this.mindMap.execCommand('INSERT_AFTER', this.node, this.prevNode)
    } else if (this.nextNode) {
      // 存在下一个相邻节点，作为其前一个兄弟节点
      this.mindMap.renderer.setNodeActive(this.nextNode, false)
      this.mindMap.execCommand('INSERT_BEFORE', this.node, this.nextNode)
    } else if (_nodeIsDrag && this.mindMap.opt.enableFreeDrag) {
      // 自定义位置
      let { x, y } = this.mindMap.toPos(
        e.clientX - this.offsetX,
        e.clientY - this.offsetY
      )
      let { scaleX, scaleY, translateX, translateY } = this.drawTransform
      x = (x - translateX) / scaleX
      y = (y - translateY) / scaleY
      this.node.left = x
      this.node.top = y
      this.node.customLeft = x
      this.node.customTop = y
      this.mindMap.execCommand('SET_NODE_CUSTOM_POSITION', this.node, x, y)
      this.mindMap.render()
    }
    this.reset()
    this.mindMap.emit('node_dragend', {
      overlapNodeUid,
      prevNodeUid,
      nextNodeUid
    })
  }

  //  创建克隆节点
  createCloneNode() {
    if (!this.clone) {
      // 节点
      this.clone = this.node.group.clone()
      this.clone.opacity(0.5)
      this.clone.css('z-index', 99999)
      this.node.isDrag = true
      this.node.hide()
      // 连接线
      this.line = this.draw.path()
      this.line.opacity(0.5)
      this.node.styleLine(this.line, this.node)
      // 同级位置占位符
      this.placeholder = this.draw.rect().fill({
        color: this.node.style.merge('lineColor', true)
      })
      this.mindMap.draw.add(this.clone)
    }
  }

  //  移除克隆节点
  removeCloneNode() {
    if (!this.clone) {
      return
    }
    this.clone.remove()
    this.line.remove()
    this.placeholder.remove()
  }

  //  拖动中
  onMove(x, y) {
    if (!this.isMousedown) {
      return
    }
    let originX = x
    let originY = y
    this.createCloneNode()
    let { scaleX, scaleY, translateX, translateY } = this.drawTransform
    this.cloneNodeLeft = x - this.offsetX
    this.cloneNodeTop = y - this.offsetY
    x = (this.cloneNodeLeft - translateX) / scaleX
    y = (this.cloneNodeTop - translateY) / scaleY
    let t = this.clone.transform()
    this.clone.translate(x - t.translateX, y - t.translateY)
    // 连接线
    let parent = this.node.parent
    this.line.plot(
      this.quadraticCurvePath(
        parent.left + parent.width / 2,
        parent.top + parent.height / 2,
        x + this.node.width / 2,
        y + this.node.height / 2
      )
    )
    this.checkOverlapNode()
    // 如果注册了多选节点插件，那么复用它的边缘自动移动画布功能
    if (this.mindMap.opt.autoMoveWhenMouseInEdgeOnDrag && this.mindMap.select) {
      this.drawTransform = this.mindMap.draw.transform()
      this.mindMap.select.clearAutoMoveTimer()
      this.mindMap.select.onMove(originX, originY)
    }
  }

  //  检测重叠节点
  checkOverlapNode() {
    if (!this.drawTransform || !this.placeholder) {
      return
    }
    this.overlapNode = null
    this.prevNode = null
    this.nextNode = null
    this.placeholder.size(0, 0)
    this.nodeList.forEach(node => {
      if (node.nodeData.data.isActive) {
        this.mindMap.renderer.setNodeActive(node, false)
      }
      if (node.uid === this.node.uid) {
        return
      }
      if (this.overlapNode || (this.prevNode && this.nextNode)) {
        return
      }
      switch (this.mindMap.opt.layout) {
        case 'logicalStructure':
          this.handleLogicalStructure(node)
          break
        case 'mindMap':
          this.handleMindMap(node)
          break
        case 'organizationStructure':
          this.handleOrganizationStructure(node)
          break
        case 'catalogOrganization':
          this.handleCatalogOrganization(node)
          break
        case 'timeline':
          this.handleTimeLine(node)
          break
        case 'timeline2':
          this.handleTimeLine2(node)
          break
        case 'verticalTimeline':
          this.handleLogicalStructure(node)
          break
        case 'fishbone':
          this.handleFishbone(node)
          break
        default:
          this.handleLogicalStructure(node)
      }
    })
    if (this.overlapNode) {
      this.mindMap.renderer.setNodeActive(this.overlapNode, true)
    }
  }

  // 垂直方向比较
  // isReverse：是否反向
  handleVerticalCheck(node, checkList, isReverse = false) {
    let x = this.mouseMoveX
    let y = this.mouseMoveY
    let nodeRect = this.getNodeRect(node)
    if (isReverse) {
      checkList = checkList.reverse()
    }
    let oneFourthHeight = nodeRect.height / 4
    let { prevBrotherOffset, nextBrotherOffset } =
      this.getNodeDistanceToSiblingNode(checkList, node, nodeRect, 'v')
    if (nodeRect.left <= x && nodeRect.right >= x) {
      // 检测兄弟节点位置
      if (
        !this.overlapNode &&
        !this.prevNode &&
        !this.nextNode &&
        !node.isRoot
      ) {
        let checkIsPrevNode =
          nextBrotherOffset > 0 // 距离下一个兄弟节点的距离大于0
            ? y > nodeRect.bottom && y <= nodeRect.bottom + nextBrotherOffset // 那么在当前节点外底部判断
            : y >= nodeRect.bottom - oneFourthHeight && y <= nodeRect.bottom // 否则在当前节点内底部1/4区间判断
        let checkIsNextNode =
          prevBrotherOffset > 0 // 距离上一个兄弟节点的距离大于0
            ? y < nodeRect.top && y >= nodeRect.top - prevBrotherOffset // 那么在当前节点外底部判断
            : y >= nodeRect.top && y <= nodeRect.top + oneFourthHeight
        if (checkIsPrevNode) {
          if (isReverse) {
            this.nextNode = node
          } else {
            this.prevNode = node
          }
          let size = this.formatPlaceholderSize(nextBrotherOffset)
          this.setPlaceholderRect(
            node.width,
            size,
            nodeRect.originLeft,
            nodeRect.originBottom
          )
        } else if (checkIsNextNode) {
          if (isReverse) {
            this.prevNode = node
          } else {
            this.nextNode = node
          }
          let size = this.formatPlaceholderSize(prevBrotherOffset)
          this.setPlaceholderRect(
            node.width,
            size,
            nodeRect.originLeft,
            nodeRect.originTop - size
          )
        }
      }
      // 检测是否重叠
      this.checkIsOverlap({
        node,
        dir: 'v',
        prevBrotherOffset,
        nextBrotherOffset,
        size: oneFourthHeight,
        pos: y,
        nodeRect
      })
    }
  }

  // 水平方向比较
  handleHorizontalCheck(node, checkList) {
    let x = this.mouseMoveX
    let y = this.mouseMoveY
    let nodeRect = this.getNodeRect(node)
    let oneFourthWidth = nodeRect.width / 4
    let { prevBrotherOffset, nextBrotherOffset } =
      this.getNodeDistanceToSiblingNode(checkList, node, nodeRect, 'h')
    if (nodeRect.top <= y && nodeRect.bottom >= y) {
      // 检测兄弟节点位置
      if (
        !this.overlapNode &&
        !this.prevNode &&
        !this.nextNode &&
        !node.isRoot
      ) {
        let checkIsPrevNode =
          nextBrotherOffset > 0 // 距离下一个兄弟节点的距离大于0
            ? x < nodeRect.right + nextBrotherOffset && x >= nodeRect.right // 那么在当前节点外底部判断
            : x <= nodeRect.right && x >= nodeRect.right - oneFourthWidth // 否则在当前节点内底部1/4区间判断
        let checkIsNextNode =
          prevBrotherOffset > 0 // 距离上一个兄弟节点的距离大于0
            ? x > nodeRect.left - prevBrotherOffset && x <= nodeRect.left // 那么在当前节点外底部判断
            : x <= nodeRect.left + oneFourthWidth && x >= nodeRect.left
        if (checkIsPrevNode) {
          this.prevNode = node
          let size = this.formatPlaceholderSize(nextBrotherOffset)
          this.setPlaceholderRect(
            size,
            node.height,
            nodeRect.originRight,
            nodeRect.originTop
          )
        } else if (checkIsNextNode) {
          this.nextNode = node
          let size = this.formatPlaceholderSize(prevBrotherOffset)
          this.setPlaceholderRect(
            size,
            node.height,
            nodeRect.originLeft - size,
            nodeRect.originTop
          )
        }
      }
      // 检测是否重叠
      this.checkIsOverlap({
        node,
        dir: 'h',
        prevBrotherOffset,
        nextBrotherOffset,
        size: oneFourthWidth,
        pos: x,
        nodeRect
      })
    }
  }

  // 获取节点距前一个和后一个节点的距离
  getNodeDistanceToSiblingNode(checkList, node, nodeRect, dir) {
    let dir1 = dir === 'v' ? 'top' : 'left'
    let dir2 = dir === 'v' ? 'bottom' : 'right'
    let index = checkList.findIndex(item => {
      return item.uid === node.uid
    })
    let prevBrother = null
    let nextBrother = null
    if (index !== -1) {
      if (index - 1 >= 0) {
        prevBrother = checkList[index - 1]
      }
      if (index + 1 <= checkList.length - 1) {
        nextBrother = checkList[index + 1]
      }
    }
    // 和前一个兄弟节点的距离
    let prevBrotherOffset = 0
    if (prevBrother) {
      let prevNodeRect = this.getNodeRect(prevBrother)
      prevBrotherOffset = nodeRect[dir1] - prevNodeRect[dir2]
      // 间距小于10就当它不存在
      prevBrotherOffset =
        prevBrotherOffset >= this.minOffset ? prevBrotherOffset / 2 : 0
    } else {
      // 没有前一个兄弟节点，那么假设和前一个节点的距离为20
      prevBrotherOffset = this.minOffset
    }
    // 和后一个兄弟节点的距离
    let nextBrotherOffset = 0
    if (nextBrother) {
      let nextNodeRect = this.getNodeRect(nextBrother)
      nextBrotherOffset = nextNodeRect[dir1] - nodeRect[dir2]
      nextBrotherOffset =
        nextBrotherOffset >= this.minOffset ? nextBrotherOffset / 2 : 0
    } else {
      nextBrotherOffset = this.minOffset
    }
    return {
      prevBrotherOffset,
      nextBrotherOffset
    }
  }

  // 处理提示元素的大小
  formatPlaceholderSize(size) {
    const { nodeDragPlaceholderMaxSize } = this.mindMap.opt
    return size > 0 ? Math.min(size, nodeDragPlaceholderMaxSize) : 5
  }

  // 设置提示元素的大小和位置
  setPlaceholderRect(w, h, x, y) {
    this.placeholder.size(w, h).move(x, y)
  }

  // 检测是否重叠
  checkIsOverlap({
    node,
    dir,
    prevBrotherOffset,
    nextBrotherOffset,
    size,
    pos,
    nodeRect
  }) {
    let dir1 = dir === 'v' ? 'top' : 'left'
    let dir2 = dir === 'v' ? 'bottom' : 'right'
    if (!this.overlapNode && !this.prevNode && !this.nextNode) {
      if (
        nodeRect[dir1] + (prevBrotherOffset > 0 ? 0 : size) <= pos &&
        nodeRect[dir2] - (nextBrotherOffset > 0 ? 0 : size) >= pos
      ) {
        this.overlapNode = node
      }
    }
  }

  // 处理逻辑结构图
  handleLogicalStructure(node) {
    const checkList = this.commonGetNodeCheckList(node)
    this.handleVerticalCheck(node, checkList)
  }

  // 处理思维导图
  handleMindMap(node) {
    const checkList = node.parent
      ? node.parent.children.filter(item => {
          let sameDir = true
          if (node.layerIndex === 1) {
            sameDir = item.dir === node.dir
          }
          return item !== this.node && sameDir
        })
      : []
    this.handleVerticalCheck(node, checkList)
  }

  // 处理组织结构图
  handleOrganizationStructure(node) {
    const checkList = this.commonGetNodeCheckList(node)
    this.handleHorizontalCheck(node, checkList)
  }

  // 处理目录组织图
  handleCatalogOrganization(node) {
    const checkList = this.commonGetNodeCheckList(node)
    if (node.layerIndex === 1) {
      this.handleHorizontalCheck(node, checkList)
    } else {
      this.handleVerticalCheck(node, checkList)
    }
  }

  // 处理时间轴
  handleTimeLine(node) {
    let checkList = this.commonGetNodeCheckList(node)
    if (node.layerIndex === 1) {
      this.handleHorizontalCheck(node, checkList)
    } else {
      this.handleVerticalCheck(node, checkList)
    }
  }

  // 处理时间轴2
  handleTimeLine2(node) {
    let checkList = this.commonGetNodeCheckList(node)
    if (node.layerIndex === 1) {
      this.handleHorizontalCheck(node, checkList)
    } else {
      // 处于上方的三级节点需要特殊处理，因为节点排列方向反向了
      if (node.dir === 'top' && node.layerIndex === 2) {
        this.handleVerticalCheck(node, checkList, true)
      } else {
        this.handleVerticalCheck(node, checkList)
      }
    }
  }

  // 处理鱼骨图
  handleFishbone(node) {
    let checkList = node.parent
      ? node.parent.children.filter(item => {
          return item !== this.node && item.layerIndex > 1
        })
      : []
    if (node.layerIndex === 1) {
      this.handleHorizontalCheck(node, checkList)
    } else {
      // 处于上方的三级节点需要特殊处理，因为节点排列方向反向了
      if (node.dir === 'top' && node.layerIndex === 2) {
        this.handleVerticalCheck(node, checkList, true)
      } else {
        this.handleVerticalCheck(node, checkList)
      }
    }
  }

  // 获取节点的兄弟节点列表通用方法
  commonGetNodeCheckList(node) {
    return node.parent
      ? node.parent.children.filter(item => {
          return item !== this.node
        })
      : []
  }

  // 计算节点的位置尺寸信息
  getNodeRect(node) {
    let { scaleX, scaleY, translateX, translateY } = this.drawTransform
    let { left, top, width, height } = node
    let originLeft = left
    let originTop = top
    let originBottom = top + height
    let originRight = left + width
    let right = (left + width) * scaleX + translateX
    let bottom = (top + height) * scaleY + translateY
    left = left * scaleX + translateX
    top = top * scaleY + translateY
    return {
      width,
      height,
      left,
      top,
      right,
      bottom,
      originLeft,
      originTop,
      originBottom,
      originRight
    }
  }

  // 节点由树转换成数组，从子节点到根节点
  nodeTreeToList() {
    const list = []
    bfsWalk(this.mindMap.renderer.root, node => {
      if (!list[node.layerIndex]) {
        list[node.layerIndex] = []
      }
      list[node.layerIndex].push(node)
    })
    this.nodeList = list.reduceRight((res, cur) => {
      return [...res, ...cur]
    }, [])
  }
}

Drag.instanceName = 'drag'

export default Drag
