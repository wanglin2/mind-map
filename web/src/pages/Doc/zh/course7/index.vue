<template>
  <div>
    <h1>开启节点自由拖拽</h1>
<p>节点支持自由拖拽，也就是可以把它拖动到你指定的位置，默认是不开启的，如果需要开启可以在实例化<code>simple-mind-map</code>时传入开启的选项：</p>
<pre class="hljs"><code><span class="hljs-keyword">new</span> MindMap({
    <span class="hljs-comment">// ...</span>
    <span class="hljs-attr">enableFreeDrag</span>: <span class="hljs-literal">true</span>
})
</code></pre>
<p>也可以动态切换是否开启：</p>
<pre class="hljs"><code>mindMap.updateConfig({
    <span class="hljs-attr">enableFreeDrag</span>: <span class="hljs-literal">true</span><span class="hljs-comment">// false</span>
})
</code></pre>
<p>自由拖拽很容器将节点拖的乱七八糟，所以也可以通过命令回到默认的位置：</p>
<pre class="hljs"><code>mindMap.execCommand(<span class="hljs-string">&#x27;RESET_LAYOUT&#x27;</span>)
</code></pre>
<p>也可以使用快捷键<code>Ctrl + L</code>来恢复。</p>
<h2>完整示例</h2>
<iframe style="width: 100%; height: 455px; border: none;" src="https://wanglin2.github.io/playground/#eNrFVd1uG0UUfpVhEVoH2buuxJVxSksbJKSEolAuUDeqxrtje8rszLIzm8SyVgoF1EKIFASiFdxAVQFCQFWBEE2oeJmsnb4FZ3b2L44veldLa82c853znZnzM1PrchQ52wmxelZf+jGNFJJEJdFFj9MwErFCUxSTYRsJviESrkjQRnKMGRM7m2SIUjSMRYhs8GBXFhuUBxs4MirPkiBmpBOCtBPiyLM8jpDHGVFIyzRyFfGEMSN3XZQ9/Tr7/GD2397sr+P5d5+efnF7fvtJdvfe6Y+/eNwXXCqEfUW3yTsiIBKs64haN7ZWPF6iqLwWEf5WTMjVGI8ACEdpDTGTJAdpqrt3ZgcPZvcfZYc/Zf/uZYePTu/8Ov/m8Wz/29n+09KPEqMRIw0/rRW0ehFNdcRnOZxtzBICiJeWyTW+OLOTRAFW5IrgQzpq5Z4QIhwPap7eUt8QuEoh/LQ4wezjB9nDg2fH90//eJj980n2eK+MOiaQynU8EYk6G3IZAtkl/hURhpgHLXtz7b216zfXL39w7f3rdum/ynrrvLnOGtkps10dgfVQIPwkJFw5I6LWGNHLNydvA0dhCYdWmHIS2yttYwVXgXvGu/55lhZ4VkNkxIrsKi32rNkPT0xdmHrSv7RwpoH+mLIgJlyDb9Q+FtwtZVlkOjn6cn708yLZWcIlpFu1rol7QRGUy0JW2lFO1aYQSjfSu0JSRQUHS5uRobLbyPYhdZCmrQK+WJ95K2lVuvK66V6EoCTn33+VHf5m4jVdfHK0f3L8d7P2BG/ZHFhvmk4GspbetpH+X6dS1fWGmt1eNViJM/RQr/D1XTPDYHrBRhEYPNBjsEOoH9Bt5DMs5apnFUFcJaHwrFxdAGhQa6sqBUjfBW0TWHpSQrAB1hCj9FR/kCglOLrkM+p/mEOawwOQ0+niYHoD2dlnfz6793tz+NioB+JzM8lGadp3DUlBCjEtkjZ6HxjPz4gFD/X5ylXfbVwfbKWaMHOTl4ox71mOa2Z7MQIcIkPHl9KzqmJwGjddJnOHBmrcQxe63VdyHEJRVXkxAUZIda7Ii1Z/Ly9mpHRVG+KBFCxRxhAhXb891C12SkT15jz9mNDRGOCvdbvRbsm8nPfVkjnE8YgCb+k1wkFAObSEEVShO0WBPGfEF8oIiqCrPTiE4s5zYLUtkwH9mjq3pODweOfuvUIBGagmimfB22zGiOPC0olhntOQ6GR1BrHYkSQGJ55VtPiS91rbjpWKZM912e5HXE6kI6Ts+LwzIPQWHNvBjE4S7kvHF6ELnUGUXFIbmqY4TGql/wPpBfrv" />
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>