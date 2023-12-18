# 如何复制、剪切、粘贴

## 使用按钮触发

一个常规的思维导图一般会实现一个右键菜单，右键菜单中会提供复制、剪切、粘贴三个按钮，当点击了这三个按钮需要能执行复制、剪切、粘贴操作，这需要调用内部的一些方法来完成：

```js
// 点击了复制按钮
const onCopyBtnClick = () => {
    mindMap.renderer.copy()
}

// 点击了剪切按钮
const onCutBtnClick = () => {
    mindMap.renderer.cut()
}

// 点击了粘贴按钮
const onPasteBtnClick = () => {
    mindMap.renderer.paste()
}
```

`copy`和`cut`方法会保存你当前激活的节点数据用于粘贴，如果浏览器及协议（https）支持`js`操作剪贴板数据，那么复制或剪切的节点数据也会同时添加到用户的剪贴板中，在其他地方也可以进行粘贴。

`paste`方法会执行粘贴操作，如果浏览器及协议（https）支持`js`操作剪贴板数据，那么其他地方复制的数据也可以进行粘贴，比如你可以进行跨浏览器粘贴`simple-mind-map`节点，如果是非`simple-mind-map`节点数据，那么会提取出剪切板中的文本和图片进行粘贴，文本默认会粘贴为子节点，图片默认会添加到当前的节点中。

如果浏览器或协议（https）不支持`js`操作剪贴板数据，那么`copy`和`cut`方法复制和剪切的数据只会保存在当前页面的内存中，无法在其他地方粘贴。

如果复制或剪切了画布数据，同时剪切板中也存在数据，那么默认会以最新的`Ctrl+c`或`Ctrl+x`操作为准，比如你先复制了节点，然后又复制了其他地方的文本，那么会粘贴最后一次的操作，也就是其他地方复制的文本数据。

## 使用快捷键

核心库内部默认支持`Ctrl+c`、`Ctrl+x`、`Ctrl+v`三个快捷键来执行复制、剪切、粘贴操作。

当激活了某个节点，按`Ctrl+c`会复制当前激活节点的数据，按`Ctrl+x`会删除当前激活节点，同时保存该节点的数据供粘贴。

当按了`Ctrl+c`或`Ctrl+x`后，按`Ctrl+v`会在当前激活的节点粘贴复制或剪切的数据。

这三个快捷键内部调用的其实就是前面的`copy`、`cut`、`paste`方法。

### 完整示例

<iframe style="width: 100%; height: 455px; border: none;" src="https://wanglin2.github.io/playground/#eNrFVc1OGzEQfpWRqypJFXaD1FMaEIX20AMV4lpz2Ow6ianXXq29BIRy4VCgopeeeuyhUqUeeqhQJejrEKBv0fH+k0RVbkSKtJ75vm/Gnhn7mLyMIucgYaRLetqPeWRAM5NE61TyMFKxgWOI2aANSm6rRBoWtEGPPCHUeJcNYAKDWIXQQIVGydjmMtj2osxFiUazYCshWldCL6KESgAqBTNgbRa5BjIRgkoqXRfuTq6mp39urj9Mv32anv2+vTj/+/knlb6S2mAaWyo62jRyS3D/PRKbLVhbh2OrCYWeEzMZsJjFjo/gZovKyZz2+Y/p2emcdmKWl07MQuW7X1/uLy9nlXc8bdjS2pFFl+rl0TdrrNrRsXFx5M1ckIkuBMpPQiaNM2TmtWD2c/PoTdBs5MwtJY3HJYsbrXbGCjzjdYucsETEGiipmTKzYYfGmim5/Xp1//EEt54V1f4muZgF+iMuAtyUBb+rNGbkFkaZjXRzfXF3/X022MOAC4LuVb467pEyKD5zW8HjkptdpcxbFbAdpbnhSiKzIdjANNrQ8LF0WKa9FD5pvcC2wNboudm84qTiwjAcMs8wXAH0An4AvvC0XqMkL/crFipKUncO4EHlLZsBIT0XvXVgoWSUEn3PQoqN9PqJMUrChm/bGiEPxxOR2Qz33Az4X2I1e5aXzucyvAeThcxs/maY1Z6Kr55bOzJcanMkstPbyK8xShw3u7vy6XKYDh1fa0qwBPYKA3Bqp1u0z5gHZtSF1U7naYoDiMqixgwj8gOWOtJ+sP8ns1UopCqi19dKJCYjAtjW6EInXxkVVYv58CPGhyOEP+90osMi8uK4z8oryYuHHOMWqpEXBFwOC0OZupM3xZIZrxYZ5EmXaxTEhk5rQNokq4B9LZx9rSQ+Tqk8zR1YgXJYKcG3J5tQx8VPJ8arkofMFmulH6uxxvt0Hxn5sC14jzLufKktK89tQib/AMXMadM=" />