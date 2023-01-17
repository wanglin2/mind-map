# Introduction

`simple-mind-map` is a simple and powerful web mind map library, not dependent on any specific framework.

## Features

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
- [x] Supports export to json, png, svg, pdf, and import from json, xmind
- [x] Supports mini map、support watermark

## Table of Contents

1.`simple-mind-map`

This is a mind map tool library that is framework-agnostic and can be used with
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

3.`dist`

The folder containing the packaged resources for the `web` folder.

4.`docs`

Documentation, etc.

## Related Articles

[Technical Analysis of Web Mind Map Implementation (chi)](https://juejin.cn/post/6987711560521089061)

[Only a hundred lines of code are needed to add local file operation capability to your Web page. Are you sure not to try?](https://juejin.cn/post/7157681502506090510)

## Special Note

This project is rough and has not been thoroughly tested, its features are not
yet fully developed, and there are some performance issues. It is only for
learning and reference purposes and should not be used in actual projects.

The built-in themes and icons in the project come from:

[Baidu Mind Map](https://naotu.baidu.com/)

[Zhixi Mind Map](https://www.zhixi.com/)

Respect the copyright, and do not use the theme and icons directly for commercial projects.

## License

[MIT](https://opensource.org/licenses/MIT)