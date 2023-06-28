<template>
  <div>
    <h1>NodeImgAdjust plugin</h1>
<blockquote>
<p>v0.6.5+</p>
</blockquote>
<p>This plugin provides the function of dragging and adjusting the size of images within nodes.</p>
<h2>Register</h2>
<pre class="hljs"><code><span class="hljs-keyword">import</span> MindMap <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;simple-mind-map&#x27;</span>
<span class="hljs-keyword">import</span> NodeImgAdjust <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;simple-mind-map/src/plugins/NodeImgAdjust.js&#x27;</span>

MindMap.usePlugin(NodeImgAdjust)
</code></pre>
<p>After registration and instantiation of <code>MindMap</code>, the instance can be obtained through <code>mindMap.nodeImgAdjust</code>.</p>

  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>