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
            // 生长方向
            let dir = ''
            if (isRoot) {
                dir = ''
            } else if (parent._node.isRoot) {
                dir = index % 2 === 0 ? 'up' : 'down'
            } else {
                dir = parent._node.dir
            }
            // 设置width、height
            let {
                children,
                ...props
            } = node
            let newNode = new Node({
                ...props,
                mindMap: this.mindMap,
                draw: this.draw,
                dir,
                layerIndex
            })
            // 计算节点的宽高
            newNode.refreshSize()
            // 计算节点的top
            if (isRoot) {
                newNode.isRoot = true
                newNode.left = (this.mindMap.width - newNode.width) / 2
                newNode.top = (this.mindMap.height - newNode.height) / 2
                this.root = newNode
            } else {
                newNode.parent = parent._node
                parent._node.addChildren(newNode)
            }
            node._node = newNode
        }, (node) => {
            // 遍历完子节点返回时
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
     * @Desc: 计算节点的left、top
     */
    computedLeftTopValue() {
        walk(this.root, null, (node) => {
            // 二级节点
            if (node.isRoot && node.children && node.children.length) {
                let totalLeft = node.left + node.width + this.mindMap.opt.marginX
                node.children.forEach((item) => {
                    item.left = totalLeft
                    item.top = node.top + node.height / 2 - this.mindMap.opt.marginY - item.height
                    totalLeft += item.width + this.mindMap.opt.marginX
                    this.computedThirdLevelLeftTopValue(item)
                })
            }
        }, null, true)
    }

    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-04-13 09:33:04 
     * @Desc: 计算三级节点 
     */
    computedThirdLevelLeftTopValue(node) {
        if (node.children && node.children.length > 0) {
            let totalLeft = node.left
            let totalTop = node.top - this.mindMap.opt.marginY
            node.children.forEach((item) => {
                let h = node.height + this.mindMap.opt.marginY
                let w = h / Math.tan(70)
                item.left = totalLeft + w
                totalLeft += w
                item.top = totalTop - item.height
                totalTop -= this.mindMap.opt.marginY + item.height
                this.computedThirdAfterLevelLeftTopValue(item)
            })
        }
    }

    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-04-13 09:55:54 
     * @Desc: 计算三级以后的节点 
     */
    computedThirdAfterLevelLeftTopValue(root) {
        let marginY = this.mindMap.opt.marginY
        let marginX = this.mindMap.opt.marginX
        // 计算left、top
        walk(root, null, (node) => {
            if (node.children && node.children.length) {
                let totalTop = node.top + node.height + marginY
                node.children.forEach((cur) => {
                    cur.left = node.left + node.width / 5 + marginX
                    cur.top = totalTop
                    totalTop += cur.height + marginY
                })
            }
        }, null, true)
        // 调整top
        const updateBrothersTopValue = (node, addHeight) => {
            if (node.parent) {
                let childrenList = node.parent.children
                let index = childrenList.findIndex((item) => {
                    return item === node
                })
                childrenList.forEach((item, _index) => {
                    let _offset = 0
                    if (_index > index) {
                        _offset = addHeight
                    }
                    item.top += _offset
                    // 同步更新子节点的位置
                    if (item.children && item.children.length) {
                        this.updateChildren(item.children, 'top', _offset)
                    }
                })
                // 更新父节点的位置
                updateBrothersTopValue(node.parent, addHeight)
            }
        }
        walk(root, null, (node) => {
            // 判断子节点的areaHeight是否大于该节点自身，大于则需要调整位置
            if (node.children && node.children.length > 0) {
                let difference = node.childrenAreaHeight - marginY
                updateBrothersTopValue(node, difference)
            }
        }, null, true)
        // 调整left
        const updateBrothersLeftValue = (node, w, h) => {
            if (node.parent && node.parent.layerIndex > 0) {
                let childrenList = node.parent.children
                let index = childrenList.findIndex((item) => {
                    return item === node
                })
                childrenList.forEach((item, _index) => {
                    let _w = 0
                    let _h = 0
                    if (_index >= index) {
                        _w = w
                        _h = -h
                    }
                    console.log(item.text, _w, _h)
                    item.left += _w
                    item.top += _h
                    // 同步更新子节点的位置
                    if (item.children && item.children.length) {
                        this.updateChildren(item.children, 'left', _w)
                        this.updateChildren(item.children, 'left', _h)
                    }
                })
                // 更新父节点的位置
                updateBrothersLeftValue(node.parent, w, h)
            }
        }
        walk(root, null, (node) => {
            if (node.layerIndex > 1) {
                let h = node.childrenAreaHeight - marginY
                if (h > 0) {
                    let w = h / Math.tan(70)
                    console.log(node.text, w, h)
                    // let childrenAreaWidth = getNodeWidth(node)
                    // let differenceX = childrenAreaWidth - node.width
                    // updateBrothersLeftValue(node, w, h)
                }
            }
        }, null, true)
    }

    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-04-12 17:07:29 
     * @Desc: 调整节点left 
     */
    adjustLeftValue() {
        walk(this.root, null, (node) => {
            if (node.parent && node.parent.isRoot) {
                let childrenAreaWidth = this.getNodeWidth(node)
                let difference = childrenAreaWidth - node.width
                if (difference > 0) {
                    this.updateBrothersLeftValue(node, difference / 2)
                }
            }
        }, null, true)
    }

    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-04-12 18:55:03 
     * @Desc: 计算节点的宽度，包括子节点
     */
    getNodeWidth(node) {
        let widthArr = []
        let loop = (node, width) => {
            if (node.children.length) {
                width += node.width / 5 + this.mindMap.opt.marginX
                node.children.forEach((item) => {
                    loop(item, width)
                })
            } else {
                width += node.width
                widthArr.push(width)
            }
        }
        loop(node, 0)
        return Math.max(...widthArr)
    }

    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-04-12 18:21:46 
     * @Desc: 调整兄弟节点的left 
     */
    updateBrothersLeftValue(node, addWidth) {
        if (node.parent) {
            let childrenList = node.parent.children
            let index = childrenList.findIndex((item) => {
                return item === node
            })
            childrenList.forEach((item, _index) => {
                let _offset = 0
                if (_index > index) {
                    _offset = addWidth
                } else {
                    _offset = -addWidth
                }
                item.left += _offset
                // 同步更新子节点的位置
                if (item.children && item.children.length) {
                    this.updateChildren(item.children, 'left', _offset)
                }
            })
            // 更新父节点的位置
            this.updateBrothersLeftValue(node.parent, addWidth)
        }
    }

    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-04-08 10:04:05 
     * @Desc: 调整节点top，该节点之后的节点都往下进行偏移
     */
    adjustTopValue() {
        let marginY = this.mindMap.opt.marginY
        walk(this.root, null, (node) => {
            if (!node.isRoot && !node.parent.isRoot) {
                // 判断子节点的areaHeight是否大于该节点自身，大于则需要调整位置
                if (node.children && node.children.length > 0) {
                    let difference = node.childrenAreaHeight - marginY
                    this.updateBrothersTopValue(node, difference)
                }
            }
        }, null, true)
    }

    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-04-07 14:26:03 
     * @Desc: 更新兄弟节点的top
     */
    updateBrothersTopValue(node, addHeight) {
        if (node.parent && !node.parent.isRoot) {
            let childrenList = node.parent.children
            let index = childrenList.findIndex((item) => {
                return item === node
            })
            childrenList.forEach((item, _index) => {
                let _offset = 0
                if (_index > index) {
                    _offset = addHeight
                }
                item.top += _offset
                // 同步更新子节点的位置
                if (item.children && item.children.length) {
                    this.updateChildren(item.children, 'top', _offset)
                }
            })
            // 更新父节点的位置
            this.updateBrothersTopValue(node.parent, addHeight)
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