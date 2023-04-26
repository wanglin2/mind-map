<template>
  <div>
    <h1>内置工具方法</h1>
<h2>基础工具方法</h2>
<p>引用：</p>
<pre class="hljs"><code><span class="hljs-keyword">import</span> {walk, ...} <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;simple-mind-map/src/utils&#x27;</span>
</code></pre>
<h3>方法</h3>
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
<h4>copyNodeTree(tree, root, removeActiveState, keepId)</h4>
<ul>
<li>
<p><code>removeActiveState</code>：<code>Boolean</code>，默认为<code>false</code>，是否移除节点的激活状态</p>
</li>
<li>
<p><code>keepId</code>：v0.4.6+，<code>Boolean</code>，默认为<code>false</code>，是否保留被复制节点的<code>id</code>，默认会删除<code>id</code>防止节点<code>id</code>重复，但是对于移动节点的场景，节点原<code>id</code>需要保留</p>
</li>
</ul>
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