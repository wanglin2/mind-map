import * as Y from 'yjs'
import { WebrtcProvider } from 'y-webrtc'
import { isSameObject, simpleDeepClone, getType, isUndef } from '../utils/index'

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
    this.awareness = this.provider.awareness
    this.currentData = null
    this.userInfo = null
    this.currentAwarenessData = []

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

    // 监听思维导图节点激活事件
    this.onNodeActive = this.onNodeActive.bind(this)
    this.mindMap.on('node_active', this.onNodeActive)

    // 监听状态同步事件
    this.onAwareness = this.onAwareness.bind(this)
    this.awareness.on('change', this.onAwareness)
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

  // 节点激活状态改变后触发状态显示同步
  onNodeActive(node, nodeList) {
    if (this.userInfo) {
      this.awareness.setLocalStateField(this.userInfo.name, {
        userInfo: {
          // 用户信息
          ...this.userInfo
        },
        nodeIdList: nodeList.map(item => {
          // 当前激活的节点id列表
          return item.uid
        })
      })
    }
  }

  // 设置用户信息
  /**
   * {
   *    id: '',     // 必传，用户唯一的id
   *    name: '',   // 用户名称。name和avatar两个只传一个即可，如果都传了，会显示avatar
   *    avatar: '', // 用户头像
   *    color: ''   // 如果没有传头像，那么会以一个圆形来显示名称的第一个字，文字的颜色为白色，圆的颜色可以通过该字段设置
   * }
   **/
  setUserInfo(userInfo) {
    if (
      getType(userInfo) !== 'Object' ||
      isUndef(userInfo.id) ||
      (isUndef(userInfo.name) && isUndef(userInfo.avatar))
    )
      return
    this.userInfo = userInfo || null
  }

  // 监听状态同步事件
  onAwareness() {
    const walk = (list, callback) => {
      list.forEach(value => {
        const userName = Object.keys(value)[0]
        if (!userName) return
        const data = value[userName]
        const userInfo = data.userInfo
        const nodeIdList = data.nodeIdList
        nodeIdList.forEach(uid => {
          const node = this.mindMap.renderer.findNodeByUid(uid)
          if (node) {
            callback(node, userInfo)
          }
        })
      })
    }
    // 清除之前的状态
    walk(this.currentAwarenessData, (node, userInfo) => {
      node.removeUser(userInfo)
    })
    // 设置当前状态
    const data = Array.from(this.awareness.getStates().values())
    this.currentAwarenessData = data
    walk(data, (node, userInfo) => {
      // 不显示自己
      if (userInfo.id === this.userInfo.id) return
      node.addUser(userInfo)
    })
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
