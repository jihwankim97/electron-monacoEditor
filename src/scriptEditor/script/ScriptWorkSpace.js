// 필요한 모듈 및 라이브러리를 임포트합니다.
import React, { useState, useEffect, useRef } from 'react';
import { useRecoilState } from 'recoil';
import MonacoEditor from 'react-monaco-editor';
import * as monaco from 'monaco-editor';
import {
  tabTable,
  currentTab,
  directoryContentState,
  deleteTab,
} from '../recoil/atom';
import system from '../../system/system';
import _ from 'lodash';
import DeleteConfirmationModal from './alert/DeleteConfirmationModal';

function ScriptWorkSpace() {
  const [r_tabTable, set_r_tabTable] = useRecoilState(tabTable);
  const [directoryContent] = useRecoilState(directoryContentState);
  const [r_currentTab, set_r_currentTab] = useRecoilState(currentTab);
  const [editorInstance, setEditorInstance] = useState(null);
  const directoryContentRef = useRef(directoryContent);
  const currentTabRef = useRef(r_currentTab);
  const editorRef = useRef(null); // 에디터 인스턴스를 저장하기 위한 ref
  const containerRef = useRef(null); // 에디터를 포함할 부모 컨테이너의 ref
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [r_deleteTab, set_r_deleteTab] = useRecoilState(deleteTab);
  const [isModalOpen, setIsModalOpen] = useState(false);

//--------모나코 기본세팅------
  useEffect(() => {
    // 자바 언어 특징 활성화
    monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
      target: monaco.languages.typescript.ScriptTarget.ES2015,
      allowNonTsExtensions: true,
      moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
      module: monaco.languages.typescript.ModuleKind.CommonJS,
    });
  }, []);

  const options = {
    selectOnLineNumbers: true,
    minimap: {
      enabled: true,
      side: 'right',
      size: 'proportional',
    },
  };

//-------------------------------

//---------키보드 리스너를 위한 스테이트 업데이트-----------------
  useEffect(() => {
    directoryContentRef.current = directoryContent;
  }, [directoryContent]);

  useEffect(() => {
    currentTabRef.current = r_currentTab;
  }, [r_currentTab]);

 //-------------------------------


//------------탭 생성 로직-------------------
  useEffect(() => {
    if (editorInstance) {
      const activeTab = r_tabTable.find((tab) => tab.title === r_currentTab);
      if (activeTab) {
        let model = monaco.editor.getModel(
          monaco.Uri.parse(activeTab.modelUri),
        );
        if (!model) {
          model = monaco.editor.createModel(
            activeTab.content,
            'java',
            monaco.Uri.parse(activeTab.modelUri),
          );
        }
        editorInstance.setModel(model);
      } else {
        editorInstance.setModel(null);
      }
    }
  }, [r_currentTab, r_tabTable, editorInstance]); // 탭 테이블 변경에도 반응하도록 의존성 배열에 추가


//-------------------------------
//-------------탭 삭제 로직------------------

useEffect(() => {
  const tabToDelete = r_tabTable.find((tab) => tab.title === r_deleteTab);

  if (tabToDelete) {
    if (tabToDelete.isSaved) {
      handleDeleteTab();
    } else {
      setIsModalOpen(true);
    }
  }
}, [r_deleteTab]);

const handleSave = async () => {
  const scriptData = findPathByName(
    directoryContent,
    r_deleteTab,
  );
  await saveFile(scriptData, editorInstance.getValue());
  handleDeleteTab();
  setIsModalOpen(false); // 모달 닫기
};

// '저장 안 함(N)' 버튼 클릭 핸들러
const handleDeleteTab = () => {
  const tabToDelete = r_tabTable.find((tab) => tab.title === r_deleteTab);

  if (tabToDelete) {
    const modelToDelete = monaco.editor.getModel(
      monaco.Uri.parse(tabToDelete.modelUri),
    );
    if (modelToDelete) {
      modelToDelete.dispose();
    }

    const newTabTable = r_tabTable.filter((tab) => tab.title !== r_deleteTab);

    set_r_tabTable(newTabTable);

    if (r_currentTab === r_deleteTab) {
      set_r_currentTab(newTabTable.length > 0 ? newTabTable[0].title : null);
    }
    set_r_deleteTab(null);
  }
  handleClose();
  setIsModalOpen(false); // 모달 닫기
};

// '취소' 버튼 클릭 핸들러
const handleClose = () => {
  set_r_deleteTab(null);
  setIsModalOpen(false); // 모달 닫기
};


//-------------------------------
//------------저장 -------------------
  const saveFile = async (path, content) => {
    try {
      await system.writeFile(path, content);
      const tabTableClone = _.cloneDeep(r_tabTable);
      const idx = tabTableClone.findIndex(
        (tab) => tab.title === currentTabRef.current,
      );
      tabTableClone[idx].isSaved = true;
      tabTableClone[idx].content = editorInstance.getValue();

      set_r_tabTable(tabTableClone);
    } catch (error) {
      console.error('Error save File:', error);
    }
  };

  useEffect(() => {
    const handleKeyDown = async (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 's') {
        event.preventDefault(); // 브라우저 기본 동작 방지
        const scriptData = findPathByName(
          directoryContentRef.current,
          currentTabRef.current,
        );
        if (scriptData && editorInstance) {
          await saveFile(scriptData, editorInstance.getValue());
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [editorInstance, r_tabTable, set_r_tabTable]); // 의존성 배열에 필요한 변수들을 추가하거나 제거하세요.

  const findPathByName = (fileNodes, targetName) => {
    for (const node of fileNodes) {
      if (node.name === targetName) {
        return node.path;
      }
      if (node.children) {
        const foundPath = findPathByName(node.children, targetName);
        if (foundPath) {
          return foundPath;
        }
      }
    }
    return undefined;
  };
//-------------------------------

//--------------에디터 윈도우 크기 조절-----------------
  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        setContainerSize({ width, height });
        if (editorRef.current) {
          editorRef.current.layout({ width, height });
        }
      }
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => resizeObserver.disconnect();
  }, []);
//-------------------------------

//--------------에디터 상태 갱신-----------------
  const handleEditorDidMount = (editor, monaco) => {
    setEditorInstance(editor);
    editorRef.current = editor;

    editor.onDidChangeModelContent(() => {
      const currentContent = editor.getValue();
      if (currentContent)
        set_r_tabTable((prevTabTable) => {
          const newTabTable = prevTabTable.map((tab, index) => {
            if (tab.title === currentTabRef.current) {
              const isSaved = tab.content === currentContent;
              return { ...tab, isSaved };
            }
            return tab;
          });
          return newTabTable;
        });
    });
  };
//--------------에디터 상태 갱신-----------------

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%' }}>
      {r_currentTab && (
        <MonacoEditor
          width={containerSize.width}
          height={containerSize.height}
          language="java"
          theme="vs-dark"
          options={options}
          editorDidMount={handleEditorDidMount}
        />
      )}

      <DeleteConfirmationModal
      targetTiTle={r_currentTab}
        isOpen={isModalOpen}
        onSave={handleSave}
        onDontSave={handleDeleteTab}
        onClose={handleClose}
      />
    </div>
  );
}

export default ScriptWorkSpace;
