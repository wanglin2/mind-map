# MiniMap插件

> v0.2.11+

用于帮助快速开发小地图功能，小地图由两部分组成，一个是当前的画布内容，一个是视口框，当缩放、移动、元素过多时画布上可能只显示了思维导图的部分内容，可以通过视口框来查看当前视口所在位置，以及可以通过在小地图上拖动来快速定位。

## 注册

```js
import MindMap from 'simple-mind-map'
import MiniMap from 'simple-mind-map/src/plugins/MiniMap.js'
// import MiniMap from 'simple-mind-map/src/MiniMap.js' v0.6.0以下版本使用该路径

MindMap.usePlugin(MiniMap)
```

注册完且实例化`MindMap`后可通过`mindMap.miniMap`获取到该实例。

## 方法

### calculationMiniMap(boxWidth, boxHeight)

计算小地图的渲染数据，该函数内会调用`getMiniMap()`方法，所以一般使用该函数即可。

`boxWidth`：小地图容器的宽度

`boxHeight`：小地图容器的高度

函数返回内容：

```js
{
      getImgUrl,// v0.8.0+，一个异步函数，你可以调用该函数，传递一个回调函数，回调函数可以接收一个参数，代表图片类型的小地图，你可以通过img标签进行渲染
      svgHTML, // 小地图html，推荐使用getImgUrl方式获取图片类型的小地图，减少页面DOM数量，优化性能
      viewBoxStyle, // 视图框的位置信息
      miniMapBoxScale, // 视图框的缩放值
      miniMapBoxLeft, // 视图框的left值
      miniMapBoxTop, // 视图框的top值
}
```

小地图思路：

1.准备一个容器元素`container`，定位不为`static`

如果使用的是富文本编辑模式，那么最好给`container`内部的元素去除一下默认样式，否则可能会出现节点内文本偏移的问题：

```css
.container * {
  margin: 0;
  padding: 0;
}
```

2.在`container`内创建一个小地图容器元素`miniMapContainer`，绝对定位

3.在`container`内创建一个视口框元素`viewBoxContainer`，绝对定位，设置边框样式，过渡属性（可选）

4.监听`data_change`和`view_data_change`事件，在该事件内调用`calculationMiniMap`方法获取计算数据，然后将`svgHTML`渲染到`miniMapContainer`元素内，并且设置`miniMapContainer`元素的样式：

```js
:style="{
    transform: `scale(${miniMapBoxScale})`,
    left: miniMapBoxLeft + 'px',
    top: miniMapBoxTop + 'px',
}"
```

5.将`viewBoxStyle`对象设置为`viewBoxContainer`元素的样式

到这一步，当画布上的思维导图变化了，小地图也会实时更新，并且视口框元素会实时反映视口在思维导图图形上的位置

6.监听`container`元素的`mousedown`、`mousemove`、`mouseup`事件，分别调用下面即将介绍的三个方法即可实现鼠标拖动时画布上的思维导图也随之拖动的效果

### onMousedown(e)

小地图鼠标按下事件执行该函数

`e`：事件对象

### onMousemove(e, sensitivityNum = 5)

小地图鼠标移动事件执行该函数

`e`：事件对象

`sensitivityNum`：拖动灵敏度，灵敏度越大，在小地图上拖动相同距离时实际上的画布拖动距离就越大

### onMouseup()

小地图鼠标松开事件执行该函数