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

### png(name, transparent = false)

- `name`: Name, optional

- `transparent`: v0.5.7+, Specify whether the background of the exported image is transparent

Exports as `png`.

### svg(name, plusCssText)

- `name`：`svg` title

- `plusCssText`：v0.4.0+, When node rich text editing is enabled and `domToImage` passes `false`, additional `css` styles can be added. If there is a `dom` node in `svg`, you can set some styles for the node through this parameter, such as:

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

### pdf(name)

> v0.2.1+

`name`：File name

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