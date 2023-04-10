<template>
  <div>
    <h1>显示水印</h1>
<blockquote>
<p>要使用水印需要注册水印插件</p>
</blockquote>
<p><code>simple-mind-map</code>提供了水印的插件，使用非常简单，首先可以在实例化<code>simple-mind-map</code>时提供水印的选项配置来直接显示水印：</p>
<pre class="hljs"><code><span class="hljs-keyword">new</span> MindMap({
    <span class="hljs-comment">// ...</span>
    <span class="hljs-attr">watermarkConfig</span>: {
        <span class="hljs-attr">text</span>: <span class="hljs-string">&#x27;水印文字&#x27;</span>,
        <span class="hljs-attr">lineSpacing</span>: <span class="hljs-number">100</span>,
        <span class="hljs-attr">textSpacing</span>: <span class="hljs-number">100</span>,
        <span class="hljs-attr">angle</span>: <span class="hljs-number">30</span>,
        <span class="hljs-attr">textStyle</span>: {
            <span class="hljs-attr">color</span>: <span class="hljs-string">&#x27;#999&#x27;</span>,
            <span class="hljs-attr">opacity</span>: <span class="hljs-number">0.5</span>,
            <span class="hljs-attr">fontSize</span>: <span class="hljs-number">14</span>
        }
    }
})
</code></pre>
<p>详细字段含义可以阅读【API】-【构造函数】-【实例化选项】小节。</p>
<p>此外也可以动态更新水印，<code>watermarkConfig</code>的所有配置都可以修改，如果不想再显示水印将<code>text</code>传入空字符串即可。</p>
<pre class="hljs"><code>mindMap.watermark.updateWatermark({
    <span class="hljs-attr">text</span>: <span class="hljs-string">&#x27;街角小林&#x27;</span>,
    <span class="hljs-attr">lineSpacing</span>: <span class="hljs-number">50</span>,
    <span class="hljs-attr">textSpacing</span>: <span class="hljs-number">50</span>,
    <span class="hljs-attr">angle</span>: <span class="hljs-number">45</span>,
    <span class="hljs-attr">textStyle</span>: {
        <span class="hljs-attr">color</span>: <span class="hljs-string">&#x27;#73D8FF&#x27;</span>,
        <span class="hljs-attr">opacity</span>: <span class="hljs-number">1</span>,
        <span class="hljs-attr">fontSize</span>: <span class="hljs-number">12</span>
    }
})
</code></pre>
<h2>完整示例</h2>
<iframe style="width: 100%; height: 455px; border: none;" src="https://wanglin2.github.io/playground/#eNrFVdtqG0cYfpVhQ1m5SLty49BalUPapoFCXUpy0YuMKavdkTTJ7Mx2Z9ayagQlFHoMPUEMDZTmKrlIwBcmEIeQl7FkP0b+2ZlZrQ4XuYtg7Zn/9P3nOfQ+ybJgvyBex+vKOKeZQpKoIruKOU0zkSt0iHLSbyLBd0XBFUmaSA4jxsToJumjCernIkU+WPArjV3Kk90oMyzsSSAz0kqB2kqjDHuYI4Q5IwppmpbcQbxgzNDDEE1f/TP95f7s9Q+zk5fn//548eu983svpj8fXTx6gnksuFQoihXdJ1+JhEjQnnvUuL23gXlpZfbwZPbgeHZ8Mr1/7NSKLIkU+Qa+PI3yu6Da2EA7V9GhxrbeBCPHDpbEG6UYQoocqA7yLx4dXTz+e3r8x+y/I79pWIxyciuLYsoHHXSlbalaYZUa8QEjHbR1pS6lxppmgfQvFkzkgHbpw8vXP7pxwwHpn9Am1biDNmvEvuDqFv0ejGx+YKgTSIiaQFr0gVeFbKyGrgtBRq6ALlzCOigRcZESroIBUZ8zoo+fjr9IGr7V/AxQI4g99zesL5C5qBYI9jQBewuxabKOWpOxN/v/hSm1aZHS9Sow7MVDypKccC18e25jydxalGWks9Pfz08fL4MtAq4B3Zvz6nLvyAN3tDSnRzlVN4VQeja+FpIqKjho+oz0ld9EfgylgzLtWfGq2aGCfQrtWXPb9rkZodmDn6bPqj5f6fXNtmvrlYZfZNmuv7wivtL5C92/vb1dx15o/3bgRmjNEGytpKz8N9n42OwbhGBXnD/8a/rnU1MOs3fOTn87e/m8vhYEb/gckvqt2T2Qy4a+NpH++yWVaj5OEOV8PwX7ESuIHi0rZ+BhHOHrhmbrwr6FiyKwKqEgcEOom9B9FLNIyh3sWSeuk1Rgr2RbAZrMudUQgkg3BG5d0FlSQrBepEUME6tur1BKcHQtZjS+CyJLaw9E67u0Gxp5Z7wCcqduWIsDrlJXtpS4Zl8I7AWheRbsqgmITINYSuxVVQlqIbusjmiihmVDvVfKIZRVHZ4TQIScl4yyxPq7tJwaZ2quGPWkYIUyitDVMCfQUvamRDa/rMIPCR0MQXyr3c4OHPJ63PcdMqR0QAHXWc2iJCnnxBAq1wNbqbf0eNN5YJ2u7mAQuqysgdf0TAX0QxzckYLDu1+ax5YBFahmEHvwrJt1FYRwDHJ4N2hKdLFavVyMJMnBCPbs8K156rXuUKlMdsKQHXzH5VgGQspWzFs9Qu9A2EHE6LjgsQxikYbQokTJNb2hYWwwE2/yBqzl3vI=" />
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>