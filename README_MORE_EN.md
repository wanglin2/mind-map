# Features

- [x] Plugin-based architecture. Apart from core functionalities, other features are provided as plugins, allowing on-demand use to reduce bundle size.
- [x] Supports various structures: Logical Structure Diagrams (left, right), Mind Maps, Organizational Charts, Directory Organization Charts, Timelines (horizontal, vertical), Fishbone Diagrams, etc.
- [x] Built-in multiple themes, allows high customization of styles, supports registering new themes.
- [x] Node content supports text (plain text, rich text), images, icons, hyperlinks, notes, tags, summaries, mathematical formulas.
- [x] Nodes support drag-and-drop (move, free resize), multiple node shapes; supports extending node content, supports using DDM for fully custom node content.
- [x] Supports canvas dragging and zooming.
- [x] Supports two methods for multi-selecting nodes: mouse button drag selection and Ctrl+left click.
- [x] Supports export to `json`, `png`, `svg`, `pdf`, `markdown`, `xmind`, `txt`; supports import from `json`, `xmind`, `markdown`.
- [x] Supports shortcuts, undo/redo, associative lines, search/replace, mini-map, watermark, scrollbars, hand-drawn style, rainbow lines, markers, outer frames.
- [x] Provides rich configuration options to meet various scenarios and usage habits.
- [x] Supports collaborative editing.
- [x] Supports presentation mode.
- [x] More features await your discovery.

The following plugins are officially provided and can be imported as needed (if a feature doesn't work, it's likely because the corresponding plugin hasn't been imported). Please refer to the documentation for specific usage:

| RichText (Node Rich Text Plugin)      | Select (Mouse Multi-Select Node Plugin)   | Drag (Node Drag Plugin)               | AssociativeLine (Associative Line Plugin) |
| ------------------------------------- | ----------------------------------------- | ------------------------------------- | ----------------------------------------- |
| Export (Export Plugin)                | KeyboardNavigation (Keyboard Navigation Plugin) | MiniMap (Mini-Map Plugin)           | Watermark (Watermark Plugin)             |
| TouchEvent (Mobile Touch Event Support Plugin) | NodeImgAdjust (Drag to Adjust Node Image Size Plugin) | Search (Search Plugin)          | Painter (Node Format Painter Plugin)     |
| Scrollbar (Scrollbar Plugin)          | Formula (Mathematical Formula Plugin)     | Cooperate (Collaborative Editing Plugin) | RainbowLines (Rainbow Lines Plugin)      |
| Demonstrate (Presentation Mode Plugin) | OuterFrame (Outer Frame Plugin)          | MindMapLayoutPro (Mind Map Layout Plugin) |                                           |

Features that will **not** be implemented in this project:

> 1. Free nodes, i.e., multiple root nodes.
>
> 2. Adding nodes after a summary node.
>
> If you need the above features, this library may not meet your requirements.

# Installation

```bash
npm i simple-mind-map
```

# Usage

Provide a container element with non-zero width and height:

```html
<div id="mindMapContainer"></div>
```

Also, set the following CSS styles:

```css
#mindMapContainer * {
  margin: 0;
  padding: 0;
}
```

Then create an instance:

```js
import MindMap from "simple-mind-map";

const mindMap = new MindMap({
  el: document.getElementById("mindMapContainer"),
  data: {
    data: {
      text: "Root Node",
    },
    children: [],
  },
});
```

You will get a mind map. Want to implement more features? Check the [Development Documentation](https://wanglin2.github.io/mind-map-docs/).

# License

[MIT](./LICENSE). Commercial use is permitted freely as long as the `simple-mind-map` copyright notice and attribution are retained. If you have questions or wish to remove these requirements, please contact the author (WeChat: wanglinguanfang) for a paid option to remove them.

> Example: You can add the following content on any page of your application, such as the About page, Help page, Documentation page, Open Source Notice, etc.:
>
> The mind map feature of this product is developed based on the SimpleMindMap project. The copyright belongs to the original project. [Open Source License](https://github.com/wanglin2/mind-map/blob/main/LICENSE).

# Development Help / Technical Support / Consulting

Due to limited time and a shift in focus, we currently do not provide any development support (including paid support). Thank you for your understanding!

# Star

If you like this project, welcome to give it a star. It means a lot to us.

[![Star History Chart](https://api.star-history.com/svg?repos=wanglin2/mind-map&type=Date)](https://star-history.com/#wanglin2/mind-map&Date)