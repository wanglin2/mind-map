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
            this.sx = this.x
            this.sy = this.y
        })
        this.mindMap.event.on('drag', (e, event) => {
            this.x = this.sx + event.mousemoveOffset.x
            this.y = this.sy + event.mousemoveOffset.y
            this.mindMap.draw.transform({
                scale: this.scale,
                origin: 'left center',
                translate: [this.x, this.y],
            })
        })
        // 放大缩小视图
        this.mindMap.event.on('mousewheel', (e, dir) => {
            // // 放大
            if (dir === 'down') {
                this.scale += this.mindMap.opt.scaleRatio
            } else { // 缩小
                if (this.scale - this.mindMap.opt.scaleRatio > 0.1) {
                    this.scale -= this.mindMap.opt.scaleRatio
                } else {
                    this.scale = 0.1
                }
            }
            this.mindMap.draw.transform({
                scale: this.scale,
                origin: 'left center',
                translate: [this.x, this.y],
            })
        })
    }

    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-04-07 15:43:26 
     * @Desc: 设置视图 
     */
    setViewBox({ x,
        y,
        width,
        height }) {
        this.opt.draw.viewbox(x, y, width, height)
    }
}

export default View