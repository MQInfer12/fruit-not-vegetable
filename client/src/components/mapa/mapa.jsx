import React from 'react'
import { MapContainer, Marker, TileLayer } from 'react-leaflet'

const Mapa = ({ localidad }) => {
  return (
    <MapContainer center={localidad.coordenadas} zoom={14} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={localidad.coordenadas} />
    </MapContainer>
  )
}

export default Mapa