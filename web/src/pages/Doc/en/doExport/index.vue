<template>
  <div>
    <h1>Export plugin</h1>
<p>The <code>Export</code> plugin provides the export function.</p>
<h2>Register</h2>
<pre class="hljs"><code><span class="hljs-keyword">import</span> MindMap <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;simple-mind-map&#x27;</span>
<span class="hljs-keyword">import</span> Export <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;simple-mind-map/src/Export.js&#x27;</span>

MindMap.usePlugin(Export)
</code></pre>
<p>After registration and instantiation of <code>MindMap</code>, the instance can be obtained through <code>mindMap.doExport</code>.</p>
<h2>Methods</h2>
<h3>png()</h3>
<p>Exports as <code>png</code>, an async method that returns image data, <code>data:url</code> data which
can be downloaded or displayed.</p>
<h3>svg()</h3>
<p>Exports as <code>svg</code>, an async method that returns <code>svg</code> data, <code>data:url</code> data which
can be downloaded or displayed.</p>
<h3>getSvgData()</h3>
<p>Gets <code>svg</code> data, an async method that returns an object:</p>
<pre class="hljs"><code>{
  node; <span class="hljs-comment">// svg object</span>
  str; <span class="hljs-comment">// svg string</span>
}
</code></pre>
<h3>pdf(name)</h3>
<blockquote>
<p>v0.2.1+</p>
</blockquote>
<p><code>name</code>：File name</p>
<p>Export as <code>pdf</code></p>
<h3>json(name, withConfig)</h3>
<p><code>name</code>：It is temporarily useless, just pass an empty string</p>
<p><code>withConfig``：Boolean</code>, default <code>true</code>, Whether the data contains configuration, otherwise it is pure mind map node data</p>
<p>Return <code>json</code> data, <code>data:url</code> type, you can download it yourself</p>

  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>