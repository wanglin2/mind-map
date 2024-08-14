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

### active()

Manually activating this node will cause other activated nodes to lose their activation.

### checkIsInClient(padding = 0)

> v0.10.4+

- `padding`: Number, The size of the area extending around the canvas

Determine whether the node is within the visible area of the canvas.

### deactivate()

> 0.9.11+

Deactivate the node.

### getAncestorNodes()

> v0.9.9+

Obtain a list of ancestor node instances.

### highlight()

> v0.9.8+

Highlight node.

### closeHighlight()

> v0.9.8+

Unhighlight node.

### getPureData(removeActiveState = true, removeId = false)

> v0.9.0+

- `removeActiveState`：Is remove the activation status of the node

- `removeId`：Is remove the uid of the node

Serialize a node to obtain its pure data, excluding references to node instances.

### setGeneralizationOpacity(val)

> v0.9.0+

- `val`：Number, 0-1，Opacity

Set the transparency of summary nodes and curves.

### formatGetGeneralization()

> v0.9.0+

Obtain node summary data.

### getIndexInBrothers()

> v0.9.0+

Gets the index of the node in the sibling node list.

### getRectInSvg()

> v0.9.0+

Obtain the size and position information of the node. The width and height are the actual width and height after applying the scaling effect, and the position information is relative to the canvas.

### getRect()

> v0.8.1+

Obtain the size and position information of the node. The width and height are the actual width and height after applying the scaling effect, and the position is relative to the upper left corner of the browser window.

### ancestorHasGeneralization()

> v0.8.1+

Check if there are ancestor nodes with a summary.

### getNoteContentPosition()

> v0.8.1+

Obtain the display position of node comments. When a node has comments and is displaying a state, dragging or zooming will cause the comment floating layer to detach from the node. This method can be used to obtain a new position and update the comment floating layer.

### updateNodeByActive(active)

> v0.8.0+

- `active`：Boolean, active status.

Update nodes based on whether they are activated or not. The main task is to update the display and hiding of the expand and collapse buttons for nodes.

### setOpacity(val)

> v0.7.2+

- `val`: Opacity value，0-1

Set node transparency, including connecting lines and child nodes.

### hideChildren()

> v0.7.2+

Hide subordinate nodes.

### showChildren()

> v0.7.2+

Display subordinate nodes.

### hasCustomStyle()

> v0.6.2+

Gets whether a custom style has been set.

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

`isActive`: v0.7.0+has been abandoned, whether the value being fetched is the active state style value,
default `false`

### setStyle(prop, value, isActive)

- `isActive`: v0.7.0+has been abandoned

Modify a style of the node, a shortcut method for the `SET_NODE_STYLE` command

### setStyles(style, isActive)

> v0.6.12+

- `isActive`: v0.7.0+has been abandoned

Modify multiple styles of nodes, a shortcut method for the `SET_NODE_STYLES` command

### getData(key)

Get the specified value in the `data` object of the node's real data `nodeData`,
if `key` is not passed, return the `data` object

### setData(data)

Set the value of the specified key in the data object of the node's real data
nodeData, `SET_NODE_DATA` command's shortcut method. This method and command will not update the view, so if you want to modify the text, use the 'setText' method or use the command pointing to the text.

### setText(text, richText, resetRichText)

- `richText`: v0.4.2+，`Boolean`, If you want to set rich text content, that is, `html` character, `richText` needs to be passed `true`. After version 0.9.3+, if this parameter is not passed, it will use previous value.

- `resetRichText`: v0.6.10+, `Boolean`, whether to reset rich text, The default is 'false'. If 'true' is passed, the style of the rich text node will be reset

Setting the node text, a shortcut for the `SET_NODE_TEXT` command

### setImage(imgData)

Setting the node image, a shortcut for the `SET_NODE_IMAGE` command

### setIcon(icons)

Setting the node icon, a shortcut for the `SET_NODE_ICON` command

### setHyperlink(link, title)

Setting the node hyperlink, a shortcut for the `SET_NODE_HYPERLINK` command

### setNote(note)

Setting the node note, a shortcut for the `SET_NODE_NOTE` command

### setAttachment(url, name)

> v0.9.10+

- `url`：Attachment url；

- `name`：Attachment name, optional

Set node attachments, a shortcut for the `SET_NODE_ATTACHMENT` command

### setTag(tag)

Setting the node tag, a shortcut for the `SET_NODE_TAG` command

### hide()

> v0.1.5+

Hide node and its sub-nodes

### show()

> v0.1.5+

Show node and its sub-nodes

### isParent(node)

> v0.1.5+：Detect whether the current node is an ancestor node of a certain node

> v0.8.1+：Detect whether the current node is the parent node of a certain node

### isAncestor(node) 

> v0.8.1+

Detect whether the current node is an ancestor node of a certain node

### isBrother(node)

> v0.1.5+

Check if the current node is a sibling of a certain node

### checkHasGeneralization()

> v0.2.0+

Check if there is a summary

### checkHasSelfGeneralization()

> v0.9.0+

Check if there is a summary of oneself, not a sub node interval summary

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