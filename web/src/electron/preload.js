const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('platform', process.platform)
contextBridge.exposeInMainWorld('IS_ELECTRON', true)

contextBridge.exposeInMainWorld('electronAPI', {
    minimize: () => ipcRenderer.send('minimize'),
    maximize: () => ipcRenderer.send('maximize'),
    unmaximize: () => ipcRenderer.send('unmaximize'),
    close: () => ipcRenderer.send('close'),
    create: (id) => ipcRenderer.send('create', id),
    save: (id, data) => ipcRenderer.send('save', id, data),
})