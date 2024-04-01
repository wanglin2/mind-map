<template>
  <div>
    <h1>快捷键操作如何传递自定义参数</h1>
<p>库提供了很多命令，比如插入子节点的<code>INSERT_CHILD_NODE</code>等，这些命令大多可以接收一定参数，比如在插入节点时我想指定初始文本和节点uid，那么可以这样调用：</p>
<pre class="hljs"><code>mindMap.execCommand(<span class="hljs-string">&#x27;INSERT_CHILD_NODE&#x27;</span>, <span class="hljs-literal">true</span>, [], {
    <span class="hljs-attr">text</span>: <span class="hljs-string">&#x27;初始文本&#x27;</span>,
    <span class="hljs-attr">uid</span>: <span class="hljs-string">&#x27;xxx&#x27;</span>
})
</code></pre>
<p>但是同时库内部也默认注册了很多快捷键，比如插入下级节点的<code>Tab</code>快捷键，很遗憾，目前快捷键操作无法让你传入自定义的参数，那么该怎么办呢，可以这样处理，首先确定你要给什么快捷键传入参数，比如<code>Tab</code>，那么首先可以调用如下方法删除库默认注册的快捷键：</p>
<pre class="hljs"><code><span class="hljs-keyword">const</span> keyName = <span class="hljs-string">&#x27;Tab&#x27;</span>
mindMap.keyCommand.removeShortcut(keyName)
</code></pre>
<p>然后再重新注册即可：</p>
<pre class="hljs"><code>mindMap.keyCommand.addShortcut(keyName, <span class="hljs-function">() =&gt;</span> {
    mindMap.execCommand(<span class="hljs-string">&#x27;INSERT_CHILD_NODE&#x27;</span>, <span class="hljs-literal">true</span>, [], {
        <span class="hljs-attr">text</span>: <span class="hljs-string">&#x27;初始文本&#x27;</span>,
        <span class="hljs-attr">uid</span>: <span class="hljs-string">&#x27;xxx&#x27;</span>
    })
})
</code></pre>
<p>库内部默认注册的快捷键对应的命令一览：</p>
<table>
<thead>
<tr>
<th>快捷键</th>
<th>命令</th>
</tr>
</thead>
<tbody>
<tr>
<td>Control+z</td>
<td>BACK</td>
</tr>
<tr>
<td>Control+y</td>
<td>FORWARD</td>
</tr>
<tr>
<td>Tab</td>
<td>INSERT_CHILD_NODE</td>
</tr>
<tr>
<td>Insert</td>
<td>INSERT_CHILD_NODE</td>
</tr>
<tr>
<td>Enter</td>
<td>INSERT_NODE</td>
</tr>
<tr>
<td>Shift+Tab</td>
<td>INSERT_PARENT_NODE</td>
</tr>
<tr>
<td>Control+g</td>
<td>ADD_GENERALIZATION</td>
</tr>
<tr>
<td>Del或Backspace</td>
<td>REMOVE_NODE</td>
</tr>
<tr>
<td>Shift+Backspace</td>
<td>REMOVE_CURRENT_NODE</td>
</tr>
<tr>
<td>Control+a</td>
<td>SELECT_ALL</td>
</tr>
<tr>
<td>Control+l</td>
<td>RESET_LAYOUT</td>
</tr>
<tr>
<td>Control+Up</td>
<td>UP_NODE</td>
</tr>
<tr>
<td>Control+Down</td>
<td>DOWN_NODE</td>
</tr>
</tbody>
</table>

  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>