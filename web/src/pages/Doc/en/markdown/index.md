# Markdown parse

> v0.4.7+

Provides methods for importing and exporting `Markdown` files.

## Import

```js
import markdown from 'simple-mind-map/src/parse/markdown.js'
```

If you are using the file in the format of `umd`, you can obtain it in the following way:

```html
<script src="simple-mind-map/dist/simpleMindMap.umd.min.js"></script>
```

```js
simpleMindMap.markdown
```

## Methods

### transformToMarkdown(data)

- `data`: Mind map data can be obtained using the `mindMap.getData()` method.

Convert mind map data into `Markdown` format data, and the returned data is a string.

### transformMarkdownTo(mdContent)

- `mdContent`: The `Markdown` data to convert, string type.

Convert the `Markdown` string into node tree data and return a `Promise` instance. You can use the `mindMap.setData()` method to render the converted data onto the canvas.
