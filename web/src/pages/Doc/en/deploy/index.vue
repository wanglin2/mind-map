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
<p>If you want to modify the path of the 'index. html' file referencing static resources, you can modify the 'publicPath' configuration of the 'web/vue.config.js' file. And the <code>window.externalPublicPath</code> config in <code>web/public/index.html</code> file.</p>
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
<blockquote>
<p>Thank you very much <a href="https://github.com/shuiche-it">水车</a>, This section is written by him, and the corresponding Docker package is also maintained by him.</p>
</blockquote>
<p>Install directly from Docker Hub:</p>
<pre class="hljs"><code>docker run -d -p 8081:8080 shuiche/mind-map:latest
</code></pre>
<p>Mindmap has activated port 8080 as the web service entry point in the container. When running the container through Docker, it is necessary to specify a local mapping port. In the above case, we mapped the local port 8081 to the container port 8080.</p>
<p>After the installation is completed, check the container's running status through 'Docker PS'.</p>
<p>Open 127.0.0.1:8081 in the browser to use the Web mind map function.</p>
<p><a href="https://laosu.gq/2023/09/02/%E5%BC%BA%E5%A4%A7%E7%9A%84%E6%80%9D%E7%BB%B4%E5%AF%BC%E5%9B%BE%E5%BA%93SimpleMindMap/">在群晖上以 Docker 方式安装</a></p>
<h2>Docking with one's own storage services</h2>
<p>The application data is stored locally in the browser by default, and the local storage capacity of the browser is relatively small, so it is easy to trigger restrictions when inserting more images in the mind map. Therefore, a better choice is to dock with your own storage service, which usually has two ways:</p>
<h3>The first</h3>
<p>Simply clone the warehouse code and modify the relevant methods in 'web/src/API/index.js' to obtain data from your database and store it in your data.</p>
<h3>The second</h3>
<p>Many times, you may want to always use the latest code from this repository, so the first method is not very convenient because you need to manually merge the code, so the second method is provided.</p>
<p>Specific operating steps:</p>
<ol>
<li>Copy the packaged resources of the web application</li>
</ol>
<p>This includes the 'dist' directory and the 'index.html' file.</p>
<ol start="2">
<li>Modify the copied 'index.html' file</li>
</ol>
<p>Firstly, insert the following code into the 'head' tag:</p>
<pre class="hljs"><code>&lt;script&gt;
  <span class="hljs-built_in">window</span>.takeOverApp = <span class="hljs-literal">true</span>
&lt;/script&gt;
</code></pre>
<p>This line of code will prompt the application not to initialize the application 'i.e.: new Vue()', but to give control to you. Next, insert your own 'js' code at the end of the 'body', either inline or out of chain. The inline example is as follows:</p>
<pre class="hljs"><code>&lt;script&gt;
  <span class="hljs-comment">// Your own method of requesting data</span>
  <span class="hljs-keyword">const</span> getDataFromBackend = <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
      <span class="hljs-built_in">setTimeout</span>(<span class="hljs-function">() =&gt;</span> {
        resolve({
          <span class="hljs-comment">// MindMap data</span>
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
          <span class="hljs-comment">// Page language, supporting Chinese (zh) and English (en)</span>
          <span class="hljs-attr">lang</span>: <span class="hljs-string">&#x27;zh&#x27;</span>,
          <span class="hljs-comment">// Page Section Configuration</span>
          <span class="hljs-attr">localConfig</span>: <span class="hljs-literal">null</span>
        })
      }, <span class="hljs-number">200</span>)
    })
  }
  <span class="hljs-comment">// Register Global Method</span>
  <span class="hljs-keyword">const</span> setTakeOverAppMethods = <span class="hljs-function">(<span class="hljs-params">data</span>) =&gt;</span> {
    <span class="hljs-built_in">window</span>.takeOverAppMethods = {}
    <span class="hljs-comment">// Function for obtaining mind map data</span>
    <span class="hljs-built_in">window</span>.takeOverAppMethods.getMindMapData = <span class="hljs-function">() =&gt;</span> {
      <span class="hljs-keyword">return</span> data.mindMapData
    } 
    <span class="hljs-comment">// Functions for Saving Mind Map Data</span>
    <span class="hljs-built_in">window</span>.takeOverAppMethods.saveMindMapData = <span class="hljs-function">(<span class="hljs-params">data</span>) =&gt;</span> {
      <span class="hljs-built_in">console</span>.log(data)
      <span class="hljs-comment">// The trigger frequency of this function may be high, so you should do throttling or anti shaking measures</span>
    }
    <span class="hljs-comment">// Function to obtain language</span>
    <span class="hljs-built_in">window</span>.takeOverAppMethods.getLanguage = <span class="hljs-function">() =&gt;</span> {
      <span class="hljs-keyword">return</span> data.lang
    }
    <span class="hljs-comment">// Functions for Saving Languages</span>
    <span class="hljs-built_in">window</span>.takeOverAppMethods.saveLanguage = <span class="hljs-function">(<span class="hljs-params">lang</span>) =&gt;</span> {
      <span class="hljs-built_in">console</span>.log(lang)
    }
    <span class="hljs-comment">// Get locally configured functions</span>
    <span class="hljs-built_in">window</span>.takeOverAppMethods.getLocalConfig = <span class="hljs-function">() =&gt;</span> {
      <span class="hljs-keyword">return</span> data.localConfig
    }
    <span class="hljs-comment">// Save locally configured functions</span>
    <span class="hljs-built_in">window</span>.takeOverAppMethods.saveLocalConfig = <span class="hljs-function">(<span class="hljs-params">config</span>) =&gt;</span> {
      <span class="hljs-built_in">console</span>.log(config)
    }
  }
  <span class="hljs-built_in">window</span>.onload = <span class="hljs-keyword">async</span> () =&gt; {
    <span class="hljs-keyword">if</span> (!<span class="hljs-built_in">window</span>.takeOverApp) <span class="hljs-keyword">return</span>
    <span class="hljs-comment">// request data</span>
    <span class="hljs-keyword">const</span> data = <span class="hljs-keyword">await</span> getDataFromBackend()
    <span class="hljs-comment">// Method for setting global</span>
    setTakeOverAppMethods(data)
    <span class="hljs-comment">// Mind Map Instance Creation Completion Event</span>
    <span class="hljs-built_in">window</span>.$bus.$on(<span class="hljs-string">&#x27;app_inited&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">mindMap</span>) =&gt;</span> {
      <span class="hljs-built_in">console</span>.log(mindMap)
    })
    <span class="hljs-comment">// You can use window$ Bus$ On() to listen for some events in the application</span>
    <span class="hljs-comment">// Instantiate Page</span>
    <span class="hljs-built_in">window</span>.initApp()
  }
&lt;/script&gt;
</code></pre>
<p>As shown above, when you set the 'window.takeOverApp=true' flag, the application will no longer actively instantiate, but will expose the instantiated methods for you to call. You can first request the data of the mind map from the backend, and then register the relevant methods. The application will call internally at the appropriate time to achieve the purpose of echo and save.</p>
<p>The advantage of doing this is that whenever the code in this repository is updated, you can simply copy the packaged files to your own server. With a slight modification of the 'index. html' page, you can achieve synchronous updates and use your own storage service.</p>
<h2>Modifying Static Resource Paths</h2>
<p>If you want to maintain synchronous updates with the code in this repository as in the previous section, but also want to modify the storage location of static resources, for example, the default hierarchical relationship is:</p>
<pre class="hljs"><code>-dist
--css
--fonts
--img
--js
-logo.ico

-index.html
</code></pre>
<p>And you want to adjust it to this:</p>
<pre class="hljs"><code>-assets
--dist
---css
---fonts
---img
---js
-logo.ico

-index.html
</code></pre>
<p>So you can configure the 'window.externalPublicPath' in 'index.html' as the default <code>./dist/</code> is modified to:</p>
<pre class="hljs"><code><span class="hljs-built_in">window</span>.externalPublicPath = <span class="hljs-string">&#x27;./assets/dist/&#x27;</span>
</code></pre>
<p>At the same time, the paths of the inline '.ico', '.js', and '.css' resources in 'index.html' need to be manually modified by you.</p>
<p>It should be noted that it is best not to adjust the directory hierarchy within the 'dist' directory, otherwise exceptions may occur.</p>
<p>If you want to replace some of the static resources, such as the theme image and structure image, with your own designed image, you can directly overwrite it with the same name.</p>

  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>