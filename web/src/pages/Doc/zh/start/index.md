# 开始

## 安装

```bash
npm i simple-mind-map
```

`0.2.0`版本之前的注意事项：

> 注意：本项目为源码直接发布，并未进行打包，如果出现编译失败的情况，Vue CLI创建的项目可以在vue.config.js文件中增加如下配置来让babel-loader编译本依赖：
> 
> ```js
> module.exports = {
>      transpileDependencies: ['simple-mind-map']
> }
> ```
> 
> 其他项目请自行修改打包配置。

## 使用

> 本仓库的`web`目录提供了一个基于`Vue2`的完整项目，如果你遇到了一些使用上的疑惑，可以参考该项目的实现。

> 想要了解在其他框架中的使用，你可以参考以下这些非官方的实现：
>
> 1.[https://github.com/huangyuanyin/hyy-vue3-mindMap](https://github.com/huangyuanyin/hyy-vue3-mindMap)：一个基于 Vue3.2 +ElementPlus的思维导图。

首先提供一个宽高不为0的容器元素：

```html
<div id="mindMapContainer"></div>
```

另外再设置一下`css`样式：

```css
#mindMapContainer * {
  margin: 0;
  padding: 0;
}
```

然后引入`simple-mind-map`库，创建一个实例：

```js
import MindMap from "simple-mind-map";

const mindMap = new MindMap({
  el: document.getElementById('mindMapContainer'),
  data: {
    "data": {
        "text": "根节点"
    },
    "children": []
  }
});
```

这样即可得一个思维导图。

如果你想要实现一个完整思维导图，那么通常你需要开发一些ui界面，通过`simple-mind-map`库提供的接口来实现更多功能。

`simple-mind-map`支持丰富的配置、事件、命令，以及一些额外的插件扩展，阅读后续的文档来了解更多吧。

默认引入的是未打包的`ES`模块，且只包含核心功能，不包含未注册的插件内容，能有效减小体积，不过你需要在你的项目中配置`babel`编译`simple-mind-map`，防止一些较新的`js`语法部分浏览器不支持。

如果你不想一开始就加载所有插件，想在实例化了之后再异步加载和注册插件，可以这么做：

```js
import('simple-mind-map/src/plugins/Export.js').then(res => {
  mindMap.addPlugin(res.default)
})
```

如果你需要`umd`模块格式的文件，比如以`CDN`的方式在浏览器上使用，那么你可以从`/simple-mind-map/dist/`目录中找到`simpleMindMap.umd.min.js`文件和`simpleMindMap.css`文件，复制到你的项目中，然后在页面中引入：

```html
<link rel="stylesheet" href="simpleMindMap.css">
<script scr="simpleMindMap.umd.min.js"></script>
```

会创建一个全局变量`window.simpleMindMap`，可以通过`window.simpleMindMap.default`获取到`MindMap`构造函数，详细信息可以把`window.simpleMindMap`打印出来看一下。

这种方式的缺点是会包含所有的内容，包括你没有注册的插件，所以整体体积会比较大。

（v0.5.4+）如果你想直接在浏览器端通过`ES`模块的方式来使用，你可以在`/simple-mind-map/dist/`目录中找到`simpleMindMap.esm.js`和`simpleMindMap.esm.css`文件。

也可以使用在线cdn服务，比如：

```
https://unpkg.com/browse/simple-mind-map@0.9.2/dist/
```

可以找到某个版本的所有打包后的文件。

## 开发

如果你只是使用库的话可以不用阅读此小节。

### 本地开发

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
npm run serve
```

> 如果安装依赖出错，可以尝试调整node版本，作者使用的是14.x版本。

### 打包库

自`0.2.0`版本开始增加了对核心库`simple-mind-map`的打包，复用了示例项目`web`的打包工具。

```bash
cd web
npm run buildLibrary
```

打包入口为`simple-mind-map/full.js`，默认会引入所有插件，如果你不需要所有插件的话，那么可以修改该文件，只引入你需要的插件，这样可以减少打包后的文件体积。

`simple-mind-map`库的`package.json`文件提供了两个导出字段：

```json
{
  "module": "index.js",
  "main": "./dist/simpleMindMap.umd.min.js",
}
```

支持`module`字段的环境会以`index.js`为入口，否则会以打包后的`simpleMindMap.umd.min.js`为入口。

#### 生成TypeScript类型文件

```bash
cd simple-mind-map
npm run types
```

即可得到`simple-mind-map/types/`目录下的类型文件。

### 编译文档

```bash
cd web 
npm run buildDoc
```

### 打包demo

```bash
cd web
npm run build
```

会自动把`index.html`移动到根目录。

## 问题

### 1.在Vite中使用报错，提示xml-js依赖出错

解决方法：使用如下引入方式：

```js
import MindMap from "simple-mind-map/dist/simpleMindMap.umd.min"
```

`simple-mind-map`包提供未打包的入口字段`module`，依赖的`xml-js`包需要引入`node`环境下的包，所以在`Vite`中获取不到会报错，所以指定引入打包后的入口，相关包都已打包进产物，所以不会报错。

如果需要二次开发，也就是必须要使用未打包代码的话，如果你不需要解析`xmind`文件的话，可以去除`xmind`模块，如果需要的话那么可以尝试换成其他的解析`xml`为`json`的库。

### 2.报错`Getting bbox of element "text" is not possible: TypeError: Cannot read properties of undefined (reading 'apply')`

原因为安装的`@svgdotjs/svg.js`版本太高，手动降到`3.0.16`版本即可。

### 3.TypeError: Cannot read properties of undefined (reading 'prototype') at sax.js:222:46 

可以在打包配置文件中增加如下配置：

```js
resolve: { alias: { stream: "stream-browserify" } }
```

不同的打包工具可能具体配置不一样，原理就是排除`stream`依赖。

### 4.点击【新建】、【打开】、【另存为】按钮时提示浏览器不支持，或者非https协议。

浏览器上操作电脑本地文件使用的是[window.showOpenFilePicker](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/showOpenFilePicker)api，如果不支持，要么是浏览器不支持这个API，要么是因为页面非https协议，你可以按F12，或者在页面通过鼠标右键菜单中的【检查】打开浏览器控制台，在其中的【控制台】或【console】tab中输入`window.showOpenFilePicker`按回车，如果返回`undefined`则代表不支持，如果返回的不是这个，而页面依旧提示提示浏览器不支持，或者非https协议，那么可以提交issue，或者联系作者。

### 5.引入simple-mind-map报错，报错信息如下：

<img src="../../../../assets/img/docs/错误.jpg" style="width: 850px" />

这是因为你的构建环境不支持该js语法，该语法出自`@svgdotjs/svg.js`库，解决方法如下：

1.手动降低`@svgdotjs/svg.js`库的版本，你可以在你的项目中手动安装低版本，比如：`npm i @svgdotjs/svg.js@3.0.16`

2.不降低版本的话，可以通过修改你的构建工具的相关配置，修改`babel`的配置，让它编译一下`node_modules`中的`simple-mind-map`库，或`@svgdotjs/svg.js`库，如果用的是`vue-cli`或`vite`，它们也直接提供了相关配置。另外需要安装编译该语法的`babel`插件，并且配置到`babel`的配置文件中：

`@babel/plugin-proposal-nullish-coalescing-operator`、`@babel/plugin-proposal-optional-chaining`。