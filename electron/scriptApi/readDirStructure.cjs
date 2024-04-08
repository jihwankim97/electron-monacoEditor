const fs = require('fs');
const path = require('path');

// 비동기 방식으로 폴더 내용을 읽어오는 함수
function readDirectory(directoryPath) {
  return new Promise((resolve, reject) => {
    fs.readdir(directoryPath, { withFileTypes: true }, async (err, entries) => {
      if (err) {
        console.error('Error reading directory', err);
        reject(err);
        return;
      }
      const folders = entries.filter((entry) => entry.isDirectory());
      const files = entries.filter((entry) => entry.isFile());

      folders.sort((a, b) => a.name.localeCompare(b.name));
      files.sort((a, b) => a.name.localeCompare(b.name));

      const sortedEntries = [...folders, ...files];

      const fileStructure = await Promise.all(
        sortedEntries.map(async (entry) => {
          const fullPath = path.join(directoryPath, entry.name);
          if (entry.isDirectory()) {
            const children = await readDirectory(fullPath);
            return {
              type: 'folder',
              name: entry.name,
              children,
              path: fullPath,
            };
          } else {
            return { type: 'file', name: entry.name, path: fullPath };
          }
        }),
      );

      resolve(fileStructure);
    });
  });
}

module.exports = { readDirectory };
