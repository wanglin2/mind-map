# 如何渲染一个右键菜单

右键菜单可以方便的完成一些功能，大体上分两种，一是在画布上点击右键，二是在节点上点击右键，两者的功能肯定是不一样的，甚至根节点和其他节点功能上也有些不同，比如根节点不能添加同级节点，也不能被删除等等。

右键菜单的UI界面需要你自行开发，可以设置成绝对定位或固定定位，然后让它显示在鼠标右键点击的位置即可。

## 右键菜单的显示和隐藏

首先监听`node_contextmenu`事件在右键点击节点时显示菜单：

```js
// 当前右键点击的类型
const type = ref('')
// 如果点击的节点，那么代表被点击的节点
const currentNode = shallowRef(null)
// 菜单显示的位置
const left = ref(0)
const top = ref(0)
// 是否显示菜单
const show = ref(false)

mindMap.on('node_contextmenu', (e, node) => {
    type.value = 'node'
    left.value = e.clientX + 10
    top.value = e.clientY + 10
    show.value = true
    currentNode.value = node
})
```

你可以根据当前点击的节点来判断一些操作是否可用。比如根节点不能删除，不能插入同级节点，又比如同级第一个节点不能再被往上移，同级最后一个节点不能被往下移。

对于画布的处理会比较麻烦，不能直接监听`contextmenu`事件，因为会和右键多选节点冲突，所以需要结合`mousedown`事件和`mouseup`事件来处理。

```js
// 记录鼠标右键按下的位置
const mousedownX = ref(0)
const mousedownY = ref(0)
const isMousedown = ref(false)

mindMap.on('svg_mousedown', (e) => {
    // 如果不是右键点击直接返回
    if (e.which !== 3) {
        return
    }
    mousedownX.value = e.clientX
    mousedownY.value = e.clientY
    isMousedown.value = true
})

mindMap.on('mouseup', (e) => {
    if (!isMousedown.value) {
        return
    }
    isMousedown.value = false
    // 如果鼠标松开和按下的距离大于3，则不认为是点击事件
    if (
        Math.abs(mousedownX.value - e.clientX) > 3 ||
        Math.abs(mousedownX.value - e.clientY) > 3
    ) {
        hide()
        return
    }
    type.value = 'svg'
    left.value = e.clientX + 10
    top.value = e.clientY + 10
    show.value = true
})
```

很简单，其实就是判断鼠标按下和松开的距离是否很小，是的话就认为是点击事件，否则应该是鼠标拖动。

右键菜单显示了，肯定就需要隐藏，当左键点击了画布、左键点击了节点、左键点击了展开收起按钮时都需要隐藏右键菜单。

```js
const hide = () => {
    show.value = false
    left.value = 0
    top.value = 0
    type.value = ''
}
mindMap.on('node_click', hide)
mindMap.on('draw_click', hide)
mindMap.on('expand_btn_click', hide)
```

## 复制、剪切、粘贴的实现

接下来介绍一下复制、剪切、粘贴的实现。

一般来说你的右键菜单中肯定也会添加这三个按钮，另外快捷键操作也是必不可少的，但是这三个快捷键是没有内置的，所以你需要自己注册一下：

```js
mindMap.keyCommand.addShortcut('Control+c', copy)
mindMap.keyCommand.addShortcut('Control+v', paste)
mindMap.keyCommand.addShortcut('Control+x', cut)
```

如需删除调用`removeShortcut`方法即可。

接下来实现一下这三个方法：

```js
// 保存复制/剪切的节点的数据，后续可以原来粘贴
let copyData = null

const copy = () => {
    copyData = mindMap.renderer.copyNode()
}

const cut = () => {
    mindMap.execCommand('CUT_NODE', _copyData => {
        copyData = _copyData
    })
}

const paste = () => {
    mindMap.execCommand('PASTE_NODE', copyData)
}
```

## 完整示例

<iframe style="width: 100%; height: 455px; border: none;" src="https://wanglin2.github.io/playground/#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" />