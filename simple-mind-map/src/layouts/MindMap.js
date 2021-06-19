import {
    walk
} from '../Utils'
import Node from '../Node'
import merge from 'deepmerge'

/** 
 * javascript comment 
 * @Author: 王林25 
 * @Date: 2021-04-08 16:25:07 
 * @Desc: 思维导图
 * 思路：在逻辑结构图的基础上增加一个变量来记录生长方向，向左还是向右，同时在计算left的时候根据方向来计算、调整top时只考虑同方向的节点即可
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
        // 计算节点的left、width、height
        this.computedBaseValue()
        // 计算节点的top
        this.computedTopValue()
        // 调整节点top
        this.adjustTopValue()
    }

    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-04-08 09:49:32 
     * @Desc: 计算节点的left、width、height 
     */
    computedBaseValue() {
        walk(this.renderTree, null, (node, parent, isRoot, index) => {
            // 生长方向
            let dir = ''
            if (isRoot) {
                dir = ''
            } else if (parent._node.isRoot) {
                dir = index % 2 === 0 ? 'right' : 'left'
            } else {
                dir = parent._node.dir
            }
            // 设置left、width、height
            let {
                children,
                ...props
            } = node
            let newNode = new Node({
                ...props,
                mindMap: this.mindMap,
                draw: this.draw,
                dir
            })
            // 计算节点的宽高
            newNode.refreshSize()
            // 计算节点的left
            if (isRoot) {
                newNode.isRoot = true
                newNode.left = (this.mindMap.width - newNode.width) / 2
                newNode.top = (this.mindMap.height - newNode.height) / 2
                this.root = newNode
            } else {
                newNode.left = dir === 'right' ? parent._node.left + parent._node.width + this.mindMap.opt.marginX : parent._node.left - this.mindMap.opt.marginX - newNode.width
                newNode.parent = parent._node
                parent._node.addChildren(newNode)
            }
            node._node = newNode
        }, (node) => {
            // 返回时计算节点的areaHeight，也就是子节点所占的高度之和，包括外边距
            let len = node._node.children.length
            node._node.childrenAreaHeight = len ? node._node.children.reduce((h, cur) => {
                return h + cur.height
            }, 0) + (len + 1) * this.mindMap.opt.marginY : 0
        }, true)
    }

    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-04-08 09:59:25 
     * @Desc: 计算节点的top 
     */
    computedTopValue() {
        walk(this.root, null, (node) => {
            if (node.children && node.children.length) {
                // 第一个子节点的top值 = 该节点中心的top值 - 子节点的高度之和的一半
                let top = node.top + node.height / 2 - node.childrenAreaHeight / 2
                let totalTop = top + this.mindMap.opt.marginY
                node.children.forEach((cur) => {
                    cur.top = totalTop
                    totalTop += cur.height + this.mindMap.opt.marginY
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
        let margin = this.mindMap.opt.marginY * 2
        walk(this.root, null, (node) => {
            // 判断子节点所占的高度之和是否大于该节点自身，大于则需要调整位置
            let difference = node.childrenAreaHeight - margin - node.height
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
            let childrenList = node.parent.children.filter((item) => {
                return item.dir === node.dir
            })
            let index = childrenList.findIndex((item) => {
                return item === node
            })
            childrenList.forEach((item, _index) => {
                let _offset = 0
                if (_index < index) {
                    _offset = -addHeight
                } else if (_index > index) {
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