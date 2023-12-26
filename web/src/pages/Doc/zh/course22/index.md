# 如何实现搜索替换

> 需要先注册 Search 插件

要实现搜索替换很简单，你只要先创建两个输入框，两个按钮，然后调用相关方法即可。

第一个输入框用于搜索，可以绑定一个回车事件，然后调用如下方法：

```js
mindMap.search.search(this.searchText, () => {
    this.$refs.searchInputRef.focus()
})
```

`search`方法调用一次就会跳转到下一个匹配的节点，当搜索文本改变后再调用，默认会重新搜索从头开始。

`search`方法第二个参数是一个回调函数，当本次搜索完成，即在跳转到节点后调用，一般需要在这个回调函数里重新让你的输入框聚焦，因为激活节点会拿走焦点，所以你需要把焦点拿回来。

第二个输入框用于替换，替换支持单个替换和全部替换，需要注意的是要先在调用了`search`方法后才能调用这两个方法，单个替换只需要调用如下方法：

```js
mindMap.search.replace(this.replaceText, true)
```

第二个参数传`true`会在替换完成后自动跳转到下一个匹配的节点，这样可以进行连续替换。

要进行全部替换可以调用如下方法：

```js
mindMap.search.replaceAll(this.replaceText)
```

最后你可以通过监听`search_info_change`方法来获取匹配的节点数量和当前定位到的索引：

```js
mindMap.on('search_info_change', data => {
    console.log('当前所在：'+ (data.currentIndex + 1), '匹配总数：' + data.total)
})
```

如果是只读模式下搜索，搜索匹配到的节点不会被激活，而是被高亮。