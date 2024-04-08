export const findPathByName = (fileNodes, targetName) => {
    for (const node of fileNodes) {
      if (node.name === targetName) {
        return node.path;
      }
      if (node.children) {
        const foundPath = findPathByName(node.children, targetName);
        if (foundPath) {
          return foundPath;
        }
      }
    }
    return undefined;
  };


  export const findTabPathByName = (fileNodes, targetName) => {
    const target_tab = fileNodes.find(
      (item) => item.title === targetName,
    );
    
    return target_tab;
  };