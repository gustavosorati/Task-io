import styled, { css } from "styled-components";

type ContainerProps = {
  visible: boolean;
}

export const Container = styled.form<ContainerProps>`
  top: 0;
  right: 0;
  position: absolute;

  width: 450px;
  height: 100vh;
  padding: 2rem;

  color: #333;
  background-color: #fff;
  box-shadow: -15px 0 0 rgba(0, 0, 0, .1);
  
  display: flex;
  flex-direction: column;
  gap: 20px;

  transition: all .2s;

  ${({visible}) => visible && css`
    transform: translateX(0);
  `}

  ${({visible}) => !visible && css`
    transform: translateX(calc(100% + 15px));
    opacity: 1;
  `}

  > .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  font-size: 1.4rem;

  input {
    all: unset;
    box-sizing: border-box;

    width: 100%;
    padding: .8rem;
    font-size: 1rem;
    background-color: #f6f6f6;
    
    border-radius: 6px;
    border: 3px solid transparent;
    
    transition: all .2s ease;

    &:focus {
      border-color: rgba(153,109,255);
      box-shadow: 0px 0px 0px 4px rgba(153,109,255, .2);
    }
  }

  input[type="color"] {
    -webkit-appearance: none;
    width: 100%;
    height: 32px;
    padding: 8px;
  }
  input[type="color"]::-webkit-color-swatch-wrapper {
    padding: 0;
  }
  
  input[type="color"]::-webkit-color-swatch {
    border: none;
    border-radius: 6px;
    
  }
`;

export const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  
  border: none;
  border-radius: 8px;

  padding: 1rem;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  background-color: ${({theme}) => theme.colors.purple[700]};

  cursor: pointer;
  transition: all .2s ease;
  
  &:hover {
    background-color: rgba(153,109,255, .8);
  }
`

export const CloseModal = styled.button`
  all: unset;
  box-sizing: border-box;

  top: 20px;
  right: 20px;
  position: absolute;

  cursor: pointer;
`