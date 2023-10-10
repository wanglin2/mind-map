# Select plugin

The `Select` plugin provides the function of select multiple nodes.

## Register

```js
import MindMap from 'simple-mind-map'
import Select from 'simple-mind-map/src/plugins/Select.js'
// import Select from 'simple-mind-map/src/Select.js' Use this path for versions below v0.6.0

MindMap.usePlugin(Select)
```

After registration and instantiation of `MindMap`, the instance can be obtained through `mindMap.select`.

## Method

### toPos(x, y)

Convert mouse position to position relative to the container `el`