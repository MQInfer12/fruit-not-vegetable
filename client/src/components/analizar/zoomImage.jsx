import React, { useState } from 'react'
import { styled } from 'styled-components'
import ModalContainer from '../global/modalContainer';
import colors from '../../styles/colors';

const ZoomImage = ({ src, label }) => {
  const [active, setActive] = useState(false);

  return (
    <>
    <Container>
      <Img src={src} onClick={() => setActive(true)} />
      {label && <PlantLabel>{label}</PlantLabel>}
    </Container>
    {
      active &&
      <ModalContainer close={() => setActive(false)} >
        <ModalImg>
          {label && <p>{label}</p>}
          <div>
            <BigImg onClick={() => setActive(false)} src={src} />
          </div>
        </ModalImg>
      </ModalContainer>
    }
    </>
  )
}

export default ZoomImage

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: pointer;
`;

const PlantLabel = styled.p`
  position: absolute;
  background-color: ${colors.primary500};
  color: ${colors.white};
  padding: 7px 15px;
  top: 12px;
  left: 15px;
  font-size: 12px;
  transition: all 1s;
  pointer-events: none;

  @media screen and (max-width: 500px) {
    font-size: .8rem;
  }
`;

const ModalImg = styled.div`
  display: flex;
  flex-direction: column;
  animation: growImage .5s;
  cursor: pointer;
  background-color: ${colors.primary500};

  & > p {
    width: 100%;
    padding: 8px 16px 4px;
    font-weight: 600;
    color: ${colors.white};
  }

  & > div {
    width: 620px;
    height: 450px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @keyframes growImage {
    from {
      scale: .3;
    }
    to {
      scale: 1;
    }
  }
`;

const BigImg = styled.img`
  border: 4px solid ${colors.primary500};
  width: 100%;
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
`;