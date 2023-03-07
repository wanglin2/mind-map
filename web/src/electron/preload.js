const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('platform', process.platform)

contextBridge.exposeInMainWorld('electronAPI', {
    minimize: () => ipcRenderer.send('minimize'),
    maximize: () => ipcRenderer.send('maximize'),
    unmaximize: () => ipcRenderer.send('unmaximize'),
    close: () => ipcRenderer.send('close'),
    createNewEditPage: (id) => ipcRenderer.send('createNewEditPage', id),
    activeEditPage: (id) => ipcRenderer.send('activeEditPage', id),
})