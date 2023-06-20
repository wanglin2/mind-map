# TouchEvent plugin

> v0.6.0+

This plugin supports mobile touch events for users. The principle is to listen for 'touchstart', 'touchmove', and 'touchend' events on the mobile end, and then dispatch corresponding mouse events.

Currently, it supports single finger touch to move the canvas, click to activate nodes, double finger zoom the canvas, single finger double-click to reset and edit nodes.

## Register

```js
import MindMap from 'simple-mind-map'
import TouchEvent from 'simple-mind-map/src/plugins/TouchEvent.js'

MindMap.usePlugin(TouchEvent)
```

After registration and instantiation of `MindMap`, the instance can be obtained through `mindMap.touchEvent`.