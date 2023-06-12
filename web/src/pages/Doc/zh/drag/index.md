# Drag插件

`Drag`插件提供节点拖拽的功能，包括：

1.拖拽节点进行移动，改变节点在节点树中的位置，即作为其他节点的子节点、兄弟节点等等

2.拖拽节点到自定义的画布位置

配置请参考`MindMap`类的[实例化选项](/mind-map/#/doc/zh/constructor)。

## 注册

```js
import MindMap from 'simple-mind-map'
import Drag from 'simple-mind-map/src/plugins/Drag.js'
// import Drag from 'simple-mind-map/src/Drag.js' v0.6.0以下版本使用该路径

MindMap.usePlugin(Drag)
```

注册完且实例化`MindMap`后可通过`mindMap.drag`获取到该实例。

