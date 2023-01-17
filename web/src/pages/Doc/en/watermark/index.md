# Watermark instance

> 0.2.24+

`Watermark` instance is responsible for displaying the watermark, and can be obtained
through `mindMap.watermark`.

## Methods

### draw()

Redraw the watermark.

Note: For imprecise rendering, some watermarks beyond the visible area will be drawn. If you have extreme performance requirements, it is recommended to develop the watermark function yourself.

### updateWatermark(config)

Update watermark config. Example:

```js
mindMap.watermark.updateWatermark({
    text: 'Watermark text',
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