<template>
  <div>
    <h1>Notation chargeable plugin</h1>
<blockquote>
<p>Regarding fees</p>
<p>Mind map is an open-source project under the MIT protocol. In theory, as long as the copyright statement of mind map is retained, there is no charge for commercial use, and this protocol will not be changed in the future. Moreover, neither the online version nor the client will consider charging. However, in order to ensure the sustainable development of the project, revenue will be obtained through various means, such as existing sponsorship methods. The second approach is to use paid plugins, with the basic principle that basic functions, core functions, and necessary functions are not charged, while optional additional functions may be charged.</p>
<p>Finally, the fee is only applicable to developers. If it is only the online version or client version of the mind map, users do not need to pay, and all functions can be used for free.</p>
</blockquote>
<p>Notation is the second paid plugin that provides tagging functionality for individual nodes, allowing for the addition of hand drawn circles, backgrounds, strikethrough lines, and more. It supports animation effects, such as the following:</p>
<img src="../../../../assets/img/docs/标记.jpg" style="width: 900px" />
<p>You can also experience it in the online version by activating the node first, and then clicking the 【notation】 button above to add a notation.</p>
<p>The internal implementation is done through the <a href="https://github.com/rough-stuff/rough-notation">rough-notation</a> library, so if you have the energy, you can also implement this plugin based on this library yourself.</p>
<h2>Charge</h2>
<p>At present, the charging method is relatively primitive. By scanning the code and transferring money, please note the plugin you want to purchase and your email address(If you reach the maximum text limit, you can make the payment in two installments), and then the plugin file will be sent to your email. Purchase should be made after full use and consideration. If you are not familiar with front-end development and do not know how to use plugins, please consider purchasing carefully. There will be no refund unless there are special reasons. If you find bugs or have requirements, you can submit relevant issues.</p>
<p>Price:</p>
<p>1.￥ 19.9, Only includes the packaged files, which are in two formats: .cjs.min.js and .esm.min.js.</p>
<p>2.￥ 29.9, including unpackaged source code and packaged files.</p>
<img src="../../../../assets/img/alipay.jpg" style="width: 300px" />
<img src="../../../../assets/img/wechat.jpg" style="width: 300px" />
<h2>Register</h2>
<p>1.Referencing packaged files:</p>
<pre class="hljs"><code><span class="hljs-keyword">import</span> MindMap <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;simple-mind-map&#x27;</span>
<span class="hljs-keyword">import</span> Notation <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;notation.cjs.min.js&#x27;</span>
<span class="hljs-comment">// 或 import Notation from &#x27;notation.esm.min.js&#x27;</span>

MindMap.usePlugin(Notation)
</code></pre>
<p>2.Referencing Unpackaged Source Code</p>
<p>You can first enter the plugin directory to execute:</p>
<pre class="hljs"><code>npm link
</code></pre>
<p>Then enter your project root directory to execute:</p>
<pre class="hljs"><code>npm link simple-mind-map-plugin-handdrawnlikestyle
</code></pre>
<p>Then you can directly import it for use:</p>
<pre class="hljs"><code><span class="hljs-keyword">import</span> MindMap <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;simple-mind-map&#x27;</span>
<span class="hljs-keyword">import</span> Notation <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;simple-mind-map-plugin-notation&#x27;</span>

MindMap.usePlugin(Notation)
</code></pre>
<p>After registration and instantiation of <code>MindMap</code>, the instance can be obtained through <code>mindMap.notation</code>.</p>
<p>If you are using the mindMap.addPlugin method to dynamically register a component, you will need to call the method for re rendering once:</p>
<pre class="hljs"><code>mindMap.addPlugin(Notation)
mindMap.reRender()
</code></pre>
<h2>Command</h2>
<p>After registering this plugin, the 'SET_NOTATION' command will be added to the mind map instance to set node numbers. Use this command:</p>
<pre class="hljs"><code>mindMap.execCommand(<span class="hljs-string">&#x27;SET_NOTATION&#x27;</span>, appointNodes, show, config)
</code></pre>
<p>This command can pass three parameters:</p>
<ul>
<li>
<p><code>appointNodes</code>：Assign a number to a specified node instance, which can be passed as a single node instance or as an array of node instances. If an empty array is passed, a notation will be added to the currently activated node;</p>
</li>
<li>
<p><code>show</code>：Boolean，Required transmission, whether to display the notation;</p>
</li>
<li>
<p><code>config</code>：Object，Optional, notation configuration, object format, detailed fields of the object are as follows:</p>
</li>
</ul>
<table>
<thead>
<tr>
<th>Field name</th>
<th>Type</th>
<th>Default</th>
<th>Desc</th>
</tr>
</thead>
<tbody>
<tr>
<td>type</td>
<td>String</td>
<td>circle</td>
<td>Tag type, optional values: underline, box, circle, highlight, strike-through, crossed-off</td>
</tr>
<tr>
<td>color</td>
<td>String</td>
<td>'hoverRectColor' configuration in mind map instantiation options</td>
<td>Color</td>
</tr>
<tr>
<td>strokeWidth</td>
<td>Number</td>
<td>1</td>
<td>Line width</td>
</tr>
<tr>
<td>padding</td>
<td>Number</td>
<td>20</td>
<td>Padding</td>
</tr>
<tr>
<td>animate</td>
<td>Boolean</td>
<td>true</td>
<td>Is enable animation</td>
</tr>
</tbody>
</table>
<p>Example:</p>
<pre class="hljs"><code><span class="hljs-comment">// Add a circular marker to the currently activated node</span>
mindMap.execCommand(<span class="hljs-string">&#x27;SET_NOTATION&#x27;</span>, [], <span class="hljs-literal">true</span>, {
    <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;circle&#x27;</span>,
    <span class="hljs-attr">color</span>: <span class="hljs-string">&#x27;red&#x27;</span>
})
</code></pre>
<p>After adding tags, the data will be saved to the node's 'data'under the name 'notation'.</p>

  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>