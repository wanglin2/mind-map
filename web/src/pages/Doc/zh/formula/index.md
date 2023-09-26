# Formula 插件

> v0.7.2+

> 该插件仅在富文本模式下支持，所以需要在注册了RichText插件的前提下使用

该插件用于支持给节点插入公式。

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