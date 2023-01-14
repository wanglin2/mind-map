# batchExecution instance

The `batchExecution` is used to batch asynchronously perform some operations,
and if a certain operation is called multiple times at the same time, it will
only be executed once in the next event loop. Can be obtained through
`mindMap.batchExecution`

## Method

### push(name, fn)

Add task.

`name`: task name

`fn`: task