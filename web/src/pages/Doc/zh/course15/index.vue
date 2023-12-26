<template>
  <div>
    <h1>如何渲染一个右键菜单</h1>
<p>右键菜单可以方便的完成一些功能，大体上分两种，一是在画布上点击右键，二是在节点上点击右键，两者的功能肯定是不一样的，甚至根节点和其他节点功能上也有些不同，比如根节点不能添加同级节点，也不能被删除等等。</p>
<p>右键菜单的UI界面需要你自行开发，可以设置成绝对定位或固定定位，然后让它显示在鼠标右键点击的位置即可。</p>
<h2>右键菜单的显示和隐藏</h2>
<p>首先监听<code>node_contextmenu</code>事件在右键点击节点时显示菜单：</p>
<pre class="hljs"><code><span class="hljs-comment">// 当前右键点击的类型</span>
<span class="hljs-keyword">const</span> type = ref(<span class="hljs-string">&#x27;&#x27;</span>)
<span class="hljs-comment">// 如果点击的节点，那么代表被点击的节点</span>
<span class="hljs-keyword">const</span> currentNode = shallowRef(<span class="hljs-literal">null</span>)
<span class="hljs-comment">// 菜单显示的位置</span>
<span class="hljs-keyword">const</span> left = ref(<span class="hljs-number">0</span>)
<span class="hljs-keyword">const</span> top = ref(<span class="hljs-number">0</span>)
<span class="hljs-comment">// 是否显示菜单</span>
<span class="hljs-keyword">const</span> show = ref(<span class="hljs-literal">false</span>)

mindMap.on(<span class="hljs-string">&#x27;node_contextmenu&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">e, node</span>) =&gt;</span> {
    type.value = <span class="hljs-string">&#x27;node&#x27;</span>
    left.value = e.clientX + <span class="hljs-number">10</span>
    top.value = e.clientY + <span class="hljs-number">10</span>
    show.value = <span class="hljs-literal">true</span>
    currentNode.value = node
})
</code></pre>
<p>你可以根据当前点击的节点来判断一些操作是否可用。比如根节点不能删除，不能插入同级节点，又比如同级第一个节点不能再被往上移，同级最后一个节点不能被往下移。</p>
<p>对于画布的处理会比较麻烦，不能直接监听<code>contextmenu</code>事件，因为会和右键多选节点冲突，所以需要结合<code>mousedown</code>事件和<code>mouseup</code>事件来处理。</p>
<pre class="hljs"><code><span class="hljs-comment">// 记录鼠标右键按下的位置</span>
<span class="hljs-keyword">const</span> mousedownX = ref(<span class="hljs-number">0</span>)
<span class="hljs-keyword">const</span> mousedownY = ref(<span class="hljs-number">0</span>)
<span class="hljs-keyword">const</span> isMousedown = ref(<span class="hljs-literal">false</span>)

mindMap.on(<span class="hljs-string">&#x27;svg_mousedown&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">e</span>) =&gt;</span> {
    <span class="hljs-comment">// 如果不是右键点击直接返回</span>
    <span class="hljs-keyword">if</span> (e.which !== <span class="hljs-number">3</span>) {
        <span class="hljs-keyword">return</span>
    }
    mousedownX.value = e.clientX
    mousedownY.value = e.clientY
    isMousedown.value = <span class="hljs-literal">true</span>
})

mindMap.on(<span class="hljs-string">&#x27;mouseup&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">e</span>) =&gt;</span> {
    <span class="hljs-keyword">if</span> (!isMousedown.value) {
        <span class="hljs-keyword">return</span>
    }
    isMousedown.value = <span class="hljs-literal">false</span>
    <span class="hljs-comment">// 如果鼠标松开和按下的距离大于3，则不认为是点击事件</span>
    <span class="hljs-keyword">if</span> (
        <span class="hljs-built_in">Math</span>.abs(mousedownX.value - e.clientX) &gt; <span class="hljs-number">3</span> ||
        <span class="hljs-built_in">Math</span>.abs(mousedownX.value - e.clientY) &gt; <span class="hljs-number">3</span>
    ) {
        hide()
        <span class="hljs-keyword">return</span>
    }
    type.value = <span class="hljs-string">&#x27;svg&#x27;</span>
    left.value = e.clientX + <span class="hljs-number">10</span>
    top.value = e.clientY + <span class="hljs-number">10</span>
    show.value = <span class="hljs-literal">true</span>
})
</code></pre>
<p>很简单，其实就是判断鼠标按下和松开的距离是否很小，是的话就认为是点击事件，否则应该是鼠标拖动。</p>
<p>右键菜单显示了，肯定就需要隐藏，当左键点击了画布、左键点击了节点、左键点击了展开收起按钮时都需要隐藏右键菜单。</p>
<pre class="hljs"><code><span class="hljs-keyword">const</span> hide = <span class="hljs-function">() =&gt;</span> {
    show.value = <span class="hljs-literal">false</span>
    left.value = <span class="hljs-number">0</span>
    top.value = <span class="hljs-number">0</span>
    type.value = <span class="hljs-string">&#x27;&#x27;</span>
}
mindMap.on(<span class="hljs-string">&#x27;node_click&#x27;</span>, hide)
mindMap.on(<span class="hljs-string">&#x27;draw_click&#x27;</span>, hide)
mindMap.on(<span class="hljs-string">&#x27;expand_btn_click&#x27;</span>, hide)
</code></pre>
<h2>复制、剪切、粘贴的实现</h2>
<p>接下来介绍一下复制、剪切、粘贴的实现。</p>
<p>一般来说你的右键菜单中肯定也会添加这三个按钮，当点击这三个按钮时你需要调用对应的方法：</p>
<pre class="hljs"><code><span class="hljs-comment">// 当点击了复制按钮时调用</span>
mindMap.renderer.copy()

<span class="hljs-comment">// 当点击了剪切按钮时调用</span>
mindMap.renderer.cut()

<span class="hljs-comment">// 当点击了粘贴按钮时调用</span>
mindMap.renderer.paste()
</code></pre>

  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>