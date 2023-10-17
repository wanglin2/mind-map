# MiniMap plugin

> v0.2.11+

Used to help quickly develop a small map feature, the small map consists of two
parts, one is the current canvas content, and the other is the viewport frame.
When zoomed, moved, or there are too many elements, the canvas may only display
part of the mind map content. The viewport frame can be used to view the current
viewport location, and can be quickly positioned by dragging on the small map.

## Register

```js
import MindMap from 'simple-mind-map'
import MiniMap from 'simple-mind-map/src/plugins/MiniMap.js'
// import MiniMap from 'simple-mind-map/src/MiniMap.js' Use this path for versions below v0.6.0

MindMap.usePlugin(MiniMap)
```

After registration and instantiation of `MindMap`, the instance can be obtained through `mindMap.miniMap`.

## Methods

### calculationMiniMap(boxWidth, boxHeight)

"Calculate the rendering data for the small map, this function will call the
`getMiniMap()` method, so using this function is sufficient.

`boxWidth`: the width of the small map container

`boxHeight`: the height of the small map container

Function return content:

```js
{
      getImgUrl,// v0.8.0+, An asynchronous function that you can call and pass a callback function. The callback function can receive a parameter representing a small map of the image type, and you can render it through the img tag
      svgHTML, // Mini map HTML, it is recommended to use the getImgUrl method to obtain image type mini maps, reduce the number of page DOM, and optimize performance
      viewBoxStyle, // view box position information
      miniMapBoxScale, // view box zoom value
      miniMapBoxLeft, // view box left value
      miniMapBoxTop, // view box top value
}
```

Small map idea:

1.Prepare a container element `container`, position is not `static`

If using rich text editing mode, it is best to remove the default style from the elements inside the 'container', otherwise there may be text offset issues within nodes:

```css
.container * {
  margin: 0;
  padding: 0;
}
```

2.In `container`, create a small map container element `miniMapContainer`,
absolute positioning

3.In `container`, create a view box element `viewBoxContainer`, absolute
positioning, set border style, transition property (optional)

4.Listen for `data_change` and `view_data_change` events, and in this event call
the `calculationMiniMap` method to get calculation data, then render `svgHTML`
to the `miniMapContainer` element and set `miniMapContainer` element style:

```js
:style="{
    transform: `scale(${miniMapBoxScale})`,
    left: miniMapBoxLeft + 'px',
    top: miniMapBoxTop + 'px',
}"
```

5.Set the `viewBoxStyle` object as the style of the `viewBoxContainer` element

At this point, when the mind map on the canvas changes, the small map will also
be updated in real time, and the view box element will reflect the position of
the viewport on the mind map graph in real time

6.Listen for the `mousedown`, `mousemove`, and `mouseup` events of the
`container` element, and call the three methods that will be introduced below to
achieve the effect of the mind map on the canvas being dragged with the mouse

### onMousedown(e)

Small map mouse down event executes this function

`e`: event object

### onMousemove(e, sensitivityNum = 5)

This function is executed on the small map mouse move event.

`e`: event object

`sensitivityNum`: drag sensitivity, the higher the sensitivity, the greater the
actual canvas dragging distance on the small map when dragging the same distance
on the small map

### onMouseup()

This function is executed on the small map mouse release event.