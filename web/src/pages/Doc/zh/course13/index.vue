<template>
  <div>
    <h1>快捷键</h1>
<p><code>simple-mind-map</code>常用操作都支持快捷键方式使用，目前所有的快捷键列表如下：</p>
<pre class="hljs"><code>[
  {
    <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;节点操作&#x27;</span>,
    <span class="hljs-attr">list</span>: [
      {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;插入下级节点&#x27;</span>,
        <span class="hljs-attr">value</span>: <span class="hljs-string">&#x27;Tab&#x27;</span>
      },
      {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;插入同级节点&#x27;</span>,
        <span class="hljs-attr">value</span>: <span class="hljs-string">&#x27;Enter&#x27;</span>
      },
      {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;上移节点&#x27;</span>,
        <span class="hljs-attr">value</span>: <span class="hljs-string">&#x27;Ctrl + ↑&#x27;</span>
      },
      {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;下移节点&#x27;</span>,
        <span class="hljs-attr">value</span>: <span class="hljs-string">&#x27;Ctrl + ↓&#x27;</span>
      },
      {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;插入概要&#x27;</span>,
        <span class="hljs-attr">value</span>: <span class="hljs-string">&#x27;Ctrl + S&#x27;</span><span class="hljs-comment">// v0.6.8+改为Ctrl + G</span>
      },
      {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;展开/收起节点&#x27;</span>,
        <span class="hljs-attr">value</span>: <span class="hljs-string">&#x27;/&#x27;</span>
      },
      {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;删除节点&#x27;</span>,
        <span class="hljs-attr">value</span>: <span class="hljs-string">&#x27;Delete | Backspace&#x27;</span>
      },
      {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;复制节点&#x27;</span>,
        <span class="hljs-attr">value</span>: <span class="hljs-string">&#x27;Ctrl + C&#x27;</span>
      },
      {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;剪切节点&#x27;</span>,
        <span class="hljs-attr">value</span>: <span class="hljs-string">&#x27;Ctrl + X&#x27;</span>
      },
      {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;粘贴节点&#x27;</span>,
        <span class="hljs-attr">value</span>: <span class="hljs-string">&#x27;Ctrl + V&#x27;</span>
      },
      {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;编辑节点&#x27;</span>,
        <span class="hljs-attr">value</span>: <span class="hljs-string">&#x27;F2&#x27;</span>
      },
      {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;文本换行&#x27;</span>,
        <span class="hljs-attr">value</span>: <span class="hljs-string">&#x27;Shift + Enter&#x27;</span>
      },
      {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;回退&#x27;</span>,
        <span class="hljs-attr">value</span>: <span class="hljs-string">&#x27;Ctrl + Z&#x27;</span>
      },
      {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;前进&#x27;</span>,
        <span class="hljs-attr">value</span>: <span class="hljs-string">&#x27;Ctrl + Y&#x27;</span>
      },
      {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;全选&#x27;</span>,
        <span class="hljs-attr">value</span>: <span class="hljs-string">&#x27;Ctrl + A&#x27;</span>
      },
      {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;多选&#x27;</span>,
        <span class="hljs-attr">value</span>: <span class="hljs-string">&#x27;右键 / Ctrl + 左键&#x27;</span>
      },
      {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;一键整理布局&#x27;</span>,
        <span class="hljs-attr">value</span>: <span class="hljs-string">&#x27;Ctrl + L&#x27;</span>
      }
    ]
  },
  {
    <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;画布操作&#x27;</span>,
    <span class="hljs-attr">list</span>: [
      {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;放大&#x27;</span>,
        <span class="hljs-attr">value</span>: <span class="hljs-string">&#x27;Ctrl + +&#x27;</span>
      },
      {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;缩小&#x27;</span>,
        <span class="hljs-attr">value</span>: <span class="hljs-string">&#x27;Ctrl + -&#x27;</span>
      },
      {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;恢复默认&#x27;</span>,
        <span class="hljs-attr">value</span>: <span class="hljs-string">&#x27;Ctrl + Enter&#x27;</span>
      }
    ]
  }
]
</code></pre>
<p>默认当鼠标滑入画布范围内才会响应快捷键操作，如果你想去掉这个限制可以在实例化<code>simple-mind-map</code>时通过选项指定：</p>
<pre class="hljs"><code><span class="hljs-keyword">new</span> MindMap({
    <span class="hljs-comment">// ...</span>
    <span class="hljs-attr">enableShortcutOnlyWhenMouseInSvg</span>: <span class="hljs-literal">false</span>
})
</code></pre>
<p>你也可以添加新的快捷键：</p>
<pre class="hljs"><code>mindMap.keyCommand.addShortcut(<span class="hljs-string">&#x27;key&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-comment">// 执行一些操作</span>
})
</code></pre>
<p><code>key</code>支持三种方式：</p>
<pre class="hljs"><code>Enter           // 单个按键
Tab | Insert    // 或
Shift + a       // 与
</code></pre>
<p>要获取所有的按键值对应的名称，可以：</p>
<pre class="hljs"><code><span class="hljs-keyword">import</span> { keyMap } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;simple-mind-map/src/utils/keyMap&#x27;</span>
</code></pre>
<p>可以添加当然也可以移除，详细文档可以参考<a href="https://wanglin2.github.io/mind-map/#/doc/zh/keyCommand">keyCommand</a>。</p>

  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>