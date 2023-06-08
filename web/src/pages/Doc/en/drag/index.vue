<template>
  <div>
    <h1>Drag plugin</h1>
<p>The <code>Drag</code> plugin provides the function of node dragging, including:</p>
<p>1.Drag the node to move and change its position in the node tree, That is, as a child node, sibling node, etc. of other nodes</p>
<p>2.Drag the node to the custom canvas location</p>
<p>Please refer to the <a href="/mind-map/#/doc/zh/constructor">Instantiation Options</a> of the <code>MindMap</code> class for configuration.</p>
<h2>Register</h2>
<pre class="hljs"><code><span class="hljs-keyword">import</span> MindMap <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;simple-mind-map&#x27;</span>
<span class="hljs-keyword">import</span> Drag <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;simple-mind-map/src/plugins/Drag.js&#x27;</span>
<span class="hljs-comment">// import Drag from &#x27;simple-mind-map/src/Drag.js&#x27; Use this path for versions below v0.6.0</span>

MindMap.usePlugin(Drag)
</code></pre>
<p>After registration and instantiation of <code>MindMap</code>, the instance can be obtained through <code>mindMap.drag</code>.</p>

  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>