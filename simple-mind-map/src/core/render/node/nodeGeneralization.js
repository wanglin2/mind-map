import Node from './Node'

//  检查是否存在概要
function checkHasGeneralization () {
  return !!this.nodeData.data.generalization
}

//  创建概要节点
function createGeneralizationNode () {
  if (this.isGeneralization || !this.checkHasGeneralization()) {
    return
  }
  if (!this._generalizationLine) {
    this._generalizationLine = this.draw.path()
  }
  if (!this._generalizationNode) {
    this._generalizationNode = new Node({
      data: {
        data: this.nodeData.data.generalization
      },
      uid: this.mindMap.uid++,
      renderer: this.renderer,
      mindMap: this.mindMap,
      draw: this.draw,
      isGeneralization: true
    })
    this._generalizationNodeWidth = this._generalizationNode.width
    this._generalizationNodeHeight = this._generalizationNode.height
    this._generalizationNode.generalizationBelongNode = this
    if (this.nodeData.data.generalization.isActive) {
      this.renderer.addActiveNode(this._generalizationNode)
    }
  }
}

//  更新概要节点
function updateGeneralization () {
  this.removeGeneralization()
  this.createGeneralizationNode()
}

//  渲染概要节点
function renderGeneralization () {
  if (this.isGeneralization) {
    return
  }
  if (!this.checkHasGeneralization()) {
    this.removeGeneralization()
    this._generalizationNodeWidth = 0
    this._generalizationNodeHeight = 0
    return
  }
  if (this.nodeData.data.expand === false) {
    this.removeGeneralization()
    return
  }
  this.createGeneralizationNode()
  this.renderer.layout.renderGeneralization(
    this,
    this._generalizationLine,
    this._generalizationNode
  )
  this.style.generalizationLine(this._generalizationLine)
  this._generalizationNode.render()
}

//  删除概要节点
function removeGeneralization () {
  if (this._generalizationLine) {
    this._generalizationLine.remove()
    this._generalizationLine = null
  }
  if (this._generalizationNode) {
    // 删除概要节点时要同步从激活节点里删除
    this.renderer.removeActiveNode(this._generalizationNode)
    this._generalizationNode.remove()
    this._generalizationNode = null
  }
  // hack修复当激活一个节点时创建概要，然后立即激活创建的概要节点后会重复创建概要节点并且无法删除的问题
  if (this.generalizationBelongNode) {
    this.draw
      .find('.generalization_' + this.generalizationBelongNode.uid)
      .remove()
  }
}

//  隐藏概要节点
function hideGeneralization () {
  if (this._generalizationLine) {
    this._generalizationLine.hide()
  }
  if (this._generalizationNode) {
    this._generalizationNode.hide()
  }
}

//  显示概要节点
function showGeneralization () {
  if (this._generalizationLine) {
    this._generalizationLine.show()
  }
  if (this._generalizationNode) {
    this._generalizationNode.show()
  }
}

export default {
    checkHasGeneralization,
    createGeneralizationNode,
    updateGeneralization,
    renderGeneralization,
    removeGeneralization,
    hideGeneralization,
    showGeneralization
}