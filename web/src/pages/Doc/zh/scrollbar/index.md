# Scrollbar 插件

> v0.7.0+
>
> v0.7.1+进行了重构，下面的文档为新文档。

该插件用于帮助开发水平和垂直滚动条的功能。详细使用方式请参考教程。

## 注册

```js
import MindMap from 'simple-mind-map'
import Scrollbar from 'simple-mind-map/src/plugins/Scrollbar.js'
MindMap.usePlugin(Scrollbar)
```

注册完且实例化`MindMap`后可通过`mindMap.scrollbar`获取到该实例。

## 事件

#### scrollbar_change(data)

- `data`：滚动条数据，格式如下：

```js
{
    // 垂直滚动条
    vertical: {
        top,// 垂直滚动条的top值，百分比数值
        height// 垂直滚动条的高度，百分比数值
    },
    // 水平滚动条
    horizontal: {
        left,// 水平滚动条的left值，百分比数值
        width// 水平滚动条的宽度，百分比数值
    }
}
```

当滚动条数据发生改变时触发，你可以监听该事件来更新滚动条位置和大小。接收一个参数，代表当前最新的滚动条位置和大小信息，你可以使用它来更新滚动条元素的样式。

## 方法

### setScrollBarWrapSize(width, height)

- `width`：Number，你的滚动条容器元素的宽度。

- `height`： Number，你的滚动条容器元素的高度。

设置滚动条容器的大小，对于水平滚动条，即容器的宽度，对于垂直滚动条，即容器的高度。当你的滚动条容器尺寸改变时需要再次调用该方法。

### calculationScrollbar()

> 通常你不需要调用该方法，如果初次渲染滚动条时滚动条没有更新，那么可以手动调用该方法获取滚动条数据。
>
> 需要先调用setScrollBarWrapSize方法设置滚动条容器元素的宽高。

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

获取滚动条大小和位置。

### onMousedown(e, type)

- `e`：鼠标按下事件的事件对象。

- `type`：按下的滚动条类型，vertical（垂直滚动条）、horizontal（水平滚动条）。

滚动条元素的鼠标按下事件时需要调用该方法。

### onClick(e, type)

- `e`：鼠标点击事件的事件对象。

- `type`：鼠标点击的滚动条类型，vertical（垂直滚动条）、horizontal（水平滚动条）。

滚动条元素的的点击事件时需要调用该方法。