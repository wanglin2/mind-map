# View实例

`view`实例负责视图操作，可通过`mindMap.view`获取到该实例

## 方法

### fit()

> v0.6.0+

缩放思维导图至适应画布。

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

### narrow()

缩小

### enlarge()

放大

### getTransformData()

> v0.1.1+

获取当前变换数据，可用于回显

### setTransformData(data)

> v0.1.1+

动态设置变换数据，可以通过getTransformData方法获取变换数据

### setScale(scale)

> v0.2.17+

设置缩放