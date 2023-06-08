<template>
  <div>
    <h1>Watermark plugin</h1>
<blockquote>
<p>0.2.24+</p>
</blockquote>
<p><code>Watermark</code> instance is responsible for displaying the watermark.</p>
<p>Please refer to the <a href="/mind-map/#/doc/zh/constructor">Instantiation Options</a> of the <code>MindMap</code> class for configuration.</p>
<h2>Register</h2>
<pre class="hljs"><code><span class="hljs-keyword">import</span> MindMap <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;simple-mind-map&#x27;</span>
<span class="hljs-keyword">import</span> Watermark <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;simple-mind-map/src/plugins/Watermark.js&#x27;</span>
<span class="hljs-comment">// import Watermark from &#x27;simple-mind-map/src/Watermark.js&#x27; Use this path for versions below v0.6.0</span>

MindMap.usePlugin(Watermark)
</code></pre>
<p>After registration and instantiation of <code>MindMap</code>, the instance can be obtained through <code>mindMap.watermark</code>.</p>
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
<h3>hasWatermark()</h3>
<blockquote>
<p>v0.3.2+</p>
</blockquote>
<p>Gets whether the watermark exists.</p>

  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>