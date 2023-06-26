// 手势事件支持类

class TouchEvent {
  //  构造函数
  constructor({ mindMap }) {
    this.mindMap = mindMap
    this.touchesNum = 0
    this.singleTouchstartEvent = null
    this.clickNum = 0
    this.doubleTouchmoveDistance = 0
    this.bindEvent()
  }

  // 绑定事件
  bindEvent() {
    this.onTouchstart = this.onTouchstart.bind(this)
    this.onTouchmove = this.onTouchmove.bind(this)
    this.onTouchcancel = this.onTouchcancel.bind(this)
    this.onTouchend = this.onTouchend.bind(this)
    window.addEventListener('touchstart', this.onTouchstart)
    window.addEventListener('touchmove', this.onTouchmove)
    window.addEventListener('touchcancel', this.onTouchcancel)
    window.addEventListener('touchend', this.onTouchend)
  }

  // 解绑事件
  unBindEvent() {
    window.removeEventListener('touchstart', this.onTouchstart)
    window.removeEventListener('touchmove', this.onTouchmove)
    window.removeEventListener('touchcancel', this.onTouchcancel)
    window.removeEventListener('touchend', this.onTouchend)
  }

  // 手指按下事件
  onTouchstart(e) {
    this.touchesNum = e.touches.length
    if (this.touchesNum === 1) {
      let touch = e.touches[0]
      this.singleTouchstartEvent = touch
      this.dispatchMouseEvent('mousedown', touch.target, touch)
    }
  }

  // 手指移动事件
  onTouchmove(e) {
    let len = e.touches.length
    if (len === 1) {
      let touch = e.touches[0]
      this.dispatchMouseEvent('mousemove', touch.target, touch)
    } else if (len === 2) {
      let touch1 = e.touches[0]
      let touch2 = e.touches[1]
      let ox = touch1.clientX - touch2.clientX
      let oy = touch1.clientY - touch2.clientY
      let distance = Math.sqrt(Math.pow(ox, 2) + Math.pow(oy, 2))
      // 以两指中心点进行缩放
      let { x: touch1ClientX, y: touch1ClientY } = this.mindMap.toPos(touch1.clientX, touch1.clientY)
      let { x: touch2ClientX, y: touch2ClientY } = this.mindMap.toPos(touch2.clientX, touch2.clientY)
      let cx = (touch1ClientX + touch2ClientX) / 2
      let cy = (touch1ClientY + touch2ClientY) / 2
      if (distance > this.doubleTouchmoveDistance) {
        // 放大
        this.mindMap.view.enlarge(cx, cy)
      } else {
        // 缩小
        this.mindMap.view.narrow(cx, cy)
      }
      this.doubleTouchmoveDistance = distance
    }
  }

  // 手指取消事件
  onTouchcancel(e) {}

  // 手指松开事件
  onTouchend(e) {
    this.dispatchMouseEvent('mouseup', e.target)
    if (this.touchesNum === 1) {
      // 模拟双击事件
      this.clickNum++
      setTimeout(() => {
        this.clickNum = 0
      }, 300)
      let ev = this.singleTouchstartEvent
      if (this.clickNum > 1) {
        this.clickNum = 0
        this.dispatchMouseEvent('dblclick', ev.target, ev)
      } else {
        this.dispatchMouseEvent('click', ev.target, ev)
      }
    }
    this.touchesNum = 0
    this.singleTouchstartEvent = null
    this.doubleTouchmoveDistance = 0
  }

  // 发送鼠标事件
  dispatchMouseEvent(eventName, target, e) {
    let opt = {}
    if (e) {
      opt = {
        screenX: e.screenX,
        screenY: e.screenY,
        clientX: e.clientX,
        clientY: e.clientY,
        which: 1
      }
    }
    let event = new MouseEvent(eventName, {
      view: window,
      bubbles: true,
      cancelable: true,
      ...opt
    })
    target.dispatchEvent(event)
  }

  // 插件被移除前做的事情
  beforePluginRemove() {
    this.unBindEvent()
  }
}

TouchEvent.instanceName = 'touchEvent'

export default TouchEvent
