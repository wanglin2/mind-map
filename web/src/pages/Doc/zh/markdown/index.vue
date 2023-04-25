<template>
  <div>
    <h1>Markdown解析</h1>
<blockquote>
<p>v0.4.7+</p>
</blockquote>
<p>提供导入和导出<code>Markdown</code>文件的方法。</p>
<h2>引入</h2>
<pre class="hljs"><code><span class="hljs-keyword">import</span> markdown <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;simple-mind-map/src/parse/markdown.js&#x27;</span>
</code></pre>
<p>如果使用的是<code>umd</code>格式的文件，那么可以通过如下方式获取：</p>
<pre class="hljs"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;simple-mind-map/dist/simpleMindMap.umd.min.js&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<pre class="hljs"><code>simpleMindMap.markdown
</code></pre>
<h2>方法</h2>
<h3>transformToMarkdown(data)</h3>
<ul>
<li><code>data</code>：思维导图数据，可以通过<code>mindMap.getData()</code>方法获取。</li>
</ul>
<p>将思维导图数据转换成<code>Markdown</code>格式数据，返回的是字符串。</p>
<h3>transformMarkdownTo(mdContent)</h3>
<ul>
<li><code>mdContent</code>：要转换的<code>Markdown</code>数据，字符串类型。</li>
</ul>
<p>将<code>Markdown</code>字符串转换成节点树数据，返回一个<code>Promise</code>实例。可以使用<code>mindMap.setData()</code>方法将转换后的数据渲染到画布上。</p>

  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>