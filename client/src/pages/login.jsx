import React from 'react'
import { useChangeBackground } from '../hooks/changeBackground';
import colors from '../styles/colors';
import { styled } from 'styled-components';
import InputText from '../components/contact/inputText';
import Button from '../components/global/button';
import DTLogo from '../assets/logo.png';
import DTText from '../assets/text-green.png';
import { Link } from 'react-router-dom';

const Login = () => {
  useChangeBackground(colors.primary500);

  return (
    <Container>
      <FormContainer>
        <div>
          <Logo src={DTLogo} />
        </div>
        <InputText 
          error={false}
          text="Email"
          onChange={() => {}}
        />
        <InputText 
          error={false}
          text="Contraseña"
          onChange={() => {}}
          type='password'
        />
        <Button type="secondary" onClick={() => {}} >Iniciar sesión</Button>
        <p>¿Aún no tienes cuenta? <StyledLink to="/register">Regístrate</StyledLink></p>
      </FormContainer>
    </Container>
  )
}

export default Login

const Container = styled.section`
  min-height: calc(100dvh - 32px);
  padding: 100px 40px 65px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const FormContainer = styled.form`
  padding: 40px;
  background-color: ${colors.primary200};
  border: 8px solid ${colors.primary400};
  box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.3);
  gap: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;

  & > div {
    display: flex;
    flex-direction: column;
  }

  & > h2 {
    font-size: 18px;
    font-weight: 700;
    color: ${colors.primary500};
  }

  & > p {
    font-size: 14px;
    text-align: center;
  }
`;

const StyledLink = styled(Link)`
  color: ${colors.primary500};
  text-decoration: none;
  transition: all 0.3s;

  &:hover {
    opacity: 0.7;
  }
`

const Logo = styled.img`
  width: 100px;
`;