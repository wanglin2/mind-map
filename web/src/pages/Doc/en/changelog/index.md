# Changelog

## 0.6.0

Breaking change: Adjusted the directory structure of the simple-mind-map source code, Main impact: 1. The introduction path of the plugin needs to be modified. The constant file path needs to be modified.

New: 1.Supports one click zoom to fit the canvas function. 2.Press and hold the Ctrl key to activate the multi selection function on demand through configuration. 3.Support setting to left click to select multiple nodes and right click to drag the canvas. 4. Support controlling whether nodes are allowed to be edited. 5.Add a method for destroying mind maps. 6.Added touch event support plugin.

Fix: 1.Fix the issue where holding down the Ctrl key to select multiple nodes does not trigger the click event for the node. 2.Fixed the issue of node style loss when clearing a node and then entering text.

## 0.5.11

New: Supports associative text editing.

optimization: Optimizing theme configuration updates, changing configurations that do not involve node size does not trigger node recalculation.

## 0.5.10

New: Optimize node reuse logic using LRU caching algorithm.

## 0.5.10-fix.1

Fix: Fix the issue of import errors.

## 0.5.10-fix.2

Fix: Fixed the issue of switching themes and importing data without triggering data changes in rich text mode.

New: Add three new themes.

## 0.5.9

Change: Unified export method format, using `FileReader` instead of `URL.createObjectURL` to convert `blob` data.

## 0.5.8

optimization: 1.The position setting is not triggered when the node position does not change. 2.The unfolding and folding status does not change and does not trigger button updates.

New: 1.The default setting is to move the mouse over the node to display the expand and collapse buttons. 2.Support the list of icons that can be inserted into extended nodes.

## 0.5.7

Breaking change：In rich text mode, exporting png has been changed to using html2canvas to convert the entire svg, greatly improving the export speed. However, html2canvas has a bug where the text color inline with the dom node in the foreignObject element cannot be recognized. Therefore, the text color of the exported node is fixed. However, compared to the previously unavailable state of the export, it can at least be exported quickly and smoothly.

optimization: Optimize the rich text node editing experience.

New: In rich text mode, importing data, initializing data, and switching theme scene node styles support following theme changes.

## 0.5.6

Fix: 1.Fix the issue of node position disorder during fast and multiple renderings in a short period of time. 2.Fix the issue of dragging the canvas while the node is being edited, causing the edit box and node to separate.

New: 1.Add a maximum history limit.

## 0.5.5-fix.1

Fix: 1.Fix the issue where the edit box is also outside the canvas when editing nodes outside the canvas. 2.After modifying the structure, reset the transformation to prevent the problem of sudden position changes during the first drag after switching the structure during scaling.

optimization: 1.When multiple nodes are selected, as long as there is a cross between the node and the selection area, it is considered selected.

## 0.5.5-fix.2

Fix: 1.Fix mini map error.

## 0.5.5

New: 1.Supports configuring the padding when exporting to PNG, SVG, or PDF. 2.Support the configuration of z-index for node text editing boxes and node comment floating layer elements. 3.Support clicking on areas outside the canvas to end node editing status.

## 0.5.4

New: 1.Add new themes. 2.Added timeline and fishbone structure.

Fix: 1.Fix the conflict issue between node right-click and canvas right-click. 2.Fix the bug that the line segment is not hidden when dragging nodes such as organizational chart and directory organization chart.

optimization: 1.Optimize the layout of organizational chart. 2.Optimize the layout of the directory organization chart.

## 0.5.4-fix.1

optimization: 1.Optimize fishbone layout.

## 0.5.3

Fix: 1.Fixed the issue of setting the text style when multiple nodes were selected in rich text mode, which would change the text of all selected nodes to the text of the last selected node.

New: 1.Support setting the position of the initial central node.

### 0.5.3-fix.1

Fix: 1.Fix the issue where setting the position of the initial central node does not take effect.

### 0.5.3-fix.2

Fix: 1.Fix the issue of not displaying images in nodes when exporting as images.

## 0.5.2

Fix: 1.Remove `uid` from exported `JSON` data; 2.Clear the node cache pool when re rendering.

## 0.5.1

optimization: 1.Only respond to shortcut key events when the mouse is inside the canvas

Fix: 1.Fix the issue of incorrect node position during fast operation

## 0.5.0

This version is mainly about code level changes and optimization, with the core goal of improving rendering performance and reducing stuck issues.

New: 1.Support custom expansion and collapse node icons and colors;

optimization: 1.Optimize rendering logic, set the theme, move forward and backward, and other operations no longer require full rendering;

     2.Optimize node drag logic, and fix the problem of being unable to drag between two nodes;

     3.Collapse all nodes adds logic to return to the center point;

     4.Fix the problem of nodes flying and scrambling caused by triggering rendering multiple times in a short time;

     5.Optimize the experience of node editing;

Fix: 1.Fix the issue where the setData method does not trigger history;

modify: Starting from version 0.5.0, considering performance issues, the node activation state can only modify shape related styles:

```js
[
  'fillColor',
  'borderColor',
  'borderWidth',
  'borderDasharray',
  'borderRadius'
]
```

## 0.4.7

optimization: 1.During rich text editing, when initially focusing, all are no longer selected by default; 2.When editing rich text, use the node fill color as the background color to avoid being invisible when the node color is white.  3.Node activation state switching no longer triggers history. 4.Triggering history multiple times in a short time will only add the last data. 5.Optimize the addition of historical records. When there is a rollback, delete the historical data after the current pointer when adding a new record again.

New: 1.Support for importing and exporting Markdown format files. 2.Support for configuring initial text when inserting nodes. 3.Expand the commands for inserting and deleting nodes to support specifying nodes.

## 0.4.6

New: 1.Associated lines support adjusting control points.

optimization: 1.When adding historical data, filter data that has not changed compared to the previous time.

Fix: 1.Fixed a conflict between the direction keys and the navigation function of the direction keys during node editing. 2.Fixed the issue of node id loss when dragging a mobile node, which can cause associated lines to be lost.

## 0.4.5

New: 1.Supports associative lines. 2.You can also drag the canvas by holding down the root node. 3. Hold down the ctrl key to adjust multiple selected nodes.

## 0.4.4

New: Support horizontal scrolling in response to the mouse.

## 0.4.3

Fix: No trigger after forward and backward `data_ Change` event.

New: Support user-defined mouse wheel events; The mouse wheel is adjusted to support zooming and moving the view up and down.

## 0.4.2

New: The `setText` method of the Node class adds a second parameter to support setting rich text content.

## 0.4.1

New: 1.Add and throw node mouseenter and mouseleave events; 2.Node rich text supports setting background color; 3.Node rich text supports clear style.

Fix: 1.Mac system touchpad scaling is the opposite problem; 2.When the device window.devicePixelRatio is not 1, the size of the rich text node in the exported image will become larger when there are rich text nodes.

## 0.4.0

New: The node supports rich text editing.

## 0.3.4

New: Automatic line wrapping function is added to node text.

Fix: 1.Fix the problem of deletion exceptions if there are root nodes in the batch deleted nodes. 2.Fix the problem that high node height will overlap with other nodes in the case of bottom edge style.

## 0.3.3

Fix: The root node text cannot wrap.

## 0.3.2

Fix: 1.Fix the problem that the node style is not updated when the secondary node is dragged to other nodes or other nodes are dragged to the secondary node; 2.Fix the problem that when the actual content of the mind map is larger than the screen width and height, the excess part is not watermarked when exporting.

## 0.3.1

Fix: 1.The problem that deleting the background image does not take effect; 2.The problem that the connector runs above the root node when the node is dragged to the root node.

New: Add position and size settings for background image display. This setting is also supported for exported pictures.

## 0.3.0

Upgrade to plugin architecture, pull out some non-core functions as plugins, register as needed, and reduce the overall volume.

## 0.2.24

New: Node free drag is changed to configurable, the default is `false`, not open; Support add watermark.

## 0.2.23

New: Support register new theme.

## 0.2.22

optimization：The theme and structure pictures of the built-in `simple-mind-map` package are removed and replaced by user self-maintenance. The original pictures can be found in the `web/assets/img/` directory.

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