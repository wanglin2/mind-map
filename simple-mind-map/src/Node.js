import Style from './Style'
import {
    resizeImgSize,
    copyRenderTree,
    imgToDataUrl
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
        // 节点内容的容器
        this.group = null
        // 节点内容是否发生了变化，是的话会重新计算和渲染
        this.changed = true
        // 文本节点
        this.textNode = null
        // icon间距
        this._textContentItemMargin = 2
        // 图片和文字节点的间距
        this._blockContentMargin = 5
        // 展开收缩按钮尺寸
        this._expandBtnSize = 20
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
        if (!this.changed) {
            return;
        }
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
        let iconSize = this.themeConfig.iconSize
        return _data.icon.map((item) => {
            return {
                node: SVG(iconsSvg.getNodeIconListIcon(item)).size(iconSize, iconSize),
                width: iconSize,
                height: iconSize
            };
        });
    }

    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-04-09 14:08:56 
     * @Desc: 创建文本节点 
     */
    createTextNode() {
        let node = this.draw.text(this.nodeData.data.text || '')
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
        let { hyperlink, hyperlinkTitle } = this.nodeData.data
        if (!hyperlink) {
            return
        }
        let iconSize = this.themeConfig.iconSize
        let node = this.draw.link(hyperlink).target('_blank')
        node.node.addEventListener('click', (e) => {
            e.stopPropagation()
        })
        if (hyperlinkTitle) {
            node.attr('title', hyperlinkTitle)
        }
        node.rect(iconSize, iconSize).fill({ color: 'transparent' })
        let iconNode = SVG(iconsSvg.hyperlink).size(iconSize, iconSize)
        this.style.iconNode(iconNode)
        node.add(iconNode)
        return {
            node: node,
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
        let tagData = this.nodeData.data.tag
        if (!tagData || tagData.length <= 0) {
            return [];
        }
        let nodes = []
        tagData.slice(0, this.mindMap.opt.maxTag).forEach((item, index) => {
            let tag = this.draw.group()
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
        let node = this.draw.group().attr('cursor', 'pointer')
        let iconSize = this.themeConfig.iconSize
        node.add(this.draw.rect(iconSize, iconSize).fill({ color: 'transparent' }))
        let iconNode = SVG(iconsSvg.note).size(iconSize, iconSize)
        this.style.iconNode(iconNode)
        node.add(iconNode)
        let el = document.createElement('div')
        el.style.cssText = `
            position: absolute;
            padding: 10px;
            border-radius: 5px;
            box-shadow: 0 2px 5px rgb(0 0 0 / 10%);
            display: none;
            background-color: #fff;
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
        this.group = this.draw.group()
        // 节点矩形
        this.style.rect(this.group.rect(width, height).x(left).y(top))
        // 图片节点
        let imgObj = this.createImgNode()
        let imgHeight = 0
        if (imgObj) {
            imgHeight = imgObj.height
            this.group.add(imgObj.node)
            imgObj.node.cx(left + width / 2).y(top + paddingY)
        }
        // 内容节点
        let textContentNested = this.draw.group()
        let textContentOffsetX = 0
        // icon
        let iconObjs = this.createIconNode()
        let iconNested = this.draw.group()
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
            hyperlinkObj.node.translate(textContentOffsetX, (_textContentHeight - hyperlinkObj.height) / 2)
            textContentNested.add(hyperlinkObj.node)
            textContentOffsetX += hyperlinkObj.width + _textContentItemMargin
        }
        // 标签
        let tagObjs = this.createTagNode()
        let tagNested = this.draw.group()
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
            noteObj.node.translate(textContentOffsetX, (_textContentHeight - noteObj.height) / 2)
            textContentNested.add(noteObj.node)
            textContentOffsetX += noteObj.width
        }
        // 文字内容整体
        textContentNested.translate(
            left + width / 2 - textContentNested.bbox().width / 2,
            top + imgHeight + paddingY + (imgHeight > 0 && _textContentHeight > 0 ? this._blockContentMargin : 0)
        )
        this.group.add(textContentNested)
        // 单击事件，选中节点
        this.group.click((e) => {
            e.stopPropagation()
            if (this.nodeData.data.isActive) {
                return;
            }
            this.mindMap.emit('before_node_active', this, this.renderer.activeNodeList)
            this.renderer.clearActive()
            this.mindMap.execCommand('UPDATE_NODE_DATA', this, {
                isActive: !this.nodeData.data.isActive
            })
            this.renderNode()
            this.renderer.activeNodeList.push(this)
            this.mindMap.emit('node_active', this, this.renderer.activeNodeList)
        })
        // 双击事件
        this.group.dblclick(() => {
            this.mindMap.emit('node_dblclick', this)
        })
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-07-04 20:20:09 
     * @Desc: 渲染节点到画布 
     */
    renderNode() {
        if (this.group) {
            this.group.remove()
        }
        this.createNode()
        this.draw.add(this.group)
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-07-04 22:47:01 
     * @Desc: 更新整体位置 
     */
    updatePos() {
        
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
        if (this.changed) {
            this.renderNode()
        } else {
            this.updatePos()
        }
        this.changed = false
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
        let node = SVG(iconSvg).size(this._expandBtnSize, this._expandBtnSize)
        let fillNode = new Circle().size(this._expandBtnSize)
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
            // 展开收缩
            this.mindMap.execCommand('UPDATE_NODE_DATA', this, {
                expand: !this.mindMap.nodeData.data.expand
            }, children)
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
        this.renderNode()
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-06-22 22:04:02 
     * @Desc: 获取数据 
     */
    getData(key) {
        return key ? this.nodeData.data[key] || '' : this.nodeData.data;
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-06-22 22:12:01 
     * @Desc: 设置数据 
     */
    setData(data = {}) {
        this.mindMap.execCommand('UPDATE_NODE_DATA', this, data)
    }
}

export default Node