# AssociativeLine plugin

> v0.4.5+

> The function of adjusting associated line control points is supported from v0.4.6+

> Relevance support for text editing starting from v0.5.11+

This plugin is used to support the addition of associative lines.

## Register

```js
import MindMap from 'simple-mind-map'
import AssociativeLine from 'simple-mind-map/src/plugins/AssociativeLine.js'
// import AssociativeLine from 'simple-mind-map/src/AssociativeLine.js' Use this path for versions below v0.6.0

MindMap.usePlugin(AssociativeLine)
```

After registration and instantiation of `MindMap`, the instance can be obtained through `mindMap.associativeLine`.

## Config

Support for modifying the thickness and color of associated lines, divided into default and active states. The configuration is as follows:

- `associativeLineWidth`: The thickness of the default state of the associated line. The default value is `2`

- `associativeLineColor`: Color of the default state of associative lines. The default value is `rgb(51, 51, 51)`

- `associativeLineActiveWidth`: The thickness of the active state of the associated line. The default value is `8`

- `associativeLineActiveColor`: The color of the active state of the associated line. The default value is `rgba(2, 167, 240, 1)`

The configuration is provided as a theme, so if you want to modify these four properties, you can modify them using the `mindMap.setThemeConfig(config)` method.

## Props

### mindMap.associativeLine.lineList

Currently, all connection line data, array types, and each item of the array are also an array:

```js
[
    path, // Connector node
    clickPath, // Invisible click line node
    node, // Start node
    toNode // Target node
]
```

### mindMap.associativeLine.activeLine

The currently active connection line and array type are the same as the structure of each item in the `lineList` array.

## Methods

### renderAllLines()

Re-render all associated lines.

### removeAllLines()

Remove all associated lines.

### createLineFromActiveNode()

Create an associated line from the current active node. If there are multiple active nodes, the default is the first node.

After calling this method, an association line will be rendered from the first active node to the current mouse real-time position. When a target node is clicked, it represents completion of creation. An association line will be rendered between the first active node and the clicked node.

### createLine(fromNode)

Creates an associative line starting at the specified node.

After calling this method, an association line will be rendered from the specified node to the current mouse real-time position. When a target node is clicked, it represents completion of creation, and an association line will be rendered between the specified node and the clicked node.

### addLine(fromNode, toNode)

Add an associative line directly.

Calling this method will directly create an association line from the `fromNode` to the `toNode` node.

### removeLine()

Deletes the currently active associative line. Clicking on an associated line is considered active.

### clearActiveLine()

Clears the active state of the currently active association line.

### front()

> v0.8.0+

The top-level display of the associated line.

### back()

> v0.8.0+

The associated line returns to its original level.