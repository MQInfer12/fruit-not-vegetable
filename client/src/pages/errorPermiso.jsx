import React, { useEffect } from 'react'
import styled from 'styled-components';
import colors from '../styles/colors';
import { useLocation } from 'react-router-dom';
import { useBackground } from '../context/background';
import useWidth from '../hooks/useWidth';
import Button from '../components/global/button';

const ErrorPermiso = ({ title, text, buttonText, onClick, cart }) => {
  const location = useLocation();
  const width = useWidth();
  const { changeColor, color } = useBackground();

  useEffect(() => {
    if(location.pathname === "/mapa") {
      changeColor(colors.primary500);
    }
    if(location.pathname === "/analizar") {
      if(width > 560){
        changeColor(colors.primary200);
      } else {
        changeColor(colors.secondary500);
      }
    } 
  }, [location])

  return (
    <Container>
      {
        cart ||
        <DataContainer bg={color}>
          {title && <h2>{title}</h2>}
          <p>{text}</p>
          <Button onClick={onClick} max type="secondary">{buttonText}</Button>
        </DataContainer>
      }
    </Container>
  )
}

export default ErrorPermiso

const Container = styled.section`
  min-height: calc(100dvh - 32px);
  padding: 145px 140px 60px;
  display: flex;
  justify-content: space-around;
  align-items: center;

  @media screen and (max-width: 560px) {
    padding: 85px 20px 85px;
  }
`;

const DataContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  background-color: ${colors.primary300};
  padding: 24px;
  text-align: center;
  width: 540px;
  max-width: 100%;
  transition: all 0.2s;
  border: 4px solid ${props => props.bg === colors.primary500 ? colors.primary400 : colors.primary500};

  & > h2 {
    font-size: 2rem;
    color: ${colors.primary500};
    font-weight: 600;
    font-family: 'Chillax';
  }
`;