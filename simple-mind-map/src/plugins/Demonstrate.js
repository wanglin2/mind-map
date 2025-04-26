import {
  walk,
  getNodeTreeBoundingRect,
  fullscrrenEvent,
  fullScreen,
  exitFullScreen,
  formatGetNodeGeneralization
} from '../utils/index'
import { keyMap } from '../core/command/keyMap'

const defaultConfig = {
  boxShadowColor: 'rgba(0, 0, 0, 0.8)', // 高亮框四周的区域颜色
  borderRadius: '5px', // 高亮框的圆角大小
  transition: 'all 0.3s ease-out', // 高亮框动画的过渡
  zIndex: 9999, // 高亮框元素的层级
  padding: 20, // 高亮框的内边距
  margin: 50, // 高亮框的外边距
  openBlankMode: true // 是否开启填空模式，即带下划线的文本默认不显示，按回车键才依次显示
}

// 演示插件
class Demonstrate {
  constructor(opt) {
    this.mindMap = opt.mindMap
    // 是否正在演示中
    this.isInDemonstrate = false
    // 演示的步骤列表
    this.stepList = []
    // 当前所在步骤
    this.currentStepIndex = 0
    // 当前所在步骤对应的节点实例
    this.currentStepNode = null
    // 当前所在步骤节点的下划线文本数据
    this.currentUnderlineTextData = null
    // 临时的样式剩余
    this.tmpStyleEl = null
    // 高亮样式元素
    this.highlightEl = null
    this.transformState = null
    this.renderTree = null
    this.config = Object.assign(
      { ...defaultConfig },
      this.mindMap.opt.demonstrateConfig || {}
    )
    this.needRestorePerformanceMode = false
    this.onConfigUpdate = this.onConfigUpdate.bind(this)
    this.mindMap.on('after_update_config', this.onConfigUpdate)
  }

  // 监听配置更新
  onConfigUpdate(opt) {
    if (typeof opt.demonstrateConfig !== 'undefined') {
      this.config = {
        ...this.config,
        ...opt.demonstrateConfig
      }
    }
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
    this.isInDemonstrate = true
    // 如果开启了性能模式，那么需要暂停
    this.pausePerformanceMode()
    // 添加演示用的临时的样式
    this.addTmpStyles()
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
    let wait = false
    if (this.mindMap.renderer.isRendering) {
      wait = true
    }
    this.mindMap.execCommand('UNEXPAND_ALL', false)
    const onRenderEnd = () => {
      if (wait) {
        wait = false
        return
      }
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
    this.currentStepNode = null
    this.currentUnderlineTextData = null
    this.unBindEvent()
    this.removeTmpStyles()
    this.removeHighlightEl()
    this.mindMap.command.recovery()
    this.mindMap.keyCommand.recovery()
    this.restorePerformanceMode()
    this.mindMap.emit('exit_demonstrate')
    this.isInDemonstrate = false
  }

  // 暂停性能模式
  pausePerformanceMode() {
    const { openPerformance } = this.mindMap.opt
    if (openPerformance) {
      this.needRestorePerformanceMode = true
      this.mindMap.opt.openPerformance = false
      this.mindMap.renderer.forceLoadNode()
    }
  }

  // 恢复性能模式
  restorePerformanceMode() {
    if (!this.needRestorePerformanceMode) return
    this.mindMap.opt.openPerformance = true
    this.mindMap.renderer.forceLoadNode()
  }

  // 添加临时的样式
  addTmpStyles() {
    this.tmpStyleEl = document.createElement('style')
    let cssText = `
      /* 画布所有元素禁止响应鼠标事件 */
      .smm-mind-map-container {
        pointer-events: none;
      }
      /* 超链接图标允许响应鼠标事件 */
      .smm-node a {
        pointer-events: all;
      }
      /* 备注图标允许响应鼠标事件 */
      .smm-node .smm-node-note {
        pointer-events: all;
      }
    `
    if (this.config.openBlankMode) {
      cssText += `
        /* 带下划线的文本内容全部隐藏 */
        .smm-richtext-node-wrap u {
          opacity: 0;
        }
      `
    }
    this.tmpStyleEl.innerText = cssText
    document.head.appendChild(this.tmpStyleEl)
  }

  // 移除临时的样式
  removeTmpStyles() {
    if (this.tmpStyleEl) document.head.removeChild(this.tmpStyleEl)
  }

  // 创建高亮元素
  createHighlightEl() {
    if (!this.highlightEl) {
      // 高亮元素
      this.highlightEl = document.createElement('div')
      this.highlightEl.style.cssText = `
            position: absolute;
            box-shadow: 0 0 0 5000px ${this.config.boxShadowColor};
            border-radius: ${this.config.borderRadius};
            transition: ${this.config.transition};
            z-index: ${this.config.zIndex + 1};
            pointer-events: none;
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
    } else if (e.keyCode === keyMap.Enter) {
      // 回车键显示隐藏的下划线文本
      this.showNextUnderlineText()
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

  // 显示隐藏的下划线文本
  showNextUnderlineText() {
    if (
      !this.config.openBlankMode ||
      !this.currentStepNode ||
      !this.currentUnderlineTextData
    )
      return
    const { index, list, length } = this.currentUnderlineTextData
    if (index >= length) return
    const node = list[index]
    this.currentUnderlineTextData.index++
    node.node.style.opacity = 1
  }

  // 跳转到某一张
  jump(index) {
    // 移除该当前下划线元素设置的样式
    if (this.currentUnderlineTextData) {
      this.currentUnderlineTextData.list.forEach(item => {
        item.node.style.opacity = ''
      })
      this.currentUnderlineTextData = null
    }
    this.currentStepNode = null
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
        const node = this.mindMap.renderer.findNodeByUid(uid)
        // 展开后还是没找到，那么就别进入了，否则会死循环
        if (node) {
          this.jump(index)
        }
      })
      return
    }
    // 1.聚焦到某个节点
    if (step.type === 'node') {
      this.currentStepNode = node
      // 当前节点存在带下划线的文本内容
      const uNodeList = this.config.openBlankMode ? node.group.find('u') : null
      if (uNodeList && uNodeList.length > 0) {
        this.currentUnderlineTextData = {
          index: 0,
          list: uNodeList,
          length: uNodeList.length
        }
      }
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
      // 添加概要步骤
      const generalizationList = formatGetNodeGeneralization(node.data)
      generalizationList.forEach(item => {
        // 没有uid的直接过滤掉，否则会死循环
        if (item.uid) {
          this.stepList.push({
            type: 'node',
            node: {
              data: item
            }
          })
        }
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
    this.mindMap.off('after_update_config', this.onConfigUpdate)
  }

  // 插件被卸载前做的事情
  beforePluginDestroy() {
    this.unBindEvent()
    this.mindMap.off('after_update_config', this.onConfigUpdate)
  }
}

Demonstrate.instanceName = 'demonstrate'

export default Demonstrate
