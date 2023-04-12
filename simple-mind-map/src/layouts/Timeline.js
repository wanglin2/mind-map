import Base from './Base'
import { walk, asyncRun } from '../utils'

//  时间轴
class CatalogOrganization extends Base {
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
      (cur, parent, isRoot, layerIndex) => {
        let newNode = this.createNode(cur, parent, isRoot, layerIndex)
        // 根节点定位在画布中心位置
        if (isRoot) {
          this.setNodeCenter(newNode)
        } else {
          // 非根节点
          if (parent._node.isRoot) {
            newNode.top =
              parent._node.top +
              (cur._node.height > parent._node.height
                ? -(cur._node.height - parent._node.height) / 2
                : (parent._node.height - cur._node.height) / 2)
          }
        }
        if (!cur.data.expand) {
          return true
        }
      },
      (cur, parent, isRoot, layerIndex) => {},
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
        if (
          node.nodeData.data.expand &&
          node.children &&
          node.children.length
        ) {
          let marginX = this.getMarginX(layerIndex + 1)
          let marginY = this.getMarginY(layerIndex + 1)
          if (isRoot) {
            let left = node.left + node.width
            let totalLeft = left + marginX
            node.children.forEach(cur => {
              cur.left = totalLeft
              totalLeft += cur.width + marginX
            })
          } else {
            let totalTop = node.top + node.height + marginY + node.expandBtnSize
            node.children.forEach(cur => {
              cur.left = node.left + node.width * 0.5
              cur.top = totalTop
              totalTop += cur.height + marginY + node.expandBtnSize
            })
          }
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
        if (!node.nodeData.data.expand) {
          return
        }
        // 调整left
        if (node.isRoot) {
          this.updateBrothersLeft(node)
        }
        // 调整top
        let len = node.children.length
        if (parent && !parent.isRoot && len > 0) {
          let marginY = this.getMarginY(layerIndex + 1)
          let totalHeight =
            node.children.reduce((h, item) => {
              return h + item.height
            }, 0) +
            (len + 1) * marginY +
            len * node.expandBtnSize
          this.updateBrothersTop(node, totalHeight)
        }
      },
      null,
      true
    )
  }

  //  递归计算节点的宽度
  getNodeAreaWidth(node) {
    let widthArr = []
    let loop = (node, width) => {
      if (node.children.length) {
        width += node.width / 2
        node.children.forEach(item => {
          loop(item, width)
        })
      } else {
        width += node.width
        widthArr.push(width)
      }
    }
    loop(node, 0)
    return Math.max(...widthArr)
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
      let areaWidth = this.getNodeAreaWidth(item)
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
      let index = childrenList.findIndex(item => {
        return item === node
      })
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
      let x = node.left + node.width * 0.3
      node.children.forEach((item, index) => {
        let y = item.top + item.height / 2
        if (y > maxy) {
          maxy = y
        }
        // 水平线
        let path = `M ${x},${y} L ${item.left},${y}`
        lines[index].plot(path)
        style && style(lines[index], item)
      })
      // 竖线
      if (len > 0) {
        let line = this.draw.path()
        expandBtnSize = len > 0 ? expandBtnSize : 0
        line.plot(`M ${x},${top + height + expandBtnSize} L ${x},${maxy}`)
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
      btn.translate(
        width * 0.3 - expandBtnSize / 2 - translateX,
        height + expandBtnSize / 2 - translateY
      )
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

export default CatalogOrganization
