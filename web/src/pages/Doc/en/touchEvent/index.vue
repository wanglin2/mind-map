<template>
  <div>
    <h1>TouchEvent plugin</h1>
<blockquote>
<p>v0.6.0+</p>
</blockquote>
<p>This plugin supports mobile touch events for users. The principle is to listen for 'touchstart', 'touchmove', and 'touchend' events on the mobile end, and then dispatch corresponding mouse events.</p>
<p>Currently, it supports single finger touch to move the canvas, click to activate nodes, double finger zoom the canvas, single finger double-click to reset and edit nodes.</p>
<h2>Register</h2>
<pre class="hljs"><code><span class="hljs-keyword">import</span> MindMap <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;simple-mind-map&#x27;</span>
<span class="hljs-keyword">import</span> TouchEvent <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;simple-mind-map/src/plugins/TouchEvent.js&#x27;</span>

MindMap.usePlugin(TouchEvent)
</code></pre>
<p>After registration and instantiation of <code>MindMap</code>, the instance can be obtained through <code>mindMap.touchEvent</code>.</p>

  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>