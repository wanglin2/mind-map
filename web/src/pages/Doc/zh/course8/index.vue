<template>
  <div>
    <h1>开启节点富文本编辑</h1>
<p>默认节点编辑是不支持富文本模式的，如果要开启需要使用富文本编辑插件，但是富文本编辑模式目前存在缺陷，详情可以阅读<a href="https://wanglin2.github.io/mind-map/#/doc/zh/richText">richText</a>。</p>
<p>富文本编辑的优势就是可以对一个节点内的部分文本设置样式，所以通常来说还需要搭配一个悬浮的工具栏，这个功能默认也是没有的，涉及到UI的功能一般都不提供，所以也需要你自行开发，如何渲染这个悬浮工具栏可以阅读<a href="https://wanglin2.github.io/mind-map/#/doc/zh/course16">如何渲染富文本的悬浮工具栏</a>。</p>
<p>如果也你需要动态切换是否开启富文本编辑的功能可以参考如下代码：</p>
<pre class="hljs"><code><span class="hljs-keyword">import</span> MindMap <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;simple-mind-map&#x27;</span>
<span class="hljs-keyword">import</span> RichText <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;simple-mind-map/src/plugins/RichText.js&#x27;</span>
<span class="hljs-comment">// import RichText from &#x27;simple-mind-map/src/RichText.js&#x27; v0.6.0以下版本使用该路径</span>

<span class="hljs-comment">// 动态开启富文本编辑</span>
mindMap.addPlugin(RichText)

<span class="hljs-comment">// 动态关闭富文本编辑</span>
mindMap.removePlugin(RichText)
</code></pre>
<p>如果你使用的是<code>simpleMindMap.umd.js</code>或<code>simpleMindMap.esm.js</code>这种打包后的完整版，那么是不支持切换的，默认是就是开启的，如有相关需求可以提<a href="https://github.com/wanglin2/mind-map/issues">issue</a>。</p>

  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>