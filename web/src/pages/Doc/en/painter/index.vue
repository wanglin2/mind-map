<template>
  <div>
    <h1>Painter plugin</h1>
<blockquote>
<p>v0.6.12+</p>
</blockquote>
<p>Node format brush plugin.</p>
<h2>Register</h2>
<pre class="hljs"><code><span class="hljs-keyword">import</span> MindMap <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;simple-mind-map&#x27;</span>
<span class="hljs-keyword">import</span> Painter <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;simple-mind-map/src/plugins/Painter.js&#x27;</span>
MindMap.usePlugin(Painter)
</code></pre>
<p>After registration and instantiation of <code>MindMap</code>, the instance can be obtained through <code>mindMap.painter</code>.</p>
<h2>Event</h2>
<blockquote>
<p>You can use mindMap.on('event name', () =&gt; {}) method to listen events.</p>
</blockquote>
<h3>painter_start</h3>
<p>The event of painter start.</p>
<h3>painter_end</h3>
<p>The event of painter end.</p>
<h2>Method</h2>
<h3>startPainter()</h3>
<p>Start painter.</p>
<p>After calling this method, if there is currently an active node, the first active node will be taken as the specified node by default. After clicking on other nodes, the style of that node will be applied to the other nodes being clicked. When clicking on the canvas, the format brushing operation ends.</p>

  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>