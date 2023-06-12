# Watermark plugin

> 0.2.24+

`Watermark` instance is responsible for displaying the watermark.

Please refer to the [Instantiation Options](/mind-map/#/doc/zh/constructor) of the `MindMap` class for configuration.

## Register

```js
import MindMap from 'simple-mind-map'
import Watermark from 'simple-mind-map/src/plugins/Watermark.js'
// import Watermark from 'simple-mind-map/src/Watermark.js' Use this path for versions below v0.6.0

MindMap.usePlugin(Watermark)
```

After registration and instantiation of `MindMap`, the instance can be obtained through `mindMap.watermark`.

## Methods

### draw()

Redraw the watermark.

Note: For imprecise rendering, some watermarks beyond the visible area will be drawn. If you have extreme performance requirements, it is recommended to develop the watermark function yourself.

### updateWatermark(config)

Update watermark config. Example:

```js
mindMap.watermark.updateWatermark({
    text: 'Watermark text',
    lineSpacing: 100,
    textSpacing: 100,
    angle: 50,
    textStyle: {
      color: '#000',
      opacity: 1,
      fontSize: 20
    }
})
```

### hasWatermark()

> v0.3.2+

Gets whether the watermark exists.