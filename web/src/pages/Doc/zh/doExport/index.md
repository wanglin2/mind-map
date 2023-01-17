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

### png()

导出为`png`，异步方法，返回图片数据，`data:url`数据，可以自行下载或显示

### svg()

导出为`svg`，异步方法，返回`svg`数据，`data:url`数据，可以自行下载或显示

### getSvgData()

获取`svg`数据，异步方法，返回一个对象：

```js
{
  node// svg对象
  str// svg字符串
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
