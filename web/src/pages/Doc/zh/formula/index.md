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

> v0.10.3+版本会默认引入`KaTeX`的样式文件。所以你无需再手动引入。当`Katex`库的渲染模式为`html`时它会依赖一些字体文件，插件并不包含这些文件，你需要通过`katexFontPath`实例化选项来设置字体文件的路径。

## 问题

1.在有的浏览器上显示的是公式源码

这是因为有的浏览器不支持`KaTex`库的`mathml`输出模式，可以通过`getKatexOutputType`实例化选项来将输出模式改为`html`。

2.有时公式和文本会换行显示

这一般是因为公式渲染使用的是`html`模式，这种模式依赖于字体文件，所以当字体文件没有加载完就渲染思维导图时，计算出来的公式内容大小和加载完字体文件后的实际公式大小不一致导致换行，可以想办法让字体文件加载完成后再渲染思维导图。

3.在一个浏览器上导出的svg文件在另一个浏览器上打开样式不一致

因为计算节点大小时是依赖浏览器的代理样式的，不同浏览器默认样式不一致，所以计算出来的节点大小也不一致。

4.在一个浏览器上导出的smm或json文件在另一个浏览器上导入无法正常渲染

因为有的浏览器可能是使用`mathml`模式渲染的，有的可能是`html`模式渲染的，通常支持`mathml`模式的肯定支持`html`，反过来则不行。

5.在使用`html`模式渲染时导出图片公式异常

这个因为没有加载字体导致的，目前没有解决方法。

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