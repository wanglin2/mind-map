import { keyMap } from './keyMap'

//  快捷按键、命令处理类
export default class KeyCommand {
  //  构造函数
  constructor(opt) {
    this.opt = opt
    this.mindMap = opt.mindMap
    this.shortcutMap = {
      //Enter: [fn]
    }
    this.shortcutMapCache = {}
    this.isPause = false
    this.isInSvg = false
    this.isStopCheckInSvg = false
    this.defaultEnableCheck = this.defaultEnableCheck.bind(this)
    this.bindEvent()
  }

  // 扩展按键映射
  extendKeyMap(key, code) {
    keyMap[key] = code
  }

  // 从按键映射中删除某个键
  removeKeyMap(key) {
    if (typeof keyMap[key] !== 'undefined') {
      delete keyMap[key]
    }
  }

  //  暂停快捷键响应
  pause() {
    this.isPause = true
  }

  //  恢复快捷键响应
  recovery() {
    this.isPause = false
  }

  //  保存当前注册的快捷键数据，然后清空快捷键数据
  save() {
    // 当前已经存在缓存数据了，那么直接返回
    if (Object.keys(this.shortcutMapCache).length > 0) {
      return
    }
    this.shortcutMapCache = this.shortcutMap
    this.shortcutMap = {}
  }

  //  恢复保存的快捷键数据，然后清空缓存数据
  restore() {
    // 当前不存在缓存数据，那么直接返回
    if (Object.keys(this.shortcutMapCache).length <= 0) {
      return
    }
    this.shortcutMap = this.shortcutMapCache
    this.shortcutMapCache = {}
  }

  // 停止对鼠标是否在画布内的检查，前提是开启了enableShortcutOnlyWhenMouseInSvg选项
  // 库内部节点文本编辑、关联线文本编辑、外框文本编辑前都会暂停检查，否则无法响应回车快捷键用于结束编辑
  // 如果你新增了额外的文本编辑，也可以在编辑前调用此方法
  stopCheckInSvg() {
    const { enableShortcutOnlyWhenMouseInSvg } = this.mindMap.opt
    if (!enableShortcutOnlyWhenMouseInSvg) return
    this.isStopCheckInSvg = true
  }

  // 恢复对鼠标是否在画布内的检查
  recoveryCheckInSvg() {
    const { enableShortcutOnlyWhenMouseInSvg } = this.mindMap.opt
    if (!enableShortcutOnlyWhenMouseInSvg) return
    this.isStopCheckInSvg = true
  }

  //  绑定事件
  bindEvent() {
    this.onKeydown = this.onKeydown.bind(this)
    // 只有当鼠标在画布内才响应快捷键
    this.mindMap.on('svg_mouseenter', () => {
      this.isInSvg = true
    })
    this.mindMap.on('svg_mouseleave', () => {
      this.isInSvg = false
    })
    window.addEventListener('keydown', this.onKeydown)
    this.mindMap.on('beforeDestroy', () => {
      this.unBindEvent()
    })
  }

  // 解绑事件
  unBindEvent() {
    window.removeEventListener('keydown', this.onKeydown)
  }

  // 根据事件目标判断是否响应快捷键事件
  defaultEnableCheck(e) {
    const target = e.target
    if (target === document.body) return true
    for (let i = 0; i < this.mindMap.editNodeClassList.length; i++) {
      const cur = this.mindMap.editNodeClassList[i]
      if (target.classList.contains(cur)) {
        return true
      }
    }
    return false
  }

  // 按键事件
  onKeydown(e) {
    const {
      enableShortcutOnlyWhenMouseInSvg,
      beforeShortcutRun,
      customCheckEnableShortcut
    } = this.mindMap.opt
    const checkFn =
      typeof customCheckEnableShortcut === 'function'
        ? customCheckEnableShortcut
        : this.defaultEnableCheck
    if (!checkFn(e)) return
    if (
      this.isPause ||
      (enableShortcutOnlyWhenMouseInSvg &&
        !this.isStopCheckInSvg &&
        !this.isInSvg)
    ) {
      return
    }
    Object.keys(this.shortcutMap).forEach(key => {
      if (this.checkKey(e, key)) {
        // 粘贴事件不组织，因为要监听paste事件
        if (!this.checkKey(e, 'Control+v')) {
          e.stopPropagation()
          e.preventDefault()
        }
        if (typeof beforeShortcutRun === 'function') {
          const isStop = beforeShortcutRun(key, [
            ...this.mindMap.renderer.activeNodeList
          ])
          if (isStop) return
        }
        this.shortcutMap[key].forEach(fn => {
          fn()
        })
      }
    })
  }

  //  检查键值是否符合
  checkKey(e, key) {
    let o = this.getOriginEventCodeArr(e)
    let k = this.getKeyCodeArr(key)
    if (o.length !== k.length) {
      return false
    }
    for (let i = 0; i < o.length; i++) {
      let index = k.findIndex(item => {
        return item === o[i]
      })
      if (index === -1) {
        return false
      } else {
        k.splice(index, 1)
      }
    }
    return true
  }

  //  获取事件对象里的键值数组
  getOriginEventCodeArr(e) {
    let arr = []
    if (e.ctrlKey || e.metaKey) {
      arr.push(keyMap['Control'])
    }
    if (e.altKey) {
      arr.push(keyMap['Alt'])
    }
    if (e.shiftKey) {
      arr.push(keyMap['Shift'])
    }
    if (!arr.includes(e.keyCode)) {
      arr.push(e.keyCode)
    }
    return arr
  }

  // 判断是否按下了组合键
  hasCombinationKey(e) {
    return e.ctrlKey || e.metaKey || e.altKey || e.shiftKey
  }

  //  获取快捷键对应的键值数组
  getKeyCodeArr(key) {
    let keyArr = key.split(/\s*\+\s*/)
    let arr = []
    keyArr.forEach(item => {
      arr.push(keyMap[item])
    })
    return arr
  }

  //  添加快捷键命令
  /**
   * Enter
   * Tab | Insert
   * Shift + a
   */
  addShortcut(key, fn) {
    key.split(/\s*\|\s*/).forEach(item => {
      if (this.shortcutMap[item]) {
        this.shortcutMap[item].push(fn)
      } else {
        this.shortcutMap[item] = [fn]
      }
    })
  }

  //  移除快捷键命令
  removeShortcut(key, fn) {
    key.split(/\s*\|\s*/).forEach(item => {
      if (this.shortcutMap[item]) {
        if (fn) {
          let index = this.shortcutMap[item].findIndex(f => {
            return f === fn
          })
          if (index !== -1) {
            this.shortcutMap[item].splice(index, 1)
          }
        } else {
          this.shortcutMap[item] = []
          delete this.shortcutMap[item]
        }
      }
    })
  }

  //  获取指定快捷键的处理函数
  getShortcutFn(key) {
    let res = []
    key.split(/\s*\|\s*/).forEach(item => {
      res = this.shortcutMap[item] || []
    })
    return res
  }
}
