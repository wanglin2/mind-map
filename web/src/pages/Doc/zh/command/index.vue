<template>
  <div>
    <h1>Command 实例</h1>
<p><code>command</code>实例负责命令的添加及执行，内置了很多命令，也可以自行添加，命令指需要在历史堆栈数据里添加副本的操作。可通过<code>mindMap.command</code>获取到该实例</p>
<h2>属性</h2>
<h3>history</h3>
<p>当前所有的历史数据列表。不要手动修改该数组。</p>
<h3>activeHistoryIndex</h3>
<p>当前所在的历史数据索引。不要手动修改该属性。</p>
<h2>方法</h2>
<p>前进后退请使用命令<code>BACK</code>或<code>FORWARD</code>。</p>
<h3>pause()</h3>
<blockquote>
<p>v0.9.11+</p>
</blockquote>
<p>暂停收集历史数据。</p>
<h3>recovery()</h3>
<blockquote>
<p>v0.9.11+</p>
</blockquote>
<p>恢复收集历史数据。</p>
<h3>add(name, fn)</h3>
<p>添加命令。</p>
<p><code>name</code>：命令名称</p>
<p><code>fn</code>：命令要执行的方法</p>
<h3>remove(name, fn)</h3>
<p>移除命令。</p>
<p><code>name</code>：要移除的命令名称</p>
<p><code>fn</code>：要移除的方法，不传的话移除该命令所有的方法</p>
<h3>getCopyData()</h3>
<p>获取渲染树数据副本。即当前画布的数据。</p>
<h3>clearHistory()</h3>
<p>清空历史堆栈数据</p>

  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>