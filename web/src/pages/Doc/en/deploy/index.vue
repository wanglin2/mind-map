<template>
  <div>
    <h1>Deploy</h1>
<p>The 'web' directory of this project provides a complete project developed based on the 'simple mind map' library, 'Vue2. x', and 'ElementUI'. The data is stored locally on the computer by default, and can also be manipulated locally on the computer. Originally intended as an online 'demo', it can also be directly used as an online version of the mind map application, online address: <a href="https://wanglin2.github.io/mind-map/">https://wanglin2.github.io/mind-map/</a>.</p>
<p>If your network environment is slow to access the 'GitHub' service, you can also deploy it to your server.</p>
<h2>Deploying to a static file server</h2>
<p>The project itself does not rely on the backend, so it can be deployed to a static file server. The following commands can be executed in sequence:</p>
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
<p>Then you can choose to start the local service:</p>
<pre class="hljs"><code>npm run serve
</code></pre>
<p>You can also directly package and generate construction products:</p>
<pre class="hljs"><code>npm run build
</code></pre>
<p>The packaged entry page 'index.html' can be found in the project root directory, and the corresponding static resources are located in the 'dist' directory under the root directory. The 'html' file will access the resources in the 'dist' directory through relative paths, such as 'dist/xxx'. You can directly upload these two files or directories to your static file server. In fact, this project is deployed to 'GitHub Pages' in this way.</p>
<p>If you do not have any code modification requirements, it is also possible to directly copy these files from this repository.</p>
<p>If you want to package 'index.html' into the 'dist' directory as well, you can modify the 'scripts.build' command in the 'web/package.json' file to delete '&amp;&amp; node ../copy.js' from 'vue-cli-service build &amp;&amp; node ../copy.js'.</p>
<p>If you want to modify the directory for packaging output, you can modify the 'outputDir' configuration of the 'web/vue.config.js' file to the path you want to output.</p>
<p>If you want to modify the path of the 'index. html' file referencing static resources, you can modify the 'publicPath' configuration of the 'web/vue.config.js' file.</p>
<p>In addition, the default route used is 'hash ', which means that there will be '#'in the path. If you want to use the 'history' route, you can modify the 'web/src/router.js' file to:</p>
<pre class="hljs"><code><span class="hljs-keyword">const</span> router = <span class="hljs-keyword">new</span> VueRouter({
  routes
})
</code></pre>
<p>Change to:</p>
<pre class="hljs"><code><span class="hljs-keyword">const</span> router = <span class="hljs-keyword">new</span> VueRouter({
  <span class="hljs-attr">mode</span>: <span class="hljs-string">&#x27;history&#x27;</span>,
  routes
})
</code></pre>
<p>However, this requires backend support, as our application is a single page client application. If the backend is not properly configured, users will return 404 when accessing sub routes directly in the browser. Therefore, you need to add a candidate resource on the server that covers all situations: if the 'URL' cannot match any static resources, the same 'index. html' page should be returned.</p>
<h2>Docker</h2>
<p>In writing...</p>

  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>