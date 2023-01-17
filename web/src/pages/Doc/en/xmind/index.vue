<template>
  <div>
    <h1>XMind parse</h1>
<blockquote>
<p>v0.2.7+</p>
</blockquote>
<p>Provides methods for importing <code>XMind</code> files.</p>
<h2>Import</h2>
<pre class="hljs"><code><span class="hljs-keyword">import</span> xmind <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;simple-mind-map/src/parse/xmind.js&#x27;</span>
</code></pre>
<p>If you are using the file in the format of <code>umd</code>, you can obtain it in the following way:</p>
<pre class="hljs"><code><span class="hljs-keyword">import</span> MindMap <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;simple-mind-map/dist/simpleMindMap.umd.min&quot;</span>

MindMap.xmind
</code></pre>
<h2>Methods</h2>
<h3>xmind.parseXmindFile(file)</h3>
<p>Parsing the <code>.xmind</code> file and returning the parsed data. Note that this is
complete data, including the node tree, theme, and structure. You can use
<code>mindMap.setFullData(data)</code> to render the returned data to the canvas.</p>
<p><code>file</code>: <code>File</code> object</p>
<h3>xmind.transformXmind(content)</h3>
<p>Convert <code>xmind</code> data. The <code>.xmind</code> file is essentially a <code>zip</code> file that can be
decompressed by changing the suffix to zip. Inside, there is a <code>content.json</code>
file. If you have parsed this file yourself, you can pass the contents of this
file to this method for conversion. The converted data is the complete data,
including the node tree, theme, structure, etc. You can use
<code>mindMap.setFullData(data)</code> to render the returned data to the canvas.</p>
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

  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>