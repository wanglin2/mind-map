<template>
  <div>
    <h1>Command实例</h1>
<p><code>command</code>实例负责命令的添加及执行，内置了很多命令，也可以自行添加，命令指需要在历史堆栈数据里添加副本的操作。可通过<code>mindMap.command</code>获取到该实例</p>
<h2>方法</h2>
<h3>add(name, fn)</h3>
<p>添加命令。</p>
<p><code>name</code>：命令名称</p>
<p><code>fn</code>：命令要执行的方法</p>
<h3>remove(name, fn)</h3>
<p>移除命令。</p>
<p><code>name</code>：要移除的命令名称</p>
<p><code>fn</code>：要移除的方法，不传的话移除该命令所有的方法</p>
<h3>getCopyData()</h3>
<p>获取渲染树数据副本</p>
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