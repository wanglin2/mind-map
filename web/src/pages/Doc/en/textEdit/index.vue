<template>
  <div>
    <h1>TextEdit instance</h1>
<p>Node text editing instance. It can be obtained through <code>mindMap.renderer.textEdit</code>.</p>
<h2>Methods</h2>
<h3>isShowTextEdit()</h3>
<p>Get whether the current text editing box is in a display state, that is, whether it is in a text editing state.</p>
<h3>hideEditTextBox()</h3>
<p>Hiding the text editing box will set the content of the current text editing box as node text.</p>
<h3>registerTmpShortcut()</h3>
<p>Register temporary shortcut keys, which means editing can be completed through the Enter and Tab keys.</p>
<h3>show({ node})</h3>
<ul>
<li><code>node</code>：Node instance to enter for editing</li>
</ul>
<p>Manually enable node editing. By default, it will enter node editing when double clicking or pressing F2 on the node.</p>
<h3>getCurrentEditNode()</h3>
<blockquote>
<p>v0.9.8+</p>
</blockquote>
<p>Get the node instance currently being edited.</p>

  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>