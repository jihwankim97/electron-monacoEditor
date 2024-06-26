import React, { useEffect, useRef } from 'react';
import { useRecoilState } from 'recoil';
import { tabTable, currentTab, deleteTab, directoryContentState } from './recoil/atom';
import { Nav, NavItem, CloseButton } from './Nav';
import ScriptWorkSpace from './script/ScriptWorkSpace';
import './Editor.css';
import DefWorkSpace from './DefWorkSpace';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { findPathByName, findTabPathByName } from './global/editorGlobal';


const TabsEditor = (props) => {
  const [r_tabTable, set_r_tabTable] = useRecoilState(tabTable);
  const [r_currentTab, set_r_currentTab] = useRecoilState(currentTab);
  const [r_deleteTab, set_r_deleteTab] = useRecoilState(deleteTab);
  const [hoverTab, setHoverTab] = React.useState(null); 
  const tabRefs = useRef({});
  const [directoryContent, setDirectoryContent] = useRecoilState(
    directoryContentState,
  );

  const changeTab = (tabId) => {
    set_r_currentTab(tabId);
  };

  const removeTab = (tabTitle, event) => {
    event.stopPropagation();
    set_r_deleteTab(tabTitle);

    if (!findTabPathByName(r_tabTable,tabTitle).isSaved) set_r_currentTab(tabTitle);
  };

  return (
    <div style={{ width: '100%', height: '100%' }}>
      {r_tabTable.length > 0 ? (
        <>
          <Nav>
            {r_tabTable.map((tab) => {
               const isPresentInDirectory = findPathByName(
                directoryContent,
                tab.title,
              );
              <NavItem
                key={tab.title}
                active={r_currentTab === tab.title? true : false}
                onClick={() => changeTab(tab.title)}
                ref={(el) => (tabRefs.current[tab.title] = el)}
                onMouseEnter={() => setHoverTab(tab.title)} 
                onMouseLeave={() => setHoverTab(null)} 
              >
                <InsertDriveFileIcon fontSize="small" style={{ marginRight: 6, fontSize: '16px' }} />
                <span
                    style={
                      isPresentInDirectory
                        ? {}
                        : { color: 'red', textDecoration: 'line-through' }
                    }
                  >
                    {tab.title}
                  </span>
                <CloseButton onClick={(event) => removeTab(tab.title, event)}>
                {(hoverTab === tab.title ? 'X' :(tab.isSaved ? (r_currentTab===tab.title? 'X' :'') : '●'))}
                </CloseButton>
              </NavItem>
})}
          </Nav>
          <div className="ScriptEditor">
            <ScriptWorkSpace treePanelWidth={props.treePanelWidth} />
          </div>
        </>
      ) : (
        <DefWorkSpace />
      )}
    </div>
  );
};

export default TabsEditor;
