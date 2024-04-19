import {
  walk,
  getNodeTreeBoundingRect,
  fullscrrenEvent,
  fullScreen,
  exitFullScreen
} from '../utils/index'
import { keyMap } from '../core/command/keyMap'

const defaultConfig = {
  boxShadowColor: 'rgba(0, 0, 0, 0.8)', // 高亮框四周的区域颜色
  borderRadius: '5px', // 高亮框的圆角大小
  transition: 'all 0.3s ease-out', // 高亮框动画的过渡
  zIndex: 9999, // 高亮框元素的层级
  padding: 20, // 高亮框的内边距
  margin: 50 // 高亮框的外边距
}

// 演示插件
class Demonstrate {
  constructor(opt) {
    this.mindMap = opt.mindMap
    this.stepList = []
    this.currentStepIndex = 0
    this.maskEl = null
    this.highlightEl = null
    this.transformState = null
    this.renderTree = null
    this.config = Object.assign(
      { ...defaultConfig },
      this.mindMap.opt.demonstrateConfig || {}
    )
  }

  // 进入演示模式
  enter() {
    // 全屏
    this.bindFullscreenEvent()
    // 如果已经全屏了
    if (document.fullscreenElement === this.mindMap.el) {
      this._enter()
    } else {
      // 否则申请全屏
      fullScreen(this.mindMap.el)
    }
  }

  _enter() {
    // 记录演示前的画布状态
    this.transformState = this.mindMap.view.getTransformData()
    // 记录演示前的画布数据
    this.renderTree = this.mindMap.getData()
    // 暂停收集历史记录
    this.mindMap.command.pause()
    // 暂停思维导图快捷键响应
    this.mindMap.keyCommand.pause()
    // 创建高亮元素
    this.createHighlightEl()
    // 计算步骤数据
    this.getStepList()
    // 收起所有节点
    this.mindMap.execCommand('UNEXPAND_ALL', false)
    const onRenderEnd = () => {
      this.mindMap.off('node_tree_render_end', onRenderEnd)
      // 聚焦到第一步
      this.jump(this.currentStepIndex)
      this.bindEvent()
    }
    this.mindMap.on('node_tree_render_end', onRenderEnd)
  }

  // 退出演示模式
  exit() {
    exitFullScreen(this.mindMap.el)
    this.mindMap.updateData(this.renderTree)
    this.mindMap.view.setTransformData(this.transformState)
    this.renderTree = null
    this.transformState = null
    this.stepList = []
    this.currentStepIndex = 0
    this.unBindEvent()
    this.removeHighlightEl()
    this.mindMap.command.recovery()
    this.mindMap.keyCommand.recovery()
    this.mindMap.emit('exit_demonstrate')
  }

  // 创建高亮元素
  createHighlightEl() {
    if (!this.highlightEl) {
      // 遮罩元素
      this.maskEl = document.createElement('div')
      this.maskEl.style.cssText = `
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            z-index: ${this.config.zIndex};
        `
      this.mindMap.el.appendChild(this.maskEl)
      // 高亮元素
      this.highlightEl = document.createElement('div')
      this.highlightEl.style.cssText = `
            position: absolute;
            box-shadow: 0 0 0 5000px ${this.config.boxShadowColor};
            border-radius: ${this.config.borderRadius};
            transition: ${this.config.transition};
            z-index: ${this.config.zIndex + 1};
        `
      this.mindMap.el.appendChild(this.highlightEl)
    }
  }

  // 移除高亮元素
  removeHighlightEl() {
    if (this.highlightEl) {
      this.mindMap.el.removeChild(this.highlightEl)
      this.highlightEl = null
    }
    if (this.maskEl) {
      this.mindMap.el.removeChild(this.maskEl)
      this.maskEl = null
    }
  }

  // 更新高亮元素的位置和大小
  updateHighlightEl({ left, top, width, height }) {
    const padding = this.config.padding
    if (left) {
      this.highlightEl.style.left = left - padding + 'px'
    }
    if (top) {
      this.highlightEl.style.top = top - padding + 'px'
    }
    if (width) {
      this.highlightEl.style.width = width + padding * 2 + 'px'
    }
    if (height) {
      this.highlightEl.style.height = height + padding * 2 + 'px'
    }
  }

  // 绑定事件
  bindEvent() {
    this.onKeydown = this.onKeydown.bind(this)
    window.addEventListener('keydown', this.onKeydown)
  }

  // 绑定全屏事件
  bindFullscreenEvent() {
    this.onFullscreenChange = this.onFullscreenChange.bind(this)
    document.addEventListener(fullscrrenEvent, this.onFullscreenChange)
  }

  // 解绑事件
  unBindEvent() {
    window.removeEventListener('keydown', this.onKeydown)
    document.removeEventListener(fullscrrenEvent, this.onFullscreenChange)
  }

  // 全屏状态改变
  onFullscreenChange() {
    if (!document.fullscreenElement) {
      this.exit()
    } else if (document.fullscreenElement === this.mindMap.el) {
      this._enter()
    }
  }

  // 按键事件
  onKeydown(e) {
    // 上一个
    if (e.keyCode === keyMap.Left) {
      this.prev()
    } else if (e.keyCode === keyMap.Right) {
      // 下一个
      this.next()
    } else if (e.keyCode === keyMap.Esc) {
      // 退出演示
      this.exit()
    }
  }

  // 上一张
  prev() {
    if (this.currentStepIndex > 0) {
      this.jump(this.currentStepIndex - 1)
    }
  }

  // 下一张
  next() {
    const stepLength = this.stepList.length
    if (this.currentStepIndex < stepLength - 1) {
      this.jump(this.currentStepIndex + 1)
    }
  }

  // 跳转到某一张
  jump(index) {
    this.currentStepIndex = index
    this.mindMap.emit(
      'demonstrate_jump',
      this.currentStepIndex,
      this.stepList.length
    )
    const step = this.stepList[index]
    // 这一步的节点数据
    const nodeData = step.node
    // 该节点的uid
    const uid = nodeData.data.uid
    // 根据uid在画布上找到该节点实例
    const node = this.mindMap.renderer.findNodeByUid(uid)
    // 如果该节点实例不存在，那么先展开到该节点
    if (!node) {
      this.mindMap.renderer.expandToNodeUid(uid, () => {
        this.jump(index)
      })
      return
    }
    // 1.聚焦到某个节点
    if (step.type === 'node') {
      // 适应画布大小
      this.mindMap.view.fit(
        () => {
          return node.group.rbox()
        },
        true,
        this.config.padding + this.config.margin
      )
      const rect = node.group.rbox()
      this.updateHighlightEl({
        left: rect.x,
        top: rect.y,
        width: rect.width,
        height: rect.height
      })
    } else {
      // 2.聚焦到某个节点的所有子节点
      // 聚焦该节点的所有子节点
      const task = () => {
        // 先收起该节点所有子节点的子节点
        nodeData.children.forEach(item => {
          item.data.expand = false
        })
        this.mindMap.render(() => {
          // 适应画布大小
          this.mindMap.view.fit(
            () => {
              const res = getNodeTreeBoundingRect(node, 0, 0, 0, 0, true)
              return {
                ...res,
                x: res.left,
                y: res.top
              }
            },
            true,
            this.config.padding + this.config.margin
          )
          const res = getNodeTreeBoundingRect(node, 0, 0, 0, 0, true)
          this.updateHighlightEl(res)
        })
      }
      // 如果该节点是收起状态，那么需要先展开
      if (!nodeData.data.expand) {
        this.mindMap.execCommand('SET_NODE_EXPAND', node, true)
        const onRenderEnd = () => {
          this.mindMap.off('node_tree_render_end', onRenderEnd)
          task()
        }
        this.mindMap.on('node_tree_render_end', onRenderEnd)
      } else {
        // 否则直接聚焦
        task()
      }
    }
  }

  // 深度度优先遍历所有节点，返回步骤列表
  getStepList() {
    walk(this.mindMap.renderer.renderTree, null, node => {
      this.stepList.push({
        type: 'node',
        node
      })
      if (node.children.length > 1) {
        this.stepList.push({
          type: 'children',
          node
        })
      }
    })
  }

  // 插件被移除前做的事情
  beforePluginRemove() {
    this.unBindEvent()
  }

  // 插件被卸载前做的事情
  beforePluginDestroy() {
    this.unBindEvent()
  }
}

Demonstrate.instanceName = 'demonstrate'

export default Demonstrate
