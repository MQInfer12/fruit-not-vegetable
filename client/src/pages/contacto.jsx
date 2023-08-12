import React, { useEffect, useState } from 'react'
import { styled } from 'styled-components';
import colors from '../styles/colors';
import { useInterval } from '../hooks/useInterval';
import Button from '../components/global/button';
import { useChangeBackground } from '../hooks/changeBackground';
import { sendRequest } from '../utilities/sendRequest';
import InputText from '../components/contact/inputText';
import Swal from 'sweetalert2';

const Contacto = () => {
  const { active } = useInterval(4000, 3);
  useChangeBackground(colors.primary200);

  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [errors, setErrors] = useState({});
  const [sended, setSended] = useState(false);
  const [responses, setResponses] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const newErrors = {};
    if(!nombre.trim()) {
      newErrors.nombre = "Este campo es requerido";
    }
    const regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;
    const regexPhone = /^[+][0-9]{3}[0-9]{4,9}$/
    if(!email.trim()) {
      newErrors.email = "Este campo es requerido";
    } else if (!regexEmail.test(email.trim())) {
      newErrors.email = "Esta dirección de correo no es válida";
    }
    if(!telefono.trim()) {
      newErrors.telefono = "Este campo es requerido";
    } else if (!regexPhone.test(telefono.trim())) {
      newErrors.telefono = "Este número de teléfono no es válido";
    }
    if(!mensaje.trim()) {
      newErrors.mensaje = "Este campo es requerido";
    }
    setErrors(newErrors);
  }, [nombre, email, telefono, mensaje])

  const handleClick = async (e) => {
    e.preventDefault();
    if(Object.keys(errors).length) {
      setSended(true);
      Swal.fire({
        title: "Error al enviar",
        text: "Comprueba que no existan errores en el formulario",
        icon: "error"
      })
      return;
    }
    setSended(false);
    setLoading(true);
    const res = await sendRequest(`correo`, {
      telefono: telefono,
      name: nombre,
      mail: email,
      message: mensaje
    });
    Swal.fire({
      title: "Correo enviado",
      text: res.message,
      icon: "success"
    })
    setNombre("");
    setEmail("");
    setTelefono("");
    setMensaje("");
    setResponses(old => old + 1);
    setLoading(false);
  }

  return (
    <Container>
      <Form key={responses}>
        <InputText text="Nombre" 
          value={nombre} 
          onChange={e => setNombre(e.target.value)} 
          error={errors.nombre}
          trigger={sended}
        />
        <InputText text="Email" 
          value={email} 
          onChange={e => setEmail(e.target.value)} 
          error={errors.email}
          trigger={sended}
        />
        <InputText text="Whatsapp/Telegram" 
          value={telefono} 
          onChange={e => setTelefono(e.target.value)} 
          error={errors.telefono}
          trigger={sended}
        />
        <InputText textarea text="Mensaje" 
          value={mensaje} 
          onChange={e => setMensaje(e.target.value)} 
          error={errors.mensaje}
          trigger={sended}
        />
        <Button disabled={loading} onClick={handleClick} type="primary" max>{loading ? "Enviando..." : "Enviar"}</Button>
      </Form>
      <RightContainer>
        <RightInfo>
          <div className='text-container'>
            <h3>Contacte con nosotros</h3>
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
  width: 580px;

  @media screen and (max-width: 700px) {
    width: 100%;
  }

  & > button {
    align-self: end;
  }
`;

const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${colors.primary300};
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
    width: 380px;

    @media screen and (max-width: 550px) {
      width: 100%;

      & > h3 {
        text-align: center;
      }
    }

    & > h3 {
      font-size: 2rem;
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