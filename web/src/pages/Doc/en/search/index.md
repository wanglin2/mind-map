# Search plugin

> v0.6.9+

This plugin provides the ability to search and replace node content.

## Register

```js
import MindMap from 'simple-mind-map'
import Search from 'simple-mind-map/src/plugins/Search.js'
MindMap.usePlugin(Search)
```

After registration and instantiation of `MindMap`, the instance can be obtained through `mindMap.search`.

## Event

### search_info_change

You can listen to 'search_info_change' event to get the number of current search results and the index currently located.

```js
mindMap.on('search_info_change', (data) => {
    /*
        data: {
            currentIndex,// Index, from zero
            total
        }
    */
})
```

## Method

### search(searchText, callback)

- `searchText`: Text to search for

- `callback`: The callback function that completes this search will be triggered after jumping to the node

Search for node content, which can be called repeatedly. Each call will search and locate to the next matching node. If the search text changes, it will be searched again.

### endSearch()

End search.

### replace(replaceText, jumpNext = false)

- `replaceText`: Text to be replaced

- `jumpNext`: v0.6.12+, Whether to automatically jump to the next matching node

To replace the content of the current node, call the 'search' method after calling it to replace the content of the currently located matching node.

### replaceAll(replaceText)

- `replaceText`: Text to be replaced

Replace all matching node contents, and call it after calling the 'search' method.

### getReplacedText(node, searchText, replaceText)

- `node`: Node instance

- `searchText`: Text to search for

- `replaceText`: Text to be replaced

Return the text content of the node after search and replacement. Note that the node content will not be actually changed, but is only used to calculate the content of a node after replacement.