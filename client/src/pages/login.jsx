import React, { useState } from 'react'
import { useChangeBackground } from '../hooks/changeBackground';
import colors from '../styles/colors';
import { styled } from 'styled-components';
import InputText from '../components/contact/inputText';
import Button from '../components/global/button';
import DTLogo from '../assets/logo.png';
import { Link } from 'react-router-dom';
import { sendRequest } from '../utilities/sendRequest';
import Swal from 'sweetalert2';
import { useUser } from '../context/user';

const Login = () => {
  useChangeBackground(colors.primary500);
  const { user, setUser } = useUser();
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleSend = async (e) => {
    e.preventDefault();
    const res = await sendRequest('login', form);
    if(res) {
      if(res.error) {
        Swal.fire({
          title: "Error",
          text: res.error,
          icon: "error"
        });
        return;
      }
      Swal.fire({
        title: "¡Éxito!",
        text: "Inicio de sesión correcto",
        icon: "success"
      });
      setUser(res);
      setForm({
        email: "",
        password: ""
      });
      return;
    }
  }

  const logout = () => {
    setUser(null);
    Swal.fire({
      title: "¡Éxito!",
      text: "Cierre de sesión correcto",
      icon: "success"
    });
  }

  return (
    <Container>
      {
        !user ?
        <FormContainer>
          <div>
            <Logo src={DTLogo} />
          </div>
          <InputText 
            error={false}
            text="Email"
            value={form.email}
            onChange={e => setForm(old => ({...old, email: e.target.value}))}
          />
          <InputText 
            error={false}
            text="Contraseña"
            value={form.password}
            onChange={e => setForm(old => ({...old, password: e.target.value}))}
            type='password'
          />
          <Button type="secondary" onClick={handleSend} >Inicie sesión</Button>
          <p>¿Aún no tiene cuenta? <StyledLink to="/register">Regístrese</StyledLink></p>
        </FormContainer>
        :
        <WelcomeContainer>
          <h2>¡Bienvenido {user.nombre}!</h2>
          <p>Muchas gracias por utilizar <b>Doctor Tomatto</b>, disfrute de las funcionalidades que le ofrecemos</p>
          <div>
            {
              user.rol.includes("a") &&
              <Link to ="/analizar">Analice sus hojas de tomate</Link>
            }
            {
              user.rol.includes("m") &&
              <Link to ="/mapa">Vea el mapa de enfermedades</Link>
            }
          </div>
          <Button onClick={logout} type="secondary">Cierre sesión</Button>
        </WelcomeContainer>
      }
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

const WelcomeContainer = styled.div`
  padding: 40px;
  width: 360px;
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
    text-align: center;
  }

  & > p {
    font-size: 14px;
    text-align: center;  
    line-height: 24px;
    & > b {
      color: ${colors.primary500};
    }
  }

  & > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
  }
  & a {
    color: ${colors.tertiary300};
    transition: color 0.3s;
    text-align: center;
    &:hover {
      color: ${colors.tertiary600};
    }
  }
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