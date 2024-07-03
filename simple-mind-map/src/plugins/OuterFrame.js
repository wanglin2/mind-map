import {
  formatDataToArray,
  walk,
  getTopAncestorsFomNodeList,
  getNodeListBoundingRect,
  createUid
} from '../utils'

// 解析要添加外框的节点实例列表
const parseAddNodeList = list => {
  // 找出顶层节点
  list = getTopAncestorsFomNodeList(list)
  const cache = {}
  const uidToParent = {}
  // 找出列表中节点在兄弟节点中的索引，并和父节点关联起来
  list.forEach(node => {
    const parent = node.parent
    if (parent) {
      const pUid = parent.uid
      uidToParent[pUid] = parent
      const index = node.getIndexInBrothers()
      const data = {
        node,
        index
      }
      if (cache[pUid]) {
        if (
          !cache[pUid].find(item => {
            return item.index === data.index
          })
        ) {
          cache[pUid].push(data)
        }
      } else {
        cache[pUid] = [data]
      }
    }
  })
  const res = []
  Object.keys(cache).forEach(uid => {
    const indexList = cache[uid]
    const parentNode = uidToParent[uid]
    if (indexList.length > 1) {
      // 多个节点
      const rangeList = indexList
        .map(item => {
          return item.index
        })
        .sort((a, b) => {
          return a - b
        })
      const minIndex = rangeList[0]
      const maxIndex = rangeList[rangeList.length - 1]
      let curStart = -1
      let curEnd = -1
      for (let i = minIndex; i <= maxIndex; i++) {
        // 连续索引
        if (rangeList.includes(i)) {
          if (curStart === -1) {
            curStart = i
          }
          curEnd = i
        } else {
          // 连续断开
          if (curStart !== -1 && curEnd !== -1) {
            res.push({
              node: parentNode,
              range: [curStart, curEnd]
            })
          }
          curStart = -1
          curEnd = -1
        }
      }
      // 不要忘了最后一段索引
      if (curStart !== -1 && curEnd !== -1) {
        res.push({
          node: parentNode,
          range: [curStart, curEnd]
        })
      }
    } else {
      // 单个节点
      res.push({
        node: parentNode,
        range: [indexList[0].index, indexList[0].index]
      })
    }
  })
  return res
}

// 解析获取节点的子节点生成的外框列表
const getNodeOuterFrameList = node => {
  const children = node.children
  if (!children || children.length <= 0) return
  const res = []
  const map = {}
  children.forEach((item, index) => {
    const outerFrameData = item.getData('outerFrame')
    if (!outerFrameData) return
    const groupId = outerFrameData.groupId
    if (groupId) {
      if (!map[groupId]) {
        map[groupId] = []
      }
      map[groupId].push({
        node: item,
        index
      })
    } else {
      res.push({
        nodeList: [item],
        range: [index, index]
      })
    }
  })
  Object.keys(map).forEach(id => {
    const list = map[id]
    res.push({
      nodeList: list.map(item => {
        return item.node
      }),
      range: [list[0].index, list[list.length - 1].index]
    })
  })
  return res
}

// 默认外框样式
const defaultStyle = {
  radius: 5,
  strokeWidth: 2,
  strokeColor: '#0984e3',
  strokeDasharray: '5,5',
  fill: 'rgba(9,132,227,0.05)'
}

// 外框插件
class OuterFrame {
  constructor(opt = {}) {
    this.mindMap = opt.mindMap
    this.draw = null
    this.createDrawContainer()
    this.outerFrameElList = []
    this.activeOuterFrame = null
    this.paddingX = 10
    this.paddingY = 10
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
    this.mindMap.command.remove('ADD_OUTER_FRAME', this.addOuterFrame)
    this.mindMap.keyCommand.removeShortcut(
      'Del|Backspace',
      this.removeActiveOuterFrame
    )
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

  // 更新当前激活的外框
  // 执行了该方法后请立即隐藏你的样式面板，因为会清除当前激活的外框
  updateActiveOuterFrame(config = {}) {
    if (!this.activeOuterFrame) return
    const { node, range } = this.activeOuterFrame
    this.getRangeNodeList(node, range).forEach(node => {
      const outerFrame = node.getData('outerFrame')
      this.mindMap.execCommand('SET_NODE_DATA', node, {
        outerFrame: {
          ...outerFrame,
          ...config
        }
      })
    })
  }

  // 获取某个节点指定范围的带外框的子节点列表
  getRangeNodeList(node, range) {
    return node.children.slice(range[0], range[1] + 1).filter(child => {
      return child.getData('outerFrame')
    })
  }

  // 渲染外框
  renderOuterFrames() {
    this.clearOuterFrameElList()
    let tree = this.mindMap.renderer.root
    if (!tree) return
    const t = this.mindMap.draw.transform()
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
            const el = this.createOuterFrameEl(
              (left - this.paddingX - this.mindMap.elRect.left - t.translateX) /
                t.scaleX,
              (top - this.paddingY - this.mindMap.elRect.top - t.translateY) /
                t.scaleY,
              (width + this.paddingX * 2) / t.scaleX,
              (height + this.paddingY * 2) / t.scaleY,
              nodeList[0].getData('outerFrame') // 使用第一个节点的外框样式
            )
            el.on('click', e => {
              e.stopPropagation()
              this.setActiveOuterFrame(el, cur, range)
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
  setActiveOuterFrame(el, node, range) {
    this.mindMap.execCommand('CLEAR_ACTIVE_NODE')
    this.clearActiveOuterFrame()
    this.activeOuterFrame = {
      el,
      node,
      range
    }
    el.stroke({
      dasharray: 'none'
    })
    this.mindMap.emit('outer_frame_active', el, node, range)
  }

  // 清除当前激活的外框
  clearActiveOuterFrame() {
    if (!this.activeOuterFrame) return
    const { el } = this.activeOuterFrame
    el.stroke({
      dasharray: el.cacheStyle.dasharray || defaultStyle.strokeDasharray
    })
    this.activeOuterFrame = null
  }

  // 创建外框元素
  createOuterFrameEl(x, y, width, height, styleConfig = {}) {
    styleConfig = { ...defaultStyle, ...styleConfig }
    const el = this.draw
      .rect()
      .size(width, height)
      .radius(styleConfig.radius)
      .stroke({
        width: styleConfig.strokeWidth,
        color: styleConfig.strokeColor,
        dasharray: styleConfig.strokeDasharray
      })
      .fill({
        color: styleConfig.fill
      })
      .x(x)
      .y(y)
    el.cacheStyle = {
      dasharray: styleConfig.strokeDasharray
    }
    this.outerFrameElList.push(el)
    return el
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
    this.unBindEvent()
  }

  // 插件被卸载前做的事情
  beforePluginDestroy() {
    this.unBindEvent()
  }
}

OuterFrame.instanceName = 'outerFrame'

export default OuterFrame
