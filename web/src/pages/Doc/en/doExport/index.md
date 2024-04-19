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

### png(name, transparent = false, node = null)

> Versions below v0.9.2 are：png(name, transparent = false, checkRotate, compress)

> Versions below v0.7.0 are: png(name, transparent = false, rotateWhenWidthLongerThenHeight)

- `name`: Name, optional

- `transparent`: v0.5.7+, Specify whether the background of the exported image is transparent

- `rotateWhenWidthLongerThenHeight`: v0.6.15+, V0.7.0+abandoned, Boolean, false, Automatically rotate 90 degrees when the image has a width to height ratio

- `checkRotate`: v0.7.0+, (v0.9.2+obsolete), Function, You can pass a function that takes two parameters, the width and height of the image, and returns true or false. True represents that the image needs to be rotated by 90 degrees

- `compress`：v0.8.1+, (v0.9.2+obsolete)，null | { width, height }, The parameter for compressing images. In some cases, the length and width of the exported image may be very large. If you want to reduce it, you can use this parameter to control it. Only one width or height can be provided, and it will be scaled proportionally

- `node`：v0.9.11+，Node instances, if passed, will only export the content of that node;

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

### pdf(name, transparent = false)

> v0.8.1：pdf(name, useMultiPageExport, maxImageWidth)

> v0.2.1+

- `name`：File name

- `useMultiPageExport`: v0.6.15+, (v0.9.2+obsolete), Boolean, false, Whether to export multiple pages, default to single page

- `maxImageWidth`：v0.8.1+, (v0.9.2+obsolete)，null | Number，The default is twice the width of A4 paper, which is a parameter for compressing images. In some cases, the length and width of the image may be very large, resulting in a very large PDF volume. Therefore, if you want to reduce the volume, you can use this parameter to control the maximum width of the image

- `transparent`：v0.9.2+，Boolean，default is false，Specify whether the background of the exported image is transparent

Export as `pdf`. Unlike other export methods, this method does not return data and directly triggers the download.

> In versions before v0.9.3, this method does not return data and will directly trigger the download.

> After v0.6.0, an additional ExportPDF plugin needs to be registered

> The internal export of PDF uses the PDF lib library to convert images into PDF. Currently, when exporting PDF with a large number of nodes, some content may be lost. Therefore, it is recommended that capable developers implement the PDF export function themselves. If there are backend developers in the project, they can also seek support from backend developers.

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

### getSvgData(node)

`node`: v0.9.11+, Node instance, if passed, will return a 'clipData' object, representing the position coordinate data of the node region cropped from the complete image;

Gets `svg` data, an async method that returns an object:

```js
{
  node, // svg node
  str, // svg string
  clipData
}
```

### xmind(name)

> v0.6.6+, an additional ExportXMind plugin needs to be registered

```js
import ExportXMind from 'simple-mind-map/src/plugins/ExportXMind.js'
MindMap.usePlugin(ExportXMind)
```

Export as an `xmind` file type, asynchronous method, returns a `Promise` instance, and the returned data is the `data:url` data of a `zip` compressed package, which can be directly downloaded.

### txt()

> v0.9.8+

Export as `txt` file.