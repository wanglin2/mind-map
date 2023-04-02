# Node instance

Each node will instantiate a `node` instance

## Property

### nodeData

The real data corresponding to this node

### uid

The unique identifier of this node

### isRoot

Whether it is the root node

### layerIndex

Node level

### width

Width of the node

### height

Height of the node

### left

`left` position of the node

### top

`top` position of the node

### parent

Parent node of the node

### children

List of child nodes of the node

### group

Node is the content container, `svg` object

### isDrag

> v0.1.5+

Whether the node is currently being dragged

## Methods

### getSize()

Update the width and height of the node by recreating the node content, and return a Boolean value indicating whether the width and height have changed

### render()

Recursively render this node and all its child nodes

### updateNodeShape()

> v0.5.0+

Update node shape nodes. For example, when the node status changes, call this method to display or deactivate the style.

### remove()

Recursive deletion, which is only deleted from the canvas. The node container is still present, and can be reinserted back into the canvas in the future

### destroy()

> v0.5.0+

Destroying a node will not only delete it from the canvas, but also directly empty the original node, which cannot be inserted back into the canvas in the future

### renderLine()

Re-render the line from this node to its child nodes

### removeLine()

Remove the line from this node to its child nodes

### renderExpandBtn()

Render the content of the expand/collapse button

### removeExpandBtn()

Remove the expand/collapse button

### getStyle(prop, root, isActive)

Get the final style value applied to this node

`prop`: the style property to get

`root`: whether it is the root node, default `false`

`isActive`: whether the value being fetched is the active state style value,
default `false`

### setStyle(prop, value, isActive)

Modify a style of the node, a shortcut method for the `SET_NODE_STYLE` command

### getData(key)

Get the specified value in the `data` object of the node's real data `nodeData`,
if `key` is not passed, return the `data` object

### setData(data)

Set the value of the specified key in the data object of the node's real data
nodeData, `SET_NODE_DATA` command's shortcut method

### setText(text, richText)

- `richText`: v0.4.2+，`Boolean`, If you want to set rich text content, that is, `html` character, `richText` needs to be passed `true`

Setting the node text, a shortcut for the `SET_NODE_TEXT` command

### setImage(imgData)

Setting the node image, a shortcut for the `SET_NODE_IMAGE` command

### setIcon(icons)

Setting the node icon, a shortcut for the `SET_NODE_ICON` command

### setHyperlink(link, title)

Setting the node hyperlink, a shortcut for the `SET_NODE_HYPERLINK` command

### setNote(note)

Setting the node note, a shortcut for the `SET_NODE_NOTE` command

### setTag(tag)

Setting the node tag, a shortcut for the `SET_NODE_TAG` command"

### hide()

> v0.1.5+

Hide node and its sub-nodes

### show()

> v0.1.5+

Show node and its sub-nodes

### isParent(node)

> v0.1.5+

Check if the current node is an ancestor of a certain node

### isBrother(node)

> v0.1.5+

Check if the current node is a sibling of a certain node

### checkHasGeneralization()

> v0.2.0+

Check if there is a summary

### hideGeneralization()

> v0.2.0+

Hide summary node

### showGeneralization()

> v0.2.0+

Show summary node

### updateGeneralization()

> v0.2.0+

Update summary node

### hasCustomPosition()

> v0.2.0+

Check if the node has custom data

### ancestorHasCustomPosition()

> v0.2.0+

Check if there is an ancestor node with custom position

### getShape()

> v0.2.4+

Get node shape

### setShape(shape)

> v0.2.4+

Set node shape, a shortcut method for the `SET_NODE_SHAPE` command

### getSelfStyle(prop)

> v0.2.5+

Get the node's own custom style

### getParentSelfStyle(prop)

> v0.2.5+

Get the custom style of the nearest ancestor node with its own custom style

### getSelfInhertStyle(prop)

> v0.2.5+

Get the node's own inheritable custom style