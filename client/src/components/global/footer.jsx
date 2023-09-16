import React from 'react'
import { styled } from 'styled-components'
import colors from '../../styles/colors'
import Button from './button'
import { useNavigate } from 'react-router-dom'
import Sponsors from './footer/sponsors'
import Logo from '../../assets/logotext-white.png'
import Legals from './footer/legals'

const Footer = ({ sponsors }) => {
  const navigate = useNavigate();

  return (
    <StyledFooter>
      <FloatingContainer>
        <h2>Tenemos la <span>solución</span> para tu <span>cultivo</span></h2>
        {sponsors && <Sponsors sponsorData={sponsors} />}
      </FloatingContainer>
      <ColumnsContainer>
        <div>
          <img src={Logo} />
        </div>
        <div>
          {/* <h4>Ubicaciones</h4> */}
          <div>
            <p>Av. Villarroel</p>
            <p>Cochabamba, Bolivia</p>
            <p>info@tecnopolis.ai</p>
            <p>+59172244087</p>
          </div>
        </div>
        <div>
          {/* <h4>Enlaces útiles</h4> */}
          <div className='util-links'>
            <div>
              <div><StyledLink onClick={() => navigate("/")}><i className="fa-solid fa-chevron-right"></i>Inicio</StyledLink></div>
              <div><StyledLink onClick={() => navigate("/analizar")}><i className="fa-solid fa-chevron-right"></i>Analizar Imagen</StyledLink></div>
              <div><StyledLink onClick={() => navigate("/mapa")}><i className="fa-solid fa-chevron-right"></i>Mapa Enfermedades</StyledLink></div>
              <div><StyledLink onClick={() => navigate("/objetivo")}><i className="fa-solid fa-chevron-right"></i>Objetivo</StyledLink></div>
              <div><StyledLink onClick={() => navigate("/instrucciones")}><i className="fa-solid fa-chevron-right"></i>Instrucciones</StyledLink></div>
            </div>
          </div>
        </div>
        <div>
          <Button type="secondary" onClick={() => navigate("/contacto")}>¡Entre en contacto!</Button>
          <div>
            <IconsContainer>
              <a><i className="fa-brands fa-linkedin"></i></a>
              <a><i className="fa-brands fa-instagram"></i></a>
            </IconsContainer>
          </div>
        </div>
      </ColumnsContainer>
      <Legals />
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
  width: 80%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: 10px 0;
  background-color: ${colors.primary200};
  margin-bottom: 40px;
  margin-top: 40px;
  position: relative;
  isolation: isolate;

  @media screen and (max-width: 600px) {
    width: 100%;
  }

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
  flex-wrap: wrap;

  @media screen and (max-width: 1460px) {
    gap: 20px;
  }

  @media screen and (max-width: 1460px) {
    gap: 40px;
  }

  & > div {
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    gap: 24px;
    min-width: 250px;

    @media screen and (max-width: 500px) {
      width: 100%;
    }

    & img {
      width: 200px;
      height: 200px;
      object-fit: cover;
    }

    & > h4 {
      text-align: center;
    }

    & > div {
      display: flex;
      flex-direction: column;
      gap: 12px;
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
        gap: 12px;
      }
    }
  }
`;

const StyledLink = styled.button`
  font-size: .8rem;
  line-height: 28px;
  text-align: justify;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 10px;
  color: ${colors.white};
  text-decoration: none;
  background-color: transparent;
  border: none;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    opacity: 0.7;
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