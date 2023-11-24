import React from 'react'
import styled from 'styled-components';
import colors from '../../../styles/colors';
import CartData from '../../../utilities/cartData'

const DetallesTable = ({ items, close }) => {
  return (
    <Container>
      <BackButton onClick={close}>
        <i className="fa-solid fa-xmark"></i>
      </BackButton>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Producto</th>
            <th>Precio</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, i) => (
            <tr>
              <td>{i + 1}</td>
              <td>{CartData.find(data => data.id === item).name}</td>
              <td>{CartData.find(data => data.id === item).precio}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  )
}

export default DetallesTable

const Container = styled.div`
  background-color: ${colors.primary200};
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;

  & > table {
    table-layout: fixed;
    border-collapse: collapse;
  }
  & th {
    background-color: ${colors.primary500};
    border: 1px solid ${colors.primary500};
    color: ${colors.white};
  }
  & th, & td {
    padding: 8px 16px;
    text-align: center;
  }
  & td {
    border: 1px solid ${colors.primary400};
  }
`;

const BackButton = styled.button`
  border: none;
  background-color: transparent;
  color: ${colors.primary500};
  font-size: 1.2rem;
  cursor: pointer;
  transition: scale 0.3s;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: flex-end;

  &:hover {
    scale: 1.2;
  }
`;