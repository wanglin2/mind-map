<template>
  <div>
    <h1>Search plugin</h1>
<blockquote>
<p>v0.6.9+</p>
</blockquote>
<p>This plugin provides the ability to search and replace node content.</p>
<h2>Register</h2>
<pre class="hljs"><code><span class="hljs-keyword">import</span> MindMap <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;simple-mind-map&#x27;</span>
<span class="hljs-keyword">import</span> Search <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;simple-mind-map/src/plugins/Search.js&#x27;</span>
MindMap.usePlugin(Search)
</code></pre>
<p>After registration and instantiation of <code>MindMap</code>, the instance can be obtained through <code>mindMap.search</code>.</p>
<h2>Event</h2>
<h3>search_info_change</h3>
<p>You can listen to 'search_info_change' event to get the number of current search results and the index currently located.</p>
<pre class="hljs"><code>mindMap.on(<span class="hljs-string">&#x27;search_info_change&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">data</span>) =&gt;</span> {
    <span class="hljs-comment">/*
        data: {
            currentIndex,// Index, from zero
            total
        }
    */</span>
})
</code></pre>
<h2>Method</h2>
<h3>search(searchText, callback)</h3>
<ul>
<li>
<p><code>searchText</code>: Text to search for</p>
</li>
<li>
<p><code>callback</code>: The callback function that completes this search will be triggered after jumping to the node</p>
</li>
</ul>
<p>Search for node content, which can be called repeatedly. Each call will search and locate to the next matching node. If the search text changes, it will be searched again.</p>
<h3>endSearch()</h3>
<p>End search.</p>
<h3>replace(replaceText, jumpNext = false)</h3>
<ul>
<li>
<p><code>replaceText</code>: Text to be replaced</p>
</li>
<li>
<p><code>jumpNext</code>: v0.6.12+, Whether to automatically jump to the next matching node</p>
</li>
</ul>
<p>To replace the content of the current node, call the 'search' method after calling it to replace the content of the currently located matching node.</p>
<h3>replaceAll(replaceText)</h3>
<ul>
<li><code>replaceText</code>: Text to be replaced</li>
</ul>
<p>Replace all matching node contents, and call it after calling the 'search' method.</p>
<h3>getReplacedText(node, searchText, replaceText)</h3>
<ul>
<li>
<p><code>node</code>: Node instance</p>
</li>
<li>
<p><code>searchText</code>: Text to search for</p>
</li>
<li>
<p><code>replaceText</code>: Text to be replaced</p>
</li>
</ul>
<p>Return the text content of the node after search and replacement. Note that the node content will not be actually changed, but is only used to calculate the content of a node after replacement.</p>

  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>