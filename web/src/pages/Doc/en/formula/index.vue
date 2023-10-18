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
<blockquote>
<p>注意：公式是通过<a href="https://github.com/KaTeX/KaTeX">KaTeX</a>库实现的，<code>KaTeX</code>提供了一些配置，插件默认的一个配置是：</p>
</blockquote>
<blockquote>
<p>Note: The formula is implemented through the <a href="https://github.com/KaTeX/KaTeX">KaTeX</a> library, and 'KaTeX' provides some configurations. The default configuration for the plugin is:</p>
</blockquote>
<pre class="hljs"><code>{
    <span class="hljs-attr">output</span>: <span class="hljs-string">&#x27;mathml&#x27;</span>
}
</code></pre>
<blockquote>
<p>This formula may not render successfully on a few browsers. If you need to be compatible with these browsers, you can consider changing the configuration to 'HTML'. For detailed documentation, please refer to <a href="https://katex.org/docs/options">Options</a>. Using this configuration may require the introduction of a 'KaTeX' style file, which you can test on your own.</p>
</blockquote>
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