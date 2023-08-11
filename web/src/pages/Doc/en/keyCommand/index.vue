<template>
  <div>
    <h1>KeyCommand instance</h1>
<p>The <code>keyCommand</code> instance is responsible for adding and triggering shortcuts. It
includes some built-in shortcuts and can also be added manually. The
<code>mindMap.keyCommand</code> instance can be obtained through this.</p>
<h2>Methods</h2>
<h3>addShortcut(key, fn)</h3>
<p>Add a shortcut</p>
<p><code>key</code>: Shortcut key, key values can be viewed at
<a href="https://github.com/wanglin2/mind-map/blob/main/simple-mind-map/src/core/command/keyMap.js">keyMap.js</a>
Example:</p>
<pre class="hljs"><code><span class="hljs-comment">// Single key</span>
mindMap.keyCommand.addShortcut(<span class="hljs-string">&quot;Enter&quot;</span>, <span class="hljs-function">() =&gt;</span> {});
<span class="hljs-comment">// Or</span>
mindMap.keyCommand.addShortcut(<span class="hljs-string">&quot;Del|Backspace&quot;</span>, <span class="hljs-function">() =&gt;</span> {});
<span class="hljs-comment">// Combination key</span>
mindMap.keyCommand.addShortcut(<span class="hljs-string">&quot;Control+Enter&quot;</span>, <span class="hljs-function">() =&gt;</span> {});
</code></pre>
<p><code>fn</code>: Method to be executed</p>
<h3>removeShortcut(key, fn)</h3>
<p>Remove a shortcut command, if <code>fn</code> is not specified, all callback methods for
the shortcut will be removed</p>
<h3>getShortcutFn(key)</h3>
<blockquote>
<p>v0.2.2+</p>
</blockquote>
<p>Get the processing function for the specified shortcut</p>
<h3>pause()</h3>
<blockquote>
<p>v0.2.2+</p>
</blockquote>
<p>Pause all shortcut responses</p>
<h3>recovery()</h3>
<blockquote>
<p>v0.2.2+</p>
</blockquote>
<p>Restore shortcut responses</p>
<h3>save()</h3>
<blockquote>
<p>v0.2.3+</p>
</blockquote>
<p>Save the current registered shortcut data, then clear the shortcut data</p>
<h3>restore()</h3>
<blockquote>
<p>v0.2.3+</p>
</blockquote>
<p>Restore saved shortcut data, then clear the cache data</p>
<h3>hasCombinationKey(e)</h3>
<blockquote>
<p>v0.6.13+</p>
</blockquote>
<ul>
<li><code>e</code>: Event object.</li>
</ul>
<p>Determine if the combination key has been pressed.</p>

  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>