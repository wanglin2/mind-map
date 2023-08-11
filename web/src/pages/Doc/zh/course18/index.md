# 如何持久化数据

> 目前提供了一种新方式，可以参考[对接自己的存储服务](https://wanglin2.github.io/mind-map/#/doc/zh/deploy/%E5%AF%B9%E6%8E%A5%E8%87%AA%E5%B7%B1%E7%9A%84%E5%AD%98%E5%82%A8%E6%9C%8D%E5%8A%A1)。

在线`demo`的数据是存储在电脑本地的，也就是`localStorage`里，当然，你也可以存储到数据库中。

## 保存数据

保存数据，一般有两种做法，一是让用户手动保存，二是当画布上的数据改变后自动保存，显然，第二中体验更好一点。

要获取画布的数据，可以使用`getData`方法，可以传递一个参数，`true`指定返回的数据中包含配置数据，`false`指定只返回节点树数据。

```js
const data = mindMap.getData(true)
```

包含配置的完整数据结构：

```js
{
    layout,
    root,
    theme: {
        template,
        config
    },
    view
}
```

你可以直接把获取到的数据保存起来即可。

如果要自动保存，那么肯定需要监听相关事件：

```js
this.$bus.$on('data_change', data => {
    // 节点树数据改变
    // data即完整数据中的root部分
})
this.$bus.$on('view_data_change', data => {
    // 视图数据改变
    // data即完整数据中的view部分
})
```

主题和结构的改变一般是开发者提供一个ui界面让用户选择，所以可以自行触发保存。

## 回显数据

当从数据库获取到了保存的数据，那么怎么渲染到画布上呢，首先可以直接在`new`一个`MindMap`实例时直接传入：

```js
// 从数据中取出各个部分
let { root, layout, theme, view } = storeData
let mindMap = new MindMap({
    el: container,
    data: root,
    layout: layout,
    theme: theme.template,
    themeConfig: theme.config,
    viewData: view,
    // ...
})
```

其次如果是包含配置的完整数据也可以调用`setFullData`方法：

```js
mindMap.setFullData(data)
```

如果是纯节点数据可以调用`setData`方法：

```js
mindMap.setData(data)
```

修改结构可以调用`setLayout`方法：

```js
mindMap.setLayout(layout)
```

设置主题可以调用`setTheme`方法：

```js
mindMap.setTheme(theme)
```

设置主题配置可以调用`setThemeConfig`方法：

```js
mindMap.setThemeConfig(themeConfig)
```

设置视图数据可以调用`view.setTransformData`方法：

```js
mindMap.view.setTransformData(view)
```

### 完整示例

<iframe style="width: 100%; height: 455px; border: none;" src="https://wanglin2.github.io/playground/#eNrFVc1u00AQfpXRIpQEpXYqcQpuVaAggdSCypHtYWNvkoX1ruVdN42qXHpEBU7lzI1bxQEJtc9D0z4Gs/6Lm0QIiQOWLO3OzPd945md9Ql5nCTeUcZJnwQmTEViwXCbJdtUiTjRqYUTSPmwC1rt6UxZHnXBjJmUenLAhzCDYapjaCFDq0bsCRXtsaRwUWLQLPlGjNaNmCWUUAVAleQWnM1FboHKpKSKKt+H208/rz9/ub44m5//mJ9/n3+8oCrUylgYcfsc43aZZQhhZqpCaHdgaxtOHCeTPLXtl29e7XvGpkKNxHDaLiU8xDpc26YZ73Q6VM3uyN1+OL05vVyR+yepIZOmoVVXsN0galSAT6rKtXMXAJd9iHSYxVxZx/pMcrd8Mn0RtVsl8qlWlgnF01anW6Ai1O4X7O6hxBkoaZgKs+XH1pkpmX+9LL6/6I17ZiWZCwzHQkYpVy747YJjiW6tyrLSr6uzm6tvy2J3BdeIHi58zbj/lEG1LG0VTihhD7S2+zrir7URVmiFyJbkQ9vqQivE1mGbDvPwWecRHgs8GoFfjB0OHG4sx1lhluMOIIjEEYSSGbNFSdnuXR5rSnJ3GSCihbc+DBgS+OhtBlZMVms5YC6k+pBgkFmrFeyEUoTvMaQxaBi2OpCBXyD+yHAH3ZyvJfQi0WoV+I064NbYqSxKslNeMZR4fnGvlCPjcRN7oTGUYF3d9QLgNUpWnYmJiOy4D5u93v08DiCpO5VyVBRHPHfkTXbvveXSVlQLIBsYLTNbAAFcv/vQK3dWJ4vNqvyYi9EYwx/2eslxpbxe90GlHLN0JFC3Yk1YFOEVVBnq1L2y03+Z8WaVQZl0vUdCPKV5D0iXFB1wN7n3zmiFP46cnpYO7EA9gZTgf6EYO8/HpZfi/Sdi7pq1MUj1xPAUSSgpJ2jNv6LArrbaocrcZmT2G71jRY0=" />