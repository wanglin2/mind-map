# Scrollbar plugin

> v0.7.0+

This plugin is used to help develop the functionality of horizontal and vertical scrollbar.

## Register

```js
import MindMap from 'simple-mind-map'
import Scrollbar from 'simple-mind-map/src/plugins/Scrollbar.js'
MindMap.usePlugin(Scrollbar)
```

After registration and instantiation of `MindMap`, the instance can be obtained through `mindMap.scrollbar`.

## Event

#### scrollbar_change

Triggered when the scrollbar data changes, you can listen to this event to update the position and size of the scrollbar.

## Method

### setScrollBarWrapSize(width, height)

- `width`: Number, The width of your scrollbar container element.

- `height`: Number, The height of your scrollbar container element.

Set the size of the scroll bar container, which is the width of the container for horizontal scrollbars and the height of the container for vertical scrollbars. When your scrollbar container size changes, you need to call this method again.

### calculationScrollbar()

> You need to first call the setScrollBarWrapSize method to set the width and height of the scroll bar container element.
>
> Generally, it is necessary to monitor scrollbar_change event, and then call it to update the scroll bar.

Return value: 

```js
{
    // Vertical scrollbar
    vertical: {
        top,
        height
    },
    // Horizontal scrollbar
    horizontal: {
        left,
        width
    }
}
```

Obtain the size and position of the scroll bar, and you can set it to the scroll bar element based on the return value to achieve the effect of rendering and caring about the scroll bar.

### onMousedown(e, type)

- `e`: The event object for the mouse down event.

- `type`: The type of scroll bar pressed, vertical(Vertical scrollbar)、horizontal(Horizontal scrollbar)。

This method needs to be called when the mouse press event of the scrollbar element occurs.