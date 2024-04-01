import React from 'react';

const DefWorkSpace = () => {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          fontSize: '65px',
          color: '#585858',
          fontFamily: 'Consolas, monospace',
          fontWeight: 'bold',
        }}
      >
        {/* WORK SPACE */}
      </div>
      <div
        style={{
          whiteSpace: 'nowrap',
          fontSize: '15px',
          color: '#E6E6E6',
          fontWeight: 'normal',
          marginTop: '20px',
        }}
      >
        ▶️ COMPILE : Top menu → Tool → Script Compile
      </div>
      <div
        style={{
          whiteSpace: 'nowrap',
          fontSize: '15px',
          color: '#E6E6E6',
          fontWeight: 'normal',
          marginTop: '20px',
        }}
      >
        ▶️ RUN : Top menu → Tool → Run Script
      </div>
      <div
        style={{
          whiteSpace: 'nowrap',
          fontSize: '15px',
          color: '#E6E6E6',
          fontWeight: 'normal',
          marginTop: '20px',
        }}
      >
        ▶️ EXIT : Top menu → Window
      </div>
    </div>
  );
};

export default DefWorkSpace;
