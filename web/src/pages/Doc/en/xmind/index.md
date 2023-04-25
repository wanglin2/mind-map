# XMind parse

> v0.2.7+

Provides methods for importing `XMind` files.

## Import

```js
import xmind from 'simple-mind-map/src/parse/xmind.js'
```

If you are using the file in the format of `umd`, you can obtain it in the following way:

```html
<script src="simple-mind-map/dist/simpleMindMap.umd.min.js"></script>
```

```js
simpleMindMap.xmind
```

## Methods

### xmind.parseXmindFile(file)

Parsing the `.xmind` file and returning the parsed data. You can use
`mindMap.setData(data)` to render the returned data to the canvas.

`file`: `File` object

### xmind.transformXmind(content)

Convert `xmind` data. The `.xmind` file is essentially a `zip` file that can be
decompressed by changing the suffix to zip. Inside, there is a `content.json`
file. If you have parsed this file yourself, you can pass the contents of this
file to this method for conversion. You can use
`mindMap.setData(data)` to render the returned data to the canvas.

`content`: the contents of the `content.json` file within the `.xmind` zip
package

### xmind.transformOldXmind(content)

> v0.2.8+

For data parsing of the `xmind8` version, because the `.xmind` file in this
version does not have a `content.json`, it corresponds to `content.xml`.

`content`: the contents of the `content.xml` file within the `.xmind` zip
package