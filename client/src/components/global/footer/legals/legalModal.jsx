import React from 'react'
import ModalContainer from '../../modalContainer'
import Privacy from './privacy'
import Terms from './terms'
import colors from '../../../../styles/colors'
import { styled } from 'styled-components'

const LegalModal = ({ close, tipo }) => {
  return (
    <ModalContainer close={close}>
      <Container>
        <button onClick={close}>
          <i className="fa-solid fa-xmark"></i>
        </button>
        <h3>{tipo === "politicas" ? "Políticas de privacidad" : "Términos y condiciones"}</h3>
        <Info id="info">
          {
            tipo === "politicas" ?
            <Privacy /> :
            <Terms />
          }
        </Info>
      </Container>
    </ModalContainer>
  )
}

export default LegalModal

const Container = styled.div`
  width: 800px;
  max-height: 500px;
  background-color: ${colors.primary300};
  padding: 40px 40px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  position: relative;
  
  & > h3 {
    font-size: 2rem;
    color: ${colors.primary500};
    font-weight: 600;
    font-family: 'Chillax';
    line-height: 32px;

    @media screen and (max-width: 560px) {
      font-size: 1.4rem;
    }
  }

  & > button {
    position: absolute;
    right: 45px;
    top: 45px;
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
    align-self: flex-start;

    &:hover {
      scale: 1.2;
    }

    @media screen and (max-width: 500px) {
      right: 20px;
    }
  }

  @media screen and (max-width: 820px) {
    width: 100%;
  }
  @media screen and (max-width: 500px) {
    padding: 40px 20px;
  }
`;

const Info = styled.div`
  border: 2px solid ${colors.primary500};
  background-color: ${colors.primary200};
  padding: 40px;
  display: flex;
  flex-direction: column;
  overflow: auto;
  gap: 20px;
  
  & > b {
    font-size: 1.2rem;
    color: ${colors.primary500};
    font-weight: 600;
    font-family: 'Chillax';
  }

  & > p {
    opacity: 0.8;
    line-height: 28px;
  }
`;