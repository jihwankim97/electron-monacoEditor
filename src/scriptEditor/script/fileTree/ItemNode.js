import React from 'react';
import Folder from './Folder';
import File from './File';

const ItemNode = ({ type, name, children, path, onSelect }) => {
  const handleSelect = (name) => {
    onSelect(name);
  };

  return type === 'folder' ? (
    <Folder name={name} children={children} path={path} onSelect={onSelect} />
  ) : (
    <File name={name} path={path} onSelect={handleSelect} />
  );
};

export default ItemNode;
