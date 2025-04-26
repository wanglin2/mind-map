import MindMapNode from './MindMapNode'
import { createUid } from '../../../utils/index'

// 获取节点概要数据
function formatGetGeneralization() {
  const data = this.getData('generalization')
  return Array.isArray(data) ? data : data ? [data] : []
}

//  检查是否存在概要
function checkHasGeneralization() {
  return this.formatGetGeneralization().length > 0
}

//  检查是否存在自身的概要，非子节点区间
function checkHasSelfGeneralization() {
  const list = this.formatGetGeneralization()
  return !!list.find(item => {
    return !item.range || item.range.length <= 0
  })
}

// 获取概要节点所在的概要列表里的索引
function getGeneralizationNodeIndex(node) {
  return this._generalizationList.findIndex(item => {
    return item.generalizationNode.uid === node.uid
  })
}

//  创建概要节点
function createGeneralizationNode() {
  if (this.isGeneralization || !this.checkHasGeneralization()) {
    return
  }
  let maxWidth = 0
  let maxHeight = 0
  const list = this.formatGetGeneralization()
  list.forEach((item, index) => {
    let cur = this._generalizationList[index]
    if (!cur) {
      cur = this._generalizationList[index] = {}
    }
    // 所属节点
    cur.node = this
    // 区间范围
    cur.range = item.range
    // 线和节点
    if (!cur.generalizationLine) {
      cur.generalizationLine = this.lineDraw.path()
    }
    if (!cur.generalizationNode) {
      cur.generalizationNode = new MindMapNode({
        data: {
          inserting: item.inserting,
          data: item
        },
        uid: createUid(),
        renderer: this.renderer,
        mindMap: this.mindMap,
        isGeneralization: true
      })
    }
    delete item.inserting
    // 关联所属节点
    cur.generalizationNode.generalizationBelongNode = this
    // 大小
    if (cur.generalizationNode.width > maxWidth)
      maxWidth = cur.generalizationNode.width
    if (cur.generalizationNode.height > maxHeight)
      maxHeight = cur.generalizationNode.height
    // 如果该概要为激活状态，那么加入激活节点列表
    if (item.isActive) {
      this.renderer.addNodeToActiveList(cur.generalizationNode)
    }
  })
  this._generalizationNodeWidth = maxWidth
  this._generalizationNodeHeight = maxHeight
}

//  更新概要节点
function updateGeneralization() {
  if (this.isGeneralization) return
  this.removeGeneralization()
  this.createGeneralizationNode()
}

//  渲染概要节点
function renderGeneralization(forceRender) {
  if (this.isGeneralization) return
  this.updateGeneralizationData()
  const list = this.formatGetGeneralization()
  if (list.length <= 0 || this.getData('expand') === false) {
    this.removeGeneralization()
    return
  }
  if (list.length !== this._generalizationList.length) {
    this.removeGeneralization()
  }
  this.createGeneralizationNode()
  this.renderer.layout.renderGeneralization(this._generalizationList)
  this._generalizationList.forEach(item => {
    this.style.generalizationLine(item.generalizationLine)
    item.generalizationNode.render(() => {}, forceRender)
  })
}

// 更新节点概要数据
function updateGeneralizationData() {
  const childrenLength = this.getChildrenLength()
  const list = this.formatGetGeneralization()
  const newList = []
  list.forEach(item => {
    if (!item.range) {
      newList.push(item)
      return
    }
    if (
      item.range.length > 0 &&
      item.range[0] <= childrenLength - 1 &&
      item.range[1] <= childrenLength - 1
    ) {
      newList.push(item)
    }
  })
  if (newList.length !== list.length) {
    this.setData({
      generalization: newList
    })
  }
}

//  删除概要节点
function removeGeneralization() {
  if (this.isGeneralization) return
  this._generalizationList.forEach(item => {
    item.generalizationNode.style.onRemove()
    if (item.generalizationLine) {
      item.generalizationLine.remove()
      item.generalizationLine = null
    }
    if (item.generalizationNode) {
      // 删除概要节点时要同步从激活节点里删除
      this.renderer.removeNodeFromActiveList(item.generalizationNode)
      item.generalizationNode.remove()
      item.generalizationNode = null
    }
  })
  this._generalizationList = []
  // hack修复当激活一个节点时创建概要，然后立即激活创建的概要节点后会重复创建概要节点并且无法删除的问题
  if (this.generalizationBelongNode) {
    this.nodeDraw
      .find('.generalization_' + this.generalizationBelongNode.uid)
      .remove()
  }
}

//  隐藏概要节点
function hideGeneralization() {
  if (this.isGeneralization) return
  this._generalizationList.forEach(item => {
    if (item.generalizationLine) item.generalizationLine.hide()
    if (item.generalizationNode) item.generalizationNode.hide()
  })
}

//  显示概要节点
function showGeneralization() {
  if (this.isGeneralization) return
  this._generalizationList.forEach(item => {
    if (item.generalizationLine) item.generalizationLine.show()
    if (item.generalizationNode) item.generalizationNode.show()
  })
}

// 设置概要节点的透明度
function setGeneralizationOpacity(val) {
  this._generalizationList.forEach(item => {
    item.generalizationLine.opacity(val)
    item.generalizationNode.group.opacity(val)
  })
}

// 处理概要节点鼠标移入事件
function handleGeneralizationMouseenter() {
  const belongNode = this.generalizationBelongNode
  const list = belongNode.formatGetGeneralization()
  const index = belongNode.getGeneralizationNodeIndex(this)
  const generalizationData = list[index]
  // 如果主题中设置了hoverRectColor颜色，那么使用该颜色
  // 否则使用hoverRectColor实例化选项的颜色
  // 兜底使用highlightNode方法的默认颜色
  const hoverRectColor = this.getStyle('hoverRectColor')
  const color = hoverRectColor || this.mindMap.opt.hoverRectColor
  const style = color
    ? {
        stroke: color
      }
    : null
  // 区间概要，框子节点
  if (
    Array.isArray(generalizationData.range) &&
    generalizationData.range.length > 0
  ) {
    this.mindMap.renderer.highlightNode(
      belongNode,
      generalizationData.range,
      style
    )
  } else {
    // 否则框自己
    this.mindMap.renderer.highlightNode(belongNode, null, style)
  }
}

// 处理概要节点鼠标移出事件
function handleGeneralizationMouseleave() {
  this.mindMap.renderer.closeHighlightNode()
}

export default {
  formatGetGeneralization,
  checkHasGeneralization,
  checkHasSelfGeneralization,
  getGeneralizationNodeIndex,
  createGeneralizationNode,
  updateGeneralization,
  updateGeneralizationData,
  renderGeneralization,
  removeGeneralization,
  hideGeneralization,
  showGeneralization,
  setGeneralizationOpacity,
  handleGeneralizationMouseenter,
  handleGeneralizationMouseleave
}
