import React, { useEffect, useState } from 'react'
import { useChangeBackground } from '../hooks/changeBackground';
import colors from '../styles/colors';
import { styled } from 'styled-components';
import InputText from '../components/contact/inputText';
import Button from '../components/global/button';
import DTLogo from '../assets/logo.png';
import { Link, Navigate } from 'react-router-dom';
import Cart from '../components/global/cart';
import Swal from 'sweetalert2';
import { useUser } from '../context/user';
import { sendRequest } from '../utilities/sendRequest';

const Register = () => {
  useChangeBackground(colors.primary500);
  const [cart, setCart] = useState(false);
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    password: ""
  });
  const [sended, setSended] = useState(false);
  const [errors, setErrors] = useState({
    reseted: true
  });
  const { user } = useUser();

  
  useEffect(() => {
    const newErrors = {};
    if(!form.nombre.trim()) {
      newErrors.nombre = "El nombre es requerido";
    }
    if(!form.email.trim()) {
      newErrors.email = "El email es requerido";
    }
    if(!form.password.trim()) {
      newErrors.password = "La contraseña es requerida";
    }
    setErrors(newErrors);
  }, [form.nombre, form.email, form.password])

  const handleGoToCart = async (e) => {
    e.preventDefault();
    if(Object.keys(errors).length) {
      setSended(true);
      Swal.fire({
        title: "Error",
        text: "Compruebe que no existan errores en el formulario",
        icon: "error"
      })
      return;
    }
    const res = await sendRequest("checkmail", {
      email: form.email
    });
    if(res.status === 1) {
      setCart(true);
    } else if (res.status === 2) {
      Swal.fire({
        title: "Error",
        text: res.message,
        icon: "error"
      })
    }
  }

  if(!!user) return <Navigate to="/login" />
  return (
    <Container>
      {
        !cart ?
        <FormContainer>
          <div>
            <Logo src={DTLogo} />
          </div>
          <InputText 
            error={errors.nombre}
            text="Nombre"
            value={form.nombre}
            onChange={e => setForm(old => ({...old, nombre: e.target.value }))}
            trigger={sended}
          />
          <InputText 
            error={errors.email}
            text="Email"
            value={form.email}
            onChange={e => setForm(old => ({...old, email: e.target.value }))}
            trigger={sended}
          />
          <InputText 
            error={errors.password}
            text="Contraseña"
            value={form.password}
            onChange={e => setForm(old => ({...old, password: e.target.value }))}
            type='password'
            trigger={sended}
          />
          <Button type="secondary" onClick={handleGoToCart}>Regístrese</Button>
          <p>¿Ya tiene una cuenta? <StyledLink to="/login">Inicie sesión</StyledLink></p>
        </FormContainer> :
        <Cart 
          registerForm={form}
          goBack={() => setCart(false)}
          showItems={["a", "m", "am"]}
        />
      }
    </Container>
  )
}

export default Register

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