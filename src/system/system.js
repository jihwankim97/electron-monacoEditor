const system = {
  writeFile: async (path = null, data = null, option = null) => {
    return window.system.writeFile(path, data, option);
  },

  readFileSync: (path = null) => window.system.readFileSync(path),

  getDirStructure: (srcPath) => window.system.getDirStructure(srcPath),

  GetprojectPath: () => window.system.GetprojectPath(),
};

export default system;
