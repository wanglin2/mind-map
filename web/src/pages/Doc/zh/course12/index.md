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

// 在v0.6.7+版本可以这么做：
mindMap.execCommand('GO_TARGET_NODE', node)// 或者传节点的uid
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

## 进阶

要实现一个功能完善的大纲并不容易，下面介绍一下包含定位、编辑、拖拽、删除、单独编辑功能的大纲实现。

以[ElementUI Tree组件](https://element.eleme.cn/#/zh-CN/component/tree)为例。

实现监听`data_change`事件来刷新树数据：

```js
import { nodeRichTextToTextWithWrap } from 'simple-mind-map/src/utils'

this.mindMap.on('data_change', () => {
    this.refresh()
})

{
    refresh() {
        let data = mindMap.getData()// 获取思维导图树数据
        data.root = true // 标记根节点
        // 遍历树，添加一些属性
        let walk = root => {
            // 如果是富文本节点，那么调用nodeRichTextToTextWithWrap方法将<p><span></span><p>形式的节点富文本内容转换成\n换行的文本
            const text = (root.data.richText
                ? nodeRichTextToTextWithWrap(root.data.text)
                : root.data.text
            ).replaceAll(/\n/g, '<br>')
            root.textCache = text // 保存一份修改前的数据，用于对比是否修改了
            root.label = text// 用于树组件渲染
            root.uid = root.data.uid// 用于树组件渲染
            if (root.children && root.children.length > 0) {
                root.children.forEach(item => {
                    walk(item)
                })
            }
        }
        walk(data)
        this.data = [data]// 赋值给树组件
    }
}
```

模板如下：

```html
<el-tree
    ref="tree"
    node-key="uid"
    draggable
    default-expand-all
    :data="data"
    :highlight-current="true"
    :expand-on-click-node="false"
    :allow-drag="checkAllowDrag"
    @node-drop="onNodeDrop"
    @current-change="onCurrentChange"
    @mouseenter.native="isInTreArea = true"
    @mouseleave.native="isInTreArea = false"
>
    <span
        class="customNode"
        slot-scope="{ node, data }"
        :data-id="data.uid"
        @click="onClick(data)"
    >
        <span
            class="nodeEdit"
            contenteditable="true"
            :key="getKey()"
            @keydown.stop="onNodeInputKeydown($event, node)"
            @keyup.stop
            @blur="onBlur($event, node)"
            @paste="onPaste($event, node)"
            v-html="node.label"
        ></span>
    </span>
</el-tree>
```

### 定位节点

给节点绑定了一个`click`事件用于在画布内定位点击的节点，可以调用思维导图的相关方法实现：

```js
// 激活当前节点且移动当前节点到画布中间
onClick(data) {
    // 根据uid知道思维导图节点对象
    const targetNode = this.mindMap.renderer.findNodeByUid(data.uid)
    // 如果当前已经是激活状态，那么上面都不做
    if (targetNode && targetNode.nodeData.data.isActive) return
    // 思维导图节点激活时默认会聚焦到内部创建的一个隐藏输入框中，`stopFocusOnNodeActive`方法是用于关闭这个特性，因为我们想把焦点留在大纲的输入框中
    this.mindMap.renderer.textEdit.stopFocusOnNodeActive()
    // 定位到目标节点
    this.mindMap.execCommand('GO_TARGET_NODE', data.uid, () => {
        // 定位完成后再开启前面关闭的特性
        this.mindMap.renderer.textEdit.openFocusOnNodeActive()
    })
}
```

### 编辑

我们通过自定义树节点内容渲染了一个`contenteditable=true`的标签用于输入文本，然后在`blur`事件中修改节点文本：

```js
import { textToNodeRichTextWithWrap } from 'simple-mind-map/src/utils'

// 失去焦点更新节点文本
onBlur(e, node) {
    // 节点数据没有修改那么什么也不用做
    if (node.data.textCache === e.target.innerHTML) {
        return
    }
    // 根据是否是富文本模式获取不同的文本数据
    const richText = node.data.data.richText
    const text = richText ? e.target.innerHTML : e.target.innerText
    const targetNode = this.mindMap.renderer.findNodeByUid(node.data.uid)
    if (!targetNode) return
    if (richText) {
        // 如果是富文本节点，那么需要先调用textToNodeRichTextWithWrap方法将<br>换行的文本转换成<p><span></span><p>形式的节点富文本内容
        // 第二个参数代表设置的是富文本内容
        // 第三个参数指定要重置富文本节点的样式
        targetNode.setText(textToNodeRichTextWithWrap(text), true, true)
    } else {
        targetNode.setText(text)
    }
}
```

### 拖拽

设置了`draggable`属性即可开启拖拽，首先根节点是不允许拖拽的，所以通过`allow-drag`属性传入一个判断方法：

```js
// 根节点不允许拖拽
checkAllowDrag(node) {
    return !node.data.root
}
```

然后监听拖拽完成事件`node-drop`来实现画布内节点的调整：

```js
// 拖拽结束事件
onNodeDrop(data, target, position) {
    // 被拖拽的节点
    const node = this.mindMap.renderer.findNodeByUid(data.data.uid)
    // 拖拽到的目标节点
    const targetNode = this.mindMap.renderer.findNodeByUid(target.data.uid)
    if (!node || !targetNode) {
        return
    }
    // 根据不同拖拽的情况调用不同的方法
    switch (position) {
        case 'before':
            this.mindMap.execCommand('INSERT_BEFORE', node, targetNode)
            break
        case 'after':
            this.mindMap.execCommand('INSERT_AFTER', node, targetNode)
            break
        case 'inner':
            this.mindMap.execCommand('MOVE_NODE_TO', node, targetNode)
            break
        default:
            break
    }
}
```

### 删除节点

首先通过树组件的`current-change`事件来保存当前高亮的树节点：

```js
// 当前选中的树节点变化事件
onCurrentChange(data) {
    this.currentData = data
}
```

然后通过监听`keydown`事件来完成删除节点的操作：

```js
window.addEventListener('keydown', this.onKeyDown)

// 删除节点
onKeyDown(e) {
    if ([46, 8].includes(e.keyCode) && this.currentData) {
        e.stopPropagation()
        // 处理当前正在编辑节点内容时删除的情况
        this.mindMap.renderer.textEdit.hideEditTextBox()
        const node = this.mindMap.renderer.findNodeByUid(this.currentData.uid)
        if (node && !node.isRoot) {
            // 首先从树里删除
            this.$refs.tree.remove(this.currentData)
            // 然后从画布里删除
            this.mindMap.execCommand('REMOVE_NODE', [node])
        }
    }
}
```

### 创建新节点

通过监听节点内容编辑框的`keydown`事件来完成添加新节点的操作：

```js
import { createUid } from 'simple-mind-map/src/utils'

// 节点输入区域按键事件
onNodeInputKeydown(e) {
    // 回车键添加同级节点
    if (e.keyCode === 13 && !e.shiftKey) {
        e.preventDefault()
        this.insertNode()
    }
    // tab键添加子节点
    if (e.keyCode === 9) {
        e.preventDefault()
        this.insertChildNode()
    }
}

// 插入兄弟节点
insertNode() {
    this.mindMap.execCommand('INSERT_NODE', false, [], {
        uid: createUid()
    })
}

// 插入下级节点
insertChildNode() {
    this.mindMap.execCommand('INSERT_CHILD_NODE', false, [], {
        uid: createUid()
    })
}
```

### 拦截输入框的粘贴操作

为什么要拦截输入框的粘贴操作，因为用户可能粘贴的是富文本内容，也就是带html标签的，但是一般我们都不希望用户粘贴这种内容，只允许粘贴纯文本，所以我们要拦截粘贴事件，处理一下用户粘贴的内容：

```js
import { getTextFromHtml } from 'simple-mind-map/src/utils'

// 拦截粘贴事件
onPaste(e) {
    e.preventDefault()
    const selection = window.getSelection()
    if (!selection.rangeCount) return
    selection.deleteFromDocument()// 删除当前选区，也就是如果当前用户在输入框中选择了一些文本，会被删除
    // 从剪贴板里取出文本数据
    let text = e.clipboardData.getData('text')
    // 调用库提供的getTextFromHtml方法去除格式
    text = getTextFromHtml(text)
    // 去除换行
    text = text.replaceAll(/\n/g, '')
    // 创建文本节点添加到当前选区
    const node = document.createTextNode(text)
    selection.getRangeAt(0).insertNode(node)
    selection.collapseToEnd()
}
```

到这里基本功能就都完成了，是不是觉得挺简单的？核心原理和操作确实很简单，麻烦的是各种情况和冲突的处理，比如焦点的冲突、快捷键的冲突、操作的时间顺序等等，所以务必先阅读一下完整的源码[Outline.vue](https://github.com/wanglin2/mind-map/blob/main/web/src/pages/Edit/components/Outline.vue)。