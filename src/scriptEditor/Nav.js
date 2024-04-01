import styled from 'styled-components';

export const Nav = styled.nav`
  display: flex;
  background-color: #161616;
  color: #d4d4d4;
  overflow-x: auto;
`;

export const NavItem = styled.button`
  border: none;
  background-color: ${({ active }) => (active ? '#1E1E1E' : '#2d2d2d')};
  color: ${({ active }) => (active ? '#E6E6E6' : '#848484')};
  padding: 5px 10px;
  display: flex;
  align-items: center;
  border-bottom: ${({ active }) => (active ? '1px solid #819FF7' : 'none')};
  &:focus {
    outline: none;
  }
`;

export const WrapButton = styled.button`
  height: 100%;
  display: flex;
  align-items: center;
  border: none;
  margin-left: auto;
  background-color: ${({ active }) => (active ? '' : '#2d2d2d')};

  &:focus {
    border: none;
    outline: none;
  }
`;

export const CloseButton = styled.div`
  width: 16px; 
  height: 16px; 
  margin-left: 8px;
  color: #c0c0c0;
  background-color: transparent;
  border: none;
  cursor: pointer;

  &:hover {
    color: #ffffff;
  }

`;
