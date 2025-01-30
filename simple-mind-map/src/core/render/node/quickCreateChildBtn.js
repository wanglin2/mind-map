import btnsSvg from '../../../svg/btns'
import { SVG, Circle, G } from '@svgdotjs/svg.js'

function initQuickCreateChildBtn() {
  if (this.isGeneralization) return
  this._quickCreateChildBtn = null
  this._showQuickCreateChildBtn = false
}

// 显示按钮
function showQuickCreateChildBtn() {
  if (this.isGeneralization || this.getChildrenLength() > 0) return
  // 创建按钮
  if (this._quickCreateChildBtn) {
    this.group.add(this._quickCreateChildBtn)
  } else {
    const { quickCreateChildBtnIcon, expandBtnStyle, expandBtnSize } =
      this.mindMap.opt
    const { icon, style } = quickCreateChildBtnIcon
    let { color, fill } = expandBtnStyle || {
      color: '#808080',
      fill: '#fff'
    }
    color = style.color || color
    // 图标节点
    const iconNode = SVG(icon || btnsSvg.quickCreateChild).size(
      expandBtnSize,
      expandBtnSize
    )
    iconNode.css({
      cursor: 'pointer'
    })
    iconNode.x(0).y(-expandBtnSize / 2)
    this.style.iconNode(iconNode, color)
    // 填充节点
    const fillNode = new Circle().size(expandBtnSize)
    fillNode.x(0).y(-expandBtnSize / 2)
    fillNode.fill({ color: fill }).css({
      cursor: 'pointer'
    })
    // 容器节点
    this._quickCreateChildBtn = new G()
    this._quickCreateChildBtn.add(fillNode).add(iconNode)
    this._quickCreateChildBtn.on('click', e => {
      e.stopPropagation()
      this.mindMap.emit('quick_create_btn_click', this)
      const { customQuickCreateChildBtnClick } = this.mindMap.opt
      if (typeof customQuickCreateChildBtnClick === 'function') {
        customQuickCreateChildBtnClick(this)
        return
      }
      this.mindMap.execCommand('INSERT_CHILD_NODE', true, [this])
    })
    this._quickCreateChildBtn.on('dblclick', e => {
      e.stopPropagation()
    })
    this._quickCreateChildBtn.addClass('smm-quick-create-child-btn')
    this.group.add(this._quickCreateChildBtn)
  }
  this._showQuickCreateChildBtn = true
  // 更新按钮
  this.renderer.layout.renderExpandBtn(this, this._quickCreateChildBtn)
}

//  移除按钮
function removeQuickCreateChildBtn() {
  if (this.isGeneralization) return
  if (this._quickCreateChildBtn && this._showQuickCreateChildBtn) {
    this._quickCreateChildBtn.remove()
    this._showQuickCreateChildBtn = false
  }
}

// 隐藏按钮
function hideQuickCreateChildBtn() {
  if (this.isGeneralization) return
  const { isActive } = this.getData()
  if (!isActive) {
    this.removeQuickCreateChildBtn()
  }
}

export default {
  initQuickCreateChildBtn,
  showQuickCreateChildBtn,
  removeQuickCreateChildBtn,
  hideQuickCreateChildBtn
}
