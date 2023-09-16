import React from 'react'
import PaperOpen from './paperOpen'
import { styled } from 'styled-components'
import PaperSquare from './paperSquare'
import colors from '../../../styles/colors'

const SponsorPaper = ({ value, onClick, active, size = 160, padding = 60 }) => {
  return (
    <PaperSquare 
      onClick={onClick}
      active={active}
      color={value.color} 
      inclinacion={value.inclinacion}
      size={size}
      padding={padding}
    >
      {
        Object.keys(value).length === 3 ?
        <P>Publicite aquí</P>
        : active ?
        <PaperOpen value={value}></PaperOpen> :
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

const P = styled.p`
  color: ${colors.primary400};
  font-weight: 600;
  font-size: 16px;
  width: 100%;
  white-space: pre-wrap;
  text-align: center;
  user-select: none;
`