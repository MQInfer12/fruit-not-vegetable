import React, { useState } from 'react'
import { styled } from 'styled-components';
import colors from '../../../styles/colors';
import LegalModal from './legals/legalModal';

const Legals = () => {
  const [modal, setModal] = useState(null);

  return (
    <CopyContainer>
      <small>© Copyright Doctor Tomatto 2021 - 2023. Todos los derechos reservados.</small>
      {modal && <LegalModal close={() => setModal(false)} tipo={modal} />}
      <small>
        <button onClick={() => setModal("terminos")}>Términos y condiciones</button> | <button onClick={() => setModal("politicas")}>Políticas de privacidad</button>
      </small>
    </CopyContainer>
  )
}

export default Legals

const CopyContainer = styled.div`
  padding: 20px;
  text-align: center;
  display: flex;
  justify-content: space-around;
  width: 100%;
  flex-wrap: wrap;
  gap: 20px;

  & button {
    background-color: transparent;
    color: ${colors.white};
    border: none;
    cursor: pointer;
    transition: all 0.3s;
  }
  & button:hover {
    opacity: 0.7;
  }
`;