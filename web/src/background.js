'use strict'

import { app, protocol, BrowserWindow } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import path from 'path'
import { bindFileHandleEvent } from './electron/fileHandle'
import { bindOtherHandleEvent } from './electron/otherHandle'
import '../scripts/ai'

const isDevelopment = process.env.NODE_ENV !== 'production'

// 在应用程序准备就绪之前，必须注册方案
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

// 创建主页面
let mainWindow = null
async function createMainWindow() {
  createProtocol('app')
  // 如果是双击smm文件打开的话那么不用加载工作台页面
  if (initOpenFileQueue.length > 0) {
    return
  }
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
    // 如果处于开发模式，则加载开发服务器的url
    await mainWindow.loadURL(
      process.env.WEBPACK_DEV_SERVER_URL + '/#/workbenche'
    )
    if (!process.env.IS_TEST) mainWindow.webContents.openDevTools()
  } else { 
    // 非开发环境时加载index.html
    mainWindow.loadURL('app://./index.html/#/workbenche')
  }
}

// 绑定事件
let openFile = null
const bindEvent = () => {
  const res = bindFileHandleEvent({ mainWindow })
  openFile = res.openFile
  // 直接双击文件打开应用时，需要直接打开该文件编辑
  initOpenFileQueue.forEach(file => {
    openFile(null, file)
  })
  initOpenFileQueue = []
  bindOtherHandleEvent()
}

// 关闭所有窗口后退出
app.on('window-all-closed', () => {
  // 在macOS上，应用程序及其菜单栏通常保持活动状态，直到用户使用Cmd+Q明确退出
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // 在macOS上，当点击dock图标且没有其他窗口打开时，通常会在应用程序中重新创建一个窗口。
  if (BrowserWindow.getAllWindows().length === 0) {
    createMainWindow()
    // bindEvent()
  }
})

// Attempt to bind file opening #2
// https://stackoverflow.com/questions/62420427/how-do-i-make-my-electron-app-the-default-for-opening-files
// https://github.com/rchrd2/example-electron-file-association
// https://www.jianshu.com/p/a32542277b83
let initOpenFileQueue = []
app.on('will-finish-launching', () => {
  // Event fired When someone drags files onto the icon while your app is running 
  if (process.platform == 'win32') {
    const argv = process.argv
    if (argv) {
      argv.forEach(filePath => {
        if (filePath.indexOf('.smm') >= 0) {
          initOpenFileQueue.push(filePath)
        }
      })
    }
  } else {
    app.on('open-file', (event, file) => {
      if (app.isReady() === false) {
        initOpenFileQueue.push(file)
      } else {
        openFile(null, file)
      }
      event.preventDefault()
    })
  }
})

app.on('ready', async () => {
  createMainWindow()
  bindEvent()
})

// 在开发模式下，应父进程的请求干净地退出。
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
