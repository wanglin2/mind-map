# View instance

The `view` instance is responsible for view operations, and can be obtained
through `mindMap.view`

## Methods

### fit()

> v0.6.0+

Zoom the mind map to fit the canvas.

Note that this method cannot be called immediately after calling the 'setData' and 'setFullData' methods, and needs to listen to the 'node_tree_render_end' event calls 'fit'.

### translateX(step)

Translate in the `x` direction, `step`: number of pixels to translate

### translateY(step)

Translate in the `y` direction, `step`: number of pixels to translate

### translateXTo(x)

> v0.2.11+

Translate the `x` direction to a specific position

### translateYTo(y)

> v0.2.11+

Translate the `y` direction to a specific position

### reset()

Revert to the default transformation

### narrow(cx, cy)

- `cx`:（v0.6.4+）Zoom to the specified position on the canvas, default to the center point of the canvas

- `cy`:（v0.6.4+）Zoom to the specified position on the canvas, default to the center point of the canvas

Zoom out

### enlarge(cx, cy)

- `cx`:（v0.6.4+）Zoom to the specified position on the canvas, default to the center point of the canvas

- `cy`:（v0.6.4+）Zoom to the specified position on the canvas, default to the center point of the canvas

Zoom in

### getTransformData()

> v0.1.1+

Get the current transform data, can be used for display

### setTransformData(data)

> v0.1.1+

Dynamically set transform data, transform data can be obtained through the
getTransformData method"

### setScale(scale, cx, cy)

> v0.2.17+

- `scale`: Scaling values, not scaled to '1', scaled to '1' for values less than, scaled to '1' for values greater than, scaled to '1' for values greater than

- `cx`:（v0.6.4+）Zoom to the specified position on the canvas, default to the center point of the canvas

- `cy`:（v0.6.4+）Zoom to the specified position on the canvas, default to the center point of the canvas

Setting Zoom