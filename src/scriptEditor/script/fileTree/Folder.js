import React, { useState } from 'react';
import ItemNode from './ItemNode';
import './Folder.css';
import './File.css';
import { useRecoilState } from 'recoil';
import { selectedFile } from '../../recoil/atom';

//MUI
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import FolderIcon from '@mui/icons-material/Folder';

const Folder = ({ name, children, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [r_selectreItem] = useRecoilState(selectedFile);

  const iconClassName = `folder-name ${
    r_selectreItem === name ? 'selected' : ''
  }`;
  const className = `file-name ${r_selectreItem === name ? 'selected' : ''}`;
  return (
    <div>
      <span
        onClick={() => {
          setIsOpen(!isOpen);
          onSelect(name);
        }}
        className={iconClassName}
      >
        {isOpen ? <ExpandMoreIcon /> : <ChevronRightIcon />}{' '}
        <FolderIcon fontSize="small" style={{ marginRight: 6 , fontSize: '18px'}} />{' '}
        <span className={className}>{name}</span>
      </span>
      {isOpen && children && (
        <div style={{ marginLeft: '15px' }}>
          {children.map((child, index) => (
            <ItemNode key={index} {...child} onSelect={onSelect} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Folder;
