<template>
  <div>
    <h1>Scrollbar plugin</h1>
<blockquote>
<p>v0.7.0+</p>
</blockquote>
<p>This plugin is used to help develop the functionality of horizontal and vertical scrollbar.</p>
<h2>Register</h2>
<pre class="hljs"><code><span class="hljs-keyword">import</span> MindMap <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;simple-mind-map&#x27;</span>
<span class="hljs-keyword">import</span> Scrollbar <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;simple-mind-map/src/plugins/Scrollbar.js&#x27;</span>
MindMap.usePlugin(Scrollbar)
</code></pre>
<p>After registration and instantiation of <code>MindMap</code>, the instance can be obtained through <code>mindMap.scrollbar</code>.</p>
<h2>Event</h2>
<h4>scrollbar_change</h4>
<p>Triggered when the scrollbar data changes, you can listen to this event to update the position and size of the scrollbar.</p>
<h2>Method</h2>
<h3>setScrollBarWrapSize(width, height)</h3>
<ul>
<li>
<p><code>width</code>: Number, The width of your scrollbar container element.</p>
</li>
<li>
<p><code>height</code>: Number, The height of your scrollbar container element.</p>
</li>
</ul>
<p>Set the size of the scroll bar container, which is the width of the container for horizontal scrollbars and the height of the container for vertical scrollbars. When your scrollbar container size changes, you need to call this method again.</p>
<h3>calculationScrollbar()</h3>
<blockquote>
<p>You need to first call the setScrollBarWrapSize method to set the width and height of the scroll bar container element.</p>
<p>Generally, it is necessary to monitor scrollbar_change event, and then call it to update the scroll bar.</p>
</blockquote>
<p>Return value:</p>
<pre class="hljs"><code>{
    <span class="hljs-comment">// Vertical scrollbar</span>
    <span class="hljs-attr">vertical</span>: {
        top,
        height
    },
    <span class="hljs-comment">// Horizontal scrollbar</span>
    <span class="hljs-attr">horizontal</span>: {
        left,
        width
    }
}
</code></pre>
<p>Obtain the size and position of the scroll bar, and you can set it to the scroll bar element based on the return value to achieve the effect of rendering and caring about the scroll bar.</p>
<h3>onMousedown(e, type)</h3>
<ul>
<li>
<p><code>e</code>: The event object for the mouse down event.</p>
</li>
<li>
<p><code>type</code>: The type of scroll bar pressed, vertical(Vertical scrollbar)、horizontal(Horizontal scrollbar)。</p>
</li>
</ul>
<p>This method needs to be called when the mouse press event of the scrollbar element occurs.</p>

  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>