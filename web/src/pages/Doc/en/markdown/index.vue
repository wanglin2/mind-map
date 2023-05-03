<template>
  <div>
    <h1>Markdown parse</h1>
<blockquote>
<p>v0.4.7+</p>
</blockquote>
<p>Provides methods for importing and exporting <code>Markdown</code> files.</p>
<h2>Import</h2>
<pre class="hljs"><code><span class="hljs-keyword">import</span> markdown <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;simple-mind-map/src/parse/markdown.js&#x27;</span>
</code></pre>
<p>If you are using the file in the format of <code>umd</code>, you can obtain it in the following way:</p>
<pre class="hljs"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;simple-mind-map/dist/simpleMindMap.umd.min.js&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<pre class="hljs"><code>simpleMindMap.markdown
</code></pre>
<h2>Methods</h2>
<h3>transformToMarkdown(data)</h3>
<ul>
<li><code>data</code>: Mind map data can be obtained using the <code>mindMap.getData()</code> method.</li>
</ul>
<p>Convert mind map data into <code>Markdown</code> format data, and the returned data is a string.</p>
<h3>transformMarkdownTo(mdContent)</h3>
<ul>
<li><code>mdContent</code>: The <code>Markdown</code> data to convert, string type.</li>
</ul>
<p>Convert the <code>Markdown</code> string into node tree data and return a <code>Promise</code> instance. You can use the <code>mindMap.setData()</code> method to render the converted data onto the canvas.</p>

  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>