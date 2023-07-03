import React from 'react'
import { styled } from 'styled-components';
import colors from '../../styles/colors';

const DataContainer = ({ country, localidad, handleBack }) => {
  return (
    <Container>
      <BackButton onClick={handleBack}><i className="fa-solid fa-xmark"></i></BackButton>
      <h2>{localidad.nombre}</h2>
      <p>{country.pais}</p>
    </Container> 
  )
}

export default DataContainer

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 10px;

  & > h2 {
    font-size: 1.5rem;
    color: ${colors.primary500};
    font-weight: 600;
    font-family: 'Chillax';
  }

  & > p {
    color: ${colors.primary400};
  }
`;

const BackButton = styled.button`
  border: none;
  background-color: transparent;
  color: ${colors.primary500};
  font-size: 1.2rem;
  cursor: pointer;
  transition: scale 0.3s;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: flex-start;

  &:hover {
    scale: 1.2;
  }
`;