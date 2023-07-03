import React from 'react'
import { styled } from 'styled-components';
import colors from '../../styles/colors';
import data from "../../utilities/mapData.json";
import Button from '../global/button';

const SelectsContainer = ({ country, setCountry, localidad, setLocalidad, handleViewMap }) => {
  const changePais = (e) => {
    setCountry(data.find(value => value.pais === e.target.value));
    setLocalidad(null);
  }
  const changeLocalidad = (e) => {
    setLocalidad(country.localidades.find(value => value.nombre === e.target.value));
  }

  return (
    <Container>
      <h2>Mapa geo-referenciado de enfermedades</h2>
      <p>Seleccione un país y una localidad para ver el mapa</p>
      <div>
        <Select value={country?.pais} onChange={changePais}>
          <option>Seleccione país...</option>
          {data.map((v, i) => (
            <option key={i} value={v.pais}>{v.pais}</option>
          ))}
        </Select>
        <Select key={country?.pais} value={localidad?.nombre} onChange={changeLocalidad}>
          <option>Seleccione localidad...</option>
          {country && country.localidades.map((v, i) => (
            <option key={i} value={v.nombre}>{v.nombre}</option>
          ))}
        </Select>
      </div>
      <Button disabled={!localidad} onClick={handleViewMap} type="primary">Ver mapa</Button>
    </Container>
  )
}

export default SelectsContainer

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  gap: 20px;
  padding: 40px;

  & > h2 {
    font-size: 2rem;
    color: ${colors.primary500};
    font-weight: 600;
    font-family: 'Chillax';
  }

  & > div {
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
  }
`;

const Select = styled.select`
  width: 300px;
  padding: 10px 15px;
  outline: none;
  border: 1px solid ${colors.primary500};
`