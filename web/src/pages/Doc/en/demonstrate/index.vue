<template>
  <div>
    <h1>Demonstrate plugin</h1>
<blockquote>
<p>v0.9.11+</p>
</blockquote>
<p>The <code>Demonstrate</code> plugin provides demonstration functionality.</p>
<p>When entering demonstration mode, the container elements will be automatically displayed in full screen, and then default to the root node. You can switch between the previous and next steps by pressing the left and right arrow keys on the keyboard, and exit demonstration mode by pressing the 'Esc' key.</p>
<p>After entering demonstration mode, all shortcut keys on the mind map will be unavailable, and the mouse will not be able to operate the mind map.</p>
<h2>Register</h2>
<pre class="hljs"><code><span class="hljs-keyword">import</span> MindMap <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;simple-mind-map&#x27;</span>
<span class="hljs-keyword">import</span> Demonstrate <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;simple-mind-map/src/plugins/Demonstrate.js&#x27;</span>

MindMap.usePlugin(Demonstrate)
</code></pre>
<p>After registration and instantiation of <code>MindMap</code>, the instance can be obtained through <code>mindMap.demonstrate</code>.</p>
<h3>Config</h3>
<p>This plugin provides some configuration items for configuration, which can be configured through the instantiation option 'demonstrateConfig'. Please refer to the 【Instantiation options】 section in the 【Constructor】 section for details.</p>
<h3>Event</h3>
<p>The plugin will dispatch the following events:</p>
<p><code>exit_demonstrate</code>：Triggered when exiting the demonstration.</p>
<p><code>demonstrate_jump</code>：Triggered when jumping.</p>
<p>Please refer to the 'on' function in the 【Instance methods】 section of the 【Constructor】 chapter for details.</p>
<h2>Props</h2>
<h3>stepList</h3>
<p>List of all steps demonstrated. Available when the 'enter' method is called.</p>
<h3>currentStepIndex</h3>
<p>The index of the steps currently played, counting from 0.</p>
<h3>config</h3>
<p>The current configuration of the plugin.</p>
<h2>Methods</h2>
<h3>enter()</h3>
<p>Entering demonstration mode will automatically display the container elements in full screen.</p>
<h3>exit()</h3>
<p>Exit demonstration mode, which can also be exited by pressing the 'Esc' key.</p>
<h3>prev()</h3>
<p>Previous step.</p>
<h3>next()</h3>
<p>Next step.</p>
<h3>jump(index)</h3>
<ul>
<li><code>index</code>：Number，To jump to a certain step, count from 0.</li>
</ul>
<p>Jump to a certain step.</p>

  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>