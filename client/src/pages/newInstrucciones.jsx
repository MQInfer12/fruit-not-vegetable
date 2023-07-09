import React, { useState } from 'react'
import { styled } from 'styled-components';
import colors from '../styles/colors';
import Paso1 from '../assets/paso1.png'
import Paso2 from '../assets/paso2.png'
import Paso3 from '../assets/paso3.png'
import { useChangeBackground } from '../hooks/changeBackground';
import { useInterval } from '../hooks/useInterval';

const NewInstrucciones = () => {
  useChangeBackground(colors.primary200);

  const carouselData = [{
    text: "Ingresar a Analizar Imagen",
    img: Paso1
  },{
    text: "Seleccionar una foto JPG",
    img: Paso2
  },{
    text: "Click al botón Subir Foto",
    img: Paso3
  }];
  const { active, changeActive } = useInterval(6000, carouselData.length);

  return (
    <Container>
      <CarouselContainer>
        {
          carouselData.map((value, i) => (
            <CarouselItem active={i === active}>
              <img src={value.img} />
              <div className='paso'>
                <h3>Paso {i + 1}</h3>
                <p>{value.text}</p>
              </div>
            </CarouselItem>
          ))
        }
        <CarouselControls>
          {
            carouselData.map((value, i) => (
              <CarouselButton active={i === active} onClick={() => changeActive(i)} />
            ))
          }
        </CarouselControls>
      </CarouselContainer>
    </Container>
  )
}

export default NewInstrucciones

const Container = styled.section`
  height: calc(100dvh - 32px);
  padding: 145px 140px 60px;
  display: flex;
  justify-content: center;
  gap: 270px;
  align-items: center;

  @media screen and (max-width: 870px) {
    padding: 145px 40px 60px;
  }
`;

const CarouselContainer = styled.div`
  border: 8px solid ${colors.primary500};
  width: 100%;
  aspect-ratio: 1.573 / 1; /* 1290 820 */
  max-height: 100%;
  max-width: 916px;
  position: relative;
  isolation: isolate;

  @media screen and (max-width: 700px) {
    margin-bottom: 160px;
  }
`;

const CarouselItem = styled.div`
  position: absolute;
  inset: 0;
  opacity: ${props => props.active ? 1 : 0};
  transition: opacity 1s;

  & > img {
    width: 100%;
    height: 100%;
  }

  & > .paso {
    position: absolute;
    right: 5%;
    bottom: 10%;
    padding: 16px 24px;
    width: 250px;
    background-color: ${colors.primary500opacity};
    display: flex;
    flex-direction: column;
    gap: 8px;
    backdrop-filter: blur(4px);

    @media screen and (max-width: 700px) {
      bottom: -130px;
      right: 50%;
      transform: translateX(50%);
    }

    & > h3 {
      font-size: 1.2rem;
      font-weight: 600;
      font-family: 'Chillax';
      color: ${colors.white};
    }
    & > p {
      font-size: .9rem;
      color: ${colors.white};
      opacity: 0.8;
    }
  }
`;

const CarouselControls = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 6px 0;
  background-color: ${colors.primary500opacity};
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
`;

const CarouselButton = styled.button`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: none;
  border: 2px solid ${colors.white};
  background-color: ${props => props.active && colors.primary500};
  cursor: pointer;
  transition: background-color 1s;
`;