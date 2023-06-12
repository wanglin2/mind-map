# KeyboardNavigation plugin

> v0.2.17+

`KeyboardNavigation` plugin provides keyboard navigation function, that is, when you press the direction key, it will automatically find the next node and activate it.

## Register

```js
import MindMap from 'simple-mind-map'
import KeyboardNavigation from 'simple-mind-map/src/plugins/KeyboardNavigation.js'
// import KeyboardNavigation from 'simple-mind-map/src/KeyboardNavigation.js' Use this path for versions below v0.6.0

MindMap.usePlugin(KeyboardNavigation)
```

After registration and instantiation of `MindMap`, the instance can be obtained through `mindMap.keyboardNavigation`.

## Methods

### focus(dir)

`dir`：Which direction to find the next node，Optional value：`Left`、 `Up`、 `Right`、 `Down`

Focus on the next node

### getNodeRect(node)

`node`：Node

Get the location information of the node and return an object:

```js
{
    left,
    top,
    right,
    bottom
}
```

### getDistance(node1Rect, node2Rect)

`node1Rect`、`node2Rect`：The location data of nodes can be obtained through the `getNodeRect(node)`

Get the distance between two nodes

### getCenter(nodeRect)

`nodeRect`：The location data of nodes can be obtained through the `getNodeRect(node)`

Get the center point of the node