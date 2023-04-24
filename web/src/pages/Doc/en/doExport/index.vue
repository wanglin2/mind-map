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
<h3>png(name, transparent = false)</h3>
<ul>
<li>
<p><code>name</code>: Name, optional</p>
</li>
<li>
<p><code>transparent</code>: v0.5.7+, Specify whether the background of the exported image is transparent</p>
</li>
</ul>
<p>Exports as <code>png</code>, an async method that returns image data, <code>data:url</code> data which
can be downloaded or displayed.</p>
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
<p>Exports as <code>svg</code>, an async method that returns <code>svg</code> data, <code>data:url</code> data which
can be downloaded or displayed.</p>
<h3>getSvgData()</h3>
<p>Gets <code>svg</code> data, an async method that returns an object:</p>
<pre class="hljs"><code>{
  node; <span class="hljs-comment">// svg object</span>
  str; <span class="hljs-comment">// svg string, if rich text editing is enabled and domToImage is set to true, the dom node in the svg character returned by this value will be converted into the form of an image</span>
  nodeWithDomToImg<span class="hljs-comment">// v0.4.0+，The svg object after the DOM node is converted to an image has a value only when rich text editing is enabled and domToImage is set to true, otherwise null</span>
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
<h3>md()</h3>
<blockquote>
<p>v0.4.7+</p>
</blockquote>
<p>Export as <code>markdown</code> file, Return <code>json</code> data, <code>data:url</code> type, you can download it yourself</p>

  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>