<template>
  <div>
    <h1>Watermark实例</h1>
<blockquote>
<p>0.2.24+</p>
</blockquote>
<p><code>Watermark</code>实例负责显示水印，可通过<code>mindMap.watermark</code>获取到该实例。</p>
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

  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>