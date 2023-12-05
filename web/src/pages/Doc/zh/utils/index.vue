<template>
  <div>
    <h1>内置工具方法</h1>
<h2>基础工具方法</h2>
<p>引用：</p>
<pre class="hljs"><code><span class="hljs-keyword">import</span> {walk, ...} <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;simple-mind-map/src/utils&#x27;</span>
</code></pre>
<h3>方法</h3>
<h4>resizeImgSizeByOriginRatio(width, height, newWidth, newHeight)</h4>
<blockquote>
<p>v0.6.5+</p>
</blockquote>
<p><code>width</code>: 图片原始的宽度</p>
<p><code>height</code>：图片原始的高度</p>
<p><code>newWidth</code>：要缩放到的宽度</p>
<p><code>newHeight</code>：要缩放到的高度</p>
<p>按比例缩放图片。在保持图片原始宽高比的情况下缩放到指定的<code>newWidth</code>、<code>newHeight</code>大小。</p>
<h4>walk(root, parent, beforeCallback, afterCallback, isRoot, layerIndex = 0, index = 0)</h4>
<p>深度优先遍历树</p>
<p><code>root</code>：要遍历的树的根节点</p>
<p><code>parent</code>：父节点</p>
<p><code>beforeCallback</code>：前序遍历回调函数，回调参数为：root, parent, isRoot, layerIndex, index</p>
<p><code>afterCallback</code>：后序遍历回调函数，回调参数为：root, parent, isRoot, layerIndex, index</p>
<p><code>isRoot</code>：是否是根节点</p>
<p><code>layerIndex</code>：节点层级</p>
<p><code>index</code>：节点在同级节点里的索引</p>
<p>示例：</p>
<pre class="hljs"><code>walk(tree, <span class="hljs-literal">null</span>, <span class="hljs-function">() =&gt;</span> {}, <span class="hljs-function">() =&gt;</span> {}, <span class="hljs-literal">false</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>)
</code></pre>
<h4>bfsWalk(root, callback)</h4>
<p>广度优先遍历树</p>
<h4>resizeImgSize(width, height, maxWidth, maxHeight)</h4>
<p>缩放图片的尺寸</p>
<p><code>width</code>：图片原本的宽</p>
<p><code>height</code>：图片原本的高</p>
<p><code>maxWidth</code>：要缩放到的宽</p>
<p><code>maxHeight</code>：要缩放到的高</p>
<p><code>maxWidth</code>和<code>maxHeight</code>可以同时都传，也可以只传一个</p>
<h4>resizeImg(imgUrl, maxWidth, maxHeight)</h4>
<p>缩放图片，内部先加载图片，然后调用<code>resizeImgSize</code>方法，返回一个<code>promise</code></p>
<h4>simpleDeepClone(data)</h4>
<p>极简的深拷贝方法，只能针对全是基本数据的对象，否则会报错</p>
<h4>copyRenderTree(tree, root)</h4>
<p>复制渲染树数据，示例：</p>
<pre class="hljs"><code>copyRenderTree({}, <span class="hljs-built_in">this</span>.mindMap.renderer.renderTree)
</code></pre>
<h4>copyNodeTree(tree, root, removeActiveState, removeId)</h4>
<ul>
<li>
<p><code>removeActiveState</code>：<code>Boolean</code>，默认为<code>false</code>，是否移除节点的激活状态</p>
</li>
<li>
<p><code>removeId</code>：v0.7.3-fix.1+，是否移除节点数据中的uid，默认为<code>true</code></p>
</li>
</ul>
<blockquote>
<ul>
<li><code>keepId</code>： （原第四个参数）<code>Boolean</code>，默认为<code>false</code>，是否保留被复制节点的<code>id</code>，默认会删除<code>id</code>防止节点<code>id</code>重复，但是对于移动节点的场景，节点原<code>id</code>需要保留。</li>
</ul>
</blockquote>
<p>复制节点树数据，主要是剔除其中的引用<code>node</code>实例的<code>_node</code>，然后复制<code>data</code>对象的数据，示例：</p>
<pre class="hljs"><code>copyNodeTree({}, node)
</code></pre>
<h4>imgToDataUrl(src)</h4>
<p>图片转成dataURL</p>
<h4>downloadFile(file, fileName)</h4>
<p>下载文件</p>
<h4>throttle(fn, time = 300, ctx)</h4>
<p>节流函数</p>
<h4>asyncRun(taskList, callback = () =&gt; {})</h4>
<p>异步执行任务队列，多个任务是同步执行的，没有先后顺序</p>
<h4>degToRad(deg)</h4>
<blockquote>
<p>v0.2.24+</p>
</blockquote>
<p>角度转弧度</p>
<h4>camelCaseToHyphen(str)</h4>
<blockquote>
<p>v0.2.24+</p>
</blockquote>
<p>驼峰转连字符</p>
<h4>joinFontStr({ italic, bold, fontSize, fontFamily })</h4>
<blockquote>
<p>v0.3.4+</p>
</blockquote>
<p>拼接<code>css</code>字体的<code>font</code>属性值</p>
<h4>measureText(text, { italic, bold, fontSize, fontFamily })</h4>
<blockquote>
<p>v0.3.4+</p>
</blockquote>
<p>测量文本的宽高，返回值：</p>
<pre class="hljs"><code>{ width, height }
</code></pre>
<h4>getTextFromHtml(html)</h4>
<p>提取html字符串里的纯文本内容。</p>
<h4>readBlob(blob)</h4>
<blockquote>
<p>v0.5.9+</p>
</blockquote>
<p>将<code>blob</code>数据转成<code>data:url</code>数据。</p>
<h4>parseDataUrl(data)</h4>
<blockquote>
<p>v0.6.6+</p>
</blockquote>
<p>解析<code>data:url</code>数据，返回：</p>
<pre class="hljs"><code>{
  type,<span class="hljs-comment">// 数据的文件类型</span>
  base64<span class="hljs-comment">// base64数据</span>
}
</code></pre>
<h4>getImageSize(src)</h4>
<blockquote>
<p>v0.6.6+</p>
</blockquote>
<ul>
<li><code>src</code>：图片的url</li>
</ul>
<p>获取图片的大小。返回：</p>
<pre class="hljs"><code>{
  width,
  height
}
</code></pre>
<h4>loadImage(imgFile)</h4>
<blockquote>
<p>v0.6.8+</p>
</blockquote>
<ul>
<li><code>imgFile</code>：图片类型的File对象</li>
</ul>
<p>加载图片，返回：</p>
<pre class="hljs"><code>{
  url,<span class="hljs-comment">// DataUrl</span>
  size<span class="hljs-comment">// { width, height } 图片宽高</span>
}
</code></pre>
<h4>getType(data)</h4>
<blockquote>
<p>v0.6.9+</p>
</blockquote>
<p>获取一个数据的类型，比如<code>Boolean</code>、<code>Array</code>等。</p>
<h4>removeHtmlStyle(html)</h4>
<blockquote>
<p>v0.6.10+</p>
</blockquote>
<p>移除html字符串中节点的内联样式。</p>
<h4>addHtmlStyle(html, tag, style)</h4>
<blockquote>
<p>v0.6.10+</p>
</blockquote>
<p>给html标签中指定的标签添加内联样式。</p>
<h4>checkIsRichText(str)</h4>
<blockquote>
<p>v0.6.10+</p>
</blockquote>
<p>检查一个字符串是否是富文本字符。</p>
<h4>isWhite(color)</h4>
<blockquote>
<p>v0.6.11+</p>
</blockquote>
<p>判断一个颜色是否是白色。</p>
<h4>isTransparent(color)</h4>
<blockquote>
<p>v0.6.11+</p>
</blockquote>
<p>判断一个颜色是否是透明。</p>
<h4>nodeRichTextToTextWithWrap(html)</h4>
<blockquote>
<p>v0.6.12+</p>
</blockquote>
<p>将<code>&lt;p&gt;&lt;span&gt;&lt;/span&gt;&lt;p&gt;</code>形式的节点富文本内容转换成<code>\n</code>换行的文本。</p>
<h4>textToNodeRichTextWithWrap(html)</h4>
<blockquote>
<p>v0.6.12+</p>
</blockquote>
<p>将<code>&lt;br&gt;</code>换行的文本转换成<code>&lt;p&gt;&lt;span&gt;&lt;/span&gt;&lt;p&gt;</code>形式的节点富文本内容。</p>
<h4>isMobile()</h4>
<blockquote>
<p>v0.6.13+</p>
</blockquote>
<p>判断是否是移动端环境。</p>
<h4>getTopAncestorsFomNodeList(list)</h4>
<blockquote>
<p>v0.7.2+</p>
</blockquote>
<ul>
<li><code>list</code>：Arrray，节点实例列表。</li>
</ul>
<p>从节点实例列表里找出最顶层的节点列表。</p>
<h4>checkTwoRectIsOverlap(minx1, maxx1, miny1, maxy1, minx2, maxx2, miny2, maxy2)</h4>
<blockquote>
<p>v0.7.2+</p>
</blockquote>
<p>参数为两个矩形的位置。</p>
<p>判断两个矩形是否重叠。</p>
<h4>focusInput(el)</h4>
<blockquote>
<p>v0.7.2+</p>
</blockquote>
<ul>
<li><code>el</code>：DOM节点，可聚焦的元素，一般为输入框元素。</li>
</ul>
<p>聚焦指定输入框。</p>
<h4>selectAllInput(el)</h4>
<blockquote>
<p>v0.7.2+</p>
</blockquote>
<ul>
<li><code>el</code>：DOM节点，可聚焦的元素，一般为输入框元素。</li>
</ul>
<p>聚焦并全选指定输入框。</p>
<h4>addDataToAppointNodes(appointNodes, data = {})</h4>
<blockquote>
<p>v0.7.2+</p>
</blockquote>
<ul>
<li>
<p><code>appointNodes</code>：节点实例列表，数组类型。</p>
</li>
<li>
<p><code>data</code>：要附加到指定节点实例列表树中所有节点的数据中的数据。</p>
</li>
</ul>
<p>给指定的节点列表树数据添加附加数据，会修改原数据。</p>
<h4>createUidForAppointNodes(appointNodes, createNewId)</h4>
<blockquote>
<p>v0.7.2+</p>
</blockquote>
<ul>
<li>
<p><code>appointNodes</code>：节点实例列表，数组类型。</p>
</li>
<li>
<p><code>createNewId</code>：v0.7.3-fix.1+，<code>Boolean</code>，默认为<code>false</code>，即如果节点不存在<code>uid</code>的话，会创建新的<code>uid</code>。如果传<code>true</code>，那么无论节点数据原来是否存在<code>uid</code>，都会创建新的<code>uid</code></p>
</li>
</ul>
<p>给指定的节点列表树数据添加uid（如果uid不存在的话），会修改原数据。</p>
<h4>getNodeIndex(node)</h4>
<blockquote>
<p>v0.7.2+</p>
</blockquote>
<ul>
<li><code>node</code>：节点实例。</li>
</ul>
<p>获取节点在同级里的位置索引。</p>
<h4>mergerIconList(list)</h4>
<blockquote>
<p>v0.7.2+</p>
</blockquote>
<ul>
<li><code>list</code>：要合并到库内部的节点图标数组。</li>
</ul>
<pre class="hljs"><code><span class="hljs-comment">// const data = [</span>
<span class="hljs-comment">//   { type: &#x27;priority&#x27;, name: &#x27;优先级图标&#x27;, list: [{ name: &#x27;1&#x27;, icon: &#x27;a&#x27; }, { name: 2, icon: &#x27;b&#x27; }] },</span>
<span class="hljs-comment">//   { type: &#x27;priority&#x27;, name: &#x27;优先级图标&#x27;, list: [{ name: &#x27;2&#x27;, icon: &#x27;c&#x27; }, { name: 3, icon: &#x27;d&#x27; }] },</span>
<span class="hljs-comment">// ];</span>

<span class="hljs-comment">// mergerIconList(data) 结果</span>

<span class="hljs-comment">// [</span>
<span class="hljs-comment">//   { type: &#x27;priority&#x27;, name: &#x27;优先级图标&#x27;, list: [{ name: &#x27;1&#x27;, icon: &#x27;a&#x27; }, { name: 2, icon: &#x27;c&#x27; }, { name: 3, icon: &#x27;d&#x27; }] },</span>
<span class="hljs-comment">// ]</span>
</code></pre>
<p>合并图标数组。</p>
<h4>generateColorByContent(str)</h4>
<blockquote>
<p>v0.7.2+</p>
</blockquote>
<ul>
<li><code>str</code>：字符串。</li>
</ul>
<p>根据传入的内容生成颜色，同样的内容会生成同样的颜色。</p>
<h4>htmlEscape(str)</h4>
<blockquote>
<p>v0.7.2+</p>
</blockquote>
<ul>
<li><code>str</code>：字符串。</li>
</ul>
<p>转义传入的字符串，目前会转义如下三个字符：</p>
<pre class="hljs"><code>&amp; -&gt; &amp;amp;
&lt; -&gt; &amp;lt;
&gt; -&gt; &amp;gt;
</code></pre>
<h4>isSameObject(a, b)</h4>
<blockquote>
<p>v0.7.3+</p>
</blockquote>
<ul>
<li><code>a</code>、<code>b</code>：Object | Array, 要进行对比的两个对象</li>
</ul>
<p>判断两个对象是否相同，只处理对象或数组。</p>
<h4>getNodeDataIndex(node)</h4>
<blockquote>
<p>v0.8.0+</p>
</blockquote>
<p>获取节点在兄弟节点中的位置索引。</p>
<h4>getNodeIndexInNodeList(node, nodeList)</h4>
<blockquote>
<p>v0.8.0+</p>
</blockquote>
<p>从一个节点列表里找出某个节点的索引。</p>
<h4>setDataToClipboard(data)</h4>
<blockquote>
<p>v0.8.0+</p>
</blockquote>
<ul>
<li><code>data</code>：Object | Array</li>
</ul>
<p>将数据设置到用户剪切板中。</p>
<h4>getDataFromClipboard()</h4>
<blockquote>
<p>v0.8.0+</p>
</blockquote>
<p>从用户剪贴板中读取文字和图片，返回：</p>
<pre class="hljs"><code>{
  text,
  img
}
</code></pre>
<h4>removeFromParentNodeData(node)</h4>
<blockquote>
<p>v0.8.0+</p>
</blockquote>
<p>从节点的父节点的<code>nodeData.children</code>列表中移除该节点的数据。</p>
<h4>checkHasSupSubRelation()</h4>
<blockquote>
<p>v0.8.1+</p>
</blockquote>
<p>从给定的节点实例列表里判断是否存在上下级关系。</p>
<h4>handleSelfCloseTags(str)</h4>
<blockquote>
<p>v0.9.1+</p>
</blockquote>
<ul>
<li><code>str</code>：html字符串</li>
</ul>
<p>给html自闭合标签添加闭合状态，<code>&lt;div&gt;&lt;img src=&quot;xxx&quot;&gt;&lt;/div&gt;</code> -&gt; <code>&lt;div&gt;&lt;img src=&quot;xxx&quot; /&gt;&lt;/div&gt;</code>。</p>
<h4>checkNodeListIsEqual(list1, list2)</h4>
<blockquote>
<p>v0.9.1+</p>
</blockquote>
<ul>
<li><code>list1/list2</code>：节点实例列表</li>
</ul>
<p>检查两个节点实例列表包含的节点是否是一样的。</p>
<h2>在canvas中模拟css的背景属性</h2>
<p>引入：</p>
<pre class="hljs"><code><span class="hljs-keyword">import</span> drawBackgroundImageToCanvas <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;simple-mind-map/src/utils/simulateCSSBackgroundInCanvas&#x27;</span>
</code></pre>
<p>使用：</p>
<pre class="hljs"><code><span class="hljs-keyword">let</span> width = <span class="hljs-number">500</span>
<span class="hljs-keyword">let</span> height = <span class="hljs-number">500</span>
<span class="hljs-keyword">let</span> img = <span class="hljs-string">&#x27;/1.jpg&#x27;</span>
<span class="hljs-keyword">let</span> canvas = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">&#x27;canvas&#x27;</span>)
canvas.width = width
canvas.height = height
drawBackgroundImageToCanvas(ctx, width, height, img, {
  <span class="hljs-attr">backgroundRepeat</span>: <span class="hljs-string">&#x27;repeat-y&#x27;</span>,
  <span class="hljs-attr">backgroundSize</span>: <span class="hljs-string">&#x27;60%&#x27;</span>,
  <span class="hljs-attr">backgroundPosition</span>: <span class="hljs-string">&#x27;center center&#x27;</span>
}, <span class="hljs-function">(<span class="hljs-params">err</span>) =&gt;</span> {
  <span class="hljs-keyword">if</span> (err) {
    <span class="hljs-comment">// 失败</span>
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-comment">// 成功</span>
  }
})
</code></pre>
<h2>LRU缓存类</h2>
<blockquote>
<p>v0.5.10+</p>
</blockquote>
<p>引入：</p>
<pre class="hljs"><code><span class="hljs-keyword">import</span> Lru <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;simple-mind-map/src/utils/Lru.js&#x27;</span>
</code></pre>
<h3>构造函数</h3>
<pre class="hljs"><code><span class="hljs-keyword">let</span> lru = <span class="hljs-keyword">new</span> Lru(max)
</code></pre>
<p><code>max</code>：指定最大缓存数量。</p>
<h3>实例属性</h3>
<h4>size</h4>
<p>当前缓存的数量。</p>
<h4>pool</h4>
<p>获取缓存池。</p>
<h3>实例方法</h3>
<h4>add(key, value)</h4>
<p>添加缓存。</p>
<h4>delete(key)</h4>
<p>删除指定缓存。</p>
<h4>has(key)</h4>
<p>检查某个缓存是否存在。</p>
<h4>get(key)</h4>
<p>获取某个缓存的值。</p>

  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>