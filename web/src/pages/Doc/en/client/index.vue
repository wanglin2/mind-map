<template>
  <div>
    <h1>Client</h1>
<p>This project also provides a client version using <a href="https://www.electronjs.org/">Electron</a> Development. Supports 'Windows', 'Mac', and 'Linux'.</p>
<p>Currently, the function is relatively simple:</p>
<ol>
<li>
<p>Support creating and opening files for editing;</p>
</li>
<li>
<p>Support viewing the list of recently edited files;</p>
</li>
<li>
<p>Support the copying, deletion, and renaming of files;</p>
</li>
</ol>
<h2>Download</h2>
<blockquote>
<p>The client version may lag behind the online version. To try new features, please prioritize using the online version.</p>
</blockquote>
<p>You can directly download the corresponding client for installation and use, and two download addresses are provided:</p>
<p>Github：<a href="https://github.com/wanglin2/mind-map/releases">releases</a>。</p>
<p>Baidu cloud disk：<a href="https://pan.baidu.com/s/1huasEbKsGNH2Af68dvWiOg?pwd=3bp3">地址</a>。</p>
<h2>Development</h2>
<p>If necessary, you can also conduct secondary development.</p>
<h3>clone</h3>
<pre class="hljs"><code>git <span class="hljs-built_in">clone</span> https://github.com/wanglin2/mind-map.git
<span class="hljs-built_in">cd</span> mind-map
git checkout electron
</code></pre>
<h3>Start serve</h3>
<p>Execute in the project root directory:</p>
<pre class="hljs"><code><span class="hljs-built_in">cd</span> simple-mind-map
npm i
npm link
<span class="hljs-built_in">cd</span> ..
<span class="hljs-built_in">cd</span> web
npm i
npm link simple-mind-map
npm run electron:serve
</code></pre>
<h3>Packaging client</h3>
<p>You need at least two computers, one 'Windows' and one 'Mac'.</p>
<p>Packaging 'Windows' application:</p>
<pre class="hljs"><code>npm run electron:build-win
</code></pre>
<p>Packaging 'Mac' application:</p>
<pre class="hljs"><code>npm run electron:build-mac
</code></pre>
<p>Packaging 'Linux' application:</p>
<pre class="hljs"><code>npm run electron:build-linux
</code></pre>
<p>Packaging all applications:</p>
<pre class="hljs"><code>npm run electron:build-all
</code></pre>
<p>Automatically pack according to your computer system:</p>
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