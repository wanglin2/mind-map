<template>
  <div>
    <h1>RainbowLines plugin</h1>
<blockquote>
<p>v0.9.9+</p>
</blockquote>
<p>This plugin is used to implement rainbow lines.</p>
<p>Enabling rainbow lines and custom colors can be set through the instantiation option 'rainbowLinesConfig'.</p>
<p>The default color list is as follows:</p>
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
<h2>Register</h2>
<pre class="hljs"><code><span class="hljs-keyword">import</span> MindMap <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;simple-mind-map&#x27;</span>
<span class="hljs-keyword">import</span> RainbowLines <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;simple-mind-map/src/plugins/RainbowLines.js&#x27;</span>
MindMap.usePlugin(RainbowLines)
</code></pre>
<p>After registration and instantiation of <code>MindMap</code>, the instance can be obtained through <code>mindMap.rainbowLines</code>.</p>
<h2>Method</h2>
<h3>updateRainLinesConfig(config = {})</h3>
<p>If you want to modify the rainbow lines after setting them through the instantiation option 'rainbowLinesConfig', you can use this method, option <code>config</code> is same with <code>rainbowLinesConfig</code>。</p>
<pre class="hljs"><code>{
    <span class="hljs-attr">open</span>: <span class="hljs-literal">false</span>,<span class="hljs-comment">// Is turn on rainbow lines</span>
    <span class="hljs-attr">colorsList</span>: []<span class="hljs-comment">// Customize the color list for rainbow lines. If not set, the default color list will be used</span>
}
</code></pre>
<h3>getColorsList()</h3>
<p>Get a list of currently used rainbow line colors.</p>
<h3>getNodeColor(node)</h3>
<p>Retrieve the rainbow line color corresponding to the specified node instance.</p>
<h3>getSecondLayerAncestor(node)</h3>
<p>Retrieve the second level ancestor node instance of a node instance.</p>

  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>