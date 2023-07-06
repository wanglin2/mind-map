<template>
  <div>
    <h1>XMind parse</h1>
<blockquote>
<p>v0.2.7+</p>
</blockquote>
<p>Provides methods for importing and export <code>XMind</code> files.</p>
<h2>Import</h2>
<pre class="hljs"><code><span class="hljs-keyword">import</span> xmind <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;simple-mind-map/src/parse/xmind.js&#x27;</span>
</code></pre>
<p>If you are using the file in the format of <code>umd</code>, you can obtain it in the following way:</p>
<pre class="hljs"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;simple-mind-map/dist/simpleMindMap.umd.min.js&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<pre class="hljs"><code>simpleMindMap.xmind
</code></pre>
<h2>Methods</h2>
<h3>xmind.parseXmindFile(file)</h3>
<p>Parsing the <code>.xmind</code> file and returning the parsed data. You can use
<code>mindMap.setData(data)</code> to render the returned data to the canvas.</p>
<p><code>file</code>: <code>File</code> object</p>
<h3>xmind.transformXmind(content)</h3>
<blockquote>
<p>V0.6.6+version changes the method to asynchronous and returns a Promise instance</p>
</blockquote>
<p>Convert <code>xmind</code> data. The <code>.xmind</code> file is essentially a <code>zip</code> file that can be
decompressed by changing the suffix to zip. Inside, there is a <code>content.json</code>
file. If you have parsed this file yourself, you can pass the contents of this
file to this method for conversion. You can use
<code>mindMap.setData(data)</code> to render the returned data to the canvas.</p>
<p><code>content</code>: the contents of the <code>content.json</code> file within the <code>.xmind</code> zip
package</p>
<h3>xmind.transformOldXmind(content)</h3>
<blockquote>
<p>v0.2.8+</p>
</blockquote>
<p>For data parsing of the <code>xmind8</code> version, because the <code>.xmind</code> file in this
version does not have a <code>content.json</code>, it corresponds to <code>content.xml</code>.</p>
<p><code>content</code>: the contents of the <code>content.xml</code> file within the <code>.xmind</code> zip
package</p>
<h3>transformToXmind(data, name)</h3>
<blockquote>
<p>v0.6.6+</p>
</blockquote>
<ul>
<li>
<p><code>data</code>: <code>simple-mind-map</code> data, you can get it by <code>mindMap.getData()</code> method.</p>
</li>
<li>
<p><code>name</code>: The file name to export.</p>
</li>
</ul>
<p>Convert the <code>simple mind map</code> data to an <code>xmind</code> file. This method is asynchronous and returns an instance of <code>Promise</code>. The returned data is a <code>blob</code> type <code>zip</code> compressed package data, which you can download as a file yourself.</p>

  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>