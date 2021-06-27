import View from './src/View'
import Event from './src/Event'
import Render from './src/Render'
import merge from 'deepmerge'
import theme from './src/themes'
import Style from './src/Style'
import KeyCommand from './src/KeyCommand'
import Command from './src/Command'
import BatchExecution from './src/BatchExecution'
import {
    SVG
} from '@svgdotjs/svg.js'

// 默认选项
const defaultOpt = {
    // 布局
    layout: 'logicalStructure',
    // 主题
    theme: 'default', // 内置主题：default（默认主题）
    // 主题配置，会和所选择的主题进行合并
    themeConfig: {},
    // 放大缩小的增量比例，即step = scaleRatio * width|height
    scaleRatio: 0.1
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
        this.opt = merge(defaultOpt, opt)

        // 容器元素
        this.el = this.opt.el
        let {
            width,
            height
        } = this.el.getBoundingClientRect()

        // 画布宽高
        this.width = width
        this.height = height

        // 画笔
        this.draw = SVG().addTo(this.el).size(width, height)

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

        // 批量执行类
        this.batchExecution = new BatchExecution()

        // 初始渲染
        this.renderer.render()
        setTimeout(() => {
            this.command.addHistory()
        }, 0);
    }

    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-04-06 18:47:29 
     * @Desc: 渲染 
     */
    render() {
        this.batchExecution.push('render', () => {
            this.draw.clear()
            this.initTheme()
            this.renderer.render()
        })
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
        this.themeConfig = merge(this.opt.theme && theme[this.opt.theme] ? theme[this.opt.theme] : theme.default, this.opt.themeConfig)
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
        this.render()
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-06-25 23:52:37 
     * @Desc: 获取当前主题 
     */
    getTheme() {
        return this.opt.theme;
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-05-05 13:50:17 
     * @Desc: 设置主题配置 
     */
    setThemeConfig(config) {
        this.opt.themeConfig = config
        this.render()
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
     * @Author: 王林 
     * @Date: 2021-05-04 13:01:00 
     * @Desc: 执行命令 
     */
    execCommand(...args) {
        this.command.exec(...args)
    }
}

export default MindMap