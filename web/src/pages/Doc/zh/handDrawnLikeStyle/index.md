# HandDrawnLikeStyle 收费插件

> 关于收费
>
> mind-map 是一个 MIT 协议的开源项目，理论上只要保留 mind-map 的版权声明，无论是否商用都不收费，这个协议以后也不会改变。另外无论是在线版，还是客户端都不会考虑收费。但是为了项目的可持续发展，会通过一些方式来获取收益，比如现有的赞助方式。而收费插件是第二个方式，基本原则是基本功能、核心功能、必要功能不收费，而可有可无的附加功能可能会做成收费的。
>
> 最后，收费仅针对开发者，如果仅是在线版或者客户端的思维导图用户是无需付费的，所有功能均可免费使用。

HandDrawnLikeStyle 是第一个收费插件，功能是提供手绘风格的样式，也就是节点的连线、形状会变成手绘的样式，就像下面这样：

<img src="../../../../assets/img/docs/手绘风格.png" style="width: 800px" />

你也可以在在线版中通过【基础样式】-【是否开启手绘风格】设置来开启手绘风格样式进行尝试。

内部实现是通过[rough](https://github.com/rough-stuff/rough)库，所以如果你有精力，也可以自己基于这个库来实现这个插件。

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
import HandDrawnLikeStyle from 'handDrawnLikeStyle.cjs.min.js'
// 或 import HandDrawnLikeStyle from 'handDrawnLikeStyle.esm.min.js'

MindMap.usePlugin(HandDrawnLikeStyle)
```

2.引用未打包的源码

可以先进入到插件目录执行：

```bash
npm link
```

然后进入到你的项目根目录执行：

```bash
npm link simple-mind-map-plugin-handdrawnlikestyle
```

然后就可以直接导入进行使用：

```js
import MindMap from 'simple-mind-map'
import HandDrawnLikeStyle from 'simple-mind-map-plugin-handdrawnlikestyle'

MindMap.usePlugin(HandDrawnLikeStyle)
```

注册完且实例化`MindMap`后可通过`mindMap.handDrawnLikeStyle`获取到该实例。

注册该插件后，无需执行其他方法，手绘风格即可生效。

如果你是使用 mindMap.addPlugin 方法来动态注册的组件，那么需要调用一次重新渲染的方法：

```js
mindMap.addPlugin(HandDrawnLikeStyle)
mindMap.reRender()
```

## 方法

以下方法你应该不太会用到。

### createPath(svgPathStr)

- `svgPathStr`：SVG Path字符串

创建一个手绘风格的路径节点，返回SVG的Path节点。

### createPolygon(points)

- `points`：点位数组。

```js
points：[
    [x1, y1],
    ...
]
```

创建一个手绘风格的多边形节点，返回SVG的Path节点。

### transformPath(svgPathStr)

将SVG Path字符串转换成手绘风格的SVG Path字符串。