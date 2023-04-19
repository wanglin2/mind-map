<template>
  <div>
    <h1>部署</h1>
<p>本项目的<code>web</code>目录下提供了一个基于<code>simple-mind-map</code>库、<code>Vue2.x</code>、<code>ElementUI</code>开发的完整项目，数据默认存储在电脑本地，此外可以操作电脑本地文件，原意是作为一个线上<code>demo</code>，但是也完全可以直接把它当做一个在线版思维导图应用使用，在线地址：<a href="https://wanglin2.github.io/mind-map/">https://wanglin2.github.io/mind-map/</a>。</p>
<p>如果你的网络环境访问<code>GitHub</code>服务很慢，你也可以部署到你的服务器上。</p>
<h2>部署到静态文件服务器</h2>
<p>项目本身不依赖后端，所以完全可以部署到一个静态文件服务器上，可以依次执行如下命令：</p>
<pre class="hljs"><code>git <span class="hljs-built_in">clone</span> https://github.com/wanglin2/mind-map.git
<span class="hljs-built_in">cd</span> mind-map
<span class="hljs-built_in">cd</span> simple-mind-map
npm i
npm link
<span class="hljs-built_in">cd</span> ..
<span class="hljs-built_in">cd</span> web
npm i
npm link simple-mind-map
</code></pre>
<p>然后你可以选择启动本地服务：</p>
<pre class="hljs"><code>npm run serve
</code></pre>
<p>也可以直接打包生成构建产物：</p>
<pre class="hljs"><code>npm run build
</code></pre>
<p>打包完后的入口页面<code>index.html</code>可以在项目根目录找到，对应的静态资源在根目录下的<code>dist</code>目录，<code>html</code>文件中会通过相对路径访问<code>dist</code>目录的资源，比如<code>dist/xxx</code>。你可以直接把这两个文件或目录上传到你的静态文件服务器，事实上，本项目就是这样部署到<code>GitHub Pages</code>上的。</p>
<p>如果你没有代码修改需求的话，直接从本仓库复制这些文件也是可以的。</p>
<p>如果你想把<code>index.html</code>也打包进<code>dist</code>目录，可以修改<code>web/package.json</code>文件的<code>scripts.build</code>命令，把<code>vue-cli-service build &amp;&amp; node ../copy.js</code>中的<code> &amp;&amp; node ../copy.js</code>删除即可。</p>
<p>如果你想修改打包输出的目录，可以修改<code>web/vue.config.js</code>文件的<code>outputDir</code>配置，改成你想要输出的路径即可。</p>
<p>如果你想修改<code>index.html</code>文件引用静态资源的路径的话可以修改<code>web/vue.config.js</code>文件的<code>publicPath</code>配置。</p>
<p>另外默认使用的是<code>hash</code>路由，也就是路径中会在<code>#</code>，如果你想使用<code>history</code>路由，可以修改<code>web/src/router.js</code>文件，将：</p>
<pre class="hljs"><code><span class="hljs-keyword">const</span> router = <span class="hljs-keyword">new</span> VueRouter({
  routes
})
</code></pre>
<p>改成：</p>
<pre class="hljs"><code><span class="hljs-keyword">const</span> router = <span class="hljs-keyword">new</span> VueRouter({
  <span class="hljs-attr">mode</span>: <span class="hljs-string">&#x27;history&#x27;</span>,
  routes
})
</code></pre>
<p>不过这需要后台支持，因为我们的应用是个单页客户端应用，如果后台没有正确的配置，当用户在浏览器直接访问子路由时会返回404，所以呢你要在服务端增加一个覆盖所有情况的候选资源：如果<code>URL</code>匹配不到任何静态资源，则应该返回同一个<code>index.html</code>页面。</p>
<h2>Docker</h2>
<p>编写中。。。</p>

  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>