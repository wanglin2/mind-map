# 基本使用

> 重要说明：
>
> 1.本教程中的在线编辑器中使用的是完整版的simple-mind-map，即包含所有插件，如果你是通过`npm`方式使用的话，需要自己手动注册相关插件。
>
> 2.本教程的代码示例基于Vue3.x，但是您不必担心，因为simple-mind-map本身是框架无关的，所以即使某些Vue3的语法您看不懂也不会影响对于逻辑的理解。

`simple-mind-map`的使用非常简单，提供一个宽高不为0的元素，然后创建一个实例即可：

<iframe style="width: 100%; height: 455px; border: none;" src="https://wanglin2.github.io/playground/#eNptUktu2zAQvcqARWG7sCUV6EqVjX7QRRc+QacLVZzYLKQRQdJxAkObLHuKXiMXanOMDEXZCJIIECS+mff4+Dgn9dna7PpAqlSVb5yxATyFg90gm872LsAJHF0toedtf+BAGga4cn0HM2HNLl1bw3pb21RC5QVuadUJuupqiwoZ+SIxny9gvYETMkDTsw8QGyN9DUzHs9h8bACgtgTdN4eOOGQ7Ct9air9fbr/r+Wxifu051IbJzRbLxNJ1qMu0R3xQRQDVEyjBgW5ChFH9+3v/8Ofu/919tJvKwyQWG5u9abUjjs0/fiZ8iJ9h8RF5WCBXeYpQwpNFIMmgDiQrgEqbazB6jeq5YVSbKpeqtFX5E44sfbhtE/3TFDOqLE/ZThll5Lus8R6VeBCX8r55vsP5xEejw76E90XxdmwG2JPZ7UMJH4rC3oyYHOh1jXdnla52O8MlFJOGrbU2vDsDIiAxjMbVUiXbcQSy375nmbJRBaeC2L7cByoZqHQRWS6/mZNZMR3FE65+uf7oyYkIqulKXhmyxH2ZT2RN3gY1PAJQKfo9" />

注意，我们还给容器元素设置了样式：

```css
#mindMapContainer * {
    margin: 0;
    padding: 0;
}
```

这是为了避免节点内的文字因为默认样式而出现偏移。

一个节点的基本数据结构如下所示：

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
    attachmentUrl: '',// v0.9.10+，附件url
    attachmentName: '',// v0.9.10+，附件名称
    tag: [], // 标签列表
    generalization: [{// （0.9.0以下版本不支持数组，只能设置单个概要数据）节点的概要，如果没有概要generalization设为null即可
      text: '', // 概要的文本
      richText: false, // 节点的文本是否是富文本模式
      // ...其他普通节点的字段都支持，但是不支持children
    }],
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

`icon`可以使用内置的图标，完整图标可以在[icons.js](https://github.com/wanglin2/mind-map/blob/main/simple-mind-map/src/svg/icons.js)文件中查看。也可以扩展图标，参考[扩展图标](https://wanglin2.github.io/mind-map/#/doc/zh/course19/%E6%89%A9%E5%B1%95%E5%9B%BE%E6%A0%87)。

创建实例时还支持传递其他很多选项参数，完整选项列表可以在[实例化选项](https://wanglin2.github.io/mind-map/#/doc/zh/constructor/%E5%AE%9E%E4%BE%8B%E5%8C%96%E9%80%89%E9%A1%B9)查看。

这样得到的思维导图可以通过鼠标和快捷键进行操作，比如单击某个节点可以激活它，双击某个节点可以编辑节点文本，按下`Tab`键会给当前激活的节点添加一个子节点，按下`Enter`键会给当前激活的节点添加一个兄弟节点等等，完整的快捷键列表可以参考[快捷键列表](https://github.com/wanglin2/mind-map/blob/main/web/src/config/zh.js#L246)。

当然有些功能还是需要UI界面的，比如图标列表、编辑超链接等等，需要注意的是`simple-mind-map`库并不包含UI界面，所以需要你自己开发，然后通过`simple-mind-map`提供的相关API来操作，本教程的其他章节会向你介绍如何使用。