const pty = require('node-pty');
const { BrowserWindow, ipcMain } = require('electron');

const createTerminal = () => {

  const shell = pty.spawn(
    process.platform === 'win32' ? 'powershell.exe' : 'bash',
    [],
    {
      name: 'xterm-color',
      cwd: process.env.PWD,
      env: process.env,
    },
  );

  ipcMain.on('terminal-start', () => {
    if (process.platform === 'win32') {
      shell.write('\r');
    } else {
      shell.write('\r');
    }
  });

  shell.on('data', function (data) {
    BrowserWindow.getAllWindows().forEach(async (elem) => {
      elem?.webContents.send('terminal-incData', data);
    });
  });

  ipcMain.on('terminal-toServer', (event, data) => {
    shell.write(data);
  });
};
module.exports = createTerminal;
