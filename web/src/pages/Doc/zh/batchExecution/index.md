# BatchExecution实例

`batchExecution`用来批量异步的执行一些操作，如果某个操作同时多次调用，那么只会在下一个事件循环里执行一次。可以通过`mindMap.batchExecution`获取到该实例

## 方法

### push(name, fn)

添加任务。

`name`：任务名称

`fn`：任务