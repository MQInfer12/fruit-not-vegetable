import React from 'react'
import ModalContainer from '../global/modalContainer'
import { styled } from 'styled-components'
import colors from '../../styles/colors'
import { usePublicidad } from '../../context/publicidad';
import Sponsors from '../global/footer/sponsors';
import { enfermedadData } from './enfermedadData';

const EnfermedadModal = ({ close, enfermedad, page }) => {
  const { publicidadEspecifica } = usePublicidad();

  return (
    <ModalContainer close={close}>
      <Container>
        <button onClick={close}>
          <i className="fa-solid fa-xmark"></i>
        </button>
        <h3>
          {
            page === "sintomas" ? "Síntomas" :
            page === "tratamiento" ? "Tratamiento" :
            page === "prevencion" && "Prevención"
          }
        </h3>
        <Info id="info">
          {enfermedadData[enfermedad][page]}
        </Info>
        {publicidadEspecifica && <Sponsors size={120} padding={32} tipo='E' />}
      </Container>
    </ModalContainer>
  )
}

export default EnfermedadModal

const Container = styled.div`
  width: 800px;
  height: 550px;
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
  height: 60%;
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

const SponsorsContainer = styled.div`
  display: flex;

  & > div {
    margin: 0 32px;
  }

  @media screen and (max-width: 590px) {
    align-self: flex-start;
    width: 100%;
    overflow-x: auto;
    overflow-y: hidden;
    padding: 16px 0 40px;
  }
`;