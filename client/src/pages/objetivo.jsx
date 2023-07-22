import React from 'react'
import Plant4 from '../assets/plant4.png'
import Plant5 from '../assets/plant5.png'
import Plant6 from '../assets/plant6.png'
import Plant7 from '../assets/plant7.png'
import { useInterval } from '../hooks/useInterval'
import { styled } from 'styled-components'
import colors from '../styles/colors'
import { useChangeBackground } from '../hooks/changeBackground'

const Objetivo = () => {
  const carouselData = [{
    text: "Precisión diagnóstica",
    img: Plant5
  }, {
    text: "Fácil de usar",
    img: Plant6
  }, {
    text: "Actualizaciones continuas",
    img: Plant7
  }];
  const { active } = useInterval(4000, carouselData.length);
  useChangeBackground(colors.primary200);

  return (
    <Container>
      <ImagesContainer>
        <CarouselContainer>
          {
            carouselData.map((value, i) => (
              <SecondImage key={i} active={active === i}>
                <PlantLabel>{value.text}</PlantLabel>
                <img src={value.img} />
              </SecondImage>
            ))
          }
        </CarouselContainer>
        <FirstImage src={Plant4} />
      </ImagesContainer>
      <RightContainer>
        <h3>Nuestro objetivo</h3>
        <div>
          <p>Doctor Tomatto es una aplicación de Inteligencia Artificial (basada en Aprendizaje Profundo y Visión por Computadora) que detecta y clasifica enfermedades que se dan en la hoja, recibe fotos de las HOJAS DE LA PLANTA del tomate en formato JPG.</p>
          <p>Las enfermedades que detecta y clasifica son: 1).- Mancha bacteriana 2).-Tizón temprano 3).- Hoja sana. Proporciona recomendaciones para la prevención y/o tratamiento de las enfermedades detectadas. Se recomienda solo subir fotos de hojas de tomate que estén en el formato JPG.</p>
        </div>
      </RightContainer>
    </Container>
  )
}

export default Objetivo

const Container = styled.section`
  min-height: calc(100dvh - 32px);
  padding: 85px 140px 0;
  display: flex;
  justify-content: space-evenly;
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
  aspect-ratio: 0.72 / 1;
  position: relative;

  @media screen and (max-width: 1380px) {
    height: 70vh;
  }
  @media screen and (max-width: 1050px) {
    height: 50vh;
  }
  @media screen and (max-width: 960px) {
    width: 100%;
  }
  @media screen and (max-width: 500px) {
    flex-direction: column;

    & > * {
      height: 20vh;
    }
  }
`;

const FirstImage = styled.img`
  height: 50%;
  width: 50%;
  object-fit: cover;
  position: absolute;
  left:75%;
  bottom: 10%;
  border: 8px solid ${colors.white};

  @media screen and (max-width: 960px) {
    display: none;
  }
`;

const CarouselContainer = styled.div`
  height: 100%;
  width: 100%;
  background-color: ${colors.white};
  gap: 8px;
`;

const SecondImage = styled.div`
  opacity: ${props => props.active ? "1" : "0"};
  transition: all 1s;
  position: absolute;
  border: 8px solid ${colors.white};
  inset: 0;
  width: 100%;
  height: 100%;

  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
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
    font-size: 2rem;
    color: ${colors.primary500};
    font-weight: 600;
    font-family: 'Chillax';
    line-height: 72px;
  }

  & p {
    line-height: 28px;
    text-align: justify;
  }
`;

const PlantLabel = styled.p`
  position: absolute;
  background-color: ${colors.primary500};
  color: ${colors.white};
  padding: 7px 15px;
  top: 12px;
  left: 15px;
  font-size: 12px;
  transition: all 1s;

  @media screen and (max-width: 700px) {
    font-size: .6rem;
  }
`;