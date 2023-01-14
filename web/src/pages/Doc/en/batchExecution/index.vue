<template>
  <div>
    <h1>batchExecution instance</h1>
<p>The <code>batchExecution</code> is used to batch asynchronously perform some operations,
and if a certain operation is called multiple times at the same time, it will
only be executed once in the next event loop. Can be obtained through
<code>mindMap.batchExecution</code></p>
<h2>Method</h2>
<h3>push(name, fn)</h3>
<p>Add task.</p>
<p><code>name</code>: task name</p>
<p><code>fn</code>: task</p>

  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>