import { walk, getNodeDataIndex } from '../utils/index'

const defaultColorsList = [
  'rgb(255, 213, 73)',
  'rgb(255, 136, 126)',
  'rgb(107, 225, 141)',
  'rgb(151, 171, 255)',
  'rgb(129, 220, 242)',
  'rgb(255, 163, 125)',
  'rgb(152, 132, 234)'
]

// 彩虹线条插件
class RainbowLines {
  constructor({ mindMap }) {
    this.mindMap = mindMap
  }

  // 更新彩虹线条配置
  updateRainLinesConfig(config = {}) {
    const newConfig = this.mindMap.opt.rainbowLinesConfig || {}
    newConfig.open = !!config.open
    newConfig.colorsList = Array.isArray(config.colorsList)
      ? config.colorsList
      : []
    // 如果开启彩虹线条，那么先移除所有节点的自定义连线颜色配置
    if (this.mindMap.opt.rainbowLinesConfig.open) {
      this.removeNodeLineColor()
    }
    this.mindMap.render()
  }

  // 删除所有节点的连线颜色
  removeNodeLineColor() {
    const tree = this.mindMap.renderer.renderTree
    if (!tree) return
    walk(
      tree,
      null,
      cur => {
        delete cur.data.lineColor
      },
      null,
      true
    )
    this.mindMap.command.addHistory()
  }

  // 获取一个节点的第二层级的祖先节点
  getSecondLayerAncestor(node) {
    if (node.layerIndex === 0) {
      return null
    } else if (node.layerIndex === 1) {
      return node
    } else {
      let res = null
      let parent = node.parent
      while (parent) {
        if (parent.layerIndex === 1) {
          return parent
        }
        parent = parent.parent
      }
      return res
    }
  }

  // 获取颜色列表
  getColorsList() {
    const { rainbowLinesConfig } = this.mindMap.opt
    return rainbowLinesConfig &&
      Array.isArray(rainbowLinesConfig.colorsList) &&
      rainbowLinesConfig.colorsList.length > 0
      ? rainbowLinesConfig.colorsList
      : [...defaultColorsList]
  }

  // 获取一个节点的彩虹线条颜色
  getNodeColor(node) {
    const { rainbowLinesConfig } = this.mindMap.opt
    if (!rainbowLinesConfig || !rainbowLinesConfig.open) return ''
    const ancestor = this.getSecondLayerAncestor(node)
    if (!ancestor) return
    const index = getNodeDataIndex(ancestor)
    const colorsList = this.getColorsList()
    return colorsList[index % colorsList.length]
  }
}

RainbowLines.instanceName = 'rainbowLines'

export default RainbowLines
