import React from 'react'
import { styled } from 'styled-components';
import colors from '../../styles/colors';

const Love = () => {
  return (
    <LoveContainer>
      <p>Desarrollado con ❤ para una mejor alimentación<span> | TecnóPolis.Ai Deep Learning Projects</span></p>
    </LoveContainer>
  )
}

export default Love

const LoveContainer = styled.div`
  height: 32px !important;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: .8rem;
  width: 100%;
  position: sticky;
  bottom: 0;
  background-color: ${colors.primary600};
  color: ${colors.white};

  @media screen and (max-width: 670px) {
    & span {
      display: none;
    }
  }
`;