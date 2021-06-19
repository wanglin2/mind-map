import merge from 'deepmerge'

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
        this.viewBox = {
            x: 0,
            y: 0,
            width: this.mindMap.width,
            height: this.mindMap.height
        }
        this.cacheViewBox = {
            x: 0,
            y: 0,
            width: this.mindMap.width,
            height: this.mindMap.height
        }
        this.scale = 1
        this.bind()
    }

    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-04-07 15:38:51 
     * @Desc: 绑定 
     */
    bind() {
        // 拖动视图
        this.mindMap.event.on('mousedown', () => {
            this.cacheViewBox = merge({}, this.viewBox)
        })
        this.mindMap.event.on('drag', (e, event) => {
            // 视图放大缩小后拖动的距离也要相应变化
            this.viewBox.x = this.cacheViewBox.x - event.mousemoveOffset.x * this.scale
            this.viewBox.y = this.cacheViewBox.y - event.mousemoveOffset.y * this.scale
            this.setViewBox()
        })
        // 放大缩小视图
        this.mindMap.event.on('mousewheel', (e, dir) => {
            let stepWidth = this.viewBox.width * this.mindMap.opt.scaleRatio
            let stepHeight = this.viewBox.height * this.mindMap.opt.scaleRatio
            // 放大
            if (dir === 'down') {
                this.scale += this.mindMap.opt.scaleRatio
                this.viewBox.width += stepWidth
                this.viewBox.height += stepHeight
            } else { // 缩小
                this.scale -= this.mindMap.opt.scaleRatio
                this.viewBox.width -= stepWidth
                this.viewBox.height -= stepHeight
            }
            this.setViewBox()
        })
    }

    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-04-07 15:43:26 
     * @Desc: 设置视图 
     */
    setViewBox() {
        let {
            x,
            y,
            width,
            height
        } = this.viewBox
        this.opt.draw.viewbox(x, y, width, height)
    }
}

export default View