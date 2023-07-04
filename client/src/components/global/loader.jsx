import React from 'react'
import { styled } from 'styled-components'

const Loader = () => {
  return (
    <StyledLoader></StyledLoader>
  )
}

export default Loader

const StyledLoader = styled.div`
  width: 24px;
  height: 24px;
  border: 5px dotted #FFF;
  border-radius: 50%;
  display: inline-block;
  position: relative;
  box-sizing: border-box;
animation: rotation 2s linear infinite;

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  } 
`;