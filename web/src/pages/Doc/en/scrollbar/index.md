# Scrollbar plugin

> v0.7.0+
>
> V0.7.1+has been refactored, and the following document is a new one.

This plugin is used to help develop the functionality of horizontal and vertical scrollbar. Please refer to the tutorial for detailed usage.

## Register

```js
import MindMap from 'simple-mind-map'
import Scrollbar from 'simple-mind-map/src/plugins/Scrollbar.js'
MindMap.usePlugin(Scrollbar)
```

After registration and instantiation of `MindMap`, the instance can be obtained through `mindMap.scrollbar`.

## Event

#### scrollbar_change(data)

```js
{
    // Vertical scrollbar
    vertical: {
        top,// Top value, Percentage value
        height// Scrollbar height, Percentage value
    },
    // Horizontal scrollbar
    horizontal: {
        left,// Left value, Percentage value
        width// Scrollbar width, Percentage value
    }
}
```

Triggered when the scrollbar data changes, you can listen to this event to update the position and size of the scrollbar. Receive a parameter representing the latest scrollbar position and size information, which you can use to update the style of the scrollbar element.

## Method

### setScrollBarWrapSize(width, height)

- `width`: Number, The width of your scrollbar container element.

- `height`: Number, The height of your scrollbar container element.

Set the size of the scroll bar container, which is the width of the container for horizontal scrollbars and the height of the container for vertical scrollbars. When your scrollbar container size changes, you need to call this method again.

### calculationScrollbar()

> Usually, you do not need to call this method. If the scroll bar is not updated when rendering for the first time, you can manually call this method to obtain the scroll bar data.
>
> You need to first call the setScrollBarWrapSize method to set the width and height of the scroll bar container element.

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

Obtain the size and position of the scrollbar.

### onMousedown(e, type)

- `e`: The event object for the mouse down event.

- `type`: The type of scroll bar pressed, vertical(Vertical scrollbar)、horizontal(Horizontal scrollbar)。

This method needs to be called when the mouse press event of the scrollbar element occurs.

### onClick(e, type)

- `e`：The event object for the mouse click event.

- `type`：The type of scroll bar on click, vertical(Vertical scrollbar)、horizontal(Horizontal scrollbar)。

This method needs to be called when the click event of the scrollbar element is triggered.