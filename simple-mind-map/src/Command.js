import { copyRenderTree, simpleDeepClone } from './utils'

//  命令类
class Command {
  //  构造函数
  constructor(opt = {}) {
    this.opt = opt
    this.mindMap = opt.mindMap
    this.commands = {}
    this.history = []
    this.activeHistoryIndex = 0
    // 注册快捷键
    this.registerShortcutKeys()
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
      if (name === 'BACK' || name === 'FORWARD') {
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
    if (this.mindMap.opt.readonly) {
      return
    }
    let data = this.getCopyData()
    this.history.push(simpleDeepClone(data))
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
      this.activeHistoryIndex -= step
      this.mindMap.emit(
        'back_forward',
        this.activeHistoryIndex,
        this.history.length
      )
      return simpleDeepClone(this.history[this.activeHistoryIndex])
    }
  }

  //  前进
  forward(step = 1) {
    if (this.mindMap.opt.readonly) {
      return
    }
    let len = this.history.length
    if (this.activeHistoryIndex + step <= len - 1) {
      this.activeHistoryIndex += step
      this.mindMap.emit('back_forward', this.activeHistoryIndex)
      return simpleDeepClone(this.history[this.activeHistoryIndex])
    }
  }

  //  获取渲染树数据副本
  getCopyData() {
    return copyRenderTree({}, this.mindMap.renderer.renderTree)
  }
}

export default Command
