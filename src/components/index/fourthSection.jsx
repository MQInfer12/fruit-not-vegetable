import React from 'react'
import { styled } from 'styled-components';
import colors from '../../styles/colors';
import Plant8 from '../../assets/plant8.png'
import Button from '../global/button';

const FourthSection = () => {
  return (
    <Container>
      <h2>Instrucciones</h2>
      <Content>
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
        <RightContainer>
          <div className='shadow' />
          <Img src={Plant8} />
        </RightContainer>
      </Content>
    </Container>
  )
}

export default FourthSection

const Container = styled.section`
  height: 100dvh;
  padding: 105px 140px 70px;
  display: flex;
  flex-direction: column;
  gap: 40px;
  background-color: ${colors.primary200};
  
  & > h2 {
    font-size: 40px;
    font-weight: 400;
    color: ${colors.primary500};
  }
`;

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 204px;
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