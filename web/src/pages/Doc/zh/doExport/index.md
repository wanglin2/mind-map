# Export 插件

`Export`插件提供导出的功能。

## 注册

```js
import MindMap from 'simple-mind-map'
import Export from 'simple-mind-map/src/plugins/Export.js'
// import Export from 'simple-mind-map/src/Export.js' v0.6.0以下版本使用该路径

MindMap.usePlugin(Export)
```

注册完且实例化`MindMap`后可通过`mindMap.doExport`获取到该实例。

## 方法

所有导出的方法都是异步方法，返回一个`Promise`实例，你可以使用`then`方法获取数据，或者使用`async await`函数获取：

```js
mindMap.doExport.png().then((data) => {
  // ...
})

const export = async () => {
  let data = await mindMap.doExport.png()
  // ...
}
```

返回的数据为`data:url`格式的，你可以创建一个`a`标签来触发下载：

```js
let a = document.createElement('a')
a.href = 'xxx.png'// .png、.svg、.pdf、.md、.json、.smm
a.download = 'xxx'
a.click()
```

### png(name, transparent = false, node = null)

> v0.9.2以下版本为：png(name, transparent = false, checkRotate, compress)

> v0.7.0以下版本为： png(name, transparent = false, rotateWhenWidthLongerThenHeight)

- `name`：名称，可不传

- `transparent`：v0.5.7+，指定导出图片的背景是否是透明的

- `rotateWhenWidthLongerThenHeight`: v0.6.15+，v0.7.0+已废弃，Boolean, false, 是否在图片宽比高长时自动旋转90度

- `checkRotate`：v0.7.0+，（v0.9.2+已废弃），Function，可以传递一个函数，接收图片的宽度和高度两个参数，返回true或false，true代表图片需要旋转90度

- `compress`：v0.8.1+，（v0.9.2+已废弃），null | { width, height }, 压缩图片的参数，某些情况下导出的图片长宽可能非常大，如果希望减小，那么可以通过该参数来控制，宽或高只提供一个即可，会按比例缩放

- `node`：v0.9.11+，节点实例，如果传了，那么会仅导出该节点的内容；

导出为`png`。

### svg(name, plusCssText)

- `name`：`svg`标题

- `plusCssText`：v0.4.0+，（v0.6.16+已去除该参数，改为在实例化时通过`resetCss`配置传入），当开启了节点富文本编辑，且`domToImage`传了`false`时，可以添加附加的`css`样式，如果`svg`中存在`dom`节点，想要设置一些针对节点的样式可以通过这个参数传入，比如：

```js
svg(
  '', 
  false, 
  `* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }`
)
```

导出为`svg`。

### pdf(name, transparent = false)

> v0.8.1：pdf(name, useMultiPageExport, maxImageWidth)

> v0.2.1+

- `name`：文件名称

- `useMultiPageExport`: v0.6.15+，（v0.9.2+已废弃），Boolean, false, 是否多页导出，默认为单页

- `maxImageWidth`：v0.8.1+，（v0.9.2+已废弃），null | Number，默认为a4纸的宽度的2倍, 压缩图片的参数，某些情况下图片的长宽可能非常大，导致pdf体积也非常大，所以如果希望减小体积，那么可以通过该参数来控制图片的最大宽度

- `transparent`：v0.9.2+，Boolean，默认为false，指定导出图片的背景是否是透明的

导出为`pdf`，

> v0.9.3之前的版本这个方法不会返回数据，会直接触发下载。

> v0.6.0版本以后，需要额外注册一个ExportPDF插件

> 内部导出pdf使用的是pdf-lib库将图片转为pdf，目前当节点数量比较大时导出pdf可能会丢失部分内容，所以建议有能力的开发者自行实现pdf的导出功能，如果项目中有后端开发，也可以寻求后端开发人员的支持。

```js
import ExportPDF from 'simple-mind-map/src/plugins/ExportPDF.js'
MindMap.usePlugin(ExportPDF)
```

### json(name, withConfig)

`name`：暂时没有用处，传空字符串即可

`withConfig``：Boolean`, 默认为`true`，数据中是否包含配置，否则为纯思维导图节点数据

返回`json`数据。

### smm(name, withConfig)

`simple-mind-map`自定义的文件格式，其实就是`json`，和`json`方法返回的数据一模一样。

### md()

> v0.4.7+

导出`markdown`文件。

### getSvgData(node)

`node`: v0.9.11+, 节点实例，如果传了，那么会返回一个`clipData`对象，代表从完整的图片中裁剪出该节点区域的位置坐标数据；

获取`svg`数据，异步方法，返回一个对象：

```js
{
  node,// svg节点
  str,// svg字符串
  clipData
}
```

### xmind(name)

> v0.6.6+，需要额外注册一个ExportXMind插件

```js
import ExportXMind from 'simple-mind-map/src/plugins/ExportXMind.js'
MindMap.usePlugin(ExportXMind)
```

导出为`xmind`文件类型，异步方法，返回一个`Promise`实例，返回的数据为一个`zip`压缩包的`data:url`数据，可以直接下载。

### txt()

> v0.9.8+

导出`txt`文件。