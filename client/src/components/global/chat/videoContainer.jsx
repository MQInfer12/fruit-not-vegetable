import React from 'react'
import styled from 'styled-components';
import colors from '../../../styles/colors';

const VideoContainer = ({ border, children, label }) => {
  return (
    <Container border={border}>
      { children }
      {label && <PlantLabel>{label}</PlantLabel>}
    </Container>
  )
}

export default VideoContainer

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  border: ${props => props.border + "px solid " + colors.primary500};
  overflow: hidden;
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