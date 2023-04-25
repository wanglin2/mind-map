<template>
  <div>
    <h1>XMind解析</h1>
<blockquote>
<p>v0.2.7+</p>
</blockquote>
<p>提供导入<code>XMind</code>文件的方法。</p>
<h2>引入</h2>
<pre class="hljs"><code><span class="hljs-keyword">import</span> xmind <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;simple-mind-map/src/parse/xmind.js&#x27;</span>
</code></pre>
<p>如果使用的是<code>umd</code>格式的文件，那么可以通过如下方式获取：</p>
<pre class="hljs"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;simple-mind-map/dist/simpleMindMap.umd.min.js&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<pre class="hljs"><code>simpleMindMap.xmind
</code></pre>
<h2>方法</h2>
<h3>xmind.parseXmindFile(file)</h3>
<p>解析<code>.xmind</code>文件，返回解析后的数据，可以使用<code>mindMap.setData(data)</code>来将返回的数据渲染到画布上</p>
<p><code>file</code>：<code>File</code>对象</p>
<h3>xmind.transformXmind(content)</h3>
<p>转换<code>xmind</code>数据，<code>.xmind</code>文件本质上是一个压缩包，改成<code>zip</code>后缀可以解压缩，里面存在一个<code>content.json</code>文件，如果你自己解析出了这个文件，那么可以把这个文件内容传递给这个方法进行转换，转换后的数据，可以使用<code>mindMap.setData(data)</code>来将返回的数据渲染到画布上</p>
<p><code>content</code>：<code>.xmind</code>压缩包内的<code>content.json</code>文件内容</p>
<h3>xmind.transformOldXmind(content)</h3>
<blockquote>
<p>v0.2.8+</p>
</blockquote>
<p>针对<code>xmind8</code>版本的数据解析，因为该版本的<code>.xmind</code>文件内没有<code>content.json</code>，对应的是<code>content.xml</code>。</p>
<p><code>content</code>：<code>.xmind</code>压缩包内的<code>content.xml</code>文件内容</p>

  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>