import React from 'react'
import { styled } from 'styled-components'
import colors from '../styles/colors'
import Button from '../components/global/button'
import DoctorTomatto from '../assets/logotext-white.png'
import { useChangeBackground } from '../hooks/changeBackground'
import { useNavigate } from 'react-router-dom'

const Index = () => {
  const navigate = useNavigate();
  useChangeBackground(colors.primary500);

  return (
    <Container>
      <LeftInfoContainer>
        <Logo src={DoctorTomatto} />
        {/* <Title>Doctor Tomatto</Title> */}
        {/* ¡Únete a nosotros y protege la salud de tus cultivos de tomate! Explora nuestra plataforma ahora y descubre cómo la inteligencia artificial puede marcar la diferencia en el diagnóstico y clasificación de enfermedades en los tomates. */}
        <Description>Detecta y clasifica enfermedades en el tomate</Description>
        <div className='buttons'>
          <Button onClick={() => navigate('/analizar')}>Analizar Imagen</Button>
        </div>
      </LeftInfoContainer>
      {/* <Right /> */}
    </Container>
  )
}

export default Index

const Container = styled.section`
  min-height: calc(100dvh - 32px);
  padding: 125px 40px 40px;
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
    margin-top: 32px;

    @media screen and (max-width: 536px) {
      display: flex;
      flex-direction: column;
    }
  }
`;

const Logo = styled.img`
  width: 375px;
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
  font-size: 1.8rem;
  font-weight: 600;
  text-align: center;
  opacity: 0.7;

  @media screen and (max-width: 700px) {
    font-size: 1.2rem;
  }
`;