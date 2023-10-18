<template>
  <div>
    <h1>Select plugin</h1>
<p>The <code>Select</code> plugin provides the function of select multiple nodes.</p>
<h2>Register</h2>
<pre class="hljs"><code><span class="hljs-keyword">import</span> MindMap <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;simple-mind-map&#x27;</span>
<span class="hljs-keyword">import</span> Select <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;simple-mind-map/src/plugins/Select.js&#x27;</span>
<span class="hljs-comment">// import Select from &#x27;simple-mind-map/src/Select.js&#x27; Use this path for versions below v0.6.0</span>

MindMap.usePlugin(Select)
</code></pre>
<p>After registration and instantiation of <code>MindMap</code>, the instance can be obtained through <code>mindMap.select</code>.</p>
<h2>Method</h2>
<h3>toPos(x, y)</h3>
<p>Convert mouse position to position relative to the container <code>el</code></p>

  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>