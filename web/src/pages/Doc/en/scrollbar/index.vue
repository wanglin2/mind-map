<template>
  <div>
    <h1>Scrollbar plugin</h1>
<blockquote>
<p>v0.7.0+</p>
<p>V0.7.1+has been refactored, and the following document is a new one.</p>
</blockquote>
<p>This plugin is used to help develop the functionality of horizontal and vertical scrollbar. Please refer to the tutorial for detailed usage.</p>
<h2>Register</h2>
<pre class="hljs"><code><span class="hljs-keyword">import</span> MindMap <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;simple-mind-map&#x27;</span>
<span class="hljs-keyword">import</span> Scrollbar <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;simple-mind-map/src/plugins/Scrollbar.js&#x27;</span>
MindMap.usePlugin(Scrollbar)
</code></pre>
<p>After registration and instantiation of <code>MindMap</code>, the instance can be obtained through <code>mindMap.scrollbar</code>.</p>
<h2>Event</h2>
<h4>scrollbar_change(data)</h4>
<pre class="hljs"><code>{
    <span class="hljs-comment">// Vertical scrollbar</span>
    <span class="hljs-attr">vertical</span>: {
        top,<span class="hljs-comment">// Top value, Percentage value</span>
        height<span class="hljs-comment">// Scrollbar height, Percentage value</span>
    },
    <span class="hljs-comment">// Horizontal scrollbar</span>
    <span class="hljs-attr">horizontal</span>: {
        left,<span class="hljs-comment">// Left value, Percentage value</span>
        width<span class="hljs-comment">// Scrollbar width, Percentage value</span>
    }
}
</code></pre>
<p>Triggered when the scrollbar data changes, you can listen to this event to update the position and size of the scrollbar. Receive a parameter representing the latest scrollbar position and size information, which you can use to update the style of the scrollbar element.</p>
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
<p>Usually, you do not need to call this method. If the scroll bar is not updated when rendering for the first time, you can manually call this method to obtain the scroll bar data.</p>
<p>You need to first call the setScrollBarWrapSize method to set the width and height of the scroll bar container element.</p>
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
<p>Obtain the size and position of the scrollbar.</p>
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
<h3>onClick(e, type)</h3>
<ul>
<li>
<p><code>e</code>：The event object for the mouse click event.</p>
</li>
<li>
<p><code>type</code>：The type of scroll bar on click, vertical(Vertical scrollbar)、horizontal(Horizontal scrollbar)。</p>
</li>
</ul>
<p>This method needs to be called when the click event of the scrollbar element is triggered.</p>

  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>