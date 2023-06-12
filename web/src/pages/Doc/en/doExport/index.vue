<template>
  <div>
    <h1>Export plugin</h1>
<p>The <code>Export</code> plugin provides the export function.</p>
<h2>Register</h2>
<pre class="hljs"><code><span class="hljs-keyword">import</span> MindMap <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;simple-mind-map&#x27;</span>
<span class="hljs-keyword">import</span> Export <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;simple-mind-map/src/plugins/Export.js&#x27;</span>
<span class="hljs-comment">// import Export from &#x27;simple-mind-map/src/Export.js&#x27; Use this path for versions below v0.6.0</span>

MindMap.usePlugin(Export)
</code></pre>
<p>After registration and instantiation of <code>MindMap</code>, the instance can be obtained through <code>mindMap.doExport</code>.</p>
<h2>Methods</h2>
<p>All exported methods are asynchronous and return an instance of <code>Promise</code>. You can use the <code>then</code> method to obtain data, or use the <code>async await</code> function to obtain:</p>
<pre class="hljs"><code>mindMap.doExport.png().then(<span class="hljs-function">(<span class="hljs-params">data</span>) =&gt;</span> {
  <span class="hljs-comment">// ...</span>
})

<span class="hljs-keyword">const</span> <span class="hljs-keyword">export</span> = <span class="hljs-keyword">async</span> () =&gt; {
  <span class="hljs-keyword">let</span> data = <span class="hljs-keyword">await</span> mindMap.doExport.png()
  <span class="hljs-comment">// ...</span>
}
</code></pre>
<p>The returned data is in the format of <code>data:URL</code>. You can create an <code>a</code> tag to trigger the download:</p>
<pre class="hljs"><code><span class="hljs-keyword">let</span> a = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">&#x27;a&#x27;</span>)
a.href = <span class="hljs-string">&#x27;xxx.png&#x27;</span><span class="hljs-comment">// .png、.svg、.pdf、.md、.json、.smm</span>
a.download = <span class="hljs-string">&#x27;xxx&#x27;</span>
a.click()
</code></pre>
<h3>png(name, transparent = false)</h3>
<ul>
<li>
<p><code>name</code>: Name, optional</p>
</li>
<li>
<p><code>transparent</code>: v0.5.7+, Specify whether the background of the exported image is transparent</p>
</li>
</ul>
<p>Exports as <code>png</code>.</p>
<h3>svg(name, plusCssText)</h3>
<ul>
<li>
<p><code>name</code>：<code>svg</code> title</p>
</li>
<li>
<p><code>plusCssText</code>：v0.4.0+, When node rich text editing is enabled and <code>domToImage</code> passes <code>false</code>, additional <code>css</code> styles can be added. If there is a <code>dom</code> node in <code>svg</code>, you can set some styles for the node through this parameter, such as:</p>
</li>
</ul>
<pre class="hljs"><code>svg(
  <span class="hljs-string">&#x27;&#x27;</span>, 
  <span class="hljs-literal">false</span>, 
  <span class="hljs-string">`* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }`</span>
)
</code></pre>
<p>Exports as <code>svg</code>.</p>
<h3>pdf(name)</h3>
<blockquote>
<p>v0.2.1+</p>
</blockquote>
<p><code>name</code>：File name</p>
<p>Export as <code>pdf</code>. Unlike other export methods, this method does not return data and directly triggers the download.</p>
<blockquote>
<p>After v0.6.0, an additional ExportPDF plugin needs to be registered</p>
</blockquote>
<pre class="hljs"><code><span class="hljs-keyword">import</span> ExportPDF <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;simple-mind-map/src/plugins/ExportPDF.js&#x27;</span>
MindMap.usePlugin(ExportPDF)
</code></pre>
<h3>json(name, withConfig)</h3>
<p><code>name</code>：It is temporarily useless, just pass an empty string</p>
<p><code>withConfig``：Boolean</code>, default <code>true</code>, Whether the data contains configuration, otherwise it is pure mind map node data</p>
<p>Return <code>json</code> data.</p>
<h3>md()</h3>
<blockquote>
<p>v0.4.7+</p>
</blockquote>
<p>Export as <code>markdown</code> file.</p>
<h3>getSvgData()</h3>
<p>Gets <code>svg</code> data, an async method that returns an object:</p>
<pre class="hljs"><code>{
  node <span class="hljs-comment">// svg node</span>
  str <span class="hljs-comment">// svg string</span>
}
</code></pre>

  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>