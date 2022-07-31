import Base from './Base';
import {
    walk,
    asyncRun
} from '../utils'

/** 
 * @Author: 王林 
 * @Date: 2021-04-12 22:25:58 
 * @Desc: 逻辑结构图 
 */
class LogicalStructure extends Base {
    /** 
     * @Author: 王林 
     * @Date: 2021-04-12 22:26:31 
     * @Desc: 构造函数 
     */
    constructor(opt = {}) {
        super(opt)
    }

    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-04-06 14:04:20 
     * @Desc: 布局
     */
    doLayout(callback) {
        let task = [() => {
            this.computedBaseValue()
        }, () => {
            this.computedTopValue()
        }, () => {
            this.adjustTopValue()
        }, () => {
            callback(this.root)
        }]
        asyncRun(task)
    }

    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-04-08 09:49:32 
     * @Desc: 遍历数据计算节点的left、width、height
     */
    computedBaseValue() {
        walk(this.renderer.renderTree, null, (cur, parent, isRoot, layerIndex) => {
            let newNode = this.createNode(cur, parent, isRoot, layerIndex)
            // 根节点定位在画布中心位置
            if (isRoot) {
                this.setNodeCenter(newNode)
            } else {
                // 非根节点
                // 定位到父节点右侧
                newNode.left = parent._node.left + parent._node.width + this.getMarginX(layerIndex)
            }
            if (!cur.data.expand) {
                return true;
            }
        }, (cur, parent, isRoot, layerIndex) => {
            // 返回时计算节点的areaHeight，也就是子节点所占的高度之和，包括外边距
            let len = cur.data.expand === false ? 0 : cur._node.children.length
            cur._node.childrenAreaHeight = len ? cur._node.children.reduce((h, item) => {
                return h + item.height
            }, 0) + (len + 1) * this.getMarginY(layerIndex + 1) : 0
        }, true, 0)
    }

    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-04-08 09:59:25 
     * @Desc: 遍历节点树计算节点的top 
     */
    computedTopValue() {
        walk(this.root, null, (node, parent, isRoot, layerIndex) => {
            if (node.nodeData.data.expand && node.children && node.children.length) {
                let marginY = this.getMarginY(layerIndex + 1)
                // 第一个子节点的top值 = 该节点中心的top值 - 子节点的高度之和的一半
                let top = node.top + node.height / 2 - node.childrenAreaHeight / 2
                let totalTop = top + marginY
                node.children.forEach((cur) => {
                    cur.top = totalTop
                    totalTop += cur.height + marginY
                })
            }
        }, null, true)
    }

    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-04-08 10:04:05 
     * @Desc: 调整节点top 
     */
    adjustTopValue() {
        walk(this.root, null, (node, parent, isRoot, layerIndex) => {
            if (!node.nodeData.data.expand) {
                return;
            }
            // 判断子节点所占的高度之和是否大于该节点自身，大于则需要调整位置
            let difference = node.childrenAreaHeight - this.getMarginY(layerIndex + 1) * 2 - node.height
            if (difference > 0) {
                this.updateBrothers(node, difference / 2)
            }
        }, null, true)
    }

    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-04-07 14:26:03 
     * @Desc: 更新兄弟节点的top
     */
    updateBrothers(node, addHeight) {
        if (node.parent) {
            let childrenList = node.parent.children
            let index = childrenList.findIndex((item) => {
                return item === node
            })
            childrenList.forEach((item, _index) => {
                if (item === node) {
                    return
                }
                let _offset = 0
                // 上面的节点往上移
                if (_index < index) {
                    _offset = -addHeight
                } else if (_index > index) { // 下面的节点往下移
                    _offset = addHeight
                }
                item.top += _offset
                // 同步更新子节点的位置
                if (item.children && item.children.length) {
                    this.updateChildren(item.children, 'top', _offset)
                }
            })
            // 更新父节点的位置
            this.updateBrothers(node.parent, addHeight)
        }
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-04-11 14:42:48 
     * @Desc: 绘制连线，连接该节点到其子节点
     */
    renderLine(node, lines) {
        if (node.children.length <= 0) {
            return [];
        }
        let {
            left,
            top,
            width,
            height,
            expandBtnSize
        } = node
        node.children.forEach((item, index) => {
            let x1 = node.layerIndex === 0 ? left + width / 2 : left + width + expandBtnSize
            let y1 = top + height / 2
            let x2 = item.left
            let y2 = item.top + item.height / 2
            let path = ''
            if (node.isRoot) {
                path = this.quadraticCurvePath(x1, y1, x2, y2)
            } else {
                path = this.cubicBezierPath(x1, y1, x2, y2)
            }
            lines[index].plot(path)
        })
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-04-11 19:54:26 
     * @Desc: 渲染按钮 
     */
    renderExpandBtn(node, btn) {
        let {
            width,
            height
        } = node
        let {
            translateX,
            translateY
        } = btn.transform()
        btn.translate(width - translateX, height / 2 - translateY)
    }

    /** 
     * @Author: 王林 
     * @Date: 2022-07-30 08:30:35 
     * @Desc: 创建概要节点 
     */
    renderGeneralization(node, gLine, gNode) {
        let { top, bottom, right, generalizationLineMargin, generalizationNodeMargin } = this.getNodeBoundaries(node, 'h')
        let x1 = right + generalizationLineMargin
        let y1 = top
        let x2 = right + generalizationLineMargin
        let y2 = bottom
        let cx = x1 + 20
        let cy = y1 + (y2 - y1) / 2
        let path = `M ${x1},${y1} Q ${cx},${cy} ${x2},${y2}`
        gLine.plot(path)
        gNode.left = right + generalizationNodeMargin
        gNode.top = top + (bottom - top - gNode.height) / 2
    }
}

export default LogicalStructure