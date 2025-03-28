import {
  getStrWithBrFromHtml,
  checkNodeOuter,
  focusInput,
  selectAllInput,
  htmlEscape,
  handleInputPasteText,
  checkSmmFormatData,
  getTextFromHtml,
  isWhite,
  getVisibleColorFromTheme
} from '../../utils'
import {
  ERROR_TYPES,
  CONSTANTS,
  noneRichTextNodeLineHeight
} from '../../constants/constant'

const SMM_NODE_EDIT_WRAP = 'smm-node-edit-wrap'

//  节点文字编辑类
export default class TextEdit {
  //  构造函数
  constructor(renderer) {
    this.renderer = renderer
    this.mindMap = renderer.mindMap
    // 当前编辑的节点
    this.currentNode = null
    // 文本编辑框
    this.textEditNode = null
    // 文本编辑框是否显示
    this.showTextEdit = false
    // 如果编辑过程中缩放画布了，那么缓存当前编辑的内容
    this.cacheEditingText = ''
    this.hasBodyMousedown = false
    this.textNodePaddingX = 5
    this.textNodePaddingY = 3
    this.isNeedUpdateTextEditNode = false
    this.mindMap.addEditNodeClass(SMM_NODE_EDIT_WRAP)
    this.bindEvent()
  }

  //  事件
  bindEvent() {
    this.show = this.show.bind(this)
    this.onScale = this.onScale.bind(this)
    this.onKeydown = this.onKeydown.bind(this)
    // 节点双击事件
    this.mindMap.on('node_dblclick', (node, e, isInserting) => {
      this.show({ node, e, isInserting })
    })
    // 点击事件
    this.mindMap.on('draw_click', () => {
      // 隐藏文本编辑框
      this.hideEditTextBox()
    })
    this.mindMap.on('body_mousedown', () => {
      this.hasBodyMousedown = true
    })
    this.mindMap.on('body_click', () => {
      if (!this.hasBodyMousedown) return
      this.hasBodyMousedown = false
      // 隐藏文本编辑框
      if (this.mindMap.opt.isEndNodeTextEditOnClickOuter) {
        this.hideEditTextBox()
      }
    })
    this.mindMap.on('svg_mousedown', () => {
      // 隐藏文本编辑框
      this.hideEditTextBox()
    })
    // 展开收缩按钮点击事件
    this.mindMap.on('expand_btn_click', () => {
      this.hideEditTextBox()
    })
    // 节点激活前事件
    this.mindMap.on('before_node_active', () => {
      this.hideEditTextBox()
    })
    // 鼠标滚动事件
    this.mindMap.on('mousewheel', () => {
      if (
        this.mindMap.opt.mousewheelAction === CONSTANTS.MOUSE_WHEEL_ACTION.MOVE
      ) {
        this.hideEditTextBox()
      }
    })
    // 注册编辑快捷键
    this.mindMap.keyCommand.addShortcut('F2', () => {
      if (this.renderer.activeNodeList.length <= 0) {
        return
      }
      this.show({
        node: this.renderer.activeNodeList[0]
      })
    })
    this.mindMap.on('scale', this.onScale)
    // 监听按键事件，判断是否自动进入文本编辑模式
    if (this.mindMap.opt.enableAutoEnterTextEditWhenKeydown) {
      window.addEventListener('keydown', this.onKeydown)
    }
    this.mindMap.on('beforeDestroy', () => {
      this.unBindEvent()
    })
    this.mindMap.on('after_update_config', (opt, lastOpt) => {
      if (
        opt.openRealtimeRenderOnNodeTextEdit !==
        lastOpt.openRealtimeRenderOnNodeTextEdit
      ) {
        if (this.mindMap.richText) {
          this.mindMap.richText.onOpenRealtimeRenderOnNodeTextEditConfigUpdate(
            opt.openRealtimeRenderOnNodeTextEdit
          )
        } else {
          this.onOpenRealtimeRenderOnNodeTextEditConfigUpdate(
            opt.openRealtimeRenderOnNodeTextEdit
          )
        }
      }
      if (
        opt.enableAutoEnterTextEditWhenKeydown !==
        lastOpt.enableAutoEnterTextEditWhenKeydown
      ) {
        window[
          opt.enableAutoEnterTextEditWhenKeydown
            ? 'addEventListener'
            : 'removeEventListener'
        ]('keydown', this.onKeydown)
      }
    })
    // 正在编辑文本时，给节点添加了图标等其他内容时需要更新编辑框的位置
    this.mindMap.on('afterExecCommand', () => {
      if (!this.isShowTextEdit()) return
      this.isNeedUpdateTextEditNode = true
    })
    this.mindMap.on('node_tree_render_end', () => {
      if (!this.isShowTextEdit()) return
      if (this.isNeedUpdateTextEditNode) {
        this.isNeedUpdateTextEditNode = false
        this.updateTextEditNode()
      }
    })
  }

  // 解绑事件
  unBindEvent() {
    window.removeEventListener('keydown', this.onKeydown)
  }

  // 按键事件
  onKeydown(e) {
    if (e.target !== document.body) return
    const activeNodeList = this.mindMap.renderer.activeNodeList
    if (activeNodeList.length <= 0 || activeNodeList.length > 1) return
    const node = activeNodeList[0]
    // 当正在输入中文或英文或数字时，如果没有按下组合键，那么自动进入文本编辑模式
    if (node && this.checkIsAutoEnterTextEditKey(e)) {
      // 忽略第一个键值，避免中文输入法时进入编辑会导致第一个键值变成字母的问题
      // 带来的问题是按的第一下纯粹是进入文本编辑，但没有变成输入
      e.preventDefault()
      this.show({
        node,
        e,
        isInserting: false,
        isFromKeyDown: true
      })
    }
  }

  // 判断是否是自动进入文本编模式的按钮
  checkIsAutoEnterTextEditKey(e) {
    const keyCode = e.keyCode
    return (
      (keyCode === 229 ||
        (keyCode >= 65 && keyCode <= 90) ||
        (keyCode >= 48 && keyCode <= 57)) &&
      !this.mindMap.keyCommand.hasCombinationKey(e)
    )
  }

  //  注册临时快捷键
  registerTmpShortcut() {
    this.mindMap.keyCommand.addShortcut('Enter', () => {
      this.hideEditTextBox()
    })
    this.mindMap.keyCommand.addShortcut('Tab', () => {
      this.hideEditTextBox()
    })
  }

  // 获取当前文本编辑框是否处于显示状态，也就是是否处在文本编辑状态
  isShowTextEdit() {
    if (this.mindMap.richText) {
      return this.mindMap.richText.showTextEdit
    }
    return this.showTextEdit
  }

  // 设置文本编辑框是否处于显示状态
  setIsShowTextEdit(val) {
    this.showTextEdit = val
    if (val) {
      this.mindMap.keyCommand.stopCheckInSvg()
    } else {
      this.mindMap.keyCommand.recoveryCheckInSvg()
    }
  }

  // 显示文本编辑框
  // isInserting：是否是刚创建的节点
  // isFromKeyDown：是否是在按键事件进入的编辑
  async show({
    node,
    isInserting = false,
    isFromKeyDown = false,
    isFromScale = false
  }) {
    // 使用了自定义节点内容那么不响应编辑事件
    if (node.isUseCustomNodeContent()) {
      return
    }
    // 如果有正在编辑中的节点，那么先结束它
    const currentEditNode = this.getCurrentEditNode()
    if (currentEditNode) {
      this.hideEditTextBox()
    }
    const { beforeTextEdit, openRealtimeRenderOnNodeTextEdit } =
      this.mindMap.opt
    if (typeof beforeTextEdit === 'function') {
      let isShow = false
      try {
        isShow = await beforeTextEdit(node, isInserting)
      } catch (error) {
        isShow = false
        this.mindMap.opt.errorHandler(ERROR_TYPES.BEFORE_TEXT_EDIT_ERROR, error)
      }
      if (!isShow) return
    }
    const { offsetLeft, offsetTop } = checkNodeOuter(this.mindMap, node)
    this.mindMap.view.translateXY(offsetLeft, offsetTop)
    const g = node._textData.node
    // 需要先显示，不然宽高获取到的可能是0
    if (openRealtimeRenderOnNodeTextEdit) {
      g.show()
    }
    const rect = g.node.getBoundingClientRect()
    // 如果开启了大小实时更新，那么直接隐藏节点原文本
    if (openRealtimeRenderOnNodeTextEdit) {
      g.hide()
    }
    const params = {
      node,
      rect,
      isInserting,
      isFromKeyDown,
      isFromScale
    }
    if (this.mindMap.richText) {
      this.mindMap.richText.showEditText(params)
      return
    }
    this.currentNode = node
    this.showEditTextBox(params)
  }

  // 当openRealtimeRenderOnNodeTextEdit配置更新后需要更新编辑框样式
  onOpenRealtimeRenderOnNodeTextEditConfigUpdate(
    openRealtimeRenderOnNodeTextEdit
  ) {
    if (!this.textEditNode) return
    this.textEditNode.style.background = openRealtimeRenderOnNodeTextEdit
      ? 'transparent'
      : this.currentNode
      ? this.getBackground(this.currentNode)
      : ''
    this.textEditNode.style.boxShadow = openRealtimeRenderOnNodeTextEdit
      ? 'none'
      : '0 0 20px rgba(0,0,0,.5)'
  }

  // 处理画布缩放
  onScale() {
    const node = this.getCurrentEditNode()
    if (!node) return
    if (this.mindMap.richText) {
      this.mindMap.richText.cacheEditingText =
        this.mindMap.richText.getEditText()
      this.mindMap.richText.showTextEdit = false
    } else {
      this.cacheEditingText = this.getEditText()
      this.setIsShowTextEdit(false)
    }
    this.show({
      node,
      isFromScale: true
    })
  }

  //  显示文本编辑框
  showEditTextBox({ node, rect, isInserting, isFromKeyDown, isFromScale }) {
    if (this.showTextEdit) return
    const {
      nodeTextEditZIndex,
      textAutoWrapWidth,
      selectTextOnEnterEditText,
      openRealtimeRenderOnNodeTextEdit,
      autoEmptyTextWhenKeydownEnterEdit
    } = this.mindMap.opt
    if (!isFromScale) {
      this.mindMap.emit('before_show_text_edit')
    }
    this.registerTmpShortcut()
    if (!this.textEditNode) {
      this.textEditNode = document.createElement('div')
      this.textEditNode.classList.add(SMM_NODE_EDIT_WRAP)
      this.textEditNode.style.cssText = `
        position: fixed;
        box-sizing: border-box;
        ${
          openRealtimeRenderOnNodeTextEdit
            ? ''
            : `box-shadow: 0 0 20px rgba(0,0,0,.5);`
        }
        padding: ${this.textNodePaddingY}px ${this.textNodePaddingX}px;
        margin-left: -${this.textNodePaddingX}px;
        margin-top: -${this.textNodePaddingY}px;
        outline: none; 
        word-break: break-all;
        line-break: anywhere;
      `
      this.textEditNode.setAttribute('contenteditable', true)
      this.textEditNode.addEventListener('keyup', e => {
        e.stopPropagation()
      })
      this.textEditNode.addEventListener('click', e => {
        e.stopPropagation()
      })
      this.textEditNode.addEventListener('mousedown', e => {
        e.stopPropagation()
      })
      this.textEditNode.addEventListener('keydown', e => {
        if (this.checkIsAutoEnterTextEditKey(e)) {
          e.stopPropagation()
        }
      })
      this.textEditNode.addEventListener('paste', e => {
        const text = e.clipboardData.getData('text')
        const { isSmm, data } = checkSmmFormatData(text)
        if (isSmm && data[0] && data[0].data) {
          // 只取第一个节点的纯文本
          handleInputPasteText(e, getTextFromHtml(data[0].data.text))
        } else {
          handleInputPasteText(e)
        }
        this.emitTextChangeEvent()
      })
      this.textEditNode.addEventListener('input', () => {
        this.emitTextChangeEvent()
      })
      const targetNode =
        this.mindMap.opt.customInnerElsAppendTo || document.body
      targetNode.appendChild(this.textEditNode)
    }
    const scale = this.mindMap.view.scale
    const fontSize = node.style.merge('fontSize')
    const textLines = (this.cacheEditingText || node.getData('text'))
      .split(/\n/gim)
      .map(item => {
        return htmlEscape(item)
      })
    const isMultiLine = node._textData.node.attr('data-ismultiLine') === 'true'
    node.style.domText(this.textEditNode, scale)
    if (!openRealtimeRenderOnNodeTextEdit) {
      this.textEditNode.style.background = this.getBackground(node)
    }
    this.textEditNode.style.zIndex = nodeTextEditZIndex
    if (isFromKeyDown && autoEmptyTextWhenKeydownEnterEdit) {
      this.textEditNode.innerHTML = ''
    } else {
      this.textEditNode.innerHTML = textLines.join('<br>')
    }
    this.textEditNode.style.minWidth =
      rect.width + this.textNodePaddingX * 2 + 'px'
    this.textEditNode.style.minHeight = rect.height + 'px'
    this.textEditNode.style.left = Math.floor(rect.left) + 'px'
    this.textEditNode.style.top = Math.floor(rect.top) + 'px'
    this.textEditNode.style.display = 'block'
    this.textEditNode.style.maxWidth = textAutoWrapWidth * scale + 'px'
    if (isMultiLine) {
      this.textEditNode.style.lineHeight = noneRichTextNodeLineHeight
      this.textEditNode.style.transform = `translateY(${
        (((noneRichTextNodeLineHeight - 1) * fontSize) / 2) * scale
      }px)`
    } else {
      this.textEditNode.style.lineHeight = 'normal'
    }
    this.setIsShowTextEdit(true)
    // 选中文本
    // if (!this.cacheEditingText) {
    //   selectAllInput(this.textEditNode)
    // }
    if (isInserting || (selectTextOnEnterEditText && !isFromKeyDown)) {
      selectAllInput(this.textEditNode)
    } else {
      focusInput(this.textEditNode)
    }
    this.cacheEditingText = ''
  }

  // 派发节点文本编辑事件
  emitTextChangeEvent() {
    this.mindMap.emit('node_text_edit_change', {
      node: this.currentNode,
      text: this.getEditText(),
      richText: false
    })
  }

  // 更新文本编辑框的大小和位置
  updateTextEditNode() {
    if (this.mindMap.richText) {
      this.mindMap.richText.updateTextEditNode()
      return
    }
    if (!this.showTextEdit || !this.currentNode) {
      return
    }
    const rect = this.currentNode._textData.node.node.getBoundingClientRect()
    this.textEditNode.style.minWidth =
      rect.width + this.textNodePaddingX * 2 + 'px'
    this.textEditNode.style.minHeight =
      rect.height + this.textNodePaddingY * 2 + 'px'
    this.textEditNode.style.left = Math.floor(rect.left) + 'px'
    this.textEditNode.style.top = Math.floor(rect.top) + 'px'
  }

  // 获取编辑区域的背景填充
  getBackground(node) {
    const gradientStyle = node.style.merge('gradientStyle')
    // 当前使用的是渐变色背景
    if (gradientStyle) {
      const startColor = node.style.merge('startColor')
      const endColor = node.style.merge('endColor')
      return `linear-gradient(to right, ${startColor}, ${endColor})`
    } else {
      // 单色背景
      const bgColor = node.style.merge('fillColor')
      const color = node.style.merge('color')
      // 默认使用节点的填充色，否则如果节点颜色是白色的话编辑时看不见
      return bgColor === 'transparent'
        ? isWhite(color)
          ? getVisibleColorFromTheme(this.mindMap.themeConfig)
          : '#fff'
        : bgColor
    }
  }

  // 删除文本编辑元素
  removeTextEditEl() {
    if (this.mindMap.richText) {
      this.mindMap.richText.removeTextEditEl()
      return
    }
    if (!this.textEditNode) return
    const targetNode = this.mindMap.opt.customInnerElsAppendTo || document.body
    targetNode.removeChild(this.textEditNode)
  }

  // 获取当前正在编辑的内容
  getEditText() {
    return getStrWithBrFromHtml(this.textEditNode.innerHTML)
  }

  //  隐藏文本编辑框
  hideEditTextBox() {
    if (this.mindMap.richText) {
      return this.mindMap.richText.hideEditText()
    }
    if (!this.showTextEdit) {
      return
    }
    const currentNode = this.currentNode
    const text = this.getEditText()
    this.currentNode = null
    this.textEditNode.style.display = 'none'
    this.textEditNode.innerHTML = ''
    this.textEditNode.style.fontFamily = 'inherit'
    this.textEditNode.style.fontSize = 'inherit'
    this.textEditNode.style.fontWeight = 'normal'
    this.textEditNode.style.transform = 'translateY(0)'
    this.setIsShowTextEdit(false)
    this.mindMap.execCommand('SET_NODE_TEXT', currentNode, text)
    // if (currentNode.isGeneralization) {
    //   // 概要节点
    //   currentNode.generalizationBelongNode.updateGeneralization()
    // }
    this.mindMap.render()
    this.mindMap.emit(
      'hide_text_edit',
      this.textEditNode,
      this.renderer.activeNodeList,
      currentNode
    )
  }

  // 获取当前正在编辑中的节点实例
  getCurrentEditNode() {
    if (this.mindMap.richText) {
      return this.mindMap.richText.node
    }
    return this.currentNode
  }
}
