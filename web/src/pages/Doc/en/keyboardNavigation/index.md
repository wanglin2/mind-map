# KeyboardNavigation instance

> v0.2.17+

`KeyboardNavigation` instance is responsible for handling keyboard navigation, that is, when you press the direction key, it will automatically find the next node and activate it, can be obtained through `mindMap.keyboardNavigation`

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