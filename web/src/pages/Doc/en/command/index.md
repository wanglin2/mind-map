# command instance

The `command` instance is responsible for adding and executing commands. It
includes many built-in commands and can also be added manually. A command refers
to an operation that needs to add a copy to the history stack data. The
`mindMap.command` instance can be obtained through this."

## Props

### history

The current list of all historical data. Do not manually modify the array.

### activeHistoryIndex

The current historical data index. Do not manually modify this property.

## Methods

Please use the command 'Back' or 'FORWARD' to move forward or backward.

### pause()

> v0.9.11+

Pause collecting historical data.

### recovery()

> v0.9.11+

Restore the collection of historical data.

### add(name, fn)

Add a command.

`name`: Command name

`fn`: Method to be executed by the command

### remove(name, fn)

Remove a command.

`name`: Name of the command to be removed

`fn`: Method to be removed, if not provided all methods for the command will be
removed

### getCopyData()

Get a copy of the rendering tree data. That is, the data of the current canvas.

### clearHistory()

Clear the history stack data