import React from 'react'
import colors from '../../styles/colors';
import { styled } from 'styled-components';
import { useInterval } from '../../hooks/useInterval';

const Carousel = ({ data, component, borderWidth }) => {
  const { active, changeActive } = useInterval(6000, data.length);

  return (
    <CarouselContainer borderWidth={borderWidth}>
      {data.map((value, i) => (
        <CarouselItem key={i} active={i === active}>
          {component(value, i)}
        </CarouselItem>
      ))}
      <CarouselControls>
        {
          data.map((value, i) => (
            <CarouselButton active={i === active} onClick={() => changeActive(i)} />
          ))
        }
      </CarouselControls>
    </CarouselContainer>
  )
}

const CarouselContainer = styled.div`
  border: ${props => props.borderWidth}px solid ${colors.primary500};
  width: 100%;
  height: 100%;
  position: relative;
  isolation: isolate;
  box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.3);
`;

const CarouselItem = styled.div`
  position: absolute;
  inset: 0;
  opacity: ${props => props.active ? 1 : 0};
  transition: opacity 1s;
  pointer-events: ${props => !props.active && "none"};

  & > * {
    width: 100%;
    height: 100%;
  }
`;

const CarouselControls = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 6px 0;
  background-color: ${colors.primary500opacity};
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
`;

const CarouselButton = styled.button`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: none;
  border: 2px solid ${colors.white};
  background-color: ${props => props.active && colors.primary500};
  cursor: pointer;
  transition: background-color 1s;
`;

export default Carousel