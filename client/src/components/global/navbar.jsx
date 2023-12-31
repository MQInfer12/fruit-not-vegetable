import React, { useEffect } from 'react'
import { createGlobalStyle, styled } from 'styled-components'
import Logo from '../../assets/logo.png'
import TextWhite from '../../assets/text-white.png'
import TextGreen from '../../assets/text-green.png'
import colors from '../../styles/colors'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { useBackground } from '../../context/background'
import { useState } from 'react'
import { useUser } from '../../context/user'

const Navbar = () => {
  const { color } = useBackground();
  const [openLinks, setOpenLinks] = useState(false);
  const { pathname } = useLocation();
  const { user } = useUser();

  useEffect(() => {
    window.scrollTo(0, 0);
    setOpenLinks(false);
  }, [pathname]);

  return (
    <Relative>
      <Nav bg={color}>
        <GlobalStyle bg={color} />
        <LogoContainer to="/">
          <Img src={Logo} />
          <LogoText src={color === colors.primary500 ? TextWhite : TextGreen} />
        </LogoContainer>
        <Ul bg={color} open={openLinks}>
          <li><StyledLink to="/">Inicio</StyledLink></li>
          <li><StyledLink to="/analizar">Analizar Imagen</StyledLink></li>
          <li><StyledLink to="/mapa">Mapa Enfermedades</StyledLink></li>
          <li><StyledLink to="/objetivo">Objetivo</StyledLink></li>
          <li><StyledLink to="/blog">Blog</StyledLink></li>
          <li><StyledLink to="/contacto">Contacto</StyledLink></li>
        </Ul>
        <IconContainer>
          {
            user && 
            <IconLink to="/cart" className="fa-solid fa-cart-shopping" />
          }
          <IconLink className="fa-regular fa-user" to="/login" />
          <BurgerButton onClick={() => setOpenLinks(!openLinks)}>
            {openLinks ? <i className="fa-solid fa-xmark"></i> : <i className="fa-solid fa-bars"></i>}
          </BurgerButton>
        </IconContainer>
      </Nav>
    </Relative>
  )
}

export default Navbar

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${props => props.bg};
    transition: background-color 0.3s;
  }
`;

const Relative = styled.nav`
  position: relative;
`;

const Nav = styled.div`
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 1001;
  display: flex;
  flex-direction: row;
  height: 85px;
  justify-content: space-between;
  padding: 10px 140px;
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

  @media screen and (max-width: 1640px) {
    padding: 10px 40px;
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
  height: 100%;
`;

const LogoText = styled.img`
  transition: all 0.3s;
  width: 160px;

  @media screen and (max-width: 530px) {
    width: 100px;
  }
  @media screen and (max-width: 460px) {
    display: none;
  }
`;

const Ul = styled.ul`
  display: flex;
  flex-direction: row;
  list-style: none;
  gap: 40px;
  background-color: ${props => props.bg};
  transition: background-color 0.3s;

  @media screen and (max-width: 1260px) {
    opacity: ${props => props.open ? "1" : "0"};
    pointer-events: ${props => !props.open && "none"};
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    justify-content: center;
    padding: 0 40px 20px;
    flex-wrap: wrap;
    transition: all 0.3s;
  }
`;

const StyledLink = styled(NavLink)`
  cursor: pointer;
  font-family: 'DM Sans';
  transition: all 0.3s;
  text-decoration: none;
  position: relative;
  white-space: nowrap;

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

const IconLink = styled(Link)`
  height: 20px;
  width: 20px;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;

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

  @media screen and (max-width: 1260px) {
    display: flex;
  }
`;  