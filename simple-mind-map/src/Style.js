import { tagColorList } from './utils/constant';
const rootProp = ['paddingX', 'paddingY']

/** 
 * @Author: 王林 
 * @Date: 2021-04-11 10:09:08 
 * @Desc: 样式类 
 */
class Style {
    /** 
     * @Author: 王林 
     * @Date: 2021-04-11 16:01:53 
     * @Desc:  设置背景样式
     */
    static setBackgroundStyle(el, themeConfig) {
        let { backgroundColor, backgroundImage, backgroundRepeat, backgroundSize, backgroundPosition } = themeConfig
        el.style.backgroundColor = backgroundColor
        if (backgroundImage) {
            el.style.backgroundImage = `url(${backgroundImage})`
            el.style.backgroundRepeat = backgroundRepeat
            el.style.backgroundSize = backgroundSize
            el.style.backgroundPosition = backgroundPosition
        }
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-04-11 10:10:11 
     * @Desc: 构造函数 
     */
    constructor(ctx, themeConfig) {
        this.ctx = ctx
        this.themeConfig = themeConfig
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-04-11 12:02:55 
     * @Desc: 合并样式 
     */
    merge(prop, root, isActive) {
        // 三级及以下节点
        let defaultConfig = this.themeConfig.node
        if (root || rootProp.includes(prop)) {// 直接使用最外层样式
            defaultConfig = this.themeConfig
        } else if (this.ctx.layerIndex === 0) {// 根节点
            defaultConfig = this.themeConfig.root
        } else if (this.ctx.layerIndex === 1) {// 二级节点
            defaultConfig = this.themeConfig.second
        }
        // 激活状态
        if (isActive !== undefined ? isActive : this.ctx.nodeData.data.isActive) {
            if (this.ctx.nodeData.data.activeStyle && this.ctx.nodeData.data.activeStyle[prop] !== undefined) {
                return this.ctx.nodeData.data.activeStyle[prop];
            } else if (defaultConfig.active && defaultConfig.active[prop]) {
                return defaultConfig.active[prop]
            }
        }
        // 优先使用节点本身的样式
        return this.ctx.nodeData.data[prop] !== undefined ? this.ctx.nodeData.data[prop] : defaultConfig[prop]
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-04-11 10:12:56 
     * @Desc: 矩形 
     */
    rect(node) {
        node.fill({
            color: this.merge('fillColor')
        }).stroke({
            color: this.merge('borderColor'),
            width: this.merge('borderWidth'),
            dasharray: this.merge('borderDasharray')
        }).radius(this.merge('borderRadius'))
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-04-11 12:07:59 
     * @Desc: 文字 
     */
    text(node) {
        node.fill({
            color: this.merge('color')
        }).css({
            'font-family': this.merge('fontFamily'),
            'font-size': this.merge('fontSize'),
            'font-weight': this.merge('fontWeight'),
            'font-style': this.merge('fontStyle'),
            'text-decoration': this.merge('textDecoration')
        })
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-04-13 08:14:34 
     * @Desc: html文字节点 
     */
    domText(node) {
        node.style.fontFamily = this.merge('fontFamily')
        node.style.fontSize = this.merge('fontSize') + 'px'
        node.style.fontWeight = this.merge('fontWeight') || 'normal'
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-06-20 20:02:18 
     * @Desc: 标签文字 
     */
    tagText(node, index) {
        node.fill({
            color: tagColorList[index].color
        }).css({
            'font-size': '12px'
        })
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-06-20 21:04:11 
     * @Desc: 标签矩形 
     */
    tagRect(node, index) {
        node.fill({
            color: tagColorList[index].background
        })
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-04-11 14:50:49 
     * @Desc: 连线 
     */
    line(node) {
        node.stroke({ width: this.merge('lineWidth', true), color: this.merge('lineColor', true) }).fill({ color: 'none' })
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-04-11 20:03:59 
     * @Desc: 按钮 
     */
    iconBtn(node, fillNode) {
        node.fill({ color: '#808080' })
        fillNode.fill({ color: '#fff' })
    }
}

export default Style