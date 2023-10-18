<template>
  <div>
    <h1>RichText plugin</h1>
<blockquote>
<p>v0.4.0+</p>
</blockquote>
<p>This plugin provides the ability to edit rich text of nodes, and takes effect after registration.</p>
<p>By default, node editing can only uniformly apply styles to all text in the node. This plugin can support rich text editing effects. Currently, it supports bold, italic, underline, strikethrough, font, font size, color, and backgroundColor. Underline and line height are not supported.</p>
<p>The principle of this plugin is to use <a href="https://github.com/quilljs/quill">Quill</a> editor implements rich text editing, and then uses the edited <code>DOM</code> node directly as the text data of the node, and embeds the <code>DOM</code> node through the <code>svg</code> <code>foreignObject</code> tag during rendering.</p>
<blockquote>
<p>The following prompts exist in versions prior to v0.5.6:</p>
<p>This also caused a problem, that is, the function of exporting as a picture was affected, The original principle of exporting <code>svg</code> as an image is very simple, Get the <code>svg</code> string, and then create the <code>blob</code> data of the <code>type=image/svg+xml</code> type. Then use the <code>URL.createObjectURL</code> method to generate the <code>data:url</code> data. Then create a <code>Image</code> tag, use the <code>data:url</code> as the <code>src</code> of the image, and finally draw the image on the <code>canvas</code> object for export, However, after testing, when the <code>DOM</code> node is embedded in the <code>svg</code>, this method of export will cause errors, and after trying many ways, the perfect export effect cannot be achieved, The current method is to traverse the <code>foreignObject</code> node in <code>svg</code>, using <a href="https://github.com/niklasvh/html2canvas">html2canvas</a> Convert the <code>DOM</code> node in the <code>foreignObject</code> node into an image and then replace the <code>foreignObject</code> node. This method can work, but it is very time-consuming. Because the <code>html2canvas</code> conversion takes a long time, it takes about 2 seconds to convert a node. This leads to the more nodes, the slower the conversion time. Therefore, it is recommended not to use this plugin if you cannot tolerate the long time of export.</p>
</blockquote>
<blockquote>
<p>The version of <code>v0.5.7+</code> directly uses <code>html2canvas</code> to convert the entire <code>svg</code>, which is no longer an issue with speed. However, there is currently a bug where the color of the node does not take effect after export.</p>
</blockquote>
<p><code>V0.6.13+</code> version uses <a href="https://github.com/1904labs/dom-to-image-more">dom-to-image-more</a> Replaced 'html2canvas' to address the issue of ineffective color export for nodes.</p>
<blockquote>
<p>The compatibility of dom to image more is relatively poor, and exported images are empty on many browsers, so you can replace them with html2canvas according to your own needs.</p>
</blockquote>
<p>After version <code>0.6.16+</code>, third-party libraries such as 'dom-to-image-more' and 'html2canvas' will no longer be used for export, Compatibility and export are no longer issues.</p>
<h2>Register</h2>
<pre class="hljs"><code><span class="hljs-keyword">import</span> MindMap <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;simple-mind-map&#x27;</span>
<span class="hljs-keyword">import</span> RichText <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;simple-mind-map/src/plugins/RichText.js&#x27;</span>
<span class="hljs-comment">// import RichText from &#x27;simple-mind-map/src/RichText.js&#x27; Use this path for versions below v0.6.0</span>

MindMap.usePlugin(RichText, opt?)
</code></pre>
<p>After registration and instantiation of <code>MindMap</code>, the instance can be obtained through <code>mindMap.richText</code>.</p>
<h3>Register options</h3>
<p>The <code>opt</code> option can pass the following parameters:</p>
<ul>
<li><code>opt.fontFamilyList</code></li>
</ul>
<p>Replace the built-in font list during rich text editing. The built-in list is:</p>
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
<p>Replace the built-in font size list during rich text editing. The built-in list is:</p>
<pre class="hljs"><code>[<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, ..<span class="hljs-number">.100</span>]
</code></pre>
<h2>Method</h2>
<h3>setNotActiveNodeStyle(node, style)</h3>
<blockquote>
<p>v0.8.0+</p>
</blockquote>
<ul>
<li><code>style</code>：Object, style object.</li>
</ul>
<p>Set rich text style for inactive nodes.</p>
<h3>selectAll()</h3>
<p>Select All. When the node is being edited, you can select all the text in the node through this method.</p>
<h3>focus()</h3>
<blockquote>
<p>v0.4.7+</p>
</blockquote>
<p>Focus.</p>
<h3>formatText(config = {})</h3>
<ul>
<li><code>config</code>：Object. The key is the style attribute and the value is the style value. The complete configuration is as follows:</li>
</ul>
<pre class="hljs"><code>{
    <span class="hljs-attr">font</span>: <span class="hljs-string">&#x27;字体&#x27;</span>,
    <span class="hljs-attr">size</span>: <span class="hljs-string">&#x27;12px,&#x27;</span> <span class="hljs-comment">// font size</span>
    <span class="hljs-attr">bold</span>: <span class="hljs-literal">true</span>, <span class="hljs-comment">// Bold or not, true/false </span>
    <span class="hljs-attr">italic</span>: <span class="hljs-literal">true</span>, <span class="hljs-comment">// Italic or not, true/false </span>
    <span class="hljs-attr">underline</span>: <span class="hljs-literal">true</span>, <span class="hljs-comment">// Show underline or not, true/false </span>
    <span class="hljs-attr">strike</span>: <span class="hljs-literal">true</span>, <span class="hljs-comment">// Whether to display strikethrough, true/false </span>
    <span class="hljs-attr">color</span>: <span class="hljs-string">&#x27;#333&#x27;</span> <span class="hljs-comment">// color</span>
}
</code></pre>
<p>Formats the currently selected text.</p>
<h3>formatRangeText(range, config = {})</h3>
<ul>
<li><code>range</code>：The range object of <code>Quill</code>, has the following format:</li>
</ul>
<pre class="hljs"><code>{
    index,
    length
}
</code></pre>
<ul>
<li><code>config</code>：Same as <code>formatText</code> method</li>
</ul>
<p>Formats the text of the specified range.</p>
<h3>formatAllText(config = {})</h3>
<ul>
<li><code>config</code>：Same as <code>formatText</code> method</li>
</ul>
<p>Formats all text of the current edit node.</p>
<h3>removeFormat()</h3>
<blockquote>
<p>v0.4.1+</p>
</blockquote>
<p>Clears the style of the currently selected text.</p>
<h3>normalStyleToRichTextStyle(style)</h3>
<p>Converts a normal node style object to a rich text style object. Because there are differences between node style attributes and rich text style attributes during non-rich text editing, a conversion operation is required. For example:</p>
<pre class="hljs"><code>{
    <span class="hljs-attr">fontFamily</span>: <span class="hljs-string">&#x27;xxx&#x27;</span>
}

<span class="hljs-comment">// After conversion</span>

{
    <span class="hljs-attr">font</span>: <span class="hljs-string">&#x27;xxx&#x27;</span>
}
</code></pre>
<h3>richTextStyleToNormalStyle(config)</h3>
<p>Converts rich text style objects to normal node style objects. For example:</p>
<pre class="hljs"><code>{
    <span class="hljs-attr">size</span>: <span class="hljs-string">&#x27;16px&#x27;</span>
}

<span class="hljs-comment">// After conversion</span>

{
    <span class="hljs-attr">fontSize</span>: <span class="hljs-number">16</span>
}
</code></pre>
<h3>handleSvgDomElements(svg)</h3>
<ul>
<li><code>svg</code>: <code>svg</code> node</li>
</ul>
<p>Convert the <code>dom</code> element embedded in the <code>svg</code> into a picture and return a <code>Promise</code>.</p>
<h3>transformAllNodesToNormalNode()</h3>
<p>Convert all nodes to non-rich text nodes.</p>

  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>