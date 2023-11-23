import Base from './Base'
import { walk, asyncRun, degToRad, getNodeIndexInNodeList } from '../utils'
import { CONSTANTS } from '../constants/constant'
import utils from './fishboneUtils'

//  鱼骨图
class Fishbone extends Base {
  //  构造函数
  constructor(opt = {}) {
    super(opt)
    this.indent = 0.3
    this.childIndent = 0.5
  }

  //  布局
  doLayout(callback) {
    let task = [
      () => {
        this.computedBaseValue()
      },
      () => {
        this.computedLeftTopValue()
      },
      () => {
        this.adjustLeftTopValue()
      },
      () => {
        callback(this.root)
      }
    ]
    asyncRun(task)
  }

  //  遍历数据创建节点、计算根节点的位置，计算根节点的子节点的top值
  computedBaseValue() {
    walk(
      this.renderer.renderTree,
      null,
      (node, parent, isRoot, layerIndex, index) => {
        // 创建节点
        let newNode = this.createNode(node, parent, isRoot, layerIndex)
        // 根节点定位在画布中心位置
        if (isRoot) {
          this.setNodeCenter(newNode)
        } else {
          // 非根节点
          // 三级及以下节点以上级方向为准
          if (parent._node.dir) {
            newNode.dir = parent._node.dir
          } else {
            // 节点生长方向
            newNode.dir =
              index % 2 === 0
                ? CONSTANTS.LAYOUT_GROW_DIR.TOP
                : CONSTANTS.LAYOUT_GROW_DIR.BOTTOM
          }
          // 计算二级节点的top值
          if (parent._node.isRoot) {
            let marginY = this.getMarginY(layerIndex)
            if (this.checkIsTop(newNode)) {
              newNode.top = parent._node.top - newNode.height - marginY
            } else {
              newNode.top = parent._node.top + parent._node.height + marginY
            }
          }
        }
        if (!node.data.expand) {
          return true
        }
      },
      null,
      true,
      0
    )
  }

  //  遍历节点树计算节点的left、top
  computedLeftTopValue() {
    walk(
      this.root,
      null,
      (node, parent, isRoot, layerIndex) => {
        if (node.isRoot) {
          let marginX = this.getMarginX(layerIndex + 1)
          let topTotalLeft = node.left + node.width + node.height + marginX
          let bottomTotalLeft = node.left + node.width + node.height + marginX
          node.children.forEach(item => {
            if (this.checkIsTop(item)) {
              item.left = topTotalLeft
              topTotalLeft += item.width + marginX
            } else {
              item.left = bottomTotalLeft + 20
              bottomTotalLeft += item.width + marginX
            }
          })
        }
        let params = { layerIndex, node, ctx: this }
        if (this.checkIsTop(node)) {
          utils.top.computedLeftTopValue(params)
        } else {
          utils.bottom.computedLeftTopValue(params)
        }
      },
      null,
      true
    )
  }

  //  调整节点left、top
  adjustLeftTopValue() {
    walk(
      this.root,
      null,
      (node, parent, isRoot, layerIndex) => {
        if (!node.getData('expand')) {
          return
        }
        let params = { node, parent, layerIndex, ctx: this }
        if (this.checkIsTop(node)) {
          utils.top.adjustLeftTopValueBefore(params)
        } else {
          utils.bottom.adjustLeftTopValueBefore(params)
        }
      },
      (node, parent) => {
        let params = { parent, node, ctx: this }
        if (this.checkIsTop(node)) {
          utils.top.adjustLeftTopValueAfter(params)
        } else {
          utils.bottom.adjustLeftTopValueAfter(params)
        }
        // 调整二级节点的子节点的left值
        if (node.isRoot) {
          let topTotalLeft = 0
          let bottomTotalLeft = 0
          node.children.forEach(item => {
            if (this.checkIsTop(item)) {
              item.left += topTotalLeft
              this.updateChildren(item.children, 'left', topTotalLeft)
              let { left, right } = this.getNodeBoundaries(item, 'h')
              topTotalLeft += right - left
            } else {
              item.left += bottomTotalLeft
              this.updateChildren(item.children, 'left', bottomTotalLeft)
              let { left, right } = this.getNodeBoundaries(item, 'h')
              bottomTotalLeft += right - left
            }
          })
        }
      },
      true
    )
  }

  //  递归计算节点的宽度
  getNodeAreaHeight(node) {
    let totalHeight = 0
    let loop = node => {
      let marginY = this.getMarginY(node.layerIndex)
      totalHeight +=
        node.height +
        (this.getNodeActChildrenLength(node) > 0 ? node.expandBtnSize : 0) +
        marginY
      if (node.children.length) {
        node.children.forEach(item => {
          loop(item)
        })
      }
    }
    loop(node)
    return totalHeight
  }

  //  调整兄弟节点的left
  updateBrothersLeft(node) {
    let childrenList = node.children
    let totalAddWidth = 0
    childrenList.forEach(item => {
      item.left += totalAddWidth
      if (item.children && item.children.length) {
        this.updateChildren(item.children, 'left', totalAddWidth)
      }
      let { left, right } = this.getNodeBoundaries(item, 'h')
      let areaWidth = right - left
      let difference = areaWidth - item.width
      if (difference > 0) {
        totalAddWidth += difference
      }
    })
  }

  //  调整兄弟节点的top
  updateBrothersTop(node, addHeight) {
    if (node.parent && !node.parent.isRoot) {
      let childrenList = node.parent.children
      let index = getNodeIndexInNodeList(node, childrenList)
      childrenList.forEach((item, _index) => {
        if (item.hasCustomPosition()) {
          // 适配自定义位置
          return
        }
        let _offset = 0
        // 下面的节点往下移
        if (_index > index) {
          _offset = addHeight
        }
        item.top += _offset
        // 同步更新子节点的位置
        if (item.children && item.children.length) {
          this.updateChildren(item.children, 'top', _offset)
        }
      })
      // 更新父节点的位置
      if (this.checkIsTop(node)) {
        this.updateBrothersTop(node.parent, addHeight)
      } else {
        this.updateBrothersTop(
          node.parent,
          node.layerIndex === 3 ? 0 : addHeight
        )
      }
    }
  }

  // 检查节点是否是上方节点
  checkIsTop(node) {
    return node.dir === CONSTANTS.LAYOUT_GROW_DIR.TOP
  }

  //  绘制连线，连接该节点到其子节点
  renderLine(node, lines, style) {
    if (node.layerIndex !== 1 && node.children.length <= 0) {
      return []
    }
    let { top, height, expandBtnSize } = node
    if (!this.mindMap.opt.alwaysShowExpandBtn) {
      expandBtnSize = 0
    }
    let len = node.children.length
    if (node.isRoot) {
      // 当前节点是根节点
      // 根节点的子节点是和根节点同一水平线排列
      let maxx = -Infinity
      node.children.forEach(item => {
        if (item.left > maxx) {
          maxx = item.left
        }
        // 水平线段到二级节点的连线
        let marginY = this.getMarginY(item.layerIndex)
        let nodeLineX = item.left
        let offset = node.height / 2 + marginY
        let offsetX = offset / Math.tan(degToRad(this.mindMap.opt.fishboneDeg))
        let line = this.lineDraw.path()
        if (this.checkIsTop(item)) {
          line.plot(
            `M ${nodeLineX - offsetX},${item.top + item.height + offset} L ${
              item.left
            },${item.top + item.height}`
          )
        } else {
          line.plot(
            `M ${nodeLineX - offsetX},${item.top - offset} L ${nodeLineX},${
              item.top
            }`
          )
        }
        node.style.line(line)
        node._lines.push(line)
        style && style(line, node)
      })
      // 从根节点出发的水平线
      let nodeHalfTop = node.top + node.height / 2
      let offset = node.height / 2 + this.getMarginY(node.layerIndex + 1)
      let line = this.lineDraw.path()
      line.plot(
        `M ${node.left + node.width},${nodeHalfTop} L ${
          maxx - offset / Math.tan(degToRad(this.mindMap.opt.fishboneDeg))
        },${nodeHalfTop}`
      )
      node.style.line(line)
      node._lines.push(line)
      style && style(line, node)
    } else {
      // 当前节点为非根节点
      let maxy = -Infinity
      let miny = Infinity
      let maxx = -Infinity
      let x = node.left + node.width * this.indent
      node.children.forEach((item, index) => {
        if (item.left > maxx) {
          maxx = item.left
        }
        let y = item.top + item.height / 2
        if (y > maxy) {
          maxy = y
        }
        if (y < miny) {
          miny = y
        }
        // 水平线
        if (node.layerIndex > 1) {
          let path = `M ${x},${y} L ${item.left},${y}`
          lines[index].plot(path)
          style && style(lines[index], item)
        }
      })
      // 斜线
      if (len >= 0) {
        let line = this.lineDraw.path()
        expandBtnSize = len > 0 ? expandBtnSize : 0
        let lineLength = maxx - node.left - node.width * this.indent
        lineLength = Math.max(lineLength, 0)
        let params = {
          node,
          line,
          top,
          x,
          lineLength,
          height,
          expandBtnSize,
          maxy,
          miny,
          ctx: this
        }
        if (this.checkIsTop(node)) {
          utils.top.renderLine(params)
        } else {
          utils.bottom.renderLine(params)
        }
        node.style.line(line)
        node._lines.push(line)
        style && style(line, node)
      }
    }
  }

  //  渲染按钮
  renderExpandBtn(node, btn) {
    let { width, height, expandBtnSize, isRoot } = node
    if (!isRoot) {
      let { translateX, translateY } = btn.transform()
      let params = {
        node,
        btn,
        expandBtnSize,
        translateX,
        translateY,
        width,
        height
      }
      if (this.checkIsTop(node)) {
        utils.top.renderExpandBtn(params)
      } else {
        utils.bottom.renderExpandBtn(params)
      }
    }
  }

  //  创建概要节点
  renderGeneralization(list) {
    list.forEach(item => {
      let {
        top,
        bottom,
        right,
        generalizationLineMargin,
        generalizationNodeMargin
      } = this.getNodeGeneralizationRenderBoundaries(item, 'h')
      let x1 = right + generalizationLineMargin
      let y1 = top
      let x2 = right + generalizationLineMargin
      let y2 = bottom
      let cx = x1 + 20
      let cy = y1 + (y2 - y1) / 2
      let path = `M ${x1},${y1} Q ${cx},${cy} ${x2},${y2}`
      item.generalizationLine.plot(path)
      item.generalizationNode.left = right + generalizationNodeMargin
      item.generalizationNode.top =
        top + (bottom - top - item.generalizationNode.height) / 2
    })
  }

  // 渲染展开收起按钮的隐藏占位元素
  renderExpandBtnRect(rect, expandBtnSize, width, height, node) {
    let dir = ''
    if (node.dir === CONSTANTS.LAYOUT_GROW_DIR.TOP) {
      dir =
        node.layerIndex === 1
          ? CONSTANTS.LAYOUT_GROW_DIR.TOP
          : CONSTANTS.LAYOUT_GROW_DIR.BOTTOM
    } else {
      dir =
        node.layerIndex === 1
          ? CONSTANTS.LAYOUT_GROW_DIR.BOTTOM
          : CONSTANTS.LAYOUT_GROW_DIR.TOP
    }
    if (dir === CONSTANTS.LAYOUT_GROW_DIR.TOP) {
      rect.size(width, expandBtnSize).x(0).y(-expandBtnSize)
    } else {
      rect.size(width, expandBtnSize).x(0).y(height)
    }
  }
}

export default Fishbone
