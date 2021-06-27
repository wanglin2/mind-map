/** 
 * @Author: 王林 
 * @Date: 2021-06-27 13:16:23 
 * @Desc: 在下一个事件循环里执行任务 
 */
const nextTick = function (fn, ctx) {
    let pending = false
    let timerFunc = null
    let handle = () => {
        pending = false
        ctx ? fn.call(ctx) : fn()
    }
    // 支持MutationObserver接口的话使用MutationObserver
    if (typeof MutationObserver !== 'undefined') {
        let counter = 1
        let observer = new MutationObserver(handle)
        let textNode = document.createTextNode(counter)
        observer.observe(textNode, {
            characterData: true// 设为 true 表示监视指定目标节点或子节点树中节点所包含的字符数据的变化
        })
        timerFunc = function () {
            counter = (counter + 1) % 2// counter会在0和1两者循环变化
            textNode.data = counter// 节点变化会触发回调handle，
        }
    } else {// 否则使用定时器
        timerFunc = setTimeout
    }
    return function (cb, ctx) {
        if (pending) return
        pending = true
        timerFunc(handle, 0)
    }
}


/** 
 * @Author: 王林 
 * @Date: 2021-06-26 22:40:52 
 * @Desc: 批量执行 
 */
class BatchExecution {
    /** 
     * @Author: 王林 
     * @Date: 2021-06-26 22:41:41 
     * @Desc: 构造函数 
     */
    constructor() {
        this.has = {}
        this.queue = []
        this.nextTick = nextTick(this.flush, this)
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-06-27 12:54:04 
     * @Desc: 添加任务 
     */
    push(name, fn) {
        if (this.has[name]) {
            return;
        }
        this.has[name] = true
        this.queue.push({
            name,
            fn
        })
        this.nextTick()
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-06-27 13:09:24 
     * @Desc:  执行队列
     */
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