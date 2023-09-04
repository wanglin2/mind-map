<template>
  <div>
    <h1>导入和导出</h1>
<h2>导出</h2>
<blockquote>
<p>要使用导出功能需要使用导出插件。</p>
</blockquote>
<p>目前支持导出为<code>.smm</code>、<code>.json</code>、<code>.svg</code>、<code>.png</code>、<code>.pdf</code>、<code>.md</code>、<code>.xmind</code>文件。</p>
<p><code>.smm</code>是<code>simple-mind-map</code>自己定义的一种文件，其实就是<code>json</code>文件，换了一个扩展名而已。</p>
<p>导出直接调用<code>export</code>方法即可：</p>
<pre class="hljs"><code>mindMap.export(type, isDownload, fileName, ...)
</code></pre>
<p><code>type</code>：文件类型</p>
<p><code>isDownload</code>：传<code>true</code>会触发下载，<code>false</code>则不会，函数会返回导出文件的数据，<code>data:url</code>格式，你可以自行下载，<code>pdf</code>不支持该参数，默认会直接下载。</p>
<p><code>fileName</code>：下载的文件名称</p>
<h3>导出为smm、json</h3>
<p>这两种文件的导出是一样的：</p>
<pre class="hljs"><code>mindMap.export(type, isDownload, fileName, withConfig)
</code></pre>
<p><code>withConfig</code>指定导出的数据中是否要包含节点数据外的配置数据，比如使用的布局、主题等，传<code>true</code>，导出的结构如下：</p>
<pre class="hljs"><code>{
    layout,
    root,
    <span class="hljs-attr">theme</span>: {
        template,
        config
    },
    view
}
</code></pre>
<p>如果传<code>false</code>，导出的数据只有<code>root</code>部分，也就是纯节点树。</p>
<p>示例：</p>
<pre class="hljs"><code>mindMap.export(<span class="hljs-string">&#x27;smm&#x27;</span>, <span class="hljs-literal">true</span>, <span class="hljs-string">&#x27;文件名&#x27;</span>, <span class="hljs-literal">true</span>)
mindMap.export(<span class="hljs-string">&#x27;json&#x27;</span>, <span class="hljs-literal">true</span>, <span class="hljs-string">&#x27;文件名&#x27;</span>, <span class="hljs-literal">false</span>)
</code></pre>
<h3>导出为png、pdf</h3>
<p>导出这两种文件很简单：</p>
<pre class="hljs"><code>mindMap.export(<span class="hljs-string">&#x27;png&#x27;</span>, <span class="hljs-literal">true</span>, <span class="hljs-string">&#x27;文件名&#x27;</span>)
mindMap.export(<span class="hljs-string">&#x27;pdf&#x27;</span>, <span class="hljs-literal">true</span>, <span class="hljs-string">&#x27;文件名&#x27;</span>)
</code></pre>
<blockquote>
<p>从v0.6.0+，要导出pdf，需要额外注册一个ExportPDF插件。</p>
</blockquote>
<h3>导出为svg</h3>
<p>导出为<code>svg</code>可以传递的参数如下：</p>
<pre class="hljs"><code>mindMap.export(type, isDownload, fileName, plusCssText = <span class="hljs-string">&#x27;&#x27;</span>)
</code></pre>
<p>如果开启了节点富文本编辑，也就是<code>svg</code>中会存在节点的<code>html</code>结构，这就又存在一个问题，因为浏览器对每个元素默认会设置一些样式，影响最大的就是<code>margin</code>和<code>padding</code>，这就有可能会导致节点中的文字错位，所以可以通过<code>plusCssText</code>参数传入<code>css</code>样式：</p>
<blockquote>
<p>在v0.6.16+版本后，plusCssText参数已被删除，改为在实例化时通过<code>resetCss</code>配置传入。</p>
</blockquote>
<pre class="hljs"><code>mindMap.export(
    <span class="hljs-string">&#x27;svg&#x27;</span>, 
    <span class="hljs-literal">true</span>, 
    <span class="hljs-string">&#x27;文件名&#x27;</span>, 
    <span class="hljs-literal">false</span>, 
    <span class="hljs-string">`* {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }`</span>
)
</code></pre>
<h3>导出为md</h3>
<p>导出为<code>markdown</code>文件只要传递默认的三个参数即可：</p>
<pre class="hljs"><code>mindMap.export(<span class="hljs-string">&#x27;md&#x27;</span>, <span class="hljs-literal">true</span>, <span class="hljs-string">&#x27;文件名&#x27;</span>)
</code></pre>
<h3>导出为xmind</h3>
<blockquote>
<p>v0.6.6+</p>
</blockquote>
<blockquote>
<p>需要注册<code>ExportXMind</code>插件</p>
</blockquote>
<p>导出为<code>Xmind</code>新版文件。</p>
<pre class="hljs"><code>mindMap.export(<span class="hljs-string">&#x27;xmind&#x27;</span>, <span class="hljs-string">&#x27;文件名&#x27;</span>)
</code></pre>
<h2>导入</h2>
<p>目前支持从<code>.smm</code>、<code>.json</code>、<code>.xmind</code>、<code>.xlsx</code>、<code>.md</code>格式的文件导入。</p>
<h3>导入smm、json</h3>
<p>这两个文件导入很简单，直接读取文件内容，转成对象，然后调用相关方法渲染到画布即可。</p>
<p>因为导出这两种类型时可以选择是否包含配置数据，所以导入的时候调用的方法也是不一样的：</p>
<pre class="hljs"><code><span class="hljs-keyword">let</span> data = <span class="hljs-built_in">JSON</span>.parse(<span class="hljs-string">&#x27;json数据&#x27;</span>)
<span class="hljs-comment">// 如果数据中存在root属性，那么代表是包含配置的完整数据，则使用setFullData方法导入数据</span>
<span class="hljs-keyword">if</span> (data.root) {
    mindMap.setFullData(data)
} <span class="hljs-keyword">else</span> {
<span class="hljs-comment">// 否则使用setData方法导入</span>
    mindMap.setData(data)
}
<span class="hljs-comment">// 导入数据后有可能新数据渲染在可视区域外了，所以为了更好的体验，可以复位一下视图的变换</span>
mindMap.view.reset()
</code></pre>
<h3>导入xmind</h3>
<p>要导入<code>xmind</code>文件，需要引入<code>xmind</code>的解析方法：</p>
<pre class="hljs"><code><span class="hljs-keyword">import</span> xmind <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;simple-mind-map/src/parse/xmind.js&#x27;</span>
</code></pre>
<p>如果使用的是<code>umd</code>文件，可以这样获取：</p>
<pre class="hljs"><code>MindMap.xmind
</code></pre>
<p>如果你是通过<code>input type=file</code>等方式获取到的<code>File</code>文件对象，那么可以直接传递给<code>parseXmindFile</code>方法解析，注意返回的是一个<code>Promise</code>实例，会返回解析后的节点树数据，使用<code>setData</code>方法渲染到画布即可。</p>
<pre class="hljs"><code><span class="hljs-keyword">let</span> data = <span class="hljs-keyword">await</span> xmind.parseXmindFile(file)
mindMap.setData(data)
</code></pre>
<p><code>.xmind</code>文件本质上是一个压缩包，改成<code>zip</code>后缀可以解压缩，里面存在一个<code>content.json</code>文件，如果你自己解析出了这个文件，那么可以把这个文件内容传递给这个<code>transformXmind</code>方法进行转换：</p>
<pre class="hljs"><code><span class="hljs-keyword">let</span> data = <span class="hljs-keyword">await</span> xmind.transformXmind(fileContent)
mindMap.setData(data)
</code></pre>
<p>另外如果导入的是<code>xmind8</code>版本的数据，需要使用<code>transformOldXmind</code>方法。</p>
<h3>导入xlsx</h3>
<p>这个文件的导入没有内置方法，需要你自己开发，以下是一个使用<code>xlsx</code>库的方式：</p>
<pre class="hljs"><code><span class="hljs-keyword">import</span> { read, utils } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;xlsx&#x27;</span>

<span class="hljs-comment">// 文件转buffer</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> fileToBuffer = <span class="hljs-function"><span class="hljs-params">file</span> =&gt;</span> {
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-params">r</span> =&gt;</span> {
    <span class="hljs-keyword">const</span> reader = <span class="hljs-keyword">new</span> FileReader()
    reader.onload = <span class="hljs-function">() =&gt;</span> {
      r(reader.result)
    }
    reader.readAsArrayBuffer(file)
  })
}

<span class="hljs-comment">// File文件对象</span>
<span class="hljs-keyword">const</span> transformXLSXToJson = <span class="hljs-keyword">async</span> (file) =&gt; {
    <span class="hljs-keyword">const</span> wb = read(<span class="hljs-keyword">await</span> fileToBuffer(file))
    <span class="hljs-keyword">const</span> data = utils.sheet_to_json(wb.Sheets[wb.SheetNames[<span class="hljs-number">0</span>]], {
        <span class="hljs-attr">header</span>: <span class="hljs-number">1</span>
    })
    <span class="hljs-keyword">if</span> (data.length &lt;= <span class="hljs-number">0</span>) {
        <span class="hljs-keyword">return</span>
    }
    <span class="hljs-keyword">let</span> max = <span class="hljs-number">0</span>
    data.forEach(<span class="hljs-function"><span class="hljs-params">arr</span> =&gt;</span> {
        <span class="hljs-keyword">if</span> (arr.length &gt; max) {
        max = arr.length
        }
    })
    <span class="hljs-keyword">let</span> layers = []
    <span class="hljs-keyword">let</span> walk = <span class="hljs-function"><span class="hljs-params">layer</span> =&gt;</span> {
        <span class="hljs-keyword">if</span> (!layers[layer]) {
        layers[layer] = []
        }
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; data.length; i++) {
        <span class="hljs-keyword">if</span> (data[i][layer]) {
            <span class="hljs-keyword">let</span> node = {
            <span class="hljs-attr">data</span>: {
                <span class="hljs-attr">text</span>: data[i][layer]
            },
            <span class="hljs-attr">children</span>: [],
            <span class="hljs-attr">_row</span>: i
            }
            layers[layer].push(node)
        }
        }
        <span class="hljs-keyword">if</span> (layer &lt; max - <span class="hljs-number">1</span>) {
        walk(layer + <span class="hljs-number">1</span>)
        }
    }
    walk(<span class="hljs-number">0</span>)
    <span class="hljs-keyword">let</span> getParent = <span class="hljs-function">(<span class="hljs-params">arr, row</span>) =&gt;</span> {
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = arr.length - <span class="hljs-number">1</span>; i &gt;= <span class="hljs-number">0</span>; i--) {
        <span class="hljs-keyword">if</span> (row &gt;= arr[i]._row) {
            <span class="hljs-keyword">return</span> arr[i]
        }
        }
    }
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">1</span>; i &lt; layers.length; i++) {
        <span class="hljs-keyword">let</span> arr = layers[i]
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> j = <span class="hljs-number">0</span>; j &lt; arr.length; j++) {
        <span class="hljs-keyword">let</span> item = arr[j]
        <span class="hljs-keyword">let</span> parent = getParent(layers[i - <span class="hljs-number">1</span>], item._row)
        <span class="hljs-keyword">if</span> (parent) {
            parent.children.push(item)
        }
        }
    }

    <span class="hljs-keyword">return</span> layers[<span class="hljs-number">0</span>][<span class="hljs-number">0</span>]
}

<span class="hljs-keyword">let</span> data = transformXLSXToJson(<span class="hljs-string">&#x27;xlsx文件对象&#x27;</span>)
mindMap.setData(data)
</code></pre>
<h3>导入md</h3>
<p>要导入<code>markdown</code>文件需要引入相应的解析方法：</p>
<pre class="hljs"><code><span class="hljs-keyword">import</span> markdown <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;simple-mind-map/src/parse/markdown.js&#x27;</span>
</code></pre>
<p>如果使用的是umd格式的文件，那么可以通过如下方式获取：</p>
<pre class="hljs"><code>MindMap.markdown
</code></pre>
<p>获取到<code>md</code>文件的内容后调用<code>transformMarkdownTo</code>方法转换即可，返回一个<code>Promise</code>实例：</p>
<pre class="hljs"><code><span class="hljs-keyword">let</span> data = <span class="hljs-keyword">await</span> markdown.transformMarkdownTo(<span class="hljs-string">&#x27;md文件内容&#x27;</span>)
mindMap.setData(data)
</code></pre>
<h3>完整示例</h3>
<iframe style="width: 100%; height: 455px; border: none;" src="https://wanglin2.github.io/playground/#eNrFV81u20YQfpUN24JUoVAK0JMrB3YbB0gApYGTQ4EwhzW5kuiQu8TuypJhC0iDJkHaBsglPfXQQ4Oil7intnb7NvVf36KzfxRNUXUuQQ3bImdnvm925tsf7XnrRRHujIm34vVEzNNCIkHkuLge0TQvGJdoD3EyaCNG+2xMJUnaSIxwlrHJJhmgGRpwliMfEPwyop/SpI8LMxR5AswZuZqD9WqOi8iLKEIRzYhEyqY8VxEdZ1lEI9rpoJODv06evjn9/vnxn79FNGZUSGC/RYuxBMeAtNDqdbSnQBTEIM0ImEkoMR8SGap38aD70I1zMoThThSFgcjz/ami3N8WjO5PMzHdz5PWhx3lmw5QcAWcQ0mEDBRKSHFOWi1DhRDOCJeBf37w+z+PX5x++0sIcH8//ipUWOpTI+sHwFWfeWLm4LcMAIe6cpgiQjNHWKalQCCRpeQjTJOM3MtzPagBZ4hkgpQwmv5ShC+V13IMyPxSiI1pTLKlEPnlOfSrCUQUfk3bf/r67NWzalUvSqAsgRKBBljQwSbBCeFKTWSCbpaGQFPNHUIOH+viPpmaLOvDjGYMJ0pUO6A4y4GQ5Lvu0VAmWGLwun3vizthgbkgAQQ4HXIixpm0rTfdlrsFYQMTdmV1Fflsa5vE0i/ro1lGnE30BDY4ZzzwTRVOnj09eXt4+sOL84MDJygrJPUDa/YGwAYK247OUIxlPIIFo3AqHKqcDHqTsaEdswHNDdHCamqF1hLMH4tdGtdbUilWpVR4gtNyfzDIpnIaS3Vs3pCGSS2ZUvOEGmYC8m6aiFb0solA+NnrN3WsHPNHCZs0SrS/tCjvS6eG7N3UerEFbh6h5JiKAeN531rus/9Q83uRm9n2X/96+vKtK6jlUSteU5XzU8tJWULOmCzJ7HESQthNOE/q4tEb1aJrzU39c6M7KZmouROpelPN9PnR8R9HapNyqZKpOvvWxW2wqXxVrprLYRmHwFdBfhv6MyZt5Fb3q5dgGmBIsImnoMM6zV2qjjXNYqZUp4GYJhYHXx7nwSKGFabVSGArRrIVlLB4nBMqQ9DERkbU42e7t5LAt5GfMypxSgn3W20Tpeq6MhdD5ClD5FVMxixB5Moceac/Hp5/8+TsyaG5KGipWDDlGI/SLOGEKucHc4waXCNLnen46Luzo5/rZBcJG0j11WLR73/KwD1am4tLaSo3YW3cYQm5y0QqU0Yh0s/IQIIu/BhaB216qN1nrU9BFiCNXsfcAeH2By+SwMUNSwJvCPWSdAfFGRZiNfJsu2+QnEWeHrYOaTIfLcUALr0OjFYdHZJkLNvCysUMRrKX6pueOixhXG13kYfWtBHe7UWw9Ae4rbGUsObW4iyNH4FLdSWC34XV2usY78ujYYFVg2E51WLnU3JPvU6lYvAq5G5mirdmb8aRF3bMddhtwETkYSxE5EEH1K0YobBSXKeeSZrI0Qq61u1+pP0QKsqecgKM6Q7RA1oO6u+DehMc1DwQb8G+PJYmUJ0RA7mCuvZNsmL+skg/IulwBO6fdLvF1DE3835cbrlwlKTA61ALnCQpHTpDmXpoNfGOGV9zGdiky3cABD3rHnhtz3RAfQHRd0v4vqPhIzsAHSjXauTB1xmzQMMOPIYcdso0J6pZV7fgeibg8N2GCLvWGr7imNjFVqsod+55s38BRuykJA==" />
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>