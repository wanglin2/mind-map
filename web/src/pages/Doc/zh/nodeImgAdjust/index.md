# NodeImgAdjust插件

> v0.6.5+

该插件提供拖拽调整节点内图片大小的功能。

## 注册

```js
import MindMap from 'simple-mind-map'
import NodeImgAdjust from 'simple-mind-map/src/plugins/NodeImgAdjust.js'

MindMap.usePlugin(NodeImgAdjust)
```

注册完且实例化`MindMap`后可通过`mindMap.nodeImgAdjust`获取到该实例。