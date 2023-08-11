# KeyCommand实例

`keyCommand`实例负责快捷键的添加及触发，内置了一些快捷键，也可以自行添加。可通过`mindMap.keyCommand`获取到该实例。

## 方法

### addShortcut(key, fn)

添加快捷键

`key`：快捷键按键，按键值可以通过[keyMap.js](https://github.com/wanglin2/mind-map/blob/main/simple-mind-map/src/core/command/keyMap.js)查看。示例：

```js
// 单个按键
mindMap.keyCommand.addShortcut('Enter', () => {})
// 或
mindMap.keyCommand.addShortcut('Del|Backspace', () => {})
// 组合键
mindMap.keyCommand.addShortcut('Control+Enter', () => {})
```

`fn`：要执行的方法

### removeShortcut(key, fn)

移除快捷键命令，`fn`不指定则移除该快捷键的所有回调方法

### getShortcutFn(key)

> v0.2.2+

获取指定快捷键的处理函数

### pause()

> v0.2.2+

暂停所有快捷键响应

### recovery()

> v0.2.2+

恢复快捷键响应

### save()

> v0.2.3+

保存当前注册的快捷键数据，然后清空快捷键数据

### restore()

> v0.2.3+

恢复保存的快捷键数据，然后清空缓存数据

### hasCombinationKey(e)

> v0.6.13+

- `e`：事件对象。

判断是否按下了组合键。