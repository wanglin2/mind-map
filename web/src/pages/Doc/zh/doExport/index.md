# Export 插件

`Export`插件提供导出的功能。

## 注册

```js
import MindMap from 'simple-mind-map'
import Export from 'simple-mind-map/src/Export.js'

MindMap.usePlugin(Export)
```

注册完且实例化`MindMap`后可通过`mindMap.doExport`获取到该实例。

## 方法

### png(name, transparent = false)

- `name`：名称，可不传

- `transparent`：v0.5.7+，指定导出图片的背景是否是透明的

导出为`png`，异步方法，返回图片数据，`data:url`数据，可以自行下载或显示

### svg(name, plusCssText)

- `name`：`svg`标题

- `plusCssText`：v0.4.0+，当开启了节点富文本编辑，且`domToImage`传了`false`时，可以添加附加的`css`样式，如果`svg`中存在`dom`节点，想要设置一些针对节点的样式可以通过这个参数传入，比如：

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

导出为`svg`，异步方法，返回`svg`数据，`data:url`数据，可以自行下载或显示

### getSvgData()

获取`svg`数据，异步方法，返回一个对象：

```js
{
  node// svg对象
  str// svg字符串，如果开启了富文本编辑且domToImage设为true，那么该值返回的svg字符内的dom节点会被转换成图片的形式
  nodeWithDomToImg// v0.4.0+，DOM节点转换为图片后的svg对象，只有当开启了富文本编辑且domToImage设为true才有值，否则为null
}
```

### pdf(name)

> v0.2.1+

`name`：文件名称

导出为`pdf`

### json(name, withConfig)

`name`：暂时没有用处，传空字符串即可

`withConfig``：Boolean`, 默认为`true`，数据中是否包含配置，否则为纯思维导图节点数据

返回`json`数据，`data:url`数据，可以自行下载

### md()

> v0.4.7+

导出`markdown`文件，返回`data:url`数据，可以自行下载