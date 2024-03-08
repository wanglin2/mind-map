# TextEdit 实例

节点文本编辑实例。可以通过`mindMap.renderer.textEdit`获取到。

## 方法

### isShowTextEdit()

获取当前文本编辑框是否处于显示状态，也就是是否处在文本编辑状态。

### hideEditTextBox()

隐藏文本编辑框，会将当前文本编辑框中的内容设置为节点文本。

### registerTmpShortcut()

注册临时快捷键，也就是可以通过 Enter 键和 Tab 键完成编辑。

### show({ node})

- `node`：要进入编辑的节点实例

手动开启节点编辑。默认会在节点双击、按 F2 时进入节点编辑。

### getCurrentEditNode()

> v0.9.8+

获取当前正在编辑中的节点实例。