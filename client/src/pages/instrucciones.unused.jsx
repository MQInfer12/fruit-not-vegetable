import React from 'react'
import colors from '../styles/colors';
import { styled } from 'styled-components';
import Button from '../components/global/button';
import Plant8 from '../assets/plant8.png'
import { useChangeBackground } from '../hooks/changeBackground';

const Instrucciones = () => {
  useChangeBackground(colors.primary200);
  return (
    <Container>
      <RightContainer>
        <div className='shadow' />
        <Img src={Plant8} />
      </RightContainer>
      <LeftContainer>
        <TextContainer>
          <h3>¿Cómo empezar?</h3>
          <p>Antes de utilizar nuestra aplicación de detección y clasificación de enfermedades en el tomate, necesitarás una foto de la planta del tomate en formato JPG.</p>
        </TextContainer>
        <NumbersContainer>
          <NumberContainer>
            <b>01.</b>
            <div>
              <h4>Prepara la foto</h4>
              <p>Ingresa a Analizar Imagen y carga la foto.</p>
            </div>
          </NumberContainer>
          <NumberContainer>
            <b>02.</b>
            <div>
              <h4>Analiza la foto</h4>
              <p>Haz click en Subir foto y se la analizará automaticamente.</p>
            </div>
          </NumberContainer>
          <NumberContainer>
            <b>03.</b>
            <div>
              <h4>Mira información</h4>
              <p>Se dará un diagnóstico detallado del estado de salud de tu planta de tomate.</p>
            </div>
          </NumberContainer>
        </NumbersContainer>
        <Button max type="primary">Descargar paso a paso</Button>
      </LeftContainer>
    </Container>
  )
}

export default Instrucciones

const Container = styled.section`
  min-height: calc(100dvh - 32px);
  padding: 145px 140px 60px;
  display: flex;
  justify-content: space-between;
  gap: 270px;
  align-items: center;

  @media screen and (max-width: 1510px) {
    gap: 100px;
    padding: 145px 80px 60px;
  }

  @media screen and (max-width: 1050px) {
    justify-content: center;
  }

  @media screen and (max-width: 700px) {
    padding: 140px 40px 65px;
  }
`;

const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  width: 650px;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 22px;

  & > h3 {
    font-size: 4rem;
    color: ${colors.primary500};
    font-weight: 600;
    font-family: 'Chillax';
    line-height: 72px;

    @media screen and (max-width: 1220px) {
      font-size: 2.5rem;
      line-height: 46px;
    }
  }

  & > p {
    line-height: 28px;
  }
`;

const NumbersContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 36px;
`;

const NumberContainer = styled.div`
  display: flex;
  gap: 20px;

  & > b {
    font-size: 2rem;
    color: ${colors.primary500};
    font-weight: 600;
    font-family: 'Chillax';
  }

  & > div {
    display: flex;
    flex-direction: column;
    gap: 6px;
    width: 500px;

    @media screen and (max-width: 700px) {
      width: 225px;
    }

    & > h4 {
      font-size: 1.2rem;
      color: ${colors.primary500};
      font-weight: 600;
      font-family: 'Chillax';
    }
    & > p {
      line-height: 28px;
    }
  }
`;

const RightContainer = styled.div`
  width: 500px;
  position: relative;
  isolation: isolate;

  & > .shadow {
    width: 100%;
    height: 100%;
    background-color: ${colors.primary300};
    position: absolute;
    left: -12%;
    top: -8%;
    z-index: -1;
  }

  @media screen and (max-width: 1050px) {
    display: none;
  }
`;

const Img = styled.img`
  width: 100%;
  object-fit: cover;
  border: 8px solid ${colors.white};
`;