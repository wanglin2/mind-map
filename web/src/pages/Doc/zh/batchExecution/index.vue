<template>
  <div>
    <h1>BatchExecution实例</h1>
<p><code>batchExecution</code>用来批量异步的执行一些操作，如果某个操作同时多次调用，那么只会在下一个事件循环里执行一次。可以通过<code>mindMap.batchExecution</code>获取到该实例</p>
<h2>方法</h2>
<h3>push(name, fn)</h3>
<p>添加任务。</p>
<p><code>name</code>：任务名称</p>
<p><code>fn</code>：任务</p>

  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>