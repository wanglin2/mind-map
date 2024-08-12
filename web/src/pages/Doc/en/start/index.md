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

If you don't want to load all plugins from the beginning and want to load and register plugins asynchronously after instantiation, you can do this:

```js
import('simple-mind-map/src/plugins/Export.js').then(res => {
  mindMap.addPlugin(res.default)
})
```

If you need a file in the format of `umd` module, such as `CDN` in the browser, So you can first install `npm i simple-mind-map` through npm,, Then you can find the `simpleMindMap.umd.min.js` file and `simpleMindMap.esm.min.css` file in the `node_modules/simple-mind-map/dist/` directory, copy it to your project, and then import it into the page:

```html
<link rel="stylesheet" href="simpleMindMap.esm.min.css">
<script scr="simpleMindMap.umd.min.js"></script>
```

A global variable `window.simpleMindMap` will be created. you can get `MindMap` constructor by `window.simpleMindMap.default`, Then it can be instantiated normally, for more detail info you can log `window.simpleMindMap`.

If it is inconvenient to install using 'npm', you can also obtain these two files through some online 'CDN' services, such as:

```
https://unpkg.com/simple-mind-map@0.10.2/dist/simpleMindMap.esm.css
https://unpkg.com/simple-mind-map@0.10.2/dist/simpleMindMap.umd.min.js
```

You can replace the version number in it.

The disadvantage of this method is that it will contain all the content, including the plugins you have not registered(You can find it here [full.js](https://github.com/wanglin2/mind-map/blob/main/simple-mind-map/full.js#L36) View plugins packaged into files by default), so the overall volume will be relatively large. If you only want to package the specified plugin, you can modify the file and repackage it. If necessary, you can also contact the developer.

（v0.5.4+）If you want to use the `ES` module directly on the browser side, you can find the `simpleMindMap.esm.js` and `simpleMindMap.esm.css` files in the `/simple-mind-map/dist/` directory.

Online CDN services can also be used, such as:

```
https://unpkg.com/browse/simple-mind-map@0.9.2/dist/
```

You can find all the packaged files for a certain version.

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

> If there is an installation dependency error, you can try adjusting the node version. The author is using version 14. x.

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

#### Generate TypeScript type files

```bash
cd simple-mind-map
npm run types
```

You can obtain the type files in the 'simple-mind-map/types/' directory.

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