# 插入和扩展节点图标

## 插入图标

`simple-mind-map`内置了一些图标：

<img src="../../../../assets/img/docs/iconList.jpg" />

你可以通过如下方式获取：

```js
import { nodeIconList } from 'simple-mind-map/src/svg/icons'
```

如果你使用的是`umd`格式的文件，可以通过如下方式获取（v0.5.8+）：

```js
simpleMindMap.iconList
```

结构如下：

```js
[
  {
    name: '优先级图标',
    type: 'priority',
    list: [
      {
        name: '1',
        icon: `<svg viewBox="0 0 1024 1024"><path d="M512.042667 1024C229.248 1024 0 794.794667 0 511.957333 0 229.205333 229.248 0 512.042667 0 794.752 0 1024 229.205333 1024 511.957333 1024 794.794667 794.752 1024 512.042667 1024z" fill="#E93B30"></path><path d="M580.309333 256h-75.52c-10.666667 29.824-30.165333 55.765333-58.709333 78.165333-28.416 22.314667-54.869333 37.418667-79.146667 45.397334v84.608a320 320 0 0 0 120.234667-70.698667v352.085333H580.266667V256z" fill="#FFFFFF"></path></svg>`
      }
    ]
  }
]
```

你可以通过UI界面展示出来，要给一个节点设置图标，可以使用`node.setIcon([])`方法，要获取节点当前的图标，可以使用`node.getData('icon')`方法。

一个图标由`type_name`构成，比如前面的图标要插入节点，那么图标的值为`priority_1`。

通常一个分组的图标只允许插入一个，所以存在一个替换的逻辑，完整示例如下：

<iframe style="width: 100%; height: 455px; border: none;" src="https://wanglin2.github.io/playground/#eNrFVltvG0UU/ivDIrRrcNZ2xZOxowLtQySCUF+9UbTZHdtDd2dWO7NJrNRSqYooVSpQkVBLkAjQFIRU9ZFeBP0zsWP+Befs7M0bV2qe+mBr51y+78y5zMyB8XEU2bsJNbpGT3oxixSRVCXRusNZGIlYkQMS02GTCL4pEq6o3yRy7AaB2LtGh2RKhrEIiQkIZuGxybi/6UZa5RgSxAFdC0G6FrqRYzicEIcHVBGUoWWf8CQIHO5wT3CpiOsptks/Fz6VoCv5rMFWQ3t6SRxTrjbA/jMGHn0y2Cr9YQuoAamlJhFtEu6GtEH66+QAyRHgOp2AGrXkA2Jum/CPRqhutcj895vzX05m//ww+/be4u6ts1vP5w+ezr5/PHvyYPbzn4unJ7Ojf+fH3+RgsA26D3C1qOwhKDZQZzFFw4KfQEpVEnOipf0+RoOKKewu5dc8szsPZ3eO/3v4iAEgatiQWJrrHXBa6zRyvDqxjALmUW3bJJ0UdkpoIGnugSSwH2R4NP/xid6q3lW21fuHi8dfzb+7P/v65Oyn24Xq9NnN02d/nb28DUINhRnARKY7vUgWlvKQxqwsKEVj0N5Ks4Kg2lInRpdmOQTYweLV0eLXw/nRq/m937QZ5qmMqJar12ar8ICMNbEkGely4iqpm//9cnb3OC/OKuQokWOrgpTWAf8qHW7vukFC7aGIr7re2OIgq+QIl3bWz9bAtu0aBQ6Ezg/gOrwYU8sq+70yZnQvH08rI6BBl/jCS0IAtUdUXQ0ofn4y2fAtM/P8VHDlMk5js9HUXr6r3G6ZEsdAgWNURFqs6L5CsWPMj5/rSdIHQJqODAwNvTELfNgYGg9KjBrcSpY60+mLw7MXf9TJlglXkML5scruLUWQf2ay3I9xpq4JobBzvhCSKSY4eJoBHSqzSUwPSgdl2krNp42P9FlbtIANTWRiS23rBgQXC3rKjUeybJcV3QmtgzaDThYODtj5Fg4oH6kxWSftyrDh6TBksUxDRpy6G0z7a8YHrAtPbM0rkHvLxHkzG+TGjSJh9QFdfTmUA4jDAr9eS994cNfBAo6gKHAVhRUhPZ/tEi9wpew7Rpa7KzQUjpGqMwPml9piRMCk1wJt1TBHUkIEOy6a5KH2dhKl4Ka67MERdB1M8lE3o5iJmKkJVrVjNsAnl2x3ei3tdkGYS8swly4EI0YxlbIajZZcMJoSJo8mg6lHUyYx/+q1KjWCpVSTQJfrcvbycAy7pZ8b2SFnUxnanpSOUUyCXSln3jJ7zFfjLum02++ldoRExWzFFBihY1NF2j/4e7de9hyqdHR3pAgSpR1xDoaqS9rZSomoXJynH1M2GoP5h+12tJ8zr+Z9P2cOYUIZ8Oaokev7jI9yQRG6nXXhG0bcySPIgi7WAAgTlNbAaBq6AvjAs7+UgsN7MoV3MgVUoDgzHQOei/qgtFvwacdwY7GQYrHWdmKxJ2kMII6RnXkrnpDa93yp0SuLbWpM/wfhELfG" />

## 扩展图标

> v0.5.8+

除了使用内置的图标外，你也可以扩展图标，实例化`simple-mind-map`时传入你要扩展的图标列表即可：

```js
new MindMap({
  // ...
  iconList: [
    {
      name: '',// 分组名称
      type: '',// 分组的值
      list: [// 分组下的图标列表
        {
          name: '',// 图标名称
          icon:''// 图标，可以传svg或图片
        }
      ]
    }
  ]
})
```

然后和插入内置图标一样，通过`setIcon`方法插入图标的`key`即可。

完整示例：

<iframe style="width: 100%; height: 455px; border: none;" src="https://wanglin2.github.io/playground/#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" />