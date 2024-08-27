import Base from './Base'
import { walk, asyncRun, getNodeIndexInNodeList } from '../utils'
import { CONSTANTS } from '../constants/constant'

//  时间轴
class Timeline extends Base {
  //  构造函数
  constructor(opt = {}, layout) {
    super(opt)
    this.layout = layout
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
      (cur, parent, isRoot, layerIndex, index, ancestors) => {
        let newNode = this.createNode(cur, parent, isRoot, layerIndex, index, ancestors)
        // 根节点定位在画布中心位置
        if (isRoot) {
          this.setNodeCenter(newNode)
        } else {
          // 非根节点
          // 时间轴2类型需要交替显示
          if (this.layout === CONSTANTS.LAYOUT.TIMELINE2) {
            // 三级及以下节点以上级为准
            if (parent._node.dir) {
              newNode.dir = parent._node.dir
            } else {
              // 节点生长方向
              newNode.dir =
                index % 2 === 0
                  ? CONSTANTS.LAYOUT_GROW_DIR.BOTTOM
                  : CONSTANTS.LAYOUT_GROW_DIR.TOP
            }
          } else {
            newNode.dir = ''
          }
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
        if (node.getData('expand') && node.children && node.children.length) {
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
            let totalTop =
              node.top +
              node.height +
              marginY +
              (this.getNodeActChildrenLength(node) > 0 ? node.expandBtnSize : 0)
            node.children.forEach(cur => {
              cur.left = node.left + node.width * 0.5
              cur.top = totalTop
              totalTop +=
                cur.height +
                marginY +
                (this.getNodeActChildrenLength(cur) > 0 ? cur.expandBtnSize : 0)
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
        if (!node.getData('expand')) {
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
              return (
                h +
                item.height +
                (this.getNodeActChildrenLength(item) > 0
                  ? item.expandBtnSize
                  : 0)
              )
            }, 0) +
            len * marginY
          this.updateBrothersTop(node, totalHeight)
        }
      },
      (node, parent, isRoot, layerIndex) => {
        if (
          parent &&
          parent.isRoot &&
          node.dir === CONSTANTS.LAYOUT_GROW_DIR.TOP
        ) {
          // 遍历二级节点的子节点
          node.children.forEach(item => {
            let totalHeight = this.getNodeAreaHeight(item)
            let _top = item.top
            item.top =
              node.top - (item.top - node.top) - totalHeight + node.height
            this.updateChildren(item.children, 'top', item.top - _top)
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
        (this.getNodeActChildrenLength(node) > 0 ? node.expandBtnSize : 0) +
        this.getMarginY(node.layerIndex)
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
    const { alwaysShowExpandBtn, notShowExpandBtn } = this.mindMap.opt
    if (!alwaysShowExpandBtn || notShowExpandBtn) {
      expandBtnSize = 0
    }
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
        this.setLineStyle(style, lines[index], path, item)
        prevBother = item
      })
    } else {
      // 当前节点为非根节点
      let maxy = -Infinity
      let miny = Infinity
      let x = node.left + node.width * 0.3
      node.children.forEach((item, index) => {
        let y = item.top + item.height / 2
        if (y > maxy) {
          maxy = y
        }
        if (y < miny) {
          miny = y
        }
        // 水平线
        let path = `M ${x},${y} L ${item.left},${y}`
        this.setLineStyle(style, lines[index], path, item)
      })
      // 竖线
      if (len > 0) {
        let line = this.lineDraw.path()
        expandBtnSize = len > 0 ? expandBtnSize : 0
        if (
          node.parent &&
          node.parent.isRoot &&
          node.dir === CONSTANTS.LAYOUT_GROW_DIR.TOP
        ) {
          line.plot(this.transformPath(`M ${x},${top} L ${x},${miny}`))
        } else {
          line.plot(
            this.transformPath(
              `M ${x},${top + height + expandBtnSize} L ${x},${maxy}`
            )
          )
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
      if (
        node.parent &&
        node.parent.isRoot &&
        node.dir === CONSTANTS.LAYOUT_GROW_DIR.TOP
      ) {
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
      item.generalizationLine.plot(this.transformPath(path))
      item.generalizationNode.left = right + generalizationNodeMargin
      item.generalizationNode.top =
        top + (bottom - top - item.generalizationNode.height) / 2
    })
  }

  // 渲染展开收起按钮的隐藏占位元素
  renderExpandBtnRect(rect, expandBtnSize, width, height, node) {
    if (this.layout === CONSTANTS.LAYOUT.TIMELINE) {
      rect.size(width, expandBtnSize).x(0).y(height)
    } else {
      let dir = ''
      if (node.dir === CONSTANTS.LAYOUT_GROW_DIR.TOP) {
        dir =
          node.layerIndex === 1
            ? CONSTANTS.LAYOUT_GROW_DIR.TOP
            : CONSTANTS.LAYOUT_GROW_DIR.BOTTOM
      } else {
        dir = CONSTANTS.LAYOUT_GROW_DIR.BOTTOM
      }
      if (dir === CONSTANTS.LAYOUT_GROW_DIR.TOP) {
        rect.size(width, expandBtnSize).x(0).y(-expandBtnSize)
      } else {
        rect.size(width, expandBtnSize).x(0).y(height)
      }
    }
  }
}

export default Timeline
