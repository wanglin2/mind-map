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
  isUndef
} from '../../utils'
import { shapeList } from './node/Shape'
import { lineStyleProps } from '../../themes/default'
import { CONSTANTS } from '../../constants/constant'

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
    this.draw = this.mindMap.draw
    // 渲染树，操作过程中修改的都是这里的数据
    this.renderTree = merge({}, this.mindMap.opt.data || {})
    // 是否重新渲染
    this.reRender = false
    // 是否正在渲染中
    this.isRendering = false
    // 是否存在等待渲染
    this.hasWaitRendering = false
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

  //   绑定事件
  bindEvent() {
    // 点击事件
    this.mindMap.on('draw_click', e => {
      // 清除激活状态
      let isTrueClick = true
      let { useLeftKeySelectionRightKeyDrag } = this.mindMap.opt
      if (useLeftKeySelectionRightKeyDrag) {
        let mousedownPos = this.mindMap.event.mousedownPos
        isTrueClick =
          Math.abs(e.clientX - mousedownPos.x) <= 5 &&
          Math.abs(e.clientY - mousedownPos.y) <= 5
      }
      if (isTrueClick && this.activeNodeList.length > 0) {
        this.mindMap.execCommand('CLEAR_ACTIVE_NODE')
      }
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
    // 插入子节点
    this.insertChildNode = this.insertChildNode.bind(this)
    this.mindMap.command.add('INSERT_CHILD_NODE', this.insertChildNode)
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
    this.clearAllActive = this.clearAllActive.bind(this)
    this.mindMap.command.add('CLEAR_ACTIVE_NODE', this.clearAllActive)
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
    this.insertNodeWrap = () => {
      if (this.textEdit.showTextEdit) {
        return
      }
      this.mindMap.execCommand('INSERT_NODE')
    }
    this.mindMap.keyCommand.addShortcut('Enter', this.insertNodeWrap)
    // 插入概要
    this.mindMap.keyCommand.addShortcut('Control+g', this.addGeneralization)
    // 展开/收起节点
    this.toggleActiveExpand = this.toggleActiveExpand.bind(this)
    this.mindMap.keyCommand.addShortcut('/', this.toggleActiveExpand)
    // 删除节点
    this.removeNodeWrap = () => {
      this.mindMap.execCommand('REMOVE_NODE')
    }
    this.mindMap.keyCommand.addShortcut('Del|Backspace', this.removeNodeWrap)
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
    this.mindMap.keyCommand.addShortcut('Control+l', this.resetLayout)
    // 上移节点
    this.mindMap.keyCommand.addShortcut('Control+Up', this.upNode)
    // 下移节点
    this.mindMap.keyCommand.addShortcut('Control+Down', this.downNode)
    // 复制节点、剪切节点、粘贴节点的快捷键需开发者自行注册实现，可参考demo
    this.copy = this.copy.bind(this)
    this.mindMap.keyCommand.addShortcut('Control+c', this.copy)
    this.mindMap.keyCommand.addShortcut('Control+v', () => {
      this.onPaste()
    })
    this.cut = this.cut.bind(this)
    this.mindMap.keyCommand.addShortcut('Control+x', this.cut)
  }

  //  开启文字编辑，会禁用回车键和删除键相关快捷键防止冲突
  startTextEdit() {
    this.mindMap.keyCommand.save()
    // this.mindMap.keyCommand.removeShortcut('Del|Backspace')
    // this.mindMap.keyCommand.removeShortcut('/')
    // this.mindMap.keyCommand.removeShortcut('Enter', this.insertNodeWrap)
  }

  //  结束文字编辑，会恢复回车键和删除键相关快捷键
  endTextEdit() {
    this.mindMap.keyCommand.restore()
    // this.mindMap.keyCommand.addShortcut('Del|Backspace', this.removeNodeWrap)
    // this.mindMap.keyCommand.addShortcut('/', this.toggleActiveExpand)
    // this.mindMap.keyCommand.addShortcut('Enter', this.insertNodeWrap)
  }

  //   渲染
  render(callback = () => {}, source) {
    // 如果当前还没有渲染完毕，不再触发渲染
    if (this.isRendering) {
      // 等待当前渲染完毕后再进行一次渲染
      this.hasWaitRendering = true
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
      this.clearActive()
    }
    // 计算布局
    this.layout.doLayout(root => {
      // 删除本次渲染时不再需要的节点
      Object.keys(this.lastNodeCache).forEach(uid => {
        if (!this.nodeCache[uid]) {
          this.lastNodeCache[uid].destroy()
          if (this.lastNodeCache[uid].parent) {
            this.lastNodeCache[uid].parent.removeLine()
          }
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
          this.hasWaitRendering = false
          this.render(callback, source)
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
    this.mindMap.emit('node_active', null, this.activeNodeList)
  }

  //  清除当前激活的节点
  clearActive() {
    this.activeNodeList.forEach(item => {
      this.setNodeActive(item, false)
    })
    this.activeNodeList = []
  }

  //  清除当前所有激活节点，并会触发事件
  clearAllActive() {
    if (this.activeNodeList.length <= 0) {
      return
    }
    this.clearActive()
    this.mindMap.emit('node_active', null, [])
  }

  //   添加节点到激活列表里
  addActiveNode(node) {
    let index = this.findActiveNodeIndex(node)
    if (index === -1) {
      this.activeNodeList.push(node)
    }
  }

  //  在激活列表里移除某个节点
  removeActiveNode(node) {
    let index = this.findActiveNodeIndex(node)
    if (index === -1) {
      return
    }
    this.activeNodeList.splice(index, 1)
  }

  //  检索某个节点在激活列表里的索引
  findActiveNodeIndex(node) {
    return this.activeNodeList.findIndex(item => {
      return item === node
    })
  }

  //  获取节点在同级里的索引位置
  getNodeIndex(node) {
    return node.parent
      ? node.parent.children.findIndex(item => {
          return item === node
        })
      : 0
  }

  //  全选
  selectAll() {
    walk(
      this.root,
      null,
      node => {
        if (!node.nodeData.data.isActive) {
          node.nodeData.data.isActive = true
          this.addActiveNode(node)
          // 激活节点需要显示展开收起按钮
          node.showExpandBtn()
          setTimeout(() => {
            node.updateNodeShape()
          }, 0)
        }
      },
      null,
      true,
      0,
      0
    )
  }

  //  回退
  back(step) {
    this.clearAllActive()
    let data = this.mindMap.command.back(step)
    if (data) {
      this.renderTree = data
      this.mindMap.render()
    }
  }

  //  前进
  forward(step) {
    this.clearAllActive()
    let data = this.mindMap.command.forward(step)
    if (data) {
      this.renderTree = data
      this.mindMap.render()
    }
  }

  // 规范指定节点数据
  formatAppointNodes(appointNodes) {
    if (!appointNodes) return []
    return Array.isArray(appointNodes) ? appointNodes : [appointNodes]
  }

  //  插入同级节点，多个节点只会操作第一个节点
  insertNode(
    openEdit = true,
    appointNodes = [],
    appointData = null,
    appointChildren = []
  ) {
    appointNodes = this.formatAppointNodes(appointNodes)
    if (this.activeNodeList.length <= 0 && appointNodes.length <= 0) {
      return
    }
    this.textEdit.hideEditTextBox()
    let {
      defaultInsertSecondLevelNodeText,
      defaultInsertBelowSecondLevelNodeText
    } = this.mindMap.opt
    let list = appointNodes.length > 0 ? appointNodes : this.activeNodeList
    let first = list[0]
    if (first.isGeneralization) {
      return
    }
    if (first.isRoot) {
      this.insertChildNode(openEdit, appointNodes, appointData)
    } else {
      let text =
        first.layerIndex === 1
          ? defaultInsertSecondLevelNodeText
          : defaultInsertBelowSecondLevelNodeText
      if (first.layerIndex === 1) {
        first.parent.destroy()
      }
      let index = this.getNodeIndex(first)
      let isRichText = !!this.mindMap.richText
      first.parent.nodeData.children.splice(index + 1, 0, {
        inserting: openEdit,
        data: {
          text: text,
          expand: true,
          richText: isRichText,
          resetRichText: isRichText,
          ...(appointData || {})
        },
        children: [...appointChildren]
      })
      this.mindMap.render()
    }
  }

  //  插入子节点
  insertChildNode(
    openEdit = true,
    appointNodes = [],
    appointData = null,
    appointChildren = []
  ) {
    appointNodes = this.formatAppointNodes(appointNodes)
    if (this.activeNodeList.length <= 0 && appointNodes.length <= 0) {
      return
    }
    this.textEdit.hideEditTextBox()
    let {
      defaultInsertSecondLevelNodeText,
      defaultInsertBelowSecondLevelNodeText
    } = this.mindMap.opt
    let list = appointNodes.length > 0 ? appointNodes : this.activeNodeList
    list.forEach(node => {
      if (node.isGeneralization) {
        return
      }
      if (!node.nodeData.children) {
        node.nodeData.children = []
      }
      let text = node.isRoot
        ? defaultInsertSecondLevelNodeText
        : defaultInsertBelowSecondLevelNodeText
      let isRichText = !!this.mindMap.richText
      node.nodeData.children.push({
        inserting: openEdit,
        data: {
          text: text,
          expand: true,
          richText: isRichText,
          resetRichText: isRichText,
          ...(appointData || {})
        },
        children: [...appointChildren]
      })
      // 插入子节点时自动展开子节点
      node.nodeData.data.expand = true
      if (node.isRoot) {
        node.destroy()
      }
    })
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
    let index = childList.findIndex(item => {
      return item === node
    })
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
    let index = childList.findIndex(item => {
      return item === node
    })
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
    this.setCoptyDataToClipboard(this.beingCopyData)
  }

  // 剪切节点
  cut() {
    this.mindMap.execCommand('CUT_NODE', copyData => {
      this.beingCopyData = copyData
      this.setCoptyDataToClipboard(copyData)
    })
  }

  // 将粘贴或剪切的数据设置到用户剪切板中
  setCoptyDataToClipboard(data) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(
        JSON.stringify({
          simpleMindMap: true,
          data
        })
      )
    }
  }

  // 粘贴节点
  paste() {
    if (this.beingCopyData) {
      this.mindMap.execCommand('PASTE_NODE', this.beingCopyData)
    }
  }

  // 粘贴事件
  async onPaste() {
    // 读取剪贴板的文字和图片
    let text = null
    let img = null
    if (navigator.clipboard) {
      try {
        text = await navigator.clipboard.readText()
        const items = await navigator.clipboard.read()
        if (items && items.length > 0) {
          for (const clipboardItem of items) {
            for (const type of clipboardItem.types) {
              if (/^image\//.test(type)) {
                img = await clipboardItem.getType(type)
                break
              }
            }
          }
        }
      } catch (error) {
        console.log(error)
      }
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
          } catch (error) {}
        }
        // 默认处理
        if (useDefault) {
          try {
            const parsedData = JSON.parse(text)
            if (parsedData && parsedData.simpleMindMap) {
              smmData = parsedData.data
            }
          } catch (error) {}
        }
        if (smmData) {
          this.mindMap.execCommand(
            'INSERT_CHILD_NODE',
            false,
            [],
            {
              ...smmData.data
            },
            [...smmData.children]
          )
        } else {
          this.mindMap.execCommand('INSERT_CHILD_NODE', false, [], {
            text
          })
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
          console.log(error)
        }
      }
    } else {
      // 粘贴节点数据
      this.paste()
    }
  }

  //  将节点移动到另一个节点的前面
  insertBefore(node, exist) {
    if (node.isRoot) {
      return
    }
    // 如果是二级节点变成了下级节点，或是下级节点变成了二级节点，节点样式需要更新
    let nodeLayerChanged =
      (node.layerIndex === 1 && exist.layerIndex !== 1) ||
      (node.layerIndex !== 1 && exist.layerIndex === 1)
    // 移动节点
    let nodeParent = node.parent
    let nodeBorthers = nodeParent.children
    let nodeIndex = nodeBorthers.findIndex(item => {
      return item === node
    })
    if (nodeIndex === -1) {
      return
    }
    nodeBorthers.splice(nodeIndex, 1)
    nodeParent.nodeData.children.splice(nodeIndex, 1)

    // 目标节点
    let existParent = exist.parent
    let existBorthers = existParent.children
    let existIndex = existBorthers.findIndex(item => {
      return item === exist
    })
    if (existIndex === -1) {
      return
    }
    existBorthers.splice(existIndex, 0, node)
    existParent.nodeData.children.splice(existIndex, 0, node.nodeData)
    this.mindMap.render(() => {
      if (nodeLayerChanged) {
        node.reRender()
      }
    })
  }

  //  将节点移动到另一个节点的后面
  insertAfter(node, exist) {
    if (node.isRoot) {
      return
    }
    // 如果是二级节点变成了下级节点，或是下级节点变成了二级节点，节点样式需要更新
    let nodeLayerChanged =
      (node.layerIndex === 1 && exist.layerIndex !== 1) ||
      (node.layerIndex !== 1 && exist.layerIndex === 1)
    // 移动节点
    let nodeParent = node.parent
    let nodeBorthers = nodeParent.children
    let nodeIndex = nodeBorthers.findIndex(item => {
      return item === node
    })
    if (nodeIndex === -1) {
      return
    }
    nodeBorthers.splice(nodeIndex, 1)
    nodeParent.nodeData.children.splice(nodeIndex, 1)

    // 目标节点
    let existParent = exist.parent
    let existBorthers = existParent.children
    let existIndex = existBorthers.findIndex(item => {
      return item === exist
    })
    if (existIndex === -1) {
      return
    }
    existIndex++
    existBorthers.splice(existIndex, 0, node)
    existParent.nodeData.children.splice(existIndex, 0, node.nodeData)
    this.mindMap.render(() => {
      if (nodeLayerChanged) {
        node.reRender()
      }
    })
  }

  //  移除节点
  removeNode(appointNodes = []) {
    appointNodes = this.formatAppointNodes(appointNodes)
    if (this.activeNodeList.length <= 0 && appointNodes.length <= 0) {
      return
    }
    let isAppointNodes = appointNodes.length > 0
    let list = isAppointNodes ? appointNodes : this.activeNodeList
    let root = list.find(node => {
      return node.isRoot
    })
    if (root) {
      this.clearActive()
      root.children.forEach(child => {
        child.remove()
      })
      root.children = []
      root.nodeData.children = []
    } else {
      for (let i = 0; i < list.length; i++) {
        let node = list[i]
        if (isAppointNodes) list.splice(i, 1)
        if (node.isGeneralization) {
          // 删除概要节点
          this.setNodeData(node.generalizationBelongNode, {
            generalization: null
          })
          node.generalizationBelongNode.update()
          this.removeActiveNode(node)
          i--
        } else {
          this.removeActiveNode(node)
          this.removeOneNode(node)
          i--
        }
      }
    }
    this.mindMap.emit('node_active', null, this.activeNodeList)
    this.mindMap.render()
  }

  //  移除某个指定节点
  removeOneNode(node) {
    let index = this.getNodeIndex(node)
    node.remove()
    node.parent.children.splice(index, 1)
    node.parent.nodeData.children.splice(index, 1)
  }

  //  复制节点，多个节点只会操作第一个节点
  copyNode() {
    if (this.activeNodeList.length <= 0) {
      return
    }
    return copyNodeTree({}, this.activeNodeList[0], true)
  }

  //  剪切节点，多个节点只会操作第一个节点
  cutNode(callback) {
    if (this.activeNodeList.length <= 0) {
      return
    }
    let node = this.activeNodeList[0]
    if (node.isRoot) {
      return null
    }
    let copyData = copyNodeTree({}, node, true)
    this.removeActiveNode(node)
    this.removeOneNode(node)
    this.mindMap.emit('node_active', null, this.activeNodeList)
    this.mindMap.render()
    if (callback && typeof callback === 'function') {
      callback(copyData)
    }
  }

  //  移动一个节点作为另一个节点的子节点
  moveNodeTo(node, toNode) {
    if (node.isRoot) {
      return
    }
    // let copyData = copyNodeTree({}, node, false, true)
    this.removeActiveNode(node)
    this.removeOneNode(node)
    this.mindMap.emit('node_active', null, this.activeNodeList)
    toNode.nodeData.children.push(node.nodeData)
    this.mindMap.render()
    if (toNode.isRoot) {
      toNode.destroy()
    }
  }

  //   粘贴节点到节点
  pasteNode(data) {
    if (this.activeNodeList.length <= 0 || !data) {
      return
    }
    this.activeNodeList.forEach(item => {
      item.nodeData.children.push(simpleDeepClone(data))
    })
    this.mindMap.render()
  }

  //  设置节点样式
  setNodeStyle(node, prop, value, isActive) {
    let data = {}
    if (isActive) {
      data = {
        activeStyle: {
          ...(node.nodeData.data.activeStyle || {}),
          [prop]: value
        }
      }
    } else {
      data = {
        [prop]: value
      }
    }
    // 如果开启了富文本，则需要应用到富文本上
    if (this.mindMap.richText) {
      let config = this.mindMap.richText.normalStyleToRichTextStyle({
        [prop]: value
      })
      if (Object.keys(config).length > 0) {
        this.mindMap.richText.showEditText(node)
        this.mindMap.richText.formatAllText(config)
        this.mindMap.richText.hideEditText([node])
      }
    }
    this.setNodeDataRender(node, data)
    // 更新了连线的样式
    if (lineStyleProps.includes(prop)) {
      ;(node.parent || node).renderLine(true)
    }
  }

  //  设置节点多个样式
  setNodeStyles(node, style, isActive) {
    let data = {}
    if (isActive) {
      data = {
        activeStyle: {
          ...(node.nodeData.data.activeStyle || {}),
          ...style
        }
      }
    } else {
      data = style
    }
    // 如果开启了富文本，则需要应用到富文本上
    if (this.mindMap.richText) {
      let config = this.mindMap.richText.normalStyleToRichTextStyle(style)
      if (Object.keys(config).length > 0) {
        this.mindMap.richText.showEditText(node)
        this.mindMap.richText.formatAllText(config)
        this.mindMap.richText.hideEditText([node])
      }
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
    this.setNodeData(node, {
      isActive: active
    })
    // 切换激活状态，需要切换展开收起按钮的显隐
    if (active) {
      node.showExpandBtn()
    } else {
      node.hideExpandBtn()
    }
    node.updateNodeShape()
  }

  //  设置节点是否展开
  setNodeExpand(node, expand) {
    this.setNodeData(node, {
      expand
    })
    if (expand) {
      // 展开
      node.children.forEach(item => {
        item.render()
      })
      node.renderLine()
      // node.updateExpandBtnNode()
    } else {
      // 收缩
      node.children.forEach(item => {
        item.remove()
      })
      node.removeLine()
      // node.updateExpandBtnNode()
    }
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
        node._node = null
        if (!isRoot) {
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
        node._node = null
        node.data.expand = layerIndex < level
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
    this.mindMap.execCommand(
      'SET_NODE_EXPAND',
      node,
      !node.nodeData.data.expand
    )
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
    const { url, title, width, height, custom = false } = data || { url: '', title: '', width: 0, height: 0, custom: false }
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

  //  添加节点概要
  addGeneralization(data) {
    if (this.activeNodeList.length <= 0) {
      return
    }
    this.activeNodeList.forEach(node => {
      if (node.nodeData.data.generalization || node.isRoot) {
        return
      }
      this.setNodeData(node, {
        generalization: data || {
          text: '概要'
        }
      })
      node.update()
    })
    this.mindMap.render()
  }

  //  删除节点概要
  removeGeneralization() {
    if (this.activeNodeList.length <= 0) {
      return
    }
    this.activeNodeList.forEach(node => {
      if (!node.nodeData.data.generalization) {
        return
      }
      this.setNodeData(node, {
        generalization: null
      })
      node.update()
    })
    this.mindMap.render()
  }

  //  设置节点自定义位置
  setNodeCustomPosition(node, left = undefined, top = undefined) {
    let nodeList = [node] || this.activeNodeList
    nodeList.forEach(item => {
      this.setNodeData(item, {
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
        this.setNodeData(node, {
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
    let uid = typeof node === 'string' ? node : node.nodeData.data.uid
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
    this.setNodeData(node, data)
    let changed = node.reRender()
    if (changed) {
      if (node.isGeneralization) {
        // 概要节点
        node.generalizationBelongNode.updateGeneralization()
      }
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
      if (node.nodeData.data.uid === uid) {
        res = node
        return true
      }
    })
    return res
  }
}

export default Render
