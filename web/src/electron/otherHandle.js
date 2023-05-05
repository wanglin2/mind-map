import { BrowserWindow, ipcMain } from 'electron'
import open from 'open'

export const bindOtherHandleEvent = () => {
  // 处理缩放事件
  ;['minimize', 'maximize', 'unmaximize', 'close', 'destroy'].forEach(item => {
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
}
