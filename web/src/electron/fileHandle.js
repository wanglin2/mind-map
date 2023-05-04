import {
    BrowserWindow,
    ipcMain,
    dialog,
    shell
} from 'electron'
import fs from 'fs-extra'
import path from 'path'
import { saveToRecent, clearRecent, removeFileInRecent, replaceFileInRecent, getRecent } from './storage'
import { v4 as uuid } from 'uuid'

export const bindFileHandleEvent = ({ mainWindow }) => {
    // 通知主页面刷新最近文件列表
    const notifyMainWindowRefreshRecentFileList = () => {
        mainWindow.webContents.send('refreshRecentFileList')
    }

    // 新建编辑页面
    const openIds = []
    const createEditWindow = async (event, id) => {
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
    }
    ipcMain.on('create', createEditWindow)

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
                    .then(() => {
                        notifyMainWindowRefreshRecentFileList()
                    })
                return path.parse(idToFilePath[id]).name
            }
        } else {
            fs.writeFile(idToFilePath[id], data)
        }
    })

    // 打开文件
    const openFile = (event, file) => {
        let id = uuid()
        idToFilePath[id] = file
        saveToRecent(file)
            .then(() => {
                notifyMainWindowRefreshRecentFileList()
            })
        createEditWindow(null, id)
    }
    ipcMain.on('openFile', openFile)

    // 选择打开本地文件
    ipcMain.on('selectOpenFile', (event) => {
        const res = dialog.showOpenDialogSync({
            title: '选择',
            filters: [{ name: '思维导图', extensions: ['smm'] }],
        })
        if (res && res[0]) {
            openFile(null, res[0])
        }
    })

    // 获取文件内容
    ipcMain.handle('getFileContent', (event, id) => {
        return new Promise((resolve) => {
            let file = idToFilePath[id]
            if (!file) {
                resolve(null)
                return
            }
            fs.readFile(file, { encoding: 'utf-8' }, (err, data) => {
                resolve({
                    name: path.parse(file).name,
                    content: JSON.parse(data)
                })
            })
        })
    })

    // 重命名文件
    ipcMain.handle('rename', (event, id, name) => {
        return new Promise((resolve) => {
            if (!idToFilePath[id]) {
                resolve('文件不存在')
                return
            }
            let oldPath = idToFilePath[id]
            let { base, ...oldPathData } = path.parse(oldPath)
            oldPathData.name = name
            let newPath = path.format(oldPathData)
            idToFilePath[id] = newPath
            fs.rename(oldPath, newPath, (err) => {
                if (err) {
                    resolve('重命名失败')
                } else {
                    replaceFileInRecent(oldPath, newPath).then(() => {
                        notifyMainWindowRefreshRecentFileList()
                        resolve()
                    })
                }
            })
        })
    })

    // 获取最近文件列表
    ipcMain.handle('getRecentFileList', () => {
        return getRecent().map(item => {
            console.log(item);
            let data = path.parse(item)
            return {
                url: item,
                dir: data.dir,
                name: data.name
            }
        })
    })

    // 清空最近文件列表
    ipcMain.handle('clearRecentFileList', async () => {
        try {
            clearRecent()
            return ''
        } catch (error) {
            return '清空失败'
        }
    })

    // 打开指定目录
    ipcMain.on('openFileInDir', (event, file) => {
        shell.showItemInFolder(file)
    })

    // 删除指定文件
    ipcMain.handle('deleteFile', (event, file) => {
        let res = ''
        let id = Object.keys(idToFilePath).find(item => {
            return idToFilePath[item] === file
        })
        let index = -1
        if (id) {
            index = openIds.findIndex(item => {
                return item === id
            })
        }
        if (index === -1) {
            res = fs.rmSync(file)
            if (!res) {
                removeFileInRecent(file)
            }
        } else {
            res = '该文件正在编辑，请关闭后再试'
        }
        return res
    })
}