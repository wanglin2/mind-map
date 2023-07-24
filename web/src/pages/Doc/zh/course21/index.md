# 如何复制、剪切、粘贴

## 使用快捷键

核心库内部默认支持`Ctrl+c`、`Ctrl+x`、`Ctrl+v`三个快捷键来执行复制、剪切、粘贴操作。

当激活了某个节点，按`Ctrl+c`会复制当前激活节点的数据，按`Ctrl+x`会删除当前激活节点，同时保存该节点的数据，这两个操作当同时存在多个激活节点，只会对第一个生效。

当按了`Ctrl+c`或`Ctrl+x`后，按`Ctrl+v`会在当前激活的节点粘贴复制或剪切的数据，也就是被复制或剪切的节点会作为该节点的子节点。

除了支持粘贴在画布中复制或剪切的节点数据外，如果你再其他地方复制了文本或图片，也支持进行粘贴，也就是会粘贴你当前剪贴板中的数据，如果你的剪切板中存在文本数据，那么会粘贴作为当前激活节点的子节点，如果存在图片数据，那么会直接给当前激活节点添加或替换图片。

如果复制或剪切了画布数据，同时剪切板中也存在数据，那么默认会以最新的`Ctrl+c`或`Ctrl+x`操作为准，比如你先复制了节点，然后又复制了其他地方的文本，那么会粘贴最后一次的操作，也就是其他地方复制的文本数据。

## 使用按钮触发

一般会在右键菜单上下文中显然复制、剪切、粘贴三个按钮，当点击了这三个按钮也需要能执行复制、剪切、粘贴操作，这需要调用内部的一些方法来完成：

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

需要注意的是，这三个方法只能复制、剪切、粘贴画布中的节点数据，不支持操作用户的剪切板数据。

### 完整示例

<iframe style="width: 100%; height: 455px; border: none;" src="https://wanglin2.github.io/playground/#eNrFVc1OGzEQfpWRqypJFXaD1FMaEIX20AMV4lpz2Ow6ianXXq29BIRy4VCgopeeeuyhUqUeeqhQJejrEKBv0fH+k0RVbkSKtJ75vm/Gnhn7mLyMIucgYaRLetqPeWRAM5NE61TyMFKxgWOI2aANSm6rRBoWtEGPPCHUeJcNYAKDWIXQQIVGydjmMtj2osxFiUazYCshWldCL6KESgAqBTNgbRa5BjIRgkoqXRfuTq6mp39urj9Mv32anv2+vTj/+/knlb6S2mAaWyo62jRyS3D/PRKbLVhbh2OrCYWeEzMZsJjFjo/gZovKyZz2+Y/p2emcdmKWl07MQuW7X1/uLy9nlXc8bdjS2pFFl+rl0TdrrNrRsXFx5M1ckIkuBMpPQiaNM2TmtWD2c/PoTdBs5MwtJY3HJYsbrXbGCjzjdYucsETEGiipmTKzYYfGmim5/Xp1//EEt54V1f4muZgF+iMuAtyUBb+rNGbkFkaZjXRzfXF3/X022MOAC4LuVb467pEyKD5zW8HjkptdpcxbFbAdpbnhSiKzIdjANNrQ8LF0WKa9FD5pvcC2wNboudm84qTiwjAcMs8wXAH0An4AvvC0XqMkL/crFipKUncO4EHlLZsBIT0XvXVgoWSUEn3PQoqN9PqJMUrChm/bGiEPxxOR2Qz33Az4X2I1e5aXzucyvAeThcxs/maY1Z6Kr55bOzJcanMkstPbyK8xShw3u7vy6XKYDh1fa0qwBPYKA3Bqp1u0z5gHZtSF1U7naYoDiMqixgwj8gOWOtJ+sP8ns1UopCqi19dKJCYjAtjW6EInXxkVVYv58CPGhyOEP+90osMi8uK4z8oryYuHHOMWqpEXBFwOC0OZupM3xZIZrxYZ5EmXaxTEhk5rQNokq4B9LZx9rSQ+Tqk8zR1YgXJYKcG3J5tQx8VPJ8arkofMFmulH6uxxvt0Hxn5sC14jzLufKktK89tQib/AMXMadM=" />