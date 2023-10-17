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

6.监听container元素的mousedown、mousemove、mouseup事件，分别调用小地图插件实例的三个方法即可实现鼠标拖动时画布上的思维导图也随之拖动的效果

插件的完整信息可以参考[miniMap](https://wanglin2.github.io/mind-map/#/doc/zh/miniMap)。

在`v0.8.0+`版本之后，`calculationMiniMap`方法会返回`getImgUrl`属性，这是一个异步函数，你可以调用它并传递一个回调函数，回调函数可以接收一个参数，代表小地图图片数据，然后可以通过`img`标签进行渲染，替代前面的`svgHTML`，这样可以减少页面上的节点数量，能优化一定的性能：

```js
getImgUrl(img => {
    img.src = img
})
```

## 完整示例

<iframe style="width: 100%; height: 455px; border: none;" src="https://wanglin2.github.io/playground/#eNrFVt2O20QUfpWRASULWSfbUgQhW5UCEkgNQqUSF0yVeu1J4sqesTzjJFWUm4oLhEBcIH6LBFyBhBStEBdsJXgaki1vwTn2jD12stpy1ZU28sz3nZ85c35m6byRJO4sY07fGUg/DRNFJFNZcp3yME5EqsiSpGzcIYIPRcYVCzpETr0oEvPbbExWZJyKmLRAQ6uUGIY8GHpJAVFHwnbEDmPYPYy9hDqUE0J5xBTBPWQeE55FEeWUd7tkc/rF5ofTzaO/N+uzzXe/nn//8Wb917+/fUu5L7hUBH6VF3KWfhgGagqyR73eDvYOCydTBeA1wHK120d/bL8+LZUbCXAhBBfeNIIgAudtoz8HhjML2fymWHygHkRM48tViWoNSPC9knC0B7/FxugSwr098B2BkaijWRJ4ikFEwyGC7QNyfJ0sMYJwpCfrn8/X35RH2n51uv18jRjGFuQ8kNAhdrUZF1z0s8hTIVxosdWuB7TTDCL4klvb/vn79scvN5/YMSQ78XNnXpQxN+Qof2d4C1xAT1w5m+ASRexwFnRDshFLuQltndwA63wM9UV0xOpsiPxFZIAoX2EOFReS14FkgZhzvA9WXUgz0hYTaPuUxGKGFp9CCTIvUJLleXG5iiypFJTF3LYSyipGNjdF3M4hQljUJ4Hws5hx5U6Yejti+HnzwbtBu6UlyxxoHXQKKYxlv9COf9TBDepYW8W2YguF29TZ/nT25NOH5w/PijaBfyutDIn+NIyClHEkf1TpaKjba6Vp6Z/Hn50//qVprG5wj9G7FWbznpEH5lPvGTm4eXVbCPWeCNj7QoZY7SDZiiDzWx3S8uHq4Jru5vTVwetFR65SR/B2C48w8qcenzAQsftQ3hBsKpbt6H/wObg1UiljIzhTwNIR/O7KYIcddIuhBOMIForBJAEKrAgZBOGM+JEn5TF1tPa3oFCok8OaEAYVWuYnUAZdQG2iiaTRWDbB6mZuxKaeAbeq2zCoKhhYrBUDV01GllR4piciIdodqmoOWT41ey11bBYMjr0ci9KX2FmB1chLlXpcjkUa98k9ic20/fyy0V5XB/dqSYlDZqz6zen2Emkli1aDqURiE3HOFbyysBVVq8pTHYgc0V/2fTXuXg8NOyrlOWsDpXHr5bf5GnStBINlriRn3NAvG+q43eI5o9ujy2Ts+lJSp6wh7LsmF039z3Gw9vGh8kLOIyQpqzJlOI1nLAfygsb/55o5a1RVgt6JFFGmCkFzHT29ykNuFrvmp/lk75OXe71kYSzvt/uisRx76SQEu0Zr4gVByCdmo3TdLUvnKX0+Mj5ot6115Xm5ZVy/ZnleRb7+lrvMfpn3hyIN88OhR+hFQ3Mzxy7VfCJSaGx9ciVZEADCgKSTk/aVq692yCuv4X/RdLULRkcUkZ57VRrj0P3yFHQ6TpGA+H5270vB4bmee0A1AAlYDhvI+gySHSeM24VPN4VRH8YMc/XwJBVzCa+0+yChq3TPC72Q3c10lNK+rZzVf9RSHZw=" />