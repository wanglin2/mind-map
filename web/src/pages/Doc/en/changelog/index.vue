<template>
  <div>
    <h1>Changelog</h1>
<h2>0.6.0</h2>
<p>Breaking change: Adjusted the directory structure of the simple-mind-map source code, Main impact: 1. The introduction path of the plugin needs to be modified. The constant file path needs to be modified.</p>
<p>New: 1.Supports one click zoom to fit the canvas function. 2.Press and hold the Ctrl key to activate the multi selection function on demand through configuration. 3.Support setting to left click to select multiple nodes and right click to drag the canvas. 4. Support controlling whether nodes are allowed to be edited. 5.Add a method for destroying mind maps. 6.Added touch event support plugin.</p>
<p>Fix: 1.Fix the issue where holding down the Ctrl key to select multiple nodes does not trigger the click event for the node. 2.Fixed the issue of node style loss when clearing a node and then entering text.</p>
<h2>0.5.11</h2>
<p>New: Supports associative text editing.</p>
<p>optimization: Optimizing theme configuration updates, changing configurations that do not involve node size does not trigger node recalculation.</p>
<h2>0.5.10</h2>
<p>New: Optimize node reuse logic using LRU caching algorithm.</p>
<h2>0.5.10-fix.1</h2>
<p>Fix: Fix the issue of import errors.</p>
<h2>0.5.10-fix.2</h2>
<p>Fix: Fixed the issue of switching themes and importing data without triggering data changes in rich text mode.</p>
<p>New: Add three new themes.</p>
<h2>0.5.9</h2>
<p>Change: Unified export method format, using <code>FileReader</code> instead of <code>URL.createObjectURL</code> to convert <code>blob</code> data.</p>
<h2>0.5.8</h2>
<p>optimization: 1.The position setting is not triggered when the node position does not change. 2.The unfolding and folding status does not change and does not trigger button updates.</p>
<p>New: 1.The default setting is to move the mouse over the node to display the expand and collapse buttons. 2.Support the list of icons that can be inserted into extended nodes.</p>
<h2>0.5.7</h2>
<p>Breaking change：In rich text mode, exporting png has been changed to using html2canvas to convert the entire svg, greatly improving the export speed. However, html2canvas has a bug where the text color inline with the dom node in the foreignObject element cannot be recognized. Therefore, the text color of the exported node is fixed. However, compared to the previously unavailable state of the export, it can at least be exported quickly and smoothly.</p>
<p>optimization: Optimize the rich text node editing experience.</p>
<p>New: In rich text mode, importing data, initializing data, and switching theme scene node styles support following theme changes.</p>
<h2>0.5.6</h2>
<p>Fix: 1.Fix the issue of node position disorder during fast and multiple renderings in a short period of time. 2.Fix the issue of dragging the canvas while the node is being edited, causing the edit box and node to separate.</p>
<p>New: 1.Add a maximum history limit.</p>
<h2>0.5.5-fix.1</h2>
<p>Fix: 1.Fix the issue where the edit box is also outside the canvas when editing nodes outside the canvas. 2.After modifying the structure, reset the transformation to prevent the problem of sudden position changes during the first drag after switching the structure during scaling.</p>
<p>optimization: 1.When multiple nodes are selected, as long as there is a cross between the node and the selection area, it is considered selected.</p>
<h2>0.5.5-fix.2</h2>
<p>Fix: 1.Fix mini map error.</p>
<h2>0.5.5</h2>
<p>New: 1.Supports configuring the padding when exporting to PNG, SVG, or PDF. 2.Support the configuration of z-index for node text editing boxes and node comment floating layer elements. 3.Support clicking on areas outside the canvas to end node editing status.</p>
<h2>0.5.4</h2>
<p>New: 1.Add new themes. 2.Added timeline and fishbone structure.</p>
<p>Fix: 1.Fix the conflict issue between node right-click and canvas right-click. 2.Fix the bug that the line segment is not hidden when dragging nodes such as organizational chart and directory organization chart.</p>
<p>optimization: 1.Optimize the layout of organizational chart. 2.Optimize the layout of the directory organization chart.</p>
<h2>0.5.4-fix.1</h2>
<p>optimization: 1.Optimize fishbone layout.</p>
<h2>0.5.3</h2>
<p>Fix: 1.Fixed the issue of setting the text style when multiple nodes were selected in rich text mode, which would change the text of all selected nodes to the text of the last selected node.</p>
<p>New: 1.Support setting the position of the initial central node.</p>
<h3>0.5.3-fix.1</h3>
<p>Fix: 1.Fix the issue where setting the position of the initial central node does not take effect.</p>
<h3>0.5.3-fix.2</h3>
<p>Fix: 1.Fix the issue of not displaying images in nodes when exporting as images.</p>
<h2>0.5.2</h2>
<p>Fix: 1.Remove <code>uid</code> from exported <code>JSON</code> data; 2.Clear the node cache pool when re rendering.</p>
<h2>0.5.1</h2>
<p>optimization: 1.Only respond to shortcut key events when the mouse is inside the canvas</p>
<p>Fix: 1.Fix the issue of incorrect node position during fast operation</p>
<h2>0.5.0</h2>
<p>This version is mainly about code level changes and optimization, with the core goal of improving rendering performance and reducing stuck issues.</p>
<p>New: 1.Support custom expansion and collapse node icons and colors;</p>
<p>optimization: 1.Optimize rendering logic, set the theme, move forward and backward, and other operations no longer require full rendering;</p>
<pre><code> 2.Optimize node drag logic, and fix the problem of being unable to drag between two nodes;

 3.Collapse all nodes adds logic to return to the center point;

 4.Fix the problem of nodes flying and scrambling caused by triggering rendering multiple times in a short time;

 5.Optimize the experience of node editing;
</code></pre>
<p>Fix: 1.Fix the issue where the setData method does not trigger history;</p>
<p>modify: Starting from version 0.5.0, considering performance issues, the node activation state can only modify shape related styles:</p>
<pre class="hljs"><code>[
  <span class="hljs-string">&#x27;fillColor&#x27;</span>,
  <span class="hljs-string">&#x27;borderColor&#x27;</span>,
  <span class="hljs-string">&#x27;borderWidth&#x27;</span>,
  <span class="hljs-string">&#x27;borderDasharray&#x27;</span>,
  <span class="hljs-string">&#x27;borderRadius&#x27;</span>
]
</code></pre>
<h2>0.4.7</h2>
<p>optimization: 1.During rich text editing, when initially focusing, all are no longer selected by default; 2.When editing rich text, use the node fill color as the background color to avoid being invisible when the node color is white.  3.Node activation state switching no longer triggers history. 4.Triggering history multiple times in a short time will only add the last data. 5.Optimize the addition of historical records. When there is a rollback, delete the historical data after the current pointer when adding a new record again.</p>
<p>New: 1.Support for importing and exporting Markdown format files. 2.Support for configuring initial text when inserting nodes. 3.Expand the commands for inserting and deleting nodes to support specifying nodes.</p>
<h2>0.4.6</h2>
<p>New: 1.Associated lines support adjusting control points.</p>
<p>optimization: 1.When adding historical data, filter data that has not changed compared to the previous time.</p>
<p>Fix: 1.Fixed a conflict between the direction keys and the navigation function of the direction keys during node editing. 2.Fixed the issue of node id loss when dragging a mobile node, which can cause associated lines to be lost.</p>
<h2>0.4.5</h2>
<p>New: 1.Supports associative lines. 2.You can also drag the canvas by holding down the root node. 3. Hold down the ctrl key to adjust multiple selected nodes.</p>
<h2>0.4.4</h2>
<p>New: Support horizontal scrolling in response to the mouse.</p>
<h2>0.4.3</h2>
<p>Fix: No trigger after forward and backward <code>data_ Change</code> event.</p>
<p>New: Support user-defined mouse wheel events; The mouse wheel is adjusted to support zooming and moving the view up and down.</p>
<h2>0.4.2</h2>
<p>New: The <code>setText</code> method of the Node class adds a second parameter to support setting rich text content.</p>
<h2>0.4.1</h2>
<p>New: 1.Add and throw node mouseenter and mouseleave events; 2.Node rich text supports setting background color; 3.Node rich text supports clear style.</p>
<p>Fix: 1.Mac system touchpad scaling is the opposite problem; 2.When the device window.devicePixelRatio is not 1, the size of the rich text node in the exported image will become larger when there are rich text nodes.</p>
<h2>0.4.0</h2>
<p>New: The node supports rich text editing.</p>
<h2>0.3.4</h2>
<p>New: Automatic line wrapping function is added to node text.</p>
<p>Fix: 1.Fix the problem of deletion exceptions if there are root nodes in the batch deleted nodes. 2.Fix the problem that high node height will overlap with other nodes in the case of bottom edge style.</p>
<h2>0.3.3</h2>
<p>Fix: The root node text cannot wrap.</p>
<h2>0.3.2</h2>
<p>Fix: 1.Fix the problem that the node style is not updated when the secondary node is dragged to other nodes or other nodes are dragged to the secondary node; 2.Fix the problem that when the actual content of the mind map is larger than the screen width and height, the excess part is not watermarked when exporting.</p>
<h2>0.3.1</h2>
<p>Fix: 1.The problem that deleting the background image does not take effect; 2.The problem that the connector runs above the root node when the node is dragged to the root node.</p>
<p>New: Add position and size settings for background image display. This setting is also supported for exported pictures.</p>
<h2>0.3.0</h2>
<p>Upgrade to plugin architecture, pull out some non-core functions as plugins, register as needed, and reduce the overall volume.</p>
<h2>0.2.24</h2>
<p>New: Node free drag is changed to configurable, the default is <code>false</code>, not open; Support add watermark.</p>
<h2>0.2.23</h2>
<p>New: Support register new theme.</p>
<h2>0.2.22</h2>
<p>optimization：The theme and structure pictures of the built-in <code>simple-mind-map</code> package are removed and replaced by user self-maintenance. The original pictures can be found in the <code>web/assets/img/</code> directory.</p>
<h2>0.2.21</h2>
<p>New: Support node horizontal line style.</p>
<h2>0.2.20</h2>
<p>fix：When the distance from the canvas to the upper left corner of the window is not 0, the node dragging will have an offset problem.</p>
<h2>0.2.19</h2>
<p>fix：When the node is not activated, pressing any key will trigger the problem of automatic focus.</p>
<h2>0.2.18</h2>
<p>optimization：Keyboard navigation algorithm for finding focus, supporting simple algorithm, region algorithm and shadow algorithm.</p>
<h2>0.2.17</h2>
<p>New：Keyboard navigation, that is, switch the active nodes through the direction keys; The node text content can be edited directly in the outline.</p>
<h2>0.2.16</h2>
<p>optimization：Mini map; drag performance.</p>
<h2>0.2.15</h2>
<p>optimization：Local file editing.</p>
<p>New：Double-click the image in the node to preview the large image.</p>
<h2>0.2.14</h2>
<p>optimization：Automatically expand when inserting child nodes.</p>
<p>fix：The error occurred when the mini map was closed.</p>
<h2>0.2.13</h2>
<p>fix：The child node is missing when collapsing state replication.</p>
<h2>0.2.11</h2>
<p>fix：Fix the problem that is lost when the child node collapses state replication.</p>
<p>New：Support mini map.</p>
<h2>0.2.10</h2>
<p>optimization：Focus immediately when you manually create a node.</p>
<p>fix：Connection style depth update problem.</p>
<p>New：Logical structure diagram and mind map add linear connection style and direct connection style.</p>
<h2>0.2.9</h2>
<p>New：Support the creation, opening and saving of local files on the computer.</p>
<h2>0.2.8</h2>
<p>fix：Xmind8 version file import failed.</p>
<p>New：Expanding to the specified level is supported.</p>
<h2>0.2.7</h2>
<p>fix：The root node adds multiple nodes to burst the stack.</p>
<p>New：Support import .xmind file.</p>
<h2>0.2.6</h2>
<p>New：The title tag is added when exporting svg.</p>
<h2>0.2.5</h2>
<p>fix：Bugs caused by node expansion and collapse.</p>
<p>New：Node supports custom line styles.</p>
<h2>0.2.4</h2>
<p>New：Nodes support multiple shapes.</p>
<h2>0.2.3</h2>
<p>fix：Shortcut key conflicts when editing node text; Right-click menu shortcut prompt error; Right-click menu shortcut prompt.</p>
<h2>0.2.2</h2>
<p>fix：The input string '/' conflicts with the shortcut key '/'.</p>
<h2>0.2.1</h2>
<p>New：Support export as pdf.</p>
<h2>0.2.0</h2>
<p>New：Classic4 theme；Support adding summary; Support free drag; Move Node Up, Move Node Down, Copy Node, Cut Node, Paste Node, One-click Organize Cloth Shortcut; Library packaging; Ctrl+left click to select multiple.</p>
<h2>0.1.18</h2>
<p>fix：The problem that the node icon cannot be deleted; The tool button is grayed out and can still be clicked.</p>
<h2>0.1.17</h2>
<p>New：Add read-only mode.</p>
<h2>0.1.16</h2>
<p>New：Node notes support markdown and rich text.</p>
<p>fix：Can't select text; Node annotations cannot hide problems after node activation; When editing text such as hyperlinks, notes, labels, etc., the return key and return key conflict with the shortcut key of mind map.</p>
<h2>0.1.15</h2>
<p>New：The status data supports saving the active status and view status (drag position, zoom value)；Support node drag.</p>
<h2>0.1.14</h2>
<p>fix：There are problems with setting topics when activating nodes.</p>
<h2>0.1.13</h2>
<p>New：Shortcut key function; Support export as json。</p>
<p>optimization：Some details.</p>
<h2>0.1.12</h2>
<p>New：Local storage；Right-click menu function, etc.</p>
<h2>0.1.0</h2>
<p>Complete basic functions.</p>

  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>