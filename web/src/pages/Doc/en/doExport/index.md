# Export plugin

The `Export` plugin provides the export function.

## Register

```js
import MindMap from 'simple-mind-map'
import Export from 'simple-mind-map/src/plugins/Export.js'
// import Export from 'simple-mind-map/src/Export.js' Use this path for versions below v0.6.0

MindMap.usePlugin(Export)
```

After registration and instantiation of `MindMap`, the instance can be obtained through `mindMap.doExport`.

## Methods

All exported methods are asynchronous and return an instance of `Promise`. You can use the `then` method to obtain data, or use the `async await` function to obtain:

```js
mindMap.doExport.png().then((data) => {
  // ...
})

const export = async () => {
  let data = await mindMap.doExport.png()
  // ...
}
```

The returned data is in the format of `data:URL`. You can create an `a` tag to trigger the download:

```js
let a = document.createElement('a')
a.href = 'xxx.png'// .png、.svg、.pdf、.md、.json、.smm
a.download = 'xxx'
a.click()
```

### png(name, transparent = false, checkRotate, compress)

> Versions below v0.7.0 are: png(name, transparent = false, rotateWhenWidthLongerThenHeight)

- `name`: Name, optional

- `transparent`: v0.5.7+, Specify whether the background of the exported image is transparent

- `rotateWhenWidthLongerThenHeight`: v0.6.15+, V0.7.0+abandoned, Boolean, false, Automatically rotate 90 degrees when the image has a width to height ratio

- `checkRotate`: v0.7.0+, Function, You can pass a function that takes two parameters, the width and height of the image, and returns true or false. True represents that the image needs to be rotated by 90 degrees

- `compress`：v0.8.1+，null | { width, height }, The parameter for compressing images. In some cases, the length and width of the exported image may be very large. If you want to reduce it, you can use this parameter to control it. Only one width or height can be provided, and it will be scaled proportionally

Exports as `png`.

### svg(name, plusCssText)

- `name`：`svg` title

- `plusCssText`：v0.4.0+, （v0.6.16+This parameter has been removed and instead passed in through the `resetCss` configuration during instantiation）, When node rich text editing is enabled and `domToImage` passes `false`, additional `css` styles can be added. If there is a `dom` node in `svg`, you can set some styles for the node through this parameter, such as:

```js
svg(
  '', 
  false, 
  `* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }`
)
```

Exports as `svg`.

### pdf(name, useMultiPageExport, maxImageWidth)

> v0.2.1+

- `name`：File name

- `useMultiPageExport`: v0.6.15+, Boolean, false, Whether to export multiple pages, default to single page

- `maxImageWidth`：v0.8.1+，null | Number，The default is twice the width of A4 paper, which is a parameter for compressing images. In some cases, the length and width of the image may be very large, resulting in a very large PDF volume. Therefore, if you want to reduce the volume, you can use this parameter to control the maximum width of the image

Export as `pdf`. Unlike other export methods, this method does not return data and directly triggers the download.

> After v0.6.0, an additional ExportPDF plugin needs to be registered

```js
import ExportPDF from 'simple-mind-map/src/plugins/ExportPDF.js'
MindMap.usePlugin(ExportPDF)
```

### json(name, withConfig)

`name`：It is temporarily useless, just pass an empty string

`withConfig``：Boolean`, default `true`, Whether the data contains configuration, otherwise it is pure mind map node data

Return `json` data.

### md()

> v0.4.7+

Export as `markdown` file.

### getSvgData()

Gets `svg` data, an async method that returns an object:

```js
{
  node // svg node
  str // svg string
}
```

### xmind(name)

> v0.6.6+, an additional ExportXMind plugin needs to be registered

```js
import ExportXMind from 'simple-mind-map/src/plugins/ExportXMind.js'
MindMap.usePlugin(ExportXMind)
```

Export as an `xmind` file type, asynchronous method, returns a `Promise` instance, and the returned data is the `data:url` data of a `zip` compressed package, which can be directly downloaded.