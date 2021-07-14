import { bfsWalk, throttle } from './utils'

/** 
 * @Author: 王林 
 * @Date: 2021-07-10 22:34:51 
 * @Desc: 选择节点类 
 */

class Select {
    /** 
     * @Author: 王林 
     * @Date: 2021-07-10 22:35:16 
     * @Desc: 构造函数 
     */
    constructor({ mindMap }) {
        this.mindMap = mindMap
        this.rect = null
        this.isMousedown = false
        this.mouseDownX = 0
        this.mouseDownY = 0
        this.mouseMoveX = 0
        this.mouseMoveY = 0
        this.bindEvent()
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-07-10 22:36:36 
     * @Desc: 绑定事件 
     */
    bindEvent() {
        this.checkInNodes = throttle(this.checkInNodes, 500, this)
        this.mindMap.on('mousedown', (e) => {
            if (e.which !== 3) {
                return
            }
            this.isMousedown = true
            let { x, y } = this.toPos(e.clientX, e.clientY)
            this.mouseDownX = x
            this.mouseDownY = y
            this.createRect(x, y)
        })
        this.mindMap.on('mousemove', (e) => {
            if (!this.isMousedown) {
                return
            }
            let { x, y } = this.toPos(e.clientX, e.clientY)
            this.mouseMoveX = x
            this.mouseMoveY = y
            if (Math.abs(x - this.mouseDownX) <= 10 && Math.abs(y - this.mouseDownY) <= 10) {
                return
            }
            this.rect.plot([
                [this.mouseDownX, this.mouseDownY],
                [this.mouseMoveX, this.mouseDownY],
                [this.mouseMoveX, this.mouseMoveY],
                [this.mouseDownX, this.mouseMoveY]
            ])
            this.checkInNodes()
            this.move(x, y)
        })
        this.mindMap.on('mouseup', (e) => {
            if (!this.isMousedown) {
                return;
            }
            this.mindMap.emit('node_active', null, this.mindMap.renderer.activeNodeList)
            this.isMousedown = false
            if (this.rect) this.rect.remove()
            this.rect = null
        })
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-07-13 07:55:49 
     * @Desc: 鼠标移动到边缘后移动画布 
     */
    move (x, y) {
        let step = this.mindMap.opt.selectTranslateStep
        let limit = this.mindMap.opt.selectTranslateLimit
        // 左边缘
        if (x <= this.mindMap.elRect.left + limit) {
            this.mouseDownX += step
            this.mindMap.view.translateX(step)
        }
        // 右边缘
        if (x >= this.mindMap.elRect.right - limit) {
            this.mouseDownX -= step
            this.mindMap.view.translateX(-step)
        }
        // 上边缘
        if (y <= this.mindMap.elRect.top + limit) {
            this.mouseDownY += step
            this.mindMap.view.translateY(step)
        }
        // 下边缘
        if (y >= this.mindMap.elRect.bottom - limit) {
            this.mouseDownY -= step
            this.mindMap.view.translateY(-step)
        }
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-07-11 10:19:37 
     * @Desc: 创建矩形 
     */
    createRect(x, y) {
        this.rect = this.mindMap.svg.polygon().stroke({
            color: '#0984e3'
        }).fill({
            color: 'rgba(9,132,227,0.3)'
        }).plot([[x, y]])
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-07-11 09:20:03 
     * @Desc: 转换位置 
     */
    toPos(x, y) {
        return {
            x: x - this.mindMap.elRect.left,
            y: y - this.mindMap.elRect.top
        }
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-07-11 10:20:43 
     * @Desc: 检测在选区里的节点 
     */
    checkInNodes() {
        let { scaleX, scaleY, translateX, translateY } = this.mindMap.draw.transform()
        let minx = Math.min(this.mouseDownX, this.mouseMoveX)
        let miny = Math.min(this.mouseDownY, this.mouseMoveY)
        let maxx = Math.max(this.mouseDownX, this.mouseMoveX)
        let maxy = Math.max(this.mouseDownY, this.mouseMoveY)
        bfsWalk(this.mindMap.renderer.root, (node) => {
            let { left, top, width, height } = node
            let right = (left + width) * scaleX + translateX
            let bottom = (top + height) * scaleY + translateY
            left = left * scaleX + translateX
            top = top * scaleY + translateY
            if (
                left >= minx &&
                right <= maxx &&
                top >= miny &&
                bottom <= maxy
            ) {
                this.mindMap.batchExecution.push('activeNode' + node.uid, () => {
                    if (node.nodeData.data.isActive) {
                        return ;
                    }
                    this.mindMap.execCommand('SET_NODE_ACTIVE', node, true)
                    this.mindMap.renderer.addActiveNode(node)
                })
            } else if (node.nodeData.data.isActive) {
                this.mindMap.batchExecution.push('activeNode' + node.uid, () => {
                    if (!node.nodeData.data.isActive) {
                        return ;
                    }
                    this.mindMap.execCommand('SET_NODE_ACTIVE', node, false)
                    this.mindMap.renderer.removeActiveNode(node)
                })
            }
        })
    }
}

export default Select