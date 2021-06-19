![](./assets/swdt.jpg)

# 简介

思维导图是一种常见的表达发散性思维的有效工具，市面上有非常多的工具可以用来画思维导图，百度一下，整页都是广告可供选择，此外也有一些可以用来帮助快速实现的`JavaScript`类库，如：[jsMind](https://github.com/hizzgdev/jsmind)、[KityMinder](https://github.com/fex-team/kityminder)。

本文会介绍如何从头实现一个简易的思维导图。



# 技术选型

这种图形类的绘制一般有两种选择，`svg`与`canvas`，因为思维导图主要是节点与线的连接，使用与`html`比较接近的`svg`比较好操作，`svg`类库也有挺多，在试用了[svgjs](https://svgjs.dev/docs/3.0/)和[snap](http://snapsvg.io/)后，有些需求在`snap`里没有找到对应的方法，所以最终选择了`svgjs`，视图库使用的是`vue2.x`全家桶。



# 数据结构

这里主要指每个节点的数据结构，大概需要包含是否是根节点、节点层级、节点内容（包括文本、图片、图标等固定格式）、节点展开状态、子节点、父节点等等，此外还包括该节点的特定样式，用来覆盖主题的默认样式：

```js

```

每次操作都会修改这份配置数据，然后整体刷新，有点数据驱动的意思，好处很明显，只用维护数据就行了，不用陷入对视图的操作。



# 逻辑结构图

思维导图常见的有几种变种，我们先看最基础的【逻辑结构图】如何布局，其他的可以在末尾小节查看。



## 节点定位



## 节点连线



# 支持图片、图标



# 展开收缩



# 文字编辑

# 拖动、放大缩小

# 主题

# 节点样式编辑

# 快捷键

快捷键就是监听了到特定的按键来执行特定的操作，包含单个按键和组合键，我们可以使用一个对象来保存快捷键和对应的命令，`key`代表按键，`value`代表要执行的命令，比如：

```js
const shortcutKeys = {
	'enter': 'addSiblingNode',
    'ctrl+b': 'bold'
}
```

包含两种类型，单个按键、以`+`拼接的组合键，接下来只要监听`keydown`事件来检查即可，首先要说明的是组合键一般指的是`ctrl`、`alt`、`shift`



# 实现过渡效果

# 回退

# 导入导出、其他格式

https://github.com/canvg/canvg

https://github.com/fex-team/kityminder/tree/dev/src/protocol

https://github.com/fex-team/kityminder/tree/dev/native-support

json、freemind、xmind

png、svg

# 其他几种变种结构

逻辑结构图、鱼骨图、思维导图、组织结构图、目录组织图

