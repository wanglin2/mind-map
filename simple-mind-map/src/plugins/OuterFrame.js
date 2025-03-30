import {
  formatDataToArray,
  walk,
  getNodeListBoundingRect,
  createUid
} from '../utils'
import {
  parseAddNodeList,
  getNodeOuterFrameList
} from './outerFrame/outerFrameUtils'
import outerFrameTextMethods from './outerFrame/outerFrameText'

// 默认外框样式
const defaultStyle = {
  // 外框圆角大小
  radius: 5,
  // 外框边框宽度
  strokeWidth: 2,
  // 外框边框颜色
  strokeColor: '#0984e3',
  // 外框边框虚线样式
  strokeDasharray: '5,5',
  // 外框填充颜色
  fill: 'rgba(9,132,227,0.05)',
  // 外框文字字号
  fontSize: 14,
  // 外框文字字体
  fontFamily: '微软雅黑, Microsoft YaHei',
  // 加粗
  fontWeight: 'normal', // bold
  // 斜体
  fontStyle: 'normal', // italic
  // 外框文字颜色
  color: '#fff',
  // 外框文字行高
  lineHeight: 1.2,
  // 外框文字背景
  textFill: '#0984e3',
  // 外框文字圆角
  textFillRadius: 5,
  // 外框文字矩内边距，左上右下
  textFillPadding: [5, 5, 5, 5],
  // 外框文字水平显示位置，相对于外框
  textAlign: 'left' // left、center、right
}

const OUTER_FRAME_TEXT_EDIT_WRAP = 'outer-frame-text-edit-warp'

// 外框插件
class OuterFrame {
  constructor(opt = {}) {
    this.mindMap = opt.mindMap
    this.draw = null
    this.createDrawContainer()
    this.isNotRenderOuterFrames = false
    this.textNodeList = []
    this.outerFrameElList = []
    this.activeOuterFrame = null
    // 文字相关方法
    this.textEditNode = null
    this.showTextEdit = false
    Object.keys(outerFrameTextMethods).forEach(item => {
      this[item] = outerFrameTextMethods[item].bind(this)
    })
    this.mindMap.addEditNodeClass(OUTER_FRAME_TEXT_EDIT_WRAP)
    this.bindEvent()
  }

  // 创建容器
  createDrawContainer() {
    this.draw = this.mindMap.draw.group()
    this.draw.addClass('smm-outer-frame-container')
    this.draw.back() // 最底层
    this.draw.forward() // 连线层上面
  }

  // 绑定事件
  bindEvent() {
    this.renderOuterFrames = this.renderOuterFrames.bind(this)
    this.mindMap.on('node_tree_render_end', this.renderOuterFrames)
    this.mindMap.on('data_change', this.renderOuterFrames)
    // 监听画布和节点点击事件，用于清除当前激活的连接线
    this.clearActiveOuterFrame = this.clearActiveOuterFrame.bind(this)
    this.mindMap.on('draw_click', this.clearActiveOuterFrame)
    this.mindMap.on('node_click', this.clearActiveOuterFrame)
    // 缩放事件
    this.mindMap.on('scale', this.onScale)
    // 实例销毁事件
    this.onBeforeDestroy = this.onBeforeDestroy.bind(this)
    this.mindMap.on('beforeDestroy', this.onBeforeDestroy)

    this.addOuterFrame = this.addOuterFrame.bind(this)
    this.mindMap.command.add('ADD_OUTER_FRAME', this.addOuterFrame)

    this.removeActiveOuterFrame = this.removeActiveOuterFrame.bind(this)
    this.mindMap.keyCommand.addShortcut(
      'Del|Backspace',
      this.removeActiveOuterFrame
    )
  }

  // 解绑事件
  unBindEvent() {
    this.mindMap.off('node_tree_render_end', this.renderOuterFrames)
    this.mindMap.off('data_change', this.renderOuterFrames)
    this.mindMap.off('draw_click', this.clearActiveOuterFrame)
    this.mindMap.off('node_click', this.clearActiveOuterFrame)
    this.mindMap.off('scale', this.onScale)
    this.mindMap.off('beforeDestroy', this.onBeforeDestroy)
    this.mindMap.command.remove('ADD_OUTER_FRAME', this.addOuterFrame)
    this.mindMap.keyCommand.removeShortcut(
      'Del|Backspace',
      this.removeActiveOuterFrame
    )
  }

  // 实例销毁时清除关联线文字编辑框
  onBeforeDestroy() {
    this.hideEditTextBox()
    this.removeTextEditEl()
  }

  // 给节点添加外框数据
  /*
  config: {
    text: '',
    radius: 5,
    strokeWidth: 2,
    strokeColor: '#0984e3',
    strokeDasharray: '5,5',
    fill: 'rgba(9,132,227,0.05)'
  }
  */
  addOuterFrame(appointNodes, config = {}) {
    appointNodes = formatDataToArray(appointNodes)
    const activeNodeList = this.mindMap.renderer.activeNodeList
    if (activeNodeList.length <= 0 && appointNodes.length <= 0) {
      return
    }
    let nodeList = appointNodes.length > 0 ? appointNodes : activeNodeList
    nodeList = nodeList.filter(node => {
      return !node.isRoot && !node.isGeneralization
    })
    const list = parseAddNodeList(nodeList)
    list.forEach(({ node, range }) => {
      const childNodeList = node.children.slice(range[0], range[1] + 1)
      const groupId = createUid()
      childNodeList.forEach(child => {
        let outerFrame = child.getData('outerFrame')
        // 检查该外框是否已存在
        if (outerFrame) {
          outerFrame = {
            ...outerFrame,
            ...config,
            groupId
          }
        } else {
          outerFrame = {
            ...config,
            groupId
          }
        }
        this.mindMap.execCommand('SET_NODE_DATA', child, {
          outerFrame
        })
      })
    })
  }

  // 获取当前激活的外框
  getActiveOuterFrame() {
    return this.activeOuterFrame
      ? {
          ...this.activeOuterFrame
        }
      : null
  }

  // 删除当前激活的外框
  removeActiveOuterFrame() {
    if (!this.activeOuterFrame) return
    const { node, range } = this.activeOuterFrame
    this.getRangeNodeList(node, range).forEach(child => {
      this.mindMap.execCommand('SET_NODE_DATA', child, {
        outerFrame: null
      })
    })
    this.mindMap.emit('outer_frame_delete')
  }

  // 删除当前激活外框的文字
  removeActiveOuterFrameText() {
    this.updateActiveOuterFrame({
      text: ''
    })
  }

  // 更新当前激活的外框
  updateActiveOuterFrame(config = {}) {
    if (!this.activeOuterFrame) return
    this.isNotRenderOuterFrames = true
    const { el, node, range } = this.activeOuterFrame
    let newStrokeDasharray = ''
    this.getRangeNodeList(node, range).forEach(node => {
      const outerFrame = node.getData('outerFrame')
      const newData = {
        ...outerFrame,
        ...config
      }
      newStrokeDasharray = newData.strokeDasharray
      this.mindMap.execCommand('SET_NODE_DATA', node, {
        outerFrame: newData
      })
    })
    el.cacheStyle = {
      dasharray: newStrokeDasharray
    }
    this.updateOuterFrameStyle()
  }

  // 更新当前激活外框的样式
  updateOuterFrameStyle() {
    const { el, node, range, textNode } = this.activeOuterFrame
    const firstNode = this.getNodeRangeFirstNode(node, range)
    const styleConfig = this.getStyle(firstNode)
    this.styleOuterFrame(el, {
      ...styleConfig,
      strokeDasharray: 'none'
    })
    const text = this.getText(firstNode)
    this.renderText(text, el, textNode, node, range)
  }

  // 获取某个节点指定范围的带外框的子节点列表
  getRangeNodeList(node, range) {
    return node.children.slice(range[0], range[1] + 1).filter(child => {
      return child.getData('outerFrame')
    })
  }

  // 获取某个节点指定范围的带外框的第一个子节点
  getNodeRangeFirstNode(node, range) {
    return node.children[range[0]]
  }

  // 渲染外框
  renderOuterFrames() {
    if (this.isNotRenderOuterFrames) {
      this.isNotRenderOuterFrames = false
      return
    }
    this.clearActiveOuterFrame()
    this.clearTextNodes()
    this.clearOuterFrameElList()
    let tree = this.mindMap.renderer.root
    if (!tree) return
    const t = this.mindMap.draw.transform()
    const { outerFramePaddingX, outerFramePaddingY } = this.mindMap.opt
    walk(
      tree,
      null,
      cur => {
        if (!cur) return
        const outerFrameList = getNodeOuterFrameList(cur)
        if (outerFrameList && outerFrameList.length > 0) {
          outerFrameList.forEach(({ nodeList, range }) => {
            if (range[0] === -1 || range[1] === -1) return
            const { left, top, width, height } =
              getNodeListBoundingRect(nodeList)
            if (
              !Number.isFinite(left) ||
              !Number.isFinite(top) ||
              !Number.isFinite(width) ||
              !Number.isFinite(height)
            )
              return
            const el = this.createOuterFrameEl(
              (left -
                outerFramePaddingX -
                this.mindMap.elRect.left -
                t.translateX) /
                t.scaleX,
              (top -
                outerFramePaddingY -
                this.mindMap.elRect.top -
                t.translateY) /
                t.scaleY,
              (width + outerFramePaddingX * 2) / t.scaleX,
              (height + outerFramePaddingY * 2) / t.scaleY,
              this.getStyle(nodeList[0]) // 使用第一个节点的外框样式
            )
            // 渲染文字，如果有的话
            const textNode = this.createText(el, cur, range)
            this.textNodeList.push(textNode)
            this.renderText(this.getText(nodeList[0]), el, textNode, cur, range)
            el.on('click', e => {
              e.stopPropagation()
              this.setActiveOuterFrame(el, cur, range, textNode)
            })
          })
        }
      },
      () => {},
      true,
      0
    )
  }

  // 激活外框
  setActiveOuterFrame(el, node, range, textNode) {
    this.mindMap.execCommand('CLEAR_ACTIVE_NODE')
    this.clearActiveOuterFrame()
    this.activeOuterFrame = {
      el,
      node,
      range,
      textNode
    }
    el.stroke({
      dasharray: 'none'
    })
    // 如果没有输入过文字，那么显示默认文字
    if (!this.getText(this.getNodeRangeFirstNode(node, range))) {
      this.renderText(
        this.mindMap.opt.defaultOuterFrameText,
        el,
        textNode,
        node,
        range
      )
    }
    this.mindMap.emit('outer_frame_active', el, node, range)
  }

  // 清除当前激活的外框
  clearActiveOuterFrame() {
    if (!this.activeOuterFrame) return
    const { el, textNode, node, range } = this.activeOuterFrame
    el.stroke({
      dasharray: el.cacheStyle.dasharray || defaultStyle.strokeDasharray
    })
    // 隐藏文本编辑框
    this.hideEditTextBox()
    // 如果没有输入过文字，那么隐藏
    if (!this.getText(this.getNodeRangeFirstNode(node, range))) {
      textNode.clear()
    }
    this.activeOuterFrame = null
    this.mindMap.emit('outer_frame_deactivate')
  }

  // 获取指定外框的样式
  getStyle(node) {
    return { ...defaultStyle, ...(node.getData('outerFrame') || {}) }
  }

  // 创建外框元素
  createOuterFrameEl(x, y, width, height, styleConfig = {}) {
    const el = this.draw.rect().size(width, height).x(x).y(y)
    this.styleOuterFrame(el, styleConfig)
    el.cacheStyle = {
      dasharray: styleConfig.strokeDasharray
    }
    this.outerFrameElList.push(el)
    return el
  }

  // 设置外框样式
  styleOuterFrame(el, styleConfig) {
    el.radius(styleConfig.radius)
      .stroke({
        width: styleConfig.strokeWidth,
        color: styleConfig.strokeColor,
        dasharray: styleConfig.strokeDasharray
      })
      .fill({
        color: styleConfig.fill
      })
  }

  // 清除文本元素
  clearTextNodes() {
    this.textNodeList.forEach(item => {
      item.remove()
    })
  }

  // 清除外框元素
  clearOuterFrameElList() {
    this.outerFrameElList.forEach(item => {
      item.remove()
    })
    this.outerFrameElList = []
    this.activeOuterFrame = null
  }

  // 插件被移除前做的事情
  beforePluginRemove() {
    this.mindMap.deleteEditNodeClass(OUTER_FRAME_TEXT_EDIT_WRAP)
    this.unBindEvent()
  }

  // 插件被卸载前做的事情
  beforePluginDestroy() {
    this.mindMap.deleteEditNodeClass(OUTER_FRAME_TEXT_EDIT_WRAP)
    this.unBindEvent()
  }
}

OuterFrame.instanceName = 'outerFrame'
OuterFrame.defaultStyle = defaultStyle

export default OuterFrame
