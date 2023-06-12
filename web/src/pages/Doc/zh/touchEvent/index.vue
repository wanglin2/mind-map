<template>
  <div>
    <h1>TouchEvent插件</h1>
<blockquote>
<p>v0.6.0+</p>
</blockquote>
<p>该插件用户支持移动端触摸事件。原理是监听移动端的<code>touchstart</code>、<code>touchmove</code>、<code>touchend</code>事件，然后派发对应的鼠标事件。</p>
<p>目前支持单指触摸移动画布、点击激活节点，双指缩放画布，单指双击复位和编辑节点。</p>
<h2>注册</h2>
<pre class="hljs"><code><span class="hljs-keyword">import</span> MindMap <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;simple-mind-map&#x27;</span>
<span class="hljs-keyword">import</span> TouchEvent <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;simple-mind-map/src/plugins/TouchEvent.js&#x27;</span>

MindMap.usePlugin(TouchEvent)
</code></pre>
<p>注册完且实例化<code>MindMap</code>后可通过<code>mindMap.touchEvent</code>获取到该实例。</p>

  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>