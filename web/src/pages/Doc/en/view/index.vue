<template>
  <div>
    <h1>View instance</h1>
<p>The <code>view</code> instance is responsible for view operations, and can be obtained
through <code>mindMap.view</code></p>
<h2>Methods</h2>
<h3>fit()</h3>
<blockquote>
<p>v0.6.0+</p>
</blockquote>
<p>Zoom the mind map to fit the canvas.</p>
<p>Note that this method cannot be called immediately after calling the 'setData' and 'setFullData' methods, and needs to listen to the 'node_tree_render_end' event calls 'fit'.</p>
<h3>translateX(step)</h3>
<p>Translate in the <code>x</code> direction, <code>step</code>: number of pixels to translate</p>
<h3>translateY(step)</h3>
<p>Translate in the <code>y</code> direction, <code>step</code>: number of pixels to translate</p>
<h3>translateXTo(x)</h3>
<blockquote>
<p>v0.2.11+</p>
</blockquote>
<p>Translate the <code>x</code> direction to a specific position</p>
<h3>translateYTo(y)</h3>
<blockquote>
<p>v0.2.11+</p>
</blockquote>
<p>Translate the <code>y</code> direction to a specific position</p>
<h3>reset()</h3>
<p>Revert to the default transformation</p>
<h3>narrow(cx, cy)</h3>
<ul>
<li>
<p><code>cx</code>:（v0.6.4+）Zoom to the specified position on the canvas, default to the center point of the canvas</p>
</li>
<li>
<p><code>cy</code>:（v0.6.4+）Zoom to the specified position on the canvas, default to the center point of the canvas</p>
</li>
</ul>
<p>Zoom out</p>
<h3>enlarge(cx, cy)</h3>
<ul>
<li>
<p><code>cx</code>:（v0.6.4+）Zoom to the specified position on the canvas, default to the center point of the canvas</p>
</li>
<li>
<p><code>cy</code>:（v0.6.4+）Zoom to the specified position on the canvas, default to the center point of the canvas</p>
</li>
</ul>
<p>Zoom in</p>
<h3>getTransformData()</h3>
<blockquote>
<p>v0.1.1+</p>
</blockquote>
<p>Get the current transform data, can be used for display</p>
<h3>setTransformData(data)</h3>
<blockquote>
<p>v0.1.1+</p>
</blockquote>
<p>Dynamically set transform data, transform data can be obtained through the
getTransformData method&quot;</p>
<h3>setScale(scale, cx, cy)</h3>
<blockquote>
<p>v0.2.17+</p>
</blockquote>
<ul>
<li>
<p><code>scale</code>: Scaling values, not scaled to '1', scaled to '1' for values less than, scaled to '1' for values greater than, scaled to '1' for values greater than</p>
</li>
<li>
<p><code>cx</code>:（v0.6.4+）Zoom to the specified position on the canvas, default to the center point of the canvas</p>
</li>
<li>
<p><code>cy</code>:（v0.6.4+）Zoom to the specified position on the canvas, default to the center point of the canvas</p>
</li>
</ul>
<p>Setting Zoom</p>

  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>