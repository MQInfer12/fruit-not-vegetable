import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { useChangeBackground } from '../hooks/changeBackground';
import colors from '../styles/colors';
import InputText from '../components/contact/inputText';
import Button from '../components/global/button';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';
import { useGet } from '../hooks/useGet';
import { useRequest } from '../hooks/useRequest';

const FormUsuario = () => {
  const sendRequest = useRequest();
  useChangeBackground(colors.primary200);
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, loading } = useGet(`usuario/${id}`, null, !!id);
  const [form, setForm] = useState({
    email: "",
    nombre: "",
    clave: "",
    rol: "",
    pais: "",
    ciudad: "",
  });

  const handleSend = async (e) => {
    e.preventDefault();
    console.log(form);
    const res = await sendRequest(id ? `usuario/${id}` : 'usuario', form, id ? "PUT" : "POST");
    if(res) {
      Swal.fire({
        title: "Correcto",
        text: `El usuario fué ${id ? "editado" : "añadido"} correctamente`,
        icon: "success"
      });
      navigate("/crud/usuario");
    }
  }

  useEffect(() => {
    if(id && data) {
      setForm({
        email: data.email,
        nombre: data.nombre,
        clave: data.clave,
        rol: data.rol,
        pais: data.pais,
        ciudad: data.ciudad,
      })
    }
  }, [data]);

  return (
    <Container>
      <h2>{id ? "Editar" : "Añadir"} usuario</h2>
      <Button onClick={() => navigate('/crud/usuario')} type="secondary">Volver</Button>
      {
        loading ? 
        <p>Cargando...</p> : 
        <FormContainer>
          <InputText 
            text="Email"
            value={form.email}
            onChange={(e) => setForm(old => ({...old, email: e.target.value }))}
          />
          <InputText 
            text="Nombre"
            value={form.nombre}
            onChange={(e) => setForm(old => ({...old, nombre: e.target.value }))}
          />
          {
            !id &&
            <InputText 
              text="Clave"
              value={form.clave}
              onChange={(e) => setForm(old => ({...old, clave: e.target.value }))}
            />
          }
          <InputText 
            text="Rol"
            value={form.rol}
            onChange={(e) => setForm(old => ({...old, rol: e.target.value }))}
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
          <Button onClick={handleSend} type="secondary">{id ? "Editar" : "Agregar"}</Button>
        </FormContainer>
      }
    </Container>
  )
}

export default FormUsuario

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