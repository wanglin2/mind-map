# 快捷键

`simple-mind-map`常用操作都支持快捷键方式使用，目前所有的快捷键列表如下：

```js
[
  {
    type: '节点操作',
    list: [
      {
        name: '插入下级节点',
        value: 'Tab'
      },
      {
        name: '插入同级节点',
        value: 'Enter'
      },
      {
        name: '上移节点',
        value: 'Ctrl + ↑'
      },
      {
        name: '下移节点',
        value: 'Ctrl + ↓'
      },
      {
        name: '插入概要',
        value: 'Ctrl + S'// v0.6.8+改为Ctrl + G
      },
      {
        name: '展开/收起节点',
        value: '/'
      },
      {
        name: '删除节点',
        value: 'Delete | Backspace'
      },
      {
        name: '复制节点',
        value: 'Ctrl + C'
      },
      {
        name: '剪切节点',
        value: 'Ctrl + X'
      },
      {
        name: '粘贴节点',
        value: 'Ctrl + V'
      },
      {
        name: '编辑节点',
        value: 'F2'
      },
      {
        name: '文本换行',
        value: 'Shift + Enter'
      },
      {
        name: '回退',
        value: 'Ctrl + Z'
      },
      {
        name: '前进',
        value: 'Ctrl + Y'
      },
      {
        name: '全选',
        value: 'Ctrl + A'
      },
      {
        name: '多选',
        value: '右键 / Ctrl + 左键'
      },
      {
        name: '一键整理布局',
        value: 'Ctrl + L'
      }
    ]
  },
  {
    type: '画布操作',
    list: [
      {
        name: '放大',
        value: 'Ctrl + +'
      },
      {
        name: '缩小',
        value: 'Ctrl + -'
      },
      {
        name: '恢复默认',
        value: 'Ctrl + Enter'
      }
    ]
  }
]
```

默认当鼠标滑入画布范围内才会响应快捷键操作，如果你想去掉这个限制可以在实例化`simple-mind-map`时通过选项指定：

```js
new MindMap({
    // ...
    enableShortcutOnlyWhenMouseInSvg: false
})
```

你也可以添加新的快捷键：

```js
mindMap.keyCommand.addShortcut('key', () => {
    // 执行一些操作
})
```

`key`支持三种方式：

```
Enter           // 单个按键
Tab | Insert    // 或
Shift + a       // 与
```

要获取所有的按键值对应的名称，可以：

```js
import { keyMap } from 'simple-mind-map/src/utils/keyMap'
```

可以添加当然也可以移除，详细文档可以参考[keyCommand](https://wanglin2.github.io/mind-map/#/doc/zh/keyCommand)。