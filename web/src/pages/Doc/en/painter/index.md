# Painter plugin

> v0.6.12+

Node format brush plugin.

## Register

```js
import MindMap from 'simple-mind-map'
import Painter from 'simple-mind-map/src/plugins/Painter.js'
MindMap.usePlugin(Painter)
```

After registration and instantiation of `MindMap`, the instance can be obtained through `mindMap.painter`.

## Event

> You can use mindMap.on('event name', () => {}) method to listen events.

### painter_start

The event of painter start.

### painter_end

The event of painter end.

## Method

### startPainter()

Start painter.

After calling this method, if there is currently an active node, the first active node will be taken as the specified node by default. After clicking on other nodes, the style of that node will be applied to the other nodes being clicked. When clicking on the canvas, the format brushing operation ends.