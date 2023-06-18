import React from 'react'
import { styled } from 'styled-components';
import colors from '../../styles/colors';
import Yoyo from '../../assets/yoyo1.jpg'

const ThirdSection = () => {
  return (
    <Container>
      <h2>Crédito</h2>
      <Content>
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
      </Content>
    </Container>
  )
}

export default ThirdSection

const Container = styled.section`
  height: 100dvh;
  padding: 105px 140px 70px;
  display: flex;
  flex-direction: column;
  gap: 40px;
  background-color: ${colors.primary100};
  
  & > h2 {
    font-size: 40px;
    font-weight: 400;
    color: ${colors.primary500};
  }
`;

const Content = styled.div`
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