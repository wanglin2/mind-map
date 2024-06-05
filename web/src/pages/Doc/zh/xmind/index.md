# XMind解析

> v0.2.7+

提供导入和导出`XMind`文件的方法。

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

### xmind.parseXmindFile(file, handleMultiCanvas)

解析`.xmind`文件，返回解析后的数据，可以使用`mindMap.setData(data)`来将返回的数据渲染到画布上

`file`：`File`对象

`handleMultiCanvas`：v0.10.0+，可选，可传递一个函数，如果导入的xmind文件存在多个画布，那么会调用该函数，函数接收xmind画布列表数据为参数，需要返回其中一个画布的数据，比如接收的参数为`content`，要导入第二个画布的数据则返回`content[1]`。函数可以是异步函数，返回一个Promise实例。

### xmind.transformXmind(content)

> v0.6.6+版本该方法改为异步方法，返回一个Promise实例

转换`xmind`数据，`.xmind`文件本质上是一个压缩包，改成`zip`后缀可以解压缩，里面存在一个`content.json`文件，如果你自己解析出了这个文件，那么可以把这个文件内容传递给这个方法进行转换，转换后的数据，可以使用`mindMap.setData(data)`来将返回的数据渲染到画布上

`content`：`.xmind`压缩包内的`content.json`文件内容

### xmind.transformOldXmind(content)

> v0.2.8+

针对`xmind8`版本的数据解析，因为该版本的`.xmind`文件内没有`content.json`，对应的是`content.xml`。

`content`：`.xmind`压缩包内的`content.xml`文件内容

### transformToXmind(data, name)

> v0.6.6+

- `data`：`simple-mind-map`思维导图数据，可以通过`mindMap.getData()`方法获取。

- `name`：要导出的文件名。

将`simple-mind-map`数据转为`xmind`文件。该方法为异步方法，返回一个`Promise`实例，返回的数据是一个`blob`类型的`zip`压缩包数据，你可以自行下载为文件。