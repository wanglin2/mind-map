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

如果你需要`umd`模块格式的文件，比如以`CDN`的方式在浏览器上使用，那么你可以先通过npm安装`npm i simple-mind-map`，然后在`node_modules/simple-mind-map/dist/`目录中找到`simpleMindMap.umd.min.js`文件和`simpleMindMap.esm.min.css`文件，复制到你的项目中，然后在页面中引入：

```html
<link rel="stylesheet" href="simpleMindMap.esm.min.css">
<script scr="simpleMindMap.umd.min.js"></script>
```

库会创建一个全局变量`window.simpleMindMap`，可以通过`window.simpleMindMap.default`获取到`MindMap`构造函数，然后正常实例化即可，详细信息可以把`window.simpleMindMap`打印出来看一下。

如果不方便使用`npm`来安装，也可以通过一些在线`CDN`服务来获取到这两个文件，比如：

```
https://unpkg.com/simple-mind-map@0.10.2/dist/simpleMindMap.esm.css
https://unpkg.com/simple-mind-map@0.10.2/dist/simpleMindMap.umd.min.js
```

你可以替换其中的版本号。

这种方式的缺点是会包含所有的内容，包括你没有注册的插件（可以在这里[full.js](https://github.com/wanglin2/mind-map/blob/main/simple-mind-map/full.js#L36)查看默认打包进文件的插件），所以整体体积会比较大，如果只想要打包指定的插件，你可以修改该文件，然后重新打包，如有需要也可以联系开发者。

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