# Drag plugin

The `Drag` plugin provides the function of node dragging, including:

1.Drag the node to move and change its position in the node tree, That is, as a child node, sibling node, etc. of other nodes

2.Drag the node to the custom canvas location

Please refer to the [Instantiation Options](/mind-map/#/doc/zh/constructor) of the `MindMap` class for configuration.

## Register

```js
import MindMap from 'simple-mind-map'
import Drag from 'simple-mind-map/src/plugins/Drag.js'
// import Drag from 'simple-mind-map/src/Drag.js' Use this path for versions below v0.6.0

MindMap.usePlugin(Drag)
```

After registration and instantiation of `MindMap`, the instance can be obtained through `mindMap.drag`.

