# Utility Methods

Reference:

```js
import {walk, ...} from 'simple-mind-map/src/utils'
```

## Methods

### walk(root, parent, beforeCallback, afterCallback, isRoot, layerIndex = 0, index = 0)

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

### bfsWalk(root, callback)

Breadth-first traversal of a tree

### resizeImgSize(width, height, maxWidth, maxHeight)

Resize image size

`width`: original width of the image

`height`: original height of the image

`maxWidth`: the width to resize to

`maxHeight`: the height to resize to

`maxWidth` and `maxHeight` can both be passed, or only one of them can be passed

### resizeImg(imgUrl, maxWidth, maxHeight)

Resize image, internally loads the image first, then calls the `resizeImgSize`
method, and returns a `promise`

### simpleDeepClone(data)

Extremely simple deep copy method, can only be used for objects that are all
basic data, otherwise it will throw an error

### copyRenderTree(tree, root)

Copy render tree data, example:

```js
copyRenderTree({}, this.mindMap.renderer.renderTree);
```

### copyNodeTree(tree, root)

Copy node tree data, mainly eliminating the reference `node` instance `_node`
and copying the `data` of the data object, example:

```js
copyNodeTree({}, node);
```

### imgToDataUrl(src)

Convert image to dataURL

### downloadFile(file, fileName)

Download file

### throttle(fn, time = 300, ctx)

Throttle function

### asyncRun(taskList, callback = () => {})

Run tasks in task list asynchronously, tasks are run synchronously without order