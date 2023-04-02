# 开始

## 开发

### 本地开发

```bash
git clone https://github.com/wanglin2/mind-map.git
cd simple-mind-map
npm i
npm link
cd ..
cd web
npm i
npm link simple-mind-map
npm run serve
```

### 打包库

自`0.2.0`版本开始增加了对核心库`simple-mind-map`的打包，复用了示例项目`web`的打包工具。

```bash
cd web
npm run buildLibrary
```

`simple-mind-map`库的`package.json`文件提供了两个导出字段：

```json
{
  "module": "index.js",
  "main": "./dist/simpleMindMap.umd.min.js",
}
```

支持`module`字段的环境会以`index.js`为入口，否则会以打包后的`simpleMindMap.umd.min.js`为入口。

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

```html
<div id="mindMapContainer"></div>
```

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

默认引入的是未打包的`ES`模块，且只包含核心功能，不包含未注册的插件内容，能有效减小体积，不过你需要在你的项目中配置`babel`编译`simple-mind-map`，防止一些较新的`js`语法部分浏览器不支持。

如果你需要`umd`模块格式的文件，比如以`CDN`的方式在浏览器上使用，那么你可以从`/simple-mind-map/dist/`目录中找到`simpleMindMap.umd.min.js`文件，复制到你的项目中，然后在页面中引入：

```html
<script scr="simpleMindMap.umd.min.js"></script>
```

会创建一个全局变量`window.simpleMindMap`。

这种方式的缺点是会包含所有的内容，包括你没有注册的插件，所以整体体积会比较大。

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