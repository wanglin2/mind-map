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

### png()

Exports as `png`, an async method that returns image data, `data:url` data which
can be downloaded or displayed.

### svg()

Exports as `svg`, an async method that returns `svg` data, `data:url` data which
can be downloaded or displayed.

### getSvgData()

Gets `svg` data, an async method that returns an object:

```js
{
  node; // svg object
  str; // svg string
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