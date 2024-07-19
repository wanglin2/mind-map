<template>
  <div>
    <h1>Formula plugin</h1>
<blockquote>
<p>v0.7.2+</p>
</blockquote>
<blockquote>
<p>This plugin is only supported in rich text mode, so it needs to be used after registering the RichText plugin</p>
</blockquote>
<p>This plugin is used to support inserting formulas into nodes.</p>
<blockquote>
<p>注意：公式是通过<a href="https://github.com/KaTeX/KaTeX">KaTeX</a>库实现的，<code>KaTeX</code>提供了一些配置，插件默认的一个配置是：</p>
</blockquote>
<blockquote>
<p>Note: The formula is implemented through the <a href="https://github.com/KaTeX/KaTeX">KaTeX</a> library, and 'KaTeX' provides some configurations. The default configuration for the plugin is:</p>
</blockquote>
<pre class="hljs"><code>{
    <span class="hljs-attr">output</span>: <span class="hljs-string">&#x27;mathml&#x27;</span>
}
</code></pre>
<blockquote>
<p>This formula may not render successfully on a few browsers. If you need to be compatible with these browsers, you can consider changing the configuration to 'HTML'. For detailed documentation, please refer to <a href="https://katex.org/docs/options">Options</a>. Using this configuration may require the introduction of a 'KaTeX' style file, which you can test on your own.</p>
</blockquote>
<blockquote>
<p>v0.9.3+will internally determine whether the current Chrome kernel version of the browser is lower than 100, If so, it will automatically convert 'output' from 'mathml' to 'html', At this point, the style file for 'KaTeX' needs to be imported, but it is not imported within the library, so you need to manually import it in the project. If you introduced 'simple-mind-map' through the 'npm' method, you can introduce it as follows:</p>
<pre class="hljs"><code><span class="hljs-keyword">import</span> <span class="hljs-string">&#x27;simple-mind-map/node_modules/katex/dist/katex.min.css&#x27;</span>
</code></pre>
<p>If you are using packaged files such as '.umd.js' or '.esm.js', you can import them through online CDN services, such as <code>https://unpkg.com/browse/katex@0.16.9/dist/</code>, Of course, it is best to upload the 'css' file of the 'katex' and the corresponding font files in the 'fonts' directory to your own server.</p>
</blockquote>
<blockquote>
<p>Version v0.10.3+ will default to importing the style files of 'KaTeX'. So you don't need to manually introduce it anymore. When the rendering mode of the Katex library is html, it depends on some font files, which are not included in the plugin. You need to use the <code>katexFontPath</code> instantiation option to set the path of the font files.</p>
</blockquote>
<h2>Problem</h2>
<p>1.On some browsers, the formula source code is displayed</p>
<p>This is because some browsers do not support the 'mathml' output mode of the 'KaTex' library. You can change the output mode to 'html' by using the 'getKatexOutputType' instantiation option.</p>
<p>2.Sometimes formulas and text may display line breaks</p>
<p>This is usually because formula rendering uses the 'html' mode, which depends on the font file. Therefore, when rendering the mind map before the font file is loaded, the calculated formula content size may not match the actual formula size after loading the font file, resulting in a row change. We can find a way to make the font file load before rendering the mind map.</p>
<p>3.SVG files exported on one browser have inconsistent styles when opened on another browser</p>
<p>Because the calculation of node size depends on the proxy style of the browser, the default style of different browsers is not consistent, so the calculated node size is also inconsistent.</p>
<p>4.The smm or json file exported on one browser cannot be rendered properly when imported on another browser</p>
<p>Because some browsers may render in 'mathml' mode, while others may render in 'html' mode, those that support 'mathml' mode usually support 'html', while the opposite is not possible.</p>
<p>5.Abnormal formula for exporting images when rendering in <code>html</code> mode</p>
<p>This is caused by not loading the font, and there is currently no solution.</p>
<h2>Register</h2>
<pre class="hljs"><code><span class="hljs-keyword">import</span> MindMap <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;simple-mind-map&#x27;</span>
<span class="hljs-keyword">import</span> Formula <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;simple-mind-map/src/plugins/Formula.js&#x27;</span>

MindMap.usePlugin(Formula)
</code></pre>
<p>After registration and instantiation of <code>MindMap</code>, the instance can be obtained through <code>mindMap.formula</code>.</p>
<h2>Usage</h2>
<p>After registering the plugin, you can use the command 'INSERT_FORMULA' to insert the specified formula for the node:</p>
<pre class="hljs"><code>mindMap.execCommand(<span class="hljs-string">&#x27;INSERT_FORMULA&#x27;</span>, <span class="hljs-string">&#x27;a^2&#x27;</span>)
</code></pre>
<p>The above command will insert the 'a^2' formula into the currently active node.</p>
<p>If you want to assign a formula to a node or nodes, you can pass the second parameter:</p>
<pre class="hljs"><code>mindMap.execCommand(<span class="hljs-string">&#x27;INSERT_FORMULA&#x27;</span>, <span class="hljs-string">&#x27;a^2&#x27;</span>, [Node])
</code></pre>
<p>Pass in the specified node instance through the second parameter.</p>
<h2>Methods</h2>
<h3>getKatexConfig()</h3>
<p>Get the current configuration passed to <code>Katex</code>.</p>

  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>