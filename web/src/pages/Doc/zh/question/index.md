# 常见问题

## 1.在Vite中使用报错，提示xml-js依赖出错

解决方法：使用如下引入方式：

```js
import MindMap from "simple-mind-map/dist/simpleMindMap.umd.min"
```

`simple-mind-map`包提供未打包的入口字段`module`，依赖的`xml-js`包需要引入`node`环境下的包，所以在`Vite`中获取不到会报错，所以指定引入打包后的入口，相关包都已打包进产物，所以不会报错。

如果需要二次开发，也就是必须要使用未打包代码的话，如果你不需要解析`xmind`文件的话，可以去除`xmind`模块，如果需要的话那么可以尝试换成其他的解析`xml`为`json`的库。

## 2.报错`Getting bbox of element "text" is not possible: TypeError: Cannot read properties of undefined (reading 'apply')`

原因为安装的`@svgdotjs/svg.js`版本太高，手动降到`3.0.16`版本即可。

## 3.TypeError: Cannot read properties of undefined (reading 'prototype') at sax.js:222:46 

可以在打包配置文件中增加如下配置：

```js
resolve: { alias: { stream: "stream-browserify" } }
```

不同的打包工具可能具体配置不一样，原理就是排除`stream`依赖。

## 4.点击【新建】、【打开】、【另存为】按钮时提示浏览器不支持，或者非https协议。

浏览器上操作电脑本地文件使用的是[window.showOpenFilePicker](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/showOpenFilePicker)api，如果不支持，要么是浏览器不支持这个API，要么是因为页面非https协议，你可以按F12，或者在页面通过鼠标右键菜单中的【检查】打开浏览器控制台，在其中的【控制台】或【console】tab中输入`window.showOpenFilePicker`按回车，如果返回`undefined`则代表不支持，如果返回的不是这个，而页面依旧提示提示浏览器不支持，或者非https协议，那么可以提交issue，或者联系作者。

## 5.引入simple-mind-map报错，报错信息如下：

<img src="../../../../assets/img/docs/错误.jpg" style="width: 850px" />

这是因为你的构建环境不支持该js语法，该语法出自`@svgdotjs/svg.js`库，解决方法如下：

1.手动降低`@svgdotjs/svg.js`库的版本，你可以在你的项目中手动安装低版本，比如：`npm i @svgdotjs/svg.js@3.2.0`

2.不降低版本的话，可以通过修改你的构建工具的相关配置，修改`babel`的配置，让它编译一下`node_modules`中的`simple-mind-map`库，或`@svgdotjs/svg.js`库，如果用的是`vue-cli`或`vite`，它们也直接提供了相关配置。另外需要安装编译该语法的`babel`插件，并且配置到`babel`的配置文件中：

`@babel/plugin-proposal-nullish-coalescing-operator`、`@babel/plugin-proposal-optional-chaining`。