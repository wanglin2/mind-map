# Render instance

The `render` instance is responsible for the entire rendering process and can be
accessed through `mindMap.renderer`.

## Properties

### activeNodeList

Gets the current list of active nodes.

### root

Node tree, also known as the mind map node instance tree.

### renderTree

The rendering tree, also known as the data tree of the mind map.

### layout

## Methods

### activeMultiNode(nodeList = [])

> v0.10.6+

- `nodeList`：Node instance list

Manually activate multiple nodes. To activate a single node, please directly call the 'active()' method of the node instance.

### cancelActiveMultiNode(nodeList = [])

> v0.10.6+

- `nodeList`：Node instance list

Manually deactivate multiple nodes. To deactivate a single node, please directly call the 'deactivate()' method of the node instance.

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

### addNodeToActiveList(node, notEmitBeforeNodeActiveEvent = false)

> v0.8.0+

- `notEmitBeforeNodeActiveEvent`：v0.9.12+，is not distribute the 'before_node_active' event, which defaults to 'false' and will be distributed;

Add a node to the active list. If you want to manually activate a node to achieve the same effect as clicking with a mouse, please directly call the 'active()' method of the node instance.

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

### moveNodeToCenter(node, resetScale)

> v0.2.17+

- `resetScale`: v0.10.1+, Specify whether to reset the canvas scaling value to 100%. When you do not explicitly pass it, the default value is undefined, because the resetScaleOnMoveNodeToCenter configuration of the instantiation option also determines whether to reset scaling. Therefore, use the resetScaleOnMoveNodeToCenter configuration when you do not explicitly pass it, otherwise use the resetScale configuration

Move a node to the center of the canvas.

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

Copy nodes. After calling this method, the current activated node data will be stored. and subsequent calls to the 'paste()' method can be pasted.

If the browser and protocol (https) support 'js' to manipulate clipboard data, the copied node data will also be added to the user's clipboard.

### cut()

> v0.6.8+

Cut a node. After calling this method, the currently active node will be cut and the node data will be stored. and subsequent calls to the 'paste()' method can be pasted.

If the browser and protocol (https) support 'js' to manipulate clipboard data, the copied node data will also be added to the user's clipboard.

### paste()

> v0.6.8+

Pasting nodes can be done by calling the 'copy()' or 'cut()' method after calling it. 

If the browser and protocol (https) support 'js' to manipulate clipboard data, data copied from other places can also be pasted. For example, you can paste' simple mind map 'nodes across browsers. If it is non' simple mind map 'node data, the text and images in the clipboard will be extracted and pasted. The text will be pasted as a child node by default, and the images will be added to the current node by default.

### clearCache()

> v0.9.2+

Empty the node cache pool.

### emitNodeActiveEvent(node = null, activeNodeList = [...this.activeNodeList])

- `node`：The node activated this time

- `activeNodeList`：All currently activated nodes

Dispatch node activation event, which triggers `node_active` event.