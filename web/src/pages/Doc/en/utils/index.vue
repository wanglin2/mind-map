<template>
  <div>
    <h1>Utility Methods</h1>
<h2>Base utility Methods</h2>
<p>Reference:</p>
<pre class="hljs"><code><span class="hljs-keyword">import</span> {walk, ...} <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;simple-mind-map/src/utils&#x27;</span>
</code></pre>
<h3>Methods</h3>
<h4>resizeImgSizeByOriginRatio(width, height, newWidth, newHeight)</h4>
<blockquote>
<p>v0.6.5+</p>
</blockquote>
<p><code>width</code>: The original width of the image</p>
<p><code>height</code>：The original height of the image</p>
<p><code>newWidth</code>：Width to zoom in to</p>
<p><code>newHeight</code>：Height to zoom in to</p>
<p>Scale the image proportionally. Zoom to the specified size of <code>newWidth</code> and <code>newHeight</code> while maintaining the original aspect ratio of the image.</p>
<h4>walk(root, parent, beforeCallback, afterCallback, isRoot, layerIndex = 0, index = 0)</h4>
<p>Depth-first traversal of a tree</p>
<p><code>root</code>: the root node of the tree to be traversed</p>
<p><code>parent</code>: parent node</p>
<p><code>beforeCallback</code>: preorder traversal callback function, callback parameters are:
root, parent, isRoot, layerIndex, index</p>
<p><code>afterCallback</code>: postorder traversal callback function, callback parameters are:
root, parent, isRoot, layerIndex, index</p>
<p><code>isRoot</code>: whether it is the root node</p>
<p><code>layerIndex</code>: node level</p>
<p><code>index</code>: index of the node among its siblings</p>
<p>Example:</p>
<pre class="hljs"><code>walk(tree, <span class="hljs-literal">null</span>, <span class="hljs-function">() =&gt;</span> {}, <span class="hljs-function">() =&gt;</span> {}, <span class="hljs-literal">false</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>);
</code></pre>
<h4>bfsWalk(root, callback)</h4>
<p>Breadth-first traversal of a tree</p>
<h4>resizeImgSize(width, height, maxWidth, maxHeight)</h4>
<p>Resize image size</p>
<p><code>width</code>: original width of the image</p>
<p><code>height</code>: original height of the image</p>
<p><code>maxWidth</code>: the width to resize to</p>
<p><code>maxHeight</code>: the height to resize to</p>
<p><code>maxWidth</code> and <code>maxHeight</code> can both be passed, or only one of them can be passed</p>
<h4>resizeImg(imgUrl, maxWidth, maxHeight)</h4>
<p>Resize image, internally loads the image first, then calls the <code>resizeImgSize</code>
method, and returns a <code>promise</code></p>
<h4>simpleDeepClone(data)</h4>
<p>Extremely simple deep copy method, can only be used for objects that are all
basic data, otherwise it will throw an error</p>
<h4>copyRenderTree(tree, root)</h4>
<p>Copy render tree data, example:</p>
<pre class="hljs"><code>copyRenderTree({}, <span class="hljs-built_in">this</span>.mindMap.renderer.renderTree);
</code></pre>
<h4>copyNodeTree(tree, root, removeActiveState, keepId)</h4>
<ul>
<li>
<p><code>removeActiveState</code>: <code>Boolean</code>, default is <code>false</code>, Whether to remove the active state of the node</p>
</li>
<li>
<p><code>removeId</code>：v0.7.3-fix.1+, Is remove the uid from the node data, default is <code>true</code></p>
</li>
</ul>
<blockquote>
<ul>
<li><code>keepId</code>: (Original fourth parameter) v0.4.6+, <code>Boolean</code>, default is <code>false</code>, Whether to retain the <code>id</code> of the replicated node will be deleted by default to prevent duplicate node <code>id</code>. However, for mobile node scenarios, the original <code>id</code> of the node needs to be retained</li>
</ul>
</blockquote>
<p>Copy node tree data, mainly eliminating the reference <code>node</code> instance <code>_node</code>
and copying the <code>data</code> of the data object, example:</p>
<pre class="hljs"><code>copyNodeTree({}, node);
</code></pre>
<h4>imgToDataUrl(src)</h4>
<p>Convert image to dataURL</p>
<h4>downloadFile(file, fileName)</h4>
<p>Download file</p>
<h4>throttle(fn, time = 300, ctx)</h4>
<p>Throttle function</p>
<h4>asyncRun(taskList, callback = () =&gt; {})</h4>
<p>Run tasks in task list asynchronously, tasks are run synchronously without order</p>
<h4>degToRad(deg)</h4>
<blockquote>
<p>v0.2.24+</p>
</blockquote>
<p>Angle to radian</p>
<h4>camelCaseToHyphen(str)</h4>
<blockquote>
<p>v0.2.24+</p>
</blockquote>
<p>CamelCase to hyphen</p>
<h4>joinFontStr({ italic, bold, fontSize, fontFamily })</h4>
<blockquote>
<p>v0.3.4+</p>
</blockquote>
<p>Join the <code>font</code> attribute value of the <code>css</code> font</p>
<h4>measureText(text, { italic, bold, fontSize, fontFamily })</h4>
<blockquote>
<p>v0.3.4+</p>
</blockquote>
<p>Measure the width and height of the text, return value:</p>
<pre class="hljs"><code>{ width, height }
</code></pre>
<h4>getTextFromHtml(html)</h4>
<p>Extract plain text content from an HTML string.</p>
<h4>readBlob(blob)</h4>
<blockquote>
<p>v0.5.9+</p>
</blockquote>
<p>Convert <code>blob</code> data to <code>data:url</code> data.</p>
<h4>parseDataUrl(data)</h4>
<blockquote>
<p>v0.6.6+</p>
</blockquote>
<p>Parse <code>data:url</code> data, return:</p>
<pre class="hljs"><code>{
  type,<span class="hljs-comment">// file type of data</span>
  base64<span class="hljs-comment">// base64 data</span>
}
</code></pre>
<h4>getImageSize(src)</h4>
<blockquote>
<p>v0.6.6+</p>
</blockquote>
<ul>
<li><code>src</code>: The url of img</li>
</ul>
<p>Get the size of image, return:</p>
<pre class="hljs"><code>{
  width,
  height
}
</code></pre>
<h4>loadImage(imgFile)</h4>
<blockquote>
<p>v0.6.8+</p>
</blockquote>
<ul>
<li><code>imgFile</code>: File object of image type</li>
</ul>
<p>Load image, return:</p>
<pre class="hljs"><code>{
  url,<span class="hljs-comment">// DataUrl</span>
  size<span class="hljs-comment">// { width, height } width and height of image</span>
}
</code></pre>
<h4>getType(data)</h4>
<blockquote>
<p>v0.6.9+</p>
</blockquote>
<p>Get the type of a data, such as <code>Boolean</code>、<code>Array</code>.</p>
<h4>removeHtmlStyle(html)</h4>
<blockquote>
<p>v0.6.10+</p>
</blockquote>
<p>Remove the inline style of nodes in the HTML string.</p>
<h4>addHtmlStyle(html, tag, style)</h4>
<blockquote>
<p>v0.6.10+</p>
</blockquote>
<p>Add inline styles to the specified tags in the HTML tag.</p>
<h4>checkIsRichText(str)</h4>
<blockquote>
<p>v0.6.10+</p>
</blockquote>
<p>Check if a string is a rich text character.</p>
<h4>isWhite(color)</h4>
<blockquote>
<p>v0.6.11+</p>
</blockquote>
<p>Determine whether a color is white.</p>
<h4>isTransparent(color)</h4>
<blockquote>
<p>v0.6.11+</p>
</blockquote>
<p>Determine whether a color is transparent.</p>
<h4>nodeRichTextToTextWithWrap(html)</h4>
<blockquote>
<p>v0.6.12+</p>
</blockquote>
<p>Convert the rich text content of nodes in the form of <code>&lt;p&gt;&lt;span&gt;&lt;/span&gt;&lt;p&gt;</code> into text wrapped in <code>\n</code>.</p>
<h4>textToNodeRichTextWithWrap(html)</h4>
<blockquote>
<p>v0.6.12+</p>
</blockquote>
<p>Convert the wrapped text of <code>&lt;br&gt;</code> into node rich text content in the form of <code>&lt;p&gt;&lt;span&gt;&lt;/span&gt;&lt;p&gt;</code>.</p>
<h4>isMobile()</h4>
<blockquote>
<p>v0.6.13+</p>
</blockquote>
<p>Determine if it is a mobile environment.</p>
<h4>getTopAncestorsFomNodeList(list)</h4>
<blockquote>
<p>v0.7.2+</p>
</blockquote>
<ul>
<li><code>list</code>: Arrray, Node instance list.</li>
</ul>
<p>Find the top-level node list from the node instance list.</p>
<h4>checkTwoRectIsOverlap(minx1, maxx1, miny1, maxy1, minx2, maxx2, miny2, maxy2)</h4>
<blockquote>
<p>v0.7.2+</p>
</blockquote>
<p>The parameter is the position of two rectangles.</p>
<p>Determine if two rectangles overlap.</p>
<h4>focusInput(el)</h4>
<blockquote>
<p>v0.7.2+</p>
</blockquote>
<ul>
<li><code>el</code>: DOM nodes, elements that can be focused, typically input box elements.</li>
</ul>
<p>Focus on the specified input box.</p>
<h4>selectAllInput(el)</h4>
<blockquote>
<p>v0.7.2+</p>
</blockquote>
<ul>
<li><code>el</code>: DOM nodes, elements that can be focused, typically input box elements.</li>
</ul>
<p>Focus and select all specified input boxes.</p>
<h4>addDataToAppointNodes(appointNodes, data = {})</h4>
<blockquote>
<p>v0.7.2+</p>
</blockquote>
<ul>
<li>
<p><code>appointNodes</code>：Node instance list, array type.</p>
</li>
<li>
<p><code>data</code>：The data to be attached to all nodes in the specified node instance list tree.</p>
</li>
</ul>
<p>Adding additional data to the specified node list tree data will modify the original data.</p>
<h4>createUidForAppointNodes(appointNodes, createNewId)</h4>
<blockquote>
<p>v0.7.2+</p>
</blockquote>
<ul>
<li>
<p><code>appointNodes</code>：Node instance list, array type.</p>
</li>
<li>
<p><code>createNewId</code>：v0.7.3-fix.1+, <code>Boolean</code>, default is <code>false</code>, If the node does not have a 'uid', a new 'uid' will be created. If 'true' is passed, a new 'uid' will be created regardless of whether the node data originally exists or not`</p>
</li>
</ul>
<p>Adding a uid to the specified node list tree data (if the uid does not exist) will modify the original data.</p>
<h4>getNodeIndex(node)</h4>
<blockquote>
<p>v0.7.2+</p>
</blockquote>
<ul>
<li><code>node</code>：Node instance.</li>
</ul>
<p>Gets the position index of a node within its peers.</p>
<h4>mergerIconList(list)</h4>
<blockquote>
<p>v0.7.2+</p>
</blockquote>
<ul>
<li><code>list</code>：The array of node icons to be merged into the library.</li>
</ul>
<pre class="hljs"><code><span class="hljs-comment">// const data = [</span>
<span class="hljs-comment">//   { type: &#x27;priority&#x27;, name: &#x27;优先级图标&#x27;, list: [{ name: &#x27;1&#x27;, icon: &#x27;a&#x27; }, { name: 2, icon: &#x27;b&#x27; }] },</span>
<span class="hljs-comment">//   { type: &#x27;priority&#x27;, name: &#x27;优先级图标&#x27;, list: [{ name: &#x27;2&#x27;, icon: &#x27;c&#x27; }, { name: 3, icon: &#x27;d&#x27; }] },</span>
<span class="hljs-comment">// ];</span>

<span class="hljs-comment">// mergerIconList(data)  result:</span>

<span class="hljs-comment">// [</span>
<span class="hljs-comment">//   { type: &#x27;priority&#x27;, name: &#x27;优先级图标&#x27;, list: [{ name: &#x27;1&#x27;, icon: &#x27;a&#x27; }, { name: 2, icon: &#x27;c&#x27; }, { name: 3, icon: &#x27;d&#x27; }] },</span>
<span class="hljs-comment">// ]</span>
</code></pre>
<p>Merge icon arrays.</p>
<h4>htmlEscape(str)</h4>
<blockquote>
<p>v0.7.2+</p>
</blockquote>
<ul>
<li><code>str</code>：String.</li>
</ul>
<p>Escape the incoming string, currently escaping the following three characters:</p>
<pre class="hljs"><code>&amp; -&gt; &amp;amp;
&lt; -&gt; &amp;lt;
&gt; -&gt; &amp;gt;
</code></pre>
<h4>generateColorByContent(str)</h4>
<blockquote>
<p>v0.7.2+</p>
</blockquote>
<ul>
<li><code>str</code>：String.</li>
</ul>
<p>Generate colors based on incoming content, and the same content will generate the same color.</p>
<h4>isSameObject(a, b)</h4>
<blockquote>
<p>v0.7.3+</p>
</blockquote>
<ul>
<li><code>a</code>、<code>b</code>: Object | Array, Two objects to compare</li>
</ul>
<p>Determine whether two objects are the same, only handling objects or arrays.</p>
<h4>getNodeDataIndex(node)</h4>
<blockquote>
<p>v0.8.0+</p>
</blockquote>
<p>Gets the position index of a node within its sibling nodes.</p>
<h4>getNodeIndexInNodeList(node, nodeList)</h4>
<blockquote>
<p>v0.8.0+</p>
</blockquote>
<p>Find the index of a node from a list of nodes.</p>
<h4>setDataToClipboard(data)</h4>
<blockquote>
<p>v0.8.0+</p>
</blockquote>
<ul>
<li><code>data</code>：Object | Array</li>
</ul>
<p>Set data to the user clipboard.</p>
<h4>getDataFromClipboard()</h4>
<blockquote>
<p>v0.8.0+</p>
</blockquote>
<p>Reading text and images from the user's clipboard returns:</p>
<pre class="hljs"><code>{
  text,
  img
}
</code></pre>
<h4>removeFromParentNodeData(node)</h4>
<blockquote>
<p>v0.8.0+</p>
</blockquote>
<p>Remove the data of a node from its parent node's <code>nodeData.children</code> list.</p>
<h4>checkHasSupSubRelation()</h4>
<blockquote>
<p>v0.8.1+</p>
</blockquote>
<p>Determine whether there is a hierarchical relationship from the given node instance list.</p>
<h4>handleSelfCloseTags(str)</h4>
<blockquote>
<p>v0.9.1+</p>
</blockquote>
<ul>
<li><code>str</code>: html string</li>
</ul>
<p>Add a closed state to HTML self closing tags, <code>&lt;div&gt;&lt;img src=&quot;xxx&quot;&gt;&lt;/div&gt;</code> -&gt; <code>&lt;div&gt;&lt;img src=&quot;xxx&quot; /&gt;&lt;/div&gt;</code>。</p>
<h4>checkNodeListIsEqual(list1, list2)</h4>
<blockquote>
<p>v0.9.1+</p>
</blockquote>
<ul>
<li><code>list1/list2</code>: Node instance list</li>
</ul>
<p>Check if the two node instance lists contain the same nodes.</p>
<h2>Simulate CSS background in Canvas</h2>
<p>Import:</p>
<pre class="hljs"><code><span class="hljs-keyword">import</span> drawBackgroundImageToCanvas <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;simple-mind-map/src/utils/simulateCSSBackgroundInCanvas&#x27;</span>
</code></pre>
<p>Usage：</p>
<pre class="hljs"><code><span class="hljs-keyword">let</span> width = <span class="hljs-number">500</span>
<span class="hljs-keyword">let</span> height = <span class="hljs-number">500</span>
<span class="hljs-keyword">let</span> img = <span class="hljs-string">&#x27;/1.jpg&#x27;</span>
<span class="hljs-keyword">let</span> canvas = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">&#x27;canvas&#x27;</span>)
canvas.width = width
canvas.height = height
drawBackgroundImageToCanvas(ctx, width, height, img, {
  <span class="hljs-attr">backgroundRepeat</span>: <span class="hljs-string">&#x27;repeat-y&#x27;</span>,
  <span class="hljs-attr">backgroundSize</span>: <span class="hljs-string">&#x27;60%&#x27;</span>,
  <span class="hljs-attr">backgroundPosition</span>: <span class="hljs-string">&#x27;center center&#x27;</span>
}, <span class="hljs-function">(<span class="hljs-params">err</span>) =&gt;</span> {
  <span class="hljs-keyword">if</span> (err) {
    <span class="hljs-comment">// fail</span>
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-comment">// success</span>
  }
})
</code></pre>
<h2>LRU cache class</h2>
<blockquote>
<p>v0.5.10+</p>
</blockquote>
<p>Import:</p>
<pre class="hljs"><code><span class="hljs-keyword">import</span> Lru <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;simple-mind-map/src/utils/Lru.js&#x27;</span>
</code></pre>
<h3>Constructor</h3>
<pre class="hljs"><code><span class="hljs-keyword">let</span> lru = <span class="hljs-keyword">new</span> Lru(max)
</code></pre>
<p><code>max</code>: Specify the maximum number of caches.</p>
<h3>Instance properties</h3>
<h4>size</h4>
<p>The current number of caches.</p>
<h4>pool</h4>
<p>Get cache pool.</p>
<h3>Instance methods</h3>
<h4>add(key, value)</h4>
<p>Add cache.</p>
<h4>delete(key)</h4>
<p>Delete cache.</p>
<h4>has(key)</h4>
<p>Check if a cache exists.</p>
<h4>get(key)</h4>
<p>Gets the value of a cache.</p>

  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>