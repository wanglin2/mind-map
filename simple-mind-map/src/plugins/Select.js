import { bfsWalk, throttle, checkTwoRectIsOverlap } from '../utils'

// 节点选择插件
class Select {
  //  构造函数
  constructor({ mindMap }) {
    this.mindMap = mindMap
    this.rect = null
    this.isMousedown = false
    this.mouseDownX = 0
    this.mouseDownY = 0
    this.mouseMoveX = 0
    this.mouseMoveY = 0
    this.isSelecting = false
    this.cacheActiveList = []
    this.bindEvent()
  }

  //  绑定事件
  bindEvent() {
    this.checkInNodes = throttle(this.checkInNodes, 300, this)
    this.mindMap.on('mousedown', e => {
      if (this.mindMap.opt.readonly) {
        return
      }
      let { useLeftKeySelectionRightKeyDrag } = this.mindMap.opt
      if (
        !e.ctrlKey &&
        (useLeftKeySelectionRightKeyDrag ? e.which !== 1 : e.which !== 3)
      ) {
        return
      }
      e.preventDefault()
      this.isMousedown = true
      this.cacheActiveList = [...this.mindMap.renderer.activeNodeList]
      let { x, y } = this.mindMap.toPos(e.clientX, e.clientY)
      this.mouseDownX = x
      this.mouseDownY = y
      this.createRect(x, y)
    })
    this.mindMap.on('mousemove', e => {
      if (this.mindMap.opt.readonly) {
        return
      }
      if (!this.isMousedown) {
        return
      }
      let { x, y } = this.mindMap.toPos(e.clientX, e.clientY)
      this.mouseMoveX = x
      this.mouseMoveY = y
      if (
        Math.abs(x - this.mouseDownX) <= 10 &&
        Math.abs(y - this.mouseDownY) <= 10
      ) {
        return
      }
      this.clearAutoMoveTimer()
      this.onMove(
        e.clientX,
        e.clientY,
        () => {
          this.isSelecting = true
          // 绘制矩形
          this.rect.plot([
            [this.mouseDownX, this.mouseDownY],
            [this.mouseMoveX, this.mouseDownY],
            [this.mouseMoveX, this.mouseMoveY],
            [this.mouseDownX, this.mouseMoveY]
          ])
          this.checkInNodes()
        },
        (dir, step) => {
          switch (dir) {
            case 'left':
              this.mouseDownX += step
              break
            case 'top':
              this.mouseDownY += step
              break
            case 'right':
              this.mouseDownX -= step
              break
            case 'bottom':
              this.mouseDownY -= step
              break
            default:
              break
          }
        }
      )
    })
    this.onMouseup = this.onMouseup.bind(this)
    this.mindMap.on('mouseup', this.onMouseup)
    this.mindMap.on('node_mouseup', this.onMouseup)
  }

  // 结束框选
  onMouseup() {
    if (this.mindMap.opt.readonly) {
      return
    }
    if (!this.isMousedown) {
      return
    }
    this.checkTriggerNodeActiveEvent()
    clearTimeout(this.autoMoveTimer)
    this.isMousedown = false
    this.cacheActiveList = []
    if (this.rect) this.rect.remove()
    this.rect = null
    setTimeout(() => {
      this.isSelecting = false
    }, 0)
  }

  // 如果激活节点改变了，那么触发事件
  checkTriggerNodeActiveEvent() {
    let isNumChange =
      this.cacheActiveList.length !==
      this.mindMap.renderer.activeNodeList.length
    let isNodeChange = false
    if (!isNumChange) {
      for (let i = 0; i < this.cacheActiveList.length; i++) {
        let cur = this.cacheActiveList[i]
        if (
          !this.mindMap.renderer.activeNodeList.find(item => {
            return item.getData('uid') === cur.getData('uid')
          })
        ) {
          isNodeChange = true
          break
        }
      }
    }
    if (isNumChange || isNodeChange) {
      this.mindMap.renderer.emitNodeActiveEvent()
    }
  }

  //  鼠标移动事件
  onMove(x, y, callback = () => {}, handle = () => {}) {
    callback()
    // 检测边缘移动
    let step = this.mindMap.opt.selectTranslateStep
    let limit = this.mindMap.opt.selectTranslateLimit
    let count = 0
    // 左边缘
    if (x <= this.mindMap.elRect.left + limit) {
      handle('left', step)
      this.mindMap.view.translateX(step)
      count++
    }
    // 右边缘
    if (x >= this.mindMap.elRect.right - limit) {
      handle('right', step)
      this.mindMap.view.translateX(-step)
      count++
    }
    // 上边缘
    if (y <= this.mindMap.elRect.top + limit) {
      handle('top', step)
      this.mindMap.view.translateY(step)
      count++
    }
    // 下边缘
    if (y >= this.mindMap.elRect.bottom - limit) {
      handle('bottom', step)
      this.mindMap.view.translateY(-step)
      count++
    }
    if (count > 0) {
      this.startAutoMove(x, y, callback, handle)
    }
  }

  //  开启自动移动
  startAutoMove(x, y, callback, handle) {
    this.autoMoveTimer = setTimeout(() => {
      this.onMove(x, y, callback, handle)
    }, 20)
  }

  // 清除自动移动定时器
  clearAutoMoveTimer() {
    clearTimeout(this.autoMoveTimer)
  }

  //  创建矩形
  createRect(x, y) {
    if (this.rect) this.rect.remove()
    this.rect = this.mindMap.svg
      .polygon()
      .stroke({
        color: '#0984e3'
      })
      .fill({
        color: 'rgba(9,132,227,0.3)'
      })
      .plot([[x, y]])
  }

  //  检测在选区里的节点
  checkInNodes() {
    let { scaleX, scaleY, translateX, translateY } =
      this.mindMap.draw.transform()
    let minx = Math.min(this.mouseDownX, this.mouseMoveX)
    let miny = Math.min(this.mouseDownY, this.mouseMoveY)
    let maxx = Math.max(this.mouseDownX, this.mouseMoveX)
    let maxy = Math.max(this.mouseDownY, this.mouseMoveY)
    bfsWalk(this.mindMap.renderer.root, node => {
      let { left, top, width, height } = node
      let right = (left + width) * scaleX + translateX
      let bottom = (top + height) * scaleY + translateY
      left = left * scaleX + translateX
      top = top * scaleY + translateY
      if (
        checkTwoRectIsOverlap(minx, maxx, miny, maxy, left, right, top, bottom)
      ) {
        if (node.getData('isActive')) {
          return
        }
        this.mindMap.renderer.addNodeToActiveList(node)
      } else if (node.getData('isActive')) {
        if (!node.getData('isActive')) {
          return
        }
        this.mindMap.renderer.removeNodeFromActiveList(node)
      }
    })
  }

  // 是否存在选区
  hasSelectRange() {
    return this.isSelecting
  }
}

Select.instanceName = 'select'

export default Select
