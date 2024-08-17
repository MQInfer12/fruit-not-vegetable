import React, { useEffect, useRef, useState } from 'react'
import { styled } from 'styled-components';
import colors from '../../styles/colors';
import BarChart from './barChart';
import Button from '../global/button';
import { useRequest } from '../../hooks/useRequest';

const DataContainer = ({ country, localidad, handleBack }) => {
  const chartRef = useRef(null);
  const [downloadChart, setDownloadChart] = useState("");
  const sendRequest = useRequest();

  useEffect(() => {
    if(chartRef) {
      setDownloadChart(chartRef.current.toBase64Image());
    }
  }, [chartRef]);

  const handleDownload = async () => {
    const res = await sendRequest(`descargarmapa`, {
      nombre_pais: country.pais,
      nombre_localidad: localidad.nombre
    }, "POST", true);
    const htmlContent = await res.text();
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mapa.html';
    a.click();
    window.URL.revokeObjectURL(url);
  }

  return (
    <Container>
      <BackButton onClick={handleBack}><i className="fa-solid fa-xmark"></i></BackButton>
      <h2>{localidad.nombre}</h2>
      <p>{country.pais}</p>
      <BarChart ref={chartRef} pines={localidad.pines.filter(pin => pin.enfermedad !== "Tomate Sano")} />
      <div className='buttons'>
        <Button bg={colors.pastel3} size="little" onClick={handleDownload} type="primary">Descargar mapa</Button>
        <Button 
          bg={colors.tertiary300} 
          htmlElement="a" 
          size="little" 
          type="primary" 
          download="gráfica.png"
          href={downloadChart}
        >Descargar gráfica</Button>
        <Button bg={colors.tertiary500} size="little" disabled type="primary">Más reportes</Button>
      </div>
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
    font-weight: 600;
  }

  & > .buttons {
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    justify-content: center;
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