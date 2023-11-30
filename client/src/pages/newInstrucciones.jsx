import React from 'react'
import { styled } from 'styled-components';
import colors from '../styles/colors';
import Paso1 from '../assets/instrucciones/1.png'
import Paso2 from '../assets/instrucciones/2.png'
import Paso3 from '../assets/instrucciones/3.png'
import Paso4 from '../assets/instrucciones/4.png'
import Paso5 from '../assets/instrucciones/5.png'
import Paso6 from '../assets/instrucciones/6.png'
import { useChangeBackground } from '../hooks/changeBackground';
import Carousel from '../components/global/carousel';

const NewInstrucciones = () => {
  useChangeBackground(colors.primary500);

  const carouselData = [{
    text: "Ingresar a Analizar Imagen",
    img: Paso1
  },{
    text: "Seleccionar una foto JPG",
    img: Paso2
  },{
    text: "Click al botón 'Subir foto'",
    img: Paso3
  },{
    text: "Revisar el diagnóstico",
    img: Paso4
  },{
    text: "Observar un ejemplo de la enfermedad",
    img: Paso6
  },{
    text: "Revisar los síntomas, prevención y tratamiento",
    img: Paso5
  }];

  return (
    <Container>
      <CarouselContainer>
        <Carousel 
          data={carouselData}
          component={(value, i) => (
            <CarouselItem>
              <img src={value.img} />
              <div className='paso'>
                <h3>Paso {i + 1}</h3>
                <p>{value.text}</p>
              </div>
            </CarouselItem>
          )}
          borderWidth={8}
          borderColor={colors.primary400}
        />
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
  width: 100%;
  aspect-ratio: 1.573 / 1; /* 1290 820 */
  max-width: 916px;

  @media screen and (max-width: 700px) {
    margin-bottom: 160px;
  }
`;

const CarouselItem = styled.div`
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
    background-color: ${colors.tertiary500opacity};
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