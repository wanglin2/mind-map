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
    this.mindMap.keyCommand.addShortcut('Control+i', () => {
      this.fit()
    })
    // 拖动视图
    this.mindMap.event.on('mousedown', () => {
      if (this.mindMap.opt.isDisableDrag) return
      this.sx = this.x
      this.sy = this.y
    })
    this.mindMap.event.on('drag', (e, event) => {
      // 按住ctrl键拖动为多选
      // 禁用拖拽
      if (e.ctrlKey || this.mindMap.opt.isDisableDrag) {        
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
    this.mindMap.event.on('mousewheel', (e, dir, event, isTouchPad) => {
      let {
        customHandleMousewheel,
        mousewheelAction,
        mouseScaleCenterUseMousePosition,
        mousewheelMoveStep,
        mousewheelZoomActionReverse,
        disableMouseWheelZoom
      } = this.mindMap.opt
      // 是否自定义鼠标滚轮事件
      if (
        customHandleMousewheel &&
        typeof customHandleMousewheel === 'function'
      ) {
        return customHandleMousewheel(e)
      }
      // 鼠标滚轮事件控制缩放
      if (mousewheelAction === CONSTANTS.MOUSE_WHEEL_ACTION.ZOOM || e.ctrlKey) {
        if (disableMouseWheelZoom) return
        const { x: clientX, y: clientY } = this.mindMap.toPos(
          e.clientX,
          e.clientY
        )
        let cx = mouseScaleCenterUseMousePosition ? clientX : undefined
        let cy = mouseScaleCenterUseMousePosition ? clientY : undefined
        switch (dir) {
          // 鼠标滚轮，向上和向左，都是缩小
          case CONSTANTS.DIR.UP:
          case CONSTANTS.DIR.LEFT:
            mousewheelZoomActionReverse
              ? this.enlarge(cx, cy, isTouchPad)
              : this.narrow(cx, cy, isTouchPad)
            break
          // 鼠标滚轮，向下和向右，都是放大
          case CONSTANTS.DIR.DOWN:
          case CONSTANTS.DIR.RIGHT:
            mousewheelZoomActionReverse
              ? this.narrow(cx, cy, isTouchPad)
              : this.enlarge(cx, cy, isTouchPad)
            break
        }
      } else {
        // 鼠标滚轮事件控制画布移动
        let step = mousewheelMoveStep
        if (isTouchPad) {
          step = 5
        }
        switch (dir) {
          // 上移
          case CONSTANTS.DIR.DOWN:
            this.translateY(-step)
            break
          // 下移
          case CONSTANTS.DIR.UP:
            this.translateY(step)
            break
          // 右移
          case CONSTANTS.DIR.LEFT:
            this.translateX(-step)
            break
          // 左移
          case CONSTANTS.DIR.RIGHT:
            this.translateX(step)
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
    if (x === 0 && y === 0) return
    this.x += x
    this.y += y
    this.transform()
  }

  //  平移x方向
  translateX(step) {
    if (step === 0) return
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
    if (step === 0) return
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
      origin: [0, 0],
      scale: this.scale,
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
  narrow(cx, cy, isTouchPad) {
    const scaleRatio = this.mindMap.opt.scaleRatio / (isTouchPad ? 5 : 1)
    const scale = Math.max(this.scale - scaleRatio, 0.1)
    this.scaleInCenter(scale, cx, cy)
    this.transform()
    this.mindMap.emit('scale', this.scale)
  }

  //  放大
  enlarge(cx, cy, isTouchPad) {
    const scaleRatio = this.mindMap.opt.scaleRatio / (isTouchPad ? 5 : 1)
    const scale = this.scale + scaleRatio
    this.scaleInCenter(scale, cx, cy)
    this.transform()
    this.mindMap.emit('scale', this.scale)
  }

  // 基于指定中心进行缩放，cx，cy 可不指定，此时会使用画布中心点
  scaleInCenter(scale, cx, cy) {
    if (cx === undefined || cy === undefined) {
      cx = this.mindMap.width / 2
      cy = this.mindMap.height / 2
    }
    const prevScale = this.scale
    const ratio = 1 - scale / prevScale
    const dx = (cx - this.x) * ratio
    const dy = (cy - this.y) * ratio
    this.x += dx
    this.y += dy
    this.scale = scale
  }

  //  设置缩放
  setScale(scale, cx, cy) {
    if (cx !== undefined && cy !== undefined) {
      this.scaleInCenter(scale, cx, cy)
    } else {
      this.scale = scale
    }
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
      this.mindMap.elRect
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
