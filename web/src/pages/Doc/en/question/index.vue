<template>
  <div>
    <h1>Questions</h1>
<h2>1.Error when using in Vite, indicating xml-js dependency error</h2>
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
<h2>2.Error <code>Getting bbox of element &quot;text&quot; is not possible: TypeError: Cannot read properties of undefined (reading 'apply')</code></h2>
<p>The reason is that the installed version of <code>@svgdotjs/svg.js</code> is too high. You can manually reduce it to the version of <code>3.0.16</code>.</p>
<h2>3.TypeError: Cannot read properties of undefined (reading 'prototype') at sax.js:222:46</h2>
<p>The following configurations can be added to the packaging configuration file:</p>
<pre class="hljs"><code>resolve: { <span class="hljs-attr">alias</span>: { <span class="hljs-attr">stream</span>: <span class="hljs-string">&quot;stream-browserify&quot;</span> } }
</code></pre>
<p>Different packaging tools may have different specific configurations, with the principle of excluding 'stream' dependencies.</p>
<h2>4.When clicking the [New], [Open], or [Save As] buttons, it will prompt that the browser does not support it or is not using the HTTPS protocol.</h2>
<p>The browser uses API <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Window/showOpenFilePicker">window.showOpenFilePicker</a> to operate local files on the computer. If it is not supported, either the browser does not support this API or the page is not using the HTTPS protocol, You can press F12, or open the browser console through the right-click menu on the page and enter 'window.showOpenFilePicker' in the 'Console' tab. If it returns 'undefined', it means it is not supported. If it does not return this message and the page still prompts that the browser does not support it or is not using the HTTPS protocol, you can submit an issue or contact the author.</p>
<h2>5.Import simple-mind-map error message, the error message is as follows:</h2>
<img src="../../../../assets/img/docs/错误.jpg" style="width: 850px" />
<p>This is because your build environment does not support this JavaScript syntax, which comes from the '@svgdotjs/svg.js' library. The solution is as follows:</p>
<p>1.Manually reduce the version of the '@svgdotjs/svg.js' library. You can manually install the lower version in your project, such as: <code>npm i @svgdotjs/svg.js@3.2.0</code></p>
<p>2.If you don't reduce the version, you can modify the relevant configuration of your build tool, modify the configuration of 'babel', and have it compile the 'simple-mind-map' library in 'node.modules' or the  '@svgdotjs/svg.js' library. If you are using 'vue-cli' or 'vite', they also provide the relevant configuration directly. In addition, it is necessary to install the 'babel' plugin that compiles this syntax and configure it in the 'babel' configuration file:</p>
<p><code>@babel/plugin-proposal-nullish-coalescing-operator</code>、<code>@babel/plugin-proposal-optional-chaining</code>。</p>

  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>