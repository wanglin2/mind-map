<template>
  <div>
    <h1>RichText插件</h1>
<blockquote>
<p>v0.4.0+</p>
</blockquote>
<p>该插件提供节点富文本编辑的能力，注册了即可生效。</p>
<p>默认节点编辑只能对节点内所有文本统一应用样式，通过该插件可以支持富文本编辑的效果，目前支持：加粗、斜体、下划线、删除线、字体、字号、颜色、背景颜色。不支持上划线、行高。</p>
<p>该插件的原理是使用<a href="https://github.com/quilljs/quill">Quill</a>编辑器实现富文本编辑，然后把编辑后生成的<code>DOM</code>节点直接作为节点的文本数据，并且在渲染的时候通过<code>svg</code>的<code>foreignObject</code>标签嵌入<code>DOM</code>节点。</p>
<blockquote>
<p>v0.5.6即以前的版本存在以下提示：</p>
<p>这样也造成了一个问题，就是导出为图片的功能受到了影响，原本将<code>svg</code>导出为图片的原理很简单，获取到<code>svg</code>字符串，然后创建为<code>type=image/svg+xml</code>类型的<code>blob</code>数据，再使用<code>URL.createObjectURL</code>方法生成<code>data:url</code>数据，再创建一个<code>Image</code>标签，将<code>data:url</code>作为该图片的<code>src</code>，最后再将这个图片绘制到<code>canvas</code>对象上进行导出，但是经过测试，当<code>svg</code>中嵌入了<code>DOM</code>节点，这种方式导出会出错，并且尝试了多种方式后都无法实现完美的导出效果，目前的方式是遍历<code>svg</code>中的<code>foreignObject</code>节点，使用<a href="https://github.com/niklasvh/html2canvas">html2canvas</a>将<code>foreignObject</code>节点内的<code>DOM</code>节点转换为图片再替换掉<code>foreignObject</code>节点，这种方式可以工作，但是非常耗时，因为<code>html2canvas</code>转换一次的时间很长，导致转换一个节点都需要耗时差不多2秒，这样导致节点越多，转换时间越慢，所以如果无法忍受长时间的导出的话推荐不要使用该插件。</p>
</blockquote>
<blockquote>
<p><code>v0.5.7+</code>的版本直接使用<code>html2canvas</code>转换整个<code>svg</code>，速度不再是问题，但是目前存在一个<code>bug</code>，就是节点的颜色导出后不生效。</p>
</blockquote>
<p><code>v0.6.13+</code>版本使用<a href="https://github.com/1904labs/dom-to-image-more">dom-to-image-more</a>替换了<code>html2canvas</code>，解决了节点的颜色导出后不生效的问题。</p>
<blockquote>
<p>dom-to-image-more兼容性比较差，在很多浏览器上导出图片都是空的，所以可以根据你自己的需求替换成html2canvas。</p>
</blockquote>
<p>从<code>0.6.16+</code>版本后不再使用<code>dom-to-image-more</code>、<code>html2canvas</code>之类的第三方库实现导出，兼容性及导出都不再有问题。</p>
<h2>注册</h2>
<pre class="hljs"><code><span class="hljs-keyword">import</span> MindMap <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;simple-mind-map&#x27;</span>
<span class="hljs-keyword">import</span> RichText <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;simple-mind-map/src/plugins/RichText.js&#x27;</span>
<span class="hljs-comment">// import RichText from &#x27;simple-mind-map/src/RichText.js&#x27; v0.6.0以下版本使用该路径</span>

MindMap.usePlugin(RichText, opt?)
</code></pre>
<p>注册完且实例化<code>MindMap</code>后可通过<code>mindMap.richText</code>获取到该实例。</p>
<h3>注册选项</h3>
<p><code>opt</code>选项可以传递以下参数：</p>
<ul>
<li><code>opt.fontFamilyList</code></li>
</ul>
<p>替换富文本编辑时内置字体列表。内置的列表为：</p>
<pre class="hljs"><code>[
  <span class="hljs-string">&#x27;宋体, SimSun, Songti SC&#x27;</span>,
  <span class="hljs-string">&#x27;微软雅黑, Microsoft YaHei&#x27;</span>,
  <span class="hljs-string">&#x27;楷体, 楷体_GB2312, SimKai, STKaiti&#x27;</span>,
  <span class="hljs-string">&#x27;黑体, SimHei, Heiti SC&#x27;</span>,
  <span class="hljs-string">&#x27;隶书, SimLi&#x27;</span>,
  <span class="hljs-string">&#x27;andale mono&#x27;</span>,
  <span class="hljs-string">&#x27;arial, helvetica, sans-serif&#x27;</span>,
  <span class="hljs-string">&#x27;arial black, avant garde&#x27;</span>,
  <span class="hljs-string">&#x27;comic sans ms&#x27;</span>,
  <span class="hljs-string">&#x27;impact, chicago&#x27;</span>,
  <span class="hljs-string">&#x27;times new roman&#x27;</span>,
  <span class="hljs-string">&#x27;sans-serif&#x27;</span>,
  <span class="hljs-string">&#x27;serif&#x27;</span>
]
</code></pre>
<ul>
<li><code>opt.fontSizeList</code></li>
</ul>
<p>替换富文本编辑时内置字号列表。内置的列表为：</p>
<pre class="hljs"><code>[<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, ..<span class="hljs-number">.100</span>]
</code></pre>
<h2>方法</h2>
<h3>setNotActiveNodeStyle(node, style)</h3>
<blockquote>
<p>v0.8.0+</p>
</blockquote>
<ul>
<li><code>style</code>：Object，样式对象。</li>
</ul>
<p>给未激活的节点设置富文本样式。</p>
<h3>selectAll()</h3>
<p>选中全部。当节点正在编辑中可以通过该方法选中节点内的所有文本。</p>
<h3>focus()</h3>
<blockquote>
<p>v0.4.7+</p>
</blockquote>
<p>聚焦。</p>
<h3>formatText(config = {})</h3>
<ul>
<li><code>config</code>：对象，键为样式属性，值为样式值，完整的配置如下：</li>
</ul>
<pre class="hljs"><code>{
    <span class="hljs-attr">font</span>: <span class="hljs-string">&#x27;字体&#x27;</span>,
    <span class="hljs-attr">size</span>: <span class="hljs-string">&#x27;12px,&#x27;</span> <span class="hljs-comment">// 字号</span>
    <span class="hljs-attr">bold</span>: <span class="hljs-literal">true</span>, <span class="hljs-comment">// 是否加粗，true/false </span>
    <span class="hljs-attr">italic</span>: <span class="hljs-literal">true</span>, <span class="hljs-comment">// 是否斜体，true/false </span>
    <span class="hljs-attr">underline</span>: <span class="hljs-literal">true</span>, <span class="hljs-comment">// 是否显示下划线，true/false </span>
    <span class="hljs-attr">strike</span>: <span class="hljs-literal">true</span>, <span class="hljs-comment">// 是否显示删除线，true/false </span>
    <span class="hljs-attr">color</span>: <span class="hljs-string">&#x27;#333&#x27;</span> <span class="hljs-comment">// 颜色</span>
}
</code></pre>
<p>格式化当前选中的文本。</p>
<h3>formatRangeText(range, config = {})</h3>
<ul>
<li><code>range</code>：<code>Quill</code>的范围对象，格式如下：</li>
</ul>
<pre class="hljs"><code>{
    index,
    length
}
</code></pre>
<ul>
<li><code>config</code>：同<code>formatText</code>方法</li>
</ul>
<p>格式化指定范围的文本。</p>
<h3>formatAllText(config = {})</h3>
<ul>
<li><code>config</code>：同<code>formatText</code>方法</li>
</ul>
<p>格式化当前编辑节点的所有文本。</p>
<h3>removeFormat()</h3>
<blockquote>
<p>v0.4.1+</p>
</blockquote>
<p>清除当前选中文本的样式。</p>
<h3>normalStyleToRichTextStyle(style)</h3>
<p>将普通节点样式对象转换成富文本样式对象。因为非富文本编辑时的节点样式属性和富文本样式属性是存在差异的，所以需要一个转换操作。比如：</p>
<pre class="hljs"><code>{
    <span class="hljs-attr">fontFamily</span>: <span class="hljs-string">&#x27;xxx&#x27;</span>
}

<span class="hljs-comment">// 转换后</span>

{
    <span class="hljs-attr">font</span>: <span class="hljs-string">&#x27;xxx&#x27;</span>
}
</code></pre>
<h3>richTextStyleToNormalStyle(config)</h3>
<p>将富文本样式对象转换成普通节点样式对象。比如：</p>
<pre class="hljs"><code>{
    <span class="hljs-attr">size</span>: <span class="hljs-string">&#x27;16px&#x27;</span>
}

<span class="hljs-comment">// 转换后</span>

{
    <span class="hljs-attr">fontSize</span>: <span class="hljs-number">16</span>
}
</code></pre>
<h3>handleSvgDomElements(svg)</h3>
<ul>
<li><code>svg</code>： <code>svg</code>节点</li>
</ul>
<p>将<code>svg</code>中嵌入的<code>dom</code>元素转换成图片，返回一个<code>Promise</code>。</p>
<h3>transformAllNodesToNormalNode()</h3>
<p>将所有节点转换成非富文本节点。</p>

  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>