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
<td>Mind map data, refer to: <a href="https://github.com/wanglin2/mind-map/blob/main/simple-mind-map/example/exampleData.js">exampleData.js</a></td>
<td></td>
</tr>
<tr>
<td>layout</td>
<td>String</td>
<td>logicalStructure</td>
<td>Layout type, options: logicalStructure (logical structure diagram), mindMap (mind map), catalogOrganization (catalog organization diagram), organizationStructure (organization structure diagram)、timeline（v0.5.4+, timeline）、timeline2（v0.5.4+, up down alternating timeline）、fishbone（v0.5.4+, fishbone diagram）</td>
<td></td>
</tr>
<tr>
<td>fishboneDeg（v0.5.4+）</td>
<td>Number</td>
<td>45</td>
<td>Set the diagonal angle of the fishbone structure diagram</td>
<td></td>
</tr>
<tr>
<td>theme</td>
<td>String</td>
<td>default</td>
<td>Theme, options: default, classic, minions, pinkGrape, mint, gold, vitalityOrange, greenLeaf, dark2, skyGreen, classic2, classic3, classic4(v0.2.0+), classicGreen, classicBlue, blueSky, brainImpairedPink, dark, earthYellow, freshGreen, freshRed, romanticPurple, simpleBlack(v0.5.4+), courseGreen(v0.5.4+), coffee(v0.5.4+), redSpirit(v0.5.4+), blackHumour(v0.5.4+), lateNightOffice(v0.5.4+), blackGold(v0.5.4+)、、avocado(v.5.10-fix.2+)、autumn(v.5.10-fix.2+)、orangeJuice(v.5.10-fix.2+)</td>
<td></td>
</tr>
<tr>
<td>themeConfig</td>
<td>Object</td>
<td>{}</td>
<td>Theme configuration, will be merged with the selected theme, available fields refer to: <a href="https://github.com/wanglin2/mind-map/blob/main/simple-mind-map/src/themes/default.js">default.js</a></td>
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
<tr>
<td>textAutoWrapWidth（v0.3.4+）</td>
<td>Number</td>
<td>500</td>
<td>Each line of text in the node will wrap automatically when it reaches the width</td>
<td></td>
</tr>
<tr>
<td>customHandleMousewheel（v0.4.3+）</td>
<td>Function</td>
<td>null</td>
<td>User-defined mouse wheel event processing can pass a function, and the callback parameter is the event object</td>
<td></td>
</tr>
<tr>
<td>mousewheelAction（v0.4.3+）</td>
<td>String</td>
<td>zoom</td>
<td>The behavior of the mouse wheel, <code>zoom</code>(Zoom in and out)、<code>move</code>(Move up and down). If <code>customHandleMousewheel</code> passes a custom function, this property will not take effect</td>
<td></td>
</tr>
<tr>
<td>mousewheelMoveStep（v0.4.3+）</td>
<td>Number</td>
<td>100</td>
<td>When the <code>mousewheelAction</code> is set to <code>move</code>, you can use this attribute to control the step length of the view movement when the mouse scrolls. The unit is <code>px</code></td>
<td></td>
</tr>
<tr>
<td>defaultInsertSecondLevelNodeText（v0.4.7+）</td>
<td>String</td>
<td>二级节点</td>
<td>Text of the default inserted secondary node</td>
<td></td>
</tr>
<tr>
<td>defaultInsertBelowSecondLevelNodeText（v0.4.7+）</td>
<td>String</td>
<td>分支主题</td>
<td>Text for nodes below the second level inserted by default</td>
<td></td>
</tr>
<tr>
<td>expandBtnStyle（v0.5.0+）</td>
<td>Object</td>
<td>{ color: '#808080', fill: '#fff' }</td>
<td>Expand the color of the stow button</td>
<td></td>
</tr>
<tr>
<td>expandBtnIcon（v0.5.0+）</td>
<td>Object</td>
<td>{ open: '', close: '' }</td>
<td>Customize the icon of the expand/collapse button, and you can transfer the svg string of the icon</td>
<td></td>
</tr>
<tr>
<td>enableShortcutOnlyWhenMouseInSvg（v0.5.1+）</td>
<td>Boolean</td>
<td>true</td>
<td>Only respond to shortcut key events when the mouse is inside the canvas</td>
<td></td>
</tr>
<tr>
<td>enableNodeTransitionMove（v0.5.1+）</td>
<td>Boolean</td>
<td>true</td>
<td>Whether to enable node animation transition</td>
<td></td>
</tr>
<tr>
<td>nodeTransitionMoveDuration（v0.5.1+）</td>
<td>Number</td>
<td>300</td>
<td>If node animation transition is enabled, the transition time can be set using this attribute, in milliseconds</td>
<td></td>
</tr>
<tr>
<td>initRootNodePosition（v0.5.3+）</td>
<td>Array</td>
<td>null</td>
<td>The position of the initial root node can be passed as an array, default is <code>['center', 'center']</code>, Represents the root node at the center of the canvas, In addition to <code>center</code>, keywords can also be set to <code>left</code>, <code>top</code>, <code>right</code>, and <code>bottom</code>, In addition to passing keywords, each item in the array can also pass a number representing a specific pixel, Can pass a percentage string, such as <code>['40%', '60%']</code>, Represents a horizontal position at <code>40%</code> of the canvas width, and a vertical position at <code>60%</code> of the canvas height</td>
<td></td>
</tr>
<tr>
<td>exportPaddingX（v0.5.5+）</td>
<td>Number</td>
<td>10</td>
<td>Horizontal padding of graphics when exporting PNG, SVG, and PDF</td>
<td></td>
</tr>
<tr>
<td>exportPaddingY（v0.5.5+）</td>
<td>Number</td>
<td>10</td>
<td>Vertical padding of graphics when exporting PNG, SVG, and PDF</td>
<td></td>
</tr>
<tr>
<td>nodeTextEditZIndex（v0.5.5+）</td>
<td>Number</td>
<td>3000</td>
<td></td>
<td>z-index of node text edit box elements</td>
</tr>
<tr>
<td>nodeNoteTooltipZIndex（v0.5.5+）</td>
<td>Number</td>
<td>3000</td>
<td>z-index of floating layer elements in node comments</td>
<td></td>
</tr>
<tr>
<td>isEndNodeTextEditOnClickOuter（v0.5.5+）</td>
<td>Boolean</td>
<td>true</td>
<td>Whether to end the editing status of node text when clicking on an area outside the canvas</td>
<td></td>
</tr>
<tr>
<td>maxHistoryCount（v0.5.6+）</td>
<td>Number</td>
<td>1000</td>
<td></td>
<td>Maximum number of history records</td>
</tr>
<tr>
<td>alwaysShowExpandBtn（v0.5.8+）</td>
<td>Boolean</td>
<td>false</td>
<td>Whether to always display the expand and collapse buttons of nodes, which are only displayed when the mouse is moved up and activated by default</td>
<td></td>
</tr>
<tr>
<td>iconList（v0.5.8+）</td>
<td>Array</td>
<td>[]</td>
<td>The icons that can be inserted into the extension node, and each item in the array is an object. Please refer to the &quot;Icon Configuration&quot; table below for the detailed structure of the object</td>
<td></td>
</tr>
<tr>
<td>maxNodeCacheCount（v0.5.10+）</td>
<td>Number</td>
<td>1000</td>
<td>The maximum number of cached nodes. To optimize performance, an internal node cache pool is maintained to reuse nodes. This attribute allows you to specify the maximum number of caches in the pool</td>
<td></td>
</tr>
<tr>
<td>defaultAssociativeLineText（v0.5.11+）</td>
<td>String</td>
<td>关联</td>
<td>Association Line Default Text</td>
<td></td>
</tr>
<tr>
<td>fitPadding（v0.6.0+）</td>
<td>Number</td>
<td>50</td>
<td>The padding of mind mapping when adapting to canvas size, Unit: px</td>
<td></td>
</tr>
<tr>
<td>enableCtrlKeyNodeSelection（v0.6.0+）</td>
<td>Boolean</td>
<td>true</td>
<td>Whether to enable the function of holding down the Ctrl key to select multiple nodes</td>
<td></td>
</tr>
<tr>
<td>useLeftKeySelectionRightKeyDrag（v0.6.0+）</td>
<td>Boolean</td>
<td>false</td>
<td>Setting to left click to select multiple nodes and right click to drag the canvas.</td>
<td></td>
</tr>
<tr>
<td>beforeTextEdit（v0.6.0+）</td>
<td>Function/null</td>
<td>null</td>
<td>The callback method before the node is about to enter editing. If the method returns a value other than true, the editing will be canceled. The function can return a value or a promise, and the callback parameter is the node instance</td>
<td></td>
</tr>
<tr>
<td>isUseCustomNodeContent（v0.6.3+）</td>
<td>Boolean</td>
<td>false</td>
<td>Whether to customize node content</td>
<td></td>
</tr>
<tr>
<td>customCreateNodeContent（v0.6.3+）</td>
<td>Function/null</td>
<td>null</td>
<td>If <code>isUseCustomNodeContent</code> is set to <code>true</code>, then this option needs to be used to pass in a method that receives the node instance <code>node</code> as a parameter (if you want to obtain data for that node, you can use <code>node.nodeData.data</code>). You need to return the custom node content element, which is the DOM node. If a node does not require customization, you can return <code>null</code></td>
<td></td>
</tr>
<tr>
<td>mouseScaleCenterUseMousePosition（v0.6.4-fix.1+）</td>
<td>Boolean</td>
<td>true</td>
<td>Is the mouse zoom centered around the current position of the mouse, otherwise centered around the canvas</td>
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
<h3>Icon Configuration</h3>
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
<td>name</td>
<td>String</td>
<td></td>
<td>The name of the icon group</td>
</tr>
<tr>
<td>type</td>
<td>String</td>
<td></td>
<td>Values for icon grouping</td>
</tr>
<tr>
<td>list</td>
<td>Array</td>
<td></td>
<td>A list of icons under grouping, with each item in the array being an object, <code>{ name: '', icon: '' }</code>，<code>name</code>represents the name of the icon, <code>icon</code>represents the icon, Can be an <code>svg</code> icon, such as <code>&lt;svg ...&gt;&lt;path&gt;&lt;/path&gt;&lt;/svg&gt;</code>, also can be a image <code>url</code>, or <code>base64</code> icon, such as <code>data:image/png;base64,...</code></td>
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
<h3>usePlugin(plugin, opt = {})</h3>
<blockquote>
<p>v0.3.0+</p>
</blockquote>
<ul>
<li><code>opt</code>：v0.4.0+，Plugin options. If a plugin supports custom options, it can be passed in through this parameter.</li>
</ul>
<p>If you need to use some non-core functions, such as mini map, watermark, etc, you can register plugin through this method. Can be called in chain.</p>
<p>Note: The plugin needs to be registered before instantiating <code>MindMap</code>.</p>
<h3>hasPlugin(plugin)</h3>
<blockquote>
<p>v0.4.0+</p>
</blockquote>
<p>Get whether a plugin is registered, The index of the plugin in the registered plugin list is returned, If it is <code>-1</code>, it means that the plugin is not registered.</p>
<h2>Static props</h2>
<h3>pluginList</h3>
<blockquote>
<p>v0.3.0+</p>
</blockquote>
<p>List of all currently registered plugins.</p>
<h2>Instance methods</h2>
<h3>destroy()</h3>
<blockquote>
<p>v0.6.0+</p>
</blockquote>
<p>Destroy mind maps. It will remove registered plugins, remove listening events, and delete all nodes on the canvas.</p>
<h3>getSvgData({ paddingX = 0, paddingY = 0 })</h3>
<blockquote>
<p>v0.3.0+</p>
</blockquote>
<p><code>paddingX</code>: Padding x</p>
<p><code>paddingY</code>: Padding y</p>
<p>Get the <code>svg</code> data and return an object. The detailed structure is as follows:</p>
<pre class="hljs"><code>{
  svg, <span class="hljs-comment">// Element, the overall svg element of the mind map graphics, including: svg (canvas container), g (actual mind map group)</span>
  svgHTML, <span class="hljs-comment">// String, svg string, i.e. html string, can be directly rendered to the small map container you prepared</span>
  <span class="hljs-attr">rect</span>: <span class="hljs-comment">// Object, position, size, etc. of mind map graphics before zoom</span>
  origWidth, <span class="hljs-comment">// Number, canvas width</span>
  origHeight, <span class="hljs-comment">// Number, canvas height</span>
  scaleX, <span class="hljs-comment">// Number, horizontal zoom value of mind map graphics</span>
  scaleY, <span class="hljs-comment">// Number, vertical zoom value of mind map graphics</span>
}
</code></pre>
<h3>render(callback)</h3>
<ul>
<li><code>callback</code>: <code>v0.3.2+</code>, <code>Function</code>, Called when the re-rendering is complete</li>
</ul>
<p>Triggers a full rendering, which will reuse nodes for better performance. If
only the node positions have changed, this method can be called to <code>reRender</code>.</p>
<h3>reRender(callback)</h3>
<ul>
<li><code>callback</code>: <code>v0.3.2+</code>, <code>Function</code>, Called when the re-rendering is complete</li>
</ul>
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
<td>e (event object), dir (up or down scroll), this (Event event class instance) 、isTouchPad（v0.6.1+, Is it an event triggered by the touchpad）</td>
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
<td>node_mouseenter（v0.4.1+）</td>
<td>Node mouseenter event</td>
<td>this (node instance), e (event object)</td>
</tr>
<tr>
<td>node_mouseleave（v0.4.1+）</td>
<td>Node mouseleave event</td>
<td>this (node instance), e (event object)</td>
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
<tr>
<td>rich_text_selection_change（v0.4.0+）</td>
<td>Available when the <code>RichText</code> plugin is registered. Triggered when the text selection area changes when the node is edited</td>
<td>hasRange（Whether there is a selection）、rectInfo（Size and location information of the selected area）、formatInfo（Text formatting information of the selected area）</td>
</tr>
<tr>
<td>transforming-dom-to-images（v0.4.0+）</td>
<td>Available when the <code>RichText</code> plugin is registered. When there is a <code>DOM</code> node in <code>svg</code>, the <code>DOM</code> node will be converted to an image when exporting to an image. This event will be triggered during the conversion process. You can use this event to prompt the user about the node to which you are currently converting</td>
<td>index（Index of the node currently converted to）、len（Total number of nodes to be converted）</td>
</tr>
<tr>
<td>node_dragging（v0.4.5+）</td>
<td>Triggered when a node is dragged</td>
<td>node(The currently dragged node)</td>
</tr>
<tr>
<td>node_dragend（v0.4.5+）</td>
<td>Triggered when the node is dragged and ends</td>
<td></td>
</tr>
<tr>
<td>associative_line_click（v0.4.5+）</td>
<td>Triggered when an associated line is clicked</td>
<td>path(Connector node)、clickPath(Invisible click line node)、node(Start node)、toNode(Target node)</td>
</tr>
<tr>
<td>svg_mouseenter（v0.5.1+）</td>
<td>Triggered when the mouse moves into the SVG canvas</td>
<td>e（event object）</td>
</tr>
<tr>
<td>svg_mouseleave（v0.5.1+）</td>
<td>Triggered when the mouse moves out of the SVG canvas</td>
<td>e（event object）</td>
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
<td>Insert a sibling node, the active node or appoint node will be the operation node. If there are multiple active nodes, only the first one will be effective</td>
<td>openEdit（v0.4.6+, Whether to activate the newly inserted node and enter editing mode, default is <code>true</code>） 、 appointNodes（v0.4.7+, Optional, appoint node, Specifying multiple nodes can pass an array）、 appointData（Optional, Specify the data for the newly created node, Such as {text: 'xxx', ...}, Detailed structure can be referred to <a href="https://github.com/wanglin2/mind-map/blob/main/simple-mind-map/example/exampleData.js">exampleData.js</a> ）</td>
</tr>
<tr>
<td>INSERT_CHILD_NODE</td>
<td>Insert a child node, the active node or appoint node will be the operation node</td>
<td>openEdit（v0.4.6+, Whether to activate the newly inserted node and enter editing mode, default is <code>true</code>）、 appointNodes（v0.4.7+, Optional, appoint node, Specifying multiple nodes can pass an array）、 appointData（Optional, Specify the data for the newly created node, Such as {text: 'xxx', ...}, Detailed structure can be referred to <a href="https://github.com/wanglin2/mind-map/blob/main/simple-mind-map/example/exampleData.js">exampleData.js</a> ）</td>
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
<td>Remove node, the active node or appoint node will be the operation node</td>
<td>appointNodes（v0.4.7+, Optional, appoint node, Specifying multiple nodes can pass an array）</td>
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
<td>node (the node to set), text (the new text for the node), richText（v0.4.0+, If you want to set a rich text character, you need to set it to <code>true</code>）</td>
</tr>
<tr>
<td>SET_NODE_IMAGE</td>
<td>Set Node Image</td>
<td>node (node to set), imgData (object, image information, structured as: <code>{url, title, width, height}</code>, the width and height of the image must be passed)</td>
</tr>
<tr>
<td>SET_NODE_ICON</td>
<td>Set Node Icon</td>
<td>node (node to set), icons (array, predefined image names array, available icons can be obtained in the nodeIconList list in the <a href="https://github.com/wanglin2/mind-map/blob/main/simple-mind-map/src/svg/icons.js">icons.js</a> file, icon name is type_name, such as ['priority_1'])</td>
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
<td>node (node to set), tag (string array, built-in color information can be obtained in <a href="https://github.com/wanglin2/mind-map/blob/main/simple-mind-map/src/constants/constant.js">constant.js</a>)</td>
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
<td>node (the node to set), shape (the shape, all shapes: <a href="https://github.com/wanglin2/mind-map/blob/main/simple-mind-map/src/core/render/node/Shape.js">Shape.js</a>)</td>
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
<blockquote>
<p>You need to register the <code>Export</code> plugin first</p>
</blockquote>
<p>Export</p>
<p><code>type</code>: the type to be exported, optional values: png, svg, json, pdf (v0.2.1+),
smm (essentially also json)</p>
<p><code>isDownload</code>: whether to directly trigger download, Boolean value, default is
<code>false</code></p>
<p><code>fileName</code>: (v0.1.6+) the name of the exported file, default is <code>思维导图</code> (mind
map).</p>
<p>If it is exported as <code>png</code>, the fourth parameter can be passed:</p>
<p><code>transparent</code>: v0.5.7+, <code>Boolean</code>, default is <code>false</code>, Specify whether the background of the exported image is transparent</p>
<p>If it is exported as <code>svg</code>, the fourth parameter can be passed:</p>
<p><code>plusCssText</code>: Additional <code>CSS</code> style. If there is a <code>dom</code> node in <code>svg</code>, you can pass in some styles specific to the node through this parameter</p>
<p>If it is exported as <code>json</code> or <code>smm</code>, the fourth parameter can be passed:</p>
<p><code>withConfig</code>: <code>Boolean</code>, default is <code>true</code>, Specify whether the exported data includes configuration data, otherwise only pure node tree data will be exported</p>
<h3>toPos(x, y)</h3>
<blockquote>
<p>v0.1.5+</p>
</blockquote>
<p>Convert the coordinates of the browser's visible window to coordinates relative
to the canvas.</p>
<h3>addPlugin(plugin, opt)</h3>
<blockquote>
<p>v0.4.0+</p>
</blockquote>
<p>Register plugin, Use <code>MindMap.usePlugin</code> to register plugin only before instantiation, The registered plugin will not take effect after instantiation, So if you want to register the plugin after instantiation, you can use the <code>addPlugin</code> method of the instance.</p>
<h3>removePlugin(plugin)</h3>
<blockquote>
<p>v0.4.0+</p>
</blockquote>
<p>Remove registered plugin, Plugins registered through the <code>usePlugin</code> or <code>addPlugin</code> methods can be removed.</p>

  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>