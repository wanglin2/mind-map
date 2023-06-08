# View instance

The `view` instance is responsible for view operations, and can be obtained
through `mindMap.view`

## Methods

### fit()

> v0.6.0+

Zoom the mind map to fit the canvas.

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

### narrow()

Zoom out

### enlarge()

Zoom in

### getTransformData()

> v0.1.1+

Get the current transform data, can be used for display

### setTransformData(data)

> v0.1.1+

Dynamically set transform data, transform data can be obtained through the
getTransformData method"

### setScale(scale)

> v0.2.17+

Setting Zoom