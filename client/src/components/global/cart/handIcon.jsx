import React from 'react'
import styled from 'styled-components';
import colors from '../../../styles/colors';

const HandIcon = ({ 
  text = "Seleccione los productos que desea adquirir",
  icon,
  type = "primary"
}) => {
  return (
    <Container other={!!icon}>
      <IconsContainer type={type}>
        {
          icon ?
          <i className={icon}></i>
          :
          <>
          <i className="move fa-regular fa-square"></i>
          <i className="dontmove fa-solid fa-hand-pointer"></i>
          </>
        }
      </IconsContainer>
      <p>{text}</p>
    </Container>
  )
}

export default HandIcon

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: ${props => props.other ? "8px" : "5rem"};

  & > p {
    max-width: 60%;
    text-align: center;
    color: ${colors.gray500};
    font-size: 1rem;
  }
`;

const IconsContainer = styled.div`
  position: relative;
  font-size: 10rem;
  color: ${props => props.type === "primary" ? colors.primary500 : colors.tertiary400};

  & > .move {
    animation: move 5s linear infinite;

    @keyframes move {
      0% {
        transform: translateX(-.5rem);
      }
      50% {
        transform: translateX(.5rem);
      }
      100% {
        transform: translateX(-.5rem);
      }
    }
  }

  & > .dontmove {
    color: ${colors.primary600};
    position: absolute;
    top: 45%;
    left: 20%;
  }
`;