import React, { useEffect } from "react";
import ItemNode from "./ItemNode";
import { useRecoilState } from "recoil";
import { selectedFile, directoryContentState } from "../../recoil/atom";
import system from "../../../system/system";

import Header from "./Header";
import "./TreePanel.css";

const TreePanel = () => {
  const [, setSelectedItem] = useRecoilState(selectedFile);

  const [directoryContent, setDirectoryContent] = useRecoilState(
    directoryContentState
  );

  useEffect(() => {
    const init = async () => {
      try {
        const projectPath = (await system.GetprojectPath()) + "../../";

        const result = await system.getDirStructure(projectPath);
        setDirectoryContent(result);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    init();
  }, []);

  const handleSelect = (name) => {
    setSelectedItem(name);
  };

  return (
    <div className="tree-panel-container">
      <Header />
      <div className="scrollable-content">
        {directoryContent?.map((node, index) => (
          <ItemNode key={index} {...node} onSelect={handleSelect} />
        ))}
      </div>
    </div>
  );
};

export default TreePanel;
