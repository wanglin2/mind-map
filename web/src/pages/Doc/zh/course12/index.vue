<template>
  <div>
    <h1>如何渲染一个大纲</h1>
<p>思维导图本质就是一颗树，所以你可以使用树组件来完成大纲的显示。</p>
<p>可以监听<code>data_change</code>事件来获取当前最新的思维导图数据：</p>
<pre class="hljs"><code>mindMap.on(<span class="hljs-string">&#x27;data_change&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">data</span>) =&gt;</span> {
    <span class="hljs-comment">// data数据是不带节点对象的纯数据</span>
    <span class="hljs-comment">// 如果你需要操作节点对象，可以使用mindMap.renderer.renderTree</span>
    <span class="hljs-built_in">console</span>.log(data, mindMap.renderer.renderTree)
})
</code></pre>
<p>通常点击了大纲的某个节点，会将画布定位到该节点并激活该节点，这可以这么做：</p>
<pre class="hljs"><code><span class="hljs-keyword">const</span> node = data._node
mindMap.renderer.moveNodeToCenter(node)
node.active()

<span class="hljs-comment">// 在v0.6.7+版本可以这么做：</span>
mindMap.execCommand(<span class="hljs-string">&#x27;GO_TARGET_NODE&#x27;</span>, node)<span class="hljs-comment">// 或者传节点的uid</span>
</code></pre>
<p>当在大纲树上编辑了某个节点的内容，需要同步到思维导图树上：</p>
<pre class="hljs"><code>data._node.setText(<span class="hljs-string">&#x27;xxx&#x27;</span>)
</code></pre>
<p>要插入兄弟节点或子节点可以这么操作：</p>
<pre class="hljs"><code>mindMap.execCommand(<span class="hljs-string">&#x27;INSERT_NODE&#x27;</span>, <span class="hljs-literal">false</span>)
mindMap.execCommand(<span class="hljs-string">&#x27;INSERT_CHILD_NODE&#x27;</span>, <span class="hljs-literal">false</span>)
</code></pre>
<h2>进阶</h2>
<p>要实现一个功能完善的大纲并不容易，下面介绍一下包含定位、编辑、拖拽、删除、单独编辑功能的大纲实现。</p>
<p>以<a href="https://element.eleme.cn/#/zh-CN/component/tree">ElementUI Tree组件</a>为例。</p>
<p>实现监听<code>data_change</code>事件来刷新树数据：</p>
<pre class="hljs"><code><span class="hljs-keyword">import</span> { nodeRichTextToTextWithWrap } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;simple-mind-map/src/utils&#x27;</span>

<span class="hljs-built_in">this</span>.mindMap.on(<span class="hljs-string">&#x27;data_change&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-built_in">this</span>.refresh()
})

{
    <span class="hljs-function"><span class="hljs-title">refresh</span>(<span class="hljs-params"></span>)</span> {
        <span class="hljs-keyword">let</span> data = mindMap.getData()<span class="hljs-comment">// 获取思维导图树数据</span>
        data.root = <span class="hljs-literal">true</span> <span class="hljs-comment">// 标记根节点</span>
        <span class="hljs-comment">// 遍历树，添加一些属性</span>
        <span class="hljs-keyword">let</span> walk = <span class="hljs-function"><span class="hljs-params">root</span> =&gt;</span> {
            <span class="hljs-comment">// 如果是富文本节点，那么调用nodeRichTextToTextWithWrap方法将&lt;p&gt;&lt;span&gt;&lt;/span&gt;&lt;p&gt;形式的节点富文本内容转换成\n换行的文本</span>
            <span class="hljs-keyword">const</span> text = (root.data.richText
                ? nodeRichTextToTextWithWrap(root.data.text)
                : root.data.text
            ).replaceAll(<span class="hljs-regexp">/\n/g</span>, <span class="hljs-string">&#x27;&lt;br&gt;&#x27;</span>)
            root.textCache = text <span class="hljs-comment">// 保存一份修改前的数据，用于对比是否修改了</span>
            root.label = text<span class="hljs-comment">// 用于树组件渲染</span>
            root.uid = root.data.uid<span class="hljs-comment">// 用于树组件渲染</span>
            <span class="hljs-keyword">if</span> (root.children &amp;&amp; root.children.length &gt; <span class="hljs-number">0</span>) {
                root.children.forEach(<span class="hljs-function"><span class="hljs-params">item</span> =&gt;</span> {
                    walk(item)
                })
            }
        }
        walk(data)
        <span class="hljs-built_in">this</span>.data = [data]<span class="hljs-comment">// 赋值给树组件</span>
    }
}
</code></pre>
<p>模板如下：</p>
<pre class="hljs"><code><span class="hljs-tag">&lt;<span class="hljs-name">el-tree</span>
    <span class="hljs-attr">ref</span>=<span class="hljs-string">&quot;tree&quot;</span>
    <span class="hljs-attr">node-key</span>=<span class="hljs-string">&quot;uid&quot;</span>
    <span class="hljs-attr">draggable</span>
    <span class="hljs-attr">default-expand-all</span>
    <span class="hljs-attr">:data</span>=<span class="hljs-string">&quot;data&quot;</span>
    <span class="hljs-attr">:highlight-current</span>=<span class="hljs-string">&quot;true&quot;</span>
    <span class="hljs-attr">:expand-on-click-node</span>=<span class="hljs-string">&quot;false&quot;</span>
    <span class="hljs-attr">:allow-drag</span>=<span class="hljs-string">&quot;checkAllowDrag&quot;</span>
    @<span class="hljs-attr">node-drop</span>=<span class="hljs-string">&quot;onNodeDrop&quot;</span>
    @<span class="hljs-attr">current-change</span>=<span class="hljs-string">&quot;onCurrentChange&quot;</span>
    @<span class="hljs-attr">mouseenter.native</span>=<span class="hljs-string">&quot;isInTreArea = true&quot;</span>
    @<span class="hljs-attr">mouseleave.native</span>=<span class="hljs-string">&quot;isInTreArea = false&quot;</span>
&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span>
        <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;customNode&quot;</span>
        <span class="hljs-attr">slot-scope</span>=<span class="hljs-string">&quot;{ node, data }&quot;</span>
        <span class="hljs-attr">:data-id</span>=<span class="hljs-string">&quot;data.uid&quot;</span>
        @<span class="hljs-attr">click</span>=<span class="hljs-string">&quot;onClick(data)&quot;</span>
    &gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span>
            <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;nodeEdit&quot;</span>
            <span class="hljs-attr">contenteditable</span>=<span class="hljs-string">&quot;true&quot;</span>
            <span class="hljs-attr">:key</span>=<span class="hljs-string">&quot;getKey()&quot;</span>
            @<span class="hljs-attr">keydown.stop</span>=<span class="hljs-string">&quot;onNodeInputKeydown($event, node)&quot;</span>
            @<span class="hljs-attr">keyup.stop</span>
            @<span class="hljs-attr">blur</span>=<span class="hljs-string">&quot;onBlur($event, node)&quot;</span>
            @<span class="hljs-attr">paste</span>=<span class="hljs-string">&quot;onPaste($event, node)&quot;</span>
            <span class="hljs-attr">v-html</span>=<span class="hljs-string">&quot;node.label&quot;</span>
        &gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">el-tree</span>&gt;</span>
</code></pre>
<h3>定位节点</h3>
<p>给节点绑定了一个<code>click</code>事件用于在画布内定位点击的节点，可以调用思维导图的相关方法实现：</p>
<pre class="hljs"><code><span class="hljs-comment">// 激活当前节点且移动当前节点到画布中间</span>
<span class="hljs-function"><span class="hljs-title">onClick</span>(<span class="hljs-params">data</span>)</span> {
    <span class="hljs-comment">// 根据uid知道思维导图节点对象</span>
    <span class="hljs-keyword">const</span> targetNode = <span class="hljs-built_in">this</span>.mindMap.renderer.findNodeByUid(data.uid)
    <span class="hljs-comment">// 如果当前已经是激活状态，那么上面都不做</span>
    <span class="hljs-keyword">if</span> (targetNode &amp;&amp; targetNode.nodeData.data.isActive) <span class="hljs-keyword">return</span>
    <span class="hljs-comment">// 思维导图节点激活时默认会聚焦到内部创建的一个隐藏输入框中，`stopFocusOnNodeActive`方法是用于关闭这个特性，因为我们想把焦点留在大纲的输入框中</span>
    <span class="hljs-built_in">this</span>.mindMap.renderer.textEdit.stopFocusOnNodeActive()
    <span class="hljs-comment">// 定位到目标节点</span>
    <span class="hljs-built_in">this</span>.mindMap.execCommand(<span class="hljs-string">&#x27;GO_TARGET_NODE&#x27;</span>, data.uid, <span class="hljs-function">() =&gt;</span> {
        <span class="hljs-comment">// 定位完成后再开启前面关闭的特性</span>
        <span class="hljs-built_in">this</span>.mindMap.renderer.textEdit.openFocusOnNodeActive()
    })
}
</code></pre>
<h3>编辑</h3>
<p>我们通过自定义树节点内容渲染了一个<code>contenteditable=true</code>的标签用于输入文本，然后在<code>blur</code>事件中修改节点文本：</p>
<pre class="hljs"><code><span class="hljs-keyword">import</span> { textToNodeRichTextWithWrap } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;simple-mind-map/src/utils&#x27;</span>

<span class="hljs-comment">// 失去焦点更新节点文本</span>
<span class="hljs-function"><span class="hljs-title">onBlur</span>(<span class="hljs-params">e, node</span>)</span> {
    <span class="hljs-comment">// 节点数据没有修改那么什么也不用做</span>
    <span class="hljs-keyword">if</span> (node.data.textCache === e.target.innerHTML) {
        <span class="hljs-keyword">return</span>
    }
    <span class="hljs-comment">// 根据是否是富文本模式获取不同的文本数据</span>
    <span class="hljs-keyword">const</span> richText = node.data.data.richText
    <span class="hljs-keyword">const</span> text = richText ? e.target.innerHTML : e.target.innerText
    <span class="hljs-keyword">const</span> targetNode = <span class="hljs-built_in">this</span>.mindMap.renderer.findNodeByUid(node.data.uid)
    <span class="hljs-keyword">if</span> (!targetNode) <span class="hljs-keyword">return</span>
    <span class="hljs-keyword">if</span> (richText) {
        <span class="hljs-comment">// 如果是富文本节点，那么需要先调用textToNodeRichTextWithWrap方法将&lt;br&gt;换行的文本转换成&lt;p&gt;&lt;span&gt;&lt;/span&gt;&lt;p&gt;形式的节点富文本内容</span>
        <span class="hljs-comment">// 第二个参数代表设置的是富文本内容</span>
        <span class="hljs-comment">// 第三个参数指定要重置富文本节点的样式</span>
        targetNode.setText(textToNodeRichTextWithWrap(text), <span class="hljs-literal">true</span>, <span class="hljs-literal">true</span>)
    } <span class="hljs-keyword">else</span> {
        targetNode.setText(text)
    }
}
</code></pre>
<h3>拖拽</h3>
<p>设置了<code>draggable</code>属性即可开启拖拽，首先根节点是不允许拖拽的，所以通过<code>allow-drag</code>属性传入一个判断方法：</p>
<pre class="hljs"><code><span class="hljs-comment">// 根节点不允许拖拽</span>
<span class="hljs-function"><span class="hljs-title">checkAllowDrag</span>(<span class="hljs-params">node</span>)</span> {
    <span class="hljs-keyword">return</span> !node.data.root
}
</code></pre>
<p>然后监听拖拽完成事件<code>node-drop</code>来实现画布内节点的调整：</p>
<pre class="hljs"><code><span class="hljs-comment">// 拖拽结束事件</span>
<span class="hljs-function"><span class="hljs-title">onNodeDrop</span>(<span class="hljs-params">data, target, position</span>)</span> {
    <span class="hljs-comment">// 被拖拽的节点</span>
    <span class="hljs-keyword">const</span> node = <span class="hljs-built_in">this</span>.mindMap.renderer.findNodeByUid(data.data.uid)
    <span class="hljs-comment">// 拖拽到的目标节点</span>
    <span class="hljs-keyword">const</span> targetNode = <span class="hljs-built_in">this</span>.mindMap.renderer.findNodeByUid(target.data.uid)
    <span class="hljs-keyword">if</span> (!node || !targetNode) {
        <span class="hljs-keyword">return</span>
    }
    <span class="hljs-comment">// 根据不同拖拽的情况调用不同的方法</span>
    <span class="hljs-keyword">switch</span> (position) {
        <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;before&#x27;</span>:
            <span class="hljs-built_in">this</span>.mindMap.execCommand(<span class="hljs-string">&#x27;INSERT_BEFORE&#x27;</span>, node, targetNode)
            <span class="hljs-keyword">break</span>
        <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;after&#x27;</span>:
            <span class="hljs-built_in">this</span>.mindMap.execCommand(<span class="hljs-string">&#x27;INSERT_AFTER&#x27;</span>, node, targetNode)
            <span class="hljs-keyword">break</span>
        <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;inner&#x27;</span>:
            <span class="hljs-built_in">this</span>.mindMap.execCommand(<span class="hljs-string">&#x27;MOVE_NODE_TO&#x27;</span>, node, targetNode)
            <span class="hljs-keyword">break</span>
        <span class="hljs-attr">default</span>:
            <span class="hljs-keyword">break</span>
    }
}
</code></pre>
<h3>删除节点</h3>
<p>首先通过树组件的<code>current-change</code>事件来保存当前高亮的树节点：</p>
<pre class="hljs"><code><span class="hljs-comment">// 当前选中的树节点变化事件</span>
<span class="hljs-function"><span class="hljs-title">onCurrentChange</span>(<span class="hljs-params">data</span>)</span> {
    <span class="hljs-built_in">this</span>.currentData = data
}
</code></pre>
<p>然后通过监听<code>keydown</code>事件来完成删除节点的操作：</p>
<pre class="hljs"><code><span class="hljs-built_in">window</span>.addEventListener(<span class="hljs-string">&#x27;keydown&#x27;</span>, <span class="hljs-built_in">this</span>.onKeyDown)

<span class="hljs-comment">// 删除节点</span>
<span class="hljs-function"><span class="hljs-title">onKeyDown</span>(<span class="hljs-params">e</span>)</span> {
    <span class="hljs-keyword">if</span> ([<span class="hljs-number">46</span>, <span class="hljs-number">8</span>].includes(e.keyCode) &amp;&amp; <span class="hljs-built_in">this</span>.currentData) {
        e.stopPropagation()
        <span class="hljs-comment">// 处理当前正在编辑节点内容时删除的情况</span>
        <span class="hljs-built_in">this</span>.mindMap.renderer.textEdit.hideEditTextBox()
        <span class="hljs-keyword">const</span> node = <span class="hljs-built_in">this</span>.mindMap.renderer.findNodeByUid(<span class="hljs-built_in">this</span>.currentData.uid)
        <span class="hljs-keyword">if</span> (node &amp;&amp; !node.isRoot) {
            <span class="hljs-comment">// 首先从树里删除</span>
            <span class="hljs-built_in">this</span>.$refs.tree.remove(<span class="hljs-built_in">this</span>.currentData)
            <span class="hljs-comment">// 然后从画布里删除</span>
            <span class="hljs-built_in">this</span>.mindMap.execCommand(<span class="hljs-string">&#x27;REMOVE_NODE&#x27;</span>, [node])
        }
    }
}
</code></pre>
<h3>创建新节点</h3>
<p>通过监听节点内容编辑框的<code>keydown</code>事件来完成添加新节点的操作：</p>
<pre class="hljs"><code><span class="hljs-keyword">import</span> { createUid } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;simple-mind-map/src/utils&#x27;</span>

<span class="hljs-comment">// 节点输入区域按键事件</span>
<span class="hljs-function"><span class="hljs-title">onNodeInputKeydown</span>(<span class="hljs-params">e</span>)</span> {
    <span class="hljs-comment">// 回车键添加同级节点</span>
    <span class="hljs-keyword">if</span> (e.keyCode === <span class="hljs-number">13</span> &amp;&amp; !e.shiftKey) {
        e.preventDefault()
        <span class="hljs-built_in">this</span>.insertNode()
    }
    <span class="hljs-comment">// tab键添加子节点</span>
    <span class="hljs-keyword">if</span> (e.keyCode === <span class="hljs-number">9</span>) {
        e.preventDefault()
        <span class="hljs-built_in">this</span>.insertChildNode()
    }
}

<span class="hljs-comment">// 插入兄弟节点</span>
<span class="hljs-function"><span class="hljs-title">insertNode</span>(<span class="hljs-params"></span>)</span> {
    <span class="hljs-built_in">this</span>.mindMap.execCommand(<span class="hljs-string">&#x27;INSERT_NODE&#x27;</span>, <span class="hljs-literal">false</span>, [], {
        <span class="hljs-attr">uid</span>: createUid()
    })
}

<span class="hljs-comment">// 插入下级节点</span>
<span class="hljs-function"><span class="hljs-title">insertChildNode</span>(<span class="hljs-params"></span>)</span> {
    <span class="hljs-built_in">this</span>.mindMap.execCommand(<span class="hljs-string">&#x27;INSERT_CHILD_NODE&#x27;</span>, <span class="hljs-literal">false</span>, [], {
        <span class="hljs-attr">uid</span>: createUid()
    })
}
</code></pre>
<h3>拦截输入框的粘贴操作</h3>
<p>为什么要拦截输入框的粘贴操作，因为用户可能粘贴的是富文本内容，也就是带html标签的，但是一般我们都不希望用户粘贴这种内容，只允许粘贴纯文本，所以我们要拦截粘贴事件，处理一下用户粘贴的内容：</p>
<pre class="hljs"><code><span class="hljs-keyword">import</span> { getTextFromHtml } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;simple-mind-map/src/utils&#x27;</span>

<span class="hljs-comment">// 拦截粘贴事件</span>
<span class="hljs-function"><span class="hljs-title">onPaste</span>(<span class="hljs-params">e</span>)</span> {
    e.preventDefault()
    <span class="hljs-keyword">const</span> selection = <span class="hljs-built_in">window</span>.getSelection()
    <span class="hljs-keyword">if</span> (!selection.rangeCount) <span class="hljs-keyword">return</span>
    selection.deleteFromDocument()<span class="hljs-comment">// 删除当前选区，也就是如果当前用户在输入框中选择了一些文本，会被删除</span>
    <span class="hljs-comment">// 从剪贴板里取出文本数据</span>
    <span class="hljs-keyword">let</span> text = (e.clipboardData || <span class="hljs-built_in">window</span>.clipboardData).getData(<span class="hljs-string">&#x27;text&#x27;</span>)
    <span class="hljs-comment">// 调用库提供的getTextFromHtml方法去除格式</span>
    text = getTextFromHtml(text)
    <span class="hljs-comment">// 去除换行</span>
    text = text.replaceAll(<span class="hljs-regexp">/\n/g</span>, <span class="hljs-string">&#x27;&#x27;</span>)
    <span class="hljs-comment">// 创建文本节点添加到当前选区</span>
    <span class="hljs-keyword">const</span> node = <span class="hljs-built_in">document</span>.createTextNode(text)
    selection.getRangeAt(<span class="hljs-number">0</span>).insertNode(node)
    selection.collapseToEnd()
}
</code></pre>
<p>到这里基本功能就都完成了，是不是觉得挺简单的？核心原理和操作确实很简单，麻烦的是各种情况和冲突的处理，比如焦点的冲突、快捷键的冲突、操作的时间顺序等等，所以务必先阅读一下完整的源码<a href="https://github.com/wanglin2/mind-map/blob/main/web/src/pages/Edit/components/Outline.vue">Outline.vue</a>。</p>

  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>