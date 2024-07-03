<template>
  <div>
    <h1>OuterFrame 插件</h1>
<blockquote>
<p>v0.10.2+</p>
</blockquote>
<p>该插件用于实现外框功能。</p>
<h2>注册</h2>
<pre class="hljs"><code><span class="hljs-keyword">import</span> MindMap <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;simple-mind-map&#x27;</span>
<span class="hljs-keyword">import</span> OuterFrame <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;simple-mind-map/src/plugins/OuterFrame.js&#x27;</span>
MindMap.usePlugin(OuterFrame)
</code></pre>
<p>注册完且实例化<code>MindMap</code>后可通过<code>mindMap.outerFrame</code>获取到该实例。</p>
<p>应用使用可参考Demo该部分的代码：<a href="https://github.com/wanglin2/mind-map/blob/main/web/src/pages/Edit/components/NodeOuterFrame.vue">NodeOuterFrame.vue</a>。</p>
<h2>命令</h2>
<p>该插件会向思维导图注册<code>ADD_OUTER_FRAME</code>命令，用于给节点添加外框：</p>
<pre class="hljs"><code>mindMap.execCommand(<span class="hljs-string">&#x27;ADD_OUTER_FRAME&#x27;</span>, appointNodes, config = {})
</code></pre>
<ul>
<li>
<p><code>appointNodes</code>：指定要添加外框的节点实例节点，可以是单个节点实例，也可以是节点实例数组，如果传递<code>[]</code>或<code>null</code>，则会向画布当前激活的节点添加外框</p>
</li>
<li>
<p><code>config</code>：外框配置，对象格式，字段如下：</p>
</li>
</ul>
<table>
<thead>
<tr>
<th>字段名称</th>
<th>类型</th>
<th>默认值</th>
<th>描述</th>
</tr>
</thead>
<tbody>
<tr>
<td>radius</td>
<td>Number</td>
<td>5</td>
<td>外框圆角大小</td>
</tr>
<tr>
<td>strokeWidth</td>
<td>Number</td>
<td>2</td>
<td>外框边框宽度</td>
</tr>
<tr>
<td>strokeColor</td>
<td>String</td>
<td>#0984e3</td>
<td>外框边框颜色</td>
</tr>
<tr>
<td>strokeDasharray</td>
<td>String</td>
<td>5,5</td>
<td>外框边框虚线</td>
</tr>
<tr>
<td>fill</td>
<td>String</td>
<td>rgba(9,132,227,0.05)</td>
<td>外框填充颜色</td>
</tr>
</tbody>
</table>
<h2>事件</h2>
<h3>outer_frame_active</h3>
<p>当点击激活某个外框时触发。回调函数接收三个参数：el（外框元素，@svgdotjs/svg.js库的rect元素）, node（该范围所属节点的父节点实例）, range（范围区间，相对于node）</p>
<p>应用可以监听该事件来获取当前激活的外框，获取到其配置回显到页面，因为范围可能包含多个节点，所以通常取第一个节点实例，如果要获取外框在页面上的位置，可以调用<code>el.rbox</code>方法：</p>
<pre class="hljs"><code>mindMap.on(<span class="hljs-string">&#x27;outer_frame_active&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">el, parentNode, range</span>) =&gt;</span> {
    <span class="hljs-comment">// 取范围内第一个节点的外框样式</span>
    <span class="hljs-keyword">const</span> firstNode = parentNode.children[range[<span class="hljs-number">0</span>]]
    <span class="hljs-keyword">const</span> firstNodeOuterFrame = firstNode.getData(<span class="hljs-string">&#x27;outerFrame&#x27;</span>)
    <span class="hljs-comment">// 获取外框的位置大小信息，你可以在该位置渲染你的配置浮层</span>
    <span class="hljs-keyword">const</span> { x, y, width, height } = el.rbox()
})
</code></pre>
<h3>outer_frame_delete</h3>
<p>删除画布当前激活的外框时触发。</p>
<h2>方法</h2>
<h3>getActiveOuterFrame()</h3>
<p>获取当前激活的外框数据。返回一个对象，结构如下：</p>
<pre class="hljs"><code>{
    el,
    node,
    range
}
</code></pre>
<h3>updateActiveOuterFrame(config = {})</h3>
<p>更新当前激活的外框。执行了该方法后请立即隐藏你的样式面板，因为会清除当前激活的外框。</p>
<h3>removeActiveOuterFrame()</h3>
<p>删除当前激活的外框。</p>
<h3>getRangeNodeList(node, range)</h3>
<p>获取某个节点指定范围的带外框的子节点列表。</p>
<h3>clearActiveOuterFrame()</h3>
<p>清除当前激活的外框。</p>

  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>