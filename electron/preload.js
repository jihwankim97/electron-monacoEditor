const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  sendDataToMain: (data) => ipcRenderer.send('terminal-toServer', data),
  receiveDataFromMain: (callback) => ipcRenderer.on('terminal-incData', (event, data) => callback(data))
});
