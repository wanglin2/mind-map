import Node from '../Node'
import { CONSTANTS } from '../utils/constant'

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
    // 根节点
    this.root = null
    // 保存所有uid和节点，用于复用
    this.nodePool = {}
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
    this.nodePool[uid] = node
    // 如果总缓存数量达到1000，直接清空
    if (Object.keys(this.nodePool).length > 1000) {
      this.nodePool = {}
    }
  }

  // 检查当前来源是否需要重新计算节点大小
  checkIsNeedResizeSources() {
    return [CONSTANTS.CHANGE_THEME, CONSTANTS.TRANSFORM_TO_NORMAL_NODE].includes(this.renderer.renderSource)
  }

  //  创建节点实例
  createNode(data, parent, isRoot, layerIndex) {
    // 创建节点
    let newNode = null
    // 数据上保存了节点引用，那么直接复用节点
    if (data && data._node && !this.renderer.reRender) {
      newNode = data._node
      newNode.reset()
      newNode.layerIndex = layerIndex
      this.cacheNode(data._node.uid, newNode)
      // 主题或主题配置改变了需要重新计算节点大小和布局
      if (this.checkIsNeedResizeSources()) {
        newNode.getSize()
        newNode.needLayout = true
      }
    } else if (this.nodePool[data.data.uid]) {
      // 数据上没有保存节点引用，但是通过uid找到了缓存的节点，也可以复用
      newNode = this.nodePool[data.data.uid]
      // 保存该节点上一次的数据
      let lastData = JSON.stringify(newNode.nodeData.data)
      newNode.reset()
      newNode.nodeData = newNode.handleData(data || {})
      newNode.layerIndex = layerIndex
      this.cacheNode(data.data.uid, newNode)
      data._node = newNode
      // 主题或主题配置改变了需要重新计算节点大小和布局
      let isResizeSource = this.checkIsNeedResizeSources()
      // 节点数据改变了需要重新计算节点大小和布局
      let isNodeDataChange = lastData !== JSON.stringify(data.data)
      if (isResizeSource || isNodeDataChange) {
        newNode.getSize()
        newNode.needLayout = true
      }
    } else {
      // 创建新节点
      let uid = this.mindMap.uid++
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
        this.renderer.addActiveNode(newNode)
      }
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

  //  定位节点到画布中间
  setNodeCenter(node) {
    node.left = (this.mindMap.width - node.width) / 2
    node.top = (this.mindMap.height - node.height) / 2
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
    return layerIndex === 1
      ? this.mindMap.themeConfig.second.marginX
      : this.mindMap.themeConfig.node.marginX
  }

  //  获取节点的marginY
  getMarginY(layerIndex) {
    return layerIndex === 1
      ? this.mindMap.themeConfig.second.marginY
      : this.mindMap.themeConfig.node.marginY
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
            child.checkHasGeneralization() && child.nodeData.data.expand
              ? child._generalizationNodeWidth + generalizationNodeMargin
              : 0
          // 概要内容的高度
          let generalizationHeight =
            child.checkHasGeneralization() && child.nodeData.data.expand
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
}

export default Base
