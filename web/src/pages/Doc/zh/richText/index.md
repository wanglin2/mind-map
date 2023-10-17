# RichText插件

> v0.4.0+

该插件提供节点富文本编辑的能力，注册了即可生效。

默认节点编辑只能对节点内所有文本统一应用样式，通过该插件可以支持富文本编辑的效果，目前支持：加粗、斜体、下划线、删除线、字体、字号、颜色、背景颜色。不支持上划线、行高。

该插件的原理是使用[Quill](https://github.com/quilljs/quill)编辑器实现富文本编辑，然后把编辑后生成的`DOM`节点直接作为节点的文本数据，并且在渲染的时候通过`svg`的`foreignObject`标签嵌入`DOM`节点。

> v0.5.6即以前的版本存在以下提示：
>
> 这样也造成了一个问题，就是导出为图片的功能受到了影响，原本将`svg`导出为图片的原理很简单，获取到`svg`字符串，然后创建为`type=image/svg+xml`类型的`blob`数据，再使用`URL.createObjectURL`方法生成`data:url`数据，再创建一个`Image`标签，将`data:url`作为该图片的`src`，最后再将这个图片绘制到`canvas`对象上进行导出，但是经过测试，当`svg`中嵌入了`DOM`节点，这种方式导出会出错，并且尝试了多种方式后都无法实现完美的导出效果，目前的方式是遍历`svg`中的`foreignObject`节点，使用[html2canvas](https://github.com/niklasvh/html2canvas)将`foreignObject`节点内的`DOM`节点转换为图片再替换掉`foreignObject`节点，这种方式可以工作，但是非常耗时，因为`html2canvas`转换一次的时间很长，导致转换一个节点都需要耗时差不多2秒，这样导致节点越多，转换时间越慢，所以如果无法忍受长时间的导出的话推荐不要使用该插件。

> `v0.5.7+`的版本直接使用`html2canvas`转换整个`svg`，速度不再是问题，但是目前存在一个`bug`，就是节点的颜色导出后不生效。

`v0.6.13+`版本使用[dom-to-image-more](https://github.com/1904labs/dom-to-image-more)替换了`html2canvas`，解决了节点的颜色导出后不生效的问题。

> dom-to-image-more兼容性比较差，在很多浏览器上导出图片都是空的，所以可以根据你自己的需求替换成html2canvas。

从`0.6.16+`版本后不再使用`dom-to-image-more`、`html2canvas`之类的第三方库实现导出，兼容性及导出都不再有问题。

## 注册

```js
import MindMap from 'simple-mind-map'
import RichText from 'simple-mind-map/src/plugins/RichText.js'
// import RichText from 'simple-mind-map/src/RichText.js' v0.6.0以下版本使用该路径

MindMap.usePlugin(RichText, opt?)
```

注册完且实例化`MindMap`后可通过`mindMap.richText`获取到该实例。

### 注册选项

`opt`选项可以传递以下参数：

- `opt.fontFamilyList`

替换富文本编辑时内置字体列表。内置的列表为：

```js
[
  '宋体, SimSun, Songti SC',
  '微软雅黑, Microsoft YaHei',
  '楷体, 楷体_GB2312, SimKai, STKaiti',
  '黑体, SimHei, Heiti SC',
  '隶书, SimLi',
  'andale mono',
  'arial, helvetica, sans-serif',
  'arial black, avant garde',
  'comic sans ms',
  'impact, chicago',
  'times new roman',
  'sans-serif',
  'serif'
]
```

- `opt.fontSizeList`

替换富文本编辑时内置字号列表。内置的列表为：

```js
[1, 2, 3, ...100]
```

## 方法

### setNotActiveNodeStyle(node, style)

> v0.8.0+

- `style`：Object，样式对象。

给未激活的节点设置富文本样式。

### selectAll()

选中全部。当节点正在编辑中可以通过该方法选中节点内的所有文本。

### focus()

> v0.4.7+

聚焦。

### formatText(config = {})

- `config`：对象，键为样式属性，值为样式值，完整的配置如下：

```js
{
    font: '字体',
    size: '12px,' // 字号
    bold: true, // 是否加粗，true/false 
    italic: true, // 是否斜体，true/false 
    underline: true, // 是否显示下划线，true/false 
    strike: true, // 是否显示删除线，true/false 
    color: '#333' // 颜色
}
```

格式化当前选中的文本。

### formatRangeText(range, config = {})

- `range`：`Quill`的范围对象，格式如下：

```js
{
    index,
    length
}
```

- `config`：同`formatText`方法

格式化指定范围的文本。

### formatAllText(config = {})

- `config`：同`formatText`方法

格式化当前编辑节点的所有文本。

### removeFormat()

> v0.4.1+

清除当前选中文本的样式。

### normalStyleToRichTextStyle(style) 

将普通节点样式对象转换成富文本样式对象。因为非富文本编辑时的节点样式属性和富文本样式属性是存在差异的，所以需要一个转换操作。比如：

```js
{
    fontFamily: 'xxx'
}

// 转换后

{
    font: 'xxx'
}
```

### richTextStyleToNormalStyle(config)

将富文本样式对象转换成普通节点样式对象。比如：

```js
{
    size: '16px'
}

// 转换后

{
    fontSize: 16
}
```

### handleSvgDomElements(svg)

- `svg`： `svg`节点

将`svg`中嵌入的`dom`元素转换成图片，返回一个`Promise`。

### transformAllNodesToNormalNode()

将所有节点转换成非富文本节点。