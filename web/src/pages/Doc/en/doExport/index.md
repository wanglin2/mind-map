# Export plugin

The `Export` plugin provides the export function.

## Register

```js
import MindMap from 'simple-mind-map'
import Export from 'simple-mind-map/src/Export.js'

MindMap.usePlugin(Export)
```

After registration and instantiation of `MindMap`, the instance can be obtained through `mindMap.doExport`.

## Methods

### png(name, transparent = false)

- `name`: Name, optional

- `transparent`: v0.5.7+, Specify whether the background of the exported image is transparent

Exports as `png`, an async method that returns image data, `data:url` data which
can be downloaded or displayed.

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

Exports as `svg`, an async method that returns `svg` data, `data:url` data which
can be downloaded or displayed.

### getSvgData()

Gets `svg` data, an async method that returns an object:

```js
{
  node; // svg object
  str; // svg string, if rich text editing is enabled and domToImage is set to true, the dom node in the svg character returned by this value will be converted into the form of an image
  nodeWithDomToImg// v0.4.0+，The svg object after the DOM node is converted to an image has a value only when rich text editing is enabled and domToImage is set to true, otherwise null
}
```

### pdf(name)

> v0.2.1+

`name`：File name

Export as `pdf`

### json(name, withConfig)

`name`：It is temporarily useless, just pass an empty string

`withConfig``：Boolean`, default `true`, Whether the data contains configuration, otherwise it is pure mind map node data

Return `json` data, `data:url` type, you can download it yourself

### md()

> v0.4.7+

Export as `markdown` file, Return `json` data, `data:url` type, you can download it yourself