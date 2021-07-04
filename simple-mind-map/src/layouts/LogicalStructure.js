import Base from './Base';
import {
    walk
} from '../utils'
import Node from '../Node'

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
    doLayout() {
        // 遍历数据计算节点的left、width、height
        this.computedBaseValue()
        // 计算节点的top
        this.computedTopValue()
        // 调整节点top
        this.adjustTopValue()

        return this.root;
    }

    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-04-08 09:49:32 
     * @Desc: 遍历数据计算节点的left、width、height
     */
    computedBaseValue() {
        walk(this.renderTree, null, (cur, parent, isRoot, layerIndex) => {
            // 创建节点
            let newNode = new Node({
                data: cur,
                uid: this.mindMap.uid++,
                renderer: this.renderer,
                mindMap: this.mindMap,
                draw: this.draw,
                layerIndex
            })
            // 数据关联实际节点
            cur._node = newNode
            // 根节点定位在画布中心位置
            if (isRoot) {
                newNode.isRoot = true
                newNode.left = (this.mindMap.width - newNode.width) / 2
                newNode.top = (this.mindMap.height - newNode.height) / 2
                this.root = newNode
            } else {
                // 非根节点
                let marginX = layerIndex === 1 ? this.mindMap.themeConfig.second.marginX : this.mindMap.themeConfig.node.marginX
                // 定位到父节点右侧
                newNode.left = parent._node.left + parent._node.width + marginX
                // 互相收集
                newNode.parent = parent._node
                parent._node.addChildren(newNode)
            }
        }, (cur, parent, isRoot, layerIndex) => {
            // 返回时计算节点的areaHeight，也就是子节点所占的高度之和，包括外边距
            let len = cur.data.expand === false ? 0 : cur._node.children.length
            cur._node.childrenAreaHeight = len ? cur._node.children.reduce((h, item) => {
                return h + item.height
            }, 0) + (len + 1) * this.getMarginY(layerIndex) : 0
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
            if (node.children && node.children.length) {
                let marginY = this.getMarginY(layerIndex)
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
            // 判断子节点所占的高度之和是否大于该节点自身，大于则需要调整位置
            let difference = node.childrenAreaHeight - this.getMarginY(layerIndex) - node.height
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
                let _offset = 0
                // 上面的节点往上移
                if (_index < index) {
                    _offset = -addHeight
                } else if (_index > index) {// 下面的节点往下移
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
    renderLine(node) {
        if (node.children.length <= 0) {
            return [];
        }
        let {
            left,
            top,
            width,
            height
        } = node
        let lines = []
        if (!node.isRoot) {
            let line = this.draw.line(left + width, top + height / 2, left + width + 20, top + height / 2)
            lines.push(line)
        }
        node.children.forEach((item) => {
            let x1 = node.layerIndex === 0 ? left + width / 2 : left + width + 20
            let y1 = node.layerIndex === 0 ? top + height / 2 : top + height / 2
            let x2 = item.left
            let y2 = item.top + item.height / 2
            let path = ''
            if (node.isRoot) {
                path = this.quadraticCurvePath(x1, y1, x2, y2)
            } else {
                path = this.cubicBezierPath(x1, y1, x2, y2)
            }
            let line = this.draw.path(path)
            lines.push(line)
        })
        return lines;
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-04-11 19:54:26 
     * @Desc: 渲染按钮 
     */
    renderExpandBtn(node, icons) {
        let {
            left,
            top,
            width,
            height
        } = node
        icons.forEach((icon) => {
            icon.x(left + width).y(top + height / 2)
        })
    }
}

export default LogicalStructure