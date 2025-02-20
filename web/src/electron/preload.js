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
  save: (id, data, fileName, defaultPath) =>
    ipcRenderer.invoke('save', id, data, fileName, defaultPath),
  rename: (id, name) => ipcRenderer.invoke('rename', id, name),
  openUrl: url => ipcRenderer.send('openUrl', url),
  addRecentFileList: fileList =>
    ipcRenderer.invoke('addRecentFileList', fileList),
  getRecentFileList: () => ipcRenderer.invoke('getRecentFileList'),
  clearRecentFileList: () => ipcRenderer.invoke('clearRecentFileList'),
  removeFileInRecent: file => ipcRenderer.invoke('removeFileInRecent', file),
  removeMultiFileInRecent: fileList =>
    ipcRenderer.invoke('removeMultiFileInRecent', fileList),
  openFileInDir: file => ipcRenderer.invoke('openFileInDir', file),
  deleteFile: file => ipcRenderer.invoke('deleteFile', file),
  deleteMultiFile: fileList => ipcRenderer.invoke('deleteMultiFile', fileList),
  onRefreshRecentFileList: callback =>
    ipcRenderer.on('refreshRecentFileList', callback),
  openFile: file => ipcRenderer.invoke('openFile', file),
  selectOpenFile: () => ipcRenderer.invoke('selectOpenFile'),
  copyFile: file => ipcRenderer.invoke('copyFile', file),
  selectFile: (openDirectory, relativePath) =>
    ipcRenderer.invoke('selectFile', openDirectory, relativePath),
  openPath: (path, relativePath) =>
    ipcRenderer.invoke('openPath', path, relativePath),
  saveClientConfig: config => ipcRenderer.invoke('saveClientConfig', config),
  getClientConfig: () => ipcRenderer.invoke('getClientConfig'),
  getIsMaximize: id => ipcRenderer.invoke('getIsMaximize', id),
  selectOpenFolder: () => ipcRenderer.invoke('selectOpenFolder'),
  getFilesInDir: (dir, ext) => ipcRenderer.invoke('getFilesInDir', dir, ext),
  checkFileExist: filePath => ipcRenderer.invoke('checkFileExist', filePath),
  getClientUUID: () => ipcRenderer.invoke('getClientUUID'),
  openExternal: url => ipcRenderer.invoke('openExternal', url),
})
