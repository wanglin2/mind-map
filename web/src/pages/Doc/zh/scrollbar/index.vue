<template>
  <div>
    <h1>Scrollbar 插件</h1>
<blockquote>
<p>v0.7.0+</p>
</blockquote>
<p>该插件用于帮助开发水平和垂直滚动条的功能。</p>
<h2>注册</h2>
<pre class="hljs"><code><span class="hljs-keyword">import</span> MindMap <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;simple-mind-map&#x27;</span>
<span class="hljs-keyword">import</span> Scrollbar <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;simple-mind-map/src/plugins/Scrollbar.js&#x27;</span>
MindMap.usePlugin(Scrollbar)
</code></pre>
<p>注册完且实例化<code>MindMap</code>后可通过<code>mindMap.scrollbar</code>获取到该实例。</p>
<h2>事件</h2>
<h4>scrollbar_change</h4>
<p>当滚动条数据发生改变时触发，你可以监听该事件来更新滚动条位置和大小。</p>
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
<p>需要先调用setScrollBarWrapSize方法设置滚动条容器元素的宽高。</p>
<p>一般需要监听scrollbar_change事件，然后调用该方法更新滚动条。</p>
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
<p>获取滚动条大小和位置，你可以根据返回值来设置到滚动条元素上，达到渲染和关心滚动条的效果。</p>
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

  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>