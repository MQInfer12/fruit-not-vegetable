import React, { useEffect, useState } from 'react'
import { styled } from 'styled-components';
import colors from '../styles/colors';
import Button from '../components/global/button';
import Placeholder from '../assets/incognita.jpg';
import useWidth from '../hooks/useWidth';
import { useBackground } from '../context/background';
import Loader from '../components/global/loader';
import Resultado from '../components/analizar/resultado';
import data from '../utilities/result.json';

const Analizar = () => {
  const width = useWidth();
  const { changeColor } = useBackground();
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  
  useEffect(() => {
    changeColor(width > 560 ? colors.primary200 : colors.secondary500)
  }, [width]);

  useEffect(() => {
    if(image) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(image);
      fileReader.addEventListener("load", () => {
        setPreview(fileReader.result);
      })
    }
  }, [image]);

  const handleClick = () => {
    setLoading(true);
    setTimeout(() => {
      setResult(data);
      setLoading(false);
    }, 3000)
  }

  if(result) {
    return <Resultado data={result} preview={preview} />
  }

  return (
    <Container>
      <Box>
        <PreviewImage src={image ? preview : Placeholder} />
        <LeftContainer>
          <HeaderContainer>
            <h2>Analizar imagen</h2>
            <p>Formatos permitidos: .jpg</p>
          </HeaderContainer>
          <FormContainer>
            <InputContainer>
              <p>Seleccionar foto de hojas de la planta de tomate para detectar y clasificar enfermedad.</p>
              <div className='inputContainer'>
                <label htmlFor="inputfile">{image ? "Seleccionar otra foto" : "Seleccionar una foto"}</label>
                <input onChange={e => setImage(e.target.files[0])} accept='.jpg' id="inputfile" type='file' />
              </div>
            </InputContainer>
            <Button onClick={handleClick} disabled={!image || loading} type="primary" width="147px">
              {loading ? <Loader /> : "Subir foto"}
            </Button>
          </FormContainer>
        </LeftContainer>
      </Box>
    </Container>
  )
}

export default Analizar

const Container = styled.section`
  min-height: calc(100dvh - 32px);
  padding: 145px 140px 60px;
  display: flex;
  justify-content: space-around;
  align-items: center;

  @media screen and (max-width: 560px) {
    padding: 85px 0 0;
  }
`;

const Box = styled.div`
  background-color: ${colors.secondary500};
  padding: 60px 60px 60px;
  color: ${colors.secondary600};
  display: flex;
  justify-content: space-between;
  gap: 60px;
  min-height: 400px;
  max-width: 1077px;

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
  gap: 60px;
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
  width: 340px;

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
  min-width: 340px;
  max-width: 340px;
  max-height: 280px;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  object-position: center;
  border: 4px solid ${colors.secondary300};
`;
