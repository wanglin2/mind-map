# Render实例

`render`实例负载整个渲染过程，可通过`mindMap.renderer`获取到

## 属性

### activeNodeList

获取当前激活的节点列表

### root

获取节点树的根节点

## 方法

### clearActive()

清除当前激活的节点

### clearAllActive()

清除当前所有激活节点，并会触发`node_active`事件 

### startTextEdit()

（v0.1.6+）若有文字编辑需求可调用该方法，会禁用回车键和删除键相关快捷键防止冲突 

### endTextEdit()

（v0.1.6+）结束文字编辑，会恢复回车键和删除键相关快捷键

### addActiveNode(node)

添加节点到激活列表里

### removeActiveNode(node)

在激活列表里移除某个节点

### findActiveNodeIndex(node)

检索某个节点在激活列表里的索引

### getNodeIndex(node)

获取节点在同级里的位置索引

### removeOneNode(node)

删除某个指定节点

### copyNode()

复制节点，操作节点为当前激活节点，有多个激活节点只会操作第一个节点

### setNodeDataRender(node, data)

设置节点数据，即`data`字段的数据，并会根据节点大小是否变化来判断是否需要重新渲染该节点，`data`为对象，如：`{text: '我是新文本'}`

### moveNodeTo(node, toNode)

> v0.1.5+

移动一个节点作为另一个节点的子节点

### insertBefore(node, exist)

> v0.1.5+

将节点移动到另一个节点的前面

### insertAfter(node, exist)

> v0.1.5+

将节点移动到另一个节点的后面

### moveNodeToCenter(node)

> v0.2.17+

移动节点到画布中心。

目前如果是存在缩放的情况下回到中心会重置缩放。