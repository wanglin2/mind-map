import {
  copyRenderTree,
  simpleDeepClone,
  throttle,
  isSameObject,
  transformTreeDataToObject
} from '../../utils'
import { ERROR_TYPES } from '../../constants/constant'
import pkg from '../../../package.json'

//  命令类
class Command {
  //  构造函数
  constructor(opt = {}) {
    this.opt = opt
    this.mindMap = opt.mindMap
    this.commands = {}
    this.history = [] // 字符串形式存储
    this.activeHistoryIndex = 0
    // 注册快捷键
    this.registerShortcutKeys()
    this.originAddHistory = this.addHistory.bind(this)
    this.addHistory = throttle(
      this.addHistory,
      this.mindMap.opt.addHistoryTime,
      this
    )
    // 是否暂停收集历史数据
    this.isPause = false
  }

  // 暂停收集历史数据
  pause() {
    this.isPause = true
  }

  // 恢复收集历史数据
  recovery() {
    this.isPause = false
  }

  //  清空历史数据
  clearHistory() {
    this.history = []
    this.activeHistoryIndex = 0
    this.mindMap.emit('back_forward', 0, 0)
  }

  //  注册快捷键
  registerShortcutKeys() {
    this.mindMap.keyCommand.addShortcut('Control+z', () => {
      this.mindMap.execCommand('BACK')
    })
    this.mindMap.keyCommand.addShortcut('Control+y', () => {
      this.mindMap.execCommand('FORWARD')
    })
  }

  //  执行命令
  exec(name, ...args) {
    if (this.commands[name]) {
      this.commands[name].forEach(fn => {
        fn(...args)
      })
      this.mindMap.emit('afterExecCommand', name, ...args)
      if (
        ['BACK', 'FORWARD', 'SET_NODE_ACTIVE', 'CLEAR_ACTIVE_NODE'].includes(
          name
        )
      ) {
        return
      }
      this.addHistory()
    }
  }

  //  添加命令
  add(name, fn) {
    if (this.commands[name]) {
      this.commands[name].push(fn)
    } else {
      this.commands[name] = [fn]
    }
  }

  //  移除命令
  remove(name, fn) {
    if (!this.commands[name]) {
      return
    }
    if (!fn) {
      this.commands[name] = []
      delete this.commands[name]
    } else {
      let index = this.commands[name].find(item => {
        return item === fn
      })
      if (index !== -1) {
        this.commands[name].splice(index, 1)
      }
    }
  }

  //  添加回退数据
  addHistory() {
    if (this.mindMap.opt.readonly || this.isPause) {
      return
    }
    this.mindMap.emit('beforeAddHistory')
    const lastDataStr =
      this.history.length > 0 ? this.history[this.activeHistoryIndex] : null
    const data = this.getCopyData()
    const dataStr = JSON.stringify(data)
    // 此次数据和上次一样则不重复添加
    if (lastDataStr && lastDataStr === dataStr) {
      return
    }
    this.emitDataUpdatesEvent(lastDataStr, dataStr)
    // 删除当前历史指针后面的数据
    this.history = this.history.slice(0, this.activeHistoryIndex + 1)
    this.history.push(dataStr)
    // 历史记录数超过最大数量
    if (this.history.length > this.mindMap.opt.maxHistoryCount) {
      this.history.shift()
    }
    this.activeHistoryIndex = this.history.length - 1
    this.mindMap.emit('data_change', data)
    this.mindMap.emit(
      'back_forward',
      this.activeHistoryIndex,
      this.history.length
    )
  }

  //  回退
  back(step = 1) {
    if (this.mindMap.opt.readonly) {
      return
    }
    if (this.activeHistoryIndex - step >= 0) {
      const lastDataStr = this.history[this.activeHistoryIndex]
      this.activeHistoryIndex -= step
      this.mindMap.emit(
        'back_forward',
        this.activeHistoryIndex,
        this.history.length
      )
      const dataStr = this.history[this.activeHistoryIndex]
      const data = JSON.parse(dataStr)
      this.emitDataUpdatesEvent(lastDataStr, dataStr)
      return data
    }
  }

  //  前进
  forward(step = 1) {
    if (this.mindMap.opt.readonly) {
      return
    }
    let len = this.history.length
    if (this.activeHistoryIndex + step <= len - 1) {
      const lastDataStr = this.history[this.activeHistoryIndex]
      this.activeHistoryIndex += step
      this.mindMap.emit(
        'back_forward',
        this.activeHistoryIndex,
        this.history.length
      )
      const dataStr = this.history[this.activeHistoryIndex]
      const data = JSON.parse(dataStr)
      this.emitDataUpdatesEvent(lastDataStr, dataStr)
      return data
    }
  }

  //  获取渲染树数据副本
  getCopyData() {
    if (!this.mindMap.renderer.renderTree) return null
    const res = copyRenderTree({}, this.mindMap.renderer.renderTree, true)
    res.smmVersion = pkg.version
    return res
  }

  // 移除节点数据中的uid
  removeDataUid(data) {
    data = simpleDeepClone(data)
    let walk = root => {
      delete root.data.uid
      if (root.children && root.children.length > 0) {
        root.children.forEach(item => {
          walk(item)
        })
      }
    }
    walk(data)
    return data
  }

  // 派发思维导图更新明细事件
  emitDataUpdatesEvent(lastDataStr, dataStr) {
    try {
      // 如果data_change_detail没有监听者，那么不进行计算，节省性能
      const eventName = 'data_change_detail'
      const count = this.mindMap.event.listenerCount(eventName)
      if (count > 0 && lastDataStr && dataStr) {
        const lastData = JSON.parse(lastDataStr)
        const data = JSON.parse(dataStr)
        const lastDataObj = simpleDeepClone(transformTreeDataToObject(lastData))
        const dataObj = simpleDeepClone(transformTreeDataToObject(data))
        const res = []
        const walkReplace = (root, obj) => {
          if (root.children && root.children.length > 0) {
            root.children.forEach((childUid, index) => {
              root.children[index] =
                typeof childUid === 'string'
                  ? obj[childUid]
                  : obj[childUid.data.uid]
              walkReplace(root.children[index], obj)
            })
          }
          return root
        }
        // 找出新增的或修改的
        Object.keys(dataObj).forEach(uid => {
          // 新增的或已经存在的，如果数据发生了改变
          if (!lastDataObj[uid]) {
            res.push({
              action: 'create',
              data: walkReplace(dataObj[uid], dataObj)
            })
          } else if (!isSameObject(lastDataObj[uid], dataObj[uid])) {
            res.push({
              action: 'update',
              oldData: walkReplace(lastDataObj[uid], lastDataObj),
              data: walkReplace(dataObj[uid], dataObj)
            })
          }
        })
        // 找出删除的
        Object.keys(lastDataObj).forEach(uid => {
          if (!dataObj[uid]) {
            res.push({
              action: 'delete',
              data: walkReplace(lastDataObj[uid], lastDataObj)
            })
          }
        })
        this.mindMap.emit(eventName, res)
      }
    } catch (error) {
      this.mindMap.opt.errorHandler(
        ERROR_TYPES.DATA_CHANGE_DETAIL_EVENT_ERROR,
        error
      )
    }
  }
}

export default Command
