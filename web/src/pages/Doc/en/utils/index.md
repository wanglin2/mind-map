# Utility Methods

## Base utility Methods

Reference:

```js
import {walk, ...} from 'simple-mind-map/src/utils'
```

### Methods

#### resizeImgSizeByOriginRatio(width, height, newWidth, newHeight)

> v0.6.5+

`width`: The original width of the image

`height`：The original height of the image

`newWidth`：Width to zoom in to

`newHeight`：Height to zoom in to

Scale the image proportionally. Zoom to the specified size of `newWidth` and `newHeight` while maintaining the original aspect ratio of the image.

#### walk(root, parent, beforeCallback, afterCallback, isRoot, layerIndex = 0, index = 0, ancestors = [])

Depth-first traversal of a tree

`root`: the root node of the tree to be traversed

`parent`: parent node

`beforeCallback`: preorder traversal callback function, callback parameters are:
root, parent, isRoot, layerIndex, index, ancestors

`afterCallback`: postorder traversal callback function, callback parameters are:
root, parent, isRoot, layerIndex, index, ancestors

`isRoot`: whether it is the root node

`layerIndex`: node level

`index`: index of the node among its siblings

`ancestors`：v0.10.6+, List of all ancestor nodes of the current node

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

- `removeId`：v0.7.3-fix.1+, Is remove the uid from the node data, default is `true`

> - `keepId`: (Original fourth parameter) v0.4.6+, `Boolean`, default is `false`, Whether to retain the `id` of the replicated node will be deleted by default to prevent duplicate node `id`. However, for mobile node scenarios, the original `id` of the node needs to be retained

Copy node tree data, mainly eliminating the reference `node` instance `_node`
and copying the `data` of the data object, example:

```js
copyNodeTree({}, node);
```

#### imgToDataUrl(src, returnBlob = false)

- `src`：Image url

- `returnBlob`：v0.10.2+，Is the result returned in Blob format, defaulting to DataURL format

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

#### parseDataUrl(data)

> v0.6.6+

Parse `data:url` data, return:

```js
{
  type,// file type of data
  base64// base64 data
}
```

#### getImageSize(src)

> v0.6.6+

- `src`: The url of img

Get the size of image, return:

```js
{
  width,
  height
}
```

#### loadImage(imgFile)

> v0.6.8+

- `imgFile`: File object of image type

Load image, return:

```js
{
  url,// DataUrl
  size// { width, height } width and height of image
}
```

#### getType(data)

> v0.6.9+

Get the type of a data, such as `Boolean`、`Array`.

#### removeHtmlStyle(html)

> v0.6.10+

Remove the inline style of nodes in the HTML string.

#### addHtmlStyle(html, tag, style)

> v0.6.10+

Add inline styles to the specified tags in the HTML tag.

#### checkIsRichText(str)

> v0.6.10+

Check if a string is a rich text character.

#### isWhite(color)

> v0.6.11+

Determine whether a color is white.

#### isTransparent(color)

> v0.6.11+

Determine whether a color is transparent.

#### nodeRichTextToTextWithWrap(html)

> v0.6.12+

Convert the rich text content of nodes in the form of `<p><span></span><p>` into text wrapped in `\n`.

#### textToNodeRichTextWithWrap(html)

> v0.6.12+

Convert the wrapped text of `<br>` into node rich text content in the form of `<p><span></span><p>`.

#### isMobile()

> v0.6.13+

Determine if it is a mobile environment.

#### getTopAncestorsFomNodeList(list)

> v0.7.2+

- `list`: Arrray, Node instance list.

Find the top-level node list from the node instance list.

#### checkTwoRectIsOverlap(minx1, maxx1, miny1, maxy1, minx2, maxx2, miny2, maxy2)

> v0.7.2+

The parameter is the position of two rectangles.

Determine if two rectangles overlap.

#### focusInput(el)

> v0.7.2+

- `el`: DOM nodes, elements that can be focused, typically input box elements.

Focus on the specified input box.

#### selectAllInput(el)

> v0.7.2+

- `el`: DOM nodes, elements that can be focused, typically input box elements.

Focus and select all specified input boxes.

#### addDataToAppointNodes(appointNodes, data = {})

> v0.7.2+

- `appointNodes`：Node instance list, array type.

- `data`：The data to be attached to all nodes in the specified node instance list tree.

Adding additional data to the specified node list tree data will modify the original data.

#### createUidForAppointNodes(appointNodes, createNewId, handle)

> v0.7.2+

- `appointNodes`：Node instance list, array type.

- `createNewId`：v0.7.3-fix.1+, `Boolean`, default is `false`, If the node does not have a 'uid', a new 'uid' will be created. If 'true' is passed, a new 'uid' will be created regardless of whether the node data originally exists or not`

- `handle`：v0.10.5+, `null、Function`, default is `null`, You can pass a function that will be called when traversing each node, with the callback parameter being the current node being traversed.

Adding a uid to the specified node list tree data (if the uid does not exist) will modify the original data.

#### getNodeIndex(node) 

> v0.7.2+

- `node`：Node instance.

Gets the position index of a node within its peers.

#### mergerIconList(list)

> v0.7.2+

- `list`：The array of node icons to be merged into the library.

```js
// const data = [
//   { type: 'priority', name: '优先级图标', list: [{ name: '1', icon: 'a' }, { name: 2, icon: 'b' }] },
//   { type: 'priority', name: '优先级图标', list: [{ name: '2', icon: 'c' }, { name: 3, icon: 'd' }] },
// ];

// mergerIconList(data)  result:

// [
//   { type: 'priority', name: '优先级图标', list: [{ name: '1', icon: 'a' }, { name: 2, icon: 'c' }, { name: 3, icon: 'd' }] },
// ]
```

Merge icon arrays.

#### htmlEscape(str)

> v0.7.2+

- `str`：String.

Escape the incoming string, currently escaping the following three characters:

```
& -> &amp;
< -> &lt;
> -> &gt;
```

#### generateColorByContent(str)

> v0.7.2+

- `str`：String.

Generate colors based on incoming content, and the same content will generate the same color.

#### isSameObject(a, b)

> v0.7.3+

- `a`、`b`: Object | Array, Two objects to compare

Determine whether two objects are the same, only handling objects or arrays.

#### getNodeDataIndex(node)

> v0.8.0+

Gets the position index of a node within its sibling nodes.

#### getNodeIndexInNodeList(node, nodeList) 

> v0.8.0+

Find the index of a node from a list of nodes.

#### setDataToClipboard(data)

> v0.8.0+

- `data`：Object | Array

Set data to the user clipboard.

#### getDataFromClipboard()

> v0.8.0+

Reading text and images from the user's clipboard returns:

```js
{
  text,
  img
}
```

#### removeFromParentNodeData(node)

> v0.8.0+

Remove the data of a node from its parent node's `nodeData.children` list.

#### checkHasSupSubRelation()

> v0.8.1+

Determine whether there is a hierarchical relationship from the given node instance list.

#### handleSelfCloseTags(str)

> v0.9.1+

- `str`: html string

Add a closed state to HTML self closing tags, `<div><img src="xxx"></div>` -> `<div><img src="xxx" /></div>`。

#### checkNodeListIsEqual(list1, list2)

> v0.9.1+

- `list1/list2`: Node instance list

Check if the two node instance lists contain the same nodes.

#### getChromeVersion()

> v0.9.3+

Get the current version of the Chrome kernel used by the browser. If the current browser is not using the 'Chrome' kernel, an empty string will be returned.

#### transformTreeDataToObject(data)

> v0.9.3+

- `data`：Mind map node data.

Convert the mind map tree structure to a level object.

```js
{
        data: {
            uid: 'xxx'
        },
        children: [
            {
                data: {
                    uid: 'xxx'
                },
                children: []
            }
        ]
    }
```
Convert to:
```js
    {
        uid: {
            children: [uid1, uid2],
            data: {}
        }
    }
```

#### transformObjectToTreeData(data)

> v0.9.3+

Convert flat objects into a tree structure. Reverse operation of the transformTreeDataToObject method.

#### removeHtmlNodeByClass(html, selector)

> v0.9.6+

- `html`：html string

- `selector`：Node selectors, such as class selectors and id selectors

Remove the node of the specified selector from the specified HTML string, and then return the processed HTML string.

#### getOnfullscreEnevt()

> v0.9.11+

Detect full screen events available in the current browser. You can use it this way:

```js
const fullscrrenEvent = getOnfullscreEnevt()

// Monitor full screen events
document.addEventListener(fullscrrenEvent, () => {
  // Determine whether the current state is full screen based on whether document.fullscreenElement is null
})
```

#### fullScreen(element)

> v0.9.11+

Put the specified DOM element into full screen mode.

#### exitFullScreen()

> v0.9.11+

Exit full screen mode.

#### defenseXSS(htmlStr)

> v0.10.0+

- `htmlStr`：HTML strings that need to be filtered

Return：Filtered HTML string

Defend against XSS attacks, filter malicious HTML tags and attributes. You can recursively traverse the tree data before passing the node data to SimpleMindMap, using this method to process the rich text content of nodes and avoid XSS attacks.

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

> v0.9.2+

Empty the cache pool.