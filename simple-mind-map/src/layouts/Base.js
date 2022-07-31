import Node from '../Node'
import {
    walk,
} from '../utils'

/** 
 * @Author: 王林 
 * @Date: 2021-04-12 22:24:30 
 * @Desc: 布局基类 
 */
class Base {
    /** 
     * @Author: 王林 
     * @Date: 2021-04-12 22:25:16 
     * @Desc: 构造函数 
     */
    constructor(renderer) {
        // 渲染实例
        this.renderer = renderer
        // 控制实例
        this.mindMap = renderer.mindMap
        // 绘图对象
        this.draw = this.mindMap.draw
        // 根节点
        this.root = null
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-04-12 22:39:50 
     * @Desc: 计算节点位置 
     */
    doLayout() {
        throw new Error('【computed】方法为必要方法，需要子类进行重写！')
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-04-12 22:41:04 
     * @Desc: 连线 
     */
    renderLine() {
        throw new Error('【renderLine】方法为必要方法，需要子类进行重写！')
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-04-12 22:42:08 
     * @Desc: 定位展开收缩按钮 
     */
    renderExpandBtn() {
        throw new Error('【renderExpandBtn】方法为必要方法，需要子类进行重写！')
    }

    /** 
     * @Author: 王林 
     * @Date: 2022-07-30 22:49:28 
     * @Desc: 概要节点 
     */
    renderGeneralization() {}

    /** 
     * @Author: 王林 
     * @Date: 2021-07-10 21:30:54 
     * @Desc: 创建节点实例 
     */
    createNode(data, parent, isRoot, layerIndex) {
        // 创建节点
        let newNode = null
        // 复用节点
        if (data && data._node && !this.renderer.reRender) {
            newNode = data._node
            newNode.reset()
            newNode.layerIndex = layerIndex
        } else {// 创建新节点
            newNode = new Node({
                data,
                uid: this.mindMap.uid++,
                renderer: this.renderer,
                mindMap: this.mindMap,
                draw: this.draw,
                layerIndex
            })
            newNode.getSize()
            // 数据关联实际节点
            data._node = newNode
            if (data.data.isActive) {
                this.renderer.addActiveNode(newNode)
            }
        }
        // 根节点
        if (isRoot) {
            newNode.isRoot = true
            this.root = newNode
        } else {
            // 互相收集
            newNode.parent = parent._node
            parent._node.addChildren(newNode)
        }
        return newNode;
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-07-16 13:48:43 
     * @Desc: 定位节点到画布中间 
     */
    setNodeCenter(node) {
        node.left = (this.mindMap.width - node.width) / 2
        node.top = (this.mindMap.height - node.height) / 2
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

    /** 
     * @Author: 王林 
     * @Date: 2021-04-11 15:05:01 
     * @Desc: 二次贝塞尔曲线 
     */
    quadraticCurvePath(x1, y1, x2, y2) {
        let cx = x1 + (x2 - x1) * 0.2
        let cy = y1 + (y2 - y1) * 0.8
        return `M ${x1},${y1} Q ${cx},${cy} ${x2},${y2}`
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-04-11 15:05:18 
     * @Desc: 三次贝塞尔曲线 
     */
    cubicBezierPath(x1, y1, x2, y2) {
        let cx1 = x1 + (x2 - x1) / 2
        let cy1 = y1
        let cx2 = cx1
        let cy2 = y2
        return `M ${x1},${y1} C ${cx1},${cy1} ${cx2},${cy2} ${x2},${y2}`
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-06-27 19:00:07 
     * @Desc:  获取节点的marginX
     */
    getMarginX(layerIndex) {
        return layerIndex === 1 ? this.mindMap.themeConfig.second.marginX : this.mindMap.themeConfig.node.marginX;
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-04-11 15:34:20 
     * @Desc: 获取节点的marginY
     */
    getMarginY(layerIndex) {
        return layerIndex === 1 ? this.mindMap.themeConfig.second.marginY : this.mindMap.themeConfig.node.marginY;
    }

    /** 
     * @Author: 王林 
     * @Date: 2022-07-31 09:14:03 
     * @Desc: 获取节点的边界值 
     */
    getNodeBoundaries(node, dir, isLeft) {
        let { generalizationLineMargin, generalizationNodeMargin } = this.mindMap.themeConfig
        let walk = (root) => {
            let _left = Infinity
            let _right = -Infinity
            let _top = Infinity
            let _bottom = -Infinity
            if (root.children && root.children.length > 0) {
                root.children.forEach((child) => {
                    let {left, right, top, bottom} = walk(child)
                    // 概要内容的宽度
                    let generalizationWidth = child._generalizationNode ? child._generalizationNode.width + generalizationNodeMargin : 0
                    // 概要内容的高度
                    let generalizationHeight = child._generalizationNode ? child._generalizationNode.height + generalizationNodeMargin : 0
                    if (left < _left) {
                        _left = left - (isLeft ? generalizationWidth : 0)
                    }
                    if (right + (dir === 'h' ? generalizationWidth : 0) > _right) {
                        _right = right + (dir === 'h' ? generalizationWidth : 0)
                    }
                    if (top < _top) {
                        _top = top
                    }
                    if (bottom + (dir === 'v' ? generalizationHeight : 0) > _bottom) {
                        _bottom = bottom + (dir === 'v' ? generalizationHeight : 0)
                    }
                })
            }
            let cur = {
                left: root.left,
                right: root.left + root.width,
                top: root.top,
                bottom: root.top + root.height
            }
            return {
                left: cur.left < _left ? cur.left : _left,
                right: cur.right > _right ? cur.right : _right,
                top: cur.top < _top ? cur.top : _top,
                bottom: cur.bottom > _bottom ? cur.bottom : _bottom
            }
        }
        let {left, right, top, bottom} = walk(node)
        return {
            left, 
            right,
            top,
            bottom,
            generalizationLineMargin,
            generalizationNodeMargin
        };
    }
}

export default Base