<template>
  <div>
    <h1>OuterFrame plugin</h1>
<blockquote>
<p>v0.10.2+</p>
</blockquote>
<p>This plugin is used to implement bounding box functionality.</p>
<h2>Register</h2>
<pre class="hljs"><code><span class="hljs-keyword">import</span> MindMap <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;simple-mind-map&#x27;</span>
<span class="hljs-keyword">import</span> OuterFrame <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;simple-mind-map/src/plugins/OuterFrame.js&#x27;</span>
MindMap.usePlugin(OuterFrame)
</code></pre>
<p>After registration and instantiation of <code>MindMap</code>, the instance can be obtained through <code>mindMap.outerFrame</code>.</p>
<p>The application can refer to the code in this section of the demo: <a href="https://github.com/wanglin2/mind-map/blob/main/web/src/pages/Edit/components/NodeOuterFrame.vue">NodeOuterFrame.vue</a>。</p>
<h2>Command</h2>
<p>This plugin will register the 'ADD_OUTER_FRAME' command with the mind map to add bounding boxes to nodes:</p>
<pre class="hljs"><code>mindMap.execCommand(<span class="hljs-string">&#x27;ADD_OUTER_FRAME&#x27;</span>, appointNodes, config = {})
</code></pre>
<ul>
<li>
<p><code>appointNodes</code>：Specify the node instance node to add the bounding box to, which can be a single node instance or an array of node instances. If passing '[]' or 'null', the bounding box will be added to the currently active node on the canvas</p>
</li>
<li>
<p><code>config</code>：Outline configuration, object format, and fields are as follows:</p>
</li>
</ul>
<table>
<thead>
<tr>
<th>Field</th>
<th>Type</th>
<th>Default</th>
<th>Desc</th>
</tr>
</thead>
<tbody>
<tr>
<td>radius</td>
<td>Number</td>
<td>5</td>
<td>Size of rounded corners on the outer frame</td>
</tr>
<tr>
<td>strokeWidth</td>
<td>Number</td>
<td>2</td>
<td>Outer border width</td>
</tr>
<tr>
<td>strokeColor</td>
<td>String</td>
<td>#0984e3</td>
<td>Outer border color</td>
</tr>
<tr>
<td>strokeDasharray</td>
<td>String</td>
<td>5,5</td>
<td>Outer border dashed line</td>
</tr>
<tr>
<td>fill</td>
<td>String</td>
<td>rgba(9,132,227,0.05)</td>
<td>Outer frame fill color</td>
</tr>
</tbody>
</table>
<h2>Event</h2>
<h3>outer_frame_active</h3>
<p>Triggered when clicking to activate a certain bounding box. The callback function takes three parameters: el（Outer frame elements,The rect element of library @svgdotjs/svg.js）, node（The parent node instance of the node to which this scope belongs）, range（Range interval, relative to node）</p>
<p>The application can listen to this event to retrieve the currently activated bounding box, retrieve its configuration, and echo it to the page. Since the scope may contain multiple nodes, the first node instance is usually taken. If you want to retrieve the position of the bounding box on the page, you can call the 'el.rbox' method:</p>
<pre class="hljs"><code>mindMap.on(<span class="hljs-string">&#x27;outer_frame_active&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">el, parentNode, range</span>) =&gt;</span> {
    <span class="hljs-comment">// Take the bounding box style of the first node within the range</span>
    <span class="hljs-keyword">const</span> firstNode = parentNode.children[range[<span class="hljs-number">0</span>]]
    <span class="hljs-keyword">const</span> firstNodeOuterFrame = firstNode.getData(<span class="hljs-string">&#x27;outerFrame&#x27;</span>)
    <span class="hljs-comment">// Obtain the position and size information of the bounding box, where you can render your configuration float layer</span>
    <span class="hljs-keyword">const</span> { x, y, width, height } = el.rbox()
})
</code></pre>
<h3>outer_frame_delete</h3>
<p>Triggered when deleting the currently active bounding box on the canvas.</p>
<h2>Methods</h2>
<h3>getActiveOuterFrame()</h3>
<p>Get the currently activated bounding box data. Return an object with the following structure:</p>
<pre class="hljs"><code>{
    el,
    node,
    range
}
</code></pre>
<h3>updateActiveOuterFrame(config = {})</h3>
<p>Update the currently active bounding box. After executing this method, please immediately hide your style panel as it will clear the currently active bounding box.</p>
<h3>removeActiveOuterFrame()</h3>
<p>Delete the currently active bounding box.</p>
<h3>getRangeNodeList(node, range)</h3>
<p>Get a list of boxed child nodes within a specified range of a node.</p>
<h3>clearActiveOuterFrame()</h3>
<p>Clear the currently active bounding box.</p>

  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>