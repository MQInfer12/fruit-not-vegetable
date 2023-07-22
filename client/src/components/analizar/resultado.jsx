import React, { useState } from 'react'
import { styled } from 'styled-components';
import colors from '../../styles/colors';
import ManchaBacteriana from '../../assets/fotoManchaBacteriana.jpg'
import Button from '../global/button';
import EnfermedadModal from './enfermedadModal';
import ZoomImage from './zoomImage';
import Carousel from '../global/carousel';

const Resultado = ({ data, preview }) => {
  const enfermedad = "manchaBacteriana";
  const [page, setPage] = useState(null);
  
  const carouselData = [preview, preview, preview]

  return (
    <Container>
      <DiagnosticoContainer>
        <h2>Predicción</h2>
        <p>Predicción: {data.prediccion} {data.porcentaje}</p>
        <div className='images-container'>
          <ZoomImage src={ManchaBacteriana} />
          <div>
            <Carousel 
              data={carouselData}
              borderWidth={4}
              component={src => (
                <ZoomImage src={src} />
              )}
            />
          </div>
        </div>
        <div className='buttons-container'>
          <Button width="200px" type="primary" onClick={() => setPage("sintomas")}>Síntomas</Button>
          <Button width="200px" type="primary" onClick={() => setPage("prevencion")}>Prevención</Button>
          <Button width="200px" type="primary" onClick={() => setPage("tratamiento")}>Tratamiento</Button>
        </div>
      </DiagnosticoContainer>
      {
        page &&
        <EnfermedadModal 
          close={() => setPage(null)}
          enfermedad={enfermedad}
          page={page}
        />
      }
    </Container>
  )
}

export default Resultado

const Container = styled.section`
  min-height: calc(100dvh - 32px);
  padding: 85px 240px 0px;
  display: flex;
  flex-direction: column;
  animation: appearResult 2s;
  justify-content: center;

  @media screen and (max-width: 1420px) {
    padding: 85px 100px 0px;
  }

  @media screen and (max-width: 700px) {
    padding: 85px 0 0;
  }

  @keyframes appearResult {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const DiagnosticoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 400px;
  padding: 32px;
  background-color: ${colors.primary300};
  gap: 16px;
  box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.2);

  @media screen and (max-width: 500px) {
    padding: 32px 8px;
    width: 100%;
  }

  & h2 {
    font-size: 2rem;
    color: ${colors.primary500};
    font-weight: 600;
    font-family: 'Chillax';
    line-height: 72px;
  }

  & .images-container {
    margin: 12px 0;
    display: flex;
    gap: 24px;
    width: 100%;
    justify-content: space-evenly;
    align-items: center;
    flex-direction: row;
    
    & > * {
      height: 250px;
      width: 400px;

      @media screen and (max-width: 500px) {
        width: 300px;
        height: 200px;
      }
    }

    & > img {
      border: 4px solid ${colors.primary500};
    }

    @media screen and (max-width: 1090px) {
      flex-direction: column;
    }

    @media screen and (max-width: 500px) {
      width: 320px;
    }
  }

  & .buttons-container {
    display: flex;
    gap: 24px;
    justify-content: center;

    @media screen and (max-width: 930px) {
      flex-direction: column;
    }
  }
`;