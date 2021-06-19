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
        // 渲染树
        this.renderTree = renderer.renderTree
        // 主题配置
        this.themeConfig = this.mindMap.themeConfig
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
    drawLine() {
        throw new Error('【drawLine】方法为必要方法，需要子类进行重写！')
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-04-12 22:42:08 
     * @Desc: 定位显示展开收缩按钮 
     */
    drawIcon() {
        throw new Error('【drawIcon】方法为必要方法，需要子类进行重写！')
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
}

export default Base