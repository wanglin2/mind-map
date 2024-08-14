<template>
  <div>
    <h1>如何通过代码激活节点</h1>
<p>默认可以通过鼠标单击节点来激活单个节点，鼠标拖拽或按住Ctrl键单击进行激活多个节点，那么如何通过代码来激活单个或多个节点，达到和鼠标操作一样的效果呢，请往下看。</p>
<h2>激活单个节点</h2>
<p>如果已经获取到节点实例，那么直接调用该节点实例的<code>active()</code>方法即可：</p>
<pre class="hljs"><code>node.active()
</code></pre>
<p>如果只知道节点<code>uid</code>，那么可以先获取节点实例，再调激活的方法：</p>
<pre class="hljs"><code><span class="hljs-keyword">const</span> node = mindMap.renderer.findNodeByUid(<span class="hljs-string">&#x27;uid&#x27;</span>)
node.active()
</code></pre>
<h2>激活多个节点</h2>
<p>如果要激活多个节点，在<code>v0.10.6</code>版本以前需要这么做：</p>
<pre class="hljs"><code>;[id1, id2, id3].forEach(<span class="hljs-function"><span class="hljs-params">id</span> =&gt;</span> {
    <span class="hljs-comment">// 获取节点实例</span>
    <span class="hljs-keyword">const</span> node = mindMap.renderer.findNodeByUid(id)
    <span class="hljs-comment">// 手动派发节点激活前事件</span>
    mindMap.emit(
        <span class="hljs-string">&#x27;before_node_active&#x27;</span>,
        node,
        mindMap.renderer.activeNodeList
    )
    <span class="hljs-comment">// 激活节点，并将该节点添加到激活节点列表里</span>
    mindMap.renderer.addNodeToActiveList(node, <span class="hljs-literal">true</span>)
    <span class="hljs-comment">// 手动派发节点激活事件</span>
    mindMap.renderer.emitNodeActiveEvent(node)
})
</code></pre>
<p>在<code>v0.10.6+</code>版本，<code>render</code>实例新增了激活多个节点的方法，所以可以直接使用：</p>
<pre class="hljs"><code><span class="hljs-keyword">const</span> nodeList = [id1, id2, id3, id4].map(<span class="hljs-function"><span class="hljs-params">id</span> =&gt;</span> {
    <span class="hljs-keyword">return</span> mindMap.renderer.findNodeByUid(id)
})
mindMap.renderer.activeMultiNode(nodeList)
</code></pre>
<h2>取消激活所有节点</h2>
<p>取消激活所有节点可以直接调用<code>render</code>实例的方法：</p>
<pre class="hljs"><code>mindMap.renderer.clearActiveNode()
</code></pre>
<p>这个方法不会派发<code>before_node_active</code>事件，所以如果需要你可以自己手动派发一下。</p>
<h2>取消激活指定节点</h2>
<p>要取消激活指定的节点，在<code>v0.10.6</code>版本以前需要这么做：</p>
<pre class="hljs"><code>;[id1, id2, id3, id4].forEach(<span class="hljs-function"><span class="hljs-params">id</span> =&gt;</span> {
    <span class="hljs-keyword">const</span> node = mindMap.renderer.findNodeByUid(id)
    mindMap.renderer.removeNodeFromActiveList(node)
    mindMap.renderer.emitNodeActiveEvent(<span class="hljs-literal">null</span>)
})
</code></pre>
<p>在<code>v0.10.6+</code>版本，<code>render</code>实例新增了取消激活多个节点的方法，所以可以直接使用：</p>
<pre class="hljs"><code><span class="hljs-keyword">const</span> nodeList = [id1, id2, id3, id4].map(<span class="hljs-function"><span class="hljs-params">id</span> =&gt;</span> {
    <span class="hljs-keyword">return</span> mindMap.renderer.findNodeByUid(id)
})
mindMap.renderer.cancelActiveMultiNode(nodeList)
</code></pre>

  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>