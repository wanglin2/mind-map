<template>
  <div>
    <h1>如何实现搜索替换</h1>
<blockquote>
<p>需要先注册 Search 插件</p>
</blockquote>
<p>要实现搜索替换很简单，你只要先创建两个输入框，两个按钮，然后调用相关方法即可。</p>
<p>第一个输入框用于搜索，可以绑定一个回车事件，然后调用如下方法：</p>
<pre class="hljs"><code>mindMap.search.search(<span class="hljs-built_in">this</span>.searchText, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-built_in">this</span>.$refs.searchInputRef.focus()
})
</code></pre>
<p><code>search</code>方法调用一次就会跳转到下一个匹配的节点，当搜索文本改变后再调用，默认会重新搜索从头开始。</p>
<p><code>search</code>方法第二个参数是一个回调函数，当本次搜索完成，即在跳转到节点后调用，一般需要在这个回调函数里重新让你的输入框聚焦，因为激活节点会拿走焦点，所以你需要把焦点拿回来。</p>
<p>第二个输入框用于替换，替换支持单个替换和全部替换，需要注意的是要先在调用了<code>search</code>方法后才能调用这两个方法，单个替换只需要调用如下方法：</p>
<pre class="hljs"><code>mindMap.search.replace(<span class="hljs-built_in">this</span>.replaceText, <span class="hljs-literal">true</span>)
</code></pre>
<p>第二个参数传<code>true</code>会在替换完成后自动跳转到下一个匹配的节点，这样可以进行连续替换。</p>
<p>要进行全部替换可以调用如下方法：</p>
<pre class="hljs"><code>mindMap.search.replaceAll(<span class="hljs-built_in">this</span>.replaceText)
</code></pre>
<p>最后你可以通过监听<code>search_info_change</code>方法来获取匹配的节点数量和当前定位到的索引：</p>
<pre class="hljs"><code>mindMap.on(<span class="hljs-string">&#x27;search_info_change&#x27;</span>, <span class="hljs-function"><span class="hljs-params">data</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&#x27;当前所在：&#x27;</span>+ (data.currentIndex + <span class="hljs-number">1</span>), <span class="hljs-string">&#x27;匹配总数：&#x27;</span> + data.total)
})
</code></pre>

  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>