<h1 align="center">Simple mind map</h1>

[![npm-version](https://img.shields.io/npm/v/simple-mind-map)](https://www.npmjs.com/package/simple-mind-map)
![npm download](https://img.shields.io/npm/dm/simple-mind-map)
[![GitHub stars](https://img.shields.io/github/stars/wanglin2/mind-map)](https://github.com/wanglin2/mind-map/stargazers)
[![GitHub issues](https://img.shields.io/github/issues/wanglin2/mind-map)](https://github.com/wanglin2/mind-map/issues)
[![GitHub forks](https://img.shields.io/github/forks/wanglin2/mind-map)](https://github.com/wanglin2/mind-map/network/members)
![license](https://img.shields.io/npm/l/express.svg)

> 一个简单&强大的Web思维导图

本项目包含两部分：

1.一个 js 思维导图库，不依赖任何框架，你可以使用它来快速完成 Web 思维导图产品的开发。

开发文档：[https://wanglin2.github.io/mind-map/#/doc/zh/](https://wanglin2.github.io/mind-map/#/doc/zh/)。

2.一个 Web 思维导图，基于思维导图库、Vue2.x、ElementUI 开发，可以操作电脑本地文件，所以你可以直接把它当做一个在线版思维导图应用使用，如果觉得 github 的响应速度慢，你也可以部署到你的服务器上。

在线地址：[https://wanglin2.github.io/mind-map/](https://wanglin2.github.io/mind-map/)。

另外也提供了客户端可供下载使用，支持`Windows`、`Mac`及`Linux`，下载地址：

Github：[releases](https://github.com/wanglin2/mind-map/releases)。

百度云盘：[地址](https://pan.baidu.com/s/1huasEbKsGNH2Af68dvWiOg?pwd=3bp3)。

> 客户端版本会落后于在线版本，尝试最新功能请优先使用在线版。

# 特性

- [x] 插件化架构，除核心功能外，其他功能作为插件提供，按需使用，减小打包体积
- [x] 支持逻辑结构图、思维导图、组织结构图、目录组织图、时间轴（横向、竖向）、鱼骨图等结构
- [x] 内置多种主题，允许高度自定义样式，支持注册新主题
- [x] 节点内容支持文本（普通文本、富文本）、图片、图标、超链接、备注、标签、概要、数学公式
- [x] 节点支持拖拽（拖拽移动、自由调整）、多种节点形状，支持使用 DDM 完全自定义节点内容
- [x] 支持画布拖动、缩放
- [x] 支持鼠标按键拖动选择和Ctrl+左键两种多选节点方式
- [x] 支持导出为`json`、`png`、`svg`、`pdf`、`markdown`、`xmind`，支持从`json`、`xmind`、`markdown`导入
- [x] 支持快捷键、前进后退、关联线、搜索替换、小地图、水印、滚动条
- [x] 提供丰富的配置，满足各种场景各种使用习惯
- [x] 支持协同编辑

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

[MIT](./LICENSE)

# 微信交流群

群聊人数较多，无法通过二维码入群，可以微信添加`wanglinguanfang`拉你入群。

# 请作者喝杯咖啡

开源不易，如果本项目有帮助到你的话，可以考虑请作者喝杯咖啡~

> 厚椰乳一盒 + 纯牛奶半盒 + 冰块 + 咖啡液 = 生椰拿铁 yyds

> 推荐使用支付宝，微信获取不到头像。转账请备注【思维导图】。

<p>
  <img src="./web/src/assets/img/alipay.jpg" style="width: 300px" />
  <img src="./web/src/assets/img/wechat.jpg" style="width: 300px" />
</p>

<p>
    <span>
        <img src="./web/src/assets/avatar/Think.jpg" style="width: 50px;height: 50px;" />
        <span>Think</span>
    </span>
    <span>
        <img src="./web/src/assets/avatar/志斌.jpg" style="width: 50px;height: 50px;" />
        <span>志斌</span>
    </span>
    <span>
        <img src="./web/src/assets/avatar/小土渣的宇宙.jpeg" style="width: 50px;height: 50px;" />
        <span>小土渣的宇宙</span>
    </span>
    <span>
        <img src="./web/src/assets/avatar/qp.jpg" style="width: 50px;height: 50px;" />
        <span>qp</span>
    </span>
    <span>
        <img src="./web/src/assets/avatar/ZXR.jpg" style="width: 50px;height: 50px;" />
        <span>ZXR</span>
    </span>
    <span>
        <img src="./web/src/assets/avatar/花儿朵朵.jpg" style="width: 50px;height: 50px;" />
        <span>花儿朵朵</span>
    </span>
    <span>
        <img src="./web/src/assets/avatar/suka.jpg" style="width: 50px;height: 50px;" />
        <span>suka</span>
    </span>
    <span>
        <img src="./web/src/assets/avatar/Chris.jpg" style="width: 50px;height: 50px;" />
        <span>Chris</span>
    </span>
    <span>
        <img src="./web/src/assets/avatar/水车.jpg" style="width: 50px;height: 50px;" />
        <span>水车</span>
    </span>
    <span>
        <img src="./web/src/assets/avatar/仓鼠.jpg" style="width: 50px;height: 50px;" />
        <span>仓鼠</span>
    </span>
    <span>
        <img src="./web/src/assets/avatar/千帆.jpg" style="width: 50px;height: 50px;" />
        <span>千帆</span>
    </span>
    <span>
        <img src="./web/src/assets/avatar/才镇.jpg" style="width: 50px;height: 50px;" />
        <span>才镇</span>
    </span>
    <span>
        <img src="./web/src/assets/avatar/小米.jpg" style="width: 50px;height: 50px;" />
        <span>小米bbᯤ²ᴳ</span>
    </span>
    <span>
        <img src="./web/src/assets/avatar/棐.jpg" style="width: 50px;height: 50px;" />
        <span>*棐</span>
    </span>
    <span>
        <img src="./web/src/assets/avatar/default.png" style="width: 50px;height: 50px;" />
        <span>Luke</span>
    </span>
    <span>
        <img src="./web/src/assets/avatar/布林.jpg" style="width: 50px;height: 50px;" />
        <span>布林</span>
    </span>
    <span>
        <img src="./web/src/assets/avatar/南风.jpg" style="width: 50px;height: 50px;" />
        <span>南风</span>
    </span>
    <span>
        <img src="./web/src/assets/avatar/蜉蝣撼大叔.jpg" style="width: 50px;height: 50px;" />
        <span>蜉蝣撼大叔</span>
    </span>
    <span>
        <img src="./web/src/assets/avatar/乙.jpg" style="width: 50px;height: 50px;" />
        <span>乙</span>
    </span>
    <span>
        <img src="./web/src/assets/avatar/敏.jpg" style="width: 50px;height: 50px;" />
        <span>敏</span>
    </span>
    <span>
        <img src="./web/src/assets/avatar/沐风牧草.jpg" style="width: 50px;height: 50px;" />
        <span>沐风牧草</span>
    </span>
    <span>
        <img src="./web/src/assets/avatar/有希.jpg" style="width: 50px;height: 50px;" />
        <span>有希</span>
    </span>
    <span>
        <img src="./web/src/assets/avatar/樊笼.jpg" style="width: 50px;height: 50px;" />
        <span>樊笼</span>
    </span>
    <span>
        <img src="./web/src/assets/avatar/达仁科技.jpg" style="width: 50px;height: 50px;" />
        <span>达仁科技</span>
    </span>
    <span>
        <img src="./web/src/assets/avatar/小逗比.png" style="width: 50px;height: 50px;" />
        <span>小逗比</span>
    </span>
    <span>
        <img src="./web/src/assets/avatar/天清如愿.jpg" style="width: 50px;height: 50px;" />
        <span>天清如愿</span>
    </span>
    <span>
        <img src="./web/src/assets/avatar/敬明朗.jpg" style="width: 50px;height: 50px;" />
        <span>敬明朗</span>
    </span>
    <span>
        <img src="./web/src/assets/avatar/default.png" style="width: 50px;height: 50px;" />
        <span>飞箭</span>
    </span>
    <span>
        <img src="./web/src/assets/avatar/戚永峰.png" style="width: 50px;height: 50px;" />
        <span>戚永峰</span>
    </span>
    <span>
        <img src="./web/src/assets/avatar/moom.jpg" style="width: 50px;height: 50px;" />
        <span>moom</span>
    </span>
    <span>
        <img src="./web/src/assets/avatar/张扬.png" style="width: 50px;height: 50px;" />
        <span>张扬</span>
    </span>
</p>