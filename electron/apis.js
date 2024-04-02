const { ipcMain } = require("electron");
const fs = require("fs");
const { readDirectory } = require("./scriptApi/readDirStructure.cjs");
const apis = {
  init: () => {
    ipcMain.handle("fs:writeFile", async (e, ...args) =>
      fs.promises.writeFile(...args)
    );

    ipcMain.handle("fs:readFileSync", (e, ...args) => fs.readFileSync(...args));

    ipcMain.handle("fs:readdirStructure", async (event, data) => {
      return await readDirectory(data);
    });

 

    ipcMain.handle("GetprojectPath", () => __dirname);
    
  },
};

module.exports = apis;
