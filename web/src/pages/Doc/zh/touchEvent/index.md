# TouchEvent插件

> v0.6.0+

该插件用户支持移动端触摸事件。原理是监听移动端的`touchstart`、`touchmove`、`touchend`事件，然后派发对应的鼠标事件。

目前支持单指触摸移动画布、点击激活节点，双指缩放画布，单指双击复位和编辑节点。

## 注册

```js
import MindMap from 'simple-mind-map'
import TouchEvent from 'simple-mind-map/src/plugins/TouchEvent.js'

MindMap.usePlugin(TouchEvent)
```

注册完且实例化`MindMap`后可通过`mindMap.touchEvent`获取到该实例。