<template>
  <div>
    <h1>如何渲染滚动条</h1>
<blockquote>
<p>v0.7.1+, 需要先注册 Scrollbar 插件</p>
</blockquote>
<p>滚动条分为水平和垂直滚动条，所以你需要创建如下模板：</p>
<pre class="hljs"><code><span class="hljs-comment">&lt;!-- 垂直 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;scrollbar verticalScrollbar&quot;</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">&quot;verticalScrollbarRef&quot;</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">&quot;onVerticalScrollbarClick&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>
        <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;scrollbarInner&quot;</span>
        <span class="hljs-attr">:style</span>=<span class="hljs-string">&quot;verticalScrollbarStyle&quot;</span>
        @<span class="hljs-attr">click.stop</span>
        @<span class="hljs-attr">mousedown</span>=<span class="hljs-string">&quot;onVerticalScrollbarMousedown&quot;</span>
    &gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-comment">&lt;!-- 水平 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;scrollbar horizontalScrollbar&quot;</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">&quot;horizontalScrollbarRef&quot;</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">&quot;onHorizontalScrollbarClick&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>
        <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;scrollbarInner&quot;</span>
        <span class="hljs-attr">:style</span>=<span class="hljs-string">&quot;horizontalScrollbarStyle&quot;</span>
        @<span class="hljs-attr">click.stop</span>
        @<span class="hljs-attr">mousedown</span>=<span class="hljs-string">&quot;onHorizontalScrollbarMousedown&quot;</span>
    &gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p>外层元素为滚动条容器元素，内层为滚动条元素。</p>
<p>内层滚动条元素一般需要设置成绝对定位，样式示例如下：</p>
<pre class="hljs"><code><span class="hljs-selector-class">.scrollbar</span> {
    <span class="hljs-attribute">position</span>: relative;
    <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#f5f5f5</span>;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">10px</span>;
    <span class="hljs-attribute">overflow</span>: hidden;

    &amp;<span class="hljs-selector-class">.verticalScrollbar</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">10px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">500px</span>;

        <span class="hljs-selector-class">.scrollbarInner</span> {
            <span class="hljs-attribute">width</span>: <span class="hljs-number">10px</span>;
            <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
        }
    }

    &amp;<span class="hljs-selector-class">.horizontalScrollbar</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">500px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">10px</span>;

        <span class="hljs-selector-class">.scrollbarInner</span> {
            <span class="hljs-attribute">height</span>: <span class="hljs-number">10px</span>;
            <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;
        }
    }

    <span class="hljs-selector-class">.scrollbarInner</span> {
        <span class="hljs-attribute">position</span>: absolute;
        <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#ccc</span>;
        <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">10px</span>;
    }
}
</code></pre>
<p>垂直滚动条的<code>top</code>和<code>height</code>、水平滚动条的<code>left</code>和<code>width</code>值需要根据插件返回的数据进行设置。</p>
<p>首先你需要调用<code>setScrollBarWrapSize</code>方法传递你的滚动条容器的宽和高：</p>
<pre class="hljs"><code><span class="hljs-comment">// 水平滚动条容器的宽度</span>
<span class="hljs-keyword">const</span> { width } = <span class="hljs-built_in">this</span>.$refs.horizontalScrollbarRef.getBoundingClientRect()
<span class="hljs-comment">// 垂直滚动条容器的高度</span>
<span class="hljs-keyword">const</span> { height } = <span class="hljs-built_in">this</span>.$refs.verticalScrollbarRef.getBoundingClientRect()
mindMap.scrollbar.setScrollBarWrapSize(width, height)
</code></pre>
<p>如果容器大小发生了改变需要再次调用该方法传递改变后的大小。</p>
<p>然后你需要监听<code>scrollbar_change</code>方法来获取滚动条大小和位置数据：</p>
<pre class="hljs"><code>mindMap.on(<span class="hljs-string">&#x27;scrollbar_change&#x27;</span>, <span class="hljs-built_in">this</span>.updateScrollbar)

<span class="hljs-comment">// 根据事件返回的滚动条数据更新滚动条元素：</span>
{
    <span class="hljs-function"><span class="hljs-title">updateScrollbar</span>(<span class="hljs-params">data</span>)</span> {
        <span class="hljs-keyword">const</span> {
            vertical,
            horizontal
        } = data
        <span class="hljs-built_in">this</span>.verticalScrollbarStyle = {
            <span class="hljs-attr">top</span>: vertical.top + <span class="hljs-string">&#x27;%&#x27;</span>,
            <span class="hljs-attr">height</span>: vertical.height + <span class="hljs-string">&#x27;%&#x27;</span>
        }
        <span class="hljs-built_in">this</span>.horizontalScrollbarStyle = {
            <span class="hljs-attr">left</span>: horizontal.left + <span class="hljs-string">&#x27;%&#x27;</span>,
            <span class="hljs-attr">width</span>: horizontal.width + <span class="hljs-string">&#x27;%&#x27;</span>
        }
    }
}
</code></pre>
<p>事件返回数据的是百分比数值，所以需要添加<code>%</code>。</p>
<p>最后，需要给滚动条元素绑定<code>mousedown</code>事件，并且调用插件的<code>onMousedown</code>方法：</p>
<pre class="hljs"><code><span class="hljs-comment">// 垂直滚动条元素</span>
mindMap.scrollbar.onMousedown(e, <span class="hljs-string">&#x27;vertical&#x27;</span>)

<span class="hljs-comment">// 水平滚动条元素</span>
mindMap.scrollbar.onMousedown(e, <span class="hljs-string">&#x27;horizontal&#x27;</span>)
</code></pre>
<p>这样就能实现鼠标拖动滚动条更新画布位置的功能。</p>
<p>如果你还需要实现点击滚动条容器元素实现滚动条位置的跳变功能，那么需要给滚动条元素绑定点击事件，并且调用插件的<code>onClick</code>方法：</p>
<pre class="hljs"><code><span class="hljs-comment">// 垂直滚动条元素</span>
mindMap.scrollbar.onClick(e, <span class="hljs-string">&#x27;vertical&#x27;</span>)

<span class="hljs-comment">// 水平滚动条元素</span>
mindMap.scrollbar.onClick(e, <span class="hljs-string">&#x27;horizontal&#x27;</span>)
</code></pre>
<p>以上就是实现滚动条渲染的全部步骤。</p>

  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>