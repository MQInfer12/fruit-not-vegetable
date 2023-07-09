import React, { useEffect } from 'react'
import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet'

const MyMap = ({ localidad }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(localidad.coordenadas)
  }, [localidad]);
  return null;
}

const Mapa = ({ localidad }) => {
  return (
    <MapContainer center={localidad.coordenadas} zoom={14} scrollWheelZoom={true}>
      <MyMap localidad={localidad} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={localidad.coordenadas} />
    </MapContainer>
  )
}

export default Mapa