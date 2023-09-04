# 如何渲染滚动条

> 需要先注册 Scrollbar 插件

滚动条分为水平和垂直滚动条，所以你需要创建如下模板：

```html
<!-- 垂直 -->
<div class="scrollbar verticalScrollbar" ref="verticalScrollbarRef">
    <div
        class="scrollbarInner"
        :style="verticalScrollbarStyle"
        @mousedown="onVerticalScrollbarMousedown"
    ></div>
</div>

<!-- 水平 -->
<div class="scrollbar horizontalScrollbar" ref="horizontalScrollbarRef">
    <div
        class="scrollbarInner"
        :style="horizontalScrollbarStyle"
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

垂直滚动条的`top`和`height`、水平滚动条的`left`和`width`值需要调用插件的方法获取。

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
mindMap.('scrollbar_change', this.updateScrollbar)

// 调用插件方法更新滚动条位置和大小
{
    updateScrollbar() {
        const {
            vertical,
            horizontal
        } = mindMap.scrollbar.calculationScrollbar()
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

调用插件的`calculationScrollbar`方法来获取滚动条元素的位置和大小，返回的是百分比数值，所以需要添加`%`。

最后，需要给滚动条元素绑定`mousedown`事件，并且调用插件的`onMousedown`方法：

```js
// 垂直滚动条元素
mindMap.scrollbar.onMousedown(e, 'vertical')

// 水平滚动条元素
mindMap.scrollbar.onMousedown(e, 'horizontal')
```

以上就是实现滚动条渲染的全部步骤。