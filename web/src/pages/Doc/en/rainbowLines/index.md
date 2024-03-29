# RainbowLines plugin

> v0.9.9+

This plugin is used to implement rainbow lines.

Enabling rainbow lines and custom colors can be set through the instantiation option 'rainbowLinesConfig'.

The default color list is as follows:

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

## Register

```js
import MindMap from 'simple-mind-map'
import RainbowLines from 'simple-mind-map/src/plugins/RainbowLines.js'
MindMap.usePlugin(RainbowLines)
```

After registration and instantiation of `MindMap`, the instance can be obtained through `mindMap.rainbowLines`.

## Method

### updateRainLinesConfig(config = {})

If you want to modify the rainbow lines after setting them through the instantiation option 'rainbowLinesConfig', you can use this method, option `config` is same with `rainbowLinesConfig`。

```js
{
    open: false,// Is turn on rainbow lines
    colorsList: []// Customize the color list for rainbow lines. If not set, the default color list will be used
}
```

### getColorsList()

Get a list of currently used rainbow line colors.

### getNodeColor(node)

Retrieve the rainbow line color corresponding to the specified node instance.

### getSecondLayerAncestor(node)

Retrieve the second level ancestor node instance of a node instance.