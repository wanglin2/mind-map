<template>
  <div>
    <h1>操作节点内容</h1>
<p>目前支持在节点中插入<code>图片</code>、<code>图标</code>、<code>超链接</code>、<code>备注</code>、<code>标签</code>、<code>概要</code>、<code>关联线</code>，本节教程会介绍如何通过UI界面来完成这些内容的插入。</p>
<h2>监听节点激活事件</h2>
<p>首先我们要监听节点的激活事件，如果当前没有激活节点，那么对应的UI界面肯定是禁用状态。可以通过<code>node_active</code>事件来监听节点激活事件：</p>
<pre class="hljs"><code><span class="hljs-keyword">const</span> activeNodes = shallowRef([])
mindMap.on(<span class="hljs-string">&#x27;node_active&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">node, activeNodeList</span>) =&gt;</span> {
    activeNodes.value = activeNodeList
})
</code></pre>
<p>你还可以进一步判断当前激活的节点中是否操作根节点，是否存在概要节点，因为根节点肯定不能添加兄弟节点，概要节点则子节点、兄弟节点、概要节点、关联线都不能添加。</p>
<pre class="hljs"><code><span class="hljs-keyword">const</span> hasRoot = computed(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">return</span> activeNodes.value.findIndex(<span class="hljs-function"><span class="hljs-params">node</span> =&gt;</span> {
        <span class="hljs-keyword">return</span> node.isRoot
    }) !== -<span class="hljs-number">1</span>
})


<span class="hljs-keyword">const</span> hasGeneralization = computed(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">return</span> activeNodes.value.findIndex(<span class="hljs-function"><span class="hljs-params">node</span> =&gt;</span> {
        <span class="hljs-keyword">return</span> node.isGeneralization
    }) !== -<span class="hljs-number">1</span>
})
</code></pre>
<p>有了这些判断以后，我们就可以对工具按钮进行控制了，接下来就是实现按钮的相关功能。</p>
<h2>插入图片</h2>
<p>选择图片和上传图片的功能需要你自行开发，假设我们已经上传了一张图片，我们就可以遍历当前激活的节点，挨个调用节点的<code>setImage</code>方法设置图片：</p>
<pre class="hljs"><code>activeNodes.value.forEach(<span class="hljs-function">(<span class="hljs-params">node</span>) =&gt;</span> {
    node.setImage({
        <span class="hljs-attr">url</span>: <span class="hljs-string">&#x27;图片url&#x27;</span>,
        <span class="hljs-attr">title</span>: <span class="hljs-string">&#x27;图片的标题或描述&#x27;</span>,
        <span class="hljs-attr">width</span>: <span class="hljs-number">100</span>,<span class="hljs-comment">// 图片的宽高也不能少</span>
        <span class="hljs-attr">height</span>: <span class="hljs-number">100</span>
    })
})
</code></pre>
<p>图片回显也很简单，可以使用节点的<code>getData</code>方法获取节点的图片：</p>
<pre class="hljs"><code><span class="hljs-keyword">const</span> img = activeNode.getData(<span class="hljs-string">&#x27;image&#x27;</span>)
<span class="hljs-keyword">const</span> imgTitle = activeNode.getData(<span class="hljs-string">&#x27;imageTitle&#x27;</span>)
</code></pre>
<h2>插入图标</h2>
<p>整体逻辑和插入图片是一样的，不过你需要显示所有可插入的图标，目前只能使用库里自带的一些图标，然后将选择的图标插入到节点中：</p>
<pre class="hljs"><code><span class="hljs-keyword">const</span> iconList = [<span class="hljs-string">&#x27;priority_1&#x27;</span>, <span class="hljs-string">&#x27;...&#x27;</span>]<span class="hljs-comment">// 选择的图标</span>
activeNodes.value.forEach(<span class="hljs-function"><span class="hljs-params">node</span> =&gt;</span> {
    node.setIcon(iconList)
})
</code></pre>
<p>获取节点的图标数据：</p>
<pre class="hljs"><code><span class="hljs-keyword">const</span> iconList = activeNode.getData(<span class="hljs-string">&#x27;icon&#x27;</span>) || []
</code></pre>
<h2>插入超链接</h2>
<p>对于超链接，你需要实现两个输入框，分别输入<code>url</code>和名称，然后插入到节点：</p>
<pre class="hljs"><code>activeNodes.value.forEach(<span class="hljs-function"><span class="hljs-params">node</span> =&gt;</span> {
    node.setHyperlink(<span class="hljs-string">&#x27;url&#x27;</span>, <span class="hljs-string">&#x27;名称&#x27;</span>)
})
</code></pre>
<p>获取节点超链接数据：</p>
<pre class="hljs"><code><span class="hljs-keyword">const</span> url = activeNode.getData(<span class="hljs-string">&#x27;hyperlink&#x27;</span>)
<span class="hljs-keyword">const</span> name = activeNode.getData(<span class="hljs-string">&#x27;hyperlinkTitle&#x27;</span>)
</code></pre>
<h2>插入备注</h2>
<p>备注会稍微复杂一点，因为支持两种方式。</p>
<h3>使用内置逻辑</h3>
<p>使用内置的逻辑，只能插入纯文本备注，所以你只需要显示一个输入框用来输入文本，然后插入到节点：</p>
<pre class="hljs"><code>activeNodes.value.forEach(<span class="hljs-function"><span class="hljs-params">node</span> =&gt;</span> {
    node.setNote(<span class="hljs-string">&#x27;备注内容&#x27;</span>)
})
</code></pre>
<p>这样在鼠标移入节点内的备注图标时会显示你插入的备注内容。</p>
<h3>自定义显示备注</h3>
<p>如果你想显示更丰富的备注内容，比如支持<code>markdown</code>，那么你可以在实例化<code>simple-mind-map</code>时插入<code>customNoteContentShow</code>选项。</p>
<p>设置备注内容还是使用<code>setNote</code>方法，只不过现在插入的是<code>markdown</code>字符串，因为内置的备注弹窗只能处理纯文本内容，所以你需要自己来渲染<code>markdown</code>：</p>
<pre class="hljs"><code><span class="hljs-keyword">const</span> mindMap = <span class="hljs-keyword">new</span> MindMap({
    <span class="hljs-comment">// ...</span>
    <span class="hljs-attr">customNoteContentShow</span>: {
        <span class="hljs-attr">show</span>: <span class="hljs-function">(<span class="hljs-params">content, left, top</span>) =&gt;</span> {
            <span class="hljs-comment">// 在这里显示你的自定义弹窗</span>
            <span class="hljs-comment">// content表示你插入的备注的内容，left和top时弹窗应该显示的位置，你需要将你的弹窗元素设置成fixed定位</span>
        },
        <span class="hljs-attr">hide</span>: <span class="hljs-function">() =&gt;</span> {
            <span class="hljs-comment">// 在这里隐藏你的自定义弹窗</span>
            <span class="hljs-comment">// 你也可以选择不在鼠标移出备注图标时隐藏弹窗，比如可以在画布被点击时隐藏</span>
        }
    },
})
</code></pre>
<p>获取节点的备注内容可以通过<code>getData</code>方法：</p>
<pre class="hljs"><code><span class="hljs-keyword">const</span> note = activeNode.getData(<span class="hljs-string">&#x27;note&#x27;</span>)
</code></pre>
<h2>插入标签</h2>
<p>标签其实就是一个个带背景颜色的文本块，你需要实现的就是一个可以输入多个文本的输入框，然后插入到节点：</p>
<pre class="hljs"><code>activeNodes.value.forEach(<span class="hljs-function"><span class="hljs-params">node</span> =&gt;</span> {
    node.setTag([<span class="hljs-string">&#x27;标签1&#x27;</span>, <span class="hljs-string">&#x27;...&#x27;</span>])
})
</code></pre>
<p>获取节点标签数据：</p>
<pre class="hljs"><code><span class="hljs-keyword">const</span> tagArr = activeNode.getData(<span class="hljs-string">&#x27;tag&#x27;</span>) || []
</code></pre>
<h2>插入概要</h2>
<p>插入概要可以不需要实现UI，直接调用插入概要的命令即可：</p>
<pre class="hljs"><code>mindMap.execCommand(<span class="hljs-string">&#x27;ADD_GENERALIZATION&#x27;</span>, data)
</code></pre>
<p>会给当前激活的节点插入一个概要节点，第二个参数<code>data</code>可以不传，默认为：</p>
<pre class="hljs"><code>{
    <span class="hljs-attr">text</span>: <span class="hljs-string">&#x27;概要&#x27;</span>
}
</code></pre>
<p>概要节点本质上也是一个节点，所以普通节点支持的内容它也支持。</p>
<h2>插入关联线</h2>
<blockquote>
<p>要支持关联线需要使用关联线插件</p>
</blockquote>
<p>关联线也不需要UI，调用一个方法即可：</p>
<pre class="hljs"><code>mindMap.associativeLine.createLineFromActiveNode()
</code></pre>
<p>然后会从激活的节点（如果有多个激活节点，默认是第一个）到鼠标的实时位置生成一条曲线，点击某个目标节点后就会创建一条从激活节点到目标节点的关联线。</p>
<h2>完整示例</h2>
<iframe style="width: 100%; height: 455px; border: none;" src="https://wanglin2.github.io/playground/#eNrFV/9PHEUU/1cma8we5tiDRmKCBykFRBJAQ5poZRuy7M7dDezObHfn4AghsVRK0Vb6xWjTRq2mraYqaULTCA3wz7B3x3/hm539dsdhzvhDSQ5m3rzPe+/el88Ma8qI62rLVawMKkXf9IjLkY951R3WKXFc5nG0hjxcyiNGp1mVcmzlkV8xbJutzOISWkcljzlIBQtqgpgm1Jo2XHmkKz6IbdzrgLTXMVxd0SlCOrUxR0ImNIcQrdq2lBcKKDh8EGzfqR9/WX/1pvHoq+bXG42N/eDWD81fftepyajPkWFysoxnmIV9QKcR5eau9ug0tFLfuR9sPgseHzW2t2IYoT72Jh2jjAGV60FDw2hNuM2Y05YNu4q1EvPGDbOSy1EQpooIib0GOQqt5CKh+Kl69iBSK5y7/mChYNeuUX/V15jv95q0dwGTRULLmmGT1So1fc1kTuGaXSvUKhdGPl+6VLviDCxO4IHS2Adjn13xRgcWNJeW1XxqnhNuY3AgvxCkpf5k6/TXh/Vb39d3dprHL7O6K8TilUHU39eXF+mMEcHu4ekfD0/2fz75+07zxmHw8l4KqWBSrvAQI4XrIo9c/F5vTyh4bkkon4RNa0KjU/gzRWAxhOZU1yPMI3x1vl/No3R3Qb367xUQCe+Uf7Cdix2cE2vz9ebpg6P6t89aw50idKnb+p/j/eNVF3s22MmFFc8UXBRWfMHG3Zv1G3unP94P9l8Fuz+dvrgd7D5Vz0vq0636XtLcMsoZxrvu0nOiFCZyqjQe3NwMdvfPCwBK2vjrqDWAy0b5f/oHC7k5VdoOqy6XUPLzwni+0Xx+vTWMCaM1iog0NFzD5ihzHINaOXVkbGx+YnxmfHZkavKLkcuTn8yAu1Bd5xzXoLHV5taLYPfRyf62dBLlQ6h0qMfmXvP6d42D4zON01aSOBjD95lJDJEfoaSZHjZ4uPwIWHAkSVwudpXwae6sNcGHeCXm0ZhjMNCLxcyqgynXypiP21gsL61OwvePkKOMcgOcempPRAeWwY3BuC6QDUUIdCUjkmKRJCHWlfqTfcm4kqlDLki4RVfMCrEtD1OhPJfaaDPX0Uu7p5OD242D39qdtTrs4DTki7N6bymCeBnJYhyhhM8yBiNo4U+ZTzhhFJCqjUtcTIIJpYMyhaj1ng/l3YcQdGDj8b3g7p8yJnkHnhx8c/LmdbbdgPpUMWTzciTBYDiC+XDyQkLMTOOZsRX9Fekl7Q+fYkG+AODuhw3HcG1DD8MOoaJFlpFpQ5cP6UoUxBh2mK6Ex5ECsdLTpBNBpViA06xibIkzZi8YoIKWe0kJBNlQbUzLvIKGUV/iRefFhSrncNlcNG1iLgEivdFBK3vlFwtSNYKC547Q8B7JQoGiuoWKeySBJndNt2hBzqnjkKO7hQKvJkhJqd0iJ2AmYmBIg//hu2aijemxDZ0WOl4VC5k+gq3PV23ZUhej16KuaAX5RIz4TsO+o5m+ryvJVGiZlou7On3jvBvqIeQmY+Zh8AiNFB6EEyo+77S3ZmwqBRoLPrOrXAIREsM6iPqiHWduujnrPn5Bvd/X59Ziz539vhd7dgyvTMBvbNU1LAueibEgCV2LJqXLiPvjCKKgkz0YhCkPa6DkFVkB8SjXFn1G4X8AeWNGB1CBhD51BZ74kjO1Aiw1Dy4v4mBRrN4Fj61Aj4ARXYnor8OzX2LPllqgotjWlfV/AEgelAo=" />
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>