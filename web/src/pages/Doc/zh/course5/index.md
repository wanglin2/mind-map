# 设置基础样式

基础样式修改的其实是主题配置，所以会通过`setThemeConfig`方法设置。

## 设置背景

画布背景可以设置颜色或图片。

### 设置画布背景颜色

```js
mindMap.setThemeConfig({
    backgroundColor: '#A4DD00'
})
```

### 设置背景图片

背景图片还支持设置三个属性：`图片重复`、`图片位置`、`图片大小`。其实就是`css`的`background-repeat`、`background-position`、`background-size`三个属性。

不过导出为图片的时候背景图片的行为和`css`并不完全一致，因为导出是通过`canvas`实现的，而`canvas`并不存在这三个属性，所以是通过有限模拟`css`这三个属性行为实现的，详情可以阅读文章[如何在canvas中模拟css的背景图片样式](https://juejin.cn/post/7204854015463538744)。

```js
mindMap.setThemeConfig({
    backgroundImage: 'xxx.png',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    backgroundSize: 'cover'
})
```

`backgroundRepeat`支持设置的值如下：

```js
[
  {
    name: '不重复',
    value: 'no-repeat'
  },
  {
    name: '重复',
    value: 'repeat'
  },
  {
    name: '水平方向重复',
    value: 'repeat-x'
  },
  {
    name: '垂直方向重复',
    value: 'repeat-y'
  }
]
```

`backgroundPosition`支持设置的值如下：

```js
[
  {
    name: '默认',
    value: '0% 0%'
  },
  {
    name: '左上',
    value: 'left top'
  },
  {
    name: '左中',
    value: 'left center'
  },
  {
    name: '左下',
    value: 'left bottom'
  },
  {
    name: '右上',
    value: 'right top'
  },
  {
    name: '右中',
    value: 'right center'
  },
  {
    name: '右下',
    value: 'right bottom'
  },
  {
    name: '中上',
    value: 'center top'
  },
  {
    name: '居中',
    value: 'center center'
  },
  {
    name: '中下',
    value: 'center bottom'
  }
]
```

`backgroundSize`支持设置的值如下：

```js
[
  {
    name: '自动',
    value: 'auto'
  },
  {
    name: '覆盖',
    value: 'cover'
  },
  {
    name: '保持',
    value: 'contain'
  }
]
```

## 设置连线样式

设置节点间的连线样式，支持：`颜色`、`粗细`、`虚线`、`风格`。

目前支持三种连线风格，分别是：曲线（curve）、直线（straight）、直连（direct），其中曲线只在`logicalStructure`逻辑结构图和`mindMap`思维导图两种结构时生效。

```js
mindMap.setThemeConfig({
    lineColor: '#009CE0',
    lineWidth: 3,
    lineDasharray: '15, 10, 5, 10, 15',
    lineStyle: 'curve'
})
```

## 设置概要的连线样式

概要节点前面会有一条弧线，它的颜色和粗细可以修改。

```js
mindMap.setThemeConfig({
    generalizationLineColor: '#FA28FF',
    generalizationLineWidth: 4
})
```

## 设置关联线的样式

> 关联线需要使用关联线插件

关联线支持设置颜色和粗细，因为它还可以被激活选中，所以还可以设置激活时的颜色和粗细。

```js
mindMap.setThemeConfig({
    associativeLineColor: '#FA28FF',
    associativeLineWidth: 4,
    associativeLineActiveColor: '#9F0500',
    associativeLineActiveWidth: 6
})
```

## 设置节点边框风格

默认节点的边框时封闭图形，不过也提供了一种只有底边边框的风格。

```js
mindMap.setThemeConfig({
    nodeUseLineStyle: true
})
```

## 设置节点内边距

```js
mindMap.setThemeConfig({
    paddingX: 30,
    paddingY: 20
})
```

## 设置节点内的图片最大的显示宽高

```js
mindMap.setThemeConfig({
    imgMaxWidth: 100,
    imgMaxHeight: 50
})
```

## 设置节点内图标的显示大小

```js
mindMap.setThemeConfig({
    iconSize: 30,
})
```

## 设置节点外边距

设置节点外边距稍微麻烦一点，需要针对不同层级的节点进行设置。

```js
mindMap.setThemeConfig({
    // 二级节点样式
    second: {
        marginX: 30,
        marginY: 20
    },
    // 三级及以下节点样式
    node: {
        marginX: 40,
        marginY: 30
    }
})
```

## 完整示例

<iframe style="width: 100%; height: 455px; border: none;" src="https://wanglin2.github.io/playground/#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" />