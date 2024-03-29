<template>
  <div>
    <h1>如何实现AI生成节点内容</h1>
<p>目前AI能力非常流行，每个应用都给自己加上了AI的能力提高竞争力，那么在使用了<code>simple-mind-map</code>的情况下如何添加AI的能力呢，本教程会详细的教你如何实现。</p>
<p>首先要说明的是本教程并不会真的实现一个可用的AI能力，只是在假设你要实现该功能的前提下来教你如何调用对应的API来实现你想要的效果。</p>
<p>其次AI返回的数据结构不尽相同，你都需要自行转换成<code>simple-mind-map</code>的结构类型。</p>
<h2>自动生成整个思维导图</h2>
<h3>一次生成</h3>
<p>通过AI生成整个思维导图并且一次直接生成，这个其实就是普通的回显功能，那么你可以在实例化时通过<code>data</code>传入生成的数据：</p>
<pre class="hljs"><code><span class="hljs-keyword">const</span> mindMap = <span class="hljs-keyword">new</span> MindMap({
    el,
    <span class="hljs-attr">data</span>: {
        <span class="hljs-attr">data</span>: {
            <span class="hljs-attr">text</span>: <span class="hljs-string">&#x27;我是自动生成的节点&#x27;</span>
        },
        <span class="hljs-attr">children</span>: [
            {
                <span class="hljs-attr">data</span>: {
                    <span class="hljs-attr">text</span>: <span class="hljs-string">&#x27;子节点&#x27;</span>
                },
                <span class="hljs-attr">children</span>: []
            }
        ]
    }
})
</code></pre>
<p>也可以在实例化之后使用<code>setData</code>方法设置：</p>
<pre class="hljs"><code>mindMap.setData({
    <span class="hljs-attr">data</span>: {
        <span class="hljs-attr">text</span>: <span class="hljs-string">&#x27;我是自动生成的节点&#x27;</span>
    },
    <span class="hljs-attr">children</span>: [
        {
            <span class="hljs-attr">data</span>: {
                <span class="hljs-attr">text</span>: <span class="hljs-string">&#x27;子节点&#x27;</span>
            },
            <span class="hljs-attr">children</span>: []
        }
    ]
})
</code></pre>
<h3>依次生成节点</h3>
<p>如果你想像ChatGPT一样依次生成节点，那么推荐使用<code>updateData</code>方法增量更新节点数据，而不是手动获取到之前插入的节点实例，再调用命令来插入下级节点，这样会复杂很多，当然，如果你能轻松的知道当前创建到哪里了，并且下一个节点在哪个节点下创建，可以忽略。</p>
<blockquote>
<p>updateData方法是v0.9.9+的方法，之前的版本可以使用下面的方法：</p>
</blockquote>
<pre class="hljs"><code><span class="hljs-keyword">const</span> updateData = <span class="hljs-function">(<span class="hljs-params">data</span>) =&gt;</span> {
    mindMap.renderer.setData(data)
    mindMap.render()
    mindMap.command.addHistory()
}
</code></pre>
<p>增量更新的前提是之前生成的节点都存在<code>uid</code>，并且不会变化，这样调用<code>updateData</code>方法渲染时会根据<code>uid</code>来复用之前的节点，只创建新的节点，达到依次生成的目的。</p>
<p>比如第一次返回的数据：</p>
<pre class="hljs"><code><span class="hljs-keyword">const</span> data = {
    <span class="hljs-attr">data</span>: {
        <span class="hljs-attr">text</span>: <span class="hljs-string">&#x27;根节点&#x27;</span>,
        <span class="hljs-attr">uid</span>: <span class="hljs-string">&#x27;1&#x27;</span>
    },
    <span class="hljs-attr">children</span>: []
}

mindMap.setData(data)
</code></pre>
<p>第二次返回的数据：</p>
<pre class="hljs"><code><span class="hljs-keyword">const</span> data = {
    <span class="hljs-attr">data</span>: {
        <span class="hljs-attr">text</span>: <span class="hljs-string">&#x27;根节点&#x27;</span>,
        <span class="hljs-attr">uid</span>: <span class="hljs-string">&#x27;1&#x27;</span>
    },
    <span class="hljs-attr">children</span>: [
        {
            <span class="hljs-attr">data</span>: {
                <span class="hljs-attr">text</span>: <span class="hljs-string">&#x27;二级节点&#x27;</span>,
                <span class="hljs-attr">uid</span>: <span class="hljs-string">&#x27;2&#x27;</span>
            },
            <span class="hljs-attr">children</span>: []
        }
    ]
}

mindMap.updateData(data)
</code></pre>
<p>以此类推，这样虽然是整个数据更新，但是因为复用的原因画布呈现的是依次生成新节点的效果。</p>
<p>当生成的节点多了会有个问题，就是新生成的节点在画布外看不见了，所以我们要将新生成的节点移动到画布中心，首先可以监听<code>data_change_detail</code>事件来获取到详细的更新数据，找出其中新创建的节点数据，然后使用<code>findNodeByUid</code>方法找出对应的节点实例，最后调用<code>moveNodeToCenter</code>方法将该节点移动到画布中心即可。</p>
<pre class="hljs"><code>mindMap.on(<span class="hljs-string">&#x27;data_change_detail&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">list</span>) =&gt;</span> {
    <span class="hljs-comment">// 找出新创建节点中的最后一个</span>
    <span class="hljs-keyword">const</span> lastCreate = list.filter(<span class="hljs-function">(<span class="hljs-params">item</span>) =&gt;</span> {
        <span class="hljs-keyword">return</span> item.action === <span class="hljs-string">&#x27;create&#x27;</span>
    })[<span class="hljs-number">0</span>]
    <span class="hljs-keyword">if</span> (lastCreate) {
        <span class="hljs-keyword">const</span> uid = lastCreate.data.data.uid
        <span class="hljs-keyword">const</span> node = mindMap.renderer.findNodeByUid(uid)
        <span class="hljs-keyword">if</span> (node) {
            mindMap.renderer.moveNodeToCenter(node)
        }
    }
})
</code></pre>
<p>当节点数据多了，可能<code>data_change_detail</code>事件触发时节点树还没渲染完毕，导致获取不到节点，解决这个问题可以通过监听<code>node_tree_render_end</code>事件：</p>
<pre class="hljs"><code><span class="hljs-keyword">let</span> waitUid = <span class="hljs-string">&#x27;&#x27;</span>
mindMap.on(<span class="hljs-string">&#x27;data_change_detail&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">list</span>) =&gt;</span> {
    <span class="hljs-comment">// ...</span>
    <span class="hljs-keyword">if</span> (lastCreate) {
        <span class="hljs-comment">// ...</span>
        <span class="hljs-keyword">if</span> (node) {
            mindMap.renderer.moveNodeToCenter(node)
        } <span class="hljs-keyword">else</span> {
            waitUid = uid
        }
    }
})

mindMap.on(<span class="hljs-string">&#x27;node_tree_render_end&#x27;</span>, <span class="hljs-function">() =&gt;</span>{
    <span class="hljs-keyword">if</span> (waitUid) {
        waitUid = <span class="hljs-string">&#x27;&#x27;</span>
        <span class="hljs-keyword">const</span> node = mindMap.renderer.findNodeByUid(waitUid)
        <span class="hljs-keyword">if</span> (node) {
            mindMap.renderer.moveNodeToCenter(node)
        }
    }
})
</code></pre>
<p>当在<code>data_change_detail</code>事件中没有获取到节点实例就将该<code>uid</code>保存起来，然后在<code>node_tree_render_end</code>事件里判断是否有保存的<code>uid</code>，是的话就获取该节点实例并移动到画布中心。</p>
<p>最后，当自动生成节点中最好禁止用户操作，否则可能会产生异常。</p>
<h3>完整示例</h3>
<iframe style="width: 100%; height: 455px; border: none;" src="https://wanglin2.github.io/playground/#eNrtV19rHDcQ/ypiS9m95rx3bvN0vTOJnUILdVtC+uQNZr2ru1OqlZZdrc+HOQih0DT0IYUWSkto+9QSWvKSByct+TT2XT5GR7uS9t/ZxNBAoTHYXmlmfvObGWkkHVvX49g9zLA1sIZpkJBYoBSLLN7yGIlingh0jBI87iLOdnnGBA67KJ36lPLZTTxGCzROeIRsQLCNxS5h4a4fFyLPSmGa4o0IZjciP/YsjyHkMYoFknNSc4RYRqnHPBZwlgpwFuCdBPsCX6cUpE4HjbbQsTRUJi6wvOEL38knEQrhe1BoyB+Bj8QA2cv73y5/ePLyq8dnD35ffffz8v7D1Y9fvnxwb3XvGdCViotu8T+YEhommA3QnsYwYC30ioezPx/W8KqYDdzberaUX87Fu5fxUXzk40XHYzAuk4u355+y8xJcKEk6HxP4GOmEGGotpjrZvzxTqahwy0gIok3DvOTdZq1lr9FTqV7L9JrkG2enz79ZPf+t7a/0Wa1LvTLra2Oqo+rzv4q8ovMvEnnvTQkujrxu2nB2Docqj5Ovz+VRcrla49Lmc341ahWpVOW/vWTkv/xbnmVwLuEjaJf9sokmGav3VoTIGDmF5tbINFmXYjYR0w6ctCJLoFHnHHKIIEsAQivu5abKfQk1GoHbTpmJ5hkJIHAEFDJJdeYT8TkJAdg2SdA2nDm2dLcfTH02wfshFj6hdhc5FAhUQylJUj8VxWkCkFLNHRMqcOI4ROCoaYNUmEgKXT8QhEOaIAQ7yDGqp1xnr18pgIy49FUJuKQCtZUcjJIrYyn+gKitz3goSevooeYhTnACAbDwE5BtzyFRDpiaBGoi0rJBocyiwYn4IZY4t/gOhttTUpjVVh7CNMVNoLJEDdqVXWI+5QHfrqL0tC8SjPcLNvvwV9ZR1qPiTcaivDXCWbdMLps5jfzasndBOpqZ7fWMhyyGJYFbm6NFoL2DPFFXclrzAY8in4WuH4Yfwl7gyVzrKIYAeotEmGfCqfUGyIzczleu6CH0D2PaRZv9fj8f5TBKlt/rzN28ile5W+OZvpPr6zKmAxTyIIsgre4Eiw8olp/b849Cx1aWO5zB1mc4sTuqOTYarmfJCc9q9GDPkj1YTsNVP7/s1xusZ+n2KnWalz/CiLjJuZBl/4ynRHYH0LIpHgtYvXaQLwT7dq6+6LwPKYA0DHvF4wWeLTCAvhJTqC+MEBqG5BAF0BHSkWep0G7giHtWLlYKJCylJnBQGfZAWlXUSIJzeuBLFR3X8CATAlrZtYCS4AtQqb1iQPH05O7yj1+Ld8jy+6enJ4+Xdx+t/np69uTvs59eDHuF/UV4jYu7xHzx6NUxy2D017BXyRUMUzGnRdquqcecZ7m94gWnlpCL08gN0tSzIPfyIYeQW0mrXgszEorpQC7at3M9hGJTzQSDR3KIc0G+muXvW830a6jS0D9IOc1EYSjPsjGc9X01EjwuB233U0wmU1C/2u/HR9rzer/vaM+Rn0wI+NWoMexpwiZ6wlB31Wp4RcabmoEibcYACCs5r4HVtYoKyDezeyflDJ7oObynBFABs/M8C17gxZZze/DpQnsQ0GNksTYOEj5LoZndAQu1y9a8ygvbdqmlleK2sBb/AOBR7ZA=" />
<h2>在某个节点下自动生成新节点</h2>
<p>在某个节点下自动生成新节点，如果也要依次生成，那么可以使用前面的增量更新数据的方式。如果一次生成，那么可以简单的调用插入新节点的命令即可。</p>
<h3>一次生成下级节点</h3>
<pre class="hljs"><code><span class="hljs-comment">// 插入一个子节点</span>
mindMap.execCommand(<span class="hljs-string">&#x27;INSERT_CHILD_NODE&#x27;</span>, 
    <span class="hljs-literal">false</span>,
    node,
    {
        <span class="hljs-attr">data</span>: {
            <span class="hljs-attr">text</span>: <span class="hljs-string">&#x27;三级节点&#x27;</span>
        },
        <span class="hljs-attr">children</span>: []
    },
    [
        {
            <span class="hljs-attr">data</span>: {
                <span class="hljs-attr">text</span>: <span class="hljs-string">&#x27;三级节点的子节点&#x27;</span>
            },
            <span class="hljs-attr">children</span>: []
        }
    ]
)

<span class="hljs-comment">// 插入多个子节点</span>
mindMap.execCommand(<span class="hljs-string">&#x27;INSERT_MULTI_CHILD_NODE&#x27;</span>, node, [
    {
        <span class="hljs-attr">data</span>: {
            <span class="hljs-attr">text</span>: <span class="hljs-string">&#x27;三级节点&#x27;</span>
        },
        <span class="hljs-attr">children</span>: []
    },
    {
        <span class="hljs-attr">data</span>: {
            <span class="hljs-attr">text</span>: <span class="hljs-string">&#x27;三级节点&#x27;</span>
        },
        <span class="hljs-attr">children</span>: []
    }
])
</code></pre>
<h3>一次生成兄弟节点</h3>
<pre class="hljs"><code><span class="hljs-comment">// 插入一个兄弟节点</span>
mindMap.execCommand(<span class="hljs-string">&#x27;INSERT_NODE&#x27;</span>, 
    <span class="hljs-literal">false</span>,
    node,
    {
        <span class="hljs-attr">data</span>: {
            <span class="hljs-attr">text</span>: <span class="hljs-string">&#x27;二级节点&#x27;</span>
        },
        <span class="hljs-attr">children</span>: []
    },
    [
        {
            <span class="hljs-attr">data</span>: {
                <span class="hljs-attr">text</span>: <span class="hljs-string">&#x27;二级节点的子节点&#x27;</span>
            },
            <span class="hljs-attr">children</span>: []
        }
    ]
)

<span class="hljs-comment">// 插入多个兄弟节点</span>
mindMap.execCommand(<span class="hljs-string">&#x27;INSERT_MULTI_NODE&#x27;</span>, node, [
    {
        <span class="hljs-attr">data</span>: {
            <span class="hljs-attr">text</span>: <span class="hljs-string">&#x27;二级节点&#x27;</span>
        },
        <span class="hljs-attr">children</span>: []
    },
    {
        <span class="hljs-attr">data</span>: {
            <span class="hljs-attr">text</span>: <span class="hljs-string">&#x27;二级节点&#x27;</span>
        },
        <span class="hljs-attr">children</span>: []
    }
])
</code></pre>
<p>这样新创建的节点默认会被激活但不进入编辑，如果你连激活都不想要的话，那么可以通过将实例化选项<code>createNewNodeBehavior</code>设置为<code>notActive</code>。</p>
<p>当自动生成结束后你又想恢复创建新节点时自动进入编辑状态，那么可以通过<code>updateConfig</code>方法修改<code>createNewNodeBehavior</code>：</p>
<pre class="hljs"><code>mindMap.updateConfig({
    <span class="hljs-attr">createNewNodeBehavior</span>: <span class="hljs-string">&#x27;default&#x27;</span>
})
</code></pre>
<h3>完整示例</h3>
<iframe style="width: 100%; height: 455px; border: none;" src="https://wanglin2.github.io/playground/#eNrtV19rG0cQ/yrLliK5yCcl9EmVQ2LZUEPkFDd5yppwvhtJm97tHnd7lo0RlJDSNu1DoH0KFLdQaAntu/Pn40hWPkZmb3dPfw35Q/ySHBzszs78Zm5+M7t7J/RGkniHOdAmbWVByhNFMlB5co0JHicyVeSEpNCtESk6MhcKwhrJ+n4UycEedMmQdFMZkwoiVEqLDhdhx0/MEqMZiiNYj1G6HvsJo0wQwkQEimiZ1twgIo8iJpgIpMgUOgugnYKv4JaAdp9HYQoCtaprZOMaOdEARlHIEFBucTzUCiGF1OuiYBfXNo/v8LB6dU1bOCU4gqAt49gXYbWys/vt9t7te+2vd25u3du9tbVdqWFsBJ+uH2VQM2Ptxg4L5+YJfeU3ZwX6UXCkmqQyOvt58vyfV48eTB48w8y41aFF0U9gv6tJ7u4bqVu9O1VaQF/p8gK3kycPx/8/XgphMYzVoRRaZogSzB9Oltnp5JHil8FP587N2zvzLBWcuFRdBisf1AcT+xclGVtgM5WqD+mHzPCn2n+X2r8EYkzpfxxFjzmaT6VLTJ6gd2hL0eW9qg0hKGjYhUGRTej7h1ymGEsIXR+5wTCGDr08vKrL2PrwgYE7tBw4RE0SyiCPQSivB2o7Aj3cPN5BZqwlhqN8LiCtrNnvXEgRo1rA6FzWGNU500JGz/98ZnLG6EymGM15qBWuONk0j4y6PGqFi5plpeNF56Pnv5aczfmfi+HqrHy+dxZiWe6eon9m7bjgak9KpRn7RmZccanroRJBV2F1VwJMMaZz36pfxLCQ6kag+KG+cyD42leG6lbd3GDw7oITBXjtQHOcEdIK+SEJIj/LNhi19G1BLBktlq0CD6erJbmo0qrj6qyiQ1JSRge+VnEf3DrIlZKCXA8iHnyHKiuvMmgwOvv+/L+/Jr+fnv/0GMejs6ejs19KPlp1g/MmuHOH8ALy+O8n74E8PXlWBjz+4eH45ek7Brwa2MT7dsC4aSDKqx+fjh/9a1AmL347/+N0wXJKohu16jM1gtNMHUemXK7bmyyjXt1cX+324EEWe0GWMYo1p2+xhHgz5eTabcBD1cf+bTQ+L/QIScpqTwE9Yu0WC0Wj6PezxbJzUFND/yCTUa6MISG6Z5qkYWdKJtPJsvs+8F4f1b9sNJIj53m13y+c59hPexz9OtTED0Muek5Qhu7ZLnjDiK+4CGzQ5RwBsYMLDmiNGgb0D4N3P5MC/08KeGYXkIFyc2MUfz/MnubVceiluNfzGDRZ6wepHGR47N5HC7utrPglMbbLVGsrG9uQDl8Db1FoOA==" />
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>