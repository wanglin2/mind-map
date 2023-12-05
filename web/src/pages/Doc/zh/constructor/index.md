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

| 字段名称                         | 类型    | 默认值           | 描述                                                         |
| -------------------------------- | ------- | ---------------- | ------------------------------------------------------------ |
| el                               | Element |                  | 容器元素，必传，必须为DOM元素                                      |
| data                             | Object  | {}               | 思维导图数据，可参考下方【数据结构】介绍 |
| layout                           | String  | logicalStructure | 布局类型，可选列表：logicalStructure（逻辑结构图）、mindMap（思维导图）、catalogOrganization（目录组织图）、organizationStructure（组织结构图）、timeline（v0.5.4+，时间轴）、timeline2（v0.5.4+，上下交替型时间轴）、fishbone（v0.5.4+，鱼骨图） |
| fishboneDeg（v0.5.4+）                      | Number |  45          |  设置鱼骨结构图的斜线角度               |
| theme                            | String  | default          | 主题，可选列表：default（默认）、classic（脑图经典）、minions（小黄人）、pinkGrape（粉红葡萄）、mint（薄荷）、gold（金色vip）、vitalityOrange（活力橙）、greenLeaf（绿叶）、dark2（暗色2）、skyGreen（天清绿）、classic2（脑图经典2）、classic3（脑图经典3）、classic4（脑图经典4，v0.2.0+）、classicGreen（经典绿）、classicBlue（经典蓝）、blueSky（天空蓝）、brainImpairedPink（脑残粉）、dark（暗色）、earthYellow（泥土黄）、freshGreen（清新绿）、freshRed（清新红）、romanticPurple（浪漫紫）、simpleBlack（v0.5.4+简约黑）、courseGreen（v0.5.4+课程绿）、coffee（v0.5.4+咖啡）、redSpirit（v0.5.4+红色精神）、blackHumour（v0.5.4+黑色幽默）、lateNightOffice（v0.5.4+深夜办公室）、blackGold（v0.5.4+黑金）、avocado（v.5.10-fix.2+牛油果）、autumn（v.5.10-fix.2+秋天）、orangeJuice（v.5.10-fix.2+橙汁） |
| themeConfig                      | Object  | {}               | 主题配置，会和所选择的主题进行合并，可用字段可参考：[default.js](https://github.com/wanglin2/mind-map/blob/main/simple-mind-map/src/themes/default.js) |
| scaleRatio                       | Number  | 0.1              | 放大缩小的增量比例                                           |
| maxTag                           | Number  | 5                | 节点里最多显示的标签数量，多余的会被丢弃                     |
| exportPadding                    | Number  | 20               | 导出图片时的内边距                                           |
| imgTextMargin                    | Number  | 5                | 节点里图片和文字的间距                                       |
| textContentMargin                | Number  | 2                | 节点里各种文字信息的间距，如图标和文字的间距                 |
| selectTranslateStep              | Number  | 3                | 多选节点时鼠标移动到边缘时的画布移动偏移量                   |
| selectTranslateLimit             | Number  | 20               | 多选节点时鼠标移动距边缘多少距离时开始偏移                   |
| customNoteContentShow（v0.1.6+） | Object  | null             | 自定义节点备注内容显示，Object类型，结构为：{show: (noteContent, left, top, node) => {// 你的显示节点备注逻辑。node为v0.8.1+版本新增的回参，代表节点实例 }, hide: () => {// 你的隐藏节点备注逻辑 }} |
| readonly（v0.1.7+）              | Boolean | false            | 是否是只读模式                                               |
| enableFreeDrag（v0.2.4+）        | Boolean | false            | 是否开启节点自由拖拽（自由拖拽即可以把节点拖拽到画布的任意位置，注意不是拖拽节点成为其他节点的子节点兄弟节点的功能，自由拖拽的连线会存在一定问题，所以该特性最好不要使用）                                         |
| watermarkConfig（v0.2.4+）       | Object  |                  | 水印配置，详细配置请参考下方表格【水印配置】                 |
| textAutoWrapWidth（v0.3.4+）     | Number  | 500 |   节点内每行文本达到该宽度后自动换行               |
| customHandleMousewheel（v0.4.3+）     | Function  | null | 自定义鼠标滚轮事件处理，可以传一个函数，回调参数为事件对象                 |
| mousewheelAction（v0.4.3+）     | String  | zoom（v0.9.1+默认改为move） | 鼠标滚轮的行为，`zoom`（放大缩小）、`move`（上下移动）。如果`customHandleMousewheel`传了自定义函数，这个属性不生效                 |
| mousewheelMoveStep（v0.4.3+）     | Number  | 100 | 当`mousewheelAction`设为`move`时，可以通过该属性控制鼠标滚动一下视图移动的步长，单位`px`               |
| mousewheelZoomActionReverse（v0.6.5+）     | Boolean  | false（v0.9.1+默认改为true） |  当mousewheelAction设为zoom时，或者按住Ctrl键时，默认向前滚动是缩小，向后滚动是放大，如果该属性设为true，那么会反过来  |
| defaultInsertSecondLevelNodeText（v0.4.7+）     | String  | 二级节点 | 默认插入的二级节点的文字               |
| defaultInsertBelowSecondLevelNodeText（v0.4.7+）     | String  | 分支主题 | 默认插入的二级以下节点的文字               |
| expandBtnStyle（v0.5.0+）     | Object  | { color: '#808080', fill: '#fff', fontSize: 13, strokeColor: '#333333' } | 展开收起按钮的颜色，（fontSize及strokeColor字段为0.7.0+版本新增的，用于设置收起时显示节点数量的文字样式）  |
| expandBtnIcon（v0.5.0+）     | Object  | { open: '', close: '' } | 自定义展开收起按钮的图标，可以传图标的svg字符串  |
| expandBtnNumHandler（v0.7.0+）     | Function  |  | 用于自定义收起时显示节点数量的内容，接收一个参数，代表收起的节点实例，需要返回一个数字或字符串，代表最终显示的内容，比如你可以当数量大于99时，显示99+  |
| isShowExpandNum（v0.7.0+）     | Boolean  | true | 节点收起时是否显示收起的数量  |
| enableShortcutOnlyWhenMouseInSvg（v0.5.1+）     | Boolean  | true | 是否只有当鼠标在画布内才响应快捷键事件  |
| enableNodeTransitionMove（v0.5.1+）（v0.6.7+已去除该特性）     | Boolean  | true | 是否开启节点动画过渡  |
| nodeTransitionMoveDuration（v0.5.1+）（v0.6.7+已去除该特性）     | Number  | 300 | 如果开启节点动画过渡，可以通过该属性设置过渡的时间，单位ms  |
| initRootNodePosition（v0.5.3+）     | Array  | null | 初始根节点的位置，可传一个数组，默认为`['center', 'center']`，代表根节点处于画布中心位置，除了`center`，关键词还可以设置`left`、`top`、`right`、`bottom`，除了可以传关键词，数组的每项还可以传递一个数字，代表具体的像素，可以传递一个百分比字符串，比如`['40%', '60%']`，代表水平位置在画布宽度的`40%`的位置，垂直位置在画布高度的`60%`的位置  |
| exportPaddingX（v0.5.5+）     |  Number | 10 | 导出png、svg、pdf时的图形水平内边距  |
| exportPaddingY（v0.5.5+）     | Number  | 10 | 导出png、svg、pdf时的图形垂直内边距  |
| nodeTextEditZIndex（v0.5.5+）     | Number  | 3000 | 节点文本编辑框元素的z-index  |
| nodeNoteTooltipZIndex（v0.5.5+）     | Number  | 3000 | 节点备注浮层元素的z-index  |
| isEndNodeTextEditOnClickOuter（v0.5.5+）     | Boolean  | true |  是否在点击了画布外的区域时结束节点文本的编辑状态 |
| maxHistoryCount（v0.5.6+）     | Number  | 1000 | 最大历史记录数  |
| alwaysShowExpandBtn（v0.5.8+）     | Boolean  | false | 是否一直显示节点的展开收起按钮，默认为鼠标移上去和激活时才显示  |
| iconList（v0.5.8+）     | Array  | [] | 扩展节点可插入的图标，数组的每一项为一个对象，对象详细结构请参考下方【图标配置】表格  |
| maxNodeCacheCount（v0.5.10+）     |  Number | 1000 | 节点最大缓存数量。为了优化性能，内部会维护一个节点缓存池，用来复用节点，通过该属性可以指定池的最大缓存数量  |
| defaultAssociativeLineText（v0.5.11+）     |  String | 关联 |  关联线默认文字 |
| fitPadding（v0.6.0+）     |  Number | 50 |  思维导图适应画布大小时的内边距，单位：px |
| enableCtrlKeyNodeSelection（v0.6.0+）     | Boolean  | true | 是否开启按住ctrl键多选节点的功能  |
| useLeftKeySelectionRightKeyDrag（v0.6.0+）     | Boolean  | false | 设置为左键多选节点，右键拖动画布  |
| beforeTextEdit（v0.6.0+）     |  Function/null | null | 节点即将进入编辑前的回调方法，如果该方法返回true以外的值，那么将取消编辑，函数可以返回一个值，或一个Promise，回调参数为节点实例  |
| isUseCustomNodeContent（v0.6.3+）     |  Boolean | false | 是否自定义节点内容  |
| customCreateNodeContent（v0.6.3+）     |  Function/null | null | 如果`isUseCustomNodeContent`设为`true`，那么需要使用该选项传入一个方法，接收节点实例`node`为参数（如果要获取该节点的数据，可以通过`node.nodeData.data`），需要返回自定义节点内容元素，也就是DOM节点，如果某个节点不需要自定义，那么返回`null`即可 |
| mouseScaleCenterUseMousePosition（v0.6.4-fix.1+）     | Boolean  | true | 鼠标缩放是否以鼠标当前位置为中心点，否则以画布中心点 |
| customInnerElsAppendTo（v0.6.12+）     | null/HTMLElement  | null | 指定内部一些元素（节点文本编辑元素、节点备注显示元素、关联线文本编辑元素、节点图片调整按钮元素）添加到的位置，默认添加到document.body下 |
| nodeDragPlaceholderMaxSize（v0.6.12+）     | Number  | 20 | 拖拽元素时，指示元素新位置的块的最大高度 |
| enableCreateHiddenInput（v0.6.13+）（v0.6.14+版本已去除该特性）     | Boolean  | true | 是否允许创建一个隐藏的输入框，该输入框会在节点激活时聚焦，用于粘贴数据和自动进入文本编辑状态 |
| enableAutoEnterTextEditWhenKeydown（v0.6.13+）     | Boolean  | true | 是否在存在一个激活节点时，当按下中文、英文、数字按键时自动进入文本编辑模式 |
| richTextEditFakeInPlace（v0.6.13+）     | Boolean  | false | 设置富文本节点编辑框和节点大小一致，形成伪原地编辑的效果，需要注意的是，只有当节点内只有文本、且形状是矩形才会有比较好的效果 |
| customHandleClipboardText（v0.6.14+）     | Function  | null | 自定义对剪贴板文本的处理。当按ctrl+v粘贴时会读取用户剪贴板中的文本和图片，默认只会判断文本是否是普通文本和simple-mind-map格式的节点数据，如果你想处理其他思维导图的数据，比如processon、zhixi等，那么可以传递一个函数，接受当前剪贴板中的文本为参数，返回处理后的数据，可以返回两种类型：1.返回一个纯文本，那么会直接以该文本创建一个子节点；2.返回一个节点对象，格式如下：{ simpleMindMap: true, data: { data: { text: '' }, children: [] } }，代表是simple-mind-map格式的数据，节点数据同simple-mind-map节点数据格式，如果你的处理逻辑存在异步逻辑，也可以返回一个promise |
| errorHandler（v0.6.15+）     | Function  |  | 自定义错误处理函数，目前只会抛出一些异步逻辑出错的情况。可以传递一个函数，会接收两个参数，第一个为错误的类型，第二个为错误对象 |
| disableMouseWheelZoom（v0.6.15+）     | Boolean  | false | 禁止鼠标滚轮缩放，你仍旧可以使用api进行缩放 |
| resetCss（v0.6.16+）     | String  |  * { margin: 0; padding: 0; box-sizing: border-box; } | 设置导出图片和svg时，针对富文本节点内容，也就是嵌入到svg中的html节点的默认样式覆盖，如果不覆盖，节点内容会发生偏移 |
| enableDblclickReset（v0.6.17+）（v0.8.0+已删除该属性）     | Boolean  | true（v0.7.0+改为false）  | 开启鼠标双击复位思维导图位置及缩放 |
| enableDblclickBackToRootNode（v0.8.0+）     | Boolean  | false  | 是否在鼠标双击时回到根节点，也就是让根节点居中显示 |
| minExportImgCanvasScale（v0.7.0+）     | Number  | 2  | 导出图片和pdf时canvas的缩放倍数，该配置会和window.devicePixelRatio值取最大值，用于提升图片清晰度 |
| hoverRectColor（v0.7.0+）     | String  | rgb(94, 200, 248)  | 节点鼠标hover和激活时显示的矩形边框颜色，hover时会添加0.6的透明度 |
| hoverRectPadding（v0.7.0+）     | Number  | 2  | 节点鼠标hover和激活时显示的矩形边框距节点内容的距离 |
| selectTextOnEnterEditText（v0.7.0+）     | Boolean  | true  | 双击节点进入节点文本编辑时是否默认选中文本，默认只在创建新节点时会选中 |
| deleteNodeActive（v0.7.1+）     | Boolean  | true  | 是否开启删除节点后自动激活节点相邻节点或父节点的功能 |
| autoMoveWhenMouseInEdgeOnDrag（v0.7.1+）     | Boolean  | true  | 拖拽节点时鼠标移动到画布边缘是否开启画布自动移动 |
| fit（v0.7.1-fix.2+）     | Boolean  | false  | 首次渲染时是否缩放至适应画布大小 |
| dragMultiNodeRectConfig（v0.7.2+）     | Object  | { width: 40, height: 20, fill: '' }  | 拖拽多个节点时随鼠标移动的示意矩形的样式配置，传递一个对象，字段含义分别为矩形的宽、高、填充色 |
| dragPlaceholderRectFill（v0.7.2+）     |  String |   | 节点拖拽时新位置的示意矩形的填充颜色，如果不传默认使用连线的颜色 |
| dragOpacityConfig（v0.7.2+）     | Object  | { cloneNodeOpacity: 0.5, beingDragNodeOpacity: 0.3 }  | 节点拖拽时的透明度配置，传递一个对象，字段含义分别为：跟随鼠标移动的克隆节点或矩形的透明度、被拖拽节点的透明度 |
| tagsColorMap（v0.7.2+）     | Object  | {}  | 自定义节点标签的颜色，可传一个对象，key为要指定颜色的标签内容，value为该标签内容的颜色，如果不传内部会根据标签内容生成对应的颜色 |
| cooperateStyle（v0.7.3+）     | Object  | { avatarSize: 22, fontSize: 12 }  | 节点协作编辑时的人员头像样式配置，字段含义分别为：头像大小、如果是文字头像，那么文字的大小 |
| associativeLineIsAlwaysAboveNode（v0.8.0+）     |  Boolean | true  | 关联线是否始终显示在节点上层，如果设为false，那么创建关联线和激活关联线时处于最顶层，其他情况下处于节点下方 |
| defaultGeneralizationText（v0.8.0+）     |  String | 概要  | 插入概要的默认文本 |
| handleIsSplitByWrapOnPasteCreateNewNode（v0.8.0+）     | Function / null | null  | 粘贴文本的方式创建新节点时，控制是否按换行自动分割节点，即如果存在换行，那么会根据换行创建多个节点，否则只会创建一个节点，可以传递一个函数，返回promise，resolve代表根据换行分割，reject代表忽略换行 |
| addHistoryTime（v0.8.0+）     | Number | 100  | 指定时间内只允许添加一次历史记录，避免添加没有必要的中间状态，单位：ms  |
| isDisableDrag（v0.8.1+）     | Boolean | false  | 是否禁止拖动画布  |
| disableTouchZoom（v0.8.1+）     | Boolean | false  | 禁止双指缩放，你仍旧可以使用api进行缩放，对TouchEvent插件生效  |
| highlightNodeBoxStyle（v0.9.0+）     | Object | { stroke: 'rgb(94, 200, 248)', fill: 'transparent' }  | 鼠标移入概要高亮所属节点时的高亮框样式  |
| createNewNodeBehavior（v0.9.1+）     | String | default  | 创建新节点时的行为。default（默认会激活新创建的节点，并且进入编辑模式。如果同时创建了多个新节点，那么只会激活而不会进入编辑模式）、notActive（不激活新创建的节点）、activeOnly（只激活新创建的节点，不进入编辑模式）  |

### 数据结构

基本的数据结构如下：

```js
{
  data: {
    text: '', // 节点的文本，可以是富文本，也就是html格式的，此时richText要设为true
    richText: false, // 节点的文本是否是富文本模式
    expand: true, // 节点是否展开
    uid: '',// 节点唯一的id，可不传，内部会生成
    icon: [], // 图标，格式可参考教程里的【插入和扩展节点图标】章节
    image: '', // 图片的url
    imageTitle: '', // 图片的标题，可为空
    imageSize: { // 图片的尺寸
      width: 100, // 图片的宽度，必传
      height: 100, // 图片的高度，必传
      custom: false // 如果设为true，图片的显示大小不受主题控制，以imageSize.width和imageSize.height为准
    },
    hyperlink: '', // 超链接地址
    hyperlinkTitle: '', // 超链接的标题
    note: '', // 备注的内容
    tag: [], // 标签列表
    generalization: {// 节点的概要，如果没有概要generalization设为null即可
      text: ''// 概要的文本
    },
    associativeLineTargets: [''],// 如果存在关联线，那么为目标节点的uid列表
    associativeLineText: '',// 关联线文本
    // ...其他样式字段，可以参考主题
  },
  children [// 子节点，结构和根节点一致
    {
      data: {},
      children: []
    }
  ]
}
```

如果你要添加自定义的字段，可以添加到`data`、`children`同级，如果你要添加到`data`对象里，那么请使用`_`开头来命名你的自定义字段，内部会通过这个来判断是否是自定义字段。

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

## 实例属性

### el

容器元素。

### opt

配置选项对象。

### svg

> @svgdotjs/svg.js库调用SVG()方法返回的节点实例

画布svg元素。

### draw

> @svgdotjs/svg.js库调用group()方法返回的节点实例
>
> svg节点的子节点

容器元素，用于承载节点、连线等内容。

### lineDraw

> v0.8.0+
>
> @svgdotjs/svg.js库调用group()方法返回的节点实例
>
> draw节点的子节点

节点连线元素的容器。

### nodeDraw

> v0.8.0+
>
> @svgdotjs/svg.js库调用group()方法返回的节点实例
>
> draw节点的子节点

节点元素的容器。

### associativeLineDraw

> v0.8.0+
>
> @svgdotjs/svg.js库调用group()方法返回的节点实例
>
> 在注册了关联线插件的情况下可用
>
> draw节点的子节点

关联线内容的容器。

### otherDraw

> v0.8.0+
>
> @svgdotjs/svg.js库调用group()方法返回的节点实例
>
> draw节点的子节点

其他内容的容器。

### elRect

容器元素`el`的尺寸、位置信息。调用`getBoundingClientRect()`方法的返回结果。

### width

容器元素`el`的宽度。

### height

容器元素`el`的高度。

### themeConfig

当前主题配置。

## 实例方法

### clearDraw()

> v0.8.0+

清空`lineDraw`、`associativeLineDraw`、`nodeDraw`、`otherDraw`容器。

### destroy()

> v0.6.0+

销毁思维导图。会移除注册的插件、移除监听的事件、删除画布的所有节点。

### getSvgData({ paddingX = 0, paddingY = 0, ignoreWatermark = false })

> v0.3.0+

`paddingX`：水平内边距

`paddingY`：垂直内边距

`ignoreWatermark`：v0.8.0+，不要绘制水印，如果不需要绘制水印的场景可以传`true`，因为绘制水印非常慢

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
| node_img_mouseenter（v0.6.5+）    |  节点内图片的鼠标移入事件                      | this（节点实例）、imgNode（图片节点）、e（事件对象）                              |
| node_img_mouseleave（v0.6.5+）    |  节点内图片的鼠标移出事件                      | this（节点实例）、imgNode（图片节点）、e（事件对象）                              |
| node_img_mousemove（v0.6.5+）    |  节点内图片的鼠标移动事件                      | this（节点实例）、imgNode（图片节点）、e（事件对象）                              |
| node_tree_render_end（v0.2.16+） | 节点树渲染完毕事件                         |                                                              |
| rich_text_selection_change（v0.4.0+）         |  当注册了`RichText`插件时可用。当节点编辑时，文本选区发生改变时触发         |  hasRange（是否存在选区）、rectInfo（选区的尺寸和位置信息）、formatInfo（选区的文本格式化信息）            |
| transforming-dom-to-images（v0.4.0+）         |  当注册了`RichText`插件时可用。当`svg`中存在`DOM`节点时，导出为图片时会将`DOM`节点转换为图片，转换过程中会触发该事件，可用通过该事件给用户提示，告知目前转换到的节点         |  index（当前转换到的节点索引）、len（一共需要转换的节点数量）            |
| node_dragging（v0.4.5+）    | 当某个节点被拖拽时触发   |  node（当前被拖拽的节点）           |
| node_dragend（v0.4.5+）    | 节点被拖拽结束时触发   |  { overlapNodeUid, prevNodeUid, nextNodeUid }（v0.6.12+，本次节点移动到的节点uid，比如本次移动到了节点A上，那么overlapNodeUid就是节点A的uid，如果移动到了B节点的前面，那么nextNodeUid就是节点B的uid，你可以通过mindMap.renderer.findNodeByUid(uid)方法来获取节点实例）           |
| associative_line_click（v0.4.5+）    |  点击某条关联线时触发  |  path（连接线节点）、clickPath（不可见的点击线节点）、node（起始节点）、toNode（目标节点）           |
| svg_mouseenter（v0.5.1+）    | 鼠标移入svg画布时触发   | e（事件对象）  |
| svg_mouseleave（v0.5.1+）    | 鼠标移出svg画布时触发   | e（事件对象）  |
| node_icon_click（v0.6.10+）    | 点击节点内的图标时触发   | this（节点实例）、item（点击的图标名称）、e（事件对象）  |
| view_theme_change（v0.6.12+）    | 调用了setTheme方法设置主题后触发   | theme（设置的新主题名称）  |
| set_data（v0.7.3+）    | 调用了setData方法动态设置思维导图数据时触发   | data（新的思维导图数据）  |
| resize（v0.8.0+）    |  容器尺寸改变后触发，实际上是当思维导图实例的`resize`方法被调用后触发  |   |
| beforeDestroy（v0.9.0+）    |  思维导图销毁前触发，即调用了destroy方法触发  |   |

### emit(event, ...args)

触发事件，可以是上面表格里的事件，也可以是自定义事件

### off(event, fn)

解绑事件

### setTheme(theme, notRender = false)

- `notRender`：v0.8.0+，是否不要调用render方法更新画布。

切换主题，可选主题见上面的选项表格

### getTheme()

获取当前主题

### setThemeConfig(config, notRender = false)

- `notRender`：v0.8.0+，是否不要调用render方法更新画布。

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

### setLayout(layout, notRender = false)

- `notRender`：v0.8.0+，是否不要调用render方法更新画布。

设置布局结构，可选值见上面选项表格的`layout`字段

### execCommand(name, ...args)

执行命令，每执行一个命令就会在历史堆栈里添加一条记录用于回退或前进。所有命令如下：

| 命令名称                            | 描述                                                         | 参数                                                         |
| ----------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| SELECT_ALL                          | 全选                                                         |                                                              |
| BACK                                | 回退指定的步数                                               | step（要回退的步数，默认为1）                                |
| FORWARD                             | 前进指定的步数                                               | step（要前进的步数，默认为1）                                |
| INSERT_NODE                         | 插入同级节点，操作节点为当前激活的节点或指定节点，如果有多个激活节点，只会对第一个有效（v0.7.2+支持对多个激活节点同时插入兄弟节点） | openEdit（v0.4.6+，是否激活新插入的节点并进入编辑模式，默认为`true`）、 appointNodes（v0.4.7+，可选，指定要插入兄弟节点的节点，指定多个节点可以传一个数组）、 appointData（可选，指定新创建节点的数据，比如{text: 'xxx', ...}，详细结构可以参考[exampleData.js](https://github.com/wanglin2/mind-map/blob/main/simple-mind-map/example/exampleData.js)）、 appointChildren（v0.6.14+，可选，指定新创建节点的子节点，数组类型）     |
| INSERT_CHILD_NODE                   | 插入子节点，操作节点为当前激活的节点或指定节点                         |   openEdit（v0.4.6+，是否激活新插入的节点并进入编辑模式，默认为`true`）、 appointNodes（v0.4.7+，可选，指定节点，指定多个节点可以传一个数组）、 appointData（可选，指定新创建节点的数据，比如{text: 'xxx', ...}，详细结构可以参考[exampleData.js](https://github.com/wanglin2/mind-map/blob/main/simple-mind-map/example/exampleData.js)）、 appointChildren（v0.6.14+，可选，指定新创建节点的子节点，数组类型）                                                          |
| UP_NODE                             | 上移节点，操作节点为当前激活的节点，如果有多个激活节点，只会对第一个有效，对根节点或在列表里的第一个节点使用无效 |                                                              |
| DOWN_NODE                           | 操作节点为当前激活的节点，如果有多个激活节点，只会对第一个有效，对根节点或在列表里的最后一个节点使用无效 |                                                              |
| REMOVE_NODE                         | 删除节点，操作节点为当前激活的节点或指定节点                         |   appointNodes（v0.4.7+，可选，指定节点，指定多个节点可以传一个数组）                                                           |
| PASTE_NODE                          | 粘贴节点到节点，操作节点为当前激活的节点                     | data（要粘贴的节点数据，一般通过`renderer.copyNode()`方法和`renderer.cutNode()`方法获取） |
| CUT_NODE                            | 剪切节点，操作节点为当前激活的节点，如果有多个激活节点，只会对第一个有效，对根节点使用无效 | callback(回调函数，剪切的节点数据会通过调用该函数并通过参数返回) |
| SET_NODE_STYLE                      | 修改节点单个样式                                                 | node（要设置样式的节点）、style（样式属性）、value（样式属性值）、isActive（v0.7.0+已废弃，布尔值，是否设置的是激活状态的样式） |
| SET_NODE_STYLEs（v0.6.12+）                      | 修改节点多个样式                                                 | node（要设置样式的节点）、style（样式对象，key为样式属性，value为样式值）、isActive（v0.7.0+已废弃，布尔值，是否设置的是激活状态的样式） |
| SET_NODE_ACTIVE                     | 设置节点是否激活                                             | node（要设置的节点）、active（布尔值，是否激活）             |
| CLEAR_ACTIVE_NODE                   | 清除当前已激活节点的激活状态，操作节点为当前激活的节点       |                                                              |
| SET_NODE_EXPAND                     | 设置节点是否展开                                             | node（要设置的节点）、expand（布尔值，是否展开）             |
| EXPAND_ALL                          | 展开所有节点                                                 |                                                              |
| UNEXPAND_ALL                        | 收起所有节点                                                 |                                                              |
| UNEXPAND_TO_LEVEL（v0.2.8+）        | 展开到指定层级                                               | level（要展开到的层级，1、2、3...）                          |
| SET_NODE_DATA                       | 更新节点数据，即更新节点数据对象里`data`对象的数据           | node（要设置的节点）、data（对象，要更新的数据，如`{expand: true}`） |
| SET_NODE_TEXT                       | 设置节点文本                                                 | node（要设置的节点）、text（要设置的文本字符串，换行可以使用`\n`）、richText（v0.4.0+，如果要设置的是富文本字符，需要设为`true`）、resetRichText（v0.6.10+是否要复位富文本，默认为false，如果传true那么会重置富文本节点的样式） |
| SET_NODE_IMAGE                      | 设置节点图片                                                 | node（要设置的节点）、imgData（对象，图片信息，结构为：`{url, title, width, height}`，图片的宽高必须要传） |
| SET_NODE_ICON                       | 设置节点图标                                                 | node（要设置的节点）、icons（数组，预定义的图片名称组成的数组，可用图标可在[icons.js](https://github.com/wanglin2/mind-map/blob/main/simple-mind-map/src/svg/icons.js)文件里的`nodeIconList`列表里获取到，图标名称为`type_name`，如`['priority_1']`） |
| SET_NODE_HYPERLINK                  | 设置节点超链接                                               | node（要设置的节点）、link（超链接地址）、title（超链接名称，可选） |
| SET_NODE_NOTE                       | 设置节点备注                                                 | node（要设置的节点）、note（备注文字）                       |
| SET_NODE_TAG                        | 设置节点标签                                                 | node（要设置的节点）、tag（字符串数组，内置颜色信息可在[constant.js](https://github.com/wanglin2/mind-map/blob/main/simple-mind-map/src/constants/constant.js)里获取到） |
| INSERT_AFTER（v0.1.5+）             | 将节点移动到另一个节点的后面    | node（要移动的节点，（v0.7.2+支持传递节点数组实现同时移动多个节点））、 exist（目标节点）                     |
| INSERT_BEFORE（v0.1.5+）            | 将节点移动到另一个节点的前面，（v0.7.2+支持传递节点数组实现同时移动多个节点）   | node（要移动的节点）、 exist（目标节点）                     |
| MOVE_NODE_TO（v0.1.5+）             | 移动节点作为另一个节点的子节点，（v0.7.2+支持传递节点数组实现同时移动多个节点）   | node（要移动的节点）、 toNode（目标节点）                    |
| ADD_GENERALIZATION（v0.2.0+）       | 添加节点概要                                                 | data（概要的数据，对象格式，节点的数字段都支持，默认为{text: '概要'}） |
| REMOVE_GENERALIZATION（v0.2.0+）    | 删除节点概要                                                 |                                                              |
| SET_NODE_CUSTOM_POSITION（v0.2.0+） | 设置节点自定义位置                                           | node（要设置的节点）、 left（自定义的x坐标，默认为undefined）、 top（自定义的y坐标，默认为undefined） |
| RESET_LAYOUT（v0.2.0+）             | 一键整理布局                                                 |                                                              |
| SET_NODE_SHAPE（v0.2.4+）           | 设置节点形状                                                 | node（要设置的节点）、shape（形状，全部形状：[Shape.js](https://github.com/wanglin2/mind-map/blob/main/simple-mind-map/src/core/render/node/Shape.js)） |
| GO_TARGET_NODE（v0.6.7+）           |  定位到某个节点，如果该节点被收起，那么会自动展开到该节点   | node（要定位到的节点实例或节点uid）、callback（v0.6.9+，定位完成后的回调函数） |
| INSERT_MULTI_NODE（v0.7.2+）           |  给指定的节点同时插入多个同级节点，操作节点为当前激活的节点或指定节点   | appointNodes（可选，指定节点，指定多个节点可以传一个数组）, nodeList（新插入节点的数据列表，数组类型） |
| INSERT_MULTI_CHILD_NODE（v0.7.2+）           |  给指定的节点同时插入多个子节点，操作节点为当前激活的节点或指定节点   | appointNodes（可选，指定节点，指定多个节点可以传一个数组）, childList（新插入节点的数据列表，数组类型） |
| INSERT_FORMULA（v0.7.2+）           |  给节点插入数学公式，操作节点为当前激活的节点或指定节点   | formula（要插入的数学公式，LaTeX 语法）, appointNodes（可选，指定要插入公式的节点，多个节点可以传数组，否则默认为当前激活的节点） |
| INSERT_PARENT_NODE（v0.8.0+）           |  给指定的节点插入父节点，操作节点为当前激活的节点或指定节点   | openEdit（是否激活新插入的节点并进入编辑模式，默认为`true`）、 appointNodes（可选，指定要插入父节点的节点，指定多个节点可以传一个数组）、 appointData（可选，指定新创建节点的数据，比如{text: 'xxx', ...}，详细结构可以参考[exampleData.js](https://github.com/wanglin2/mind-map/blob/main/simple-mind-map/example/exampleData.js)） |
| REMOVE_CURRENT_NODE（v0.8.0+）           |   仅删除当前节点，操作节点为当前激活的节点或指定节点   | appointNodes（可选，指定要删除的节点，指定多个节点可以传一个数组） |

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
