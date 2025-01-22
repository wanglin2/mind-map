import { Rect } from '@svgdotjs/svg.js'

// 渲染展开收起按钮的隐藏占位元素
function renderExpandBtnPlaceholderRect() {
  // 根节点或没有子节点不需要渲染
  if (this.getChildrenLength() <= 0 || this.isRoot) {
    return
  }
  // 默认显示展开按钮的情况下或不显示展开收起按钮的情况下不需要渲染
  const { alwaysShowExpandBtn, notShowExpandBtn, expandBtnSize } =
    this.mindMap.opt
  if (!alwaysShowExpandBtn && !notShowExpandBtn) {
    let { width, height } = this
    if (!this._unVisibleRectRegionNode) {
      this._unVisibleRectRegionNode = new Rect()
      this._unVisibleRectRegionNode.fill({
        color: 'transparent'
      })
    }
    this.group.add(this._unVisibleRectRegionNode)
    this.renderer.layout.renderExpandBtnRect(
      this._unVisibleRectRegionNode,
      expandBtnSize,
      width,
      height,
      this
    )
  }
}

// 删除展开收起按钮的隐藏占位元素
function clearExpandBtnPlaceholderRect() {
  if (!this._unVisibleRectRegionNode) {
    return
  }
  this._unVisibleRectRegionNode.remove()
  this._unVisibleRectRegionNode = null
}

// 更新展开收起按钮的隐藏占位元素
function updateExpandBtnPlaceholderRect() {
  // 布局改变需要重新渲染
  if (this.needRerenderExpandBtnPlaceholderRect) {
    this.needRerenderExpandBtnPlaceholderRect = false
    this.renderExpandBtnPlaceholderRect()
  }
  // 没有子节点到有子节点需要渲染
  if (this.getChildrenLength() > 0) {
    if (!this._unVisibleRectRegionNode) {
      this.renderExpandBtnPlaceholderRect()
    }
  } else {
    // 有子节点到没子节点，需要删除
    if (this._unVisibleRectRegionNode) {
      this.clearExpandBtnPlaceholderRect()
    }
  }
}

export default {
  renderExpandBtnPlaceholderRect,
  clearExpandBtnPlaceholderRect,
  updateExpandBtnPlaceholderRect
}
