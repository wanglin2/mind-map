<template>
  <div>
    <h1>客户端</h1>
<p>本项目也提供了客户端版本，使用<a href="https://www.electronjs.org/">Electron</a>开发。支持<code>Windows</code>、<code>Mac</code>及<code>Linux</code>。</p>
<p>目前功能比较简单：</p>
<p>1.支持新建、打开文件进行编辑；</p>
<p>2.支持查看最近编辑文件列表；</p>
<p>3.支持文件的复制、删除、重命名；</p>
<h2>下载</h2>
<blockquote>
<p>客户端版本会落后于在线版本，要尝试新功能请优先使用在线版。</p>
</blockquote>
<p>你可以直接下载对应的客户端安装使用，提供了两个下载地址：</p>
<p>Github：<a href="https://github.com/wanglin2/mind-map/releases">releases</a>。</p>
<p>百度云盘：<a href="https://pan.baidu.com/s/1huasEbKsGNH2Af68dvWiOg?pwd=3bp3">地址</a>。</p>
<h2>开发</h2>
<p>如果有需要，你也可以进行二次开发。</p>
<h3>clone</h3>
<pre class="hljs"><code>git <span class="hljs-built_in">clone</span> https://github.com/wanglin2/mind-map.git
<span class="hljs-built_in">cd</span> mind-map
git checkout electron
</code></pre>
<h3>启动服务</h3>
<p>在项目根目录下执行：</p>
<pre class="hljs"><code><span class="hljs-built_in">cd</span> simple-mind-map
npm i
npm link
<span class="hljs-built_in">cd</span> ..
<span class="hljs-built_in">cd</span> web
npm i
npm link simple-mind-map
npm run electron:serve
</code></pre>
<h3>打包客户端</h3>
<p>你至少需要两台电脑，一台<code>Windows</code>和一台<code>Mac</code>。</p>
<p>打包<code>Windows</code>应用：</p>
<pre class="hljs"><code>npm run electron:build-win
</code></pre>
<p>打包<code>Mac</code>应用：</p>
<pre class="hljs"><code>npm run electron:build-mac
</code></pre>
<p>打包<code>Linux</code>应用：</p>
<pre class="hljs"><code>npm run electron:build-linux
</code></pre>
<p>打包全部应用：</p>
<pre class="hljs"><code>npm run electron:build-all
</code></pre>
<p>根据你的电脑系统自动打包：</p>
<pre class="hljs"><code>npm run electron:build
</code></pre>

  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>