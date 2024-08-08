# 插入/删除节点、前进回退

首先和操作节点内容一样，也需要监听节点的激活事件，然后禁用相关按钮。

以下命令都支持传递一些参数，详情请参考【API】-【构造函数】-【execCommand方法】小节中该命令的介绍。

## 插入子节点

插入子节点很简单，执行`INSERT_CHILD_NODE`命令即可：

```js
mindMap.execCommand('INSERT_CHILD_NODE')
```

这样就会在当前激活节点（如果存在多个激活节点，默认会操作第一个激活节点）下添加一个子节点。

如果你想获取插入节点的实例，可以这样操作：

1.需要指定新插入节点的`id`，比如：

```js
import { createUid } from 'simple-mind-map/src/utils'

let uid = createUid()
mindMap.execCommand('INSERT_CHILD_NODE', false, [], {
    uid
})
```

2.然后在`node_tree_render_end`事件里通过该`id`来获取实例：

```js
mindMap.on('node_tree_render_end', () => {
    // 调用renderer实例的findNodeByUid方法获取到节点的实例对象
    const node = mindMap.renderer.findNodeByUid(uid)
})
```

如果你想获取到通过快捷键插入的节点，那么需要重写库默认的快捷键，比如以`Tab`键插入子节点为例：

首先在实例化完后移除默认快捷键：

```js
mindMap.keyCommand.removeShortcut('Tab')
```

然后添加快捷键：

```js
mindMap.keyCommand.addShortcut('Tab', () => {
    mindMap.execCommand('INSERT_CHILD_NODE', false, [], {
        uid
    })
})
```

此时你就可以指定快捷键添加节点时的uid了，那么按前面所述就可以获取到节点实例。

插入节点的命令也可以传入一定参数，比如创建新节点不想直接进入新节点的编辑模式，那么可以这样调用：

```js
mindMap.execCommand('INSERT_CHILD_NODE', false)
```

如果想给指定的节点插入新节点，而不是当前激活的节点，那么就可以通过第二个参数：

```js
mindMap.execCommand('INSERT_CHILD_NODE', false, [node])
```

参数是通过平铺的列表方式传递的，所以前面的参数都不能省略。

如果要指定创建的新节点的一些数据，那么可以通过第三个参数：

```js
mindMap.execCommand('INSERT_CHILD_NODE', false, [], {
    uid: '指定uid',
    text: '指定初始文本'
})
```

最后一个参数可以指定创建新节点的子节点：

```js
mindMap.execCommand('INSERT_CHILD_NODE', false, [], {
    uid: '指定uid',
    text: '指定初始文本'
}, [
    {
        data: {
            text: '下级节点'
        },
        children: []
    }
])
```

注意传递的是完整的节点结构数据。

其他命令也是类似的，详细可以参考api文档。

## 插入多个子节点

如果你要同时插入多个子节点，那么可以执行`INSERT_MULTI_CHILD_NODE`命令：

```js
mindMap.execCommand('INSERT_MULTI_CHILD_NODE', [], childList)
```

`childList`是要插入的子节点数据的数组，必传。

```js
[
    {
        data: {
              text: '自定义节点1'
        }
    }
]
```

## 插入同级节点

插入同级节点和插入子节点方式完全一致：

```js
mindMap.execCommand('INSERT_NODE')
```

## 插入多个同级节点

插入多个同级节点可以执行`INSERT_MULTI_NODE`命令：

```js
mindMap.execCommand('INSERT_MULTI_NODE'. [], nodeList)
```

`nodeList`是要插入的同级节点数据的数组，必传。

## 插入父节点

要插入父节点可以调用`INSERT_PARENT_NODE`命令：

```js
mindMap.execCommand('INSERT_PARENT_NODE')
```

## 删除节点

删除节点也是执行命令：

```js
mindMap.execCommand('REMOVE_NODE')
```

会删除当前激活的所有节点。

## 仅删除当前节点

`REMOVE_CURRENT_NODE`命令可以仅删除激活的节点，子节点不会被删除。

```js
mindMap.execCommand('REMOVE_CURRENT_NODE')
```

## 前进回退

首先需要监听`back_forward`事件，事件回调中可以获取当前的历史记录总数，以及当前所在的历史记录索引，那么就可以判断当前是否处于历史记录的最开始，还是最后，然后对前进回退按钮进行禁用。

```js
const isStart = ref(true)
const isEnd = ref(true)
mindMap.on('back_forward', (index, len) => {
    isStart.value = index <= 0
    isEnd.value = index >= len - 1
})
```

然后前进回退调用相关命令即可：

```js
// 回退一次
mindMap.execCommand('BACK')

// 前进一次
mindMap.execCommand('FORWARD')
```

## 完整示例

<iframe style="width: 100%; height: 455px; border: none;" src="https://wanglin2.github.io/playground/#eNrFVt1qG0cUfpXTLUVykVYy9EqVRBxZpaaxXZTSXmSCWe2OpGl2Z5bdkeRgBCYkkP7RtKWU1tCm0NJetKUXpRCnIS/jtZ236Jmd/dMPWLmKYMXOnHO+78ycM9/OkbHl++ZkTI2G0QztgPkSQirHfptw5vkikHAEAR1UQPBdMeaSOhUIR5brimmPDmAGg0B4UEKEUhaxy7iza/naRIwQp11a9XC26lk+MQgHINylEtSc8mwBH7su4YTXanD519/Rs2+jT764fH4Snfz44viYcFvwUAILb0oLCVoqpbIMxnQjN3W5M29QJAgXPfsGsc6fH5//8/Tih/uXn967uPckevjd5c+/p8GWLdmE7gmHhgiRL6986zbiaJS5RPqWfQc9yxvQasORokpWYtJDaneE51ncKZeub3XeKyHCLAWJ15SCDEQwtQKV9FU47+z3PtrqbRehzr/8Onrwa/TgfvTfT3pJ2U7wkAZSLWYN5J29m93eBwd7+9vdFeh/PloF3Rkx13k5/M67Oze2l1iih49ffP/LPIVDsS/iUqyB3uvu7n/YncfN+rS8HK36jE7T/izHJgDqNsAR9tijXJpDKrsuVa/X7+4gRRLZEVxajNOgtFHRUY4lrYZGVz9iqAliFKb0tKSHUk0T4/zxk2St8QlQv1kCphxtta0B5cr5Vo6xALeSZZHp7PTzi9PfFsnmCVeQ3s5tRb9XlEH6msylcYwz2RMibvD3RcgkExwjSy4dyFIFSjaWDssUR8023tYyAIDtdnHyVfToD52TloOz08/Onv5bbC/ByyWOyAdaEhCwrIYVUP83WCjznoKibJgTyx2rlk39NH3CTmR2+LWOrCZWqnKQqIJiRhM9rIBLeZEVt0DLYMYZ+0GzBfXcA9Vwwd5uKSSowmaam3qaNa36qPc4kBSl2pIURwBNh03Adq0wbBEjyXObeoIYsTlxYE5uzU4JujRraC06pkhSCLdvKRdtJLLZH0spOFyzXWbfQRe1EcSASZUNcPRasl6M0LvXrOmABADxFwGSTZzDwB1RCHEVrkbIVTQHKdYbt3IoR9DGPTfay2K8LkGmpeuzpKJ8NUWupWugF8V4ATovZfrWrBU6BYehvOvqprmW3AGIYdb0hz9RW5OGnmmHITGyM2kWmirt7ilz5KgBm/X6G7EfgJ8d8oAiI2YfG2J9UM/ri82XQuWBVj8U7ljqQMBjMJANqCcjKfx8sEw/omw4Qve36nX/MGVezftmyuxZwZAhb4rqW47D+DCdyFI3k7OwZsabaQZJ0tkYAfEcxzUwKoaugLpqmR+HguPNLobHlosNWIFMvImBFzet2GYNX80AP53Mo6pY1X4gptijCEKMRHxXXOZ07HKpVVSS28yY/Q8ZbqFI" />