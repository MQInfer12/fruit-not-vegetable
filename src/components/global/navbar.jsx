import React, { useState } from 'react'
import { styled } from 'styled-components'
import Logo from '../../assets/logo.png'
import colors from '../../styles/colors'
import { useEffect } from 'react'

const Navbar = () => {
  const [onPrimary, setOnPrimary] = useState(true);
  
  useEffect(() => {
    window.addEventListener('scroll', (e) => {
      document.getScroll = function() {
        if (window.pageYOffset != undefined) {
            return [pageXOffset, pageYOffset];
        } else {
            let r = d.documentElement, b = d.body;
            sx = r.scrollLeft || b.scrollLeft || 0;
            sy = r.scrollTop || b.scrollTop || 0;
            return [sx, sy];
        }
      }
      const [sx, sy] = document.getScroll();
      if(window.innerHeight - sy > 50) {
        setOnPrimary(true);
      } else {
        setOnPrimary(false);
      };
    })
  }, []);

  return (
    <Nav onPrimary={onPrimary}>
      <Relative>
        <Ul>
          <li><StyledLink>Shop</StyledLink></li>
          <li><StyledLink>Products</StyledLink></li>
          <li><StyledLink>Fertilizer</StyledLink></li>
          <li><StyledLink>Guide</StyledLink></li>
        </Ul>
        <LogoContainer>
          <Img src={Logo} />
          <LogoText>Doctor <span>Tomatto</span></LogoText>
        </LogoContainer>
        <IconContainer>
          <a><IconLink className="fa-solid fa-magnifying-glass"></IconLink></a>
          <a><IconLink className="fa-regular fa-user"></IconLink></a>
          <a><IconLink className="fa-solid fa-cart-shopping"></IconLink></a>
        </IconContainer>
      </Relative>
    </Nav>
  )
}

export default Navbar

const Nav = styled.nav`
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 5;

  & * {
    color: ${props => !props.onPrimary ? colors.primary500 : colors.white};
  }
`;

const Relative = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  height: 85px;
  justify-content: space-between;
  padding: 20px 140px 0;
  align-items: center;
`;

const LogoContainer = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  height: 100%;
  display: flex;
  align-items: center;
  gap: 15px;
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
`;

const Ul = styled.ul`
  display: flex;
  flex-direction: row;
  list-style: none;
  gap: 40px;
`;

const StyledLink = styled.a`
  cursor: pointer;
  font-family: 'DM Sans';
  transition: all 0.3s;
  
  &:hover {
    opacity: 0.7;
  }
`;

const IconContainer = styled.div`
  display: flex;
  gap: 18px;
`;

const IconLink = styled.i`
  height: 20px;
  width: 20px;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    opacity: 0.7;
  }
`;