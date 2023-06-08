<template>
  <div>
    <h1>Drag插件</h1>
<p><code>Drag</code>插件提供节点拖拽的功能，包括：</p>
<p>1.拖拽节点进行移动，改变节点在节点树中的位置，即作为其他节点的子节点、兄弟节点等等</p>
<p>2.拖拽节点到自定义的画布位置</p>
<p>配置请参考<code>MindMap</code>类的<a href="/mind-map/#/doc/zh/constructor">实例化选项</a>。</p>
<h2>注册</h2>
<pre class="hljs"><code><span class="hljs-keyword">import</span> MindMap <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;simple-mind-map&#x27;</span>
<span class="hljs-keyword">import</span> Drag <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;simple-mind-map/src/plugins/Drag.js&#x27;</span>
<span class="hljs-comment">// import Drag from &#x27;simple-mind-map/src/Drag.js&#x27; v0.6.0以下版本使用该路径</span>

MindMap.usePlugin(Drag)
</code></pre>
<p>注册完且实例化<code>MindMap</code>后可通过<code>mindMap.drag</code>获取到该实例。</p>

  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>