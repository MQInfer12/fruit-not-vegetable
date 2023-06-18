import React from 'react'
import { styled } from 'styled-components';
import colors from '../../styles/colors';
import Button from '../global/button';
import { useInterval } from '../../hooks/useInterval';

const SixthSection = () => {
  const active = useInterval(4000, 3);

  return (
    <Container>
      <h2>Contáctanos</h2>
      <Content>
        <Form>
          <div>
            <input required id="nombre" type="text" />
            <label htmlFor="nombre">Nombre</label>
          </div>
          <div>
            <input required id="email" type="text" />
            <label htmlFor="email">Email</label>
          </div>
          <div>
            <input required id="asunto" type="text" />
            <label htmlFor="asunto">Asunto</label>
          </div>
          <div>
            <textarea required id="mensaje" />
            <label htmlFor="mensaje">Mensaje</label>
          </div>
          <Button type="primary" max>Enviar</Button>
        </Form>
        <RightContainer>
          <RightInfo>
            <div className='text-container'>
              <h3>Contacta con nosotros</h3>
              <p>Contáctenos para saber cómo utilizar los beneficios de Doctor Tomatto en su organización, si lo prefiere, envíenos un correo electrónico.</p>
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
      </Content>
    </Container>
  )
}

export default SixthSection

const Container = styled.section`
  height: 80dvh;
  padding: 105px 140px 70px;
  display: flex;
  flex-direction: column;
  gap: 40px;
  background-color: ${colors.white};
  
  & > h2 {
    font-size: 40px;
    font-weight: 400;
    color: ${colors.primary500};
  }
`;

const Content = styled.div`
  display: flex;
  justify-content: space-evenly;
  gap: 100px;
  height: 100%;
  align-items: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 32px;

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
`;

const RightInfo = styled.div`
  display: flex;
  gap: 64px;
  align-items: center;

  & > .text-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 360px;

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