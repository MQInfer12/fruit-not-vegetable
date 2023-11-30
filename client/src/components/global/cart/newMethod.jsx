import React from 'react'
import styled from 'styled-components';
import HandIcon from './handIcon';
import colors from '../../../styles/colors';
import Button from '../button';
import MetodosPago from '../../../assets/cart/metodospago.jpg'

const NewMethod = ({ items, setItems, total, setPage, page }) => {
  const cancel = () => {
    setItems([]);
    setPage(0);
  }

  return (
    <Container>
    <div className='title'>
      <BackButton onClick={() => setPage(0)}><i className="fa-solid fa-chevron-left"></i></BackButton>
      <h2>Detalle</h2>
      <div className='next' style={{ width: 24 }} />
    </div>
    {
      items.length ?
      <BlueContainer> 
        <TopContainer>
          <div>
            <p>Resumen</p>
          </div>
          <div>
            <p>Total Items</p>
            <p>{items.length}</p>
          </div>
          <b className='title'>Total a pagar</b>
          <b className='total'>$us. {total}</b>
        </TopContainer>
        <BottomContainer>
          <div>
            <Button size="little" type="primary" onClick={cancel}>Cancelar</Button>
            <Button 
              size="little" 
              type="primary" 
              onClick={() => setPage(page !== 0 ? 1 : 0)}
            >{page !== 1 ? "Realizar pago" : "Seguir comprando"}</Button>
          </div>
          <img src={MetodosPago} />
        </BottomContainer>
      </BlueContainer> :
      <HandIcon />
    }
    </Container>
  )
}

export default NewMethod

const Container = styled.div`
  min-width: 450px;
  padding: 0 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  overflow: auto;

  @media screen and (max-width: 1006px) {
    min-height: 472px;
    padding: 24px 24px;
    min-width: 0;
  }

  & > .title {
    align-items: center;
    gap: 8px;
    display: none;
    @media screen and (max-width: 1006px) {
      display: flex;
      width: 100%;
      justify-content: space-between;
    }
    & > h2 {
      color: ${colors.primary500};
      font-size: 1.4rem;
      font-weight: 600;
      font-family: 'Chillax';
    }
  }
`;

const BlueContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${colors.blue};
  border: 4px solid ${colors.white};
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  animation: appearCartDetails 0.3s;
  gap: 24px;

  @media screen and (max-width: 1006px) {
    overflow: auto;
    padding: 12px;
  }

  @keyframes appearCartDetails {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const TopContainer = styled.div`
  background-color: ${colors.white};
  border-radius: 8px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  & > div {
    display: flex;
    justify-content: space-between;
    padding: 8px 16px;
    border-bottom: 1px solid ${colors.primary300};
    & > p {
      opacity: 0.8;
    }
  }
  & > b {
    align-self: center;
    padding: 12px 0 0;
  }
  & > .total {
    font-size: 24px;
  }
`

const BottomContainer = styled.div`
  background-color: ${colors.white};
  border-radius: 8px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  & > div {
    display: flex;
    justify-content: space-evenly;
    @media screen and (max-width: 1006px) {
      justify-content: space-between;
    }
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

  &:hover {
    scale: 1.2;
  }
`;