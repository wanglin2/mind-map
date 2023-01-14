# Render instance

The `render` instance is responsible for the entire rendering process and can be
accessed through `mindMap.renderer`.

## Properties

### activeNodeList

Gets the current list of active nodes

### root

Gets the root node of the node tree

## Methods

### clearActive()

Clears the currently active node

### clearAllActive()

Clears all currently active nodes and triggers the `node_active` event

### startTextEdit()

> v0.1.6+

If there is a text editing requirement, this method can be called to
disable the enter key and delete key related shortcuts to prevent conflicts

### endTextEdit()

> v0.1.6+

End text editing, restore enter key and delete key related shortcuts

### addActiveNode(node)

Add a node to the active list

### removeActiveNode(node)

Remove a node from the active list

### findActiveNodeIndex(node)

Search for the index of a node in the active list

### getNodeIndex(node)

Get the position index of a node among its siblings

### removeOneNode(node)

Delete a specific node

### copyNode()

Copy a node, the active node is the node to be operated on, if there are
multiple active nodes, only the first node will be operated on

### setNodeDataRender(node, data)

Set node `data`, i.e. the data in the data field, and will determine whether the
node needs to be re-rendered based on whether the node size has changed, `data`
is an object, e.g. `{text: 'I am new text'}`

### moveNodeTo(node, toNode)

> v0.1.5+

Move a node as a child of another node

### insertBefore(node, exist)

> v0.1.5+

Move a node in front of another node

### insertAfter(node, exist)

> v0.1.5+

Move a node behind another node

### moveNodeToCenter(node)

> v0.2.17+

Move a node to the center of the canvas.

Currently, if there is zoom, returning to the center will reset the zoom.