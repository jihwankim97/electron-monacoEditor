const { BrowserWindow } = require('electron');
const path = require('path');

async function createWindow(width, height) {
  //console.log(`window size : ${width}, ${height}`);
  const win = new BrowserWindow({
    width: width,
    height: height,
    icon: path.join(__dirname, '..', 'public', 'favicon.ico'),
    show: false,
    webPreferences: {
      preload: path.join(__dirname, 'Preload.js'),
    },
  });

 
    win.loadURL('http://127.0.0.1:3000');
    win.webContents.openDevTools({ mode: 'detach' });
  

  win.once('ready-to-show', () => {
    win.show();
  });
}

module.exports = createWindow;
