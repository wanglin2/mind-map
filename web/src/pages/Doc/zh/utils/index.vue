<template>
  <div>
    <h1>内置工具方法</h1>
<p>引用：</p>
<pre class="hljs"><code><span class="hljs-keyword">import</span> {walk, ...} <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;simple-mind-map/src/utils&#x27;</span>
</code></pre>
<h2>方法</h2>
<h3>walk(root, parent, beforeCallback, afterCallback, isRoot, layerIndex = 0, index = 0)</h3>
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
<h3>bfsWalk(root, callback)</h3>
<p>广度优先遍历树</p>
<h3>resizeImgSize(width, height, maxWidth, maxHeight)</h3>
<p>缩放图片的尺寸</p>
<p><code>width</code>：图片原本的宽</p>
<p><code>height</code>：图片原本的高</p>
<p><code>maxWidth</code>：要缩放到的宽</p>
<p><code>maxHeight</code>：要缩放到的高</p>
<p><code>maxWidth</code>和<code>maxHeight</code>可以同时都传，也可以只传一个</p>
<h3>resizeImg(imgUrl, maxWidth, maxHeight)</h3>
<p>缩放图片，内部先加载图片，然后调用<code>resizeImgSize</code>方法，返回一个<code>promise</code></p>
<h3>simpleDeepClone(data)</h3>
<p>极简的深拷贝方法，只能针对全是基本数据的对象，否则会报错</p>
<h3>copyRenderTree(tree, root)</h3>
<p>复制渲染树数据，示例：</p>
<pre class="hljs"><code>copyRenderTree({}, <span class="hljs-built_in">this</span>.mindMap.renderer.renderTree)
</code></pre>
<h3>copyNodeTree(tree, root)</h3>
<p>复制节点树数据，主要是剔除其中的引用<code>node</code>实例的<code>_node</code>，然后复制<code>data</code>对象的数据，示例：</p>
<pre class="hljs"><code>copyNodeTree({}, node)
</code></pre>
<h3>imgToDataUrl(src)</h3>
<p>图片转成dataURL</p>
<h3>downloadFile(file, fileName)</h3>
<p>下载文件</p>
<h3>throttle(fn, time = 300, ctx)</h3>
<p>节流函数</p>
<h3>asyncRun(taskList, callback = () =&gt; {})</h3>
<p>异步执行任务队列，多个任务是同步执行的，没有先后顺序</p>
<h3>degToRad(deg)</h3>
<blockquote>
<p>v0.2.24+</p>
</blockquote>
<p>角度转弧度</p>
<h3>camelCaseToHyphen(str)</h3>
<blockquote>
<p>v0.2.24+</p>
</blockquote>
<p>驼峰转连字符</p>

  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>