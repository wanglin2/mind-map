const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('platform', process.platform)
contextBridge.exposeInMainWorld('IS_ELECTRON', true)

contextBridge.exposeInMainWorld('electronAPI', {
  minimize: () => ipcRenderer.send('minimize'),
  maximize: () => ipcRenderer.send('maximize'),
  unmaximize: () => ipcRenderer.send('unmaximize'),
  close: () => ipcRenderer.send('close'),
  destroy: () => ipcRenderer.send('destroy'),
  create: id => ipcRenderer.send('create', id),
  getFileContent: id => ipcRenderer.invoke('getFileContent', id),
  getFilePath: id => ipcRenderer.invoke('getFilePath', id),
  save: (id, data, fileName) => ipcRenderer.invoke('save', id, data, fileName),
  rename: (id, name) => ipcRenderer.invoke('rename', id, name),
  openUrl: url => ipcRenderer.send('openUrl', url),
  addRecentFileList: fileList =>
    ipcRenderer.invoke('addRecentFileList', fileList),
  getRecentFileList: () => ipcRenderer.invoke('getRecentFileList'),
  clearRecentFileList: () => ipcRenderer.invoke('clearRecentFileList'),
  openFileInDir: file => ipcRenderer.invoke('openFileInDir', file),
  deleteFile: file => ipcRenderer.invoke('deleteFile', file),
  onRefreshRecentFileList: callback =>
    ipcRenderer.on('refreshRecentFileList', callback),
  openFile: file => ipcRenderer.invoke('openFile', file),
  selectOpenFile: () => ipcRenderer.send('selectOpenFile'),
  copyFile: file => ipcRenderer.invoke('copyFile', file),
  selectFile: (openDirectory, relativePath) =>
    ipcRenderer.invoke('selectFile', openDirectory, relativePath),
  openPath: (path, relativePath) =>
    ipcRenderer.invoke('openPath', path, relativePath),
  saveClientConfig: config => ipcRenderer.invoke('saveClientConfig', config),
  getClientConfig: () => ipcRenderer.invoke('getClientConfig')
})
