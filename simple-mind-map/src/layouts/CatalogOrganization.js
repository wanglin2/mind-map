import Base from './Base';
import {
    walk,
    asyncRun
} from '../utils'

/** 
 * @Author: 王林 
 * @Date: 2021-04-12 22:25:58 
 * @Desc: 目录组织图 
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
    doLayout(callback) {
        let task = [() => {
            this.computedBaseValue()
        }, () => {
            this.computedLeftTopValue()
        }, () => {
            this.adjustLeftTopValue()
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
                if (parent._node.isRoot) {
                    newNode.top = parent._node.top + parent._node.height + this.getMarginX(layerIndex)
                }
            }
            if (!cur.data.expand) {
                return true;
            }
        }, (cur, parent, isRoot, layerIndex) => {
            if (isRoot) {
                let len = cur.data.expand === false ? 0 : cur._node.children.length
                cur._node.childrenAreaWidth = len ? cur._node.children.reduce((h, item) => {
                    return h + item.width
                }, 0) + (len + 1) * this.getMarginX(layerIndex + 1) : 0
            }
        }, true, 0)
    }

    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-04-08 09:59:25 
     * @Desc: 遍历节点树计算节点的left、top
     */
    computedLeftTopValue() {
        walk(this.root, null, (node, parent, isRoot, layerIndex) => {
            if (node.nodeData.data.expand && node.children && node.children.length) {
                let marginX = this.getMarginX(layerIndex + 1)
                let marginY = this.getMarginY(layerIndex + 1)
                if (isRoot) {
                    let left = node.left + node.width / 2 - node.childrenAreaWidth / 2
                    let totalLeft = left + marginX
                    node.children.forEach((cur) => {
                        cur.left = totalLeft
                        totalLeft += cur.width + marginX
                    })
                } else {
                    let totalTop = node.top + node.height + marginY + node.expandBtnSize
                    node.children.forEach((cur) => {
                        cur.left = node.left + node.width * 0.5
                        cur.top = totalTop
                        totalTop += cur.height + marginY + node.expandBtnSize
                    })
                }
            }
        }, null, true)
    }

    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-04-08 10:04:05 
     * @Desc: 调整节点left、top
     */
    adjustLeftTopValue() {
        walk(this.root, null, (node, parent, isRoot, layerIndex) => {
            if (!node.nodeData.data.expand) {
                return;
            }
            // 调整left
            if (parent && parent.isRoot) {
                let areaWidth = this.getNodeAreaWidth(node)
                let difference = areaWidth - node.width
                if (difference > 0) {
                    this.updateBrothersLeft(node, difference / 2)
                }
            }
            // 调整top
            let len = node.children.length
            if (parent && !parent.isRoot && len > 0) {
                let marginY = this.getMarginY(layerIndex + 1)
                let totalHeight = node.children.reduce((h, item) => {
                    return h + item.height
                }, 0) + (len + 1) * marginY + len * node.expandBtnSize
                this.updateBrothersTop(node, totalHeight)
            }
        }, null, true)
    }

    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-04-12 18:55:03 
     * @Desc: 递归计算节点的宽度
     */
    getNodeAreaWidth(node) {
        let widthArr = []
        let loop = (node, width) => {
            if (node.children.length) {
                width += node.width / 2
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
     * @Date: 2021-07-13 11:12:51 
     * @Desc: 调整兄弟节点的left 
     */
    updateBrothersLeft(node, addWidth) {
        if (node.parent) {
            let childrenList = node.parent.children
            let index = childrenList.findIndex((item) => {
                return item === node
            })
            // 第一个或最后一个节点自身也需要移动，否则两边不对称
            if (index === 0 || index === childrenList.length - 1) {
                let _offset = index === 0 ? -addWidth : addWidth
                node.left += _offset
                if (node.children && node.children.length) {
                    this.updateChildren(node.children, 'left', _offset)
                }
            }
            childrenList.forEach((item, _index) => {
                let _offset = 0
                if (_index < index) { // 左边的节点往左移
                    _offset = -addWidth
                } else if (_index > index) { // 右边的节点往右移
                    _offset = addWidth
                }
                item.left += _offset
                // 同步更新子节点的位置
                if (item.children && item.children.length) {
                    this.updateChildren(item.children, 'left', _offset)
                }
            })
            // 更新父节点的位置
            this.updateBrothersLeft(node.parent, addWidth)
        }
    }

    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-04-07 14:26:03 
     * @Desc: 调整兄弟节点的top
     */
    updateBrothersTop(node, addHeight) {
        if (node.parent && !node.parent.isRoot) {
            let childrenList = node.parent.children
            let index = childrenList.findIndex((item) => {
                return item === node
            })
            childrenList.forEach((item, _index) => {
                let _offset = 0
                // 下面的节点往下移
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
            this.updateBrothersTop(node.parent, addHeight)
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
        let len = node.children.length
        let marginX = this.getMarginX(node.layerIndex + 1)
        if (node.isRoot) {
            let x1 = left + width / 2
            let y1 = top + height
            let s1 = marginX * 0.7
            let minx = 0
            let maxx = 0
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
            line1.plot(`M ${x1},${y1} L ${x1},${y1 + s1}`)
            node._lines.push(line1)
            // 水平线
            if (len > 1) {
                let lin2 = this.draw.path()
                node.style.line(lin2)
                lin2.plot(`M ${minx},${y1 + s1} L ${maxx},${y1 + s1}`)
                node._lines.push(lin2)
            }
        } else {
            let y1 = top + height
            let maxy = 0
            let x2 = node.left + node.width * 0.3
            node.children.forEach((item, index) => {
                let y2 = item.top + item.height / 2
                if (index >= len - 1) {
                    maxy = y2
                }
                let path = `M ${x2},${y2} L ${x2 + node.width * 0.2},${y2}`
                lines[index].plot(path)
            })
            // 竖线
            if (len > 0) {
                let lin2 = this.draw.path()
                expandBtnSize = len > 0 ? expandBtnSize : 0
                node.style.line(lin2)
                lin2.plot(`M ${x2},${y1 + expandBtnSize} L ${x2},${maxy}`)
                node._lines.push(lin2)
            }
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
            expandBtnSize,
            isRoot
        } = node
        if (!isRoot) {
            let {
                translateX,
                translateY
            } = btn.transform()
            btn.translate(width * 0.3 - expandBtnSize / 2 - translateX, height + expandBtnSize / 2 - translateY)
        }
    }
}

export default CatalogOrganization