import Style from './Style'
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
        // 是否是根节点
        this.isRoot = opt.isRoot === undefined ? false : opt.isRoot
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
        // 节点内容的容器
        this.group = null
        // 节点内容对象
        this._imgData = null
        this._iconData = null
        this._textData = null
        this._hyperlinkData = null
        this._tagData = null
        this._noteData = null
        this._expandBtn = null
        this._lines = []
        // 尺寸信息
        this._rectInfo = {
            imgContentWidth: 0,
            imgContentHeight: 0,
            textContentHeight: 0,
            textContentHeight: 0
        }
        // 各种文字信息的间距
        this._textContentItemMargin = this.mindMap.opt.textContentMargin
        // 图片和文字节点的间距
        this._blockContentMargin = this.mindMap.opt.imgTextMargin
        // 展开收缩按钮尺寸
        this._expandBtnSize = this.mindMap.opt.expandBtnSize
        // 初始渲染
        this._initRender = true
        // 更新的时候的钩子
        this.updateHooks = []
        // 初始化
        this.createNodeData()
        this.getSize()
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
            this.group.off(['click', 'dblclick', 'contextmenu'])
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
                return sum += cur.width + this._textContentItemMargin
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
                return sum += cur.width + this._textContentItemMargin
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
        }
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
            _textContentItemMargin
        } = this
        let { paddingY } = this.getPaddingVale()
        // 创建组
        this.group = new G()
        this.draw.add(this.group)
        this.update(true)
        // 节点矩形
        this.style.rect(this.group.rect(width, height))
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
                iconLeft += item.width + _textContentItemMargin
            })
            textContentNested.add(iconNested)
            textContentOffsetX += iconLeft
        }
        // 文字
        if (this._textData) {
            this._textData.node.x(textContentOffsetX).y(0)
            textContentNested.add(this._textData.node)
            textContentOffsetX += this._textData.width + _textContentItemMargin
        }
        // 超链接
        if (this._hyperlinkData) {
            this._hyperlinkData.node.x(textContentOffsetX).y((this._rectInfo.textContentHeight - this._hyperlinkData.height) / 2)
            textContentNested.add(this._hyperlinkData.node)
            textContentOffsetX += this._hyperlinkData.width + _textContentItemMargin
        }
        // 标签
        let tagNested = new G()
        if (this._tagData && this._tagData.length > 0) {
            let tagLeft = 0
            this._tagData.forEach((item) => {
                item.node.x(textContentOffsetX + tagLeft).y((this._rectInfo.textContentHeight - item.height) / 2)
                tagNested.add(item.node)
                tagLeft += item.width + _textContentItemMargin
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
            imgHeight + paddingY + (imgHeight > 0 && this._rectInfo.textContentHeight > 0 ? this._blockContentMargin : 0)
        )
        this.group.add(textContentNested)
        // 单击事件，选中节点
        this.group.on('click', (e) => {
            this.active(e)
        })
        // 双击事件
        this.group.on('dblclick', () => {
            this.mindMap.emit('node_dblclick', this)
        })
        // 右键菜单事件
        this.group.on('contextmenu', (e) => {
            e.stopPropagation()
            e.preventDefault()
        })
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-07-10 16:44:22 
     * @Desc: 激活节点 
     */
    active(e) {
        e.stopPropagation()
        if (this.nodeData.data.isActive) {
            return
        }
        this.mindMap.emit('before_node_active', this, this.renderer.activeNodeList)
        this.renderer.clearActive()
        this.mindMap.execCommand('SET_NODE_ACTIVE', this, !this.nodeData.data.isActive)
        this.renderer.addActiveNode(this)
        this.mindMap.emit('node_active', this, this.renderer.activeNodeList)
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-07-04 20:20:09 
     * @Desc: 渲染节点到画布，会移除旧的，创建新的
     */
    renderNode() {
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
        }
        if (!layout) {
            this.updateHooks.forEach((hook) => {
                hook(this)
            })
        }
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
        // 连线
        this.renderLine()
        // 节点
        if (this._initRender) {
            this._initRender = false
            this.renderNode()
        } else {
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
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-07-10 09:24:55 
     * @Desc: 递归删除 
     */
    remove() {
        this._initRender = true
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
     * @Author: 王林 
     * @Date: 2021-04-10 22:01:53 
     * @Desc: 连线 
     */
    renderLine() {
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
        this.renderer.layout.renderLine(this, this._lines)
        // 添加样式
        this._lines.forEach((line) => {
            this.style.line(line)
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
        let node = SVG(iconSvg).size(this._expandBtnSize, this._expandBtnSize)
        let fillNode = new Circle().size(this._expandBtnSize)
        node.x(0).y(-this._expandBtnSize / 2)
        fillNode.x(0).y(-this._expandBtnSize / 2)
        this.style.iconBtn(node, fillNode)
        this._expandBtn.add(fillNode).add(node)
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
        console.log('更新')
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
        this.renderer.layout.renderExpandBtn(this, this._expandBtn)
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
}

export default Node