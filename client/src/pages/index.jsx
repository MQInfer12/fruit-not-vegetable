import React from 'react'
import { styled } from 'styled-components'
import colors from '../styles/colors'
import Button from '../components/global/button'
import Plant1 from '../assets/plant1.png'
import Plant2 from '../assets/plant2.png'
import Plant3 from '../assets/plant3.png'
import Dots from '../assets/dots.png'
import DoctorTomatto from '../assets/logo.png'
import { useChangeBackground } from '../hooks/changeBackground'
import { useNavigate } from 'react-router-dom'

const Index = () => {
  const navigate = useNavigate();
  useChangeBackground(colors.primary500);

  return (
    <Container>
      <LeftInfoContainer>
        <Logo src={DoctorTomatto} />
        <Title>Doctor Tomatto</Title>
        {/* ¡Únete a nosotros y protege la salud de tus cultivos de tomate! Explora nuestra plataforma ahora y descubre cómo la inteligencia artificial puede marcar la diferencia en el diagnóstico y clasificación de enfermedades en los tomates. */}
        {/*  */}
        <Description>Detecta y clasifica enfermedades en el tomate</Description>
        <div className='buttons'>
          <Button onClick={() => navigate('/analizar')}>Analizar Imagen</Button>
        </div>
      </LeftInfoContainer>
      <div className='bug-solver'> {/* POR ALGUN MOTIVO ESTE DIV SOLUCIONA UN BUG DE RESPONSIVE */}
        <RightContainer>
          <LeftPlants>
            <LeftPlantContainer>
              <PlantLabel>Precisión diagnóstica</PlantLabel>
              <PlantImage src={Plant1} />
            </LeftPlantContainer>
            <LeftPlantContainer>
              <PlantLabel>Fácil de usar</PlantLabel>
              <PlantImage src={Plant2} />
            </LeftPlantContainer>
          </LeftPlants>
          <RightPlantContainer>
            <PlantLabel>Actualizaciones continuas</PlantLabel>
            <PlantImage src={Plant3} />
            <PlantTextContainer>
              <div className='text'>
                <h2>Detalles</h2>
                <p>Recibirás informes detallados con el diagnóstico de la enfermedad, su gravedad y recomendaciones específicas para el tratamiento.</p>
              </div>
              <Button onClick={() => navigate('/instrucciones')} medium>INSTRUCCIONES</Button>
            </PlantTextContainer>
          </RightPlantContainer>
          <AnimatedDots src={Dots} />
        </RightContainer>
      </div>
    </Container>
  )
}

export default Index

const Container = styled.section`
  min-height: calc(100dvh - 32px);
  padding: 85px 40px 0;
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  @media screen and (max-width: 1300px) {
    width: 100%;
    flex-direction: column;
    gap: 80px;
    padding: 100px 40px 65px;
  }

  & > .bug-solver {
    @media screen and (max-width: 700px) {
      width: 100%;
    }
  }
`;

const LeftInfoContainer = styled.div`
  width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media screen and (max-width: 700px) {
    width: 100%;
  }

  & > .buttons {
    margin-top: 40px;

    @media screen and (max-width: 536px) {
      display: flex;
      flex-direction: column;
    }
  }
`;

const Logo = styled.img`
  width: 250px;
`;

const Title = styled.h1`
  font-size: 4rem;
  color: ${colors.white};
  font-weight: 600;
  font-family: 'Chillax';
  line-height: 72px;
  text-align: center;

  @media screen and (max-width: 700px) {
    font-size: 2.5rem;
    line-height: 46px;
  }
`;

const Description = styled.p`
  color: ${colors.white};
  font-size: 2.4rem;
  font-weight: 600;
  margin-top: 32px;
  text-align: center;

  @media screen and (max-width: 700px) {
    font-size: .8rem;
  }
`;

const RightContainer = styled.div`
  display: flex;
  gap: 4px;
  height: 550px;
  position: relative;
  isolation: isolate;
  width: max-content;

  @media screen and (max-width: 700px) {
    width: 100%;
  }
  @media screen and (max-width: 525px) {
    height: max-content;
    flex-direction: column-reverse;
  }
`;

const LeftPlants = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  @media screen and (max-width: 700px) {
    width: 100%;
  }
`;

const LeftPlantContainer = styled.div`
  position: relative;
  width: 215px;
  height: 100%;

  @media screen and (max-width: 700px) {
    width: 100%;
  }
  @media screen and (max-width: 525px) {
    width: 100%;
    height: 200px;
  }
`;

const RightPlantContainer = styled.div`
  position: relative;

  @media screen and (max-width: 700px) {
    width: 150%;
  }
  @media screen and (max-width: 525px) {
    width: 100%;
    height: 350px;
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

  @media screen and (max-width: 700px) {
    font-size: .6rem;
  }
`;

const PlantImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const PlantTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  position: absolute;
  bottom: 0;
  padding: 120px 26px 26px;
  background: linear-gradient(180deg, rgba(46, 64, 61, 0) 0%, ${colors.primary600} 91.06%);;

  & > .text {
    display: flex;
    flex-direction: column;
    gap: 6px;

    & > h2 {
      font-size: 28px;
      color: ${colors.white};
    }

    & > p {
      font-size: 14px;
      color: ${colors.white};
      
      @media screen and (max-width: 700px) {
        font-size: .8rem;
      }
    }
  }
`;

const AnimatedDots = styled.img`
  position: absolute;
  z-index: -1;
  width: 115px;
  height: 115px;
  inset: auto auto -32px -39px;
  animation: dotsmovement 15s infinite;

  @keyframes dotsmovement {
    0% {
      inset: auto auto -32px -40px;
    }
    12% {
      inset: auto auto -32px calc(100% - 75px);
    }
    25% {
      inset: auto auto calc(100% - 83px) calc(100% - 75px);
    }
    37% {
      inset: auto auto -32px calc(100% - 75px);
    }
    50% {
      inset: auto auto -32px -40px;
    }
    62% {
      inset: auto auto calc(100% - 83px) -40px;
    }
    75% {
      inset: auto auto calc(100% - 83px) calc(100% - 75px);
    }
    87% {
      inset: auto auto calc(100% - 83px) -40px;
    }
    100% {
      inset: auto auto -32px -40px;
    }
  }
`;
