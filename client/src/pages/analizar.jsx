import React, { useEffect, useState } from 'react'
import { styled } from 'styled-components';
import colors from '../styles/colors';
import Button from '../components/global/button';
import Placeholder from '../assets/incognita.png';
import useWidth from '../hooks/useWidth';
import { useBackground } from '../context/background';
import Loader from '../components/global/loader';
import Resultado from '../components/analizar/resultado';
import ResultadoError from '../components/analizar/resultadoError';
import { sendRequest } from '../utilities/sendRequest';
import Swal from 'sweetalert2';

const Analizar = () => {
  const width = useWidth();
  const { changeColor } = useBackground();
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [tipo, setTipo] = useState("enfermedad");
  
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

  const handleClick = async () => {
    setLoading(true);
    const form = new FormData();
    form.append("file", image);
    form.append("type", tipo);
    const res = await sendRequest("analizar", form, "POST", true);
    if(res.ok) {
      const resJson = await res.json();
      setResult(resJson);
    } else {
      Swal.fire({
        title: "¡Ups! algo salió mal",
        text: "Vuelva a intentarlo",
        icon: "error"
      })
    }
    setLoading(false);
  }

  const reset = () => {
    setImage(null);
    setPreview(null);
    setResult(null);
  }

  if(result) {
    if(!result.error) { 
      console.log(result);
      return <Resultado reset={reset} data={result.data} preview={preview} />
    } else {
      return <ResultadoError reset={reset} preview={preview} />
    }
  }

  return (
    <Container>
      <Box>
        <PreviewImage>
          <img src={image ? preview : Placeholder} />
        </PreviewImage>
        <LeftContainer>
          <HeaderContainer>
            <h2>Analizar imagen</h2>
            <p>Formatos permitidos: .jpg</p>
          </HeaderContainer>
          <FormContainer>
            <InputContainer>
              <p>Seleccionar foto de hojas de la planta de tomate{/*  para detectar y clasificar enfermedad */}.</p>
              <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
                <option value="enfermedad">Enfermedad</option>
                <option value="plaga">Plaga</option>
              </select>
              <div className='inputContainer'>
                <label htmlFor="inputfile">{image ? "Seleccionar otra foto" : "Seleccionar una foto"}</label>
                <input onChange={e => setImage(e.target.files[0])} accept='.jpg' id="inputfile" type='file' />
              </div>
            </InputContainer>
            <Button onClick={handleClick} disabled={!image || loading} type="secondary" width="147px">
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
  box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.15);

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
  & > p {
    opacity: 0.7;
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
  gap: 16px;
  width: 270px;

  @media screen and (max-width: 560px) {
    width: auto;
  }

  & > p {
    text-align: justify;
    line-height: 28px;
  }

  & > select {
    background-color: ${colors.secondary400};
    border: 2px solid ${colors.primary500};
    padding: 4px 16px;
    color: ${colors.primary500}
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

const PreviewImage = styled.div`
  width: 406px;
  height: 280px;
  display: flex;
  justify-content: center;

  & > img {
    width: 100%;
    max-width: 100%;
    max-height: 100%;
    border: 4px solid ${colors.secondary300};
    object-fit: contain;
    object-position: center;
  }
`;
