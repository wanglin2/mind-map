# HandDrawnLikeStyle chargeable plugin

> Regarding fees
>
> Mind map is an open-source project under the MIT protocol. In theory, as long as the copyright statement of mind map is retained, there is no charge for commercial use, and this protocol will not be changed in the future. Moreover, neither the online version nor the client will consider charging. However, in order to ensure the sustainable development of the project, revenue will be obtained through various means, such as existing sponsorship methods. The second approach is to use paid plugins, with the basic principle that basic functions, core functions, and necessary functions are not charged, while optional additional functions may be charged.
>
> Finally, the fee is only applicable to developers. If it is only the online version or client version of the mind map, users do not need to pay, and all functions can be used for free.

HandDrawnLikeStyle is the first paid plugin that provides a hand drawn style, where the connections and shapes of nodes become hand drawn, just like the following:

<img src="../../../../assets/img/docs/手绘风格.png" style="width: 800px" />

You can also try to turn on the hand drawn style in the online version through the settings of 【 Basic Style 】 - 【 Enable Hand drawn Style 】.

The internal implementation is through the [rough](https://github.com/rough-stuff/rough) library, so if you have the energy, you can also implement this plugin based on this library yourself.

## Charge

At present, the charging method is relatively primitive. By scanning the code and transferring money, please note the plugin you want to purchase and your email address, and then the plugin file will be sent to your email. Purchase should be made after full use and consideration. If you are not familiar with front-end development and do not know how to use plugins, please consider purchasing carefully. There will be no refund unless there are special reasons. If you find bugs or have requirements, you can submit relevant issues.

Price:

1.￥ 19.9, Only includes the packaged files, which are in two formats: .cjs.min.js and .esm.min.js.

2.￥ 29.9, including unpackaged source code and packaged files.

<img src="../../../../assets/img/alipay.jpg" style="width: 300px" />

<img src="../../../../assets/img/wechat.jpg" style="width: 300px" />

## Register

1.Referencing packaged files:

```js
import MindMap from 'simple-mind-map'
import HandDrawnLikeStyle from 'handDrawnLikeStyle.cjs.min.js'
// or import HandDrawnLikeStyle from 'handDrawnLikeStyle.esm.min.js'

MindMap.usePlugin(HandDrawnLikeStyle)
```

2.Referencing Unpackaged Source Code

You can first enter the plugin directory to execute:

```bash
npm link
```

Then enter your project root directory to execute:

```bash
npm link simple-mind-map-plugin-handdrawnlikestyle
```

Then you can directly import it for use:

```js
import MindMap from 'simple-mind-map'
import HandDrawnLikeStyle from 'simple-mind-map-plugin-handdrawnlikestyle'

MindMap.usePlugin(HandDrawnLikeStyle)
```

After registration and instantiation of `MindMap`, the instance can be obtained through `mindMap.handDrawnLikeStyle`.

After registering the plugin, there is no need to perform other methods and the hand drawn style can take effect.

If you are using the mindMap.addPlugin method to dynamically register a component, you need to call the method of re rendering once:

```js
mindMap.addPlugin(HandDrawnLikeStyle)
mindMap.reRender()
```

## Methods

You may not be familiar with the following methods.

### createPath(svgPathStr)

- `svgPathStr`：SVG Path string

Create a hand drawn style path node and return the path node of SVG.

### createPolygon(points)

- `points`：Points array

```js
points：[
    [x1, y1],
    ...
]
```

Create a hand drawn polygon node and return the Path node of SVG.

### transformPath(svgPathStr)

Convert SVG Path strings to hand drawn SVG Path strings.