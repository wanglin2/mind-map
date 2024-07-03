# 如何渲染一个小地图

> 要使用小地图需要注册小地图插件

小地图可以方便看到当前画布可视区域在思维导图树的哪个部分。

虽然小地图需要你自行开发，不过`simple-mind-map`提供了一些方法来帮你快速的完成这一工作。

小地图由两部分组成，一个是当前的画布内容，一个是视口框，当缩放、移动、元素过多时画布上可能只显示了思维导图的部分内容，可以通过视口框来查看当前视口所在位置，以及可以通过在小地图上拖动来快速定位。

当注册了小地图插件后可以通过`mindMap.miniMap`获取到插件实例，然后通过`mindMap.miniMap.calculationMiniMap`方法即可获取小地图渲染需要的数据，返回的数据结构如下：

```js
{
      getImgUrl,// v0.8.0+，一个异步函数，你可以调用该函数，传递一个回调函数，回调函数可以接收一个参数，代表图片类型的小地图，你可以通过img标签进行渲染
      svgHTML, // 小地图html
      viewBoxStyle, // 视图框的位置信息
      miniMapBoxScale, // 视图框的缩放值
      miniMapBoxLeft, // 视图框的left值
      miniMapBoxTop, // 视图框的top值
}
```

完整实现思路如下：

1.准备一个宽高不为0的容器元素container，定位不为static

2.在container内创建一个小地图容器元素miniMapContainer，绝对定位，设置变换中心点为`left top`：

```css
transform-origin: left top;
```

3.在container内创建一个视口框元素viewBoxContainer，绝对定位，设置边框样式，过渡属性（可选）

4.监听data_change和view_data_change事件，最好也监听一下node_tree_render_end事件，防止初次渲染完毕后小地图没有刷新，在该事件内调用calculationMiniMap方法获取计算数据，然后将返回数据中的svgHTML渲染到miniMapContainer元素内：

```js
miniMapContainer.innerHTML = svgHTML
```

并且给miniMapContainer元素设置或更新如下样式：

```js
{
    transform: `scale(${miniMapBoxScale})`,
    left: miniMapBoxLeft + 'px',
    top: miniMapBoxTop + 'px',
}
```
5.将viewBoxStyle对象设置为viewBoxContainer元素的样式

到这一步，当画布上的思维导图变化了，小地图也会实时更新，并且视口框元素会实时反映视口在思维导图图形上的位置

6.监听container元素的mousedown、mousemove事件，并且监听window的mouseup事件（如果将mouseup绑定到container元素上，那么鼠标移出container元素整个拖拽行为无法停止），分别调用小地图插件实例的三个方法即可实现鼠标拖动时画布上的思维导图也随之拖动的效果

插件的完整信息可以参考[miniMap](https://wanglin2.github.io/mind-map/#/doc/zh/miniMap)。

在`v0.8.0+`版本之后，`calculationMiniMap`方法会返回`getImgUrl`属性，这是一个异步函数，你可以调用它并传递一个回调函数，回调函数可以接收一个参数，代表小地图图片数据，然后可以通过`img`标签进行渲染，替代前面的`svgHTML`，这样可以减少页面上的节点数量，能优化一定的性能：

```js
getImgUrl(img => {
    img.src = img
})
```

在`v0.10.2+`版本之后，支持拖拽小地图内的视口框元素来同步移动画布位置，也就是可以拖拽`viewBoxContainer`元素，要实现这个特性，需要监听`viewBoxContainer`元素的`mousedown`（需要阻止冒泡，否则会触发container元素的mousedown事件）、`mousemove`事件，分别调用小地图插件实例的方法：

```js
// mousedown事件调用
mindMap.miniMap.onViewBoxMousedown(e)
// mousemove事件调用
mindMap.miniMap.onViewBoxMousemove(e)
```

同时需要监听`mini_map_view_box_position_change`事件来实时更新`viewBoxContainer`元素：

```js
mindMap.on('mini_map_view_box_position_change', ({ left, right, top, bottom }) => {
    viewBoxStyle.left = left
    viewBoxStyle.right = right
    viewBoxStyle.top = top
    viewBoxStyle.bottom = bottom
})
```

需要注意，如果你给`viewBoxContainer`元素设置了`css`的`transition`属性来增加过渡效果，那么在`mini_map_view_box_position_change`事件里需要临时去除，否则拖动会不流畅，可以在前面的`mouseup`事件里恢复。

## 完整示例

在线Demo小地图代码：[Navigator.vue](https://github.com/wanglin2/mind-map/blob/main/web/src/pages/Edit/components/Navigator.vue)。

<iframe style="width: 100%; height: 455px; border: none;" src="https://wanglin2.github.io/playground/#eNrFV1tvG0UU/iujBWQHnLXbUgQmqUpLJZAShEoED2zlbrxje6v1zmp3bKeyLEGFArSp8sCt0EqkApFKSFGEEGrShl/jS/LEX+Cc2Znd2bXdhCcs2d6Z853LnDm37RvvBIHZ7VCjaixF9dANOIko7wSXLN9tByzkpE9C2igR5q+yjs+pUyJRy/Y81rtOG2RAGiFrkwJIKCQcq67vrNpBTLKMCLY9utiG3cW2HViG5RNi+R7lBPcQuUz8judZvuWXy2S0vz16tD96+Pdo72D045PJT1+M9o5Ofn9g+XXmR5zAL7ddn4afuA5vAe+5SmWK9h51my0OxItAE2LHD/8cf7+fCFccYIILJlxVjMAC5y2iPQsK03Vp7wrb+Ijf9qik9wcJtefy1lpo+5HLXeZLOg87NEFIHSiibicizs2gr9AGGo3kygzyGkNfZamdwLE5BZ+7q0gsLpDlS6SPPoZDH+89nuz9kBx6/N3++P4e0tD7wGcDh7wEU6oxwcR6x7PxMEKqHRSzLi/l3Qy2CG3jp3+Mf/5m9JXuZTLlYbNrex1quj7yr62ugAloiRl1m7hEFt3hMVyBdIomXLk2C84Rs3h09Tw40rJo8Pw8MJAsf4BRFl+IyJSIOqyHwVCk6YXkPa0hATZLSJt1UeMZhCByjpCOiAtNRDZik3NhzL5AQydI5WNo7W6Otn8ZP96EBD15vjPe+XK89fXw6b3h4b3hs79SEz6Ob+zsPskzKK0zdU52n43uPnmRzjO5MM8w96TDo/uTo73Rr7sQ4uNvD0bbD4aHm/883zp59Nnxb5/HNWbKjg9Z7OmrLdtvCmP6kIANXiIhpk+JcBaUyDrjHArm4NR7atheJC5qOk1MFAsQ/JuDECqxiuD/HAzYg/GAgT2TLk1dljZLVyUtoqgVIa3E055qDUVBIoR6VeKweqdNfW42Kb/mUXy8cvt9p1iQnEndKCyUYi7Mv2osHT+WgRuWoW3F25xucNy2jPHOwfHdO5M7B3Hzwc9ACkNgveV6Tkh9BH+aysiJm6klr2l4uDU53M0ryyqcofRGStNx/5MF6lHuKT7IFn6dMf4Bc6gKaeAsYLAVSqRQh6uDa7oh4IOFt+M+n6Yb84sFPEKtLvIAWPTeJZqIDsW4q/0HvA9m1XhIaQ3O5NCwBr+zeHrAw3qm7TjXumDxihtxCuEFARdXOeBJKt6UEiwZNZhiasK6dbZRC6QnUivn5D1WFPguleM5CyYsWHAKwxHYBytClhy3S+qeHUXLliG1vgv1yDIEWQJcJ6UmyQGQpTJQdaC6RiUx6dppWFwWZ8YqC3StHSmExWME1sQUgSuFkAotnlGpac23f8vQUTDLzMRokGqElQdQubDnWBkbLGxXyc0I+3vx5X6u4w8WbmZiHueeBq/mB67XSCHYKOSQUP10II5eMS6pG9zig9RS6QhBkU/6jeTuRPeQLLBzPJSePzP75DBKVj/XNKr58VSzOBsAZgQnFnecb8ApBx45FxD5zqmJz0Zk8qyelspa8MNSHFMgLssXCcswy/Hbg+wbJo3aZj2KLCMpLtjEVZ6owtjDKbWK7wWvCBwhKkmrEHA42napIIhKh9+X8vmkRKWM9nrEvA6PGVUgVeRKBItaTKtviTG5Sl6vVIINpXm23leV5rYdNl3Qq6QGULBcv6k2EtPNJK3PaPM5ZYM0W1unlidbyvSLmuWp57OvTqfpTzJ2kcH0gYcT4wpYkZOcz4hTJa+zECp+lZwPNggQXIeEzfXi+Qtvlsgbb+E37kbSBCXD80jFvBCdotzMZVBShubKEtKgzouANkpGHM748mveipgP79pChiUJEM5JT4cshyFcNHKzDI9mCBOV26YY+YvrIetFYNAt4JDVasbrdcw7nTfIJU86MAb/Ak6Okok=" />