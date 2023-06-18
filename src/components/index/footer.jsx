import React from 'react'
import { styled } from 'styled-components'
import colors from '../../styles/colors'
import Button from '../global/button'

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
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt unde, ab neque ea repellat quas non dolorem! Tempora, in ratione!</p>
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
          <div>
            <div><a><i className="fa-solid fa-chevron-right"></i>Shop</a></div>
            <div><a><i className="fa-solid fa-chevron-right"></i>Products</a></div>
            <div><a><i className="fa-solid fa-chevron-right"></i>Fertilizer</a></div>
            <div><a><i className="fa-solid fa-chevron-right"></i>Guide</a></div>
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
  background-color: ${colors.primary500};
  padding: 100px 0 0;
  color: ${colors.white};
  position: relative;
`;

const FloatingContainer = styled.div`
  position: absolute;
  display: flex;
  gap: 100px;
  align-items: center;
  left: 50%;
  transform: translateX(-50%);
  top: -40px;
  padding: 10px 40px;
  background-color: ${colors.primary200};

  & > h2 {
    font-weight: 600;
    font-family: 'Chillax';
    line-height: 72px;
    color: ${colors.primary400};

    & > span {
    color: ${colors.primary500};
    }
  }
`;

const ColumnsContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  padding-bottom: 40px;
  border-bottom: 1px solid ${colors.white};

  & > div {
    width: 350px;
    display: flex;
    flex-direction: column;
    gap: 40px;

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
  }
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