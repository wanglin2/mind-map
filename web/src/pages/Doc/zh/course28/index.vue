<template>
  <div>
    <h1>如何动态修改自定义元素的大小</h1>
<p>自定义节点大小不会随着自定义元素大小改变而自动改变，如果有动态修改自定义节点内容大小的需求，比如展开收起一部分内容，目前可以尝试如下做法：</p>
<p>1.控制节点大小的字段必须是节点数据中的一个字段，否则重新渲染时节点重新创建大小又会恢复最初的大小：</p>
<pre class="hljs"><code><span class="hljs-keyword">new</span> MindMap({
    <span class="hljs-attr">isUseCustomNodeContent</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">customCreateNodeContent</span>: <span class="hljs-function"><span class="hljs-params">node</span> =&gt;</span> {
        <span class="hljs-keyword">let</span> el = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">&#x27;div&#x27;</span>)
        <span class="hljs-keyword">const</span> _expand = node.nodeData.data._expand
        el.style.background = <span class="hljs-string">&#x27;#000&#x27;</span>
        el.style.width = <span class="hljs-string">&#x27;100px&#x27;</span>
        el.style.height = _expand ? <span class="hljs-string">&#x27;100px&#x27;</span> : <span class="hljs-string">&#x27;50px&#x27;</span>
        <span class="hljs-keyword">return</span> el
    }
})
</code></pre>
<p>可以给节点数据添加一个自定义字段，比如<code>_expand</code>，然后通过这个字段来控制自定义元素的大小。</p>
<p>2.点击自定义节点内容切换大小时需要修改节点数据，然后调用渲染方法：</p>
<pre class="hljs"><code><span class="hljs-keyword">new</span> MindMap({
    <span class="hljs-attr">isUseCustomNodeContent</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">customCreateNodeContent</span>: <span class="hljs-function"><span class="hljs-params">node</span> =&gt;</span> {
        <span class="hljs-keyword">const</span> el = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">&#x27;div&#x27;</span>)
        <span class="hljs-keyword">const</span> _expand = node.nodeData.data._expand
        el.style.background = <span class="hljs-string">&#x27;#000&#x27;</span>
        el.style.width = <span class="hljs-string">&#x27;100px&#x27;</span>
        el.style.height = _expand ? <span class="hljs-string">&#x27;100px&#x27;</span> : <span class="hljs-string">&#x27;50px&#x27;</span>
        el.addEventListener(<span class="hljs-string">&#x27;click&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
            node.setData({
                <span class="hljs-attr">resetRichText</span>: <span class="hljs-literal">true</span>,
                <span class="hljs-attr">_expand</span>: !_expand
            })
            <span class="hljs-built_in">this</span>.mindMap.render()
        })
        <span class="hljs-keyword">return</span> el
    }
})
</code></pre>
<p>注意其中的<code>resetRichText</code>字段必须设置为<code>true</code>，否则不会触发渲染。</p>
<h3>完整示例</h3>
<iframe style="width: 100%; height: 455px; border: none;" src="https://wanglin2.github.io/playground/#eNq1Vc1uEzEQfpXBCG2K0k3KzyWkhf4dkGiFKjjhCm13J4nprr2yvUmrKpceEQ/BjWdonwdRHoPxrvenTbggYanNeuabb8Yz4/EV283zcF4gG7GxibXILRi0Rb7DpchypS1cgcZJH5Q8UoW0mPTBzKI0VYsTnMASJlplEBBD0FgcCZkcRXml4syQOMXNjKSbWZRzxiUAlylacDKH3AZZpCmXXDZuer0N2N6BKwfuwHBR0/dKFQCmI0hUXGQobThFe5ii+9y7fJv0Am+5r6SNhEQdbPQrqySy0ahid4szJ+CsI3JCixfWCTn79f3m99fru+sbzjxDhShE4gBbtWzZaDmLZyJNNEoH+NQadTz8xfFD5z9vv93d/ljj/14Mz7ryNo41sZy2ui7ufwX2/J8Cqz+9rLYTUtgTpeyxSvC9MsIKJckySHFigz4EMdWe6nzq4bHGyOIxLhx+D2fRXCg9gkAquxtbMceg5jUfDe4XxqrMQV3HENMIrC6w5iq1+xVjFyNp0zRrtWIljaXepJ5tmrOKxfdnL0jEPNh4aPEZL/JIJq7ViTR0/w6oDqErRuiVrQ2mobGXKYZnUXw+1XRznGXweDgc0nVcQS1EYmcOsDUc5hfrEDMU05klSB3H6xoMlLSXK1ZRkhzO6TTvhKFUoO4FcSricypE5/q2qzwTzRd3pPr+dpdGUp6IePaBWuxe7rvLxzaCRysJKTulk1S3/AwIqckSirCj7SI1TT0t6Uy+3dzPcuMVlw40HlSzkaYibSzSQKNK0g5gTGWEOI2M2ebMuzrATHFWqj1AJK22GUYEGQ9IW/H4r/GgQ0/bsi4l4o0fr5yFg2qm+kkYosnC2BjOKFw3WgHCTiR1Ecrq06gaDp+UOIC8uT8aySPdhlJRnt39PX4YcU3VGkZnRqWFrQwB3C0cwdDvrMrbzar7qtlG8MI1WO15vd+ntecs0lNBfmvWnDpQyGktIAKqVZky1mdVwtyjE34xStIbV7Jwr6CENdONM3rCqqEWDugz1PQKiQxdbjfPtFoY1ETSDLk1z1plu1oZZ+VjW7LlHxp7SUc=" />

  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>