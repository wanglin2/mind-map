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
<p>如果你想修改<code>index.html</code>文件引用静态资源的路径的话可以修改<code>web/vue.config.js</code>文件的<code>publicPath</code>配置。以及<code>web/public/index.html</code>文件的<code>window.externalPublicPath</code>配置。</p>
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
<blockquote>
<p>非常感谢<a href="https://github.com/shuiche-it">水车</a>，本小节由他编写，对应的 Docker 包也由他维护。</p>
</blockquote>
<p>直接从 Docker hup 中安装：</p>
<pre class="hljs"><code>docker run -d -p 8081:8080 shuiche/mind-map:latest
</code></pre>
<p>mind-map在容器中启动了8080端口作为web服务入口，通过docker运行容器时，需要指定本地映射端口，上面案例中，我们通过本地的8081端口映射到容器端口8080。</p>
<p>安装完成后，通过 <code>docker ps</code> 查看容器运行状态。</p>
<p>浏览器打开 127.0.0.1:8081 即可使用Web 思维导图功能。</p>
<p><a href="https://laosu.gq/2023/09/02/%E5%BC%BA%E5%A4%A7%E7%9A%84%E6%80%9D%E7%BB%B4%E5%AF%BC%E5%9B%BE%E5%BA%93SimpleMindMap/">在群晖上以 Docker 方式安装</a></p>
<h2>对接自己的存储服务</h2>
<p>应用数据默认存储在浏览器本地，浏览器本地存储容量是比较小的，所以当在思维导图中插入更多图片后很容易触发限制，所以更好的选择是对接你自己的存储服务，这通常有两种方式：</p>
<h3>第一种</h3>
<p>直接clone本仓库代码，然后修改<code>web/src/api/index.js</code>内的相关方法即可实现从你的数据库里获取数据，以及存储到你的数据中。</p>
<h3>第二种</h3>
<p>很多时候，你可能想始终使用本仓库的最新代码，那么第一种方式就不太方便，因为你要手动去合并代码，所以提供了第二种方式。</p>
<p>具体操作步骤：</p>
<p>1.复制web应用打包后的资源</p>
<p>包括：<code>dist</code>目录和<code>index.html</code>文件。</p>
<p>2.修改复制后的<code>index.html</code>文件</p>
<p>首先在<code>head</code>标签里插入如下代码：</p>
<pre class="hljs"><code>&lt;script&gt;
  <span class="hljs-built_in">window</span>.takeOverApp = <span class="hljs-literal">true</span>
&lt;/script&gt;
</code></pre>
<p>这行代码会提示应用不要初始化应用<code>即：new Vue()</code>，而是把控制权交给你，接下来再在<code>body</code>的最后插入你自己的<code>js</code>代码，内联或则外链都可以，内联示例如下：</p>
<pre class="hljs"><code>&lt;script&gt;
  <span class="hljs-comment">// 你自己的请求数据的方法</span>
  <span class="hljs-keyword">const</span> getDataFromBackend = <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
      <span class="hljs-built_in">setTimeout</span>(<span class="hljs-function">() =&gt;</span> {
        resolve({
          <span class="hljs-comment">// 思维导图数据</span>
          <span class="hljs-attr">mindMapData</span>: {
            <span class="hljs-attr">root</span>: {
              <span class="hljs-string">&quot;data&quot;</span>: {
                  <span class="hljs-string">&quot;text&quot;</span>: <span class="hljs-string">&quot;根节点&quot;</span>
              },
              <span class="hljs-string">&quot;children&quot;</span>: []
            },
            <span class="hljs-attr">theme</span>: { <span class="hljs-string">&quot;template&quot;</span>:<span class="hljs-string">&quot;avocado&quot;</span>,<span class="hljs-string">&quot;config&quot;</span>:{} },
            <span class="hljs-attr">layout</span>: <span class="hljs-string">&quot;logicalStructure&quot;</span>,
            <span class="hljs-attr">config</span>: {},
            <span class="hljs-attr">view</span>: {}
          },
          <span class="hljs-comment">// 页面语言，支持中文（zh）、英文（en）</span>
          <span class="hljs-attr">lang</span>: <span class="hljs-string">&#x27;zh&#x27;</span>,
          <span class="hljs-comment">// 页面部分配置</span>
          <span class="hljs-attr">localConfig</span>: <span class="hljs-literal">null</span>
        })
      }, <span class="hljs-number">200</span>)
    })
  }
  <span class="hljs-comment">// 注册全局方法</span>
  <span class="hljs-keyword">const</span> setTakeOverAppMethods = <span class="hljs-function">(<span class="hljs-params">data</span>) =&gt;</span> {
    <span class="hljs-built_in">window</span>.takeOverAppMethods = {}
    <span class="hljs-comment">// 获取思维导图数据的函数</span>
    <span class="hljs-built_in">window</span>.takeOverAppMethods.getMindMapData = <span class="hljs-function">() =&gt;</span> {
      <span class="hljs-keyword">return</span> data.mindMapData
    } 
    <span class="hljs-comment">// 保存思维导图数据的函数</span>
    <span class="hljs-built_in">window</span>.takeOverAppMethods.saveMindMapData = <span class="hljs-function">(<span class="hljs-params">data</span>) =&gt;</span> {
      <span class="hljs-built_in">console</span>.log(data)
      <span class="hljs-comment">// 该函数触发频率可能会很高，所以你应该做一下节流或防抖</span>
    }
    <span class="hljs-comment">// 获取语言的函数</span>
    <span class="hljs-built_in">window</span>.takeOverAppMethods.getLanguage = <span class="hljs-function">() =&gt;</span> {
      <span class="hljs-keyword">return</span> data.lang
    }
    <span class="hljs-comment">// 保存语言的函数</span>
    <span class="hljs-built_in">window</span>.takeOverAppMethods.saveLanguage = <span class="hljs-function">(<span class="hljs-params">lang</span>) =&gt;</span> {
      <span class="hljs-built_in">console</span>.log(lang)
    }
    <span class="hljs-comment">// 获取本地配置的函数</span>
    <span class="hljs-built_in">window</span>.takeOverAppMethods.getLocalConfig = <span class="hljs-function">() =&gt;</span> {
      <span class="hljs-keyword">return</span> data.localConfig
    }
    <span class="hljs-comment">// 保存本地配置的函数</span>
    <span class="hljs-built_in">window</span>.takeOverAppMethods.saveLocalConfig = <span class="hljs-function">(<span class="hljs-params">config</span>) =&gt;</span> {
      <span class="hljs-built_in">console</span>.log(config)
    }
  }
  <span class="hljs-built_in">window</span>.onload = <span class="hljs-keyword">async</span> () =&gt; {
    <span class="hljs-keyword">if</span> (!<span class="hljs-built_in">window</span>.takeOverApp) <span class="hljs-keyword">return</span>
    <span class="hljs-comment">// 请求数据</span>
    <span class="hljs-keyword">const</span> data = <span class="hljs-keyword">await</span> getDataFromBackend()
    <span class="hljs-comment">// 设置全局的方法</span>
    setTakeOverAppMethods(data)
    <span class="hljs-comment">// 思维导图实例创建完成事件</span>
    <span class="hljs-built_in">window</span>.$bus.$on(<span class="hljs-string">&#x27;app_inited&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">mindMap</span>) =&gt;</span> {
      <span class="hljs-built_in">console</span>.log(mindMap)
    })
    <span class="hljs-comment">// 可以通过window.$bus.$on()来监听应用的一些事件</span>
    <span class="hljs-comment">// 实例化页面</span>
    <span class="hljs-built_in">window</span>.initApp()
  }
&lt;/script&gt;
</code></pre>
<p>如上所示，当你设置了<code>window.takeOverApp = true</code>标志，应用不再主动进行实例化，而是会将实例化的方法暴露出来由你调用，那么你可以先从后端请求思维导图的数据，然后再注册相关的方法，应用内部会在合适的时机进行调用，从而达到回显和保存的目的。</p>
<p>这样做的好处是，每当本仓库代码更新了，你可以简单的复制打包后的文件到你自己的服务器，只要稍微修改一下<code>index.html</code>页面即可达到同步更新且使用自己的存储服务的目的。</p>
<h2>修改静态资源路径</h2>
<p>如果你想和上一节一样保持和本仓库代码的同步更新，但是又想修改静态资源的存放位置，比如默认的层级关系为：</p>
<pre class="hljs"><code>-dist
--css
--fonts
--img
--js
-logo.ico

-index.html
</code></pre>
<p>而你想调整成这样：</p>
<pre class="hljs"><code>-assets
--dist
---css
---fonts
---img
---js
-logo.ico

-index.html
</code></pre>
<p>那么你可以将<code>index.html</code>中的<code>window.externalPublicPath</code>配置由默认的<code>./dist/</code>修改为：</p>
<pre class="hljs"><code><span class="hljs-built_in">window</span>.externalPublicPath = <span class="hljs-string">&#x27;./assets/dist/&#x27;</span>
</code></pre>
<p>同时<code>index.html</code>中内联的<code>.ico</code>、<code>.js</code>、<code>.css</code>资源的路径需要你手动修改。</p>
<p>需要注意的是，<code>dist</code>目录内的目录层级关系最好不要调整，否则可能会出现异常。</p>
<p>如果你想替换其中的一些静态资源，比如你想将主题图片和结构的图片替换成你自己设计的图片，那么可以直接同名覆盖。</p>

  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>