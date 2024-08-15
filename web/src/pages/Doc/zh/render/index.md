# Render 实例

`render`实例负载整个渲染过程，可通过`mindMap.renderer`获取到。

## 属性

### activeNodeList

获取当前激活的节点列表。

### root

节点树，也就是思维导图节点实例树。

### renderTree

渲染树，也就是思维导图的数据树。

### layout

当前的布局实例。

## 方法

### activeMultiNode(nodeList = [])

> v0.10.6+

- `nodeList`：节点实例列表

手动激活多个节点，激活单个节点请直接调用节点实例的`active()`方法。

### cancelActiveMultiNode(nodeList = [])

> v0.10.6+

- `nodeList`：节点实例列表

手动取消激活多个节点，取消激活单个节点请直接调用节点实例的`deactivate()`方法。

### highlightNode(node, range)

> v0.9.0+

- `node`：要高亮的目标节点实例

- `range`：可选，Array，一个范围数组，[0, 1]

高亮节点或子节点。如果`range`参数没有传递，那么直接高亮指定的`node`节点，如果`range`传递了一个要高亮的子节点的范围，那么会高亮该范围的子节点。

高亮效果为通过一个矩形框来包裹，矩形的描边和填充样式可以通过`highlightNodeBoxStyle`实例化选项进行配置。

### closeHighlightNode()

> v0.9.0+

隐藏节点高亮框。

### setRootNodeCenter()

> v0.8.0+

回到中心主题，即设置根节点到画布中心。

### setData(data)

> v0.7.3+

动态设置思维导图数据。

### clearActive()

> v0.8.0+已废弃

清除当前激活的节点。

### clearAllActive()

> v0.8.0+已废弃

清除当前所有激活节点，并会触发`node_active`事件 。

### clearActiveNode()

> v0.8.0+

清除当前所有激活节点，并会触发`node_active`事件 。

### clearActiveNodeList()

> v0.8.0+

清除当前激活的节点列表。不会触发`node_active`事件 。

### startTextEdit()

> v0.1.6+

若有文字编辑需求可调用该方法，会禁用回车键和删除键相关快捷键防止冲突 。

### endTextEdit()

> v0.1.6+

结束文字编辑，会恢复回车键和删除键相关快捷键。

### addActiveNode(node)

> v0.8.0+已废弃

添加节点到激活列表里。

### addNodeToActiveList(node, notEmitBeforeNodeActiveEvent = false)

> v0.8.0+

- `notEmitBeforeNodeActiveEvent`：v0.9.12+，是否不要派发`before_node_active`事件，默认为`false`，即会派发；

添加节点到激活列表里。如果你想要手动激活某个节点，达到和鼠标点击激活一样的效果，请直接调用节点实例的`active()`方法。

### removeActiveNode(node)

> v0.8.0+已废弃

在激活列表里移除某个节点。

### removeNodeFromActiveList(node)

> v0.8.0+

在激活列表里移除某个节点。

### findActiveNodeIndex(node)

检索某个节点在激活列表里的索引。

### getNodeIndex(node)

获取节点在同级里的位置索引。

### setNodeDataRender(node, data, notRender)

- `notRender`：v0.6.9+，`Boolean`，默认为`false`，是否不要触发渲染。

设置节点数据，即`data`字段的数据，并会根据节点大小是否变化来判断是否需要重新渲染该节点，`data`为对象，如：`{text: '我是新文本'}`。

### moveNodeTo(node, toNode)

> v0.1.5+

移动一个节点作为另一个节点的子节点。

### insertBefore(node, exist)

> v0.1.5+

将节点移动到另一个节点的前面。

### insertAfter(node, exist)

> v0.1.5+

将节点移动到另一个节点的后面。

### moveNodeToCenter(node, resetScale)

> v0.2.17+

- `resetScale`：v0.10.1+， 指定是否要将画布缩放值复位为100%，当你没有显式传递时，默认值为undefined，因为实例化选项的resetScaleOnMoveNodeToCenter配置也会决定是否复位缩放，所以当你没有显式传递时使用resetScaleOnMoveNodeToCenter配置，否则使用resetScale配置

移动节点到画布中心。

### expandToNodeUid(uid, callback)

> v0.6.7+

- `uid`：节点 uid

- `callback`：展开完成的回调函数

展开到指定 uid 的节点。

### findNodeByUid(uid)

> v0.6.7+

- `uid`：节点 uid

根据 uid 找到对应的节点实例。

### copy()

> v0.6.8+

复制节点，调用该方法后会存储当前激活的节点数据，后续调用`paste()`方法时可以进行粘贴。

如果浏览器及协议（https）支持`js`操作剪贴板数据，那么复制的节点数据也会同时添加到用户的剪贴板中。

### cut()

> v0.6.8+

剪切节点，调用该方法后会剪切当前激活的节点，并且存储该节点数据，后续调用`paste()`方法时可以进行粘贴。

如果浏览器及协议（https）支持`js`操作剪贴板数据，那么复制的节点数据也会同时添加到用户的剪贴板中。

### paste()

> v0.6.8+

粘贴节点，在调用了`copy()`或`cut()`方法后可以调用该方法进行粘贴节点。

如果浏览器及协议（https）支持`js`操作剪贴板数据，那么其他地方复制的数据也可以进行粘贴，比如你可以进行跨浏览器粘贴`simple-mind-map`节点，如果是非`simple-mind-map`节点数据，那么会提取出剪切板中的文本和图片进行粘贴，文本默认会粘贴为子节点，图片默认会添加到当前的节点中。

### clearCache()

> v0.9.2+

清空节点缓存池。

### emitNodeActiveEvent(node = null, activeNodeList = [...this.activeNodeList])

- `node`：本次激活的节点

- `activeNodeList`：当前所有激活的节点

派发节点激活事件，也就是触发`node_active`事件。
