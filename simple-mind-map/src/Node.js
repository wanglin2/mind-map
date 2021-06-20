import Style from './Style'
import {
    resizeImgSize
} from './utils'
import {
    Image,
    SVG,
    Circle
} from '@svgdotjs/svg.js'
import btnsSvg from './svg/btns'
import iconsSvg from './svg/icons';

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
        // 节点数据
        this.nodeData = this.handleData(opt.data || {})
        // id
        this.uid = opt.uid
        // 控制实例
        this.mindMap = opt.mindMap
        // 渲染实例
        this.renderer = opt.renderer
        // 渲染器
        this.draw = opt.draw || null
        // 主题配置
        this.themeConfig = this.mindMap.themeConfig
        // 样式实例
        this.style = new Style(this, this.themeConfig)
        // 是否是根节点
        this.isRoot = opt.isRoot === undefined ? false : opt.isRoot
        // 节点层级
        this.layerIndex = opt.layerIndex === undefined ? 0 : opt.layerIndex
        // 节点宽
        this.width = opt.width || 0
        // 节点高
        this.height = opt.height || 0
        // 节点文字内容部分高
        this._textContentHeight = 0
        // left
        this.left = opt.left || 0
        // top
        this.top = opt.top || 0
        // 父节点
        this.parent = opt.parent || null
        // 子节点
        this.children = opt.children || []
        // 文本节点
        this.textNode = null
        // icon间距
        this._textContentItemMargin = 2
        // 图片和文字节点的间距
        this._blockContentMargin = 5
        // 计算节点尺寸
        this.refreshSize()
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-06-20 10:12:31 
     * @Desc: 处理数据 
     */
    handleData(data) {
        data.data.expand = data.data.expand === false ? false : true
        data.data.isActive = data.data.isActive === true ? true : false
        return data;
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
        // 宽高
        let imgContentWidth = 0
        let imgContentHeight = 0
        let textContentWidth = 0
        let textContentHeight = 0
        // 存在图片
        let imgObj = this.createImgNode()
        if (imgObj) {
            imgContentWidth = imgObj.width
            imgContentHeight = imgObj.height
        }
        // 图标
        let iconObjs = this.createIconNode()
        if (iconObjs.length > 0) {
            textContentWidth += iconObjs.reduce((sum, cur) => {
                textContentHeight = Math.max(textContentHeight, cur.height)
                return sum += cur.width + this._textContentItemMargin
            }, 0)
        }
        // 文字
        let textObj = this.createTextNode()
        if (textObj) {
            textContentWidth += textObj.width
            textContentHeight = Math.max(textContentHeight, textObj.height)
        }
        // 超链接
        let hyperlinkObj = this.createHyperlinkNode()
        if (hyperlinkObj) {
            textContentWidth += hyperlinkObj.width
            textContentHeight = Math.max(textContentHeight, hyperlinkObj.height)
            hyperlinkObj.node.remove()
        }
        // 标签
        let tagObjs = this.createTagNode()
        if (tagObjs.length > 0) {
            textContentWidth += tagObjs.reduce((sum, cur) => {
                textContentHeight = Math.max(textContentHeight, cur.height)
                cur.node.remove()
                return sum += cur.width + this._textContentItemMargin
            }, 0)
        }
        // 备注
        let noteObj = this.createNoteNode()
        if (noteObj) {
            textContentWidth += noteObj.width
            textContentHeight = Math.max(textContentHeight, noteObj.height)
            noteObj.node.remove()
        }
        // 文字内容部分的高度
        this._textContentHeight = textContentHeight
        // 间距
        let margin = imgContentHeight > 0 && textContentHeight > 0 ? this._blockContentMargin : 0
        let { paddingX, paddingY } = this.getPaddingVale()
        return {
            width: Math.max(imgContentWidth, textContentWidth) + paddingX * 2,
            height: imgContentHeight + textContentHeight + paddingY * 2 + margin
        }
    }

    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-04-09 14:06:17 
     * @Desc: 创建图片节点 
     */
    createImgNode() {
        let img = this.nodeData.data.image
        if (!img) {
            return
        }
        let imgSize = this.getImgShowSize()
        let node = new Image().load(img).size(...imgSize)
        if (this.nodeData.data.imageTitle) {
            node.attr('title', this.nodeData.data.imageTitle)
        }
        return {
            node,
            width: imgSize[0],
            height: imgSize[1]
        }
    }

    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-04-09 10:12:51 
     * @Desc: 获取图片显示宽高 
     */
    getImgShowSize() {
        return resizeImgSize(this.nodeData.data.imageSize.width, this.nodeData.data.imageSize.height, this.themeConfig.imgMaxWidth, this.themeConfig.imgMaxHeight)
    }

    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-04-09 14:10:48 
     * @Desc: 创建icon节点 
     */
    createIconNode() {
        let _data = this.nodeData.data
        if (!_data.icon || _data.icon.length <= 0) {
            return [];
        }
        let node = SVG('<svg t="1617947697619" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="999" width="200" height="200"><path d="M512 899.5c-213.668 0-387.5-173.832-387.5-387.5S298.332 124.5 512 124.5 899.5 298.332 899.5 512 725.668 899.5 512 899.5z" fill="#4472C4" p-id="1000"></path><path d="M512 137c-206.776 0-375 168.224-375 375s168.224 375 375 375 375-168.224 375-375-168.224-375-375-375m0-25c220.914 0 400 179.086 400 400S732.914 912 512 912 112 732.914 112 512s179.086-400 400-400z" fill="#4472C4" p-id="1001"></path><path d="M597.681 335.009c0-7.67-2.36-13.569-7.08-17.109a35.115 35.115 0 0 0-20.061-5.9c-3.54 0-6.49 1.77-10.029 4.13-3.54 2.95-6.49 5.31-8.26 7.08a75.758 75.758 0 0 0-11.211 13.569c-3.54 4.72-7.67 9.44-11.209 13.569-11.209 12.979-23.009 27.139-35.988 41.3-13.569 14.749-26.549 27.729-38.938 39.528-1.18 1.18-2.95 2.36-4.13 3.54l-4.72 2.36c-1.77 1.18-3.54 1.77-4.72 2.95l-5.31 3.54c-2.95 2.36-5.31 4.13-7.08 5.9-2.36 2.36-2.95 4.13-2.95 5.9 0 7.08 2.95 12.389 10.03 16.519 5.9 4.72 12.979 6.49 20.059 6.49a31.985 31.985 0 0 0 14.756-3.543c4.13-2.36 8.26-5.9 12.979-10.619 2.95-3.54 6.49-7.67 11.209-12.979l11.8-12.979c2.95-2.95 7.67-7.67 13.569-14.159s12.389-14.159 20.649-23.009c-1.77 9.44-3.54 20.649-4.72 33.628-2.36 12.979-4.13 25.959-5.9 40.118l-4.72 41.888c-1.18 14.159-2.36 27.729-2.95 39.528-1.18 22.419-2.36 44.838-2.95 67.257q-1.77 33.628-1.77 58.407c0 9.44 2.36 16.519 7.67 21.829 5.31 5.9 12.389 8.26 21.829 8.26a43.479 43.479 0 0 0 15.929-3.54c4.72-2.36 7.67-5.31 7.67-8.85 0-1.77-0.59-5.31-0.59-11.209a149.392 149.392 0 0 1-2.36-18.879 116.91 116.91 0 0 1-2.36-21.239 132.008 132.008 0 0 1-1.18-20.649c0-41.3 1.18-82.6 4.72-124.484 3.54-41.3 10.03-82.6 20.649-123.3a106.366 106.366 0 0 1 2.95-11.209l2.36-11.209 1.77-11.209c-0.002-3.547 0.588-7.086 0.588-11.216z" fill="#FFFFFF" p-id="1002"></path></svg>').size(this.themeConfig.iconSize, this.themeConfig.iconSize)
        return [{
            node,
            width: this.themeConfig.iconSize,
            height: this.themeConfig.iconSize
        }, {
            node: node.clone(),
            width: this.themeConfig.iconSize,
            height: this.themeConfig.iconSize
        }]
    }

    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-04-09 14:08:56 
     * @Desc: 创建文本节点 
     */
    createTextNode() {
        if (!this.nodeData.data.text) {
            return
        }
        let node = this.draw.text(this.nodeData.data.text)
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
     * @Author: 王林 
     * @Date: 2021-06-20 15:28:54 
     * @Desc: 创建超链接节点 
     */
    createHyperlinkNode() {
        if (!this.nodeData.data.hyperlink) {
            return
        }
        let iconSize = this.themeConfig.iconSize
        let node = this.draw.element('a')
        node.node.addEventListener('click', (e) => {
            e.stopPropagation()
        })
        node.attr('href', this.nodeData.data.hyperlink).attr('target', '_blank')
        if (this.nodeData.data.hyperlinkTitle) {
            node.attr('title', this.nodeData.data.hyperlinkTitle)
        }
        node.add(this.draw.rect(iconSize, iconSize).fill({ color: 'transparent' }))
        node.add(SVG(iconsSvg.hyperlink).size(iconSize, iconSize))
        return {
            node: this.draw.nested().add(node),
            width: iconSize,
            height: iconSize
        }
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-06-20 19:49:15 
     * @Desc: 创建标签节点 
     */
    createTagNode() {
        if (!this.nodeData.data.tag || this.nodeData.data.tag.length <= 0) {
            return [];
        }
        let nodes = []
        this.nodeData.data.tag.slice(0, 5).forEach((item, index) => {
            let tag = this.draw.nested()
            let text = this.draw.text(item).x(8).cy(10)
            this.style.tagText(text, index)
            let {
                width,
                height
            } = text.bbox()
            let cloneText = text.clone()
            text.remove()
            let rect = this.draw.rect(width + 16, 20)
            this.style.tagRect(rect, index)
            tag.add(rect).add(cloneText)
            nodes.push({
                node: tag,
                width: width + 16,
                height: 20
            })
        })
        return nodes;
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-06-20 21:19:36 
     * @Desc: 创建备注节点 
     */
    createNoteNode() {
        if (!this.nodeData.data.note) {
            return null;
        }
        let node = this.draw.nested().attr('cursor', 'pointer')
        let iconSize = this.themeConfig.iconSize
        node.add(this.draw.rect(iconSize, iconSize).fill({ color: 'transparent' }))
        node.add(SVG(iconsSvg.note).size(iconSize, iconSize))
        let el = document.createElement('div')
        el.style.cssText = `
            position: absolute;
            padding: 10px;
            border-radius: 5px;
            box-shadow: 0 2px 5px rgb(0 0 0 / 10%);
            display: none;
        `
        el.innerText = this.nodeData.data.note
        document.body.appendChild(el)
        node.on('mouseover', () => {
            let { left, top } = node.node.getBoundingClientRect()
            el.style.left = left + 'px'
            el.style.top = top + iconSize + 'px'
            el.style.display = 'block'
        })
        node.on('mouseout', () => {
            el.style.display = 'none'
        })
        return {
            node,
            width: iconSize,
            height: iconSize
        };
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
            height,
            _textContentHeight,
            _textContentItemMargin
        } = this
        let { paddingY } = this.getPaddingVale()
        // 创建组
        let group = this.draw.group()
        // 节点矩形
        this.style.rect(group.rect(width, height).x(left).y(top))
        // 图片节点
        let imgObj = this.createImgNode()
        let imgHeight = 0
        if (imgObj) {
            imgHeight = imgObj.height
            group.add(imgObj.node)
            imgObj.node.cx(left + width / 2).y(top + paddingY)
        }
        // 内容节点
        let textContentNested = this.draw.nested()
        let textContentOffsetX = 0
        // icon
        let iconObjs = this.createIconNode()
        let iconNested = this.draw.nested()
        if (iconObjs && iconObjs.length > 0) {
            let iconLeft = 0
            iconObjs.forEach((item) => {
                item.node.x(textContentOffsetX + iconLeft).y((_textContentHeight - item.height) / 2)
                iconNested.add(item.node)
                iconLeft += item.width + _textContentItemMargin
            })
            textContentNested.add(iconNested)
            textContentOffsetX += iconLeft
        }
        // 文字
        let textObj = this.createTextNode()
        if (textObj) {
            textObj.node.x(textContentOffsetX).y(0)
            this.textNode = textObj
            textContentNested.add(textObj.node)
            textContentOffsetX += textObj.width + _textContentItemMargin
        }
        // 超链接
        let hyperlinkObj = this.createHyperlinkNode()
        if (hyperlinkObj) {
            hyperlinkObj.node.x(textContentOffsetX).y((_textContentHeight - hyperlinkObj.height) / 2)
            textContentNested.add(hyperlinkObj.node)
            textContentOffsetX += hyperlinkObj.width + _textContentItemMargin
        }
        // 标签
        let tagObjs = this.createTagNode()
        let tagNested = this.draw.nested()
        if (tagObjs && tagObjs.length > 0) {
            let tagLeft = 0
            tagObjs.forEach((item) => {
                item.node.x(textContentOffsetX + tagLeft).y((_textContentHeight - item.height) / 2)
                tagNested.add(item.node)
                tagLeft += item.width + _textContentItemMargin
            })
            textContentNested.add(tagNested)
            textContentOffsetX += tagLeft
        }
        // 备注
        let noteObj = this.createNoteNode()
        if (noteObj) {
            noteObj.node.x(textContentOffsetX).y((_textContentHeight - noteObj.height) / 2)
            textContentNested.add(noteObj.node)
            textContentOffsetX += noteObj.width
        }
        // 文字内容整体
        textContentNested.x(left + width / 2).dx(-textContentNested.bbox().width / 2).y(top + imgHeight + paddingY + (imgHeight > 0 && _textContentHeight > 0 ? this._blockContentMargin : 0))
        group.add(textContentNested)
        // 单击事件
        group.click((e) => {
            e.stopPropagation()
            if (this.nodeData.data.isActive) {
                return;
            }
            this.mindMap.emit('before_node_active', this, this.renderer.activeNodeList)
            this.renderer.clearActive()
            this.mindMap.execCommand('UPDATE_NODE_DATA', this, {
                isActive: !this.nodeData.data.isActive
            })
            this.renderer.activeNodeList.push(this)
            this.mindMap.render()
            this.mindMap.emit('node_active', this, this.renderer.activeNodeList)
        })
        // 双击事件
        group.dblclick(() => {
            this.mindMap.emit('node_dblclick', this)
        })
        return group
    }

    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-04-07 13:55:58 
     * @Desc: 渲染 
     */
    render() {
        // 连线
        this.renderLine()
        // 按钮
        this.renderExpandBtn()
        // 节点
        this.draw.add(this.createNode())
        // 子节点
        if (this.children && this.children.length && this.nodeData.data.expand !== false) {
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
    renderLine() {
        if (this.nodeData.data.expand === false) {
            return;
        }
        let lines = this.renderer.layout.renderLine(this)
        lines.forEach((line) => {
            this.style.line(line)
        })
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-04-11 19:47:01 
     * @Desc: 展开收缩按钮 
     */
    renderExpandBtn() {
        if (this.children.length <= 0 || this.isRoot) {
            return;
        }
        let g = this.draw.group()
        let iconSvg
        if (this.nodeData.data.expand === false) {
            iconSvg = btnsSvg.open
        } else {
            iconSvg = btnsSvg.close
        }
        let node = SVG(iconSvg).size(20, 20)
        let fillNode = new Circle().size(20)
        this.renderer.layout.renderExpandBtn(this, [node, fillNode])
        node.dx(0).dy(-10)
        fillNode.dx(0).dy(-10)
        this.style.iconBtn(node, fillNode)
        g.mouseover(() => {
            g.css({
                cursor: 'pointer'
            })
        })
        g.mouseout(() => {
            g.css({
                cursor: 'auto'
            })
        })
        g.click(() => {
            // 需要反映到实际数据上
            this.mindMap.execCommand('UPDATE_NODE_DATA', this, {
                expand: !this.nodeData.data.expand
            })
            this.mindMap.render()
            this.mindMap.emit('expand_btn_click', this)
        })
        g.add(fillNode)
        g.add(node)
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-06-20 22:51:57 
     * @Desc: 获取padding值 
     */
    getPaddingVale() {
        return {
            paddingX: this.getStyle('paddingX', true, this.nodeData.data.isActive),
            paddingY: this.getStyle('paddingY', true, this.nodeData.data.isActive)
        };
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
                    ...(this.nodeData.data.activeStyle || {}),
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