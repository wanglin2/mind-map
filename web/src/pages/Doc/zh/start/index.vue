<template>
  <div>
    <h1>开始</h1>
<h2>开发</h2>
<h3>本地开发</h3>
<pre class="hljs"><code>git <span class="hljs-built_in">clone</span> https://github.com/wanglin2/mind-map.git
<span class="hljs-built_in">cd</span> simple-mind-map
npm i
npm link
<span class="hljs-built_in">cd</span> ..
<span class="hljs-built_in">cd</span> web
npm i
npm link simple-mind-map
npm run serve
</code></pre>
<h3>打包库</h3>
<p>自<code>0.2.0</code>版本开始增加了对核心库<code>simple-mind-map</code>的打包，复用了示例项目<code>web</code>的打包工具。</p>
<pre class="hljs"><code><span class="hljs-built_in">cd</span> web
npm run buildLibrary
</code></pre>
<p><code>simple-mind-map</code>库的<code>package.json</code>文件提供了两个导出字段：</p>
<pre class="hljs"><code>{
  <span class="hljs-attr">&quot;module&quot;</span>: <span class="hljs-string">&quot;index.js&quot;</span>,
  <span class="hljs-attr">&quot;main&quot;</span>: <span class="hljs-string">&quot;./dist/simpleMindMap.umd.min.js&quot;</span>,
}
</code></pre>
<p>支持<code>module</code>字段的环境会以<code>index.js</code>为入口，否则会以打包后的<code>simpleMindMap.umd.min.js</code>为入口。</p>
<h3>打包demo</h3>
<pre class="hljs"><code><span class="hljs-built_in">cd</span> web
npm run build
</code></pre>
<p>会自动把<code>index.html</code>移动到根目录。</p>
<h2>安装</h2>
<pre class="hljs"><code>npm i simple-mind-map
</code></pre>
<p><code>0.2.0</code>版本之前的注意事项：</p>
<blockquote>
<p>注意：本项目为源码直接发布，并未进行打包，如果出现编译失败的情况，Vue CLI创建的项目可以在vue.config.js文件中增加如下配置来让babel-loader编译本依赖：</p>
<pre class="hljs"><code><span class="hljs-built_in">module</span>.exports = {
     <span class="hljs-attr">transpileDependencies</span>: [<span class="hljs-string">&#x27;simple-mind-map&#x27;</span>]
}
</code></pre>
<p>其他项目请自行修改打包配置。</p>
</blockquote>
<h2>问题</h2>
<h3>1.在Vite中使用报错，提示xml-js依赖出错</h3>
<p>解决方法：使用如下引入方式：</p>
<pre class="hljs"><code><span class="hljs-keyword">import</span> MindMap <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;simple-mind-map/dist/simpleMindMap.umd.min&quot;</span>
</code></pre>
<p><code>simple-mind-map</code>包提供未打包的入口字段<code>module</code>，依赖的<code>xml-js</code>包需要引入<code>node</code>环境下的包，所以在<code>Vite</code>中获取不到会报错，所以指定引入打包后的入口，相关包都已打包进产物，所以不会报错。</p>
<p>如果需要二次开发，也就是必须要使用未打包代码的话，如果你不需要解析<code>xmind</code>文件的话，可以去除<code>xmind</code>模块，如果需要的话那么可以尝试换成其他的解析<code>xml</code>为<code>json</code>的库。</p>
<h3>2.报错<code>Getting bbox of element &quot;text&quot; is not possible: TypeError: Cannot read properties of undefined (reading 'apply')</code></h3>
<p>原因为安装的<code>@svgdotjs/svg.js</code>版本太高，手动降到<code>3.0.16</code>版本即可。</p>

  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>