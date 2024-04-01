const { app, BrowserWindow, ipcMain } = require('electron');


let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      preload: `${__dirname}/preload.js` 
    }
  });

  mainWindow.loadURL('http://localhost:3000');

}

app.on('ready', createWindow);
