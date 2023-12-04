import merge from 'deepmerge'
import LogicalStructure from '../../layouts/LogicalStructure'
import MindMap from '../../layouts/MindMap'
import CatalogOrganization from '../../layouts/CatalogOrganization'
import OrganizationStructure from '../../layouts/OrganizationStructure'
import Timeline from '../../layouts/Timeline'
import VerticalTimeline from '../../layouts/VerticalTimeline'
import Fishbone from '../../layouts/Fishbone'
import TextEdit from './TextEdit'
import {
  copyNodeTree,
  simpleDeepClone,
  walk,
  bfsWalk,
  loadImage,
  isUndef,
  getTopAncestorsFomNodeList,
  addDataToAppointNodes,
  createUidForAppointNodes,
  formatDataToArray,
  removeFromParentNodeData,
  createUid,
  getNodeDataIndex,
  getNodeIndexInNodeList,
  setDataToClipboard,
  getDataFromClipboard,
  htmlEscape,
  parseAddGeneralizationNodeList,
  checkNodeListIsEqual
} from '../../utils'
import { shapeList } from './node/Shape'
import { lineStyleProps } from '../../themes/default'
import { CONSTANTS, ERROR_TYPES } from '../../constants/constant'
import { Polygon } from '@svgdotjs/svg.js'

// 布局列表
const layouts = {
  // 逻辑结构图
  [CONSTANTS.LAYOUT.LOGICAL_STRUCTURE]: LogicalStructure,
  // 思维导图
  [CONSTANTS.LAYOUT.MIND_MAP]: MindMap,
  // 目录组织图
  [CONSTANTS.LAYOUT.CATALOG_ORGANIZATION]: CatalogOrganization,
  // 组织结构图
  [CONSTANTS.LAYOUT.ORGANIZATION_STRUCTURE]: OrganizationStructure,
  // 时间轴
  [CONSTANTS.LAYOUT.TIMELINE]: Timeline,
  // 时间轴2
  [CONSTANTS.LAYOUT.TIMELINE2]: Timeline,
  // 竖向时间轴
  [CONSTANTS.LAYOUT.VERTICAL_TIMELINE]: VerticalTimeline,
  // 鱼骨图
  [CONSTANTS.LAYOUT.FISHBONE]: Fishbone
}

//  渲染
class Render {
  //  构造函数
  constructor(opt = {}) {
    this.opt = opt
    this.mindMap = opt.mindMap
    this.themeConfig = this.mindMap.themeConfig
    // 渲染树，操作过程中修改的都是这里的数据
    this.renderTree = merge({}, this.mindMap.opt.data || {})
    // 是否重新渲染
    this.reRender = false
    // 是否正在渲染中
    this.isRendering = false
    // 是否存在等待渲染
    this.hasWaitRendering = false
    this.waitRenderingParams = []
    // 用于缓存节点
    this.nodeCache = {}
    this.lastNodeCache = {}
    // 触发render的来源
    this.renderSource = ''
    // 当前激活的节点列表
    this.activeNodeList = []
    // 根节点
    this.root = null
    // 文本编辑框，需要再bindEvent之前实例化，否则单击事件只能触发隐藏文本编辑框，而无法保存文本修改
    this.textEdit = new TextEdit(this)
    // 当前复制的数据
    this.lastBeingCopyData = null
    this.beingCopyData = null
    this.beingPasteText = ''
    this.beingPasteImgSize = 0
    this.currentBeingPasteType = ''
    // 节点高亮框
    this.highlightBoxNode = null
    // 上一次节点激活数据
    this.lastActiveNode = null
    this.lastActiveNodeList = []
    // 布局
    this.setLayout()
    // 绑定事件
    this.bindEvent()
    // 注册命令
    this.registerCommands()
    // 注册快捷键
    this.registerShortcutKeys()
  }

  //  设置布局结构
  setLayout() {
    this.layout = new (
      layouts[this.mindMap.opt.layout]
        ? layouts[this.mindMap.opt.layout]
        : layouts[CONSTANTS.LAYOUT.LOGICAL_STRUCTURE]
    )(this, this.mindMap.opt.layout)
  }

  // 重新设置思维导图数据
  setData(data) {
    if (this.mindMap.richText) {
      this.renderTree = this.mindMap.richText.handleSetData(data)
    } else {
      this.renderTree = data
    }
  }

  //   绑定事件
  bindEvent() {
    // 画布点击事件清除当前激活节点列表
    this.mindMap.on('draw_click', e => {
      this.clearActiveNodeListOnDrawClick(e, 'click')
    })
    // 画布右键事件事件清除当前激活节点列表
    this.mindMap.on('contextmenu', e => {
      this.clearActiveNodeListOnDrawClick(e, 'contextmenu')
    })
    // 鼠标双击回到根节点
    this.mindMap.svg.on('dblclick', () => {
      if (!this.mindMap.opt.enableDblclickBackToRootNode) return
      this.setRootNodeCenter()
    })
    // let timer = null
    // this.mindMap.on('view_data_change', () => {
    //   clearTimeout(timer)
    //   timer = setTimeout(() => {
    //     this.render()
    //   }, 300)
    // })
  }

  //  注册命令
  registerCommands() {
    // 全选
    this.selectAll = this.selectAll.bind(this)
    this.mindMap.command.add('SELECT_ALL', this.selectAll)
    // 回退
    this.back = this.back.bind(this)
    this.mindMap.command.add('BACK', this.back)
    // 前进
    this.forward = this.forward.bind(this)
    this.mindMap.command.add('FORWARD', this.forward)
    // 插入同级节点
    this.insertNode = this.insertNode.bind(this)
    this.mindMap.command.add('INSERT_NODE', this.insertNode)
    // 插入多个同级节点
    this.insertMultiNode = this.insertMultiNode.bind(this)
    this.mindMap.command.add('INSERT_MULTI_NODE', this.insertMultiNode)
    // 插入子节点
    this.insertChildNode = this.insertChildNode.bind(this)
    this.mindMap.command.add('INSERT_CHILD_NODE', this.insertChildNode)
    // 插入多个子节点
    this.insertMultiChildNode = this.insertMultiChildNode.bind(this)
    this.mindMap.command.add(
      'INSERT_MULTI_CHILD_NODE',
      this.insertMultiChildNode
    )
    // 插入父节点
    this.insertParentNode = this.insertParentNode.bind(this)
    this.mindMap.command.add('INSERT_PARENT_NODE', this.insertParentNode)
    // 上移节点
    this.upNode = this.upNode.bind(this)
    this.mindMap.command.add('UP_NODE', this.upNode)
    // 下移节点
    this.downNode = this.downNode.bind(this)
    this.mindMap.command.add('DOWN_NODE', this.downNode)
    // 移动节点
    this.insertAfter = this.insertAfter.bind(this)
    this.mindMap.command.add('INSERT_AFTER', this.insertAfter)
    this.insertBefore = this.insertBefore.bind(this)
    this.mindMap.command.add('INSERT_BEFORE', this.insertBefore)
    this.moveNodeTo = this.moveNodeTo.bind(this)
    this.mindMap.command.add('MOVE_NODE_TO', this.moveNodeTo)
    // 删除节点
    this.removeNode = this.removeNode.bind(this)
    this.mindMap.command.add('REMOVE_NODE', this.removeNode)
    // 仅删除当前节点
    this.removeCurrentNode = this.removeCurrentNode.bind(this)
    this.mindMap.command.add('REMOVE_CURRENT_NODE', this.removeCurrentNode)
    // 粘贴节点
    this.pasteNode = this.pasteNode.bind(this)
    this.mindMap.command.add('PASTE_NODE', this.pasteNode)
    // 剪切节点
    this.cutNode = this.cutNode.bind(this)
    this.mindMap.command.add('CUT_NODE', this.cutNode)
    // 修改节点单个样式
    this.setNodeStyle = this.setNodeStyle.bind(this)
    this.mindMap.command.add('SET_NODE_STYLE', this.setNodeStyle)
    // 修改节点多个样式
    this.setNodeStyles = this.setNodeStyles.bind(this)
    this.mindMap.command.add('SET_NODE_STYLES', this.setNodeStyles)
    // 切换节点是否激活
    this.setNodeActive = this.setNodeActive.bind(this)
    this.mindMap.command.add('SET_NODE_ACTIVE', this.setNodeActive)
    // 清除所有激活节点
    this.clearActiveNode = this.clearActiveNode.bind(this)
    this.mindMap.command.add('CLEAR_ACTIVE_NODE', this.clearActiveNode)
    // 切换节点是否展开
    this.setNodeExpand = this.setNodeExpand.bind(this)
    this.mindMap.command.add('SET_NODE_EXPAND', this.setNodeExpand)
    // 展开所有节点
    this.expandAllNode = this.expandAllNode.bind(this)
    this.mindMap.command.add('EXPAND_ALL', this.expandAllNode)
    // 收起所有节点
    this.unexpandAllNode = this.unexpandAllNode.bind(this)
    this.mindMap.command.add('UNEXPAND_ALL', this.unexpandAllNode)
    // 展开到指定层级
    this.expandToLevel = this.expandToLevel.bind(this)
    this.mindMap.command.add('UNEXPAND_TO_LEVEL', this.expandToLevel)
    // 设置节点数据
    this.setNodeData = this.setNodeData.bind(this)
    this.mindMap.command.add('SET_NODE_DATA', this.setNodeData)
    // 设置节点文本
    this.setNodeText = this.setNodeText.bind(this)
    this.mindMap.command.add('SET_NODE_TEXT', this.setNodeText)
    // 设置节点图片
    this.setNodeImage = this.setNodeImage.bind(this)
    this.mindMap.command.add('SET_NODE_IMAGE', this.setNodeImage)
    // 设置节点图标
    this.setNodeIcon = this.setNodeIcon.bind(this)
    this.mindMap.command.add('SET_NODE_ICON', this.setNodeIcon)
    // 设置节点超链接
    this.setNodeHyperlink = this.setNodeHyperlink.bind(this)
    this.mindMap.command.add('SET_NODE_HYPERLINK', this.setNodeHyperlink)
    // 设置节点备注
    this.setNodeNote = this.setNodeNote.bind(this)
    this.mindMap.command.add('SET_NODE_NOTE', this.setNodeNote)
    // 设置节点标签
    this.setNodeTag = this.setNodeTag.bind(this)
    this.mindMap.command.add('SET_NODE_TAG', this.setNodeTag)
    // 设置节点公式
    this.insertFormula = this.insertFormula.bind(this)
    this.mindMap.command.add('INSERT_FORMULA', this.insertFormula)
    // 添加节点概要
    this.addGeneralization = this.addGeneralization.bind(this)
    this.mindMap.command.add('ADD_GENERALIZATION', this.addGeneralization)
    // 删除节点概要
    this.removeGeneralization = this.removeGeneralization.bind(this)
    this.mindMap.command.add('REMOVE_GENERALIZATION', this.removeGeneralization)
    // 设置节点自定义位置
    this.setNodeCustomPosition = this.setNodeCustomPosition.bind(this)
    this.mindMap.command.add(
      'SET_NODE_CUSTOM_POSITION',
      this.setNodeCustomPosition
    )
    // 一键整理布局
    this.resetLayout = this.resetLayout.bind(this)
    this.mindMap.command.add('RESET_LAYOUT', this.resetLayout)
    // 设置节点形状
    this.setNodeShape = this.setNodeShape.bind(this)
    this.mindMap.command.add('SET_NODE_SHAPE', this.setNodeShape)
    // 定位节点
    this.goTargetNode = this.goTargetNode.bind(this)
    this.mindMap.command.add('GO_TARGET_NODE', this.goTargetNode)
  }

  //  注册快捷键
  registerShortcutKeys() {
    // 插入下级节点
    this.mindMap.keyCommand.addShortcut('Tab', () => {
      this.mindMap.execCommand('INSERT_CHILD_NODE')
    })
    // 插入同级节点
    this.mindMap.keyCommand.addShortcut('Enter', () => {
      if (this.textEdit.showTextEdit) {
        return
      }
      this.mindMap.execCommand('INSERT_NODE')
    })
    // 插入父节点
    this.mindMap.keyCommand.addShortcut('Shift+Tab', () => {
      this.mindMap.execCommand('INSERT_PARENT_NODE')
    })
    // 插入概要
    this.mindMap.keyCommand.addShortcut('Control+g', () => {
      this.mindMap.execCommand('ADD_GENERALIZATION')
    })
    // 展开/收起节点
    this.toggleActiveExpand = this.toggleActiveExpand.bind(this)
    this.mindMap.keyCommand.addShortcut('/', this.toggleActiveExpand)
    // 删除节点
    this.mindMap.keyCommand.addShortcut('Del|Backspace', () => {
      this.mindMap.execCommand('REMOVE_NODE')
    })
    // 仅删除当前节点
    this.mindMap.keyCommand.addShortcut('Shift+Backspace', () => {
      this.mindMap.execCommand('REMOVE_CURRENT_NODE')
    })
    // 节点编辑时某些快捷键会存在冲突，需要暂时去除
    this.mindMap.on('before_show_text_edit', () => {
      this.startTextEdit()
    })
    this.mindMap.on('hide_text_edit', () => {
      this.endTextEdit()
    })
    // 全选
    this.mindMap.keyCommand.addShortcut('Control+a', () => {
      this.mindMap.execCommand('SELECT_ALL')
    })
    // 一键整理布局
    this.mindMap.keyCommand.addShortcut('Control+l', () => {
      this.mindMap.execCommand('RESET_LAYOUT', this.resetLayout)
    })
    // 上移节点
    this.mindMap.keyCommand.addShortcut('Control+Up', () => {
      this.mindMap.execCommand('UP_NODE')
    })
    // 下移节点
    this.mindMap.keyCommand.addShortcut('Control+Down', () => {
      this.mindMap.execCommand('DOWN_NODE')
    })
    // 复制节点、剪切节点、粘贴节点的快捷键需开发者自行注册实现，可参考demo
    this.mindMap.keyCommand.addShortcut('Control+c', () => {
      this.copy()
    })
    this.mindMap.keyCommand.addShortcut('Control+v', () => {
      this.onPaste()
    })
    this.mindMap.keyCommand.addShortcut('Control+x', () => {
      this.cut()
    })
    // 根节点居中显示
    this.mindMap.keyCommand.addShortcut('Control+Enter', () => {
      this.setRootNodeCenter()
    })
  }

  // 派发节点激活事件
  emitNodeActiveEvent(node = null, activeNodeList = [...this.activeNodeList]) {
    let isChange = false
    isChange = this.lastActiveNode !== node
    if (!isChange) {
      isChange = !checkNodeListIsEqual(this.lastActiveNodeList, activeNodeList)
    }
    if (!isChange) return
    this.lastActiveNode = node
    this.lastActiveNodeList = [...activeNodeList]
    this.mindMap.batchExecution.push('emitNodeActiveEvent', () => {
      this.mindMap.emit('node_active', node, activeNodeList)
    })
  }

  // 鼠标点击画布时清空当前激活节点列表
  clearActiveNodeListOnDrawClick(e, eventType) {
    if (this.activeNodeList.length <= 0) return
    // 清除激活状态
    let isTrueClick = true
    // 是否是左键多选节点，右键拖动画布
    const { useLeftKeySelectionRightKeyDrag } = this.mindMap.opt
    // 如果鼠标按下和松开的距离较大，则不认为是点击事件
    if (
      eventType === 'contextmenu'
        ? !useLeftKeySelectionRightKeyDrag
        : useLeftKeySelectionRightKeyDrag
    ) {
      const mousedownPos = this.mindMap.event.mousedownPos
      isTrueClick =
        Math.abs(e.clientX - mousedownPos.x) <= 5 &&
        Math.abs(e.clientY - mousedownPos.y) <= 5
    }
    if (isTrueClick) {
      this.mindMap.execCommand('CLEAR_ACTIVE_NODE')
    }
  }

  //  开启文字编辑，会禁用回车键和删除键相关快捷键防止冲突
  startTextEdit() {
    this.mindMap.keyCommand.save()
  }

  //  结束文字编辑，会恢复回车键和删除键相关快捷键
  endTextEdit() {
    this.mindMap.keyCommand.restore()
  }

  //   渲染
  render(callback = () => {}, source) {
    // 如果当前还没有渲染完毕，不再触发渲染
    if (this.isRendering) {
      // 等待当前渲染完毕后再进行一次渲染
      this.hasWaitRendering = true
      this.waitRenderingParams = [callback, source]
      return
    }
    this.isRendering = true
    // 触发当前重新渲染的来源
    this.renderSource = source
    // 节点缓存
    this.lastNodeCache = this.nodeCache
    this.nodeCache = {}
    // 重新渲染需要清除激活状态
    if (this.reRender) {
      this.clearActiveNodeList()
    }
    // 计算布局
    this.layout.doLayout(root => {
      // 删除本次渲染时不再需要的节点
      Object.keys(this.lastNodeCache).forEach(uid => {
        if (!this.nodeCache[uid]) {
          // 从激活节点列表里删除
          this.removeNodeFromActiveList(this.lastNodeCache[uid])
          this.emitNodeActiveEvent()
          // 调用节点的销毁方法
          this.lastNodeCache[uid].destroy()
        }
      })
      // 更新根节点
      this.root = root
      // 渲染节点
      this.root.render(() => {
        this.isRendering = false
        this.mindMap.emit('node_tree_render_end')
        callback && callback()
        if (this.hasWaitRendering) {
          const params = this.waitRenderingParams
          this.hasWaitRendering = false
          this.waitRenderingParams = []
          this.render(...params)
        } else {
          // 触发一次保存，因为修改了渲染树的数据
          if (
            this.mindMap.richText &&
            [CONSTANTS.CHANGE_THEME, CONSTANTS.SET_DATA].includes(source)
          ) {
            this.mindMap.command.addHistory()
          }
        }
      })
    })
    this.emitNodeActiveEvent()
  }

  //  清除当前所有激活节点，并会触发事件
  clearActiveNode() {
    if (this.activeNodeList.length <= 0) {
      return
    }
    this.clearActiveNodeList()
    this.emitNodeActiveEvent(null, [])
  }

  //  清除当前激活的节点列表
  clearActiveNodeList() {
    this.activeNodeList.forEach(item => {
      this.mindMap.execCommand('SET_NODE_ACTIVE', item, false)
    })
    this.activeNodeList = []
  }

  // 添加节点到激活列表里
  addNodeToActiveList(node) {
    const index = this.findActiveNodeIndex(node)
    if (index === -1) {
      this.mindMap.execCommand('SET_NODE_ACTIVE', node, true)
      this.activeNodeList.push(node)
    }
  }

  // 在激活列表里移除某个节点
  removeNodeFromActiveList(node) {
    let index = this.findActiveNodeIndex(node)
    if (index === -1) {
      return
    }
    this.mindMap.execCommand('SET_NODE_ACTIVE', node, false)
    this.activeNodeList.splice(index, 1)
  }

  //  检索某个节点在激活列表里的索引
  findActiveNodeIndex(node) {
    return getNodeIndexInNodeList(node, this.activeNodeList)
  }

  //  全选
  selectAll() {
    if (this.mindMap.opt.readonly) return
    walk(
      this.root,
      null,
      node => {
        if (!node.getData('isActive')) {
          this.addNodeToActiveList(node)
        }
      },
      null,
      true,
      0,
      0
    )
    this.emitNodeActiveEvent()
  }

  //  回退
  back(step) {
    this.backForward('back', step)
  }

  //  前进
  forward(step) {
    this.backForward('forward', step)
  }

  // 前进回退
  backForward(type, step) {
    this.mindMap.execCommand('CLEAR_ACTIVE_NODE')
    const data = this.mindMap.command[type](step)
    if (data) {
      this.renderTree = data
      this.mindMap.render()
    }
  }

  // 获取创建新节点的行为
  getNewNodeBehavior(openEdit = false, handleMultiNodes = false) {
    const { createNewNodeBehavior } = this.mindMap.opt
    let focusNewNode = false // 是否激活新节点
    let inserting = false // 新节点是否进入编辑模式
    switch (createNewNodeBehavior) {
      // 默认会激活新创建的节点，并且进入编辑模式。如果同时创建了多个新节点，那么只会激活而不会进入编辑模式
      case CONSTANTS.CREATE_NEW_NODE_BEHAVIOR.DEFAULT:
        focusNewNode = handleMultiNodes || !openEdit
        inserting = handleMultiNodes ? false : openEdit // 如果同时对多个节点插入子节点，那么无需进入编辑模式
        break
      // 不激活新创建的节点
      case CONSTANTS.CREATE_NEW_NODE_BEHAVIOR.NOT_ACTIVE:
        focusNewNode = false
        inserting = false
        break
      // 只激活新创建的节点，不进入编辑模式
      case CONSTANTS.CREATE_NEW_NODE_BEHAVIOR.ACTIVE_ONLY:
        focusNewNode = true
        inserting = false
        break
      default:
        break
    }
    return {
      focusNewNode,
      inserting
    }
  }

  //  插入同级节点
  insertNode(
    openEdit = true,
    appointNodes = [],
    appointData = null,
    appointChildren = []
  ) {
    appointNodes = formatDataToArray(appointNodes)
    if (this.activeNodeList.length <= 0 && appointNodes.length <= 0) {
      return
    }
    this.textEdit.hideEditTextBox()
    const {
      defaultInsertSecondLevelNodeText,
      defaultInsertBelowSecondLevelNodeText
    } = this.mindMap.opt
    const list = appointNodes.length > 0 ? appointNodes : this.activeNodeList
    const handleMultiNodes = list.length > 1
    const isRichText = !!this.mindMap.richText
    const { focusNewNode, inserting } = this.getNewNodeBehavior(
      openEdit,
      handleMultiNodes
    )
    const params = {
      expand: true,
      richText: isRichText,
      resetRichText: isRichText,
      isActive: focusNewNode // 如果同时对多个节点插入子节点，那么需要把新增的节点设为激活状态。如果不进入编辑状态，那么也需要手动设为激活状态
    }
    // 动态指定的子节点数据也需要添加相关属性
    appointChildren = addDataToAppointNodes(appointChildren, {
      ...params
    })
    list.forEach(node => {
      if (node.isGeneralization || node.isRoot) {
        return
      }
      const parent = node.parent
      const isOneLayer = node.layerIndex === 1
      // 新插入节点的默认文本
      const text = isOneLayer
        ? defaultInsertSecondLevelNodeText
        : defaultInsertBelowSecondLevelNodeText
      // 计算插入位置
      const index = getNodeDataIndex(node)
      const newNodeData = {
        inserting,
        data: {
          text: text,
          ...params,
          uid: createUid(),
          ...(appointData || {})
        },
        children: [...createUidForAppointNodes(appointChildren, true)]
      }
      parent.nodeData.children.splice(index + 1, 0, newNodeData)
    })
    // 如果同时对多个节点插入子节点，需要清除原来激活的节点
    if (focusNewNode) {
      this.clearActiveNodeList()
    }
    this.mindMap.render()
  }

  // 插入多个同级节点
  insertMultiNode(appointNodes, nodeList) {
    if (!nodeList || nodeList.length <= 0) return
    appointNodes = formatDataToArray(appointNodes)
    if (this.activeNodeList.length <= 0 && appointNodes.length <= 0) {
      return
    }
    this.textEdit.hideEditTextBox()
    const list = appointNodes.length > 0 ? appointNodes : this.activeNodeList
    const isRichText = !!this.mindMap.richText
    const { focusNewNode } = this.getNewNodeBehavior(false, true)
    const params = {
      expand: true,
      richText: isRichText,
      resetRichText: isRichText,
      isActive: focusNewNode
    }
    nodeList = addDataToAppointNodes(nodeList, params)
    list.forEach(node => {
      if (node.isGeneralization || node.isRoot) {
        return
      }
      const parent = node.parent
      // 计算插入位置
      const index = getNodeDataIndex(node)
      const newNodeList = createUidForAppointNodes(
        simpleDeepClone(nodeList),
        true
      )
      parent.nodeData.children.splice(index + 1, 0, ...newNodeList)
    })
    if (focusNewNode) {
      this.clearActiveNodeList()
    }
    this.mindMap.render()
  }

  //  插入子节点
  insertChildNode(
    openEdit = true,
    appointNodes = [],
    appointData = null,
    appointChildren = []
  ) {
    appointNodes = formatDataToArray(appointNodes)
    if (this.activeNodeList.length <= 0 && appointNodes.length <= 0) {
      return
    }
    this.textEdit.hideEditTextBox()
    const {
      defaultInsertSecondLevelNodeText,
      defaultInsertBelowSecondLevelNodeText
    } = this.mindMap.opt
    const list = appointNodes.length > 0 ? appointNodes : this.activeNodeList
    const handleMultiNodes = list.length > 1
    const isRichText = !!this.mindMap.richText
    const { focusNewNode, inserting } = this.getNewNodeBehavior(
      openEdit,
      handleMultiNodes
    )
    const params = {
      expand: true,
      richText: isRichText,
      resetRichText: isRichText,
      isActive: focusNewNode
    }
    // 动态指定的子节点数据也需要添加相关属性
    appointChildren = addDataToAppointNodes(appointChildren, {
      ...params
    })
    list.forEach(node => {
      if (node.isGeneralization) {
        return
      }
      if (!node.nodeData.children) {
        node.nodeData.children = []
      }
      const text = node.isRoot
        ? defaultInsertSecondLevelNodeText
        : defaultInsertBelowSecondLevelNodeText
      const newNode = {
        inserting,
        data: {
          text: text,
          uid: createUid(),
          ...params,
          ...(appointData || {})
        },
        children: [...createUidForAppointNodes(appointChildren, true)]
      }
      node.nodeData.children.push(newNode)
      // 插入子节点时自动展开子节点
      node.setData({
        expand: true
      })
    })
    // 如果同时对多个节点插入子节点，需要清除原来激活的节点
    if (focusNewNode) {
      this.clearActiveNodeList()
    }
    this.mindMap.render()
  }

  // 插入多个子节点
  insertMultiChildNode(appointNodes, childList) {
    if (!childList || childList.length <= 0) return
    appointNodes = formatDataToArray(appointNodes)
    if (this.activeNodeList.length <= 0 && appointNodes.length <= 0) {
      return
    }
    this.textEdit.hideEditTextBox()
    const list = appointNodes.length > 0 ? appointNodes : this.activeNodeList
    const isRichText = !!this.mindMap.richText
    const { focusNewNode } = this.getNewNodeBehavior(false, true)
    const params = {
      expand: true,
      richText: isRichText,
      resetRichText: isRichText,
      isActive: focusNewNode
    }
    childList = addDataToAppointNodes(childList, params)
    list.forEach(node => {
      if (node.isGeneralization) {
        return
      }
      if (!node.nodeData.children) {
        node.nodeData.children = []
      }
      childList = createUidForAppointNodes(childList, true)
      node.nodeData.children.push(...childList)
      // 插入子节点时自动展开子节点
      node.setData({
        expand: true
      })
    })
    if (focusNewNode) {
      this.clearActiveNodeList()
    }
    this.mindMap.render()
  }

  // 插入父节点
  insertParentNode(openEdit = true, appointNodes, appointData) {
    appointNodes = formatDataToArray(appointNodes)
    if (this.activeNodeList.length <= 0 && appointNodes.length <= 0) {
      return
    }
    this.textEdit.hideEditTextBox()
    const {
      defaultInsertSecondLevelNodeText,
      defaultInsertBelowSecondLevelNodeText
    } = this.mindMap.opt
    const list = appointNodes.length > 0 ? appointNodes : this.activeNodeList
    const handleMultiNodes = list.length > 1
    const isRichText = !!this.mindMap.richText
    const { focusNewNode, inserting } = this.getNewNodeBehavior(
      openEdit,
      handleMultiNodes
    )
    const params = {
      expand: true,
      richText: isRichText,
      resetRichText: isRichText,
      isActive: focusNewNode
    }
    list.forEach(node => {
      if (node.isGeneralization || node.isRoot) {
        return
      }
      const text =
        node.layerIndex === 1
          ? defaultInsertSecondLevelNodeText
          : defaultInsertBelowSecondLevelNodeText
      const newNode = {
        inserting,
        data: {
          text: text,
          uid: createUid(),
          ...params,
          ...(appointData || {})
        },
        children: [node.nodeData]
      }
      const parent = node.parent
      // 获取当前节点所在位置
      const index = getNodeDataIndex(node)
      parent.nodeData.children.splice(index, 1, newNode)
    })
    // 如果同时对多个节点插入子节点，需要清除原来激活的节点
    if (focusNewNode) {
      this.clearActiveNodeList()
    }
    this.mindMap.render()
  }

  //  上移节点，多个节点只会操作第一个节点
  upNode() {
    if (this.activeNodeList.length <= 0) {
      return
    }
    let node = this.activeNodeList[0]
    if (node.isRoot) {
      return
    }
    let parent = node.parent
    let childList = parent.children
    let index = getNodeIndexInNodeList(node, childList)
    if (index === -1 || index === 0) {
      return
    }
    let insertIndex = index - 1
    // 节点实例
    childList.splice(index, 1)
    childList.splice(insertIndex, 0, node)
    // 节点数据
    parent.nodeData.children.splice(index, 1)
    parent.nodeData.children.splice(insertIndex, 0, node.nodeData)
    this.mindMap.render()
  }

  //  下移节点，多个节点只会操作第一个节点
  downNode() {
    if (this.activeNodeList.length <= 0) {
      return
    }
    let node = this.activeNodeList[0]
    if (node.isRoot) {
      return
    }
    let parent = node.parent
    let childList = parent.children
    let index = getNodeIndexInNodeList(node, childList)
    if (index === -1 || index === childList.length - 1) {
      return
    }
    let insertIndex = index + 1
    // 节点实例
    childList.splice(index, 1)
    childList.splice(insertIndex, 0, node)
    // 节点数据
    parent.nodeData.children.splice(index, 1)
    parent.nodeData.children.splice(insertIndex, 0, node.nodeData)
    this.mindMap.render()
  }

  // 复制节点
  copy() {
    this.beingCopyData = this.copyNode()
    setDataToClipboard({
      simpleMindMap: true,
      data: this.beingCopyData
    })
  }

  // 剪切节点
  cut() {
    this.mindMap.execCommand('CUT_NODE', copyData => {
      this.beingCopyData = copyData
      setDataToClipboard({
        simpleMindMap: true,
        data: copyData
      })
    })
  }

  // 粘贴节点
  paste() {
    if (this.beingCopyData) {
      this.mindMap.execCommand('PASTE_NODE', this.beingCopyData)
    }
  }

  // 粘贴事件
  async onPaste() {
    const { errorHandler, handleIsSplitByWrapOnPasteCreateNewNode } =
      this.mindMap.opt
    // 读取剪贴板的文字和图片
    let text = null
    let img = null
    try {
      const res = await getDataFromClipboard()
      text = res.text
      img = res.img
    } catch (error) {
      errorHandler(ERROR_TYPES.READ_CLIPBOARD_ERROR, error)
    }
    // 检查剪切板数据是否有变化
    // 通过图片大小来判断图片是否发生变化，可能是不准确的，但是目前没有其他好方法
    const imgSize = img ? img.size : 0
    if (this.beingPasteText !== text || this.beingPasteImgSize !== imgSize) {
      this.currentBeingPasteType = CONSTANTS.PASTE_TYPE.CLIP_BOARD
      this.beingPasteText = text
      this.beingPasteImgSize = imgSize
    }
    // 检查要粘贴的节点数据是否有变化，节点优先级高于剪切板
    if (this.lastBeingCopyData !== this.beingCopyData) {
      this.lastBeingCopyData = this.beingCopyData
      this.currentBeingPasteType = CONSTANTS.PASTE_TYPE.CANVAS
    }
    // 粘贴剪切板的数据
    if (this.currentBeingPasteType === CONSTANTS.PASTE_TYPE.CLIP_BOARD) {
      // 存在文本，则创建子节点
      if (text) {
        // 判断粘贴的是否是simple-mind-map的数据
        let smmData = null
        let useDefault = true
        // 用户自定义处理
        if (this.mindMap.opt.customHandleClipboardText) {
          try {
            const res = await this.mindMap.opt.customHandleClipboardText(text)
            if (!isUndef(res)) {
              useDefault = false
              if (typeof res === 'object' && res.simpleMindMap) {
                smmData = res.data
              } else {
                text = String(res)
              }
            }
          } catch (error) {
            errorHandler(ERROR_TYPES.CUSTOM_HANDLE_CLIPBOARD_TEXT_ERROR, error)
          }
        }
        // 默认处理
        if (useDefault) {
          try {
            const parsedData = JSON.parse(text)
            if (parsedData && parsedData.simpleMindMap) {
              smmData = parsedData.data
            }
          } catch (error) {
            errorHandler(ERROR_TYPES.PARSE_PASTE_DATA_ERROR, error)
          }
        }
        if (smmData) {
          this.mindMap.execCommand(
            'INSERT_MULTI_CHILD_NODE',
            [],
            Array.isArray(smmData) ? smmData : [smmData]
          )
        } else {
          text = htmlEscape(text)
          const textArr = text
            .split(new RegExp('\r?\n|(?<!\n)\r', 'g'))
            .filter(item => {
              return !!item
            })
          // 判断是否需要根据换行自动分割节点
          if (textArr.length > 1 && handleIsSplitByWrapOnPasteCreateNewNode) {
            handleIsSplitByWrapOnPasteCreateNewNode()
              .then(() => {
                this.mindMap.execCommand(
                  'INSERT_MULTI_CHILD_NODE',
                  [],
                  textArr.map(item => {
                    return {
                      data: {
                        text: item
                      },
                      children: []
                    }
                  })
                )
              })
              .catch(() => {
                this.mindMap.execCommand('INSERT_CHILD_NODE', false, [], {
                  text
                })
              })
          } else {
            this.mindMap.execCommand('INSERT_CHILD_NODE', false, [], {
              text
            })
          }
        }
      }
      // 存在图片，则添加到当前激活节点
      if (img) {
        try {
          let imgData = await loadImage(img)
          if (this.activeNodeList.length > 0) {
            this.activeNodeList.forEach(node => {
              this.mindMap.execCommand('SET_NODE_IMAGE', node, {
                url: imgData.url,
                title: '',
                width: imgData.size.width,
                height: imgData.size.height
              })
            })
          }
        } catch (error) {
          errorHandler(ERROR_TYPES.LOAD_CLIPBOARD_IMAGE_ERROR, error)
        }
      }
    } else {
      // 粘贴节点数据
      this.paste()
    }
  }

  //  将节点移动到另一个节点的前面
  insertBefore(node, exist) {
    this.insertTo(node, exist, 'before')
  }

  //  将节点移动到另一个节点的后面
  insertAfter(node, exist) {
    this.insertTo(node, exist, 'after')
  }

  // 将节点移动到另一个节点的前面或后面
  insertTo(node, exist, dir = 'before') {
    let nodeList = formatDataToArray(node)
    nodeList = nodeList.filter(item => {
      return !item.isRoot
    })
    if (dir === 'after') {
      nodeList.reverse()
    }
    nodeList.forEach(item => {
      this.checkNodeLayerChange(item, exist)
      // 移动节点
      let nodeParent = item.parent
      let nodeBorthers = nodeParent.children
      let nodeIndex = getNodeIndexInNodeList(item, nodeBorthers)
      if (nodeIndex === -1) {
        return
      }
      nodeBorthers.splice(nodeIndex, 1)
      nodeParent.nodeData.children.splice(nodeIndex, 1)

      // 目标节点
      let existParent = exist.parent
      let existBorthers = existParent.children
      let existIndex = getNodeIndexInNodeList(exist, existBorthers)
      if (existIndex === -1) {
        return
      }
      if (dir === 'after') {
        existIndex++
      }
      existBorthers.splice(existIndex, 0, item)
      existParent.nodeData.children.splice(existIndex, 0, item.nodeData)
    })
    this.mindMap.render()
  }

  // 如果是富文本模式，那么某些层级变化需要更新样式
  checkNodeLayerChange(node, toNode) {
    if (this.mindMap.richText) {
      let nodeLayerChanged =
        (node.layerIndex === 1 && toNode.layerIndex !== 1) ||
        (node.layerIndex !== 1 && toNode.layerIndex === 1)
      if (nodeLayerChanged) {
        node.setData({
          resetRichText: true
        })
      }
    }
  }

  //  移除节点
  removeNode(appointNodes = []) {
    appointNodes = formatDataToArray(appointNodes)
    if (this.activeNodeList.length <= 0 && appointNodes.length <= 0) {
      return
    }
    // 删除节点后需要激活的节点
    let needActiveNode = null
    let isAppointNodes = appointNodes.length > 0
    let list = isAppointNodes ? appointNodes : this.activeNodeList
    let root = list.find(node => {
      return node.isRoot
    })
    if (root) {
      this.clearActiveNodeList()
      root.children = []
      root.nodeData.children = []
    } else {
      // 如果只选中了一个节点，删除后激活其兄弟节点或者父节点
      needActiveNode = this.getNextActiveNode()
      for (let i = 0; i < list.length; i++) {
        let node = list[i]
        if (isAppointNodes) list.splice(i, 1)
        if (node.isGeneralization) {
          this.deleteNodeGeneralization(node)
          this.removeNodeFromActiveList(node)
          i--
        } else {
          this.removeNodeFromActiveList(node)
          removeFromParentNodeData(node)
          i--
        }
      }
    }
    this.activeNodeList = []
    // 激活被删除节点的兄弟节点或父节点
    if (needActiveNode) {
      this.addNodeToActiveList(needActiveNode)
    }
    this.emitNodeActiveEvent()
    this.mindMap.render()
  }

  // 删除概要节点，即从所属节点里删除该概要
  deleteNodeGeneralization(node) {
    const targetNode = node.generalizationBelongNode
    const index = targetNode.getGeneralizationNodeIndex(node)
    let generalization = targetNode.getData('generalization')
    if (Array.isArray(generalization)) {
      generalization.splice(index, 1)
    } else {
      generalization = null
    }
    // 删除概要节点
    this.mindMap.execCommand('SET_NODE_DATA', targetNode, {
      generalization
    })
    this.closeHighlightNode()
  }

  // 仅删除当前节点
  removeCurrentNode(appointNodes = []) {
    appointNodes = formatDataToArray(appointNodes)
    if (this.activeNodeList.length <= 0 && appointNodes.length <= 0) {
      return
    }
    // 删除节点后需要激活的节点，如果只选中了一个节点，删除后激活其兄弟节点或者父节点
    let needActiveNode = this.getNextActiveNode()
    let isAppointNodes = appointNodes.length > 0
    let list = isAppointNodes ? appointNodes : this.activeNodeList
    list = list.filter(node => {
      return !node.isRoot
    })
    for (let i = 0; i < list.length; i++) {
      let node = list[i]
      if (node.isGeneralization) {
        // 删除概要节点
        this.deleteNodeGeneralization(node)
      } else {
        const parent = node.parent
        const index = getNodeDataIndex(node)
        parent.nodeData.children.splice(
          index,
          1,
          ...(node.nodeData.children || [])
        )
      }
    }
    this.activeNodeList = []
    // 激活被删除节点的兄弟节点或父节点
    if (needActiveNode) {
      this.addNodeToActiveList(needActiveNode)
    }
    this.emitNodeActiveEvent()
    this.mindMap.render()
  }

  // 计算下一个可激活的节点
  getNextActiveNode() {
    let needActiveNode = null
    if (
      this.activeNodeList.length === 1 &&
      !this.activeNodeList[0].isGeneralization &&
      this.mindMap.opt.deleteNodeActive
    ) {
      const node = this.activeNodeList[0]
      const broList = node.parent.children
      const nodeIndex = getNodeIndexInNodeList(node, broList)
      // 如果后面有兄弟节点
      if (nodeIndex < broList.length - 1) {
        needActiveNode = broList[nodeIndex + 1]
      } else {
        // 如果前面有兄弟节点
        if (nodeIndex > 0) {
          needActiveNode = broList[nodeIndex - 1]
        } else {
          // 没有兄弟节点
          needActiveNode = node.parent
        }
      }
    }
    return needActiveNode
  }

  //  复制节点
  copyNode() {
    if (this.activeNodeList.length <= 0) {
      return
    }
    const nodeList = getTopAncestorsFomNodeList(this.activeNodeList)
    return nodeList.map(node => {
      return copyNodeTree({}, node, true)
    })
  }

  //  剪切节点
  cutNode(callback) {
    if (this.activeNodeList.length <= 0) {
      return
    }
    // 找出激活节点中的顶层节点列表，并过滤掉根节点
    const nodeList = getTopAncestorsFomNodeList(this.activeNodeList).filter(
      node => {
        return !node.isRoot
      }
    )
    // 复制数据
    const copyData = nodeList.map(node => {
      return copyNodeTree({}, node, true)
    })
    // 从父节点的数据中移除
    nodeList.forEach(node => {
      removeFromParentNodeData(node)
    })
    // 清空激活节点列表
    this.clearActiveNodeList()
    this.mindMap.render()
    if (callback && typeof callback === 'function') {
      callback(copyData)
    }
  }

  //  移动节点作为另一个节点的子节点
  moveNodeTo(node, toNode) {
    let nodeList = formatDataToArray(node)
    nodeList = nodeList.filter(item => {
      return !item.isRoot
    })
    nodeList.forEach(item => {
      this.checkNodeLayerChange(item, toNode)
      this.removeNodeFromActiveList(item)
      removeFromParentNodeData(item)
      toNode.nodeData.children.push(item.nodeData)
    })
    this.emitNodeActiveEvent()
    this.mindMap.render()
  }

  //   粘贴节点到节点
  pasteNode(data) {
    data = formatDataToArray(data)
    if (this.activeNodeList.length <= 0 || data.length <= 0) {
      return
    }
    this.activeNodeList.forEach(node => {
      node.nodeData.children.push(
        ...data.map(item => {
          const newData = simpleDeepClone(item)
          createUidForAppointNodes([newData], true)
          return newData
        })
      )
    })
    this.mindMap.render()
  }

  //  设置节点样式
  setNodeStyle(node, prop, value) {
    let data = {
      [prop]: value
    }
    // 如果开启了富文本，则需要应用到富文本上
    if (this.mindMap.richText) {
      this.mindMap.richText.setNotActiveNodeStyle(node, {
        [prop]: value
      })
    }
    this.setNodeDataRender(node, data)
    // 更新了连线的样式
    if (lineStyleProps.includes(prop)) {
      ;(node.parent || node).renderLine(true)
    }
  }

  //  设置节点多个样式
  setNodeStyles(node, style) {
    let data = { ...style }
    // 如果开启了富文本，则需要应用到富文本上
    if (this.mindMap.richText) {
      this.mindMap.richText.setNotActiveNodeStyle(node, style)
    }
    this.setNodeDataRender(node, data)
    // 更新了连线的样式
    let props = Object.keys(style)
    let hasLineStyleProps = false
    props.forEach(key => {
      if (lineStyleProps.includes(key)) {
        hasLineStyleProps = true
      }
    })
    if (hasLineStyleProps) {
      ;(node.parent || node).renderLine(true)
    }
  }

  //  设置节点是否激活
  setNodeActive(node, active) {
    this.mindMap.execCommand('SET_NODE_DATA', node, {
      isActive: active
    })
    node.updateNodeByActive(active)
  }

  //  设置节点是否展开
  setNodeExpand(node, expand) {
    this.mindMap.execCommand('SET_NODE_DATA', node, {
      expand
    })
    this.mindMap.render()
  }

  //  展开所有
  expandAllNode() {
    walk(
      this.renderTree,
      null,
      node => {
        if (!node.data.expand) {
          node.data.expand = true
        }
      },
      null,
      true,
      0,
      0
    )
    this.mindMap.render()
  }

  //  收起所有
  unexpandAllNode() {
    walk(
      this.renderTree,
      null,
      (node, parent, isRoot) => {
        if (!isRoot && node.children && node.children.length > 0) {
          node.data.expand = false
        }
      },
      null,
      true,
      0,
      0
    )
    this.mindMap.render(() => {
      this.mindMap.view.reset()
    })
  }

  //  展开到指定层级
  expandToLevel(level) {
    walk(
      this.renderTree,
      null,
      (node, parent, isRoot, layerIndex) => {
        const expand = layerIndex < level
        if (expand) {
          node.data.expand = true
        } else if (!isRoot && node.children && node.children.length > 0) {
          node.data.expand = false
        }
      },
      null,
      true,
      0,
      0
    )
    this.mindMap.render()
  }

  //  切换激活节点的展开状态
  toggleActiveExpand() {
    this.activeNodeList.forEach(node => {
      if (node.nodeData.children.length <= 0) {
        return
      }
      this.toggleNodeExpand(node)
    })
  }

  //  切换节点展开状态
  toggleNodeExpand(node) {
    this.mindMap.execCommand('SET_NODE_EXPAND', node, !node.getData('expand'))
  }

  //  设置节点文本
  setNodeText(node, text, richText, resetRichText) {
    this.setNodeDataRender(node, {
      text,
      richText,
      resetRichText
    })
  }

  //  设置节点图片
  setNodeImage(node, data) {
    const {
      url,
      title,
      width,
      height,
      custom = false
    } = data || { url: '', title: '', width: 0, height: 0, custom: false }
    this.setNodeDataRender(node, {
      image: url,
      imageTitle: title || '',
      imageSize: {
        width,
        height,
        custom
      }
    })
  }

  //  设置节点图标
  setNodeIcon(node, icons) {
    this.setNodeDataRender(node, {
      icon: icons
    })
  }

  //  设置节点超链接
  setNodeHyperlink(node, link, title = '') {
    this.setNodeDataRender(node, {
      hyperlink: link,
      hyperlinkTitle: title
    })
  }

  //  设置节点备注
  setNodeNote(node, note) {
    this.setNodeDataRender(node, {
      note
    })
  }

  //  设置节点标签
  setNodeTag(node, tag) {
    this.setNodeDataRender(node, {
      tag
    })
  }

  // 设置节点公式
  insertFormula(formula, appointNodes = []) {
    // 只在富文本模式下可用，并且需要注册Formula插件
    if (!this.mindMap.richText || !this.mindMap.formula) return
    appointNodes = formatDataToArray(appointNodes)
    const list = appointNodes.length > 0 ? appointNodes : this.activeNodeList
    list.forEach(node => {
      this.mindMap.formula.insertFormulaToNode(node, formula)
    })
  }

  //  添加节点概要
  addGeneralization(data) {
    if (this.activeNodeList.length <= 0) {
      return
    }
    const nodeList = this.activeNodeList.filter(node => {
      return (
        !node.isRoot &&
        !node.isGeneralization &&
        !node.checkHasSelfGeneralization()
      )
    })
    const list = parseAddGeneralizationNodeList(nodeList)
    list.forEach(item => {
      const newData = {
        ...(data || {
          text: this.mindMap.opt.defaultGeneralizationText
        }),
        range: item.range || null
      }
      let generalization = item.node.getData('generalization')
      if (generalization) {
        if (Array.isArray(generalization)) {
          generalization.push(newData)
        } else {
          generalization = [generalization, newData]
        }
      } else {
        generalization = [newData]
      }
      this.mindMap.execCommand('SET_NODE_DATA', item.node, {
        generalization
      })
      // 插入子节点时自动展开子节点
      item.node.setData({
        expand: true
      })
    })
    this.mindMap.render(() => {
      // 修复祖先节点存在概要时位置未更新的问题
      // 修复同时给存在上下级关系的节点添加概要时重叠的问题
      this.mindMap.render()
    })
  }

  //  删除节点概要
  removeGeneralization() {
    if (this.activeNodeList.length <= 0) {
      return
    }
    this.activeNodeList.forEach(node => {
      if (!node.checkHasGeneralization()) {
        return
      }
      this.mindMap.execCommand('SET_NODE_DATA', node, {
        generalization: null
      })
    })
    this.mindMap.render()
    this.closeHighlightNode()
  }

  //  设置节点自定义位置
  setNodeCustomPosition(node, left = undefined, top = undefined) {
    let nodeList = [node] || this.activeNodeList
    nodeList.forEach(item => {
      this.mindMap.execCommand('SET_NODE_DATA', item, {
        customLeft: left,
        customTop: top
      })
    })
  }

  //  一键整理布局，即去除自定义位置
  resetLayout() {
    walk(
      this.root,
      null,
      node => {
        node.customLeft = undefined
        node.customTop = undefined
        this.mindMap.execCommand('SET_NODE_DATA', node, {
          customLeft: undefined,
          customTop: undefined
        })
        this.mindMap.render()
      },
      null,
      true,
      0,
      0
    )
  }

  //  设置节点形状
  setNodeShape(node, shape) {
    if (!shape || !shapeList.includes(shape)) {
      return
    }
    let nodeList = [node] || this.activeNodeList
    nodeList.forEach(item => {
      this.setNodeStyle(item, 'shape', shape)
    })
  }

  // 定位到指定节点
  goTargetNode(node, callback = () => {}) {
    let uid = typeof node === 'string' ? node : node.getData('uid')
    if (!uid) return
    this.expandToNodeUid(uid, () => {
      let targetNode = this.findNodeByUid(uid)
      if (targetNode) {
        targetNode.active()
        this.moveNodeToCenter(targetNode)
        callback()
      }
    })
  }

  //  更新节点数据
  setNodeData(node, data) {
    Object.keys(data).forEach(key => {
      node.nodeData.data[key] = data[key]
    })
  }

  //  设置节点数据，并判断是否渲染
  setNodeDataRender(node, data, notRender = false) {
    this.mindMap.execCommand('SET_NODE_DATA', node, data)
    let changed = node.reRender()
    if (changed) {
      if (!notRender) this.mindMap.render()
    } else {
      this.mindMap.emit('node_tree_render_end')
    }
  }

  //  移动节点到画布中心
  moveNodeToCenter(node) {
    let halfWidth = this.mindMap.width / 2
    let halfHeight = this.mindMap.height / 2
    let { left, top, width, height } = node
    let nodeCenterX = left + width / 2
    let nodeCenterY = top + height / 2
    let { state } = this.mindMap.view.getTransformData()
    let targetX = halfWidth - state.x
    let targetY = halfHeight - state.y
    let offsetX = targetX - nodeCenterX
    let offsetY = targetY - nodeCenterY
    this.mindMap.view.translateX(offsetX)
    this.mindMap.view.translateY(offsetY)
    this.mindMap.view.setScale(1)
  }

  // 回到中心主题，即设置根节点到画布中心
  setRootNodeCenter() {
    this.moveNodeToCenter(this.root)
  }

  // 展开到指定uid的节点
  expandToNodeUid(uid, callback = () => {}) {
    let parentsList = []
    const cache = {}
    bfsWalk(this.renderTree, (node, parent) => {
      if (node.data.uid === uid) {
        parentsList = parent ? [...cache[parent.data.uid], parent] : []
        return 'stop'
      } else {
        cache[node.data.uid] = parent ? [...cache[parent.data.uid], parent] : []
      }
    })
    let needRender = false
    parentsList.forEach(node => {
      if (!node.data.expand) {
        needRender = true
        node.data.expand = true
      }
    })
    if (needRender) {
      this.mindMap.render(callback)
    } else {
      callback()
    }
  }

  // 根据uid找到对应的节点实例
  findNodeByUid(uid) {
    let res = null
    walk(this.root, null, node => {
      if (node.getData('uid') === uid) {
        res = node
        return true
      }
    })
    return res
  }

  // 高亮节点或子节点
  highlightNode(node, range) {
    const { highlightNodeBoxStyle = {} } = this.mindMap.opt
    if (!this.highlightBoxNode) {
      this.highlightBoxNode = new Polygon()
        .stroke({
          color: highlightNodeBoxStyle.stroke || 'transparent'
        })
        .fill({
          color: highlightNodeBoxStyle.fill || 'transparent'
        })
    }
    let minx = Infinity,
      miny = Infinity,
      maxx = -Infinity,
      maxy = -Infinity
    if (range) {
      const children = node.children.slice(range[0], range[1] + 1)
      children.forEach(child => {
        if (child.left < minx) {
          minx = child.left
        }
        if (child.top < miny) {
          miny = child.top
        }
        const right = child.left + child.width
        const bottom = child.top + child.height
        if (right > maxx) {
          maxx = right
        }
        if (bottom > maxy) {
          maxy = bottom
        }
      })
    } else {
      minx = node.left
      miny = node.top
      maxx = node.left + node.width
      maxy = node.top + node.height
    }
    this.highlightBoxNode.plot([
      [minx, miny],
      [maxx, miny],
      [maxx, maxy],
      [minx, maxy]
    ])
    this.mindMap.otherDraw.add(this.highlightBoxNode)
  }

  // 关闭高亮
  closeHighlightNode() {
    this.highlightBoxNode.remove()
  }
}

export default Render
