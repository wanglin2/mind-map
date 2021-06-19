import {
    walk
} from '../Utils'
import Node from '../Node'
import merge from 'deepmerge'

/** 
 * javascript comment 
 * @Author: 王林25 
 * @Date: 2021-04-08 16:25:07 
 * @Desc: 鱼骨图
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
        // 计算节点的width、height
        this.computedBaseValue()
        // 计算节点的left、top
        this.computedLeftTopValue()
        // 调整节点top
        // this.adjustTopValue()
        // 调整节点left
        // this.adjustLeftValue()
    }

    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-04-08 09:49:32 
     * @Desc: 计算节点的width、height 
     */
    computedBaseValue() {
        walk(this.renderTree, null, (node, parent, isRoot, index, layerIndex) => {
            // 设置width、height
            let {
                children,
                ...props
            } = node
            let newNode = new Node({
                ...props,
                mindMap: this.mindMap,
                draw: this.draw,
                layerIndex
            })
            // 计算节点的宽高
            newNode.refreshSize()
            // 计算节点的top
            if (isRoot) {
                newNode.isRoot = true
                newNode.left = this.mindMap.width / 2
                newNode.top = this.mindMap.height / 2
                this.root = newNode
            } else {
                newNode.parent = parent._node
                parent._node.addChildren(newNode)
            }
            node._node = newNode
        }, (node) => {
            // 遍历完子节点返回时
        }, true)
    }

    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-04-08 09:59:25 
     * @Desc: 计算节点的left、top
     */
    computedLeftTopValue() {
        let margin = Math.max(this.mindMap.opt.marginX, this.mindMap.opt.marginY)
        walk(this.root, null, (node) => {
            if (node.children && node.children.length) {
                let rad = (360 / node.children.length) * (Math.PI / 180)
                let totalRad = 0
                node.children.forEach((item) => {
                    let r = node.width / 2 + margin + item.width / 2
                    item.left = node.left + r * Math.cos(totalRad)
                    item.top = node.top + r * Math.sin(totalRad)
                    totalRad += rad
                })
            }
        }, null, true)
        // return
        walk(this.root, null, null, (node) => {
            if (node.children && node.children.length) {
                let minLeft = Infinity,
                    minTop = Infinity,
                    maxRight = -Infinity,
                    maxBottom = -Infinity
                node.children.concat([node]).forEach((item) => {
                    if ((item.left - item.width / 2) < minLeft) {
                        minLeft = item.left - item.width / 2
                    }
                    if ((item.top - item.width / 2) < minTop) {
                        minTop = item.top - item.width / 2
                    }
                    if ((item.left + item.width / 2) > maxRight) {
                        maxRight = item.left + item.width / 2
                    }
                    if ((item.top + item.width / 2) < maxBottom) {
                        maxBottom = item.top + item.width / 2
                    }
                })
                let width = Math.max(maxRight - minLeft, maxBottom - minTop)
                let difference = width - node.width
                this.update(node, difference)
            }
        }, true)
    }
    
    update(node, difference) {
        if (node.parent) {
            // console.log(node.text, difference)
            let rad = (360 / node.parent.children.length) * (Math.PI / 180)
            let totalRad = 0
            node.parent.children.forEach((item) => {
                if (item === node) {
                    item.left += difference * Math.cos(totalRad)
                    item.top += difference * Math.sin(totalRad)
                    if (node.children && node.children.length) {
                        // this.updateChildren(node)
                    }
                }
                totalRad += rad
            })
            
            this.update(node.parent, difference)
        }
    }

    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-04-07 11:25:52 
     * @Desc: 更新子节点
     */
    updateChildren(node, difference) {
        let margin = Math.max(this.mindMap.opt.marginX, this.mindMap.opt.marginY)
        walk(node, null, (node) => {
            if (node.children && node.children.length) {
                let rad = (360 / node.children.length) * (Math.PI / 180)
                let totalRad = 0
                node.children.forEach((item) => {
                    let r = node.width / 2 + margin + item.width / 2
                    item.left = node.left + r * Math.cos(totalRad)
                    item.top = node.top + r * Math.sin(totalRad)
                    totalRad += rad
                })
            }
        }, null, true)
    }
}

export default Render