# Formula 插件

> v0.7.2+

> 该插件仅在富文本模式下支持，所以需要在注册了RichText插件的前提下使用

该插件用于支持给节点插入公式。

> 注意：公式是通过[KaTeX](https://github.com/KaTeX/KaTeX)库实现的，`KaTeX`提供了一些配置，插件默认的一个配置是：

```js
{
    output: 'mathml'
}
```

> 这在少数浏览器上公式可能无法成功渲染，如果你需要兼容这部分浏览器，你可以考虑把该配置改为`html`，详细文档可以参考：[Options](https://katex.org/docs/options)。使用这个配置可能还需要再引入`KaTeX`的样式文件，你可以自行测试。

> v.0.9.3+版本内部会判断当前浏览器的Chrome内核版本是否低于100，是的话会自动将`output`由`mathml`转为`html`，此时需要引入`KaTeX`的样式文件，库内部没有引入，所以需要你手动在项目中引入。如果你是通过`npm`方式引入`simple-mind-map`，那么你可以这么引入：
>
> ```js
> import 'simple-mind-map/node_modules/katex/dist/katex.min.css'
> ```
> 如果你使用的是`.umd.js`、`.esm.js`之类的打包后的文件，那么可以通过在线的CDN服务来引入，比如：`https://unpkg.com/browse/katex@0.16.9/dist/`，当然，最好是把`katex`的`css`文件，以及对应的`fonts`目录下的字体文件上传到你自己的服务器上。


## 注册

```js
import MindMap from 'simple-mind-map'
import Formula from 'simple-mind-map/src/plugins/Formula.js'

MindMap.usePlugin(Formula)
```

注册完且实例化`MindMap`后可通过`mindMap.formula`获取到该实例。

## 使用

注册了该插件后，可以使用命令`INSERT_FORMULA`来给节点插入指定公式：

```js
mindMap.execCommand('INSERT_FORMULA', 'a^2')
```

上述命令会给当前激活的节点插入`a^2`公式。

如果要指定给某个或某些节点插入公式，可以传递第二个参数：

```js
mindMap.execCommand('INSERT_FORMULA', 'a^2', [Node])
```

通过第二个参数传入指定的节点实例即可。

## 方法

### getKatexConfig()

获取当前传递给`Katex`的配置。