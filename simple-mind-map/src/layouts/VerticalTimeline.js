import Base from './Base'
import { walk, asyncRun, getNodeIndexInNodeList } from '../utils'
import { CONSTANTS } from '../constants/constant'

//  竖向时间轴
class VerticalTimeline extends Base {
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
        this.computedTopValue()
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
        let newNode = this.createNode(
          cur,
          parent,
          isRoot,
          layerIndex,
          index,
          ancestors
        )
        // 根节点定位在画布中心位置
        if (isRoot) {
          this.setNodeCenter(newNode)
        } else {
          // 非根节点
          // 节点生长方向
          // 三级及以下节点以上级为准
          if (parent._node.dir) {
            newNode.dir = parent._node.dir
          } else {
            if (this.layout === CONSTANTS.LAYOUT.VERTICAL_TIMELINE2) {
              newNode.dir = CONSTANTS.LAYOUT_GROW_DIR.LEFT
            } else if (this.layout === CONSTANTS.LAYOUT.VERTICAL_TIMELINE3) {
              newNode.dir = CONSTANTS.LAYOUT_GROW_DIR.RIGHT
            } else {
              newNode.dir =
                index % 2 === 0
                  ? CONSTANTS.LAYOUT_GROW_DIR.RIGHT
                  : CONSTANTS.LAYOUT_GROW_DIR.LEFT
            }
          }
          // 定位二级节点的left
          if (parent._node.isRoot) {
            newNode.left =
              parent._node.left +
              (cur._node.width > parent._node.width
                ? -(cur._node.width - parent._node.width) / 2
                : (parent._node.width - cur._node.width) / 2)
          } else {
            newNode.left =
              newNode.dir === CONSTANTS.LAYOUT_GROW_DIR.RIGHT
                ? parent._node.left +
                  parent._node.width +
                  this.getMarginX(layerIndex)
                : parent._node.left -
                  this.getMarginX(layerIndex) -
                  newNode.width
          }
        }
        if (!cur.data.expand) {
          return true
        }
      },
      (cur, parent, isRoot, layerIndex) => {
        // 返回时计算节点的areaHeight，也就是子节点所占的高度之和，包括外边距
        if (isRoot) {
          return
        }
        let len = cur.data.expand === false ? 0 : cur._node.children.length
        cur._node.childrenAreaHeight = len
          ? cur._node.children.reduce((h, item) => {
              return h + item.height
            }, 0) +
            (len + 1) * this.getMarginY(layerIndex + 1)
          : 0
      },
      true,
      0
    )
  }

  //  遍历节点树计算节点的top
  computedTopValue() {
    walk(
      this.root,
      null,
      (node, parent, isRoot, layerIndex, index) => {
        if (node.getData('expand') && node.children && node.children.length) {
          let marginY = this.getMarginY(layerIndex + 1)
          // 定位二级节点的top
          if (isRoot) {
            let top = node.top + node.height
            let totalTop = top + marginY
            node.children.forEach(cur => {
              cur.top = totalTop
              totalTop += cur.height + marginY
            })
          } else {
            // 定位三级及以下节点的top
            let marginY = this.getMarginY(layerIndex + 1)
            let baseTop = node.top + node.height / 2 + marginY
            // 第一个子节点的top值 = 该节点中心的top值 - 子节点的高度之和的一半
            let totalTop = baseTop - node.childrenAreaHeight / 2
            node.children.forEach(cur => {
              cur.top = totalTop
              totalTop += cur.height + marginY
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
        if (isRoot) return
        // 判断子节点所占的高度之和是否大于该节点自身，大于则需要调整位置
        let base = this.getMarginY(layerIndex + 1) * 2 + node.height
        let difference = node.childrenAreaHeight - base
        if (difference > 0) {
          this.updateBrothers(node, difference / 2)
        }
      },
      null,
      true
    )
  }

  //  更新兄弟节点的top
  updateBrothers(node, addHeight) {
    if (node.parent) {
      let childrenList = node.parent.children
      let index = getNodeIndexInNodeList(node, childrenList)
      childrenList.forEach((item, _index) => {
        // 自定义节点位置
        if (item.hasCustomPosition()) return
        // 三级或三级以下节点自身位置不需要动
        if (!node.parent.isRoot && item.uid === node.uid) return
        let _offset = 0
        // 二级节点上面的兄弟节点不需要移动，自身需要往下移动
        if (node.parent.isRoot) {
          // 上面的节点不用移
          if (_index < index) {
            _offset = 0
          } else if (_index > index) {
            // 下面的节点往下移
            _offset = addHeight * 2
          } else {
            // 自身也要移动
            _offset = addHeight
          }
        } else {
          // 三级或三级以下节点两侧的兄弟节点向两侧移动
          // 上面的节点往上移
          if (_index < index) {
            _offset = -addHeight
          } else if (_index > index) {
            // 下面的节点往下移
            _offset = addHeight
          }
        }
        item.top += _offset
        // 同步更新子节点的位置
        if (item.children && item.children.length) {
          this.updateChildren(item.children, 'top', _offset)
        }
      })
      // 更新父节点的位置
      this.updateBrothers(node.parent, addHeight)
    }
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
  renderLine(node, lines, style, lineStyle) {
    if (lineStyle === 'curve') {
      this.renderLineCurve(node, lines, style)
    } else if (lineStyle === 'direct') {
      this.renderLineDirect(node, lines, style)
    } else {
      this.renderLineStraight(node, lines, style)
    }
  }

  // 直线连接
  renderLineStraight(node, lines, style) {
    if (node.children.length <= 0) {
      return []
    }
    let { expandBtnSize } = node
    const { alwaysShowExpandBtn, notShowExpandBtn } = this.mindMap.opt
    if (!alwaysShowExpandBtn || notShowExpandBtn) {
      expandBtnSize = 0
    }
    if (node.isRoot) {
      // 当前节点是根节点
      let prevBother = node
      // 根节点的子节点是和根节点同一水平线排列
      node.children.forEach((item, index) => {
        let y1 = prevBother.top + prevBother.height
        let y2 = item.top
        let x = node.left + node.width / 2
        let path = `M ${x},${y1} L ${x},${y2}`
        this.setLineStyle(style, lines[index], path, item)
        prevBother = item
      })
    } else {
      // 当前节点为非根节点
      if (node.dir === CONSTANTS.LAYOUT_GROW_DIR.RIGHT) {
        let nodeRight = node.left + node.width
        let nodeYCenter = node.top + node.height / 2
        let marginX = this.getMarginX(node.layerIndex + 1)
        let offset = (marginX - expandBtnSize) * 0.6
        node.children.forEach((item, index) => {
          let itemLeft = item.left
          let itemYCenter = item.top + item.height / 2
          let path = this.createFoldLine([
            [nodeRight, nodeYCenter],
            [nodeRight + offset, nodeYCenter],
            [nodeRight + offset, itemYCenter],
            [itemLeft, itemYCenter]
          ])
          this.setLineStyle(style, lines[index], path, item)
        })
      } else {
        let nodeLeft = node.left
        let nodeYCenter = node.top + node.height / 2
        let marginX = this.getMarginX(node.layerIndex + 1)
        let offset = (marginX - expandBtnSize) * 0.6
        node.children.forEach((item, index) => {
          let itemRight = item.left + item.width
          let itemYCenter = item.top + item.height / 2
          let path = this.createFoldLine([
            [nodeLeft, nodeYCenter],
            [nodeLeft - offset, nodeYCenter],
            [nodeLeft - offset, itemYCenter],
            [itemRight, itemYCenter]
          ])
          this.setLineStyle(style, lines[index], path, item)
        })
      }
    }
  }

  // 直连
  renderLineDirect(node, lines, style) {
    if (node.children.length <= 0) {
      return []
    }
    let { left, top, width, height, expandBtnSize } = node
    const { alwaysShowExpandBtn, notShowExpandBtn } = this.mindMap.opt
    if (!alwaysShowExpandBtn || notShowExpandBtn) {
      expandBtnSize = 0
    }
    node.children.forEach((item, index) => {
      if (node.isRoot) {
        let prevBother = node
        // 根节点的子节点是和根节点同一水平线排列
        node.children.forEach((item, index) => {
          let y1 = prevBother.top + prevBother.height
          let y2 = item.top
          let x = node.left + node.width / 2
          let path = `M ${x},${y1} L ${x},${y2}`
          this.setLineStyle(style, lines[index], path, item)
          prevBother = item
        })
      } else {
        let x1 =
          item.dir === CONSTANTS.LAYOUT_GROW_DIR.LEFT
            ? left - expandBtnSize
            : left + width + expandBtnSize
        let y1 = top + height / 2
        let x2 =
          item.dir === CONSTANTS.LAYOUT_GROW_DIR.LEFT
            ? item.left + item.width
            : item.left
        let y2 = item.top + item.height / 2
        let path = `M ${x1},${y1} L ${x2},${y2}`
        this.setLineStyle(style, lines[index], path, item)
      }
    })
  }

  //  曲线风格连线
  renderLineCurve(node, lines, style) {
    if (node.children.length <= 0) {
      return []
    }
    let { left, top, width, height, expandBtnSize } = node
    const { alwaysShowExpandBtn, notShowExpandBtn } = this.mindMap.opt
    if (!alwaysShowExpandBtn || notShowExpandBtn) {
      expandBtnSize = 0
    }
    node.children.forEach((item, index) => {
      if (node.isRoot) {
        let prevBother = node
        // 根节点的子节点是和根节点同一水平线排列
        node.children.forEach((item, index) => {
          let y1 = prevBother.top + prevBother.height
          let y2 = item.top
          let x = node.left + node.width / 2
          let path = `M ${x},${y1} L ${x},${y2}`
          this.setLineStyle(style, lines[index], path, item)
          prevBother = item
        })
      } else {
        let x1 =
          item.dir === CONSTANTS.LAYOUT_GROW_DIR.LEFT
            ? left - expandBtnSize
            : left + width + expandBtnSize
        let y1 = top + height / 2
        let x2 =
          item.dir === CONSTANTS.LAYOUT_GROW_DIR.LEFT
            ? item.left + item.width
            : item.left
        let y2 = item.top + item.height / 2
        let path = this.cubicBezierPath(x1, y1, x2, y2)
        this.setLineStyle(style, lines[index], path, item)
      }
    })
  }

  //  渲染按钮
  renderExpandBtn(node, btn) {
    let { width, height, expandBtnSize, isRoot } = node
    if (!isRoot) {
      let { translateX, translateY } = btn.transform()
      if (node.dir === CONSTANTS.LAYOUT_GROW_DIR.RIGHT) {
        btn.translate(width - translateX, height / 2 - translateY)
      } else {
        btn.translate(-expandBtnSize - translateX, height / 2 - translateY)
      }
    }
  }

  //  创建概要节点
  renderGeneralization(list) {
    list.forEach(item => {
      let isLeft = item.node.dir === CONSTANTS.LAYOUT_GROW_DIR.LEFT
      let {
        top,
        bottom,
        left,
        right,
        generalizationLineMargin,
        generalizationNodeMargin
      } = this.getNodeGeneralizationRenderBoundaries(item, 'h')
      let x = isLeft
        ? left - generalizationLineMargin
        : right + generalizationLineMargin
      let x1 = x
      let y1 = top
      let x2 = x
      let y2 = bottom
      let cx = x1 + (isLeft ? -20 : 20)
      let cy = y1 + (y2 - y1) / 2
      let path = `M ${x1},${y1} Q ${cx},${cy} ${x2},${y2}`
      item.generalizationLine.plot(this.transformPath(path))
      item.generalizationNode.left =
        x +
        (isLeft ? -generalizationNodeMargin : generalizationNodeMargin) -
        (isLeft ? item.generalizationNode.width : 0)
      item.generalizationNode.top =
        top + (bottom - top - item.generalizationNode.height) / 2
    })
  }

  // 渲染展开收起按钮的隐藏占位元素
  renderExpandBtnRect(rect, expandBtnSize, width, height, node) {
    if (node.dir === CONSTANTS.LAYOUT_GROW_DIR.LEFT) {
      rect.size(expandBtnSize, height).x(-expandBtnSize).y(0)
    } else {
      rect.size(expandBtnSize, height).x(width).y(0)
    }
  }
}

export default VerticalTimeline
