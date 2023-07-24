<template>
  <div>
    <h1>主题</h1>
<h2>使用和切换主题</h2>
<p><code>simple-mind-map</code>内置了很多主题，可以通过如下方式获取到所有的内置主题列表：</p>
<pre class="hljs"><code><span class="hljs-keyword">import</span> { themeList } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;simple-mind-map/src/constants/constant&#x27;</span>
<span class="hljs-comment">// import { themeList } from &#x27;simple-mind-map/src/utils/constant&#x27; v0.6.0以下版本使用该路径</span>
</code></pre>
<blockquote>
<p>v0.6.8+，主题列表增加了代表是否是暗黑主题的字段dark，你可以根据这个字段来将界面切换为暗黑模式。</p>
</blockquote>
<p>可以在实例化<code>simple-mind-map</code>时指定使用的主题：</p>
<pre class="hljs"><code><span class="hljs-keyword">new</span> MindMap({
    <span class="hljs-attr">theme</span>: <span class="hljs-string">&#x27;minions&#x27;</span>
})
</code></pre>
<p>如果想动态切换主题也很简单：</p>
<pre class="hljs"><code>mindMap.setTheme(<span class="hljs-string">&#x27;classic&#x27;</span>)
</code></pre>
<p>如果要获取当前使用的主题名称可以使用：</p>
<pre class="hljs"><code><span class="hljs-keyword">const</span> theme = mindMap.getTheme()
</code></pre>
<h2>定义新主题</h2>
<p>除了可以使用内置的主题外，你也可以自定义新主题：</p>
<pre class="hljs"><code><span class="hljs-keyword">import</span> MindMap <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;simple-mind-map&#x27;</span>

<span class="hljs-comment">// 注册新主题</span>
MindMap.defineTheme(<span class="hljs-string">&#x27;主题名称&#x27;</span>, {
    <span class="hljs-comment">// 主题配置</span>
})

<span class="hljs-comment">// 1.实例化时使用新注册的主题</span>
<span class="hljs-keyword">const</span> mindMap = <span class="hljs-keyword">new</span> MindMap({
    <span class="hljs-attr">theme</span>: <span class="hljs-string">&#x27;主题名称&#x27;</span>
})

<span class="hljs-comment">// 2.动态切换新主题</span>
mindMap.setTheme(<span class="hljs-string">&#x27;主题名称&#x27;</span>)
</code></pre>
<p>最好在实例化之前进行注册，这样在实例化时可以直接使用新注册的主题。</p>
<p>一个主题其实就是一个普通的对象，完整配置可以参考<a href="https://github.com/wanglin2/mind-map/blob/main/simple-mind-map/src/themes/default.js">默认主题</a>，<code>defineTheme</code>方法会把你传入的配置和默认配置做合并。大部分主题其实需要自定义的部分不是很多，一个典型的自定义主题配置可以参考<a href="https://github.com/wanglin2/mind-map/blob/main/simple-mind-map/src/themes/blueSky.js">blueSky</a>。</p>
<pre class="hljs"><code>MindMap.defineTheme(<span class="hljs-string">&#x27;redSpirit&#x27;</span>, {
    <span class="hljs-comment">// 背景颜色</span>
    <span class="hljs-attr">backgroundColor</span>: <span class="hljs-string">&#x27;rgb(255, 238, 228)&#x27;</span>,
    <span class="hljs-comment">// 连线的颜色</span>
    <span class="hljs-attr">lineColor</span>: <span class="hljs-string">&#x27;rgb(230, 138, 131)&#x27;</span>,
    <span class="hljs-attr">lineWidth</span>: <span class="hljs-number">3</span>,
    <span class="hljs-comment">// 概要连线的粗细</span>
    <span class="hljs-attr">generalizationLineWidth</span>: <span class="hljs-number">3</span>,
    <span class="hljs-comment">// 概要连线的颜色</span>
    <span class="hljs-attr">generalizationLineColor</span>: <span class="hljs-string">&#x27;rgb(222, 101, 85)&#x27;</span>,
    <span class="hljs-comment">// 根节点样式</span>
    <span class="hljs-attr">root</span>: {
      <span class="hljs-attr">fillColor</span>: <span class="hljs-string">&#x27;rgb(207, 44, 44)&#x27;</span>,
      <span class="hljs-attr">color</span>: <span class="hljs-string">&#x27;rgb(255, 233, 157)&#x27;</span>,
      <span class="hljs-attr">borderColor</span>: <span class="hljs-string">&#x27;&#x27;</span>,
      <span class="hljs-attr">borderWidth</span>: <span class="hljs-number">0</span>,
      <span class="hljs-attr">fontSize</span>: <span class="hljs-number">24</span>,
      <span class="hljs-attr">active</span>: {
        <span class="hljs-attr">borderColor</span>: <span class="hljs-string">&#x27;rgb(255, 233, 157)&#x27;</span>,
        <span class="hljs-attr">borderWidth</span>: <span class="hljs-number">3</span>,
      }
    },
    <span class="hljs-comment">// 二级节点样式</span>
    <span class="hljs-attr">second</span>: {
      <span class="hljs-attr">fillColor</span>: <span class="hljs-string">&#x27;rgb(255, 255, 255)&#x27;</span>,
      <span class="hljs-attr">color</span>: <span class="hljs-string">&#x27;rgb(211, 58, 21)&#x27;</span>,
      <span class="hljs-attr">borderColor</span>: <span class="hljs-string">&#x27;rgb(222, 101, 85)&#x27;</span>,
      <span class="hljs-attr">borderWidth</span>: <span class="hljs-number">2</span>,
      <span class="hljs-attr">fontSize</span>: <span class="hljs-number">18</span>,
      <span class="hljs-attr">active</span>: {
        <span class="hljs-attr">borderColor</span>: <span class="hljs-string">&#x27;rgb(255, 233, 157)&#x27;</span>,
      }
    },
    <span class="hljs-comment">// 三级及以下节点样式</span>
    <span class="hljs-attr">node</span>: {
      <span class="hljs-attr">fontSize</span>: <span class="hljs-number">14</span>,
      <span class="hljs-attr">color</span>: <span class="hljs-string">&#x27;rgb(144, 71, 43)&#x27;</span>,
      <span class="hljs-attr">active</span>: {
        <span class="hljs-attr">borderColor</span>: <span class="hljs-string">&#x27;rgb(255, 233, 157)&#x27;</span>
      }
    },
    <span class="hljs-comment">// 概要节点样式</span>
    <span class="hljs-attr">generalization</span>: {
      <span class="hljs-attr">fontSize</span>: <span class="hljs-number">14</span>,
      <span class="hljs-attr">fillColor</span>: <span class="hljs-string">&#x27;rgb(255, 247, 211)&#x27;</span>,
      <span class="hljs-attr">borderColor</span>: <span class="hljs-string">&#x27;rgb(255, 202, 162)&#x27;</span>,
      <span class="hljs-attr">borderWidth</span>: <span class="hljs-number">2</span>,
      <span class="hljs-attr">color</span>: <span class="hljs-string">&#x27;rgb(187, 101, 69)&#x27;</span>,
      <span class="hljs-attr">active</span>: {
        <span class="hljs-attr">borderColor</span>: <span class="hljs-string">&#x27;rgb(222, 101, 85)&#x27;</span>
      }
    }
})
</code></pre>
<h2>完整示例</h2>
<iframe style="width: 100%; height: 455px; border: none;" src="https://wanglin2.github.io/playground/#eNrFV+tvG0UQ/1dWh9A5yDk/0wTjVIXCB6QGoRaJD7kIne/W9rbn3eN2nUcjSxBQadpUBYEoL6ESiZIPSKCCSh5U+Wf8SP8LZm/vZfuSlqpSP/ixszO/mf3N7Nzcpvam5xmrXazVtDq3feIJxLHoeudNSjoe8wXaRD5u5hGjS6xLBXbyiLct12Vrl3ET9VDTZx2kA4IeWywR6ixZntoyNQ5iF892QDrbsTxTMylCJnWxQFImNRcR7bqukhcKaPD468H2neHxJ8O/j0Y/fH5ya2u0dTC4ee/klz2T2oxygSxbkFX8HnMwB+skotzyyoxJFcrNL4Z3dvv7R092v4vM7LZFW/iDNu5gMMvNoMXzaFP6DSMx4PDBbk63XYtzYusA1wsRh3/tDW7sDA4e9R8fj77ZG3775zi6g5uEZqGHjBgphZzuY+eKR3wi9LzSQgh8nHy2M/z+jye7P51sP1TChmVfa/lAvnORucyvId1vNXLlubk8KlcW4Ku8MKPnE4Djn0eHx0BbGsMFt2PWlWIelaR1qVKKraXWh8QR7RqqJIDDB1snDz6NYUcP742ObqjdFqbYt1xy3RKE0UvPYp6Oatp8LMZyGcIrlvJoYS59wOH9A1URw/v/DP69q+Q+Y6IW0YhQk7juGFZxPo+qVfmJoRCyp/msgMu5+ZROg/kO9iOsSXl43GIsbjIqrpDruIbK1VioijUV3iTsWQFMuIqYRQiqMvhJmOkf7owOf5smh2OoT+csegLf4ddpBJUgE3Oy3pKCyTxHVtomDlHO4Ku08GL4yqBlfxtoGdy91T/6tb9/e5ofCm0kzU4SU5LDNBUlWUnzcMJqJeX4eaI+Pejw2kzFOn5nnhZ1dqKrcBkgnWenMdAsylyeKz89j2P0LAB+UAHnXv/f/IxVzyQ90IdFDxpyVr9O2mnUseNHVm660ctHDl6LGnMujAm7NeQwu9vBVBgtLN5xAZqKtzbedXJ6aHkReLagVfn6THg0xxJW6limJgWmNnZSKRZ4XUixqcUtTD0M06mXinabuI6PqVReTjAm4DK9THpKt4TE2bjDDKcryV5a7yVFEP0NZZEdoURchr4vp4D3GSfqQizrLm7KZ6puQ+ogTSuhupB1AmUGeQRFHhRXb+YNNXUEd27041eDL38P71wwffQPb/ePHqULjtGcLvvFR6qcwU9OLvNBE7lEuEhKLSr5YEoxVi23K8eCSE+5h1KFT72gZi+YumAhMAxMlsCwQqjukFUUzCKLphYG8TbuMFMLtkMF4iS7cYGCSr0Au2nFCEkw5jYsqaI2TVFvdIVgFF2wXWJfA5XUrARq6WmqXlC6oS1AT9qmBh2wPW1umsBJgo3+1QspLmDJxYaraLkQzpqmZhTUgBnNWJh3DJtzU4sza6RoizKzphpYqVh8NdBDyIsryMfgEfIWbATFJz+vTNIbQSWGVoMztyuUIYxTUIcwG4QrwbxkMe2+jUmrDerVYtFbjzxn+30t8tyx/BYBvxGqZzkOoa1IEIduhNl+xohLUQRh0PEaAKFSgxxoeU1lQI70xlXOKLxBBPBmuAEZiDuDqcELgmoHRgH+Gj70ZdLBMlmzDZ+tcewDiKmFVzXjpUHatoXweK1QcNc/pnyDG4zzWZvONjC5Csc24Km40aU2N2zWKUCZY8EzakO6CQ/T03r/AbfdVt0=" />
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>