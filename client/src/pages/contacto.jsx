import React, { useState } from 'react'
import { styled } from 'styled-components';
import colors from '../styles/colors';
import { useInterval } from '../hooks/useInterval';
import Button from '../components/global/button';
import { useChangeBackground } from '../hooks/changeBackground';

const Contacto = () => {
  const active = useInterval(4000, 3);
  useChangeBackground(colors.primary300);

  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [asunto, setAsunto] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleClick = async (e) => {
    e.preventDefault();
    const res = await fetch("http://127.0.0.1:8000/correo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        subject: asunto,
        name: nombre,
        mail: email,
        message: mensaje
      })
    });
    if(res.ok) {
      const resJson = await res.json();
      alert(resJson.message);
      setNombre("");
      setEmail("");
      setAsunto("");
      setMensaje("");
    }
  }

  return (
    <Container>
      <Form>
        <div>
          <input required id="nombre" type="text" 
            value={nombre} 
            onChange={e => setNombre(e.target.value)} 
          />
          <label htmlFor="nombre">Nombre</label>
        </div>
        <div>
          <input required id="email" type="text" 
            value={email} 
            onChange={e => setEmail(e.target.value)} 
          />
          <label htmlFor="email">Email</label>
        </div>
        <div>
          <input required id="asunto" type="text"
            value={asunto} 
            onChange={e => setAsunto(e.target.value)} 
          />
          <label htmlFor="asunto">Asunto</label>
        </div>
        <div>
          <textarea required id="mensaje" 
            value={mensaje} 
            onChange={e => setMensaje(e.target.value)} 
          />
          <label htmlFor="mensaje">Mensaje</label>
        </div>
        <Button onClick={handleClick} type="primary" max>Enviar</Button>
      </Form>
      <RightContainer>
        <RightInfo>
          <div className='text-container'>
            <h3>Contacta con nosotros</h3>
            <p>Contáctenos para saber cómo utilizar los beneficios de Doctor Tomatto en su organización, o si lo prefiere, envíenos un correo electrónico.</p>
          </div>
          <div className='icons-container'>
            <InfoIconContainer active={active === 0}><i className="fa-solid fa-phone"></i><p>+59176407344</p></InfoIconContainer>
            <InfoIconContainer active={active === 1}><i className="fa-solid fa-envelope"></i><p>info@tecnopolis.ai</p></InfoIconContainer>
            <InfoIconContainer active={active === 2}><i className="fa-solid fa-map-pin"></i><p>Cochabamba, Bolivia</p></InfoIconContainer>
          </div>
        </RightInfo>
        <IconsContainer>
          <a><i className="fa-brands fa-linkedin"></i></a>
          <a><i className="fa-brands fa-instagram"></i></a>
        </IconsContainer>
      </RightContainer>
    </Container>
  )
}

export default Contacto

const Container = styled.section`
  min-height: calc(100dvh - 32px);
  padding: 85px 140px 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 80px;

  @media screen and (max-width: 1680px) {
    padding: 85px 60px 0;
  }

  @media screen and (max-width: 1520px) {
    padding: 140px 60px 85px;
    gap: 40px;
    flex-direction: column-reverse;
  }

  @media screen and (max-width: 550px) {
    padding: 140px 0 85px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 32px;
  background-color: ${colors.white};
  padding: 40px;

  @media screen and (max-width: 700px) {
    width: 100%;
  }

  & > div {
    position: relative;

    & > label {
      position: absolute;
      pointer-events: none;
      left: 12px;
      top: 12px;
      transition: all 0.5s;
      padding: 2px 6px;
    }

    & > input, textarea {
      padding: 12px;
      font-size: 1rem;
      outline: none;
      resize: none;
      border: 1px solid ${colors.gray200};
      width: 500px;

      @media screen and (max-width: 700px) {
        width: 100%;
      }

      &:focus ~ label, &:valid ~ label {
        font-size: .8rem;
        top: -14px;
        color: ${colors.white};
        background-color: ${colors.primary500};
      }
    }
  } 

  & > button {
    align-self: end;
  }
`;

const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${colors.primary200};
  padding: 32px;
  gap: 40px;

  @media screen and (max-width: 550px) {
    width: 100%;
  }
`;

const RightInfo = styled.div`
  display: flex;
  gap: 64px;
  align-items: center;

  @media screen and (max-width: 860px) {
    flex-direction: column;
    gap: 40px;
  }

  & > .text-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 360px;

    @media screen and (max-width: 550px) {
      width: 100%;
    }

    & > h3 {
      font-size: 1.2rem;
      color: ${colors.primary500};
      font-weight: 600;
      font-family: 'Chillax';
    }

    & > p {
      line-height: 28px;
      text-align: justify;
    }
  }

  & > .icons-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
`;

const InfoIconContainer = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  padding: 10px 20px;
  border-radius: 5px;
  background-color: ${props => props.active ? colors.primary500 : colors.primary400};
  color: ${colors.white};
  transition: all 0.3s;

  &:hover {
    background-color: ${colors.primary500};
  }

  & > i {
    width: 20px;
  }

  & > p {
    white-space: nowrap;
  }
`;

const IconsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;

  & > a {
    text-decoration: none;
    color: ${colors.white};
    background-color: ${colors.primary400};
    width: 40px;
    height: 40px;
    font-size: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    transition: all 0.3s;
    cursor: pointer;

    &:hover {
      background-color: ${colors.primary500};
    }
  }
`;