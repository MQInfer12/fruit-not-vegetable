import React from 'react'
import { styled } from 'styled-components';
import usePortal from 'react-useportal';
import colors from '../../../styles/colors';
import Pin from '../../../assets/pin.png';

const PaperSquare = ({ color, inclinacion, children, onClick, active }) => {
  const { Portal } = usePortal();

  return (
    <PaperContainer>
      {
        active ? 
        <Portal>
          <ModalContainer>
            <Background onClick={onClick} />
            <Paper 
              className={active ? "active" : ""}
              bg={color} 
              inclinacion={inclinacion}
            >
              <img className='alfiler' src={Pin} />
              { children }
            </Paper>
          </ModalContainer>
        </Portal> :
        <Paper 
          onClick={onClick} 
          bg={color} 
          inclinacion={inclinacion}
        >
          <img className='alfiler' src={Pin} />
          { children }
        </Paper>
      }
    </PaperContainer>
  )
}

export default PaperSquare

const ModalContainer = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1002;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Background = styled.div`
  position: fixed;
  inset: 0;
  width: 100%;
  background-color: ${colors.primary500opacity};
`;

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
  position: relative;

  & > .alfiler {
    position: absolute;
    top: -10px;
    width: 25px;
    transform: rotate(-25deg);
  }

  &:hover {
    scale: 1.2;
  }

  &.active {
    width: 500px;
    height: 500px;
    transform: rotate(0);
    animation: grow .3s;
    cursor: auto;

    & > .alfiler {
      width: 50px;
      top: -30px;
    }

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