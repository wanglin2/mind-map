# Render instance

The `render` instance is responsible for the entire rendering process and can be
accessed through `mindMap.renderer`.

## Properties

### activeNodeList

Gets the current list of active nodes.

### root

Gets the root node of the node tree.

## Methods

### highlightNode(node, range)

> v0.9.0+

- `node`：Target node instance to highlight

- `range`：Optional, Array, a range array, [0, 1]

Highlight a node or child node. If the 'range' parameter is not passed, the specified 'node' node is directly highlighted. If the 'range' passes a range of child nodes to be highlighted, the child nodes of that range will be highlighted.

The highlight effect is wrapped by a rectangular box, and the stroke and fill style of the rectangle can be configured through the 'highlightNodeBoxStyle' instantiation option.

### closeHighlightNode()

> v0.9.0+

隐藏节点高亮框。

### setRootNodeCenter()

> v0.8.0+

Return to the central theme, that is, set the root node to the center of the canvas.

### setData(data)

> v0.7.3+

Dynamically set mind map data.

### clearActive()

> v0.8.0+ abandoned

Clears the currently active node.

### clearAllActive()

> v0.8.0+ abandoned

Clears all currently active nodes and triggers the `node_active` event.

### clearActiveNode()

> v0.8.0+

Clears all currently active nodes and triggers the `node_active` event.

### clearActiveNodeList()

> v0.8.0+

Clears all currently active nodes but not triggers the `node_active` event.

### startTextEdit()

> v0.1.6+

If there is a text editing requirement, this method can be called to
disable the enter key and delete key related shortcuts to prevent conflicts.

### endTextEdit()

> v0.1.6+

End text editing, restore enter key and delete key related shortcuts.

### addActiveNode(node)

> v0.8.0+ abandoned

Add a node to the active list.

### addNodeToActiveList(node)

> v0.8.0+

Add a node to the active list.

### removeActiveNode(node)

> v0.8.0+ abandoned

Remove a node from the active list.

### removeNodeFromActiveList(node)

> v0.8.0+

Remove a node from the active list.

### findActiveNodeIndex(node)

Search for the index of a node in the active list.

### getNodeIndex(node)

Get the position index of a node among its siblings.

### removeOneNode(node)

Delete a specific node.

### copyNode()

Copy a node, the active node is the node to be operated on, if there are
multiple active nodes, only the first node will be operated on.

### setNodeDataRender(node, data, notRender)

- `notRender`: v0.6.9+, `Boolean`, Default is `false`, Do not trigger rendering.

Set node `data`, i.e. the data in the data field, and will determine whether the
node needs to be re-rendered based on whether the node size has changed, `data`
is an object, e.g. `{text: 'I am new text'}`.

### moveNodeTo(node, toNode)

> v0.1.5+

Move a node as a child of another node.

### insertBefore(node, exist)

> v0.1.5+

Move a node in front of another node.

### insertAfter(node, exist)

> v0.1.5+

Move a node behind another node.

### moveNodeToCenter(node)

> v0.2.17+

Move a node to the center of the canvas.

Currently, if there is zoom, returning to the center will reset the zoom.

### expandToNodeUid(uid, callback)

> v0.6.7+

- `uid`: uid of node

- `callback`: Expand completed callback function

Expand to the node of the specified uid.

### findNodeByUid(uid)

> v0.6.7+

- `uid`: uid of node

Find the corresponding node instance based on the uid.

### copy()

> v0.6.8+

Copy nodes. After calling this method, the current activated node data will be stored. Multiple activated nodes will only operate on the first node, and subsequent calls to the 'paste()' method can be pasted.

### cut()

> v0.6.8+

Cut a node. After calling this method, the currently active node will be cut and the node data will be stored. Multiple nodes will only operate on the first node, and subsequent calls to the 'paste()' method can be pasted.

### paste()

> v0.6.8+

Pasting nodes can be done by calling the 'copy()' or 'cut()' method after calling it. This method does not support pasting data from the user's clipboard. Please use the built-in 'Ctrl+v' shortcut key.