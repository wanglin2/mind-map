# Introduction

`simple-mind-map` is a simple and powerful web mind map library, not dependent on any specific framework. Can help you quickly develop mind mapping products.

## Features

- [x] Plugin architecture. In addition to core functions, other functions are provided as plugins, which can be used as needed to reduce the overall volume
- [x] Supports four types of structures: logical structure diagrams, mind maps,
      organizational structure diagrams, and directory organization diagrams
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

## Special Note

This project can be used for learning and reference. Please deeply experience whether it can meet your needs when using it for actual projects.

This project may not have fully tested every function point, so there may be bugs. In addition, when the number of nodes is very large, there may be some performance issues. Because everyone can accept different levels of congestion, you can test the maximum number of nodes yourself.

If you have suggestions or find bugs, you can submit [issues](https://github.com/wanglin2/mind-map/issues) here.

The built-in themes and icons in the project come from:

[Baidu Mind Map](https://naotu.baidu.com/)

[Zhixi Mind Map](https://www.zhixi.com/)

Respect the copyright, and do not use the theme and icons directly for commercial projects.

## License

[MIT](https://opensource.org/licenses/MIT)