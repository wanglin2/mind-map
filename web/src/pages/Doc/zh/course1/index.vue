<template>
  <div>
    <h1>基本使用</h1>
<blockquote>
<p>重要说明：</p>
<p>1.本教程中的在线编辑器中使用的是完整版的simple-mind-map，即包含所有插件，如果你是通过<code>npm</code>方式使用的话，需要自己手动注册相关插件。</p>
<p>2.本教程的代码示例基于Vue3.x，但是您不必担心，因为simple-mind-map本身是框架无关的，所以即使某些Vue3的语法您看不懂也不会影响对于逻辑的理解。</p>
</blockquote>
<p><code>simple-mind-map</code>的使用非常简单，提供一个宽高不为0的元素，然后创建一个实例即可：</p>
<iframe style="width: 100%; height: 455px; border: none;" src="https://wanglin2.github.io/playground/#eNptUktu2zAQvcqARWG7sCUV6EqVjX7QRRc+QacLVZzYLKQRQdJxAkObLHuKXiMXanOMDEXZCJIIECS+mff4+Dgn9dna7PpAqlSVb5yxATyFg90gm872LsAJHF0toedtf+BAGga4cn0HM2HNLl1bw3pb21RC5QVuadUJuupqiwoZ+SIxny9gvYETMkDTsw8QGyN9DUzHs9h8bACgtgTdN4eOOGQ7Ct9air9fbr/r+Wxifu051IbJzRbLxNJ1qMu0R3xQRQDVEyjBgW5ChFH9+3v/8Ofu/919tJvKwyQWG5u9abUjjs0/fiZ8iJ9h8RF5WCBXeYpQwpNFIMmgDiQrgEqbazB6jeq5YVSbKpeqtFX5E44sfbhtE/3TFDOqLE/ZThll5Lus8R6VeBCX8r55vsP5xEejw76E90XxdmwG2JPZ7UMJH4rC3oyYHOh1jXdnla52O8MlFJOGrbU2vDsDIiAxjMbVUiXbcQSy375nmbJRBaeC2L7cByoZqHQRWS6/mZNZMR3FE65+uf7oyYkIqulKXhmyxH2ZT2RN3gY1PAJQKfo9" />
<p>注意，我们还给容器元素设置了样式：</p>
<pre class="hljs"><code><span class="hljs-selector-id">#mindMapContainer</span> * {
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
}
</code></pre>
<p>这是为了避免节点内的文字因为默认样式而出现偏移。</p>
<p>一个节点的基本数据结构如下所示：</p>
<pre class="hljs"><code>{
    <span class="hljs-attr">data</span>: {
        <span class="hljs-comment">// 节点文本</span>
        <span class="hljs-attr">text</span>: <span class="hljs-string">&#x27;根节点&#x27;</span>,
        <span class="hljs-comment">// 图片</span>
        <span class="hljs-attr">image</span>: <span class="hljs-string">&#x27;xxx.jpg&#x27;</span>,
        <span class="hljs-attr">imageTitle</span>: <span class="hljs-string">&#x27;图片名称&#x27;</span>,
        <span class="hljs-attr">imageSize</span>: {
            <span class="hljs-attr">width</span>: <span class="hljs-number">1152</span>,
            <span class="hljs-attr">height</span>: <span class="hljs-number">1152</span>
        },
        <span class="hljs-comment">// 图标</span>
        <span class="hljs-attr">icon</span>: [<span class="hljs-string">&#x27;priority_1&#x27;</span>],
        <span class="hljs-comment">// 标签</span>
        <span class="hljs-attr">tag</span>: [<span class="hljs-string">&#x27;标签1&#x27;</span>, <span class="hljs-string">&#x27;标签2&#x27;</span>],
        <span class="hljs-comment">// 链接</span>
        <span class="hljs-attr">hyperlink</span>: <span class="hljs-string">&#x27;http://lxqnsys.com/&#x27;</span>,
        <span class="hljs-attr">hyperlinkTitle</span>: <span class="hljs-string">&#x27;理想青年实验室&#x27;</span>,
        <span class="hljs-comment">// 备注内容</span>
        <span class="hljs-attr">note</span>: <span class="hljs-string">&#x27;理想青年实验室\n一个有意思的角落&#x27;</span>,
        <span class="hljs-comment">// 概要</span>
        <span class="hljs-attr">generalization</span>: {
            <span class="hljs-attr">text</span>: <span class="hljs-string">&#x27;概要的内容&#x27;</span>
        },
        <span class="hljs-comment">// 节点是否展开</span>
        <span class="hljs-attr">expand</span>: <span class="hljs-literal">true</span>,
    },
    <span class="hljs-attr">children</span>: []<span class="hljs-comment">// 子节点</span>
}
</code></pre>
<p><code>icon</code>可以使用内置的图标，完整图标可以在<a href="https://github.com/wanglin2/mind-map/blob/main/simple-mind-map/src/svg/icons.js">icons.js</a>文件中查看。也可以扩展图标，参考<a href="https://wanglin2.github.io/mind-map/#/doc/zh/course19/%E6%89%A9%E5%B1%95%E5%9B%BE%E6%A0%87">扩展图标</a>。</p>
<p>创建实例时还支持传递其他很多选项参数，完整选项列表可以在<a href="https://wanglin2.github.io/mind-map/#/doc/zh/constructor/%E5%AE%9E%E4%BE%8B%E5%8C%96%E9%80%89%E9%A1%B9">实例化选项</a>查看。</p>
<p>这样得到的思维导图可以通过鼠标和快捷键进行操作，比如单击某个节点可以激活它，双击某个节点可以编辑节点文本，按下<code>Tab</code>键会给当前激活的节点添加一个子节点，按下<code>Enter</code>键会给当前激活的节点添加一个兄弟节点等等，完整的快捷键列表可以参考<a href="https://github.com/wanglin2/mind-map/blob/main/web/src/config/zh.js#L246">快捷键列表</a>。</p>
<p>当然有些功能还是需要UI界面的，比如图标列表、编辑超链接等等，需要注意的是<code>simple-mind-map</code>库并不包含UI界面，所以需要你自己开发，然后通过<code>simple-mind-map</code>提供的相关API来操作，本教程的其他章节会向你介绍如何使用。</p>

  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>