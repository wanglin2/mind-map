import {
    getStrWithBrFromHtml
} from './utils'

/** 
 * javascript comment 
 * @Author: 王林25 
 * @Date: 2021-06-19 11:11:28 
 * @Desc: 节点文字编辑类 
 */
export default class TextEdit {
    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-06-19 11:22:57 
     * @Desc: 构造函数 
     */
    constructor(renderer) {
        this.renderer = renderer
        this.mindMap = renderer.mindMap
        // 文本编辑框
        this.textEditNode = null
        // 文本编辑框是否显示
        this.showTextEdit = false
        this.bindEvent()
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-04-24 13:27:04 
     * @Desc: 事件 
     */
    bindEvent() {
        this.show = this.show.bind(this)
        // 节点双击事件
        this.mindMap.on('node_dblclick', this.show)
        // 点击事件
        this.mindMap.on('draw_click', () => {
            // 隐藏文本编辑框
            this.hideEditTextBox()
        })
        // 展开收缩按钮点击事件
        this.mindMap.on('expand_btn_click', () => {
            this.hideEditTextBox()
        })
        // 节点激活前事件
        this.mindMap.on('before_node_active', () => {
            this.hideEditTextBox()
        })
        // 注册回车快捷键
        this.mindMap.keyCommand.addShortcut('Enter', () => {
            this.hideEditTextBox()
        })
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-04-13 22:15:56 
     * @Desc: 显示文本编辑框 
     */
    show(node) {
        if (!node.nodeData.data.text) {
            return;
        }
        this.showEditTextBox(node, node.textNode.node.node.getBoundingClientRect())
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
        this.textEditNode.innerHTML = node.nodeData.data.text.split(/\n/img).join('<br>')
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
        this.renderer.activeNodeList.forEach((node) => {
            let str = getStrWithBrFromHtml(this.textEditNode.innerHTML)
            node.nodeData.data.text = str
            this.mindMap.render()
        })
        this.mindMap.emit('hide_text_edit', this.textEditNode, this.renderer.activeNodeList)
        this.textEditNode.style.display = 'none'
        this.textEditNode.innerHTML = ''
        this.textEditNode.style.fontFamily = 'inherit'
        this.textEditNode.style.fontSize = 'inherit'
        this.textEditNode.style.fontWeight = 'normal'
        this.showTextEdit = false
    }
}