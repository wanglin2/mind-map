<template>
  <div>
    <h1>Node instance</h1>
<p>Each node will instantiate a <code>node</code> instance</p>
<h2>Property</h2>
<h3>nodeData</h3>
<p>The real data corresponding to this node</p>
<h3>uid</h3>
<p>The unique identifier of this node</p>
<h3>isRoot</h3>
<p>Whether it is the root node</p>
<h3>layerIndex</h3>
<p>Node level</p>
<h3>width</h3>
<p>Width of the node</p>
<h3>height</h3>
<p>Height of the node</p>
<h3>left</h3>
<p><code>left</code> position of the node</p>
<h3>top</h3>
<p><code>top</code> position of the node</p>
<h3>parent</h3>
<p>Parent node of the node</p>
<h3>children</h3>
<p>List of child nodes of the node</p>
<h3>group</h3>
<p>Node is the content container, <code>svg</code> object</p>
<h3>isDrag</h3>
<blockquote>
<p>v0.1.5+</p>
</blockquote>
<p>Whether the node is currently being dragged</p>
<h2>Methods</h2>
<h3>setGeneralizationOpacity(val)</h3>
<blockquote>
<p>v0.9.0+</p>
</blockquote>
<ul>
<li><code>val</code>：Number, 0-1，Opacity</li>
</ul>
<p>Set the transparency of summary nodes and curves.</p>
<h3>formatGetGeneralization()</h3>
<blockquote>
<p>v0.9.0+</p>
</blockquote>
<p>Obtain node summary data.</p>
<h3>getIndexInBrothers()</h3>
<blockquote>
<p>v0.9.0+</p>
</blockquote>
<p>Gets the index of the node in the sibling node list.</p>
<h3>getRectInSvg()</h3>
<blockquote>
<p>v0.9.0+</p>
</blockquote>
<p>Obtain the size and position information of the node. The width and height are the actual width and height after applying the scaling effect, and the position information is relative to the canvas.</p>
<h3>getRect()</h3>
<blockquote>
<p>v0.8.1+</p>
</blockquote>
<p>Obtain the size and position information of the node. The width and height are the actual width and height after applying the scaling effect, and the position is relative to the upper left corner of the browser window.</p>
<h3>ancestorHasGeneralization()</h3>
<blockquote>
<p>v0.8.1+</p>
</blockquote>
<p>Check if there are ancestor nodes with a summary.</p>
<h3>getNoteContentPosition()</h3>
<blockquote>
<p>v0.8.1+</p>
</blockquote>
<p>Obtain the display position of node comments. When a node has comments and is displaying a state, dragging or zooming will cause the comment floating layer to detach from the node. This method can be used to obtain a new position and update the comment floating layer.</p>
<h3>updateNodeByActive(active)</h3>
<blockquote>
<p>v0.8.0+</p>
</blockquote>
<ul>
<li><code>active</code>：Boolean, active status.</li>
</ul>
<p>Update nodes based on whether they are activated or not. The main task is to update the display and hiding of the expand and collapse buttons for nodes.</p>
<h3>setOpacity(val)</h3>
<blockquote>
<p>v0.7.2+</p>
</blockquote>
<ul>
<li><code>val</code>: Opacity value，0-1</li>
</ul>
<p>Set node transparency, including connecting lines and child nodes.</p>
<h3>hideChildren()</h3>
<blockquote>
<p>v0.7.2+</p>
</blockquote>
<p>Hide subordinate nodes.</p>
<h3>showChildren()</h3>
<blockquote>
<p>v0.7.2+</p>
</blockquote>
<p>Display subordinate nodes.</p>
<h3>hasCustomStyle()</h3>
<blockquote>
<p>v0.6.2+</p>
</blockquote>
<p>Gets whether a custom style has been set.</p>
<h3>getSize()</h3>
<p>Update the width and height of the node by recreating the node content, and return a Boolean value indicating whether the width and height have changed</p>
<h3>render()</h3>
<p>Recursively render this node and all its child nodes</p>
<h3>updateNodeShape()</h3>
<blockquote>
<p>v0.5.0+</p>
</blockquote>
<p>Update node shape nodes. For example, when the node status changes, call this method to display or deactivate the style.</p>
<h3>remove()</h3>
<p>Recursive deletion, which is only deleted from the canvas. The node container is still present, and can be reinserted back into the canvas in the future</p>
<h3>destroy()</h3>
<blockquote>
<p>v0.5.0+</p>
</blockquote>
<p>Destroying a node will not only delete it from the canvas, but also directly empty the original node, which cannot be inserted back into the canvas in the future</p>
<h3>renderLine()</h3>
<p>Re-render the line from this node to its child nodes</p>
<h3>removeLine()</h3>
<p>Remove the line from this node to its child nodes</p>
<h3>renderExpandBtn()</h3>
<p>Render the content of the expand/collapse button</p>
<h3>removeExpandBtn()</h3>
<p>Remove the expand/collapse button</p>
<h3>getStyle(prop, root, isActive)</h3>
<p>Get the final style value applied to this node</p>
<p><code>prop</code>: the style property to get</p>
<p><code>root</code>: whether it is the root node, default <code>false</code></p>
<p><code>isActive</code>: v0.7.0+has been abandoned, whether the value being fetched is the active state style value,
default <code>false</code></p>
<h3>setStyle(prop, value, isActive)</h3>
<ul>
<li><code>isActive</code>: v0.7.0+has been abandoned</li>
</ul>
<p>Modify a style of the node, a shortcut method for the <code>SET_NODE_STYLE</code> command</p>
<h3>setStyles(style, isActive)</h3>
<blockquote>
<p>v0.6.12+</p>
</blockquote>
<ul>
<li><code>isActive</code>: v0.7.0+has been abandoned</li>
</ul>
<p>Modify multiple styles of nodes, a shortcut method for the <code>SET_NODE_STYLES</code> command</p>
<h3>getData(key)</h3>
<p>Get the specified value in the <code>data</code> object of the node's real data <code>nodeData</code>,
if <code>key</code> is not passed, return the <code>data</code> object</p>
<h3>setData(data)</h3>
<p>Set the value of the specified key in the data object of the node's real data
nodeData, <code>SET_NODE_DATA</code> command's shortcut method</p>
<h3>setText(text, richText)</h3>
<ul>
<li>
<p><code>richText</code>: v0.4.2+，<code>Boolean</code>, If you want to set rich text content, that is, <code>html</code> character, <code>richText</code> needs to be passed <code>true</code></p>
</li>
<li>
<p><code>resetRichText</code>: v0.6.10+, <code>Boolean</code>, whether to reset rich text, The default is 'false'. If 'true' is passed, the style of the rich text node will be reset</p>
</li>
</ul>
<p>Setting the node text, a shortcut for the <code>SET_NODE_TEXT</code> command</p>
<h3>setImage(imgData)</h3>
<p>Setting the node image, a shortcut for the <code>SET_NODE_IMAGE</code> command</p>
<h3>setIcon(icons)</h3>
<p>Setting the node icon, a shortcut for the <code>SET_NODE_ICON</code> command</p>
<h3>setHyperlink(link, title)</h3>
<p>Setting the node hyperlink, a shortcut for the <code>SET_NODE_HYPERLINK</code> command</p>
<h3>setNote(note)</h3>
<p>Setting the node note, a shortcut for the <code>SET_NODE_NOTE</code> command</p>
<h3>setTag(tag)</h3>
<p>Setting the node tag, a shortcut for the <code>SET_NODE_TAG</code> command&quot;</p>
<h3>hide()</h3>
<blockquote>
<p>v0.1.5+</p>
</blockquote>
<p>Hide node and its sub-nodes</p>
<h3>show()</h3>
<blockquote>
<p>v0.1.5+</p>
</blockquote>
<p>Show node and its sub-nodes</p>
<h3>isParent(node)</h3>
<blockquote>
<p>v0.1.5+：Detect whether the current node is an ancestor node of a certain node</p>
</blockquote>
<blockquote>
<p>v0.8.1+：Detect whether the current node is the parent node of a certain node</p>
</blockquote>
<h3>isAncestor(node)</h3>
<blockquote>
<p>v0.8.1+</p>
</blockquote>
<p>Detect whether the current node is an ancestor node of a certain node</p>
<h3>isBrother(node)</h3>
<blockquote>
<p>v0.1.5+</p>
</blockquote>
<p>Check if the current node is a sibling of a certain node</p>
<h3>checkHasGeneralization()</h3>
<blockquote>
<p>v0.2.0+</p>
</blockquote>
<p>Check if there is a summary</p>
<h3>checkHasSelfGeneralization()</h3>
<blockquote>
<p>v0.9.0+</p>
</blockquote>
<p>Check if there is a summary of oneself, not a sub node interval summary</p>
<h3>hideGeneralization()</h3>
<blockquote>
<p>v0.2.0+</p>
</blockquote>
<p>Hide summary node</p>
<h3>showGeneralization()</h3>
<blockquote>
<p>v0.2.0+</p>
</blockquote>
<p>Show summary node</p>
<h3>updateGeneralization()</h3>
<blockquote>
<p>v0.2.0+</p>
</blockquote>
<p>Update summary node</p>
<h3>hasCustomPosition()</h3>
<blockquote>
<p>v0.2.0+</p>
</blockquote>
<p>Check if the node has custom data</p>
<h3>ancestorHasCustomPosition()</h3>
<blockquote>
<p>v0.2.0+</p>
</blockquote>
<p>Check if there is an ancestor node with custom position</p>
<h3>getShape()</h3>
<blockquote>
<p>v0.2.4+</p>
</blockquote>
<p>Get node shape</p>
<h3>setShape(shape)</h3>
<blockquote>
<p>v0.2.4+</p>
</blockquote>
<p>Set node shape, a shortcut method for the <code>SET_NODE_SHAPE</code> command</p>
<h3>getSelfStyle(prop)</h3>
<blockquote>
<p>v0.2.5+</p>
</blockquote>
<p>Get the node's own custom style</p>
<h3>getParentSelfStyle(prop)</h3>
<blockquote>
<p>v0.2.5+</p>
</blockquote>
<p>Get the custom style of the nearest ancestor node with its own custom style</p>
<h3>getSelfInhertStyle(prop)</h3>
<blockquote>
<p>v0.2.5+</p>
</blockquote>
<p>Get the node's own inheritable custom style</p>

  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>