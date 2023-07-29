import React, { useEffect, useState } from 'react'
import { Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import Sombra from '../../assets/markershadow.png';
import Marcador1 from '../../assets/marker1.png';
import Marcador2 from '../../assets/marker2.png';
import { styled } from 'styled-components';
import colors from '../../styles/colors';

const CustomMarker = ({ pin, country, localidad }) => {
  const markers = {
    "Mancha Bacteriana": Marcador1,
    "Tizon Temprano": Marcador2 
  };

  const [icon, setIcon] = useState(null);

  useEffect(() => {
    const divisor = 5;
    const customIcon = new L.icon({
      iconUrl: markers[pin.enfermedad],
      iconSize: [132 / divisor, 179.718 / divisor],
      shadowUrl: Sombra,
      shadowSize: [170 / divisor, 175 / divisor],
      iconAnchor: [132 / (divisor * 2), (179.718 / divisor) - (10 / divisor)],
      popupAnchor: [0, ((179.718 / divisor) * -0.9)]
    });
    setIcon(customIcon);
  }, []);

  if(!icon) return <></>
  return (
    <Marker  
      position={pin.coordenadas} 
      icon={icon}
    >
      <Popup>
        <Table>
          <tbody>
            <tr>
              <th>País</th>
              <td>{country}</td>
            </tr>
            <tr>
              <th>Localidad</th>
              <td>{localidad}</td>
            </tr>
            <tr>
              <th>Enfermedad</th>
              <td>{pin.enfermedad}</td>
            </tr>
            <tr>
              <th>Fecha</th>
              <td>{pin.fecha}</td>
            </tr>
          </tbody>
        </Table>
      </Popup>
    </Marker>
  )
}

export default CustomMarker

const Table = styled.table`
  table-layout: fixed;
  border-collapse: collapse;
  & th, & td {
    border: 1px solid ${colors.primary600};
    padding: 2px 5px;
  }
  & th {
    background-color: ${colors.primary400};
    color: ${colors.white};
  }
  & td {
    background-color: ${colors.primary300};
  }
`;