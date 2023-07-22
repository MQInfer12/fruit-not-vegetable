import React from 'react'
import { styled } from 'styled-components';
import colors from '../../styles/colors';
import BarChart from './barChart';
import Button from '../global/button';

const DataContainer = ({ country, localidad, handleBack }) => {
  return (
    <Container>
      <BackButton onClick={handleBack}><i className="fa-solid fa-xmark"></i></BackButton>
      <h2>{localidad.nombre}</h2>
      <p>{country.pais}</p>
      <BarChart pines={localidad.pines} />
      <Button disabled type="primary">Más reportes</Button>
    </Container> 
  )
}

export default DataContainer

const Container = styled.div`
  padding: 20px;
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 10px;
  overflow: auto;

  & > h2 {
    font-size: 1.5rem;
    color: ${colors.primary500};
    font-weight: 600;
    font-family: 'Chillax';
  }

  & > p {
    font-size: 1.3rem;
    font-family: 'Chillax';
    color: ${colors.primary500};
    opacity: 1;
  }

  & > button {
    margin-top: 20px;
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