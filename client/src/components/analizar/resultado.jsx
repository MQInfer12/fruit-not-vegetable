import React, { useState } from 'react'
import { styled } from 'styled-components';
import colors from '../../styles/colors';
import ManchaBacteriana from '../../assets/fotoManchaBacteriana.jpg'
const Resultado = ({ data, preview }) => {
  const [page, setPage] = useState("sintomas");
  
  return (
    <Container>
      <DiagnosticoContainer>
        <CarouselContainer>
          <img src={preview} alt="car1" />
        </CarouselContainer>
        <h2>Mancha bacteriana</h2>
        <h3>58.0%</h3>
        <img src={ManchaBacteriana} />
      </DiagnosticoContainer>
      <PageContainer>
        <PageButtons>
          <PageButton onClick={() => setPage("sintomas")} active={page === "sintomas"}>Síntomas</PageButton>
          <PageButton onClick={() => setPage("prevencion")} active={page === "prevencion"}>Prevención</PageButton>
          <PageButton onClick={() => setPage("tratamiento")} active={page === "tratamiento"}>Tratamiento</PageButton>
        </PageButtons>
        <InfoContainer>
          {data[page].map((v, i) => <p key={i}>{v}</p>)}
        </InfoContainer>
      </PageContainer>
    </Container>
  )
}

export default Resultado

const Container = styled.section`
  min-height: calc(100dvh - 32px);
  padding: 145px 140px 60px;
  display: flex;
  animation: appearResult 2s;

  @media screen and (max-width: 560px) {
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
  padding: 40px;
  background-color: ${colors.primary300};

  & > h2 {
    font-size: 1.2rem;
    color: ${colors.primary500};
    margin-top: 30px;
  }

  & > h3 {
    font-size: 2rem;
    color: ${colors.primary600};
    margin-top: 10px;
  }

  & > img {
    width: 100%;
    height: 25vh;
    margin-top: auto;
    object-fit: cover;
    border: 4px solid ${colors.primary400};
  }
`;

const CarouselContainer = styled.div`
  width: 100%;
  height: 25vh;
  position: relative;
  border: 4px solid ${colors.primary400};

  & > img {
    height: 100%;
    width: 100%;
    position: absolute;
  }
`;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${colors.primary400};
  padding: 40px;
`;

const PageButtons = styled.div`
  display: flex;
  width: 100%;
`;

const PageButton = styled.button`
  width: 100%;
  height: 40px;
  background-color: transparent;
  border: none;
  color: ${colors.white};
  transition: opacity 0.3s;
  cursor: pointer;
  border-bottom: ${props => props.active && `4px solid ${colors.primary500}`};
  font-size: 1rem;

  &:hover {
    opacity: 0.7;
  }
`;

const InfoContainer = styled.div`
  padding: 60px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: ${colors.primary200};
  line-height: 28px;
  text-align: justify;
  height: 100%;
  max-height: calc(100dvh - 355px);
  overflow-y: auto;
`;