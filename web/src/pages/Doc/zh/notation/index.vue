<template>
  <div>
    <h1>Notation 收费插件</h1>
<blockquote>
<p>关于收费</p>
<p>mind-map 是一个 MIT 协议的开源项目，理论上只要保留 mind-map 的版权声明，无论是否商用都不收费，这个协议以后也不会改变。另外无论是在线版，还是客户端都不会考虑收费。但是为了项目的可持续发展，会通过一些方式来获取收益，比如现有的赞助方式。而收费插件是第二个方式，基本原则是基本功能、核心功能、必要功能不收费，而可有可无的附加功能可能会做成收费的。</p>
<p>最后，收费仅针对开发者，如果仅是在线版或者客户端的思维导图用户是无需付费的，所有功能均可免费使用。</p>
</blockquote>
<p>Notation 是第二个收费插件，功能是提供单个节点的标记功能，也就是可以在单个节点上加个手绘风格的圈、背景、删除线等等，支持动画效果，就像下面这样：</p>
<img src="../../../../assets/img/docs/标记.jpg" style="width: 900px" />
<p>你也可以在在线版中进行体验，先激活节点，然后点击上方【标记】按钮添加标记。</p>
<p>内部实现是通过<a href="https://github.com/rough-stuff/rough-notation">rough-notation</a>库，所以如果你有精力，也可以自己基于这个库来实现这个插件。</p>
<h2>收费</h2>
<p>现阶段收费方式比较原始，通过扫码转账备注你要购买的插件，以及你的邮箱地址，然后会将插件文件发送到你的邮箱。购买请在充分的使用和考虑后进行，如果你对前端开发不太熟悉，不知道如何使用插件，那么请谨慎考虑购买，没有特殊原因不会退费。如果你发现了 bug，或者有需求，可以提交相关的 issue。</p>
<p>价格：</p>
<p>1.￥ 19.9，仅包含打包后的文件，即.cjs.min.js、.esm.min.js 两种格式的文件。</p>
<p>2.￥ 29.9，包含未打包的源码和打包后的文件。</p>
<img src="../../../../assets/img/alipay.jpg" style="width: 300px" />
<img src="../../../../assets/img/wechat.jpg" style="width: 300px" />
<h2>注册</h2>
<p>1.引用打包后的文件：</p>
<pre class="hljs"><code><span class="hljs-keyword">import</span> MindMap <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;simple-mind-map&#x27;</span>
<span class="hljs-keyword">import</span> Notation <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;notation.cjs.min.js&#x27;</span>
<span class="hljs-comment">// 或 import Notation from &#x27;notation.esm.min.js&#x27;</span>

MindMap.usePlugin(Notation)
</code></pre>
<p>2.引用未打包的源码</p>
<p>可以先进入到插件目录执行：</p>
<pre class="hljs"><code>npm link
</code></pre>
<p>然后进入到你的项目根目录执行：</p>
<pre class="hljs"><code>npm link simple-mind-map-plugin-notation
</code></pre>
<p>然后就可以直接导入进行使用：</p>
<pre class="hljs"><code><span class="hljs-keyword">import</span> MindMap <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;simple-mind-map&#x27;</span>
<span class="hljs-keyword">import</span> Notation <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;simple-mind-map-plugin-notation&#x27;</span>

MindMap.usePlugin(Notation)
</code></pre>
<p>注册完且实例化<code>MindMap</code>后可通过<code>mindMap.notation</code>获取到该实例。</p>
<p>注册该插件后，无需执行其他方法，手绘风格即可生效。</p>
<p>如果你是使用 mindMap.addPlugin 方法来动态注册的组件，那么需要调用一次重新渲染的方法：</p>
<pre class="hljs"><code>mindMap.addPlugin(Notation)
mindMap.reRender()
</code></pre>
<h2>命令</h2>
<p>注册了本插件后会在思维导图实例上新增<code>SET_NOTATION</code>命令，给节点添加标记使用该命令：</p>
<pre class="hljs"><code>mindMap.execCommand(<span class="hljs-string">&#x27;SET_NOTATION&#x27;</span>, appointNodes, show, config)
</code></pre>
<p>该命令可以传递三个参数：</p>
<ul>
<li>
<p><code>appointNodes</code>：给指定的节点实例添加标记，可以传单个节点实例，也可以传递一个节点实例数组，如果传空数组，则会给当前激活的节点添加标记；</p>
</li>
<li>
<p><code>show</code>：Boolean，必传，是否显示编辑；</p>
</li>
<li>
<p><code>config</code>：Object，可选，标记配置，对象格式，对象的详细字段如下：</p>
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
<td>String</td>
<td>circle</td>
<td>标记类型，可选值：underline（下划线）、box（边框）、circle（圆）、highlight（高亮）、strike-through（删除线）、crossed-off（叉）</td>
</tr>
<tr>
<td>color</td>
<td>String</td>
<td>思维导图实例化选项中的hoverRectColor配置</td>
<td>颜色</td>
</tr>
<tr>
<td>strokeWidth</td>
<td>Number</td>
<td>1</td>
<td>线宽</td>
</tr>
<tr>
<td>padding</td>
<td>Number</td>
<td>20</td>
<td>内边距</td>
</tr>
<tr>
<td>animate</td>
<td>Boolean</td>
<td>true</td>
<td>是否开启动画</td>
</tr>
</tbody>
</table>
<p>示例：</p>
<pre class="hljs"><code><span class="hljs-comment">// 给当前激活的节点添加一个圆类型的标记</span>
mindMap.execCommand(<span class="hljs-string">&#x27;SET_NOTATION&#x27;</span>, [], <span class="hljs-literal">true</span>, {
    <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;circle&#x27;</span>,
    <span class="hljs-attr">color</span>: <span class="hljs-string">&#x27;red&#x27;</span>
})
</code></pre>
<p>添加标记后数据会以<code>notation</code>为名称保存到节点的<code>data</code>数据中。</p>

  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>