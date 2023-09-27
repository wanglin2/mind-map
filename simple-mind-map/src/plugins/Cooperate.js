import * as Y from 'yjs'
import { WebrtcProvider } from 'y-webrtc'
import { isSameObject, simpleDeepClone } from '../utils/index'

// 协同插件
class Cooperate {
  constructor(opt) {
    this.opt = opt
    this.mindMap = opt.mindMap
    this.ydoc = new Y.Doc()
    this.ymap = this.ydoc.getMap()
    this.provider = new WebrtcProvider('demo-room', this.ydoc, {
      signaling: ['ws://10.16.83.11:4444']
    })
    this.currentData = null

    // 处理数据
    if (this.mindMap.opt.data) {
      this.currentData = this.transformTreeDataToObject(this.mindMap.opt.data)
      Object.keys(this.currentData).forEach(uid => {
        this.ymap.set(uid, this.currentData[uid])
      })
    }

    this.bindEvent()
  }

  // 绑定事件
  bindEvent() {
    // 监听数据同步
    this.onObserve = this.onObserve.bind(this)
    this.ymap.observe(this.onObserve)

    // 监听思维导图改变
    this.onDataChange = this.onDataChange.bind(this)
    this.mindMap.on('data_change', this.onDataChange)
  }

  // 解绑事件
  unBindEvent() {
    this.ymap.unobserve(this.onObserve)
    this.mindMap.off('data_change', this.onDataChange)
    this.ydoc.destroy()
  }

  // 数据同步时的处理，更新当前思维导图
  onObserve(event) {
    const data = event.target.toJSON()
    if (isSameObject(data, this.currentData)) return
    this.currentData = data
    const res = this.transformObjectToTreeData(data)
    if (!res) return
    if (this.mindMap.richText) {
      this.mindMap.renderer.renderTree =
        this.mindMap.richText.handleSetData(res)
    } else {
      this.mindMap.renderer.renderTree = res
    }
    this.mindMap.render()
    this.mindMap.command.addHistory()
  }

  // 当前思维导图改变后的处理，触发同步
  onDataChange(data) {
    const res = this.transformTreeDataToObject(data)
    this.updateChanges(res)
  }

  // 将树结构转平级对象
  /*
    {
        data: {
            uid: 'xxx'
        },
        children: [
            {
                data: {
                    uid: 'xxx'
                },
                children: []
            }
        ]
    }
    转为：
    {
        uid: {
            children: [uid1, uid2],
            data: {}
        }
    }
  */
  transformTreeDataToObject(data) {
    const res = {}
    const walk = (root, parent) => {
      const uid = root.data.uid
      if (parent) {
        parent.children.push(uid)
      }
      res[uid] = {
        isRoot: !parent,
        data: {
          ...root.data
        },
        children: []
      }
      if (root.children && root.children.length > 0) {
        root.children.forEach(item => {
          walk(item, res[uid])
        })
      }
    }
    walk(data, null)
    return res
  }

  // 找到父节点的uid
  findParentUid(data, targetUid) {
    const uids = Object.keys(data)
    let res = ''
    uids.forEach(uid => {
      const children = data[uid].children
      const isParent =
        children.findIndex(childUid => {
          return childUid === targetUid
        }) !== -1
      if (isParent) {
        res = uid
      }
    })
    return res
  }

  // 将平级对象转树结构
  transformObjectToTreeData(data) {
    const uids = Object.keys(data)
    if (uids.length <= 0) return null
    const rootKey = uids.find(uid => {
      return data[uid].isRoot
    })
    if (!rootKey || !data[rootKey]) return null
    // 根节点
    const res = {
      data: simpleDeepClone(data[rootKey].data),
      children: []
    }
    const map = {}
    map[rootKey] = res
    uids.forEach(uid => {
      const parentUid = this.findParentUid(data, uid)
      const cur = data[uid]
      const node = map[uid] || {
        data: simpleDeepClone(cur.data),
        children: []
      }
      if (!map[uid]) {
        map[uid] = node
      }
      if (parentUid) {
        if (map[parentUid]) {
          map[parentUid].children.push(node)
        } else {
          map[parentUid] = {
            data: simpleDeepClone(data[parentUid].data),
            children: [node]
          }
        }
      }
    })
    return res
  }

  // 找出更新点
  updateChanges(data) {
    const oldData = this.currentData
    this.currentData = data
    this.ydoc.transact(() => {
      // 找出新增的或修改的
      Object.keys(data).forEach(uid => {
        // 新增的或已经存在的，如果数据发生了改变
        if (!oldData[uid] || !isSameObject(oldData[uid], data[uid])) {
          this.ymap.set(uid, data[uid])
        }
      })
      // 找出删除的
      Object.keys(oldData).forEach(uid => {
        if (!data[uid]) {
          this.ymap.delete(uid)
        }
      })
    })
  }

  // 插件被移除前做的事情
  beforePluginRemove() {
    this.unBindEvent()
  }

  // 插件被卸载前做的事情
  beforePluginDestroy() {
    this.unBindEvent()
  }
}

Cooperate.instanceName = 'cooperate'

export default Cooperate
