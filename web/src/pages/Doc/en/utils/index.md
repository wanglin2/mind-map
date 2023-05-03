# Utility Methods

## Base utility Methods

Reference:

```js
import {walk, ...} from 'simple-mind-map/src/utils'
```

### Methods

#### walk(root, parent, beforeCallback, afterCallback, isRoot, layerIndex = 0, index = 0)

Depth-first traversal of a tree

`root`: the root node of the tree to be traversed

`parent`: parent node

`beforeCallback`: preorder traversal callback function, callback parameters are:
root, parent, isRoot, layerIndex, index

`afterCallback`: postorder traversal callback function, callback parameters are:
root, parent, isRoot, layerIndex, index

`isRoot`: whether it is the root node

`layerIndex`: node level

`index`: index of the node among its siblings

Example:

```js
walk(tree, null, () => {}, () => {}, false, 0, 0);
```

#### bfsWalk(root, callback)

Breadth-first traversal of a tree

#### resizeImgSize(width, height, maxWidth, maxHeight)

Resize image size

`width`: original width of the image

`height`: original height of the image

`maxWidth`: the width to resize to

`maxHeight`: the height to resize to

`maxWidth` and `maxHeight` can both be passed, or only one of them can be passed

#### resizeImg(imgUrl, maxWidth, maxHeight)

Resize image, internally loads the image first, then calls the `resizeImgSize`
method, and returns a `promise`

#### simpleDeepClone(data)

Extremely simple deep copy method, can only be used for objects that are all
basic data, otherwise it will throw an error

#### copyRenderTree(tree, root)

Copy render tree data, example:

```js
copyRenderTree({}, this.mindMap.renderer.renderTree);
```

#### copyNodeTree(tree, root, removeActiveState, keepId)

- `removeActiveState`: `Boolean`, default is `false`, Whether to remove the active state of the node

- `keepId`: v0.4.6+, `Boolean`, default is `false`, Whether to retain the `id` of the replicated node will be deleted by default to prevent duplicate node `id`. However, for mobile node scenarios, the original `id` of the node needs to be retained

Copy node tree data, mainly eliminating the reference `node` instance `_node`
and copying the `data` of the data object, example:

```js
copyNodeTree({}, node);
```

#### imgToDataUrl(src)

Convert image to dataURL

#### downloadFile(file, fileName)

Download file

#### throttle(fn, time = 300, ctx)

Throttle function

#### asyncRun(taskList, callback = () => {})

Run tasks in task list asynchronously, tasks are run synchronously without order

#### degToRad(deg)

> v0.2.24+

Angle to radian

#### camelCaseToHyphen(str)

> v0.2.24+

CamelCase to hyphen

#### joinFontStr({ italic, bold, fontSize, fontFamily })

> v0.3.4+

Join the `font` attribute value of the `css` font

#### measureText(text, { italic, bold, fontSize, fontFamily })

> v0.3.4+

Measure the width and height of the text, return value:

```js
{ width, height }
```

#### getTextFromHtml(html)

Extract plain text content from an HTML string.

#### readBlob(blob)

> v0.5.9+

Convert `blob` data to `data:url` data.

## Simulate CSS background in Canvas

Import:

```js
import drawBackgroundImageToCanvas from 'simple-mind-map/src/utils/simulateCSSBackgroundInCanvas'
```

Usage：

```js
let width = 500
let height = 500
let img = '/1.jpg'
let canvas = document.createElement('canvas')
canvas.width = width
canvas.height = height
drawBackgroundImageToCanvas(ctx, width, height, img, {
  backgroundRepeat: 'repeat-y',
  backgroundSize: '60%',
  backgroundPosition: 'center center'
}, (err) => {
  if (err) {
    // fail
  } else {
    // success
  }
})
```

## LRU cache class

> v0.5.10+

Import:

```js
import Lru from 'simple-mind-map/src/utils/Lru.js'
```

### Constructor

```js
let lru = new Lru(max)
```

`max`: Specify the maximum number of caches.

### Instance properties

#### size

The current number of caches.

#### pool

Get cache pool.

### Instance methods

#### add(key, value)

Add cache.

#### delete(key)

Delete cache.

#### has(key)

Check if a cache exists.

#### get(key)

Gets the value of a cache.