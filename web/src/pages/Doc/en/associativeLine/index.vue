<template>
  <div>
    <h1>AssociativeLine plugin</h1>
<blockquote>
<p>v0.4.5+</p>
</blockquote>
<blockquote>
<p>The function of adjusting associated line control points is supported from v0.4.6+</p>
</blockquote>
<blockquote>
<p>Relevance support for text editing starting from v0.5.11+</p>
</blockquote>
<p>This plugin is used to support the addition of associative lines.</p>
<h2>Register</h2>
<pre class="hljs"><code><span class="hljs-keyword">import</span> MindMap <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;simple-mind-map&#x27;</span>
<span class="hljs-keyword">import</span> AssociativeLine <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;simple-mind-map/src/plugins/AssociativeLine.js&#x27;</span>
<span class="hljs-comment">// import AssociativeLine from &#x27;simple-mind-map/src/AssociativeLine.js&#x27; Use this path for versions below v0.6.0</span>

MindMap.usePlugin(AssociativeLine)
</code></pre>
<p>After registration and instantiation of <code>MindMap</code>, the instance can be obtained through <code>mindMap.associativeLine</code>.</p>
<h2>Config</h2>
<p>Support for modifying the thickness and color of associated lines, divided into default and active states. The configuration is as follows:</p>
<ul>
<li>
<p><code>associativeLineWidth</code>: The thickness of the default state of the associated line. The default value is <code>2</code></p>
</li>
<li>
<p><code>associativeLineColor</code>: Color of the default state of associative lines. The default value is <code>rgb(51, 51, 51)</code></p>
</li>
<li>
<p><code>associativeLineActiveWidth</code>: The thickness of the active state of the associated line. The default value is <code>8</code></p>
</li>
<li>
<p><code>associativeLineActiveColor</code>: The color of the active state of the associated line. The default value is <code>rgba(2, 167, 240, 1)</code></p>
</li>
</ul>
<p>The configuration is provided as a theme, so if you want to modify these four properties, you can modify them using the <code>mindMap.setThemeConfig(config)</code> method.</p>
<h2>Props</h2>
<h3>mindMap.associativeLine.lineList</h3>
<p>Currently, all connection line data, array types, and each item of the array are also an array:</p>
<pre class="hljs"><code>[
    path, <span class="hljs-comment">// Connector node</span>
    clickPath, <span class="hljs-comment">// Invisible click line node</span>
    node, <span class="hljs-comment">// Start node</span>
    toNode <span class="hljs-comment">// Target node</span>
]
</code></pre>
<h3>mindMap.associativeLine.activeLine</h3>
<p>The currently active connection line and array type are the same as the structure of each item in the <code>lineList</code> array.</p>
<h2>Methods</h2>
<h3>renderAllLines()</h3>
<p>Re-render all associated lines.</p>
<h3>removeAllLines()</h3>
<p>Remove all associated lines.</p>
<h3>createLineFromActiveNode()</h3>
<p>Create an associated line from the current active node. If there are multiple active nodes, the default is the first node.</p>
<p>After calling this method, an association line will be rendered from the first active node to the current mouse real-time position. When a target node is clicked, it represents completion of creation. An association line will be rendered between the first active node and the clicked node.</p>
<h3>createLine(fromNode)</h3>
<p>Creates an associative line starting at the specified node.</p>
<p>After calling this method, an association line will be rendered from the specified node to the current mouse real-time position. When a target node is clicked, it represents completion of creation, and an association line will be rendered between the specified node and the clicked node.</p>
<h3>addLine(fromNode, toNode)</h3>
<p>Add an associative line directly.</p>
<p>Calling this method will directly create an association line from the <code>fromNode</code> to the <code>toNode</code> node.</p>
<h3>removeLine()</h3>
<p>Deletes the currently active associative line. Clicking on an associated line is considered active.</p>
<h3>clearActiveLine()</h3>
<p>Clears the active state of the currently active association line.</p>
<h3>front()</h3>
<blockquote>
<p>v0.8.0+</p>
</blockquote>
<p>The top-level display of the associated line.</p>
<h3>back()</h3>
<blockquote>
<p>v0.8.0+</p>
</blockquote>
<p>The associated line returns to its original level.</p>

  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>