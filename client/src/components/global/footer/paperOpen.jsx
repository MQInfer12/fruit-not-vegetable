import React from 'react'
import { styled } from 'styled-components';
import colors from '../../../styles/colors';

const PaperOpen = ({ value }) => {
  return (
    <Container>
      <div className='img-container'>
        <Img src={`${import.meta.env.VITE_BACKEND}logo/${value.codigo_pais}${value.id}`} />
      </div>
      <div className='titles-container'>
        <b>{value.empresa}</b>
        <h3>Visite nuestra <a href={"https://" + value.web} target='_blank'>página web</a></h3>
      </div>
      <div className='data'>
        <div className='data-row'>
          <i className="fa-solid fa-phone"></i>
          <p>{value.telefono}</p>
        </div>
        <div className='data-row'>
          <i className="fa-solid fa-envelope"></i>
          <p>{value.correo}</p>
        </div>
        <div className='data-row'>
          <i className="fa-solid fa-map-pin"></i>
          <p>{value.direccion}</p>
        </div>
        <div className='data-row'>
          <i className="fa-solid fa-map-location-dot"></i>
          <p>{value.ciudad} - {value.pais}</p>
        </div>
      </div>
    </Container>
  )
}

export default PaperOpen

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & .img-container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 220px;
    min-height: 220px;
    width: 100%;
  }

  & .titles-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  & .data {
    display: flex;
    flex-direction: column;
    gap: 16px;
    height: 100%;
    overflow: auto;
    padding: 8px 40px 24px;
    width: 100%;
  }

  & .data-row {
    display: flex;
    gap: 24px;
    align-items: center;
  }

  & i {
    color: rgba(0, 0, 0, .8);
    opacity: 0.6;
    width: 20px;
    text-align: center;
    font-size: 1.1rem;
  }
  & p {
    opacity: 0.5;
    text-align: justify;
    font-size: 1.1rem;
    font-weight: 600;
  }
  & b {
    opacity: 0.8;
    text-align: justify;
    font-size: 1.3rem;
    font-weight: 600;
  }

  h3 {
    align-self: center;
    font-size: 1.3rem;
    color: rgba(0, 0, 0, .8);
    opacity: 0.6;
    padding: 8px 0 16px;

    & > a {
      text-decoration: none;
      color: ${colors.primary600};
      position: relative;

      &::after {
        position: absolute;
        content: "";
        width: 100%;
        height: 1px;
        background-color: ${colors.primary600};
        left: 0;
        bottom: 0;
        transform-origin: right;
        transform: scale(0);
        transition: transform 0.3s;
      }

      &:hover::after {
        transform-origin: left;
        transform: scale(1);
      }
    }
  }
`;

const Img = styled.img`
  max-width: 80%;
  max-height: 90%;
  object-fit: cover;
`;