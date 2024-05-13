# Demonstrate 插件

> v0.9.11+

`Demonstrate`插件提供演示功能。

进入演示模式时会自动将容器元素全屏，然后默认聚焦到根节点，可通过键盘方向键的左右来切换上一步和下一步，可通过`Esc`键退出演示模式。

进入演示模式后思维导图所有的快捷键都将无法使用，鼠标也无法操作思维导图。

## 注册

```js
import MindMap from 'simple-mind-map'
import Demonstrate from 'simple-mind-map/src/plugins/Demonstrate.js'

MindMap.usePlugin(Demonstrate)
```

注册完且实例化`MindMap`后可通过`mindMap.demonstrate`获取到该实例。

### 配置

该插件提供了一些配置项可供配置，可以通过实例化选项`demonstrateConfig`进行配置。详见【构造函数】篇章的【实例化选项】小节。

### 事件

该插件会派发如下事件：

`exit_demonstrate`：退出演示时触发。

`demonstrate_jump`：跳转时触发。

详见【构造函数】篇章的【实例方法】小节`on`函数。

## 属性

### stepList

演示的所有步骤列表。当调用了`enter`方法后可用。

### currentStepIndex

当前播放到的步骤索引，从0开始计数。

### config

插件当前的配置。

## 方法

### enter()

进入演示模式，会自动将容器元素全屏。

### exit()

退出演示模式，通过`Esc`键也可退出。

### prev()

上一步。

### next()

下一步。

### jump(index)

- `index`：Number，要跳转到的某一步，从0开始计数。

跳转到某一步。