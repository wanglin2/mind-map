<template>
  <div>
    <h1>Cooperate plugin beta</h1>
<blockquote>
<p>v0.7.3+</p>
</blockquote>
<p>This plugin is used to achieve collaborative editing.</p>
<h2>Introduce</h2>
<p>This plugin implements collaborative editing through <a href="https://github.com/yjs/yjs">Yjs</a>. The basic principle is to convert the tree data of the mind map into flat object data, and then collaborate through shared data of type <a href="https://docs.yjs.dev/api/shared-types/y.map">Y.Map</a>. That is, when certain operations are performed on the canvas, the 'y.map' object will be updated, and other collaborative clients will receive the updated data, convert it back to tree structure data, and update the canvas to achieve real-time updates.</p>
<p>To achieve collaboration, the backend is indispensable, and 'Yjs' provides some <a href="https://docs.yjs.dev/ecosystem/connection-provider">Connection Providers</a>. At the same time, it also provides examples of the backend, but it is only the simplest implementation. In actual projects, you should need to rewrite or improve it.</p>
<p>You can choose the 'Provider' that suits you, and the default is <a href="https://github.com/yjs/y-webrtc">y-webrtc</a>.</p>
<h2>demo</h2>
<p>If you want to try it through demo, you can do the following steps:</p>
<ol>
<li>Clone project and installation dependencies:</li>
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
<li>Modify <code>web/src/pages/Edit/components/Edit.vue</code> file</li>
</ol>
<p>To register Cooperate plugin, uncomment the line:</p>
<pre class="hljs"><code><span class="hljs-comment">// .usePlugin(Cooperate)// Cooperate plugin</span>
</code></pre>
<p>Change the signaling server address to your local IP:</p>
<pre class="hljs"><code><span class="hljs-comment">// cooperateTest function</span>

<span class="hljs-attr">signalingList</span>: [<span class="hljs-string">&#x27;ws://【your ip】:4444&#x27;</span>]
</code></pre>
<ol start="3">
<li>To register a collaborative plugin, uncomment the line:</li>
</ol>
<pre class="hljs"><code>// Execute under web path
npm run serve
</code></pre>
<ol start="4">
<li>Start signaling server:</li>
</ol>
<pre class="hljs"><code>// Execute under simple-mind-map path
npm run wsServe
</code></pre>
<p>The command executes the 'simple mind map/bin/wsServer.mjs' file, which is directly copied from the <a href="https://github.com/yjs/y-webrtc">y webrtc</a> repository and may not be complete. Please be cautious when using it for actual projects.</p>
<ol start="5">
<li>Access the service address in two browsers:</li>
</ol>
<pre class="hljs"><code>http://【your ip】:8080/#/?userName=userName
</code></pre>
<p>You can set different userNames on different browsers. Then you can edit in one browser and see the automatic update in another browser.</p>
<h2>Register</h2>
<pre class="hljs"><code><span class="hljs-keyword">import</span> MindMap <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;simple-mind-map&#x27;</span>
<span class="hljs-keyword">import</span> Cooperate <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;simple-mind-map/src/plugins/Cooperate.js&#x27;</span>
MindMap.usePlugin(Cooperate)
</code></pre>
<p>After registration and instantiation of <code>MindMap</code>, the instance can be obtained through <code>mindMap.cooperate</code>.</p>
<h2>Methods</h2>
<h3>getDoc()</h3>
<p>Obtain Yjs doc instance.</p>
<h3>setProvider(provider, webrtcProviderConfig)</h3>
<ul>
<li>
<p><code>provider</code>: The connection provider for Yjs can refer to the <a href="https://docs.yjs.dev/ecosystem/connection-provider">Connection Provider</a>, default is <code>null</code></p>
</li>
<li>
<p><code>webrtcProviderConfig</code>: the options of webrtc provider, An object needs to be passed in the following format:</p>
</li>
</ul>
<pre class="hljs"><code>{ 
    <span class="hljs-attr">roomName</span>: <span class="hljs-string">&#x27;&#x27;</span>, <span class="hljs-comment">// Mandatory, room name</span>
    <span class="hljs-attr">signalingList</span>: [<span class="hljs-string">&#x27;&#x27;</span>],<span class="hljs-comment">// Mandatory, specify signaling server</span>
    ...<span class="hljs-comment">// The other config of webrtc provider</span>
}
</code></pre>
<p>For detailed configuration, please refer to <a href="https://github.com/yjs/y-webrtc">y-webrtc</a>。</p>
<p>Set the connection provider for Yjs. If 'provider' is not transmitted, 'y webrtc' will be used by default. You can also use other 'providers'.</p>
<p>If the default 'y webrtc' is used, the necessary configuration needs to be passed in through the second parameter.</p>
<p><code>simple-mind-map/bin/wsServer.mjs</code> file provides a simple signaling server code for testing and reference.</p>
<h3>setUserInfo(userInfo)</h3>
<ul>
<li><code>userInfo</code>: User information. The format is as follows:</li>
</ul>
<pre class="hljs"><code>{
   <span class="hljs-attr">id</span>: <span class="hljs-string">&#x27;&#x27;</span>,     <span class="hljs-comment">// Mandatory, user&#x27;s unique ID</span>
   <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;&#x27;</span>,   <span class="hljs-comment">// User name. Only one name and avatar can be transmitted. If both are transmitted, avatar will be displayed</span>
   <span class="hljs-attr">avatar</span>: <span class="hljs-string">&#x27;&#x27;</span>, <span class="hljs-comment">// User profile</span>
   <span class="hljs-attr">color</span>: <span class="hljs-string">&#x27;&#x27;</span>   <span class="hljs-comment">// If there is no avatar, the first character of the name will be displayed as a circle, and the color of the text will be white. The color of the circle can be set through this field</span>
}
</code></pre>
<p>Set the current user's information for synchronization and display of perceptual data. If other collaborators activate a node, their avatar will be displayed above that node in your current canvas.</p>

  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>