import React from 'react'
import { styled } from 'styled-components';
import colors from '../../styles/colors';
import Button from '../global/button';
import Plant1 from '../../assets/plant1.png'
import Plant2 from '../../assets/plant2.png'
import Plant3 from '../../assets/plant3.png'
import Dots from '../../assets/dots.png'

const FirstSection = () => {
  return (
    <Container>
      <LeftInfoContainer>
        <Title>Happiness blooms from within</Title>
        <Description>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum placeat maxime odio, corporis adipisci enim quidem voluptatum magnam animi doloremque culpa sed explicabo vel maiores officiis quam vero laboriosam nostrum?</Description>
        <div>
          <Button>Shop now</Button>
          <Button type="primary">Explore plants</Button>
        </div>
      </LeftInfoContainer>
      <RightContainer>
        <LeftPlants>
          <LeftPlantContainer>
            <PlantLabel>New</PlantLabel>
            <PlantImage src={Plant1} />
          </LeftPlantContainer>
          <LeftPlantContainer>
            <PlantLabel>Popular</PlantLabel>
            <PlantImage src={Plant2} />
          </LeftPlantContainer>
        </LeftPlants>
        <RightPlantContainer>
          <PlantLabel>Featured</PlantLabel>
          <PlantImage src={Plant3} />
          <PlantTextContainer>
            <div className='text'>
              <h2>Anthurium Flower</h2>
              <p>The flower of human being. It has meaningful of fact that the plant always grow whatever season and weather...</p>
            </div>
            <Button medium>READ MORE</Button>
          </PlantTextContainer>
        </RightPlantContainer>
        <AnimatedDots src={Dots} />
      </RightContainer>
    </Container>
  )
}

export default FirstSection

const Container = styled.section`
  height: 100dvh;
  padding-top: 105px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background-color: ${colors.primary500};
`;

const LeftInfoContainer = styled.div`
  width: 600px;
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const Title = styled.h1`
  font-size: 4rem;
  color: ${colors.white};
  font-weight: 600;
  font-family: 'Chillax';
  line-height: 72px;
`;

const Description = styled.p`
  color: ${colors.white};
  line-height: 28px;
`;

const RightContainer = styled.div`
  display: flex;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 220px 380px;
  gap: 4px;
  height: 547px;
  position: relative;
  isolation: isolate;
`;

const LeftPlants = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const LeftPlantContainer = styled.div`
  position: relative;
  width: 215px;
  flex: 1;
`;

const RightPlantContainer = styled.div`
  position: relative;
`;

const PlantLabel = styled.p`
  position: absolute;
  background-color: ${colors.primary500};
  color: ${colors.white};
  padding: 7px 15px;
  top: 12px;
  left: 15px;
  font-size: 12px;
`;

const PlantImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const PlantTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  position: absolute;
  bottom: 0;
  padding: 120px 26px 26px;
  background: linear-gradient(178.62deg, rgba(46, 64, 61, 0) 25.35%, #234A45 91.06%);;

  & > .text {
    display: flex;
    flex-direction: column;
    gap: 6px;

    & > h2 {
      font-size: 28px;
      color: ${colors.white};
    }

    & > p {
      font-size: 14px;
      color: ${colors.white};
    }
  }
`;

const AnimatedDots = styled.img`
  position: absolute;
  z-index: -1;
  width: 115px;
  height: 115px;
  inset: auto auto -32px -39px;
  animation: dotsmovement 15s infinite;

  @keyframes dotsmovement {
    0% {
      inset: auto auto -32px -40px;
    }
    12% {
      inset: auto auto -32px calc(100% - 75px);
    }
    25% {
      inset: auto auto calc(100% - 83px) calc(100% - 75px);
    }
    37% {
      inset: auto auto -32px calc(100% - 75px);
    }
    50% {
      inset: auto auto -32px -40px;
    }
    62% {
      inset: auto auto calc(100% - 83px) -40px;
    }
    75% {
      inset: auto auto calc(100% - 83px) calc(100% - 75px);
    }
    87% {
      inset: auto auto calc(100% - 83px) -40px;
    }
    100% {
      inset: auto auto -32px -40px;
    }
  }
`;