import React from 'react'
import styled from 'styled-components';
import { useChangeBackground } from '../hooks/changeBackground';
import colors from '../styles/colors';
import Button from '../components/global/button';
import { useGet } from '../hooks/useGet';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useRequest } from '../hooks/useRequest';

const CrudPublicidad = () => {
  useChangeBackground(colors.primary200);
  const sendRequest = useRequest();
  const navigate = useNavigate();
  const { data: PublicidadData , getData } = useGet('publicidad', null);

  const handleDelete = async (id) => {
    const res = await sendRequest(`publicidad/${id}`, null, "DELETE");
    if(res) {
      Swal.fire({
        title: "Correcto",
        text: "La publicidad se eliminó correctamente",
        icon: "success"
      });
      getData();
    }
  }

  return (
    <Container>
      <h2>Publicidad</h2>
      <Button onClick={() => navigate('/crud/publicidad/agregar')} type="secondary">Crear</Button>
      {
        !PublicidadData ? 
        <p>Cargando...</p> :
        <TableContainer>
          <Table>
            <thead>
              <tr>
                <th>#</th>
                <th>Codigo país</th>
                <th>País</th>
                <th>Ciudad</th>
                <th>Empresa</th>
                <th>Foto</th>
                <th>Contacto</th>
                <th>Cargo</th>
                <th>Dirección</th>
                <th>Teléfono</th>
                <th>Correo</th>
                <th>Web</th>
                <th>Descripción</th>
                <th>Fecha de registro</th>
                <th>Tipo de propaganda</th>
                <th>Cobertura</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {
                PublicidadData.map((publicidad, i) => (
                  <tr key={publicidad.id}>
                    <td className='centertext'><p>{i + 1}</p></td>
                    <td className='centertext'><p>{publicidad.codigo_pais}</p></td>
                    <td><p>{publicidad.pais}</p></td>
                    <td><p>{publicidad.ciudad}</p></td>
                    <td><p>{publicidad.empresa}</p></td>
                    <td className='centertext'><img src={`${import.meta.env.VITE_BACKEND}logo/${publicidad.codigo_pais}${publicidad.id}?v=${new Date().getTime()}`} /></td>
                    <td><p>{publicidad.contacto}</p></td>
                    <td><p>{publicidad.cargo}</p></td>
                    <td><p>{publicidad.direccion}</p></td>
                    <td><p>{publicidad.telefono}</p></td>
                    <td><p className='maxwidth'>{publicidad.correo}</p></td>
                    <td><p className='maxwidth'>{publicidad.web}</p></td>
                    <td><p className='maxlines'>{publicidad.descripcion}</p></td>
                    <td><p>{publicidad.fecha_registro}</p></td>
                    <td className='centertext'><p>{publicidad.tipo_propaganda}</p></td>
                    <td className='centertext'><p>{publicidad.cobertura}</p></td>
                    <td>
                      <div className='buttons'>
                        <Button onClick={() => navigate(`/crud/publicidad/editar/${publicidad.id}`)} type="secondary" size="little">Editar</Button>
                        <Button onClick={() => handleDelete(publicidad.id)} type="secondary" size="little">Eliminar</Button>
                      </div>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </Table>
        </TableContainer>
      }
    </Container>
  )
}

export default CrudPublicidad

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

const TableContainer = styled.div`
  width: 100%;
  overflow: auto;
  border-radius: 16px;
`;

const Table = styled.table`
  table-layout: fixed;
  border-collapse: collapse;
  th, td {
    padding: 4px 8px;
    border: 1px solid ${colors.primary400};
  }
  tr {
    background-color: ${colors.primary300};
  }
  thead > tr {
    background-color: ${colors.primary500};
    color: ${colors.white};
    text-align: center;

    & > th {
      border: 1px solid ${colors.primary500};
    }
  }
  img {
    max-width: 64px;
    max-height: 64px;
  }
  .maxlines {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
    line-clamp: 2;
    overflow: hidden;
    height: 100%;
  }
  .maxwidth {
    width: 120px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .centertext {
    text-align: center;
  }
  .buttons {
    display: flex;
    gap: 12px;
  }
`