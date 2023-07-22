import React, { useEffect } from 'react'
import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet'
import CustomMarker from './customMarker';

const MyMap = ({ localidad }) => {
  const map = useMap();
  useEffect(() => {
    const bounds = localidad.pines.map(pin => pin.coordenadas);
    map.fitBounds(bounds);
    map.setZoom(14);
  }, [localidad]);
  return null;
}

const Mapa = ({ localidad, country }) => {
  return (
    <MapContainer zoom={14} scrollWheelZoom={true}>
      <MyMap localidad={localidad} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {localidad.pines.map((pin, i) => (
        <CustomMarker key={i} pin={pin} country={country} localidad={localidad.nombre} />
      ))}
    </MapContainer>
  )
}

export default Mapa