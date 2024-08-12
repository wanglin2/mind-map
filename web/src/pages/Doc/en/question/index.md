# Questions

## 1.Error when using in Vite, indicating xml-js dependency error

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

## 2.Error `Getting bbox of element "text" is not possible: TypeError: Cannot read properties of undefined (reading 'apply')`

The reason is that the installed version of `@svgdotjs/svg.js` is too high. You can manually reduce it to the version of `3.0.16`.

## 3.TypeError: Cannot read properties of undefined (reading 'prototype') at sax.js:222:46 

The following configurations can be added to the packaging configuration file:

```js
resolve: { alias: { stream: "stream-browserify" } }
```

Different packaging tools may have different specific configurations, with the principle of excluding 'stream' dependencies.

## 4.When clicking the [New], [Open], or [Save As] buttons, it will prompt that the browser does not support it or is not using the HTTPS protocol.

The browser uses API [window.showOpenFilePicker](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/showOpenFilePicker) to operate local files on the computer. If it is not supported, either the browser does not support this API or the page is not using the HTTPS protocol, You can press F12, or open the browser console through the right-click menu on the page and enter 'window.showOpenFilePicker' in the 'Console' tab. If it returns 'undefined', it means it is not supported. If it does not return this message and the page still prompts that the browser does not support it or is not using the HTTPS protocol, you can submit an issue or contact the author.

## 5.Import simple-mind-map error message, the error message is as follows:

<img src="../../../../assets/img/docs/错误.jpg" style="width: 850px" />

This is because your build environment does not support this JavaScript syntax, which comes from the '@svgdotjs/svg.js' library. The solution is as follows:

1.Manually reduce the version of the '@svgdotjs/svg.js' library. You can manually install the lower version in your project, such as: `npm i @svgdotjs/svg.js@3.2.0`

2.If you don't reduce the version, you can modify the relevant configuration of your build tool, modify the configuration of 'babel', and have it compile the 'simple-mind-map' library in 'node.modules' or the  '@svgdotjs/svg.js' library. If you are using 'vue-cli' or 'vite', they also provide the relevant configuration directly. In addition, it is necessary to install the 'babel' plugin that compiles this syntax and configure it in the 'babel' configuration file:

`@babel/plugin-proposal-nullish-coalescing-operator`、`@babel/plugin-proposal-optional-chaining`。