<template>
  <div>
    <h1>如何渲染富文本的悬浮工具栏</h1>
<blockquote>
<p>要支持节点富文本编辑需要使用富文本插件</p>
</blockquote>
<p>如果开启了节点富文本编辑，那么可以对节点内的部分文本应用样式，一般当选中文本时上方会出现一个工具栏，有加粗、斜体、改变颜色等等的按钮。</p>
<p>首先要监听<code>rich_text_selection_change</code>事件，也就是选中文本的事件：</p>
<pre class="hljs"><code>mindMap.on(<span class="hljs-string">&#x27;rich_text_selection_change&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">hasRange, rect, formatInfo</span>) =&gt;</span> {
    <span class="hljs-comment">// hasRange（是否存在选区）</span>
    <span class="hljs-comment">// rectInfo（选区的尺寸和位置信息）</span>
    <span class="hljs-comment">// formatInfo（选区的文本格式化信息）</span>
    <span class="hljs-comment">// 显示你的工具栏</span>
})
</code></pre>
<p>可以通过<code>hasRange</code>来判断是否显示工具栏，工具栏的位置可以通过<code>rectInfo</code>获取，通过<code>formatInfo</code>可以获取当前选中文本的样式信息，比如已经被加粗了，那么你的加粗按钮就可以渲染为激活状态。</p>
<h3>工具栏定位</h3>
<pre class="hljs"><code><span class="hljs-keyword">let</span> left = rect.left + rect.width / <span class="hljs-number">2</span> + <span class="hljs-string">&#x27;px&#x27;</span>
<span class="hljs-keyword">let</span> top = rect.top - <span class="hljs-number">60</span> + <span class="hljs-string">&#x27;px&#x27;</span>
</code></pre>
<p>计算出来的是相对于浏览器窗口左上角的位置，所以你的工具栏元素最好是添加在body元素下面，并且使用固定定位或相对定位，另外<code>z-index</code>的属性最好也设置的高一点，否则在弹窗等场景下可能会被挡住。</p>
<h3>加粗/取消加粗</h3>
<pre class="hljs"><code>mindMap.richText.formatText({
    <span class="hljs-attr">bold</span>: <span class="hljs-literal">true</span>/<span class="hljs-literal">false</span>
})
</code></pre>
<h3>斜体/取消斜体</h3>
<pre class="hljs"><code>mindMap.richText.formatText({
    <span class="hljs-attr">italic</span>: <span class="hljs-literal">true</span>/<span class="hljs-literal">false</span>
})
</code></pre>
<h3>下划线/取消下划线</h3>
<pre class="hljs"><code>mindMap.richText.formatText({
    <span class="hljs-attr">underline</span>: <span class="hljs-literal">true</span>/<span class="hljs-literal">false</span>
})
</code></pre>
<h3>删除线/取消删除线</h3>
<pre class="hljs"><code>mindMap.richText.formatText({
    <span class="hljs-attr">strike</span>: <span class="hljs-literal">true</span>/<span class="hljs-literal">false</span>
})
</code></pre>
<h3>设置字体</h3>
<pre class="hljs"><code>mindMap.richText.formatText({
    <span class="hljs-attr">font</span>: <span class="hljs-string">&#x27;宋体, SimSun, Songti SC&#x27;</span>
})
</code></pre>
<h3>设置字号</h3>
<pre class="hljs"><code>mindMap.richText.formatText({
    <span class="hljs-attr">font</span>: <span class="hljs-number">16</span> + <span class="hljs-string">&#x27;px&#x27;</span>
})
</code></pre>
<h3>设置文字颜色</h3>
<pre class="hljs"><code>mindMap.richText.formatText({
    <span class="hljs-attr">color</span>: <span class="hljs-string">&#x27;#fff&#x27;</span>
})
</code></pre>
<h3>设置文字背景颜色</h3>
<pre class="hljs"><code>mindMap.richText.formatText({
    <span class="hljs-attr">background</span>: <span class="hljs-string">&#x27;#fff&#x27;</span>
})
</code></pre>
<h3>清除样式</h3>
<pre class="hljs"><code>mindMap.richText.removeFormat()
</code></pre>
<h2>完整示例</h2>
<iframe style="width: 100%; height: 455px; border: none;" src="https://wanglin2.github.io/playground/#eNrFVk+P20QU/yqDUWUHEiegcjHZUlpA6mERWhUJialWjj2OB8Yzlj1Otkp96akUJCQOcOFQceHeA6J74ct0u+Vb8N6M/202aXMjUaKZN7/3fm/m/ZnZOJ/mub+qmBM48zIqeK5JyXSV36KSZ7kqNNmQgiVjouSxqqRm8ZiUaSiEWp+whNQkKVRGXLDgdhrHXMbHYW6XqFOCWLBJBtJJFubUoZIQKgXTBGWIPCKyEoJKKiMlS3AhVev7SolFWMAa8HtJKEo2atcFS3SzMOuEWqGhq7KoKgom9ReqyEJ9TyaqQWxqgPSKy6Vgd5SIYdUbkaNbZIM+XlP2V6GomL+wyHfetI76ze78gkfpfXam/cQgcegZAkIQGryRCHHobL3t79cyZoXgkh3mdDWA7/W8Ax3ofoffv4crJrc2EqWhXLK7SigM8wGbiBqoW7AY8u0gH41O0Kt0PnQZ7Q2YBxnJ1m0mt6aYCEisoioD3/wl058LhsM7D+/Fntto3lVSh7Ddwh2NrVYc6jCw1vFDHRRQZyCyYg1Oo5g6r569eP308eXjF7ZW8FM3xhAYpVzEcD4I/ra3sWVuJ8s208vzny7P/9wmu0q4g/RBvzbE/U8etMNG1upxyfWJUvpLFbOvVMk1VxI0XWwe7pi4EYQOwvTAwOvRx7Yt9TmlpOdiXp2is6clEyxCE6c2a8GCl4blCY7H0FMiPSY2+TBf+4QCP5IeOeoPA92waW16UqR909Xet+M1j3VKpuRDELj5GWQu1fiFJndVCbvehNycdTg8KwDuKSFQG4TD932vd5o8ekRMY9w6VyxWJZgv1NLbY7ZRalQG7btjbU8AN2JKEH7zqb1y4LKBiWZwT4SawYyQecxXJBJhWR5Rp4nIZyxT1DHLDYDH/WpXeACZT2F1CGwtaesVdchqwhMQDFwFYVDqh4KBeIOxCEyMxnixBPhXd+RgdVFBLCS5HQkefW8st5cIoDabHS3MXBufEPfi519f/fXk4umzy+e/uQQ6UzOs6/nUWn0bS9f691H1zb7je/n3jxdPfrk8/8dQ9rNDWAd9Ghj//eP31z8839LqT7wdzaeDgMLUHK1B3G7eCdTxp/Zx0PRZn5WZH5Uldbpi9AexbzPX1EZAPpjNbhgcIXlX3gUDRr5iZsGkI/7e3c6R1lSvGC4gxyttFW11BmTWzEwGtJPr9CnjyxTgN2ez/Kxl3s37XsuchcWSA29rNQ/jmMtlK+hchwK376C3eayLUJZYzJCrOMST/8abfDS7YVsbWIR6M0Fwxo4NAb7H/O9KJeH5Z+zTZgFC0PVt6sDrzjZrfwpDv4Bbk2cMozVZFGpdsgKMUKfpuztefFb3eqxRq/Gtdur/AJ09jnE=" />
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>