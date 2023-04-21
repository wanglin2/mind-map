# 如何渲染富文本的悬浮工具栏

> 要支持节点富文本编辑需要使用富文本插件

如果开启了节点富文本编辑，那么可以对节点内的部分文本应用样式，一般当选中文本时上方会出现一个工具栏，有加粗、斜体、改变颜色等等的按钮。

首先要监听`rich_text_selection_change`事件，也就是选中文本的事件：

```js
mindMap.on('rich_text_selection_change', (hasRange, rect, formatInfo) => {
    // hasRange（是否存在选区）
    // rectInfo（选区的尺寸和位置信息）
    // formatInfo（选区的文本格式化信息）
    // 显示你的工具栏
})
```

可以通过`hasRange`来判断是否显示工具栏，工具栏的位置可以通过`rectInfo`获取，通过`formatInfo`可以获取当前选中文本的样式信息，比如已经被加粗了，那么你的加粗按钮就可以渲染为激活状态。

### 工具栏定位

```js
let left = rect.left + rect.width / 2 + 'px'
let top = rect.top - 60 + 'px'
```

计算出来的是相对于浏览器窗口左上角的位置，所以你的工具栏元素最好是添加在body元素下面，并且使用固定定位或相对定位，另外`z-index`的属性最好也设置的高一点，否则在弹窗等场景下可能会被挡住。

### 加粗/取消加粗

```js
mindMap.richText.formatText({
    bold: true/false
})
```

### 斜体/取消斜体

```js
mindMap.richText.formatText({
    italic: true/false
})
```

### 下划线/取消下划线

```js
mindMap.richText.formatText({
    underline: true/false
})
```

### 删除线/取消删除线

```js
mindMap.richText.formatText({
    strike: true/false
})
```

### 设置字体

```js
mindMap.richText.formatText({
    font: '宋体, SimSun, Songti SC'
})
```

### 设置字号

```js
mindMap.richText.formatText({
    font: 16 + 'px'
})
```

### 设置文字颜色

```js
mindMap.richText.formatText({
    color: '#fff'
})
```

### 设置文字背景颜色

```js
mindMap.richText.formatText({
    background: '#fff'
})
```

### 清除样式

```js
mindMap.richText.removeFormat()
```

## 完整示例

<iframe style="width: 100%; height: 455px; border: none;" src="https://wanglin2.github.io/playground/#eNrFVk+P20QU/yqDUWUHEiegcjHZUlpA6mERWhUJialWjj2OB8Yzlj1Otkp96akUJCQOcOFQceHeA6J74ct0u+Vb8N6M/202aXMjUaKZN7/3fm/m/ZnZOJ/mub+qmBM48zIqeK5JyXSV36KSZ7kqNNmQgiVjouSxqqRm8ZiUaSiEWp+whNQkKVRGXLDgdhrHXMbHYW6XqFOCWLBJBtJJFubUoZIQKgXTBGWIPCKyEoJKKiMlS3AhVev7SolFWMAa8HtJKEo2atcFS3SzMOuEWqGhq7KoKgom9ReqyEJ9TyaqQWxqgPSKy6Vgd5SIYdUbkaNbZIM+XlP2V6GomL+wyHfetI76ze78gkfpfXam/cQgcegZAkIQGryRCHHobL3t79cyZoXgkh3mdDWA7/W8Ax3ofoffv4crJrc2EqWhXLK7SigM8wGbiBqoW7AY8u0gH41O0Kt0PnQZ7Q2YBxnJ1m0mt6aYCEisoioD3/wl058LhsM7D+/Fntto3lVSh7Ddwh2NrVYc6jCw1vFDHRRQZyCyYg1Oo5g6r569eP308eXjF7ZW8FM3xhAYpVzEcD4I/ra3sWVuJ8s208vzny7P/9wmu0q4g/RBvzbE/U8etMNG1upxyfWJUvpLFbOvVMk1VxI0XWwe7pi4EYQOwvTAwOvRx7Yt9TmlpOdiXp2is6clEyxCE6c2a8GCl4blCY7H0FMiPSY2+TBf+4QCP5IeOeoPA92waW16UqR909Xet+M1j3VKpuRDELj5GWQu1fiFJndVCbvehNycdTg8KwDuKSFQG4TD932vd5o8ekRMY9w6VyxWJZgv1NLbY7ZRalQG7btjbU8AN2JKEH7zqb1y4LKBiWZwT4SawYyQecxXJBJhWR5Rp4nIZyxT1DHLDYDH/WpXeACZT2F1CGwtaesVdchqwhMQDFwFYVDqh4KBeIOxCEyMxnixBPhXd+RgdVFBLCS5HQkefW8st5cIoDabHS3MXBufEPfi519f/fXk4umzy+e/uQQ6UzOs6/nUWn0bS9f691H1zb7je/n3jxdPfrk8/8dQ9rNDWAd9Ghj//eP31z8839LqT7wdzaeDgMLUHK1B3G7eCdTxp/Zx0PRZn5WZH5Uldbpi9AexbzPX1EZAPpjNbhgcIXlX3gUDRr5iZsGkI/7e3c6R1lSvGC4gxyttFW11BmTWzEwGtJPr9CnjyxTgN2ez/Kxl3s37XsuchcWSA29rNQ/jmMtlK+hchwK376C3eayLUJZYzJCrOMST/8abfDS7YVsbWIR6M0Fwxo4NAb7H/O9KJeH5Z+zTZgFC0PVt6sDrzjZrfwpDv4Bbk2cMozVZFGpdsgKMUKfpuztefFb3eqxRq/Gtdur/AJ09jnE=" />