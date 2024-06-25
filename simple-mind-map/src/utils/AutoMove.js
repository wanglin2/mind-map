// 画布自动移动类
class AutoMove {
  constructor(mindMap) {
    this.mindMap = mindMap
    this.autoMoveTimer = null
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
}

export default AutoMove
