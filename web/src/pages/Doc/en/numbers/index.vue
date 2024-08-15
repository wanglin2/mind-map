<template>
  <div>
    <h1>Numbers chargeable plugin</h1>
<p>The Numbers plugin provides the function of one click numbering of child nodes of a node, supports multiple numbering forms, and specifies the hierarchy of numbering:</p>
<img src="../../../../assets/img/docs/编号1.jpg" style="width: 400px" />
<img src="../../../../assets/img/docs/编号2.jpg" style="width: 400px" />
<img src="../../../../assets/img/docs/编号3.jpg" style="width: 400px" />
<p>You can experience it in the online version by right clicking on the node and clicking on its numbered child nodes.</p>
<h2>Charge</h2>
<p>At present, the charging method is relatively primitive. By scanning the code and transferring money, please note the plugin you want to purchase and your email address(If you reach the maximum text limit, you can make the payment in two installments), and then the plugin file will be sent to your email. Purchase should be made after full use and consideration. If you are not familiar with front-end development and do not know how to use plugins, please consider purchasing carefully. There will be no refund unless there are special reasons. If you find bugs or have requirements, you can submit relevant issues.</p>
<p>Price: ￥ 29.9, including unpackaged source code and packaged files.</p>
<img src="../../../../assets/img/alipay.jpg" style="width: 300px" />
<img src="../../../../assets/img/wechat.jpg" style="width: 300px" />
<h2>Register</h2>
<p>1.Referencing packaged files:</p>
<pre class="hljs"><code><span class="hljs-keyword">import</span> MindMap <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;simple-mind-map&#x27;</span>
<span class="hljs-keyword">import</span> Numbers <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;numbers.cjs.min.js&#x27;</span>
<span class="hljs-comment">// 或 import Numbers from &#x27;numbers.esm.min.js&#x27;</span>

MindMap.usePlugin(Numbers)
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
<span class="hljs-keyword">import</span> Numbers <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;simple-mind-map-plugin-numbers&#x27;</span>

MindMap.usePlugin(Numbers)
</code></pre>
<p>After registration and instantiation of <code>MindMap</code>, the instance can be obtained through <code>mindMap.numbers</code>.</p>
<h2>Command</h2>
<p>After registering this plugin, the 'SET_NUMBER' command will be added to the mind map instance to set node numbers. Use this command:</p>
<pre class="hljs"><code>mindMap.execCommand(<span class="hljs-string">&#x27;SET_NUMBER&#x27;</span>, appointNodes, number)
</code></pre>
<p>This command can pass two parameters:</p>
<ul>
<li>
<p><code>appointNodes</code>：Assign a number to a specified node instance, which can be passed as a single node instance or as an array of node instances. If an empty array is passed, a tag will be added to the currently activated node;</p>
</li>
<li>
<p><code>number</code>：If the number data to be set is passed as' null ', it means the number will be deleted. Otherwise, please pass an object with the following detailed fields:</p>
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
<td>Number</td>
<td>1</td>
<td>Number format, default is '1', representing ordinary numbers, optional values: 1 (pure number), 2 (number with decimal point, such as: 1.), 3 (number with parentheses, such as: (1)), 4 (lowercase letter, such as: a.), 5 (uppercase letter, such as: A.), 6 (lowercase Roman number, such as: i.), 7 (uppercase Roman number, such as: I.), 8 (Chinese uppercase number, such as: 一、)</td>
</tr>
<tr>
<td>level</td>
<td>Number</td>
<td>1</td>
<td>The child node hierarchy to be numbered, default is level 1, optional values: 1 (level 1), 2 (level 2), 3 (level 3), 0 (all levels)</td>
</tr>
</tbody>
</table>
<p>When calling a command, you can pass only one field, such as '{type: 1}', and the other field will use the previous setting.</p>
<p>示例：</p>
<pre class="hljs"><code>mindMap.execCommand(<span class="hljs-string">&#x27;SET_NUMBER&#x27;</span>, [], {
    <span class="hljs-attr">type</span>: <span class="hljs-number">2</span>,
    <span class="hljs-attr">level</span>: <span class="hljs-number">3</span>
})
</code></pre>
<p>After setting the number, the data will be saved to the node's 'data' under the name 'number'.</p>

  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>