# KeyboardNavigation实例

> v0.2.17+

`KeyboardNavigation`实例负责处理键盘导航，也就是当你按下方向键时会自动寻找下一个节点并激活，可通过`mindMap.keyboardNavigation`获取到该实例

## 方法

### focus(dir)

`dir`：要寻找哪个方向的下一个节点，可选值：`Left`、 `Up`、 `Right`、 `Down`

聚焦到下一个节点

### getNodeRect(node)

`node`：节点

获取节点的位置信息，返回一个对象：

```js
{
    left,
    top,
    right,
    bottom
}
```

### getDistance(node1Rect, node2Rect)

`node1Rect`、`node2Rect`：节点的位置数据，可通过`getNodeRect(node)`方法获取

获取两个节点的距离

### getCenter(nodeRect)

`nodeRect`：节点的位置数据，可通过`getNodeRect(node)`方法获取

获取节点的中心点