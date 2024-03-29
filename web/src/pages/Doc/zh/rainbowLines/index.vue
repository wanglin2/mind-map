<template>
  <div>
    <h1>RainbowLines插件</h1>
<blockquote>
<p>v0.9.9+</p>
</blockquote>
<p>该插件用于实现彩虹线条。</p>
<p>开启彩虹线条及自定义颜色可以通过实例化选项<code>rainbowLinesConfig</code>设置。</p>
<p>默认的颜色列表如下：</p>
<pre class="hljs"><code>[
  'rgb(255, 213, 73)',
  'rgb(255, 136, 126)',
  'rgb(107, 225, 141)',
  'rgb(151, 171, 255)',
  'rgb(129, 220, 242)',
  'rgb(255, 163, 125)',
  'rgb(152, 132, 234)'
]
</code></pre>
<h2>注册</h2>
<pre class="hljs"><code><span class="hljs-keyword">import</span> MindMap <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;simple-mind-map&#x27;</span>
<span class="hljs-keyword">import</span> RainbowLines <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;simple-mind-map/src/plugins/RainbowLines.js&#x27;</span>
MindMap.usePlugin(RainbowLines)
</code></pre>
<p>注册完且实例化<code>MindMap</code>后可通过<code>mindMap.rainbowLines</code>获取到该实例。</p>
<h2>方法</h2>
<h3>updateRainLinesConfig(config = {})</h3>
<p>如果你在通过实例化选项<code>rainbowLinesConfig</code>设置了彩虹线条后想修改，那么可以使用该方法，参数<code>config</code>同<code>rainbowLinesConfig</code>。</p>
<pre class="hljs"><code>{
    <span class="hljs-attr">open</span>: <span class="hljs-literal">false</span>,<span class="hljs-comment">// 是否开启彩虹线条</span>
    <span class="hljs-attr">colorsList</span>: []<span class="hljs-comment">// 自定义彩虹线条的颜色列表，如果不设置，会使用默认颜色列表</span>
}
</code></pre>
<h3>getColorsList()</h3>
<p>获取当前使用的彩虹线条颜色列表。</p>
<h3>getNodeColor(node)</h3>
<p>获取指定的节点实例对应的彩虹线条颜色。</p>
<h3>getSecondLayerAncestor(node)</h3>
<p>获取一个节点实例的第二层级的祖先节点实例。</p>

  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>