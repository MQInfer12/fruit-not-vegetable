import React, { useState } from 'react'
import styled from 'styled-components';
import colors from '../../styles/colors';
import ModalContainer from './modalContainer';
import ChatModal from './chat/chatModal';

const Chat = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
    <ChatButton onClick={() => setOpen(true)}>
      <i className="fa-solid fa-video"></i>
    </ChatButton>
    {
      open &&
      <ModalContainer close={() => setOpen(false)}>
        <ChatModal close={() => setOpen(false)} />
      </ModalContainer>
    }
    </>
  )
}

export default Chat

const ChatButton = styled.button`
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  position: fixed;
  bottom: 48px;
  right: 4vw;
  z-index: 1000;
  border-radius: 8px;
  color: ${colors.white};
  background-color: ${colors.tertiary400};
  border: 4px solid ${colors.primary400};
  cursor: pointer;
  transition: opacity 0.3s;
  &:hover {
    opacity: 0.8;
  }
`;