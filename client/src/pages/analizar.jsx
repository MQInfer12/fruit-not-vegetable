import React, { useEffect } from 'react'
import { styled } from 'styled-components';
import colors from '../styles/colors';
import Button from '../components/global/button';
import Placeholder from '../assets/incognita.jpg';
import useWidth from '../hooks/useWidth';
import { useBackground } from '../context/background';

const Analizar = () => {
  const width = useWidth();
  const { changeColor } = useBackground();
  
  useEffect(() => {
    changeColor(width > 560 ? colors.primary200 : colors.secondary500)
  }, [width]);

  return (
    <Container>
      <Box>
        <PreviewImage src={Placeholder} />
        <LeftContainer>
          <HeaderContainer>
            <h2>Analizar imagen</h2>
            <p>Formatos permitidos: .jpg</p>
          </HeaderContainer>
          <FormContainer>
            <InputContainer>
              <p>Seleccionar foto de hojas de la planta de tomate para detectar y clasificar enfermedad.</p>
              <div className='inputContainer'>
                <label htmlFor="inputfile">Seleccionar un archivo</label>
                <input id="inputfile" type='file' />
              </div>
            </InputContainer>
            <Button type="primary">Subir foto</Button>
          </FormContainer>
        </LeftContainer>
      </Box>
    </Container>
  )
}

export default Analizar

const Container = styled.section`
  min-height: calc(100dvh - 32px);
  padding: 85px 140px 0;
  display: flex;
  justify-content: space-around;
  align-items: center;

  @media screen and (max-width: 560px) {
    padding: 85px 0 0;
  }
`;

const Box = styled.div`
  background-color: ${colors.secondary500};
  padding: 60px 60px 20px;
  border-bottom: 60px solid ${colors.secondary300};
  color: ${colors.secondary600};
  display: flex;
  justify-content: space-between;
  gap: 60px;
  min-height: 400px;

  @media screen and (max-width: 1100px) {
    flex-direction: column;
    align-items: center;
  }
  @media screen and (max-width: 560px) {
    width: 100%;
    padding: 60px 40px 80px;
    border-bottom: none;
  }
`;

const LeftContainer = styled.div`
  min-height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  & > h2 {
    font-size: 2rem;
    font-weight: 600;
    font-family: 'Chillax';
  }
`;

const FormContainer = styled.div`
  display: flex;
  gap: 100px;
  align-items: end;

  @media screen and (max-width: 780px) {
    flex-direction: column;
    gap: 20px;
    align-items: center;

    & > button {
      width: 100%;
    }
  }
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 400px;

  @media screen and (max-width: 560px) {
    width: auto;
  }

  & > p {
    line-height: 28px;
  }

  & > .inputContainer {
    height: 58px;
    position: relative;

    & > label {
      background-color: ${colors.secondary400};
      cursor: pointer;
      border: 3px dashed ${colors.secondary600};
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s;

      &:hover {
        opacity: 0.7;
      }
    }

    & > input {
      display: none;
    }
  }
`;

const PreviewImage = styled.img`
  min-width: 250px;
  max-width: 250px;
  max-height: 250px;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border: 1px solid ${colors.secondary300};
`;