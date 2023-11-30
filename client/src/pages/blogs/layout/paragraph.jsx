import React from 'react'
import styled from 'styled-components';

const Paragraph = ({ children }) => {
  return (
    <P>{ children }</P>
  )
}

export default Paragraph

const P = styled.p`
  opacity: 0.7;
  max-width: 90%;
  font-size: 16px;
  line-height: 28px;
  text-align: justify;
`;