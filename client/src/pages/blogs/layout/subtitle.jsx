import React from 'react'
import styled from 'styled-components'
import colors from '../../../styles/colors'

const Subtitle = ({ children }) => {
  return (
    <B>{children}</B>
  )
}

export default Subtitle

const B = styled.b`
  color: ${colors.primary500};
  max-width: 100%;
  font-size: 18px;
  line-height: 32px;
`;