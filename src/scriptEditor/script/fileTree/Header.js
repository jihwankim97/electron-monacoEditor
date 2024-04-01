import React from 'react';
import './TreePanel.css';


const Header = () => {

  return (
    <header className="editor-header">
      <div className="header-titles">
        <div className="header-title explorer-title">File Explorer</div>
        <div className="header-title editor-title">Files</div>
      </div>
    </header>
  );
};

export default Header;
