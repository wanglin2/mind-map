<template>
  <div>
    <h1>Watermark instance</h1>
<blockquote>
<p>0.2.24+</p>
</blockquote>
<p><code>Watermark</code> instance is responsible for displaying the watermark, and can be obtained
through <code>mindMap.watermark</code>.</p>
<h2>Methods</h2>
<h3>draw()</h3>
<p>Redraw the watermark.</p>
<p>Note: For imprecise rendering, some watermarks beyond the visible area will be drawn. If you have extreme performance requirements, it is recommended to develop the watermark function yourself.</p>
<h3>updateWatermark(config)</h3>
<p>Update watermark config. Example:</p>
<pre class="hljs"><code>mindMap.watermark.updateWatermark({
    <span class="hljs-attr">text</span>: <span class="hljs-string">&#x27;Watermark text&#x27;</span>,
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