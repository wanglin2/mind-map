# 导入和导出

## 导出

> 要使用导出功能需要使用导出插件。

目前支持导出为`.smm`、`.json`、`.svg`、`.png`、`.pdf`、`.md`、`.xmind`、`.txt`文件。

`.smm`是`simple-mind-map`自己定义的一种文件，其实就是`json`文件，换了一个扩展名而已。

导出直接调用`export`方法即可：

```js
mindMap.export(type, isDownload, fileName, ...)
```

`type`：文件类型

`isDownload`：传`true`会触发下载，`false`则不会，函数会返回导出文件的数据，`data:url`格式，你可以自行下载，（v0.9.2之前的版本，`pdf`不支持该参数，默认会直接下载）。

`fileName`：下载的文件名称

### 导出为smm、json

这两种文件的导出是一样的：

```js
mindMap.export(type, isDownload, fileName, withConfig)
```

`withConfig`指定导出的数据中是否要包含节点数据外的配置数据，比如使用的布局、主题等，传`true`，导出的结构如下：

```js
{
    layout,
    root,
    theme: {
        template,
        config
    },
    view
}
```

如果传`false`，导出的数据只有`root`部分，也就是纯节点树。

示例：

```js
mindMap.export('smm', true, '文件名', true)
mindMap.export('json', true, '文件名', false)
```

### 导出为png、pdf

导出这两种文件很简单：

```js
mindMap.export('png', true, '文件名')
mindMap.export('pdf', true, '文件名')
```

> 从v0.6.0+，要导出pdf，需要额外注册一个ExportPDF插件。

### 导出为svg

导出为`svg`可以传递的参数如下：

```js
mindMap.export(type, isDownload, fileName, plusCssText = '')
```

如果开启了节点富文本编辑，也就是`svg`中会存在节点的`html`结构，这就又存在一个问题，因为浏览器对每个元素默认会设置一些样式，影响最大的就是`margin`和`padding`，这就有可能会导致节点中的文字错位，所以可以通过`plusCssText`参数传入`css`样式：

> 在v0.6.16+版本后，plusCssText参数已被删除，改为在实例化时通过`resetCss`配置传入。

```js
mindMap.export(
    'svg', 
    true, 
    '文件名', 
    false, 
    `* {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }`
)
```

### 导出为md

导出为`markdown`文件只要传递默认的三个参数即可：

```js
mindMap.export('md', true, '文件名')
```

### 导出为xmind

> v0.6.6+

> 需要注册`ExportXMind`插件

导出为`Xmind`新版文件。

```js
mindMap.export('xmind', '文件名')
```

### 导出为txt

> v0.9.8+

导出为`txt`文件只要传递默认的三个参数即可：

```js
mindMap.export('txt', true, '文件名')
```

## 导入

目前支持从`.smm`、`.json`、`.xmind`、`.xlsx`、`.md`格式的文件导入。

### 导入smm、json

这两个文件导入很简单，直接读取文件内容，转成对象，然后调用相关方法渲染到画布即可。

因为导出这两种类型时可以选择是否包含配置数据，所以导入的时候调用的方法也是不一样的：

```js
let data = JSON.parse('json数据')
// 如果数据中存在root属性，那么代表是包含配置的完整数据，则使用setFullData方法导入数据
if (data.root) {
    mindMap.setFullData(data)
} else {
// 否则使用setData方法导入
    mindMap.setData(data)
}
// 导入数据后有可能新数据渲染在可视区域外了，所以为了更好的体验，可以复位一下视图的变换
mindMap.view.reset()
```

### 导入xmind

要导入`xmind`文件，需要引入`xmind`的解析方法：

```js
import xmind from 'simple-mind-map/src/parse/xmind.js'
```

如果使用的是`umd`文件，可以这样获取：

```js
MindMap.xmind
```

如果你是通过`input type=file`等方式获取到的`File`文件对象，那么可以直接传递给`parseXmindFile`方法解析，注意返回的是一个`Promise`实例，会返回解析后的节点树数据，使用`setData`方法渲染到画布即可。

```js
let data = await xmind.parseXmindFile(file)
mindMap.setData(data)
```

`.xmind`文件本质上是一个压缩包，改成`zip`后缀可以解压缩，里面存在一个`content.json`文件，如果你自己解析出了这个文件，那么可以把这个文件内容传递给这个`transformXmind`方法进行转换：

```js
let data = await xmind.transformXmind(fileContent)
mindMap.setData(data)
```

另外如果导入的是`xmind8`版本的数据，需要使用`transformOldXmind`方法。

### 导入xlsx

这个文件的导入没有内置方法，需要你自己开发，以下是一个使用`xlsx`库的方式：

```js
import { read, utils } from 'xlsx'

// 文件转buffer
export const fileToBuffer = file => {
  return new Promise(r => {
    const reader = new FileReader()
    reader.onload = () => {
      r(reader.result)
    }
    reader.readAsArrayBuffer(file)
  })
}

// File文件对象
const transformXLSXToJson = async (file) => {
    const wb = read(await fileToBuffer(file))
    const data = utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], {
        header: 1
    })
    if (data.length <= 0) {
        return
    }
    let max = 0
    data.forEach(arr => {
        if (arr.length > max) {
        max = arr.length
        }
    })
    let layers = []
    let walk = layer => {
        if (!layers[layer]) {
        layers[layer] = []
        }
        for (let i = 0; i < data.length; i++) {
        if (data[i][layer]) {
            let node = {
            data: {
                text: data[i][layer]
            },
            children: [],
            _row: i
            }
            layers[layer].push(node)
        }
        }
        if (layer < max - 1) {
        walk(layer + 1)
        }
    }
    walk(0)
    let getParent = (arr, row) => {
        for (let i = arr.length - 1; i >= 0; i--) {
        if (row >= arr[i]._row) {
            return arr[i]
        }
        }
    }
    for (let i = 1; i < layers.length; i++) {
        let arr = layers[i]
        for (let j = 0; j < arr.length; j++) {
        let item = arr[j]
        let parent = getParent(layers[i - 1], item._row)
        if (parent) {
            parent.children.push(item)
        }
        }
    }

    return layers[0][0]
}

let data = transformXLSXToJson('xlsx文件对象')
mindMap.setData(data)
```

### 导入md

要导入`markdown`文件需要引入相应的解析方法：

```js
import markdown from 'simple-mind-map/src/parse/markdown.js'
```

如果使用的是umd格式的文件，那么可以通过如下方式获取：

```js
MindMap.markdown
```

获取到`md`文件的内容后调用`transformMarkdownTo`方法转换即可，返回一个`Promise`实例：

```js
let data = await markdown.transformMarkdownTo('md文件内容')
mindMap.setData(data)
```

### 完整示例

<iframe style="width: 100%; height: 455px; border: none;" src="https://wanglin2.github.io/playground/#eNrFV81u20YQfpUN24JUoVAK0JMrB3YbB0gApYGTQ4EwhzW5kuiQu8TuypJhC0iDJkHaBsglPfXQQ4Oil7intnb7NvVf36KzfxRNUXUuQQ3bImdnvm925tsf7XnrRRHujIm34vVEzNNCIkHkuLge0TQvGJdoD3EyaCNG+2xMJUnaSIxwlrHJJhmgGRpwliMfEPwyop/SpI8LMxR5AswZuZqD9WqOi8iLKEIRzYhEyqY8VxEdZ1lEI9rpoJODv06evjn9/vnxn79FNGZUSGC/RYuxBMeAtNDqdbSnQBTEIM0ImEkoMR8SGap38aD70I1zMoThThSFgcjz/ami3N8WjO5PMzHdz5PWhx3lmw5QcAWcQ0mEDBRKSHFOWi1DhRDOCJeBf37w+z+PX5x++0sIcH8//ipUWOpTI+sHwFWfeWLm4LcMAIe6cpgiQjNHWKalQCCRpeQjTJOM3MtzPagBZ4hkgpQwmv5ShC+V13IMyPxSiI1pTLKlEPnlOfSrCUQUfk3bf/r67NWzalUvSqAsgRKBBljQwSbBCeFKTWSCbpaGQFPNHUIOH+viPpmaLOvDjGYMJ0pUO6A4y4GQ5Lvu0VAmWGLwun3vizthgbkgAQQ4HXIixpm0rTfdlrsFYQMTdmV1Fflsa5vE0i/ro1lGnE30BDY4ZzzwTRVOnj09eXt4+sOL84MDJygrJPUDa/YGwAYK247OUIxlPIIFo3AqHKqcDHqTsaEdswHNDdHCamqF1hLMH4tdGtdbUilWpVR4gtNyfzDIpnIaS3Vs3pCGSS2ZUvOEGmYC8m6aiFb0solA+NnrN3WsHPNHCZs0SrS/tCjvS6eG7N3UerEFbh6h5JiKAeN531rus/9Q83uRm9n2X/96+vKtK6jlUSteU5XzU8tJWULOmCzJ7HESQthNOE/q4tEb1aJrzU39c6M7KZmouROpelPN9PnR8R9HapNyqZKpOvvWxW2wqXxVrprLYRmHwFdBfhv6MyZt5Fb3q5dgGmBIsImnoMM6zV2qjjXNYqZUp4GYJhYHXx7nwSKGFabVSGArRrIVlLB4nBMqQ9DERkbU42e7t5LAt5GfMypxSgn3W20Tpeq6MhdD5ClD5FVMxixB5Moceac/Hp5/8+TsyaG5KGipWDDlGI/SLOGEKucHc4waXCNLnen46Luzo5/rZBcJG0j11WLR73/KwD1am4tLaSo3YW3cYQm5y0QqU0Yh0s/IQIIu/BhaB216qN1nrU9BFiCNXsfcAeH2By+SwMUNSwJvCPWSdAfFGRZiNfJsu2+QnEWeHrYOaTIfLcUALr0OjFYdHZJkLNvCysUMRrKX6pueOixhXG13kYfWtBHe7UWw9Ae4rbGUsObW4iyNH4FLdSWC34XV2usY78ujYYFVg2E51WLnU3JPvU6lYvAq5G5mirdmb8aRF3bMddhtwETkYSxE5EEH1K0YobBSXKeeSZrI0Qq61u1+pP0QKsqecgKM6Q7RA1oO6u+DehMc1DwQb8G+PJYmUJ0RA7mCuvZNsmL+skg/IulwBO6fdLvF1DE3835cbrlwlKTA61ALnCQpHTpDmXpoNfGOGV9zGdiky3cABD3rHnhtz3RAfQHRd0v4vqPhIzsAHSjXauTB1xmzQMMOPIYcdso0J6pZV7fgeibg8N2GCLvWGr7imNjFVqsod+55s38BRuykJA==" />