# 快捷键操作如何传递自定义参数

库提供了很多命令，比如插入子节点的`INSERT_CHILD_NODE`等，这些命令大多可以接收一定参数，比如在插入节点时我想指定初始文本和节点uid，那么可以这样调用：

```js
mindMap.execCommand('INSERT_CHILD_NODE', true, [], {
    text: '初始文本',
    uid: 'xxx'
})
```

但是同时库内部也默认注册了很多快捷键，比如插入下级节点的`Tab`快捷键，很遗憾，目前快捷键操作无法让你传入自定义的参数，那么该怎么办呢，可以这样处理，首先确定你要给什么快捷键传入参数，比如`Tab`，那么首先可以调用如下方法删除库默认注册的快捷键：

```js
const keyName = 'Tab'
mindMap.keyCommand.removeShortcut(keyName)
```

然后再重新注册即可：

```js
mindMap.keyCommand.addShortcut(keyName, () => {
    mindMap.execCommand('INSERT_CHILD_NODE', true, [], {
        text: '初始文本',
        uid: 'xxx'
    })
})
```

库内部默认注册的快捷键对应的命令一览：

| 快捷键          | 命令                |
| --------------- | ------------------- |
| Control+z       | BACK                |
| Control+y       | FORWARD             |
| Tab             | INSERT_CHILD_NODE   |
| Insert          | INSERT_CHILD_NODE   |
| Enter           | INSERT_NODE         |
| Shift+Tab       | INSERT_PARENT_NODE  |
| Control+g       | ADD_GENERALIZATION  |
| Del或Backspace  | REMOVE_NODE         |
| Shift+Backspace | REMOVE_CURRENT_NODE |
| Control+a       | SELECT_ALL          |
| Control+l       | RESET_LAYOUT        |
| Control+Up      | UP_NODE             |
| Control+Down    | DOWN_NODE           |



