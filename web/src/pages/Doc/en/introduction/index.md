# Introduction

`simple-mind-map` is a simple and powerful web mind map library, not dependent on any specific framework. Can help you quickly develop mind mapping products.

> If you just want to use mind mapping, you can also use the demo of this project as a regular online mind mapping tool. Click on the 【Online Demo】 in the upper right corner to start using it.
>
> Additionally, a client is provided for download, support `Windows`、`Mac` and `Linux`, [Click here to learn more](/mind-map/#/doc/zh/client)。

## Features

- [x] Plugin architecture. In addition to core functions, other functions are provided as plugins, which can be used as needed to reduce the overall volume
- [x] Supports six types of structures: logical structure diagrams, mind maps,
      organizational structure diagrams, directory organization diagrams, timeline, and fishbone diagrams
- [x] Built-in multiple themes and allows for highly customized styles, and support register new themes
- [x] Supports shortcuts
- [x] Node content supports images, icons, hyperlinks, notes, tags, and
      summaries
- [x] Supports forward and backward navigation
- [x] Supports dragging and scaling
- [x] Supports right-click and Ctrl + left-click to select multiple items
- [x] Supports free dragging and dragging to adjust nodes
- [x] Supports various node shapes
- [x] Supports export to json, png, svg, pdf markdown, and import from json, xmind, markdown
- [x] Supports mini map、support watermark
- [x] Supports associative lines

## Repository Catalog Introduction

1.`simple-mind-map`

This is a mind map library that is framework-agnostic and can be used with
frameworks such as Vue and React, or without a framework.

2.`web`

This is an online mind map built using the `simple-mind-map` library and based
on `Vue2.x` and `ElementUI`. Features include:

- [x] Toolbar, which supports inserting and deleting nodes, and editing node
      images, icons, hyperlinks, notes, tags, and summaries
- [x] Sidebar, with panels for basic style settings, node style settings,
      outline, theme selection, and structure selection
- [x] Import and export functionality; data is saved in the browser's local
      storage by default, but it also supports creating, opening, and editing
      local files on the computer directly
- [x] Right-click menu, which supports operations such as expanding, collapsing,
      and organizing layout
- [x] Bottom bar, which supports node and word count statistics, switching
      between edit and read-only modes, zooming in and out, and switching to
      full screen, support mini map

Provide document page service.

3.`dist`

The folder containing the packaged resources for the `web` folder.

## Related Articles

[Technical Analysis of Web Mind Map Implementation (chi)](https://juejin.cn/post/6987711560521089061)

[Only a hundred lines of code are needed to add local file operation capability to your Web page. Are you sure not to try?](https://juejin.cn/post/7157681502506090510)

[When you press the direction key, how does the TV find the next focus](https://juejin.cn/post/7199666255883927612)

[How to simulate the background image style of css in canvas](https://juejin.cn/post/7204854015463538744)

[My first Electron application](https://juejin.cn/post/7233012756314701884)

## Special Note

This project can be used for learning and reference. Please deeply experience whether it can meet your needs when using it for actual projects.

This project may not have fully tested every function point, so there may be bugs. In addition, when the number of nodes is very large, there may be some performance issues. Because everyone can accept different levels of congestion, you can test the maximum number of nodes yourself.

If you have suggestions or find bugs, you can submit [issues](https://github.com/wanglin2/mind-map/issues) here.

The built-in themes and icons in the project come from:

[Baidu Mind Map](https://naotu.baidu.com/)

[Zhixi Mind Map](https://www.zhixi.com/)

Respect the copyright, and do not use the theme and icons directly for commercial projects.

## Why not？

1.[Zhixi](https://www.zhixi.com/)

Zhixi is a free mind mapping product that supports multi end synchronization. The UI design is beautiful and the features are complete, but it is not open source, so it can only be used as a user and cannot be used in your project.

There are many other online mind mapping products similar to Zhixi, such as [GitMind](https://gitmind.cn/)、[MindLine](http://www.mindline.cn/)、[MinMeister](https://www.mindmeister.com/zh)、[Mubu](https://mubu.com/) and so on, There are many searches on search engines, but these products either require fees or are developed by small companies, and their stability and sustainability cannot be guaranteed. Of course, the most crucial thing is that they are not open-source.

2.[kityminder-core](https://github.com/fex-team/kityminder-core)

`kityminder-core` is an open source brain mapping tool developed by Baidu. It has powerful functions and good performance, but it is no longer maintained. Therefore, the code is relatively old, and the interface beauty is relatively ordinary. In addition, bugs can only be fixed by yourself, and the functions can only be developed by yourself. It has high requirements for front-end development capabilities.

3.[jsmind](https://github.com/hizzgdev/jsmind)、[Mind-elixir](https://github.com/ssshooter/mind-elixir-core)、[my-mind](https://github.com/ondras/my-mind)、[blink-mind](https://github.com/awehook/blink-mind)、[remind](https://github.com/luvsic3/remind)、[vue3-mindmap](https://github.com/hellowuxin/vue3-mindmap)、[ZMindMap](https://github.com/zyascend/ZMindMap)...

These open-source mind maps are also good, each with its own characteristics, but they also have certain drawbacks, such as stopping updates, average interface aesthetics, less functionality, relying on a certain framework, and so on.

In summary, in open-source mind maps, it is difficult to find a better choice than `simple-mind-map`. Of course, `simple-mind-map` is far from being the best, and it also has many shortcomings, as you saw in the previous [special note]. However, `simple-mind-map` has always been in a fast iteration process, and we welcome you to join and improve it together.

## Browser Compatibility

We recommend using the latest version of the `Chrome` browser.

Limited testing situation:

Normal operation: `360` extreme speed browser（v13.5.2036.0）、`opera` browser（v71.0.3770.284）。

Abnormal operation: `Firefox`（v98.0.2）, Node content cannot be displayed in rich text mode. If you want to support the `Firefox` browser, please use non rich text mode.

Unsupported: `IE` browser.

## License

[MIT](https://opensource.org/licenses/MIT)

## Invite the author to a cup of coffee

Open source is not easy. If this project is helpful to you, you can invite the author to have a cup of coffee~

> Please note the 【mind map】 for transfer. Your avatar and name will appear below.

<img src="../../../../assets/img/alipay.jpg" style="width: 300px" />

<img src="../../../../assets/img/wechat.jpg" style="width: 300px" />