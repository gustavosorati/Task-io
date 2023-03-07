import styled from 'styled-components'

export const Main = styled.main`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  overflow: hidden;
  position: relative;
  background-color: ${({theme}) => theme.colors.gray[700]};

  > header {
    width: 100%;
    max-width: 968px;
    margin-bottom: 2rem;
  }
`;

export const Container = styled.div`
  width: 100%;
  max-width: 968px;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Column = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

export const ColumnContent = styled.div`
  width: 100%;
  min-width: 300px;
  height: 400px;
  gap: 20px;
  padding: 16px;

  background-color: #F3F5F6;
  display: flex;
  flex-direction: column;
  border-radius: 8px;

  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({theme}) => theme.colors.orange[700]};
    padding: 0 8px;
  }
`

export const Heading = styled.h2`
`;

export const BtnNewTask = styled.button`
  all: unset;
  box-sizing: border-box;

  width: 300px;
  display: flex;
  align-items: center;
  gap: 1rem;
  
  padding: 1rem;
  margin-top: 1rem;
  color: #344449;
  border-radius: 6px;
  background-color: #F3F5F6;
  cursor: pointer;

  &:hover {
    background-color: #fff;
  }
`;