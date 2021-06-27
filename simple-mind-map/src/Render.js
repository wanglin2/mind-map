import merge from 'deepmerge'
import LogicalStructure from './layouts/LogicalStructure'
import MindMap from './layouts/MindMap'
import CatalogOrganization from './layouts/CatalogOrganization';
import TextEdit from './TextEdit'

// 布局列表
const layouts = {
    // 逻辑结构图
    logicalStructure: LogicalStructure,
    // 思维导图
    mindMap: MindMap,
    // 目录组织图
    catalogOrganization: CatalogOrganization
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
        this.textEdit = new TextEdit(this)
        // 布局
        this.layout = new (layouts[this.mindMap.opt.layout] ? layouts[this.mindMap.opt.layout] : layouts.logicalStructure)(this)
        // 绑定事件
        this.bindEvent()
        // 注册命令
        this.registerCommands()
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-06-20 10:34:06 
     * @Desc:  绑定事件
     */
    bindEvent() {
        // 点击事件
        this.mindMap.on('draw_click', () => {
            // 清除激活状态
            if (this.activeNodeList.length > 0) {
                this.clearActive()
                this.mindMap.render()
                this.mindMap.emit('node_active', null, [])
            }
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
            first.parent.nodeData.children.splice(index + 1, 0, {
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
        if (!first.nodeData.children) {
            first.nodeData.children = []
        }
        first.nodeData.children.push({
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
                item.nodeData.children = []
            } else {
                let index = this.getNodeIndex(item)
                item.parent.children.splice(index, 1)
                item.parent.nodeData.children.splice(index, 1)
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
    updateNodeData(node, data, children) {
        Object.keys(data).forEach((key) => {
            node.nodeData.data[key] = data[key]
        })
        if (children) {
            node.nodeData.children = children
        }
        this.mindMap.render()
    }
}

export default Render