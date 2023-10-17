<template>
  <div>
    <h1>MiniMap插件</h1>
<blockquote>
<p>v0.2.11+</p>
</blockquote>
<p>用于帮助快速开发小地图功能，小地图由两部分组成，一个是当前的画布内容，一个是视口框，当缩放、移动、元素过多时画布上可能只显示了思维导图的部分内容，可以通过视口框来查看当前视口所在位置，以及可以通过在小地图上拖动来快速定位。</p>
<h2>注册</h2>
<pre class="hljs"><code><span class="hljs-keyword">import</span> MindMap <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;simple-mind-map&#x27;</span>
<span class="hljs-keyword">import</span> MiniMap <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;simple-mind-map/src/plugins/MiniMap.js&#x27;</span>
<span class="hljs-comment">// import MiniMap from &#x27;simple-mind-map/src/MiniMap.js&#x27; v0.6.0以下版本使用该路径</span>

MindMap.usePlugin(MiniMap)
</code></pre>
<p>注册完且实例化<code>MindMap</code>后可通过<code>mindMap.miniMap</code>获取到该实例。</p>
<h2>方法</h2>
<h3>calculationMiniMap(boxWidth, boxHeight)</h3>
<p>计算小地图的渲染数据，该函数内会调用<code>getMiniMap()</code>方法，所以一般使用该函数即可。</p>
<p><code>boxWidth</code>：小地图容器的宽度</p>
<p><code>boxHeight</code>：小地图容器的高度</p>
<p>函数返回内容：</p>
<pre class="hljs"><code>{
      getImgUrl,<span class="hljs-comment">// v0.8.0+，一个异步函数，你可以调用该函数，传递一个回调函数，回调函数可以接收一个参数，代表图片类型的小地图，你可以通过img标签进行渲染</span>
      svgHTML, <span class="hljs-comment">// 小地图html，推荐使用getImgUrl方式获取图片类型的小地图，减少页面DOM数量，优化性能</span>
      viewBoxStyle, <span class="hljs-comment">// 视图框的位置信息</span>
      miniMapBoxScale, <span class="hljs-comment">// 视图框的缩放值</span>
      miniMapBoxLeft, <span class="hljs-comment">// 视图框的left值</span>
      miniMapBoxTop, <span class="hljs-comment">// 视图框的top值</span>
}
</code></pre>
<p>小地图思路：</p>
<p>1.准备一个容器元素<code>container</code>，定位不为<code>static</code></p>
<p>如果使用的是富文本编辑模式，那么最好给<code>container</code>内部的元素去除一下默认样式，否则可能会出现节点内文本偏移的问题：</p>
<pre class="hljs"><code><span class="hljs-selector-class">.container</span> * {
  <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
}
</code></pre>
<p>2.在<code>container</code>内创建一个小地图容器元素<code>miniMapContainer</code>，绝对定位</p>
<p>3.在<code>container</code>内创建一个视口框元素<code>viewBoxContainer</code>，绝对定位，设置边框样式，过渡属性（可选）</p>
<p>4.监听<code>data_change</code>和<code>view_data_change</code>事件，在该事件内调用<code>calculationMiniMap</code>方法获取计算数据，然后将<code>svgHTML</code>渲染到<code>miniMapContainer</code>元素内，并且设置<code>miniMapContainer</code>元素的样式：</p>
<pre class="hljs"><code>:style=<span class="hljs-string">&quot;{
    transform: `scale(${miniMapBoxScale})`,
    left: miniMapBoxLeft + &#x27;px&#x27;,
    top: miniMapBoxTop + &#x27;px&#x27;,
}&quot;</span>
</code></pre>
<p>5.将<code>viewBoxStyle</code>对象设置为<code>viewBoxContainer</code>元素的样式</p>
<p>到这一步，当画布上的思维导图变化了，小地图也会实时更新，并且视口框元素会实时反映视口在思维导图图形上的位置</p>
<p>6.监听<code>container</code>元素的<code>mousedown</code>、<code>mousemove</code>、<code>mouseup</code>事件，分别调用下面即将介绍的三个方法即可实现鼠标拖动时画布上的思维导图也随之拖动的效果</p>
<h3>onMousedown(e)</h3>
<p>小地图鼠标按下事件执行该函数</p>
<p><code>e</code>：事件对象</p>
<h3>onMousemove(e, sensitivityNum = 5)</h3>
<p>小地图鼠标移动事件执行该函数</p>
<p><code>e</code>：事件对象</p>
<p><code>sensitivityNum</code>：拖动灵敏度，灵敏度越大，在小地图上拖动相同距离时实际上的画布拖动距离就越大</p>
<h3>onMouseup()</h3>
<p>小地图鼠标松开事件执行该函数</p>

  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>