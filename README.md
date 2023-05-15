<h1 align="center">Simple mind map</h1>

[![npm-version](https://img.shields.io/npm/v/simple-mind-map)](https://www.npmjs.com/package/simple-mind-map)
![npm download](https://img.shields.io/npm/dm/simple-mind-map)
[![GitHub stars](https://img.shields.io/github/stars/wanglin2/mind-map)](https://github.com/wanglin2/mind-map/stargazers)
[![GitHub issues](https://img.shields.io/github/issues/wanglin2/mind-map)](https://github.com/wanglin2/mind-map/issues)
[![GitHub forks](https://img.shields.io/github/forks/wanglin2/mind-map)](https://github.com/wanglin2/mind-map/network/members)
![license](https://img.shields.io/npm/l/express.svg)

> 一个简单&强大的Web思维导图

本项目包含两部分：

1.一个js思维导图库，不依赖任何框架，你可以使用它来快速完成Web思维导图产品的开发。

开发文档：[https://wanglin2.github.io/mind-map/#/doc/zh/](https://wanglin2.github.io/mind-map/#/doc/zh/)

2.一个Web思维导图，基于思维导图库、Vue2.x、ElementUI开发，可以操作电脑本地文件，所以你可以直接把它当做一个在线版思维导图应用使用，如果觉得github的响应速度慢，你也可以部署到你的服务器上。

在线地址：[https://wanglin2.github.io/mind-map/](https://wanglin2.github.io/mind-map/)

另外也提供了客户端可供下载使用，支持`Windows`、`Mac`及`Linux`，下载地址：

Github：[releases](https://github.com/wanglin2/mind-map/releases)。

百度云盘：[地址](https://pan.baidu.com/s/1huasEbKsGNH2Af68dvWiOg?pwd=3bp3)。

# 特性

- [x] 插件化架构，除核心功能外，其他功能作为插件提供，按需使用，减小打包体积
- [x] 支持逻辑结构图、思维导图、组织结构图、目录组织图、时间轴、鱼骨图六种结构
- [x] 内置多种主题，允许高度自定义样式，支持注册新主题
- [x] 支持快捷键
- [x] 节点内容支持图片、图标、超链接、备注、标签、概要
- [x] 支持前进后退
- [x] 支持拖动、缩放
- [x] 支持右键和Ctrl+左键两种多选方式
- [x] 支持节点自由拖拽、拖拽调整
- [x] 支持多种节点形状
- [x] 支持导出为`json`、`png`、`svg`、`pdf`、`markdown`，支持从`json`、`xmind`、`markdown`导入
- [x] 支持小地图、支持水印
- [x] 支持关联线

# 安装

```bash
npm i simple-mind-map
```

# 使用

提供一个宽高不为0的容器元素：

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

然后创建一个实例：

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

即可得到一个思维导图。

想要实现更多功能？可以查看[开发文档](https://wanglin2.github.io/mind-map/#/doc/zh/)。

# License

MIT

# 微信交流群

<img src="./qrcode.jpg" style="width: 300px" />

# 请作者喝杯咖啡

> 厚椰乳一盒 + 纯牛奶半盒 + 冰块 + 咖啡液 = 生椰拿铁 yyds

<p>
  <img src="./web/src/assets/img/alipay.jpg" style="width: 300px" />
  <img src="./web/src/assets/img/wechat.jpg" style="width: 300px" />
</p>