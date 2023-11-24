import React, { useState } from 'react'
import styled from 'styled-components'
import colors from '../../styles/colors'
import Method from './cart/method'
import Items from './cart/items'
import { useBackground } from '../../context/background'
import Pay from './cart/pay'

const Cart = ({ goBack, showItems, registerForm }) => {
  const [page, setPage] = useState(0);
  const [item, setItem] = useState(null);
  const { color } = useBackground();

  const addItem = (id) => {
    setItem(id);
  }

  return (
    <Container bg={color}>
      {
        page === 0 ?
        <>
        <div className='items'>
          <div className='title'>
            {goBack && <BackButton onClick={goBack}><i className="fa-solid fa-chevron-left"></i></BackButton>}
            <h2>Carrito</h2>
          </div>
          <Items 
            itemSelected={item}
            addItem={addItem}
            showItems={showItems}
          />
        </div>
        <Method 
          itemId={item}
          setItem={setItem}
          setPage={setPage}
        />
        </> :
        <Pay 
          registerForm={registerForm}
          itemId={item}
          setPage={setPage}
        />
      }
    </Container>
  )
}

export default Cart

const Container = styled.div`
  height: 480px;
  background-color: ${colors.primary300};
  border: 4px solid ${props => props.bg === colors.primary500 ? colors.primary400 : colors.primary500};
  transition: transform 0.3s;
  display: flex;
  padding: 24px 0 24px;
  gap: 24px;
  & > .items {
    width: 350px;
    height: 100%;
    & > .title {
      padding-left: 24px;
      display: flex;
      align-items: center;
      gap: 8px;
      & > h2 {
        color: ${colors.primary500};
        font-size: 1.4rem;
        font-weight: 600;
        font-family: 'Chillax';
      }
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