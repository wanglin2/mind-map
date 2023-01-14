<template>
  <div>
    <h1>Utility Methods</h1>
<p>Reference:</p>
<pre class="hljs"><code><span class="hljs-keyword">import</span> {walk, ...} <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;simple-mind-map/src/utils&#x27;</span>
</code></pre>
<h2>Methods</h2>
<h3>walk(root, parent, beforeCallback, afterCallback, isRoot, layerIndex = 0, index = 0)</h3>
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
<h3>bfsWalk(root, callback)</h3>
<p>Breadth-first traversal of a tree</p>
<h3>resizeImgSize(width, height, maxWidth, maxHeight)</h3>
<p>Resize image size</p>
<p><code>width</code>: original width of the image</p>
<p><code>height</code>: original height of the image</p>
<p><code>maxWidth</code>: the width to resize to</p>
<p><code>maxHeight</code>: the height to resize to</p>
<p><code>maxWidth</code> and <code>maxHeight</code> can both be passed, or only one of them can be passed</p>
<h3>resizeImg(imgUrl, maxWidth, maxHeight)</h3>
<p>Resize image, internally loads the image first, then calls the <code>resizeImgSize</code>
method, and returns a <code>promise</code></p>
<h3>simpleDeepClone(data)</h3>
<p>Extremely simple deep copy method, can only be used for objects that are all
basic data, otherwise it will throw an error</p>
<h3>copyRenderTree(tree, root)</h3>
<p>Copy render tree data, example:</p>
<pre class="hljs"><code>copyRenderTree({}, <span class="hljs-built_in">this</span>.mindMap.renderer.renderTree);
</code></pre>
<h3>copyNodeTree(tree, root)</h3>
<p>Copy node tree data, mainly eliminating the reference <code>node</code> instance <code>_node</code>
and copying the <code>data</code> of the data object, example:</p>
<pre class="hljs"><code>copyNodeTree({}, node);
</code></pre>
<h3>imgToDataUrl(src)</h3>
<p>Convert image to dataURL</p>
<h3>downloadFile(file, fileName)</h3>
<p>Download file</p>
<h3>throttle(fn, time = 300, ctx)</h3>
<p>Throttle function</p>
<h3>asyncRun(taskList, callback = () =&gt; {})</h3>
<p>Run tasks in task list asynchronously, tasks are run synchronously without order</p>

  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>