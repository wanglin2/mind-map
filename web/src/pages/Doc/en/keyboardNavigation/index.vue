<template>
  <div>
    <h1>KeyboardNavigation instance</h1>
<blockquote>
<p>v0.2.17+</p>
</blockquote>
<p><code>KeyboardNavigation</code> instance is responsible for handling keyboard navigation, that is, when you press the direction key, it will automatically find the next node and activate it, can be obtained through <code>mindMap.keyboardNavigation</code></p>
<h2>Methods</h2>
<h3>focus(dir)</h3>
<p><code>dir</code>：Which direction to find the next node，Optional value：<code>Left</code>、 <code>Up</code>、 <code>Right</code>、 <code>Down</code></p>
<p>Focus on the next node</p>
<h3>getNodeRect(node)</h3>
<p><code>node</code>：Node</p>
<p>Get the location information of the node and return an object:</p>
<pre class="hljs"><code>{
    left,
    top,
    right,
    bottom
}
</code></pre>
<h3>getDistance(node1Rect, node2Rect)</h3>
<p><code>node1Rect</code>、<code>node2Rect</code>：The location data of nodes can be obtained through the <code>getNodeRect(node)</code></p>
<p>Get the distance between two nodes</p>
<h3>getCenter(nodeRect)</h3>
<p><code>nodeRect</code>：The location data of nodes can be obtained through the <code>getNodeRect(node)</code></p>
<p>Get the center point of the node</p>

  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>