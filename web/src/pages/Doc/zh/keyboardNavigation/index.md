# KeyboardNavigation插件

> v0.2.17+

`KeyboardNavigation`插件提供键盘导航的功能，也就是当你按下方向键时会自动寻找下一个节点并激活

## 注册

```js
import MindMap from 'simple-mind-map'
import KeyboardNavigation from 'simple-mind-map/src/plugins/KeyboardNavigation.js'
// import KeyboardNavigation from 'simple-mind-map/src/KeyboardNavigation.js' v0.6.0以下版本使用该路径

MindMap.usePlugin(KeyboardNavigation)
```

注册完且实例化`MindMap`后可通过`mindMap.keyboardNavigation`获取到该实例。

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