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
<p>一般来说你的右键菜单中肯定也会添加这三个按钮，另外快捷键操作也是必不可少的，但是这三个快捷键是没有内置的，所以你需要自己注册一下：</p>
<pre class="hljs"><code>mindMap.keyCommand.addShortcut(<span class="hljs-string">&#x27;Control+c&#x27;</span>, copy)
mindMap.keyCommand.addShortcut(<span class="hljs-string">&#x27;Control+v&#x27;</span>, paste)
mindMap.keyCommand.addShortcut(<span class="hljs-string">&#x27;Control+x&#x27;</span>, cut)
</code></pre>
<p>如需删除调用<code>removeShortcut</code>方法即可。</p>
<p>接下来实现一下这三个方法：</p>
<pre class="hljs"><code><span class="hljs-comment">// 保存复制/剪切的节点的数据，后续可以原来粘贴</span>
<span class="hljs-keyword">let</span> copyData = <span class="hljs-literal">null</span>

<span class="hljs-keyword">const</span> copy = <span class="hljs-function">() =&gt;</span> {
    copyData = mindMap.renderer.copyNode()
}

<span class="hljs-keyword">const</span> cut = <span class="hljs-function">() =&gt;</span> {
    mindMap.execCommand(<span class="hljs-string">&#x27;CUT_NODE&#x27;</span>, <span class="hljs-function"><span class="hljs-params">_copyData</span> =&gt;</span> {
        copyData = _copyData
    })
}

<span class="hljs-keyword">const</span> paste = <span class="hljs-function">() =&gt;</span> {
    mindMap.execCommand(<span class="hljs-string">&#x27;PASTE_NODE&#x27;</span>, copyData)
}
</code></pre>
<h2>完整示例</h2>
<iframe style="width: 100%; height: 455px; border: none;" src="https://wanglin2.github.io/playground/#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" />
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>