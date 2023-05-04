'use strict'

import {
  app,
  protocol,
  BrowserWindow,
  ipcMain,
  BrowserView,
  dialog,
  shell
} from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import path from 'path'
import open from 'open'
import storage from 'electron-json-storage'

const fs = require('fs-extra')
const isDevelopment = process.env.NODE_ENV !== 'production'

// 保存到最近文件
const RECENT_FILE_LIST = 'recentFileList'
const saveToRecent = file => {
  let list = removeFileInRecent()
  list.push(file)
  storage.set(RECENT_FILE_LIST, list)
}
const getRecent = () => {
  let res = storage.getSync(RECENT_FILE_LIST)
  return Array.isArray(res) ? res : []
}
const clearRecent = () => {
  storage.remove(RECENT_FILE_LIST)
}
const removeFileInRecent = (file) => {
  let list = getRecent()
  let index = list.find(item => {
    return item === file
  })
  if (index !== -1) {
    list.splice(index, 1)
  }
  storage.set(RECENT_FILE_LIST, list)
  return list
}
// clearRecent()

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

// 创建主页面
let mainWindow = null
async function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    frame: false,
    titleBarStyle: 'hiddenInset',
    webPreferences: {
      webSecurity: false,
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await mainWindow.loadURL(process.env.WEBPACK_DEV_SERVER_URL + '/#/workbenche')
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    mainWindow.loadURL('app://./index.html/#/workbenche')
  }
}

// 通知主页面刷新最近文件列表
const notifyMainWindowRefreshRecentFileList = () => {
  mainWindow.webContents.send('refreshRecentFileList')
}

// 监听事件
const bindEvent = () => {
  // 新建编辑页面
  const openIds = []
  ipcMain.on('create', async (event, id) => {
    openIds.push(id)
    const win = new BrowserWindow({
      width: 1200,
      height: 800,
      frame: false,
      titleBarStyle: 'hiddenInset',
      webPreferences: {
        webSecurity: false,
        nodeIntegration: true,
        enableRemoteModule: true,
        contextIsolation: true,
        preload: path.join(__dirname, 'preload.js')
      }
    })
    win.on('closed', () => {
      let index = openIds.find(item => {
        return item === id
      })
      if (index !== -1) {
        openIds.splice(index, 1)
      }
    })
    if (process.env.WEBPACK_DEV_SERVER_URL) {
      // Load the url of the dev server if in development mode
      win.loadURL(
        process.env.WEBPACK_DEV_SERVER_URL + '/#/workbenche/edit/' + id
      )
      if (!process.env.IS_TEST) win.webContents.openDevTools()
    } else {
      // Load the index.html when not in development
      win.loadURL('app://./index.html/#/workbenche/edit/' + id)
    }
  })

  // 保存文件
  const idToFilePath = {}
  ipcMain.handle('save', async (event, id, data) => {
    if (!idToFilePath[id]) {
      const webContents = event.sender
      const win = BrowserWindow.fromWebContents(webContents)
      const res = dialog.showSaveDialogSync(win, {
        title: '保存',
        defaultPath: '未命名.smm',
        filters: [{ name: '思维导图', extensions: ['smm'] }]
      })
      if (res) {
        idToFilePath[id] = res
        fs.writeFile(res, data)
        saveToRecent(res)
        notifyMainWindowRefreshRecentFileList()
        return path.parse(idToFilePath[id]).name
      }
    } else {
      fs.writeFile(idToFilePath[id], data)
    }
  })

  // 重命名文件
  ipcMain.handle('rename', async (event, id, name) => {
    if (!idToFilePath[id]) {
      return
    }
    let oldPath = idToFilePath[id]
    let { base, ...oldPathData } = path.parse(oldPath)
    oldPathData.name = name
    let newPath = path.format(oldPathData)
    idToFilePath[id] = newPath
    await fs.rename(oldPath, newPath)
    notifyMainWindowRefreshRecentFileList()
  })

  // 处理缩放事件
  ;['minimize', 'maximize', 'unmaximize', 'close'].forEach(item => {
    ipcMain.on(item, event => {
      const webContents = event.sender
      const win = BrowserWindow.fromWebContents(webContents)
      win[item]()
    })
  })

  // 使用默认浏览器打开指定url
  ipcMain.on('openUrl', (event, url) => {
    open(url)
  })

  // 获取最近文件列表
  ipcMain.handle('getRecentFileList', () => {
    return getRecent().map(item => {
      let data = path.parse(item)
      return {
        url: item,
        dir: data.dir,
        name: data.name
      }
    })
  })

  // 打开指定目录
  ipcMain.on('openFileInDir', (event, file) => {
    shell.showItemInFolder(file)
  })

  // 删除指定文件
  ipcMain.handle('deleteFile', (event, file) => {
    let res = ''
    let id = Object.keys(idToFilePath).find(item => {
      console.log(item, idToFilePath[item])
      return idToFilePath[item] === file
    })
    let index = -1
    if (id) {
      index = openIds.findIndex(item => {
        return item === id
      })
    }
    console.log(file, id, index)
    if (index === -1) {
      res = fs.rmSync(file)
      if (res) {
        removeFileInRecent(file)
      }
    } else {
      res = '该文件正在编辑，请关闭后再试'
    }
    return res
  })
}

// 关闭所有窗口后退出
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createMainWindow()
    bindEvent()
  }
})

app.on('ready', async () => {
  createMainWindow()
  bindEvent()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', data => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}
