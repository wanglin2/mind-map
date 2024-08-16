# 设置节点样式

本节将介绍如何更新当前激活节点的样式。

```js
node.setStyle('样式属性', '样式值')
```

## 设置样式

### 设置文字样式

文字样式目前支持：`字体`、`字号`、`行高`、`颜色`、`加粗`、`斜体`、`划线`。

这些样式选择的UI界面都需要你自行开发，然后调用节点的`setStyle`方法更新。

同样首先需要监听节点的激活事件来换取当前激活的节点：

```js
const activeNodes = shallowRef([])
mindMap.on('node_active', (node, activeNodeList) => {
    activeNodes.value = activeNodeList
})
```

```js
// 设置字体
activeNodes.value.forEach(node => {
    node.setStyle('fontFamily', '宋体, SimSun, Songti SC')
})

// 设置字号
activeNodes.value.forEach(node => {
    node.setStyle('fontSize', 16)
})

// 设置行高
activeNodes.value.forEach(node => {
    node.setStyle('lineHeight', 1.5)
})

// 设置颜色
activeNodes.value.forEach(node => {
    node.setStyle('color', '#fff')
})

// 设置加粗
activeNodes.value.forEach(node => {
    node.setStyle('fontWeight', 'bold')// node.setStyle('fontWeight', 'normal')
})

// 设置划线
activeNodes.value.forEach(node => {
    // 下划线
    node.setStyle('textDecoration', 'underline')
    // 删除线
    node.setStyle('textDecoration', 'line-through')
    // 上划线
    node.setStyle('textDecoration', 'overline')
})
```

### 设置边框样式

边框样式支持设置：`颜色`、`虚线`、`线宽`、`圆角`。

设置边框样式前请先检查线宽是否被设置成了0。

```js
// 设置边框颜色
activeNodes.value.forEach(node => {
    node.setStyle('borderColor', '#000')
})

// 设置边框虚线
activeNodes.value.forEach(node => {
    node.setStyle('borderDasharray', '5,5')// node.setStyle('borderDasharray', 'none')
})

// 设置边框宽度
activeNodes.value.forEach(node => {
    node.setStyle('borderWidth', 2)
})

// 设置边框圆角
activeNodes.value.forEach(node => {
    node.setStyle('borderRadius', 5)
})
```

### 设置背景样式

背景样式也就是背景颜色。

```js
activeNodes.value.forEach(node => {
    node.setStyle('fillColor', '#fff')
})
```

### 设置形状样式

目前支持以下形状：

```js
[
  {
    name: '矩形',
    value: 'rectangle'
  },
  {
    name: '菱形',
    value: 'diamond'
  },
  {
    name: '平行四边形',
    value: 'parallelogram'
  },
  {
    name: '圆角矩形',
    value: 'roundedRectangle'
  },
  {
    name: '八角矩形',
    value: 'octagonalRectangle'
  },
  {
    name: '外三角矩形',
    value: 'outerTriangularRectangle'
  },
  {
    name: '内三角矩形',
    value: 'innerTriangularRectangle'
  },
  {
    name: '椭圆',
    value: 'ellipse'
  },
  {
    name: '圆',
    value: 'circle'
  }
]
```

设置形状前请先确认边框宽度是否被设置成了0。

```js
activeNodes.value.forEach(node => {
    node.setStyle('shape', 'circle')
})
```

### 设置线条样式

节点线条支持设置：`颜色`、`虚线`、`线宽`。

```js
// 设置线条颜色
activeNodes.value.forEach(node => {
    node.setStyle('lineColor', '#000')
})

// 设置线条虚线
activeNodes.value.forEach(node => {
    node.setStyle('lineDasharray', '5, 5, 1, 5')// node.setStyle('lineDasharray', 'none')
})

// 设置线条宽度
activeNodes.value.forEach(node => {
    node.setStyle('lineWidth', 3)
})
```

### 设置节点内边距

节点内边距支持设置水平和垂直方向的内边距。

```js
activeNodes.value.forEach(node => {
    node.setStyle('paddingX', 50)
    node.setStyle('paddingY', 50)
})
```

## 完整示例

<iframe style="width: 100%; height: 455px; border: none;" src="https://wanglin2.github.io/playground/#eNrFV91uG0UUfpXRVmgd5KwdIFwYJypNikBqUBUjFdSt0Hh3bA/MzqxmZ52GyBIqUKAtAlSJClClhhu4gHCDqJI27cvEP4/RM/tfex35wlKj2N6Z+b5zzsz55szsgfGu71v9kBgNoxk4kvoKBUSF/qbNqecLqdABkqRTRYLviJAr4lZR0MOMib1d0kED1JHCQyZYMDPGDuXuDvbjIdsIoJuRVQ96Vz3s24bNEbI5IwrpPo3cQDxkzOY2r9XQ8PT+8PsfRs+/HP33ZPzb15M7t8a3joffPZgc/mVzR/BAIewo2icfCpcEwM3jqVy/sZJYmRw9G58ejX75dvjPg9Gjx8OnP6ZkmN9H5KZqqX1GgF1ZQRub6EAHVTBr9TELidUR8jJ2ehUOfRkMId20wE5ko2J2BFfvYY+yfbOKzOHR3bPT+1XUol4r5PAreFdR1NoyIbY57Bb9ggB37e1yCKOcvE9ot6c0yFovRzmCCakjkMQ9x9e11JDZFmweUMEKbRNHSKyo4BqsY1hVPSnCbk+TbDWA78FLyz15djw6vD2z3JeEdIlc4oK3I4Nb6Xwv1Ov1OfOIkdsYNCIljvKzXl0/F3yNuqoHwDfOA+1il4YBoHQuSpfiq3ujX/8tLkJ3SWKjjGUzbwNvXjKGp3+M7/xfiKDVw/6SEgDL6WvBmg6VDpsbwvjk+ejh4YweroCUlqgGrcxFtKBxU0pA8L8G3+cwUjm8OW+Zb38Dsp88fliY4FXsupQvKeF+bOxjLbZ6eZwJ5JMUUogzq9uVQiiFukv20npdSdwT1kCucEKPcGV1ibrMiH68tP+BWzET5hbUEQyLI82VasxyscKNdAZQ3w3dYRuFrrhbFxbdbRujR8dxbY9PBP03SIxpoNOjzJWEa/D13MaUuVIv057OTu6NT/6cdvaywxKnN/KxIu4VRZA+Jn0pj3KqdoVQWldXRUB1uQamyUgnqvEOpA7SFLEGK+/EZy9CIN/x7z8Pf/o7jik+bc9O7p49gYqRCcQSvGJqrX0aixcMRmKtRgK8QgOVa6pE4FpfCS52D5qET7MW3zTgjgENReB6gBWBFkJNl/aRw3AQbNhGEsQ28YRtRMMJgLr5aKZEgDRrMFoEppaUEKyNAYL6q7QDHcVQGYHzuYc2UT3zYqtmO1RKcHTRYdT5HBjFWwPgZq8XzVpMSUxABCUmCidhZqR4aC5mpJtzo1NmIVZU/TNifDgsRMyqdUYulvWFTCT1MPee1swpdp7A9KlZK+gDmoEOJEJcTG6btmHV4itmUscsEniWEwS2kandKkgpVeuerusNtFavvxbhEPKz7SMJeASBRAPRztOfC9OSS03lRNwOBAtVTERIb8IGqictJfy8Meu+F93LGuitet2/mXou9/t66tnDskvBb2o1OQjSjix0K9kBC0a8lkaQBJ21wSDs3igHRtWIM6Av9dZngeDwDhGZt5MByEBWFm0DXhHiWmjV4NGScChRj+hkrbal2AuIBCO2kZS1kteGmDubas1KYhsYgxcal4r4" />