import Style from './Style'
import Shape from './Shape'
import {
    resizeImgSize,
    asyncRun
} from './utils'
import {
    Image,
    SVG,
    Circle,
    A,
    G,
    Rect,
    Text
} from '@svgdotjs/svg.js'
import btnsSvg from './svg/btns'
import iconsSvg from './svg/icons'

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
        // 形状实例
        this.shapeInstance = new Shape(this)
        this.shapePadding = {
            paddingX: 0,
            paddingY: 0
        }
        // 是否是根节点
        this.isRoot = opt.isRoot === undefined ? false : opt.isRoot
        // 是否是概要节点
        this.isGeneralization = opt.isGeneralization === undefined ? false : opt.isGeneralization
        this.generalizationBelongNode = null
        // 节点层级
        this.layerIndex = opt.layerIndex === undefined ? 0 : opt.layerIndex
        // 节点宽
        this.width = opt.width || 0
        // 节点高
        this.height = opt.height || 0
        // left
        this._left = opt.left || 0
        // top
        this._top = opt.top || 0
        // 自定义位置
        this.customLeft = opt.data.data.customLeft || undefined
        this.customTop = opt.data.data.customTop || undefined
        // 是否正在拖拽中
        this.isDrag = false
        // 父节点
        this.parent = opt.parent || null
        // 子节点
        this.children = opt.children || []
        // 节点内容的容器
        this.group = null
        // 节点内容对象
        this._imgData = null
        this._iconData = null
        this._textData = null
        this._hyperlinkData = null
        this._tagData = null
        this._noteData = null
        this.noteEl = null
        this._expandBtn = null
        this._lines = []
        this._generalizationLine = null
        this._generalizationNode = null
        // 尺寸信息
        this._rectInfo = {
            imgContentWidth: 0,
            imgContentHeight: 0,
            textContentWidth: 0,
            textContentHeight: 0
        }
        // 概要节点的宽高
        this._generalizationNodeWidth = 0
        this._generalizationNodeHeight = 0
        // 各种文字信息的间距
        this.textContentItemMargin = this.mindMap.opt.textContentMargin
        // 图片和文字节点的间距
        this.blockContentMargin = this.mindMap.opt.imgTextMargin
        // 展开收缩按钮尺寸
        this.expandBtnSize = this.mindMap.opt.expandBtnSize
        // 初始渲染
        this.initRender = true
        // 初始化
        // this.createNodeData()
        this.getSize()
    }

    // 支持自定义位置
    get left() {
        return this.customLeft || this._left
    }

    set left(val) {
        this._left = val
    }

    get top() {
        return this.customTop || this._top
    }

    set top(val) {
        this._top = val
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-07-12 07:40:47 
     * @Desc: 更新主题配置 
     */
    updateThemeConfig() {
        // 主题配置
        this.themeConfig = this.mindMap.themeConfig
        // 样式实例
        this.style.updateThemeConfig(this.themeConfig)
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-07-05 23:11:39 
     * @Desc: 复位部分布局时会重新设置的数据 
     */
    reset() {
        this.children = []
        this.parent = null
        this.isRoot = false
        this.layerIndex = 0
        this.left = 0
        this.top = 0
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-06-20 10:12:31 
     * @Desc: 处理数据 
     */
    handleData(data) {
        data.data.expand = data.data.expand === false ? false : true
        data.data.isActive = data.data.isActive === true ? true : false
        data.children = data.children || []
        return data
    }

    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2022-08-02 19:53:40 
     * @Desc: 检查节点是否存在自定义数据 
     */
    hasCustomPosition() {
        return this.customLeft !== undefined && this.customTop !== undefined
    }

    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2022-08-04 09:06:56 
     * @Desc: 检查节点是否存在自定义位置的祖先节点 
     */
    ancestorHasCustomPosition() {
        let node = this
        while(node) {
            if (node.hasCustomPosition()) {
                return true
            }
            node = node.parent
        }
        return false
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
     * @Author: 王林 
     * @Date: 2021-07-06 22:08:09 
     * @Desc: 创建节点的各个内容对象数据
     */
    createNodeData() {
        this._imgData = this.createImgNode()
        this._iconData = this.createIconNode()
        this._textData = this.createTextNode()
        this._hyperlinkData = this.createHyperlinkNode()
        this._tagData = this.createTagNode()
        this._noteData = this.createNoteNode()
        this.createGeneralizationNode()
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-07-10 09:20:02 
     * @Desc: 解绑所有事件 
     */
    removeAllEvent() {
        if (this._noteData) {
            this._noteData.node.off(['mouseover', 'mouseout'])
        }
        if (this._expandBtn) {
            this._expandBtn.off(['mouseover', 'mouseout', 'click'])
        }
        if (this.group) {
            this.group.off(['click', 'dblclick', 'contextmenu', 'mousedown', 'mouseup'])
        }
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-07-07 21:27:24 
     * @Desc: 移除节点内容
     */
    removeAllNode() {
        // 节点内的内容
        ;[this._imgData, this._iconData, this._textData, this._hyperlinkData, this._tagData, this._noteData].forEach((item) => {
            if (item && item.node) item.node.remove()
        })
        this._imgData = null
        this._iconData = null
        this._textData = null
        this._hyperlinkData = null
        this._tagData = null
        this._noteData = null
        // 展开收缩按钮
        if (this._expandBtn) {
            this._expandBtn.remove()
            this._expandBtn = null
        }
        // 组
        if (this.group) {
            this.group.clear()
            this.group.remove()
            this.group = null
        }
        // 概要
        this.removeGeneralization()
    }

    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-04-09 09:46:23 
     * @Desc: 计算节点的宽高 
     */
    getSize() {
        this.removeAllNode()
        this.createNodeData()
        let {
            width,
            height
        } = this.getNodeRect()
        // 判断节点尺寸是否有变化
        let changed = this.width !== width || this.height !== height
        this.width = width
        this.height = height
        return changed
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
        if (this._imgData) {
            this._rectInfo.imgContentWidth = imgContentWidth = this._imgData.width
            this._rectInfo.imgContentHeight = imgContentHeight = this._imgData.height
        }
        // 图标
        if (this._iconData.length > 0) {
            textContentWidth += this._iconData.reduce((sum, cur) => {
                textContentHeight = Math.max(textContentHeight, cur.height)
                return sum += cur.width + this.textContentItemMargin
            }, 0)
        }
        // 文字
        if (this._textData) {
            textContentWidth += this._textData.width
            textContentHeight = Math.max(textContentHeight, this._textData.height)
        }
        // 超链接
        if (this._hyperlinkData) {
            textContentWidth += this._hyperlinkData.width
            textContentHeight = Math.max(textContentHeight, this._hyperlinkData.height)
        }
        // 标签
        if (this._tagData.length > 0) {
            textContentWidth += this._tagData.reduce((sum, cur) => {
                textContentHeight = Math.max(textContentHeight, cur.height)
                return sum += cur.width + this.textContentItemMargin
            }, 0)
        }
        // 备注
        if (this._noteData) {
            textContentWidth += this._noteData.width
            textContentHeight = Math.max(textContentHeight, this._noteData.height)
        }
        // 文字内容部分的尺寸
        this._rectInfo.textContentWidth = textContentWidth
        this._rectInfo.textContentHeight = textContentHeight
        // 间距
        let margin = imgContentHeight > 0 && textContentHeight > 0 ? this.blockContentMargin : 0
        let { paddingX, paddingY } = this.getPaddingVale()
        // 纯内容宽高
        let _width = Math.max(imgContentWidth, textContentWidth)
        let _height = imgContentHeight + textContentHeight
        // 计算节点形状需要的附加内边距
        let { paddingX: shapePaddingX, paddingY: shapePaddingY } = this.shapeInstance.getShapePadding(_width, _height, paddingX, paddingY)
        this.shapePadding.paddingX = shapePaddingX
        this.shapePadding.paddingY = shapePaddingY
        return {
            width: _width + paddingX * 2 + shapePaddingX * 2,
            height: _height + paddingY * 2 + margin + shapePaddingY * 2
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
            return []
        }
        let iconSize = this.themeConfig.iconSize
        return _data.icon.map((item) => {
            return {
                node: SVG(iconsSvg.getNodeIconListIcon(item)).size(iconSize, iconSize),
                width: iconSize,
                height: iconSize
            }
        })
    }

    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-04-09 14:08:56 
     * @Desc: 创建文本节点 
     */
    createTextNode() {
        let g = new G()
        let fontSize = this.getStyle('fontSize', this.isRoot, this.nodeData.data.isActive)
        let lineHeight = this.getStyle('lineHeight', this.isRoot, this.nodeData.data.isActive)
        this.nodeData.data.text.split(/\n/img).forEach((item, index) => {
            let node = new Text().text(item)
            this.style.text(node)
            node.y(fontSize * lineHeight * index)
            g.add(node)
        })
        let {
            width,
            height
        } = g.bbox()
        return {
            node: g,
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
        let node = new SVG()
        // 超链接节点
        let a = new A().to(hyperlink).target('_blank')
        a.node.addEventListener('click', (e) => {
            e.stopPropagation()
        })
        if (hyperlinkTitle) {
            a.attr('title', hyperlinkTitle)
        }
        // 添加一个透明的层，作为鼠标区域
        a.rect(iconSize, iconSize).fill({ color: 'transparent' })
        // 超链接图标
        let iconNode = SVG(iconsSvg.hyperlink).size(iconSize, iconSize)
        this.style.iconNode(iconNode)
        a.add(iconNode)
        node.add(a)
        return {
            node,
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
            return []
        }
        let nodes = []
        tagData.slice(0, this.mindMap.opt.maxTag).forEach((item, index) => {
            let tag = new G()
            // 标签文本
            let text = new Text().text(item).x(8).cy(10)
            this.style.tagText(text, index)
            let {
                width,
                height
            } = text.bbox()
            // 标签矩形
            let rect = new Rect().size(width + 16, 20)
            this.style.tagRect(rect, index)
            tag.add(rect).add(text)
            nodes.push({
                node: tag,
                width: width + 16,
                height: 20
            })
        })
        return nodes
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-06-20 21:19:36 
     * @Desc: 创建备注节点 
     */
    createNoteNode() {
        if (!this.nodeData.data.note) {
            return null
        }
        let iconSize = this.themeConfig.iconSize
        let node = new SVG().attr('cursor', 'pointer')
        // 透明的层，用来作为鼠标区域
        node.add(new Rect().size(iconSize, iconSize).fill({ color: 'transparent' }))
        // 备注图标
        let iconNode = SVG(iconsSvg.note).size(iconSize, iconSize)
        this.style.iconNode(iconNode)
        node.add(iconNode)
        // 备注tooltip
        if (!this.mindMap.opt.customNoteContentShow) {
            if (!this.noteEl) {
                this.noteEl = document.createElement('div')
                this.noteEl.style.cssText = `
                    position: absolute;
                    padding: 10px;
                    border-radius: 5px;
                    box-shadow: 0 2px 5px rgb(0 0 0 / 10%);
                    display: none;
                    background-color: #fff;
                `
                document.body.appendChild(this.noteEl)
            }
            this.noteEl.innerText = this.nodeData.data.note
        }
        node.on('mouseover', () => {
            let { left, top } = node.node.getBoundingClientRect()
            if (!this.mindMap.opt.customNoteContentShow) {
                this.noteEl.style.left = left + 'px'
                this.noteEl.style.top = top + iconSize + 'px'
                this.noteEl.style.display = 'block'
            } else {
                this.mindMap.opt.customNoteContentShow.show(this.nodeData.data.note, left, top + iconSize)
            }
        })
        node.on('mouseout', () => {
            if (!this.mindMap.opt.customNoteContentShow) {
                this.noteEl.style.display = 'none'
            } else {
                this.mindMap.opt.customNoteContentShow.hide()
            }
        })
        return {
            node,
            width: iconSize,
            height: iconSize
        }
    }

    /** 
     * javascript comment 
     * @Author: 王林 
     * @Date: 2022-09-12 22:02:07 
     * @Desc: 获取节点形状 
     */
    getShape() {
        return this.style.getStyle('shape', false, false)
    }

    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-04-09 11:10:11 
     * @Desc: 定位节点内容
     */
    layout() {
        let {
            width,
            height,
            textContentItemMargin
        } = this
        let { paddingY } = this.getPaddingVale()
        paddingY += this.shapePadding.paddingY
        // 创建组
        this.group = new G()
        // 概要节点添加一个带所属节点id的类名
        if (this.isGeneralization && this.generalizationBelongNode) {
            this.group.addClass('generalization_' + this.generalizationBelongNode.uid)
        }
        this.draw.add(this.group)
        this.update(true)
        // 节点形状
        const shape = this.getShape()
        this.style[shape === 'rectangle' ? 'rect' : 'shape'](this.shapeInstance.createShape())
        // 图片节点
        let imgHeight = 0
        if (this._imgData) {
            imgHeight = this._imgData.height
            this.group.add(this._imgData.node)
            this._imgData.node.cx(width / 2).y(paddingY)
        }
        // 内容节点
        let textContentNested = new G()
        let textContentOffsetX = 0
        // icon
        let iconNested = new G()
        if (this._iconData && this._iconData.length > 0) {
            let iconLeft = 0
            this._iconData.forEach((item) => {
                item.node.x(textContentOffsetX + iconLeft).y((this._rectInfo.textContentHeight - item.height) / 2)
                iconNested.add(item.node)
                iconLeft += item.width + textContentItemMargin
            })
            textContentNested.add(iconNested)
            textContentOffsetX += iconLeft
        }
        // 文字
        if (this._textData) {
            this._textData.node.x(textContentOffsetX).y(0)
            textContentNested.add(this._textData.node)
            textContentOffsetX += this._textData.width + textContentItemMargin
        }
        // 超链接
        if (this._hyperlinkData) {
            this._hyperlinkData.node.x(textContentOffsetX).y((this._rectInfo.textContentHeight - this._hyperlinkData.height) / 2)
            textContentNested.add(this._hyperlinkData.node)
            textContentOffsetX += this._hyperlinkData.width + textContentItemMargin
        }
        // 标签
        let tagNested = new G()
        if (this._tagData && this._tagData.length > 0) {
            let tagLeft = 0
            this._tagData.forEach((item) => {
                item.node.x(textContentOffsetX + tagLeft).y((this._rectInfo.textContentHeight - item.height) / 2)
                tagNested.add(item.node)
                tagLeft += item.width + textContentItemMargin
            })
            textContentNested.add(tagNested)
            textContentOffsetX += tagLeft
        }
        // 备注
        if (this._noteData) {
            this._noteData.node.x(textContentOffsetX).y((this._rectInfo.textContentHeight - this._noteData.height) / 2)
            textContentNested.add(this._noteData.node)
            textContentOffsetX += this._noteData.width
        }
        // 文字内容整体
        textContentNested.translate(
            width / 2 - textContentNested.bbox().width / 2,
            imgHeight + paddingY + (imgHeight > 0 && this._rectInfo.textContentHeight > 0 ? this.blockContentMargin : 0)
        )
        this.group.add(textContentNested)
        // 单击事件，选中节点
        this.group.on('click', (e) => {
            this.mindMap.emit('node_click', this, e)
            this.active(e)
        })
        this.group.on('mousedown', (e) => {
            e.stopPropagation()
            this.mindMap.emit('node_mousedown', this, e)
        })
        this.group.on('mouseup', (e) => {
            e.stopPropagation()
            this.mindMap.emit('node_mouseup', this, e)
        })
        // 双击事件
        this.group.on('dblclick', (e) => {
            if (this.mindMap.opt.readonly) {
                return
            }
            e.stopPropagation()
            this.mindMap.emit('node_dblclick', this, e)
        })
        // 右键菜单事件
        this.group.on('contextmenu', (e) => {
            if (this.mindMap.opt.readonly || this.isGeneralization) {
                return
            }
            e.stopPropagation()
            e.preventDefault()
            if (this.nodeData.data.isActive) {
                this.renderer.clearActive()
            }
            this.active(e)
            this.mindMap.emit('node_contextmenu', e, this)
        })
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-07-10 16:44:22 
     * @Desc: 激活节点 
     */
    active(e) {
        if (this.mindMap.opt.readonly) {
            return
        }
        e && e.stopPropagation()
        if (this.nodeData.data.isActive) {
            return
        }
        this.mindMap.emit('before_node_active', this, this.renderer.activeNodeList)
        this.renderer.clearActive()
        this.mindMap.execCommand('SET_NODE_ACTIVE', this, true)
        this.renderer.addActiveNode(this)
        this.mindMap.emit('node_active', this, this.renderer.activeNodeList)
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-07-04 20:20:09 
     * @Desc: 渲染节点到画布，会移除旧的，创建新的
     */
    renderNode() {
        // 连线
        this.renderLine()
        this.removeAllEvent()
        this.removeAllNode()
        this.createNodeData()
        this.layout()
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-07-04 22:47:01 
     * @Desc: 更新节点
     */
    update(layout = false) {
        if (!this.group) {
            return
        }
        // 需要移除展开收缩按钮
        if (this._expandBtn && this.nodeData.children.length <= 0) {
            this.removeExpandBtn()
        } else if (!this._expandBtn && this.nodeData.children.length > 0) {// 需要添加展开收缩按钮
            this.renderExpandBtn()
        } else {
            this.updateExpandBtnPos()
        }
        this.renderGeneralization()
        let t = this.group.transform()
        if (!layout) {
            this.group.animate(300).translate(this.left - t.translateX, this.top - t.translateY)
        } else {
            this.group.translate(this.left - t.translateX, this.top - t.translateY)
        }
    }

    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-04-07 13:55:58 
     * @Desc: 递归渲染 
     */
    render() {
        // 节点
        if (this.initRender) {
            this.initRender = false
            this.renderNode()
        } else {
            // 连线
            this.renderLine()
            this.update()
        }
        // 子节点
        if (this.children && this.children.length && this.nodeData.data.expand !== false) {
            asyncRun(this.children.map((item) => {
                return () =>{
                    item.render()
                }
            }))
        }
        // 手动插入的节点立即获得焦点并且开启编辑模式
        if (this.nodeData.inserting) {
            delete this.nodeData.inserting
            this.active()
            this.mindMap.emit('node_dblclick', this)
        }
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-07-10 09:24:55 
     * @Desc: 递归删除 
     */
    remove() {
        this.initRender = true
        this.removeAllEvent()
        this.removeAllNode()
        this.removeLine()
        // 子节点
        if (this.children && this.children.length) {
            asyncRun(this.children.map((item) => {
                return () =>{
                    item.remove()
                }
            }))
        }
    }

    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-11-23 18:39:14 
     * @Desc: 隐藏节点 
     */
    hide() {
        this.group.hide()
        this.hideGeneralization()
        if (this.parent) {
            let index = this.parent.children.indexOf(this)
            this.parent._lines[index].hide()
        }
        // 子节点
        if (this.children && this.children.length) {
            asyncRun(this.children.map((item) => {
                return () =>{
                    item.hide()
                }
            }))
        }
    }

    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-11-23 18:39:14 
     * @Desc: 显示节点 
     */
    show() {
        if (!this.group) {
            return;
        }
        this.group.show()
        this.showGeneralization()
        if (this.parent) {
            let index = this.parent.children.indexOf(this)
            this.parent._lines[index] && this.parent._lines[index].show()
        }
        // 子节点
        if (this.children && this.children.length) {
            asyncRun(this.children.map((item) => {
                return () =>{
                    item.show()
                }
            }))
        }
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-04-10 22:01:53 
     * @Desc: 连线 
     */
    renderLine(deep = false) {
        if (this.nodeData.data.expand === false) {
            return
        }
        let childrenLen = this.nodeData.children.length
        if (childrenLen > this._lines.length) {
            // 创建缺少的线
            new Array(childrenLen - this._lines.length).fill(0).forEach(() => {
                this._lines.push(this.draw.path())
            })
        } else if (childrenLen < this._lines.length) {
            // 删除多余的线
            this._lines.slice(childrenLen).forEach((line) => {
                line.remove()
            })
            this._lines = this._lines.slice(0, childrenLen)
        }
        // 画线
        this.renderer.layout.renderLine(this, this._lines, (line, node) => {
            // 添加样式
            this.styleLine(line, node)
        })
        // 子级的连线也需要更新
        if (deep && this.children && this.children.length > 0) {
            this.children.forEach((item) => {
                item.renderLine(deep)
            })
        }
    }

    /** 
     * javascript comment 
     * @Author: flydreame 
     * @Date: 2022-09-17 12:41:29 
     * @Desc: 设置连线样式 
     */
    styleLine(line, node) {
        let width = node.getSelfInhertStyle('lineWidth') || node.getStyle('lineWidth', true)
        let color = node.getSelfInhertStyle('lineColor') || node.getStyle('lineColor', true)
        let dasharray = node.getSelfInhertStyle('lineDasharray') || node.getStyle('lineDasharray', true)
        this.style.line(line, {
            width,
            color,
            dasharray,
        })
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-07-10 16:40:21 
     * @Desc: 移除连线 
     */
    removeLine() {
        this._lines.forEach((line) => {
            line.remove()
        })
        this._lines = []
    }

    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2022-08-01 09:27:30 
     * @Desc: 检查是否存在概要 
     */
    checkHasGeneralization() {
        return !!this.nodeData.data.generalization
    }

    /** 
     * @Author: 王林 
     * @Date: 2022-07-31 09:41:28 
     * @Desc: 创建概要节点 
     */
    createGeneralizationNode() {
        if (this.isGeneralization || !this.checkHasGeneralization()) {
            return
        }
        if (!this._generalizationLine) {
            this._generalizationLine = this.draw.path()
        }
        if (!this._generalizationNode) {
            this._generalizationNode = new Node({
                data: {
                    data: this.nodeData.data.generalization
                },
                uid: this.mindMap.uid++,
                renderer: this.renderer,
                mindMap: this.mindMap,
                draw: this.draw,
                isGeneralization: true
            })
            this._generalizationNodeWidth = this._generalizationNode.width
            this._generalizationNodeHeight = this._generalizationNode.height
            this._generalizationNode.generalizationBelongNode = this
            if (this.nodeData.data.generalization.isActive) {
                this.renderer.addActiveNode(this._generalizationNode)
            }
        }
    }

    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2022-08-01 15:38:52 
     * @Desc: 更新概要节点 
     */
    updateGeneralization() {
        this.removeGeneralization()
        this.createGeneralizationNode()
    }

    /** 
     * @Author: 王林 
     * @Date: 2022-07-30 08:35:51 
     * @Desc: 渲染概要节点 
     */
    renderGeneralization() {
        if (this.isGeneralization) {
            return
        }
        if (!this.checkHasGeneralization()) {
            this.removeGeneralization()
            this._generalizationNodeWidth = 0
            this._generalizationNodeHeight = 0
            return
        }
        if (this.nodeData.data.expand === false) {
            this.removeGeneralization()
            return
        }
        this.createGeneralizationNode()
        this.renderer.layout.renderGeneralization(this, this._generalizationLine, this._generalizationNode)
        this.style.generalizationLine(this._generalizationLine)
        this._generalizationNode.render()
    }

    /** 
     * @Author: 王林 
     * @Date: 2022-07-30 13:11:27 
     * @Desc: 删除概要节点 
     */
    removeGeneralization() {
        if (this._generalizationLine) {
            this._generalizationLine.remove()
            this._generalizationLine = null
        }
        if (this._generalizationNode) {
            // 删除概要节点时要同步从激活节点里删除
            this.renderer.removeActiveNode(this._generalizationNode)
            this._generalizationNode.remove()
            this._generalizationNode = null
        }
        // hack修复当激活一个节点时创建概要，然后立即激活创建的概要节点后会重复创建概要节点并且无法删除的问题
        if (this.generalizationBelongNode) {
            this.draw.find('.generalization_' + this.generalizationBelongNode.uid).remove()
        }
    }

    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2022-08-01 09:56:46 
     * @Desc: 隐藏概要节点 
     */
    hideGeneralization() {
        if (this._generalizationLine) {
            this._generalizationLine.hide()
        }
        if (this._generalizationNode) {
            this._generalizationNode.hide()
        }
    }

    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2022-08-01 09:57:42 
     * @Desc: 显示概要节点 
     */
    showGeneralization() {
        if (this._generalizationLine) {
            this._generalizationLine.show()
        }
        if (this._generalizationNode) {
            this._generalizationNode.show()
        }
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-07-10 17:59:14 
     * @Desc: 创建或更新展开收缩按钮内容 
     */
    updateExpandBtnNode() {
        if (this._expandBtn) {
            this._expandBtn.clear()
        }
        let iconSvg
        if (this.nodeData.data.expand === false) {
            iconSvg = btnsSvg.open
        } else {
            iconSvg = btnsSvg.close
        }
        let node = SVG(iconSvg).size(this.expandBtnSize, this.expandBtnSize)
        let fillNode = new Circle().size(this.expandBtnSize)
        node.x(0).y(-this.expandBtnSize / 2)
        fillNode.x(0).y(-this.expandBtnSize / 2)
        this.style.iconBtn(node, fillNode)
        if (this._expandBtn) this._expandBtn.add(fillNode).add(node)
    }

    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-07-12 18:18:13 
     * @Desc: 更新展开收缩按钮位置 
     */
    updateExpandBtnPos() {
        if (!this._expandBtn) {
            return
        }
        this.renderer.layout.renderExpandBtn(this, this._expandBtn)
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-04-11 19:47:01 
     * @Desc: 展开收缩按钮 
     */
    renderExpandBtn() {
        if (!this.nodeData.children || this.nodeData.children.length <= 0 || this.isRoot) {
            return
        }
        this._expandBtn = new G()
        this.updateExpandBtnNode()
        this._expandBtn.on('mouseover', (e) => {
            e.stopPropagation()
            this._expandBtn.css({
                cursor: 'pointer'
            })
        })
        this._expandBtn.on('mouseout', (e) => {
            e.stopPropagation()
            this._expandBtn.css({
                cursor: 'auto'
            })
        })
        this._expandBtn.on('click', (e) => {
            e.stopPropagation()
            // 展开收缩
            this.mindMap.execCommand('SET_NODE_EXPAND', this, !this.nodeData.data.expand)
            this.mindMap.emit('expand_btn_click', this)
        })
        this.group.add(this._expandBtn)
        this.updateExpandBtnPos()
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-07-11 13:26:00 
     * @Desc: 移除展开收缩按钮 
     */
    removeExpandBtn() {
        if (this._expandBtn) {
            this._expandBtn.off(['mouseover', 'mouseout', 'click'])
            this._expandBtn.clear()
            this._expandBtn.remove()
            this._expandBtn = null
        }
    }

    
    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-11-25 09:51:37 
     * @Desc: 检测当前节点是否是某个节点的祖先节点
     */
    isParent(node) {
        if (this === node) {
            return false
        }
        let parent = node.parent
        while(parent) {
            if (this === parent) {
                return true
            }
            parent = parent.parent
        }
        return false
    }

    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-11-25 10:32:34 
     * @Desc: 检测当前节点是否是某个节点的兄弟节点
     */
    isBrother(node) {
        if (!this.parent || this === node) {
            return false
        }
        return this.parent.children.find((item) => {
            return item === node
        })
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
        }
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
     * javascript comment 
     * @Author: flydreame 
     * @Date: 2022-09-17 11:21:15 
     * @Desc: 获取自定义样式 
     */
    getSelfStyle(prop) {
        return this.style.getSelfStyle(prop)
    }

    /** 
     * javascript comment 
     * @Author: flydreame 
     * @Date: 2022-09-17 11:21:26 
     * @Desc:  获取最近一个存在自身自定义样式的祖先节点的自定义样式
     */
    getParentSelfStyle(prop) {
        if (this.parent) {
            return this.parent.getSelfStyle(prop) || this.parent.getParentSelfStyle(prop)
        }
        return null
    }

    /** 
     * javascript comment 
     * @Author: flydreame 
     * @Date: 2022-09-17 12:15:30 
     * @Desc: 获取自身可继承的自定义样式 
     */
    getSelfInhertStyle(prop) {
        return this.getSelfStyle(prop) // 自身
        || this.getParentSelfStyle(prop) // 父级
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-05-04 22:18:07 
     * @Desc: 修改某个样式 
     */
    setStyle(prop, value, isActive) {
        this.mindMap.execCommand('SET_NODE_STYLE', this, prop, value, isActive)
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-06-22 22:04:02 
     * @Desc: 获取数据 
     */
    getData(key) {
        return key ? this.nodeData.data[key] || '' : this.nodeData.data
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-06-22 22:12:01 
     * @Desc: 设置数据 
     */
    setData(data = {}) {
        this.mindMap.execCommand('SET_NODE_DATA', this, data)
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-07-10 08:41:28 
     * @Desc: 设置文本 
     */
    setText(text) {
        this.mindMap.execCommand('SET_NODE_TEXT', this, text)
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-07-10 08:42:19 
     * @Desc: 设置图片 
     */
    setImage(imgData) {
        this.mindMap.execCommand('SET_NODE_IMAGE', this, imgData)
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-07-10 08:47:29 
     * @Desc: 设置图标 
     */
    setIcon(icons) {
        this.mindMap.execCommand('SET_NODE_ICON', this, icons)
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-07-10 08:50:41 
     * @Desc: 设置超链接 
     */
    setHyperlink(link, title) {
        this.mindMap.execCommand('SET_NODE_HYPERLINK', this, link, title)
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-07-10 08:53:24 
     * @Desc: 设置备注 
     */
    setNote(note) {
        this.mindMap.execCommand('SET_NODE_NOTE', this, note)
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-07-10 08:55:08 
     * @Desc: 设置标签 
     */
    setTag(tag) {
        this.mindMap.execCommand('SET_NODE_TAG', this, tag)
    }

    /** 
     * javascript comment 
     * @Author: 王林 
     * @Date: 2022-09-12 21:47:45 
     * @Desc: 设置形状 
     */
    setShape(shape) {
        this.mindMap.execCommand('SET_NODE_SHAPE', this, shape)
    }
}

export default Node
