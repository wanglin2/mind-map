<template>
  <div>
    <h1>Numbers 收费插件</h1>
<p>Numbers插件提供一键编号某个节点的子节点的功能，支持多种编号形式，支持编号指定层级：</p>
<img src="../../../../assets/img/docs/编号1.jpg" style="width: 400px" />
<img src="../../../../assets/img/docs/编号2.jpg" style="width: 400px" />
<img src="../../../../assets/img/docs/编号3.jpg" style="width: 400px" />
<p>你可以在在线版中通过在节点上【单击鼠标右键】-【单击编号其子节点】来进行体验。</p>
<h2>收费</h2>
<p>现阶段收费方式比较原始，通过扫码转账备注你要购买的插件，以及你的邮箱地址（如果达到文字上限，那么你可以分两次付款），然后会将插件文件发送到你的邮箱。购买请在充分的使用和考虑后进行，如果你对前端开发不太熟悉，不知道如何使用插件，那么请谨慎考虑购买，没有特殊原因不会退费。如果你发现了 bug，或者有需求，可以提交相关的 issue。</p>
<p>价格：￥ 29.9，包含未打包的源码和打包后的文件。</p>
<img src="../../../../assets/img/alipay.jpg" style="width: 300px" />
<img src="../../../../assets/img/wechat.jpg" style="width: 300px" />
<h2>注册</h2>
<p>1.引用打包后的文件：</p>
<pre class="hljs"><code><span class="hljs-keyword">import</span> MindMap <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;simple-mind-map&#x27;</span>
<span class="hljs-keyword">import</span> Numbers <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;numbers.cjs.min.js&#x27;</span>
<span class="hljs-comment">// 或 import Numbers from &#x27;numbers.esm.min.js&#x27;</span>

MindMap.usePlugin(Numbers)
</code></pre>
<p>2.引用未打包的源码</p>
<p>可以先进入到插件目录执行：</p>
<pre class="hljs"><code>npm link
</code></pre>
<p>然后进入到你的项目根目录执行：</p>
<pre class="hljs"><code>npm link simple-mind-map-plugin-numbers
</code></pre>
<p>然后就可以直接导入进行使用：</p>
<pre class="hljs"><code><span class="hljs-keyword">import</span> MindMap <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;simple-mind-map&#x27;</span>
<span class="hljs-keyword">import</span> Numbers <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;simple-mind-map-plugin-numbers&#x27;</span>

MindMap.usePlugin(Numbers)
</code></pre>
<p>注册完且实例化<code>MindMap</code>后可通过<code>mindMap.numbers</code>获取到该实例。</p>
<h2>命令</h2>
<p>注册了本插件后会在思维导图实例上新增<code>SET_NUMBER</code>命令，给节点设置编号使用该命令：</p>
<pre class="hljs"><code>mindMap.execCommand(<span class="hljs-string">&#x27;SET_NUMBER&#x27;</span>, appointNodes, number)
</code></pre>
<p>该命令可以传递两个参数：</p>
<ul>
<li>
<p><code>appointNodes</code>：给指定的节点实例设置编号，可以传单个节点实例，也可以传递一个节点实例数组，如果传空数组，则会给当前激活的节点添加标记；</p>
</li>
<li>
<p><code>number</code>：要设置的编号数据，如果传<code>null</code>，那么代表删除编号，否则请传递一个对象，对象的详细字段如下：</p>
</li>
</ul>
<table>
<thead>
<tr>
<th>字段名称</th>
<th>类型</th>
<th>默认值</th>
<th>描述</th>
</tr>
</thead>
<tbody>
<tr>
<td>type</td>
<td>Number</td>
<td>1</td>
<td>编号形式，默认为<code>1</code>，代表普通数字，可选值：1（纯数字）、2（数字带小数点，比如：1.）、3（数字带括号，比如：(1)）、4（小写字母，比如：a.）、5（大写字母，比如：A.）、6（小写罗马数字，比如：i.）、7（大写罗马数字，比如：I.）、8（中国大写数字，比如：一、）</td>
</tr>
<tr>
<td>level</td>
<td>Number</td>
<td>1</td>
<td>要编号的子节点层级，默认为1级，可选值：1（1级）、2（2级）、3（3级）、0（所有层级）</td>
</tr>
</tbody>
</table>
<p>调用命令时你可以只传递其中一个字段，比如<code>{ type: 1 }</code>，另一个字段会沿用之前的设置。</p>
<p>示例：</p>
<pre class="hljs"><code>mindMap.execCommand(<span class="hljs-string">&#x27;SET_NUMBER&#x27;</span>, [], {
    <span class="hljs-attr">type</span>: <span class="hljs-number">2</span>,
    <span class="hljs-attr">level</span>: <span class="hljs-number">3</span>
})
</code></pre>
<p>设置编号后数据会以<code>number</code>为名称保存到节点的<code>data</code>数据中。</p>

  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>