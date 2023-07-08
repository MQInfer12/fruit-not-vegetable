import React, { useState } from 'react'
import { styled } from 'styled-components';
import { useChangeBackground } from '../hooks/changeBackground';
import colors from '../styles/colors';
import "leaflet/dist/leaflet.css";
import DataContainer from '../components/mapa/dataContainer';
import SelectsContainer from '../components/mapa/selectsContainer';
import Map from '../components/mapa/mapa';

const Mapa = () => {
  const [open, setOpen] = useState(true);
  const [country, setCountry] = useState(null);
  const [localidad, setLocalidad] = useState(null);
  const [selected, setSelected] = useState(false);
  useChangeBackground(colors.primary200);

  return (
    <Container>
      <MapDiv>
        {
          localidad &&
          <Map localidad={localidad} />
        }
        <OverlappingContainer open={open}>
          <OverlappingBG onClick={() => setOpen(false)} open={open} />
          <OverlappingModal selected={selected} open={open}>
            <OpenCloseButton 
              onClick={() => setOpen(!open)}
            ><i className={`fa-solid fa-chevron-${open ? "right" : "left"}`}></i></OpenCloseButton>
            {
              selected ? 
              <DataContainer 
                country={country} 
                localidad={localidad}
                handleBack={() => setSelected(false)} 
              />
              :
              <SelectsContainer 
                country={country} 
                localidad={localidad} 
                setCountry={setCountry} 
                setLocalidad={setLocalidad} 
                handleViewMap={() => setSelected(true)}
              />
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
  width: 100%;
  border-left: 4px solid ${colors.primary500};
  background-color: ${colors.primary200};
  transform: translateX(${props => !props.selected ? "-4px" : props.open ? "calc(100% - 400px)" : "100%"});
  transition: transform 0.5s ease;
  position: relative;
  padding-right: ${props => props.selected && "calc(100% - 400px)"};
  
  @media screen and (max-width: 470px) {
    width: 100%;
    transform: translateX(${props => !props.selected ? "-4px" : props.open ? "50px" : "100%"});
    padding-right: ${props => props.selected && "50px"};
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