<template>
  <div>
    <h1>Watermark插件</h1>
<blockquote>
<p>0.2.24+</p>
</blockquote>
<p><code>Watermark</code>插件负责显示水印。</p>
<p>配置请参考<code>MindMap</code>类的<a href="/mind-map/#/doc/zh/constructor">实例化选项</a>。</p>
<h2>注册</h2>
<pre class="hljs"><code><span class="hljs-keyword">import</span> MindMap <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;simple-mind-map&#x27;</span>
<span class="hljs-keyword">import</span> Watermark <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;simple-mind-map/src/plugins/Watermark.js&#x27;</span>
<span class="hljs-comment">// import Watermark from &#x27;simple-mind-map/src/Watermark.js&#x27; v0.6.0以下版本使用该路径</span>

MindMap.usePlugin(Watermark)
</code></pre>
<p>注册完且实例化<code>MindMap</code>后可通过<code>mindMap.watermark</code>获取到该实例。</p>
<h2>方法</h2>
<h3>draw()</h3>
<p>重新绘制水印。</p>
<p>注意：非精确绘制，会绘制一些超出可视区域的水印，如果对性能有极致要求，推荐自行开发水印功能。</p>
<h3>updateWatermark(config)</h3>
<p>更新水印配置。示例：</p>
<pre class="hljs"><code>mindMap.watermark.updateWatermark({
    <span class="hljs-attr">text</span>: <span class="hljs-string">&#x27;水印文字&#x27;</span>,
    <span class="hljs-attr">lineSpacing</span>: <span class="hljs-number">100</span>,
    <span class="hljs-attr">textSpacing</span>: <span class="hljs-number">100</span>,
    <span class="hljs-attr">angle</span>: <span class="hljs-number">50</span>,
    <span class="hljs-attr">textStyle</span>: {
      <span class="hljs-attr">color</span>: <span class="hljs-string">&#x27;#000&#x27;</span>,
      <span class="hljs-attr">opacity</span>: <span class="hljs-number">1</span>,
      <span class="hljs-attr">fontSize</span>: <span class="hljs-number">20</span>
    }
})
</code></pre>
<h3>hasWatermark()</h3>
<blockquote>
<p>v0.3.2+</p>
</blockquote>
<p>获取是否存在水印。</p>

  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>