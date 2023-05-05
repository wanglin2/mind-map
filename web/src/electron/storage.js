import storage from 'electron-json-storage'

export const RECENT_FILE_LIST = 'recentFileList'

// 保存到最近文件
export const saveToRecent = file => {
  return new Promise((resolve, reject) => {
    let list = getRecent()
    let index = list.findIndex(item => {
      return item === file
    })
    if (index !== -1) {
      list.splice(index, 1)
    }
    list.push(file)
    storage.set(RECENT_FILE_LIST, list, err => {
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    })
  })
}

// 保存到最近文件
export const saveFileListToRecent = fileList => {
  return new Promise((resolve, reject) => {
    let list = getRecent()
    fileList.forEach(file => {
      let index = list.findIndex(item => {
        return item === file
      })
      if (index !== -1) {
        list.splice(index, 1)
      }
      list.push(file)
    })
    storage.set(RECENT_FILE_LIST, list, err => {
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    })
  })
}

// 获取最近文件列表
export const getRecent = () => {
  let res = storage.getSync(RECENT_FILE_LIST)
  return (Array.isArray(res) ? res : []).filter(item => {
    return !!item
  })
}

// 清除最近文件列表
export const clearRecent = () => {
  return new Promise((resolve, reject) => {
    storage.remove(RECENT_FILE_LIST, err => {
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    })
  })
}

// 从最近文件列表中移除指定文件
export const removeFileInRecent = file => {
  return new Promise((resolve, reject) => {
    let list = getRecent()
    let index = list.findIndex(item => {
      return item === file
    })
    if (index !== -1) {
      list.splice(index, 1)
    }
    storage.set(RECENT_FILE_LIST, list, err => {
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    })
  })
}

// 替换指定文件
export const replaceFileInRecent = (oldFile, newFile) => {
  return new Promise((resolve, reject) => {
    let list = getRecent()
    let index = list.findIndex(item => {
      return item === oldFile
    })
    if (index !== -1) {
      list.splice(index, 1)
    }
    list.push(newFile)
    storage.set(RECENT_FILE_LIST, list, err => {
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    })
  })
}
