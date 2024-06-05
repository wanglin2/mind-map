# XMind parse

> v0.2.7+

Provides methods for importing and export `XMind` files.

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

### xmind.parseXmindFile(file, handleMultiCanvas)

Parsing the `.xmind` file and returning the parsed data. You can use
`mindMap.setData(data)` to render the returned data to the canvas.

`file`: `File` object

`handleMultiCanvas`：v0.10.0+，Optional, a function can be passed. If there are multiple canvases in the imported xmind file, this function will be called. The function takes the xmind canvas list data as a parameter and needs to return the data of one of the canvases, For example, if the received parameter is 'content', if you want to import data from the second canvas, you will return 'content[1]'. A function can be an asynchronous function that returns a Promise instance.

### xmind.transformXmind(content)

> V0.6.6+version changes the method to asynchronous and returns a Promise instance

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

### transformToXmind(data, name)

> v0.6.6+

- `data`: `simple-mind-map` data, you can get it by `mindMap.getData()` method.

- `name`: The file name to export.

Convert the `simple mind map` data to an `xmind` file. This method is asynchronous and returns an instance of `Promise`. The returned data is a `blob` type `zip` compressed package data, which you can download as a file yourself.