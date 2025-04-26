import btnsSvg from '../../../svg/btns'
import { SVG, Circle, G, Text } from '@svgdotjs/svg.js'
import { isUndef } from '../../../utils'

// 创建展开收起按钮的内容节点
function createExpandNodeContent() {
  if (this._openExpandNode) {
    return
  }
  const { expandBtnSize, expandBtnIcon, isShowExpandNum } = this.mindMap.opt
  let { close, open } = expandBtnIcon || {}
  // 根据配置判断是否显示数量按钮
  if (isShowExpandNum) {
    // 展开的节点
    this._openExpandNode = new Text()
    this._openExpandNode.addClass('smm-expand-btn-text')
    // 文本垂直居中
    this._openExpandNode.attr({
      'text-anchor': 'middle',
      'dominant-baseline': 'middle',
      x: expandBtnSize / 2,
      y: 2
    })
  } else {
    this._openExpandNode = SVG(open || btnsSvg.open).size(
      expandBtnSize,
      expandBtnSize
    )
    this._openExpandNode.x(0).y(-expandBtnSize / 2)
  }
  // 收起的节点
  this._closeExpandNode = SVG(close || btnsSvg.close).size(
    expandBtnSize,
    expandBtnSize
  )
  this._closeExpandNode.x(0).y(-expandBtnSize / 2)
  // 填充节点
  this._fillExpandNode = new Circle().size(expandBtnSize)
  this._fillExpandNode.x(0).y(-expandBtnSize / 2)

  // 设置样式
  this.style.iconBtn(
    this._openExpandNode,
    this._closeExpandNode,
    this._fillExpandNode
  )
}
function sumNode(data = []) {
  return data.reduce(
    (total, cur) => total + this.sumNode(cur.children || []),
    data.length
  )
}
//  创建或更新展开收缩按钮内容
function updateExpandBtnNode() {
  let { expand } = this.getData()
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

  if (this._expandBtn) {
    // 如果是收起按钮加上边框
    let { isShowExpandNum, expandBtnStyle, expandBtnNumHandler } =
      this.mindMap.opt
    if (isShowExpandNum) {
      if (!expand) {
        // 数字按钮添加边框
        this._fillExpandNode.stroke({
          color: expandBtnStyle.strokeColor
        })
        // 计算子节点数量
        let count = this.sumNode(this.nodeData.children || [])
        if (typeof expandBtnNumHandler === 'function') {
          const res = expandBtnNumHandler(count, this)
          if (!isUndef(res)) {
            count = res
          }
        }
        node.text(String(count))
      } else {
        this._fillExpandNode.stroke('none')
      }
    }
    this._expandBtn.add(this._fillExpandNode).add(node)
  }
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
  if (this.getChildrenLength() <= 0 || this.isRoot) {
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
      this.mindMap.execCommand('SET_NODE_EXPAND', this, !this.getData('expand'))
      this.mindMap.emit('expand_btn_click', this)
    })
    this._expandBtn.on('dblclick', e => {
      e.stopPropagation()
    })
    this._expandBtn.addClass('smm-expand-btn')
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
  const { alwaysShowExpandBtn, notShowExpandBtn } = this.mindMap.opt
  if (alwaysShowExpandBtn || notShowExpandBtn) return
  setTimeout(() => {
    this.renderExpandBtn()
  }, 0)
}

// 隐藏展开收起按钮
function hideExpandBtn() {
  const { alwaysShowExpandBtn, notShowExpandBtn } = this.mindMap.opt
  if (alwaysShowExpandBtn || this._isMouseenter || notShowExpandBtn) return
  // 非激活状态且展开状态鼠标移出才隐藏按钮
  let { isActive, expand } = this.getData()
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
  hideExpandBtn,
  sumNode
}
