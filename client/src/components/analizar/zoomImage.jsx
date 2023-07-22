import React, { useState } from 'react'
import { styled } from 'styled-components'
import ModalContainer from '../global/modalContainer';
import colors from '../../styles/colors';

const ZoomImage = ({ src }) => {
  const [active, setActive] = useState(false);

  return (
    <>
    <Img src={src} onClick={() => setActive(true)} />
    {
      active &&
      <ModalContainer close={() => setActive(false)} >
        <BigImg onClick={() => setActive(false)} src={src} />
      </ModalContainer>
    }
    </>
  )
}

export default ZoomImage

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: pointer;
`;

const BigImg = styled.img`
  cursor: pointer;
  border: 4px solid ${colors.primary500};
  max-width: 90%;
  max-height: 80%;
  animation: growImage .5s;

  @keyframes growImage {
    from {
      scale: .3;
    }
    to {
      scale: 1;
    }
  }
`;