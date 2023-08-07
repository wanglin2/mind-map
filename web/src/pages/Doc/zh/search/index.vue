<template>
  <div>
    <h1>Search 插件</h1>
<blockquote>
<p>v0.6.9+</p>
</blockquote>
<p>该插件提供搜索和替换节点内容的功能。</p>
<h2>注册</h2>
<pre class="hljs"><code><span class="hljs-keyword">import</span> MindMap <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;simple-mind-map&#x27;</span>
<span class="hljs-keyword">import</span> Search <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;simple-mind-map/src/plugins/Search.js&#x27;</span>
MindMap.usePlugin(Search)
</code></pre>
<p>注册完且实例化<code>MindMap</code>后可通过<code>mindMap.search</code>获取到该实例。</p>
<h2>事件</h2>
<h3>search_info_change</h3>
<p>可以通过监听<code>search_info_change</code>事件来获取当前搜索结果的数量和当前定位到的索引。</p>
<pre class="hljs"><code>mindMap.on(<span class="hljs-string">&#x27;search_info_change&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">data</span>) =&gt;</span> {
    <span class="hljs-comment">/*
        data: {
            currentIndex,// 索引，从0开始
            total
        }
    */</span>
})
</code></pre>
<h2>方法</h2>
<h3>search(searchText, callback)</h3>
<ul>
<li>
<p><code>searchText</code>：要进行搜索的文本</p>
</li>
<li>
<p><code>callback</code>：本次搜索完成的回调函数，会在跳转到节点后触发</p>
</li>
</ul>
<p>搜索节点内容，可以重复调用，每调一次，会搜索和定位到下一个匹配的节点。如果搜索文本改变了，那么会重新搜索。</p>
<h3>endSearch()</h3>
<p>结束搜索。</p>
<h3>replace(replaceText, jumpNext = false)</h3>
<ul>
<li>
<p><code>replaceText</code>：要进行替换的文本</p>
</li>
<li>
<p><code>jumpNext</code>：v0.6.12+，是否自动跳转到下一个匹配节点</p>
</li>
</ul>
<p>替换当前节点内容，要在调用了<code>search</code>方法之后调用，会替换当前定位到的匹配节点内容。</p>
<h3>replaceAll(replaceText)</h3>
<ul>
<li><code>replaceText</code>：要进行替换的文本</li>
</ul>
<p>替换所有匹配的节点内容，要在调用了<code>search</code>方法之后调用。</p>
<h3>getReplacedText(node, searchText, replaceText)</h3>
<ul>
<li>
<p><code>node</code>：节点实例</p>
</li>
<li>
<p><code>searchText</code>：要进行搜索的文本</p>
</li>
<li>
<p><code>replaceText</code>：要进行替换的文本</p>
</li>
</ul>
<p>返回该节点搜索和替换后的文本内容，注意，不会实际改变节点内容，只是用来计算一个节点替换后的内容。</p>

  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>