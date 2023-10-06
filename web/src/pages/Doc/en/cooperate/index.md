# Cooperate plugin beta

> v0.7.3+

This plugin is used to achieve collaborative editing.

## Introduce

This plugin implements collaborative editing through [Yjs](https://github.com/yjs/yjs). The basic principle is to convert the tree data of the mind map into flat object data, and then collaborate through shared data of type [Y.Map](https://docs.yjs.dev/api/shared-types/y.map). That is, when certain operations are performed on the canvas, the 'y.map' object will be updated, and other collaborative clients will receive the updated data, convert it back to tree structure data, and update the canvas to achieve real-time updates.

To achieve collaboration, the backend is indispensable, and 'Yjs' provides some [Connection Providers](https://docs.yjs.dev/ecosystem/connection-provider). At the same time, it also provides examples of the backend, but it is only the simplest implementation. In actual projects, you should need to rewrite or improve it.

You can choose the 'Provider' that suits you, and the default is [y-webrtc](https://github.com/yjs/y-webrtc).

## demo

If you want to try it through demo, you can do the following steps:

1. Clone project and installation dependencies:

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

2. Modify `web/src/pages/Edit/components/Edit.vue` file

To register Cooperate plugin, uncomment the line:

```js
// .usePlugin(Cooperate)// Cooperate plugin
```

Change the signaling server address to your local IP:

```js
// cooperateTest function

signalingList: ['ws://【your ip】:4444']
```

3. To register a collaborative plugin, uncomment the line:

```bash
// Execute under web path
npm run serve
```

4. Start signaling server:

```bash
// Execute under simple-mind-map path
npm run wsServe
```

The command executes the 'simple mind map/bin/wsServer.mjs' file, which is directly copied from the [y webrtc](https://github.com/yjs/y-webrtc) repository and may not be complete. Please be cautious when using it for actual projects.

5. Access the service address in two browsers:

```
http://【your ip】:8080/#/?userName=userName
```

You can set different userNames on different browsers. Then you can edit in one browser and see the automatic update in another browser.

## Register

```js
import MindMap from 'simple-mind-map'
import Cooperate from 'simple-mind-map/src/plugins/Cooperate.js'
MindMap.usePlugin(Cooperate)
```

After registration and instantiation of `MindMap`, the instance can be obtained through `mindMap.cooperate`.

## Methods

### getDoc()

Obtain Yjs doc instance.

### setProvider(provider, webrtcProviderConfig)

- `provider`: The connection provider for Yjs can refer to the [Connection Provider](https://docs.yjs.dev/ecosystem/connection-provider), default is `null`

- `webrtcProviderConfig`: the options of webrtc provider, An object needs to be passed in the following format:

```js
{ 
    roomName: '', // Mandatory, room name
    signalingList: [''],// Mandatory, specify signaling server
    ...// The other config of webrtc provider
}
```

For detailed configuration, please refer to [y-webrtc](https://github.com/yjs/y-webrtc)。

Set the connection provider for Yjs. If 'provider' is not transmitted, 'y webrtc' will be used by default. You can also use other 'providers'.

If the default 'y webrtc' is used, the necessary configuration needs to be passed in through the second parameter.

`simple-mind-map/bin/wsServer.mjs` file provides a simple signaling server code for testing and reference.

### setUserInfo(userInfo)

- `userInfo`: User information. The format is as follows:

```js
{
   id: '',     // Mandatory, user's unique ID
   name: '',   // User name. Only one name and avatar can be transmitted. If both are transmitted, avatar will be displayed
   avatar: '', // User profile
   color: ''   // If there is no avatar, the first character of the name will be displayed as a circle, and the color of the text will be white. The color of the circle can be set through this field
}
```

Set the current user's information for synchronization and display of perceptual data. If other collaborators activate a node, their avatar will be displayed above that node in your current canvas.