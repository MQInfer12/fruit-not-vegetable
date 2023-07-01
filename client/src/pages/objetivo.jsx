import React from 'react'
import Plant4 from '../assets/plant4.png'
import Plant5 from '../assets/plant5.png'
import Plant6 from '../assets/plant6.png'
import Plant7 from '../assets/plant7.png'
import { useInterval } from '../hooks/useInterval'
import Button from '../components/global/button'
import { styled } from 'styled-components'
import colors from '../styles/colors'
import { useChangeBackground } from '../hooks/changeBackground'
import { useNavigate } from 'react-router-dom'

const Objetivo = () => {
  const navigate = useNavigate();
  const carouselData = [Plant5, Plant6, Plant7];
  const carouselIndex = useInterval(4000, carouselData.length);
  useChangeBackground(colors.primary100);

  return (
    <Container>
      <ImagesContainer>
        <FirstImage src={Plant4} />
        <CarouselContainer>
          <div>
            {
              carouselData.map((value, i) => (
                <SecondImage key={i} active={carouselIndex === i} src={value} />
              ))
            }
          </div>
        </CarouselContainer>
      </ImagesContainer>
      <RightContainer>
        <h3>Nuestro objetivo</h3>
        <div>
          <p>Es una aplicación de Inteligencia Artificial (basada en Aprendizaje Profundo y Visión por Computadora) que detecta y clasifica enfermedades que se dan en la hoja, recibe fotos de las HOJAS DE LA PLANTA del tomate en formato JPG.</p>
          <p>Las enfermedades que detecta y clasifica son: 1).- Mancha bacteriana 2).-Tizón temprano 3).- Hoja sana. Proporciona recomendaciones para la prevención y/o tratamiento de las enfermedades detectadas. Se recomienda solo subir fotos de hojas de tomate que estén en el formato JPG.</p>
        </div>
        <Button onClick={() => navigate('/analizar')} type="primary" max>Inténtalo</Button>
      </RightContainer>
    </Container>
  )
}

export default Objetivo

const Container = styled.section`
  min-height: calc(100dvh - 32px);
  padding: 85px 140px 0;
  display: flex;
  justify-content: space-between;
  gap: 270px;
  align-items: center;

  @media screen and (max-width: 1380px) {
    padding: 85px 60px 0;
    gap: 160px;
  }

  @media screen and (max-width: 960px) {
    flex-direction: column;
    gap: 40px;
    padding: 140px 40px 65px;
  }
`;

const ImagesContainer = styled.div`
  height: 70vh;
  position: relative;

  @media screen and (max-width: 1380px) {
    height: 50vh;
  }
  @media screen and (max-width: 960px) {
    display: flex;
    width: 100%;
    gap: 8px;

    & > * {
      width: 50%;
    }
  }
  @media screen and (max-width: 500px) {
    flex-direction: column;

    & > * {
      height: 50% !important;
      width: 100% !important;
    }
  }
`;

const FirstImage = styled.img`
  height: 100%;
  object-fit: cover;
`;

const CarouselContainer = styled.div`
  height: 50%;
  width: 50%;
  position: absolute;
  left: 80%;
  bottom: 10%;
  border: 8px solid ${colors.white};
  background-color: ${colors.white};
  display: flex;
  gap: 8px;

  & > div {
    position: relative;
    width: 100%;
    height: 100%;
  }

  @media screen and (max-width: 960px) {
    position: static;
    border: none;
    height: 100%;
  }
`;

const SecondImage = styled.img`
  object-fit: cover;
  opacity: ${props => props.active ? "1" : "0"};
  transition: all 1s;
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
`;

const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  width: 675px;

  @media screen and (max-width: 960px) {
    width: 100%;
  }

  & > h3 {
    font-size: 4rem;
    color: ${colors.primary500};
    font-weight: 600;
    font-family: 'Chillax';
    line-height: 72px;

    @media screen and (max-width: 960px) {
      font-size: 2.5rem;
      line-height: 46px;
    }
  }

  & p {
    line-height: 28px;
    text-align: justify;
  }
`;