# 如何渲染一个大纲

思维导图本质就是一颗树，所以你可以使用树组件来完成大纲的显示。

可以监听`data_change`事件来获取当前最新的思维导图数据：

```js
mindMap.on('data_change', (data) => {
    // data数据是不带节点对象的纯数据
    // 如果你需要操作节点对象，可以使用mindMap.renderer.renderTree
    console.log(data, mindMap.renderer.renderTree)
})
```

通常点击了大纲的某个节点，会将画布定位到该节点并激活该节点，这可以这么做：

```js
const node = data._node
mindMap.renderer.moveNodeToCenter(node)
node.active()
```

当在大纲树上编辑了某个节点的内容，需要同步到思维导图树上：

```js
data._node.setText('xxx')
```

要插入兄弟节点或子节点可以这么操作：

```js
mindMap.execCommand('INSERT_NODE', false)
mindMap.execCommand('INSERT_CHILD_NODE', false)
```