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
<h3>svg(name, domToImage = false, plusCssText)</h3>
<ul>
<li>
<p><code>name</code>：<code>svg</code>标题</p>
</li>
<li>
<p><code>domToImage</code>：v0.4.0+，当开启了节点富文本编辑，可以通过该参数指定是否将<code>svg</code>中的<code>dom</code>节点转换成图片的形式</p>
</li>
<li>
<p><code>plusCssText</code>：v0.4.0+，当开启了节点富文本编辑，且<code>domToImage</code>传了<code>false</code>时，可以添加附加的<code>css</code>样式，如果<code>svg</code>中存在<code>dom</code>节点，想要设置一些针对节点的样式可以通过这个参数传入，比如：</p>
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
<p>导出为<code>svg</code>，异步方法，返回<code>svg</code>数据，<code>data:url</code>数据，可以自行下载或显示</p>
<h3>getSvgData(domToImage)</h3>
<ul>
<li><code>domToImage</code>：v0.4.0+，如果开启了节点富文本，则可以通过该参数指定是否要将<code>svg</code>中嵌入的<code>DOM</code>节点转换为图片。</li>
</ul>
<p>获取<code>svg</code>数据，异步方法，返回一个对象：</p>
<pre class="hljs"><code>{
  node<span class="hljs-comment">// svg对象</span>
  str<span class="hljs-comment">// svg字符串，如果开启了富文本编辑且domToImage设为true，那么该值返回的svg字符内的dom节点会被转换成图片的形式</span>
  nodeWithDomToImg<span class="hljs-comment">// v0.4.0+，DOM节点转换为图片后的svg对象，只有当开启了富文本编辑且domToImage设为true才有值，否则为null</span>
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