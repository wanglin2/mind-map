# 内置工具方法

## 基础工具方法

引用：

```js
import {walk, ...} from 'simple-mind-map/src/utils'
```

### 方法

#### walk(root, parent, beforeCallback, afterCallback, isRoot, layerIndex = 0, index = 0)

深度优先遍历树

`root`：要遍历的树的根节点

`parent`：父节点

`beforeCallback`：前序遍历回调函数，回调参数为：root, parent, isRoot, layerIndex, index

`afterCallback`：后序遍历回调函数，回调参数为：root, parent, isRoot, layerIndex, index

`isRoot`：是否是根节点

`layerIndex`：节点层级

`index`：节点在同级节点里的索引

示例：

```js
walk(tree, null, () => {}, () => {}, false, 0, 0)
```

#### bfsWalk(root, callback)

广度优先遍历树

#### resizeImgSize(width, height, maxWidth, maxHeight)

缩放图片的尺寸

`width`：图片原本的宽

`height`：图片原本的高

`maxWidth`：要缩放到的宽

`maxHeight`：要缩放到的高

`maxWidth`和`maxHeight`可以同时都传，也可以只传一个

#### resizeImg(imgUrl, maxWidth, maxHeight)

缩放图片，内部先加载图片，然后调用`resizeImgSize`方法，返回一个`promise`

#### simpleDeepClone(data)

极简的深拷贝方法，只能针对全是基本数据的对象，否则会报错

#### copyRenderTree(tree, root)

复制渲染树数据，示例：

```js
copyRenderTree({}, this.mindMap.renderer.renderTree)
```

#### copyNodeTree(tree, root, removeActiveState, keepId)

- `removeActiveState`：`Boolean`，默认为`false`，是否移除节点的激活状态

- `keepId`：v0.4.6+，`Boolean`，默认为`false`，是否保留被复制节点的`id`，默认会删除`id`防止节点`id`重复，但是对于移动节点的场景，节点原`id`需要保留

复制节点树数据，主要是剔除其中的引用`node`实例的`_node`，然后复制`data`对象的数据，示例：

```js
copyNodeTree({}, node)
```

#### imgToDataUrl(src)

图片转成dataURL

#### downloadFile(file, fileName)

下载文件

#### throttle(fn, time = 300, ctx)

节流函数

#### asyncRun(taskList, callback = () => {})

异步执行任务队列，多个任务是同步执行的，没有先后顺序

#### degToRad(deg)

> v0.2.24+

角度转弧度

#### camelCaseToHyphen(str)

> v0.2.24+

驼峰转连字符

#### joinFontStr({ italic, bold, fontSize, fontFamily })

> v0.3.4+

拼接`css`字体的`font`属性值

#### measureText(text, { italic, bold, fontSize, fontFamily })

> v0.3.4+

测量文本的宽高，返回值：

```js
{ width, height }
```

#### getTextFromHtml(html)

提取html字符串里的纯文本内容。

#### readBlob(blob)

> v0.5.9+

将`blob`数据转成`data:url`数据。

## 在canvas中模拟css的背景属性

引入：

```js
import drawBackgroundImageToCanvas from 'simple-mind-map/src/utils/simulateCSSBackgroundInCanvas'
```

使用：

```js
let width = 500
let height = 500
let img = '/1.jpg'
let canvas = document.createElement('canvas')
canvas.width = width
canvas.height = height
drawBackgroundImageToCanvas(ctx, width, height, img, {
  backgroundRepeat: 'repeat-y',
  backgroundSize: '60%',
  backgroundPosition: 'center center'
}, (err) => {
  if (err) {
    // 失败
  } else {
    // 成功
  }
})
```

## LRU缓存类

> v0.5.10+

引入：

```js
import Lru from 'simple-mind-map/src/utils/Lru.js'
```

### 构造函数

```js
let lru = new Lru(max)
```

`max`：指定最大缓存数量。

### 实例属性

#### size

当前缓存的数量。

#### pool

获取缓存池。

### 实例方法

#### add(key, value)

添加缓存。

#### delete(key)

删除指定缓存。

#### has(key)

检查某个缓存是否存在。

#### get(key)

获取某个缓存的值。