<template>
  <div>
    <h1>设置基础样式</h1>
<p>基础样式修改的其实是主题配置，所以会通过<code>setThemeConfig</code>方法设置。</p>
<h2>设置背景</h2>
<p>画布背景可以设置颜色或图片。</p>
<h3>设置画布背景颜色</h3>
<pre class="hljs"><code>mindMap.setThemeConfig({
    <span class="hljs-attr">backgroundColor</span>: <span class="hljs-string">&#x27;#A4DD00&#x27;</span>
})
</code></pre>
<h3>设置背景图片</h3>
<p>背景图片还支持设置三个属性：<code>图片重复</code>、<code>图片位置</code>、<code>图片大小</code>。其实就是<code>css</code>的<code>background-repeat</code>、<code>background-position</code>、<code>background-size</code>三个属性。</p>
<p>不过导出为图片的时候背景图片的行为和<code>css</code>并不完全一致，因为导出是通过<code>canvas</code>实现的，而<code>canvas</code>并不存在这三个属性，所以是通过有限模拟<code>css</code>这三个属性行为实现的，详情可以阅读文章<a href="https://juejin.cn/post/7204854015463538744">如何在canvas中模拟css的背景图片样式</a>。</p>
<pre class="hljs"><code>mindMap.setThemeConfig({
    <span class="hljs-attr">backgroundImage</span>: <span class="hljs-string">&#x27;xxx.png&#x27;</span>,
    <span class="hljs-attr">backgroundRepeat</span>: <span class="hljs-string">&#x27;no-repeat&#x27;</span>,
    <span class="hljs-attr">backgroundPosition</span>: <span class="hljs-string">&#x27;center center&#x27;</span>,
    <span class="hljs-attr">backgroundSize</span>: <span class="hljs-string">&#x27;cover&#x27;</span>
})
</code></pre>
<p><code>backgroundRepeat</code>支持设置的值如下：</p>
<pre class="hljs"><code>[
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;不重复&#x27;</span>,
    <span class="hljs-attr">value</span>: <span class="hljs-string">&#x27;no-repeat&#x27;</span>
  },
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;重复&#x27;</span>,
    <span class="hljs-attr">value</span>: <span class="hljs-string">&#x27;repeat&#x27;</span>
  },
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;水平方向重复&#x27;</span>,
    <span class="hljs-attr">value</span>: <span class="hljs-string">&#x27;repeat-x&#x27;</span>
  },
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;垂直方向重复&#x27;</span>,
    <span class="hljs-attr">value</span>: <span class="hljs-string">&#x27;repeat-y&#x27;</span>
  }
]
</code></pre>
<p><code>backgroundPosition</code>支持设置的值如下：</p>
<pre class="hljs"><code>[
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;默认&#x27;</span>,
    <span class="hljs-attr">value</span>: <span class="hljs-string">&#x27;0% 0%&#x27;</span>
  },
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;左上&#x27;</span>,
    <span class="hljs-attr">value</span>: <span class="hljs-string">&#x27;left top&#x27;</span>
  },
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;左中&#x27;</span>,
    <span class="hljs-attr">value</span>: <span class="hljs-string">&#x27;left center&#x27;</span>
  },
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;左下&#x27;</span>,
    <span class="hljs-attr">value</span>: <span class="hljs-string">&#x27;left bottom&#x27;</span>
  },
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;右上&#x27;</span>,
    <span class="hljs-attr">value</span>: <span class="hljs-string">&#x27;right top&#x27;</span>
  },
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;右中&#x27;</span>,
    <span class="hljs-attr">value</span>: <span class="hljs-string">&#x27;right center&#x27;</span>
  },
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;右下&#x27;</span>,
    <span class="hljs-attr">value</span>: <span class="hljs-string">&#x27;right bottom&#x27;</span>
  },
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;中上&#x27;</span>,
    <span class="hljs-attr">value</span>: <span class="hljs-string">&#x27;center top&#x27;</span>
  },
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;居中&#x27;</span>,
    <span class="hljs-attr">value</span>: <span class="hljs-string">&#x27;center center&#x27;</span>
  },
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;中下&#x27;</span>,
    <span class="hljs-attr">value</span>: <span class="hljs-string">&#x27;center bottom&#x27;</span>
  }
]
</code></pre>
<p><code>backgroundSize</code>支持设置的值如下：</p>
<pre class="hljs"><code>[
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;自动&#x27;</span>,
    <span class="hljs-attr">value</span>: <span class="hljs-string">&#x27;auto&#x27;</span>
  },
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;覆盖&#x27;</span>,
    <span class="hljs-attr">value</span>: <span class="hljs-string">&#x27;cover&#x27;</span>
  },
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;保持&#x27;</span>,
    <span class="hljs-attr">value</span>: <span class="hljs-string">&#x27;contain&#x27;</span>
  }
]
</code></pre>
<h2>设置连线样式</h2>
<p>设置节点间的连线样式，支持：<code>颜色</code>、<code>粗细</code>、<code>虚线</code>、<code>风格</code>。</p>
<p>目前支持三种连线风格，分别是：曲线（curve）、直线（straight）、直连（direct），其中曲线只在<code>logicalStructure</code>逻辑结构图和<code>mindMap</code>思维导图两种结构时生效。</p>
<pre class="hljs"><code>mindMap.setThemeConfig({
    <span class="hljs-attr">lineColor</span>: <span class="hljs-string">&#x27;#009CE0&#x27;</span>,
    <span class="hljs-attr">lineWidth</span>: <span class="hljs-number">3</span>,
    <span class="hljs-attr">lineDasharray</span>: <span class="hljs-string">&#x27;15, 10, 5, 10, 15&#x27;</span>,
    <span class="hljs-attr">lineStyle</span>: <span class="hljs-string">&#x27;curve&#x27;</span>
})
</code></pre>
<h2>设置概要的连线样式</h2>
<p>概要节点前面会有一条弧线，它的颜色和粗细可以修改。</p>
<pre class="hljs"><code>mindMap.setThemeConfig({
    <span class="hljs-attr">generalizationLineColor</span>: <span class="hljs-string">&#x27;#FA28FF&#x27;</span>,
    <span class="hljs-attr">generalizationLineWidth</span>: <span class="hljs-number">4</span>
})
</code></pre>
<h2>设置关联线的样式</h2>
<blockquote>
<p>关联线需要使用关联线插件</p>
</blockquote>
<p>关联线支持设置颜色和粗细，因为它还可以被激活选中，所以还可以设置激活时的颜色和粗细。</p>
<pre class="hljs"><code>mindMap.setThemeConfig({
    <span class="hljs-attr">associativeLineColor</span>: <span class="hljs-string">&#x27;#FA28FF&#x27;</span>,
    <span class="hljs-attr">associativeLineWidth</span>: <span class="hljs-number">4</span>,
    <span class="hljs-attr">associativeLineActiveColor</span>: <span class="hljs-string">&#x27;#9F0500&#x27;</span>,
    <span class="hljs-attr">associativeLineActiveWidth</span>: <span class="hljs-number">6</span>
})
</code></pre>
<h2>设置节点边框风格</h2>
<p>默认节点的边框时封闭图形，不过也提供了一种只有底边边框的风格。</p>
<pre class="hljs"><code>mindMap.setThemeConfig({
    <span class="hljs-attr">nodeUseLineStyle</span>: <span class="hljs-literal">true</span>
})
</code></pre>
<h2>设置节点内边距</h2>
<pre class="hljs"><code>mindMap.setThemeConfig({
    <span class="hljs-attr">paddingX</span>: <span class="hljs-number">30</span>,
    <span class="hljs-attr">paddingY</span>: <span class="hljs-number">20</span>
})
</code></pre>
<h2>设置节点内的图片最大的显示宽高</h2>
<pre class="hljs"><code>mindMap.setThemeConfig({
    <span class="hljs-attr">imgMaxWidth</span>: <span class="hljs-number">100</span>,
    <span class="hljs-attr">imgMaxHeight</span>: <span class="hljs-number">50</span>
})
</code></pre>
<h2>设置节点内图标的显示大小</h2>
<pre class="hljs"><code>mindMap.setThemeConfig({
    <span class="hljs-attr">iconSize</span>: <span class="hljs-number">30</span>,
})
</code></pre>
<h2>设置节点外边距</h2>
<p>设置节点外边距稍微麻烦一点，需要针对不同层级的节点进行设置。</p>
<pre class="hljs"><code>mindMap.setThemeConfig({
    <span class="hljs-comment">// 二级节点样式</span>
    <span class="hljs-attr">second</span>: {
        <span class="hljs-attr">marginX</span>: <span class="hljs-number">30</span>,
        <span class="hljs-attr">marginY</span>: <span class="hljs-number">20</span>
    },
    <span class="hljs-comment">// 三级及以下节点样式</span>
    <span class="hljs-attr">node</span>: {
        <span class="hljs-attr">marginX</span>: <span class="hljs-number">40</span>,
        <span class="hljs-attr">marginY</span>: <span class="hljs-number">30</span>
    }
})
</code></pre>
<h2>完整示例</h2>
<iframe style="width: 100%; height: 455px; border: none;" src="https://wanglin2.github.io/playground/#eNq1WAtvE0cQ/iurQ8hOsc92EofgJoiQEIpEWgRUEOUidL5b2xfOt+ZunThEkYCWR3iUVqUtLbRKaQpIraBqq0ISkvyZ+JF/0dm9p31OsKM2UuS7nZlvvp3dnZ25BWGkVBJny1jICEOWYmoliixMy6WjkqEVS8SkaAGZOBdDxJggZYNiNYasgqzrZO4szqFFlDNJEUUAIeJZTGiGOiGXbJEkWDCs43gRRuNFuSQJkoGQZOiYIjbGNIeRUdZ1yZCMRAJVN76uLj2obV2r/b1e/+Hzxt0b9Rur1TvfNX5+KRkKMSyKZIVqs/hjomILbH0+0anpHgel8WqzvvGq8dn92vevd549bSz96RrD/I7nR4lOTLCN9qDho2iBUXLIiCA/X8BFPEqMnJaPchlCWVm5nDchBCo3zaDIgZH+sbFkEuYt0UVwu9jseeun+tpWbflN9d3DJs+ninIe788zNwXPBUpLViaR0CtXDGveEollxRUjnsXajGbkRVnX5suGYokKKSZkC1CtRC+eHEwPjqSKRJwp4Xwk1op9FpewTAHcIHGTP4d1zhBLoxoxQEvBsBdMZP+ENc9pVxlRhcyCtKsAndYMfI7O612FSAcjb1mSySOjJ5IuJya6oKm0kEF9gaExGXaNacrzYJFKx1AqGUPOTyrNbJspV+/crj14ZlPe+eWL2vI7ewMrZdMjfMpQcQVYJ20R88LHT2sws2E0FQHlWRyJoYhFTVnLFyDCKKJqJlZoZNoLwZxGlcK+o8CNMs3Op6IhmocO9aCDqA+8IhRemtrzG43n19nZa7dGnOBJeV8U89jAJuzPqzLbRwzCW7bxkd7B8XF32cKKziL2t99N1Zt/Na4/ArLAuh3fEWtffOH0EEUDDrMQyV3Jtmi5TNtLR3ju8pCOjCfTkET20nXwBlpnvr2xVX/0srr2TWNz1d2U9pzLFk+O+5qyAYafWr5tBlGzjHc5w3ZuvnUTGDTe/Bg4xsz9GVlVIR9147xkm1yEw5p0QuIMTWZQL5ysPVnA2lefbNaXbteeXquuvGBb4fFmfWWt+mpj57fHLex4MmV5qht+WjE/IVecBUm7FO3RjzA702z4PTSBY235ts9u5UX1j2AK5OzgrWtyjo0TvD04rHzbdsEmZDOvGd24ZLtw7X597YUN7J48JrIwYKsZG8X+K3L84OL6o876soFFR8jA3y4BePXh3e31X7ff3gt7Ybu1vY/+tj76XB9N8fGKm2h45qw4wXNuUeNOHOsZpBKlXIQLUMxjekKH2Bj0+PwpNRpxLCFUVIZjZEZ6HCqqTOUAW0lgA5KQCfCXBIorFMYkoba8ak9YErypuLFhikpB01UTG6A85QMEsNp7aPESXL+AI1evORGHkZoZ84sjhOKTDr/tNo3QVPaaTguN6p1btUevt9+u7zx7HCJj67KzArpwK5dMjZganb+UikyHVJu5hvnyC3R39f9xAi03xXnY4FDn8RgKAwNKti8n4/jhVB+O9/cmU/Fsr9wXHxzoT6bUgb5cNj0oCeHZ7orLdrJJ9E9yOVZMMidTC5JQgYd4bzomCfPwlFyMOWOBoemWAHUf0eBrQBaE+Y93vKZyrc6CGLZm1wrbWZLQTZl+Ra8kKoXekYuXj1cmi+mZkzidGzs8dmHSHE1nxZKR380VS/jMXZutNseuKSZLJYO50BUX+H3lyAMJiEJi7PjABpfEfXTGXDPN0OhZQuySwOsgpiI6zvEK2OkhnFr0Q7s75Nm//uSr6pe/O0mf94Pba/e21/8J3kvEiELLouJLdk8IgFH2GuM3A6t+/YQO5ZXfN4qzsl5m16ur55XC8D+UsHth6ILhhWJoYGWK4Q2hIVWbRYoOx2RYEhwSY7hIJIGLHQVN9aXeNQAqQwmQBhVdJEqInpWZii2U6FC2TCkx0DFF15TLoOL3raAVbm+HEraBAwD4bQF42dMCYBdNHQF4ZaEPEegROoBobm8AJdxadYoS6EE8Nm1bl04BA02CBxhuLN6P1lp+A1i4Vu8o3IEy2g94c9HdMY5X8LYi8dW3a+TOwZxaM4wFpW2XWHbZ2Yrk1qgtMP4Jcp+GEoEDCq8WCznXOOZ8kJIEMWF/hXKqOBFbRVGx4Cbz0o0YOMtuuuAJlKfHg1wPmhEvf5kYPEIy4QKe+tj/gdYz70L5hnLWInqZ2obQtEMWzKCk80ZJyX8Ju7dTNqttk6WK67m93w9cz3bp66M6/ZQ74FEXnRTUIeOUy8Ah7b0DIKRPvgZCDO4otgLsu584YxEDPjNyeHZ5MQGrJVyHkgBfEe2bU0zAo2hCSa4VMVuseNYkcxY2AcS7CNt8WbRtw0vNrBxui8Liv2HIkPI=" />
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>