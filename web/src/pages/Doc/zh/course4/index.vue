<template>
  <div>
    <h1>设置节点样式</h1>
<p>本节将介绍如何更新当前激活节点的样式。</p>
<p>样式总体上分为两类，一是常态的样式，二是激活的样式。设置的方法都是<code>setStyle</code>方法，通过第三个参数进行指定：</p>
<pre class="hljs"><code><span class="hljs-comment">// 设置常态样式</span>
node.setStyle(<span class="hljs-string">&#x27;样式属性&#x27;</span>, <span class="hljs-string">&#x27;样式值&#x27;</span>)

<span class="hljs-comment">// 设置激活样式</span>
node.setStyle(<span class="hljs-string">&#x27;样式属性&#x27;</span>, <span class="hljs-string">&#x27;样式值&#x27;</span>, <span class="hljs-literal">true</span>)
</code></pre>
<h2>设置常态样式</h2>
<h3>设置文字样式</h3>
<p>文字样式目前支持：<code>字体</code>、<code>字号</code>、<code>行高</code>、<code>颜色</code>、<code>加粗</code>、<code>斜体</code>、<code>划线</code>。</p>
<p>这些样式选择的UI界面都需要你自行开发，然后调用节点的<code>setStyle</code>方法更新。</p>
<p>同样首先需要监听节点的激活事件来换取当前激活的节点：</p>
<pre class="hljs"><code><span class="hljs-keyword">const</span> activeNodes = shallowRef([])
mindMap.on(<span class="hljs-string">&#x27;node_active&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">node, activeNodeList</span>) =&gt;</span> {
    activeNodes.value = activeNodeList
})
</code></pre>
<pre class="hljs"><code><span class="hljs-comment">// 设置字体</span>
activeNodes.value.forEach(<span class="hljs-function"><span class="hljs-params">node</span> =&gt;</span> {
    node.setStyle(<span class="hljs-string">&#x27;fontFamily&#x27;</span>, <span class="hljs-string">&#x27;宋体, SimSun, Songti SC&#x27;</span>)
})

<span class="hljs-comment">// 设置字号</span>
activeNodes.value.forEach(<span class="hljs-function"><span class="hljs-params">node</span> =&gt;</span> {
    node.setStyle(<span class="hljs-string">&#x27;fontSize&#x27;</span>, <span class="hljs-number">16</span>)
})

<span class="hljs-comment">// 设置行高</span>
activeNodes.value.forEach(<span class="hljs-function"><span class="hljs-params">node</span> =&gt;</span> {
    node.setStyle(<span class="hljs-string">&#x27;lineHeight&#x27;</span>, <span class="hljs-number">1.5</span>)
})

<span class="hljs-comment">// 设置颜色</span>
activeNodes.value.forEach(<span class="hljs-function"><span class="hljs-params">node</span> =&gt;</span> {
    node.setStyle(<span class="hljs-string">&#x27;color&#x27;</span>, <span class="hljs-string">&#x27;#fff&#x27;</span>)
})

<span class="hljs-comment">// 设置加粗</span>
activeNodes.value.forEach(<span class="hljs-function"><span class="hljs-params">node</span> =&gt;</span> {
    node.setStyle(<span class="hljs-string">&#x27;fontWeight&#x27;</span>, <span class="hljs-string">&#x27;bold&#x27;</span>)<span class="hljs-comment">// node.setStyle(&#x27;fontWeight&#x27;, &#x27;normal&#x27;)</span>
})

<span class="hljs-comment">// 设置划线</span>
activeNodes.value.forEach(<span class="hljs-function"><span class="hljs-params">node</span> =&gt;</span> {
    <span class="hljs-comment">// 下划线</span>
    node.setStyle(<span class="hljs-string">&#x27;textDecoration&#x27;</span>, <span class="hljs-string">&#x27;underline&#x27;</span>)
    <span class="hljs-comment">// 删除线</span>
    node.setStyle(<span class="hljs-string">&#x27;textDecoration&#x27;</span>, <span class="hljs-string">&#x27;line-through&#x27;</span>)
    <span class="hljs-comment">// 上划线</span>
    node.setStyle(<span class="hljs-string">&#x27;textDecoration&#x27;</span>, <span class="hljs-string">&#x27;overline&#x27;</span>)
})
</code></pre>
<h3>设置边框样式</h3>
<p>边框样式支持设置：<code>颜色</code>、<code>虚线</code>、<code>线宽</code>、<code>圆角</code>。</p>
<p>设置边框样式前请先检查线宽是否被设置成了0。</p>
<pre class="hljs"><code><span class="hljs-comment">// 设置边框颜色</span>
activeNodes.value.forEach(<span class="hljs-function"><span class="hljs-params">node</span> =&gt;</span> {
    node.setStyle(<span class="hljs-string">&#x27;borderColor&#x27;</span>, <span class="hljs-string">&#x27;#000&#x27;</span>)
})

<span class="hljs-comment">// 设置边框虚线</span>
activeNodes.value.forEach(<span class="hljs-function"><span class="hljs-params">node</span> =&gt;</span> {
    node.setStyle(<span class="hljs-string">&#x27;borderDasharray&#x27;</span>, <span class="hljs-string">&#x27;5,5&#x27;</span>)<span class="hljs-comment">// node.setStyle(&#x27;borderDasharray&#x27;, &#x27;none&#x27;)</span>
})

<span class="hljs-comment">// 设置边框宽度</span>
activeNodes.value.forEach(<span class="hljs-function"><span class="hljs-params">node</span> =&gt;</span> {
    node.setStyle(<span class="hljs-string">&#x27;borderWidth&#x27;</span>, <span class="hljs-number">2</span>)
})

<span class="hljs-comment">// 设置边框圆角</span>
activeNodes.value.forEach(<span class="hljs-function"><span class="hljs-params">node</span> =&gt;</span> {
    node.setStyle(<span class="hljs-string">&#x27;borderRadius&#x27;</span>, <span class="hljs-number">5</span>)
})
</code></pre>
<h3>设置背景样式</h3>
<p>背景样式也就是背景颜色。</p>
<pre class="hljs"><code>activeNodes.value.forEach(<span class="hljs-function"><span class="hljs-params">node</span> =&gt;</span> {
    node.setStyle(<span class="hljs-string">&#x27;fillColor&#x27;</span>, <span class="hljs-string">&#x27;#fff&#x27;</span>)
})
</code></pre>
<h3>设置形状样式</h3>
<p>目前支持以下形状：</p>
<pre class="hljs"><code>[
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;矩形&#x27;</span>,
    <span class="hljs-attr">value</span>: <span class="hljs-string">&#x27;rectangle&#x27;</span>
  },
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;菱形&#x27;</span>,
    <span class="hljs-attr">value</span>: <span class="hljs-string">&#x27;diamond&#x27;</span>
  },
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;平行四边形&#x27;</span>,
    <span class="hljs-attr">value</span>: <span class="hljs-string">&#x27;parallelogram&#x27;</span>
  },
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;圆角矩形&#x27;</span>,
    <span class="hljs-attr">value</span>: <span class="hljs-string">&#x27;roundedRectangle&#x27;</span>
  },
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;八角矩形&#x27;</span>,
    <span class="hljs-attr">value</span>: <span class="hljs-string">&#x27;octagonalRectangle&#x27;</span>
  },
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;外三角矩形&#x27;</span>,
    <span class="hljs-attr">value</span>: <span class="hljs-string">&#x27;outerTriangularRectangle&#x27;</span>
  },
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;内三角矩形&#x27;</span>,
    <span class="hljs-attr">value</span>: <span class="hljs-string">&#x27;innerTriangularRectangle&#x27;</span>
  },
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;椭圆&#x27;</span>,
    <span class="hljs-attr">value</span>: <span class="hljs-string">&#x27;ellipse&#x27;</span>
  },
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;圆&#x27;</span>,
    <span class="hljs-attr">value</span>: <span class="hljs-string">&#x27;circle&#x27;</span>
  }
]
</code></pre>
<p>设置形状前请先确认边框宽度是否被设置成了0。</p>
<pre class="hljs"><code>activeNodes.value.forEach(<span class="hljs-function"><span class="hljs-params">node</span> =&gt;</span> {
    node.setStyle(<span class="hljs-string">&#x27;shape&#x27;</span>, <span class="hljs-string">&#x27;circle&#x27;</span>)
})
</code></pre>
<h3>设置线条样式</h3>
<p>节点线条支持设置：<code>颜色</code>、<code>虚线</code>、<code>线宽</code>。</p>
<pre class="hljs"><code><span class="hljs-comment">// 设置线条颜色</span>
activeNodes.value.forEach(<span class="hljs-function"><span class="hljs-params">node</span> =&gt;</span> {
    node.setStyle(<span class="hljs-string">&#x27;lineColor&#x27;</span>, <span class="hljs-string">&#x27;#000&#x27;</span>)
})

<span class="hljs-comment">// 设置线条虚线</span>
activeNodes.value.forEach(<span class="hljs-function"><span class="hljs-params">node</span> =&gt;</span> {
    node.setStyle(<span class="hljs-string">&#x27;lineDasharray&#x27;</span>, <span class="hljs-string">&#x27;5, 5, 1, 5&#x27;</span>)<span class="hljs-comment">// node.setStyle(&#x27;lineDasharray&#x27;, &#x27;none&#x27;)</span>
})

<span class="hljs-comment">// 设置线条宽度</span>
activeNodes.value.forEach(<span class="hljs-function"><span class="hljs-params">node</span> =&gt;</span> {
    node.setStyle(<span class="hljs-string">&#x27;lineWidth&#x27;</span>, <span class="hljs-number">3</span>)
})
</code></pre>
<h3>设置节点内边距</h3>
<p>节点内边距支持设置水平和垂直方向的内边距。</p>
<pre class="hljs"><code>activeNodes.value.forEach(<span class="hljs-function"><span class="hljs-params">node</span> =&gt;</span> {
    node.setStyle(<span class="hljs-string">&#x27;paddingX&#x27;</span>, <span class="hljs-number">50</span>)
    node.setStyle(<span class="hljs-string">&#x27;paddingY&#x27;</span>, <span class="hljs-number">50</span>)
})
</code></pre>
<h2>设置激活样式</h2>
<p>激活样式只支持设置边框相关样式和背景。可以通过如下方式获取支持的属性：</p>
<pre class="hljs"><code><span class="hljs-keyword">import</span> { supportActiveStyle } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;simple-mind-map/src/themes/default&#x27;</span>

<span class="hljs-keyword">const</span> checkIsSupportActive = <span class="hljs-function">(<span class="hljs-params">prop</span>) =&gt;</span> {
    <span class="hljs-keyword">return</span> supportActiveStyle.includes(prop)
}
</code></pre>
<p>其他和数值常态样式是一样的，只需要给<code>setStyle</code>方法传入第三个参数：</p>
<pre class="hljs"><code><span class="hljs-comment">// 设置边框颜色</span>
activeNodes.value.forEach(<span class="hljs-function"><span class="hljs-params">node</span> =&gt;</span> {
    node.setStyle(<span class="hljs-string">&#x27;borderColor&#x27;</span>, <span class="hljs-string">&#x27;#000&#x27;</span>, <span class="hljs-literal">true</span>)
})

<span class="hljs-comment">// 设置边框虚线</span>
activeNodes.value.forEach(<span class="hljs-function"><span class="hljs-params">node</span> =&gt;</span> {
    node.setStyle(<span class="hljs-string">&#x27;borderDasharray&#x27;</span>, <span class="hljs-string">&#x27;5,5&#x27;</span>, <span class="hljs-literal">true</span>)<span class="hljs-comment">// node.setStyle(&#x27;borderDasharray&#x27;, &#x27;none&#x27;, true)</span>
})

<span class="hljs-comment">// 设置边框宽度</span>
activeNodes.value.forEach(<span class="hljs-function"><span class="hljs-params">node</span> =&gt;</span> {
    node.setStyle(<span class="hljs-string">&#x27;borderWidth&#x27;</span>, <span class="hljs-number">2</span>, <span class="hljs-literal">true</span>)
})

<span class="hljs-comment">// 设置边框圆角</span>
activeNodes.value.forEach(<span class="hljs-function"><span class="hljs-params">node</span> =&gt;</span> {
    node.setStyle(<span class="hljs-string">&#x27;borderRadius&#x27;</span>, <span class="hljs-number">5</span>, <span class="hljs-literal">true</span>)
})

<span class="hljs-comment">// 设置背景颜色</span>
activeNodes.value.forEach(<span class="hljs-function"><span class="hljs-params">node</span> =&gt;</span> {
    node.setStyle(<span class="hljs-string">&#x27;fillColor&#x27;</span>, <span class="hljs-string">&#x27;#fff&#x27;</span>, <span class="hljs-literal">true</span>)
})
</code></pre>
<h2>完整示例</h2>
<iframe style="width: 100%; height: 455px; border: none;" src="https://wanglin2.github.io/playground/#eNrFV91uG0UUfpXRVmgd5KwdIFwYJypNikBqUBUjFdSt0Hh3bA/MzqxmZ52GyBIqUKAtAlSJClClhhu4gHCDqJI27cvEP4/RM/tfex35wlKj2N6Z+b5zzsz55szsgfGu71v9kBgNoxk4kvoKBUSF/qbNqecLqdABkqRTRYLviJAr4lZR0MOMib1d0kED1JHCQyZYMDPGDuXuDvbjIdsIoJuRVQ96Vz3s24bNEbI5IwrpPo3cQDxkzOY2r9XQ8PT+8PsfRs+/HP33ZPzb15M7t8a3joffPZgc/mVzR/BAIewo2icfCpcEwM3jqVy/sZJYmRw9G58ejX75dvjPg9Gjx8OnP6ZkmN9H5KZqqX1GgF1ZQRub6EAHVTBr9TELidUR8jJ2ehUOfRkMId20wE5ko2J2BFfvYY+yfbOKzOHR3bPT+1XUol4r5PAreFdR1NoyIbY57Bb9ggB37e1yCKOcvE9ot6c0yFovRzmCCakjkMQ9x9e11JDZFmweUMEKbRNHSKyo4BqsY1hVPSnCbk+TbDWA78FLyz15djw6vD2z3JeEdIlc4oK3I4Nb6Xwv1Ov1OfOIkdsYNCIljvKzXl0/F3yNuqoHwDfOA+1il4YBoHQuSpfiq3ujX/8tLkJ3SWKjjGUzbwNvXjKGp3+M7/xfiKDVw/6SEgDL6WvBmg6VDpsbwvjk+ejh4YweroCUlqgGrcxFtKBxU0pA8L8G3+cwUjm8OW+Zb38Dsp88fliY4FXsupQvKeF+bOxjLbZ6eZwJ5JMUUogzq9uVQiiFukv20npdSdwT1kCucEKPcGV1ibrMiH68tP+BWzET5hbUEQyLI82VasxyscKNdAZQ3w3dYRuFrrhbFxbdbRujR8dxbY9PBP03SIxpoNOjzJWEa/D13MaUuVIv057OTu6NT/6cdvaywxKnN/KxIu4VRZA+Jn0pj3KqdoVQWldXRUB1uQamyUgnqvEOpA7SFLEGK+/EZy9CIN/x7z8Pf/o7jik+bc9O7p49gYqRCcQSvGJqrX0aixcMRmKtRgK8QgOVa6pE4FpfCS52D5qET7MW3zTgjgENReB6gBWBFkJNl/aRw3AQbNhGEsQ28YRtRMMJgLr5aKZEgDRrMFoEppaUEKyNAYL6q7QDHcVQGYHzuYc2UT3zYqtmO1RKcHTRYdT5HBjFWwPgZq8XzVpMSUxABCUmCidhZqR4aC5mpJtzo1NmIVZU/TNifDgsRMyqdUYulvWFTCT1MPee1swpdp7A9KlZK+gDmoEOJEJcTG6btmHV4itmUscsEniWEwS2kandKkgpVeuerusNtFavvxbhEPKz7SMJeASBRAPRztOfC9OSS03lRNwOBAtVTERIb8IGqictJfy8Meu+F93LGuitet2/mXou9/t66tnDskvBb2o1OQjSjix0K9kBC0a8lkaQBJ21wSDs3igHRtWIM6Av9dZngeDwDhGZt5MByEBWFm0DXhHiWmjV4NGScChRj+hkrbal2AuIBCO2kZS1kteGmDubas1KYhsYgxcal4r4" />
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>