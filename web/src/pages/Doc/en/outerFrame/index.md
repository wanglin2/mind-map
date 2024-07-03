# OuterFrame plugin

> v0.10.2+

This plugin is used to implement bounding box functionality.

## Register

```js
import MindMap from 'simple-mind-map'
import OuterFrame from 'simple-mind-map/src/plugins/OuterFrame.js'
MindMap.usePlugin(OuterFrame)
```

After registration and instantiation of `MindMap`, the instance can be obtained through `mindMap.outerFrame`.

The application can refer to the code in this section of the demo: [NodeOuterFrame.vue](https://github.com/wanglin2/mind-map/blob/main/web/src/pages/Edit/components/NodeOuterFrame.vue)。

## Command

This plugin will register the 'ADD_OUTER_FRAME' command with the mind map to add bounding boxes to nodes:

```js
mindMap.execCommand('ADD_OUTER_FRAME', appointNodes, config = {})
```

- `appointNodes`：Specify the node instance node to add the bounding box to, which can be a single node instance or an array of node instances. If passing '[]' or 'null', the bounding box will be added to the currently active node on the canvas

- `config`：Outline configuration, object format, and fields are as follows:

| Field            | Type    | Default           | Desc         |
| ------------------ | ------- | --------------- | ------------|
| radius | Number | 5 | Size of rounded corners on the outer frame |
| strokeWidth | Number | 2 | Outer border width |
| strokeColor | String | #0984e3 | Outer border color |
| strokeDasharray | String | 5,5 | Outer border dashed line |
| fill | String | rgba(9,132,227,0.05) | Outer frame fill color |

## Event

### outer_frame_active

Triggered when clicking to activate a certain bounding box. The callback function takes three parameters: el（Outer frame elements,The rect element of library @svgdotjs/svg.js）, node（The parent node instance of the node to which this scope belongs）, range（Range interval, relative to node）

The application can listen to this event to retrieve the currently activated bounding box, retrieve its configuration, and echo it to the page. Since the scope may contain multiple nodes, the first node instance is usually taken. If you want to retrieve the position of the bounding box on the page, you can call the 'el.rbox' method:

```js
mindMap.on('outer_frame_active', (el, parentNode, range) => {
    // Take the bounding box style of the first node within the range
    const firstNode = parentNode.children[range[0]]
    const firstNodeOuterFrame = firstNode.getData('outerFrame')
    // Obtain the position and size information of the bounding box, where you can render your configuration float layer
    const { x, y, width, height } = el.rbox()
})
```

### outer_frame_delete

Triggered when deleting the currently active bounding box on the canvas.

## Methods

### getActiveOuterFrame()

Get the currently activated bounding box data. Return an object with the following structure:

```js
{
    el,
    node,
    range
}
```

### updateActiveOuterFrame(config = {})

Update the currently active bounding box. After executing this method, please immediately hide your style panel as it will clear the currently active bounding box.

### removeActiveOuterFrame()

Delete the currently active bounding box.

### getRangeNodeList(node, range)

Get a list of boxed child nodes within a specified range of a node.

### clearActiveOuterFrame()

Clear the currently active bounding box.