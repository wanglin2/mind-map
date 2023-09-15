<template>
  <div>
    <h1>Scrollbar 插件</h1>
<blockquote>
<p>v0.7.0+</p>
<p>v0.7.1+进行了重构，下面的文档为新文档。</p>
</blockquote>
<p>该插件用于帮助开发水平和垂直滚动条的功能。详细使用方式请参考教程。</p>
<h2>注册</h2>
<pre class="hljs"><code><span class="hljs-keyword">import</span> MindMap <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;simple-mind-map&#x27;</span>
<span class="hljs-keyword">import</span> Scrollbar <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;simple-mind-map/src/plugins/Scrollbar.js&#x27;</span>
MindMap.usePlugin(Scrollbar)
</code></pre>
<p>注册完且实例化<code>MindMap</code>后可通过<code>mindMap.scrollbar</code>获取到该实例。</p>
<h2>事件</h2>
<h4>scrollbar_change(data)</h4>
<ul>
<li><code>data</code>：滚动条数据，格式如下：</li>
</ul>
<pre class="hljs"><code>{
    <span class="hljs-comment">// 垂直滚动条</span>
    <span class="hljs-attr">vertical</span>: {
        top,<span class="hljs-comment">// 垂直滚动条的top值，百分比数值</span>
        height<span class="hljs-comment">// 垂直滚动条的高度，百分比数值</span>
    },
    <span class="hljs-comment">// 水平滚动条</span>
    <span class="hljs-attr">horizontal</span>: {
        left,<span class="hljs-comment">// 水平滚动条的left值，百分比数值</span>
        width<span class="hljs-comment">// 水平滚动条的宽度，百分比数值</span>
    }
}
</code></pre>
<p>当滚动条数据发生改变时触发，你可以监听该事件来更新滚动条位置和大小。接收一个参数，代表当前最新的滚动条位置和大小信息，你可以使用它来更新滚动条元素的样式。</p>
<h2>方法</h2>
<h3>setScrollBarWrapSize(width, height)</h3>
<ul>
<li>
<p><code>width</code>：Number，你的滚动条容器元素的宽度。</p>
</li>
<li>
<p><code>height</code>： Number，你的滚动条容器元素的高度。</p>
</li>
</ul>
<p>设置滚动条容器的大小，对于水平滚动条，即容器的宽度，对于垂直滚动条，即容器的高度。当你的滚动条容器尺寸改变时需要再次调用该方法。</p>
<h3>calculationScrollbar()</h3>
<blockquote>
<p>通常你不需要调用该方法，如果初次渲染滚动条时滚动条没有更新，那么可以手动调用该方法获取滚动条数据。</p>
<p>需要先调用setScrollBarWrapSize方法设置滚动条容器元素的宽高。</p>
</blockquote>
<p>返回值：</p>
<pre class="hljs"><code>{
    <span class="hljs-comment">// 垂直滚动条</span>
    <span class="hljs-attr">vertical</span>: {
        top,
        height
    },
    <span class="hljs-comment">// 水平滚动条</span>
    <span class="hljs-attr">horizontal</span>: {
        left,
        width
    }
}
</code></pre>
<p>获取滚动条大小和位置。</p>
<h3>onMousedown(e, type)</h3>
<ul>
<li>
<p><code>e</code>：鼠标按下事件的事件对象。</p>
</li>
<li>
<p><code>type</code>：按下的滚动条类型，vertical（垂直滚动条）、horizontal（水平滚动条）。</p>
</li>
</ul>
<p>滚动条元素的鼠标按下事件时需要调用该方法。</p>
<h3>onClick(e, type)</h3>
<ul>
<li>
<p><code>e</code>：鼠标点击事件的事件对象。</p>
</li>
<li>
<p><code>type</code>：鼠标点击的滚动条类型，vertical（垂直滚动条）、horizontal（水平滚动条）。</p>
</li>
</ul>
<p>滚动条元素的的点击事件时需要调用该方法。</p>

  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>