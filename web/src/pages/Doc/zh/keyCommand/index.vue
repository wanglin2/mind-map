<template>
  <div>
    <h1>KeyCommand实例</h1>
<p><code>keyCommand</code>实例负责快捷键的添加及触发，内置了一些快捷键，也可以自行添加。可通过<code>mindMap.keyCommand</code>获取到该实例。</p>
<h2>方法</h2>
<h3>addShortcut(key, fn)</h3>
<p>添加快捷键</p>
<p><code>key</code>：快捷键按键，按键值可以通过<a href="https://github.com/wanglin2/mind-map/blob/main/simple-mind-map/src/core/command/keyMap.js">keyMap.js</a>查看。示例：</p>
<pre class="hljs"><code><span class="hljs-comment">// 单个按键</span>
mindMap.keyCommand.addShortcut(<span class="hljs-string">&#x27;Enter&#x27;</span>, <span class="hljs-function">() =&gt;</span> {})
<span class="hljs-comment">// 或</span>
mindMap.keyCommand.addShortcut(<span class="hljs-string">&#x27;Del|Backspace&#x27;</span>, <span class="hljs-function">() =&gt;</span> {})
<span class="hljs-comment">// 组合键</span>
mindMap.keyCommand.addShortcut(<span class="hljs-string">&#x27;Control+Enter&#x27;</span>, <span class="hljs-function">() =&gt;</span> {})
</code></pre>
<p><code>fn</code>：要执行的方法</p>
<h3>removeShortcut(key, fn)</h3>
<p>移除快捷键命令，<code>fn</code>不指定则移除该快捷键的所有回调方法</p>
<h3>getShortcutFn(key)</h3>
<blockquote>
<p>v0.2.2+</p>
</blockquote>
<p>获取指定快捷键的处理函数</p>
<h3>pause()</h3>
<blockquote>
<p>v0.2.2+</p>
</blockquote>
<p>暂停所有快捷键响应</p>
<h3>recovery()</h3>
<blockquote>
<p>v0.2.2+</p>
</blockquote>
<p>恢复快捷键响应</p>
<h3>save()</h3>
<blockquote>
<p>v0.2.3+</p>
</blockquote>
<p>保存当前注册的快捷键数据，然后清空快捷键数据</p>
<h3>restore()</h3>
<blockquote>
<p>v0.2.3+</p>
</blockquote>
<p>恢复保存的快捷键数据，然后清空缓存数据</p>
<h3>hasCombinationKey(e)</h3>
<blockquote>
<p>v0.6.13+</p>
</blockquote>
<ul>
<li><code>e</code>：事件对象。</li>
</ul>
<p>判断是否按下了组合键。</p>

  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>