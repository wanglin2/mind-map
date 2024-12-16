<h1 align="center">Simple mind map</h1>

[![npm-version](https://img.shields.io/npm/v/simple-mind-map)](https://www.npmjs.com/package/simple-mind-map)
![npm download](https://img.shields.io/npm/dm/simple-mind-map)
[![GitHub issues](https://img.shields.io/github/issues/wanglin2/mind-map)](https://github.com/wanglin2/mind-map/issues)
![license](https://img.shields.io/npm/l/express.svg)
[![GitHub stars](https://img.shields.io/github/stars/wanglin2/mind-map)](https://github.com/wanglin2/mind-map/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/wanglin2/mind-map)](https://github.com/wanglin2/mind-map/network/members)

> 中文名：思绪思维导图。一个简单&强大的 Web 思维导图。

本项目包含两部分：

1.一个 js 思维导图库，不依赖任何框架，可以使用它来快速完成 Web 思维导图产品的开发。

开发文档：[https://wanglin2.github.io/mind-map-docs/](https://wanglin2.github.io/mind-map-docs/)。

2.一个 Web 思维导图，基于思维导图库、Vue2.x、ElementUI 开发，可以操作电脑本地文件，可以当做一个在线版思维导图应用使用，也可以自部署和二次开发。

在线地址：[https://wanglin2.github.io/mind-map/](https://wanglin2.github.io/mind-map/)。

此外也提供了客户端可供下载使用，支持`Windows`、`Mac`及`Linux`，下载地址：

Github：[releases](https://github.com/wanglin2/mind-map/releases)。百度云盘：[地址](https://pan.baidu.com/s/1huasEbKsGNH2Af68dvWiOg?pwd=3bp3)。

> 客户端版本会落后于在线版本，尝试最新功能请优先使用在线版。

【云存储版本】如果你需要带后端的云存储版本，可以尝试我们开发的另一个项目[理想文档](https://github.com/wanglin2/lx-doc)。

# 特性

- [x] 插件化架构，除核心功能外，其他功能作为插件提供，按需使用，减小打包体积
- [x] 支持逻辑结构图（向左、向右逻辑结构图）、思维导图、组织结构图、目录组织图、时间轴（横向、竖向）、鱼骨图等结构
- [x] 内置多种主题，允许高度自定义样式，支持注册新主题
- [x] 节点内容支持文本（普通文本、富文本）、图片、图标、超链接、备注、标签、概要、数学公式
- [x] 节点支持拖拽（拖拽移动、自由调整）、多种节点形状；支持扩展节点内容、支持使用 DDM 完全自定义节点内容
- [x] 支持画布拖动、缩放
- [x] 支持鼠标按键拖动选择和 Ctrl+左键两种多选节点方式
- [x] 支持导出为`json`、`png`、`svg`、`pdf`、`markdown`、`xmind`、`txt`，支持从`json`、`xmind`、`markdown`导入
- [x] 支持快捷键、前进后退、关联线、搜索替换、小地图、水印、滚动条、手绘风格、彩虹线条、标记、外框
- [x] 提供丰富的配置，满足各种场景各种使用习惯
- [x] 支持协同编辑
- [x] 支持演示模式

官方提供了如下插件，可根据需求按需引入（某个功能不生效大概率是因为你没有引入对应的插件），具体使用方式请查看文档：

> RichText（节点富文本插件）、Select（鼠标多选节点插件）、Drag（节点拖拽插件）、AssociativeLine（关联线插件）、Export（导出插件）、KeyboardNavigation（键盘导航插件）、MiniMap（小地图插件）、Watermark（水印插件）、TouchEvent（移动端触摸事件支持插件）、NodeImgAdjust（拖拽调整节点图片大小插件）、Search（搜索插件）、Painter（节点格式刷插件）、Scrollbar（滚动条插件）、Formula（数学公式插件）、Cooperate（协同编辑插件）、RainbowLines（彩虹线条插件）、Demonstrate（演示模式插件）、OuterFrame（外框插件）、MindMapLayoutPro（思维导图布局插件）、HandDrawnLikeStyle（手绘风格插件）[收费]、Notation（节点标记插件）[收费]、Numbers（节点编号插件）[收费]、Freemind（Freemind格式导入导出插件）[收费]、Excel（Excel格式导入导出插件）[收费]、Checkbox（待办插件）[收费]、Lineflow（节点连线流动插件）[收费]

本项目不会实现的特性：

> 1.自由节点，即多个根节点；
>
> 2.概要节点后面继续添加节点；
>
> 如果你需要以上特性，那么本库可能无法满足你的需求。

# 安装

```bash
npm i simple-mind-map
```

# 使用

提供一个宽高不为 0 的容器元素：

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
  el: document.getElementById("mindMapContainer"),
  data: {
    data: {
      text: "根节点",
    },
    children: [],
  },
});
```

即可得到一个思维导图。想要实现更多功能？可以查看[开发文档](https://wanglin2.github.io/mind-map-docs/)。

# License

[MIT](./LICENSE)。保留`mind-map`版权声明的情况下可随意商用，如不想保留可联系作者。

# 微信交流群

微信添加`wanglinguanfang`拉你入群。根据过往的经验，大部分问题都可以通过查看issue列表或文档解决，所以提问前请确保你已经阅读完了所有文档，文档里没有的可在群里提问，不必私聊作者，如果你一定要私聊，请先发红包（￥9.9+每次）。

# star

如果喜欢本项目，欢迎点个 star，这对我们很重要。

[![Star History Chart](https://api.star-history.com/svg?repos=wanglin2/mind-map&type=Date)](https://star-history.com/#wanglin2/mind-map&Date)

# 关于定制

如果你有个性化的商用定制需求，可以联系我们，我们提供付费开发服务，无论前端、后端、还是部署，都可以帮你一站式搞定。

# 请作者喝杯咖啡

开源不易，如果本项目有帮助到你的话，可以考虑请作者喝杯咖啡~你的赞助对项目的可持续发展非常重要，是作者持续维护的最大动力。

> 推荐使用支付宝，微信获取不到头像。转账请备注【思维导图】。
>
> 也可以通过购买付费插件来支持我们：[付费插件](https://wanglin2.github.io/mind-map-docs/plugins/about.html)。
>
> 赞助等级：最强王者（￥500+）、星耀赞助（￥300+）、钻石赞助（￥150+）、黄金赞助（￥50+）、青铜赞助

<p>
  <img src="./web/src/assets/img/alipay.jpg" style="width: 300px" />
  <img src="./web/src/assets/img/wechat.jpg" style="width: 300px" />
</p>

## 钻石赞助

<p>
    <span>
        <img src="./web/src/assets/avatar/黄智彪@一米一栗科技.png" style="width: 50px;height: 50px;" />
        <span>黄智彪@一米一栗科技</span>
    </span>
</p>

## 黄金赞助

<p>
    <span>
        <img src="./web/src/assets/avatar/小土渣的宇宙.jpeg" style="width: 50px;height: 50px;" />
        <span>小土渣的宇宙</span>
    </span>
    <span>
        <img src="./web/src/assets/avatar/Chris.jpg" style="width: 50px;height: 50px;" />
        <span>Chris</span>
    </span>
    <span>
        <img src="./web/src/assets/avatar/仓鼠.jpg" style="width: 50px;height: 50px;" />
        <span>仓鼠</span>
    </span>
    <span>
        <img src="./web/src/assets/avatar/风格.jpg" style="width: 50px;height: 50px;" />
        <span>风格</span>
    </span>
    <span>
        <img src="./web/src/assets/avatar/default.png" style="width: 50px;height: 50px;" />
        <span>LiuJL</span>
    </span>
    <span>
        <img src="./web/src/assets/avatar/Kyle.jpg" style="width: 50px;height: 50px;" />
        <span>Kyle</span>
    </span>
    <span>
        <img src="./web/src/assets/avatar/秀树因馨雨.jpg" style="width: 50px;height: 50px;" />
        <span>秀树因馨雨</span>
    </span>
    <span>
        <img src="./web/src/assets/avatar/default.png" style="width: 50px;height: 50px;" />
        <span>黄泳</span>
    </span>
    <span>
        <img src="./web/src/assets/avatar/ccccs.jpg" style="width: 50px;height: 50px;" />
        <span>ccccs</span>
    </span>
    <span>
        <img src="./web/src/assets/avatar/炫.jpg" style="width: 50px;height: 50px;" />
        <span>炫</span>
    </span>
    <span>
        <img src="./web/src/assets/avatar/default.png" style="width: 50px;height: 50px;" />
        <span>晏江</span>
    </span>
    <span>
        <img src="./web/src/assets/avatar/梁辉.jpg" style="width: 50px;height: 50px;" />
        <span>梁辉</span>
    </span>
    <span>
        <img src="./web/src/assets/avatar/千帆.jpg" style="width: 50px;height: 50px;" />
        <span>千帆</span>
    </span>
    <span>
        <img src="./web/src/assets/avatar/布林.jpg" style="width: 50px;height: 50px;" />
        <span>布林</span>
    </span>
    <span>
        <img src="./web/src/assets/avatar/达仁科技.jpg" style="width: 50px;height: 50px;" />
        <span>达仁科技</span>
    </span>
    <span>
        <img src="./web/src/assets/avatar/沐风牧草.jpg" style="width: 50px;height: 50px;" />
        <span>沐风牧草</span>
    </span>
    <span>
        <img src="./web/src/assets/avatar/俊奇.jpg" style="width: 50px;height: 50px;" />
        <span>俊奇</span>
    </span>
    <span>
        <img src="./web/src/assets/avatar/庆国.jpg" style="width: 50px;height: 50px;" />
        <span>庆国</span>
    </span>
    <span>
        <img src="./web/src/assets/avatar/default.png" style="width: 50px;height: 50px;" />
        <span>Matt</span>
    </span>
    <span>
        <img src="./web/src/assets/avatar/雨馨.jpg" style="width: 50px;height: 50px;" />
        <span>雨馨</span>
    </span>
    <span>
        <img src="./web/src/assets/avatar/峰.jpg" style="width: 50px;height: 50px;" />
        <span>峰</span>
    </span>
</p>

## 青铜赞助

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
        <img src="./web/src/assets/avatar/水车.jpg" style="width: 50px;height: 50px;" />
        <span>水车</span>
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
        <img src="./web/src/assets/avatar/有希.jpg" style="width: 50px;height: 50px;" />
        <span>有希</span>
    </span>
    <span>
        <img src="./web/src/assets/avatar/樊笼.jpg" style="width: 50px;height: 50px;" />
        <span>樊笼</span>
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
    <span>
        <img src="./web/src/assets/avatar/长沙利奥软件.jpg" style="width: 50px;height: 50px;" />
        <span>长沙利奥软件</span>
    </span>
    <span>
        <img src="./web/src/assets/avatar/HaHN.jpg" style="width: 50px;height: 50px;" />
        <span>HaHN</span>
    </span>
    <span>
        <img src="./web/src/assets/avatar/继龙.jpg" style="width: 50px;height: 50px;" />
        <span>继龙</span>
    </span>
    <span>
        <img src="./web/src/assets/avatar/欣.jpg" style="width: 50px;height: 50px;" />
        <span>欣</span>
    </span>
    <span>
        <img src="./web/src/assets/avatar/default.png" style="width: 50px;height: 50px;" />
        <span>易空小易</span>
    </span>
    <span>
        <img src="./web/src/assets/avatar/国发.jpg" style="width: 50px;height: 50px;" />
        <span>国发</span>
    </span>
    <span>
        <img src="./web/src/assets/avatar/default.png" style="width: 50px;height: 50px;" />
        <span>建明</span>
    </span>
    <span>
        <img src="./web/src/assets/avatar/汪津合.jpg" style="width: 50px;height: 50px;" />
        <span>汪津合</span>
    </span>
    <span>
        <img src="./web/src/assets/avatar/default.png" style="width: 50px;height: 50px;" />
        <span>博文</span>
    </span>
    <span>
        <img src="./web/src/assets/avatar/慕智打印-兰兰.jpg" style="width: 50px;height: 50px;" />
        <span>慕智打印-兰兰</span>
    </span>
    <span>
        <img src="./web/src/assets/avatar/default.png" style="width: 50px;height: 50px;" />
        <span>锦冰</span>
    </span>
    <span>
        <img src="./web/src/assets/avatar/旭东.png" style="width: 50px;height: 50px;" />
        <span>旭东</span>
    </span>
    <span>
        <img src="./web/src/assets/avatar/橘半.jpg" style="width: 50px;height: 50px;" />
        <span>橘半</span>
    </span>
    <span>
        <img src="./web/src/assets/avatar/pluvet.jpg" style="width: 50px;height: 50px;" />
        <span>pluvet</span>
    </span>
    <span>
        <img src="./web/src/assets/avatar/皇登攀.jpg" style="width: 50px;height: 50px;" />
        <span>皇登攀</span>
    </span>
    <span>
        <img src="./web/src/assets/avatar/default.png" style="width: 50px;height: 50px;" />
        <span>SR</span>
    </span>
    <span>
        <img src="./web/src/assets/avatar/逆水行舟.jpg" style="width: 50px;height: 50px;" />
        <span>逆水行舟</span>
    </span>
    <span>
        <img src="./web/src/assets/avatar/L.jpg" style="width: 50px;height: 50px;" />
        <span>L</span>
    </span>
    <span>
        <img src="./web/src/assets/avatar/default.png" style="width: 50px;height: 50px;" />
        <span>sunniberg</span>
    </span>
    <span>
        <img src="./web/src/assets/avatar/在下青铜五.jpg" style="width: 50px;height: 50px;" />
        <span>在下青铜五</span>
    </span>
    <span>
        <img src="./web/src/assets/avatar/木星二号.jpg" style="width: 50px;height: 50px;" />
        <span>木星二号</span>
    </span>
    <span>
        <img src="./web/src/assets/avatar/阿晨.jpg" style="width: 50px;height: 50px;" />
        <span>阿晨</span>
    </span>
    <span>
        <img src="./web/src/assets/avatar/default.png" style="width: 50px;height: 50px;" />
        <span>铁</span>
    </span>
    <span>
        <img src="./web/src/assets/avatar/Alex.jpg" style="width: 50px;height: 50px;" />
        <span>Alex</span>
    </span>
    <span>
        <img src="./web/src/assets/avatar/子豪.jpg" style="width: 50px;height: 50px;" />
        <span>子豪</span>
    </span>
    <span>
        <img src="./web/src/assets/avatar/宏涛.jpg" style="width: 50px;height: 50px;" />
        <span>宏涛</span>
    </span>
    <span>
        <img src="./web/src/assets/avatar/最多5个字.jpg" style="width: 50px;height: 50px;" />
        <span>最多5个字</span>
    </span>
    <span>
        <img src="./web/src/assets/avatar/ZX.jpg" style="width: 50px;height: 50px;" />
        <span>ZX</span>
    </span>
    <span>
        <img src="./web/src/assets/avatar/default.png" style="width: 50px;height: 50px;" />
        <span>协成</span>
    </span>
    <span>
        <img src="./web/src/assets/avatar/木木.jpg" style="width: 50px;height: 50px;" />
        <span>木木</span>
    </span>
    <span>
        <img src="./web/src/assets/avatar/好名字.jpg" style="width: 50px;height: 50px;" />
        <span>好名字</span>
    </span>
    <span>
        <img src="./web/src/assets/avatar/lsytyrt.jpg" style="width: 50px;height: 50px;" />
        <span>lsytyrt</span>
    </span>
    <span>
        <img src="./web/src/assets/avatar/buddy.jpg" style="width: 50px;height: 50px;" />
        <span>buddy</span>
    </span>
    <span>
        <img src="./web/src/assets/avatar/default.png" style="width: 50px;height: 50px;" />
        <span>小川</span>
    </span>
    <span>
        <img src="./web/src/assets/avatar/Tobin.jpg" style="width: 50px;height: 50px;" />
        <span>Tobin</span>
    </span>
    <span>
        <img src="./web/src/assets/avatar/夏虫不语冰.jpg" style="width: 50px;height: 50px;" />
        <span>夏虫不语冰</span>
    </span>
    <span>
        <img src="./web/src/assets/avatar/晴空.jpg" style="width: 50px;height: 50px;" />
        <span>晴空</span>
    </span>
    <span>
        <img src="./web/src/assets/avatar/。.png" style="width: 50px;height: 50px;" />
        <span>。</span>
    </span>
    <span>
        <img src="./web/src/assets/avatar/Jeffrey.jpg" style="width: 50px;height: 50px;" />
        <span>Jeffrey</span>
    </span>
    <span>
        <img src="./web/src/assets/avatar/张文建.jpg" style="width: 50px;height: 50px;" />
        <span>张文建</span>
    </span>
    <span>
        <img src="./web/src/assets/avatar/Lawliet.jpg" style="width: 50px;height: 50px;" />
        <span>Lawliet</span>
    </span>
    <span>
        <img src="./web/src/assets/avatar/一叶孤舟.jpg" style="width: 50px;height: 50px;" />
        <span>一叶孤舟</span>
    </span>
    <span>
        <img src="./web/src/assets/avatar/default.png" style="width: 50px;height: 50px;" />
        <span>Eric</span>
    </span>
    <span>
        <img src="./web/src/assets/avatar/Joe.jpg" style="width: 50px;height: 50px;" />
        <span>Joe</span>
    </span>
    <span>
        <img src="./web/src/assets/avatar/default.png" style="width: 50px;height: 50px;" />
        <span>中文网字计划-江夏尧</span>
    </span>
    <span>
        <img src="./web/src/assets/avatar/海云.jpg" style="width: 50px;height: 50px;" />
        <span>海云</span>
    </span>
    <span>
        <img src="./web/src/assets/avatar/皮老板.jpg" style="width: 50px;height: 50px;" />
        <span>皮老板</span>
    </span>
    <span>
        <img src="./web/src/assets/avatar/h.r.w.jpg" style="width: 50px;height: 50px;" />
        <span>h.r.w</span>
    </span>
    <span>
        <img src="./web/src/assets/avatar/时光匆匆.png" style="width: 50px;height: 50px;" />
        <span>时光匆匆</span>
    </span>
    <span>
        <img src="./web/src/assets/avatar/广兴.jpg" style="width: 50px;height: 50px;" />
        <span>广兴</span>
    </span>
    <span>
        <img src="./web/src/assets/avatar/一亩三.jpg" style="width: 50px;height: 50px;" />
        <span>一亩三</span>
    </span>
    <span>
        <img src="./web/src/assets/avatar/xbkkjbs0246658.png" style="width: 50px;height: 50px;" />
        <span>xbkkjbs0246658</span>
    </span>
    <span>
        <img src="./web/src/assets/avatar/4399行星元帅.jpg" style="width: 50px;height: 50px;" />
        <span>4399行星元帅</span>
    </span>
    <span>
        <img src="./web/src/assets/avatar/Xavier.png" style="width: 50px;height: 50px;" />
        <span>Xavier</span>
    </span>
    <span>
        <img src="./web/src/assets/avatar/冒号括号.png" style="width: 50px;height: 50px;" />
        <span>:)</span>
    </span>
</p>
