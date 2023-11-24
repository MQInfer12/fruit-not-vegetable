import React from 'react'
import styled from 'styled-components';
import colors from '../../../styles/colors';

const HandIcon = () => {
  return (
    <Container>
      <IconsContainer>
        <i className="fa-regular fa-square"></i>
        <i className="fa-solid fa-hand-pointer"></i>
      </IconsContainer>
      <p>Selecciona un producto para comprar</p>
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
  gap: 5rem;

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

  & > i:first-child {
    color: ${colors.primary500};
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

  & > i:last-child {
    color: ${colors.primary600};
    position: absolute;
    top: 45%;
    left: 20%;
  }
`;