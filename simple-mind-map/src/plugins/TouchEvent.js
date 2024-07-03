import { getTwoPointDistance } from '../utils'

// 手势事件支持插件
class TouchEvent {
  //  构造函数
  constructor({ mindMap }) {
    this.mindMap = mindMap
    this.touchesNum = 0
    this.singleTouchstartEvent = null
    this.clickNum = 0
    this.touchStartScaleView = null
    this.lastTouchStartPosition = null
    this.lastTouchStartDistance = 0
    this.bindEvent()
  }

  // 绑定事件
  bindEvent() {
    this.onTouchstart = this.onTouchstart.bind(this)
    this.onTouchmove = this.onTouchmove.bind(this)
    this.onTouchcancel = this.onTouchcancel.bind(this)
    this.onTouchend = this.onTouchend.bind(this)
    window.addEventListener('touchstart', this.onTouchstart, { passive: false })
    window.addEventListener('touchmove', this.onTouchmove, { passive: false })
    window.addEventListener('touchcancel', this.onTouchcancel, {
      passive: false
    })
    window.addEventListener('touchend', this.onTouchend, { passive: false })
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
    this.touchStartScaleView = null
    if (this.touchesNum === 1) {
      let touch = e.touches[0]
      if (this.lastTouchStartPosition) {
        this.lastTouchStartDistance = getTwoPointDistance(
          this.lastTouchStartPosition.x,
          this.lastTouchStartPosition.y,
          touch.clientX,
          touch.clientY
        )
      }
      this.lastTouchStartPosition = {
        x: touch.clientX,
        y: touch.clientY
      }
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
      let { disableTouchZoom, minTouchZoomScale, maxTouchZoomScale } =
        this.mindMap.opt
      if (disableTouchZoom) return
      minTouchZoomScale =
        minTouchZoomScale === -1 ? -Infinity : minTouchZoomScale / 100
      maxTouchZoomScale =
        maxTouchZoomScale === -1 ? Infinity : maxTouchZoomScale / 100
      let touch1 = e.touches[0]
      let touch2 = e.touches[1]
      let ox = touch1.clientX - touch2.clientX
      let oy = touch1.clientY - touch2.clientY
      let distance = Math.sqrt(Math.pow(ox, 2) + Math.pow(oy, 2))
      // 以两指中心点进行缩放
      let { x: touch1ClientX, y: touch1ClientY } = this.mindMap.toPos(
        touch1.clientX,
        touch1.clientY
      )
      let { x: touch2ClientX, y: touch2ClientY } = this.mindMap.toPos(
        touch2.clientX,
        touch2.clientY
      )
      let cx = (touch1ClientX + touch2ClientX) / 2
      let cy = (touch1ClientY + touch2ClientY) / 2
      // 手势缩放,基于最开始的位置进行缩放(基于前一个位置缩放不是线性关系); 缩放同时支持位置拖动
      const view = this.mindMap.view
      if (!this.touchStartScaleView) {
        this.touchStartScaleView = {
          distance: distance,
          scale: view.scale,
          x: view.x,
          y: view.y,
          cx: cx,
          cy: cy
        }
        return
      }
      const viewBefore = this.touchStartScaleView
      let scale = viewBefore.scale * (distance / viewBefore.distance)
      if (Math.abs(distance - viewBefore.distance) <= 10) {
        scale = viewBefore.scale
      }
      scale =
        scale < minTouchZoomScale
          ? minTouchZoomScale
          : scale > maxTouchZoomScale
          ? maxTouchZoomScale
          : scale
      const ratio = 1 - scale / viewBefore.scale
      view.scale = scale
      view.x =
        viewBefore.x +
        (cx - viewBefore.x) * ratio +
        (cx - viewBefore.cx) * scale
      view.y =
        viewBefore.y +
        (cy - viewBefore.y) * ratio +
        (cy - viewBefore.cy) * scale
      view.transform()
      this.mindMap.emit('scale', scale)
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
        this.lastTouchStartPosition = null
        this.lastTouchStartDistance = 0
      }, 300)
      let ev = this.singleTouchstartEvent
      if (this.clickNum > 1 && this.lastTouchStartDistance <= 5) {
        this.clickNum = 0
        this.dispatchMouseEvent('dblclick', ev.target, ev)
      } else {
        // 点击事件应该不用模拟
        // this.dispatchMouseEvent('click', ev.target, ev)
      }
    }
    this.touchesNum = 0
    this.singleTouchstartEvent = null
    this.touchStartScaleView = null
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
      view: document.defaultView,
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

  // 插件被卸载前做的事情
  beforePluginDestroy() {
    this.unBindEvent()
  }
}

TouchEvent.instanceName = 'touchEvent'

export default TouchEvent
