# Formula plugin

> v0.7.2+

> This plugin is only supported in rich text mode, so it needs to be used after registering the RichText plugin

This plugin is used to support inserting formulas into nodes.

## Register

```js
import MindMap from 'simple-mind-map'
import Formula from 'simple-mind-map/src/plugins/Formula.js'

MindMap.usePlugin(Formula)
```

After registration and instantiation of `MindMap`, the instance can be obtained through `mindMap.formula`.

## Usage

After registering the plugin, you can use the command 'INSERT_FORMULA' to insert the specified formula for the node:

```js
mindMap.execCommand('INSERT_FORMULA', 'a^2')
```

The above command will insert the 'a^2' formula into the currently active node.

If you want to assign a formula to a node or nodes, you can pass the second parameter:

```js
mindMap.execCommand('INSERT_FORMULA', 'a^2', [Node])
```

Pass in the specified node instance through the second parameter.