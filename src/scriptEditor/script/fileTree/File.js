import React from 'react';
import { useRecoilState } from 'recoil';
import { selectedFile, currentTab, tabTable } from '../../recoil/atom';
import './File.css';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import system from '../../../system/system';
import { v4 as uuidv4 } from 'uuid';

const File = ({ name, path, onSelect }) => {
  const [r_selectedItem] = useRecoilState(selectedFile);
  const [r_currentTab, set_r_currentTab] = useRecoilState(currentTab);
  const [r_tabTable, set_r_tabTable] = useRecoilState(tabTable);

  const className = `file-name ${
    name === r_currentTab
      ? 'currentTab'
      : r_selectedItem === name
      ? 'selected'
      : ''
  }`;

  function generateUniqueId() {
    return uuidv4();
  }

  const createTab = async () => {
    const tebCheck = r_tabTable.findIndex((tab) => tab.title === name);

    const readDirectory = async (path) => {
      try {
        const result = await system.readFileSync(path);
        const decoder = new TextDecoder('utf-8');
        const codeData = decoder.decode(result);
        return codeData;
      } catch (error) {
        console.error('Error reading directory:', error);
        return ''; // 에러 발생 시 빈 문자열 반환
      }
    };

    if (tebCheck < 0) {
      const content = await readDirectory(path);
      const uniqueId = generateUniqueId();
      const newTable = [
        ...r_tabTable,
        {
          id: `${uniqueId}`,
          title: name,
          filePath: path,
          content: content,
          isSaved:true,
          modelUri: `inmemory://model/${uniqueId}`,
        },
      ];

      set_r_tabTable(newTable);
    }
    set_r_currentTab(name);
  };

  return (
    <div
      onDoubleClick={() => {
        createTab();
      }}
      onClick={() => onSelect(name)}
    >
      <span className={className}>
      <InsertDriveFileIcon fontSize="small" style={{ marginRight: 6, fontSize: '16px' }} />{' '}
        {name}
      </span>
    </div>
  );
};

export default File;
