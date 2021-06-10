import merge from 'deepmerge'
import LogicalStructure from './layouts/LogicalStructure'
import { getStrWithBrFromHtml } from './Utils'

// 布局列表
const layouts = {
    logicalStructure: LogicalStructure
}

/** 
 * javascript comment 
 * @Author: 王林25 
 * @Date: 2021-04-08 16:25:07 
 * @Desc: 渲染
 */
class Render {
    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-04-08 16:25:32 
     * @Desc: 构造函数 
     */
    constructor(opt = {}) {
        this.opt = opt
        this.mindMap = opt.mindMap
        this.themeConfig = this.mindMap.themeConfig
        this.draw = this.mindMap.draw
        // 渲染树，操作过程中修改的都是这里的数据
        this.renderTree = merge({}, this.mindMap.opt.data || {})
        // 当前激活的节点列表
        this.activeNodeList = []
        // 根节点
        this.root = null
        // 文本编辑框
        this.textEditNode = null
        // 文本编辑框是否显示
        this.showTextEdit = false
        // 布局
        this.layout = new (layouts[this.mindMap.opt.layout] ? layouts[this.mindMap.opt.layout] : layouts.logicalStructure)({
            mindMap: this.mindMap,
            renderer: this,
            renderTree: this.renderTree,
            themeConfig: this.mindMap.themeConfig,
            draw: this.mindMap.draw
        })
        // 绑定事件
        this.bindEvent()
        // 注册命令
        this.registerCommands()
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-04-24 13:27:04 
     * @Desc: 事件 
     */
    bindEvent() {
        this.mindMap.on('draw_click', () => {
            // 隐藏文本编辑框
            this.hideEditTextBox()
            // 清除激活状态
            if (this.activeNodeList.length > 0) {
                this.clearActive()
                this.mindMap.render()
                this.mindMap.emit('node_active', null, [])
            }
        })
        this.mindMap.on('expand_btn_click', () => {
            this.hideEditTextBox()
        })
        this.mindMap.on('before_node_active', () => {
            this.hideEditTextBox()
        })
        this.mindMap.keyCommand.addShortcut('Enter', () => {
            this.hideEditTextBox()
        })
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-05-04 13:19:06 
     * @Desc: 注册命令 
     */
    registerCommands() {
        this.insertNode = this.insertNode.bind(this)
        this.mindMap.command.add('INSERT_NODE', this.insertNode)
        this.insertChildNode = this.insertChildNode.bind(this)
        this.mindMap.command.add('INSERT_CHILD_NODE', this.insertChildNode)
        this.removeNode = this.removeNode.bind(this)
        this.mindMap.command.add('REMOVE_NODE', this.removeNode)
        this.updateNodeData = this.updateNodeData.bind(this)
        this.mindMap.command.add('UPDATE_NODE_DATA', this.updateNodeData)
    }

    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-04-08 16:27:55 
     * @Desc:  渲染
     */
    render() {
        this.root = this.layout.doLayout()
        this.root.render()
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-04-12 22:45:01 
     * @Desc: 清楚当前激活的节点 
     */
    clearActive() {
        this.activeNodeList.forEach((item) => {
            this.mindMap.execCommand('UPDATE_NODE_DATA', item, {
                isActive: false
            })
        })
        this.activeNodeList = []
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-05-04 13:46:08 
     * @Desc: 获取节点在同级里的索引位置 
     */
    getNodeIndex(node) {
        return node.parent ? node.parent.children.findIndex((item) => {
            return item === node
        }) : 0
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-05-04 13:19:54 
     * @Desc: 插入同级节点 
     */
    insertNode() {
        if (this.activeNodeList.length <= 0) {
            return;
        }
        let first = this.activeNodeList[0]
        if (first.isRoot) {
            this.insertChildNode()
        } else {
            let index = this.getNodeIndex(first)
            first.parent.originData.children.splice(index + 1, 0, {
                "data": {
                    "text": "分支主题",
                    "expand": true
                },
                "children": []
            })
            this.mindMap.render()
        }
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-05-04 13:31:02 
     * @Desc: 插入子节点 
     */
    insertChildNode() {
        if (this.activeNodeList.length <= 0) {
            return;
        }
        let first = this.activeNodeList[0]
        first.originData.children.push({
            "data": {
                "text": "分支主题",
                "expand": true
            },
            "children": []
        })
        this.mindMap.render()
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-05-04 13:40:39 
     * @Desc: 移除节点 
     */
    removeNode() {
        if (this.activeNodeList.length <= 0) {
            return;
        }
        this.activeNodeList.forEach((item) => {
            if (item.isRoot) {
                item.children = []
                item.originData.children = []
            } else {
                let index = this.getNodeIndex(item)
                item.parent.children.splice(index, 1)
                item.parent.originData.children.splice(index, 1)
            }
        })
        this.clearActive()
        this.mindMap.render()
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-05-04 14:19:48 
     * @Desc: 更新节点数据 
     */
    updateNodeData(node, data) {
        Object.keys(data).forEach((key) => {
            node.data[key] = data[key]
        })
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-04-13 22:13:02 
     * @Desc: 显示文本编辑框 
     */
    showEditTextBox(node, rect) {
        if (!this.textEditNode) {
            this.textEditNode = document.createElement('div')
            this.textEditNode.style.cssText = `position:fixed;box-sizing: border-box;background-color:#fff;box-shadow: 0 0 20px rgba(0,0,0,.5);padding: 3px 5px;margin-left: -5px;margin-top: -3px;outline: none;`
            this.textEditNode.setAttribute('contenteditable', true)
            document.body.appendChild(this.textEditNode)
        }
        node.style.domText(this.textEditNode)
        this.textEditNode.innerHTML = node.data.text.split(/\n/img).join('<br>')
        this.textEditNode.style.minWidth = rect.width + 10 + 'px'
        this.textEditNode.style.minHeight = rect.height + 6 + 'px'
        this.textEditNode.style.left = rect.left + 'px'
        this.textEditNode.style.top = rect.top + 'px'
        this.textEditNode.style.display = 'block'
        this.showTextEdit = true
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-04-24 13:48:16 
     * @Desc: 隐藏文本编辑框 
     */
    hideEditTextBox() {
        if (!this.showTextEdit) {
            return
        }
        this.activeNodeList.forEach((node) => {
            let str = getStrWithBrFromHtml(this.textEditNode.innerHTML)
            node.data.text = str
            this.mindMap.render()
        })
        this.mindMap.emit('hide_text_edit', this.textEditNode, this.activeNodeList)
        this.textEditNode.style.display = 'none'
        this.textEditNode.innerHTML = ''
        this.textEditNode.style.fontFamily = 'inherit'
        this.textEditNode.style.fontSize = 'inherit'
        this.textEditNode.style.fontWeight = 'normal'
        this.showTextEdit = false
    }
}

export default Render