import Base from './Base';
import {
    walk,
    asyncRun
} from '../utils'

/** 
 * @Author: 王林 
 * @Date: 2021-04-12 22:25:58 
 * @Desc: 组织结构图
 * 和逻辑结构图基本一样，只是方向变成向下生长，所以先计算节点的top，后计算节点的left、最后调整节点的left即可
 */
class OrganizationStructure extends Base {
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
            this.computedLeftValue()
        }, () => {
            this.adjustLeftValue()
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
                newNode.left = (this.mindMap.width - newNode.width) / 2
                newNode.top = (this.mindMap.height - newNode.height) / 2
            } else {
                // 非根节点
                // 定位到父节点下方
                newNode.top = parent._node.top + parent._node.height + this.getMarginX(layerIndex)
            }
            if (!cur.data.expand) {
                return true;
            }
        }, (cur, parent, isRoot, layerIndex) => {
            // 返回时计算节点的areaWidth，也就是子节点所占的宽度之和，包括外边距
            let len = cur.data.expand === false ? 0 : cur._node.children.length
            cur._node.childrenAreaWidth = len ? cur._node.children.reduce((h, item) => {
                return h + item.width
            }, 0) + (len + 1) * this.getMarginY(layerIndex + 1) : 0
        }, true, 0)
    }

    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-04-08 09:59:25 
     * @Desc: 遍历节点树计算节点的left
     */
    computedLeftValue() {
        walk(this.root, null, (node, parent, isRoot, layerIndex) => {
            if (node.nodeData.data.expand && node.children && node.children.length) {
                let marginX = this.getMarginY(layerIndex + 1)
                // 第一个子节点的left值 = 该节点中心的left值 - 子节点的宽度之和的一半
                let left = node.left + node.width / 2 - node.childrenAreaWidth / 2
                let totalLeft = left + marginX
                node.children.forEach((cur) => {
                    cur.left = totalLeft
                    totalLeft += cur.width + marginX
                })
            }
        }, null, true)
    }

    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-04-08 10:04:05 
     * @Desc: 调整节点left
     */
    adjustLeftValue() {
        walk(this.root, null, (node, parent, isRoot, layerIndex) => {
            if (!node.nodeData.data.expand) {
                return;
            }
            // 判断子节点所占的宽度之和是否大于该节点自身，大于则需要调整位置
            let difference = node.childrenAreaWidth - this.getMarginY(layerIndex + 1) * 2 - node.width
            if (difference > 0) {
                this.updateBrothers(node, difference / 2)
            }
        }, null, true)
    }

    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-04-07 14:26:03 
     * @Desc: 更新兄弟节点的left
     */
    updateBrothers(node, addWidth) {
        if (node.parent) {
            let childrenList = node.parent.children
            let index = childrenList.findIndex((item) => {
                return item === node
            })
            childrenList.forEach((item, _index) => {
                let _offset = 0
                // 上面的节点往上移
                if (_index < index) {
                    _offset = -addWidth
                } else if (_index > index) { // 下面的节点往下移
                    _offset = addWidth
                }
                item.left += _offset
                // 同步更新子节点的位置
                if (item.children && item.children.length) {
                    this.updateChildren(item.children, 'left', _offset)
                }
            })
            // 更新父节点的位置
            this.updateBrothers(node.parent, addWidth)
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
            expandBtnSize,
            isRoot
        } = node
        let x1 = left + width / 2
        let y1 = top + height
        let marginX = this.getMarginX(node.layerIndex + 1)
        let s1 = marginX * 0.7
        let minx = 0
        let maxx = 0
        let len = node.children.length
        node.children.forEach((item, index) => {
            let x2 = item.left +item.width / 2
            let y2 = item.top
            if (index === 0) {
                minx = x2
            } else if (index >= len - 1) {
                maxx = x2
            }
            let path = `M ${x2},${y1 + s1} L ${x2},${y2}`
            lines[index].plot(path)
        })
        // 父节点的竖线
        let line1 = this.draw.path()
        node.style.line(line1)
        expandBtnSize = len > 0 && !isRoot ? expandBtnSize : 0
        line1.plot(`M ${x1},${y1 + expandBtnSize} L ${x1},${y1 + s1}`)
        node._lines.push(line1)
        // 水平线
        if (len > 1) {
            let lin2 = this.draw.path()
            node.style.line(lin2)
            lin2.plot(`M ${minx},${y1 + s1} L ${maxx},${y1 + s1}`)
            node._lines.push(lin2)
        }
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-04-11 19:54:26 
     * @Desc: 渲染按钮 
     */
    renderExpandBtn(node, btn) {
        let {
            width,
            height,
            expandBtnSize
        } = node
        let {
            translateX,
            translateY
        } = btn.transform()
        btn.translate(width / 2 - expandBtnSize / 2 - translateX, height + expandBtnSize / 2 - translateY)
    }
}

export default OrganizationStructure