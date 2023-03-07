import { DraggableProvidedDraggableProps } from "react-beautiful-dnd";
import styled, { css } from "styled-components";

interface Props {
  isDragging: boolean;
  draggingStyles: DraggableProvidedDraggableProps;
}

export const Container = styled.div<Props>`
  display: flex;
  justify-content: center;

  width: 100%;
  min-height: 60px;

  color: #363636;
  border-radius: 4px; 
  background-color: #fff;
  /* border-color: ${({isDragging}) => isDragging ? "red" : "transparent"}; */
  box-shadow: ${({isDragging}) => isDragging ? "0px 10px 5px rgba(0, 0, 0, 0.15)" : "0px 1px 1px rgba(0, 0, 0, 0.1)"};
  ${({draggingStyles}) => ({...draggingStyles.style})}


  ${({isDragging}) => isDragging ? css`
    rotate: 5deg;    
  ` : css`
    rotate: 0deg;
  `}
  
`;

interface StatusProps {
  type: "in progress" | "completed"
}

export const Status = styled.div<StatusProps>`
  width: 7px;
  height: 100%;
  margin-bottom: 8px;
  background-color: ${({type}) => type === "completed" ? "#00B37E" : "#FBA94C"};
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
`;

export const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 8px;

  .header {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 4px;

    button {
      all: unset;
      cursor: pointer;
    }
  }
`;

export const Heading = styled.h2`
  color: #344449;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 0.05em;
`;

export const Text = styled.p`
  color: #718797;
  font-size: 12px;
  height: 18px;
`;

