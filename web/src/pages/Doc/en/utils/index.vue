<template>
  <div>
    <h1>Utility Methods</h1>
<h2>Base utility Methods</h2>
<p>Reference:</p>
<pre class="hljs"><code><span class="hljs-keyword">import</span> {walk, ...} <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;simple-mind-map/src/utils&#x27;</span>
</code></pre>
<h3>Methods</h3>
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
<p><code>keepId</code>: v0.4.6+, <code>Boolean</code>, default is <code>false</code>, Whether to retain the <code>id</code> of the replicated node will be deleted by default to prevent duplicate node <code>id</code>. However, for mobile node scenarios, the original <code>id</code> of the node needs to be retained</p>
</li>
</ul>
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