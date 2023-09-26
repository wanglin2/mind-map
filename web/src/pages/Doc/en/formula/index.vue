<template>
  <div>
    <h1>Formula plugin</h1>
<blockquote>
<p>v0.7.2+</p>
</blockquote>
<blockquote>
<p>This plugin is only supported in rich text mode, so it needs to be used after registering the RichText plugin</p>
</blockquote>
<p>This plugin is used to support inserting formulas into nodes.</p>
<h2>Register</h2>
<pre class="hljs"><code><span class="hljs-keyword">import</span> MindMap <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;simple-mind-map&#x27;</span>
<span class="hljs-keyword">import</span> Formula <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;simple-mind-map/src/plugins/Formula.js&#x27;</span>

MindMap.usePlugin(Formula)
</code></pre>
<p>After registration and instantiation of <code>MindMap</code>, the instance can be obtained through <code>mindMap.formula</code>.</p>
<h2>Usage</h2>
<p>After registering the plugin, you can use the command 'INSERT_FORMULA' to insert the specified formula for the node:</p>
<pre class="hljs"><code>mindMap.execCommand(<span class="hljs-string">&#x27;INSERT_FORMULA&#x27;</span>, <span class="hljs-string">&#x27;a^2&#x27;</span>)
</code></pre>
<p>The above command will insert the 'a^2' formula into the currently active node.</p>
<p>If you want to assign a formula to a node or nodes, you can pass the second parameter:</p>
<pre class="hljs"><code>mindMap.execCommand(<span class="hljs-string">&#x27;INSERT_FORMULA&#x27;</span>, <span class="hljs-string">&#x27;a^2&#x27;</span>, [Node])
</code></pre>
<p>Pass in the specified node instance through the second parameter.</p>

  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>