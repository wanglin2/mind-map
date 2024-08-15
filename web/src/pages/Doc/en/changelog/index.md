# Changelog

## 0.10.6

> 2024.8.15

Fix:

> 1.Fix the issue where the highlighting of search nodes does not disappear in read-only mode;
>
> 2.Fixed the issue where the associated line plugin reported an error when clicking on the right-click menu of the mouse;
>
> 3.Fix the issue where clicking on the canvas cannot deactivate associated lines;
>
> 4.Fixed the issue where the text style of the summary node did not change when switching themes in rich text mode;
>
> 5.Fixed the issue where selecting both summary nodes and their corresponding nodes simultaneously and setting node styles would cause summary nodes to lose their activation status;
>
> 6.Fixed the issue where nodes outside the canvas would report an error when adding icons after selecting all nodes in performance mode;
>
> 7.Fix the issue of being unable to move forward after activating a node during rollback operation;

New:

> 1.Add Node Number Plugin;
>
> 2.Search plugin supports searching summary nodes;
>
> 3.Add instantiation option to not display expand and collapse buttons;
> 
> 4.Theme configuration supports setting the style of associated lines, namely solid or dashed lines;
>
> 5.Mouse box selection supports selecting summary nodes;
>
> 6.Select All operation supports selecting summary nodes;
>
> 7.Add node note icon click event;
>
> 8.Add manual activation and deactivation methods for multiple nodes in the render class;
>
> 9.Method for adding an extended font list to the RichText plugin;
>
> 10.Fix the issue of incomplete support for summary nodes in the GO_TARGET_deDE command;
>
> 11.Delete the elements of the text editing box when destroying an instance;

Demo:

> 1.Right click menu adds the function of setting node numbers;
>
> 2.Support setting the style of associated lines, namely solid or dashed lines;
>
> 3.Support selecting the content of the floating layer of notes with the mouse;
>
> 4.Change the hyperlink in the remarks to open a new window;
>
> 5.Fixed the issue where entering the zoom note input box when activating a node would result in inputting it into the node text;
>
> 6.Fixed the issue where switching themes after changing the base style, selecting overwrite, and then modifying the base style would restore the previously overwritten style;

## 0.10.5

> 2024.8.2

Fix:

> 1.Fixed the issue of error when dragging the scrollbar after enabling the scrollbar plugin and performance mode;
>
> 2.Fixed the issue where the rich text style of nodes was not updated when copying across levels;
>
> 3.Fixed the issue where the demo plugin did not work properly after enabling performance mode;
>
> 4.Fixed the issue of canvas jumping when the first rendering canvas is triggered after adjusting the canvas size;

New:

> 1.Move the node and change the node hierarchy. Nodes that have set custom rich text styles do not need to update the styles;
>
> 2.Support clicking on the canvas to cancel the creation of associated lines;
>
> 3.Automatically expand a node by moving it or copying it to a collapsed node;

Demo:

> 1.When the number of subordinate nodes is greater than 100, the collapse button displays ellipsis;
>
> 2.No longer write data to the browser cache when opening local file editing, to avoid the problem of local file data loss caused by triggering storage restrictions;
>
> 3.If the local file is not saved, close the page and add an interception prompt;
>
> 4.Fixed the issue in the outline where clicking and dragging a node would trigger a file drag mask on the page;

## 0.10.4

> 2024.7.25

This update mainly adds a performance mode. When enabled, only nodes within the visible area of the canvas will be rendered, and nodes outside the area will be deleted from the canvas, improving usability in the case of large data volumes (1000+nodes). The first rendering time for 2000 nodes has been reduced from 5s+to 0.5s. However, this also brings some problems, such as a slight lag when dragging the animation canvas, as nodes will be rendered in real time, and exporting images will be slower because all nodes need to be rendered first, as well as other temporarily undiscovered issues.

Fix:

> 1.Delete useless code and fix the issue where the mouse hover node reports an error and does not display the expand and collapse buttons;

## 0.10.3

> 2024.7.19

Updates that require special attention:

1.Node tag data structure update

The node tag data has been changed from a string array to an object array, mainly to support setting the style of a single tag. The current node tag data structure is as follows:

```js
{
     tag: ['tag']
}
```

Change to the following:

```js
{
     tag: [
          {
               text: 'tag',
               style: {}
          }
     ]
}
```

2.Related to mathematical formulas

The mathematical formula plugin Formula defaults to importing styles from the Katex library, so there is no need to manually import them in the application. At the same time, the path of the Katex library font file needs to be configured through the katexFontPath instantiation option.

Fix:

> 1.Fix the issue where the isRoot and parent attributes of node instances obtained through methods customCreateNodeContent and createNodePrefixContent are both null;
>
> 2.Fixed the issue where the last edited node would enter editing mode when zooming in and out of the canvas using the scroll wheel or shortcut keys after editing the node text, and the mind map shortcut keys would become invalid;
>
> 3.Fixed the issue where multiple nodes can be selected simultaneously, allowing unlimited insertion of summaries;

New:

> 1.Modified the data type of the node tag field tag to support setting a single node tag style;
>
> 2.Add instantiation options for displaying the location (Equivalent to node text) of node labels;
>
> 3.Two callback parameters have been added to the node_tag_click event;
>
> 4.When copying, cutting, or moving multiple nodes, operate them in the order they are on the nodes, rather than in the order they are activated;
>
> 5.If a formula plugin is registered and there are formulas in the node, then when exporting SVG, it is necessary to add styles from the Katex library;
>
> 6.Support instantiation options for custom katex library rendering modes;
>
> 7.The formula plugin defaults to importing styles from the Katex library;
>
> 8.Add instantiation options for custom katex library font file paths;
>
> 9.Add instantiation options for setting the inner margin of the outer frame;

Demo:

> 1.Support clicking on node tags to modify text and color;
>
> 2.Remove the logic of introducing formula library styles;
>
> 3.Support configuring the inner margin of the outer frame;

## 0.10.2 / 0.10.2-fix.1

> 2024.7.3

Fix:

> 1.Fix the issue of node text and custom content with the createNodePrefixContent option not being vertically centered;
>
> 2.Fix the issue of selecting node text when dragging the endpoints of associated lines;

New:

> 1.Add external frame plugins;
>
> 2.Add a leftward logical structure diagram;
>
> 3.The mini map supports dragging and dropping view boxes to adjust the canvas position;
>
> 4.Add an instantiation option to intercept nodes and start dragging them;
>
> 5.Prevent default behavior for mousedown, mousemove, drag, and node.mousedown events;
>
> 6.The beforeDragEnd option of the drag plugin adds a callback parameter to the list of nodes that are currently being dragged;
>
> 7.Add an instantiation option that prohibits reading and writing to the user's clipboard;
>
> 8.Independently separate the canvas automatic movement function of the Select plugin to solve the problem of the Drag plugin being unable to use the canvas automatic movement function without registering the Select plugin;
>
> 9.Add callback parameters to the edited node for the hide_text_edit event;
>
> 10.Activate the node when clicking on the hyperlink icon; Add instantiation options for custom hyperlink redirection;

Demo:

> 1.Color selection supports transparency selection;
>
> 2.Add external frame setting function;
>
> 3.Add copy to clipboard function in the right-click menu;
>
> 4.Add a leftward logical structure diagram;
>
> 5.Fix the issue where the event does not end after the mouse is moved out of the mini map and then released;
>
> 6.The mini map supports dragging and dropping view boxes to adjust the canvas position;

## 0.10.1

Fix:

> 1.Fix the issue where the TouchEvent plugin triggers node input when clicking twice at different positions;
>
> 2.Fix / shortcut the issue of being able to retrieve child nodes of the root node;

New:

> 1.Add instantiation options for handling SVG objects before export;
>
> 2.Add instantiation options for cloned nodes when modifying drag and drop nodes;
>
> 3.Add a content layout completion event for distributing individual nodes;
>
> 4.Add instantiation options for intercepting node drag and drop;
>
> 5.Add instantiation options to restrict the maximum and minimum values of TouchEvent plugin's double finger scaling;
>
> 6.Add node marker plugin;

Demo:

> 1.Add node marking function;
>
> 2.Fix the issue where the input box in the bottom right corner cannot be entered in demonstration mode;
>
> 3.Do not display directory, new, or open buttons when opening on the mobile end;

## 0.10.0

Major updates: Upgrade the interaction effect when dragging nodes;

Fix:

> 1.Fix the issue where read-only mode can still activate nodes by Ctrl+clicking on them;
>
> 2.Fix the issue of page scaling when setting up scaling in some mobile browsers;
>
> 3.Fix the issue of selecting text when dragging the canvas and adjusting images;
>
> 4.Fix the issue of multiple line breaks when copying node text with line breaks and pasting it;
>
> 5.Fix the issue of displaying blank space when exporting images with custom content before and after nodes;

New:

> 1.Add a new rendering start event node.treeRender_start;
>
> 2.Support displaying watermarks below nodes;
>
> 3.Importing xmind files with multiple canvases supports selecting the specified canvas for import;
>
> 4.Canceling the call to the defenseXSS function has a significant impact on performance; The defenseXSS method is provided as a tool method;
>
> 5.Remove the logic of removing nodes with ql cursor class names from rich text content, and fix the issue of ineffective addition of empty lines when text breaks;
>
> 6.Remove the logic of delayed node editing when inserting new nodes;
>
> 7.Support direct editing of mathematical formulas in rich text editing boxes;
>
> 8.Add demonstration plugins to the packaged file;

Demo：

> 1.支持配置水印显示在节点下方；
>
> 2.导入存在多个画布的xmind文件支持选择指定的画布进行导入；
>
> 3.优化富文本工具条下拉选项列表高度问题；
>
> 4.新建和打开按钮增加导出的提示，防止内容丢失；
>
> 5.快捷键提示支持区分windows和mac；

## 0.9.12

Fix:

> Fix the issue of bold title text being parsed as undefined when importing MD files;
>
> Select all, delete nodes, activate adjacent nodes, select multiple nodes, and other operations to increase the distribution of beforeynode-active events;
>
> Change the selection of multiple nodes to real-time distribution of node activation events;
>
> Fix the issue where the distance between icons and text gradually widens when both icons and line breaks are present in non rich text mode and are folded and unfolded;
>
> Fix xss vulnerability when displaying rich text content on nodes;

New:

> Support parsing of HTML formatted title text in MD files;
>
> Prohibit all contents of the canvas (except for hyperlinks and note icons of nodes) from responding to mouse events in demonstration mode;
>
> The demonstration mode supports fill in the blank mode, which means that underlined text is not displayed by default and will only be displayed sequentially by pressing the enter key;
>
> Demonstration mode supports summary content;
>
> The expandToNodeUid method of the render class supports summary nodes;
>
> The findNodeByUid (find the specified node instance on the canvas based on the uid) method of the render class supports summary nodes;
>
> Add instantiation options for adding pre - and post content to nodes, allowing custom content to be added before or after node text;
>
> Click event for adding distribution node labels;
>
> When using the moveNodeToCenter method of the render class to move a specified node to the center of the canvas, scaling is not restored by default;

Demo:

> Fix the issue of node note floating layer not being displayed in full screen view mode;
>
> Fix the issue where the note floating layer does not disappear after clicking the collapse button to collapse the node when displaying the note floating layer;

## 0.9.11

Fix

> 1.Fix the issue where clicking on the summary will trigger the data_change_detail event;
>
> 2.Fix the issue where the custom style command for removing all nodes with one click does not support summaries that are not arrays;
>
> 3.Fix the issue where summary nodes created in rich text mode are not rich text;
>
> 4.Fix the issue where the rich text plugin did not process node summaries when converting node data;
>
> 5.Fix the issue where the highlighted box of the corresponding node will be displayed incorrectly when pressing enter to end in summary node text editing;
>
> 6.Fix the issue of node width and height loss after text editing when creating multiple instances simultaneously;
>
> 7.Fix the issue where the expand/collapse button does not disappear after deleting all child nodes of the currently activated node;
>
> 8.Fix the issue where the canvas automatically moves and cannot stop when dragging nodes to the edge;

New:

> 1.Support default focus and entering editing mode when inserting summaries;
>
> 2.Support holding down the Command and Win keys to select multiple nodes;
>
> 3.Support exporting a node as an image;
>
> 4.Add demonstration plugin;

Demo:

> 1.Add the Export as Image button in the right-click menu of the node;
>
> 2.Optimize the issue of incomplete menu display when clicking the right mouse button at the window edge;
>
> 3.Add demonstration mode;
>
> 4.When copying Zhixi data, create summary data in array form;

## 0.9.10

Fix:

> 1.Fix the issue of all replace operation error during search;
>
> 2.Fix the issue of rendering the mini map with entity characters that are not supported by SVG in node text;

New:

> 1.Add an event translate when moving the canvas;
>
> 2.Node content supports setting attachments;

Demo：

> 1.Support dragging and dropping files onto the page for import;

Client:

> 1.Nodes support adding attachments;

## 0.9.9-fix.2

Fix:

> 1.Fix the issue of the original node style not being updated during the insertion of the parent node operation;
>
> 2.Fix the issue of errors when switching structures when opening rainbow lines;

Demo:

> 1.Fix the issue where the side bar outline opens in source code editing mode when clicking full screen editing;

## 0.9.9-fix.1

Fix the issue where the search plugin was unable to search due to changes in the previous version.

## 0.9.9

Fix:

> 1.Fix the issue of incorrect arrow color when creating association lines for the first time;

New:

> 1.Support inserting child nodes with the insert key;
>
> 2.Add the beforeShortcutRun instantiation option to intercept shortcut key operations;
>
> 3.The method of incrementally updating canvas data by adding root instances, updateData;
>
> 4.Add a rainbow line plugin;
>
> 5.Add mouse in and out events to icons in nodes;
>
> 6.Add the getAncestorNodes method to the node instance to obtain the list of ancestor nodes;
>
> 7.Adding mouse events to personnel avatars during collaborative editing;
>
> 8.Instantiation and setData methods support passing in empty data;
>
> 9.Add an instantiation option for adding custom content when exporting images;

Demo:

> 1.Support configuration of rainbow lines;
>
> 2.Add source code editing mode;
>
> 3.Exporting PNG, PDF, and SVG supports setting custom text at the bottom;

Client:

> 1.Double click the file to open the application without opening the workbench page;
>
> 2.Fix the issue of multiple editing windows opening when repeatedly opening the same file;
>
> 3.Prompt for modifying and deleting files being edited;

## 0.9.8

Fix:

> 1.Fix the issue of incorrect calculation function of mind maps within the canvas and scroll bar positions when the canvas size changes;
>
> 2.Fix the issue of errors when importing some old version xmind files;
>
> 3.Fix the issue where the highlight box of the collapsed node does not disappear when searching for highlighted nodes in read-only mode;
>
> 4.Fix the issue where data changes during search and search results are not updated in certain situations;
>
> 5.Fix the issue of deleting adjacent nodes when deleting nodes that are currently being edited;
>
> 6.Fix the issue of rendering only the root node when expand: false is set to the root node in the node data;
>
> 7.Fix the collaborative editing plugin: When a node is selected and then folded, the activation status of the node disappears, but the selected status of the node still exists in other clients;
>
> 8.Optimize the export of markdowns and fix the issue of missing summaries;
>
> 9.Fix the issue of ineffective forward and backward operations on node positions during free drag and drop;

New:

> 1.The commands such as INSERTNODE will not overwrite custom UIDs;
>
> 2.Methods for adding and removing highlighting for node instances; Adjust the way read-only mode searches for highlighted nodes;
>
> 3.Add configuration for searching all nodes (including those that have been folded); Search defaults to searching all nodes;
>
> 4.Add configuration options that cannot be selected by multiple people on the same node during collaborative editing;
>
> 5.Add lifecycle function configuration options before synchronizing collaborative editing node operations;
>
> 6.Add UID field to the summary node;
>
> 7.Added support for exporting txt files;

Demo:

> 1.Fix the issue where shortcut keys become invalid after opening label pop ups and note pop ups and clicking on the mask to close them;
>
> 2.Modify the association logic between themes and dark colors;
>
> 3.Support reading local directories;
>
> 4.Fix the issue of selecting a file in the import pop-up window and then deleting it without actually deleting it;
>
> 5.Export new txt files;

## 0.9.7

Fix:

> 1.Fix the issue where the style is not updated when dragging nodes below level 2 to the root node to become level 2 nodes; Fix the issue where the style is not updated when moving nodes with the command to move up one level;
>
> 2.Fix the issue of losing focus when activating summary nodes and then setting text styles for them;

New:

> 1.Add two commands to remove custom styles from nodes;

Demo:

> 1.Add a right-click menu button to remove custom styles from nodes.

## 0.9.6

Fix:

> 1.Fix the issue where the style of the collapsed nodes remains unchanged when switching themes;
>
> 2.Fix the issue of losing the new text style when switching themes for text wrapping;
>
> 3.Fix the issue where the style of the newline text remains unchanged when switching themes;
>
> 4.Fixed the issue of adding mathematical formulas to nodes and not changing the text style when switching themes;

New:

> 1.Add new fields to the theme, used to set the display position, head or tail, of node line arrows;
>
> 2.New field added to the theme, used to set the starting position of the root node line when connecting curves;
>
> 3.Mac dual finger touch event moves the canvas to increase sensitivity slightly;
>
> 4.Add MOVE_ UP_ ONE_ The LEVEL command is used to move a node up one level;

Demo:

> 1.The outline supports pressing Shift+Tab to move nodes up one level;
>
> 2.Support setting the position of node arrow display;
>
> 3.Support setting the starting position of root node connections;
>
> 4.Add two new themes;
>
> 5.Fix the issue of text wrapping not taking effect in the outline and displaying the br tag; 

## 0.9.5

Fix:

> 1.Fix the issue of missing inter zone summaries when expanding and folding nodes.
>
> 2.Fix the issue where the position of the newly created associated line is always on the right side of the node without changing according to its relative position.

New:

> 1.Add configuration for the initial positions of the two endpoints when creating associated lines.
>
> 2.Add a configuration that prohibits adjusting the endpoint position of associated lines.
>
> 3.Add a hand drawn style plugin.

Demo:

> 1.Optimize interface adaptation on mobile devices.
>
> 2.Supports enabling hand drawn styles.

## 0.9.4

Fix:

> 1.Fix the issue of inconsistent text wrapping caused by inconsistent text area width during node display and editing in some cases.
>
> 2.Fixed the issue where gradients were not applied to the edit box during rich text editing for nodes with gradient backgrounds.
>
> 3.Fix the issue of text style loss after switching themes for nodes defined in bold by the theme.
>
> 4.Fix the issue on Mac where the useLeftKeySelectionRightKeyDrag option is set to true and cannot hold down the Ctrl key to select multiple nodes.
>
> 5.Fix the issue where text styles are lost after clearing styles during node rich text editing, and switching themes does not restore them.
>
> 6.Fix data issue when deleting nodes with child nodes_ Change_ The issue of error reporting in detail events.

New:

> 1.Add the lineRadius property to the theme configuration to set the size of the rounded corners when connecting straight lines.

Demo:

> 1.Remove the display of formulas from the outline.
>
> 2.Some configurations in the basic style that only support partial structures are displayed and hidden based on the current structure.
>
> 3.Add configuration for connecting rounded corners.
>
> 4.Automatically hide the sidebar when importing files.

## 0.9.3

Fix

> 1.Fix the issue of text misalignment when nodes have icons in Safari browser.
>
> 2.Fix the issue of formula rendering in browsers with lower versions of Chrome kernel.
>
> 3.Fix the issue of new MouseEvent code execution errors when used in micro front-end framework applications.
>
> 4.Fix the issue of missing arrows on node connections, arrows on associated lines, and gradient backgrounds when exporting images.

New:

> 1.Export PDF from jspdf library to pdf-lib library.
>
> 2.If the second parameter of the set node text command (SETNODE-TEXT) is not passed, the previous value will be used.
>
> 3.There is an issue of incorrect width and height of exported images in Firefox browser when optimizing nodes with hyperlinks and comments.
>
> 4.In node text editing, if the pasted data is in SMM format, the pure text of the first node will be taken out for pasting.
>
> 5.Add interception operations for pasting when editing nodes without rich text.
>
> 6.Add a detailed event (data_change_detail) for updating node data, which can retrieve newly created, updated, or deleted node data.
>
> 7.Theme configuration supports setting node gradient background color.

Demo:

1.Support setting the background of node gradients.

## 0.9.2

Fix:

> 1.Fix the issue of no line breaks when node text contains consecutive numbers or letters.
>
> 2.Fix the issue of duplicate node drawing when importing files with the same UID as existing nodes on the current canvas.
>
> 3.Fix the issue of duplicate rendering of nodes caused by forward and backward when the number of nodes exceeds the maximum number of cache pools.
>
> 4.Fix the issue of the canvas moving in the opposite direction when scrolling horizontally with the mouse or touchpad.
>
> 5.Fix the issue where the mouse in flag is not reset when a node is destroyed.
>
> 6.Fix the issue of incorrect position calculation in the scrollbar plugin when the 'initRootNodePosition' configuration is not set to the default '[center, center]'.
>
> 7.Fix the issue where dragging the canvas cannot stop when the mouse is released on the node.
>
> 8.Fix the issue of errors in the position calculated by the view. fit method when the canvas container is not 0 from the top left corner of the browser window.
>
> 9.Fix the issue where the watermark in the exported image does not fully cover the entire image when there are a large number of nodes.
>
> 10.Fix the issue of inserting formula errors.
>
> 11.Fix the issue of losing the selected text status when the mouse moves out of the editing box while selecting text in the node text editing state.
>
> 12.When repairing node rich text editing, Fix the issue 'rich_text_selection_change' event is not triggered when the text selection range is 'null'.
>
> 13.Fix the issue of no 'node' instance in the 'node_dragging' event callback.
>
> 14.Fix the issue of too many nodes and the canvas size being too large to export PNG.

New:

> 1.Modify the mousewheel event, change the dir flag to dirs, support storing multiple directions, and optimize the dual finger movement operation of the touchpad.
>
> 2.The TextEdit class adds the isShowTextEdit method to determine whether the current node is in an editing state.
>
> 3.Change the paste method of the render class to support pasting clipboard data.
>
> 4.Add a configuration option to restrict mind map graphics within the canvas.
>
> 5.When registering the scrollbar plugin, it supports configuring whether to restrict the mind map within the canvas.
>
> 6.Folding all nodes will move the mind map root node to the center of the canvas.
>
> 7.Support the configuration option of displaying watermarks only during export.
>
> 8.When pasting images from the clipboard at a node, custom processing functions are supported to upload the images to your server.
>
> 9.Refactoring the export logic of the PDF, the exported PDF size is no longer a fixed A4, but the size of the mind map, while deleting the configuration for pagination export.
>
> 10.Node connections support displaying arrows as a field for the theme.
>
> 11.The maximum number of historical records is adjusted to 500 by default.

Demo：

> 1.Support configuration to display watermarks only during export.
>
> 2.Basic style configuration line supports displaying arrows.

## 0.9.1-fix.2

Fix:

> 1.Fix the issue where some browsers display default text when node text is empty.
>
> 2.Fix the issue of text style loss when inputting text again when the node text content is empty.
>
> 3.Fix the issue where exporting images also fails when node image loading fails.

New:

> 1.Support configuring the default image displayed when node image loading fails.

## 0.9.1-fix.1

Fix:

1.Fix the issue of custom node methods reporting null errors.

2.Fix the issue of large volume of exported PDF files.

## 0.9.1

Fix:

> 1.Fix the issue of exporting images, SVGs, and PDFs with errors when customizing node content.
>
> 2.Optimize the distribution of node activation events, do not distribute events when the activation node has not changed, and skip intermediate events when distributing multiple events in a short period of time.
>
> 3.Fix the issue where the edit box and node detach when scrolling the canvas with the mouse while the node is in editing mode.
>
> 4.Fix the issue of shortcut keys becoming invalid when zooming the canvas with the mouse wheel and then exiting node editing while in node editing mode.
>
> 5.Fix the issue where clicking on a node can also trigger node_dragend event.
>
> 6.Fix that clicking on the canvas and nodes while not in the format brush will also trigger the painter_end event.
>
> 7.Fixed the issue where the mind map text editing box was not destroyed during node text editing and associated line text editing.

New:

> 1.When holding down the Ctrl key, disable the node double-click event.
>
> 2.Support configuring the behavior when creating new nodes: focusing and entering editing, not focusing, only focusing.
>
> 3.When searching in read-only mode, add a highlight effect to the currently matched node.
>
> 4.The default behavior of the mouse scroll wheel is to move the canvas up and down; The default is to scroll forward to enlarge the canvas and zoom back.
>
> 5.When the mouse scroll wheel behavior is to move the canvas up and down, it supports holding down the Ctrl key to zoom in and out of the canvas.

Demo：支持配置创建新节点时的行为。

## 0.9.0

New:

1.Support adding summaries to some child nodes of the same node.

2.Moving the mouse into the summary will highlight its node.

3.Importing and exporting xmind files supports processing profiles.

## 0.8.1

Fix：

> 1.Fix the issue where the activation status of the summary node in the history data has not been deleted, which can cause data to be triggered when clicking on the summary node_ Change event.
> 
> 2.Fix the issue of blank pages and exceptions thrown by the console when running in Safari browser.
>
> 3.Fixed the issue of icon floating layer and note floating layer detached from nodes when scaling the canvas.
>
> 4.Fixed the issue of selecting all nodes in read-only mode.
>
> 5.Fix the presence of node content has &nbsp; in rich text mode; Error exporting as image.
>
> 6.Fixed the issue of overlapping profiles when adding profiles to oneself first and then to subordinates; Fix the issue of overlapping profiles when adding profiles to nodes with hierarchical relationships at the same time.
>
> 7.Fix the issue of exporting PDF errors when there are many nodes.


New：

> 1.Add a configuration option that prohibits dragging the canvas.
>
> 2.Add a configuration option to prohibit double finger scaling of the canvas.
> 
> 3.Add compression parameters to the method of exporting PNG; Optimize the problem of excessive volume when exporting PDF from nodes with large amounts of data.
>
> 4.Rename the isParent method of the node instance to isAncestor and add the isParent method at the same time.

Demo:

> 1.Fixed the issue of being able to search for replacement and edit outlines in read-only mode.
>
> 2.Fix the issue where the outline cannot be displayed and edited when the node content is an HTML tag.
>
> 3.Fix the issue where when multiple nodes are selected and icons are added at the same time, all node icons will be unified as the icon of the first node.
>
> 4.Adding loading to the export operation.

## 0.8.0-fix.1

Fix: Fixed the issue of creating a new node using direct paste if the pasted content contains HTML label symbols such as <> and the newly created node content is empty.

## 0.8.0

Breaking change: Greatly optimize some of the code and slightly improve performance, mainly by using the 'render' class to remove useless logic, adjust unreasonable implementations, and extract duplicate code; Modify function names, functions, etc.

Fix:

> 1.Fix the issue of the arrow of the associated line disappearing when exporting images and SVGs.
>
> 2.Fix the issue of abnormal operation returning to the root node after resizing the container.
>
> 3.Fix that the shortcut key operations for inserting summary, moving up, down, and organizing layout with one click did not trigger data_ The issue with the change event.
>
> 4.Fix the issue of each node displaying a border when exporting images, SVGs, and PDFs with watermarks.
>
> 5.Fixed the issue of no watermarks and no redrawing after the container size was changed.
>
> 6.Fix the issue of slow rendering of mini maps with watermarks.
>
> 7.Fixed the issue where the collaboration plugin did not display the creator's avatar when creating a new node.

New:

> 1.Optimize the canvas DOM structure and render nodes, lines, and associated lines in layers.
>
> 2.Optimize the watermark plugin.
>
> 3.The setTheme, setThemeConfig, and setLayout functions add parameters that do not trigger re rendering.
>
> 4.Add a command to insert a parent node.
>
> 5.Add a command to only delete the current node.
>
> 6.Automatically expand child nodes when inserting a summary.
>
> 7.Clear the current active node when right-clicking on the canvas.
>
> 8.The folded active nodes are synchronously deleted from the list of active nodes.
>
> 9.Pasting text with line breaks supports controlling whether nodes are split by line breaks.
>
> 10.The mini map plugin supports returning mini maps of image types.
>
> 11.Only one historical record can be added within a specified time period to avoid adding unnecessary intermediate states.

Demo:

> 1.Modify the method and copy to return to the root node.
> 
> 2.Fix the issue of ineffective first switching when switching themes in overlay mode.
>
> 3.The right-click menu adds the function of inserting parent nodes and deleting only the current node.
>
> 4.The top toolbar supports automatic folding into more according to the window width.
>
> 5.Support manual input of zoom factor.
>
> 6.Improve the English translation of the interface.
>
> 7.Change the mini map to render through images.

## 0.7.3-fix.2

Fix some issues with collaborative editing:

1.The position of the new node is incorrect when inserting peer nodes;

2.Moving a position within a peer node did not trigger an update;

3.The position of the mobile node inserted as a sibling node is incorrect;

## 0.7.3-fix.1

Fix:

> 1.Fixed some issues where the box selection area did not disappear when multiple nodes were selected.
>
> 2.Fixed an issue where the box selection area does not disappear when releasing the mouse over multiple selected nodes.
>
> 3.Fixed rendering anomalies caused by duplicate node uids when pasting nodes multiple times.

Demo：

> 1.Add protocol selection function to the hyperlink input box.

## 0.7.3

New: 1.Add a Cooperate editing plugin.

Demo: 1.Fix the automatic closing of the sidebar caused by the formula sidebar component.

## 0.7.2

Fix:

> 1.Fixed the issue of nodes not being selected when the selection area does not include node boundaries when multiple nodes are selected.
>
> 2.Fix the issue of errors when node text is not a string.
>
> 3.Fix the issue of some text disappearing when edited again when there are<>&characters in the text in non rich text mode.

New:

> 1.Supports inserting mathematical formulas.
>
> 2.Supports dragging and moving multiple nodes simultaneously.
>
> 3.Supports copying and cutting multiple nodes simultaneously.
> 
> 4.The node label color has been changed to be generated based on the label content, meaning that the same label content will generate the same color.
>
> 5.Optimize the insertion of child nodes: 1. When inserting child nodes into multiple nodes simultaneously, do not enter the editing state; 2. The newly inserted child node automatically enters the active state.
>
> 6.Optimize the insertion of sibling nodes: 1. Support the simultaneous insertion of sibling nodes into multiple nodes; 2. When calling the command to insert sibling nodes on the root node, no child nodes will be created.
>
> 7.Add a command to simultaneously insert multiple peers and multiple child nodes.
>
> 8.Changing the unique identifier of nodes from id to uid mainly affects the associated lines, which may not display properly in previous versions.
>
> 9.Optimize the logic of icon merging and support the expansion of icons under the internal classification of the library.
>
> 10.Associate line: 1. Double click the associate line to enter associate line text editing mode; If the associated line text is the default text, it will not be saved; 3. When there are active nodes, clicking on the associated line can directly activate the associated line.

Demo:

> 1.Fixed an issue where multiple nodes in the Zhixi mind map cannot be pasted when copying.
>
> 2.Add a sidebar for formula editing.

## 0.7.1-fix.2

Fix: 1.Fix the issue of plugin registration method chain call reporting errors.

New:

> 1.Add a configuration option to adapt to the canvas size when the mind map is first loaded.
>
> 2.Add a command to automatically generate dts declaration files.

## 0.7.1-fix.1

Fix: Fixed the issue of dragging nodes without excluding the child nodes of the dragged nodes.

## 0.7.1

Fix:

> 1.Fix the issue of unsaved associated line endpoints after changes.
>
> 2.Fix the issue of abnormal canvas scrolling when moving the mouse to the edge of multiple selected nodes when the distance from the top left corner of the canvas to the browser window is not 0.
>
> 3.Fix the issue of importing xmind file errors for nodes with empty titles.
>
> 4.Fix the issue where the exported xmind file prompts for corruption when opened on the latest version of xmind software.
>
> 5.Fix the issue where stickers cannot be displayed when exporting data with stickers in xmind format.
>
> 6.Fix the issue of node right-click event reporting errors when the select plugin is not registered.
>
> 7.There is no issue with removing duplicates in the method of registering plugins.

New:

> 1.Reconstruct node drag and drop logic: optimize drag and drop difficulties in some situations, adapt to various structures, and automatically move the canvas when the mouse moves to the edge of the canvas during drag and drop.
>
> 2.Reconstruct the scrollbar plugin to optimize the user experience.
>
> 3.Imperfect resolution of conflicts between logical structure diagrams, mind maps, directory organization diagrams, organization chart summaries, and nodes (the summaries should be rewritten or deleted later).
>
> 4.Activate adjacent nodes after deleting them.
>
> 5.In node data_ The starting field is considered a custom field.

Demo:

> 1.The page will display the current core library version number.

## 0.7.0

Breaking change: Removed the section of node activation style in the theme file, Setting the activation style of nodes is no longer supported, and the activation effect has been changed to a unified node outer border style, while also supporting the mouse hover effect.

Fix:

> 1.Fix rendering anomalies when the node border size is relatively large.
>
> 2.Fixed an issue where the node style of the associated line will not be updated when switching themes.
>
> 3.Fix that selecting all did not trigger node_ The issue with active events.

新增：

> 1.When folding nodes, displays the number of collapsed nodes.
>
> 2.Support the position of the endpoint of the associated line to follow mouse drag changes.
>
> 3.Add a scrollbar plugin.
>
> 4.Support opening specified online files through fileURL query parameters in URLs.
>
> 5.The fishbone diagram supports setting node margins.
>
> 6.By default, double-click to reset the canvas.
>
> 7.Modify the parameters of the export image method, and when exporting PDF, if the size of the mind map is smaller than A4 paper, do not rotate the direction.
>
> 8.Improve the clarity of exported images and PDFs on high-definition screens.
> 
> 9.Add a pre destruction lifecycle function to the plugin to address the issue of some side effects that were not cleared during the destruction of the mind map.
>
> 10.Optimize the settings of the basic style and do not trigger full rendering when modifying theme attributes that do not affect size.
>
> 11.Prohibit triggering node right-click menu events when multiple node selections are completed, to avoid triggering the right-click menu display.
>
> 12.Optimize the Select plugin so that if multiple selected nodes do not change, the activation event is not triggered.
>
> 13.The activation node list thrown by event node_active no longer directly references the internal activation list.
>
> 14.Optimize the logic of mouse button down node events, and support dragging the canvas by holding down the root node with the right mouse button in the right-click drag and drop canvas mode.

Demo：

> 1.Do not directly reference the internal activation node list to optimize performance.
> 
> 2.Support configuring whether to display scrollbars.
>
> 3.Delete the active node configuration in the sidebar node style configuration section.

## 0.6.17

Fix:

> 1.Fix the issue of error reporting in the xmind file exported from Baidu Brain Map.
>
> 2.Fix the mindMap. export method code error.

New:

> 1.Create index.d.ts file。
>
> 2.Support configuration to enable double click reset mind map.
>
> 3.Intercept paste operations during rich text editing, remove formatting, and only allow pasting pure text.

## 0.6.16

Fix:

> 1.Optimize the logic of rich text measurement elements, remove duplicate settings for styles, and add duplicate nodes
>
> 2.Optimize the export image logic, and when traversing the node to convert the URL of the image, if it is already in the form of data: URL, do not handle it repeatedly.

New:

> 1.Remove the second parameter of the exported SVG method and configure it through instantiation instead.
>
> 2.Export images without using external libraries.

Demo:

> 1.Fixed a bug where siblings can be added to the root node when editing the outline separately.

## 0.6.15-fix.2

Fix: Fixed an issue where rich text nodes cannot be displayed in Firefox browser.

## 0.6.15-fix.1

New:

> 1.Export PDF supports pagination export based on image size.
>
> 2.Exporting PDF supports automatic direction adjustment based on aspect ratio.
>
> 3.Optimize the placeholder elements of the expand and collapse buttons: 1. Nodes without child nodes do not render this element; 2. Dynamically update the element based on the existence of child nodes.
>
> 4.Add a configuration that prohibits mouse wheel scaling.
>
> 5.Supports passing error handling functions.

Fix:

> 1.Fix the issue of displaying exceptions when node text is empty.
>
> 2.Change the paddingX and paddingY of exported SVG graphics to single sided padding.
>
> 3.Fixed an issue where the mouse is not centered when zooming when the canvas is not 0 from the top left corner of the browser window.
>
> 4.Fix the issue of overlapping node borders.

Demo：

> 1.The bottom right corner supports jumping to related links.
>
> 2.Adjust the position of the mini map to solve the problem of being blocked by side buttons.
>
> 3.Fix the issue where the prompt in the upper right corner of the open local file cannot be closed.
>
> 4.Editing the outline separately is no longer linked to the canvas, optimizing the editing experience under large data volume.
>
> 5.The sidebar involves graphical options to increase visualization effects.

## 0.6.14

New:

> 1.Remove and create hidden input boxes, and copy and paste them through navigator. clipboard; Support cross browser pasting of mind map node data; Support custom processing of text data in the clipboard.

Demo:

> 1.Fix the issue of enabling input to automatically enter text editing mode and conflicting with other input boxes.
>
> 2.Fix the issue of not being able to delete node images in the node image pop-up window.
>
> 3.Fixed an issue where the text decoration line style of nodes cannot be removed in the node style sidebar.
>
> 4.The color selector supports selecting transparent colors.
>
> 5.Fix the issue of importing mind map data without updating the sidebar data when the basic style sidebar is open.
>
> 6.Fixed the issue of not focusing when modifying the text of one node in the outline and then clicking on other nodes.
>
> 7.Fixed an issue where the node and word count statistics in the bottom left corner were not updated after exiting Zen mode.
>
> 8.Support deleting hyperlinks and notes of nodes from the right-click menu.
>
> 9.Support pasting node data of Zhixi Mind Map.

## 0.6.13

Fix: 

> 1.Fix the issue of the inability to drag the canvas while holding down the middle mouse button on a node in read-only mode.
>
> 2.Fixed the issue of probabilistic error reporting after quickly dragging nodes several times.
>
> 3.Fix the issue of pulling up the input method during operations such as activating nodes on the mobile end, expanding and collapsing.
>
> 4.Fix the issue where an exception request is initiated when the background image in the theme configuration is none.

New: 

> 1.Mobile gesture scaling optimization: Scale according to a linear relationship, and adjust the canvas position with double finger displacement.
>
> 2.Remove the logic of asynchronous rendering nodes and improve the speed of creating new nodes.
>
> 3.The export of images has been changed from the html2canvas library to the dom to image more library to address the issue of missing text styles in exporting rich text nodes.
>
> 4.When a non rich text input box enters the editing state, it is deselected by default.
>
> 5.When there is an activation node, it supports automatically entering text editing mode when pressing the Chinese, numeric, or English buttons.

Demo：

> 1.Add anti shake operations when saving view data to optimize performance.
>
> 2.Some time-consuming operations add loading effects.
>
> 3.Improve the dark mode of right-click menus and rich text toolbars.

## 0.6.12

Fix: 
  
> 1.Fix the issue where the indicator in the mini map will also move out of the mini map area when the mind map is completely moved out of the visible area.
>
> 2.Fix the issue of overly sensitive dual finger scaling on the mobile end.
>
> 3.Fix the issue of holding down nodes while dragging the canvas in read-only mode.
>
> 4.Fix the issue of incorrect rendering of the mini map when the distance between the mind map and the top left corner of the browser window is not 0.
>
> 5.Fix the issue of the prompt block being too large for the new location when moving nodes.
>
> 6.Fix the issue where search cannot be replaced with empty characters.
>
> 7.Fixed the issue of missing line breaks after searching and replacing in rich text mode.
>
> 8.Fixed the issue of missing focus in the input box when clicking on text editing in the outline.

New:

> 1.Adding a callback parameter to the node move end event (node_drag) can obtain the uid of the move to the node.
>
> 2.Support specifying the location to which internal elements are added through configuration.
>
> 3.Support the format brush function.
>
> 4.Under the curve style, the connection line style of the root node supports consistency with other nodes.
>
> 5.Search supports continuous replacement.
>
> 6.Add and delete button for node image.
>
> 7.Support dragging the canvas while holding down the middle mouse button.

Demo:

> 1.Provide an application takeover mode to facilitate docking with one's own storage services; Supports setting static resource paths at runtime.
>
> 2.Refactoring outline: 1. No longer use the text style that comes with the node; 2. Support full screen editing of the outline; 3. The outline supports dragging and moving nodes; 4. The outline supports deleting nodes.
>
> 3.Fix the issue of interface dark mode not updating in the scenario of importing data.

## 0.6.11-fix.1

Fix: 1.Fixed the issue of invisible editing when node text is white.

## 0.6.11

New: 1.Optimize the mini map, remove node content within the mini map, and optimize performance.

Demo: 1.Add a new topic and add tab differentiation to the topic list. 2.Node image upload supports inputting network image addresses. 3.Node image upload supports inputting network images.

## 0.6.10

Fix: 1.Fix the issue of deleting a node after searching for it and not updating the search results when searching again.  2.Fixed an issue where the button for adjusting image size did not update after node operation.  3.Fix the issue of incorrect internal data deep copy location.  4.Fix the issue of ineffective line wrapping in rich text nodes.  5. Fix the issue of node swapping and loss when switching themes and other scenarios.

New: 1.Search supports searching for white space characters and replacing them with white space characters.

Demo: 1.Support calling up search through icon buttons.  2.Support for switching to dark mode through icon buttons.  3.Optimize search: The mouse is not in the search area and not focused, solving the problem of not being able to delete input text when the mouse is not in the search area.  4.Adjust the interface UI for adding node icons and add a series of node icons.  5.Add a sticker list.  6.Fixed the issue of missing focus in the input box after entering the search box.  7.Support clicking on the icon within the node to display an icon for quick replacement and deletion of the floating panel. 

## 0.6.9-fix.1

Fix: 1.Fix the issue of incorrect replacement after a single search.

New: 1.We will no longer directly modify the incoming data object, but will make a deep copy internally.

## 0.6.9

Fix: 1.Fixed an issue where setting styles to summary nodes would cause summary nodes to disappear. 2.Fixed the issue of node content not rendering when creating a root instance again when customizing node content. 3.Fix the issue of losing focus when adding a new node while the node is in editing. 2.Fix the issue of continuously pressing the tab key not being able to continuously create child nodes.

New: 1.Replace existing `&nbsp;` in SVG when exporting Characters to avoid exporting SVG errors. 2.Support for search and replace.

Demo: 1.When switching themes, it is supported to choose whether to overwrite the set basic style.

## 0.6.8

Fix: 1.Change the shortcut key for inserting a summary to Ctrl+G to avoid conflicts with the save shortcut key. 2.Fix the issue of abnormal switching between rich text editing configuration input boxes while nodes are being edited.

New: 1.Modify the copy, cut, and paste logic, and support pasting data from the clipboard.

Demo: 1.Fix the issue of not saving the outer margin of the basic style setting node. 2.Supports automatic switching to dark mode based on the theme.

## 0.6.7

Fix: 1.Fixed the issue of missing placeholder elements for the expand and collapse button after node collapse and expansion. 2.Fixed the issue of being able to scale images in read-only mode.

New: 1.Support locating to a node based on node instance or node uid. 2.Modify the creation method of node uids and export data to add node uids.

Remove: 1.Remove the node transition effect.

Demo: 1.Add website homepage. 2.Fixed the issue of missing node styles when creating new nodes in the outline. 3.Fixed the issue of missing edited text after pressing Enter or Tab after editing nodes in the outline. 4.Optimize the node positioning of the outline, and the collapsed nodes will automatically expand. 5.The sidebar button supports folding. 6.Optimize small screen adaptation.

## 0.6.6

New: 1.Support exporting to Xmind new version files. 2.Importing the new version of Xmind file supports importing images from nodes. 3.Add a vertical timeline structure.

Fix: 1.The TouchEvent plugin no longer sends click events, solving the problem of two windows opening when clicking on a hyperlink on the mobile end.  2.Fix the issue of dragging and moving a node to become a child node of another node, where the parent node of that node points to not being updated.  3.Fixed an issue where the node border style was not updated when dragging a second level node into a third level node.  4.Fix the issue where the mouse will not trigger the button display when moving into the unfolded or retracted button position, except for the structure growing to the right.

optimization: 1.The issue of excessive amplitude when optimizing the touchpad to scale the canvas. 2.The newly created node defaults to selecting all for easy deletion of default text.

## 0.6.5-fix.1

Fix: 1.Fix the issue of adjusting the image size incorrectly while zooming.

## 0.6.5

Fix: 1.Fix the issue of xmind file import errors. 2.Fixed a rare issue where line breaks occur when the width of the node text is decimal.

New: 1.The packaged library supports obtaining built-in constants, themes, and other data. 2.Supports configuring the zoom behavior corresponding to the direction of the mouse wheel. 3.Node images support dragging and resizing.

## 0.6.4-fix.1

New: 1.When zooming with the mouse wheel, the default zoom is centered around the current position of the mouse, which can be turned off by configuring.

Fix: 1.Fixed an issue where the default value of the zoom center point was not updated after changing the canvas size.

## 0.6.4

New: 1.The default is to scale at the center point of the canvas. 2.Optimize the scaling of both fingers on the mobile end, with the center position of the two fingers as the center point for scaling.

## 0.6.3

Fix: 1.Fix the issue where the summary node will respond to inserting node shortcuts.

New: 1.Support custom node content.

## 0.6.2

Fix: 1.Fixed the problem that the new node does not change with the theme in rich Text mode.

## 0.6.1

Fix: 1.Fixed the issue of high movement sensitivity when using the touchpad when changing mouse scrolling to moving the canvas behavior.

## 0.6.0-fix.1

Fix: 1.Fixed the issue of destroying mind maps without setting a background style and reporting errors.

## 0.6.0

Breaking change: Adjusted the directory structure of the simple-mind-map source code, Main impact: 1. The introduction path of the plugin needs to be modified. The constant file path needs to be modified.

New: 1.Supports one click zoom to fit the canvas function. 2.Press and hold the Ctrl key to activate the multi selection function on demand through configuration. 3.Support setting to left click to select multiple nodes and right click to drag the canvas. 4. Support controlling whether nodes are allowed to be edited. 5.Add a method for destroying mind maps. 6.Added touch event support plugin.

Fix: 1.Fix the issue where holding down the Ctrl key to select multiple nodes does not trigger the click event for the node. 2.Fixed the issue of node style loss when clearing a node and then entering text.

## 0.5.11

New: Supports associative text editing.

optimization: Optimizing theme configuration updates, changing configurations that do not involve node size does not trigger node recalculation.

## 0.5.10

New: Optimize node reuse logic using LRU caching algorithm.

## 0.5.10-fix.1

Fix: Fix the issue of import errors.

## 0.5.10-fix.2

Fix: Fixed the issue of switching themes and importing data without triggering data changes in rich text mode.

New: Add three new themes.

## 0.5.9

Change: Unified export method format, using `FileReader` instead of `URL.createObjectURL` to convert `blob` data.

## 0.5.8

optimization: 1.The position setting is not triggered when the node position does not change. 2.The unfolding and folding status does not change and does not trigger button updates.

New: 1.The default setting is to move the mouse over the node to display the expand and collapse buttons. 2.Support the list of icons that can be inserted into extended nodes.

## 0.5.7

Breaking change：In rich text mode, exporting png has been changed to using html2canvas to convert the entire svg, greatly improving the export speed. However, html2canvas has a bug where the text color inline with the dom node in the foreignObject element cannot be recognized. Therefore, the text color of the exported node is fixed. However, compared to the previously unavailable state of the export, it can at least be exported quickly and smoothly.

optimization: Optimize the rich text node editing experience.

New: In rich text mode, importing data, initializing data, and switching theme scene node styles support following theme changes.

## 0.5.6

Fix: 1.Fix the issue of node position disorder during fast and multiple renderings in a short period of time. 2.Fix the issue of dragging the canvas while the node is being edited, causing the edit box and node to separate.

New: 1.Add a maximum history limit.

## 0.5.5-fix.1

Fix: 1.Fix the issue where the edit box is also outside the canvas when editing nodes outside the canvas. 2.After modifying the structure, reset the transformation to prevent the problem of sudden position changes during the first drag after switching the structure during scaling.

optimization: 1.When multiple nodes are selected, as long as there is a cross between the node and the selection area, it is considered selected.

## 0.5.5-fix.2

Fix: 1.Fix mini map error.

## 0.5.5

New: 1.Supports configuring the padding when exporting to PNG, SVG, or PDF. 2.Support the configuration of z-index for node text editing boxes and node comment floating layer elements. 3.Support clicking on areas outside the canvas to end node editing status.

## 0.5.4

New: 1.Add new themes. 2.Added timeline and fishbone structure.

Fix: 1.Fix the conflict issue between node right-click and canvas right-click. 2.Fix the bug that the line segment is not hidden when dragging nodes such as organizational chart and directory organization chart.

optimization: 1.Optimize the layout of organizational chart. 2.Optimize the layout of the directory organization chart.

## 0.5.4-fix.1

optimization: 1.Optimize fishbone layout.

## 0.5.3

Fix: 1.Fixed the issue of setting the text style when multiple nodes were selected in rich text mode, which would change the text of all selected nodes to the text of the last selected node.

New: 1.Support setting the position of the initial central node.

### 0.5.3-fix.1

Fix: 1.Fix the issue where setting the position of the initial central node does not take effect.

### 0.5.3-fix.2

Fix: 1.Fix the issue of not displaying images in nodes when exporting as images.

## 0.5.2

Fix: 1.Remove `uid` from exported `JSON` data; 2.Clear the node cache pool when re rendering.

## 0.5.1

optimization: 1.Only respond to shortcut key events when the mouse is inside the canvas

Fix: 1.Fix the issue of incorrect node position during fast operation

## 0.5.0

This version is mainly about code level changes and optimization, with the core goal of improving rendering performance and reducing stuck issues.

New: 1.Support custom expansion and collapse node icons and colors;

optimization: 1.Optimize rendering logic, set the theme, move forward and backward, and other operations no longer require full rendering;

     2.Optimize node drag logic, and fix the problem of being unable to drag between two nodes;

     3.Collapse all nodes adds logic to return to the center point;

     4.Fix the problem of nodes flying and scrambling caused by triggering rendering multiple times in a short time;

     5.Optimize the experience of node editing;

Fix: 1.Fix the issue where the setData method does not trigger history;

modify: Starting from version 0.5.0, considering performance issues, the node activation state can only modify shape related styles:

```js
[
  'fillColor',
  'borderColor',
  'borderWidth',
  'borderDasharray',
  'borderRadius'
]
```

## 0.4.7

optimization: 1.During rich text editing, when initially focusing, all are no longer selected by default; 2.When editing rich text, use the node fill color as the background color to avoid being invisible when the node color is white.  3.Node activation state switching no longer triggers history. 4.Triggering history multiple times in a short time will only add the last data. 5.Optimize the addition of historical records. When there is a rollback, delete the historical data after the current pointer when adding a new record again.

New: 1.Support for importing and exporting Markdown format files. 2.Support for configuring initial text when inserting nodes. 3.Expand the commands for inserting and deleting nodes to support specifying nodes.

## 0.4.6

New: 1.Associated lines support adjusting control points.

optimization: 1.When adding historical data, filter data that has not changed compared to the previous time.

Fix: 1.Fixed a conflict between the direction keys and the navigation function of the direction keys during node editing. 2.Fixed the issue of node id loss when dragging a mobile node, which can cause associated lines to be lost.

## 0.4.5

New: 1.Supports associative lines. 2.You can also drag the canvas by holding down the root node. 3. Hold down the ctrl key to adjust multiple selected nodes.

## 0.4.4

New: Support horizontal scrolling in response to the mouse.

## 0.4.3

Fix: No trigger after forward and backward `data_ Change` event.

New: Support user-defined mouse wheel events; The mouse wheel is adjusted to support zooming and moving the view up and down.

## 0.4.2

New: The `setText` method of the Node class adds a second parameter to support setting rich text content.

## 0.4.1

New: 1.Add and throw node mouseenter and mouseleave events; 2.Node rich text supports setting background color; 3.Node rich text supports clear style.

Fix: 1.Mac system touchpad scaling is the opposite problem; 2.When the device window.devicePixelRatio is not 1, the size of the rich text node in the exported image will become larger when there are rich text nodes.

## 0.4.0

New: The node supports rich text editing.

## 0.3.4

New: Automatic line wrapping function is added to node text.

Fix: 1.Fix the problem of deletion exceptions if there are root nodes in the batch deleted nodes. 2.Fix the problem that high node height will overlap with other nodes in the case of bottom edge style.

## 0.3.3

Fix: The root node text cannot wrap.

## 0.3.2

Fix: 1.Fix the problem that the node style is not updated when the secondary node is dragged to other nodes or other nodes are dragged to the secondary node; 2.Fix the problem that when the actual content of the mind map is larger than the screen width and height, the excess part is not watermarked when exporting.

## 0.3.1

Fix: 1.The problem that deleting the background image does not take effect; 2.The problem that the connector runs above the root node when the node is dragged to the root node.

New: Add position and size settings for background image display. This setting is also supported for exported pictures.

## 0.3.0

Upgrade to plugin architecture, pull out some non-core functions as plugins, register as needed, and reduce the overall volume.

## 0.2.24

New: Node free drag is changed to configurable, the default is `false`, not open; Support add watermark.

## 0.2.23

New: Support register new theme.

## 0.2.22

optimization：The theme and structure pictures of the built-in `simple-mind-map` package are removed and replaced by user self-maintenance. The original pictures can be found in the `web/assets/img/` directory.

## 0.2.21

New: Support node horizontal line style.

## 0.2.20

fix：When the distance from the canvas to the upper left corner of the window is not 0, the node dragging will have an offset problem.

## 0.2.19

fix：When the node is not activated, pressing any key will trigger the problem of automatic focus.

## 0.2.18

optimization：Keyboard navigation algorithm for finding focus, supporting simple algorithm, region algorithm and shadow algorithm.

## 0.2.17

New：Keyboard navigation, that is, switch the active nodes through the direction keys; The node text content can be edited directly in the outline.

## 0.2.16

optimization：Mini map; drag performance.

## 0.2.15

optimization：Local file editing.

New：Double-click the image in the node to preview the large image.

## 0.2.14

optimization：Automatically expand when inserting child nodes.

fix：The error occurred when the mini map was closed.

## 0.2.13

fix：The child node is missing when collapsing state replication.

## 0.2.11

fix：Fix the problem that is lost when the child node collapses state replication.

New：Support mini map.

## 0.2.10

optimization：Focus immediately when you manually create a node.

fix：Connection style depth update problem.

New：Logical structure diagram and mind map add linear connection style and direct connection style.

## 0.2.9

New：Support the creation, opening and saving of local files on the computer.

## 0.2.8

fix：Xmind8 version file import failed.

New：Expanding to the specified level is supported.

## 0.2.7

fix：The root node adds multiple nodes to burst the stack.

New：Support import .xmind file.

## 0.2.6

New：The title tag is added when exporting svg.

## 0.2.5

fix：Bugs caused by node expansion and collapse.

New：Node supports custom line styles.

## 0.2.4

New：Nodes support multiple shapes.

## 0.2.3

fix：Shortcut key conflicts when editing node text; Right-click menu shortcut prompt error; Right-click menu shortcut prompt.

## 0.2.2

fix：The input string '/' conflicts with the shortcut key '/'.

## 0.2.1

New：Support export as pdf.

## 0.2.0

New：Classic4 theme；Support adding summary; Support free drag; Move Node Up, Move Node Down, Copy Node, Cut Node, Paste Node, One-click Organize Cloth Shortcut; Library packaging; Ctrl+left click to select multiple.

## 0.1.18

fix：The problem that the node icon cannot be deleted; The tool button is grayed out and can still be clicked.

## 0.1.17

New：Add read-only mode.

## 0.1.16

New：Node notes support markdown and rich text.

fix：Can't select text; Node annotations cannot hide problems after node activation; When editing text such as hyperlinks, notes, labels, etc., the return key and return key conflict with the shortcut key of mind map.

## 0.1.15

New：The status data supports saving the active status and view status (drag position, zoom value)；Support node drag.

## 0.1.14

fix：There are problems with setting topics when activating nodes.

## 0.1.13

New：Shortcut key function; Support export as json。

optimization：Some details.

## 0.1.12

New：Local storage；Right-click menu function, etc.

## 0.1.0

Complete basic functions.