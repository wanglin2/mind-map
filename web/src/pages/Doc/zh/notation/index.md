# Notation 收费插件

> 关于收费
>
> mind-map 是一个 MIT 协议的开源项目，理论上只要保留 mind-map 的版权声明，无论是否商用都不收费，这个协议以后也不会改变。另外无论是在线版，还是客户端都不会考虑收费。但是为了项目的可持续发展，会通过一些方式来获取收益，比如现有的赞助方式。而收费插件是第二个方式，基本原则是基本功能、核心功能、必要功能不收费，而可有可无的附加功能可能会做成收费的。
>
> 最后，收费仅针对开发者，如果仅是在线版或者客户端的思维导图用户是无需付费的，所有功能均可免费使用。

Notation 是第二个收费插件，功能是提供单个节点的标记功能，也就是可以在单个节点上加个手绘风格的圈、背景、删除线等等，支持动画效果，就像下面这样：

<img src="../../../../assets/img/docs/标记.jpg" style="width: 900px" />

你也可以在在线版中进行体验，先激活节点，然后点击上方【标记】按钮添加标记。

内部实现是通过[rough-notation](https://github.com/rough-stuff/rough-notation)库，所以如果你有精力，也可以自己基于这个库来实现这个插件。

## 收费

现阶段收费方式比较原始，通过扫码转账备注你要购买的插件，以及你的邮箱地址，然后会将插件文件发送到你的邮箱。购买请在充分的使用和考虑后进行，如果你对前端开发不太熟悉，不知道如何使用插件，那么请谨慎考虑购买，没有特殊原因不会退费。如果你发现了 bug，或者有需求，可以提交相关的 issue。

价格：

1.￥ 19.9，仅包含打包后的文件，即.cjs.min.js、.esm.min.js 两种格式的文件。

2.￥ 29.9，包含未打包的源码和打包后的文件。

<img src="../../../../assets/img/alipay.jpg" style="width: 300px" />

<img src="../../../../assets/img/wechat.jpg" style="width: 300px" />

## 注册

1.引用打包后的文件：

```js
import MindMap from 'simple-mind-map'
import Notation from 'notation.cjs.min.js'
// 或 import Notation from 'notation.esm.min.js'

MindMap.usePlugin(Notation)
```

2.引用未打包的源码

可以先进入到插件目录执行：

```bash
npm link
```

然后进入到你的项目根目录执行：

```bash
npm link simple-mind-map-plugin-notation
```

然后就可以直接导入进行使用：

```js
import MindMap from 'simple-mind-map'
import Notation from 'simple-mind-map-plugin-notation'

MindMap.usePlugin(Notation)
```

注册完且实例化`MindMap`后可通过`mindMap.notation`获取到该实例。

注册该插件后，无需执行其他方法，手绘风格即可生效。

如果你是使用 mindMap.addPlugin 方法来动态注册的组件，那么需要调用一次重新渲染的方法：

```js
mindMap.addPlugin(Notation)
mindMap.reRender()
```

## 命令

注册了本插件后会在思维导图实例上新增`SET_NOTATION`命令，给节点添加标记使用该命令：

```js
mindMap.execCommand('SET_NOTATION', appointNodes, show, config)
```

该命令可以传递三个参数：

- `appointNodes`：给指定的节点实例添加标记，可以传单个节点实例，也可以传递一个节点实例数组，如果传空数组，则会给当前激活的节点添加标记；

- `show`：Boolean，必传，是否显示编辑；

- `config`：Object，可选，标记配置，对象格式，对象的详细字段如下：

| 字段名称 | 类型  | 默认值 | 描述 |
| ------- | ----- | ----- | ---- |
| type | String | circle | 标记类型，可选值：underline（下划线）、box（边框）、circle（圆）、highlight（高亮）、strike-through（删除线）、crossed-off（叉） |
| color | String | 思维导图实例化选项中的hoverRectColor配置 | 颜色 |
| strokeWidth | Number | 1 | 线宽 |
| padding | Number | 20 | 内边距 |
| animate | Boolean | true | 是否开启动画 |

示例：

```js
// 给当前激活的节点添加一个圆类型的标记
mindMap.execCommand('SET_NOTATION', [], true, {
    type: 'circle',
    color: 'red'
})
```

添加标记后数据会以`notation`为名称保存到节点的`data`数据中。