<template>
  <div>
    <h1>如何开发一个插件</h1>
<p>库本身提供了一些插件，如果满足不了你的需求，你也可以自己开发一个新插件。</p>
<p>想要开发一个插件，你肯定需要对库的实现原理、模块划分、目录结构等等有一定了解，简而言之，需要你对库的源码有一定程度的熟悉，所以如果还没看过，现在就可以先去阅读一下，好消息是，本库的源码并不复杂，相信你一定能看懂。</p>
<p>在你决定动手之前，最好先看一下内部插件是如何实现的。</p>
<p>一个插件就是一个类：</p>
<pre class="hljs"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">YourPlugin</span> </span>{
    <span class="hljs-function"><span class="hljs-title">constructor</span>(<span class="hljs-params">{ mindMap }</span>)</span> {
        <span class="hljs-built_in">this</span>.mindMap = mindMap
    }

    <span class="hljs-comment">// 插件被移除前做的事情</span>
    <span class="hljs-function"><span class="hljs-title">beforePluginRemove</span>(<span class="hljs-params"></span>)</span> {
        
    }

    <span class="hljs-comment">// 插件被卸载前做的事情</span>
    <span class="hljs-function"><span class="hljs-title">beforePluginDestroy</span>(<span class="hljs-params"></span>)</span> {
        
    }
}

Scrollbar.instanceName = <span class="hljs-string">&#x27;yourPlugin&#x27;</span>
</code></pre>
<p>实例化插件时会传入思维导图实例，你可以保存起来，后续可以通过它来监听方法或调用实例的方法，甚至是其他插件的方法。</p>
<p>需要给插件类添加一个静态属性<code>instanceName</code>，会将你的插件实例通过该属性保存到思维导图实例上，外部或其他插件想要获取你的插件实例时都需要通过该属性：</p>
<pre class="hljs"><code>mindMap.yourPlugin.xxx
</code></pre>
<p>插件存在两个生命周期函数：</p>
<p><code>beforePluginRemove</code>生命周期会在思维导图实例调用<code>removePlugin</code>方法时调用，代表思维导图实例并没有销毁，只是移除该插件。</p>
<p><code>beforePluginDestroy</code>生命周期会在销毁思维导图时调用，此时思维导图实例也会被销毁。</p>
<pre class="hljs"><code>mindMap.removePlugin(YourPlugin)
</code></pre>
<p>你也可以继承内部的一些插件：</p>
<pre class="hljs"><code><span class="hljs-keyword">import</span> ScrollbarPlugin <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;simple-mind-map/src/plugins/Scrollbar.js&#x27;</span>

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">YourPlugin</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">ScrollbarPlugin</span> </span>{
    <span class="hljs-function"><span class="hljs-title">constructor</span>(<span class="hljs-params">opt</span>)</span> {
        <span class="hljs-built_in">super</span>(opt)
    }
}

Scrollbar.instanceName = <span class="hljs-string">&#x27;yourPlugin&#x27;</span>
</code></pre>
<p>插件的原理无非是监听一些你需要的事件，然后调用一些你需要的方法来完成一些功能，其实没啥好多说的，建议看一下内部插件的实现。</p>
<p>当你完成了一个插件后，你可以考虑发布到<code>npm</code>，提供给其他开发者使用。</p>

  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>