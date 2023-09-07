# Start

## Installation

> Things to note before version 0.2.0:

```bash
npm i simple-mind-map
```

`0.2.0` Notes for previous versions:

> Note: This project is directly published in source code form and has not been
> packaged. If compilation fails, a Vue CLI-created project can add the
> following configuration to the vue.config.js file to allow babel-loader to
> compile this dependency:
>
> ```js
> module.exports = {
>   transpileDependencies: ["simple-mind-map"],
> };
> ```
>
> Other projects should modify the packaging configuration as needed.

## Usage

> The `web` directory of this repository provides a complete project based on `Vue2`. If you encounter any doubts about using it, you can refer to the implementation of this project.

> To learn about its use in other frameworks, you can refer to the following unofficial implementations:
>
> 1.[https://github.com/huangyuanyin/hyy-vue3-mindMap](https://github.com/huangyuanyin/hyy-vue3-mindMap): A mind map based on Vue3.2+ElementPlus.

Firstly, provide a container element with a width and height not equal to 0:

```html
<div id="mindMapContainer"></div>
```

Also, set the `CSS` style again:

```css
#mindMapContainer * {
  margin: 0;
  padding: 0;
}
```

Then introduce the `simple-mind-map` library and create an instance:

```js
import MindMap from "simple-mind-map";

const mindMap = new MindMap({
  el: document.getElementById('mindMapContainer'),
  data: {
    "data": {
        "text": "Root Node"
    },
    "children": []
  }
});
```

This will result in a mind map.

If you want to implement a complete mind map, you usually need to develop some UI interfaces to achieve more functions through the interfaces provided by the `simple-mind-map` library.

`simple-mind-map` supports rich configurations, events, commands, and some additional plugin extensions. Read the subsequent documentation to learn more.

The non-packaged 'ES' module is introduced by default, and only contains core functions, not unregistered plugin content, which can effectively reduce the size. However, you need to configure the `babel` compilation `simple mind-map` in your project to prevent some newer `js` syntax some browsers not supporting it.

If you need a file in the format of `umd` module, such as `CDN` in the browser, Then you can find the `simpleMindMap.umd.min.js` file and `simpleMindMap.css` file in the `/simple-mind-map/dist/` directory, copy it to your project, and then import it into the page:

```html
<link rel="stylesheet" href="simpleMindMap.css">
<script scr="simpleMindMap.umd.min.js"></script>
```

A global variable `window.simpleMindMap` will be created. you can get `MindMap` constructor by `window.simpleMindMap.default`, for more detail info you can log `window.simpleMindMap`.

The disadvantage of this method is that it will contain all the content, including the plugins you have not registered, so the overall volume will be relatively large.

（v0.5.4+）If you want to use the `ES` module directly on the browser side, you can find the `simpleMindMap.esm.js` and `simpleMindMap.esm.css` files in the `/simple-mind-map/dist/` directory.

## Development

If you only use library, you don't need to read this section.

### Local Development

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

### Packaging the Library

Since version `0.2.0`, we have added support for packaging the core library
simple-mind-map. This uses the same packaging tool as the sample project web.

```bash
cd web
npm run buildLibrary
```

The packaging entry is `simple-mind-map/full.js`, which will introduce all plugins by default. If you don't need all plugins, you can modify the file to only introduce the plugins you need, which can reduce the size of the packaged file.

The `package.json` file in the `simple-mind-map` library provides two export
fields:

```json
{
  "module": "index.js",
  "main": "./dist/simpleMindMap.umd.min.js"
}
```

Environments that support the `module` field will use `index.js` as the entry
point, otherwise the packed `simpleMindMap.umd.min.js` will be used as the entry
point.

### Compile the doc

```bash
cd web 
npm run buildDoc
```

### Packaging the Demo

```bash
cd web
npm run build
```

The `index.html` file will be automatically moved to the root directory.

## Problems

### Error when using in Vite, indicating xml-js dependency error

Solution: use the following import method:

```js
import MindMap from "simple-mind-map/dist/simpleMindMap.umd.min";
```

The `simple-mind-map` package provides the unpacked entry field `module`, and
the `xml-js` package dependency needs to import the package in the `node`
environment. Therefore, it cannot be obtained in `Vite` and an error will be
reported. Therefore, specify the import of the packed entry, and all relevant
packages are packed into the product, so there will be no error.

If you need to do further development, that is, you must use the unpacked code,
and if you do not need to parse the `xmind` file, you can remove the `xmind`
module. If you need it, you can try using other libraries to parse `xml` to
`json`.

### Error `Getting bbox of element "text" is not possible: TypeError: Cannot read properties of undefined (reading 'apply')`

The reason is that the installed version of `@svgdotjs/svg.js` is too high. You can manually reduce it to the version of `3.0.16`.

### TypeError: Cannot read properties of undefined (reading 'prototype') at sax.js:222:46 

The following configurations can be added to the packaging configuration file:

```js
resolve: { alias: { stream: "stream-browserify" } }
```

Different packaging tools may have different specific configurations, with the principle of excluding 'stream' dependencies.