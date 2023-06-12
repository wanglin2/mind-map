# Watermark插件

> 0.2.24+

`Watermark`插件负责显示水印。

配置请参考`MindMap`类的[实例化选项](/mind-map/#/doc/zh/constructor)。

## 注册

```js
import MindMap from 'simple-mind-map'
import Watermark from 'simple-mind-map/src/plugins/Watermark.js'
// import Watermark from 'simple-mind-map/src/Watermark.js' v0.6.0以下版本使用该路径

MindMap.usePlugin(Watermark)
```

注册完且实例化`MindMap`后可通过`mindMap.watermark`获取到该实例。

## 方法

### draw()

重新绘制水印。

注意：非精确绘制，会绘制一些超出可视区域的水印，如果对性能有极致要求，推荐自行开发水印功能。

### updateWatermark(config)

更新水印配置。示例：

```js
mindMap.watermark.updateWatermark({
    text: '水印文字',
    lineSpacing: 100,
    textSpacing: 100,
    angle: 50,
    textStyle: {
      color: '#000',
      opacity: 1,
      fontSize: 20
    }
})
```

### hasWatermark()

> v0.3.2+

获取是否存在水印。