import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { useChangeBackground } from '../hooks/changeBackground';
import colors from '../styles/colors';
import InputText from '../components/contact/inputText';
import Button from '../components/global/button';
import { sendRequest } from '../utilities/sendRequest';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';
import { useGet } from '../hooks/useGet';
import Incognita from '../assets/incognita.png';

const FormPublicidad = () => {
  useChangeBackground(colors.primary200);
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, loading } = useGet(`publicidad/${id}`, null, !!id);
  const [preview, setPreview] = useState(null);
  const [form, setForm] = useState({
    foto: undefined,
    codigo_pais: "",
    pais: "",
    ciudad: "",
    empresa: "",
    contacto: "",
    cargo: "",
    direccion: "",
    telefono: "",
    correo: "",
    web: "",
    descripcion: "",
    tipo_propaganda: "",
    cobertura: ""
  });

  const handleSend = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(form).forEach(key => {
      formData.append(key, form[key]);
    });
    const res = await sendRequest(id ? `publicidad/${id}` : 'publicidad', formData, id ? "PUT" : "POST");
    if(res) {
      Swal.fire({
        title: "Correcto",
        text: `La publicidad fué ${id ? "editada" : "añadida"} correctamente`,
        icon: "success"
      });
      navigate("/crud/publicidad");
    }
  }

  useEffect(() => {
    if(id && data) {
      setForm({
        foto: null,
        codigo_pais: data.codigo_pais,
        pais: data.pais,
        ciudad: data.ciudad,
        empresa: data.empresa,
        contacto: data.contacto,
        cargo: data.cargo,
        direccion: data.direccion,
        telefono: data.telefono,
        correo: data.correo,
        web: data.web,
        descripcion: data.descripcion,
        tipo_propaganda: data.tipo_propaganda,
        cobertura: data.cobertura
      })
    }
  }, [data]);

  useEffect(() => {
    if(form.foto) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(form.foto);
      fileReader.addEventListener("load", () => {
        setPreview(fileReader.result);
      })
    }
  }, [form.foto])

  return (
    <Container>
      <h2>{id ? "Editar" : "Añadir"} publicidad</h2>
      <Button onClick={() => navigate('/crud/publicidad')} type="secondary">Volver</Button>
      {
        !data ? 
        <p>Cargando...</p> : 
        <FormContainer>
          <InputFileContainer>
            <img src={id ? (preview || `${import.meta.env.VITE_BACKEND}logo/${data.codigo_pais}${data.id}?v=${new Date().getTime()}`) : (form.foto ? preview : Incognita)} />
            <input type="file" onChange={(e) => setForm(old => ({...old, foto: e.target.files[0] }))} />
          </InputFileContainer>
          <InputText 
            text="Código de país"
            value={form.codigo_pais}
            onChange={(e) => setForm(old => ({...old, codigo_pais: e.target.value }))}
          />
          <InputText 
            text="País"
            value={form.pais}
            onChange={(e) => setForm(old => ({...old, pais: e.target.value }))}
          />
          <InputText 
            text="Ciudad"
            value={form.ciudad}
            onChange={(e) => setForm(old => ({...old, ciudad: e.target.value }))}
          />
          <InputText 
            text="Empresa"
            value={form.empresa}
            onChange={(e) => setForm(old => ({...old, empresa: e.target.value }))}
          />
          <InputText 
            text="Contacto"
            value={form.contacto}
            onChange={(e) => setForm(old => ({...old, contacto: e.target.value }))}
          />
          <InputText 
            text="Cargo"
            value={form.cargo}
            onChange={(e) => setForm(old => ({...old, cargo: e.target.value }))}
          />
          <InputText 
            text="Dirección"
            value={form.direccion}
            onChange={(e) => setForm(old => ({...old, direccion: e.target.value }))}
          />
          <InputText 
            text="Teléfono"
            value={form.telefono}
            onChange={(e) => setForm(old => ({...old, telefono: e.target.value }))}
          />
          <InputText 
            text="Correo"
            value={form.correo}
            onChange={(e) => setForm(old => ({...old, correo: e.target.value }))}
          />
          <InputText 
            text="Web"
            value={form.web}
            onChange={(e) => setForm(old => ({...old, web: e.target.value }))}
          />
          <InputText 
            text="Descripción"
            value={form.descripcion}
            onChange={(e) => setForm(old => ({...old, descripcion: e.target.value }))}
          />
          <InputText 
            text="Tipo de propaganda"
            value={form.tipo_propaganda}
            onChange={(e) => setForm(old => ({...old, tipo_propaganda: e.target.value }))}
          />
          <InputText 
            text="Cobertura"
            value={form.cobertura}
            onChange={(e) => setForm(old => ({...old, cobertura: e.target.value }))}
          />
          <Button onClick={handleSend} type="secondary">{id ? "Editar" : "Agregar"}</Button>
        </FormContainer>
      }
    </Container>
  )
}

export default FormPublicidad

const Container = styled.section`
  min-height: calc(100dvh - 32px);
  padding: 115px 140px 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;

  & > p {
    text-align: center;
  }

  @media screen and (max-width: 1260px) {
    padding: 85px 20px 60px;
  }
`;

const FormContainer = styled.form`
  padding: 40px;
  background-color: ${colors.primary200};
  border: 8px solid ${colors.primary500};
  box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.3);
  gap: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InputFileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  & > img {
    height: 140px;
    width: 140px;
    object-fit: cover;
    border: 2px solid ${colors.primary500};
  }
  & > input {
    width: 300px;
  }
`;