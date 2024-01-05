# Formula plugin

> v0.7.2+

> This plugin is only supported in rich text mode, so it needs to be used after registering the RichText plugin

This plugin is used to support inserting formulas into nodes.

> 注意：公式是通过[KaTeX](https://github.com/KaTeX/KaTeX)库实现的，`KaTeX`提供了一些配置，插件默认的一个配置是：

> Note: The formula is implemented through the [KaTeX](https://github.com/KaTeX/KaTeX) library, and 'KaTeX' provides some configurations. The default configuration for the plugin is:

```js
{
    output: 'mathml'
}
```

> This formula may not render successfully on a few browsers. If you need to be compatible with these browsers, you can consider changing the configuration to 'HTML'. For detailed documentation, please refer to [Options](https://katex.org/docs/options). Using this configuration may require the introduction of a 'KaTeX' style file, which you can test on your own.

> v0.9.3+will internally determine whether the current Chrome kernel version of the browser is lower than 100, If so, it will automatically convert 'output' from 'mathml' to 'html', At this point, the style file for 'KaTeX' needs to be imported, but it is not imported within the library, so you need to manually import it in the project. If you introduced 'simple-mind-map' through the 'npm' method, you can introduce it as follows:
>
> ```js
> import 'simple-mind-map/node_modules/katex/dist/katex.min.css'
> ```
> If you are using packaged files such as '.umd.js' or '.esm.js', you can import them through online CDN services, such as `https://unpkg.com/browse/katex@0.16.9/dist/`, Of course, it is best to upload the 'css' file of the 'katex' and the corresponding font files in the 'fonts' directory to your own server.

## Register

```js
import MindMap from 'simple-mind-map'
import Formula from 'simple-mind-map/src/plugins/Formula.js'

MindMap.usePlugin(Formula)
```

After registration and instantiation of `MindMap`, the instance can be obtained through `mindMap.formula`.

## Usage

After registering the plugin, you can use the command 'INSERT_FORMULA' to insert the specified formula for the node:

```js
mindMap.execCommand('INSERT_FORMULA', 'a^2')
```

The above command will insert the 'a^2' formula into the currently active node.

If you want to assign a formula to a node or nodes, you can pass the second parameter:

```js
mindMap.execCommand('INSERT_FORMULA', 'a^2', [Node])
```

Pass in the specified node instance through the second parameter.

## Methods

### getKatexConfig()

Get the current configuration passed to `Katex`.