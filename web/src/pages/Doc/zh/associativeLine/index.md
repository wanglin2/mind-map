# AssociativeLine 插件

> v0.4.5+

> 调整关联线控制点的功能从v0.4.6+开始支持

> 关联性支持文本编辑从v0.5.11+开始支持

该插件用于支持添加关联线。

## 注册

```js
import MindMap from 'simple-mind-map'
import AssociativeLine from 'simple-mind-map/src/plugins/AssociativeLine.js'
// import AssociativeLine from 'simple-mind-map/src/AssociativeLine.js' v0.6.0以下版本使用该路径

MindMap.usePlugin(AssociativeLine)
```

注册完且实例化`MindMap`后可通过`mindMap.associativeLine`获取到该实例。

## 配置

支持修改关联线的粗细和颜色，分为默认状态和激活状态。配置如下：

- `associativeLineWidth`：关联线默认状态的粗细，默认值为`2`

- `associativeLineColor`：关联线默认状态的颜色，默认值为`rgb(51, 51, 51)`

- `associativeLineActiveWidth`：关联线激活状态的粗细，默认值为`8`

- `associativeLineActiveColor`：关联线激活状态的颜色，默认值为`rgba(2, 167, 240, 1)`

配置以主题的方式提供，所以如果想要修改这四个属性，可以通过`mindMap.setThemeConfig(config)`方法进行修改。

## 属性

### mindMap.associativeLine.lineList

当前所有连接线数据，数组类型，数组的每一项也是一个数组：

```js
[
    path, // 连接线节点
    clickPath, // 不可见的点击线节点
    node, // 起始节点
    toNode // 目标节点
]
```

### mindMap.associativeLine.activeLine

当前激活的连接线，数组类型，同`lineList`数组的每一项的结构。

## 方法

### renderAllLines()

重新渲染所有关联线。

### removeAllLines()

移除所有关联线。

### createLineFromActiveNode()

从当前激活节点开始创建关联线，如果有多个激活节点，默认为第一个节点。

调用该方法后，会从第一个激活节点到当前鼠标实时位置渲染一条关联线，当点击某个目标节点后则代表创建完成，会在第一个激活节点和点击节点之间渲染一条关联线。

### createLine(fromNode)

从指定节点开始创建关联线。

调用该方法后，会从指定节点到当前鼠标实时位置渲染一条关联线，当点击某个目标节点后则代表创建完成，会在指定节点和点击节点之间渲染一条关联线。

### addLine(fromNode, toNode)

直接添加一条关联线。

调用该方法，会直接创建一条从`fromNode`到`toNode`节点的关联线。

### removeLine()

删除当前激活的关联线。点击某条关联线则视为激活。

### clearActiveLine()

清除当前激活的关联线的激活状态。

### front()

> v0.8.0+

关联线顶层显示。

### back()

> v0.8.0+

关联线回到原有层级。