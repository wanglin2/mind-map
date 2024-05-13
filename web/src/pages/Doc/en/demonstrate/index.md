# Demonstrate plugin

> v0.9.11+

The `Demonstrate` plugin provides demonstration functionality.

When entering demonstration mode, the container elements will be automatically displayed in full screen, and then default to the root node. You can switch between the previous and next steps by pressing the left and right arrow keys on the keyboard, and exit demonstration mode by pressing the 'Esc' key.

After entering demonstration mode, all shortcut keys on the mind map will be unavailable, and the mouse will not be able to operate the mind map.

## Register

```js
import MindMap from 'simple-mind-map'
import Demonstrate from 'simple-mind-map/src/plugins/Demonstrate.js'

MindMap.usePlugin(Demonstrate)
```
After registration and instantiation of `MindMap`, the instance can be obtained through `mindMap.demonstrate`.

### Config

This plugin provides some configuration items for configuration, which can be configured through the instantiation option 'demonstrateConfig'. Please refer to the 【Instantiation options】 section in the 【Constructor】 section for details.

### Event

The plugin will dispatch the following events:

`exit_demonstrate`：Triggered when exiting the demonstration.

`demonstrate_jump`：Triggered when jumping.

Please refer to the 'on' function in the 【Instance methods】 section of the 【Constructor】 chapter for details.

## Props

### stepList

List of all steps demonstrated. Available when the 'enter' method is called.

### currentStepIndex

The index of the steps currently played, counting from 0.

### config

The current configuration of the plugin.

## Methods

### enter()

Entering demonstration mode will automatically display the container elements in full screen.

### exit()

Exit demonstration mode, which can also be exited by pressing the 'Esc' key.

### prev()

Previous step.

### next()

Next step.

### jump(index)

- `index`：Number，To jump to a certain step, count from 0.

Jump to a certain step.