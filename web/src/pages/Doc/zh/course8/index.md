# 开启节点富文本编辑

默认节点编辑是不支持富文本模式的，如果要开启需要使用富文本编辑插件，但是富文本编辑模式目前存在缺陷，详情可以阅读[richText](https://wanglin2.github.io/mind-map/#/doc/zh/richText)。

富文本编辑的优势就是可以对一个节点内的部分文本设置样式，所以通常来说还需要搭配一个悬浮的工具栏，这个功能默认也是没有的，涉及到UI的功能一般都不提供，所以也需要你自行开发，如何渲染这个悬浮工具栏可以阅读[如何渲染富文本的悬浮工具栏](https://wanglin2.github.io/mind-map/#/doc/zh/course16)。

如果也你需要动态切换是否开启富文本编辑的功能可以参考如下代码：

```js
import MindMap from 'simple-mind-map'
import RichText from 'simple-mind-map/src/plugins/RichText.js'
// import RichText from 'simple-mind-map/src/RichText.js' v0.6.0以下版本使用该路径

// 动态开启富文本编辑
mindMap.addPlugin(RichText)

// 动态关闭富文本编辑
mindMap.removePlugin(RichText)
```

如果你使用的是`simpleMindMap.umd.js`或`simpleMindMap.esm.js`这种打包后的完整版，那么是不支持切换的，默认是就是开启的，如有相关需求可以提[issue](https://github.com/wanglin2/mind-map/issues)。