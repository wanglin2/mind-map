<template>
  <div>
    <h1>AssociativeLine 插件</h1>
<blockquote>
<p>v0.4.5+</p>
</blockquote>
<blockquote>
<p>调整关联线控制点的功能从v0.4.6+开始支持</p>
</blockquote>
<blockquote>
<p>关联性支持文本编辑从v0.5.11+开始支持</p>
</blockquote>
<p>该插件用于支持添加关联线。</p>
<h2>注册</h2>
<pre class="hljs"><code><span class="hljs-keyword">import</span> MindMap <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;simple-mind-map&#x27;</span>
<span class="hljs-keyword">import</span> AssociativeLine <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;simple-mind-map/src/plugins/AssociativeLine.js&#x27;</span>
<span class="hljs-comment">// import AssociativeLine from &#x27;simple-mind-map/src/AssociativeLine.js&#x27; v0.6.0以下版本使用该路径</span>

MindMap.usePlugin(AssociativeLine)
</code></pre>
<p>注册完且实例化<code>MindMap</code>后可通过<code>mindMap.associativeLine</code>获取到该实例。</p>
<h2>配置</h2>
<p>支持修改关联线的粗细和颜色，分为默认状态和激活状态。配置如下：</p>
<ul>
<li>
<p><code>associativeLineWidth</code>：关联线默认状态的粗细，默认值为<code>2</code></p>
</li>
<li>
<p><code>associativeLineColor</code>：关联线默认状态的颜色，默认值为<code>rgb(51, 51, 51)</code></p>
</li>
<li>
<p><code>associativeLineActiveWidth</code>：关联线激活状态的粗细，默认值为<code>8</code></p>
</li>
<li>
<p><code>associativeLineActiveColor</code>：关联线激活状态的颜色，默认值为<code>rgba(2, 167, 240, 1)</code></p>
</li>
</ul>
<p>配置以主题的方式提供，所以如果想要修改这四个属性，可以通过<code>mindMap.setThemeConfig(config)</code>方法进行修改。</p>
<h2>属性</h2>
<h3>mindMap.associativeLine.lineList</h3>
<p>当前所有连接线数据，数组类型，数组的每一项也是一个数组：</p>
<pre class="hljs"><code>[
    path, <span class="hljs-comment">// 连接线节点</span>
    clickPath, <span class="hljs-comment">// 不可见的点击线节点</span>
    node, <span class="hljs-comment">// 起始节点</span>
    toNode <span class="hljs-comment">// 目标节点</span>
]
</code></pre>
<h3>mindMap.associativeLine.activeLine</h3>
<p>当前激活的连接线，数组类型，同<code>lineList</code>数组的每一项的结构。</p>
<h2>方法</h2>
<h3>renderAllLines()</h3>
<p>重新渲染所有关联线。</p>
<h3>removeAllLines()</h3>
<p>移除所有关联线。</p>
<h3>createLineFromActiveNode()</h3>
<p>从当前激活节点开始创建关联线，如果有多个激活节点，默认为第一个节点。</p>
<p>调用该方法后，会从第一个激活节点到当前鼠标实时位置渲染一条关联线，当点击某个目标节点后则代表创建完成，会在第一个激活节点和点击节点之间渲染一条关联线。</p>
<h3>createLine(fromNode)</h3>
<p>从指定节点开始创建关联线。</p>
<p>调用该方法后，会从指定节点到当前鼠标实时位置渲染一条关联线，当点击某个目标节点后则代表创建完成，会在指定节点和点击节点之间渲染一条关联线。</p>
<h3>addLine(fromNode, toNode)</h3>
<p>直接添加一条关联线。</p>
<p>调用该方法，会直接创建一条从<code>fromNode</code>到<code>toNode</code>节点的关联线。</p>
<h3>removeLine()</h3>
<p>删除当前激活的关联线。点击某条关联线则视为激活。</p>
<h3>clearActiveLine()</h3>
<p>清除当前激活的关联线的激活状态。</p>
<h3>front()</h3>
<blockquote>
<p>v0.8.0+</p>
</blockquote>
<p>关联线顶层显示。</p>
<h3>back()</h3>
<blockquote>
<p>v0.8.0+</p>
</blockquote>
<p>关联线回到原有层级。</p>

  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>