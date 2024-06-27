<template>
  <div>
    <h1>command instance</h1>
<p>The <code>command</code> instance is responsible for adding and executing commands. It
includes many built-in commands and can also be added manually. A command refers
to an operation that needs to add a copy to the history stack data. The
<code>mindMap.command</code> instance can be obtained through this.&quot;</p>
<h2>Props</h2>
<h3>history</h3>
<p>The current list of all historical data. Do not manually modify the array.</p>
<h3>activeHistoryIndex</h3>
<p>The current historical data index. Do not manually modify this property.</p>
<h2>Methods</h2>
<p>Please use the command 'Back' or 'FORWARD' to move forward or backward.</p>
<h3>pause()</h3>
<blockquote>
<p>v0.9.11+</p>
</blockquote>
<p>Pause collecting historical data.</p>
<h3>recovery()</h3>
<blockquote>
<p>v0.9.11+</p>
</blockquote>
<p>Restore the collection of historical data.</p>
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
<p>Get a copy of the rendering tree data. That is, the data of the current canvas.</p>
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