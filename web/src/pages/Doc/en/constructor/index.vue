<template>
  <div>
    <h1>Constructor</h1>
<h2>Basic use</h2>
<pre class="hljs"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;mindMapContainer&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<pre class="hljs"><code><span class="hljs-keyword">import</span> MindMap <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;simple-mind-map&quot;</span>;

<span class="hljs-keyword">const</span> mindMap = <span class="hljs-keyword">new</span> MindMap({
  <span class="hljs-attr">el</span>: <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">&quot;mindMapContainer&quot;</span>),
  <span class="hljs-attr">data</span>: {
    <span class="hljs-string">&quot;data&quot;</span>: {
        <span class="hljs-string">&quot;text&quot;</span>: <span class="hljs-string">&quot;Root Node&quot;</span>
    },
    <span class="hljs-string">&quot;children&quot;</span>: []
  }
});
</code></pre>
<h2>Instantiation options</h2>
<table>
<thead>
<tr>
<th>Field Name</th>
<th>Type</th>
<th>Default Value</th>
<th>Description</th>
<th>Required</th>
</tr>
</thead>
<tbody>
<tr>
<td>el</td>
<td>Element</td>
<td></td>
<td>Container element, must be a DOM element</td>
<td>Yes</td>
</tr>
<tr>
<td>data</td>
<td>Object</td>
<td>{}</td>
<td>Mind map data, refer to: https://github.com/wanglin2/mind-map/blob/main/simple-mind-map/example/exampleData.js</td>
<td></td>
</tr>
<tr>
<td>layout</td>
<td>String</td>
<td>logicalStructure</td>
<td>Layout type, options: logicalStructure (logical structure diagram), mindMap (mind map), catalogOrganization (catalog organization diagram), organizationStructure (organization structure diagram)</td>
<td></td>
</tr>
<tr>
<td>theme</td>
<td>String</td>
<td>default</td>
<td>Theme, options: default, classic, minions, pinkGrape, mint, gold, vitalityOrange, greenLeaf, dark2, skyGreen, classic2, classic3, classic4 (v0.2.0+), classicGreen, classicBlue, blueSky, brainImpairedPink, dark, earthYellow, freshGreen, freshRed, romanticPurple</td>
<td></td>
</tr>
<tr>
<td>themeConfig</td>
<td>Object</td>
<td>{}</td>
<td>Theme configuration, will be merged with the selected theme, available fields refer to: https://github.com/wanglin2/mind-map/blob/main/simple-mind-map/src/themes/default.js</td>
<td></td>
</tr>
<tr>
<td>scaleRatio</td>
<td>Number</td>
<td>0.1</td>
<td>The incremental scaling ratio</td>
<td></td>
</tr>
<tr>
<td>maxTag</td>
<td>Number</td>
<td>5</td>
<td>The maximum number of tags displayed in the node, any additional tags will be discarded</td>
<td></td>
</tr>
<tr>
<td>exportPadding</td>
<td>Number</td>
<td>20</td>
<td>The padding for exporting images</td>
<td></td>
</tr>
<tr>
<td>imgTextMargin</td>
<td>Number</td>
<td>5</td>
<td>The spacing between the image and text in the node</td>
<td></td>
</tr>
<tr>
<td>textContentMargin</td>
<td>Number</td>
<td>2</td>
<td>The spacing between various text information in the node, such as the spacing between the icon and text</td>
<td></td>
</tr>
<tr>
<td>selectTranslateStep</td>
<td>Number</td>
<td>3</td>
<td>The canvas offset when mouse moves to the edge during multi-select node</td>
<td></td>
</tr>
<tr>
<td>selectTranslateLimit</td>
<td>Number</td>
<td>20</td>
<td>The distance from the edge when the canvas begins to offset during multi-select node</td>
<td></td>
</tr>
<tr>
<td>customNoteContentShow（v0.1.6+）</td>
<td>Object</td>
<td>null</td>
<td>Custom node note content display, object type, structure: {show: (noteContent, left, top) =&gt; {// your display node note logic }, hide: () =&gt; {// your hide node note logic }}</td>
<td></td>
</tr>
<tr>
<td>readonly（v0.1.7+）</td>
<td>Boolean</td>
<td>false</td>
<td>Whether it is read-only mode</td>
<td></td>
</tr>
<tr>
<td>enableFreeDrag（v0.2.4+）</td>
<td>Boolean</td>
<td>false</td>
<td>Enable node free drag</td>
<td></td>
</tr>
<tr>
<td>watermarkConfig（v0.2.4+）</td>
<td>Object</td>
<td></td>
<td>Watermark config, Please refer to the table 【Watermark config】 below for detailed configuration</td>
<td></td>
</tr>
</tbody>
</table>
<h3>Watermark config</h3>
<table>
<thead>
<tr>
<th>Field Name</th>
<th>Type</th>
<th>Default Value</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>text</td>
<td>String</td>
<td>''</td>
<td>Watermark text. If it is an empty string, the watermark will not be displayed</td>
</tr>
<tr>
<td>lineSpacing</td>
<td>Number</td>
<td>100</td>
<td>Spacing between watermark lines</td>
</tr>
<tr>
<td>textSpacing</td>
<td>Number</td>
<td>100</td>
<td>Spacing between watermarks in the same row</td>
</tr>
<tr>
<td>angle</td>
<td>Number</td>
<td>30</td>
<td>Tilt angle of watermark, range: [0, 90]</td>
</tr>
<tr>
<td>textStyle</td>
<td>Object</td>
<td>{color: '#999', opacity: 0.5, fontSize: 14}</td>
<td>Watermark text style</td>
</tr>
</tbody>
</table>
<h2>Static methods</h2>
<h3>defineTheme(name, config)</h3>
<blockquote>
<p>v0.2.23+</p>
</blockquote>
<p>Define new theme.</p>
<p><code>name</code>：New theme name</p>
<p><code>config</code>：New theme config</p>
<p><code>Simple-mind-map </code> Built-in many themes. In addition, you can register new theme. It is recommended to register before instantiation, so that you can directly use the newly registered theme during instantiation. Use example:</p>
<pre class="hljs"><code><span class="hljs-keyword">import</span> MindMap <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;simple-mind-map&#x27;</span>
<span class="hljs-comment">// 注册新主题</span>
MindMap.defineTheme(<span class="hljs-string">&#x27;Theme name&#x27;</span>, {})

<span class="hljs-comment">// 1.实例化时使用新注册的主题</span>
<span class="hljs-keyword">const</span> mindMap = <span class="hljs-keyword">new</span> MindMap({
    <span class="hljs-attr">theme</span>: <span class="hljs-string">&#x27;Theme name&#x27;</span>
})

<span class="hljs-comment">// 2.动态切换新主题</span>
mindMap.setTheme(<span class="hljs-string">&#x27;Theme name&#x27;</span>)
</code></pre>
<p>For all configurations of theme, please refer to <a href="https://github.com/wanglin2/mind-map/blob/main/simple-mind-map/src/themes/default.js">Default Topic</a>. The <code>defineTheme</code>method will merge the configuration you passed in with the default configuration. Most of the themes  do not need custom many parts. For a typical customized theme configuration, please refer to <a href="https://github.com/wanglin2/mind-map/blob/main/simple-mind-map/src/themes/blueSky.js">blueSky</a>.</p>
<h2>Instance methods</h2>
<h3>render()</h3>
<p>Triggers a full rendering, which will reuse nodes for better performance. If
only the node positions have changed, this method can be called to <code>reRender</code>.</p>
<h3>reRender()</h3>
<p>Performs a full re-render, clearing the canvas and creating new nodes. This has
poor performance and should be used sparingly.</p>
<h3>resize()</h3>
<p>After the container size has changed, this method should be called to adjust.</p>
<h3>setMode(mode)</h3>
<blockquote>
<p>v0.1.7+</p>
</blockquote>
<p>Switches between readonly and edit mode.</p>
<p><code>mode</code>：readonly、edit</p>
<h3>on(event, fn)</h3>
<p>Listen to an event. Event list:</p>
<table>
<thead>
<tr>
<th>Event Name</th>
<th>Description</th>
<th>Callback Parameters</th>
</tr>
</thead>
<tbody>
<tr>
<td>data_change</td>
<td>Tree rendering data change, listen to this method to get the latest data</td>
<td>data (current tree rendering data)</td>
</tr>
<tr>
<td>view_data_change（v0.1.1+）</td>
<td>View change data, such as when dragging or zooming</td>
<td>data (current view state data)</td>
</tr>
<tr>
<td>back_forward</td>
<td>Forward or backward</td>
<td>activeHistoryIndex (current index in the history data array), length (current length of the history data array)</td>
</tr>
<tr>
<td>draw_click</td>
<td>Canvas click event</td>
<td>e (event object)</td>
</tr>
<tr>
<td>svg_mousedown</td>
<td>svg canvas mouse down event</td>
<td>e (event object)</td>
</tr>
<tr>
<td>mousedown</td>
<td>el element mouse down event</td>
<td>e (event object), this (Event event class instance)</td>
</tr>
<tr>
<td>mousemove</td>
<td>el element mouse move event</td>
<td>e (event object), this (Event event class instance)</td>
</tr>
<tr>
<td>drag</td>
<td>If it is a drag event while holding down the left button</td>
<td>e (event object), this (Event event class instance)</td>
</tr>
<tr>
<td>mouseup</td>
<td>el element mouse up event</td>
<td>e (event object), this (Event event class instance)</td>
</tr>
<tr>
<td>mousewheel</td>
<td>Mouse scroll event</td>
<td>e (event object), dir (up or down scroll), this (Event event class instance)</td>
</tr>
<tr>
<td>contextmenu</td>
<td>svg canvas right mouse button menu event</td>
<td>e (event object)</td>
</tr>
<tr>
<td>node_click</td>
<td>Node click event</td>
<td>this (node instance), e (event object)</td>
</tr>
<tr>
<td>node_mousedown</td>
<td>Node mouse down event</td>
<td>this (node instance), e (event object)</td>
</tr>
<tr>
<td>node_mouseup</td>
<td>node mouseup event</td>
<td>this (node instance), e (event object)</td>
</tr>
<tr>
<td>node_mouseup</td>
<td>Node mouseup event</td>
<td>this (node instance), e (event object)</td>
</tr>
<tr>
<td>node_dblclick</td>
<td>Node double-click event</td>
<td>this (node instance), e (event object)</td>
</tr>
<tr>
<td>node_contextmenu</td>
<td>Node right-click menu event</td>
<td>e (event object), this (node instance)</td>
</tr>
<tr>
<td>before_node_active</td>
<td>Event before node activation</td>
<td>this (node instance), activeNodeList (current list of active nodes)</td>
</tr>
<tr>
<td>node_active</td>
<td>Node activation event</td>
<td>this (node instance), activeNodeList (current list of active nodes)</td>
</tr>
<tr>
<td>expand_btn_click</td>
<td>Node expand or collapse event</td>
<td>this (node instance)</td>
</tr>
<tr>
<td>before_show_text_edit</td>
<td>Event before node text edit box opens</td>
<td></td>
</tr>
<tr>
<td>hide_text_edit</td>
<td>Node text edit box close event</td>
<td>textEditNode (text edit box DOM node), activeNodeList (current list of active nodes)</td>
</tr>
<tr>
<td>scale</td>
<td>Zoom event</td>
<td>scale (zoom ratio)</td>
</tr>
<tr>
<td>node_img_dblclick（v0.2.15+）</td>
<td>Node image double-click event</td>
<td>this (node instance), e (event object)</td>
</tr>
<tr>
<td>node_tree_render_end（v0.2.16+）</td>
<td>Node tree render end event</td>
<td></td>
</tr>
</tbody>
</table>
<h3>emit(event, ...args)</h3>
<p>Trigger an event, which can be one of the events listed above or a custom event.</p>
<h3>off(event, fn)</h3>
<p>Unbind an event.</p>
<h3>setTheme(theme)</h3>
<p>Switches the theme. Available themes can be found in the options table above.</p>
<h3>getTheme()</h3>
<p>Gets the current theme.</p>
<h3>setThemeConfig(config)</h3>
<p>Sets the theme configuration. <code>config</code> is the same as the <code>themeConfig</code> option
in the options table above.</p>
<h3>getCustomThemeConfig()</h3>
<p>Gets the custom theme configuration.</p>
<h3>getThemeConfig(prop)</h3>
<p>Gets the value of a specific theme configuration property.</p>
<h3>getConfig(<em>prop</em>)</h3>
<blockquote>
<p>0.2.24+</p>
</blockquote>
<p><code>prop</code>：Get the value of the specified configuration, and return the entire configuration if not passed</p>
<p>Get config, That is,  <code>opt</code> of <code>new MindMap (opt)</code></p>
<h3>updateConfig(<em>opt</em> = {})</h3>
<blockquote>
<p>0.2.24+</p>
</blockquote>
<p><code>opt</code>：Configuration to update</p>
<p>Update config，That is update <code>opt</code> of <code>new MindMap(opt)</code>，You can only update some data, such as:</p>
<pre class="hljs"><code>mindMap.updateConfig({
    <span class="hljs-attr">enableFreeDrag</span>: <span class="hljs-literal">true</span><span class="hljs-comment">// 开启节点自由拖拽</span>
})
</code></pre>
<p>This method only updates the configuration and has no other side effects, such as triggering canvas re-rendering</p>
<h3>getLayout()</h3>
<p>Gets the current layout structure.</p>
<h3>setLayout(layout)</h3>
<p>Sets the layout structure. Available values can be found in the <code>layout</code> field
in the options table above.</p>
<h3>execCommand(name, ...args)</h3>
<p>Executes a command, which will add a record to the history stack for undo or
redo. All commands are as follows:</p>
<table>
<thead>
<tr>
<th>Command name</th>
<th>Description</th>
<th>Parameters</th>
</tr>
</thead>
<tbody>
<tr>
<td>SELECT_ALL</td>
<td>Select all</td>
<td></td>
</tr>
<tr>
<td>BACK</td>
<td>Go back a specified number of steps</td>
<td>step (the number of steps to go back, default is 1)</td>
</tr>
<tr>
<td>FORWARD</td>
<td>Go forward a specified number of steps</td>
<td>step (the number of steps to go forward, default is 1)</td>
</tr>
<tr>
<td>INSERT_NODE</td>
<td>Insert a sibling node, the active node will be the operation node. If there are multiple active nodes, only the first one will be effective</td>
<td></td>
</tr>
<tr>
<td>INSERT_CHILD_NODE</td>
<td>Insert a child node, the active node will be the operation node</td>
<td></td>
</tr>
<tr>
<td>UP_NODE</td>
<td>Move node up, the active node will be the operation node. If there are multiple active nodes, only the first one will be effective. Using this command on the root node or the first node in the list will be invalid</td>
<td></td>
</tr>
<tr>
<td>DOWN_NODE</td>
<td>Move node down, the active node will be the operation node. If there are multiple active nodes, only the first one will be effective. Using this command on the root node or the last node in the list will be invalid</td>
<td></td>
</tr>
<tr>
<td>REMOVE_NODE</td>
<td>Remove node, the active node will be the operation node</td>
<td></td>
</tr>
<tr>
<td>PASTE_NODE</td>
<td>Paste node to a node, the active node will be the operation node</td>
<td>data (the node data to paste, usually obtained through the renderer.copyNode() and renderer.cutNode() methods)</td>
</tr>
<tr>
<td>SET_NODE_STYLE</td>
<td>Modify node style</td>
<td>node (the node to set the style of), prop (style property), value (style property value), isActive (boolean, whether the style being set is for the active state)</td>
</tr>
<tr>
<td>SET_NODE_ACTIVE</td>
<td>Set whether the node is active</td>
<td>node (the node to set), active (boolean, whether to activate)</td>
</tr>
<tr>
<td>CLEAR_ACTIVE_NODE</td>
<td>Clear the active state of the currently active node(s), the active node will be the operation node</td>
<td></td>
</tr>
<tr>
<td>SET_NODE_EXPAND</td>
<td>Set whether the node is expanded</td>
<td>node (the node to set), expand (boolean, whether to expand)</td>
</tr>
<tr>
<td>EXPAND_ALL</td>
<td>Expand all nodes</td>
<td></td>
</tr>
<tr>
<td>UNEXPAND_ALL</td>
<td>Collapse all nodes</td>
<td></td>
</tr>
<tr>
<td>UNEXPAND_TO_LEVEL (v0.2.8+)</td>
<td>Expand to a specified level</td>
<td>level (the level to expand to, 1, 2, 3...)</td>
</tr>
<tr>
<td>SET_NODE_DATA</td>
<td>Update node data, that is, update the data in the data object of the node data object</td>
<td>node (the node to set), data (object, the data to update, e.g. <code>{expand: true}</code>)</td>
</tr>
<tr>
<td>SET_NODE_TEXT</td>
<td>Set node text</td>
<td>node (the node to set), text (the new text for the node)</td>
</tr>
<tr>
<td>SET_NODE_IMAGE</td>
<td>Set Node Image</td>
<td>node (node to set), imgData (object, image information, structured as: <code>{url, title, width, height}</code>, the width and height of the image must be passed)</td>
</tr>
<tr>
<td>SET_NODE_ICON</td>
<td>Set Node Icon</td>
<td>node (node to set), icons (array, predefined image names array, available icons can be obtained in the nodeIconList list in the <a href="https://github.com/wanglin2/mind-map/blob/main/simple-mind-map/src/svg/icons.js">https://github.com/wanglin2/mind-map/blob/main/simple-mind-map/src/svg/icons.js</a> file, icon name is type_name, such as ['priority_1'])</td>
</tr>
<tr>
<td>SET_NODE_HYPERLINK</td>
<td>Set Node Hyperlink</td>
<td>node (node to set), link (hyperlink address), title (hyperlink name, optional)</td>
</tr>
<tr>
<td>SET_NODE_NOTE</td>
<td>Set Node Note</td>
<td>node (node to set), note (note text)</td>
</tr>
<tr>
<td>SET_NODE_TAG</td>
<td>Set Node Tag</td>
<td>node (node to set), tag (string array, built-in color information can be obtained in <a href="https://github.com/wanglin2/mind-map/blob/main/simple-mind-map/src/utils/constant.js">https://github.com/wanglin2/mind-map/blob/main/simple-mind-map/src/utils/constant.js</a>)</td>
</tr>
<tr>
<td>INSERT_AFTER (v0.1.5+)</td>
<td>Move Node to After Another Node</td>
<td>node (node to move), exist (target node)</td>
</tr>
<tr>
<td>INSERT_BEFORE (v0.1.5+)</td>
<td>Move Node to Before Another Node</td>
<td>node (node to move), exist (target node)</td>
</tr>
<tr>
<td>MOVE_NODE_TO (v0.1.5+)</td>
<td>Move a node as a child of another node</td>
<td>node (the node to move), toNode (the target node)</td>
</tr>
<tr>
<td>ADD_GENERALIZATION (v0.2.0+)</td>
<td>Add a node summary</td>
<td>data (the data for the summary, in object format, all numerical fields of the node are supported, default is <code>{text: 'summary'}</code>)</td>
</tr>
<tr>
<td>REMOVE_GENERALIZATION (v0.2.0+)</td>
<td>Remove a node summary</td>
<td></td>
</tr>
<tr>
<td>SET_NODE_CUSTOM_POSITION (v0.2.0+)</td>
<td>Set a custom position for a node</td>
<td>node (the node to set), left (custom x coordinate, default is undefined), top (custom y coordinate, default is undefined)</td>
</tr>
<tr>
<td>RESET_LAYOUT (v0.2.0+)</td>
<td>Arrange layout with one click</td>
<td></td>
</tr>
<tr>
<td>SET_NODE_SHAPE (v0.2.4+)</td>
<td>Set the shape of a node</td>
<td>node (the node to set), shape (the shape, all shapes: https://github.com/wanglin2/mind-map/blob/main/simple-mind-map/src/Shape.js)</td>
</tr>
</tbody>
</table>
<h3>setData(data)</h3>
<p>Dynamic setting of mind map data, pure node data</p>
<p><code>data</code>: mind map structure data</p>
<h3>setFullData(<em>data</em>)</h3>
<blockquote>
<p>v0.2.7+</p>
</blockquote>
<p>Dynamic setting of mind map data, including node data, layout, theme, view</p>
<p><code>data</code>: complete data, structure can refer to
<a href="https://github.com/wanglin2/mind-map/blob/main/simple-mind-map/example/exportFullData.json">exportFullData</a></p>
<h3>getData(withConfig)</h3>
<blockquote>
<p>v0.2.9+</p>
</blockquote>
<p>Gets mind map data</p>
<p><code>withConfig</code>: <code>Boolean</code>, default is <code>false</code>, that is, the obtained data only
includes the node tree, if <code>true</code> is passed, it will also include theme, layout,
view, etc. data</p>
<h3>export(type, isDownload, fileName)</h3>
<p>Export</p>
<p><code>type</code>: the type to be exported, optional values: png, svg, json, pdf (v0.2.1+),
smm (essentially also json)</p>
<p><code>isDownload</code>: whether to directly trigger download, Boolean value, default is
<code>false</code></p>
<p><code>fileName</code>: (v0.1.6+) the name of the exported file, default is <code>思维导图</code> (mind
map).</p>
<h3>toPos(x, y)</h3>
<blockquote>
<p>v0.1.5+</p>
</blockquote>
<p>Convert the coordinates of the browser's visible window to coordinates relative
to the canvas.</p>

  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>