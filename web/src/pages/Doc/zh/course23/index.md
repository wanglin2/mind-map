# 如何渲染滚动条

> v0.7.1+, 需要先注册 Scrollbar 插件

滚动条分为水平和垂直滚动条，所以你需要创建如下模板：

```html
<!-- 垂直 -->
<div class="scrollbar verticalScrollbar" ref="verticalScrollbarRef" @click="onVerticalScrollbarClick">
    <div
        class="scrollbarInner"
        :style="verticalScrollbarStyle"
        @click.stop
        @mousedown="onVerticalScrollbarMousedown"
    ></div>
</div>

<!-- 水平 -->
<div class="scrollbar horizontalScrollbar" ref="horizontalScrollbarRef" @click="onHorizontalScrollbarClick">
    <div
        class="scrollbarInner"
        :style="horizontalScrollbarStyle"
        @click.stop
        @mousedown="onHorizontalScrollbarMousedown"
    ></div>
</div>
```

外层元素为滚动条容器元素，内层为滚动条元素。

内层滚动条元素一般需要设置成绝对定位，样式示例如下：

```css
.scrollbar {
    position: relative;
    background-color: #f5f5f5;
    border-radius: 10px;
    overflow: hidden;

    &.verticalScrollbar {
        width: 10px;
        height: 500px;

        .scrollbarInner {
            width: 10px;
            left: 0;
        }
    }

    &.horizontalScrollbar {
        width: 500px;
        height: 10px;

        .scrollbarInner {
            height: 10px;
            top: 0;
        }
    }

    .scrollbarInner {
        position: absolute;
        background-color: #ccc;
        border-radius: 10px;
    }
}
```

垂直滚动条的`top`和`height`、水平滚动条的`left`和`width`值需要根据插件返回的数据进行设置。

首先你需要调用`setScrollBarWrapSize`方法传递你的滚动条容器的宽和高：

```js
// 水平滚动条容器的宽度
const { width } = this.$refs.horizontalScrollbarRef.getBoundingClientRect()
// 垂直滚动条容器的高度
const { height } = this.$refs.verticalScrollbarRef.getBoundingClientRect()
mindMap.scrollbar.setScrollBarWrapSize(width, height)
```

如果容器大小发生了改变需要再次调用该方法传递改变后的大小。

然后你需要监听`scrollbar_change`方法来获取滚动条大小和位置数据：

```js
mindMap.on('scrollbar_change', this.updateScrollbar)

// 根据事件返回的滚动条数据更新滚动条元素：
{
    updateScrollbar(data) {
        const {
            vertical,
            horizontal
        } = data
        this.verticalScrollbarStyle = {
            top: vertical.top + '%',
            height: vertical.height + '%'
        }
        this.horizontalScrollbarStyle = {
            left: horizontal.left + '%',
            width: horizontal.width + '%'
        }
    }
}
```

事件返回数据的是百分比数值，所以需要添加`%`。

最后，需要给滚动条元素绑定`mousedown`事件，并且调用插件的`onMousedown`方法：

```js
// 垂直滚动条元素
mindMap.scrollbar.onMousedown(e, 'vertical')

// 水平滚动条元素
mindMap.scrollbar.onMousedown(e, 'horizontal')
```

这样就能实现鼠标拖动滚动条更新画布位置的功能。

如果你还需要实现点击滚动条容器元素实现滚动条位置的跳变功能，那么需要给滚动条元素绑定点击事件，并且调用插件的`onClick`方法：

```js
// 垂直滚动条元素
mindMap.scrollbar.onClick(e, 'vertical')

// 水平滚动条元素
mindMap.scrollbar.onClick(e, 'horizontal')
```

以上就是实现滚动条渲染的全部步骤。