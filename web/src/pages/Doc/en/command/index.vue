<template>
  <div>
    <h1>command instance</h1>
<p>The <code>command</code> instance is responsible for adding and executing commands. It
includes many built-in commands and can also be added manually. A command refers
to an operation that needs to add a copy to the history stack data. The
<code>mindMap.command</code> instance can be obtained through this.&quot;</p>
<h2>Methods</h2>
<h3>add(name, fn)</h3>
<p>Add a command.</p>
<p><code>name</code>: Command name</p>
<p><code>fn</code>: Method to be executed by the command</p>
<h3>remove(name, fn)</h3>
<p>Remove a command.</p>
<p><code>name</code>: Name of the command to be removed</p>
<p><code>fn</code>: Method to be removed, if not provided all methods for the command will be
removed</p>
<h3>getCopyData()</h3>
<p>Get a copy of the rendering tree data</p>
<h3>clearHistory()</h3>
<p>Clear the history stack data</p>

  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>