<template>
  <div>
    <h1>如何渲染一个大纲</h1>
<p>思维导图本质就是一颗树，所以你可以使用树组件来完成大纲的显示。</p>
<p>可以监听<code>data_change</code>事件来获取当前最新的思维导图数据：</p>
<pre class="hljs"><code>mindMap.on(<span class="hljs-string">&#x27;data_change&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">data</span>) =&gt;</span> {
    <span class="hljs-comment">// data数据是不带节点对象的纯数据</span>
    <span class="hljs-comment">// 如果你需要操作节点对象，可以使用mindMap.renderer.renderTree</span>
    <span class="hljs-built_in">console</span>.log(data, mindMap.renderer.renderTree)
})
</code></pre>
<p>通常点击了大纲的某个节点，会将画布定位到该节点并激活该节点，这可以这么做：</p>
<pre class="hljs"><code><span class="hljs-keyword">const</span> node = data._node
mindMap.renderer.moveNodeToCenter(node)
node.active()
</code></pre>
<p>当在大纲树上编辑了某个节点的内容，需要同步到思维导图树上：</p>
<pre class="hljs"><code>data._node.setText(<span class="hljs-string">&#x27;xxx&#x27;</span>)
</code></pre>
<p>要插入兄弟节点或子节点可以这么操作：</p>
<pre class="hljs"><code>mindMap.execCommand(<span class="hljs-string">&#x27;INSERT_NODE&#x27;</span>, <span class="hljs-literal">false</span>)
mindMap.execCommand(<span class="hljs-string">&#x27;INSERT_CHILD_NODE&#x27;</span>, <span class="hljs-literal">false</span>)
</code></pre>

  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>