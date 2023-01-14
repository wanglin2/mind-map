<template>
  <div>
    <h1>Render实例</h1>
<p><code>render</code>实例负载整个渲染过程，可通过<code>mindMap.renderer</code>获取到</p>
<h2>属性</h2>
<h3>activeNodeList</h3>
<p>获取当前激活的节点列表</p>
<h3>root</h3>
<p>获取节点树的根节点</p>
<h2>方法</h2>
<h3>clearActive()</h3>
<p>清除当前激活的节点</p>
<h3>clearAllActive()</h3>
<p>清除当前所有激活节点，并会触发<code>node_active</code>事件</p>
<h3>startTextEdit()</h3>
<p>（v0.1.6+）若有文字编辑需求可调用该方法，会禁用回车键和删除键相关快捷键防止冲突</p>
<h3>endTextEdit()</h3>
<p>（v0.1.6+）结束文字编辑，会恢复回车键和删除键相关快捷键</p>
<h3>addActiveNode(node)</h3>
<p>添加节点到激活列表里</p>
<h3>removeActiveNode(node)</h3>
<p>在激活列表里移除某个节点</p>
<h3>findActiveNodeIndex(node)</h3>
<p>检索某个节点在激活列表里的索引</p>
<h3>getNodeIndex(node)</h3>
<p>获取节点在同级里的位置索引</p>
<h3>removeOneNode(node)</h3>
<p>删除某个指定节点</p>
<h3>copyNode()</h3>
<p>复制节点，操作节点为当前激活节点，有多个激活节点只会操作第一个节点</p>
<h3>setNodeDataRender(node, data)</h3>
<p>设置节点数据，即<code>data</code>字段的数据，并会根据节点大小是否变化来判断是否需要重新渲染该节点，<code>data</code>为对象，如：<code>{text: '我是新文本'}</code></p>
<h3>moveNodeTo(node, toNode)</h3>
<blockquote>
<p>v0.1.5+</p>
</blockquote>
<p>移动一个节点作为另一个节点的子节点</p>
<h3>insertBefore(node, exist)</h3>
<blockquote>
<p>v0.1.5+</p>
</blockquote>
<p>将节点移动到另一个节点的前面</p>
<h3>insertAfter(node, exist)</h3>
<blockquote>
<p>v0.1.5+</p>
</blockquote>
<p>将节点移动到另一个节点的后面</p>
<h3>moveNodeToCenter(node)</h3>
<blockquote>
<p>v0.2.17+</p>
</blockquote>
<p>移动节点到画布中心。</p>
<p>目前如果是存在缩放的情况下回到中心会重置缩放。</p>

  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>