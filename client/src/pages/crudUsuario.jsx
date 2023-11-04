import React from 'react'
import styled from 'styled-components';
import { useChangeBackground } from '../hooks/changeBackground';
import colors from '../styles/colors';
import Button from '../components/global/button';
import { useGet } from '../hooks/useGet';
import { useNavigate } from 'react-router-dom';
import { sendRequest } from '../utilities/sendRequest';
import Swal from 'sweetalert2';

const CrudPublicidad = () => {
  useChangeBackground(colors.primary200);
  const navigate = useNavigate();
  const { data: UsuariosData , getData } = useGet('usuario', null);

  const handleDelete = async (id) => {
    const res = await sendRequest(`usuario/${id}`, null, "DELETE");
    if(res) {
      Swal.fire({
        title: "Correcto",
        text: "El usuario se eliminó correctamente",
        icon: "success"
      });
      getData();
    }
  }

  return (
    <Container>
      <h2>Usuarios</h2>
      <Button onClick={() => navigate('/crud/usuario/agregar')} type="secondary">Crear</Button>
      {
        !UsuariosData ? 
        <p>Cargando...</p> :
        <TableContainer>
          <Table>
            <thead>
              <tr>
                <th>#</th>
                <th>Email</th>
                <th>Nombre</th>
                <th>Rol</th>
                <th>País</th>
                <th>Ciudad</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {
                UsuariosData.map((usuario, i) => (
                  <tr key={usuario.email}>
                    <td className='centertext'><p>{i + 1}</p></td>
                    <td><p className='maxwidth'>{usuario.email}</p></td>
                    <td><p>{usuario.nombre}</p></td>
                    <td className='centertext'><p>{usuario.rol}</p></td>
                    <td><p className='maxwidth'>{usuario.pais}</p></td>
                    <td><p className='maxwidth'>{usuario.ciudad}</p></td>
                    <td>
                      <div className='buttons'>
                        <Button onClick={() => navigate(`/crud/usuario/editar/${usuario.email}`)} type="secondary" size="little">Editar</Button>
                        <Button onClick={() => handleDelete(usuario.email)} type="secondary" size="little">Eliminar</Button>
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
  width: 100%;
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
    max-width: 100%;
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