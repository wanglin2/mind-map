# Cooperate 插件 beta

> v0.7.3+

该插件用于实现协同编辑。

## 介绍

该插件通过[Yjs](https://github.com/yjs/yjs)实现协同编辑，基本原理是将思维导图的树数据转成平级的对象数据，然后通过[Y.Map](https://docs.yjs.dev/api/shared-types/y.map)类型的共享数据进行协同，即当画布上进行了某些操作后会更新`y.map`对象，然后其他协同的客户端会接收到更新后的数据，再转换回树结构数据，更新画布即可实现实时更新。

要实现协同，后端是少不了的，`Yjs`提供了一些[Connection Provider](https://docs.yjs.dev/ecosystem/connection-provider)。同时也提供了后端的示例，但只是最简单的实现，实际项目中你应该需要重写或完善。

你可以选择适合自己的`Provider`，默认使用的是[y-webrtc](https://github.com/yjs/y-webrtc)。

## demo

如果你想通过demo来尝试一下可以通过以下步骤：

1. 克隆项目及安装依赖：

```bash
git clone https://github.com/wanglin2/mind-map.git
cd mind-map
cd simple-mind-map
npm i
npm link
cd ..
cd web
npm i
npm link simple-mind-map
```

2. 修改`web/src/pages/Edit/components/Edit.vue`文件

注册协同插件，即取消该行注释：

```js
// .usePlugin(Cooperate)// 协同插件
```

将信令服务器地址改为你本机的ip：

```js
// cooperateTest 函数

signalingList: ['ws://【你的ip】:4444']
```

3. 启动demo项目的本地服务：

```bash
// web路径下执行
npm run serve
```

4. 启动信令服务器：

```bash
// simple-mind-map路径下执行
npm run wsServe
```

该命令执行的是`simple-mind-map/bin/wsServer.mjs`文件，该文件的内容是从[y-webrtc](https://github.com/yjs/y-webrtc)仓库直接复制的，可能并不完善，请谨慎用于实际项目。

5. 在两个浏览器中访问服务地址：

```
http://【你的ip】:8080/#/?userName=用户名
```

你可以在不同的浏览器上设置不同的userName。然后就可以在一个浏览器中编辑，在另一个浏览器上看到自动更新了。

## 注册

```js
import MindMap from 'simple-mind-map'
import Cooperate from 'simple-mind-map/src/plugins/Cooperate.js'
MindMap.usePlugin(Cooperate)
```

注册完且实例化`MindMap`后可通过`mindMap.cooperate`获取到该实例。

## 方法

### getDoc()

获取Yjs doc实例。

### setProvider(provider, webrtcProviderConfig)

- `provider`：Yjs的连接提供者，可参考[Connection Provider](https://docs.yjs.dev/ecosystem/connection-provider)，默认为`null`

- `webrtcProviderConfig`：webrtc provider的配置参数，需要传递一个对象，格式如下：

```js
{ 
    roomName: '', // 必传，房间名称 
    signalingList: [''],// 必传，指定信令服务器
    ...// webrtc provider的其他配置
}
```

详细配置可参考[y-webrtc](https://github.com/yjs/y-webrtc)。

设置Yjs的连接提供者，`provider`如果不传，那么默认会使用`y-webrtc`，你也可以使用其他的`provider`。

如果使用默认的`y-webrtc`，那么需要通过第二个参数传入必要的配置。

`simple-mind-map/bin/wsServer.mjs`文件提供了一个简单的信令服务器代码，可供测试和参考。

### setUserInfo(userInfo)

- `userInfo`：用户信息。格式如下：

```js
{
   id: '',     // 必传，用户唯一的id
   name: '',   // 用户名称。name和avatar两个只传一个即可，如果都传了，会显示avatar
   avatar: '', // 用户头像
   color: ''   // 如果没有传头像，那么会以一个圆形来显示名称的第一个字，文字的颜色为白色，圆的颜色可以通过该字段设置
}
```

设置当前用户的信息，用于感知数据的同步和显示。即如果其他协同人员激活了某个节点时，会在你当前画布中的该节点上方显示他的头像。