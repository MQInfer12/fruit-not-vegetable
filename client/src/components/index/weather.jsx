import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import colors from '../../styles/colors'
import { useUser } from '../../context/user';
import { useGet } from '../../hooks/useGet';

const Weather = () => {
  const [open, setOpen] = useState(false);
  const { actualCity, actualCoords } = useUser();
  const { data, getData } = useGet(
    `https://api.openweathermap.org/data/2.5/weather?lat=${actualCoords?.[0]}&lon=${actualCoords?.[1]}&appid=${import.meta.env.VITE_WEATHER}`,
    null,
    false,
    true
  );
  
  const changeOpen = () => {
    if(document.startViewTransition) {
      document.startViewTransition(() => {
        setOpen(!open);
      })
    } else {
      setOpen(!open);
    }
  }

  useEffect(() => {
    if(actualCoords) {
      getData();
    }
  }, [actualCoords]);

  const today = new Date();
  const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
  const months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
  const weathers = {
    Thunderstorm: "Tomenta eléctrica",
    Drizzle: "Llovizna",
    Rain: "Lluvia",
    Snow: "Nieve",
    Mist: "Nieblina",
    Smoke: "Humo",
    Haze: "Bruma",
    Dust: "Polvo",
    Fog: "Niebla",
    Sand: "Areniscas",
    Dust: "Polvaredas",
    Ash: "Cenizas",
    Squall: "Chubascos",
    Tornado: "Tornado",
    Clear: "Despejado",
    Clouds: "Nubes"
  }
  if(!data) return null;
  return (
    <WeatherContainer 
      open={open}
      onClick={changeOpen}
      style={{
        viewTransitionName: "weather-container"
      }}
    >
      <TopContainer
        open={open}
      >
        <p 
          style={{
            viewTransitionName: "weather-city"
          }}
        >{actualCity}</p>
        <div>
          <img
            className="fa-solid fa-cloud-rain"
            src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} 
            style={{
              viewTransitionName: "weather-icon"
            }}
          />
          <div className='data'>
            <p>{days[today.getDay() - 1]} | {months[today.getMonth()]} {today.getDate()}</p>
            <div>
              <h2
                style={{
                  viewTransitionName: "weather-degrees"
                }}
              >{(data.main.temp - 273.15).toFixed(1)}º</h2>
              <p>{weathers[data.weather[0].main]}</p>
            </div>
          </div>
        </div>
        {
          !open &&
          <ExpandIcon className="fa-solid fa-chevron-down" />
        }
      </TopContainer>
      <BottomContainer
        open={open}
      >
        <div>
          <i className="fa-solid fa-location-arrow" />
          <div>
            <p>{data.wind.speed} Km/h</p>
            <b>Viento</b>
          </div>
        </div>
        <div>
          <i className="fa-solid fa-cloud-showers-heavy" />
          <div>
            <p>{(data.main.feels_like - 273.15).toFixed(1)}º</p>
            <b>Sensación</b>
          </div>
        </div>
        <div>
          <i className="fa-solid fa-droplet" />
          <div>
            <p>{data.main.humidity} %</p>
            <b>Humedad</b>
          </div>
        </div>
        <div>
          <i className="fa-solid fa-temperature-half" />
          <div>
            <p>{data.main.pressure} hPa</p>
            <b>Presión</b>
          </div>
        </div>
      </BottomContainer>
    </WeatherContainer>
  )
}

export default Weather

const WeatherContainer = styled.div`
  position: absolute;
  background-color: ${colors.tertiary400};
  border: 4px solid ${colors.primary400};
  color: ${colors.white};
  border-radius: 8px;
  right: 4vw;
  top: 90px;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  padding: ${props => props.open ? "8px" : "4px 0 0"};
  animation: appear 1s;

  @keyframes appear {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const TopContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  gap: ${props => props.open ? "16px" : "8px"};
  padding: ${props => props.open ? "8px 24px" : "4px"};
  border-bottom: ${props => props.open ? `1px solid ${colors.primary400}` : "none"};
  & > p {
    font-weight: 600;
    color: ${props => props.open ? colors.white : colors.white};
    font-size: ${props => props.open ? "1rem" : "0.8rem"};
    width: ${props => props.open ? "100%" : "100px"};
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    text-align: center;
  }
  & > div {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: ${props => props.open ? "row" : "column"};
    gap: ${props => props.open ? "32px" : "4px"};
    & > img {
      height: 64px;
      width: 64px;
      font-size: 48px;
      color: ${colors.primary500};
    }
    & > .data {
      display: flex;
      flex-direction: column;
      align-items: center;
      & > p {
        font-size: 0.8rem;
        opacity: 0.6;
        display: ${props => props.open ? "block" : "none"};
      }
      & > div {
        display: flex;
        flex-direction: column;
        align-items: center;
        & > h2 {
          color: ${colors.primary500};
          font-weight: 600;
          font-family: 'Chillax';
          font-size: ${props => props.open ? "2rem" : "1.4rem"};
        }
        & > p {
          opacity: 0.8;
          font-weight: 600;
          display: ${props => props.open ? "block" : "none"};
        }
      }
    }
  }
`;

const ExpandIcon = styled.i`
  position: absolute;
  bottom: -4px;
  left: -4px;
  font-size: 16px;
  transform: rotate(45deg);
  color: ${colors.primary500};
`;

const BottomContainer = styled.div`
  display: ${props => props.open ? "flex" : "none"};
  width: 240px;
  flex-wrap: wrap;
  padding: 16px 0 8px;
  row-gap: 8px;
  & > div {
    width: 120px;
    display: flex;
    align-items: center;
    gap: 8px;
    & > i {
      width: 32px;
      text-align: center;
      font-size: 24px;
      color: ${colors.primary500};
    }
    & > div {
      display: flex;
      flex-direction: column;
      & > p {
        font-size: 0.8rem;
        opacity: 0.8;
      }
      & > b {
        font-size: 0.7rem;
        color: ${colors.primary500};
      }
    }
  }
`;