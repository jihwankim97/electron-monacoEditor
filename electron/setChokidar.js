// main.js
const { app, BrowserWindow, ipcMain } = require('electron');
const chokidar = require('chokidar');

let watcher; // 전역 참조를 유지하여 감시자를 관리
const setWatcher = () => {
  const createWatcher = (path) => {
    console.log('Watching for file changes on: ', path);
    watcher = chokidar.watch(path, {
      ignored: /(^|[\/\\])\../, // 숨김 파일 무시
      persistent: true,
    });

    // 파일 내용이 변경되었을 때
    watcher.on('change', (path) => {
      sendFileEvent('file-changed', path);
    });

    // 파일이 추가되었을 때 (생성)
    watcher.on('add', (path) => {
      sendFileEvent('file-added', path);
    });

    // 파일이 삭제되었을 때
    watcher.on('unlink', (path) => {
      sendFileEvent('file-removed', path);
    });

    // 디렉토리가 추가되었을 때 (구조 변경)
    watcher.on('addDir', (path) => {
      sendFileEvent('directory-added', path);
    });

    // 디렉토리가 삭제되었을 때
    watcher.on('unlinkDir', (path) => {
      sendFileEvent('directory-removed', path);
    });

    // 에러 핸들링
    watcher.on('error', (error) => {
      console.error('Error watching file system: ', error);
      sendFileEvent('file-watcher-error', error.message);
    });
  };

  const sendFileEvent = (eventType, path) => {
    console.log(eventType, ' : ', path);
    BrowserWindow.getAllWindows().forEach((window) => {
      window.webContents.send('file-changed', path);
    });
  };

  ipcMain.on('start-watcher', (event, path) => {
    if (watcher) {
      watcher.close().then(() => createWatcher(path));
    } else {
      createWatcher(path);
    }
  });
};
module.exports = setWatcher;
