<template>
  <div>
    <h1>Render实例</h1>
<p><code>render</code>实例负载整个渲染过程，可通过<code>mindMap.renderer</code>获取到。</p>
<h2>属性</h2>
<h3>activeNodeList</h3>
<p>获取当前激活的节点列表。</p>
<h3>root</h3>
<p>获取节点树的根节点。</p>
<h2>方法</h2>
<h3>highlightNode(node, range)</h3>
<blockquote>
<p>v0.9.0+</p>
</blockquote>
<ul>
<li>
<p><code>node</code>：要高亮的目标节点实例</p>
</li>
<li>
<p><code>range</code>：可选，Array，一个范围数组，[0, 1]</p>
</li>
</ul>
<p>高亮节点或子节点。如果<code>range</code>参数没有传递，那么直接高亮指定的<code>node</code>节点，如果<code>range</code>传递了一个要高亮的子节点的范围，那么会高亮该范围的子节点。</p>
<p>高亮效果为通过一个矩形框来包裹，矩形的描边和填充样式可以通过<code>highlightNodeBoxStyle</code>实例化选项进行配置。</p>
<h3>closeHighlightNode()</h3>
<blockquote>
<p>v0.9.0+</p>
</blockquote>
<p>隐藏节点高亮框。</p>
<h3>setRootNodeCenter()</h3>
<blockquote>
<p>v0.8.0+</p>
</blockquote>
<p>回到中心主题，即设置根节点到画布中心。</p>
<h3>setData(data)</h3>
<blockquote>
<p>v0.7.3+</p>
</blockquote>
<p>动态设置思维导图数据。</p>
<h3>clearActive()</h3>
<blockquote>
<p>v0.8.0+已废弃</p>
</blockquote>
<p>清除当前激活的节点。</p>
<h3>clearAllActive()</h3>
<blockquote>
<p>v0.8.0+已废弃</p>
</blockquote>
<p>清除当前所有激活节点，并会触发<code>node_active</code>事件 。</p>
<h3>clearActiveNode()</h3>
<blockquote>
<p>v0.8.0+</p>
</blockquote>
<p>清除当前所有激活节点，并会触发<code>node_active</code>事件 。</p>
<h3>clearActiveNodeList()</h3>
<blockquote>
<p>v0.8.0+</p>
</blockquote>
<p>清除当前激活的节点列表。不会触发<code>node_active</code>事件 。</p>
<h3>startTextEdit()</h3>
<blockquote>
<p>v0.1.6+</p>
</blockquote>
<p>若有文字编辑需求可调用该方法，会禁用回车键和删除键相关快捷键防止冲突 。</p>
<h3>endTextEdit()</h3>
<blockquote>
<p>v0.1.6+</p>
</blockquote>
<p>结束文字编辑，会恢复回车键和删除键相关快捷键。</p>
<h3>addActiveNode(node)</h3>
<blockquote>
<p>v0.8.0+已废弃</p>
</blockquote>
<p>添加节点到激活列表里。</p>
<h3>addNodeToActiveList(node)</h3>
<blockquote>
<p>v0.8.0+</p>
</blockquote>
<p>添加节点到激活列表里。</p>
<h3>removeActiveNode(node)</h3>
<blockquote>
<p>v0.8.0+已废弃</p>
</blockquote>
<p>在激活列表里移除某个节点。</p>
<h3>removeNodeFromActiveList(node)</h3>
<blockquote>
<p>v0.8.0+</p>
</blockquote>
<p>在激活列表里移除某个节点。</p>
<h3>findActiveNodeIndex(node)</h3>
<p>检索某个节点在激活列表里的索引。</p>
<h3>getNodeIndex(node)</h3>
<p>获取节点在同级里的位置索引。</p>
<h3>removeOneNode(node)</h3>
<p>删除某个指定节点。</p>
<h3>copyNode()</h3>
<p>复制节点，操作节点为当前激活节点，有多个激活节点只会操作第一个节点。</p>
<h3>setNodeDataRender(node, data, notRender)</h3>
<ul>
<li><code>notRender</code>：v0.6.9+，<code>Boolean</code>，默认为<code>false</code>，是否不要触发渲染。</li>
</ul>
<p>设置节点数据，即<code>data</code>字段的数据，并会根据节点大小是否变化来判断是否需要重新渲染该节点，<code>data</code>为对象，如：<code>{text: '我是新文本'}</code>。</p>
<h3>moveNodeTo(node, toNode)</h3>
<blockquote>
<p>v0.1.5+</p>
</blockquote>
<p>移动一个节点作为另一个节点的子节点。</p>
<h3>insertBefore(node, exist)</h3>
<blockquote>
<p>v0.1.5+</p>
</blockquote>
<p>将节点移动到另一个节点的前面。</p>
<h3>insertAfter(node, exist)</h3>
<blockquote>
<p>v0.1.5+</p>
</blockquote>
<p>将节点移动到另一个节点的后面。</p>
<h3>moveNodeToCenter(node)</h3>
<blockquote>
<p>v0.2.17+</p>
</blockquote>
<p>移动节点到画布中心。</p>
<p>目前如果是存在缩放的情况下回到中心会重置缩放。</p>
<h3>expandToNodeUid(uid, callback)</h3>
<blockquote>
<p>v0.6.7+</p>
</blockquote>
<ul>
<li>
<p><code>uid</code>：节点uid</p>
</li>
<li>
<p><code>callback</code>：展开完成的回调函数</p>
</li>
</ul>
<p>展开到指定uid的节点。</p>
<h3>findNodeByUid(uid)</h3>
<blockquote>
<p>v0.6.7+</p>
</blockquote>
<ul>
<li><code>uid</code>：节点uid</li>
</ul>
<p>根据uid找到对应的节点实例。</p>
<h3>copy()</h3>
<blockquote>
<p>v0.6.8+</p>
</blockquote>
<p>复制节点，调用该方法后会存储当前激活的节点数据，多个激活节点只会操作第一个节点，后续调用<code>paste()</code>方法时可以进行粘贴。</p>
<h3>cut()</h3>
<blockquote>
<p>v0.6.8+</p>
</blockquote>
<p>剪切节点，调用该方法后会剪切当前激活的节点，并且存储该节点数据，多个节点只会操作第一个节点，后续调用<code>paste()</code>方法时可以进行粘贴。</p>
<h3>paste()</h3>
<blockquote>
<p>v0.6.8+</p>
</blockquote>
<p>粘贴节点，在调用了<code>copy()</code>或<code>cut()</code>方法后可以调用该方法进行粘贴节点。该方法不支持粘贴用户剪贴板中的数据，请使用内置的<code>Ctrl+v</code>快捷键。</p>

  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>