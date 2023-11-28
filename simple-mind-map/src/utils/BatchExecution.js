import { nextTick } from '.'

//  批量执行
class BatchExecution {
  //  构造函数
  constructor() {
    this.has = {}
    this.queue = []
    this.nextTick = nextTick(this.flush, this)
  }

  //  添加任务
  push(name, fn) {
    if (this.has[name]) {
      this.replaceTask(name, fn)
      return
    }
    this.has[name] = true
    this.queue.push({
      name,
      fn
    })
    this.nextTick()
  }

  // 替换任务
  replaceTask(name, fn) {
    const index = this.queue.findIndex(item => {
      return item.name === name
    })
    if (index !== -1) {
      this.queue[index] = {
        name,
        fn
      }
    }
  }

  //   执行队列
  flush() {
    let fns = this.queue.slice(0)
    this.queue = []
    fns.forEach(({ name, fn }) => {
      this.has[name] = false
      fn()
    })
  }
}

export default BatchExecution
