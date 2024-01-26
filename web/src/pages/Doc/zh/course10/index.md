# 主题

## 主题配置属性一览

此处的配置可能未及时更新，完整的主题配置可以参考：[default.js](https://github.com/wanglin2/mind-map/blob/main/simple-mind-map/src/themes/default.js)。

如果某个属性的值你不知道如何传，可以去在线demo中设置一下，然后导出json或smm文件查看对应的值。也可以参考demo项目中的配置[zh.js](https://github.com/wanglin2/mind-map/blob/main/web/src/config/zh.js)。

```js
{
  // 节点内边距
  paddingX: 15,
  paddingY: 5,
  // 图片显示的最大宽度
  imgMaxWidth: 100,
  // 图片显示的最大高度
  imgMaxHeight: 100,
  // icon的大小
  iconSize: 20,
  // 连线的粗细
  lineWidth: 1,
  // 连线的颜色
  lineColor: '#549688',
  // 连线样式
  lineDasharray: 'none',
  // 连线风格，支持三种
  // 1.曲线（curve）。仅logicalStructure、mindMap、verticalTimeline三种结构支持。
  // 2.直线（straight）。
  // 3.直连（direct）。仅logicalStructure、mindMap、organizationStructure、verticalTimeline四种结构支持。
  lineStyle: 'straight', 
  // 曲线连接时，根节点和其他节点的连接线样式保持统一，默认根节点为 ( 型，其他节点为 { 型，设为true后，都为 { 型。仅logicalStructure、mindMap两种结构支持。
  rootLineKeepSameInCurve: true,
  // 直线连接(straight)时，连线的圆角大小，设置为0代表没有圆角，仅支持logicalStructure、mindMap、verticalTimeline三种结构
  lineRadius: 5,
  // 连线尾部是否显示标记，目前只支持箭头
  showLineMarker: false,
  // 概要连线的粗细
  generalizationLineWidth: 1,
  // 概要连线的颜色
  generalizationLineColor: '#549688',
  // 概要曲线距节点的距离
  generalizationLineMargin: 0,
  // 概要节点距节点的距离
  generalizationNodeMargin: 20,
  // 关联线默认状态的粗细
  associativeLineWidth: 2,
  // 关联线默认状态的颜色
  associativeLineColor: 'rgb(51, 51, 51)',
  // 关联线激活状态的粗细
  associativeLineActiveWidth: 8,
  // 关联线激活状态的颜色
  associativeLineActiveColor: 'rgba(2, 167, 240, 1)',
  // 关联线文字颜色
  associativeLineTextColor: 'rgb(51, 51, 51)',
  // 关联线文字大小
  associativeLineTextFontSize: 14,
  // 关联线文字行高
  associativeLineTextLineHeight: 1.2,
  // 关联线文字字体
  associativeLineTextFontFamily: '微软雅黑, Microsoft YaHei',
  // 背景颜色
  backgroundColor: '#fafafa',
  // 背景图片
  backgroundImage: 'none',
  // 背景重复
  backgroundRepeat: 'no-repeat',
  // 设置背景图像的起始位置
  backgroundPosition: 'center center',
  // 设置背景图片大小
  backgroundSize: 'cover',
  // 节点使用只有底边横线的样式，仅logicalStructure、mindMap、catalogOrganization、organizationStructure四种结构支持。
  nodeUseLineStyle: false,
  // 根节点样式
  root: {
    // 形状
    shape: 'rectangle',
    // 背景颜色
    fillColor: '#549688',
    fontFamily: '微软雅黑, Microsoft YaHei',
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    fontStyle: 'normal',
    lineHeight: 1.5,
    borderColor: 'transparent',
    borderWidth: 0,
    borderDasharray: 'none',
    borderRadius: 5,
    textDecoration: 'none',
    // 是否使用渐变背景，如果设为true，则会忽略fillColor配置
    gradientStyle: false,
    // 如果gradientStyle为true，那么可以通过这两个字段来定义渐变的起止颜色
    startColor: '#549688',
    endColor: '#fff'
  },
  // 二级节点样式
  second: {
    shape: 'rectangle',
    // 外边距
    marginX: 100,
    marginY: 40,
    fillColor: '#fff',
    fontFamily: '微软雅黑, Microsoft YaHei',
    color: '#565656',
    fontSize: 16,
    fontWeight: 'noraml',
    fontStyle: 'normal',
    lineHeight: 1.5,
    borderColor: '#549688',
    borderWidth: 1,
    borderDasharray: 'none',
    borderRadius: 5,
    textDecoration: 'none',
    gradientStyle: false,
    startColor: '#549688',
    endColor: '#fff'
  },
  // 三级及以下节点样式
  node: {
    shape: 'rectangle',
    marginX: 50,
    marginY: 0,
    fillColor: 'transparent',
    fontFamily: '微软雅黑, Microsoft YaHei',
    color: '#6a6d6c',
    fontSize: 14,
    fontWeight: 'noraml',
    fontStyle: 'normal',
    lineHeight: 1.5,
    borderColor: 'transparent',
    borderWidth: 0,
    borderRadius: 5,
    borderDasharray: 'none',
    textDecoration: 'none',
    gradientStyle: false,
    startColor: '#549688',
    endColor: '#fff'
  },
  // 概要节点样式
  generalization: {
    shape: 'rectangle',
    marginX: 100,
    marginY: 40,
    fillColor: '#fff',
    fontFamily: '微软雅黑, Microsoft YaHei',
    color: '#565656',
    fontSize: 16,
    fontWeight: 'noraml',
    fontStyle: 'normal',
    lineHeight: 1.5,
    borderColor: '#549688',
    borderWidth: 1,
    borderDasharray: 'none',
    borderRadius: 5,
    textDecoration: 'none',
    gradientStyle: false,
    startColor: '#549688',
    endColor: '#fff'
  }
}
```

## 使用和切换主题

`simple-mind-map`内置了很多主题，可以通过如下方式获取到所有的内置主题列表：

```js
import { themeList } from 'simple-mind-map/src/constants/constant'
// import { themeList } from 'simple-mind-map/src/utils/constant' v0.6.0以下版本使用该路径
```

> v0.6.8+，主题列表增加了代表是否是暗黑主题的字段dark，你可以根据这个字段来将界面切换为暗黑模式。

可以在实例化`simple-mind-map`时指定使用的主题：

```js
new MindMap({
    theme: 'minions'
})
```

如果想动态切换主题也很简单：

```js
mindMap.setTheme('classic')
```

如果要获取当前使用的主题名称可以使用：

```js
const theme = mindMap.getTheme()
```

## 修改主题的部分配置

要修改主题的部分配置，可以在实例化时通过`themeConfig`选项设置：

```js
new MindMap({
  themeConfig: {
    paddingX: 20,
    // ...
  }
})
```
具体的主题属性可以参考前面小节，最终渲染时，`themeConfig`配置会和当前主题配置进行合并。

如果实例化后想动态设置，可以使用`setThemeConfig`方法：

```js
mindMap.setThemeConfig({
  paddingX: 20,
  // ...
})
```

注意，你传入的这个对象会替换掉配置中的`themeConfig`原有的值。

## 定义新主题

除了可以使用内置的主题外，你也可以自定义新主题：

```js
import MindMap from 'simple-mind-map'

// 注册新主题
MindMap.defineTheme('主题名称', {
    // 主题配置
})

// 1.实例化时使用新注册的主题
const mindMap = new MindMap({
    theme: '主题名称'
})

// 2.动态切换新主题
mindMap.setTheme('主题名称')
```

最好在实例化之前进行注册，这样在实例化时可以直接使用新注册的主题。

一个主题其实就是一个普通的对象，完整配置可以参考[默认主题](https://github.com/wanglin2/mind-map/blob/main/simple-mind-map/src/themes/default.js)，`defineTheme`方法会把你传入的配置和默认配置做合并。大部分主题其实需要自定义的部分不是很多，一个典型的自定义主题配置可以参考[blueSky](https://github.com/wanglin2/mind-map/blob/main/simple-mind-map/src/themes/blueSky.js)。

```js
MindMap.defineTheme('redSpirit', {
    // 背景颜色
    backgroundColor: 'rgb(255, 238, 228)',
    // 连线的颜色
    lineColor: 'rgb(230, 138, 131)',
    lineWidth: 3,
    // 概要连线的粗细
    generalizationLineWidth: 3,
    // 概要连线的颜色
    generalizationLineColor: 'rgb(222, 101, 85)',
    // 根节点样式
    root: {
      fillColor: 'rgb(207, 44, 44)',
      color: 'rgb(255, 233, 157)',
      borderColor: '',
      borderWidth: 0,
      fontSize: 24,
      active: {
        borderColor: 'rgb(255, 233, 157)',
        borderWidth: 3,
      }
    },
    // 二级节点样式
    second: {
      fillColor: 'rgb(255, 255, 255)',
      color: 'rgb(211, 58, 21)',
      borderColor: 'rgb(222, 101, 85)',
      borderWidth: 2,
      fontSize: 18,
      active: {
        borderColor: 'rgb(255, 233, 157)',
      }
    },
    // 三级及以下节点样式
    node: {
      fontSize: 14,
      color: 'rgb(144, 71, 43)',
      active: {
        borderColor: 'rgb(255, 233, 157)'
      }
    },
    // 概要节点样式
    generalization: {
      fontSize: 14,
      fillColor: 'rgb(255, 247, 211)',
      borderColor: 'rgb(255, 202, 162)',
      borderWidth: 2,
      color: 'rgb(187, 101, 69)',
      active: {
        borderColor: 'rgb(222, 101, 85)'
      }
    }
})
```

## 完整示例

<iframe style="width: 100%; height: 455px; border: none;" src="https://wanglin2.github.io/playground/#eNrFV+tvG0UQ/1dWh9A5yDk/0wTjVIXCB6QGoRaJD7kIne/W9rbn3eN2nUcjSxBQadpUBYEoL6ESiZIPSKCCSh5U+Wf8SP8LZm/vZfuSlqpSP/ixszO/mf3N7Nzcpvam5xmrXazVtDq3feIJxLHoeudNSjoe8wXaRD5u5hGjS6xLBXbyiLct12Vrl3ET9VDTZx2kA4IeWywR6ixZntoyNQ5iF892QDrbsTxTMylCJnWxQFImNRcR7bqukhcKaPD468H2neHxJ8O/j0Y/fH5ya2u0dTC4ee/klz2T2oxygSxbkFX8HnMwB+skotzyyoxJFcrNL4Z3dvv7R092v4vM7LZFW/iDNu5gMMvNoMXzaFP6DSMx4PDBbk63XYtzYusA1wsRh3/tDW7sDA4e9R8fj77ZG3775zi6g5uEZqGHjBgphZzuY+eKR3wi9LzSQgh8nHy2M/z+jye7P51sP1TChmVfa/lAvnORucyvId1vNXLlubk8KlcW4Ku8MKPnE4Djn0eHx0BbGsMFt2PWlWIelaR1qVKKraXWh8QR7RqqJIDDB1snDz6NYUcP742ObqjdFqbYt1xy3RKE0UvPYp6Oatp8LMZyGcIrlvJoYS59wOH9A1URw/v/DP69q+Q+Y6IW0YhQk7juGFZxPo+qVfmJoRCyp/msgMu5+ZROg/kO9iOsSXl43GIsbjIqrpDruIbK1VioijUV3iTsWQFMuIqYRQiqMvhJmOkf7owOf5smh2OoT+csegLf4ddpBJUgE3Oy3pKCyTxHVtomDlHO4Ku08GL4yqBlfxtoGdy91T/6tb9/e5ofCm0kzU4SU5LDNBUlWUnzcMJqJeX4eaI+Pejw2kzFOn5nnhZ1dqKrcBkgnWenMdAsylyeKz89j2P0LAB+UAHnXv/f/IxVzyQ90IdFDxpyVr9O2mnUseNHVm660ctHDl6LGnMujAm7NeQwu9vBVBgtLN5xAZqKtzbedXJ6aHkReLagVfn6THg0xxJW6limJgWmNnZSKRZ4XUixqcUtTD0M06mXinabuI6PqVReTjAm4DK9THpKt4TE2bjDDKcryV5a7yVFEP0NZZEdoURchr4vp4D3GSfqQizrLm7KZ6puQ+ogTSuhupB1AmUGeQRFHhRXb+YNNXUEd27041eDL38P71wwffQPb/ePHqULjtGcLvvFR6qcwU9OLvNBE7lEuEhKLSr5YEoxVi23K8eCSE+5h1KFT72gZi+YumAhMAxMlsCwQqjukFUUzCKLphYG8TbuMFMLtkMF4iS7cYGCSr0Au2nFCEkw5jYsqaI2TVFvdIVgFF2wXWJfA5XUrARq6WmqXlC6oS1AT9qmBh2wPW1umsBJgo3+1QspLmDJxYaraLkQzpqmZhTUgBnNWJh3DJtzU4sza6RoizKzphpYqVh8NdBDyIsryMfgEfIWbATFJz+vTNIbQSWGVoMztyuUIYxTUIcwG4QrwbxkMe2+jUmrDerVYtFbjzxn+30t8tyx/BYBvxGqZzkOoa1IEIduhNl+xohLUQRh0PEaAKFSgxxoeU1lQI70xlXOKLxBBPBmuAEZiDuDqcELgmoHRgH+Gj70ZdLBMlmzDZ+tcewDiKmFVzXjpUHatoXweK1QcNc/pnyDG4zzWZvONjC5Csc24Km40aU2N2zWKUCZY8EzakO6CQ/T03r/AbfdVt0=" />