<template>
  <div>
    <h1>Cooperate 插件 beta</h1>
<blockquote>
<p>v0.7.3+</p>
</blockquote>
<p>该插件用于实现协同编辑。</p>
<h2>介绍</h2>
<p>该插件通过<a href="https://github.com/yjs/yjs">Yjs</a>实现协同编辑，基本原理是将思维导图的树数据转成平级的对象数据，然后通过<a href="https://docs.yjs.dev/api/shared-types/y.map">Y.Map</a>类型的共享数据进行协同，即当画布上进行了某些操作后会更新<code>y.map</code>对象，然后其他协同的客户端会接收到更新后的数据，再转换回树结构数据，更新画布即可实现实时更新。</p>
<p>要实现协同，后端是少不了的，<code>Yjs</code>提供了一些<a href="https://docs.yjs.dev/ecosystem/connection-provider">Connection Provider</a>。同时也提供了后端的示例，但只是最简单的实现，实际项目中你应该需要重写或完善。</p>
<p>你可以选择适合自己的<code>Provider</code>，默认使用的是<a href="https://github.com/yjs/y-webrtc">y-webrtc</a>。</p>
<h2>demo</h2>
<p>如果你想通过demo来尝试一下可以通过以下步骤：</p>
<ol>
<li>克隆项目及安装依赖：</li>
</ol>
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
<ol start="2">
<li>修改<code>web/src/pages/Edit/components/Edit.vue</code>文件</li>
</ol>
<p>注册协同插件，即取消该行注释：</p>
<pre class="hljs"><code><span class="hljs-comment">// .usePlugin(Cooperate)// 协同插件</span>
</code></pre>
<p>将信令服务器地址改为你本机的ip：</p>
<pre class="hljs"><code><span class="hljs-comment">// cooperateTest 函数</span>

<span class="hljs-attr">signalingList</span>: [<span class="hljs-string">&#x27;ws://【你的ip】:4444&#x27;</span>]
</code></pre>
<ol start="3">
<li>启动demo项目的本地服务：</li>
</ol>
<pre class="hljs"><code>// web路径下执行
npm run serve
</code></pre>
<ol start="4">
<li>启动信令服务器：</li>
</ol>
<pre class="hljs"><code>// simple-mind-map路径下执行
npm run wsServe
</code></pre>
<p>该命令执行的是<code>simple-mind-map/bin/wsServer.mjs</code>文件，该文件的内容是从<a href="https://github.com/yjs/y-webrtc">y-webrtc</a>仓库直接复制的，可能并不完善，请谨慎用于实际项目。</p>
<ol start="5">
<li>在两个浏览器中访问服务地址：</li>
</ol>
<pre class="hljs"><code>http://【你的ip】:8080/#/?userName=用户名
</code></pre>
<p>你可以在不同的浏览器上设置不同的userName。然后就可以在一个浏览器中编辑，在另一个浏览器上看到自动更新了。</p>
<h2>注册</h2>
<pre class="hljs"><code><span class="hljs-keyword">import</span> MindMap <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;simple-mind-map&#x27;</span>
<span class="hljs-keyword">import</span> Cooperate <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;simple-mind-map/src/plugins/Cooperate.js&#x27;</span>
MindMap.usePlugin(Cooperate)
</code></pre>
<p>注册完且实例化<code>MindMap</code>后可通过<code>mindMap.cooperate</code>获取到该实例。</p>
<h2>方法</h2>
<h3>getDoc()</h3>
<p>获取Yjs doc实例。</p>
<h3>setProvider(provider, webrtcProviderConfig)</h3>
<ul>
<li>
<p><code>provider</code>：Yjs的连接提供者，可参考<a href="https://docs.yjs.dev/ecosystem/connection-provider">Connection Provider</a>，默认为<code>null</code></p>
</li>
<li>
<p><code>webrtcProviderConfig</code>：webrtc provider的配置参数，需要传递一个对象，格式如下：</p>
</li>
</ul>
<pre class="hljs"><code>{ 
    <span class="hljs-attr">roomName</span>: <span class="hljs-string">&#x27;&#x27;</span>, <span class="hljs-comment">// 必传，房间名称 </span>
    <span class="hljs-attr">signalingList</span>: [<span class="hljs-string">&#x27;&#x27;</span>],<span class="hljs-comment">// 必传，指定信令服务器</span>
    ...<span class="hljs-comment">// webrtc provider的其他配置</span>
}
</code></pre>
<p>详细配置可参考<a href="https://github.com/yjs/y-webrtc">y-webrtc</a>。</p>
<p>设置Yjs的连接提供者，<code>provider</code>如果不传，那么默认会使用<code>y-webrtc</code>，你也可以使用其他的<code>provider</code>。</p>
<p>如果使用默认的<code>y-webrtc</code>，那么需要通过第二个参数传入必要的配置。</p>
<p><code>simple-mind-map/bin/wsServer.mjs</code>文件提供了一个简单的信令服务器代码，可供测试和参考。</p>
<h3>setUserInfo(userInfo)</h3>
<ul>
<li><code>userInfo</code>：用户信息。格式如下：</li>
</ul>
<pre class="hljs"><code>{
   <span class="hljs-attr">id</span>: <span class="hljs-string">&#x27;&#x27;</span>,     <span class="hljs-comment">// 必传，用户唯一的id</span>
   <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;&#x27;</span>,   <span class="hljs-comment">// 用户名称。name和avatar两个只传一个即可，如果都传了，会显示avatar</span>
   <span class="hljs-attr">avatar</span>: <span class="hljs-string">&#x27;&#x27;</span>, <span class="hljs-comment">// 用户头像</span>
   <span class="hljs-attr">color</span>: <span class="hljs-string">&#x27;&#x27;</span>   <span class="hljs-comment">// 如果没有传头像，那么会以一个圆形来显示名称的第一个字，文字的颜色为白色，圆的颜色可以通过该字段设置</span>
}
</code></pre>
<p>设置当前用户的信息，用于感知数据的同步和显示。即如果其他协同人员激活了某个节点时，会在你当前画布中的该节点上方显示他的头像。</p>

  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>