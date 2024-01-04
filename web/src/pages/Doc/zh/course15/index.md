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

一般来说你的右键菜单中肯定也会添加这三个按钮，当点击这三个按钮时你需要调用对应的方法： 

```js
// 当点击了复制按钮时调用
mindMap.renderer.copy()

// 当点击了剪切按钮时调用
mindMap.renderer.cut()

// 当点击了粘贴按钮时调用
mindMap.renderer.paste()
```