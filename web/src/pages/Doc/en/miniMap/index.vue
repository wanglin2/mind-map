<template>
  <div>
    <h1>MiniMap plugin</h1>
<blockquote>
<p>v0.2.11+</p>
</blockquote>
<p>Used to help quickly develop a small map feature, the small map consists of two
parts, one is the current canvas content, and the other is the viewport frame.
When zoomed, moved, or there are too many elements, the canvas may only display
part of the mind map content. The viewport frame can be used to view the current
viewport location, and can be quickly positioned by dragging on the small map.</p>
<h2>Register</h2>
<pre class="hljs"><code><span class="hljs-keyword">import</span> MindMap <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;simple-mind-map&#x27;</span>
<span class="hljs-keyword">import</span> MiniMap <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;simple-mind-map/src/plugins/MiniMap.js&#x27;</span>
<span class="hljs-comment">// import MiniMap from &#x27;simple-mind-map/src/MiniMap.js&#x27; Use this path for versions below v0.6.0</span>

MindMap.usePlugin(MiniMap)
</code></pre>
<p>After registration and instantiation of <code>MindMap</code>, the instance can be obtained through <code>mindMap.miniMap</code>.</p>
<h2>Methods</h2>
<h3>calculationMiniMap(boxWidth, boxHeight)</h3>
<p>&quot;Calculate the rendering data for the small map, this function will call the
<code>getMiniMap()</code> method, so using this function is sufficient.</p>
<p><code>boxWidth</code>: the width of the small map container</p>
<p><code>boxHeight</code>: the height of the small map container</p>
<p>Function return content:</p>
<pre class="hljs"><code>{
      getImgUrl,<span class="hljs-comment">// v0.8.0+, An asynchronous function that you can call and pass a callback function. The callback function can receive a parameter representing a small map of the image type, and you can render it through the img tag</span>
      svgHTML, <span class="hljs-comment">// Mini map HTML, it is recommended to use the getImgUrl method to obtain image type mini maps, reduce the number of page DOM, and optimize performance</span>
      viewBoxStyle, <span class="hljs-comment">// view box position information</span>
      miniMapBoxScale, <span class="hljs-comment">// view box zoom value</span>
      miniMapBoxLeft, <span class="hljs-comment">// view box left value</span>
      miniMapBoxTop, <span class="hljs-comment">// view box top value</span>
}
</code></pre>
<p>Small map idea:</p>
<p>1.Prepare a container element <code>container</code>, position is not <code>static</code></p>
<p>If using rich text editing mode, it is best to remove the default style from the elements inside the 'container', otherwise there may be text offset issues within nodes:</p>
<pre class="hljs"><code><span class="hljs-selector-class">.container</span> * {
  <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
}
</code></pre>
<p>2.In <code>container</code>, create a small map container element <code>miniMapContainer</code>,
absolute positioning</p>
<p>3.In <code>container</code>, create a view box element <code>viewBoxContainer</code>, absolute
positioning, set border style, transition property (optional)</p>
<p>4.Listen for <code>data_change</code> and <code>view_data_change</code> events, and in this event call
the <code>calculationMiniMap</code> method to get calculation data, then render <code>svgHTML</code>
to the <code>miniMapContainer</code> element and set <code>miniMapContainer</code> element style:</p>
<pre class="hljs"><code>:style=<span class="hljs-string">&quot;{
    transform: `scale(${miniMapBoxScale})`,
    left: miniMapBoxLeft + &#x27;px&#x27;,
    top: miniMapBoxTop + &#x27;px&#x27;,
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