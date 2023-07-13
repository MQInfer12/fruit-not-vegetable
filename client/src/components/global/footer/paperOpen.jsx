import React from 'react'
import { styled } from 'styled-components';
import colors from '../../../styles/colors';

const PaperOpen = ({ img }) => {
  return (
    <Container>
      <div className='img-container'>
        <Img src={img} />
      </div>
      <div className='data'>
        <div className='data-row'>
          <h4>Teléfono</h4>
          <p>+59192739418</p>
        </div>
        <div className='data-row'>
          <h4>Email</h4>
          <p>test@example.com</p>
        </div>
        <div className='data-row'>
          <h4>Ubicación</h4>
          <p>Calle Los Ángeles, esq. América y Libertadores</p>
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
    height: 100%;
    width: 100%;
  }

  & .data {
    display: flex;
    flex-direction: column;
    gap: 12px;
    height: 120%;
    padding: 0 20px 20px;
  }

  & .data-row {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  & h4 {
    font-family: "Chillax";
    color: ${colors.primary500};
  }
  & p {
    line-height: 28px;
    text-align: justify;
  }
`;

const Img = styled.img`
  max-width: 80%;
  max-height: 90%;
  object-fit: cover;
`;