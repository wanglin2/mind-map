<template>
  <div>
    <h1>如何自定义节点内容</h1>
<blockquote>
<p>该特性v0.6.3+版本支持</p>
</blockquote>
<p>如果你想自定义节点的内容，那么可以在实例化<code>simple-mind-map</code>时传入以下选项：</p>
<pre class="hljs"><code><span class="hljs-keyword">new</span> MindMap({
    <span class="hljs-attr">isUseCustomNodeContent</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">customCreateNodeContent</span>: <span class="hljs-function">(<span class="hljs-params">node</span>) =&gt;</span> {
        <span class="hljs-comment">// return你的自定义DOM节点</span>
    }
})
</code></pre>
<p><code>customCreateNodeContent</code>方法会接收当前遍历到的节点实例作为参数，一般而言你会需要该节点的数据，这可以通过如下方式获取：</p>
<pre class="hljs"><code>node.nodeData.data
</code></pre>
<p>其他节点实例属性你可以自行打印出来看看。</p>
<p><code>customCreateNodeContent</code>方法需要返回<code>DOM</code>节点，如果某个节点你不想自定义，那么可以返回<code>null</code>，那么还是会走内置的节点渲染逻辑。</p>
<p>返回的<code>DOM</code>节点的宽高需要是确定的，如果是动态的那么会导致宽高获取错误，最终导致节点定位错误和发生重叠等问题。</p>
<p>如果使用了自定义节点内容，那么内置的插入节点内容的相关方法你都不应该再使用，因为相当于整个节点内容都由你自己控制，另外，节点样式设置也不会再生效，切换主题也只会切换非节点内容的样式，最后，双击节点也不会再进入编辑，所以这个功能一般用于展示性的需求。</p>
<h2>示例1：渲染自定义DOM节点</h2>
<pre class="hljs"><code>{
    <span class="hljs-attr">customCreateNodeContent</span>: <span class="hljs-function">(<span class="hljs-params">node</span>) =&gt;</span> {
        <span class="hljs-keyword">let</span> div = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">&#x27;div&#x27;</span>)
        div.className = <span class="hljs-string">&#x27;xxx&#x27;</span>
        div.style.cssText = <span class="hljs-string">`xxx`</span>
        div.innerHTML = <span class="hljs-string">`
            &lt;h1&gt;我是自定义节点&lt;/h1&gt;
            <span class="hljs-subst">${ node.nodeData.text }</span>
        `</span>
        <span class="hljs-keyword">return</span> div
    }
}
</code></pre>
<h2>示例2：渲染Vue2组件</h2>
<p>如果想要使用一个相对简单的<code>Vue</code>组件，那么可以通过如下方式：</p>
<pre class="hljs"><code><span class="hljs-keyword">import</span> CustomNodeContent <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;CustomNodeContent.vue&#x27;</span>
<span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;vue&#x27;</span>

{
    <span class="hljs-attr">customCreateNodeContent</span>: <span class="hljs-function">(<span class="hljs-params">node</span>) =&gt;</span> {
        <span class="hljs-keyword">let</span> el = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">&#x27;div&#x27;</span>)
        <span class="hljs-keyword">let</span> Comp = Vue.extend(CustomNodeContent)
        <span class="hljs-keyword">let</span> comp = <span class="hljs-keyword">new</span> Comp({
            <span class="hljs-comment">// props</span>
            <span class="hljs-attr">propsData</span>: {
                <span class="hljs-attr">html</span>: node.nodeData.data.text
            }
        })
        comp.$mount(el)
        <span class="hljs-keyword">return</span> comp.$el
    }
}
</code></pre>
<p>如果你的<code>Vue</code>组件比较复杂，里面用到了<code>vueRouter</code>、<code>vuex</code>、<code>i18n</code>等，那么要和你项目的入口组件一样，在实例化时要把这些内容也加载到组件内，不然会报错。</p>
<pre class="hljs"><code><span class="hljs-keyword">import</span> CustomNodeContent <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;CustomNodeContent.vue&#x27;</span>
<span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;vue&#x27;</span>
<span class="hljs-keyword">import</span> router <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./router&#x27;</span>
<span class="hljs-keyword">import</span> store <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./store&#x27;</span>
<span class="hljs-keyword">import</span> i18n <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./i18n&#x27;</span>

{
    <span class="hljs-attr">customCreateNodeContent</span>: <span class="hljs-function">(<span class="hljs-params">node</span>) =&gt;</span> {
        <span class="hljs-keyword">let</span> el = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">&#x27;div&#x27;</span>)
        <span class="hljs-keyword">let</span> Comp = Vue.extend(CustomNodeContent)
        <span class="hljs-keyword">let</span> comp = <span class="hljs-keyword">new</span> Comp({
            <span class="hljs-comment">// props</span>
            <span class="hljs-attr">propsData</span>: {
                <span class="hljs-attr">html</span>: node.nodeData.data.text
            },
            router,
            store,
            i18n
        })
        comp.$mount(el)
        <span class="hljs-keyword">return</span> comp.$el
    }
}
</code></pre>
<h2>示例3：渲染Vue3组件</h2>
<pre class="hljs"><code><span class="hljs-keyword">import</span> { createApp } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;vue&quot;</span>
<span class="hljs-keyword">import</span> CustomNodeContent <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./CustomNodeContent.vue&#x27;</span>

{
    <span class="hljs-attr">customCreateNodeContent</span>: <span class="hljs-function">(<span class="hljs-params">node</span>) =&gt;</span> {
        <span class="hljs-keyword">let</span> el = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">&#x27;div&#x27;</span>)
        <span class="hljs-keyword">const</span> app = createApp(CustomNodeContent, {<span class="hljs-comment">// props</span>
            <span class="hljs-attr">html</span>: node.nodeData.data.text
        })
        app.mount(el)
        <span class="hljs-keyword">return</span> el
    }
}
</code></pre>
<h2>示例4：渲染react组件</h2>
<pre class="hljs"><code><span class="hljs-keyword">import</span> { createRoot } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react-dom/client&#x27;</span>

{
    <span class="hljs-attr">customCreateNodeContent</span>: <span class="hljs-function">(<span class="hljs-params">node</span>) =&gt;</span> {
        <span class="hljs-keyword">const</span> el = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">&#x27;div&#x27;</span>)
        el.style.width = <span class="hljs-string">&#x27;227px&#x27;</span>
        el.style.height = <span class="hljs-string">&#x27;60px&#x27;</span>
        <span class="hljs-keyword">const</span> currentNode = node.nodeData.data
        <span class="hljs-keyword">const</span> root = createRoot(el)
        root.render({currentNode.text})
        <span class="hljs-keyword">return</span> el
    }
}
</code></pre>
<blockquote>
<p>感谢<a href="https://github.com/h5chenhang">h5chenhang</a>贡献的<a href="https://github.com/wanglin2/mind-map/issues/192">示例代码</a>。</p>
</blockquote>

  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>