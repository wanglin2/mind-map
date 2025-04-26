import { CONSTANTS } from '../constants/constant'

// 该插件会向节点数据的data中添加dir字段
/*
  需要更新数据的情况：

   1.实例化时的数据
   2.调用setData和updateData方法
   3.执行完命令
   4.切换结构
*/

class MindMapLayoutPro {
  constructor(opt) {
    this.opt = opt
    this.mindMap = opt.mindMap
    this.init()
  }

  init() {
    this.updateNodeTree = this.updateNodeTree.bind(this)
    this.afterExecCommand = this.afterExecCommand.bind(this)
    this.layoutChange = this.layoutChange.bind(this)

    // 处理实例化时传入的数据
    if (this.mindMap.opt.data && this.isMindMapLayout()) {
      this.updateNodeTree(this.mindMap.opt.data)
    }

    this.mindMap.on('layout_change', this.layoutChange)
    this.mindMap.on('afterExecCommand', this.afterExecCommand)
    this.mindMap.on('before_update_data', this.updateNodeTree)
    this.mindMap.on('before_set_data', this.updateNodeTree)
  }

  restore() {
    this.mindMap.off('layout_change', this.layoutChange)
    this.mindMap.off('afterExecCommand', this.afterExecCommand)
    this.mindMap.off('before_update_data', this.updateNodeTree)
    this.mindMap.off('before_set_data', this.updateNodeTree)
  }

  // 监听命令执行后的事件
  afterExecCommand(name) {
    if (!this.isMindMapLayout()) return
    if (
      ![
        'BACK',
        'FORWARD',
        'INSERT_NODE',
        'INSERT_MULTI_NODE',
        'INSERT_CHILD_NODE',
        'INSERT_MULTI_CHILD_NODE',
        'INSERT_PARENT_NODE',
        'UP_NODE',
        'DOWN_NODE',
        'MOVE_UP_ONE_LEVEL',
        'INSERT_AFTER',
        'INSERT_BEFORE',
        'MOVE_NODE_TO',
        'REMOVE_NODE',
        'REMOVE_CURRENT_NODE',
        'PASTE_NODE',
        'CUT_NODE'
      ].includes(name)
    )
      return
    this.updateRenderTree()
  }

  // 更新布局结构
  layoutChange(layout) {
    if (layout === CONSTANTS.LAYOUT.MIND_MAP) {
      this.updateRenderTree()
    }
  }

  // 更新当前的渲染树
  updateRenderTree() {
    this.updateNodeTree(this.mindMap.renderer.renderTree)
  }

  // 更新节点树，修改二级节点的排列位置
  updateNodeTree(tree) {
    if (!this.isMindMapLayout()) return
    const root = tree
    const childrenLength = root.children.length
    if (childrenLength <= 0) return
    const center = Math.ceil(childrenLength / 2)
    root.children.forEach((item, index) => {
      if (index + 1 <= center) {
        item.data.dir = CONSTANTS.LAYOUT_GROW_DIR.RIGHT
      } else {
        item.data.dir = CONSTANTS.LAYOUT_GROW_DIR.LEFT
      }
    })
  }

  // 判断当前是否是思维导图布局结构
  isMindMapLayout() {
    return this.mindMap.opt.layout === CONSTANTS.LAYOUT.MIND_MAP
  }

  // 插件被移除前做的事情
  beforePluginRemove() {
    this.restore()
  }

  // 插件被卸载前做的事情
  beforePluginDestroy() {
    this.restore()
  }
}

MindMapLayoutPro.instanceName = 'mindMapLayoutPro'

export default MindMapLayoutPro
