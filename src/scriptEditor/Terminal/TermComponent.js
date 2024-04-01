import React, { useEffect, useRef } from 'react';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import 'xterm/css/xterm.css';

const TermComponent = () => {
  const terminalRef = useRef(null);

  useEffect(() => {
    const term = new Terminal({
      cursorBlink: true,
      fontFamily: '"Fira Code", monospace',
      fontSize: 14,
    });
    const fitAddon = new FitAddon();
    term.loadAddon(fitAddon);
    term.open(terminalRef.current);

    // 화면 크기가 변경될 때마다 fitAddon을 사용해 터미널 크기 조정
    const fitTerminal = () => fitAddon.fit();
    fitTerminal();

    window.electron.sendDataToMain(' \r');

    window.electron.receiveDataFromMain((data) => {
      term.write(data);
    });

    term.onData((data) => {
      window.electron.sendDataToMain(data);
    });

    window.addEventListener('resize', fitTerminal);

    // ResizeObserver를 사용하여 터미널 컨테이너의 크기 변경 감지
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        requestAnimationFrame(() => {
          fitAddon.fit();
        });
      }
    });
    resizeObserver.observe(terminalRef.current);

    return () => {
      window.removeEventListener('resize', fitTerminal);
      resizeObserver.disconnect(); // 컴포넌트 언마운트 시 Observer 해제
    };
  }, []);

  return (
    <div
      ref={terminalRef}
      className="terminal-container"
      style={{ width: '100%', height: '100%' }}
    ></div>
  );
};

export default TermComponent;
