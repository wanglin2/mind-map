<template>
  <div>
    <h1>NodeImgAdjust插件</h1>
<blockquote>
<p>v0.6.5+</p>
</blockquote>
<p>该插件提供拖拽调整节点内图片大小的功能。</p>
<h2>注册</h2>
<pre class="hljs"><code><span class="hljs-keyword">import</span> MindMap <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;simple-mind-map&#x27;</span>
<span class="hljs-keyword">import</span> NodeImgAdjust <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;simple-mind-map/src/plugins/NodeImgAdjust.js&#x27;</span>

MindMap.usePlugin(NodeImgAdjust)
</code></pre>
<p>注册完且实例化<code>MindMap</code>后可通过<code>mindMap.nodeImgAdjust</code>获取到该实例。</p>

  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>