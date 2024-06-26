const { contextBridge, ipcRenderer } = require("electron");
window.ipcRenderer = require("electron").ipcRenderer;

contextBridge.exposeInMainWorld("electron", {
  //Terminal브릿지
  sendDataToMain: (data) => ipcRenderer.send("terminal-toServer", data),
  receiveDataFromMain: (callback) =>
    ipcRenderer.on("terminal-incData", (event, data) => callback(data)),
  terminalStart: () => ipcRenderer.send("terminal-start"),
  //-----------------------

 //chokiWatcher 브릿지
 onFileChange: (callback) => {
  ipcRenderer.on('file-changed', (event, ...args) => callback(...args));
},
startWatcher: (path) => ipcRenderer.send('start-watcher', path),
  
});
//system interface
contextBridge.exposeInMainWorld("system", {
  writeFile: async (...args) => ipcRenderer.invoke("fs:writeFile", ...args), //

  readFileSync: (...args) => ipcRenderer.invoke("fs:readFileSync", ...args), //

  getDirStructure: (...args) =>
    ipcRenderer.invoke("fs:readdirStructure", ...args), //

    GetprojectPath: () =>
    ipcRenderer.invoke("GetprojectPath"), //
});
