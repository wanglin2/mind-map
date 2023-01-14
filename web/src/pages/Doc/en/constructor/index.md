# Constructor

## Basic use

```html
<div id="mindMapContainer"></div>
```

```js
import MindMap from "simple-mind-map";

const mindMap = new MindMap({
  el: document.getElementById("mindMapContainer"),
  data: {
    "data": {
        "text": "Root Node"
    },
    "children": []
  }
});
```

## Xmind Parsing Method

> v0.2.7+

You can get the `Xmind` parsing method as follows:

```js
import MindMap from "simple-mind-map";

console.log(MindMap.xmind);
```

The `MindMap.xmind` object has two methods attached:

### parseXmindFile(file)

Parsing the `.xmind` file and returning the parsed data. Note that this is
complete data, including the node tree, theme, and structure. You can use
`mindMap.setFullData(data)` to render the returned data to the canvas.

`file`: `File` object

### transformXmind(content)

Convert `xmind` data. The `.xmind` file is essentially a `zip` file that can be
decompressed by changing the suffix to zip. Inside, there is a `content.json`
file. If you have parsed this file yourself, you can pass the contents of this
file to this method for conversion. The converted data is the complete data,
including the node tree, theme, structure, etc. You can use
`mindMap.setFullData(data)` to render the returned data to the canvas.

`content`: the contents of the `content.json` file within the `.xmind` zip
package

### transformOldXmind(content)

> v0.2.8+

For data parsing of the `xmind8` version, because the `.xmind` file in this
version does not have a `content.json`, it corresponds to `content.xml`.

`content`: the contents of the `content.xml` file within the `.xmind` zip
package

## Instantiation options

| Field Name                       | Type    | Default Value    | Description                                                  | Required |
| -------------------------------- | ------- | ---------------- | ------------------------------------------------------------ | -------- |
| el                               | Element |                  | Container element, must be a DOM element                     | Yes      |
| data                             | Object  | {}               | Mind map data, refer to: https://github.com/wanglin2/mind-map/blob/main/simple-mind-map/example/exampleData.js |          |
| layout                           | String  | logicalStructure | Layout type, options: logicalStructure (logical structure diagram), mindMap (mind map), catalogOrganization (catalog organization diagram), organizationStructure (organization structure diagram) |          |
| theme                            | String  | default          | Theme, options: default, classic, minions, pinkGrape, mint, gold, vitalityOrange, greenLeaf, dark2, skyGreen, classic2, classic3, classic4 (v0.2.0+), classicGreen, classicBlue, blueSky, brainImpairedPink, dark, earthYellow, freshGreen, freshRed, romanticPurple |          |
| themeConfig                      | Object  | {}               | Theme configuration, will be merged with the selected theme, available fields refer to: https://github.com/wanglin2/mind-map/blob/main/simple-mind-map/src/themes/default.js |          |
| scaleRatio                       | Number  | 0.1              | The incremental scaling ratio                                |          |
| maxTag                           | Number  | 5                | The maximum number of tags displayed in the node, any additional tags will be discarded |          |
| exportPadding                    | Number  | 20               | The padding for exporting images                             |          |
| imgTextMargin                    | Number  | 5                | The spacing between the image and text in the node           |          |
| textContentMargin                | Number  | 2                | The spacing between various text information in the node, such as the spacing between the icon and text |          |
| selectTranslateStep              | Number  | 3                | The canvas offset when mouse moves to the edge during multi-select node |          |
| selectTranslateLimit             | Number  | 20               | The distance from the edge when the canvas begins to offset during multi-select node |          |
| customNoteContentShow（v0.1.6+） | Object  | null             | Custom node note content display, object type, structure: {show: (noteContent, left, top) => {// your display node note logic }, hide: () => {// your hide node note logic }} |          |
| readonly（v0.1.7+）              | Boolean | false            | Whether it is read-only mode                                 |          |
| enableFreeDrag（v0.2.4+）        | Boolean | false            | Enable node free drag                                        |          |

## Static methods

### defineTheme(name, config)

> v0.2.23+

Define new theme.

`name`：New theme name

`config`：New theme config

`Simple-mind-map ` Built-in many themes. In addition, you can register new theme. It is recommended to register before instantiation, so that you can directly use the newly registered theme during instantiation. Use example:

```js
import MindMap from 'simple-mind-map'
// 注册新主题
MindMap.defineTheme('Theme name', {})

// 1.实例化时使用新注册的主题
const mindMap = new MindMap({
    theme: 'Theme name'
})

// 2.动态切换新主题
mindMap.setTheme('Theme name')
```

For all configurations of theme, please refer to [Default Topic](https://github.com/wanglin2/mind-map/blob/main/simple-mind-map/src/themes/default.js). The `defineTheme`method will merge the configuration you passed in with the default configuration. Most of the themes  do not need custom many parts. For a typical customized theme configuration, please refer to [blueSky](https://github.com/wanglin2/mind-map/blob/main/simple-mind-map/src/themes/blueSky.js).



## Instance methods

### render()

Triggers a full rendering, which will reuse nodes for better performance. If
only the node positions have changed, this method can be called to `reRender`.

### reRender()

Performs a full re-render, clearing the canvas and creating new nodes. This has
poor performance and should be used sparingly.

### resize()

After the container size has changed, this method should be called to adjust.

### setMode(mode)

> v0.1.7+

Switches between readonly and edit mode.

`mode`：readonly、edit

### on(event, fn)

Listen to an event. Event list:

| Event Name                       | Description                                                              | Callback Parameters                                                                                             |
| -------------------------------- | ------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------- |
| data_change                      | Tree rendering data change, listen to this method to get the latest data | data (current tree rendering data)                                                                              |
| view_data_change（v0.1.1+）      | View change data, such as when dragging or zooming                       | data (current view state data)                                                                                  |
| back_forward                     | Forward or backward                                                      | activeHistoryIndex (current index in the history data array), length (current length of the history data array) |
| draw_click                       | Canvas click event                                                       | e (event object)                                                                                                |
| svg_mousedown                    | svg canvas mouse down event                                              | e (event object)                                                                                                |
| mousedown                        | el element mouse down event                                              | e (event object), this (Event event class instance)                                                             |
| mousemove                        | el element mouse move event                                              | e (event object), this (Event event class instance)                                                             |
| drag                             | If it is a drag event while holding down the left button                 | e (event object), this (Event event class instance)                                                             |
| mouseup                          | el element mouse up event                                                | e (event object), this (Event event class instance)                                                             |
| mousewheel                       | Mouse scroll event                                                       | e (event object), dir (up or down scroll), this (Event event class instance)                                    |
| contextmenu                      | svg canvas right mouse button menu event                                 | e (event object)                                                                                                |
| node_click                       | Node click event                                                         | this (node instance), e (event object)                                                                          |
| node_mousedown                   | Node mouse down event                                                    | this (node instance), e (event object)                                                                          |
| node_mouseup                     | node mouseup event                                                       | this (node instance), e (event object)                                                                          |
| node_mouseup                     | Node mouseup event                                                       | this (node instance), e (event object)                                                                          |
| node_dblclick                    | Node double-click event                                                  | this (node instance), e (event object)                                                                          |
| node_contextmenu                 | Node right-click menu event                                              | e (event object), this (node instance)                                                                          |
| before_node_active               | Event before node activation                                             | this (node instance), activeNodeList (current list of active nodes)                                             |
| node_active                      | Node activation event                                                    | this (node instance), activeNodeList (current list of active nodes)                                             |
| expand_btn_click                 | Node expand or collapse event                                            | this (node instance)                                                                                            |
| before_show_text_edit            | Event before node text edit box opens                                    |                                                                                                                 |
| hide_text_edit                   | Node text edit box close event                                           | textEditNode (text edit box DOM node), activeNodeList (current list of active nodes)                            |
| scale                            | Zoom event                                                               | scale (zoom ratio)                                                                                              |
| node_img_dblclick（v0.2.15+）    | Node image double-click event                                            | this (node instance), e (event object)                                                                          |
| node_tree_render_end（v0.2.16+） | Node tree render end event                                               |                                                                                                                 |

### emit(event, ...args)

Trigger an event, which can be one of the events listed above or a custom event.

### off(event, fn)

Unbind an event.

### setTheme(theme)

Switches the theme. Available themes can be found in the options table above.

### getTheme()

Gets the current theme.

### setThemeConfig(config)

Sets the theme configuration. `config` is the same as the `themeConfig` option
in the options table above.

### getCustomThemeConfig()

Gets the custom theme configuration.

### getThemeConfig(prop)

Gets the value of a specific theme configuration property.

### getConfig(*prop*)

> 0.2.24+

`prop`：Get the value of the specified configuration, and return the entire configuration if not passed

Get config, That is,  `opt` of `new MindMap (opt)`

### updateConfig(*opt* = {})

> 0.2.24+

`opt`：Configuration to update

Update config，That is update `opt` of `new MindMap(opt)`，You can only update some data, such as:

```js
mindMap.updateConfig({
    enableFreeDrag: true// 开启节点自由拖拽
})
```

This method only updates the configuration and has no other side effects, such as triggering canvas re-rendering

### getLayout()

Gets the current layout structure.

### setLayout(layout)

Sets the layout structure. Available values can be found in the `layout` field
in the options table above.

### execCommand(name, ...args)

Executes a command, which will add a record to the history stack for undo or
redo. All commands are as follows:

| Command name                       | Description                                                                                                                                                                                                            | Parameters                                                                                                                                                                                                                                                                                                                                               |
| ---------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| SELECT_ALL                         | Select all                                                                                                                                                                                                             |                                                                                                                                                                                                                                                                                                                                                          |
| BACK                               | Go back a specified number of steps                                                                                                                                                                                    | step (the number of steps to go back, default is 1)                                                                                                                                                                                                                                                                                                      |
| FORWARD                            | Go forward a specified number of steps                                                                                                                                                                                 | step (the number of steps to go forward, default is 1)                                                                                                                                                                                                                                                                                                   |
| INSERT_NODE                        | Insert a sibling node, the active node will be the operation node. If there are multiple active nodes, only the first one will be effective                                                                            |                                                                                                                                                                                                                                                                                                                                                          |
| INSERT_CHILD_NODE                  | Insert a child node, the active node will be the operation node                                                                                                                                                        |                                                                                                                                                                                                                                                                                                                                                          |
| UP_NODE                            | Move node up, the active node will be the operation node. If there are multiple active nodes, only the first one will be effective. Using this command on the root node or the first node in the list will be invalid  |                                                                                                                                                                                                                                                                                                                                                          |
| DOWN_NODE                          | Move node down, the active node will be the operation node. If there are multiple active nodes, only the first one will be effective. Using this command on the root node or the last node in the list will be invalid |                                                                                                                                                                                                                                                                                                                                                          |
| REMOVE_NODE                        | Remove node, the active node will be the operation node                                                                                                                                                                |                                                                                                                                                                                                                                                                                                                                                          |
| PASTE_NODE                         | Paste node to a node, the active node will be the operation node                                                                                                                                                       | data (the node data to paste, usually obtained through the renderer.copyNode() and renderer.cutNode() methods)                                                                                                                                                                                                                                           |
| SET_NODE_STYLE                     | Modify node style                                                                                                                                                                                                      | node (the node to set the style of), prop (style property), value (style property value), isActive (boolean, whether the style being set is for the active state)                                                                                                                                                                                        |
| SET_NODE_ACTIVE                    | Set whether the node is active                                                                                                                                                                                         | node (the node to set), active (boolean, whether to activate)                                                                                                                                                                                                                                                                                            |
| CLEAR_ACTIVE_NODE                  | Clear the active state of the currently active node(s), the active node will be the operation node                                                                                                                     |                                                                                                                                                                                                                                                                                                                                                          |
| SET_NODE_EXPAND                    | Set whether the node is expanded                                                                                                                                                                                       | node (the node to set), expand (boolean, whether to expand)                                                                                                                                                                                                                                                                                              |
| EXPAND_ALL                         | Expand all nodes                                                                                                                                                                                                       |                                                                                                                                                                                                                                                                                                                                                          |
| UNEXPAND_ALL                       | Collapse all nodes                                                                                                                                                                                                     |                                                                                                                                                                                                                                                                                                                                                          |
| UNEXPAND_TO_LEVEL (v0.2.8+)        | Expand to a specified level                                                                                                                                                                                            | level (the level to expand to, 1, 2, 3...)                                                                                                                                                                                                                                                                                                               |
| SET_NODE_DATA                      | Update node data, that is, update the data in the data object of the node data object                                                                                                                                  | node (the node to set), data (object, the data to update, e.g. `{expand: true}`)                                                                                                                                                                                                                                                                         |
| SET_NODE_TEXT                      | Set node text                                                                                                                                                                                                          | node (the node to set), text (the new text for the node)                                                                                                                                                                                                                                                                                                 |
| SET_NODE_IMAGE                     | Set Node Image                                                                                                                                                                                                         | node (node to set), imgData (object, image information, structured as: `{url, title, width, height}`, the width and height of the image must be passed)                                                                                                                                                                                                  |
| SET_NODE_ICON                      | Set Node Icon                                                                                                                                                                                                          | node (node to set), icons (array, predefined image names array, available icons can be obtained in the nodeIconList list in the [https://github.com/wanglin2/mind-map/blob/main/simple-mind-map/src/svg/icons.js](https://github.com/wanglin2/mind-map/blob/main/simple-mind-map/src/svg/icons.js) file, icon name is type_name, such as ['priority_1']) |
| SET_NODE_HYPERLINK                 | Set Node Hyperlink                                                                                                                                                                                                     | node (node to set), link (hyperlink address), title (hyperlink name, optional)                                                                                                                                                                                                                                                                           |
| SET_NODE_NOTE                      | Set Node Note                                                                                                                                                                                                          | node (node to set), note (note text)                                                                                                                                                                                                                                                                                                                     |
| SET_NODE_TAG                       | Set Node Tag                                                                                                                                                                                                           | node (node to set), tag (string array, built-in color information can be obtained in [https://github.com/wanglin2/mind-map/blob/main/simple-mind-map/src/utils/constant.js](https://github.com/wanglin2/mind-map/blob/main/simple-mind-map/src/utils/constant.js))                                                                                       |
| INSERT_AFTER (v0.1.5+)             | Move Node to After Another Node                                                                                                                                                                                        | node (node to move), exist (target node)                                                                                                                                                                                                                                                                                                                 |
| INSERT_BEFORE (v0.1.5+)            | Move Node to Before Another Node                                                                                                                                                                                       | node (node to move), exist (target node)                                                                                                                                                                                                                                                                                                                 |
| MOVE_NODE_TO (v0.1.5+)             | Move a node as a child of another node                                                                                                                                                                                 | node (the node to move), toNode (the target node)                                                                                                                                                                                                                                                                                                        |
| ADD_GENERALIZATION (v0.2.0+)       | Add a node summary                                                                                                                                                                                                     | data (the data for the summary, in object format, all numerical fields of the node are supported, default is `{text: 'summary'}`)                                                                                                                                                                                                                        |
| REMOVE_GENERALIZATION (v0.2.0+)    | Remove a node summary                                                                                                                                                                                                  |                                                                                                                                                                                                                                                                                                                                                          |
| SET_NODE_CUSTOM_POSITION (v0.2.0+) | Set a custom position for a node                                                                                                                                                                                       | node (the node to set), left (custom x coordinate, default is undefined), top (custom y coordinate, default is undefined)                                                                                                                                                                                                                                |
| RESET_LAYOUT (v0.2.0+)             | Arrange layout with one click                                                                                                                                                                                          |                                                                                                                                                                                                                                                                                                                                                          |
| SET_NODE_SHAPE (v0.2.4+)           | Set the shape of a node                                                                                                                                                                                                | node (the node to set), shape (the shape, all shapes: https://github.com/wanglin2/mind-map/blob/main/simple-mind-map/src/Shape.js)                                                                                                                                                                                                                       |

### setData(data)

Dynamic setting of mind map data, pure node data

`data`: mind map structure data

### setFullData(_data_)

> v0.2.7+

Dynamic setting of mind map data, including node data, layout, theme, view

`data`: complete data, structure can refer to
[exportFullData](https://github.com/wanglin2/mind-map/blob/main/simple-mind-map/example/exportFullData.json)

### getData(withConfig)

> v0.2.9+

Gets mind map data

`withConfig`: `Boolean`, default is `false`, that is, the obtained data only
includes the node tree, if `true` is passed, it will also include theme, layout,
view, etc. data

### export(type, isDownload, fileName)

Export

`type`: the type to be exported, optional values: png, svg, json, pdf (v0.2.1+),
smm (essentially also json)

`isDownload`: whether to directly trigger download, Boolean value, default is
`false`

`fileName`: (v0.1.6+) the name of the exported file, default is `思维导图` (mind
map).

### toPos(x, y)

> v0.1.5+

Convert the coordinates of the browser's visible window to coordinates relative
to the canvas.