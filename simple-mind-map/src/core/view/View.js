import { CONSTANTS } from '../../constants/constant'

//  视图操作类
class View {
  //  构造函数
  constructor(opt = {}) {
    this.opt = opt
    this.mindMap = this.opt.mindMap
    this.scale = 1
    this.sx = 0
    this.sy = 0
    this.x = 0
    this.y = 0
    this.firstDrag = true
    this.setTransformData(this.mindMap.opt.viewData)
    this.bind()
  }

  //  绑定
  bind() {
    // 快捷键
    this.mindMap.keyCommand.addShortcut('Control+=', () => {
      this.enlarge()
    })
    this.mindMap.keyCommand.addShortcut('Control+-', () => {
      this.narrow()
    })
    this.mindMap.keyCommand.addShortcut('Control+Enter', () => {
      this.reset()
    })
    this.mindMap.keyCommand.addShortcut('Control+i', () => {
      this.fit()
    })
    this.mindMap.svg.on('dblclick', () => {
      this.reset()
    })
    // 拖动视图
    this.mindMap.event.on('mousedown', () => {
      this.sx = this.x
      this.sy = this.y
    })
    this.mindMap.event.on('drag', (e, event) => {
      if (e.ctrlKey) {
        // 按住ctrl键拖动为多选
        return
      }
      if (this.firstDrag) {
        this.firstDrag = false
        // 清除激活节点
        if (this.mindMap.renderer.activeNodeList.length > 0) {
          this.mindMap.execCommand('CLEAR_ACTIVE_NODE')
        }
      }
      this.x = this.sx + event.mousemoveOffset.x
      this.y = this.sy + event.mousemoveOffset.y
      this.transform()
    })
    this.mindMap.event.on('mouseup', () => {
      this.firstDrag = true
    })
    // 放大缩小视图
    this.mindMap.event.on('mousewheel', (e, dir) => {
      if (
        this.mindMap.opt.customHandleMousewheel &&
        typeof this.mindMap.opt.customHandleMousewheel === 'function'
      ) {
        return this.mindMap.opt.customHandleMousewheel(e)
      }
      if (
        this.mindMap.opt.mousewheelAction === CONSTANTS.MOUSE_WHEEL_ACTION.ZOOM
      ) {
        switch (dir) {
          // 鼠标滚轮，向上和向左，都是缩小
          case CONSTANTS.DIR.UP:
          case CONSTANTS.DIR.LEFT:
            this.narrow()
            break
          // 鼠标滚轮，向下和向右，都是放大
          case CONSTANTS.DIR.DOWN:
          case CONSTANTS.DIR.RIGHT:
            this.enlarge()
            break
        }
      } else {
        switch (dir) {
          // 上移
          case CONSTANTS.DIR.DOWN:
            this.translateY(-this.mindMap.opt.mousewheelMoveStep)
            break
          // 下移
          case CONSTANTS.DIR.UP:
            this.translateY(this.mindMap.opt.mousewheelMoveStep)
            break
          // 右移
          case CONSTANTS.DIR.LEFT:
            this.translateX(-this.mindMap.opt.mousewheelMoveStep)
            break
          // 左移
          case CONSTANTS.DIR.RIGHT:
            this.translateX(this.mindMap.opt.mousewheelMoveStep)
            break
        }
      }
    })
  }

  //  获取当前变换状态数据
  getTransformData() {
    return {
      transform: this.mindMap.draw.transform(),
      state: {
        scale: this.scale,
        x: this.x,
        y: this.y,
        sx: this.sx,
        sy: this.sy
      }
    }
  }

  //  动态设置变换状态数据
  setTransformData(viewData) {
    if (viewData) {
      Object.keys(viewData.state).forEach(prop => {
        this[prop] = viewData.state[prop]
      })
      this.mindMap.draw.transform({
        ...viewData.transform
      })
      this.mindMap.emit('view_data_change', this.getTransformData())
      this.mindMap.emit('scale', this.scale)
    }
  }

  //  平移x,y方向
  translateXY(x, y) {
    this.x += x
    this.y += y
    this.transform()
  }

  //  平移x方向
  translateX(step) {
    this.x += step
    this.transform()
  }

  //  平移x方式到
  translateXTo(x) {
    this.x = x
    this.transform()
  }

  //  平移y方向
  translateY(step) {
    this.y += step
    this.transform()
  }

  //  平移y方向到
  translateYTo(y) {
    this.y = y
    this.transform()
  }

  //   应用变换
  transform() {
    this.mindMap.draw.transform({
      scale: this.scale,
      // origin: 'center center',
      translate: [this.x, this.y]
    })
    this.mindMap.emit('view_data_change', this.getTransformData())
  }

  //  恢复
  reset() {
    let scaleChange = this.scale !== 1
    this.scale = 1
    this.x = 0
    this.y = 0
    this.transform()
    if (scaleChange) {
      this.mindMap.emit('scale', this.scale)
    }
  }

  //  缩小
  narrow() {
    if (this.scale - this.mindMap.opt.scaleRatio > 0.1) {
      this.scale -= this.mindMap.opt.scaleRatio
    } else {
      this.scale = 0.1
    }
    this.transform()
    this.mindMap.emit('scale', this.scale)
  }

  //  放大
  enlarge() {
    this.scale += this.mindMap.opt.scaleRatio
    this.transform()
    this.mindMap.emit('scale', this.scale)
  }

  //  设置缩放
  setScale(scale) {
    this.scale = scale
    this.transform()
    this.mindMap.emit('scale', this.scale)
  }

  // 适应画布大小
  fit() {
    let { fitPadding } = this.mindMap.opt
    let draw = this.mindMap.draw
    let origTransform = draw.transform()
    let rect = draw.rbox()
    let drawWidth = rect.width / origTransform.scaleX
    let drawHeight = rect.height / origTransform.scaleY
    let drawRatio = drawWidth / drawHeight
    let { width: elWidth, height: elHeight } =
      this.mindMap.el.getBoundingClientRect()
    elWidth = elWidth - fitPadding * 2
    elHeight = elHeight - fitPadding * 2
    let elRatio = elWidth / elHeight
    let newScale = 0
    let flag = ''
    if (drawWidth <= elWidth && drawHeight <= elHeight) {
      newScale = 1
      flag = 1
    } else {
      let newWidth = 0
      let newHeight = 0
      if (drawRatio > elRatio) {
        newWidth = elWidth
        newHeight = elWidth / drawRatio
        flag = 2
      } else {
        newHeight = elHeight
        newWidth = elHeight * drawRatio
        flag = 3
      }
      newScale = newWidth / drawWidth
    }
    this.setScale(newScale)
    let newRect = draw.rbox()
    let newX = 0
    let newY = 0
    if (flag === 1) {
      newX = -newRect.x + fitPadding + (elWidth - newRect.width) / 2
      newY = -newRect.y + fitPadding + (elHeight - newRect.height) / 2
    } else if (flag === 2) {
      newX = -newRect.x + fitPadding
      newY = -newRect.y + fitPadding + (elHeight - newRect.height) / 2
    } else if (flag === 3) {
      newX = -newRect.x + fitPadding + (elWidth - newRect.width) / 2
      newY = -newRect.y + fitPadding
    }
    this.translateXY(newX, newY)
  }
}

export default View
