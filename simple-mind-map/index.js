import View from './src/View'
import Event from './src/Event'
import Render from './src/Render'
import merge from 'deepmerge'
import theme from './src/themes'
import Style from './src/Style'
import KeyCommand from './src/KeyCommand'
import Command from './src/Command'
import BatchExecution from './src/BatchExecution'
import Export from './src/Export'
import Select from './src/Select'
import {
    layoutValueList
} from './src/utils/constant'
import {
    SVG
} from '@svgdotjs/svg.js'

// 默认选项配置
const defaultOpt = {
    // 布局
    layout: 'logicalStructure',
    // 主题
    theme: 'default', // 内置主题：default（默认主题）
    // 主题配置，会和所选择的主题进行合并
    themeConfig: {},
    // 放大缩小的增量比例
    scaleRatio: 0.1,
    // 最多显示几个标签
    maxTag: 5,
    // 导出图片时的内边距
    exportPadding: 20,
    // 展开收缩按钮尺寸
    expandBtnSize: 20,
    // 节点里图片和文字的间距
    imgTextMargin: 5,
    // 节点里各种文字信息的间距，如图标和文字的间距
    textContentMargin: 2,
    // 多选节点时鼠标移动到边缘时的画布移动偏移量
    selectTranslateStep: 3,
    // 多选节点时鼠标移动距边缘多少距离时开始偏移
    selectTranslateLimit: 20
}

/** 
 * javascript comment 
 * @Author: 王林25 
 * @Date: 2021-04-06 11:18:47 
 * @Desc: 思维导图 
 */
class MindMap {
    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-04-06 11:19:01 
     * @Desc: 构造函数 
     */
    constructor(opt = {}) {
        // 合并选项
        this.opt = this.handleOpt(merge(defaultOpt, opt))

        // 容器元素
        this.el = this.opt.el
        this.elRect = this.el.getBoundingClientRect()

        // 画布宽高
        this.width = this.elRect.width
        this.height = this.elRect.height

        // 画布
        this.svg = SVG().addTo(this.el).size(this.width, this.height)
        this.draw = this.svg.group()

        // 节点id
        this.uid = 0

        // 初始化主题
        this.initTheme()

        // 事件类
        this.event = new Event({
            mindMap: this
        })

        // 按键类
        this.keyCommand = new KeyCommand({
            mindMap: this
        })

        // 命令类
        this.command = new Command({
            mindMap: this
        })

        // 渲染类
        this.renderer = new Render({
            mindMap: this
        })

        // 视图操作类
        this.view = new View({
            mindMap: this,
            draw: this.draw
        })

        // 导出类
        this.doExport = new Export({
            mindMap: this
        })

        // 选择类
        this.select = new Select({
            mindMap: this
        })

        // 批量执行类
        this.batchExecution = new BatchExecution()

        // 初始渲染
        this.reRender()
        setTimeout(() => {
            this.command.addHistory()
        }, 0)
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-07-01 22:15:22 
     * @Desc: 配置参数处理 
     */
    handleOpt(opt) {
        // 检查布局配置
        if (!layoutValueList.includes(opt.layout)) {
            opt.layout = 'logicalStructure'
        }
        // 检查主题配置
        opt.theme = opt.theme && theme[opt.theme] ? opt.theme : 'default'
        return opt
    }

    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-04-06 18:47:29 
     * @Desc: 渲染，部分渲染
     */
    render() {
        this.batchExecution.push('render', () => {
            this.initTheme()
            this.renderer.reRender = false
            this.renderer.render()
        })
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-07-08 22:05:11 
     * @Desc: 重新渲染 
     */
    reRender() {
        this.batchExecution.push('render', () => {
            this.draw.clear()
            this.initTheme()
            this.renderer.reRender = true
            this.renderer.render()
        })
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-07-11 21:16:52 
     * @Desc: 容器尺寸变化，调整尺寸 
     */
    resize() {
        this.elRect = this.el.getBoundingClientRect()
        this.width = this.elRect.width
        this.height = this.elRect.height
        this.svg.size(this.width, this.height)
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-04-24 13:25:50 
     * @Desc: 监听事件 
     */
    on(event, fn) {
        this.event.on(event, fn)
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-04-24 13:51:35 
     * @Desc: 触发事件 
     */
    emit(event, ...args) {
        this.event.emit(event, ...args)
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-04-24 13:53:54 
     * @Desc: 解绑事件 
     */
    off(event, fn) {
        this.event.off(event, fn)
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-05-05 13:32:43 
     * @Desc: 设置主题
     */
    initTheme() {
        // 合并主题配置
        this.themeConfig = merge(theme[this.opt.theme], this.opt.themeConfig)
        // 设置背景样式
        Style.setBackgroundStyle(this.el, this.themeConfig)
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-05-05 13:52:08 
     * @Desc: 设置主题 
     */
    setTheme(theme) {
        this.opt.theme = theme
        this.reRender()
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-06-25 23:52:37 
     * @Desc: 获取当前主题 
     */
    getTheme() {
        return this.opt.theme
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-05-05 13:50:17 
     * @Desc: 设置主题配置 
     */
    setThemeConfig(config) {
        this.opt.themeConfig = config
        this.reRender()
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-05-05 14:01:29 
     * @Desc: 获取某个主题配置值 
     */
    getThemeConfig(prop) {
        return prop === undefined ? this.themeConfig : this.themeConfig[prop]
    }

    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-07-13 16:17:06 
     * @Desc: 获取当前布局结构 
     */
    getLayout() {
        return this.opt.layout
    }

    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-07-13 16:17:33 
     * @Desc: 设置布局结构 
     */
    setLayout(layout) {
        // 检查布局配置
        if (!layoutValueList.includes(layout)) {
            layout = 'logicalStructure'
        }
        this.opt.layout = layout
        this.renderer.setLayout()
        this.render()
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-05-04 13:01:00 
     * @Desc: 执行命令 
     */
    execCommand(...args) {
        this.command.exec(...args)
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-07-01 22:06:38 
     * @Desc: 导出 
     */
    async export (...args) {
        let result = await this.doExport.export(...args)
        return result
    }
}

export default MindMap