# Node实例

每个节点都会实例化一个`node`实例

## 属性

### nodeData

该节点对应的真实数据

### uid

该节点唯一的标识

### isRoot

是否是根节点

### layerIndex

节点层级

### width

节点的宽

### height

节点的高

### left

节点的`left`位置

### top

节点的`top`位置

### parent

节点的父节点

### children

节点的子节点列表

### group

节点是内容容器，`svg`对象

### isDrag

> v0.1.5+

节点是否正在拖拽中

## 方法

### hasCustomStyle()

> v0.6.2+

获取是否设置了自定义样式。

### getSize()

通过重新创建节点内容更新节点的宽高，返回一个布尔值，代表是否宽高发生了变化

### render()

递归渲染该节点及其所有子节点

### updateNodeShape()

> v0.5.0+

更新节点形状节点。比如当节点状态改变后，调用该方法显示或取消激活样式。

### remove()

递归删除，只是从画布删除，节点容器还在，后续还可以重新插回画布

### destroy()

> v0.5.0+

销毁节点，不但会从画布删除，而且原节点直接置空，后续无法再插回画布

### renderLine()

重新渲染该节点到其子节点之间的连线

### removeLine()

移除该节点到其子节点之间的连线

### renderExpandBtn()

渲染展开收缩按钮的内容

### removeExpandBtn()

移除展开收缩按钮

### getStyle(prop, root, isActive)

获取某个最终应用到该节点的样式值

`prop`：要获取的样式属性

`root`：是否是根节点，默认`false`

`isActive`：获取的是否是激活状态的样式值，默认`false`

### setStyle(prop, value, isActive)

修改节点的某个样式，`SET_NODE_STYLE`命令的快捷方法

### getData(key)

获取该节点真实数据`nodeData`的`data`对象里的指定值，`key`不传返回这个`data`对象

### setData(data)

设置节点数据，`SET_NODE_DATA`命令的快捷方法

### setText(text, richText)

- `richText`：v0.4.2+，`Boolean`，如果要设置的是富文本内容，也就是`html`字符，`richText`需要传`true`

设置节点文本，`SET_NODE_TEXT`命令的快捷方法

### setImage(imgData)

设置节点图片，`SET_NODE_IMAGE`命令的快捷方法

### setIcon(icons)

设置节点图标，`SET_NODE_ICON`命令的快捷方法

### setHyperlink(link, title)

设置节点超链接，`SET_NODE_HYPERLINK`命令的快捷方法

### setNote(note)

设置节点备注，`SET_NODE_NOTE`命令的快捷方法

### setTag(tag)

设置节点标签，`SET_NODE_TAG`的快捷方法

### hide()

> v0.1.5+

隐藏节点及其下级节点

### show()

> v0.1.5+

显示节点及其下级节点

### isParent(node)

> v0.1.5+

检测当前节点是否是某个节点的祖先节点

### isBrother(node)

> v0.1.5+

检测当前节点是否是某个节点的兄弟节点

### checkHasGeneralization()

> v0.2.0+

检查是否存在概要 

### hideGeneralization()

> v0.2.0+

隐藏概要节点 

### showGeneralization()

> v0.2.0+

显示概要节点

### updateGeneralization()

> v0.2.0+

更新概要节点 

### hasCustomPosition()

> v0.2.0+

检查节点是否存在自定义数据

### ancestorHasCustomPosition()

> v0.2.0+

检查节点是否存在自定义位置的祖先节点 

### getShape()

> v0.2.4+

获取节点形状

### setShape(shape)

> v0.2.4+

设置节点形状，`SET_NODE_SHAPE`命令的快捷方法

### getSelfStyle(prop)

> v0.2.5+

获取节点自身的自定义样式

### getParentSelfStyle(prop)

> v0.2.5+

获取最近一个存在自身自定义样式的祖先节点的自定义样式

### getSelfInhertStyle(prop)

> v0.2.5+

获取自身可继承的自定义样式