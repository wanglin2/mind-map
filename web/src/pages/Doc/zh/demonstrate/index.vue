<template>
  <div>
    <h1>Demonstrate 插件</h1>
<blockquote>
<p>v0.9.11+</p>
</blockquote>
<p><code>Demonstrate</code>插件提供演示功能。</p>
<p>进入演示模式时会自动将容器元素全屏，然后默认聚焦到根节点，可通过键盘方向键的左右来切换上一步和下一步，可通过<code>Esc</code>键退出演示模式。</p>
<p>进入演示模式后思维导图所有的快捷键都将无法使用，鼠标也无法操作思维导图。</p>
<h2>注册</h2>
<pre class="hljs"><code><span class="hljs-keyword">import</span> MindMap <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;simple-mind-map&#x27;</span>
<span class="hljs-keyword">import</span> Demonstrate <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;simple-mind-map/src/plugins/Demonstrate.js&#x27;</span>

MindMap.usePlugin(Demonstrate)
</code></pre>
<p>注册完且实例化<code>MindMap</code>后可通过<code>mindMap.demonstrate</code>获取到该实例。</p>
<h3>配置</h3>
<p>该插件提供了一些配置项可供配置，可以通过实例化选项<code>demonstrateConfig</code>进行配置。详见【构造函数】篇章的【实例化选项】小节。</p>
<h3>事件</h3>
<p>该插件会派发如下事件：</p>
<p><code>exit_demonstrate</code>：退出演示时触发。</p>
<p><code>demonstrate_jump</code>：跳转时触发。</p>
<p>详见【构造函数】篇章的【实例方法】小节<code>on</code>函数。</p>
<h2>属性</h2>
<h3>stepList</h3>
<p>演示的所有步骤列表。当调用了<code>enter</code>方法后可用。</p>
<h3>currentStepIndex</h3>
<p>当前播放到的步骤索引，从0开始计数。</p>
<h3>config</h3>
<p>插件当前的配置。</p>
<h2>方法</h2>
<h3>enter()</h3>
<p>进入演示模式，会自动将容器元素全屏。</p>
<h3>exit()</h3>
<p>退出演示模式，通过<code>Esc</code>键也可退出。</p>
<h3>prev()</h3>
<p>上一步。</p>
<h3>next()</h3>
<p>下一步。</p>
<h3>jump(index)</h3>
<ul>
<li><code>index</code>：Number，要跳转到的某一步，从0开始计数。</li>
</ul>
<p>跳转到某一步。</p>

  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>