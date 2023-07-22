import React from 'react'
import PaperOpen from './paperOpen'
import { styled } from 'styled-components'
import PaperSquare from './paperSquare'

const SponsorPaper = ({ value, onClick, active, size = 160 }) => {
  return (
    <PaperSquare 
      onClick={onClick}
      active={active}
      color={value.color} 
      inclinacion={value.inclinacion}
      size={size}
    >
      {active ?
        <PaperOpen img={value.img}></PaperOpen> :
        <Img src={value.img} />
      }
    </PaperSquare>
  )
}

export default SponsorPaper

const Img = styled.img`
  max-width: 80%;
  max-height: 80%;
  object-fit: cover;
`;