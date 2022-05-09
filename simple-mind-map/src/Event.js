import EventEmitter from 'eventemitter3'

/** 
 * javascript comment 
 * @Author: 王林25 
 * @Date: 2021-04-07 14:53:09 
 * @Desc: 事件类 
 */
class Event extends EventEmitter {
    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-04-07 14:53:25 
     * @Desc: 构造函数 
     */
    constructor(opt = {}) {
        super()
        this.opt = opt
        this.mindMap = opt.mindMap
        this.isLeftMousedown = false
        this.mousedownPos = {
            x: 0,
            y: 0
        }
        this.mousemovePos = {
            x: 0,
            y: 0
        }
        this.mousemoveOffset = {
            x: 0,
            y: 0
        }
        this.bindFn()
        this.bind()
    }

    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-04-07 15:52:24 
     * @Desc: 绑定函数上下文 
     */
    bindFn() {
        this.onDrawClick = this.onDrawClick.bind(this)
        this.onMousedown = this.onMousedown.bind(this)
        this.onMousemove = this.onMousemove.bind(this)
        this.onMouseup = this.onMouseup.bind(this)
        this.onMousewheel = this.onMousewheel.bind(this)
        this.onContextmenu = this.onContextmenu.bind(this)
        this.onSvgMousedown = this.onSvgMousedown.bind(this)
    }

    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-04-07 14:53:43 
     * @Desc: 绑定事件 
     */
    bind() {
        this.mindMap.svg.on('click', this.onDrawClick)
        this.mindMap.el.addEventListener('mousedown', this.onMousedown)
        this.mindMap.svg.on('mousedown', this.onSvgMousedown)
        window.addEventListener('mousemove', this.onMousemove)
        window.addEventListener('mouseup', this.onMouseup)
        // 兼容火狐浏览器
        if(window.navigator.userAgent.toLowerCase().indexOf("firefox") != -1){
            this.mindMap.el.addEventListener('DOMMouseScroll', this.onMousewheel)
        } else {
            this.mindMap.el.addEventListener('mousewheel', this.onMousewheel)
        }
        this.mindMap.svg.on('contextmenu', this.onContextmenu)
    }

    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-04-07 15:40:51 
     * @Desc: 解绑事件 
     */
    unbind() {
        this.mindMap.svg.off('click', this.onDrawClick)
        this.mindMap.el.removeEventListener('mousedown', this.onMousedown)
        window.removeEventListener('mousemove', this.onMousemove)
        window.removeEventListener('mouseup', this.onMouseup)
        this.mindMap.el.removeEventListener('mousewheel', this.onMousewheel)
        this.mindMap.svg.off('contextmenu', this.onContextmenu)
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-04-24 13:19:39 
     * @Desc:  画布的单击事件
     */
    onDrawClick(e) {
        this.emit('draw_click', e)
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-07-16 13:37:30 
     * @Desc:  svg画布的鼠标按下事件
     */
    onSvgMousedown(e) {
        this.emit('svg_mousedown', e)
    }

    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-04-07 15:17:35 
     * @Desc: 鼠标按下事件 
     */
    onMousedown(e) {
        // e.preventDefault()
        // 鼠标左键
        if (e.which === 1) {
            this.isLeftMousedown = true
        }
        this.mousedownPos.x = e.clientX
        this.mousedownPos.y = e.clientY
        this.emit('mousedown', e, this)
    }

    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-04-07 15:18:32 
     * @Desc: 鼠标移动事件 
     */
    onMousemove(e) {
        // e.preventDefault()
        this.mousemovePos.x = e.clientX
        this.mousemovePos.y = e.clientY
        this.mousemoveOffset.x = e.clientX - this.mousedownPos.x
        this.mousemoveOffset.y = e.clientY - this.mousedownPos.y
        this.emit('mousemove', e, this)
        if (this.isLeftMousedown) {
            this.emit('drag', e, this)
        }
    }

    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-04-07 15:18:57 
     * @Desc: 鼠标松开事件 
     */
    onMouseup(e) {
        this.isLeftMousedown = false
        this.emit('mouseup', e, this)
    }

    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-04-07 15:46:27 
     * @Desc: 鼠标滚动 
     */
    onMousewheel(e) {
        e.stopPropagation()
        e.preventDefault()
        let dir
        if ((e.wheelDeltaY || e.detail) > 0) {
            dir = 'up'
        } else {
            dir = 'down'
        }
        this.emit('mousewheel', e, dir, this)
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-07-10 22:34:13 
     * @Desc: 鼠标右键菜单事件 
     */
    onContextmenu(e) {
        e.preventDefault()
        this.emit('contextmenu', e)
    }
}

export default Event