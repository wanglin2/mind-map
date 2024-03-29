# RainbowLines插件

> v0.9.9+

该插件用于实现彩虹线条。

开启彩虹线条及自定义颜色可以通过实例化选项`rainbowLinesConfig`设置。

默认的颜色列表如下：

```
[
  'rgb(255, 213, 73)',
  'rgb(255, 136, 126)',
  'rgb(107, 225, 141)',
  'rgb(151, 171, 255)',
  'rgb(129, 220, 242)',
  'rgb(255, 163, 125)',
  'rgb(152, 132, 234)'
]
```

## 注册

```js
import MindMap from 'simple-mind-map'
import RainbowLines from 'simple-mind-map/src/plugins/RainbowLines.js'
MindMap.usePlugin(RainbowLines)
```

注册完且实例化`MindMap`后可通过`mindMap.rainbowLines`获取到该实例。

## 方法

### updateRainLinesConfig(config = {})

如果你在通过实例化选项`rainbowLinesConfig`设置了彩虹线条后想修改，那么可以使用该方法，参数`config`同`rainbowLinesConfig`。

```js
{
    open: false,// 是否开启彩虹线条
    colorsList: []// 自定义彩虹线条的颜色列表，如果不设置，会使用默认颜色列表
}
```

### getColorsList()

获取当前使用的彩虹线条颜色列表。

### getNodeColor(node)

获取指定的节点实例对应的彩虹线条颜色。

### getSecondLayerAncestor(node)

获取一个节点实例的第二层级的祖先节点实例。