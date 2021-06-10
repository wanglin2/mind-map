import Style from './Style';
import {
    resizeImgSize
} from './Utils'
import {
    Image,
    Text,
    SVG,
    Circle,
    Element
} from '@svgdotjs/svg.js'
import btnsSvg from './svg/btns';

/** 
 * javascript comment 
 * @Author: 王林25 
 * @Date: 2021-04-06 11:26:00 
 * @Desc: 节点类
 */
class Node {
    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-04-06 11:26:17 
     * @Desc: 构造函数 
     */
    constructor(opt = {}) {
        // 原始数据
        this.originData = opt.originData
        // 原始数据里的数据部分
        this.data = opt.data
        // id
        this.uid = opt.uid
        // 控制实例
        this.mindMap = opt.mindMap
        // 渲染实例
        this.renderer = opt.renderer
        // 主题配置
        this.themeConfig = this.mindMap.themeConfig
        // 样式实例
        this.style = new Style(this, this.themeConfig)
        // 渲染器
        this.draw = opt.draw || null
        // 是否是根节点
        this.isRoot = opt.isRoot === undefined ? false : opt.isRoot
        // 是否激活
        this.isActive = opt.isActive === undefined ? false : opt.isActive
        // 是否展开
        this.expand = opt.expand === undefined ? true : opt.expand
        // 节点层级
        this.layerIndex = opt.layerIndex === undefined ? 0 : opt.layerIndex
        // 节点宽
        this.width = opt.width || 0
        // 节点高
        this.height = opt.height || 0
        // left
        this.left = opt.left || 0
        // top
        this.top = opt.top || 0
        // 父节点
        this.parent = opt.parent || null
        // 子节点
        this.children = opt.children || []
        // 全部子节点所占的高度之和
        this.childrenAreaHeight = opt.childrenAreaHeight || 0
        // 文本节点
        this.textNode = null
        // 其他数据
        Object.keys(opt.data).forEach((key) => {
            this[key] = opt.data[key]
        })
    }

    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-04-06 15:55:04 
     * @Desc: 添加子节点 
     */
    addChildren(node) {
        this.children.push(node)
    }

    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-04-09 09:46:23 
     * @Desc: 刷新节点的宽高 
     */
    refreshSize() {
        let {
            width,
            height
        } = this.getNodeRect()
        this.width = width
        this.height = height
    }

    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-04-06 14:52:17 
     * @Desc: 计算节点尺寸信息 
     */
    getNodeRect() {
        let width = this.themeConfig.paddingX * 2
        let height = this.themeConfig.paddingY * 2
        let maxWidth = 0
        if (this.img) {
            let img = this.createImgNode()
            if (img.width > maxWidth) {
                maxWidth = img.width
            }
            height += img.height
        }
        if (this.icon && this.text) {
            let icon = this.createIconNode()
            let text = this.createTextNode()
            if (icon.width + text.width > maxWidth) {
                maxWidth = icon.width + text.width
            }
            height += Math.max(text.height, icon.height)
        } else if (this.text) {
            let text = this.createTextNode()
            if (text.width > maxWidth) {
                maxWidth = text.width
            }
            height += text.height
        } else if (this.icon) {
            let icon = this.createIconNode()
            if (icon.width > maxWidth) {
                maxWidth = icon.width
            }
            height += icon.height
        }
        return {
            width: width + maxWidth,
            height
        }
    }

    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-04-09 14:06:17 
     * @Desc: 创建图片节点 
     */
    createImgNode() {
        if (!this.img) {
            return
        }
        let imgSize = this.getImgShowSize()
        return {
            node: new Image().load(this.img).size(...imgSize),
            width: imgSize[0],
            height: imgSize[1]
        }
    }

    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-04-09 14:08:56 
     * @Desc: 创建文本节点 
     */
    createTextNode() {
        if (!this.text) {
            return
        }
        let node = this.draw.text(this.text)
        this.style.text(node)
        let {
            width,
            height
        } = node.bbox()
        let cloneNode = node.clone()
        node.remove()
        return {
            node: cloneNode,
            width,
            height
        }
    }

    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-04-09 14:10:48 
     * @Desc: 创建icon节点 
     */
    createIconNode() {
        if (!this.icon) {
            return
        }
        let node = SVG('<svg t="1617947697619" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="999" width="200" height="200"><path d="M512 899.5c-213.668 0-387.5-173.832-387.5-387.5S298.332 124.5 512 124.5 899.5 298.332 899.5 512 725.668 899.5 512 899.5z" fill="#4472C4" p-id="1000"></path><path d="M512 137c-206.776 0-375 168.224-375 375s168.224 375 375 375 375-168.224 375-375-168.224-375-375-375m0-25c220.914 0 400 179.086 400 400S732.914 912 512 912 112 732.914 112 512s179.086-400 400-400z" fill="#4472C4" p-id="1001"></path><path d="M597.681 335.009c0-7.67-2.36-13.569-7.08-17.109a35.115 35.115 0 0 0-20.061-5.9c-3.54 0-6.49 1.77-10.029 4.13-3.54 2.95-6.49 5.31-8.26 7.08a75.758 75.758 0 0 0-11.211 13.569c-3.54 4.72-7.67 9.44-11.209 13.569-11.209 12.979-23.009 27.139-35.988 41.3-13.569 14.749-26.549 27.729-38.938 39.528-1.18 1.18-2.95 2.36-4.13 3.54l-4.72 2.36c-1.77 1.18-3.54 1.77-4.72 2.95l-5.31 3.54c-2.95 2.36-5.31 4.13-7.08 5.9-2.36 2.36-2.95 4.13-2.95 5.9 0 7.08 2.95 12.389 10.03 16.519 5.9 4.72 12.979 6.49 20.059 6.49a31.985 31.985 0 0 0 14.756-3.543c4.13-2.36 8.26-5.9 12.979-10.619 2.95-3.54 6.49-7.67 11.209-12.979l11.8-12.979c2.95-2.95 7.67-7.67 13.569-14.159s12.389-14.159 20.649-23.009c-1.77 9.44-3.54 20.649-4.72 33.628-2.36 12.979-4.13 25.959-5.9 40.118l-4.72 41.888c-1.18 14.159-2.36 27.729-2.95 39.528-1.18 22.419-2.36 44.838-2.95 67.257q-1.77 33.628-1.77 58.407c0 9.44 2.36 16.519 7.67 21.829 5.31 5.9 12.389 8.26 21.829 8.26a43.479 43.479 0 0 0 15.929-3.54c4.72-2.36 7.67-5.31 7.67-8.85 0-1.77-0.59-5.31-0.59-11.209a149.392 149.392 0 0 1-2.36-18.879 116.91 116.91 0 0 1-2.36-21.239 132.008 132.008 0 0 1-1.18-20.649c0-41.3 1.18-82.6 4.72-124.484 3.54-41.3 10.03-82.6 20.649-123.3a106.366 106.366 0 0 1 2.95-11.209l2.36-11.209 1.77-11.209c-0.002-3.547 0.588-7.086 0.588-11.216z" fill="#FFFFFF" p-id="1002"></path></svg>').size(this.themeConfig.iconSize, this.themeConfig.iconSize)
        return {
            node,
            width: this.themeConfig.iconSize,
            height: this.themeConfig.iconSize
        }
    }

    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-04-09 11:10:11 
     * @Desc: 创建内容节点 
     */
    createNode() {
        let {
            left,
            top,
            width,
            height
        } = this
        let paddingY = this.themeConfig.paddingY
        // 创建组
        let group = this.draw.group()
        // 节点矩形
        let _rectNode = group.rect(width, height).x(left).y(top)
        this.style.rect(_rectNode)
        // 内容节点
        let imgNode = this.createImgNode()
        let iconNode = this.createIconNode()
        let textNode = this.createTextNode()
        let imgHeight = imgNode ? imgNode.height : 0
        // 图片
        if (imgNode) {
            group.add(imgNode.node)
            imgNode.node.cx(left + width / 2).y(top + paddingY)
        }
        // icon
        if (iconNode) {
            group.add(iconNode.node)
            iconNode.node.x(left + width / 2).y(top + paddingY + imgHeight + (textNode && textNode.height > iconNode.height ? (textNode.height - iconNode.height) / 2 : 0)).dx(textNode ? -textNode.width / 2 - iconNode.width / 2 : 0)
        }
        // 文字
        if (textNode) {
            this.textNode = textNode
            group.add(textNode.node)
            textNode.node.cx(left + width / 2).y(top + paddingY + imgHeight).dx(iconNode ? iconNode.width / 2 : 0)
        }
        // 单击事件
        group.click((e) => {
            e.stopPropagation()
            if (this.isActive) {
                return;
            }
            this.mindMap.emit('before_node_active', this, this.renderer.activeNodeList)
            this.renderer.clearActive()
            this.isActive = true
            this.mindMap.execCommand('UPDATE_NODE_DATA', this, {
                isActive: this.isActive
            })
            this.renderer.activeNodeList.push(this)
            this.mindMap.render()
            this.mindMap.emit('node_active', this, this.renderer.activeNodeList)
        })
        // 双击事件
        group.dblclick(() => {
            this.showTextEditBox()
        })
        return group
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-04-13 22:15:56 
     * @Desc: 显示文本编辑框 
     */
    showTextEditBox() {
        if (!this.text) {
            return;
        }
        this.renderer.showEditTextBox(this, this.textNode.node.node.getBoundingClientRect())
    }

    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-04-07 13:55:58 
     * @Desc: 渲染 
     */
    render() {
        // 连线
        this.drawLine()
        // 按钮
        this.drawBtn()
        // 节点
        this.draw.add(this.createNode())
        // 子节点
        if (this.children && this.children.length && this.expand) {
            this.children.forEach((child) => {
                child.render()
            })
        }
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-04-10 22:01:53 
     * @Desc: 连线 
     */
    drawLine() {
        if (!this.expand) {
            return;
        }
        let lines = this.renderer.layout.drawLine(this)
        lines.forEach((line) => {
            this.style.line(line)
        })
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-04-11 19:47:01 
     * @Desc: 展开收缩按钮 
     */
    drawBtn() {
        if (this.children.length <= 0 || this.isRoot) {
            return;
        }
        let g = this.draw.group()
        let iconSvg
        if (this.expand) {
            iconSvg = btnsSvg.close
        } else {
            iconSvg = btnsSvg.open
        }
        let node = SVG(iconSvg).size(20, 20)
        let fillNode = new Circle().size(20)
        this.renderer.layout.drawIcon(this, [node, fillNode])
        node.dx(0).dy(-10)
        fillNode.dx(0).dy(-10)
        this.style.iconBtn(node, fillNode)
        g.mouseover(() => {
            g.css({ cursor: 'pointer' })
        })
        g.mouseout(() => {
            g.css({ cursor: 'auto' })
        })
        g.click(() => {
            this.expand = !this.expand
            // 需要反映到实际数据上
            this.mindMap.execCommand('UPDATE_NODE_DATA', this, {
                expand: this.expand
            })
            this.mindMap.render()
            this.mindMap.emit('expand_btn_click', this)
        })
        g.add(fillNode)
        g.add(node)
    }

    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-04-09 10:12:51 
     * @Desc: 获取图片显示宽高 
     */
    getImgShowSize() {
        return resizeImgSize(this.imgWidth, this.imgHeight, this.themeConfig.imgMaxWidth, this.themeConfig.imgMaxHeight)
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-05-04 21:48:49 
     * @Desc: 获取某个样式 
     */
    getStyle(prop, root, isActive) {
        let v = this.style.merge(prop, root, isActive)
        return v === undefined ? '' : v
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-05-04 22:18:07 
     * @Desc: 修改某个样式 
     */
    setStyle(prop, value, isActive) {
        if (isActive) {
            this.mindMap.execCommand('UPDATE_NODE_DATA', this, {
                activeStyle: {
                    ...(this.data.activeStyle || {}),
                    [prop]: value
                }
            })
        } else {
            this.mindMap.execCommand('UPDATE_NODE_DATA', this, {
                [prop]: value
            })
        }
        this.mindMap.render()
    }
}

export default Node