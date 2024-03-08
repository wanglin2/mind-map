<template>
  <div>
    <h1>TextEdit 实例</h1>
<p>节点文本编辑实例。可以通过<code>mindMap.renderer.textEdit</code>获取到。</p>
<h2>方法</h2>
<h3>isShowTextEdit()</h3>
<p>获取当前文本编辑框是否处于显示状态，也就是是否处在文本编辑状态。</p>
<h3>hideEditTextBox()</h3>
<p>隐藏文本编辑框，会将当前文本编辑框中的内容设置为节点文本。</p>
<h3>registerTmpShortcut()</h3>
<p>注册临时快捷键，也就是可以通过 Enter 键和 Tab 键完成编辑。</p>
<h3>show({ node})</h3>
<ul>
<li><code>node</code>：要进入编辑的节点实例</li>
</ul>
<p>手动开启节点编辑。默认会在节点双击、按 F2 时进入节点编辑。</p>
<h3>getCurrentEditNode()</h3>
<blockquote>
<p>v0.9.8+</p>
</blockquote>
<p>获取当前正在编辑中的节点实例。</p>

  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>