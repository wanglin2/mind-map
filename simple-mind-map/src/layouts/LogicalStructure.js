import Base from './Base'
import { walk, asyncRun, getNodeIndexInNodeList } from '../utils'
import { CONSTANTS } from '../constants/constant'

//  逻辑结构图
class LogicalStructure extends Base {
  //  构造函数
  constructor(opt = {}, layout) {
    super(opt)
    this.isUseLeft = layout === CONSTANTS.LAYOUT.LOGICAL_STRUCTURE_LEFT
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
        this.adjustTopValue()
      },
      () => {
        callback(this.root)
      }
    ]
    asyncRun(task)
  }
  /**
   * 根据节点数组 获取 节点的UId以及父节点的UId  主要是用于将改动范围缩小到 当前激活节点和父节点 而不是全量变动
   * @param arr
   * @returns {*[]}
   */
  getUidAndParentUid(arr){
    const uidList = []
    if(arr && arr.length){
      arr.forEach(item=>{
        uidList.push(item.uid)
        if(item.parent){
          uidList.push(item.parent.uid)
        }
      })
    }
    return uidList;
  }
  //  遍历数据计算节点的left、width、height
  computedBaseValue() {
    let sortIndex = 0
    const activeUiDList = [...this.getUidAndParentUid(this.renderer.activeNodeList),...this.getUidAndParentUid(this.renderer.lastActiveNodeList)]
    walk(
      this.renderer.renderTree,
      null,
      (cur, parent, isRoot, layerIndex, index, ancestors) => {
        let newNode = cur?._node
        // 只有变动的节点  结构改变  和  执行撤销和前进的操作才进入创建节点的操作
        if(!newNode || activeUiDList.includes(cur.data.uid) || this.checkIsNeedResizeSources() || this.renderer.renderSource === CONSTANTS.CHANGE_LAYOUT || this.renderer.renderSource === "HISTORY_RECORD"){
          newNode = this.createNode(cur, parent, isRoot, layerIndex, index, ancestors,this.renderer.renderSource !== "HISTORY_RECORD")
        }
        // 将缓存节点移至外边去缓存。保证每个节点缓存都是最新的
        this.cacheNode(cur.data.uid,newNode)
        newNode.sortIndex = sortIndex
        sortIndex++
        // 根节点定位在画布中心位置
        if (isRoot) {
          this.setNodeCenter(newNode)
        } else {
          // 非根节点
          // 定位到父节点右侧
          if (this.isUseLeft) {
            newNode.left =
              parent._node.left - newNode.width - this.getMarginX(layerIndex)
          } else {
            newNode.left =
              parent._node.left +
              parent._node.width +
              this.getMarginX(layerIndex)
          }
        }
        if (!cur.data.expand) {
          return true
        }
      },
      (cur, parent, isRoot, layerIndex) => {
        // 返回时计算节点的areaHeight，也就是子节点所占的高度之和，包括外边距
        let len = cur.data.expand === false ? 0 : cur._node.children.length
        // 这里是一次性计算出所有节点得childrenAreaHeight（如果自身比子节点高度高则取自身高度） 包括没有子节点得节点（它的childrenAreaHeight为自身高度+边距）
        // 节点间的上下间距  也不在多计算 如3个子节点时  只加2个间距而不是之前的3个间距 因为父节点间距的存在 所以不需要最后一个子节点再加间距
        // 这个改动是为了一次性计算出节点的布局  不用在单独遍历计算了
        cur._node.childrenAreaHeight = len
          ? cur._node.children.reduce((h, item) => {
          return h + (item.childrenAreaHeight > item.height ? item.childrenAreaHeight : item.height)
        }, 0) + (len-1)* this.getMarginY(layerIndex + 1)
          : cur._node.height + this.getMarginY(layerIndex + 1)

        // 如果存在概要，则和概要的高度取最大值
        let generalizationNodeHeight = cur._node.checkHasGeneralization()
          ? cur._node._generalizationNodeHeight +
            this.getMarginY(layerIndex + 1)
          : 0
        cur._node.childrenAreaHeight2 = Math.max(
          cur._node.childrenAreaHeight,
          generalizationNodeHeight
        )
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
      (node, parent, isRoot, layerIndex) => {
        if (node.getData('expand') && node.children && node.children.length) {
          // 这里的算法就一次性计算出所有节点的正确位置
          // 第一个子节点的top值 = 该节点中心的top值 + 自身节点一半 - 子节点的高度之和的一半
          let totalTop = node.top + node.height / 2 - node.childrenAreaHeight / 2
          for (let i = 0; i < node.children.length; i++) {
            let cur = node.children[i]
            let nextNode = node.children[i+1]
            // 这里只计算出节点的最高处的坐标  如果子节点高就是子节点的最高处为基准计算  如果是自身高  就以自身为基准计算
            if( cur.height > cur.childrenAreaHeight){
              cur.top = totalTop
              totalTop += cur.height
            }else{
              cur.top = totalTop + cur.childrenAreaHeight / 2 - cur.height/2
              totalTop +=   cur.childrenAreaHeight
            }
            // 如果还有下一个节点 那么就加上上下的间距
            if(nextNode){
              totalTop += this.getMarginY(layerIndex + 1)
            }
          }
        }
      },
      null,
      true
    )
  }

  //  调整节点top
  adjustTopValue() {
    // 这一步 由于以上的改动 可以去掉了
    /* walk(
       this.root,
       null,
       (node, parent, isRoot, layerIndex) => {
         if (!node.getData('expand')) {
           return
         }
         // 判断子节点所占的高度之和是否大于该节点自身，大于则需要调整位置
         let difference =
           node.childrenAreaHeight2 -
           this.getMarginY(layerIndex + 1) * 2 -
           node.height
         if (difference > 0) {
           this.updateBrothers(node, difference / 2)
         }
       },
       null,
       true
     )*/
  }

  //  更新兄弟节点的top
  updateBrothers(node, addHeight) {
    if (node.parent) {
      let childrenList = node.parent.children
      let index = getNodeIndexInNodeList(node, childrenList)
      childrenList.forEach((item, _index) => {
        if (item.uid === node.uid || item.hasCustomPosition()) {
          // 适配自定义位置
          return
        }
        let _offset = 0
        // 上面的节点往上移
        if (_index < index) {
          _offset = -addHeight
        } else if (_index > index) {
          // 下面的节点往下移
          _offset = addHeight
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

  //  直线风格连线
  renderLineStraight(node, lines, style) {
    if (node.children.length <= 0) {
      return []
    }
    let { left, top, width, height, expandBtnSize } = node
    const { alwaysShowExpandBtn, notShowExpandBtn } = this.mindMap.opt
    if (!alwaysShowExpandBtn || notShowExpandBtn) {
      expandBtnSize = 0
    }
    let marginX = this.getMarginX(node.layerIndex + 1)
    let s1 = (marginX - expandBtnSize) * 0.6
    if (this.isUseLeft) {
      s1 *= -1
    }
    let nodeUseLineStyle = this.mindMap.themeConfig.nodeUseLineStyle
    node.children.forEach((item, index) => {
      let x1
      if (this.isUseLeft) {
        x1 = node.layerIndex === 0 ? left : left - expandBtnSize
      } else {
        x1 = node.layerIndex === 0 ? left + width : left + width + expandBtnSize
      }
      let y1 = top + height / 2
      let x2 = this.isUseLeft ? item.left + item.width : item.left
      let y2 = item.top + item.height / 2
      // 节点使用横线风格，需要额外渲染横线
      let nodeUseLineStyleOffset = nodeUseLineStyle
        ? item.width * (this.isUseLeft ? -1 : 1)
        : 0
      y1 = nodeUseLineStyle && !node.isRoot ? y1 + height / 2 : y1
      y2 = nodeUseLineStyle ? y2 + item.height / 2 : y2
      let path = this.createFoldLine([
        [x1, y1],
        [x1 + s1, y1],
        [x1 + s1, y2],
        [x2 + nodeUseLineStyleOffset, y2]
      ])
      this.setLineStyle(style, lines[index], path, item)
    })
  }

  //  直连风格
  renderLineDirect(node, lines, style) {
    if (node.children.length <= 0) {
      return []
    }
    let { left, top, width, height, expandBtnSize } = node
    const { alwaysShowExpandBtn, notShowExpandBtn } = this.mindMap.opt
    if (!alwaysShowExpandBtn || notShowExpandBtn) {
      expandBtnSize = 0
    }
    const { nodeUseLineStyle } = this.mindMap.themeConfig
    node.children.forEach((item, index) => {
      if (node.layerIndex === 0) {
        expandBtnSize = 0
      }
      let x1 = this.isUseLeft
        ? left - expandBtnSize
        : left + width + expandBtnSize
      let y1 = top + height / 2
      let x2 = this.isUseLeft ? item.left + item.width : item.left
      let y2 = item.top + item.height / 2
      y1 = nodeUseLineStyle && !node.isRoot ? y1 + height / 2 : y1
      y2 = nodeUseLineStyle ? y2 + item.height / 2 : y2
      // 节点使用横线风格，需要额外渲染横线
      let nodeUseLineStylePath = nodeUseLineStyle
        ? ` L ${this.isUseLeft ? item.left : item.left + item.width},${y2}`
        : ''
      let path = `M ${x1},${y1} L ${x2},${y2}` + nodeUseLineStylePath
      this.setLineStyle(style, lines[index], path, item)
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
    const {
      nodeUseLineStyle,
      rootLineStartPositionKeepSameInCurve,
      rootLineKeepSameInCurve
    } = this.mindMap.themeConfig
    node.children.forEach((item, index) => {
      if (node.layerIndex === 0) {
        expandBtnSize = 0
      }
      let x1
      if (this.isUseLeft) {
        x1 =
          node.layerIndex === 0 && !rootLineStartPositionKeepSameInCurve
            ? left + width / 2
            : left - expandBtnSize
      } else {
        x1 =
          node.layerIndex === 0 && !rootLineStartPositionKeepSameInCurve
            ? left + width / 2
            : left + width + expandBtnSize
      }
      let y1 = top + height / 2
      let x2 = this.isUseLeft ? item.left + item.width : item.left
      let y2 = item.top + item.height / 2
      let path = ''
      y1 = nodeUseLineStyle && !node.isRoot ? y1 + height / 2 : y1
      y2 = nodeUseLineStyle ? y2 + item.height / 2 : y2
      // 节点使用横线风格，需要额外渲染横线
      let nodeUseLineStylePath
      if (this.isUseLeft) {
        nodeUseLineStylePath = nodeUseLineStyle ? ` L ${item.left},${y2}` : ''
      } else {
        nodeUseLineStylePath = nodeUseLineStyle
          ? ` L ${item.left + item.width},${y2}`
          : ''
      }
      if (node.isRoot && !rootLineKeepSameInCurve) {
        path = this.quadraticCurvePath(x1, y1, x2, y2) + nodeUseLineStylePath
      } else {
        path = this.cubicBezierPath(x1, y1, x2, y2) + nodeUseLineStylePath
      }
      this.setLineStyle(style, lines[index], path, item)
    })
  }

  //  渲染按钮
  renderExpandBtn(node, btn) {
    let { width, height, expandBtnSize, layerIndex } = node
    if (layerIndex === 0) {
      expandBtnSize = 0
    }
    let { translateX, translateY } = btn.transform()
    // 节点使用横线风格，需要调整展开收起按钮位置
    let nodeUseLineStyleOffset = this.mindMap.themeConfig.nodeUseLineStyle
      ? height / 2
      : 0
    // 位置没有变化则返回
    let _x = this.isUseLeft ? 0 - expandBtnSize : width
    let _y = height / 2 + nodeUseLineStyleOffset
    if (_x === translateX && _y === translateY) {
      return
    }
    btn.translate(_x - translateX, _y - translateY)
  }

  //  创建概要节点
  renderGeneralization(list) {
    list.forEach(item => {
      let {
        left,
        top,
        bottom,
        right,
        generalizationLineMargin,
        generalizationNodeMargin
      } = this.getNodeGeneralizationRenderBoundaries(item, 'h')
      let x = this.isUseLeft
        ? left - generalizationLineMargin
        : right + generalizationLineMargin
      let x1 = x
      let y1 = top
      let x2 = x
      let y2 = bottom
      let cx = x1 + (this.isUseLeft ? -20 : 20)
      let cy = y1 + (y2 - y1) / 2
      let path = `M ${x1},${y1} Q ${cx},${cy} ${x2},${y2}`
      item.generalizationLine.plot(path)
      item.generalizationNode.left =
        x +
        (this.isUseLeft
          ? -generalizationNodeMargin
          : generalizationNodeMargin) -
        (this.isUseLeft ? item.generalizationNode.width : 0)
      item.generalizationNode.top =
        top + (bottom - top - item.generalizationNode.height) / 2
    })
  }

  // 渲染展开收起按钮的隐藏占位元素
  renderExpandBtnRect(rect, expandBtnSize, width, height) {
    if (this.isUseLeft) {
      rect.size(expandBtnSize, height).x(-expandBtnSize).y(0)
    } else {
      rect.size(expandBtnSize, height).x(width).y(0)
    }
  }
}

export default LogicalStructure
