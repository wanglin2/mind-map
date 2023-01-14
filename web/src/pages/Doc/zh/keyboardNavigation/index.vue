<template>
  <div>
    <h1>KeyboardNavigation实例</h1>
<blockquote>
<p>v0.2.17+</p>
</blockquote>
<p><code>KeyboardNavigation</code>实例负责处理键盘导航，也就是当你按下方向键时会自动寻找下一个节点并激活，可通过<code>mindMap.keyboardNavigation</code>获取到该实例</p>
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