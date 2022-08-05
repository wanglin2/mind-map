/** 
 * javascript comment 
 * @Author: 王林25 
 * @Date: 2021-04-07 14:45:24 
 * @Desc: 视图操作类 
 */
class View {
    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-04-07 14:45:40 
     * @Desc: 构造函数 
     */
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

    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-04-07 15:38:51 
     * @Desc: 绑定 
     */
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
                this.mindMap.execCommand('CLEAR_ACTIVE_NODE')
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
            // // 放大
            if (dir === 'down') {
                this.enlarge()
            } else { // 缩小
                this.narrow()
            }
        })
    }

    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-11-22 18:30:24 
     * @Desc: 获取当前变换状态数据 
     */
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

    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-11-22 19:54:17 
     * @Desc: 动态设置变换状态数据 
     */
    setTransformData(viewData) {
        if (viewData) {
            Object.keys(viewData.state).forEach((prop) => {
                this[prop] = viewData.state[prop]
            })
            this.mindMap.draw.transform({
                ...viewData.transform
            })
            this.mindMap.emit('view_data_change', this.getTransformData())
            this.mindMap.emit('scale', this.scale)
        }
    }

    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-07-13 15:49:06 
     * @Desc: 平移x方向 
     */
    translateX(step) {
        this.x += step
        this.transform()
    }

    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-07-13 15:48:52 
     * @Desc: 平移y方向 
     */
    translateY(step) {
        this.y += step
        this.transform()
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-07-04 17:13:14 
     * @Desc:  应用变换
     */
    transform() {
        this.mindMap.draw.transform({
            scale: this.scale,
            // origin: 'center center',
            translate: [this.x, this.y],
        })
        this.mindMap.emit('view_data_change', this.getTransformData())
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-07-11 17:41:35 
     * @Desc: 恢复
     */
    reset() {
        this.scale = 1
        this.x = 0
        this.y = 0
        this.transform()
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-07-04 17:10:34 
     * @Desc: 缩小 
     */
    narrow() {
        if (this.scale - this.mindMap.opt.scaleRatio > 0.1) {
            this.scale -= this.mindMap.opt.scaleRatio
        } else {
            this.scale = 0.1
        }
        this.transform()
        this.mindMap.emit('scale', this.scale)
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-07-04 17:10:41 
     * @Desc: 放大 
     */
    enlarge() {
        this.scale += this.mindMap.opt.scaleRatio
        this.transform()
        this.mindMap.emit('scale', this.scale)
    }
}

export default View