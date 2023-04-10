# 操作节点内容

目前支持在节点中插入`图片`、`图标`、`超链接`、`备注`、`标签`、`概要`、`关联线`，本节教程会介绍如何通过UI界面来完成这些内容的插入。

## 监听节点激活事件

首先我们要监听节点的激活事件，如果当前没有激活节点，那么对应的UI界面肯定是禁用状态。可以通过`node_active`事件来监听节点激活事件：

```js
const activeNodes = shallowRef([])
mindMap.on('node_active', (node, activeNodeList) => {
    activeNodes.value = activeNodeList
})
```

你还可以进一步判断当前激活的节点中是否操作根节点，是否存在概要节点，因为根节点肯定不能添加兄弟节点，概要节点则子节点、兄弟节点、概要节点、关联线都不能添加。

```js
const hasRoot = computed(() => {
    return activeNodes.value.findIndex(node => {
        return node.isRoot
    }) !== -1
})


const hasGeneralization = computed(() => {
    return activeNodes.value.findIndex(node => {
        return node.isGeneralization
    }) !== -1
})
```

有了这些判断以后，我们就可以对工具按钮进行控制了，接下来就是实现按钮的相关功能。

## 插入图片

选择图片和上传图片的功能需要你自行开发，假设我们已经上传了一张图片，我们就可以遍历当前激活的节点，挨个调用节点的`setImage`方法设置图片：

```js
activeNodes.value.forEach((node) => {
    node.setImage({
        url: '图片url',
        title: '图片的标题或描述',
        width: 100,// 图片的宽高也不能少
        height: 100
    })
})
```

图片回显也很简单，可以使用节点的`getData`方法获取节点的图片：

```js
const img = activeNode.getData('image')
const imgTitle = activeNode.getData('imageTitle')
```

## 插入图标

整体逻辑和插入图片是一样的，不过你需要显示所有可插入的图标，目前只能使用库里自带的一些图标，然后将选择的图标插入到节点中：

```js
const iconList = ['priority_1', '...']// 选择的图标
activeNodes.value.forEach(node => {
    node.setIcon(iconList)
})
```

获取节点的图标数据：

```js
const iconList = activeNode.getData('icon') || []
```

## 插入超链接

对于超链接，你需要实现两个输入框，分别输入`url`和名称，然后插入到节点：

```js
activeNodes.value.forEach(node => {
    node.setHyperlink('url', '名称')
})
```

获取节点超链接数据：

```js
const url = activeNode.getData('hyperlink')
const name = activeNode.getData('hyperlinkTitle')
```

## 插入备注

备注会稍微复杂一点，因为支持两种方式。

### 使用内置逻辑

使用内置的逻辑，只能插入纯文本备注，所以你只需要显示一个输入框用来输入文本，然后插入到节点：

```js
activeNodes.value.forEach(node => {
    node.setNote('备注内容')
})
```

这样在鼠标移入节点内的备注图标时会显示你插入的备注内容。

### 自定义显示备注

如果你想显示更丰富的备注内容，比如支持`markdown`，那么你可以在实例化`simple-mind-map`时插入`customNoteContentShow`选项。

设置备注内容还是使用`setNote`方法，只不过现在插入的是`markdown`字符串，因为内置的备注弹窗只能处理纯文本内容，所以你需要自己来渲染`markdown`：

```js
const mindMap = new MindMap({
    // ...
    customNoteContentShow: {
        show: (content, left, top) => {
            // 在这里显示你的自定义弹窗
            // content表示你插入的备注的内容，left和top时弹窗应该显示的位置，你需要将你的弹窗元素设置成fixed定位
        },
        hide: () => {
            // 在这里隐藏你的自定义弹窗
            // 你也可以选择不在鼠标移出备注图标时隐藏弹窗，比如可以在画布被点击时隐藏
        }
    },
})
```

获取节点的备注内容可以通过`getData`方法：

```js
const note = activeNode.getData('note')
```

## 插入标签

标签其实就是一个个带背景颜色的文本块，你需要实现的就是一个可以输入多个文本的输入框，然后插入到节点：

```js
activeNodes.value.forEach(node => {
    node.setTag(['标签1', '...'])
})
```

获取节点标签数据：

```js
const tagArr = activeNode.getData('tag') || []
```

## 插入概要

插入概要可以不需要实现UI，直接调用插入概要的命令即可：

```js
mindMap.execCommand('ADD_GENERALIZATION', data)
```

会给当前激活的节点插入一个概要节点，第二个参数`data`可以不传，默认为：

```js
{
    text: '概要'
}
```

概要节点本质上也是一个节点，所以普通节点支持的内容它也支持。

## 插入关联线

> 要支持关联线需要使用关联线插件

关联线也不需要UI，调用一个方法即可：

```js
mindMap.associativeLine.createLineFromActiveNode()
```

然后会从激活的节点（如果有多个激活节点，默认是第一个）到鼠标的实时位置生成一条曲线，点击某个目标节点后就会创建一条从激活节点到目标节点的关联线。

## 完整示例

<iframe style="width: 100%; height: 455px; border: none;" src="https://wanglin2.github.io/playground/#eNrFV/9PHEUU/1cma8we5tiDRmKCBykFRBJAQ5poZRuy7M7dDezObHfn4AghsVRK0Vb6xWjTRq2mraYqaULTCA3wz7B3x3/hm539dsdhzvhDSQ5m3rzPe+/el88Ma8qI62rLVawMKkXf9IjLkY951R3WKXFc5nG0hjxcyiNGp1mVcmzlkV8xbJutzOISWkcljzlIBQtqgpgm1Jo2XHmkKz6IbdzrgLTXMVxd0SlCOrUxR0ImNIcQrdq2lBcKKDh8EGzfqR9/WX/1pvHoq+bXG42N/eDWD81fftepyajPkWFysoxnmIV9QKcR5eau9ug0tFLfuR9sPgseHzW2t2IYoT72Jh2jjAGV60FDw2hNuM2Y05YNu4q1EvPGDbOSy1EQpooIib0GOQqt5CKh+Kl69iBSK5y7/mChYNeuUX/V15jv95q0dwGTRULLmmGT1So1fc1kTuGaXSvUKhdGPl+6VLviDCxO4IHS2Adjn13xRgcWNJeW1XxqnhNuY3AgvxCkpf5k6/TXh/Vb39d3dprHL7O6K8TilUHU39eXF+mMEcHu4ekfD0/2fz75+07zxmHw8l4KqWBSrvAQI4XrIo9c/F5vTyh4bkkon4RNa0KjU/gzRWAxhOZU1yPMI3x1vl/No3R3Qb367xUQCe+Uf7Cdix2cE2vz9ebpg6P6t89aw50idKnb+p/j/eNVF3s22MmFFc8UXBRWfMHG3Zv1G3unP94P9l8Fuz+dvrgd7D5Vz0vq0636XtLcMsoZxrvu0nOiFCZyqjQe3NwMdvfPCwBK2vjrqDWAy0b5f/oHC7k5VdoOqy6XUPLzwni+0Xx+vTWMCaM1iog0NFzD5ihzHINaOXVkbGx+YnxmfHZkavKLkcuTn8yAu1Bd5xzXoLHV5taLYPfRyf62dBLlQ6h0qMfmXvP6d42D4zON01aSOBjD95lJDJEfoaSZHjZ4uPwIWHAkSVwudpXwae6sNcGHeCXm0ZhjMNCLxcyqgynXypiP21gsL61OwvePkKOMcgOcempPRAeWwY3BuC6QDUUIdCUjkmKRJCHWlfqTfcm4kqlDLki4RVfMCrEtD1OhPJfaaDPX0Uu7p5OD242D39qdtTrs4DTki7N6bymCeBnJYhyhhM8yBiNo4U+ZTzhhFJCqjUtcTIIJpYMyhaj1ng/l3YcQdGDj8b3g7p8yJnkHnhx8c/LmdbbdgPpUMWTzciTBYDiC+XDyQkLMTOOZsRX9Fekl7Q+fYkG+AODuhw3HcG1DD8MOoaJFlpFpQ5cP6UoUxBh2mK6Ex5ECsdLTpBNBpViA06xibIkzZi8YoIKWe0kJBNlQbUzLvIKGUV/iRefFhSrncNlcNG1iLgEivdFBK3vlFwtSNYKC547Q8B7JQoGiuoWKeySBJndNt2hBzqnjkKO7hQKvJkhJqd0iJ2AmYmBIg//hu2aijemxDZ0WOl4VC5k+gq3PV23ZUhej16KuaAX5RIz4TsO+o5m+ryvJVGiZlou7On3jvBvqIeQmY+Zh8AiNFB6EEyo+77S3ZmwqBRoLPrOrXAIREsM6iPqiHWduujnrPn5Bvd/X59Ziz539vhd7dgyvTMBvbNU1LAueibEgCV2LJqXLiPvjCKKgkz0YhCkPa6DkFVkB8SjXFn1G4X8AeWNGB1CBhD51BZ74kjO1Aiw1Dy4v4mBRrN4Fj61Aj4ARXYnor8OzX2LPllqgotjWlfV/AEgelAo=" />