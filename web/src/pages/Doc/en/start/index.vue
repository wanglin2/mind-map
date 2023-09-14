<template>
  <div>
    <h1>Start</h1>
<h2>Installation</h2>
<blockquote>
<p>Things to note before version 0.2.0:</p>
</blockquote>
<pre class="hljs"><code>npm i simple-mind-map
</code></pre>
<p><code>0.2.0</code> Notes for previous versions:</p>
<blockquote>
<p>Note: This project is directly published in source code form and has not been
packaged. If compilation fails, a Vue CLI-created project can add the
following configuration to the vue.config.js file to allow babel-loader to
compile this dependency:</p>
<pre class="hljs"><code><span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">transpileDependencies</span>: [<span class="hljs-string">&quot;simple-mind-map&quot;</span>],
};
</code></pre>
<p>Other projects should modify the packaging configuration as needed.</p>
</blockquote>
<h2>Usage</h2>
<blockquote>
<p>The <code>web</code> directory of this repository provides a complete project based on <code>Vue2</code>. If you encounter any doubts about using it, you can refer to the implementation of this project.</p>
</blockquote>
<blockquote>
<p>To learn about its use in other frameworks, you can refer to the following unofficial implementations:</p>
<p>1.<a href="https://github.com/huangyuanyin/hyy-vue3-mindMap">https://github.com/huangyuanyin/hyy-vue3-mindMap</a>: A mind map based on Vue3.2+ElementPlus.</p>
</blockquote>
<p>Firstly, provide a container element with a width and height not equal to 0:</p>
<pre class="hljs"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;mindMapContainer&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p>Also, set the <code>CSS</code> style again:</p>
<pre class="hljs"><code><span class="hljs-selector-id">#mindMapContainer</span> * {
  <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
}
</code></pre>
<p>Then introduce the <code>simple-mind-map</code> library and create an instance:</p>
<pre class="hljs"><code><span class="hljs-keyword">import</span> MindMap <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;simple-mind-map&quot;</span>;

<span class="hljs-keyword">const</span> mindMap = <span class="hljs-keyword">new</span> MindMap({
  <span class="hljs-attr">el</span>: <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">&#x27;mindMapContainer&#x27;</span>),
  <span class="hljs-attr">data</span>: {
    <span class="hljs-string">&quot;data&quot;</span>: {
        <span class="hljs-string">&quot;text&quot;</span>: <span class="hljs-string">&quot;Root Node&quot;</span>
    },
    <span class="hljs-string">&quot;children&quot;</span>: []
  }
});
</code></pre>
<p>This will result in a mind map.</p>
<p>If you want to implement a complete mind map, you usually need to develop some UI interfaces to achieve more functions through the interfaces provided by the <code>simple-mind-map</code> library.</p>
<p><code>simple-mind-map</code> supports rich configurations, events, commands, and some additional plugin extensions. Read the subsequent documentation to learn more.</p>
<p>The non-packaged 'ES' module is introduced by default, and only contains core functions, not unregistered plugin content, which can effectively reduce the size. However, you need to configure the <code>babel</code> compilation <code>simple mind-map</code> in your project to prevent some newer <code>js</code> syntax some browsers not supporting it.</p>
<p>If you need a file in the format of <code>umd</code> module, such as <code>CDN</code> in the browser, Then you can find the <code>simpleMindMap.umd.min.js</code> file and <code>simpleMindMap.css</code> file in the <code>/simple-mind-map/dist/</code> directory, copy it to your project, and then import it into the page:</p>
<pre class="hljs"><code><span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">&quot;stylesheet&quot;</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;simpleMindMap.css&quot;</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">scr</span>=<span class="hljs-string">&quot;simpleMindMap.umd.min.js&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<p>A global variable <code>window.simpleMindMap</code> will be created. you can get <code>MindMap</code> constructor by <code>window.simpleMindMap.default</code>, for more detail info you can log <code>window.simpleMindMap</code>.</p>
<p>The disadvantage of this method is that it will contain all the content, including the plugins you have not registered, so the overall volume will be relatively large.</p>
<p>（v0.5.4+）If you want to use the <code>ES</code> module directly on the browser side, you can find the <code>simpleMindMap.esm.js</code> and <code>simpleMindMap.esm.css</code> files in the <code>/simple-mind-map/dist/</code> directory.</p>
<h2>Development</h2>
<p>If you only use library, you don't need to read this section.</p>
<h3>Local Development</h3>
<pre class="hljs"><code>git <span class="hljs-built_in">clone</span> https://github.com/wanglin2/mind-map.git
<span class="hljs-built_in">cd</span> mind-map
<span class="hljs-built_in">cd</span> simple-mind-map
npm i
npm link
<span class="hljs-built_in">cd</span> ..
<span class="hljs-built_in">cd</span> web
npm i
npm link simple-mind-map
npm run serve
</code></pre>
<h3>Packaging the Library</h3>
<p>Since version <code>0.2.0</code>, we have added support for packaging the core library
simple-mind-map. This uses the same packaging tool as the sample project web.</p>
<pre class="hljs"><code><span class="hljs-built_in">cd</span> web
npm run buildLibrary
</code></pre>
<p>The packaging entry is <code>simple-mind-map/full.js</code>, which will introduce all plugins by default. If you don't need all plugins, you can modify the file to only introduce the plugins you need, which can reduce the size of the packaged file.</p>
<p>The <code>package.json</code> file in the <code>simple-mind-map</code> library provides two export
fields:</p>
<pre class="hljs"><code>{
  <span class="hljs-attr">&quot;module&quot;</span>: <span class="hljs-string">&quot;index.js&quot;</span>,
  <span class="hljs-attr">&quot;main&quot;</span>: <span class="hljs-string">&quot;./dist/simpleMindMap.umd.min.js&quot;</span>
}
</code></pre>
<p>Environments that support the <code>module</code> field will use <code>index.js</code> as the entry
point, otherwise the packed <code>simpleMindMap.umd.min.js</code> will be used as the entry
point.</p>
<h3>Compile the doc</h3>
<pre class="hljs"><code><span class="hljs-built_in">cd</span> web 
npm run buildDoc
</code></pre>
<h3>Packaging the Demo</h3>
<pre class="hljs"><code><span class="hljs-built_in">cd</span> web
npm run build
</code></pre>
<p>The <code>index.html</code> file will be automatically moved to the root directory.</p>
<h2>Problems</h2>
<h3>Error when using in Vite, indicating xml-js dependency error</h3>
<p>Solution: use the following import method:</p>
<pre class="hljs"><code><span class="hljs-keyword">import</span> MindMap <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;simple-mind-map/dist/simpleMindMap.umd.min&quot;</span>;
</code></pre>
<p>The <code>simple-mind-map</code> package provides the unpacked entry field <code>module</code>, and
the <code>xml-js</code> package dependency needs to import the package in the <code>node</code>
environment. Therefore, it cannot be obtained in <code>Vite</code> and an error will be
reported. Therefore, specify the import of the packed entry, and all relevant
packages are packed into the product, so there will be no error.</p>
<p>If you need to do further development, that is, you must use the unpacked code,
and if you do not need to parse the <code>xmind</code> file, you can remove the <code>xmind</code>
module. If you need it, you can try using other libraries to parse <code>xml</code> to
<code>json</code>.</p>
<h3>Error <code>Getting bbox of element &quot;text&quot; is not possible: TypeError: Cannot read properties of undefined (reading 'apply')</code></h3>
<p>The reason is that the installed version of <code>@svgdotjs/svg.js</code> is too high. You can manually reduce it to the version of <code>3.0.16</code>.</p>
<h3>TypeError: Cannot read properties of undefined (reading 'prototype') at sax.js:222:46</h3>
<p>The following configurations can be added to the packaging configuration file:</p>
<pre class="hljs"><code>resolve: { <span class="hljs-attr">alias</span>: { <span class="hljs-attr">stream</span>: <span class="hljs-string">&quot;stream-browserify&quot;</span> } }
</code></pre>
<p>Different packaging tools may have different specific configurations, with the principle of excluding 'stream' dependencies.</p>

  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>