import Style from './Style'
import Shape from './Shape'
import { G, ForeignObject, Rect } from '@svgdotjs/svg.js'
import nodeGeneralizationMethods from './nodeGeneralization'
import nodeExpandBtnMethods from './nodeExpandBtn'
import nodeCommandWrapsMethods from './nodeCommandWraps'
import nodeCreateContentsMethods from './nodeCreateContents'
import nodeExpandBtnPlaceholderRectMethods from './nodeExpandBtnPlaceholderRect'
import nodeCooperateMethods from './nodeCooperate'
import { CONSTANTS } from '../../../constants/constant'
import { copyNodeTree } from '../../../utils/index'

//  节点类
class Node {
  //  构造函数
  constructor(opt = {}) {
    // 节点数据
    this.nodeData = this.handleData(opt.data || {})
    // uid
    this.uid = opt.uid
    // 控制实例
    this.mindMap = opt.mindMap
    // 渲染实例
    this.renderer = opt.renderer
    // 渲染器
    this.draw = this.mindMap.draw
    this.nodeDraw = this.mindMap.nodeDraw
    this.lineDraw = this.mindMap.lineDraw
    // 样式实例
    this.style = new Style(this)
    // 形状实例
    this.shapeInstance = new Shape(this)
    this.shapePadding = {
      paddingX: 0,
      paddingY: 0
    }
    // 是否是根节点
    this.isRoot = opt.isRoot === undefined ? false : opt.isRoot
    // 是否是概要节点
    this.isGeneralization =
      opt.isGeneralization === undefined ? false : opt.isGeneralization
    this.generalizationBelongNode = null
    // 节点层级
    this.layerIndex = opt.layerIndex === undefined ? 0 : opt.layerIndex
    // 节点宽
    this.width = opt.width || 0
    // 节点高
    this.height = opt.height || 0
    // left
    this._left = opt.left || 0
    // top
    this._top = opt.top || 0
    // 自定义位置
    this.customLeft = opt.data.data.customLeft || undefined
    this.customTop = opt.data.data.customTop || undefined
    // 是否正在拖拽中
    this.isDrag = false
    // 父节点
    this.parent = opt.parent || null
    // 子节点
    this.children = opt.children || []
    // 当前同时操作该节点的用户列表
    this.userList = []
    // 节点内容的容器
    this.group = null
    this.shapeNode = null // 节点形状节点
    this.hoverNode = null // 节点hover和激活的节点
    // 节点内容对象
    this._customNodeContent = null
    this._imgData = null
    this._iconData = null
    this._textData = null
    this._hyperlinkData = null
    this._tagData = null
    this._noteData = null
    this.noteEl = null
    this.noteContentIsShow = false
    this._expandBtn = null
    this._lastExpandBtnType = null
    this._showExpandBtn = false
    this._openExpandNode = null
    this._closeExpandNode = null
    this._fillExpandNode = null
    this._userListGroup = null
    this._lines = []
    this._generalizationList = []
    this._unVisibleRectRegionNode = null
    this._isMouseenter = false
    // 尺寸信息
    this._rectInfo = {
      imgContentWidth: 0,
      imgContentHeight: 0,
      textContentWidth: 0,
      textContentHeight: 0
    }
    // 概要节点的宽高
    this._generalizationNodeWidth = 0
    this._generalizationNodeHeight = 0
    // 各种文字信息的间距
    this.textContentItemMargin = this.mindMap.opt.textContentMargin
    // 图片和文字节点的间距
    this.blockContentMargin = this.mindMap.opt.imgTextMargin
    // 展开收缩按钮尺寸
    this.expandBtnSize = this.mindMap.opt.expandBtnSize
    // 是否是多选节点
    this.isMultipleChoice = false
    // 是否需要重新layout
    this.needLayout = false
    // 当前是否是隐藏状态
    this.isHide = false
    // 概要相关方法
    Object.keys(nodeGeneralizationMethods).forEach(item => {
      this[item] = nodeGeneralizationMethods[item].bind(this)
    })
    // 展开收起按钮相关方法
    Object.keys(nodeExpandBtnMethods).forEach(item => {
      this[item] = nodeExpandBtnMethods[item].bind(this)
    })
    // 展开收起按钮占位元素相关方法
    Object.keys(nodeExpandBtnPlaceholderRectMethods).forEach(item => {
      this[item] = nodeExpandBtnPlaceholderRectMethods[item].bind(this)
    })
    // 命令的相关方法
    Object.keys(nodeCommandWrapsMethods).forEach(item => {
      this[item] = nodeCommandWrapsMethods[item].bind(this)
    })
    // 创建节点内容的相关方法
    Object.keys(nodeCreateContentsMethods).forEach(item => {
      this[item] = nodeCreateContentsMethods[item].bind(this)
    })
    // 协同相关
    if (this.mindMap.cooperate) {
      Object.keys(nodeCooperateMethods).forEach(item => {
        this[item] = nodeCooperateMethods[item].bind(this)
      })
    }
    // 初始化
    this.getSize()
  }

  // 支持自定义位置
  get left() {
    return this.customLeft || this._left
  }

  set left(val) {
    this._left = val
  }

  get top() {
    return this.customTop || this._top
  }

  set top(val) {
    this._top = val
  }

  //  复位部分布局时会重新设置的数据
  reset() {
    this.children = []
    this.parent = null
    this.isRoot = false
    this.layerIndex = 0
    this.left = 0
    this.top = 0
  }

  //  处理数据
  handleData(data) {
    data.data.expand = data.data.expand === false ? false : true
    data.data.isActive = data.data.isActive === true ? true : false
    data.children = data.children || []
    return data
  }

  //  创建节点的各个内容对象数据
  createNodeData() {
    // 自定义节点内容
    let { isUseCustomNodeContent, customCreateNodeContent } = this.mindMap.opt
    if (isUseCustomNodeContent && customCreateNodeContent) {
      this._customNodeContent = customCreateNodeContent(this)
      this._customNodeContent.setAttribute('xmlns', 'http://www.w3.org/1999/xhtml')
    }
    // 如果没有返回内容，那么还是使用内置的节点内容
    if (this._customNodeContent) return
    this._imgData = this.createImgNode()
    this._iconData = this.createIconNode()
    this._textData = this.createTextNode()
    this._hyperlinkData = this.createHyperlinkNode()
    this._tagData = this.createTagNode()
    this._noteData = this.createNoteNode()
  }

  //  计算节点的宽高
  getSize() {
    this.updateGeneralization()
    this.createNodeData()
    let { width, height } = this.getNodeRect()
    // 判断节点尺寸是否有变化
    let changed = this.width !== width || this.height !== height
    this.width = width
    this.height = height
    return changed
  }

  //  计算节点尺寸信息
  getNodeRect() {
    // 自定义节点内容
    if (this.isUseCustomNodeContent()) {
      let rect = this.measureCustomNodeContentSize(this._customNodeContent)
      return {
        width: rect.width,
        height: rect.height
      }
    }
    // 宽高
    let imgContentWidth = 0
    let imgContentHeight = 0
    let textContentWidth = 0
    let textContentHeight = 0
    // 存在图片
    if (this._imgData) {
      this._rectInfo.imgContentWidth = imgContentWidth = this._imgData.width
      this._rectInfo.imgContentHeight = imgContentHeight = this._imgData.height
    }
    // 图标
    if (this._iconData.length > 0) {
      textContentWidth += this._iconData.reduce((sum, cur) => {
        textContentHeight = Math.max(textContentHeight, cur.height)
        return (sum += cur.width + this.textContentItemMargin)
      }, 0)
    }
    // 文字
    if (this._textData) {
      textContentWidth += this._textData.width
      textContentHeight = Math.max(textContentHeight, this._textData.height)
    }
    // 超链接
    if (this._hyperlinkData) {
      textContentWidth += this._hyperlinkData.width
      textContentHeight = Math.max(
        textContentHeight,
        this._hyperlinkData.height
      )
    }
    // 标签
    if (this._tagData.length > 0) {
      textContentWidth += this._tagData.reduce((sum, cur) => {
        textContentHeight = Math.max(textContentHeight, cur.height)
        return (sum += cur.width + this.textContentItemMargin)
      }, 0)
    }
    // 备注
    if (this._noteData) {
      textContentWidth += this._noteData.width
      textContentHeight = Math.max(textContentHeight, this._noteData.height)
    }
    // 文字内容部分的尺寸
    this._rectInfo.textContentWidth = textContentWidth
    this._rectInfo.textContentHeight = textContentHeight
    // 间距
    let margin =
      imgContentHeight > 0 && textContentHeight > 0
        ? this.blockContentMargin
        : 0
    let { paddingX, paddingY } = this.getPaddingVale()
    // 纯内容宽高
    let _width = Math.max(imgContentWidth, textContentWidth)
    let _height = imgContentHeight + textContentHeight
    // 计算节点形状需要的附加内边距
    let { paddingX: shapePaddingX, paddingY: shapePaddingY } =
      this.shapeInstance.getShapePadding(_width, _height, paddingX, paddingY)
    this.shapePadding.paddingX = shapePaddingX
    this.shapePadding.paddingY = shapePaddingY
    // 边框宽度，因为边框是以中线向两端发散，所以边框会超出节点
    const borderWidth = this.getBorderWidth()
    return {
      width: _width + paddingX * 2 + shapePaddingX * 2 + borderWidth,
      height: _height + paddingY * 2 + margin + shapePaddingY * 2 + borderWidth
    }
  }

  //  定位节点内容
  layout() {
    // 清除之前的内容
    this.group.clear()
    const { hoverRectPadding } = this.mindMap.opt
    let { width, height, textContentItemMargin } = this
    let { paddingY } = this.getPaddingVale()
    const halfBorderWidth = this.getBorderWidth() / 2
    paddingY += this.shapePadding.paddingY + halfBorderWidth
    // 节点形状
    this.shapeNode = this.shapeInstance.createShape()
    this.shapeNode.addClass('smm-node-shape')
    this.shapeNode.translate(halfBorderWidth, halfBorderWidth)
    this.style.shape(this.shapeNode)
    this.group.add(this.shapeNode)
    // 渲染一个隐藏的矩形区域，用来触发展开收起按钮的显示
    this.renderExpandBtnPlaceholderRect()
    // 创建协同头像节点
    if (this.createUserListNode) this.createUserListNode()
    // 概要节点添加一个带所属节点id的类名
    if (this.isGeneralization && this.generalizationBelongNode) {
      this.group.addClass('generalization_' + this.generalizationBelongNode.uid)
    }
    // 激活hover和激活边框
    const addHoverNode = () => {
      this.hoverNode = new Rect()
        .size(width + hoverRectPadding * 2, height + hoverRectPadding * 2)
        .x(-hoverRectPadding)
        .y(-hoverRectPadding)
      this.hoverNode.addClass('smm-hover-node')
      this.style.hoverNode(this.hoverNode, width, height)
      this.group.add(this.hoverNode)
    }
    // 如果存在自定义节点内容，那么使用自定义节点内容
    if (this.isUseCustomNodeContent()) {
      let foreignObject = new ForeignObject()
      foreignObject.width(width)
      foreignObject.height(height)
      foreignObject.add(this._customNodeContent)
      this.group.add(foreignObject)
      addHoverNode()
      return
    }
    // 图片节点
    let imgHeight = 0
    if (this._imgData) {
      imgHeight = this._imgData.height
      this.group.add(this._imgData.node)
      this._imgData.node.cx(width / 2).y(paddingY)
    }
    // 内容节点
    let textContentNested = new G()
    let textContentOffsetX = 0
    // icon
    let iconNested = new G()
    if (this._iconData && this._iconData.length > 0) {
      let iconLeft = 0
      this._iconData.forEach(item => {
        item.node
          .x(textContentOffsetX + iconLeft)
          .y((this._rectInfo.textContentHeight - item.height) / 2)
        iconNested.add(item.node)
        iconLeft += item.width + textContentItemMargin
      })
      textContentNested.add(iconNested)
      textContentOffsetX += iconLeft
    }
    // 文字
    if (this._textData) {
      this._textData.node.attr('data-offsetx', textContentOffsetX)
      this._textData.node.x(textContentOffsetX).y(0)
      textContentNested.add(this._textData.node)
      textContentOffsetX += this._textData.width + textContentItemMargin
    }
    // 超链接
    if (this._hyperlinkData) {
      this._hyperlinkData.node
        .x(textContentOffsetX)
        .y((this._rectInfo.textContentHeight - this._hyperlinkData.height) / 2)
      textContentNested.add(this._hyperlinkData.node)
      textContentOffsetX += this._hyperlinkData.width + textContentItemMargin
    }
    // 标签
    let tagNested = new G()
    if (this._tagData && this._tagData.length > 0) {
      let tagLeft = 0
      this._tagData.forEach(item => {
        item.node
          .x(textContentOffsetX + tagLeft)
          .y((this._rectInfo.textContentHeight - item.height) / 2)
        tagNested.add(item.node)
        tagLeft += item.width + textContentItemMargin
      })
      textContentNested.add(tagNested)
      textContentOffsetX += tagLeft
    }
    // 备注
    if (this._noteData) {
      this._noteData.node
        .x(textContentOffsetX)
        .y((this._rectInfo.textContentHeight - this._noteData.height) / 2)
      textContentNested.add(this._noteData.node)
      textContentOffsetX += this._noteData.width
    }
    // 文字内容整体
    textContentNested.translate(
      width / 2 - textContentNested.bbox().width / 2,
      imgHeight +
        paddingY +
        (imgHeight > 0 && this._rectInfo.textContentHeight > 0
          ? this.blockContentMargin
          : 0)
    )
    this.group.add(textContentNested)
    addHoverNode()
  }

  // 给节点绑定事件
  bindGroupEvent() {
    // 单击事件，选中节点
    this.group.on('click', e => {
      this.mindMap.emit('node_click', this, e)
      if (this.isMultipleChoice) {
        e.stopPropagation()
        this.isMultipleChoice = false
        return
      }
      this.active(e)
    })
    this.group.on('mousedown', e => {
      const {
        readonly,
        enableCtrlKeyNodeSelection,
        useLeftKeySelectionRightKeyDrag
      } = this.mindMap.opt
      // 只读模式不需要阻止冒泡
      if (!readonly) {
        if (this.isRoot) {
          // 根节点，右键拖拽画布模式下不需要阻止冒泡
          if (e.which === 3 && !useLeftKeySelectionRightKeyDrag) {
            e.stopPropagation()
          }
        } else {
          // 非根节点，且按下的是非鼠标中键，需要阻止事件冒泡
          if (e.which !== 2) {
            e.stopPropagation()
          }
        }
      }
      // 多选和取消多选
      if (e.ctrlKey && enableCtrlKeyNodeSelection) {
        this.isMultipleChoice = true
        let isActive = this.getData('isActive')
        if (!isActive)
          this.mindMap.emit(
            'before_node_active',
            this,
            this.renderer.activeNodeList
          )
        this.mindMap.renderer[
          isActive ? 'removeNodeFromActiveList' : 'addNodeToActiveList'
        ](this)
        this.renderer.emitNodeActiveEvent(isActive ? null : this)
      }
      this.mindMap.emit('node_mousedown', this, e)
    })
    this.group.on('mouseup', e => {
      if (!this.isRoot && e.which !== 2 && !this.mindMap.opt.readonly) {
        e.stopPropagation()
      }
      this.mindMap.emit('node_mouseup', this, e)
    })
    this.group.on('mouseenter', e => {
      if (this.isDrag) return
      this._isMouseenter = true
      // 显示展开收起按钮
      this.showExpandBtn()
      if (this.isGeneralization) {
        this.handleGeneralizationMouseenter()
      }
      this.mindMap.emit('node_mouseenter', this, e)
    })
    this.group.on('mouseleave', e => {
      if (!this._isMouseenter) return
      this._isMouseenter = false
      this.hideExpandBtn()
      if (this.isGeneralization) {
        this.handleGeneralizationMouseleave()
      }
      this.mindMap.emit('node_mouseleave', this, e)
    })
    // 双击事件
    this.group.on('dblclick', e => {
      if (this.mindMap.opt.readonly || e.ctrlKey) {
        return
      }
      e.stopPropagation()
      this.mindMap.emit('node_dblclick', this, e)
    })
    // 右键菜单事件
    this.group.on('contextmenu', e => {
      const { readonly, useLeftKeySelectionRightKeyDrag } = this.mindMap.opt
      // 按住ctrl键点击鼠标左键不知为何触发的是contextmenu事件
      if (readonly || e.ctrlKey) {
        return
      }
      e.stopPropagation()
      e.preventDefault()
      // 如果是多选节点结束，那么不要触发右键菜单事件
      if (
        this.mindMap.select &&
        !useLeftKeySelectionRightKeyDrag &&
        this.mindMap.select.hasSelectRange()
      ) {
        return
      }
      // 如果有且只有当前节点激活了，那么不需要重新激活
      if (
        !(this.getData('isActive') && this.renderer.activeNodeList.length === 1)
      ) {
        this.renderer.clearActiveNodeList()
        this.active(e)
      }
      this.mindMap.emit('node_contextmenu', e, this)
    })
  }

  //  激活节点
  active(e) {
    if (this.mindMap.opt.readonly) {
      return
    }
    e && e.stopPropagation()
    if (this.getData('isActive')) {
      return
    }
    this.mindMap.emit('before_node_active', this, this.renderer.activeNodeList)
    this.renderer.clearActiveNodeList()
    this.renderer.addNodeToActiveList(this)
    this.renderer.emitNodeActiveEvent(this)
  }

  //  更新节点
  update() {
    if (!this.group) {
      return
    }
    this.updateNodeActiveClass()
    let { alwaysShowExpandBtn } = this.mindMap.opt
    if (alwaysShowExpandBtn) {
      // 需要移除展开收缩按钮
      if (this._expandBtn && this.nodeData.children.length <= 0) {
        this.removeExpandBtn()
      } else {
        // 更新展开收起按钮
        this.renderExpandBtn()
      }
    } else {
      let { isActive, expand } = this.getData()
      // 展开状态且非激活状态，且当前鼠标不在它上面，才隐藏
      if (expand && !isActive && !this._isMouseenter) {
        this.hideExpandBtn()
      } else {
        this.showExpandBtn()
      }
    }
    // 更新概要
    this.renderGeneralization()
    // 更新协同头像
    if (this.updateUserListNode) this.updateUserListNode()
    // 更新节点位置
    let t = this.group.transform()
    // // 如果上次不在可视区内，且本次也不在，那么直接返回
    // let { left: ox, top: oy } = this.getNodePosInClient(
    //   t.translateX,
    //   t.translateY
    // )
    // let oldIsInClient =
    //   ox > 0 && oy > 0 && ox < this.mindMap.width && oy < this.mindMap.height
    // let { left: nx, top: ny } = this.getNodePosInClient(this.left, this.top)
    // let newIsNotInClient =
    //   nx + this.width < 0 ||
    //   ny + this.height < 0 ||
    //   nx > this.mindMap.width ||
    //   ny > this.mindMap.height
    // if (!oldIsInClient && newIsNotInClient) {
    //   if (!this.isHide) {
    //     this.isHide = true
    //     this.group.hide()
    //   }
    //   return
    // }
    // // 如果当前是隐藏状态，那么先显示
    // if (this.isHide) {
    //   this.isHide = false
    //   this.group.show()
    // }
    // 如果节点位置没有变化，则返回
    if (this.left === t.translateX && this.top === t.translateY) return
    this.group.translate(this.left - t.translateX, this.top - t.translateY)
  }

  // 获取节点相当于画布的位置
  getNodePosInClient(_left, _top) {
    let drawTransform = this.mindMap.draw.transform()
    let { scaleX, scaleY, translateX, translateY } = drawTransform
    let left = _left * scaleX + translateX
    let top = _top * scaleY + translateY
    return {
      left,
      top
    }
  }

  // 重新渲染节点，即重新创建节点内容、计算节点大小、计算节点内容布局、更新展开收起按钮，概要及位置
  reRender() {
    let sizeChange = this.getSize()
    this.layout()
    this.update()
    return sizeChange
  }

  // 更新节点激活状态
  updateNodeActiveClass() {
    if (!this.group) return
    const isActive = this.getData('isActive')
    this.group[isActive ? 'addClass' : 'removeClass']('active')
  }

  // 根据是否激活更新节点
  updateNodeByActive(active) {
    if (this.group) {
      // 切换激活状态，需要切换展开收起按钮的显隐
      if (active) {
        this.showExpandBtn()
      } else {
        this.hideExpandBtn()
      }
      this.updateNodeActiveClass()
    }
  }

  //  递归渲染
  render(callback = () => {}) {
    // 节点
    // 重新渲染连线
    this.renderLine()
    if (!this.group) {
      // 创建组
      this.group = new G()
      this.group.addClass('smm-node')
      this.group.css({
        cursor: 'default'
      })
      this.bindGroupEvent()
      this.nodeDraw.add(this.group)
      this.layout()
      this.update()
    } else {
      this.nodeDraw.add(this.group)
      if (this.needLayout) {
        this.needLayout = false
        this.layout()
      }
      this.updateExpandBtnPlaceholderRect()
      this.update()
    }
    // 子节点
    if (
      this.children &&
      this.children.length &&
      this.getData('expand') !== false
    ) {
      let index = 0
      this.children.forEach(item => {
        item.render(() => {
          index++
          if (index >= this.children.length) {
            callback()
          }
        })
      })
    } else {
      callback()
    }
    // 手动插入的节点立即获得焦点并且开启编辑模式
    if (this.nodeData.inserting) {
      delete this.nodeData.inserting
      this.active()
      setTimeout(() => {
        this.mindMap.emit('node_dblclick', this, null, true)
      }, 0)
    }
  }

  //  递归删除，只是从画布删除，节点容器还在，后续还可以重新插回画布
  remove() {
    if (!this.group) return
    this.group.remove()
    this.removeGeneralization()
    this.removeLine()
    // 子节点
    if (this.children && this.children.length) {
      this.children.forEach(item => {
        item.remove()
      })
    }
  }

  // 销毁节点，不但会从画布删除，而且原节点直接置空，后续无法再插回画布
  destroy() {
    if (!this.group) return
    this.group.remove()
    this.removeGeneralization()
    this.removeLine()
    this.group = null
    if (this.parent) {
      this.parent.removeLine()
    }
  }

  //  隐藏节点
  hide() {
    this.group.hide()
    this.hideGeneralization()
    if (this.parent) {
      let index = this.parent.children.indexOf(this)
      this.parent._lines[index] && this.parent._lines[index].hide()
      this._lines.forEach(item => {
        item.hide()
      })
    }
    // 子节点
    if (this.children && this.children.length) {
      this.children.forEach(item => {
        item.hide()
      })
    }
  }

  //  显示节点
  show() {
    if (!this.group) {
      return
    }
    this.group.show()
    this.showGeneralization()
    if (this.parent) {
      let index = this.parent.children.indexOf(this)
      this.parent._lines[index] && this.parent._lines[index].show()
      this._lines.forEach(item => {
        item.show()
      })
    }
    // 子节点
    if (this.children && this.children.length) {
      this.children.forEach(item => {
        item.show()
      })
    }
  }

  // 设置节点透明度
  // 包括连接线和下级节点
  setOpacity(val) {
    // 自身及连线
    this.group.opacity(val)
    this._lines.forEach(line => {
      line.opacity(val)
    })
    // 子节点
    this.children.forEach(item => {
      item.setOpacity(val)
    })
    // 概要节点
    this.setGeneralizationOpacity(val)
  }

  // 隐藏子节点
  hideChildren() {
    this._lines.forEach(item => {
      item.hide()
    })
    if (this.children && this.children.length) {
      this.children.forEach(item => {
        item.hide()
      })
    }
  }

  // 显示子节点
  showChildren() {
    this._lines.forEach(item => {
      item.show()
    })
    if (this.children && this.children.length) {
      this.children.forEach(item => {
        item.show()
      })
    }
  }

  // 被拖拽中
  startDrag() {
    this.isDrag = true
    this.group.addClass('smm-node-dragging')
  }

  // 拖拽结束
  endDrag() {
    this.isDrag = false
    this.group.removeClass('smm-node-dragging')
  }

  //  连线
  renderLine(deep = false) {
    if (this.getData('expand') === false) {
      return
    }
    let childrenLen = this.nodeData.children.length
    // 切换为鱼骨结构时，清空根节点和二级节点的连线
    if (
      this.mindMap.opt.layout === CONSTANTS.LAYOUT.FISHBONE &&
      (this.isRoot || this.layerIndex === 1)
    ) {
      childrenLen = 0
    }
    if (childrenLen > this._lines.length) {
      // 创建缺少的线
      new Array(childrenLen - this._lines.length).fill(0).forEach(() => {
        this._lines.push(this.lineDraw.path())
      })
    } else if (childrenLen < this._lines.length) {
      // 删除多余的线
      this._lines.slice(childrenLen).forEach(line => {
        line.remove()
      })
      this._lines = this._lines.slice(0, childrenLen)
    }
    // 画线
    this.renderer.layout.renderLine(
      this,
      this._lines,
      (line, node) => {
        // 添加样式
        this.styleLine(line, node)
      },
      this.style.getStyle('lineStyle', true)
    )
    // 子级的连线也需要更新
    if (deep && this.children && this.children.length > 0) {
      this.children.forEach(item => {
        item.renderLine(deep)
      })
    }
  }

  //  获取节点形状
  getShape() {
    // 节点使用功能横线风格的话不支持设置形状，直接使用默认的矩形
    return this.mindMap.themeConfig.nodeUseLineStyle
      ? CONSTANTS.SHAPE.RECTANGLE
      : this.style.getStyle('shape', false, false)
  }

  //  检查节点是否存在自定义数据
  hasCustomPosition() {
    return this.customLeft !== undefined && this.customTop !== undefined
  }

  //  检查节点是否存在自定义位置的祖先节点，包含自身
  ancestorHasCustomPosition() {
    let node = this
    while (node) {
      if (node.hasCustomPosition()) {
        return true
      }
      node = node.parent
    }
    return false
  }

  //  检查是否存在有概要的祖先节点
  ancestorHasGeneralization() {
    let node = this.parent
    while (node) {
      if (node.checkHasGeneralization()) {
        return true
      }
      node = node.parent
    }
    return false
  }

  //  添加子节点
  addChildren(node) {
    this.children.push(node)
  }

  //  设置连线样式
  styleLine(line, node) {
    let width =
      node.getSelfInhertStyle('lineWidth') || node.getStyle('lineWidth', true)
    let color =
      node.getSelfInhertStyle('lineColor') || node.getStyle('lineColor', true)
    let dasharray =
      node.getSelfInhertStyle('lineDasharray') ||
      node.getStyle('lineDasharray', true)
    this.style.line(line, {
      width,
      color,
      dasharray
    })
  }

  //  移除连线
  removeLine() {
    this._lines.forEach(line => {
      line.remove()
    })
    this._lines = []
  }

  //  检测当前节点是否是某个节点的祖先节点
  isAncestor(node) {
    if (this.uid === node.uid) {
      return false
    }
    let parent = node.parent
    while (parent) {
      if (this.uid === parent.uid) {
        return true
      }
      parent = parent.parent
    }
    return false
  }

  // 检查当前节点是否是某个节点的父节点
  isParent(node) {
    if (this.uid === node.uid) {
      return false
    }
    const parent = node.parent
    if (parent && this.uid === parent.uid) {
      return true
    }
    return false
  }

  //  检测当前节点是否是某个节点的兄弟节点
  isBrother(node) {
    if (!this.parent || this.uid === node.uid) {
      return false
    }
    return this.parent.children.find(item => {
      return item.uid === node.uid
    })
  }

  // 获取该节点在兄弟节点列表中的索引
  getIndexInBrothers() {
    return this.parent && this.parent.children
      ? this.parent.children.findIndex(item => {
          return item.uid === this.uid
        })
      : -1
  }

  //  获取padding值
  getPaddingVale() {
    let { isActive } = this.getData()
    return {
      paddingX: this.getStyle('paddingX', true, isActive),
      paddingY: this.getStyle('paddingY', true, isActive)
    }
  }

  //  获取某个样式
  getStyle(prop, root) {
    let v = this.style.merge(prop, root)
    return v === undefined ? '' : v
  }

  //  获取自定义样式
  getSelfStyle(prop) {
    return this.style.getSelfStyle(prop)
  }

  //   获取最近一个存在自身自定义样式的祖先节点的自定义样式
  getParentSelfStyle(prop) {
    if (this.parent) {
      return (
        this.parent.getSelfStyle(prop) || this.parent.getParentSelfStyle(prop)
      )
    }
    return null
  }

  //  获取自身可继承的自定义样式
  getSelfInhertStyle(prop) {
    return (
      this.getSelfStyle(prop) || // 自身
      this.getParentSelfStyle(prop)
    ) // 父级
  }

  // 获取节点非节点状态的边框大小
  getBorderWidth() {
    return this.style.merge('borderWidth', false) || 0
  }

  //  获取数据
  getData(key) {
    return key ? this.nodeData.data[key] : this.nodeData.data
  }

  // 获取该节点的纯数据，即不包含对节点实例的引用
  getPureData(removeActiveState = true, removeId = false) {
    return copyNodeTree({}, this, removeActiveState, removeId)
  }

  // 是否存在自定义样式
  hasCustomStyle() {
    return this.style.hasCustomStyle()
  }

  // 获取节点的尺寸和位置信息，宽高是应用了缩放效果后的实际宽高，位置是相对于浏览器窗口左上角的位置
  getRect() {
    return this.group.rbox()
  }

  // 获取节点的尺寸和位置信息，宽高是应用了缩放效果后的实际宽高，位置信息相对于画布
  getRectInSvg() {
    let { scaleX, scaleY, translateX, translateY } =
      this.mindMap.draw.transform()
    let { left, top, width, height } = this
    let right = (left + width) * scaleX + translateX
    let bottom = (top + height) * scaleY + translateY
    left = left * scaleX + translateX
    top = top * scaleY + translateY
    return {
      left,
      right,
      top,
      bottom,
      width: width * scaleX,
      height: height * scaleY
    }
  }
}

export default Node
