<template>
  <div>
    <h1>Render instance</h1>
<p>The <code>render</code> instance is responsible for the entire rendering process and can be
accessed through <code>mindMap.renderer</code>.</p>
<h2>Properties</h2>
<h3>activeNodeList</h3>
<p>Gets the current list of active nodes.</p>
<h3>root</h3>
<p>Gets the root node of the node tree.</p>
<h2>Methods</h2>
<h3>highlightNode(node, range)</h3>
<blockquote>
<p>v0.9.0+</p>
</blockquote>
<ul>
<li>
<p><code>node</code>：Target node instance to highlight</p>
</li>
<li>
<p><code>range</code>：Optional, Array, a range array, [0, 1]</p>
</li>
</ul>
<p>Highlight a node or child node. If the 'range' parameter is not passed, the specified 'node' node is directly highlighted. If the 'range' passes a range of child nodes to be highlighted, the child nodes of that range will be highlighted.</p>
<p>The highlight effect is wrapped by a rectangular box, and the stroke and fill style of the rectangle can be configured through the 'highlightNodeBoxStyle' instantiation option.</p>
<h3>closeHighlightNode()</h3>
<blockquote>
<p>v0.9.0+</p>
</blockquote>
<p>隐藏节点高亮框。</p>
<h3>setRootNodeCenter()</h3>
<blockquote>
<p>v0.8.0+</p>
</blockquote>
<p>Return to the central theme, that is, set the root node to the center of the canvas.</p>
<h3>setData(data)</h3>
<blockquote>
<p>v0.7.3+</p>
</blockquote>
<p>Dynamically set mind map data.</p>
<h3>clearActive()</h3>
<blockquote>
<p>v0.8.0+ abandoned</p>
</blockquote>
<p>Clears the currently active node.</p>
<h3>clearAllActive()</h3>
<blockquote>
<p>v0.8.0+ abandoned</p>
</blockquote>
<p>Clears all currently active nodes and triggers the <code>node_active</code> event.</p>
<h3>clearActiveNode()</h3>
<blockquote>
<p>v0.8.0+</p>
</blockquote>
<p>Clears all currently active nodes and triggers the <code>node_active</code> event.</p>
<h3>clearActiveNodeList()</h3>
<blockquote>
<p>v0.8.0+</p>
</blockquote>
<p>Clears all currently active nodes but not triggers the <code>node_active</code> event.</p>
<h3>startTextEdit()</h3>
<blockquote>
<p>v0.1.6+</p>
</blockquote>
<p>If there is a text editing requirement, this method can be called to
disable the enter key and delete key related shortcuts to prevent conflicts.</p>
<h3>endTextEdit()</h3>
<blockquote>
<p>v0.1.6+</p>
</blockquote>
<p>End text editing, restore enter key and delete key related shortcuts.</p>
<h3>addActiveNode(node)</h3>
<blockquote>
<p>v0.8.0+ abandoned</p>
</blockquote>
<p>Add a node to the active list.</p>
<h3>addNodeToActiveList(node)</h3>
<blockquote>
<p>v0.8.0+</p>
</blockquote>
<p>Add a node to the active list.</p>
<h3>removeActiveNode(node)</h3>
<blockquote>
<p>v0.8.0+ abandoned</p>
</blockquote>
<p>Remove a node from the active list.</p>
<h3>removeNodeFromActiveList(node)</h3>
<blockquote>
<p>v0.8.0+</p>
</blockquote>
<p>Remove a node from the active list.</p>
<h3>findActiveNodeIndex(node)</h3>
<p>Search for the index of a node in the active list.</p>
<h3>getNodeIndex(node)</h3>
<p>Get the position index of a node among its siblings.</p>
<h3>removeOneNode(node)</h3>
<p>Delete a specific node.</p>
<h3>copyNode()</h3>
<p>Copy a node, the active node is the node to be operated on, if there are
multiple active nodes, only the first node will be operated on.</p>
<h3>setNodeDataRender(node, data, notRender)</h3>
<ul>
<li><code>notRender</code>: v0.6.9+, <code>Boolean</code>, Default is <code>false</code>, Do not trigger rendering.</li>
</ul>
<p>Set node <code>data</code>, i.e. the data in the data field, and will determine whether the
node needs to be re-rendered based on whether the node size has changed, <code>data</code>
is an object, e.g. <code>{text: 'I am new text'}</code>.</p>
<h3>moveNodeTo(node, toNode)</h3>
<blockquote>
<p>v0.1.5+</p>
</blockquote>
<p>Move a node as a child of another node.</p>
<h3>insertBefore(node, exist)</h3>
<blockquote>
<p>v0.1.5+</p>
</blockquote>
<p>Move a node in front of another node.</p>
<h3>insertAfter(node, exist)</h3>
<blockquote>
<p>v0.1.5+</p>
</blockquote>
<p>Move a node behind another node.</p>
<h3>moveNodeToCenter(node)</h3>
<blockquote>
<p>v0.2.17+</p>
</blockquote>
<p>Move a node to the center of the canvas.</p>
<p>Currently, if there is zoom, returning to the center will reset the zoom.</p>
<h3>expandToNodeUid(uid, callback)</h3>
<blockquote>
<p>v0.6.7+</p>
</blockquote>
<ul>
<li>
<p><code>uid</code>: uid of node</p>
</li>
<li>
<p><code>callback</code>: Expand completed callback function</p>
</li>
</ul>
<p>Expand to the node of the specified uid.</p>
<h3>findNodeByUid(uid)</h3>
<blockquote>
<p>v0.6.7+</p>
</blockquote>
<ul>
<li><code>uid</code>: uid of node</li>
</ul>
<p>Find the corresponding node instance based on the uid.</p>
<h3>copy()</h3>
<blockquote>
<p>v0.6.8+</p>
</blockquote>
<p>Copy nodes. After calling this method, the current activated node data will be stored. Multiple activated nodes will only operate on the first node, and subsequent calls to the 'paste()' method can be pasted.</p>
<h3>cut()</h3>
<blockquote>
<p>v0.6.8+</p>
</blockquote>
<p>Cut a node. After calling this method, the currently active node will be cut and the node data will be stored. Multiple nodes will only operate on the first node, and subsequent calls to the 'paste()' method can be pasted.</p>
<h3>paste()</h3>
<blockquote>
<p>v0.6.8+</p>
</blockquote>
<p>Pasting nodes can be done by calling the 'copy()' or 'cut()' method after calling it. This method does not support pasting data from the user's clipboard. Please use the built-in 'Ctrl+v' shortcut key.</p>

  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>