<template>
  <div>
    <h1>Export 插件</h1>
<p><code>Export</code>插件提供导出的功能。</p>
<h2>注册</h2>
<pre class="hljs"><code><span class="hljs-keyword">import</span> MindMap <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;simple-mind-map&#x27;</span>
<span class="hljs-keyword">import</span> Export <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;simple-mind-map/src/plugins/Export.js&#x27;</span>
<span class="hljs-comment">// import Export from &#x27;simple-mind-map/src/Export.js&#x27; v0.6.0以下版本使用该路径</span>

MindMap.usePlugin(Export)
</code></pre>
<p>注册完且实例化<code>MindMap</code>后可通过<code>mindMap.doExport</code>获取到该实例。</p>
<h2>方法</h2>
<p>所有导出的方法都是异步方法，返回一个<code>Promise</code>实例，你可以使用<code>then</code>方法获取数据，或者使用<code>async await</code>函数获取：</p>
<pre class="hljs"><code>mindMap.doExport.png().then(<span class="hljs-function">(<span class="hljs-params">data</span>) =&gt;</span> {
  <span class="hljs-comment">// ...</span>
})

<span class="hljs-keyword">const</span> <span class="hljs-keyword">export</span> = <span class="hljs-keyword">async</span> () =&gt; {
  <span class="hljs-keyword">let</span> data = <span class="hljs-keyword">await</span> mindMap.doExport.png()
  <span class="hljs-comment">// ...</span>
}
</code></pre>
<p>返回的数据为<code>data:url</code>格式的，你可以创建一个<code>a</code>标签来触发下载：</p>
<pre class="hljs"><code><span class="hljs-keyword">let</span> a = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">&#x27;a&#x27;</span>)
a.href = <span class="hljs-string">&#x27;xxx.png&#x27;</span><span class="hljs-comment">// .png、.svg、.pdf、.md、.json、.smm</span>
a.download = <span class="hljs-string">&#x27;xxx&#x27;</span>
a.click()
</code></pre>
<h3>png(name, transparent = false, checkRotate, compress)</h3>
<blockquote>
<p>v0.7.0以下版本为： png(name, transparent = false, rotateWhenWidthLongerThenHeight)</p>
</blockquote>
<ul>
<li>
<p><code>name</code>：名称，可不传</p>
</li>
<li>
<p><code>transparent</code>：v0.5.7+，指定导出图片的背景是否是透明的</p>
</li>
<li>
<p><code>rotateWhenWidthLongerThenHeight</code>: v0.6.15+，v0.7.0+已废弃，Boolean, false, 是否在图片宽比高长时自动旋转90度</p>
</li>
<li>
<p><code>checkRotate</code>：v0.7.0+，Function，可以传递一个函数，接收图片的宽度和高度两个参数，返回true或false，true代表图片需要旋转90度</p>
</li>
<li>
<p><code>compress</code>：v0.8.1+，null | { width, height }, 压缩图片的参数，某些情况下导出的图片长宽可能非常大，如果希望减小，那么可以通过该参数来控制，宽或高只提供一个即可，会按比例缩放</p>
</li>
</ul>
<p>导出为<code>png</code>。</p>
<h3>svg(name, plusCssText)</h3>
<ul>
<li>
<p><code>name</code>：<code>svg</code>标题</p>
</li>
<li>
<p><code>plusCssText</code>：v0.4.0+，（v0.6.16+已去除该参数，改为在实例化时通过<code>resetCss</code>配置传入），当开启了节点富文本编辑，且<code>domToImage</code>传了<code>false</code>时，可以添加附加的<code>css</code>样式，如果<code>svg</code>中存在<code>dom</code>节点，想要设置一些针对节点的样式可以通过这个参数传入，比如：</p>
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
<p>导出为<code>svg</code>。</p>
<h3>pdf(name, useMultiPageExport, maxImageWidth)</h3>
<blockquote>
<p>v0.2.1+</p>
</blockquote>
<ul>
<li>
<p><code>name</code>：文件名称</p>
</li>
<li>
<p><code>useMultiPageExport</code>: v0.6.15+，Boolean, false, 是否多页导出，默认为单页</p>
</li>
<li>
<p><code>maxImageWidth</code>：v0.8.1+，null | Number，默认为a4纸的宽度的2倍, 压缩图片的参数，某些情况下图片的长宽可能非常大，导致pdf体积也非常大，所以如果希望减小体积，那么可以通过该参数来控制图片的最大宽度</p>
</li>
</ul>
<p>导出为<code>pdf</code>，和其他导出方法不一样，这个方法不会返回数据，会直接触发下载。</p>
<blockquote>
<p>v0.6.0版本以后，需要额外注册一个ExportPDF插件</p>
</blockquote>
<pre class="hljs"><code><span class="hljs-keyword">import</span> ExportPDF <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;simple-mind-map/src/plugins/ExportPDF.js&#x27;</span>
MindMap.usePlugin(ExportPDF)
</code></pre>
<h3>json(name, withConfig)</h3>
<p><code>name</code>：暂时没有用处，传空字符串即可</p>
<p><code>withConfig``：Boolean</code>, 默认为<code>true</code>，数据中是否包含配置，否则为纯思维导图节点数据</p>
<p>返回<code>json</code>数据。</p>
<h3>smm(name, withConfig)</h3>
<p><code>simple-mind-map</code>自定义的文件格式，其实就是<code>json</code>，和<code>json</code>方法返回的数据一模一样。</p>
<h3>md()</h3>
<blockquote>
<p>v0.4.7+</p>
</blockquote>
<p>导出<code>markdown</code>文件。</p>
<h3>getSvgData()</h3>
<p>获取<code>svg</code>数据，异步方法，返回一个对象：</p>
<pre class="hljs"><code>{
  node<span class="hljs-comment">// svg节点</span>
  str<span class="hljs-comment">// svg字符串</span>
}
</code></pre>
<h3>xmind(name)</h3>
<blockquote>
<p>v0.6.6+，需要额外注册一个ExportXMind插件</p>
</blockquote>
<pre class="hljs"><code><span class="hljs-keyword">import</span> ExportXMind <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;simple-mind-map/src/plugins/ExportXMind.js&#x27;</span>
MindMap.usePlugin(ExportXMind)
</code></pre>
<p>导出为<code>xmind</code>文件类型，异步方法，返回一个<code>Promise</code>实例，返回的数据为一个<code>zip</code>压缩包的<code>data:url</code>数据，可以直接下载。</p>

  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>