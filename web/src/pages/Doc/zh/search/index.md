# Search 插件

> v0.6.9+

该插件提供搜索和替换节点内容的功能。

## 注册

```js
import MindMap from 'simple-mind-map'
import Search from 'simple-mind-map/src/plugins/Search.js'
MindMap.usePlugin(Search)
```

注册完且实例化`MindMap`后可通过`mindMap.search`获取到该实例。

## 事件

### search_info_change

可以通过监听`search_info_change`事件来获取当前搜索结果的数量和当前定位到的索引。

```js
mindMap.on('search_info_change', (data) => {
    /*
        data: {
            currentIndex,// 索引，从0开始
            total
        }
    */
})
```

## 方法

### search(searchText, callback)

- `searchText`：要进行搜索的文本

- `callback`：本次搜索完成的回调函数，会在跳转到节点后触发

搜索节点内容，可以重复调用，每调一次，会搜索和定位到下一个匹配的节点。如果搜索文本改变了，那么会重新搜索。

### endSearch()

结束搜索。

### replace(replaceText, jumpNext = false)

- `replaceText`：要进行替换的文本

- `jumpNext`：v0.6.12+，是否自动跳转到下一个匹配节点

替换当前节点内容，要在调用了`search`方法之后调用，会替换当前定位到的匹配节点内容。

### replaceAll(replaceText)

- `replaceText`：要进行替换的文本

替换所有匹配的节点内容，要在调用了`search`方法之后调用。

### getReplacedText(node, searchText, replaceText)

- `node`：节点实例

- `searchText`：要进行搜索的文本

- `replaceText`：要进行替换的文本

返回该节点搜索和替换后的文本内容，注意，不会实际改变节点内容，只是用来计算一个节点替换后的内容。