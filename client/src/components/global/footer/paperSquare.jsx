import React from 'react'
import { styled } from 'styled-components';
import Pin from '../../../assets/pin.png';
import ModalContainer from '../modalContainer';

const PaperSquare = ({ color, inclinacion, children, onClick, active, size = 160 }) => {
  return (
    <PaperContainer size={size}>
      {
        active ? 
        <ModalContainer close={onClick}>
          <Paper 
            className={active ? "active" : ""}
            bg={color} 
            inclinacion={inclinacion}
            onClick={onClick}
          >
            <img className='alfiler' src={Pin} />
            { children }
          </Paper>
        </ModalContainer> :
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

const PaperContainer = styled.div`
  min-width: ${props => props.size}px;
  min-height: ${props => props.size}px;
  max-width: ${props => props.size}px;
  max-height: ${props => props.size}px;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
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
    animation: grow .5s;
    transition: none;

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