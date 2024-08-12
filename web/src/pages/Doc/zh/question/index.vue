<template>
  <div>
    <h1>常见问题</h1>
<h2>1.在Vite中使用报错，提示xml-js依赖出错</h2>
<p>解决方法：使用如下引入方式：</p>
<pre class="hljs"><code><span class="hljs-keyword">import</span> MindMap <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;simple-mind-map/dist/simpleMindMap.umd.min&quot;</span>
</code></pre>
<p><code>simple-mind-map</code>包提供未打包的入口字段<code>module</code>，依赖的<code>xml-js</code>包需要引入<code>node</code>环境下的包，所以在<code>Vite</code>中获取不到会报错，所以指定引入打包后的入口，相关包都已打包进产物，所以不会报错。</p>
<p>如果需要二次开发，也就是必须要使用未打包代码的话，如果你不需要解析<code>xmind</code>文件的话，可以去除<code>xmind</code>模块，如果需要的话那么可以尝试换成其他的解析<code>xml</code>为<code>json</code>的库。</p>
<h2>2.报错<code>Getting bbox of element &quot;text&quot; is not possible: TypeError: Cannot read properties of undefined (reading 'apply')</code></h2>
<p>原因为安装的<code>@svgdotjs/svg.js</code>版本太高，手动降到<code>3.0.16</code>版本即可。</p>
<h2>3.TypeError: Cannot read properties of undefined (reading 'prototype') at sax.js:222:46</h2>
<p>可以在打包配置文件中增加如下配置：</p>
<pre class="hljs"><code>resolve: { <span class="hljs-attr">alias</span>: { <span class="hljs-attr">stream</span>: <span class="hljs-string">&quot;stream-browserify&quot;</span> } }
</code></pre>
<p>不同的打包工具可能具体配置不一样，原理就是排除<code>stream</code>依赖。</p>
<h2>4.点击【新建】、【打开】、【另存为】按钮时提示浏览器不支持，或者非https协议。</h2>
<p>浏览器上操作电脑本地文件使用的是<a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Window/showOpenFilePicker">window.showOpenFilePicker</a>api，如果不支持，要么是浏览器不支持这个API，要么是因为页面非https协议，你可以按F12，或者在页面通过鼠标右键菜单中的【检查】打开浏览器控制台，在其中的【控制台】或【console】tab中输入<code>window.showOpenFilePicker</code>按回车，如果返回<code>undefined</code>则代表不支持，如果返回的不是这个，而页面依旧提示提示浏览器不支持，或者非https协议，那么可以提交issue，或者联系作者。</p>
<h2>5.引入simple-mind-map报错，报错信息如下：</h2>
<img src="../../../../assets/img/docs/错误.jpg" style="width: 850px" />
<p>这是因为你的构建环境不支持该js语法，该语法出自<code>@svgdotjs/svg.js</code>库，解决方法如下：</p>
<p>1.手动降低<code>@svgdotjs/svg.js</code>库的版本，你可以在你的项目中手动安装低版本，比如：<code>npm i @svgdotjs/svg.js@3.2.0</code></p>
<p>2.不降低版本的话，可以通过修改你的构建工具的相关配置，修改<code>babel</code>的配置，让它编译一下<code>node_modules</code>中的<code>simple-mind-map</code>库，或<code>@svgdotjs/svg.js</code>库，如果用的是<code>vue-cli</code>或<code>vite</code>，它们也直接提供了相关配置。另外需要安装编译该语法的<code>babel</code>插件，并且配置到<code>babel</code>的配置文件中：</p>
<p><code>@babel/plugin-proposal-nullish-coalescing-operator</code>、<code>@babel/plugin-proposal-optional-chaining</code>。</p>

  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>