# Start

## Development

### Local Development

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

### Packaging the Library

Since version `0.2.0`, we have added support for packaging the core library
simple-mind-map. This uses the same packaging tool as the sample project web.

```bash
cd web
npm run buildLibrary
```

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

### Packaging the Demo

```bash
cd web
npm run build
```

The `index.html` file will be automatically moved to the root directory.

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

```html
<div id="mindMapContainer"></div>
```

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