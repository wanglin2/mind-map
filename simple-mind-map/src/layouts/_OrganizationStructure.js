import {
    walk
} from '../Utils'
import Node from '../Node'
import merge from 'deepmerge'

/** 
 * javascript comment 
 * @Author: 王林25 
 * @Date: 2021-04-08 16:25:07 
 * @Desc: 组织结构图
 * 思路：和逻辑结构图基本一样，只是方向变成向下生长，所以先计算节点的top，后计算节点的left、最后调整节点的left即可
 */
class Render {
    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-04-08 16:25:32 
     * @Desc: 构造函数 
     */
    constructor(opt = {}) {
        this.opt = opt
        this.mindMap = opt.mindMap
        this.draw = this.mindMap.draw
        // 渲染树
        this.renderTree = merge({}, this.mindMap.opt.data || {})
        // 根节点
        this.root = null
    }

    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-04-08 16:27:55 
     * @Desc:  渲染
     */
    render() {
        this.computed()
        this.root.render()
    }

    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-04-06 14:04:20 
     * @Desc: 计算位置数据 
     */
    computed() {
        // 计算节点的top、width、height
        this.computedBaseValue()
        // 计算节点的left
        this.computedLeftValue()
        // 调整节点left
        this.adjustLeftValue()
    }

    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-04-08 09:49:32 
     * @Desc: 计算节点的top、width、height 
     */
    computedBaseValue() {
        walk(this.renderTree, null, (node, parent, isRoot, index) => {
            // 设置top、width、height
            let {
                children,
                ...props
            } = node
            let newNode = new Node({
                ...props,
                mindMap: this.mindMap,
                draw: this.draw
            })
            // 计算节点的宽高
            newNode.getSize()
            // 计算节点的top
            if (isRoot) {
                newNode.isRoot = true
                newNode.left = (this.mindMap.width - newNode.width) / 2
                newNode.top = (this.mindMap.height - newNode.height) / 2
                this.root = newNode
            } else {
                newNode.top = parent._node.top + parent._node.height + this.mindMap.opt.marginY
                newNode.parent = parent._node
                parent._node.addChildren(newNode)
            }
            node._node = newNode
        }, (node) => {
            // 返回时计算节点的areaWidth，也就是子节点所占的宽度之和，包括外边距
            let len = node._node.children.length
            node._node.childrenAreaWidth = len ? node._node.children.reduce((h, cur) => {
                return h + cur.width
            }, 0) + (len + 1) * this.mindMap.opt.marginX : 0
        }, true)
    }

    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-04-08 09:59:25 
     * @Desc: 计算节点的left
     */
    computedLeftValue() {
        walk(this.root, null, (node) => {
            if (node.children && node.children.length) {
                // 第一个子节点的left值 = 该节点中心的left值 - 子节点的宽度之和的一半
                let left = node.left + node.width / 2 - node.childrenAreaWidth / 2
                let totalLeft = left + this.mindMap.opt.marginX
                node.children.forEach((cur) => {
                    cur.left = totalLeft
                    totalLeft += cur.width + this.mindMap.opt.marginX
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
        let margin = this.mindMap.opt.marginX * 2
        walk(this.root, null, (node) => {
            // 判断子节点所占的宽度之和是否大于该节点自身，大于则需要调整位置
            let difference = node.childrenAreaWidth - margin - node.width
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
                if (_index < index) {
                    _offset = -addWidth
                } else if (_index > index) {
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
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-04-07 11:25:52 
     * @Desc: 更新子节点属性 
     */
    updateChildren(children, prop, offset) {
        children.forEach((item) => {
            item[prop] += offset
            if (item.children && item.children.length) {
                this.updateChildren(item.children, prop, offset)
            }
        })
    }


}

export default Render