import React from 'react';

import TreePanel from './script/fileTree/TreePanel';
import './ScriptEditor.Main.css';
import TabsEditor from './TabsEditor';
import Split from 'react-split';
import './Scrolbar.css';
import Footer from './Footer';
import TermComponent from './Terminal/TermComponent';

const ScriptEditorMain = () => {

  return (
    <div>
      <Split
        sizes={[10, 90]}
        minSize={100}
        expandToMin={false}
        gutterSize={3}
        className="split-flex"
        direction="horizontal"
      >
        <div className="panel">
          <TreePanel />
        </div>
        <Split
          sizes={[75, 25]}
          minSize={50}
          expandToMin={false}
          gutterSize={3}
          direction="vertical"
          className="split-flex-inner"
        >
          <div className="panel" style={{ overflowY: 'hidden' }}>
            <TabsEditor />
          </div>
          <div className="panel" style={{ overflowY: 'hidden' }}>
            
          <TermComponent />  
          </div>
        </Split>
      </Split>
      <Footer />
    </div>
  );
};

export default ScriptEditorMain;
