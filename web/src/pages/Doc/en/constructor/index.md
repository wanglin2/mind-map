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

## Instantiation options

| Field Name                       | Type    | Default Value    | Description                                                  | Required |
| -------------------------------- | ------- | ---------------- | ------------------------------------------------------------ | -------- |
| el                               | Element |                  | Container element, must be a DOM element                     | Yes      |
| data                             | Object  | {}               | Mind map data, Please refer to the introduction of 【Data structure】 below |          |
| layout                           | String  | logicalStructure | Layout type, options: logicalStructure (logical structure diagram), mindMap (mind map), catalogOrganization (catalog organization diagram), organizationStructure (organization structure diagram)、timeline（v0.5.4+, timeline）、timeline2（v0.5.4+, up down alternating timeline）、fishbone（v0.5.4+, fishbone diagram） |          |
| fishboneDeg（v0.5.4+）                      | Number |  45          |    Set the diagonal angle of the fishbone structure diagram        |        |
| theme                            | String  | default          | Theme, options: default, classic, minions, pinkGrape, mint, gold, vitalityOrange, greenLeaf, dark2, skyGreen, classic2, classic3, classic4(v0.2.0+), classicGreen, classicBlue, blueSky, brainImpairedPink, dark, earthYellow, freshGreen, freshRed, romanticPurple, simpleBlack(v0.5.4+), courseGreen(v0.5.4+), coffee(v0.5.4+), redSpirit(v0.5.4+), blackHumour(v0.5.4+), lateNightOffice(v0.5.4+), blackGold(v0.5.4+)、、avocado(v.5.10-fix.2+)、autumn(v.5.10-fix.2+)、orangeJuice(v.5.10-fix.2+) |          |
| themeConfig                      | Object  | {}               | Theme configuration, will be merged with the selected theme, available fields refer to: [default.js](https://github.com/wanglin2/mind-map/blob/main/simple-mind-map/src/themes/default.js) |          |
| scaleRatio                       | Number  | 0.1              | The incremental scaling ratio                                |          |
| maxTag                           | Number  | 5                | The maximum number of tags displayed in the node, any additional tags will be discarded |          |
| exportPadding                    | Number  | 20               | The padding for exporting images                             |          |
| imgTextMargin                    | Number  | 5                | The spacing between the image and text in the node           |          |
| textContentMargin                | Number  | 2                | The spacing between various text information in the node, such as the spacing between the icon and text |          |
| selectTranslateStep              | Number  | 3                | The canvas offset when mouse moves to the edge during multi-select node |          |
| selectTranslateLimit             | Number  | 20               | The distance from the edge when the canvas begins to offset during multi-select node |          |
| customNoteContentShow（v0.1.6+） | Object  | null             | Custom node note content display, object type, structure: {show: (noteContent, left, top, node) => {// your display node note logic. node is a new parameter added in v0.8.1+ version, representing node instances }, hide: () => {// your hide node note logic }} |          |
| readonly（v0.1.7+）              | Boolean | false            | Whether it is read-only mode                                 |          |
| enableFreeDrag（v0.2.4+）        | Boolean | false            | Enable node free(Free drag means that nodes can be dragged to any position on the canvas. Please note that it is not a function of dragging nodes to become siblings of other nodes. The connection of free drag may have certain problems, so it is best not to use this feature) drag                                        |          |
| watermarkConfig（v0.2.4+）       | Object  |                  | Watermark config, Please refer to the table 【Watermark config】 below for detailed configuration |          |
| textAutoWrapWidth（v0.3.4+）     | Number  | 500 |   Each line of text in the node will wrap automatically when it reaches the width               |          |
| customHandleMousewheel（v0.4.3+）     | Function  | null | User-defined mouse wheel event processing can pass a function, and the callback parameter is the event object |          |
| mousewheelAction（v0.4.3+）     | String  | zoom（v0.9.1+ default is move） | The behavior of the mouse wheel, `zoom`(Zoom in and out)、`move`(Move up and down). If `customHandleMousewheel` passes a custom function, this property will not take effect                 |          |
| mousewheelMoveStep（v0.4.3+）     | Number  | 100 | When the `mousewheelAction` is set to `move`, you can use this attribute to control the step length of the view movement when the mouse scrolls. The unit is `px`  |          |
| mousewheelZoomActionReverse（v0.6.5+）     | Boolean  | false（v0.9.1+ default is true） | When `mousewheelAction` is set to `zoom`, Or when holding down the Ctrl key, the default scrolling forward is to zoom out, and scrolling backward is to zoom in. If this property is set to true, it will be reversed   |          |
| defaultInsertSecondLevelNodeText（v0.4.7+）     | String  | 二级节点 | Text of the default inserted secondary node               |          |
| defaultInsertBelowSecondLevelNodeText（v0.4.7+）     | String  | 分支主题 | Text for nodes below the second level inserted by default               |          |
| expandBtnStyle（v0.5.0+）     | Object  | { color: '#808080', fill: '#fff', fontSize: 13, strokeColor: '#333333' } | Expand the color of the stow button, (The fontSize and strokeColor fields were added in version 0.7.0+to set the text style for displaying the number of nodes when folded) |          |
| expandBtnIcon（v0.5.0+）     | Object  | { open: '', close: '' } | Customize the icon of the expand/collapse button, and you can transfer the svg string of the icon  |          |
| expandBtnNumHandler（v0.7.0+）     | Function  |  | Used to customize the content of displaying the number of nodes when folding, receiving a parameter that represents the instance of the folding node, and returning a number or string that represents the final displayed content. For example, when the number is greater than 99, 99 can be displayed+  |          |
| isShowExpandNum（v0.7.0+）     | Boolean  | true | Display the number of folded nodes when they are folded up  |          |
| enableShortcutOnlyWhenMouseInSvg（v0.5.1+）     | Boolean  | true | Only respond to shortcut key events when the mouse is inside the canvas  |          |
| enableNodeTransitionMove（v0.5.1+）（v0.6.7+ is remove this feature）     | Boolean  | true | Whether to enable node animation transition  |          |
| nodeTransitionMoveDuration（v0.5.1+）（v0.6.7+ is remove this feature）     | Number  | 300 | If node animation transition is enabled, the transition time can be set using this attribute, in milliseconds  |          |
| initRootNodePosition（v0.5.3+）     | Array  | null | The position of the initial root node can be passed as an array, default is `['center', 'center']`, Represents the root node at the center of the canvas, In addition to `center`, keywords can also be set to `left`, `top`, `right`, and `bottom`, In addition to passing keywords, each item in the array can also pass a number representing a specific pixel, Can pass a percentage string, such as `['40%', '60%']`, Represents a horizontal position at `40%` of the canvas width, and a vertical position at `60%` of the canvas height   |          |
| exportPaddingX（v0.5.5+）     |  Number | 10 | Horizontal padding of graphics when exporting PNG, SVG, and PDF  |          |
| exportPaddingY（v0.5.5+）     | Number  | 10 | Vertical padding of graphics when exporting PNG, SVG, and PDF  |          |
| nodeTextEditZIndex（v0.5.5+）     | Number  | 3000 |   | z-index of node text edit box elements         |
| nodeNoteTooltipZIndex（v0.5.5+）     | Number  | 3000 | z-index of floating layer elements in node comments  |          |
| isEndNodeTextEditOnClickOuter（v0.5.5+）     | Boolean  | true | Whether to end the editing status of node text when clicking on an area outside the canvas  |          |
| maxHistoryCount（v0.5.6+）     | Number  | 1000 |   | Maximum number of history records         |
| alwaysShowExpandBtn（v0.5.8+）     | Boolean  | false | Whether to always display the expand and collapse buttons of nodes, which are only displayed when the mouse is moved up and activated by default  |          |
| iconList（v0.5.8+）     | Array  | [] | The icons that can be inserted into the extension node, and each item in the array is an object. Please refer to the "Icon Configuration" table below for the detailed structure of the object  |          |
| maxNodeCacheCount（v0.5.10+）     |  Number | 1000 | The maximum number of cached nodes. To optimize performance, an internal node cache pool is maintained to reuse nodes. This attribute allows you to specify the maximum number of caches in the pool  |          |
| defaultAssociativeLineText（v0.5.11+）     |  String | 关联 | Association Line Default Text  |          |
| fitPadding（v0.6.0+）     |  Number | 50 |  The padding of mind mapping when adapting to canvas size, Unit: px |          |
| enableCtrlKeyNodeSelection（v0.6.0+）     | Boolean  | true |  Whether to enable the function of holding down the Ctrl key to select multiple nodes |          |
| useLeftKeySelectionRightKeyDrag（v0.6.0+）     | Boolean  | false | Setting to left click to select multiple nodes and right click to drag the canvas.  |          |
| beforeTextEdit（v0.6.0+）     |  Function/null | null | The callback method before the node is about to enter editing. If the method returns a value other than true, the editing will be canceled. The function can return a value or a promise, and the callback parameter is the node instance  |          |
| isUseCustomNodeContent（v0.6.3+）     |  Boolean | false |  Whether to customize node content |          |
| customCreateNodeContent（v0.6.3+）     |  Function/null | null | If `isUseCustomNodeContent` is set to `true`, then this option needs to be used to pass in a method that receives the node instance `node` as a parameter (if you want to obtain data for that node, you can use `node.nodeData.data`). You need to return the custom node content element, which is the DOM node. If a node does not require customization, you can return `null` |          |
| mouseScaleCenterUseMousePosition（v0.6.4-fix.1+）     | Boolean  | true | Is the mouse zoom centered around the current position of the mouse, otherwise centered around the canvas |          |
| customInnerElsAppendTo（v0.6.12+）     | null/HTMLElement  | null | Specify the location where some internal elements (node text editing element, node note display element, associated line text editing element, node image adjustment button element) are added, and default to document.body |          |
| nodeDragPlaceholderMaxSize（v0.6.12+）     | Number  | 20 | When dragging an element, the maximum height of the block indicating the new position of the element |          |
| enableCreateHiddenInput（v0.6.13+）（v0.6.14+ remove this feature）     | Boolean  | true | Is it allowed to create a hidden input box that will be focused when the node is activated for pasting data and automatically entering the text editing state |          |
| enableAutoEnterTextEditWhenKeydown（v0.6.13+）     | Boolean  | true | Does it automatically enter text editing mode when pressing the Chinese, English, or numeric buttons when there is an activation node?|          |
| richTextEditFakeInPlace（v0.6.13+）     | Boolean  | false | Set the rich text node edit box to match the size of the node, creating a pseudo in place editing effect. It should be noted that only when there is only text within the node and the shape is rectangular, can the effect be better |          |
| customHandleClipboardText（v0.6.14+）     | Function  | null | Customize the processing of clipboard text. When pressing ctrl+v to paste, it will read the text and images from the user's clipboard. By default, it will only determine whether the text is regular text and node data in simple mind map format. If you want to process data from other mind maps, such as process, zhixi, etc., you can pass a function that takes the text from the current clipboard as a parameter and returns the processed data, which can be of two types: 1.If a pure text is returned, a child node will be directly created with that text; 2.Returns a node object in the following format: { simpleMindMap: true, data: { data: { text: '' }, children: [] } }, The representative is data in simple bind map format, and the node data is in the same format as the simple bind map node data. If your processing logic has asynchronous logic, you can also return a promise |          |
| errorHandler（v0.6.15+）     | Function  |  | Custom error handling functions currently only throw some asynchronous logic errors. Can pass a function that takes two parameters, the first being the wrong type and the second being the wrong object |          |
| disableMouseWheelZoom（v0.6.15+）     | Boolean  | false | Prohibit mouse wheel scaling, you can still use the API for scaling |          |
| resetCss（v0.6.16+）     | String  |  * { margin: 0; padding: 0; box-sizing: border-box; } | When exporting images and SVGs, the default style overlay for rich text node content, which is embedded in HTML nodes in SVGs, will occur. If not overlaid, the node content will be offset |          |
| enableDblclickReset（v0.6.17+）(v0.8.0+this attribute has been deleted)     | Boolean  | true(v0.7.0+changed to false)  | Turn on the mouse and double-click to reset the position and zoom of the mind map |          |
| enableDblclickBackToRootNode（v0.8.0+）     | Boolean  | false  | Whether to return to the root node when double clicking with the mouse, that is, to center the display of the root node |          |
| minExportImgCanvasScale（v0.7.0+）     | Number  | 2  | The scaling factor of canvas when exporting images and PDFs, which is set to the maximum value of window.devicePixelRatio to improve image clarity |          |
| hoverRectColor（v0.7.0+）     | String  | rgb(94, 200, 248)  | The node mouse hover and the rectangular border color displayed when activated will add a transparency of 0.6 when hovering |          |
| hoverRectPadding（v0.7.0+）     | Number  | 2  | The distance between the node mouse hover and the displayed rectangular border when activated and the node content |          |
| selectTextOnEnterEditText（v0.7.0+）     | Boolean  | true  | Is the text selected by default when double-clicking a node to enter node text editing? By default, it will only be selected when creating a new node |          |
| deleteNodeActive（v0.7.1+）     | Boolean  | true  | Enable the function of automatically activating adjacent nodes or parent nodes after deleting nodes |          |
| autoMoveWhenMouseInEdgeOnDrag（v0.7.1+）     | Boolean  | true  | Whether to enable automatic canvas movement when the mouse moves to the edge of the canvas while dragging nodes |          |
| fit（v0.7.1-fix.2+）     | Boolean  | false  | Is the first rendering scaled to fit the canvas size |          |
| dragMultiNodeRectConfig（v0.7.2+）     | Object  | { width: 40, height: 20, fill: '' }  | The style configuration of the schematic rectangle that moves with the mouse when dragging multiple nodes, passing an object, and the field meanings are the width, height, and fill color of the rectangle |          |
| dragPlaceholderRectFill（v0.7.2+）     |  String |   | The filling color of the schematic rectangle for the new position when dragging nodes. If not transmitted, the default color for the connected line is used |          |
| dragOpacityConfig（v0.7.2+）     | Object  | { cloneNodeOpacity: 0.5, beingDragNodeOpacity: 0.3 }  | The transparency configuration during node dragging, passing an object, and the field meanings are: the transparency of the cloned node or rectangle that follows the mouse movement, and the transparency of the dragged node |          |
| tagsColorMap（v0.7.2+）     | Object  | {}  | The color of a custom node label can be transferred to an object, where key is the label content to be assigned a color, and value is the color of the label content. If not transferred internally, a corresponding color will be generated based on the label content |         |
| cooperateStyle（v0.7.3+）     | Object  | { avatarSize: 22, fontSize: 12 }  | The configuration of personnel avatar style during node collaboration editing, with field meanings as follows: avatar size, and if it is a text avatar, the size of the text |         |
| associativeLineIsAlwaysAboveNode（v0.8.0+）     |  Boolean | true  | Is the associated line always displayed above the node? If set to false, it will be at the top level when creating and activating the associated line, and in other cases, it will be below the node |         |
| defaultGeneralizationText（v0.8.0+）     |  String | 概要  | Insert default text for summary |         |
| handleIsSplitByWrapOnPasteCreateNewNode（v0.8.0+）     | Function / null  | null  | When creating a new node by pasting text, control whether to automatically split the nodes based on line breaks. If there is a line break, multiple nodes will be created based on the line break. Otherwise, only one node will be created, and a function can be passed to return promise. resolve represents splitting based on line breaks, and reject represents ignoring line breaks |         |
| addHistoryTime（v0.8.0+）     | Number | 100  | Only one historical record can be added within the specified time to avoid adding unnecessary intermediate states. Unit: ms  |         |
| isDisableDrag（v0.8.1+）     | Boolean | false  | Is disable dragging the canvas  |         |
| disableTouchZoom（v0.8.1+）     | Boolean | false  |  Prohibit double finger scaling, you can still use the API for scaling, which takes effect on the TouchEvent plugin |         |
| highlightNodeBoxStyle（v0.9.0+）     | Object | { stroke: 'rgb(94, 200, 248)', fill: 'transparent' }  |  Highlight box style when the mouse moves into the summary to highlight the node it belongs to |         |
| createNewNodeBehavior（v0.9.1+）     | String | default  | Behavior when creating a new node. default（By default, newly created nodes will be activated and enter editing mode. If multiple new nodes are created simultaneously, they will only be activated and will not enter editing mode）、notActive（Do not activate newly created nodes）、activeOnly（Only activate newly created nodes and do not enter editing mode）  |         |

### Data structure

The basic data structure is as follows:

```js
{
  data: {
    text: '', // The text of the node can be rich text, which is in HTML format. In this case, richText should be set to true
    richText: false, // Is the text of the node in rich text mode
    expand: true, // Whether the node is expanded
    uid: '',// The unique ID of the node, which may not be passed, will be generated internally
    icon: [], // The format of the icon can be found in the "插入和扩展节点图标" section of the tutorial
    image: '', // URL of the image
    imageTitle: '', // The title of the image can be blank
    imageSize: { // The size of the image
      width: 100, // The width of the image, mandatory
      height: 100, // The height of the image is mandatory
      custom: false // If set to true, the display size of the image is not controlled by the theme, and is based on imageSize.width and imageSize.height
    },
    hyperlink: '', // Hyperlink address
    hyperlinkTitle: '', // Title of hyperlink
    note: '', // Content of remarks
    tag: [], // Tag list
    generalization: {// The summary of the node, if there is no summary, the generalization can be set to null
      text: ''// Summary Text
    },
    associativeLineTargets: [''],// If there are associated lines, then it is the uid list of the target node
    associativeLineText: '',// Association Line Text
    // ...For other style fields, please refer to the topic
  },
  children [// Child nodes, with consistent structure and root nodes
    {
      data: {},
      children: []
    }
  ]
}
```

If you want to add custom fields, you can add them to the same level as 'data' and 'children'. If you want to add them to the 'data' object, please use the `_` Name your custom field at the beginning, and it will be used internally to determine whether it is a custom field.

### Watermark config

| Field Name  | Type   | Default Value                               | Description                                                  |
| ----------- | ------ | ------------------------------------------- | ------------------------------------------------------------ |
| text        | String | ''                                          | Watermark text. If it is an empty string, the watermark will not be displayed |
| lineSpacing | Number | 100                                         | Spacing between watermark lines                              |
| textSpacing | Number | 100                                         | Spacing between watermarks in the same row                   |
| angle       | Number | 30                                          | Tilt angle of watermark, range: [0, 90]                      |
| textStyle   | Object | {color: '#999', opacity: 0.5, fontSize: 14} | Watermark text style                                         |

### Icon Configuration

| Field Name  | Type   | Default Value                               | Description                                                  |
| ----------- | ------ | ------------------------------------------- | ------------------------------------------------------------ |
| name        | String |                                           | The name of the icon group |
| type        | String |                                           | Values for icon grouping |
| list        | Array  |                                           | A list of icons under grouping, with each item in the array being an object, `{ name: '', icon: '' }`，`name`represents the name of the icon, `icon`represents the icon, Can be an `svg` icon, such as `<svg ...><path></path></svg>`, also can be a image `url`, or `base64` icon, such as `data:image/png;base64,...` |

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

### usePlugin(plugin, opt = {})

> v0.3.0+

- `opt`：v0.4.0+，Plugin options. If a plugin supports custom options, it can be passed in through this parameter.

If you need to use some non-core functions, such as mini map, watermark, etc, you can register plugin through this method. Can be called in chain.

Note: The plugin needs to be registered before instantiating `MindMap`.

### hasPlugin(plugin)

> v0.4.0+

Get whether a plugin is registered, The index of the plugin in the registered plugin list is returned, If it is `-1`, it means that the plugin is not registered.


## Static props

### pluginList

> v0.3.0+

List of all currently registered plugins.

## Instance props

### el

Container element.

### opt

Config options object.

### svg

> @svgdotjs/svg.js library calls the node instance returned by the SVG() method

Canvas SVG element.

### draw

> @svgdotjs/svg.js library calls the node instance returned by the group() method
>
> Child node of SVG node

Container element, used to carry content such as nodes and connections.

### lineDraw

> v0.8.0+
>
> @svgdotjs/svg.js library calls the node instance returned by the group() method
>
> Child node of draw node

Container for node wiring elements.

### nodeDraw

> v0.8.0+
>
> @svgdotjs/svg.js library calls the node instance returned by the group() method
>
> Child node of draw node

Container for node elements.

### associativeLineDraw

> v0.8.0+
>
> @svgdotjs/svg.js library calls the node instance returned by the group() method
>
> Available when the associated line plugin is registered
>
> Child node of draw node

Container for associative line content.

### otherDraw

> v0.8.0+
>
> @svgdotjs/svg.js library calls the node instance returned by the group() method
>
> Child node of draw node

Container for other content.

### elRect

The size and position information of the container element 'el'. The return result of calling the 'getBoundingClientRect()' method.

### width

The width of the container element 'el'.

### height

The height of the container element 'el'.

### themeConfig

Current Theme Configuration.

## Instance methods

### clearDraw()

> v0.8.0+

Clear `lineDraw`、`associativeLineDraw`、`nodeDraw`、`otherDraw` containers.

### destroy()

> v0.6.0+

Destroy mind maps. It will remove registered plugins, remove listening events, and delete all nodes on the canvas.

### getSvgData({ paddingX = 0, paddingY = 0, ignoreWatermark = false })

> v0.3.0+

`paddingX`: Padding x

`paddingY`: Padding y

`ignoreWatermark`：v0.8.0+, Do not draw watermarks. If you do not need to draw watermarks, you can pass 'true' because drawing watermarks is very slow

Get the `svg` data and return an object. The detailed structure is as follows:

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

### render(callback)

- `callback`: `v0.3.2+`, `Function`, Called when the re-rendering is complete

Triggers a full rendering, which will reuse nodes for better performance. If
only the node positions have changed, this method can be called to `reRender`.

### reRender(callback)

- `callback`: `v0.3.2+`, `Function`, Called when the re-rendering is complete

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
| mousewheel                       | Mouse scroll event                                                       | e (event object), dir (up or down scroll), this (Event event class instance) 、isTouchPad（v0.6.1+, Is it an event triggered by the touchpad）                                   |
| contextmenu                      | svg canvas right mouse button menu event                                 | e (event object)                                                                                                |
| node_click                       | Node click event                                                         | this (node instance), e (event object)                                                                          |
| node_mousedown                   | Node mouse down event                                                    | this (node instance), e (event object)                                                                          |
| node_mouseup                     | node mouseup event                                                       | this (node instance), e (event object)                                                                          |
| node_mouseup                     | Node mouseup event                                                       | this (node instance), e (event object)                                                                          |
| node_dblclick                    | Node double-click event                                                  | this (node instance), e (event object)                                                                          |
| node_contextmenu                 | Node right-click menu event                                              | e (event object), this (node instance)                                                                          |
| node_mouseenter（v0.4.1+）       | Node mouseenter event     | this (node instance), e (event object)            |
| node_mouseleave（v0.4.1+）       | Node mouseleave event     | this (node instance), e (event object)            |
| before_node_active               | Event before node activation                                             | this (node instance), activeNodeList (current list of active nodes)                                             |
| node_active                      | Node activation event                                                    | this (node instance), activeNodeList (current list of active nodes)                                             |
| expand_btn_click                 | Node expand or collapse event                                            | this (node instance)                                                                                            |
| before_show_text_edit            | Event before node text edit box opens                                    |                                                                                                                 |
| hide_text_edit                   | Node text edit box close event                                           | textEditNode (text edit box DOM node), activeNodeList (current list of active nodes)                            |
| scale                            | Zoom event                                                               | scale (zoom ratio)                                                                                              |
| node_img_dblclick（v0.2.15+）    | Node image double-click event                                            | this (node instance), e (event object)                                                                          |
| node_img_mouseenter（v0.6.5+）    |  Node image mouseenter event                    | this（node instance）、imgNode（img node）、e（event object）                              |
| node_img_mouseleave（v0.6.5+）    |  Node image mouseleave event                    | this（node instance）、imgNode（img node）、e（event object）                              |
| node_img_mousemove（v0.6.5+）    |  Node image mousemove event                      | this（node instance）、imgNode（img node）、e（event object）                              |
| node_tree_render_end（v0.2.16+） | Node tree render end event                                               |                                                                                                                 |
| rich_text_selection_change（v0.4.0+）         |  Available when the `RichText` plugin is registered. Triggered when the text selection area changes when the node is edited         |  hasRange（Whether there is a selection）、rectInfo（Size and location information of the selected area）、formatInfo（Text formatting information of the selected area）            |
| transforming-dom-to-images（v0.4.0+）         |  Available when the `RichText` plugin is registered. When there is a `DOM` node in `svg`, the `DOM` node will be converted to an image when exporting to an image. This event will be triggered during the conversion process. You can use this event to prompt the user about the node to which you are currently converting         |  index（Index of the node currently converted to）、len（Total number of nodes to be converted）            |
| node_dragging（v0.4.5+）    | Triggered when a node is dragged   |  node(The currently dragged node)           |
| node_dragend（v0.4.5+）    | Triggered when the node is dragged and ends   | { overlapNodeUid, prevNodeUid, nextNodeUid }（v0.6.12+，The node uid to which the node is moved this time, for example, if it is moved to node A, then the overlayNodeUid is the uid of node A. If it is moved to the front of node B, then the nextNodeUid is the uid of node B. You can obtain the node instance through the mindMap. extender.findNodeByUid(uid) method）            |
| associative_line_click（v0.4.5+）    |  Triggered when an associated line is clicked  |  path(Connector node)、clickPath(Invisible click line node)、node(Start node)、toNode(Target node)          |
| svg_mouseenter（v0.5.1+）    | Triggered when the mouse moves into the SVG canvas   | e（event object）  |
| svg_mouseleave（v0.5.1+）    | Triggered when the mouse moves out of the SVG canvas   | e（event object）  |
| node_icon_click（v0.6.10+）    | Triggered when clicking on an icon within a node   | this（node instance）、item（Click on the icon name）、e（event object）  |
| view_theme_change（v0.6.12+）    | Triggered after calling the setTheme method to set the theme   | theme（theme name）  |
| set_data（v0.7.3+）    |  Triggered when the setData method is called to dynamically set mind map data  | data（New Mind Map Data）  |
| resize（v0.8.0+）    | Triggered after the container size changes, actually when the 'resize' method of the mind map instance is called   |   |
| beforeDestroy（v0.9.0+）    |  Triggered before destroying the mind map, i.e. triggered by calling the destroy method  |   |

### emit(event, ...args)

Trigger an event, which can be one of the events listed above or a custom event.

### off(event, fn)

Unbind an event.

### setTheme(theme, notRender = false)

- `notRender`: v0.8.0+, Is not call the render method to update the canvas.

Switches the theme. Available themes can be found in the options table above.

### getTheme()

Gets the current theme.

### setThemeConfig(config, notRender = false)

- `notRender`: v0.8.0+, Is not call the render method to update the canvas.

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

### setLayout(layout, notRender = false)

- `notRender`: v0.8.0+, Is not call the render method to update the canvas.

Sets the layout structure. Available values can be found in the `layout` field
in the options table above.

### execCommand(name, ...args)

Executes a command, which will add a record to the history stack for undo or
redo. All commands are as follows:

| Command name                       | Description                                                  | Parameters                                                   |
| ---------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| SELECT_ALL                         | Select all                                                   |                                                              |
| BACK                               | Go back a specified number of steps                          | step (the number of steps to go back, default is 1)          |
| FORWARD                            | Go forward a specified number of steps                       | step (the number of steps to go forward, default is 1)       |
| INSERT_NODE                        | Insert a sibling node, the active node or appoint node will be the operation node. If there are multiple active nodes, only the first one will be effective（v0.7.2+Supports simultaneous insertion of sibling nodes into multiple active nodes） | openEdit（v0.4.6+, Whether to activate the newly inserted node and enter editing mode, default is `true`） 、 appointNodes（v0.4.7+, Optional, appoint node, Specifying multiple nodes can pass an array）、 appointData（Optional, Specify the data for the newly created node, Such as {text: 'xxx', ...}, Detailed structure can be referred to [exampleData.js](https://github.com/wanglin2/mind-map/blob/main/simple-mind-map/example/exampleData.js) ）、 appointChildren（v0.6.14+, Optional, Specify the child nodes of the newly created node, array type）                                                           |
| INSERT_CHILD_NODE                  | Insert a child node, the active node or appoint node will be the operation node |  openEdit（v0.4.6+, Whether to activate the newly inserted node and enter editing mode, default is `true`）、 appointNodes（v0.4.7+, Optional, appoint node, Specifying multiple nodes can pass an array）、 appointData（Optional, Specify the data for the newly created node, Such as {text: 'xxx', ...}, Detailed structure can be referred to [exampleData.js](https://github.com/wanglin2/mind-map/blob/main/simple-mind-map/example/exampleData.js) ）、 appointChildren（v0.6.14+, Optional, Specify the child nodes of the newly created node, array type）                                                            |
| UP_NODE                            | Move node up, the active node will be the operation node. If there are multiple active nodes, only the first one will be effective. Using this command on the root node or the first node in the list will be invalid |                                                              |
| DOWN_NODE                          | Move node down, the active node will be the operation node. If there are multiple active nodes, only the first one will be effective. Using this command on the root node or the last node in the list will be invalid |                                                              |
| REMOVE_NODE                        | Remove node, the active node or appoint node will be the operation node      |  appointNodes（v0.4.7+, Optional, appoint node, Specifying multiple nodes can pass an array）                                                            |
| PASTE_NODE                         | Paste node to a node, the active node will be the operation node | data (the node data to paste, usually obtained through the renderer.copyNode() and renderer.cutNode() methods) |
| SET_NODE_STYLE                     | Modify node single style                                            | node (the node to set the style of), prop (style property), value (style property value), isActive (v0.7.0+has been abandoned, boolean, whether the style being set is for the active state) |
| SET_NODE_STYLEs（v0.6.12+）       |  Modify multiple styles of nodes   | node（the node to set the style of）、style（Style object，key is style prop，value is style value）、isActive（v0.7.0+has been abandoned, boolean, whether the style being set is for the active state） |
| SET_NODE_ACTIVE                    | Set whether the node is active                               | node (the node to set), active (boolean, whether to activate) |
| CLEAR_ACTIVE_NODE                  | Clear the active state of the currently active node(s), the active node will be the operation node |                                                              |
| SET_NODE_EXPAND                    | Set whether the node is expanded                             | node (the node to set), expand (boolean, whether to expand)  |
| EXPAND_ALL                         | Expand all nodes                                             |                                                              |
| UNEXPAND_ALL                       | Collapse all nodes                                           |                                                              |
| UNEXPAND_TO_LEVEL (v0.2.8+)        | Expand to a specified level                                  | level (the level to expand to, 1, 2, 3...)                   |
| SET_NODE_DATA                      | Update node data, that is, update the data in the data object of the node data object | node (the node to set), data (object, the data to update, e.g. `{expand: true}`) |
| SET_NODE_TEXT                      | Set node text                                                | node (the node to set), text (the new text for the node), richText（v0.4.0+, If you want to set a rich text character, you need to set it to `true`）、resetRichText（v0.6.10+Do you want to reset rich text? The default is false. If true is passed, the style of the rich text node will be reset） |
| SET_NODE_IMAGE                     | Set Node Image                                               | node (node to set), imgData (object, image information, structured as: `{url, title, width, height}`, the width and height of the image must be passed) |
| SET_NODE_ICON                      | Set Node Icon                                                | node (node to set), icons (array, predefined image names array, available icons can be obtained in the nodeIconList list in the [icons.js](https://github.com/wanglin2/mind-map/blob/main/simple-mind-map/src/svg/icons.js) file, icon name is type_name, such as ['priority_1']) |
| SET_NODE_HYPERLINK                 | Set Node Hyperlink                                           | node (node to set), link (hyperlink address), title (hyperlink name, optional) |
| SET_NODE_NOTE                      | Set Node Note                                                | node (node to set), note (note text)                         |
| SET_NODE_TAG                       | Set Node Tag                                                 | node (node to set), tag (string array, built-in color information can be obtained in [constant.js](https://github.com/wanglin2/mind-map/blob/main/simple-mind-map/src/constants/constant.js)) |
| INSERT_AFTER (v0.1.5+)             | Move Node to After Another Node | node (node to move, (v0.7.2+supports passing node arrays to move multiple nodes simultaneously)), exist (target node)                     |
| INSERT_BEFORE (v0.1.5+)            | Move Node to Before Another Node | node (node to move, (v0.7.2+supports passing node arrays to move multiple nodes simultaneously)), exist (target node)                     |
| MOVE_NODE_TO (v0.1.5+)             | Move a node as a child of another node       | node (the node to move, (v0.7.2+supports passing node arrays to move multiple nodes simultaneously)), toNode (the target node)            |
| ADD_GENERALIZATION (v0.2.0+)       | Add a node summary                                           | data (the data for the summary, in object format, all numerical fields of the node are supported, default is `{text: 'summary'}`) |
| REMOVE_GENERALIZATION (v0.2.0+)    | Remove a node summary                                        |                                                              |
| SET_NODE_CUSTOM_POSITION (v0.2.0+) | Set a custom position for a node                             | node (the node to set), left (custom x coordinate, default is undefined), top (custom y coordinate, default is undefined) |
| RESET_LAYOUT (v0.2.0+)             | Arrange layout with one click                                |                                                              |
| SET_NODE_SHAPE (v0.2.4+)           | Set the shape of a node                                      | node (the node to set), shape (the shape, all shapes: [Shape.js](https://github.com/wanglin2/mind-map/blob/main/simple-mind-map/src/core/render/node/Shape.js)) |
| GO_TARGET_NODE（v0.6.7+）           |  Navigate to a node, and if the node is collapsed, it will automatically expand to that node   | node（Node instance or node uid to locate）、callback（v0.6.9+, Callback function after positioning completion） |
| INSERT_MULTI_NODE（v0.7.2+）           |  Insert multiple sibling nodes into the specified node at the same time, with the operating node being the currently active node or the specified node   | appointNodes（Optional, specify nodes, specify multiple nodes to pass an array）, nodeList（Data list of newly inserted nodes, array type） |
| INSERT_MULTI_CHILD_NODE（v0.7.2+）           |  Insert multiple child nodes into the specified node simultaneously, with the operation node being the currently active node or the specified node   | appointNodes（Optional, specify nodes, specify multiple nodes to pass an array）, childList（Data list of newly inserted nodes, array type） |
| INSERT_FORMULA（v0.7.2+）           |  Insert mathematical formulas into nodes, operate on the currently active node or specified node   | formula（Mathematical formula to insert, LaTeX syntax）, appointNodes（Optional, specify the node to insert the formula into. Multiple nodes can be passed as arrays, otherwise it defaults to the currently active node） |
| INSERT_PARENT_NODE（v0.8.0+）           |  Insert a parent node into the specified node, with the operation node being the currently active node or the specified node   | openEdit（Activate the newly inserted node and enter editing mode, default to 'true'`）、 appointNodes（Optional, specify the node to insert into the parent node, and specify that multiple nodes can pass an array）、 appointData（Optional, specify the data for the newly created node, such as {text: 'xxx', ...}, Detailed structure can be referenced [exampleData.js](https://github.com/wanglin2/mind-map/blob/main/simple-mind-map/example/exampleData.js)） |
| REMOVE_CURRENT_NODE（v0.8.0+）           |  Delete only the current node, operate on the currently active node or specified node    | appointNodes（Optional, specify the nodes to be deleted, and multiple nodes can be passed as an array） |

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

> You need to register the `Export` plugin first

Export

`type`: the type to be exported, optional values: png, svg, json, pdf (v0.2.1+),
smm (essentially also json)

`isDownload`: whether to directly trigger download, Boolean value, default is
`false`

`fileName`: (v0.1.6+) the name of the exported file, default is `思维导图` (mind
map).

If it is exported as `png`, the fourth parameter can be passed:

`transparent`: v0.5.7+, `Boolean`, default is `false`, Specify whether the background of the exported image is transparent

If it is exported as `svg`, the fourth parameter can be passed:

`plusCssText`: Additional `CSS` style. If there is a `dom` node in `svg`, you can pass in some styles specific to the node through this parameter

If it is exported as `json` or `smm`, the fourth parameter can be passed:

`withConfig`: `Boolean`, default is `true`, Specify whether the exported data includes configuration data, otherwise only pure node tree data will be exported

### toPos(x, y)

> v0.1.5+

Convert the coordinates of the browser's visible window to coordinates relative
to the canvas.

### addPlugin(plugin, opt)

> v0.4.0+

Register plugin, Use `MindMap.usePlugin` to register plugin only before instantiation, The registered plugin will not take effect after instantiation, So if you want to register the plugin after instantiation, you can use the `addPlugin` method of the instance.

### removePlugin(plugin)

> v0.4.0+

Remove registered plugin, Plugins registered through the `usePlugin` or `addPlugin` methods can be removed.
