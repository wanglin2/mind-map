import Base from './Base'
import { walk, asyncRun, getNodeIndexInNodeList } from '../utils'
import { CONSTANTS } from '../utils/constant'

const degToRad = deg => {
  return (Math.PI / 180) * deg
}

//  上方鱼骨图
class Fishbone extends Base {
  //  构造函数
  constructor(opt = {}) {
    super(opt)
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
            newNode.top = parent._node.top - newNode.height
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
      (node, parent, isRoot, layerIndex, index) => {
        if (node.isRoot) {
          let totalLeft = node.left + node.width
          node.children.forEach(item => {
            item.left = totalLeft
            totalLeft += item.width
          })
        }
        if (layerIndex >= 1 && node.children) {
          // 遍历三级及以下节点的子节点
          let startLeft = node.left + node.width * 0.5
          let totalTop =
            node.top +
            node.height +
            (this.getNodeActChildrenLength(node) > 0 ? node.expandBtnSize : 0)
          node.children.forEach(item => {
            item.left = startLeft
            item.top += totalTop
            totalTop +=
              item.height +
              (this.getNodeActChildrenLength(item) > 0 ? item.expandBtnSize : 0)
          })
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
        // 调整top
        let len = node.children.length
        // 调整三级及以下节点的top
        if (parent && !parent.isRoot && len > 0) {
          let totalHeight = node.children.reduce((h, item) => {
            return (
              h +
              item.height +
              (this.getNodeActChildrenLength(item) > 0 ? item.expandBtnSize : 0)
            )
          }, 0)
          this.updateBrothersTop(node, totalHeight)
        }
      },
      (node, parent) => {
        // 将二级节点的子节点移到上方
        if (parent && parent.isRoot) {
          // 遍历二级节点的子节点
          let totalHeight = 0
          node.children.forEach(item => {
            // 调整top
            let nodeTotalHeight = this.getNodeAreaHeight(item)
            let _top = item.top
            item.top =
              node.top - (item.top - node.top) - nodeTotalHeight + node.height
            // 调整left
            let offsetLeft =
              (nodeTotalHeight + totalHeight) /
              Math.tan(degToRad(this.mindMap.opt.fishboneDeg))
            item.left += offsetLeft
            totalHeight += nodeTotalHeight
            // 同步更新后代节点
            this.updateChildrenPro(item.children, {
              top: item.top - _top,
              left: offsetLeft
            })
          })
        }
        // 调整二级节点的子节点的left值
        if (node.isRoot) {
          let totalLeft = 0
          node.children.forEach(item => {
            item.left += totalLeft
            this.updateChildren(item.children, 'left', totalLeft)
            let { left, right } = this.getNodeBoundaries(item, 'h')
            totalLeft += right - left
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
      totalHeight +=
        node.height +
        (this.getNodeActChildrenLength(node) > 0 ? node.expandBtnSize : 0)
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
      // let areaWidth = this.getNodeAreaWidth(item)
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
      this.updateBrothersTop(node.parent, addHeight)
    }
  }

  //  绘制连线，连接该节点到其子节点
  renderLine(node, lines, style) {
    if (node.children.length <= 0) {
      return []
    }
    let { left, top, width, height, expandBtnSize } = node
    let len = node.children.length
    if (node.isRoot) {
      // 当前节点是根节点
      let prevBother = node
      // 根节点的子节点是和根节点同一水平线排列
      node.children.forEach((item, index) => {
        let x1 = prevBother.left + prevBother.width
        let x2 = item.left
        let y = node.top + node.height / 2
        let path = `M ${x1},${y} L ${x2},${y}`
        lines[index].plot(path)
        style && style(lines[index], item)
        prevBother = item
      })
    } else {
      // 当前节点为非根节点
      let maxy = -Infinity
      let miny = Infinity
      let maxx = -Infinity
      let x = node.left + node.width * 0.3
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
      // 竖线
      if (len > 0) {
        let line = this.lineDraw.path()
        expandBtnSize = len > 0 ? expandBtnSize : 0
        let lineLength = maxx - node.left - node.width * 0.3
        if (
          node.parent &&
          node.parent.isRoot &&
          node.dir === CONSTANTS.LAYOUT_GROW_DIR.TOP
        ) {
          line.plot(
            `M ${x},${top} L ${x + lineLength},${
              top -
              Math.tan(degToRad(this.mindMap.opt.fishboneDeg)) * lineLength
            }`
          )
        } else {
          if (node.parent && node.parent.isRoot) {
            line.plot(
              `M ${x},${top} L ${x + lineLength},${
                top -
                Math.tan(degToRad(this.mindMap.opt.fishboneDeg)) * lineLength
              }`
            )
          } else {
            line.plot(`M ${x},${top + height + expandBtnSize} L ${x},${maxy}`)
          }
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
      if (node.parent && node.parent.isRoot) {
        btn.translate(
          width * 0.3 - expandBtnSize / 2 - translateX,
          -expandBtnSize / 2 - translateY
        )
      } else {
        btn.translate(
          width * 0.3 - expandBtnSize / 2 - translateX,
          height + expandBtnSize / 2 - translateY
        )
      }
    }
  }

  //  创建概要节点
  renderGeneralization(node, gLine, gNode) {
    let {
      top,
      bottom,
      right,
      generalizationLineMargin,
      generalizationNodeMargin
    } = this.getNodeBoundaries(node, 'h')
    let x1 = right + generalizationLineMargin
    let y1 = top
    let x2 = right + generalizationLineMargin
    let y2 = bottom
    let cx = x1 + 20
    let cy = y1 + (y2 - y1) / 2
    let path = `M ${x1},${y1} Q ${cx},${cy} ${x2},${y2}`
    gLine.plot(path)
    gNode.left = right + generalizationNodeMargin
    gNode.top = top + (bottom - top - gNode.height) / 2
  }
}

export default Fishbone
