<template>
  <div>
    <h1>MiniMap instance</h1>
<blockquote>
<p>v0.2.11+</p>
</blockquote>
<p>Used to help quickly develop a small map feature, the small map consists of two
parts, one is the current canvas content, and the other is the viewport frame.
When zoomed, moved, or there are too many elements, the canvas may only display
part of the mind map content. The viewport frame can be used to view the current
viewport location, and can be quickly positioned by dragging on the small map.</p>
<p>The <code>mindMap.miniMap</code> instance can be obtained through this.</p>
<h2>Methods</h2>
<h3>getMiniMap()</h3>
<p>Obtain small map related data, this function is generally not used directly, the
function returns:</p>
<pre class="hljs"><code>{
      svg, <span class="hljs-comment">// Element, the overall svg element of the mind map graphics, including: svg (canvas container), g (actual mind map group)</span>
      svgHTML, <span class="hljs-comment">// String, svg string, i.e. html string, can be directly rendered to the small map container you prepared</span>
      <span class="hljs-attr">rect</span>: <span class="hljs-comment">// Object, position, size, etc. of mind map graphics before zoom</span>
      origWidth, <span class="hljs-comment">// Number, canvas width</span>
      origHeight, <span class="hljs-comment">// Number, canvas height</span>
      scaleX, <span class="hljs-comment">// Number, horizontal zoom value of mind map graphics</span>
      scaleY, <span class="hljs-comment">// Number, vertical zoom value of mind map graphics</span>
}
</code></pre>
<h3>calculationMiniMap(boxWidth, boxHeight)</h3>
<p>&quot;Calculate the rendering data for the small map, this function will call the
<code>getMiniMap()</code> method, so using this function is sufficient.</p>
<p><code>boxWidth</code>: the width of the small map container</p>
<p><code>boxHeight</code>: the height of the small map container</p>
<p>Function return content:</p>
<pre class="hljs"><code>{
      svgHTML, <span class="hljs-comment">// small map html</span>
      viewBoxStyle, <span class="hljs-comment">// view box position information</span>
      miniMapBoxScale, <span class="hljs-comment">// view box zoom value</span>
      miniMapBoxLeft, <span class="hljs-comment">// view box left value</span>
      miniMapBoxTop, <span class="hljs-comment">// view box top value</span>
}
</code></pre>
<p>Small map idea:</p>
<p>1.Prepare a container element <code>container</code>, position is not <code>static</code></p>
<p>2.In <code>container</code>, create a small map container element <code>miniMapContainer</code>,
absolute positioning</p>
<p>3.In <code>container</code>, create a view box element <code>viewBoxContainer</code>, absolute
positioning, set border style, transition property (optional)</p>
<p>4.Listen for <code>data_change</code> and <code>view_data_change</code> events, and in this event call
the <code>calculationMiniMap</code> method to get calculation data, then render <code>svgHTML</code>
to the <code>miniMapContainer</code> element and set its style:</p>
<pre class="hljs"><code>:style=<span class="hljs-string">&quot;{
    transform: `scale(${svgBoxScale})`,
    left: svgBoxLeft + &#x27;px&#x27;,
    top: svgBoxTop + &#x27;px&#x27;,
}&quot;</span>
</code></pre>
<p>5.Set the <code>viewBoxStyle</code> object as the style of the <code>viewBoxContainer</code> element</p>
<p>At this point, when the mind map on the canvas changes, the small map will also
be updated in real time, and the view box element will reflect the position of
the viewport on the mind map graph in real time</p>
<p>6.Listen for the <code>mousedown</code>, <code>mousemove</code>, and <code>mouseup</code> events of the
<code>container</code> element, and call the three methods that will be introduced below to
achieve the effect of the mind map on the canvas being dragged with the mouse</p>
<h3>onMousedown(e)</h3>
<p>Small map mouse down event executes this function</p>
<p><code>e</code>: event object</p>
<h3>onMousemove(e, sensitivityNum = 5)</h3>
<p>This function is executed on the small map mouse move event.</p>
<p><code>e</code>: event object</p>
<p><code>sensitivityNum</code>: drag sensitivity, the higher the sensitivity, the greater the
actual canvas dragging distance on the small map when dragging the same distance
on the small map</p>
<h3>onMouseup()</h3>
<p>This function is executed on the small map mouse release event.</p>

  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>