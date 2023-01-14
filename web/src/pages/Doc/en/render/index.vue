<template>
  <div>
    <h1>Render instance</h1>
<p>The <code>render</code> instance is responsible for the entire rendering process and can be
accessed through <code>mindMap.renderer</code>.</p>
<h2>Properties</h2>
<h3>activeNodeList</h3>
<p>Gets the current list of active nodes</p>
<h3>root</h3>
<p>Gets the root node of the node tree</p>
<h2>Methods</h2>
<h3>clearActive()</h3>
<p>Clears the currently active node</p>
<h3>clearAllActive()</h3>
<p>Clears all currently active nodes and triggers the <code>node_active</code> event</p>
<h3>startTextEdit()</h3>
<blockquote>
<p>v0.1.6+</p>
</blockquote>
<p>If there is a text editing requirement, this method can be called to
disable the enter key and delete key related shortcuts to prevent conflicts</p>
<h3>endTextEdit()</h3>
<blockquote>
<p>v0.1.6+</p>
</blockquote>
<p>End text editing, restore enter key and delete key related shortcuts</p>
<h3>addActiveNode(node)</h3>
<p>Add a node to the active list</p>
<h3>removeActiveNode(node)</h3>
<p>Remove a node from the active list</p>
<h3>findActiveNodeIndex(node)</h3>
<p>Search for the index of a node in the active list</p>
<h3>getNodeIndex(node)</h3>
<p>Get the position index of a node among its siblings</p>
<h3>removeOneNode(node)</h3>
<p>Delete a specific node</p>
<h3>copyNode()</h3>
<p>Copy a node, the active node is the node to be operated on, if there are
multiple active nodes, only the first node will be operated on</p>
<h3>setNodeDataRender(node, data)</h3>
<p>Set node <code>data</code>, i.e. the data in the data field, and will determine whether the
node needs to be re-rendered based on whether the node size has changed, <code>data</code>
is an object, e.g. <code>{text: 'I am new text'}</code></p>
<h3>moveNodeTo(node, toNode)</h3>
<blockquote>
<p>v0.1.5+</p>
</blockquote>
<p>Move a node as a child of another node</p>
<h3>insertBefore(node, exist)</h3>
<blockquote>
<p>v0.1.5+</p>
</blockquote>
<p>Move a node in front of another node</p>
<h3>insertAfter(node, exist)</h3>
<blockquote>
<p>v0.1.5+</p>
</blockquote>
<p>Move a node behind another node</p>
<h3>moveNodeToCenter(node)</h3>
<blockquote>
<p>v0.2.17+</p>
</blockquote>
<p>Move a node to the center of the canvas.</p>
<p>Currently, if there is zoom, returning to the center will reset the zoom.</p>

  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>