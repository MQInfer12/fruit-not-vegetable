import React from 'react'
import { styled } from 'styled-components';
import colors from '../../styles/colors';
import Button from '../global/button';

const ResultadoError = ({ preview, reset }) => {
  return (
    <Container>
      <DiagnosticoContainer>
        <h2>¡Error!</h2>
        <p>La foto subida no corresponde a una hoja de tomate o tiene una probabilidad {"< 70%"}</p>
        <img src={preview} />
        <Button type="secondary" onClick={reset}>Subir otra imagen</Button>
      </DiagnosticoContainer>
    </Container>
  )
}

export default ResultadoError

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
  padding: 20px 32px 20px;
  background-color: ${colors.primary300};
  gap: 8px;
  box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.2);

  @media screen and (max-height: 700px) {
    gap: 12px
  }

  @media screen and (max-width: 500px) {
    padding: 0px 8px 20px;
    width: 100%;
  }

  & h2 {
    font-size: 2rem;
    color: ${colors.primary500};
    font-weight: 600;
    font-family: 'Chillax';
  }

  & > p {
    font-size: 1.1rem;
    padding: 8px 16px;
    background-color: ${colors.tertiary600};
    color: ${colors.white};
    font-weight: 600;
  }

  & img {
    max-height: 400px;
    border: 4px solid ${colors.primary500};
  }
`;