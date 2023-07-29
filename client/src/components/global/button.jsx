import React from 'react'
import { styled } from 'styled-components'
import colors from '../../styles/colors'

const Button = ({ children, type, htmlElement, max, disabled, width, size, bg, ...props }) => {
  return (
    htmlElement === "a" ?
    <StyledA bg={bg} size={size} width={width} type={type} max={max} {...props}>{ children }</StyledA>
    :
    <StyledButton bg={bg} size={size} width={width} disabled={disabled} type={type} max={max} {...props}>{ children }</StyledButton>
  )
}

export default Button

const StyledButton = styled.button`
  min-height: ${props => props.size === "little" ? "40px" : "58px"};
  white-space: nowrap;
  padding: ${props => props.size === "little" ? "0 10px" : !props.width && "0 41px"};
  background-color: ${props => props.bg || (props.type === "primary" ? colors.primary500 : props.type === "secondary" ? colors.tertiary400 : colors.white)};
  color: ${props => props.type === "primary" || props.type === "secondary" ? colors.white : colors.primary500};
  border: none;
  font-family: 'DM Sans';
  font-size: ${props => props.size === "little" ? "0.7rem" : "1.1rem"};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  width: ${props => props.width ? props.width : props.max && "max-content"};

  &:hover {
    opacity: ${props => props.type !== "secondary" && "0.7"};
    background-color: ${props => props.type === "secondary" && colors.tertiary600};
  }

  &:disabled {
    pointer-events: none;
    background-color: ${colors.gray300};
  }
`;

const StyledA = styled.a`
  min-height: ${props => props.size === "little" ? "40px" : "58px"};
  white-space: nowrap;
  padding: ${props => props.size === "little" ? "0 10px" : !props.width && "0 41px"};
  background-color: ${props => props.type === "primary" ? colors.primary500 : colors.white};
  color: ${props => props.type === "primary" ? colors.white : colors.primary500};
  border: none;
  font-family: 'DM Sans';
  font-size: ${props => props.size === "little" ? "0.7rem" : "1.1rem"};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  width: ${props => props.width ? props.width : props.max && "max-content"};
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;

  &:hover {
    opacity: 0.7;
  }

  &:disabled {
    pointer-events: none;
    background-color: ${colors.gray300};
  }
`;