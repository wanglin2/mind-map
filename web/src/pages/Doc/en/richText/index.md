# RichText plugin

> v0.4.0+

This plugin provides the ability to edit rich text of nodes, and takes effect after registration.

By default, node editing can only uniformly apply styles to all text in the node. This plugin can support rich text editing effects. Currently, it supports bold, italic, underline, strikethrough, font, font size, color, and backgroundColor. Underline and line height are not supported.

The principle of this plugin is to use [Quill](https://github.com/quilljs/quill) editor implements rich text editing, and then uses the edited `DOM` node directly as the text data of the node, and embeds the `DOM` node through the `svg` `foreignObject` tag during rendering.

> The following prompts exist in versions prior to v0.5.6:
>
> This also caused a problem, that is, the function of exporting as a picture was affected, The original principle of exporting `svg` as an image is very simple, Get the `svg` string, and then create the `blob` data of the `type=image/svg+xml` type. Then use the `URL.createObjectURL` method to generate the `data:url` data. Then create a `Image` tag, use the `data:url` as the `src` of the image, and finally draw the image on the `canvas` object for export, However, after testing, when the `DOM` node is embedded in the `svg`, this method of export will cause errors, and after trying many ways, the perfect export effect cannot be achieved, The current method is to traverse the `foreignObject` node in `svg`, using [html2canvas](https://github.com/niklasvh/html2canvas) Convert the `DOM` node in the `foreignObject` node into an image and then replace the `foreignObject` node. This method can work, but it is very time-consuming. Because the `html2canvas` conversion takes a long time, it takes about 2 seconds to convert a node. This leads to the more nodes, the slower the conversion time. Therefore, it is recommended not to use this plugin if you cannot tolerate the long time of export.

> The version of `v0.5.7+` directly uses `html2canvas` to convert the entire `svg`, which is no longer an issue with speed. However, there is currently a bug where the color of the node does not take effect after export.

`V0.6.13+` version uses [dom-to-image-more](https://github.com/1904labs/dom-to-image-more) Replaced 'html2canvas' to address the issue of ineffective color export for nodes.

> The compatibility of dom to image more is relatively poor, and exported images are empty on many browsers, so you can replace them with html2canvas according to your own needs.

After version `0.6.16+`, third-party libraries such as 'dom-to-image-more' and 'html2canvas' will no longer be used for export, Compatibility and export are no longer issues.

## Register

```js
import MindMap from 'simple-mind-map'
import RichText from 'simple-mind-map/src/plugins/RichText.js'
// import RichText from 'simple-mind-map/src/RichText.js' Use this path for versions below v0.6.0

MindMap.usePlugin(RichText, opt?)
```

After registration and instantiation of `MindMap`, the instance can be obtained through `mindMap.richText`.

### Register options

The `opt` option can pass the following parameters:

- `opt.fontFamilyList`

Replace the built-in font list during rich text editing. The built-in list is:

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

Replace the built-in font size list during rich text editing. The built-in list is:

```js
[1, 2, 3, ...100]
```

## Method

### setNotActiveNodeStyle(node, style)

> v0.8.0+

- `style`：Object, style object.

Set rich text style for inactive nodes.

### selectAll()

Select All. When the node is being edited, you can select all the text in the node through this method.

### focus()

> v0.4.7+

Focus.

### formatText(config = {})

- `config`：Object. The key is the style attribute and the value is the style value. The complete configuration is as follows:

```js
{
    font: '字体',
    size: '12px,' // font size
    bold: true, // Bold or not, true/false 
    italic: true, // Italic or not, true/false 
    underline: true, // Show underline or not, true/false 
    strike: true, // Whether to display strikethrough, true/false 
    color: '#333' // color
}
```

Formats the currently selected text.

### formatRangeText(range, config = {})

- `range`：The range object of `Quill`, has the following format:

```js
{
    index,
    length
}
```

- `config`：Same as `formatText` method

Formats the text of the specified range.

### formatAllText(config = {})

- `config`：Same as `formatText` method

Formats all text of the current edit node.

### removeFormat()

> v0.4.1+

Clears the style of the currently selected text.

### normalStyleToRichTextStyle(style) 

Converts a normal node style object to a rich text style object. Because there are differences between node style attributes and rich text style attributes during non-rich text editing, a conversion operation is required. For example:

```js
{
    fontFamily: 'xxx'
}

// After conversion

{
    font: 'xxx'
}
```

### richTextStyleToNormalStyle(config)

Converts rich text style objects to normal node style objects. For example:

```js
{
    size: '16px'
}

// After conversion

{
    fontSize: 16
}
```

### handleSvgDomElements(svg)

- `svg`: `svg` node

Convert the `dom` element embedded in the `svg` into a picture and return a `Promise`.

### transformAllNodesToNormalNode()

Convert all nodes to non-rich text nodes.