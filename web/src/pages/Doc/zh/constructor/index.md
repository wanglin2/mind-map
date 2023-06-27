# 构造函数

## 基本使用

```html
<div id="mindMapContainer"></div>
```

```js
import MindMap from "simple-mind-map";

const mindMap = new MindMap({
  el: document.getElementById('mindMapContainer'),
  data: {
    "data": {
        "text": "根节点"
    },
    "children": []
  }
});
```

## 实例化选项

| 字段名称                         | 类型    | 默认值           | 描述                                                         | 是否必填 |
| -------------------------------- | ------- | ---------------- | ------------------------------------------------------------ | -------- |
| el                               | Element |                  | 容器元素，必须为DOM元素                                      | 是       |
| data                             | Object  | {}               | 思维导图数据，可参考：[exampleData.js](https://github.com/wanglin2/mind-map/blob/main/simple-mind-map/example/exampleData.js) |          |
| layout                           | String  | logicalStructure | 布局类型，可选列表：logicalStructure（逻辑结构图）、mindMap（思维导图）、catalogOrganization（目录组织图）、organizationStructure（组织结构图）、timeline（v0.5.4+，时间轴）、timeline2（v0.5.4+，上下交替型时间轴）、fishbone（v0.5.4+，鱼骨图） |          |
| fishboneDeg（v0.5.4+）                      | Number |  45          |  设置鱼骨结构图的斜线角度               |        |
| theme                            | String  | default          | 主题，可选列表：default（默认）、classic（脑图经典）、minions（小黄人）、pinkGrape（粉红葡萄）、mint（薄荷）、gold（金色vip）、vitalityOrange（活力橙）、greenLeaf（绿叶）、dark2（暗色2）、skyGreen（天清绿）、classic2（脑图经典2）、classic3（脑图经典3）、classic4（脑图经典4，v0.2.0+）、classicGreen（经典绿）、classicBlue（经典蓝）、blueSky（天空蓝）、brainImpairedPink（脑残粉）、dark（暗色）、earthYellow（泥土黄）、freshGreen（清新绿）、freshRed（清新红）、romanticPurple（浪漫紫）、simpleBlack（v0.5.4+简约黑）、courseGreen（v0.5.4+课程绿）、coffee（v0.5.4+咖啡）、redSpirit（v0.5.4+红色精神）、blackHumour（v0.5.4+黑色幽默）、lateNightOffice（v0.5.4+深夜办公室）、blackGold（v0.5.4+黑金）、avocado（v.5.10-fix.2+牛油果）、autumn（v.5.10-fix.2+秋天）、orangeJuice（v.5.10-fix.2+橙汁） |          |
| themeConfig                      | Object  | {}               | 主题配置，会和所选择的主题进行合并，可用字段可参考：[default.js](https://github.com/wanglin2/mind-map/blob/main/simple-mind-map/src/themes/default.js) |          |
| scaleRatio                       | Number  | 0.1              | 放大缩小的增量比例                                           |          |
| maxTag                           | Number  | 5                | 节点里最多显示的标签数量，多余的会被丢弃                     |          |
| exportPadding                    | Number  | 20               | 导出图片时的内边距                                           |          |
| imgTextMargin                    | Number  | 5                | 节点里图片和文字的间距                                       |          |
| textContentMargin                | Number  | 2                | 节点里各种文字信息的间距，如图标和文字的间距                 |          |
| selectTranslateStep              | Number  | 3                | 多选节点时鼠标移动到边缘时的画布移动偏移量                   |          |
| selectTranslateLimit             | Number  | 20               | 多选节点时鼠标移动距边缘多少距离时开始偏移                   |          |
| customNoteContentShow（v0.1.6+） | Object  | null             | 自定义节点备注内容显示，Object类型，结构为：{show: (noteContent, left, top) => {// 你的显示节点备注逻辑 }, hide: () => {// 你的隐藏节点备注逻辑 }} |          |
| readonly（v0.1.7+）              | Boolean | false            | 是否是只读模式                                               |          |
| enableFreeDrag（v0.2.4+）        | Boolean | false            | 是否开启节点自由拖拽                                         |          |
| watermarkConfig（v0.2.4+）       | Object  |                  | 水印配置，详细配置请参考下方表格【水印配置】                 |          |
| textAutoWrapWidth（v0.3.4+）     | Number  | 500 |   节点内每行文本达到该宽度后自动换行               |          |
| customHandleMousewheel（v0.4.3+）     | Function  | null | 自定义鼠标滚轮事件处理，可以传一个函数，回调参数为事件对象                 |          |
| mousewheelAction（v0.4.3+）     | String  | zoom | 鼠标滚轮的行为，`zoom`（放大缩小）、`move`（上下移动）。如果`customHandleMousewheel`传了自定义函数，这个属性不生效                 |          |
| mousewheelMoveStep（v0.4.3+）     | Number  | 100 | 当`mousewheelAction`设为`move`时，可以通过该属性控制鼠标滚动一下视图移动的步长，单位`px`               |          |
| defaultInsertSecondLevelNodeText（v0.4.7+）     | String  | 二级节点 | 默认插入的二级节点的文字               |          |
| defaultInsertBelowSecondLevelNodeText（v0.4.7+）     | String  | 分支主题 | 默认插入的二级以下节点的文字               |          |
| expandBtnStyle（v0.5.0+）     | Object  | { color: '#808080', fill: '#fff' } | 展开收起按钮的颜色  |          |
| expandBtnIcon（v0.5.0+）     | Object  | { open: '', close: '' } | 自定义展开收起按钮的图标，可以传图标的svg字符串  |          |
| enableShortcutOnlyWhenMouseInSvg（v0.5.1+）     | Boolean  | true | 是否只有当鼠标在画布内才响应快捷键事件  |          |
| enableNodeTransitionMove（v0.5.1+）     | Boolean  | true | 是否开启节点动画过渡  |          |
| nodeTransitionMoveDuration（v0.5.1+）     | Number  | 300 | 如果开启节点动画过渡，可以通过该属性设置过渡的时间，单位ms  |          |
| initRootNodePosition（v0.5.3+）     | Array  | null | 初始根节点的位置，可传一个数组，默认为`['center', 'center']`，代表根节点处于画布中心位置，除了`center`，关键词还可以设置`left`、`top`、`right`、`bottom`，除了可以传关键词，数组的每项还可以传递一个数字，代表具体的像素，可以传递一个百分比字符串，比如`['40%', '60%']`，代表水平位置在画布宽度的`40%`的位置，垂直位置在画布高度的`60%`的位置  |          |
| exportPaddingX（v0.5.5+）     |  Number | 10 | 导出png、svg、pdf时的图形水平内边距  |          |
| exportPaddingY（v0.5.5+）     | Number  | 10 | 导出png、svg、pdf时的图形垂直内边距  |          |
| nodeTextEditZIndex（v0.5.5+）     | Number  | 3000 | 节点文本编辑框元素的z-index  |          |
| nodeNoteTooltipZIndex（v0.5.5+）     | Number  | 3000 | 节点备注浮层元素的z-index  |          |
| isEndNodeTextEditOnClickOuter（v0.5.5+）     | Boolean  | true |  是否在点击了画布外的区域时结束节点文本的编辑状态 |          |
| maxHistoryCount（v0.5.6+）     | Number  | 1000 | 最大历史记录数  |          |
| alwaysShowExpandBtn（v0.5.8+）     | Boolean  | false | 是否一直显示节点的展开收起按钮，默认为鼠标移上去和激活时才显示  |          |
| iconList（v0.5.8+）     | Array  | [] | 扩展节点可插入的图标，数组的每一项为一个对象，对象详细结构请参考下方【图标配置】表格  |          |
| maxNodeCacheCount（v0.5.10+）     |  Number | 1000 | 节点最大缓存数量。为了优化性能，内部会维护一个节点缓存池，用来复用节点，通过该属性可以指定池的最大缓存数量  |          |
| defaultAssociativeLineText（v0.5.11+）     |  String | 关联 |  关联线默认文字 |          |
| fitPadding（v0.6.0+）     |  Number | 50 |  思维导图适应画布大小时的内边距，单位：px |          |
| enableCtrlKeyNodeSelection（v0.6.0+）     | Boolean  | true | 是否开启按住ctrl键多选节点的功能  |          |
| useLeftKeySelectionRightKeyDrag（v0.6.0+）     | Boolean  | false | 设置为左键多选节点，右键拖动画布  |          |
| beforeTextEdit（v0.6.0+）     |  Function/null | null | 节点即将进入编辑前的回调方法，如果该方法返回true以外的值，那么将取消编辑，函数可以返回一个值，或一个Promise，回调参数为节点实例  |          |
| isUseCustomNodeContent（v0.6.3+）     |  Boolean | false | 是否自定义节点内容  |          |
| customCreateNodeContent（v0.6.3+）     |  Function/null | null | 如果`isUseCustomNodeContent`设为`true`，那么需要使用该选项传入一个方法，接收节点实例`node`为参数（如果要获取该节点的数据，可以通过`node.nodeData.data`），需要返回自定义节点内容元素，也就是DOM节点，如果某个节点不需要自定义，那么返回`null`即可 |          |
| mouseScaleCenterUseMousePosition（v0.6.4-fix.1+）     | Boolean  | true | 鼠标缩放是否以鼠标当前位置为中心点，否则以画布中心点 |          |

### 水印配置

| 字段名称    | 类型   | 默认值                                      | 描述                                 |
| ----------- | ------ | ------------------------------------------- | ------------------------------------ |
| text        | String | ''                                          | 水印文字，如果为空字符串则不显示水印 |
| lineSpacing | Number | 100                                         | 水印每行之间的间距                   |
| textSpacing | Number | 100                                         | 同一行水印之间的间距                 |
| angle       | Number | 30                                          | 水印的倾斜角度，范围：[0, 90]        |
| textStyle   | Object | {color: '#999', opacity: 0.5, fontSize: 14} | 水印文字样式                         |

### 图标配置

| 字段名称    | 类型   | 默认值                                      | 描述                                 |
| ----------- | ------ | ------------------------------------------- | ------------------------------------ |
| name        | String |                                           | 图标分组的名称 |
| type        | String |                                           | 图标分组的值 |
| list        | Array  |                                           | 分组下的图标列表，数组的每一项为一个对象，`{ name: '', icon: '' }`，`name`代表图标的名称，`icon`代表图标，可以是`svg`图标，比如`<svg ...><path></path></svg>`，也可以是图片`url`，或者是`base64`图标，比如`data:image/png;base64,...` |

## 静态方法

### defineTheme(name, config)

> v0.2.23+

定义新主题。

`name`：新主题名称

`config`：主题数据

`simple-mind-map`内置了众多主题，另外你也可以注册新主题，建议在实例化之前进行注册，这样在实例化时可以直接使用新注册的主题，使用示例：

```js
import MindMap from 'simple-mind-map'
// 注册新主题
MindMap.defineTheme('主题名称', {})

// 1.实例化时使用新注册的主题
const mindMap = new MindMap({
    theme: '主题名称'
})

// 2.动态切换新主题
mindMap.setTheme('主题名称')
```

主题的所有配置可以参考[默认主题](https://github.com/wanglin2/mind-map/blob/main/simple-mind-map/src/themes/default.js)。`defineTheme`方法会把你传入的配置和默认配置做合并。大部分主题其实需要自定义的部分不是很多，一个典型的自定义主题配置可以参考[blueSky](https://github.com/wanglin2/mind-map/blob/main/simple-mind-map/src/themes/blueSky.js)。

### usePlugin(plugin, opt = {})

> v0.3.0+

- `opt`：v0.4.0+，插件参数。如果某个插件支持自定义选项的话可以通过这个参数传入。


注册插件，如果需要使用非核心的一些功能，比如小地图、水印等，可以通过该方法进行注册。可链式调用。

注意：插件需要在实例化`MindMap`前注册。

### hasPlugin(plugin)

> v0.4.0+

获取是否注册了某个插件，返回的是插件在注册插件列表里的索引，为`-1`则代表插件没有注册。

## 静态属性

### pluginList

> v0.3.0+

当前注册的所有插件列表。

## 实例方法

### destroy()

> v0.6.0+

销毁思维导图。会移除注册的插件、移除监听的事件、删除画布的所有节点。

### getSvgData({ paddingX = 0, paddingY = 0 })

> v0.3.0+

`paddingX`：水平内边距

`paddingY`：垂直内边距

获取`svg`数据，返回一个对象，详细结构如下：

```js
{
  svg, // Element，思维导图图形的整体svg元素，包括：svg（画布容器）、g（实际的思维导图组）
  svgHTML, // String，svg字符串，即html字符串，可以直接渲染到你准备的小地图容器内
  rect: // Object，思维导图图形未缩放时的位置尺寸等信息
  origWidth, // Number，画布宽度
  origHeight, // Number，画布高度
  scaleX, // Number，思维导图图形的水平缩放值
  scaleY, // Number，思维导图图形的垂直缩放值
}
```

### render(callback)

- `callback`：`v0.3.2+`，`Function`，当重新渲染完成时调用

触发整体渲染，会进行节点复用，性能较`reRender`会更好一点，如果只是节点位置变化了可以调用该方法进行渲染

### reRender(callback)

- `callback`：`v0.3.2+`，`Function`，当重新渲染完成时调用

整体重新渲染，会清空画布，节点也会重新创建，性能不好，慎重使用

### resize()

容器尺寸变化后，需要调用该方法进行适应

### setMode(mode)

> v0.1.7+

切换模式为只读或编辑。

`mode`：readonly、edit

### on(event, fn)

监听事件，事件列表：

| 事件名称                         | 描述                                       | 回调参数                                                     |
| -------------------------------- | ------------------------------------------ | ------------------------------------------------------------ |
| data_change                      | 渲染树数据变化，可以监听该方法获取最新数据 | data（当前渲染树数据）                                       |
| view_data_change（v0.1.1+）      | 视图变化数据，比如拖动或缩放时会触发       | data（当前视图状态数据）                                     |
| back_forward                     | 前进或回退                                 | activeHistoryIndex（当前在历史数据数组里的索引）、length（当前历史数据数组的长度） |
| draw_click                       | *画布的单击事件*                           | e（事件对象）                                                |
| svg_mousedown                    | svg画布的鼠标按下事件                      | e（事件对象）                                                |
| mousedown                        | el元素的鼠标按下事件                       | e（事件对象）、this（Event事件类实例）                       |
| mousemove                        | el元素的鼠标移动事件                       | e（事件对象）、this（Event事件类实例）                       |
| drag                             | 如果是按住左键拖动的话会触发拖动事件       | e（事件对象）、this（Event事件类实例）                       |
| mouseup                          | el元素的鼠标松开事件                       | e（事件对象）、this（Event事件类实例）                       |
| mousewheel                       | 鼠标滚动事件                               | e（事件对象）、dir（向上up还是向下down滚动）、this（Event事件类实例）、isTouchPad（v0.6.1+，是否是触控板触发的事件） |
| contextmenu                      | svg画布的鼠标右键菜单事件                  | e（事件对象）                                                |
| node_click                       | 节点的单击事件                             | this（节点实例）、e（事件对象）                              |
| node_mousedown                   | 节点的鼠标按下事件                         | this（节点实例）、e（事件对象）                              |
| node_mouseup                     | 节点的鼠标松开事件                         | this（节点实例）、e（事件对象）                              |
| node_dblclick                    | 节点的双击事件                             | this（节点实例）、e（事件对象）                              |
| node_contextmenu                 | 节点的右键菜单事件                         | e（事件对象）、this（节点实例）                              |
| node_mouseenter（v0.4.1+）       | 节点的鼠标移入事件     | this（节点实例）、e（事件对象）            |
| node_mouseleave（v0.4.1+）       | 节点的鼠标移出事件     | this（节点实例）、e（事件对象）            |
| before_node_active               | 节点激活前事件                             | this（节点实例）、activeNodeList（当前激活的所有节点列表）   |
| node_active                      | 节点激活事件                               | this（节点实例）、activeNodeList（当前激活的所有节点列表）   |
| expand_btn_click                 | 节点展开或收缩事件                         | this（节点实例）                                             |
| before_show_text_edit            | 节点文本编辑框即将打开事件                 |                                                              |
| hide_text_edit                   | 节点文本编辑框关闭事件                     | textEditNode（文本编辑框DOM节点）、activeNodeList（当前激活的所有节点列表） |
| scale                            | 放大缩小事件                               | scale（缩放比例）                                            |
| node_img_dblclick（v0.2.15+）    | 节点内图片的双击事件                       | this（节点实例）、e（事件对象）                              |
| node_tree_render_end（v0.2.16+） | 节点树渲染完毕事件                         |                                                              |
| rich_text_selection_change（v0.4.0+）         |  当注册了`RichText`插件时可用。当节点编辑时，文本选区发生改变时触发         |  hasRange（是否存在选区）、rectInfo（选区的尺寸和位置信息）、formatInfo（选区的文本格式化信息）            |
| transforming-dom-to-images（v0.4.0+）         |  当注册了`RichText`插件时可用。当`svg`中存在`DOM`节点时，导出为图片时会将`DOM`节点转换为图片，转换过程中会触发该事件，可用通过该事件给用户提示，告知目前转换到的节点         |  index（当前转换到的节点索引）、len（一共需要转换的节点数量）            |
| node_dragging（v0.4.5+）    | 当某个节点被拖拽时触发   |  node（当前被拖拽的节点）           |
| node_dragend（v0.4.5+）    | 节点被拖拽结束时触发   |             |
| associative_line_click（v0.4.5+）    |  点击某条关联线时触发  |  path（连接线节点）、clickPath（不可见的点击线节点）、node（起始节点）、toNode（目标节点）           |
| svg_mouseenter（v0.5.1+）    | 鼠标移入svg画布时触发   | e（事件对象）  |
| svg_mouseleave（v0.5.1+）    | 鼠标移出svg画布时触发   | e（事件对象）  |

### emit(event, ...args)

触发事件，可以是上面表格里的事件，也可以是自定义事件

### off(event, fn)

解绑事件

### setTheme(theme)

切换主题，可选主题见上面的选项表格

### getTheme()

获取当前主题

### setThemeConfig(config)

设置主题配置，`config`同上面选项表格里的选项`themeConfig`

### getCustomThemeConfig()

获取自定义主题配置

### getThemeConfig(prop)

获取某个主题配置属性值

### getConfig(*prop*)

> 0.2.24+

`prop`：获取指定配置的值，不传则返回整个配置

获取配置，即`new MindMap(opt)`的`opt`

### updateConfig(*opt* = {})

> 0.2.24+

`opt`：要更新的配置

更新配置，即更新`new MindMap(opt)`的`opt`，可以只更新部分数据，比如：

```js
mindMap.updateConfig({
    enableFreeDrag: true// 开启节点自由拖拽
})
```

该方法只做更新配置的事情，没有其他副作用，比如触发画布重新渲染之类的

### getLayout()

获取当前的布局结构

### setLayout(layout)

设置布局结构，可选值见上面选项表格的`layout`字段

### execCommand(name, ...args)

执行命令，每执行一个命令就会在历史堆栈里添加一条记录用于回退或前进。所有命令如下：

| 命令名称                            | 描述                                                         | 参数                                                         |
| ----------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| SELECT_ALL                          | 全选                                                         |                                                              |
| BACK                                | 回退指定的步数                                               | step（要回退的步数，默认为1）                                |
| FORWARD                             | 前进指定的步数                                               | step（要前进的步数，默认为1）                                |
| INSERT_NODE                         | 插入同级节点，操作节点为当前激活的节点或指定节点，如果有多个激活节点，只会对第一个有效 | openEdit（v0.4.6+，是否激活新插入的节点并进入编辑模式，默认为`true`）、 appointNodes（v0.4.7+，可选，指定节点，指定多个节点可以传一个数组）、 appointData（可选，指定新创建节点的数据，比如{text: 'xxx', ...}，详细结构可以参考[exampleData.js](https://github.com/wanglin2/mind-map/blob/main/simple-mind-map/example/exampleData.js)）                                                             |
| INSERT_CHILD_NODE                   | 插入子节点，操作节点为当前激活的节点或指定节点                         |   openEdit（v0.4.6+，是否激活新插入的节点并进入编辑模式，默认为`true`）、 appointNodes（v0.4.7+，可选，指定节点，指定多个节点可以传一个数组）、 appointData（可选，指定新创建节点的数据，比如{text: 'xxx', ...}，详细结构可以参考[exampleData.js](https://github.com/wanglin2/mind-map/blob/main/simple-mind-map/example/exampleData.js)）                                                           |
| UP_NODE                             | 上移节点，操作节点为当前激活的节点，如果有多个激活节点，只会对第一个有效，对根节点或在列表里的第一个节点使用无效 |                                                              |
| DOWN_NODE                           | 操作节点为当前激活的节点，如果有多个激活节点，只会对第一个有效，对根节点或在列表里的最后一个节点使用无效 |                                                              |
| REMOVE_NODE                         | 删除节点，操作节点为当前激活的节点或指定节点                         |   appointNodes（v0.4.7+，可选，指定节点，指定多个节点可以传一个数组）                                                           |
| PASTE_NODE                          | 粘贴节点到节点，操作节点为当前激活的节点                     | data（要粘贴的节点数据，一般通过`renderer.copyNode()`方法和`renderer.cutNode()`方法获取） |
| CUT_NODE                            | 剪切节点，操作节点为当前激活的节点，如果有多个激活节点，只会对第一个有效，对根节点使用无效 | callback(回调函数，剪切的节点数据会通过调用该函数并通过参数返回) |
| SET_NODE_STYLE                      | 修改节点样式                                                 | node（要设置样式的节点）、prop（样式属性）、value（样式属性值）、isActive（布尔值，是否设置的是激活状态的样式） |
| SET_NODE_ACTIVE                     | 设置节点是否激活                                             | node（要设置的节点）、active（布尔值，是否激活）             |
| CLEAR_ACTIVE_NODE                   | 清除当前已激活节点的激活状态，操作节点为当前激活的节点       |                                                              |
| SET_NODE_EXPAND                     | 设置节点是否展开                                             | node（要设置的节点）、expand（布尔值，是否展开）             |
| EXPAND_ALL                          | 展开所有节点                                                 |                                                              |
| UNEXPAND_ALL                        | 收起所有节点                                                 |                                                              |
| UNEXPAND_TO_LEVEL（v0.2.8+）        | 展开到指定层级                                               | level（要展开到的层级，1、2、3...）                          |
| SET_NODE_DATA                       | 更新节点数据，即更新节点数据对象里`data`对象的数据           | node（要设置的节点）、data（对象，要更新的数据，如`{expand: true}`） |
| SET_NODE_TEXT                       | 设置节点文本                                                 | node（要设置的节点）、text（要设置的文本字符串，换行可以使用`\n`）、richText（v0.4.0+，如果要设置的是富文本字符，需要设为`true`） |
| SET_NODE_IMAGE                      | 设置节点图片                                                 | node（要设置的节点）、imgData（对象，图片信息，结构为：`{url, title, width, height}`，图片的宽高必须要传） |
| SET_NODE_ICON                       | 设置节点图标                                                 | node（要设置的节点）、icons（数组，预定义的图片名称组成的数组，可用图标可在[icons.js](https://github.com/wanglin2/mind-map/blob/main/simple-mind-map/src/svg/icons.js)文件里的`nodeIconList`列表里获取到，图标名称为`type_name`，如`['priority_1']`） |
| SET_NODE_HYPERLINK                  | 设置节点超链接                                               | node（要设置的节点）、link（超链接地址）、title（超链接名称，可选） |
| SET_NODE_NOTE                       | 设置节点备注                                                 | node（要设置的节点）、note（备注文字）                       |
| SET_NODE_TAG                        | 设置节点标签                                                 | node（要设置的节点）、tag（字符串数组，内置颜色信息可在[constant.js](https://github.com/wanglin2/mind-map/blob/main/simple-mind-map/src/constants/constant.js)里获取到） |
| INSERT_AFTER（v0.1.5+）             | 将节点移动到另一个节点的后面                                 | node（要移动的节点）、 exist（目标节点）                     |
| INSERT_BEFORE（v0.1.5+）            | 将节点移动到另一个节点的前面                                 | node（要移动的节点）、 exist（目标节点）                     |
| MOVE_NODE_TO（v0.1.5+）             | 移动一个节点作为另一个节点的子节点                           | node（要移动的节点）、 toNode（目标节点）                    |
| ADD_GENERALIZATION（v0.2.0+）       | 添加节点概要                                                 | data（概要的数据，对象格式，节点的数字段都支持，默认为{text: '概要'}） |
| REMOVE_GENERALIZATION（v0.2.0+）    | 删除节点概要                                                 |                                                              |
| SET_NODE_CUSTOM_POSITION（v0.2.0+） | 设置节点自定义位置                                           | node（要设置的节点）、 left（自定义的x坐标，默认为undefined）、 top（自定义的y坐标，默认为undefined） |
| RESET_LAYOUT（v0.2.0+）             | 一键整理布局                                                 |                                                              |
| SET_NODE_SHAPE（v0.2.4+）           | 设置节点形状                                                 | node（要设置的节点）、shape（形状，全部形状：[Shape.js](https://github.com/wanglin2/mind-map/blob/main/simple-mind-map/src/core/render/node/Shape.js)） |

### setData(data)

动态设置思维导图数据，纯节点数据

`data`：思维导图结构数据

### setFullData(*data*)

> v0.2.7+

动态设置思维导图数据，包括节点数据、布局、主题、视图

`data`：完整数据，结构可参考[exportFullData](https://github.com/wanglin2/mind-map/blob/main/simple-mind-map/example/exportFullData.json)

### getData(withConfig)

> v0.2.9+

获取思维导图数据

`withConfig`：`Boolean`，默认为`false`，即获取的数据只包括节点树，如果传`true`则会包含主题、布局、视图等数据

### export(type, isDownload, fileName)

> 需要先注册`Export`插件

导出

`type`：要导出的类型，可选值：png、svg、json、pdf（v0.2.1+）、smm（本质也是json）

`isDownload`：是否需要直接触发下载，布尔值，默认为`false`

`fileName`：（v0.1.6+）导出文件的名称，默认为`思维导图`

如果是导出为`png`，那么可以传递第四个参数：

`transparent`：v0.5.7+, `Boolean`，默认为`false`，指定导出图片的背景是否是透明的

如果是导出为`svg`，那么可以传递第四个参数：

`plusCssText`：附加的`css`样式，如果`svg`中存在`dom`节点，想要设置一些针对节点的样式可以通过这个参数传入

如果是导出为`json`或`smm`，那么可以传递第四个参数：

`withConfig`：`Boolean`，默认为`true`，指定导出的数据中是否包含配置数据，否则只导出纯节点树数据

### toPos(x, y)

> v0.1.5+

将浏览器可视窗口的坐标转换成相对于画布的坐标

### addPlugin(plugin, opt)

> v0.4.0+

注册插件，使用`MindMap.usePlugin`注册插件只能在实例化之前，实例化后注册的插件是不会生效的，所以如果想在实例化后注册插件可以使用实例的`addPlugin`方法。

### removePlugin(plugin)

> v0.4.0+

移除注册的插件，无论是通过`usePlugin`还是`addPlugin`方法注册的插件都可以移除。