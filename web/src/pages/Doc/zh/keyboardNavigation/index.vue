<template>
  <div>
    <h1>KeyboardNavigation插件</h1>
<blockquote>
<p>v0.2.17+</p>
</blockquote>
<p><code>KeyboardNavigation</code>插件提供键盘导航的功能，也就是当你按下方向键时会自动寻找下一个节点并激活</p>
<h2>注册</h2>
<pre class="hljs"><code><span class="hljs-keyword">import</span> MindMap <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;simple-mind-map&#x27;</span>
<span class="hljs-keyword">import</span> KeyboardNavigation <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;simple-mind-map/src/plugins/KeyboardNavigation.js&#x27;</span>
<span class="hljs-comment">// import KeyboardNavigation from &#x27;simple-mind-map/src/KeyboardNavigation.js&#x27; v0.6.0以下版本使用该路径</span>

MindMap.usePlugin(KeyboardNavigation)
</code></pre>
<p>注册完且实例化<code>MindMap</code>后可通过<code>mindMap.keyboardNavigation</code>获取到该实例。</p>
<h2>方法</h2>
<h3>focus(dir)</h3>
<p><code>dir</code>：要寻找哪个方向的下一个节点，可选值：<code>Left</code>、 <code>Up</code>、 <code>Right</code>、 <code>Down</code></p>
<p>聚焦到下一个节点</p>
<h3>getNodeRect(node)</h3>
<p><code>node</code>：节点</p>
<p>获取节点的位置信息，返回一个对象：</p>
<pre class="hljs"><code>{
    left,
    top,
    right,
    bottom
}
</code></pre>
<h3>getDistance(node1Rect, node2Rect)</h3>
<p><code>node1Rect</code>、<code>node2Rect</code>：节点的位置数据，可通过<code>getNodeRect(node)</code>方法获取</p>
<p>获取两个节点的距离</p>
<h3>getCenter(nodeRect)</h3>
<p><code>nodeRect</code>：节点的位置数据，可通过<code>getNodeRect(node)</code>方法获取</p>
<p>获取节点的中心点</p>

  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>