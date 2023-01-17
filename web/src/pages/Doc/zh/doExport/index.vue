<template>
  <div>
    <h1>Export 插件</h1>
<p><code>Export</code>插件提供导出的功能。</p>
<h2>注册</h2>
<pre class="hljs"><code><span class="hljs-keyword">import</span> MindMap <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;simple-mind-map&#x27;</span>
<span class="hljs-keyword">import</span> Export <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;simple-mind-map/src/Export.js&#x27;</span>

MindMap.usePlugin(Export)
</code></pre>
<p>注册完且实例化<code>MindMap</code>后可通过<code>mindMap.doExport</code>获取到该实例。</p>
<h2>方法</h2>
<h3>png()</h3>
<p>导出为<code>png</code>，异步方法，返回图片数据，<code>data:url</code>数据，可以自行下载或显示</p>
<h3>svg()</h3>
<p>导出为<code>svg</code>，异步方法，返回<code>svg</code>数据，<code>data:url</code>数据，可以自行下载或显示</p>
<h3>getSvgData()</h3>
<p>获取<code>svg</code>数据，异步方法，返回一个对象：</p>
<pre class="hljs"><code>{
  node<span class="hljs-comment">// svg对象</span>
  str<span class="hljs-comment">// svg字符串</span>
}
</code></pre>
<h3>pdf(name)</h3>
<blockquote>
<p>v0.2.1+</p>
</blockquote>
<p><code>name</code>：文件名称</p>
<p>导出为<code>pdf</code></p>
<h3>json(name, withConfig)</h3>
<p><code>name</code>：暂时没有用处，传空字符串即可</p>
<p><code>withConfig``：Boolean</code>, 默认为<code>true</code>，数据中是否包含配置，否则为纯思维导图节点数据</p>
<p>返回<code>json</code>数据，<code>data:url</code>数据，可以自行下载</p>

  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>