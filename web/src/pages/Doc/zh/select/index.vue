<template>
  <div>
    <h1>Select 插件</h1>
<p><code>Select</code>插件提供鼠标多选节点的功能。</p>
<h2>注册</h2>
<pre class="hljs"><code><span class="hljs-keyword">import</span> MindMap <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;simple-mind-map&#x27;</span>
<span class="hljs-keyword">import</span> Select <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;simple-mind-map/src/plugins/Select.js&#x27;</span>
<span class="hljs-comment">// import Select from &#x27;simple-mind-map/src/Select.js&#x27; v0.6.0以下版本使用该路径</span>

MindMap.usePlugin(Select)
</code></pre>
<p>注册完且实例化<code>MindMap</code>后可通过<code>mindMap.select</code>获取到该实例。</p>
<h2>方法</h2>
<h3>toPos(x, y)</h3>
<p>转换鼠标位置为相对于容器<code>el</code>的位置</p>

  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>