<template>
  <div>
    <h1>KeyboardNavigation plugin</h1>
<blockquote>
<p>v0.2.17+</p>
</blockquote>
<p><code>KeyboardNavigation</code> plugin provides keyboard navigation function, that is, when you press the direction key, it will automatically find the next node and activate it.</p>
<h2>Register</h2>
<pre class="hljs"><code><span class="hljs-keyword">import</span> MindMap <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;simple-mind-map&#x27;</span>
<span class="hljs-keyword">import</span> KeyboardNavigation <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;simple-mind-map/src/plugins/KeyboardNavigation.js&#x27;</span>
<span class="hljs-comment">// import KeyboardNavigation from &#x27;simple-mind-map/src/KeyboardNavigation.js&#x27; Use this path for versions below v0.6.0</span>

MindMap.usePlugin(KeyboardNavigation)
</code></pre>
<p>After registration and instantiation of <code>MindMap</code>, the instance can be obtained through <code>mindMap.keyboardNavigation</code>.</p>
<h2>Methods</h2>
<h3>focus(dir)</h3>
<p><code>dir</code>：Which direction to find the next node，Optional value：<code>Left</code>、 <code>Up</code>、 <code>Right</code>、 <code>Down</code></p>
<p>Focus on the next node</p>
<h3>getNodeRect(node)</h3>
<p><code>node</code>：Node</p>
<p>Get the location information of the node and return an object:</p>
<pre class="hljs"><code>{
    left,
    top,
    right,
    bottom
}
</code></pre>
<h3>getDistance(node1Rect, node2Rect)</h3>
<p><code>node1Rect</code>、<code>node2Rect</code>：The location data of nodes can be obtained through the <code>getNodeRect(node)</code></p>
<p>Get the distance between two nodes</p>
<h3>getCenter(nodeRect)</h3>
<p><code>nodeRect</code>：The location data of nodes can be obtained through the <code>getNodeRect(node)</code></p>
<p>Get the center point of the node</p>

  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>