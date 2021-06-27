import Base from './Base';
import {
    walk
} from '../utils'
import Node from '../Node'

/** 
 * @Author: 王林 
 * @Date: 2021-04-12 22:25:58 
 * @Desc: 目录组织图 
 * 思路：第一轮只计算节点的宽高，以及某个节点的所有子节点所占的高度之和，以及该节点里所有子节点中宽度最宽是多少、第二轮计算节点的left和top，需要区分二级节点和其他节点，二级节点top相同，一行依次从做向右排开，其他节点的left相同，一列从上往下依次排开
 */
class CatalogOrganization extends Base {
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
        // 遍历数据计算节点的width、height
        this.computedBaseValue()
        // 计算节点的left、top
        this.computedLeftTopValue()
        // 调整节点top
        this.adjustTopValue()
        // 调整节点left
        // this.adjustLeftValue()

        return this.root;
    }

    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-04-08 09:49:32 
     * @Desc: 遍历数据计算节点的width、height
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
                // 互相收集
                newNode.parent = parent._node
                parent._node.addChildren(newNode)
            }
        }, (cur, parent, isRoot, layerIndex) => {
            // 返回时计算节点的areaHeight，也就是子节点所占的高度之和，包括外边距
            let len = cur._node.children.length
            if (isRoot) {// 计算二级节点所占的宽度之和
                cur._node.childrenAreaWidth = len ? cur._node.children.reduce((h, item) => {
                    return h + item.width
                }, 0) + (len + 1) * this.getMarginX(layerIndex) : 0
            }
            // 计算子节点所占的高度之和
            cur._node.childrenAreaHeight = len ? cur._node.children.reduce((h, item) => {
                return h + item.height
            }, 0) + (len + 1) * this.getMarginY(layerIndex) : 0
        }, true, 0)
    }

    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-04-08 09:59:25 
     * @Desc: 计算节点的left、top
     */
    computedLeftTopValue() {
        walk(this.root, null, (node, parent, isRoot, layerIndex) => {
            let marginX = this.getMarginX(layerIndex)
            let marginY = this.getMarginY(layerIndex)
            if (node.children && node.children.length) {
                if (node.isRoot) {
                    let left = node.left + node.width / 2 - node.childrenAreaWidth / 2
                    let totalLeft = left + marginX
                    node.children.forEach((cur) => {
                        // left
                        cur.left = totalLeft
                        totalLeft += cur.width + marginX
                        // top
                        cur.top = node.top + node.height + marginY
                    })
                } else {
                    let totalTop = node.top + node.height + marginY
                    node.children.forEach((cur) => {
                        cur.left = node.left + node.width / 5
                        cur.top = totalTop
                        totalTop += cur.height + marginY
                    })
                }
            }
        }, null, true)
    }

    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-04-08 10:04:05 
     * @Desc: 调整节点top，该节点之后的节点都往下进行偏移
     */
    adjustTopValue() {
        walk(this.root, null, (node, parent, isRoot, layerIndex) => {
            let marginY = this.getMarginY(layerIndex)
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
                if (item.children && item.children.length && _offset > 0) {
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
     * @Date: 2021-04-12 17:07:29 
     * @Desc: 调整节点left 
     */
    adjustLeftValue() {
        walk(this.root, null, (node, parent, isRoot, layerIndex) => {
            let marginX = this.getMarginY(layerIndex)
            if (node.parent && node.parent.isRoot) {
                let childrenAreaWidth = this.getNodeWidth(node)
                let difference = childrenAreaWidth - node.width - marginX
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
                width += node.width / 5
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
     * @Author: 王林 
     * @Date: 2021-04-11 14:42:48 
     * @Desc: 绘制连线，连接该节点到其子节点
     */
    renderLine(node) {
        return [];
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
        return;
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

export default CatalogOrganization