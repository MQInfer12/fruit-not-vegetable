import React from 'react'
import usePortal from 'react-useportal';
import { styled } from 'styled-components';
import colors from '../../styles/colors';

const ModalContainer = ({ close, children }) => {
  const { Portal } = usePortal();

  return (
    <Portal>
      <Container>
        <Background onClick={close} />
        { children }
      </Container>
    </Portal>
  )
}

export default ModalContainer

const Container = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1002;
  display: flex;
  align-items: center;
  justify-content: center;
  isolation: isolate;
  animation: appearModal .5s;

  @keyframes appearModal {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const Background = styled.div`
  position: fixed;
  inset: 0;
  width: 100%;
  background-color: ${colors.primary500opacity};
  z-index: -1;
`;