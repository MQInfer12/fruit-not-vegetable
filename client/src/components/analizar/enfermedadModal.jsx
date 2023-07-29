import React, { useState } from 'react'
import ModalContainer from '../global/modalContainer'
import { styled } from 'styled-components'
import colors from '../../styles/colors'
import PrevencionMancha from './data/manchaBacteriana/prevencion';
import SintomasMancha from './data/manchaBacteriana/sintomas';
import TratamientoMancha from './data/manchaBacteriana/tratamiento';
import Sponsor1 from '../../assets/sponsor1.png';
import Sponsor2 from '../../assets/sponsor2.png';
import Sponsor3 from '../../assets/sponsor3.png';
import { getRandomInt } from '../../utilities/getRandomInt';
import SponsorPaper from '../global/footer/sponsorPaper';
import Button from '../global/button';

const EnfermedadModal = ({ close, enfermedad, page }) => {
  const [active, setActive] = useState();
  const [sponsors] = useState([{
    img: Sponsor1,
    inclinacion: getRandomInt(-6, 7),
    color: colors.pastel1
  },{
    img: Sponsor2,
    inclinacion: getRandomInt(-6, 7),
    color: colors.pastel2
  },{
    img: Sponsor3,
    inclinacion: getRandomInt(-6, 7),
    color: colors.pastel3
  }])

  const data = {
    "manchaBacteriana": {
      "sintomas": <SintomasMancha />,
      "prevencion": <PrevencionMancha />,
      "tratamiento": <TratamientoMancha />
    }
  }

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
          {data[enfermedad][page]}
        </Info>
        <SponsorsContainer>
          {sponsors.map((value, i) => (
            <SponsorPaper 
              key={i}
              value={value}
              onClick={() => setActive(active === i ? null : i)}
              active={active === i}
              size={120}
            />
          ))}
        </SponsorsContainer>
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