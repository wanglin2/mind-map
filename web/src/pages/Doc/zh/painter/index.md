# Painter 插件

> v0.6.12+

节点格式刷插件。

## 注册

```js
import MindMap from 'simple-mind-map'
import Painter from 'simple-mind-map/src/plugins/Painter.js'
MindMap.usePlugin(Painter)
```

注册完且实例化`MindMap`后可通过`mindMap.painter`获取到该实例。

## 事件

> 可以通过mindMap.on('事件名称', () => {})来监听事件。

### painter_start

开始格式刷事件。

### painter_end

结束格式刷事件。

## 方法

### startPainter()

开始格式刷。

当调用了该方法后，如果当前存在激活节点，那么会默认取第一个激活的节点为指定节点，点击其他节点后，会把该节点的样式应用到被点击的其他节点，当点击画布后本次格式刷操作结束。