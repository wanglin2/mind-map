# 如何自定义节点内容

> 该特性v0.6.3+版本支持

如果你想自定义节点的内容，那么可以在实例化`simple-mind-map`时传入以下选项：

```js
new MindMap({
    isUseCustomNodeContent: true,
    customCreateNodeContent: (node) => {
        // return你的自定义DOM节点
    }
})
```

`customCreateNodeContent`方法会接收当前遍历到的节点实例作为参数，一般而言你会需要该节点的数据，这可以通过如下方式获取：

```js
node.nodeData.data
```

其他节点实例属性你可以自行打印出来看看。

`customCreateNodeContent`方法需要返回`DOM`节点，如果某个节点你不想自定义，那么可以返回`null`，那么还是会走内置的节点渲染逻辑。

返回的`DOM`节点的宽高需要是确定的，如果是动态的那么会导致宽高获取错误，最终导致节点定位错误和发生重叠等问题。

如果使用了自定义节点内容，那么内置的插入节点内容的相关方法你都不应该再使用，因为相当于整个节点内容都由你自己控制，另外，节点样式设置也不会再生效，切换主题也只会切换非节点内容的样式，最后，双击节点也不会再进入编辑，所以这个功能一般用于展示性的需求。

## 示例1：渲染自定义DOM节点

```js
{
    customCreateNodeContent: (node) => {
        let div = document.createElement('div')
        div.className = 'xxx'
        div.style.cssText = `xxx`
        div.innerHTML = `
            <h1>我是自定义节点</h1>
            ${ node.nodeData.text }
        `
        return div
    }
}
```

## 示例2：渲染Vue2组件

如果想要使用一个相对简单的`Vue`组件，那么可以通过如下方式：

```js
import CustomNodeContent from 'CustomNodeContent.vue'
import Vue from 'vue'

{
    customCreateNodeContent: (node) => {
        let el = document.createElement('div')
        let Comp = Vue.extend(CustomNodeContent)
        let comp = new Comp({
            // props
            propsData: {
                html: node.nodeData.data.text
            }
        })
        comp.$mount(el)
        return comp.$el
    }
}
```

如果你的`Vue`组件比较复杂，里面用到了`vueRouter`、`vuex`、`i18n`等，那么要和你项目的入口组件一样，在实例化时要把这些内容也加载到组件内，不然会报错。

```js
import CustomNodeContent from 'CustomNodeContent.vue'
import Vue from 'vue'
import router from './router'
import store from './store'
import i18n from './i18n'

{
    customCreateNodeContent: (node) => {
        let el = document.createElement('div')
        let Comp = Vue.extend(CustomNodeContent)
        let comp = new Comp({
            // props
            propsData: {
                html: node.nodeData.data.text
            },
            router,
            store,
            i18n
        })
        comp.$mount(el)
        return comp.$el
    }
}
```

## 示例3：渲染Vue3组件

```js
import { createApp } from "vue"
import CustomNodeContent from './CustomNodeContent.vue'

{
    customCreateNodeContent: (node) => {
        let el = document.createElement('div')
        const app = createApp(CustomNodeContent, {// props
            html: node.nodeData.data.text
        })
        app.mount(el)
        return el
    }
}
```

## 示例4：渲染react组件

```js
import { createRoot } from 'react-dom/client'

{
    customCreateNodeContent: (node) => {
        const el = document.createElement('div')
        el.style.width = '227px'
        el.style.height = '60px'
        const currentNode = node.nodeData.data
        const root = createRoot(el)
        root.render({currentNode.text})
        return el
    }
}
```

> 感谢[h5chenhang](https://github.com/h5chenhang)贡献的[示例代码](https://github.com/wanglin2/mind-map/issues/192)。

## 常见问题

1.点击自定义内容中的输入框无法获取焦点和输入

解决方法：阻止输入框的`mousedown`事件的冒泡。