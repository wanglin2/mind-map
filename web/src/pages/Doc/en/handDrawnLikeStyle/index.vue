<template>
  <div>
    <h1>HandDrawnLikeStyle chargeable plugin</h1>
<blockquote>
<p>Regarding fees</p>
<p>Mind map is an open-source project under the MIT protocol. In theory, as long as the copyright statement of mind map is retained, there is no charge for commercial use, and this protocol will not be changed in the future. Moreover, neither the online version nor the client will consider charging. However, in order to ensure the sustainable development of the project, revenue will be obtained through various means, such as existing sponsorship methods. The second approach is to use paid plugins, with the basic principle that basic functions, core functions, and necessary functions are not charged, while optional additional functions may be charged.</p>
<p>Finally, the fee is only applicable to developers. If it is only the online version or client version of the mind map, users do not need to pay, and all functions can be used for free.</p>
</blockquote>
<p>HandDrawnLikeStyle is the first paid plugin that provides a hand drawn style, where the connections and shapes of nodes become hand drawn, just like the following:</p>
<img src="../../../../assets/img/docs/手绘风格.png" style="width: 800px" />
<p>You can also try to turn on the hand drawn style in the online version through the settings of 【 Basic Style 】 - 【 Enable Hand drawn Style 】.</p>
<p>The internal implementation is through the <a href="https://github.com/rough-stuff/rough">rough</a> library, so if you have the energy, you can also implement this plugin based on this library yourself.</p>
<h2>Charge</h2>
<p>At present, the charging method is relatively primitive. By scanning the code and transferring money, please note the plugin you want to purchase and your email address, and then the plugin file will be sent to your email. Purchase should be made after full use and consideration. If you are not familiar with front-end development and do not know how to use plugins, please consider purchasing carefully. There will be no refund unless there are special reasons. If you find bugs or have requirements, you can submit relevant issues.</p>
<p>Price:</p>
<p>1.￥ 19.9, Only includes the packaged files, which are in two formats: .cjs.min.js and .esm.min.js.</p>
<p>2.￥ 29.9, including unpackaged source code and packaged files.</p>
<img src="../../../../assets/img/alipay.jpg" style="width: 300px" />
<img src="../../../../assets/img/wechat.jpg" style="width: 300px" />
<h2>Register</h2>
<p>1.Referencing packaged files:</p>
<pre class="hljs"><code><span class="hljs-keyword">import</span> MindMap <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;simple-mind-map&#x27;</span>
<span class="hljs-keyword">import</span> HandDrawnLikeStyle <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;handDrawnLikeStyle.cjs.min.js&#x27;</span>
<span class="hljs-comment">// or import HandDrawnLikeStyle from &#x27;handDrawnLikeStyle.esm.min.js&#x27;</span>

MindMap.usePlugin(HandDrawnLikeStyle)
</code></pre>
<p>2.Referencing Unpackaged Source Code</p>
<p>You can first enter the plugin directory to execute:</p>
<pre class="hljs"><code>npm link
</code></pre>
<p>Then enter your project root directory to execute:</p>
<pre class="hljs"><code>npm link simple-mind-map-plugin-handdrawnlikestyle
</code></pre>
<p>Then you can directly import it for use:</p>
<pre class="hljs"><code><span class="hljs-keyword">import</span> MindMap <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;simple-mind-map&#x27;</span>
<span class="hljs-keyword">import</span> HandDrawnLikeStyle <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;simple-mind-map-plugin-handdrawnlikestyle&#x27;</span>

MindMap.usePlugin(HandDrawnLikeStyle)
</code></pre>
<p>After registration and instantiation of <code>MindMap</code>, the instance can be obtained through <code>mindMap.handDrawnLikeStyle</code>.</p>
<p>After registering the plugin, there is no need to perform other methods and the hand drawn style can take effect.</p>
<p>If you are using the mindMap.addPlugin method to dynamically register a component, you need to call the method of re rendering once:</p>
<pre class="hljs"><code>mindMap.addPlugin(HandDrawnLikeStyle)
mindMap.reRender()
</code></pre>
<h2>Methods</h2>
<p>You may not be familiar with the following methods.</p>
<h3>createPath(svgPathStr)</h3>
<ul>
<li><code>svgPathStr</code>：SVG Path string</li>
</ul>
<p>Create a hand drawn style path node and return the path node of SVG.</p>
<h3>createPolygon(points)</h3>
<ul>
<li><code>points</code>：Points array</li>
</ul>
<pre class="hljs"><code>points：[
    [x1, y1],
    ...
]
</code></pre>
<p>Create a hand drawn polygon node and return the Path node of SVG.</p>
<h3>transformPath(svgPathStr)</h3>
<p>Convert SVG Path strings to hand drawn SVG Path strings.</p>

  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>