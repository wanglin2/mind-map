# Markdown解析

> v0.4.7+

提供导入和导出`Markdown`文件的方法。

## 引入

```js
import markdown from 'simple-mind-map/src/parse/markdown.js'
```

如果使用的是`umd`格式的文件，那么可以通过如下方式获取：

```html
<script src="simple-mind-map/dist/simpleMindMap.umd.min.js"></script>
```

```js
simpleMindMap.markdown
```

## 方法

### transformToMarkdown(data)

- `data`：思维导图数据，可以通过`mindMap.getData()`方法获取。

将思维导图数据转换成`Markdown`格式数据，返回的是字符串。

### transformMarkdownTo(mdContent)

- `mdContent`：要转换的`Markdown`数据，字符串类型。

将`Markdown`字符串转换成节点树数据，返回一个`Promise`实例。可以使用`mindMap.setData()`方法将转换后的数据渲染到画布上。
