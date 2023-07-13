import React from 'react'
import { styled } from 'styled-components';
import usePortal from 'react-useportal';
import colors from '../../../styles/colors';

const PaperSquare = ({ color, inclinacion, children, onClick, active }) => {
  const { Portal } = usePortal();

  return (
    <PaperContainer>
      {
        active ? 
        <Portal>
          <ModalContainer onClick={onClick}>
            <Paper 
              className={active ? "active" : ""} 
              onClick={onClick} 
              bg={color} 
              inclinacion={inclinacion}
            >
              { children }
            </Paper>
          </ModalContainer>
        </Portal> :
        <Paper 
          onClick={onClick} 
          bg={color} 
          inclinacion={inclinacion}
        >
          { children }
        </Paper>
      }
    </PaperContainer>
  )
}

export default PaperSquare

const PaperContainer = styled.div`
  width: 160px;
  height: 160px;
  margin: 0 60px;

  @media screen and (max-width: 600px) {
    margin: 0 30px;
  }
`;

const Paper = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${props => props.bg};
  transform: rotate(${props => props.inclinacion}deg);
  transition: all 0.3s;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 5px 6px 5px -4px rgba(0,0,0,0.5);

  &:hover {
    scale: 1.2;
  }

  &.active {
    width: 500px;
    height: 500px;
    transform: rotate(0);
    animation: grow .3s;

    &:hover {
      scale: 1;
    }

    @keyframes grow {
      from {
        scale: .4;
      }
      to {
        scale: 1;
      }
    }
  }
`;

const ModalContainer = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1002;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${colors.primary500opacity};
`;