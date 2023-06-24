import React from 'react'
import { styled } from 'styled-components'
import colors from '../../styles/colors'
import Button from './button'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <StyledFooter>
      <FloatingContainer>
        <h2>Tenemos la <span>solución</span> para tu <span>huerto</span></h2>
        <Button type="primary">Analiza ahora</Button>
      </FloatingContainer>
      <ColumnsContainer>
        <div>
          <h4>Contacta con nosotros</h4>
          <div>
            <p>Contáctenos para saber cómo utilizar los beneficios de Doctor Tomatto en su organización, visítanos en nuestras redes sociales.</p>
            <IconsContainer>
              <a><i className="fa-brands fa-linkedin"></i></a>
              <a><i className="fa-brands fa-instagram"></i></a>
            </IconsContainer>
          </div>
        </div>
        <div>
          <h4>Información</h4>
          <div>
            <p>Somos una aplicación de Inteligencia Artificial (basada en Aprendizaje Profundo y Visión por Computadora) que detecta y clasifica enfermedades que se dan en la hoja de tomate.</p>
            <p>+59176407344</p>
            <p>info@tecnopolis.ai</p>
            <p>Cochabamba, Bolivia</p>
          </div>
        </div>
        <div>
          <h4>Enlaces útiles</h4>
          <div className='util-links'>
            <div>
              <div><StyledLink><i className="fa-solid fa-chevron-right"></i>Inicio</StyledLink></div>
              <div><StyledLink><i className="fa-solid fa-chevron-right"></i>Analizar Imagen</StyledLink></div>
              <div><StyledLink><i className="fa-solid fa-chevron-right"></i>Mapa</StyledLink></div>
              <div><StyledLink><i className="fa-solid fa-chevron-right"></i>Objetivo</StyledLink></div>
            </div>
            <div>
              <div><StyledLink><i className="fa-solid fa-chevron-right"></i>Crédito</StyledLink></div>
              <div><StyledLink><i className="fa-solid fa-chevron-right"></i>Instrucciones</StyledLink></div>
              <div><StyledLink><i className="fa-solid fa-chevron-right"></i>Contacto</StyledLink></div>
            </div>
          </div>
        </div>
      </ColumnsContainer>
      <CopyContainer>
        <small>© Copyright Doctor Tomatto 2021 - 2023. Todos los derechos reservados.</small>
      </CopyContainer>
    </StyledFooter>
  )
}

export default Footer

const StyledFooter = styled.footer`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: ${colors.primary600};
  color: ${colors.white};
  position: relative;
  z-index: 5;
`;

const FloatingContainer = styled.div`
  display: flex;
  gap: 100px;
  align-items: center;
  padding: 10px 40px;
  background-color: ${colors.primary200};
  margin-bottom: 40px;
  margin-top: 40px;

  & > h2 {
    font-weight: 600;
    font-family: 'Chillax';
    line-height: 32px;
    color: ${colors.primary400};
    text-align: center;

    & > span {
      color: ${colors.primary500};
    }
  }

  @media screen and (max-width: 790px) {
    flex-direction: column;
    gap: 20px;
    padding: 20px 40px;
  }
`;

const ColumnsContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  padding: 0 40px 40px;
  gap: 80px;
  border-bottom: 1px solid ${colors.white};

  @media screen and (max-width: 950px) {
    flex-direction: column;
    align-items: center;
    gap: 40px;
  }

  & > div {
    width: 350px;
    display: flex;
    flex-direction: column;
    gap: 40px;

    @media screen and (max-width: 500px) {
      width: 100%;
    }

    & > h4 {
      text-align: center;
    }

    & > div {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    & p, a {
      font-size: .8rem;
      line-height: 28px;
      text-align: justify;
      transition: all 0.3s;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    & a {
      width: max-content;
      cursor: pointer;
    }

    & a:hover {
      opacity: 0.7;
    }

    & .util-links {
      flex-direction: row;
      gap: 40px;

      & > div {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 20px;
      }
    }
  }
`;

const StyledLink = styled(Link)`
  font-size: .8rem;
  line-height: 28px;
  text-align: justify;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 10px;
  color: ${colors.white};
  text-decoration: none;
`;

const IconsContainer = styled.div`
  display: flex;
  gap: 10px;

  & i {
    font-size: 32px;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      opacity: 0.7;
    }
  }
`;

const CopyContainer = styled.div`
  padding: 20px;
`;