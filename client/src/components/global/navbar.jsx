import React from 'react'
import { createGlobalStyle, styled } from 'styled-components'
import Logo from '../../assets/logo.png'
import colors from '../../styles/colors'
import { NavLink, Link } from 'react-router-dom'
import { useBackground } from '../../context/background'
import { useState } from 'react'

const Navbar = () => {
  const { color } = useBackground();
  const [openLinks, setOpenLinks] = useState(false);

  return (
    <Relative>
      <Nav bg={color}>
        <GlobalStyle bg={color} />
        <LogoContainer to="/">
          <Img src={Logo} />
          <LogoText>Doctor <span>Tomatto</span></LogoText>
        </LogoContainer>
        <Ul bg={color} open={openLinks}>
          <li><StyledLink to="/">Inicio</StyledLink></li>
          <li><StyledLink to="/analizar">Analizar Imagen</StyledLink></li>
          <li><StyledLink to="/mapa">Mapa</StyledLink></li>
          <li><StyledLink to="/objetivo">Objetivo</StyledLink></li>
          <li><StyledLink to="/credito">Crédito</StyledLink></li>
          <li><StyledLink to="/instrucciones">Instrucciones</StyledLink></li>
          <li><StyledLink to="/contacto">Contacto</StyledLink></li>
        </Ul>
        <IconContainer>
          <a><IconLink className="fa-solid fa-magnifying-glass"></IconLink></a>
          <a><IconLink className="fa-regular fa-user"></IconLink></a>
          <a><IconLink className="fa-solid fa-cart-shopping"></IconLink></a>
          <BurgerButton onClick={() => setOpenLinks(!openLinks)}><i className="fa-solid fa-bars"></i></BurgerButton>
        </IconContainer>
      </Nav>
    </Relative>
  )
}

export default Navbar

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${props => props.bg};
    transition: all 0.3s;
  }
`;

const Relative = styled.nav`
  position: relative;
`;

const Nav = styled.div`
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 5;
  display: flex;
  flex-direction: row;
  height: 85px;
  justify-content: space-between;
  padding: 20px 140px;
  align-items: center;
  background-color: ${props => props.bg};
  transition: all 0.3s;
  gap: 20px;

  & * {
    color: ${props => props.bg === colors.primary500 ? colors.white : colors.primary500};

    &::after {
      background-color: ${props => props.bg === colors.primary500 ? colors.white : colors.primary500};
    }
  }

  @media screen and (max-width: 1400px) {
    padding: 20px 40px;
  }
`;

const LogoContainer = styled(Link)`
  height: 100%;
  display: flex;
  align-items: center;
  gap: 15px;
  cursor: pointer;
  text-decoration: none;
`;

const Img = styled.img`
  height: 80%;
`;

const LogoText = styled.p`
  transition: all 0.3s;

  & > span {
    font-weight: 700;
    transition: all 0.3s;
  }

  @media screen and (max-width: 480px) {
    display: none;
  }
`;

const Ul = styled.ul`
  display: flex;
  flex-direction: row;
  list-style: none;
  gap: 40px;
  background-color: ${props => props.bg};
  transition: all 0.3s;

  @media screen and (max-width: 1200px) {
    opacity: ${props => props.open ? "1" : "0"};
    pointer-events: ${props => !props.open && "none"};
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    justify-content: center;
    padding: 0 40px 20px;
    flex-wrap: wrap;
  }
`;

const StyledLink = styled(NavLink)`
  cursor: pointer;
  font-family: 'DM Sans';
  transition: all 0.3s;
  text-decoration: none;
  position: relative;

  &::after {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    content: "";
    height: 1px;
    scale: 0;
    transform-origin: right;
    transition: scale .5s;
  }

  &.active::after, &:hover::after {
    scale: 1;
    transform-origin: left;
  }

  &:hover {
    opacity: 0.7;
  }
`;

const IconContainer = styled.div`
  display: flex;
  gap: 18px;
  align-items: center;
`;

const IconLink = styled.i`
  height: 20px;
  width: 20px;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    opacity: 0.7;
  }
`;

const BurgerButton = styled.button`
  background-color: transparent;
  border: none;
  height: 20px;
  width: 20px;
  font-size: 20px;
  margin-left: 20px;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
  display: none;

  &:hover {
    opacity: 0.7;
  }

  @media screen and (max-width: 1200px) {
    display: flex;
  }
`;  