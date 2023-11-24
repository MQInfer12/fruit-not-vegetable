import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import colors from '../../../styles/colors'
import { initPayPalButton } from '../../../utilities/initPaypal';
import CartData from '../../../utilities/cartData';
import Swal from 'sweetalert2';
import { sendRequest } from '../../../utilities/sendRequest';
import { useUser } from '../../../context/user';
import { useNavigate } from 'react-router-dom';

const Pay = ({ setPage, itemId, registerForm }) => {
  const paypalInitRef = useRef(false);
  const item = CartData.find(i => i.id === itemId);
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const handleSuccess = async () => {
      if(registerForm) {
        const res = await sendRequest("register", {
          email: registerForm.email,
          nombre: registerForm.nombre,
          password: registerForm.password,
          rol: itemId
        });
        if(res) {
          setUser(res);
        }
      } else {
        const res = await sendRequest(`usuario/${user.email}`, {
          email: user.email,
          nombre: user.nombre,
          pais: user.pais,
          ciudad: user.ciudad,
          rol: user.rol + itemId
        }, "PUT");
        if(res) {
          setUser(res);
          navigate("/login");
        }
      }
      Swal.fire({
        title: "¡Correcto!",
        text: "El pago fué realizado exitosamente",
        icon: "success"
      });
    }
    if (!paypalInitRef.current) {
      initPayPalButton(item?.precio, handleSuccess);
      paypalInitRef.current = true;
    }
  }, []);

  return (
    <Container>
      <div className='items'>
        <div className='title'>
          <BackButton onClick={() => setPage(0)}><i className="fa-solid fa-chevron-left"></i></BackButton>
          <h2>Métodos de pago</h2>
        </div>
        <h3>Total: {item?.precio} US$</h3>
        <div className='container'>
          <div id="paypal-button-container" />
        </div>
      </div>
    </Container>
  )
}

export default Pay

const Container = styled.div`
  width: 824px;
  & > .items {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
    overflow: auto;
    & > h3 {
      font-size: 1.1rem;
      color: ${colors.primary500};
      font-weight: 600;
      font-family: 'Chillax';
    }
    & > .title {
      padding-left: 24px;
      display: flex;
      align-items: center;
      gap: 8px;
      align-self: flex-start;
      & > h2 {
        color: ${colors.primary500};
        font-size: 1.4rem;
        font-weight: 600;
        font-family: 'Chillax';
      }
    }
    & > .container {
      width: 50%;
    }
  }
`;

const BackButton = styled.button`
  border: none;
  background-color: transparent;
  color: ${colors.primary500};
  font-size: 1.2rem;
  cursor: pointer;
  transition: scale 0.3s;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    scale: 1.2;
  }
`;