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

  const init = async () => {
    try {
      const projectPath = (await system.GetprojectPath()) + "../../";

      const result = await system.getDirStructure(projectPath);
      setDirectoryContent(result);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const setWatcher = async () => {
    window.electron.startWatcher((await system.GetprojectPath()) + "../../");
    // 파일 시스템 변경 사항 수신
    window.electron.onFileChange((path) => {
      init(); //구조변경시 재탐색
    });
  };

  useEffect(() => {
    init();

    setWatcher();
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
