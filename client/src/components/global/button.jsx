import React from 'react'
import { styled } from 'styled-components'
import colors from '../../styles/colors'

const Button = ({ children, onClick, type, max }) => {
  return (
    <StyledButton type={type} max={max} onClick={onClick}>{ children }</StyledButton>
  )
}

export default Button

const StyledButton = styled.button`
  height: 58px;
  white-space: nowrap;
  padding: 19px 41px;
  background-color: ${props => props.type === "primary" ? colors.primary500 : colors.white};
  color: ${props => props.type === "primary" ? colors.white : colors.primary500};
  border: none;
  font-family: 'DM Sans';
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  width: ${props => props.max && "max-content"};

  &:hover {
    opacity: 0.7;
  }
`;