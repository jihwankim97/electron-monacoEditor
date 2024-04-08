const { app, globalShortcut } = require("electron");

const createWindow = require("./createWindow.js");
const createTerminal = require("./createTerminal.js");
const setWatcher = require("./setChokidar.js");
app.once("ready", () => {
  //module load
  require("./apis.js").init();

  createWindow(1280, 720);
  createTerminal();

});

// 앱이 종료될 때 전역 단축키 등록을 해제.
app.on("will-quit", () => {
  globalShortcut.unregisterAll();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
