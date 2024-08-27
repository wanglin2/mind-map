import Base from './Base'
import { walk, asyncRun, getNodeIndexInNodeList } from '../utils'

//  目录组织图
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

  //  遍历数据计算节点的left、width、height
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
          if (parent._node.isRoot) {
            newNode.top =
              parent._node.top +
              parent._node.height +
              this.getMarginX(layerIndex)
          }
        }
        if (!cur.data.expand) {
          return true
        }
      },
      (cur, parent, isRoot, layerIndex) => {
        if (isRoot) {
          let len = cur.data.expand === false ? 0 : cur._node.children.length
          cur._node.childrenAreaWidth = len
            ? cur._node.children.reduce((h, item) => {
                return h + item.width
              }, 0) +
              (len + 1) * this.getMarginX(layerIndex + 1)
            : 0
        }
      },
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
        if (node.getData('expand') && node.children && node.children.length) {
          let marginX = this.getMarginX(layerIndex + 1)
          let marginY = this.getMarginY(layerIndex + 1)
          if (isRoot) {
            let left = node.left + node.width / 2 - node.childrenAreaWidth / 2
            let totalLeft = left + marginX
            node.children.forEach(cur => {
              cur.left = totalLeft
              totalLeft += cur.width + marginX
            })
          } else {
            let totalTop =
              node.top +
              this.getNodeHeightWithGeneralization(node) +
              marginY +
              (this.getNodeActChildrenLength(node) > 0 ? node.expandBtnSize : 0)
            node.children.forEach(cur => {
              cur.left = node.left + node.width * 0.5
              cur.top = totalTop
              totalTop +=
                this.getNodeHeightWithGeneralization(cur) +
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
        if (parent && parent.isRoot) {
          let areaWidth = this.getNodeAreaWidth(node, true)
          let difference = areaWidth - node.width
          if (difference > 0) {
            this.updateBrothersLeft(node, difference)
          }
        }
        // 调整top
        let len = node.children.length
        if (parent && !parent.isRoot && len > 0) {
          let marginY = this.getMarginY(layerIndex + 1)
          let totalHeight =
            node.children.reduce((h, item) => {
              return (
                h +
                this.getNodeHeightWithGeneralization(item) +
                (this.getNodeActChildrenLength(item) > 0
                  ? item.expandBtnSize
                  : 0)
              )
            }, 0) +
            len * marginY
          this.updateBrothersTop(node, totalHeight)
        }
      },
      (node, parent, isRoot) => {
        if (isRoot) {
          let { right, left } = this.getNodeBoundaries(node, 'h')
          let childrenWidth = right - left
          let offset = node.left - left - (childrenWidth - node.width) / 2
          this.updateChildren(node.children, 'left', offset)
        }
      },
      true
    )
  }

  //  调整兄弟节点的left
  updateBrothersLeft(node, addWidth) {
    if (node.parent) {
      let childrenList = node.parent.children
      let index = getNodeIndexInNodeList(node, childrenList)
      childrenList.forEach((item, _index) => {
        if (item.hasCustomPosition() || _index <= index) {
          // 适配自定义位置
          return
        }
        item.left += addWidth
        // 同步更新子节点的位置
        if (item.children && item.children.length) {
          this.updateChildren(item.children, 'left', addWidth)
        }
      })
      // 更新父节点的位置
      this.updateBrothersLeft(node.parent, addWidth)
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
    let marginX = this.getMarginX(node.layerIndex + 1)
    if (node.isRoot) {
      // 根节点
      let x1 = left + width / 2
      let y1 = top + height
      let s1 = marginX * 0.7
      let minx = Infinity
      let maxx = -Infinity
      node.children.forEach((item, index) => {
        let x2 = item.left + item.width / 2
        let y2 = item.top
        if (x2 < minx) {
          minx = x2
        }
        if (x2 > maxx) {
          maxx = x2
        }
        // 节点使用横线风格，需要额外渲染横线
        let nodeUseLineStylePath = this.mindMap.themeConfig.nodeUseLineStyle
          ? ` L ${item.left},${y2} L ${item.left + item.width},${y2}`
          : ''
        let path =
          `M ${x2},${y1 + s1} L ${x2},${y1 + s1 > y2 ? y2 + item.height : y2}` +
          nodeUseLineStylePath
        // 竖线
        this.setLineStyle(style, lines[index], path, item)
      })
      minx = Math.min(minx, x1)
      maxx = Math.max(maxx, x1)
      // 父节点的竖线
      let line1 = this.lineDraw.path()
      node.style.line(line1)
      line1.plot(this.transformPath(`M ${x1},${y1} L ${x1},${y1 + s1}`))
      node._lines.push(line1)
      style && style(line1, node)
      // 水平线
      if (len > 0) {
        let lin2 = this.lineDraw.path()
        node.style.line(lin2)
        lin2.plot(this.transformPath(`M ${minx},${y1 + s1} L ${maxx},${y1 + s1}`))
        node._lines.push(lin2)
        style && style(lin2, node)
      }
    } else {
      // 非根节点
      let y1 = top + height
      let maxy = -Infinity
      let x2 = node.left + node.width * 0.3
      node.children.forEach((item, index) => {
        // 为了适配自定义位置，下面做了各种位置的兼容
        let y2 = item.top + item.height / 2
        if (y2 > maxy) {
          maxy = y2
        }
        // 水平线
        let path = ''
        let _left = item.left
        let _isLeft = item.left + item.width < x2
        let _isXCenter = false
        if (_isLeft) {
          // 水平位置在父节点左边
          _left = item.left + item.width
        } else if (item.left < x2 && item.left + item.width > x2) {
          // 水平位置在父节点之间
          _isXCenter = true
          y2 = item.top
          maxy = y2
        }
        if (y2 > top && y2 < y1) {
          // 自定义位置的情况：垂直位置节点在父节点之间
          path = `M ${
            _isLeft ? node.left : node.left + node.width
          },${y2} L ${_left},${y2}`
        } else if (y2 < y1) {
          // 自定义位置的情况：垂直位置节点在父节点上面
          if (_isXCenter) {
            y2 = item.top + item.height
            _left = x2
          }
          path = `M ${x2},${top} L ${x2},${y2} L ${_left},${y2}`
        } else {
          if (_isXCenter) {
            _left = x2
          }
          path = `M ${x2},${y2} L ${_left},${y2}`
        }
        // 节点使用横线风格，需要额外渲染横线
        let nodeUseLineStylePath = this.mindMap.themeConfig.nodeUseLineStyle
          ? ` L ${_left},${y2 - item.height / 2} L ${_left},${
              y2 + item.height / 2
            }`
          : ''
        path += nodeUseLineStylePath
        this.setLineStyle(style, lines[index], path, item)
      })
      // 竖线
      if (len > 0) {
        let lin2 = this.lineDraw.path()
        expandBtnSize = len > 0 ? expandBtnSize : 0
        node.style.line(lin2)
        if (maxy < y1 + expandBtnSize) {
          lin2.hide()
        } else {
          lin2.plot(
            this.transformPath(`M ${x2},${y1 + expandBtnSize} L ${x2},${maxy}`)
          )
          lin2.show()
        }
        node._lines.push(lin2)
        style && style(lin2, node)
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
    rect.size(width, expandBtnSize).x(0).y(height)
  }
}

export default CatalogOrganization
