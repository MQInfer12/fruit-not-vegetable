import React from 'react'
import { styled } from 'styled-components';
import colors from '../styles/colors';
import Yoyo from '../assets/yoyo1.jpg'
import { useChangeBackground } from '../hooks/changeBackground';

const Credito = () => {
  useChangeBackground(colors.primary100);

  return (
    <Container>
      <TextContainer>
        <p>Doctor Tomatto es producto de la Tesis de Maestría de Ingeniería de Software de la Universidad Nacional de La Plata (UNLP) el año 2022, aplicando el aprendizaje profundo a problemas de visión de computadora tales como detección y clasificación específicamente en las enfermedades del tomate, mediante el procesamiento de imágenes digitales.</p>
        <div>
          <div>
            <b>Sergio Hernán Valenzuela Cámara</b>
            <small>M.Sc. Software Engineer</small>
          </div>
          <div>
            <b>TecnóPolis-Ai</b>
            <small>Mayo 2021 - Presente</small>
          </div>
        </div>
      </TextContainer>
      <CircleImage src={Yoyo} />
    </Container>
  )
}

export default Credito

const Container = styled.section`
  min-height: calc(100dvh - 32px);
  padding: 85px 140px 0;
  display: flex;
  justify-content: space-between;
  gap: 270px;
  align-items: center;
`;

const CircleImage = styled.img`
  width: 630px;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: 50%;
  border: 30px solid ${colors.primary200};
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 60px;

  & > p {
    line-height: 28px;
  }

  & > div {
    display: flex;
    justify-content: space-between;

    & > div {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
  }
`;