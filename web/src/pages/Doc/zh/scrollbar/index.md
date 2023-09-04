# Scrollbar 插件

> v0.7.0+

该插件用于帮助开发水平和垂直滚动条的功能。

## 注册

```js
import MindMap from 'simple-mind-map'
import Scrollbar from 'simple-mind-map/src/plugins/Scrollbar.js'
MindMap.usePlugin(Scrollbar)
```

注册完且实例化`MindMap`后可通过`mindMap.scrollbar`获取到该实例。

## 事件

#### scrollbar_change

当滚动条数据发生改变时触发，你可以监听该事件来更新滚动条位置和大小。

## 方法

### setScrollBarWrapSize(width, height)

- `width`：Number，你的滚动条容器元素的宽度。

- `height`： Number，你的滚动条容器元素的高度。

设置滚动条容器的大小，对于水平滚动条，即容器的宽度，对于垂直滚动条，即容器的高度。当你的滚动条容器尺寸改变时需要再次调用该方法。

### calculationScrollbar()

> 需要先调用setScrollBarWrapSize方法设置滚动条容器元素的宽高。
>
> 一般需要监听scrollbar_change事件，然后调用该方法更新滚动条。

返回值：

```js
{
    // 垂直滚动条
    vertical: {
        top,
        height
    },
    // 水平滚动条
    horizontal: {
        left,
        width
    }
}
```

获取滚动条大小和位置，你可以根据返回值来设置到滚动条元素上，达到渲染和关心滚动条的效果。

### onMousedown(e, type)

- `e`：鼠标按下事件的事件对象。

- `type`：按下的滚动条类型，vertical（垂直滚动条）、horizontal（水平滚动条）。

滚动条元素的鼠标按下事件时需要调用该方法。