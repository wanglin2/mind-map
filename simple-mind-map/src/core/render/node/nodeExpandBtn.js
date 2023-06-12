import btnsSvg from '../../../svg/btns'
import { SVG, Circle, G } from '@svgdotjs/svg.js'

// 创建展开收起按钮的内容节点
function createExpandNodeContent() {
  if (this._openExpandNode) {
    return
  }
  let { open, close } = this.mindMap.opt.expandBtnIcon || {}
  // 展开的节点
  this._openExpandNode = SVG(open || btnsSvg.open).size(
    this.expandBtnSize,
    this.expandBtnSize
  )
  this._openExpandNode.x(0).y(-this.expandBtnSize / 2)
  // 收起的节点
  this._closeExpandNode = SVG(close || btnsSvg.close).size(
    this.expandBtnSize,
    this.expandBtnSize
  )
  this._closeExpandNode.x(0).y(-this.expandBtnSize / 2)
  // 填充节点
  this._fillExpandNode = new Circle().size(this.expandBtnSize)
  this._fillExpandNode.x(0).y(-this.expandBtnSize / 2)
  // 设置样式
  this.style.iconBtn(
    this._openExpandNode,
    this._closeExpandNode,
    this._fillExpandNode
  )
}

//  创建或更新展开收缩按钮内容
function updateExpandBtnNode() {
  let { expand } = this.nodeData.data
  // 如果本次和上次的展开状态一样则返回
  if (expand === this._lastExpandBtnType) return
  if (this._expandBtn) {
    this._expandBtn.clear()
  }
  this.createExpandNodeContent()
  let node
  if (expand === false) {
    node = this._openExpandNode
    this._lastExpandBtnType = false
  } else {
    node = this._closeExpandNode
    this._lastExpandBtnType = true
  }
  if (this._expandBtn) this._expandBtn.add(this._fillExpandNode).add(node)
}

//  更新展开收缩按钮位置
function updateExpandBtnPos() {
  if (!this._expandBtn) {
    return
  }
  this.renderer.layout.renderExpandBtn(this, this._expandBtn)
}

//  创建展开收缩按钮
function renderExpandBtn() {
  if (
    !this.nodeData.children ||
    this.nodeData.children.length <= 0 ||
    this.isRoot
  ) {
    return
  }
  if (this._expandBtn) {
    this.group.add(this._expandBtn)
  } else {
    this._expandBtn = new G()
    this._expandBtn.on('mouseover', e => {
      e.stopPropagation()
      this._expandBtn.css({
        cursor: 'pointer'
      })
    })
    this._expandBtn.on('mouseout', e => {
      e.stopPropagation()
      this._expandBtn.css({
        cursor: 'auto'
      })
    })
    this._expandBtn.on('click', e => {
      e.stopPropagation()
      // 展开收缩
      this.mindMap.execCommand(
        'SET_NODE_EXPAND',
        this,
        !this.nodeData.data.expand
      )
      this.mindMap.emit('expand_btn_click', this)
    })
    this._expandBtn.on('dblclick', e => {
      e.stopPropagation()
    })
    this.group.add(this._expandBtn)
  }
  this._showExpandBtn = true
  this.updateExpandBtnNode()
  this.updateExpandBtnPos()
}

//  移除展开收缩按钮
function removeExpandBtn() {
  if (this._expandBtn && this._showExpandBtn) {
    this._expandBtn.remove()
    this._showExpandBtn = false
  }
}

// 显示展开收起按钮
function showExpandBtn() {
  if (this.mindMap.opt.alwaysShowExpandBtn) return
  setTimeout(() => {
    this.renderExpandBtn()
  }, 0)
}

// 隐藏展开收起按钮
function hideExpandBtn() {
  if (this.mindMap.opt.alwaysShowExpandBtn || this._isMouseenter) return
  // 非激活状态且展开状态鼠标移出才隐藏按钮
  let { isActive, expand } = this.nodeData.data
  if (!isActive && expand) {
    setTimeout(() => {
      this.removeExpandBtn()
    }, 0)
  }
}

export default {
  createExpandNodeContent,
  updateExpandBtnNode,
  updateExpandBtnPos,
  renderExpandBtn,
  removeExpandBtn,
  showExpandBtn,
  hideExpandBtn
}
