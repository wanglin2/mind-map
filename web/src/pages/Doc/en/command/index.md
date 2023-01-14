# command instance

The `command` instance is responsible for adding and executing commands. It
includes many built-in commands and can also be added manually. A command refers
to an operation that needs to add a copy to the history stack data. The
`mindMap.command` instance can be obtained through this."

## Methods

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

Get a copy of the rendering tree data

### clearHistory()

Clear the history stack data