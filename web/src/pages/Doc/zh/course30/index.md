# 如何通过代码激活节点

默认可以通过鼠标单击节点来激活单个节点，鼠标拖拽或按住Ctrl键单击进行激活多个节点，那么如何通过代码来激活单个或多个节点，达到和鼠标操作一样的效果呢，请往下看。

## 激活单个节点

如果已经获取到节点实例，那么直接调用该节点实例的`active()`方法即可：

```js
node.active()
```

如果只知道节点`uid`，那么可以先获取节点实例，再调激活的方法：

```js
const node = mindMap.renderer.findNodeByUid('uid')
node.active()
```

## 激活多个节点

如果要激活多个节点，在`v0.10.6`版本以前需要这么做：

```js
;[id1, id2, id3].forEach(id => {
    // 获取节点实例
    const node = mindMap.renderer.findNodeByUid(id)
    // 手动派发节点激活前事件
    mindMap.emit(
        'before_node_active',
        node,
        mindMap.renderer.activeNodeList
    )
    // 激活节点，并将该节点添加到激活节点列表里
    mindMap.renderer.addNodeToActiveList(node, true)
    // 手动派发节点激活事件
    mindMap.renderer.emitNodeActiveEvent(node)
})
```

在`v0.10.6+`版本，`render`实例新增了激活多个节点的方法，所以可以直接使用：

```js
const nodeList = [id1, id2, id3, id4].map(id => {
    return mindMap.renderer.findNodeByUid(id)
})
mindMap.renderer.activeMultiNode(nodeList)
```

## 取消激活所有节点

取消激活所有节点可以直接调用`render`实例的方法：

```js
mindMap.renderer.clearActiveNode()
```

这个方法不会派发`before_node_active`事件，所以如果需要你可以自己手动派发一下。

## 取消激活指定节点

要取消激活指定的节点，在`v0.10.6`版本以前需要这么做：

```js
;[id1, id2, id3, id4].forEach(id => {
    const node = mindMap.renderer.findNodeByUid(id)
    mindMap.renderer.removeNodeFromActiveList(node)
    mindMap.renderer.emitNodeActiveEvent(null)
})
```

在`v0.10.6+`版本，`render`实例新增了取消激活多个节点的方法，所以可以直接使用：

```js
const nodeList = [id1, id2, id3, id4].map(id => {
    return mindMap.renderer.findNodeByUid(id)
})
mindMap.renderer.cancelActiveMultiNode(nodeList)
```