import { BrowserWindow, ipcMain, shell } from 'electron'
import { saveClientConfig, getClientConfig } from './storage'
import { execSync } from 'child_process'

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
    shell.openPath(url)
  })

  // 保存客户端配置
  ipcMain.handle('saveClientConfig', async (event, config) => {
    const res = await saveClientConfig(config)
    return res
  })

  // 获取客户端配置
  ipcMain.handle('getClientConfig', () => {
    return getClientConfig()
  })

  // 获取机器码
  ipcMain.handle('getClientUUID', () => {
    try {
      if (process.platform === 'win32') {
        const stdout = execSync('wmic csproduct get uuid', {
          windowsHide: true
        })
        return stdout
          .toString()
          .split('\n')[1]
          .trim()
      } else if (process.platform === 'darwin') {
        const stdout = execSync('wmic csproduct get uuid', {
          windowsHide: true
        })
        return stdout
          .toString()
          .split('\n')[1]
          .trim()
      } else if (process.platform === 'linux') {
        if (require('fs').existsSync('/etc/machine-id')) {
          return require('fs')
            .readFileSync('/etc/machine-id')
            .toString()
            .trim()
        }
        const stdout = execSync('sudo dmidecode -s system-uuid', {
          timeout: 1000
        })
        return stdout.toString().trim()
      }
    } catch (e) {
      return [
        process.arch,
        process.env.COMPUTERNAME || process.env.HOSTNAME,
        Math.random()
          .toString(36)
          .slice(2)
      ].join(':')
    }
  })

  //
  ipcMain.handle('openExternal', (event, url) => {
    return new Promise((resolve, reject) => {
      shell
        .openExternal(url)
        .then(() => {
          resolve()
        })
        .catch(err => {
          console.error('openExternal失败:', err)
          reject(err)
        })
    })
  })
}
