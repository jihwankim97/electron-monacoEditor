import { atom } from 'recoil';

export const selectedFile = atom({
  key: 'selectedItem', 
  default: null, 
});

export const currentTab = atom({
  key: 'currentTab', 
  default: null, 
});

export const tabTable = atom({
  key: 'tabTable', 
  default: [], 
});


///////


export const directoryContentState = atom ({
  key: 'directoryContentState', // 고유한 키
  default: [], // 기본값
});


///////
export const deleteTab = atom ({
  key: 'deleteTab', // 고유한 키
  default: null, // 기본값
});