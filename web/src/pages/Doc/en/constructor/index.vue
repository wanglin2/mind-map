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
<td>Mind map data, Please refer to the introduction of 【Data structure】 below</td>
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
<td>Custom node note content display, object type, structure: {show: (noteContent, left, top, node) =&gt; {// your display node note logic. node is a new parameter added in v0.8.1+ version, representing node instances }, hide: () =&gt; {// your hide node note logic }}</td>
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
<td>Enable node free(Free drag means that nodes can be dragged to any position on the canvas. Please note that it is not a function of dragging nodes to become siblings of other nodes. The connection of free drag may have certain problems, so it is best not to use this feature) drag</td>
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
<td>zoom（v0.9.1+ default is move）</td>
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
<td>mousewheelZoomActionReverse（v0.6.5+）</td>
<td>Boolean</td>
<td>false（v0.9.1+ default is true）</td>
<td>When <code>mousewheelAction</code> is set to <code>zoom</code>, Or when holding down the Ctrl key, the default scrolling forward is to zoom out, and scrolling backward is to zoom in. If this property is set to true, it will be reversed</td>
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
<td>{ color: '#808080', fill: '#fff', fontSize: 13, strokeColor: '#333333' }</td>
<td>Expand the color of the stow button, (The fontSize and strokeColor fields were added in version 0.7.0+to set the text style for displaying the number of nodes when folded)</td>
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
<td>expandBtnNumHandler（v0.7.0+）</td>
<td>Function</td>
<td></td>
<td>Used to customize the content of displaying the number of nodes when folding, receiving a parameter that represents the instance of the folding node, and returning a number or string that represents the final displayed content. For example, when the number is greater than 99, 99 can be displayed+</td>
<td></td>
</tr>
<tr>
<td>isShowExpandNum（v0.7.0+）</td>
<td>Boolean</td>
<td>true</td>
<td>Display the number of folded nodes when they are folded up</td>
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
<td>enableNodeTransitionMove（v0.5.1+）（v0.6.7+ is remove this feature）</td>
<td>Boolean</td>
<td>true</td>
<td>Whether to enable node animation transition</td>
<td></td>
</tr>
<tr>
<td>nodeTransitionMoveDuration（v0.5.1+）（v0.6.7+ is remove this feature）</td>
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
<tr>
<td>customInnerElsAppendTo（v0.6.12+）</td>
<td>null/HTMLElement</td>
<td>null</td>
<td>Specify the location where some internal elements (node text editing element, node note display element, associated line text editing element, node image adjustment button element) are added, and default to document.body</td>
<td></td>
</tr>
<tr>
<td>nodeDragPlaceholderMaxSize（v0.6.12+）</td>
<td>Number</td>
<td>20</td>
<td>When dragging an element, the maximum height of the block indicating the new position of the element</td>
<td></td>
</tr>
<tr>
<td>enableCreateHiddenInput（v0.6.13+）（v0.6.14+ remove this feature）</td>
<td>Boolean</td>
<td>true</td>
<td>Is it allowed to create a hidden input box that will be focused when the node is activated for pasting data and automatically entering the text editing state</td>
<td></td>
</tr>
<tr>
<td>enableAutoEnterTextEditWhenKeydown（v0.6.13+）</td>
<td>Boolean</td>
<td>true</td>
<td>Does it automatically enter text editing mode when pressing the Chinese, English, or numeric buttons when there is an activation node?</td>
<td></td>
</tr>
<tr>
<td>richTextEditFakeInPlace（v0.6.13+）</td>
<td>Boolean</td>
<td>false</td>
<td>Set the rich text node edit box to match the size of the node, creating a pseudo in place editing effect. It should be noted that only when there is only text within the node and the shape is rectangular, can the effect be better</td>
<td></td>
</tr>
<tr>
<td>customHandleClipboardText（v0.6.14+）</td>
<td>Function</td>
<td>null</td>
<td>Customize the processing of clipboard text. When pressing ctrl+v to paste, it will read the text and images from the user's clipboard. By default, it will only determine whether the text is regular text and node data in simple mind map format. If you want to process data from other mind maps, such as process, zhixi, etc., you can pass a function that takes the text from the current clipboard as a parameter and returns the processed data, which can be of two types: 1.If a pure text is returned, a child node will be directly created with that text; 2.Returns a node object in the following format: { simpleMindMap: true, data: { data: { text: '' }, children: [] } }, The representative is data in simple bind map format, and the node data is in the same format as the simple bind map node data. If your processing logic has asynchronous logic, you can also return a promise</td>
<td></td>
</tr>
<tr>
<td>errorHandler（v0.6.15+）</td>
<td>Function</td>
<td></td>
<td>Custom error handling functions currently only throw some asynchronous logic errors. Can pass a function that takes two parameters, the first being the wrong type and the second being the wrong object</td>
<td></td>
</tr>
<tr>
<td>disableMouseWheelZoom（v0.6.15+）</td>
<td>Boolean</td>
<td>false</td>
<td>Prohibit mouse wheel scaling, you can still use the API for scaling</td>
<td></td>
</tr>
<tr>
<td>resetCss（v0.6.16+）</td>
<td>String</td>
<td>* { margin: 0; padding: 0; box-sizing: border-box; }</td>
<td>When exporting images and SVGs, the default style overlay for rich text node content, which is embedded in HTML nodes in SVGs, will occur. If not overlaid, the node content will be offset</td>
<td></td>
</tr>
<tr>
<td>enableDblclickReset（v0.6.17+）(v0.8.0+this attribute has been deleted)</td>
<td>Boolean</td>
<td>true(v0.7.0+changed to false)</td>
<td>Turn on the mouse and double-click to reset the position and zoom of the mind map</td>
<td></td>
</tr>
<tr>
<td>enableDblclickBackToRootNode（v0.8.0+）</td>
<td>Boolean</td>
<td>false</td>
<td>Whether to return to the root node when double clicking with the mouse, that is, to center the display of the root node</td>
<td></td>
</tr>
<tr>
<td>minExportImgCanvasScale（v0.7.0+）</td>
<td>Number</td>
<td>2</td>
<td>The scaling factor of canvas when exporting images and PDFs, which is set to the maximum value of window.devicePixelRatio to improve image clarity</td>
<td></td>
</tr>
<tr>
<td>hoverRectColor（v0.7.0+）</td>
<td>String</td>
<td>rgb(94, 200, 248)</td>
<td>The node mouse hover and the rectangular border color displayed when activated will add a transparency of 0.6 when hovering</td>
<td></td>
</tr>
<tr>
<td>hoverRectPadding（v0.7.0+）</td>
<td>Number</td>
<td>2</td>
<td>The distance between the node mouse hover and the displayed rectangular border when activated and the node content</td>
<td></td>
</tr>
<tr>
<td>selectTextOnEnterEditText（v0.7.0+）</td>
<td>Boolean</td>
<td>true</td>
<td>Is the text selected by default when double-clicking a node to enter node text editing? By default, it will only be selected when creating a new node</td>
<td></td>
</tr>
<tr>
<td>deleteNodeActive（v0.7.1+）</td>
<td>Boolean</td>
<td>true</td>
<td>Enable the function of automatically activating adjacent nodes or parent nodes after deleting nodes</td>
<td></td>
</tr>
<tr>
<td>autoMoveWhenMouseInEdgeOnDrag（v0.7.1+）</td>
<td>Boolean</td>
<td>true</td>
<td>Whether to enable automatic canvas movement when the mouse moves to the edge of the canvas while dragging nodes</td>
<td></td>
</tr>
<tr>
<td>fit（v0.7.1-fix.2+）</td>
<td>Boolean</td>
<td>false</td>
<td>Is the first rendering scaled to fit the canvas size</td>
<td></td>
</tr>
<tr>
<td>dragMultiNodeRectConfig（v0.7.2+）</td>
<td>Object</td>
<td>{ width: 40, height: 20, fill: '' }</td>
<td>The style configuration of the schematic rectangle that moves with the mouse when dragging multiple nodes, passing an object, and the field meanings are the width, height, and fill color of the rectangle</td>
<td></td>
</tr>
<tr>
<td>dragPlaceholderRectFill（v0.7.2+）</td>
<td>String</td>
<td></td>
<td>The filling color of the schematic rectangle for the new position when dragging nodes. If not transmitted, the default color for the connected line is used</td>
<td></td>
</tr>
<tr>
<td>dragOpacityConfig（v0.7.2+）</td>
<td>Object</td>
<td>{ cloneNodeOpacity: 0.5, beingDragNodeOpacity: 0.3 }</td>
<td>The transparency configuration during node dragging, passing an object, and the field meanings are: the transparency of the cloned node or rectangle that follows the mouse movement, and the transparency of the dragged node</td>
<td></td>
</tr>
<tr>
<td>tagsColorMap（v0.7.2+）</td>
<td>Object</td>
<td>{}</td>
<td>The color of a custom node label can be transferred to an object, where key is the label content to be assigned a color, and value is the color of the label content. If not transferred internally, a corresponding color will be generated based on the label content</td>
<td></td>
</tr>
<tr>
<td>cooperateStyle（v0.7.3+）</td>
<td>Object</td>
<td>{ avatarSize: 22, fontSize: 12 }</td>
<td>The configuration of personnel avatar style during node collaboration editing, with field meanings as follows: avatar size, and if it is a text avatar, the size of the text</td>
<td></td>
</tr>
<tr>
<td>associativeLineIsAlwaysAboveNode（v0.8.0+）</td>
<td>Boolean</td>
<td>true</td>
<td>Is the associated line always displayed above the node? If set to false, it will be at the top level when creating and activating the associated line, and in other cases, it will be below the node</td>
<td></td>
</tr>
<tr>
<td>defaultGeneralizationText（v0.8.0+）</td>
<td>String</td>
<td>概要</td>
<td>Insert default text for summary</td>
<td></td>
</tr>
<tr>
<td>handleIsSplitByWrapOnPasteCreateNewNode（v0.8.0+）</td>
<td>Function / null</td>
<td>null</td>
<td>When creating a new node by pasting text, control whether to automatically split the nodes based on line breaks. If there is a line break, multiple nodes will be created based on the line break. Otherwise, only one node will be created, and a function can be passed to return promise. resolve represents splitting based on line breaks, and reject represents ignoring line breaks</td>
<td></td>
</tr>
<tr>
<td>addHistoryTime（v0.8.0+）</td>
<td>Number</td>
<td>100</td>
<td>Only one historical record can be added within the specified time to avoid adding unnecessary intermediate states. Unit: ms</td>
<td></td>
</tr>
<tr>
<td>isDisableDrag（v0.8.1+）</td>
<td>Boolean</td>
<td>false</td>
<td>Is disable dragging the canvas</td>
<td></td>
</tr>
<tr>
<td>disableTouchZoom（v0.8.1+）</td>
<td>Boolean</td>
<td>false</td>
<td>Prohibit double finger scaling, you can still use the API for scaling, which takes effect on the TouchEvent plugin</td>
<td></td>
</tr>
<tr>
<td>highlightNodeBoxStyle（v0.9.0+）</td>
<td>Object</td>
<td>{ stroke: 'rgb(94, 200, 248)', fill: 'transparent' }</td>
<td>Highlight box style when the mouse moves into the summary to highlight the node it belongs to</td>
<td></td>
</tr>
<tr>
<td>createNewNodeBehavior（v0.9.1+）</td>
<td>String</td>
<td>default</td>
<td>Behavior when creating a new node. default（By default, newly created nodes will be activated and enter editing mode. If multiple new nodes are created simultaneously, they will only be activated and will not enter editing mode）、notActive（Do not activate newly created nodes）、activeOnly（Only activate newly created nodes and do not enter editing mode）</td>
<td></td>
</tr>
</tbody>
</table>
<h3>Data structure</h3>
<p>The basic data structure is as follows:</p>
<pre class="hljs"><code>{
  <span class="hljs-attr">data</span>: {
    <span class="hljs-attr">text</span>: <span class="hljs-string">&#x27;&#x27;</span>, <span class="hljs-comment">// The text of the node can be rich text, which is in HTML format. In this case, richText should be set to true</span>
    <span class="hljs-attr">richText</span>: <span class="hljs-literal">false</span>, <span class="hljs-comment">// Is the text of the node in rich text mode</span>
    <span class="hljs-attr">expand</span>: <span class="hljs-literal">true</span>, <span class="hljs-comment">// Whether the node is expanded</span>
    <span class="hljs-attr">uid</span>: <span class="hljs-string">&#x27;&#x27;</span>,<span class="hljs-comment">// The unique ID of the node, which may not be passed, will be generated internally</span>
    <span class="hljs-attr">icon</span>: [], <span class="hljs-comment">// The format of the icon can be found in the &quot;插入和扩展节点图标&quot; section of the tutorial</span>
    <span class="hljs-attr">image</span>: <span class="hljs-string">&#x27;&#x27;</span>, <span class="hljs-comment">// URL of the image</span>
    <span class="hljs-attr">imageTitle</span>: <span class="hljs-string">&#x27;&#x27;</span>, <span class="hljs-comment">// The title of the image can be blank</span>
    <span class="hljs-attr">imageSize</span>: { <span class="hljs-comment">// The size of the image</span>
      <span class="hljs-attr">width</span>: <span class="hljs-number">100</span>, <span class="hljs-comment">// The width of the image, mandatory</span>
      <span class="hljs-attr">height</span>: <span class="hljs-number">100</span>, <span class="hljs-comment">// The height of the image is mandatory</span>
      <span class="hljs-attr">custom</span>: <span class="hljs-literal">false</span> <span class="hljs-comment">// If set to true, the display size of the image is not controlled by the theme, and is based on imageSize.width and imageSize.height</span>
    },
    <span class="hljs-attr">hyperlink</span>: <span class="hljs-string">&#x27;&#x27;</span>, <span class="hljs-comment">// Hyperlink address</span>
    <span class="hljs-attr">hyperlinkTitle</span>: <span class="hljs-string">&#x27;&#x27;</span>, <span class="hljs-comment">// Title of hyperlink</span>
    <span class="hljs-attr">note</span>: <span class="hljs-string">&#x27;&#x27;</span>, <span class="hljs-comment">// Content of remarks</span>
    <span class="hljs-attr">tag</span>: [], <span class="hljs-comment">// Tag list</span>
    <span class="hljs-attr">generalization</span>: {<span class="hljs-comment">// The summary of the node, if there is no summary, the generalization can be set to null</span>
      <span class="hljs-attr">text</span>: <span class="hljs-string">&#x27;&#x27;</span><span class="hljs-comment">// Summary Text</span>
    },
    <span class="hljs-attr">associativeLineTargets</span>: [<span class="hljs-string">&#x27;&#x27;</span>],<span class="hljs-comment">// If there are associated lines, then it is the uid list of the target node</span>
    <span class="hljs-attr">associativeLineText</span>: <span class="hljs-string">&#x27;&#x27;</span>,<span class="hljs-comment">// Association Line Text</span>
    <span class="hljs-comment">// ...For other style fields, please refer to the topic</span>
  },
  children [<span class="hljs-comment">// Child nodes, with consistent structure and root nodes</span>
    {
      <span class="hljs-attr">data</span>: {},
      <span class="hljs-attr">children</span>: []
    }
  ]
}
</code></pre>
<p>If you want to add custom fields, you can add them to the same level as 'data' and 'children'. If you want to add them to the 'data' object, please use the <code>_</code> Name your custom field at the beginning, and it will be used internally to determine whether it is a custom field.</p>
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
<h2>Instance props</h2>
<h3>el</h3>
<p>Container element.</p>
<h3>opt</h3>
<p>Config options object.</p>
<h3>svg</h3>
<blockquote>
<p>@svgdotjs/svg.js library calls the node instance returned by the SVG() method</p>
</blockquote>
<p>Canvas SVG element.</p>
<h3>draw</h3>
<blockquote>
<p>@svgdotjs/svg.js library calls the node instance returned by the group() method</p>
<p>Child node of SVG node</p>
</blockquote>
<p>Container element, used to carry content such as nodes and connections.</p>
<h3>lineDraw</h3>
<blockquote>
<p>v0.8.0+</p>
<p>@svgdotjs/svg.js library calls the node instance returned by the group() method</p>
<p>Child node of draw node</p>
</blockquote>
<p>Container for node wiring elements.</p>
<h3>nodeDraw</h3>
<blockquote>
<p>v0.8.0+</p>
<p>@svgdotjs/svg.js library calls the node instance returned by the group() method</p>
<p>Child node of draw node</p>
</blockquote>
<p>Container for node elements.</p>
<h3>associativeLineDraw</h3>
<blockquote>
<p>v0.8.0+</p>
<p>@svgdotjs/svg.js library calls the node instance returned by the group() method</p>
<p>Available when the associated line plugin is registered</p>
<p>Child node of draw node</p>
</blockquote>
<p>Container for associative line content.</p>
<h3>otherDraw</h3>
<blockquote>
<p>v0.8.0+</p>
<p>@svgdotjs/svg.js library calls the node instance returned by the group() method</p>
<p>Child node of draw node</p>
</blockquote>
<p>Container for other content.</p>
<h3>elRect</h3>
<p>The size and position information of the container element 'el'. The return result of calling the 'getBoundingClientRect()' method.</p>
<h3>width</h3>
<p>The width of the container element 'el'.</p>
<h3>height</h3>
<p>The height of the container element 'el'.</p>
<h3>themeConfig</h3>
<p>Current Theme Configuration.</p>
<h2>Instance methods</h2>
<h3>clearDraw()</h3>
<blockquote>
<p>v0.8.0+</p>
</blockquote>
<p>Clear <code>lineDraw</code>、<code>associativeLineDraw</code>、<code>nodeDraw</code>、<code>otherDraw</code> containers.</p>
<h3>destroy()</h3>
<blockquote>
<p>v0.6.0+</p>
</blockquote>
<p>Destroy mind maps. It will remove registered plugins, remove listening events, and delete all nodes on the canvas.</p>
<h3>getSvgData({ paddingX = 0, paddingY = 0, ignoreWatermark = false })</h3>
<blockquote>
<p>v0.3.0+</p>
</blockquote>
<p><code>paddingX</code>: Padding x</p>
<p><code>paddingY</code>: Padding y</p>
<p><code>ignoreWatermark</code>：v0.8.0+, Do not draw watermarks. If you do not need to draw watermarks, you can pass 'true' because drawing watermarks is very slow</p>
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
<td>node_img_mouseenter（v0.6.5+）</td>
<td>Node image mouseenter event</td>
<td>this（node instance）、imgNode（img node）、e（event object）</td>
</tr>
<tr>
<td>node_img_mouseleave（v0.6.5+）</td>
<td>Node image mouseleave event</td>
<td>this（node instance）、imgNode（img node）、e（event object）</td>
</tr>
<tr>
<td>node_img_mousemove（v0.6.5+）</td>
<td>Node image mousemove event</td>
<td>this（node instance）、imgNode（img node）、e（event object）</td>
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
<td>{ overlapNodeUid, prevNodeUid, nextNodeUid }（v0.6.12+，The node uid to which the node is moved this time, for example, if it is moved to node A, then the overlayNodeUid is the uid of node A. If it is moved to the front of node B, then the nextNodeUid is the uid of node B. You can obtain the node instance through the mindMap. extender.findNodeByUid(uid) method）</td>
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
<tr>
<td>node_icon_click（v0.6.10+）</td>
<td>Triggered when clicking on an icon within a node</td>
<td>this（node instance）、item（Click on the icon name）、e（event object）</td>
</tr>
<tr>
<td>view_theme_change（v0.6.12+）</td>
<td>Triggered after calling the setTheme method to set the theme</td>
<td>theme（theme name）</td>
</tr>
<tr>
<td>set_data（v0.7.3+）</td>
<td>Triggered when the setData method is called to dynamically set mind map data</td>
<td>data（New Mind Map Data）</td>
</tr>
<tr>
<td>resize（v0.8.0+）</td>
<td>Triggered after the container size changes, actually when the 'resize' method of the mind map instance is called</td>
<td></td>
</tr>
<tr>
<td>beforeDestroy（v0.9.0+）</td>
<td>Triggered before destroying the mind map, i.e. triggered by calling the destroy method</td>
<td></td>
</tr>
</tbody>
</table>
<h3>emit(event, ...args)</h3>
<p>Trigger an event, which can be one of the events listed above or a custom event.</p>
<h3>off(event, fn)</h3>
<p>Unbind an event.</p>
<h3>setTheme(theme, notRender = false)</h3>
<ul>
<li><code>notRender</code>: v0.8.0+, Is not call the render method to update the canvas.</li>
</ul>
<p>Switches the theme. Available themes can be found in the options table above.</p>
<h3>getTheme()</h3>
<p>Gets the current theme.</p>
<h3>setThemeConfig(config, notRender = false)</h3>
<ul>
<li><code>notRender</code>: v0.8.0+, Is not call the render method to update the canvas.</li>
</ul>
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
<h3>setLayout(layout, notRender = false)</h3>
<ul>
<li><code>notRender</code>: v0.8.0+, Is not call the render method to update the canvas.</li>
</ul>
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
<td>Insert a sibling node, the active node or appoint node will be the operation node. If there are multiple active nodes, only the first one will be effective（v0.7.2+Supports simultaneous insertion of sibling nodes into multiple active nodes）</td>
<td>openEdit（v0.4.6+, Whether to activate the newly inserted node and enter editing mode, default is <code>true</code>） 、 appointNodes（v0.4.7+, Optional, appoint node, Specifying multiple nodes can pass an array）、 appointData（Optional, Specify the data for the newly created node, Such as {text: 'xxx', ...}, Detailed structure can be referred to <a href="https://github.com/wanglin2/mind-map/blob/main/simple-mind-map/example/exampleData.js">exampleData.js</a> ）、 appointChildren（v0.6.14+, Optional, Specify the child nodes of the newly created node, array type）</td>
</tr>
<tr>
<td>INSERT_CHILD_NODE</td>
<td>Insert a child node, the active node or appoint node will be the operation node</td>
<td>openEdit（v0.4.6+, Whether to activate the newly inserted node and enter editing mode, default is <code>true</code>）、 appointNodes（v0.4.7+, Optional, appoint node, Specifying multiple nodes can pass an array）、 appointData（Optional, Specify the data for the newly created node, Such as {text: 'xxx', ...}, Detailed structure can be referred to <a href="https://github.com/wanglin2/mind-map/blob/main/simple-mind-map/example/exampleData.js">exampleData.js</a> ）、 appointChildren（v0.6.14+, Optional, Specify the child nodes of the newly created node, array type）</td>
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
<td>Modify node single style</td>
<td>node (the node to set the style of), prop (style property), value (style property value), isActive (v0.7.0+has been abandoned, boolean, whether the style being set is for the active state)</td>
</tr>
<tr>
<td>SET_NODE_STYLEs（v0.6.12+）</td>
<td>Modify multiple styles of nodes</td>
<td>node（the node to set the style of）、style（Style object，key is style prop，value is style value）、isActive（v0.7.0+has been abandoned, boolean, whether the style being set is for the active state）</td>
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
<td>node (the node to set), text (the new text for the node), richText（v0.4.0+, If you want to set a rich text character, you need to set it to <code>true</code>）、resetRichText（v0.6.10+Do you want to reset rich text? The default is false. If true is passed, the style of the rich text node will be reset）</td>
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
<td>node (node to move, (v0.7.2+supports passing node arrays to move multiple nodes simultaneously)), exist (target node)</td>
</tr>
<tr>
<td>INSERT_BEFORE (v0.1.5+)</td>
<td>Move Node to Before Another Node</td>
<td>node (node to move, (v0.7.2+supports passing node arrays to move multiple nodes simultaneously)), exist (target node)</td>
</tr>
<tr>
<td>MOVE_NODE_TO (v0.1.5+)</td>
<td>Move a node as a child of another node</td>
<td>node (the node to move, (v0.7.2+supports passing node arrays to move multiple nodes simultaneously)), toNode (the target node)</td>
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
<tr>
<td>GO_TARGET_NODE（v0.6.7+）</td>
<td>Navigate to a node, and if the node is collapsed, it will automatically expand to that node</td>
<td>node（Node instance or node uid to locate）、callback（v0.6.9+, Callback function after positioning completion）</td>
</tr>
<tr>
<td>INSERT_MULTI_NODE（v0.7.2+）</td>
<td>Insert multiple sibling nodes into the specified node at the same time, with the operating node being the currently active node or the specified node</td>
<td>appointNodes（Optional, specify nodes, specify multiple nodes to pass an array）, nodeList（Data list of newly inserted nodes, array type）</td>
</tr>
<tr>
<td>INSERT_MULTI_CHILD_NODE（v0.7.2+）</td>
<td>Insert multiple child nodes into the specified node simultaneously, with the operation node being the currently active node or the specified node</td>
<td>appointNodes（Optional, specify nodes, specify multiple nodes to pass an array）, childList（Data list of newly inserted nodes, array type）</td>
</tr>
<tr>
<td>INSERT_FORMULA（v0.7.2+）</td>
<td>Insert mathematical formulas into nodes, operate on the currently active node or specified node</td>
<td>formula（Mathematical formula to insert, LaTeX syntax）, appointNodes（Optional, specify the node to insert the formula into. Multiple nodes can be passed as arrays, otherwise it defaults to the currently active node）</td>
</tr>
<tr>
<td>INSERT_PARENT_NODE（v0.8.0+）</td>
<td>Insert a parent node into the specified node, with the operation node being the currently active node or the specified node</td>
<td>openEdit（Activate the newly inserted node and enter editing mode, default to 'true'`）、 appointNodes（Optional, specify the node to insert into the parent node, and specify that multiple nodes can pass an array）、 appointData（Optional, specify the data for the newly created node, such as {text: 'xxx', ...}, Detailed structure can be referenced <a href="https://github.com/wanglin2/mind-map/blob/main/simple-mind-map/example/exampleData.js">exampleData.js</a>）</td>
</tr>
<tr>
<td>REMOVE_CURRENT_NODE（v0.8.0+）</td>
<td>Delete only the current node, operate on the currently active node or specified node</td>
<td>appointNodes（Optional, specify the nodes to be deleted, and multiple nodes can be passed as an array）</td>
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