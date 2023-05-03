# XMind解析

> v0.2.7+

提供导入`XMind`文件的方法。

## 引入

```js
import xmind from 'simple-mind-map/src/parse/xmind.js'
```

如果使用的是`umd`格式的文件，那么可以通过如下方式获取：

```html
<script src="simple-mind-map/dist/simpleMindMap.umd.min.js"></script>
```

```js
simpleMindMap.xmind
```

## 方法

### xmind.parseXmindFile(file)

解析`.xmind`文件，返回解析后的数据，可以使用`mindMap.setData(data)`来将返回的数据渲染到画布上

`file`：`File`对象

### xmind.transformXmind(content)

转换`xmind`数据，`.xmind`文件本质上是一个压缩包，改成`zip`后缀可以解压缩，里面存在一个`content.json`文件，如果你自己解析出了这个文件，那么可以把这个文件内容传递给这个方法进行转换，转换后的数据，可以使用`mindMap.setData(data)`来将返回的数据渲染到画布上

`content`：`.xmind`压缩包内的`content.json`文件内容

### xmind.transformOldXmind(content)

> v0.2.8+

针对`xmind8`版本的数据解析，因为该版本的`.xmind`文件内没有`content.json`，对应的是`content.xml`。

`content`：`.xmind`压缩包内的`content.xml`文件内容