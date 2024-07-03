# View实例

`view`实例负责视图操作，可通过`mindMap.view`获取到该实例

## 方法

### fit()

> v0.6.0+

缩放思维导图至适应画布。

注意该方法不能在`setData`、`setFullData`方法调用后立即调用，需要监听`node_tree_render_end`事件调用`fit`。

### translateX(step)

`x`方向进行平移，`step`：要平移的像素

### translateY(step)

`y`方向进行平移，`step`：要平移的像素

### translateXTo(x)

> v0.2.11+

平移`x`方向到指定位置

### translateYTo(y)

> v0.2.11+

平移`y`方向到指定位置

### reset()

恢复到默认的变换

### narrow(cx, cy)

- `cx`：（v0.6.4+）以画布指定位置进行缩放，默认为画布中心点

- `cy`：（v0.6.4+）以画布指定位置进行缩放，默认为画布中心点

缩小

### enlarge(cx, cy)

- `cx`：（v0.6.4+）以画布指定位置进行缩放，默认为画布中心点

- `cy`：（v0.6.4+）以画布指定位置进行缩放，默认为画布中心点

放大

### getTransformData()

> v0.1.1+

获取当前变换数据，可用于回显

### setTransformData(data)

> v0.1.1+

动态设置变换数据，可以通过getTransformData方法获取变换数据

### setScale(scale, cx, cy)

> v0.2.17+

- `scale`: 缩放数值，未缩放为`1`，小于为`1`缩小，大于`1`为放大

- `cx`：（v0.6.4+）以画布指定位置进行缩放，默认为画布中心点

- `cy`：（v0.6.4+）以画布指定位置进行缩放，默认为画布中心点

设置缩放

