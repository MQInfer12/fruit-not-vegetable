import React from 'react'
import colors from '../styles/colors';
import { styled } from 'styled-components';
import Button from '../components/global/button';
import Plant8 from '../assets/plant8.png'
import { useChangeBackground } from '../hooks/changeBackground';

const Instrucciones = () => {
  useChangeBackground(colors.primary200);
  return (
    <Container>
      <RightContainer>
        <div className='shadow' />
        <Img src={Plant8} />
      </RightContainer>
      <LeftContainer>
        <TextContainer>
          <h3>¿Cómo empezar?</h3>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perferendis ex incidunt necessitatibus omnis eius, neque doloribus tenetur aspernatur ipsum esse quia deleniti cum nemo, provident doloremque assumenda, molestiae enim eaque.</p>
        </TextContainer>
        <NumbersContainer>
          <NumberContainer>
            <b>01.</b>
            <div>
              <h4>Socculents</h4>
              <p>At in proin consequat ut cursus venenatis sapien.</p>
            </div>
          </NumberContainer>
          <NumberContainer>
            <b>02.</b>
            <div>
              <h4>Air purifiers</h4>
              <p>At in proin consequat ut cursus venenatis sapien.</p>
            </div>
          </NumberContainer>
          <NumberContainer>
            <b>03.</b>
            <div>
              <h4>Decorative</h4>
              <p>At in proin consequat ut cursus venenatis sapien.</p>
            </div>
          </NumberContainer>
        </NumbersContainer>
        <Button max type="primary">Descargar paso a paso</Button>
      </LeftContainer>
    </Container>
  )
}

export default Instrucciones

const Container = styled.section`
  min-height: calc(100dvh - 32px);
  padding: 85px 140px 0;
  display: flex;
  justify-content: space-between;
  gap: 270px;
  align-items: center;
`;

const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  width: 650px;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 22px;

  & > h3 {
    font-size: 4rem;
    color: ${colors.primary500};
    font-weight: 600;
    font-family: 'Chillax';
    line-height: 72px;
  }

  & > p {
    line-height: 28px;
  }
`;

const NumbersContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 36px;
`;

const NumberContainer = styled.div`
  display: flex;
  gap: 20px;

  & > b {
    font-size: 2rem;
    color: ${colors.primary500};
    font-weight: 600;
    font-family: 'Chillax';
  }

  & > div {
    display: flex;
    flex-direction: column;
    gap: 6px;
    width: 267px;

    & > h4 {
      font-size: 1.2rem;
      color: ${colors.primary500};
      font-weight: 600;
      font-family: 'Chillax';
    }
    & > p {
      line-height: 28px;
    }
  }
`;

const RightContainer = styled.div`
  width: 500px;
  position: relative;
  isolation: isolate;

  & > .shadow {
    width: 100%;
    height: 100%;
    background-color: ${colors.primary300};
    position: absolute;
    left: -12%;
    top: -8%;
    z-index: -1;
  }
`;

const Img = styled.img`
  width: 100%;
  object-fit: cover;
  border: 8px solid ${colors.white};
`;