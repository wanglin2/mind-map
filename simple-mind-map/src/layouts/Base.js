import MindMapNode from '../core/render/node/MindMapNode'
import { CONSTANTS, initRootNodePositionMap } from '../constants/constant'
import Lru from '../utils/Lru'
import { createUid } from '../utils/index'

//  布局基类
class Base {
  //  构造函数
  constructor(renderer) {
    // 渲染实例
    this.renderer = renderer
    // 控制实例
    this.mindMap = renderer.mindMap
    // 绘图对象
    this.draw = this.mindMap.draw
    this.lineDraw = this.mindMap.lineDraw
    // 根节点
    this.root = null
    this.lru = new Lru(this.mindMap.opt.maxNodeCacheCount)
    // 当initRootNodePosition不为默认的值时，根节点的位置距默认的配置时根节点距离的差值
    this.rootNodeCenterOffset = null
  }

  //  计算节点位置
  doLayout() {
    throw new Error('【computed】方法为必要方法，需要子类进行重写！')
  }

  //  连线
  renderLine() {
    throw new Error('【renderLine】方法为必要方法，需要子类进行重写！')
  }

  //  定位展开收缩按钮
  renderExpandBtn() {
    throw new Error('【renderExpandBtn】方法为必要方法，需要子类进行重写！')
  }

  //  概要节点
  renderGeneralization() {}

  // 通过uid缓存节点
  cacheNode(uid, node) {
    // 记录本次渲染时的节点
    this.renderer.nodeCache[uid] = node
    // 缓存所有渲染过的节点
    this.lru.add(uid, node)
  }

  // 检查当前来源是否需要重新计算节点大小
  checkIsNeedResizeSources() {
    return this.renderer.checkHasRenderSource(CONSTANTS.CHANGE_THEME)
  }

  // 层级类型改变
  checkIsLayerTypeChange(oldIndex, newIndex) {
    if (oldIndex >= 2 && newIndex >= 2) return false
    if (oldIndex >= 2 && newIndex < 2) return true
    if (oldIndex < 2 && newIndex >= 2) return true
  }

  // 检查是否是结构布局改变重新渲染展开收起按钮占位元素
  checkIsLayoutChangeRerenderExpandBtnPlaceholderRect(node) {
    if (this.renderer.checkHasRenderSource(CONSTANTS.CHANGE_LAYOUT)) {
      node.needRerenderExpandBtnPlaceholderRect = true
    }
  }

  // 节点节点数据是否发生了改变
  checkIsNodeDataChange(lastData, curData) {
    if (lastData) {
      // 对比忽略激活状态和展开收起状态
      lastData = typeof lastData === 'string' ? JSON.parse(lastData) : lastData
      lastData.isActive = curData.isActive
      lastData.expand = curData.expand
      lastData = JSON.stringify(lastData)
    } else {
      // 只在都有数据时才进行对比
      return false
    }
    return lastData !== JSON.stringify(curData)
  }

  // 检查库前置或后置内容是否改变了
  checkNodeFixChange(newNode, nodeInnerPrefixData, nodeInnerPostfixData) {
    // 库前置内容是否改变了
    let isNodeInnerPrefixChange = false
    this.mindMap.nodeInnerPrefixList.forEach(item => {
      if (item.updateNodeData) {
        const isChange = item.updateNodeData(newNode, nodeInnerPrefixData)
        if (isChange) {
          isNodeInnerPrefixChange = isChange
        }
      }
    })
    // 库后置内容是否改变了
    let isNodeInnerPostfixChange = false
    this.mindMap.nodeInnerPostfixList.forEach(item => {
      if (item.updateNodeData) {
        const isChange = item.updateNodeData(newNode, nodeInnerPostfixData)
        if (isChange) {
          isNodeInnerPostfixChange = isChange
        }
      }
    })
    return isNodeInnerPrefixChange || isNodeInnerPostfixChange
  }

  //  创建节点实例
  createNode(data, parent, isRoot, layerIndex, index, ancestors) {
    // 创建节点
    // 库前置内容数据
    const nodeInnerPrefixData = {}
    this.mindMap.nodeInnerPrefixList.forEach(item => {
      if (item.createNodeData) {
        const [key, value] = item.createNodeData({
          data,
          parent,
          ancestors,
          layerIndex,
          index
        })
        nodeInnerPrefixData[key] = value
      }
    })
    // 库后置内容数据
    const nodeInnerPostfixData = {}
    this.mindMap.nodeInnerPostfixList.forEach(item => {
      if (item.createNodeData) {
        const [key, value] = item.createNodeData({
          data,
          parent,
          ancestors,
          layerIndex,
          index
        })
        nodeInnerPostfixData[key] = value
      }
    })
    const uid = data.data.uid
    let newNode = null
    // 数据上保存了节点引用，那么直接复用节点
    if (data && data._node && !this.renderer.reRender) {
      newNode = data._node
      // 节点层级改变了
      const isLayerTypeChange = this.checkIsLayerTypeChange(
        newNode.layerIndex,
        layerIndex
      )
      newNode.reset()
      newNode.layerIndex = layerIndex
      if (isRoot) {
        newNode.isRoot = true
      } else {
        newNode.parent = parent._node
      }
      this.cacheNode(data._node.uid, newNode)
      this.checkIsLayoutChangeRerenderExpandBtnPlaceholderRect(newNode)
      // 库前置或后置内容是否改变了
      const isNodeInnerFixChange = this.checkNodeFixChange(
        newNode,
        nodeInnerPrefixData,
        nodeInnerPostfixData
      )
      // 主题或主题配置改变了
      const isResizeSource = this.checkIsNeedResizeSources()
      // 节点数据改变了
      const isNodeDataChange = this.checkIsNodeDataChange(
        data._node.nodeDataSnapshot,
        data.data
      )
      // 重新计算节点大小和布局
      if (
        isResizeSource ||
        isNodeDataChange ||
        isLayerTypeChange ||
        (newNode.getData('resetRichText') && // 自定义节点内容可以直接忽略resetRichText
          !newNode.isUseCustomNodeContent()) ||
        newNode.getData('needUpdate') ||
        isNodeInnerFixChange
      ) {
        newNode.getSize()
        newNode.needLayout = true
      }
      this.checkGetGeneralizationChange(newNode, isResizeSource)
    } else if (
      (this.lru.has(uid) || this.renderer.lastNodeCache[uid]) &&
      !this.renderer.reRender
    ) {
      // 节点数据上没有节点实例
      // 但是通过uid在节点缓存池中找到了缓存的节点
      // 或者在上一次渲染缓存对象中找到了节点
      // 也可以直接复用
      newNode = this.lru.get(uid) || this.renderer.lastNodeCache[uid]
      // 保存该节点上一次的数据
      const lastData = JSON.stringify(newNode.getData())
      // 节点层级改变了
      const isLayerTypeChange = this.checkIsLayerTypeChange(
        newNode.layerIndex,
        layerIndex
      )
      newNode.reset()
      newNode.nodeData = newNode.handleData(data || {})
      newNode.layerIndex = layerIndex
      if (isRoot) {
        newNode.isRoot = true
      } else {
        newNode.parent = parent._node
      }
      this.cacheNode(uid, newNode)
      this.checkIsLayoutChangeRerenderExpandBtnPlaceholderRect(newNode)
      data._node = newNode
      // 主题或主题配置改变了需要重新计算节点大小和布局
      const isResizeSource = this.checkIsNeedResizeSources()
      // 点数据改变了
      const isNodeDataChange = this.checkIsNodeDataChange(lastData, data.data)
      // 库前置或后置内容是否改变了
      const isNodeInnerFixChange = this.checkNodeFixChange(
        newNode,
        nodeInnerPrefixData,
        nodeInnerPostfixData
      )
      // 重新计算节点大小和布局
      if (
        isResizeSource ||
        isNodeDataChange ||
        isLayerTypeChange ||
        (newNode.getData('resetRichText') &&
          !newNode.isUseCustomNodeContent()) ||
        newNode.getData('needUpdate') ||
        isNodeInnerFixChange
      ) {
        newNode.getSize()
        newNode.needLayout = true
      }
      this.checkGetGeneralizationChange(newNode, isResizeSource)
    } else {
      // 创建新节点
      const newUid = uid || createUid()
      newNode = new MindMapNode({
        data,
        uid: newUid,
        renderer: this.renderer,
        mindMap: this.mindMap,
        draw: this.draw,
        layerIndex,
        isRoot,
        parent: !isRoot ? parent._node : null,
        ...nodeInnerPrefixData
      })
      // uid保存到数据上，为了节点复用
      data.data.uid = newUid
      this.cacheNode(newUid, newNode)
      // 数据关联实际节点
      data._node = newNode
    }
    // 如果该节点数据是已激活状态，那么添加到激活节点列表里
    if (data.data.isActive) {
      this.renderer.addNodeToActiveList(newNode)
    }
    // 如果当前节点在激活节点列表里，那么添加上激活的状态
    if (this.mindMap.renderer.findActiveNodeIndex(newNode) !== -1) {
      newNode.setData({
        isActive: true
      })
    }
    // 根节点
    if (isRoot) {
      this.root = newNode
    } else {
      // 互相收集
      parent._node.addChildren(newNode)
    }
    return newNode
  }

  // 检查概要节点是否需要更新
  checkGetGeneralizationChange(node, isResizeSource) {
    const generalizationList = node.getData('generalization')
    if (
      generalizationList &&
      node._generalizationList &&
      node._generalizationList.length > 0
    ) {
      node._generalizationList.forEach((item, index) => {
        const gNode = item.generalizationNode
        const oldData = gNode.getData()
        const newData = generalizationList[index]
        if (
          isResizeSource ||
          (newData && JSON.stringify(oldData) !== JSON.stringify(newData))
        ) {
          if (newData) {
            gNode.nodeData.data = newData
          }
          gNode.getSize()
          gNode.needLayout = true
        }
      })
    }
  }

  // 格式化节点位置
  formatPosition(value, size, nodeSize) {
    if (typeof value === 'number') {
      return value
    } else if (initRootNodePositionMap[value] !== undefined) {
      return size * initRootNodePositionMap[value]
    } else if (/^\d\d*%$/.test(value)) {
      return (Number.parseFloat(value) / 100) * size
    } else {
      return (size - nodeSize) / 2
    }
  }

  // 规范initRootNodePosition配置
  formatInitRootNodePosition(pos) {
    const { CENTER } = CONSTANTS.INIT_ROOT_NODE_POSITION
    if (!pos || !Array.isArray(pos) || pos.length < 2) {
      pos = [CENTER, CENTER]
    }
    return pos
  }

  //  定位节点到画布中间
  setNodeCenter(node, position) {
    let { initRootNodePosition } = this.mindMap.opt
    initRootNodePosition = this.formatInitRootNodePosition(
      position || initRootNodePosition
    )
    node.left = this.formatPosition(
      initRootNodePosition[0],
      this.mindMap.width,
      node.width
    )
    node.top = this.formatPosition(
      initRootNodePosition[1],
      this.mindMap.height,
      node.height
    )
  }

  // 当initRootNodePosition配置不为默认的['center','center']时，计算当前配置和默认配置情况下，根节点位置的差值
  getRootCenterOffset(width, height) {
    // 因为根节点的大小不会影响这个差值，所以计算一次就足够了
    if (this.rootNodeCenterOffset) return this.rootNodeCenterOffset
    let { initRootNodePosition } = this.mindMap.opt
    const { CENTER } = CONSTANTS.INIT_ROOT_NODE_POSITION
    initRootNodePosition = this.formatInitRootNodePosition(initRootNodePosition)
    if (
      initRootNodePosition[0] === CENTER &&
      initRootNodePosition[1] === CENTER
    ) {
      // 如果initRootNodePosition是默认的，那么不需要计算
      this.rootNodeCenterOffset = {
        x: 0,
        y: 0
      }
    } else {
      // 否则需要计算当前配置和默认配置的差值
      const tmpNode = {
        width: width,
        height: height
      }
      const tmpNode2 = {
        width: width,
        height: height
      }
      this.setNodeCenter(tmpNode, [CENTER, CENTER])
      this.setNodeCenter(tmpNode2)
      this.rootNodeCenterOffset = {
        x: tmpNode2.left - tmpNode.left,
        y: tmpNode2.top - tmpNode.top
      }
    }
    return this.rootNodeCenterOffset
  }

  //  更新子节点属性
  updateChildren(children, prop, offset) {
    children.forEach(item => {
      item[prop] += offset
      if (item.children && item.children.length && !item.hasCustomPosition()) {
        // 适配自定义位置
        this.updateChildren(item.children, prop, offset)
      }
    })
  }

  //  更新子节点多个属性
  updateChildrenPro(children, props) {
    children.forEach(item => {
      Object.keys(props).forEach(prop => {
        item[prop] += props[prop]
      })
      if (item.children && item.children.length && !item.hasCustomPosition()) {
        // 适配自定义位置
        this.updateChildrenPro(item.children, props)
      }
    })
  }

  //  递归计算节点的宽度
  getNodeAreaWidth(node, withGeneralization = false) {
    let widthArr = []
    let totalGeneralizationNodeWidth = 0
    let loop = (node, width) => {
      if (withGeneralization && node.checkHasGeneralization()) {
        totalGeneralizationNodeWidth += node._generalizationNodeWidth
      }
      if (node.children.length) {
        width += node.width / 2
        node.children.forEach(item => {
          loop(item, width)
        })
      } else {
        width += node.width
        widthArr.push(width)
      }
    }
    loop(node, 0)
    return Math.max(...widthArr) + totalGeneralizationNodeWidth
  }

  //  二次贝塞尔曲线
  quadraticCurvePath(x1, y1, x2, y2, v = false) {
    let cx, cy
    if (v) {
      cx = x1 + (x2 - x1) * 0.8
      cy = y1 + (y2 - y1) * 0.2
    } else {
      cx = x1 + (x2 - x1) * 0.2
      cy = y1 + (y2 - y1) * 0.8
    }
    return `M ${x1},${y1} Q ${cx},${cy} ${x2},${y2}`
  }

  //  三次贝塞尔曲线
  cubicBezierPath(x1, y1, x2, y2, v = false) {
    let cx1, cy1, cx2, cy2
    if (v) {
      cx1 = x1
      cy1 = y1 + (y2 - y1) / 2
      cx2 = x2
      cy2 = cy1
    } else {
      cx1 = x1 + (x2 - x1) / 2
      cy1 = y1
      cx2 = cx1
      cy2 = y2
    }
    return `M ${x1},${y1} C ${cx1},${cy1} ${cx2},${cy2} ${x2},${y2}`
  }

  // 根据a,b两个点的位置，计算去除圆角大小后的新的b点
  computeNewPoint(a, b, radius = 0) {
    // x坐标相同
    if (a[0] === b[0]) {
      // b在a下方
      if (b[1] > a[1]) {
        return [b[0], b[1] - radius]
      } else {
        // b在a上方
        return [b[0], b[1] + radius]
      }
    } else if (a[1] === b[1]) {
      // y坐标相同
      // b在a右边
      if (b[0] > a[0]) {
        return [b[0] - radius, b[1]]
      } else {
        return [b[0] + radius, b[1]]
      }
    }
  }

  // 创建一段折线路径
  // 最后一个拐角支持圆角
  createFoldLine(list) {
    const { lineRadius } = this.mindMap.themeConfig
    const len = list.length
    let path = ''
    let radiusPath = ''
    if (len >= 3 && lineRadius > 0) {
      const start = list[len - 3]
      const center = list[len - 2]
      const end = list[len - 1]
      // 如果三点在一条直线，那么不用处理
      const isOneLine =
        (start[0].toFixed(0) === center[0].toFixed(0) &&
          center[0].toFixed(0) === end[0].toFixed(0)) ||
        (start[1].toFixed(0) === center[1].toFixed(0) &&
          center[1].toFixed(0) === end[1].toFixed(0))
      if (!isOneLine) {
        const cStart = this.computeNewPoint(start, center, lineRadius)
        const cEnd = this.computeNewPoint(end, center, lineRadius)
        radiusPath = `Q ${center[0]},${center[1]} ${cEnd[0]},${cEnd[1]}`
        list.splice(len - 2, 1, cStart, radiusPath)
      }
    }
    list.forEach((item, index) => {
      if (typeof item === 'string') {
        path += item
      } else {
        const [x, y] = item
        if (index === 0) {
          path += `M ${x},${y}`
        } else {
          path += `L ${x},${y}`
        }
      }
    })
    return path
  }

  //   获取节点的marginX
  getMarginX(layerIndex) {
    const { themeConfig, opt } = this.mindMap
    const { second, node } = themeConfig
    const hoverRectPadding = opt.hoverRectPadding * 2
    return layerIndex === 1
      ? second.marginX + hoverRectPadding
      : node.marginX + hoverRectPadding
  }

  //  获取节点的marginY
  getMarginY(layerIndex) {
    const { themeConfig, opt } = this.mindMap
    const { second, node } = themeConfig
    const hoverRectPadding = opt.hoverRectPadding * 2
    return layerIndex === 1
      ? second.marginY + hoverRectPadding
      : node.marginY + hoverRectPadding
  }

  //  获取节点包括概要在内的宽度
  getNodeWidthWithGeneralization(node) {
    return Math.max(
      node.width,
      node.checkHasGeneralization() ? node._generalizationNodeWidth : 0
    )
  }

  //  获取节点包括概要在内的高度
  getNodeHeightWithGeneralization(node) {
    return Math.max(
      node.height,
      node.checkHasGeneralization() ? node._generalizationNodeHeight : 0
    )
  }

  //  获取节点的边界值
  /**
   * dir：生长方向，h（水平）、v（垂直）
   * isLeft：是否向左生长
   */
  getNodeBoundaries(node, dir) {
    let { generalizationLineMargin, generalizationNodeMargin } =
      this.mindMap.themeConfig
    let walk = root => {
      let _left = Infinity
      let _right = -Infinity
      let _top = Infinity
      let _bottom = -Infinity
      if (root.children && root.children.length > 0) {
        root.children.forEach(child => {
          let { left, right, top, bottom } = walk(child)
          // 概要内容的宽度
          let generalizationWidth =
            child.checkHasGeneralization() && child.getData('expand')
              ? child._generalizationNodeWidth + generalizationNodeMargin
              : 0
          // 概要内容的高度
          let generalizationHeight =
            child.checkHasGeneralization() && child.getData('expand')
              ? child._generalizationNodeHeight + generalizationNodeMargin
              : 0
          if (left - (dir === 'h' ? generalizationWidth : 0) < _left) {
            _left = left - (dir === 'h' ? generalizationWidth : 0)
          }
          if (right + (dir === 'h' ? generalizationWidth : 0) > _right) {
            _right = right + (dir === 'h' ? generalizationWidth : 0)
          }
          if (top < _top) {
            _top = top
          }
          if (bottom + (dir === 'v' ? generalizationHeight : 0) > _bottom) {
            _bottom = bottom + (dir === 'v' ? generalizationHeight : 0)
          }
        })
      }
      let cur = {
        left: root.left,
        right: root.left + root.width,
        top: root.top,
        bottom: root.top + root.height
      }
      return {
        left: cur.left < _left ? cur.left : _left,
        right: cur.right > _right ? cur.right : _right,
        top: cur.top < _top ? cur.top : _top,
        bottom: cur.bottom > _bottom ? cur.bottom : _bottom
      }
    }
    let { left, right, top, bottom } = walk(node)
    return {
      left,
      right,
      top,
      bottom,
      generalizationLineMargin,
      generalizationNodeMargin
    }
  }

  // 获取指定索引区间的子节点的边界范围
  getChildrenBoundaries(node, dir, startIndex = 0, endIndex) {
    let { generalizationLineMargin, generalizationNodeMargin } =
      this.mindMap.themeConfig
    const children = node.children.slice(startIndex, endIndex + 1)
    let left = Infinity
    let right = -Infinity
    let top = Infinity
    let bottom = -Infinity
    children.forEach(item => {
      const cur = this.getNodeBoundaries(item, dir)
      left = cur.left < left ? cur.left : left
      right = cur.right > right ? cur.right : right
      top = cur.top < top ? cur.top : top
      bottom = cur.bottom > bottom ? cur.bottom : bottom
    })
    return {
      left,
      right,
      top,
      bottom,
      generalizationLineMargin,
      generalizationNodeMargin
    }
  }

  // 获取节点概要的渲染边界
  getNodeGeneralizationRenderBoundaries(item, dir) {
    let res = null
    // 区间
    if (item.range) {
      res = this.getChildrenBoundaries(
        item.node,
        dir,
        item.range[0],
        item.range[1]
      )
    } else {
      // 整体概要
      res = this.getNodeBoundaries(item.node, dir)
    }
    return res
  }

  // 获取节点实际存在几个子节点
  getNodeActChildrenLength(node) {
    return node.nodeData.children && node.nodeData.children.length
  }

  // 设置连线样式
  setLineStyle(style, line, path, childNode) {
    line.plot(this.transformPath(path))
    style && style(line, childNode, true)
  }

  // 转换路径，可以转换成特殊风格的线条样式
  transformPath(path) {
    const { customTransformNodeLinePath } = this.mindMap.opt
    if (customTransformNodeLinePath) {
      return customTransformNodeLinePath(path)
    } else {
      return path
    }
  }
}

export default Base
