# A simple and powerful web mind map

Read this in other languages: English **(You're Here)**, [简体中文](README.zh-Hans.md)

## Features:

- [x] Supports four types of structures: logical structure diagrams, mind maps,
      organizational structure diagrams, and directory organization diagrams
- [x] Built-in multiple themes and allows for highly customized styles
- [x] Supports shortcuts
- [x] Node content supports images, icons, hyperlinks, notes, tags, and
      summaries
- [x] Supports forward and backward navigation
- [x] Supports dragging and scaling
- [x] Supports right-click to select multiple items
- [x] Supports free dragging and dragging to adjust nodes
- [x] Supports various node shapes
- [x] Supports export to json, png, svg, pdf, and import from json, xmind
- [x] Supports mini map

## Table of Contents

1.`simple-mind-map`

This is a mind map tool library that is framework-agnostic and can be used with
frameworks such as Vue and React, or without a framework.

2.`web`

This is an online mind map built using the `simple-mind-map` library and based
on `Vue2.x` and `ElementUI`. Features include:

- [x] Toolbar, which supports inserting and deleting nodes, and editing node
      images, icons, hyperlinks, notes, tags, and summaries

- [x] Sidebar, with panels for basic style settings, node style settings,
      outline, theme selection, and structure selection

- [x] Import and export functionality; data is saved in the browser's local
      storage by default, but it also supports creating, opening, and editing
      local files on the computer directly

- [x] Right-click menu, which supports operations such as expanding, collapsing,
      and organizing layout

- [x] Bottom bar, which supports node and word count statistics, switching
      between edit and read-only modes, zooming in and out, and switching to
      full screen

3.`dist`

The folder containing the packaged resources for the `web` folder.

4.`docs`

Documentation, etc.

## Development

### Local Development

```bash
git clone https://github.com/wanglin2/mind-map.git
cd simple-mind-map
npm i
npm link
cd ..
cd web
npm i
npm link simple-mind-map
npm run serve
```

### Packaging the Library

Since version `0.2.0`, we have added support for packaging the core library
simple-mind-map. This uses the same packaging tool as the sample project web.

```bash
cd web
npm run buildLibrary
```

The `package.json` file in the `simple-mind-map` library provides two export
fields:

```json
{
  "module": "index.js",
  "main": "./dist/simpleMindMap.umd.min.js"
}
```

Environments that support the `module` field will use `index.js` as the entry
point, otherwise the packed `simpleMindMap.umd.min.js` will be used as the entry
point.

### Packaging the Demo

```bash
cd web
npm run build
```

The `index.html` file will be automatically moved to the root directory.

## Related Articles

[Technical Analysis of Web Mind Map Implementation (chi)](https://juejin.cn/post/6987711560521089061)

# Installation

> Things to note before version 0.2.0:

```bash
npm i simple-mind-map
```

`0.2.0` Notes for previous versions:

> Note: This project is directly published in source code form and has not been
> packaged. If compilation fails, a Vue CLI-created project can add the
> following configuration to the vue.config.js file to allow babel-loader to
> compile this dependency:
>
> ```js
> module.exports = {
>   transpileDependencies: ["simple-mind-map"],
> };
> ```
>
> Other projects should modify the packaging configuration as needed.

# Problems

## Error when using in Vite, indicating xml-js dependency error

Solution: use the following import method:

```js
import MindMap from "simple-mind-map/dist/simpleMindMap.umd.min";
```

The `simple-mind-map` package provides the unpacked entry field `module`, and
the `xml-js` package dependency needs to import the package in the `node`
environment. Therefore, it cannot be obtained in `Vite` and an error will be
reported. Therefore, specify the import of the packed entry, and all relevant
packages are packed into the product, so there will be no error.

If you need to do further development, that is, you must use the unpacked code,
and if you do not need to parse the `xmind` file, you can remove the `xmind`
module. If you need it, you can try using other libraries to parse `xml` to
`json`.

## Error `Getting bbox of element "text" is not possible: TypeError: Cannot read properties of undefined (reading 'apply')`

The reason is that the installed version of `@svgdotjs/svg.js` is too high. You can manually reduce it to the version of `3.0.16`.

# API

## Instantiating

```html
<div id="mindMapContainer"></div>
```

```js
import MindMap from "simple-mind-map";

const mindMap = new MindMap({
  el: document.getElementById("mindMapContainer"),
  data: {
    "root": {
      "data": {
        "text": "root node",
      },
      "children": [],
    },
  },
});
```

### Xmind Parsing Method

v0.2.7+

You can get the `Xmind` parsing method as follows:

```js
import MindMap from "simple-mind-map";

console.log(MindMap.xmind);
```

The `MindMap.xmind` object has two methods attached:

#### parseXmindFile(file)

Parsing the `.xmind` file and returning the parsed data. Note that this is
complete data, including the node tree, theme, and structure. You can use
`mindMap.setFullData(data)` to render the returned data to the canvas.

`file`: `File` object

#### transformXmind(content)

Convert `xmind` data. The `.xmind` file is essentially a `zip` file that can be
decompressed by changing the suffix to zip. Inside, there is a `content.json`
file. If you have parsed this file yourself, you can pass the contents of this
file to this method for conversion. The converted data is the complete data,
including the node tree, theme, structure, etc. You can use
`mindMap.setFullData(data)` to render the returned data to the canvas.

`content`: the contents of the `content.json` file within the `.xmind` zip
package

#### transformOldXmind(content)

v0.2.8+

For data parsing of the `xmind8` version, because the `.xmind` file in this
version does not have a `content.json`, it corresponds to `content.xml`.

`content`: the contents of the `content.xml` file within the `.xmind` zip
package

### Instantiation options:

| Field Name                       | Type    | Default Value    | Description                                                                                                                                                                                                                                                          | Required |
| -------------------------------- | ------- | ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| el                               | Element |                  | Container element, must be a DOM element                                                                                                                                                                                                                             | Yes      |
| data                             | Object  | {}               | Mind map data, refer to: https://github.com/wanglin2/mind-map/blob/main/simple-mind-map/example/exampleData.js                                                                                                                                                       |          |
| layout                           | String  | logicalStructure | Layout type, options: logicalStructure (logical structure diagram), mindMap (mind map), catalogOrganization (catalog organization diagram), organizationStructure (organization structure diagram)                                                                   |          |
| theme                            | String  | default          | Theme, options: default, classic, minions, pinkGrape, mint, gold, vitalityOrange, greenLeaf, dark2, skyGreen, classic2, classic3, classic4 (v0.2.0+), classicGreen, classicBlue, blueSky, brainImpairedPink, dark, earthYellow, freshGreen, freshRed, romanticPurple |          |
| themeConfig                      | Object  | {}               | Theme configuration, will be merged with the selected theme, available fields refer to: https://github.com/wanglin2/mind-map/blob/main/simple-mind-map/src/themes/default.js                                                                                         |          |
| scaleRatio                       | Number  | 0.1              | The incremental scaling ratio                                                                                                                                                                                                                                        |          |
| maxTag                           | Number  | 5                | The maximum number of tags displayed in the node, any additional tags will be discarded                                                                                                                                                                              |          |
| exportPadding                    | Number  | 20               | The padding for exporting images                                                                                                                                                                                                                                     |          |
| imgTextMargin                    | Number  | 5                | The spacing between the image and text in the node                                                                                                                                                                                                                   |          |
| textContentMargin                | Number  | 2                | The spacing between various text information in the node, such as the spacing between the icon and text                                                                                                                                                              |          |
| selectTranslateStep              | Number  | 3                | The canvas offset when mouse moves to the edge during multi-select node                                                                                                                                                                                              |          |
| selectTranslateLimit             | Number  | 20               | The distance from the edge when the canvas begins to offset during multi-select node                                                                                                                                                                                 |          |
| customNoteContentShow（v0.1.6+） | Object  | null             | Custom node note content display, object type, structure: {show: (noteContent, left, top) => {// your display node note logic }, hide: () => {// your hide node note logic }}                                                                                        |          |
| readonly（v0.1.7+）              | Boolean | false            | Whether it is read-only mode                                                                                                                                                                                                                                         |          |

### Instance methods:

#### render()

Triggers a full rendering, which will reuse nodes for better performance. If
only the node positions have changed, this method can be called to `reRender`.

#### reRender()

Performs a full re-render, clearing the canvas and creating new nodes. This has
poor performance and should be used sparingly.

#### resize()

After the container size has changed, this method should be called to adjust.

#### setMode(mode)

v0.1.7+. Switches between readonly and edit mode.

`mode`：readonly、edit

#### on(event, fn)

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

#### emit(event, ...args)

Trigger an event, which can be one of the events listed above or a custom event.

#### off(event, fn)

Unbind an event.

#### setTheme(theme)

Switches the theme. Available themes can be found in the options table above.

#### getTheme()

Gets the current theme.

#### setThemeConfig(config)

Sets the theme configuration. `config` is the same as the `themeConfig` option
in the options table above.

#### getCustomThemeConfig()

Gets the custom theme configuration.

#### getThemeConfig(prop)

Gets the value of a specific theme configuration property.

#### getLayout()

Gets the current layout structure.

#### setLayout(layout)

Sets the layout structure. Available values can be found in the `layout` field
in the options table above.

#### execCommand(name, ...args)

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

#### setData(data)

Dynamic setting of mind map data, pure node data

`data`: mind map structure data

#### setFullData(_data_)

v0.2.7+

Dynamic setting of mind map data, including node data, layout, theme, view

`data`: complete data, structure can refer to
[exportFullData](https://github.com/wanglin2/mind-map/blob/main/simple-mind-map/example/exportFullData.json)

#### getData(withConfig)

v0.2.9+

Gets mind map data

`withConfig`: `Boolean`, default is `false`, that is, the obtained data only
includes the node tree, if `true` is passed, it will also include theme, layout,
view, etc. data

#### export(type, isDownload, fileName)

Export

`type`: the type to be exported, optional values: png, svg, json, pdf (v0.2.1+),
smm (essentially also json)

`isDownload`: whether to directly trigger download, Boolean value, default is
`false`

`fileName`: (v0.1.6+) the name of the exported file, default is `思维导图` (mind
map).

#### toPos(x, y)

v0.1.5+

Convert the coordinates of the browser's visible window to coordinates relative
to the canvas.

## render instance

The `render` instance is responsible for the entire rendering process and can be
accessed through `mindMap.renderer`.

### Properties

#### activeNodeList

Gets the current list of active nodes

#### root

Gets the root node of the node tree

### Methods

#### clearActive()

Clears the currently active node

#### clearAllActive()

Clears all currently active nodes and triggers the `node_active` event

#### startTextEdit()

(v0.1.6+) If there is a text editing requirement, this method can be called to
disable the enter key and delete key related shortcuts to prevent conflicts

#### endTextEdit()

(v0.1.6+) End text editing, restore enter key and delete key related shortcuts

#### addActiveNode(node)

Add a node to the active list

#### removeActiveNode(node)

Remove a node from the active list

#### findActiveNodeIndex(node)

Search for the index of a node in the active list

#### getNodeIndex(node)

Get the position index of a node among its siblings

#### removeOneNode(node)

Delete a specific node

#### copyNode()

Copy a node, the active node is the node to be operated on, if there are
multiple active nodes, only the first node will be operated on

#### setNodeDataRender(node, data)

Set node `data`, i.e. the data in the data field, and will determine whether the
node needs to be re-rendered based on whether the node size has changed, `data`
is an object, e.g. `{text: 'I am new text'}`

#### moveNodeTo(node, toNode)

v0.1.5+

Move a node as a child of another node

#### insertBefore(node, exist)

v0.1.5+

Move a node in front of another node

#### insertAfter(node, exist)

v0.1.5+

Move a node behind another node

#### moveNodeToCenter(node)

v0.2.17+

Move a node to the center of the canvas.

Currently, if there is zoom, returning to the center will reset the zoom.

## keyCommand instance

The `keyCommand` instance is responsible for adding and triggering shortcuts. It
includes some built-in shortcuts and can also be added manually. The
`mindMap.keyCommand` instance can be obtained through this.

### Methods

#### addShortcut(key, fn)

Add a shortcut

`key`: Shortcut key, key values can be viewed at
[https://github.com/wanglin2/mind-map/blob/main/simple-mind-map/src/utils/keyMap.js](https://github.com/wanglin2/mind-map/blob/main/simple-mind-map/src/utils/keyMap.js)
Example:

```js
// Single key
mindMap.keyCommand.addShortcut("Enter", () => {});
// Or
mindMap.keyCommand.addShortcut("Del|Backspace", () => {});
// Combination key
mindMap.keyCommand.addShortcut("Control+Enter", () => {});
```

`fn`: Method to be executed

#### removeShortcut(key, fn)

Remove a shortcut command, if `fn` is not specified, all callback methods for
the shortcut will be removed

#### getShortcutFn(key)

v0.2.2+. Get the processing function for the specified shortcut

#### pause()

v0.2.2+. Pause all shortcut responses

#### recovery()

v0.2.2+. Restore shortcut responses

#### save()

v0.2.3+. Save the current registered shortcut data, then clear the shortcut data

#### restore()

v0.2.3+. Restore saved shortcut data, then clear the cache data

## command instance

The `command` instance is responsible for adding and executing commands. It
includes many built-in commands and can also be added manually. A command refers
to an operation that needs to add a copy to the history stack data. The
`mindMap.command` instance can be obtained through this."

### Methods

#### add(name, fn)

Add a command.

`name`: Command name

`fn`: Method to be executed by the command

#### remove(name, fn)

Remove a command.

`name`: Name of the command to be removed

`fn`: Method to be removed, if not provided all methods for the command will be
removed

#### getCopyData()

Get a copy of the rendering tree data

#### clearHistory()

Clear the history stack data

## view实例

The `view` instance is responsible for view operations, and can be obtained
through `mindMap.view`

### Methods

#### translateX(step)

Translate in the `x` direction, `step`: number of pixels to translate

#### translateY(step)

Translate in the `y` direction, `step`: number of pixels to translate

#### translateXTo(x)

v0.2.11+

Translate the `x` direction to a specific position

#### translateYTo(y)

v0.2.11+

Translate the `y` direction to a specific position

#### reset()

Revert to the default transformation

#### narrow()

Zoom out

#### enlarge()

Zoom in

#### getTransformData()

v0.1.1+

Get the current transform data, can be used for display

#### setTransformData(data)

v0.1.1+

Dynamically set transform data, transform data can be obtained through the
getTransformData method"

#### setScale(scale)

v0.2.17+

Setting Zoom

## MiniMap instance

v0.2.11+

Used to help quickly develop a small map feature, the small map consists of two
parts, one is the current canvas content, and the other is the viewport frame.
When zoomed, moved, or there are too many elements, the canvas may only display
part of the mind map content. The viewport frame can be used to view the current
viewport location, and can be quickly positioned by dragging on the small map.

The `mindMap.miniMap` instance can be obtained through this.

### Methods

#### getMiniMap()

Obtain small map related data, this function is generally not used directly, the
function returns:

```js
{
      svg, // Element, the overall svg element of the mind map graphics, including: svg (canvas container), g (actual mind map group)
      svgHTML, // String, svg string, i.e. html string, can be directly rendered to the small map container you prepared
      rect: // Object, position, size, etc. of mind map graphics before zoom
      origWidth, // Number, canvas width
      origHeight, // Number, canvas height
      scaleX, // Number, horizontal zoom value of mind map graphics
      scaleY, // Number, vertical zoom value of mind map graphics
}
```

#### calculationMiniMap(boxWidth, boxHeight)

"Calculate the rendering data for the small map, this function will call the
`getMiniMap()` method, so using this function is sufficient.

`boxWidth`: the width of the small map container

`boxHeight`: the height of the small map container

Function return content:

```js
{
      svgHTML, // small map html
      viewBoxStyle, // view box position information
      miniMapBoxScale, // view box zoom value
      miniMapBoxLeft, // view box left value
      miniMapBoxTop, // view box top value
}
```

Small map idea:

1.Prepare a container element `container`, position is not `static`

2.In `container`, create a small map container element `miniMapContainer`,
absolute positioning

3.In `container`, create a view box element `viewBoxContainer`, absolute
positioning, set border style, transition property (optional)

4.Listen for `data_change` and `view_data_change` events, and in this event call
the `calculationMiniMap` method to get calculation data, then render `svgHTML`
to the `miniMapContainer` element and set its style:

```js
:style="{
    transform: `scale(${svgBoxScale})`,
    left: svgBoxLeft + 'px',
    top: svgBoxTop + 'px',
}"
```

5.Set the `viewBoxStyle` object as the style of the `viewBoxContainer` element

At this point, when the mind map on the canvas changes, the small map will also
be updated in real time, and the view box element will reflect the position of
the viewport on the mind map graph in real time

6.Listen for the `mousedown`, `mousemove`, and `mouseup` events of the
`container` element, and call the three methods that will be introduced below to
achieve the effect of the mind map on the canvas being dragged with the mouse

#### onMousedown(e)

Small map mouse down event executes this function

`e`: event object

#### onMousemove(e, sensitivityNum = 5)

This function is executed on the small map mouse move event.

`e`: event object

`sensitivityNum`: drag sensitivity, the higher the sensitivity, the greater the
actual canvas dragging distance on the small map when dragging the same distance
on the small map

#### onMouseup()

This function is executed on the small map mouse release event.

## doExport instance

The `doExport` instance is responsible for exporting and can be obtained through
`mindMap.doExport`.

### Methods

#### png()

Exports as `png`, an async method that returns image data, `data:url` data which
can be downloaded or displayed.

#### svg()

Exports as `svg`, an async method that returns `svg` data, `data:url` data which
can be downloaded or displayed.

#### getSvgData()

Gets `svg` data, an async method that returns an object:

```js
{
  node; // svg object
  str; // svg string
}
```

## select instance

The `select` instance is responsible for the mouse right-click multi-selection
of nodes, and can be obtained through `mindMap.select`

### Method

#### toPos(x, y)

Convert mouse position to position relative to the container `el`

## batchExecution instance

The `batchExecution` is used to batch asynchronously perform some operations,
and if a certain operation is called multiple times at the same time, it will
only be executed once in the next event loop. Can be obtained through
`mindMap.batchExecution`

### Method

#### push(name, fn)

Add task.

`name`: task name

`fn`: task

## node instance

Each node will instantiate a `node` instance

### Property

#### nodeData

The real data corresponding to this node

#### uid

The unique identifier of this node

#### isRoot

Whether it is the root node

#### layerIndex

Node level

#### width

Width of the node

#### height

Height of the node

#### left

`left` position of the node

#### top

`top` position of the node

#### parent

Parent node of the node

#### children

List of child nodes of the node

#### group

Node is the content container, `svg` object

#### isDrag

v0.1.5+

Whether the node is currently being dragged

### Methods

#### addChildren(node)

Add a child node

#### getSize()

Calculate the width and height of the node, return a boolean indicating whether
the width and height have changed

#### renderNode()

Render the node to the canvas, will remove the old content node and create a new
one

#### render()

Recursively render this node and all its child nodes. The first call will create
the node content, subsequent calls will only update the node position. To
re-render the content, set the `initRender` attribute to `true` first.

#### remove()

Recursively delete this node and all its child nodes

#### renderLine()

Re-render the line from this node to its child nodes

#### removeLine()

Remove the line from this node to its child nodes

#### renderExpandBtn()

Render the content of the expand/collapse button

#### removeExpandBtn()

Remove the expand/collapse button

#### getStyle(prop, root, isActive)

Get the final style value applied to this node

`prop`: the style property to get

`root`: whether it is the root node, default `false`

`isActive`: whether the value being fetched is the active state style value,
default `false`

#### setStyle(prop, value, isActive)

Modify a style of the node, a shortcut method for the `SET_NODE_STYLE` command

#### getData(key)

Get the specified value in the `data` object of the node's real data `nodeData`,
if `key` is not passed, return the `data` object

#### setData(data)

Set the value of the specified key in the data object of the node's real data
nodeData, `SET_NODE_DATA` command's shortcut method

#### setText(text)

Setting the node text, a shortcut for the `SET_NODE_TEXT` command

#### setImage(imgData)

Setting the node image, a shortcut for the `SET_NODE_IMAGE` command

#### setIcon(icons)

Setting the node icon, a shortcut for the `SET_NODE_ICON` command

#### setHyperlink(link, title)

Setting the node hyperlink, a shortcut for the `SET_NODE_HYPERLINK` command

#### setNote(note)

Setting the node note, a shortcut for the `SET_NODE_NOTE` command

#### setTag(tag)

Setting the node tag, a shortcut for the `SET_NODE_TAG` command"

#### hide()

v0.1.5+

Hide node and its sub-nodes

#### show()

v0.1.5+

Show node and its sub-nodes

#### isParent(node)

v0.1.5+

Check if the current node is an ancestor of a certain node

#### isBrother(node)

v0.1.5+

Check if the current node is a sibling of a certain node

#### checkHasGeneralization()

v0.2.0+

Check if there is a summary

#### hideGeneralization()

v0.2.0+

Hide summary node

#### showGeneralization()

v0.2.0+

Show summary node

#### updateGeneralization()

v0.2.0+

Update summary node

#### hasCustomPosition()

v0.2.0+

Check if the node has custom data

#### ancestorHasCustomPosition()

v0.2.0+

Check if there is an ancestor node with custom position

#### getShape()

v0.2.4+

Get node shape

#### setShape(shape)

v0.2.4+

Set node shape, a shortcut method for the `SET_NODE_SHAPE` command

#### getSelfStyle(prop)

v0.2.5+

Get the node's own custom style

#### getParentSelfStyle(prop)

v0.2.5+

Get the custom style of the nearest ancestor node with its own custom style

#### getSelfInhertStyle(prop)

v0.2.5+

Get the node's own inheritable custom style

## Built-in Utility Methods

Reference:

```js
import {walk, ...} from 'simple-mind-map/src/utils'
```

### Methods

#### walk(root, parent, beforeCallback, afterCallback, isRoot, layerIndex = 0, index = 0)

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

#### bfsWalk(root, callback)

Breadth-first traversal of a tree

#### resizeImgSize(width, height, maxWidth, maxHeight)

Resize image size

`width`: original width of the image

`height`: original height of the image

`maxWidth`: the width to resize to

`maxHeight`: the height to resize to

`maxWidth` and `maxHeight` can both be passed, or only one of them can be passed

#### resizeImg(imgUrl, maxWidth, maxHeight)

Resize image, internally loads the image first, then calls the `resizeImgSize`
method, and returns a `promise`

#### simpleDeepClone(data)

Extremely simple deep copy method, can only be used for objects that are all
basic data, otherwise it will throw an error

#### copyRenderTree(tree, root)

Copy render tree data, example:

```js
copyRenderTree({}, this.mindMap.renderer.renderTree);
```

#### copyNodeTree(tree, root)

Copy node tree data, mainly eliminating the reference `node` instance `_node`
and copying the `data` of the data object, example:

```js
copyNodeTree({}, node);
```

#### imgToDataUrl(src)

Convert image to dataURL

#### downloadFile(file, fileName)

Download file

#### throttle(fn, time = 300, ctx)

Throttle function

#### asyncRun(taskList, callback = () => {})

Run tasks in task list asynchronously, tasks are run synchronously without order

# Special Note

This project is rough and has not been thoroughly tested, its features are not
yet fully developed, and there are some performance issues. It is only for
learning and reference purposes and should not be used in actual projects.

The built-in themes and icons in the project come from:

[Baidu Mind Map](https://naotu.baidu.com/)

[Zhixi Mind Map](https://www.zhixi.com/)

# License

[MIT](https://opensource.org/licenses/MIT)

# Changelog

## 0.2.22

optimization：The theme and structure pictures of the built-in `simple-mind-map` package are removed and replaced by user self-maintenance. The original pictures can be found in the `web/sets/img/` directory.

## 0.2.21

New: Support node horizontal line style.

## 0.2.20

fix：When the distance from the canvas to the upper left corner of the window is not 0, the node dragging will have an offset problem.

## 0.2.19

fix：When the node is not activated, pressing any key will trigger the problem of automatic focus.

## 0.2.18

optimization：Keyboard navigation algorithm for finding focus, supporting simple algorithm, region algorithm and shadow algorithm.

## 0.2.17

New：Keyboard navigation, that is, switch the active nodes through the direction keys; The node text content can be edited directly in the outline.

## 0.2.16

optimization：Mini map; drag performance.

## 0.2.15

optimization：Local file editing.

New：Double-click the image in the node to preview the large image.

## 0.2.14

optimization：Automatically expand when inserting child nodes.

fix：The error occurred when the mini map was closed.

## 0.2.13

fix：The child node is missing when collapsing state replication.

## 0.2.11

fix：Fix the problem that is lost when the child node collapses state replication.

New：Support mini map.

## 0.2.10

optimization：Focus immediately when you manually create a node.

fix：Connection style depth update problem.

New：Logical structure diagram and mind map add linear connection style and direct connection style.

## 0.2.9

New：Support the creation, opening and saving of local files on the computer.

## 0.2.8

fix：Xmind8 version file import failed.

New：Expanding to the specified level is supported.

## 0.2.7

fix：The root node adds multiple nodes to burst the stack.

New：Support import .xmind file.

## 0.2.6

New：The title tag is added when exporting svg.

## 0.2.5

fix：Bugs caused by node expansion and collapse.

New：Node supports custom line styles.

## 0.2.4

New：Nodes support multiple shapes.

## 0.2.3

fix：Shortcut key conflicts when editing node text; Right-click menu shortcut prompt error; Right-click menu shortcut prompt.

## 0.2.2

fix：The input string '/' conflicts with the shortcut key '/'.

## 0.2.1

New：Support export as pdf.

## 0.2.0

New：Classic4 theme；Support adding summary; Support free drag; Move Node Up, Move Node Down, Copy Node, Cut Node, Paste Node, One-click Organize Cloth Shortcut; Library packaging; Ctrl+left click to select multiple.

## 0.1.18

fix：The problem that the node icon cannot be deleted; The tool button is grayed out and can still be clicked.

## 0.1.17

New：Add read-only mode.

## 0.1.16

New：Node notes support markdown and rich text.

fix：Can't select text; Node annotations cannot hide problems after node activation; When editing text such as hyperlinks, notes, labels, etc., the return key and return key conflict with the shortcut key of mind map.

## 0.1.15

New：The status data supports saving the active status and view status (drag position, zoom value)；Support node drag.

## 0.1.14

fix：There are problems with setting topics when activating nodes.

## 0.1.13

New：Shortcut key function; Support export as json。

optimization：Some details.

## 0.1.12

New：Local storage；Right-click menu function, etc.

## 0.1.0

Complete basic functions.