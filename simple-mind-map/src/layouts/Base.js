import Node from '../core/render/node/Node'
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
    // 记录所有渲染时的节点
    this.lru.add(uid, node)
  }

  // 检查当前来源是否需要重新计算节点大小
  checkIsNeedResizeSources() {
    return [
      CONSTANTS.CHANGE_THEME,
      CONSTANTS.TRANSFORM_TO_NORMAL_NODE
    ].includes(this.renderer.renderSource)
  }

  // 层级类型改变
  checkIsLayerTypeChange(oldIndex, newIndex) {
    if (oldIndex >= 2 && newIndex >= 2) return false
    if (oldIndex >= 2 && newIndex < 2) return true
    if (oldIndex < 2 && newIndex >= 2) return true
  }

  // 检查是否是结构布局改变重新渲染展开收起按钮占位元素
  checkIsLayoutChangeRerenderExpandBtnPlaceholderRect(node) {
    if (this.renderer.renderSource === CONSTANTS.CHANGE_LAYOUT) {
      node.needRerenderExpandBtnPlaceholderRect = true
    }
  }

  //  创建节点实例
  createNode(data, parent, isRoot, layerIndex) {
    // 创建节点
    let newNode = null
    // 数据上保存了节点引用，那么直接复用节点
    if (data && data._node && !this.renderer.reRender) {
      newNode = data._node
      let isLayerTypeChange = this.checkIsLayerTypeChange(
        newNode.layerIndex,
        layerIndex
      )
      newNode.reset()
      newNode.layerIndex = layerIndex
      this.cacheNode(data._node.uid, newNode)
      this.checkIsLayoutChangeRerenderExpandBtnPlaceholderRect(newNode)
      // 主题或主题配置改变了需要重新计算节点大小和布局
      if (this.checkIsNeedResizeSources() || isLayerTypeChange) {
        newNode.getSize()
        newNode.needLayout = true
      }
    } else if (this.lru.has(data.data.uid) && !this.renderer.reRender) {
      // 数据上没有保存节点引用，但是通过uid找到了缓存的节点，也可以复用
      newNode = this.lru.get(data.data.uid)
      // 保存该节点上一次的数据
      let lastData = JSON.stringify(newNode.getData())
      let isLayerTypeChange = this.checkIsLayerTypeChange(
        newNode.layerIndex,
        layerIndex
      )
      newNode.reset()
      newNode.nodeData = newNode.handleData(data || {})
      newNode.layerIndex = layerIndex
      this.cacheNode(data.data.uid, newNode)
      this.checkIsLayoutChangeRerenderExpandBtnPlaceholderRect(newNode)
      data._node = newNode
      // 主题或主题配置改变了需要重新计算节点大小和布局
      let isResizeSource = this.checkIsNeedResizeSources()
      // 节点数据改变了需要重新计算节点大小和布局
      let isNodeDataChange = lastData !== JSON.stringify(data.data)
      if (isResizeSource || isNodeDataChange || isLayerTypeChange) {
        newNode.getSize()
        newNode.needLayout = true
      }
    } else {
      // 创建新节点
      let uid = data.data.uid || createUid()
      newNode = new Node({
        data,
        uid,
        renderer: this.renderer,
        mindMap: this.mindMap,
        draw: this.draw,
        layerIndex
      })
      // uid保存到数据上，为了节点复用
      data.data.uid = uid
      this.cacheNode(uid, newNode)
      // 数据关联实际节点
      data._node = newNode
      if (data.data.isActive) {
        this.renderer.addNodeToActiveList(newNode)
      }
    }
    // 如果当前节点在激活节点列表里，那么添加上激活的状态
    if (this.mindMap.renderer.findActiveNodeIndex(newNode) !== -1) {
      newNode.setData({
        isActive: true
      })
    }
    // 根节点
    if (isRoot) {
      newNode.isRoot = true
      this.root = newNode
    } else {
      // 互相收集
      newNode.parent = parent._node
      parent._node.addChildren(newNode)
    }
    return newNode
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

  //  定位节点到画布中间
  setNodeCenter(node) {
    let { initRootNodePosition } = this.mindMap.opt
    let { CENTER } = CONSTANTS.INIT_ROOT_NODE_POSITION
    if (
      !initRootNodePosition ||
      !Array.isArray(initRootNodePosition) ||
      initRootNodePosition.length < 2
    ) {
      initRootNodePosition = [CENTER, CENTER]
    }
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
  quadraticCurvePath(x1, y1, x2, y2) {
    let cx = x1 + (x2 - x1) * 0.2
    let cy = y1 + (y2 - y1) * 0.8
    return `M ${x1},${y1} Q ${cx},${cy} ${x2},${y2}`
  }

  //  三次贝塞尔曲线
  cubicBezierPath(x1, y1, x2, y2) {
    let cx1 = x1 + (x2 - x1) / 2
    let cy1 = y1
    let cx2 = cx1
    let cy2 = y2
    return `M ${x1},${y1} C ${cx1},${cy1} ${cx2},${cy2} ${x2},${y2}`
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
}

export default Base
