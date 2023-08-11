# KeyCommand instance

The `keyCommand` instance is responsible for adding and triggering shortcuts. It
includes some built-in shortcuts and can also be added manually. The
`mindMap.keyCommand` instance can be obtained through this.

## Methods

### addShortcut(key, fn)

Add a shortcut

`key`: Shortcut key, key values can be viewed at
[keyMap.js](https://github.com/wanglin2/mind-map/blob/main/simple-mind-map/src/core/command/keyMap.js)
Example:

```js
// Single key
mindMap.keyCommand.addShortcut("Enter", () => {});
// Or
mindMap.keyCommand.addShortcut("Del|Backspace", () => {});
// Combination key
mindMap.keyCommand.addShortcut("Control+Enter", () => {});
```

`fn`: Method to be executed

### removeShortcut(key, fn)

Remove a shortcut command, if `fn` is not specified, all callback methods for
the shortcut will be removed

### getShortcutFn(key)

> v0.2.2+

Get the processing function for the specified shortcut

### pause()

> v0.2.2+

Pause all shortcut responses

### recovery()

> v0.2.2+

Restore shortcut responses

### save()

> v0.2.3+

Save the current registered shortcut data, then clear the shortcut data

### restore()

> v0.2.3+

Restore saved shortcut data, then clear the cache data

### hasCombinationKey(e)

> v0.6.13+

- `e`: Event object.

Determine if the combination key has been pressed.