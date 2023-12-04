import { checkIsNodeStyleDataKey } from '../utils/index'

// 格式刷插件
class Painter {
  constructor({ mindMap }) {
    this.mindMap = mindMap
    this.isInPainter = false
    this.painterNode = null
    this.bindEvent()
  }

  bindEvent() {
    this.painterOneNode = this.painterOneNode.bind(this)
    this.onEndPainter = this.onEndPainter.bind(this)
    this.mindMap.on('node_click', this.painterOneNode)
    this.mindMap.on('draw_click', this.onEndPainter)
  }

  unBindEvent() {
    this.mindMap.off('node_click', this.painterOneNode)
    this.mindMap.off('draw_click', this.onEndPainter)
  }

  // 开始格式刷
  startPainter() {
    if (this.mindMap.opt.readonly) return
    let activeNodeList = this.mindMap.renderer.activeNodeList
    if (activeNodeList.length <= 0) return
    this.painterNode = activeNodeList[0]
    this.isInPainter = true
    this.mindMap.emit('painter_start')
  }

  // 结束格式刷
  endPainter() {
    this.painterNode = null
    this.isInPainter = false
  }

  onEndPainter() {
    if (!this.isInPainter) return
    this.endPainter()
    this.mindMap.emit('painter_end')
  }

  // 格式刷某个节点
  painterOneNode(node) {
    if (
      !node ||
      !this.isInPainter ||
      !this.painterNode ||
      !node ||
      node.uid === this.painterNode.uid
    )
      return
    const style = {}
    const painterNodeData = this.painterNode.getData()
    Object.keys(painterNodeData).forEach(key => {
      if (checkIsNodeStyleDataKey(key)) {
        style[key] = painterNodeData[key]
      }
    })
    node.setStyles(style)
    if (painterNodeData.activeStyle) {
      node.setStyles(painterNodeData.activeStyle, true)
    }
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

Painter.instanceName = 'painter'

export default Painter
