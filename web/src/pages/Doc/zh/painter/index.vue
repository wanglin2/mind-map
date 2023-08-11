<template>
  <div>
    <h1>Painter 插件</h1>
<blockquote>
<p>v0.6.12+</p>
</blockquote>
<p>节点格式刷插件。</p>
<h2>注册</h2>
<pre class="hljs"><code><span class="hljs-keyword">import</span> MindMap <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;simple-mind-map&#x27;</span>
<span class="hljs-keyword">import</span> Painter <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;simple-mind-map/src/plugins/Painter.js&#x27;</span>
MindMap.usePlugin(Painter)
</code></pre>
<p>注册完且实例化<code>MindMap</code>后可通过<code>mindMap.painter</code>获取到该实例。</p>
<h2>事件</h2>
<blockquote>
<p>可以通过mindMap.on('事件名称', () =&gt; {})来监听事件。</p>
</blockquote>
<h3>painter_start</h3>
<p>开始格式刷事件。</p>
<h3>painter_end</h3>
<p>结束格式刷事件。</p>
<h2>方法</h2>
<h3>startPainter()</h3>
<p>开始格式刷。</p>
<p>当调用了该方法后，如果当前存在激活节点，那么会默认取第一个激活的节点为指定节点，点击其他节点后，会把该节点的样式应用到被点击的其他节点，当点击画布后本次格式刷操作结束。</p>

  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>