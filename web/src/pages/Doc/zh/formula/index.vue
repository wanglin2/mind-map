<template>
  <div>
    <h1>Formula 插件</h1>
<blockquote>
<p>v0.7.2+</p>
</blockquote>
<blockquote>
<p>该插件仅在富文本模式下支持，所以需要在注册了RichText插件的前提下使用</p>
</blockquote>
<p>该插件用于支持给节点插入公式。</p>
<blockquote>
<p>注意：公式是通过<a href="https://github.com/KaTeX/KaTeX">KaTeX</a>库实现的，<code>KaTeX</code>提供了一些配置，插件默认的一个配置是：</p>
</blockquote>
<pre class="hljs"><code>{
    <span class="hljs-attr">output</span>: <span class="hljs-string">&#x27;mathml&#x27;</span>
}
</code></pre>
<blockquote>
<p>这在少数浏览器上公式可能无法成功渲染，如果你需要兼容这部分浏览器，你可以考虑把该配置改为<code>html</code>，详细文档可以参考：<a href="https://katex.org/docs/options">Options</a>。使用这个配置可能还需要再引入<code>KaTeX</code>的样式文件，你可以自行测试。</p>
</blockquote>
<blockquote>
<p>v.0.9.3+版本内部会判断当前浏览器的Chrome内核版本是否低于100，是的话会自动将<code>output</code>由<code>mathml</code>转为<code>html</code>，此时需要引入<code>KaTeX</code>的样式文件，库内部没有引入，所以需要你手动在项目中引入。如果你是通过<code>npm</code>方式引入<code>simple-mind-map</code>，那么你可以这么引入：</p>
<pre class="hljs"><code><span class="hljs-keyword">import</span> <span class="hljs-string">&#x27;simple-mind-map/node_modules/katex/dist/katex.min.css&#x27;</span>
</code></pre>
<p>如果你使用的是<code>.umd.js</code>、<code>.esm.js</code>之类的打包后的文件，那么可以通过在线的CDN服务来引入，比如：<code>https://unpkg.com/browse/katex@0.16.9/dist/</code>，当然，最好是把<code>katex</code>的<code>css</code>文件，以及对应的<code>fonts</code>目录下的字体文件上传到你自己的服务器上。</p>
</blockquote>
<blockquote>
<p>v0.10.3+版本会默认引入<code>KaTeX</code>的样式文件。所以你无需再手动引入。当<code>Katex</code>库的渲染模式为<code>html</code>时它会依赖一些字体文件，插件并不包含这些文件，你需要通过<code>katexFontPath</code>实例化选项来设置字体文件的路径。</p>
</blockquote>
<h2>问题</h2>
<p>1.在有的浏览器上显示的是公式源码</p>
<p>这是因为有的浏览器不支持<code>KaTex</code>库的<code>mathml</code>输出模式，可以通过<code>getKatexOutputType</code>实例化选项来将输出模式改为<code>html</code>。</p>
<p>2.有时公式和文本会换行显示</p>
<p>这一般是因为公式渲染使用的是<code>html</code>模式，这种模式依赖于字体文件，所以当字体文件没有加载完就渲染思维导图时，计算出来的公式内容大小和加载完字体文件后的实际公式大小不一致导致换行，可以想办法让字体文件加载完成后再渲染思维导图。</p>
<p>3.在一个浏览器上导出的svg文件在另一个浏览器上打开样式不一致</p>
<p>因为计算节点大小时是依赖浏览器的代理样式的，不同浏览器默认样式不一致，所以计算出来的节点大小也不一致。</p>
<p>4.在一个浏览器上导出的smm或json文件在另一个浏览器上导入无法正常渲染</p>
<p>因为有的浏览器可能是使用<code>mathml</code>模式渲染的，有的可能是<code>html</code>模式渲染的，通常支持<code>mathml</code>模式的肯定支持<code>html</code>，反过来则不行。</p>
<p>5.在使用<code>html</code>模式渲染时导出图片公式异常</p>
<p>这个因为没有加载字体导致的，目前没有解决方法。</p>
<h2>注册</h2>
<pre class="hljs"><code><span class="hljs-keyword">import</span> MindMap <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;simple-mind-map&#x27;</span>
<span class="hljs-keyword">import</span> Formula <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;simple-mind-map/src/plugins/Formula.js&#x27;</span>

MindMap.usePlugin(Formula)
</code></pre>
<p>注册完且实例化<code>MindMap</code>后可通过<code>mindMap.formula</code>获取到该实例。</p>
<h2>使用</h2>
<p>注册了该插件后，可以使用命令<code>INSERT_FORMULA</code>来给节点插入指定公式：</p>
<pre class="hljs"><code>mindMap.execCommand(<span class="hljs-string">&#x27;INSERT_FORMULA&#x27;</span>, <span class="hljs-string">&#x27;a^2&#x27;</span>)
</code></pre>
<p>上述命令会给当前激活的节点插入<code>a^2</code>公式。</p>
<p>如果要指定给某个或某些节点插入公式，可以传递第二个参数：</p>
<pre class="hljs"><code>mindMap.execCommand(<span class="hljs-string">&#x27;INSERT_FORMULA&#x27;</span>, <span class="hljs-string">&#x27;a^2&#x27;</span>, [Node])
</code></pre>
<p>通过第二个参数传入指定的节点实例即可。</p>
<h2>方法</h2>
<h3>getKatexConfig()</h3>
<p>获取当前传递给<code>Katex</code>的配置。</p>

  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>