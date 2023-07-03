import React, { useRef, useState } from 'react'
import { styled } from 'styled-components';
import { useChangeBackground } from '../hooks/changeBackground';
import colors from '../styles/colors';
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import "leaflet/dist/leaflet.css";
import data from "../utilities/mapData.json";
import Button from '../components/global/button';

const Mapa = () => {
  const [open, setOpen] = useState(true);
  const [country, setCountry] = useState(null);
  const [localidad, setLocalidad] = useState(null);
  useChangeBackground(colors.primary200);

  const changePais = (e) => {
    setCountry(data.find(value => value.pais === e.target.value))
  }
  const changeLocalidad = (e) => {
    setLocalidad(country.localidades.find(value => value.nombre === e.target.value))
  }

  console.log(localidad);

  return (
    <Container>
      <MapDiv>
        {
          localidad &&
          <MapContainer center={localidad.coordenadas} zoom={14} scrollWheelZoom={true}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={localidad.coordenadas} />
          </MapContainer>
        }
        <OverlappingContainer open={open}>
          <OverlappingBG onClick={() => setOpen(false)} open={open} />
          <OverlappingModal selected={localidad} open={open}>
            <OpenCloseButton 
              onClick={() => setOpen(!open)}
            ><i className={`fa-solid fa-chevron-${open ? "right" : "left"}`}></i></OpenCloseButton>
            {
              localidad ? 
              <></> 
              :
              <SelectsContainer>
                <h2>Mapa geo-referenciado de enfermedades</h2>
                <p>Seleccione un país y una localidad para ver el mapa</p>
                <div>
                  <Select value={country?.pais} onChange={changePais}>
                    <option>Seleccione país...</option>
                    {data.map((v, i) => (
                      <option key={i} value={v.pais}>{v.pais}</option>
                    ))}
                  </Select>
                  <Select value={localidad?.nombre} onChange={changeLocalidad}>
                    <option>Seleccione localidad...</option>
                    {country && country.localidades.map((v, i) => (
                      <option key={i} value={v.nombre}>{v.nombre}</option>
                    ))}
                  </Select>
                </div>
                <Button type="primary">Ver mapa</Button>
              </SelectsContainer>
            }
          </OverlappingModal>
        </OverlappingContainer>
      </MapDiv>
    </Container>
  )
}

export default Mapa

const Container = styled.section`
  height: calc(100dvh - 32px);
  padding: 85px 140px 0;
  display: flex;
  justify-content: space-around;
  align-items: center;

  @media screen and (max-width: 750px) {
    padding: 85px 0 0;
  }
`;

const MapDiv = styled.div`
  width: 100%;
  height: 90%;
  overflow: hidden;
  position: relative;
  border: 8px solid ${colors.primary500};

  & > div:first-child {
    height: 100%;
    width: 100%;
  }
`;

const OverlappingContainer = styled.div`
  z-index: 1000;
  position: absolute;
  inset: 0;
  display: flex;
  justify-content: end;
  pointer-events: ${props => !props.open && "none"};
`;

const OverlappingBG = styled.div`
  background-color: ${props => props.open ? "rgba(0, 0, 0, 0.3)" : "transparent"};
  transition: all 0.5s;
  position: absolute;
  inset: 0;
`;

const OverlappingModal = styled.div`
  width: ${props => props.selected ? "400px" : "100%"};
  border-left: ${props => props.selected && `4px solid ${colors.primary500}`};
  background-color: ${colors.primary200};
  transform: translateX(${props => props.open ? "0" : "100%"});
  transition: all 0.5s ease;
  position: relative;
  
  @media screen and (max-width: 470px) {
    width: ${props => props.selected ? "calc(100% - 50px)" : "100%"};
  }
`;

const OpenCloseButton = styled.button`
  position: absolute;
  z-index: 1000;
  top: 20%;
  background-color: ${colors.primary500};
  border: none;
  left: -40px;
  transition: all 0.5s ease;
  width: 40px;
  height: 80px;
  border-radius: 20px 0 0 20px;
  cursor: pointer;
  font-size: 20px;
  color: ${colors.primary200};
  pointer-events: all;
`;

const SelectsContainer = styled.div`
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