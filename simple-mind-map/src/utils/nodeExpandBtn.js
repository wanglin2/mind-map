import btnsSvg from '../svg/btns'
import { SVG, Circle, G } from '@svgdotjs/svg.js'

//  创建或更新展开收缩按钮内容
function updateExpandBtnNode() {
  if (this._expandBtn) {
    this._expandBtn.clear()
  }
  let iconSvg
  if (this.nodeData.data.expand === false) {
    iconSvg = btnsSvg.open
  } else {
    iconSvg = btnsSvg.close
  }
  let node = SVG(iconSvg).size(this.expandBtnSize, this.expandBtnSize)
  let fillNode = new Circle().size(this.expandBtnSize)
  node.x(0).y(-this.expandBtnSize / 2)
  fillNode.x(0).y(-this.expandBtnSize / 2)
  this.style.iconBtn(node, fillNode)
  if (this._expandBtn) this._expandBtn.add(fillNode).add(node)
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
    this.group.add(this._expandBtn)
  }
  this.updateExpandBtnNode()
  this.updateExpandBtnPos()
}

//  移除展开收缩按钮
function removeExpandBtn() {
  if (this._expandBtn) {
    this._expandBtn.remove()
  }
}

export default {
    updateExpandBtnNode,
    updateExpandBtnPos,
    renderExpandBtn,
    removeExpandBtn
}